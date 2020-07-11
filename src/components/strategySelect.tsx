import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import { MenuInfo } from "rc-menu/lib/interface";
import React from "react";
import { RaceStrategyMode } from "../stores/stint/types";

interface IDispatchProps {
  selectStrategy: (id: number) => any;
}
interface IStateProps {
  current: RaceStrategyMode;
}

type MyProps = IDispatchProps & IStateProps;
const RaceStrategySelect: React.FC<MyProps> = (props: MyProps) => {
  // const x : MenuInfo = {}
  const handleMenuClick = (param: MenuInfo) => {
    props.selectStrategy(parseInt(param.key as string));
  };
  const keys = Object.keys(RaceStrategyMode).filter((k) => typeof RaceStrategyMode[k as any] === "number");
  const menu = () => (
    <Menu onClick={handleMenuClick}>
      {keys.map((c, i) => (
        <Menu.Item key={i}>{c}</Menu.Item>
      ))}
    </Menu>
  );
  return (
    <>
      <Dropdown overlay={menu}>
        <Button>
          {RaceStrategyMode[props.current]}
          <DownOutlined />
        </Button>
      </Dropdown>
    </>
  );
};

export default RaceStrategySelect;
