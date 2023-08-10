import { Button, Dropdown, DropdownTrigger, DropdownItem, DropdownMenu } from "@nextui-org/react";
import UserService from "../../services/UserService";
import { useNavigate } from "react-router-dom";

/**
 * Render the user menu
 * 
 * @param name User name
 * @param balance User balance
 * @param isLogged Is user logged?
 * 
 * @returns UserMenu component
 */
export const UserMenu = ({
  name,
  isLogged,
}: {
  name: string;
  isLogged: boolean;
}) => {
  //   const { name, balance, isLogged } = useSelector((store: any) => store.user);
  const navigate = useNavigate();
  
  const logOutUser = (event: any) => {
    if (event === "logout") {
      if (isLogged) {
        UserService.logout();
        const localData = localStorage;
        for (let i = 0; i < localData.length; i++) {
          const key = localData.key(i);
          if (key?.includes('ual-') || key?.includes('anchor-')) {
            localStorage.removeItem(key);
          }
        }
        navigate("/")
      }
    }
    else {
      navigate(event);
    }
  };


  return (
    <Dropdown aria-label="user-menu" >
      <DropdownTrigger aria-label="access-user-menu">
        <Button variant="bordered" aria-label="User options menu">
          <span className="text-white">{name}</span>
          <svg className="w-[15px] h-[15px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1" />
          </svg>
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="user-menu-options">
        <DropdownItem aria-label="user-tokens" onPress={() => navigate('/user-tokens')} className="text-black " >View tokens</DropdownItem>
        <DropdownItem aria-label="logout" onPress={() => logOutUser("logout")} className="text-danger" >Log out</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
};
