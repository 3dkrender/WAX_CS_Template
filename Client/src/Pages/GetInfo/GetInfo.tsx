import { useEffect, useState } from "react";
import { ctGetInfo } from "../../Controllers/ctGetInfo";
import { Spinner } from "@nextui-org/react";
import { useTranslation } from "react-i18next";

/**
 * Get the info from the blockchain
 * @returns Render the info from the blockchain
 */
export const GetInfo = () => {
  const [t] = useTranslation();

  const [info, setInfo] = useState<any>(null);
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    ctGetInfo()
      .then((res: any) => {
        if (res) {
          setInfo(res);
          setReady(true);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [])

  return (
    <>
      {
        ready ?
          <div className="container" >
            <div className="text-center m-[50px]" >
              {Object.entries(info).map(([key, value]) => (
                <div key={`${key}`}>
                  {key}:  <span className="text-warning" >{value as string | number}</span>
                </div>
              ))}
            </div>
          </div>
          :
          <Spinner
            color="warning"
            label={t('spinner.labelChainInfo')}
            className="mx-auto my-[200px]"
          />
      }
    </>
  );
};