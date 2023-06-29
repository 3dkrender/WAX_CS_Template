import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Text, Grid } from "@nextui-org/react";

/**
 * Get the info from the blockchain
 * @returns Render the info from the blockchain
 */
export const GetInfo = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_SERVER + "api/getinfo")
      .then((res: any) => {
        setData(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [])

  return (
    <>
      {
        data.info &&
        <Container>
          <Grid.Container gap={2}>
            {Object.entries(data.info).map(([key, value]) => (
              <Grid key={key} xs={12} md={6} lg={4} xl={3}>
                <Text small css={{ mx: 10 }} >{key}</Text>
                <Text>{value as string | number}</Text>
              </Grid>
            ))}
          </Grid.Container>
        </Container>
      }
    </>
  );
};