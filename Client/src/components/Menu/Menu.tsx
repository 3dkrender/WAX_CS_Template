import React, { useEffect, useState } from "react";
import {
  Badge, Divider, Image, Spacer, Button,
  Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle,
  DropdownItem, DropdownMenu, DropdownTrigger, Dropdown, DropdownSection
} from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { SerializedSession, Session } from '@wharfkit/session'
import { DinamicRoutes } from "../../router/routes";

import { sessionKit } from "../../App";
import { useTranslation } from "react-i18next";
import { keyLanguages } from "../../i18n";
import store from "../../redux/store";
import { setLang } from "../../redux/reducers/config";
import i18next from "i18next";
import IconDownOpenMini from "./Icons/IconDownOpenMini";
import IconRightOpenMini from "./Icons/IconRightOpenMini";

/**
 * Draw the menu
 * @returns Menu component
 */
export const Menu = () => {
  const navigate = useNavigate();
  const [t] = useTranslation();

  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean | undefined>(false);
  const [session, setSession] = useState<Session | undefined>(undefined);
  const [sessions, setSessions] = useState<SerializedSession[]>([]);
  const [selectedLang, setSelectedLang] = useState<string>(i18next.language);
  const languages = Object.keys(keyLanguages);

  useEffect(() => {
    sessionKit.getSessions().then((globalSessions: SerializedSession[] | undefined) => {
      if (globalSessions) {
        let thisChainSessions = globalSessions.filter((session: SerializedSession) => session.chain === import.meta.env.VITE_CHAINID);
        setSessions(thisChainSessions);
      } else {
        setSessions([]);
      }
    });
  }, [session]);

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

  const restoreSession = async (session: SerializedSession) => {
    sessionKit.restore(session).then((session: Session | undefined) => {
      if (session) {
        setSession(session);
      }
    });
  }

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleSelectLanguage = (lang: string) => {
    setSelectedLang(lang);
    store.dispatch(setLang(lang));
    i18next.changeLanguage(lang);
    localStorage.setItem('lang', lang);
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
              <Badge size='sm' color='warning' content="Alpha">
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
                    <span className="text-white">{t(`${route.title}`)}</span>
                  </Link>
                </NavbarItem>
                <Divider orientation="vertical" />
              </React.Fragment>
            )
          })
        }
      </NavbarContent>
      <NavbarContent
        justify="end"
        className="hidden sm:flex"
        key={'language'}
      >
        <Dropdown aria-label="language-menu" >
          <DropdownTrigger aria-label="access-language-menu">
            <Button variant="bordered" aria-label="Language options menu">
              <span className="text-white">{keyLanguages[selectedLang]}</span>
              <IconDownOpenMini />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="language-menu-options">
            {
              languages.map((lang: string, index: number) => {
                return (
                  <DropdownItem aria-label="language" key={index} onPress={() => handleSelectLanguage(lang)}>
                    <div className="flex flex-row items-center">
                      <span className="text-black">{keyLanguages[lang]}</span>
                    </div>
                  </DropdownItem>
                )
              })
            }
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarContent justify="end" key={'user'} >
        {
          !session &&
          <Button onPress={login} className="sm:text-xs py-1 sm:py-2">
            Login
            <IconDownOpenMini />
          </Button>
        }
        {
          session &&
          <Dropdown aria-label="user-menu" >
            <DropdownTrigger aria-label="access-user-menu">
              <Button variant="bordered" aria-label="User options menu">
                <span className="text-white">{String(session.actor)}</span>
                <IconRightOpenMini />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="user-menu-options">
              <DropdownSection
                aria-label="user-menu-tools-section"
                title=''
                showDivider
              >
                <DropdownItem key={"user-tokens"} aria-label="user-tokens" onPress={() => navigate('/user-tokens')} className="text-black " >{t('components.navbar.viewTokens')}</DropdownItem>
              </DropdownSection>
              <DropdownSection
                aria-label="user-menu-sessions-section"
                title='Switch Session'
                showDivider
              >
                {
                  sessions.map((session: SerializedSession, index: number) => {
                    return (
                      <DropdownItem aria-label="session" key={index} onPress={() => restoreSession(session)}>
                        <div className="flex flex-row items-center">
                          {String(session.actor)}
                          <img className="w-[20px] h-[20px] ml-[10px]" src={`/assets/${session.walletPlugin.id}.png`} alt={session.walletPlugin.id} />
                        </div>
                      </DropdownItem>
                    )
                  })
                }
              </DropdownSection>
              <DropdownSection
                aria-label="user-menu-options-section"
                title=''
                showDivider
              >
                <DropdownItem key={"options"} aria-label="options" onPress={login}>
                  {t('components.navbar.addNewSession')}
                </DropdownItem>
              </DropdownSection>
              <DropdownItem key={"logout"} aria-label="logout" onPress={logout} className="text-danger" >{t('components.navbar.logOut')}</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        }
      </NavbarContent>
    </Navbar>
  )
};