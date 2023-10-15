import React, { useEffect, Dispatch, SetStateAction, useState } from "react";
import {
  Badge, Divider, Image, Spacer, Button,
  Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle,
  DropdownItem, DropdownMenu, DropdownTrigger, Dropdown
} from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { Session } from '@wharfkit/session'
import { DinamicRoutes } from "../../router/routes";

import { sessionKit } from "../../App";

/**
 * Draw the menu
 * @returns Menu component
 */
export const Menu = () => {
  // get user data from redux
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean | undefined>(false);
  const [session, setSession]: [Session | undefined, Dispatch<SetStateAction<Session | undefined>>] = useState<Session | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    sessionKit.restore().then((session: Session | undefined) => {
      if (session) {
        setSession(session);
      }
    })
  }, []);

  const login = async () => {
    const response = await sessionKit.login()
    if (response.session) {
      setSession(response.session);
    }
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const logout = async () => {
    console.log('logout');
    sessionKit.logout()
    setSession(undefined);
    navigate('/');
  }

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="sm:py-1">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand key={'banner'}>
          <div className="my-1 flex flex-row items-center">
            <Link to={"/"} style={{ width: "auto" }} key={'image_logo'}>
              <Image
                width={30}
                height={30}
                src={"/assets/logo.png"}
                alt={"My APP Logo"}
                className="logo"
              />
            </Link>
            <Spacer y={1} />
            <div className="hidden sm:flex flex-col">
              <Badge size='sm' color='warning' content="Alpha" disableOutline>
                <p className="text-lg font-bold text-white">{import.meta.env.VITE_APP_NAME}</p>
              </Badge>
            </div>
          </div>
        </NavbarBrand>
      </NavbarContent>
      <NavbarMenu>
        {
          DinamicRoutes.map((route, index) => {
            if (!route.showInMenu) return null;
            if (route.isPrivate && !session) return null;
            return (
              <NavbarMenuItem key={index} onClick={handleMenuClose} >
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
            if (route.isPrivate && !session) return null;
            return (
              <React.Fragment key={index} >
                <NavbarItem key={index} onClick={handleMenuClose} >
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
          !session
            ? <Button onPress={login} className="sm:text-xs py-1 sm:py-2">
              Login
              <svg className="w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13" />
              </svg>
            </Button>
            :
            <Dropdown aria-label="user-menu" >
              <DropdownTrigger aria-label="access-user-menu">
                <Button variant="bordered" aria-label="User options menu">
                  <span className="text-white">{String(session.actor)}</span>
                  <svg className="w-[15px] h-[15px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1" />
                  </svg>
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="user-menu-options">
                <DropdownItem aria-label="user-tokens" onPress={() => navigate('/user-tokens')} className="text-black " >View tokens</DropdownItem>
                <DropdownItem aria-label="logout" onPress={logout} className="text-danger" >Log out</DropdownItem>
              </DropdownMenu>
            </Dropdown>
        }
      </NavbarContent>
    </Navbar>
  )
};
