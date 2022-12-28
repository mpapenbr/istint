import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
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
  const onClick: MenuProps["onClick"] = ({ key }) => {
    props.selectStrategy(parseInt(key));
  };
  const keys = Object.keys(RaceStrategyMode).filter((k) => typeof RaceStrategyMode[k as any] === "number");

  const items: MenuProps["items"] = keys.map((c, i) => ({ key: "" + i, label: c }));
  return (
    <>
      <Dropdown menu={{ items, onClick }}>
        <Button>
          {RaceStrategyMode[props.current]}
          <DownOutlined />
        </Button>
      </Dropdown>
    </>
  );
};

export default RaceStrategySelect;
