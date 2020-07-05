import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import { ClickParam } from "antd/lib/menu";
import React from "react";
import { ICar } from "../stores/car/types";

interface IDispatchProps {
  selectCar: (carId: number) => any;
}
interface IStateProps {
  cars: ICar[];
  current: ICar;
}
type MyProps = IDispatchProps & IStateProps;
const CarSelect: React.FC<MyProps> = (props: MyProps) => {
  const handleMenuClick = (param: ClickParam) => {
    props.selectCar(parseInt(param.key));
  };

  const menu = (cars: ICar[]) => (
    <Menu onClick={handleMenuClick}>
      {cars.map((c) => (
        <Menu.Item key={c.id}>{c.name}</Menu.Item>
      ))}
    </Menu>
  );
  return (
    <>
      <Dropdown overlay={menu(props.cars)}>
        <Button style={{ width: "inherit" }}>
          {props.current.name}
          <DownOutlined />
        </Button>
      </Dropdown>
    </>
  );
};

export default CarSelect;
