import { Container, Dropdown, Text } from "@nextui-org/react";
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
  balance,
  isLogged,
}: {
  name: string;
  balance: number;
  isLogged: boolean;
}) => {
  //   const { name, balance, isLogged } = useSelector((store: any) => store.user);
  const navigate = useNavigate();
  const logOutUser = (event: any) => {
    if (event === "logout") {
      if (isLogged) {
        UserService.logout();
        navigate("/")
      }
    }
    else {
      navigate(event);
    }
  };

  return (
    <Container css={{ width: "auto", margin: "auto 0 auto 0" }}>
      <Dropdown placement="bottom-left">
        <Dropdown.Button light>
          <Container css={{ width: "min-content" }}>
            <Text>{name}</Text>
            <Text>{balance}</Text>
          </Container>
        </Dropdown.Button>
        <Dropdown.Menu
          aria-label="Static Actions"
          onAction={(e) => logOutUser(e)}
        >
          <Dropdown.Item key="user-tokens">View tokens</Dropdown.Item>
          <Dropdown.Item key="logout" withDivider color="error">
            Log out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  );
};
