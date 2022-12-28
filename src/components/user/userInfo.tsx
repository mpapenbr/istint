import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import React from "react";
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
    // const menu = (
    //   <Menu items={}>
    //     <Menu.Item onClick={onLogout} key="1" icon={<LogoutOutlined />}>
    //       Logout
    //     </Menu.Item>
    //   </Menu>
    // );
    const onClick: MenuProps["onClick"] = ({ key }) => {
      console.log("logout clicked");
      onLogout();
    };
    const items: MenuProps["items"] = [{ label: "Logout", key: "logout", icon: <LogoutOutlined /> }];

    return (
      <Dropdown.Button icon={<UserOutlined />} menu={{ items, onClick }}>
        {name}
      </Dropdown.Button>
    );
  }
  return <Button onClick={onLogin}>Login</Button>;
};
export default UserInfo;
