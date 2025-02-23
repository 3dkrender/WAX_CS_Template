import { useState, useEffect } from 'react';
import { Button, Input } from "@heroui/react";
import { InitTransaction } from '../../services/InitTransaction';
import { sessionKit } from "../../App";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const PushTransaction = () => {
  const navigate = useNavigate();
  const [t] = useTranslation();

  const [amount, setAmount] = useState(0.0001);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    sessionKit.restore().then((session) => {
      if (session) {
        setUserName(String(session.actor));
      } else {
        navigate('/');
      }
    });
  }, [])

  const handleInputChange = async (e: any) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      setAmount(value);
    }
  }

  const onHandleSend = async () => {
    if (!userName) return;
    if (amount <= 0) return;
    const value = parseFloat(amount.toString()).toFixed(8);
    const trx: any = await InitTransaction({
      actions: [{
        account: 'eosio.token',
        name: 'transfer',
        authorization: [{
          actor: userName,
          permission: 'active',
        }],
        data: {
          from: userName,
          to: '3dkrenderwax',
          quantity: `${value} WAX`,
          memo: 'WAX donation',
        },
      }]
    });
    if (trx) {
      console.log(`Transaction ID: ${trx.transactionId}`);
    }

  };

  return (
    <div className="flex flex-col items-center my-10">
      <div className='text-3xl font-black m-10'>{t('pages.transaction.title')}</div>

      <div className="flex flex-row items-center gap-5">
        <Input
          value={amount.toString()}
          onChange={handleInputChange}
          className="text-center"
          placeholder={t('pages.transaction.placeholder')}
          type="number"
        />
        <Button color="primary" onPress={onHandleSend}>{t('pages.transaction.send')}</Button>
      </div>

    </div>
  );
}
