import UserService from "./../../services/UserService";
import { Button } from "@nextui-org/react";

/**
 * Render the login button
 * @param title Button title
 * @returns LoginButton component
 */
export const LoginButton = ({ title }: { title: string }) => {
  const joinToGroup = () => {
    if (!UserService.isAuth()) {
      UserService.login();
    }
  };

  return (
    <Button onPress={joinToGroup}>
      {title}
      <svg className="w-[15px] h-[15px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13" />
      </svg>    </Button>
  );
};
