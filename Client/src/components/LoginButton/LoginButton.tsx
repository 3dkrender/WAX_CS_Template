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
    <Button rounded onPress={joinToGroup}>
      {title}
    </Button>
  );
};
