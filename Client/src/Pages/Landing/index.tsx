import { Container } from "@nextui-org/react";

/**
 * Sample landing page
 * @returns Render the landing page
 */
export const Landing = () => {
  return (
    <Container
      justify='center'
      fluid
    >
      <Container
        justify='space-between'
        display='flex'
        css={{
          textAlign: "center",
          width: "95%",
        }}
      >
        <h1>My APP</h1>
      </Container>
    </Container>
  );
};
