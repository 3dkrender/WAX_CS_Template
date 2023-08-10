import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TTokens } from "../../types/TTokens";
import { Card, CardBody, Spinner, Tooltip } from "@nextui-org/react";
import { ctGetUserTokens } from "../../Controllers/ctGetUserTokens";

/**
 * Call the server to get the tokens owned by the user
 * @returns Render the tokens owned by the user
 */
export const GetUserTokens = () => {
  const [tokens, setTokens] = useState<TTokens>([]);
  const { userName } = useSelector((store: any) => store.user);

  useEffect(() => {
    ctGetUserTokens(userName)
      .then((res: any) => {
        setTokens(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [])

  return (
    <>
      {
        !tokens.length &&
        <Spinner
          color="warning"
          label="Reading wallet..."
          className="mx-auto my-[200px]"
        />
      }
      {
        tokens.length &&
        <div className="container mx-[50px]" >
          <div className="grid grid-cols-1 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 gap-4 mt-10 " >
            {tokens.map((token: any) => (

              <Card
                key={`${token.symbol}`}
                className="
                m-[10px]
                bg-stone-700
                w-[140px]
                flex flex-col
                items-center
              "
              >
                <div
                  className="bg-stone-600 mt-1 p-1 px-2 items-center rounded-lg"
                >
                  <Tooltip content='Smart Contract Address' placement='top' >
                    <p className="text-center" >{token.contract}</p>
                  </Tooltip>
                </div>
                <CardBody
                  className='p-1 items-center'
                >
                  <small>{token.amount} {token.symbol}</small>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      }
    </>
  );
};