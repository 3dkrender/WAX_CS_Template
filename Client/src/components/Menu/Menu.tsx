import {
  Badge,
  Divider,
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Spacer
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import UserService from "./../../services/UserService";
import { useSelector } from "react-redux";
import { UserMenu } from "../UserMenu/UserMenu";
import { LoginButton } from "../LoginButton/LoginButton";
import { DinamicRoutes } from "../../router/routes";
import React from "react";

/**
 * Draw the menu
 * @returns Menu component
 */
export const Menu = () => {
  // get user data from redux
  const { userName, isLogged } = useSelector((store: any) => store.user);
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean | undefined>(false);

  return (
    <Navbar 
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
          
        />
        <NavbarBrand key={'banner'}>
          <div className="my-2 flex flex-row items-center">
            <Link to={"/"} style={{ width: "auto" }} key={'image_logo'}>
              <Image
                width={60}
                height={60}
                src={"/assets/logo.png"}
                alt={"My APP Logo"}
                className="logo"
              />
            </Link>
            <Spacer y={0.5} />
            <div className="hidden sm:flex flex-col">
              <Badge size='sm' color='warning' content="Alpha" disableOutline
              >
                <p className="text-xl font-bold text-white">{import.meta.env.VITE_APP_NAME}</p>
              </Badge>
            </div>
          </div>
        </NavbarBrand>
      </NavbarContent>
      <Divider orientation="vertical" />
      <NavbarMenu>
        {
          DinamicRoutes.map((route, index) => {
            if (!route.showInMenu) return null;
            if (route.isPrivate && !isLogged) return null;
            return (
              <NavbarMenuItem key={index}>
                <Link
                 to={route.path} aria-label={`go to ${route.title}`}>
                  <span className="text-white">{route.title}</span>
                </Link>
              </NavbarMenuItem>
            )
          })
        }
      </NavbarMenu>
      <NavbarContent className="hidden sm:flex gap-4" justify="center" key={'menu'} >
        {
          DinamicRoutes.map((route, index) => {
            if (!route.showInMenu) return null;
            if (route.isPrivate && !isLogged) return null;
            return (
              <React.Fragment key={index}>
                <NavbarItem key={index}>
                  <Link
                    to={route.path}
                    aria-label={`go to ${route.title}`}
                    className="w-full"
                  >
                    <span className="text-white">{route.title}</span>
                  </Link>
                </NavbarItem>
                <Divider orientation="vertical" />
              </React.Fragment>
            )
          })
        }
      </NavbarContent>
      <NavbarContent justify="end" key={'user'} >
        {
          !isLogged || !UserService.isAuth()
            ? <LoginButton title="Login" />
            : <UserMenu name={userName} isLogged={isLogged} />
        }
      </NavbarContent>
    </Navbar>
  )
};
