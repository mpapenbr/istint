import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useKeycloak } from "@react-keycloak/web";
import { Button, Dropdown, Menu } from "antd";
import React, { useCallback } from "react";
import { useAuth } from "../../routes/auth";

interface IStateProps {}
interface IDispatchProps {}

type MyProps = IStateProps & IDispatchProps;

interface MyTokenInfo {
  name: string;
  preferred_username: string;
}

const UserInfo: React.FC<{}> = () => {
  const { onLogin, onLogout, name } = useAuth();

  if (name) {
    const menu = (
      <Menu>
        <Menu.Item onClick={onLogout} key="1" icon={<LogoutOutlined />}>
          Logout
        </Menu.Item>
      </Menu>
    );

    return (
      <Dropdown.Button icon={<UserOutlined />} overlay={menu}>
        {name}
      </Dropdown.Button>
    );
  }
  return <Button onClick={onLogin}>Login</Button>;
};
export default UserInfo;

const UserInfoOld: React.FC<MyProps> = (props: MyProps) => {
  const { keycloak } = useKeycloak();
  const login = useCallback(() => {
    keycloak?.login();
  }, [keycloak]);

  if (keycloak.authenticated) {
    const doLogout = () => {
      keycloak?.logout();
    };
    const menu = (
      <Menu>
        <Menu.Item onClick={doLogout} key="1" icon={<LogoutOutlined />}>
          Logout
        </Menu.Item>
      </Menu>
    );
    const myInfo = keycloak.idTokenParsed as MyTokenInfo;
    return (
      <Dropdown.Button icon={<UserOutlined />} overlay={menu}>
        {myInfo.name}
      </Dropdown.Button>
    );
  }
  return <Button onClick={login}>Login</Button>;
};
