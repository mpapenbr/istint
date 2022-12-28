import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
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
  const items: MenuProps["items"] = props.cars
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((value) => ({ label: value.name, key: "" + value.id }));
  const onClick: MenuProps["onClick"] = ({ key }) => {
    // console.log("onClick: " + key);
    props.selectCar(parseInt(key));
  };
  return (
    <>
      <Dropdown menu={{ items, onClick }}>
        <Button>
          {props.current.name}
          <DownOutlined />
        </Button>
      </Dropdown>
    </>
  );
};

export default CarSelect;
