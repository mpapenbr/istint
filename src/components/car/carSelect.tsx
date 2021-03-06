import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import { MenuInfo } from "rc-menu/lib/interface";
import React from "react";
import { ICar } from "../../stores/car/types";

interface IDispatchProps {
  selectCar: (carId: number) => any;
}
interface IStateProps {
  cars: ICar[];
  current: ICar;
}
type MyProps = IDispatchProps & IStateProps;
const CarSelect: React.FC<MyProps> = (props: MyProps) => {
  // const handleMenuClickx = (param: ClickParam) => {
  //   props.selectCar(parseInt(param.key));
  // };
  const handleMenuClick = (param: MenuInfo) => {
    console.log({ param });
    props.selectCar(parseInt(param.key as string));
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
      <Dropdown overlay={menu(props.cars.sort((a, b) => a.name.localeCompare(b.name)))}>
        <Button>
          {props.current.name}
          <DownOutlined />
        </Button>
      </Dropdown>
    </>
  );
};

export default CarSelect;
