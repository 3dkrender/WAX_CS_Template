import React, { useEffect, Dispatch, SetStateAction, useState } from "react";
import {
  Badge, Divider, Image, Spacer, Button,
  Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle,
  DropdownItem, DropdownMenu, DropdownTrigger, Dropdown
} from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { Chains, Session, SessionKit } from '@wharfkit/session'
import { WalletPluginAnchor } from '@wharfkit/wallet-plugin-anchor'
import { WalletPluginCloudWallet } from '@wharfkit/wallet-plugin-cloudwallet'
import WebRenderer from '@wharfkit/web-renderer'
import { DinamicRoutes } from "../../router/routes";

const walletPlugins = [];
walletPlugins.push(new WalletPluginAnchor());

if (import.meta.env.VITE_CHAIN === 'mainnet') {
  walletPlugins.push(new WalletPluginCloudWallet());
}

export const sessionKit = new SessionKit({
  appName: import.meta.env.VITE_SITE_TITLE,
  chains: [Chains.WAX],
  ui: new WebRenderer(),
  walletPlugins,
})

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

  const logout = async () => {
    console.log('logout');
    sessionKit.logout()
    setSession(undefined);
    navigate('/');
  }

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
            if (route.isPrivate && !session) return null;
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
            if (route.isPrivate && !session) return null;
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
          !session
            ? <Button onPress={login}>
              Login
              <svg className="w-[15px] h-[15px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13" />
              </svg>
            </Button>
            : <Dropdown aria-label="user-menu" >
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
