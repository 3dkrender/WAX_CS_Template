import { Badge, Container, Image, Text, Grid, Spacer } from "@nextui-org/react";
import UserService from "./../../services/UserService";
import { useSelector } from "react-redux";
import { UserMenu } from "../UserMenu/UserMenu";
import { Link } from "react-router-dom";
import { LoginButton } from "../LoginButton/LoginButton";
import { DinamicRoutes } from "../../router/routes";

/**
 * Draw the menu
 * @returns Menu component
 */
export const Menu = () => {
  // get user data from redux
  const { userName, balance, isLogged } = useSelector((store: any) => store.user);

  // const logIn = () => {
  //   if (!UserService.isAuth()) {
  //     UserService.login();
  //   }
  // };

  return (
    <Container
      justify='center'
      fluid
      display='flex'
      css={{
        width: "auto",
        borderBottom: "2px solid #343644",
        margin: "0px auto 10px auto",
        padding: "5px 0px 5px 0px",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Container
        justify='space-between'
        display='flex'
        css={{
          margin: "10px",
          width: "100%",
          "@xs": {
            width: "100%",
          },
          "@sm": {
            width: "95%",
          },
          "@md": {
            width: "90%",
          },
          "@lg": {
            width: "80%",
          },
          "@xl": {
            width: "70%",
          },
        }}>
        <Grid.Container gap={2} justify="center">
          <Grid xs={12} md={6}>
            <Link to={"/"} style={{ width: "auto" }}>
              <Image
                width={60}
                height={60}
                src={"/assets/logo.png"}
                alt={"My APP Logo"}
              />
            </Link>
            <Spacer y={0.5} />
            <Grid.Container gap={0.5} alignContent='center'>
              <Text size='20px' b>
                {import.meta.env.VITE_APP_NAME}
              </Text>
              <Spacer y={0.5} />
              <div className="px-2">
                <Badge size='xs' color='warning' disableOutline>
                  Beta
                </Badge>
              </div>
            </Grid.Container>
          </Grid>
          <Grid xs={12} md={6} justify="flex-end">
            {
              DinamicRoutes.map((route, index) => {
                if (!route.showInMenu) return null;
                if (route.isPrivate && !isLogged) return null;
                return (
                  <Grid.Container gap={0.5} alignContent='center'>
                    <Link key={index} to={route.path} style={{ width: "auto" }}>
                      <Text size='h5' b>
                        {route.title}
                      </Text>
                    </Link>
                  </Grid.Container>
                )
              })
            }
            {
              !isLogged || !UserService.isAuth()
                ? (
                  <Container css={{ width: "auto", margin: "auto 0 auto 0" }}>
                    <LoginButton title={"Connect wallet"} ></LoginButton>
                  </Container>
                )
                : (
                  <UserMenu
                    name={userName}
                    balance={balance}
                    isLogged={isLogged}
                  ></UserMenu>
                )
            }
          </Grid>
        </Grid.Container>
      </Container>
    </Container>
  );
};
