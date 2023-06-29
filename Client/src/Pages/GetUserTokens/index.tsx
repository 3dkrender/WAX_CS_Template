import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Text, Grid } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { TTokens } from "../../types/TTokens";

/**
 * Call the server to get the tokens owned by the user
 * @returns Render the tokens owned by the user
 */
export const GetUserTokens = () => {
  const [tokens, setTokens] = useState<TTokens>([]);
  const { userName } = useSelector((store: any) => store.user);
  
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_SERVER + `api/getusertokens/${userName}`)
      .then((res: any) => {
        setTokens(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      }
    );
  }, [])

  return (
    <>
      {
        tokens.length &&
        <Container>
          <Grid.Container gap={2}>
            {tokens.map((token: any) => (
              <Grid key={token.symbol} xs={12} md={6} lg={4} xl={3}>
                <Text >{token.symbol} ({token.contract}): {token.amount}</Text>
              </Grid>
            ))}
          </Grid.Container>
        </Container>
      }
    </>
  );
};