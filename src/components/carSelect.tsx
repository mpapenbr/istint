import React from "react"
import { Button, Descriptions, Table, InputNumber, Form, Dropdown, Menu } from "antd"
import { DownOutlined } from '@ant-design/icons';
import { ICar } from "../stores/car/types";
import { MenuProps, ClickParam } from "antd/lib/menu";


interface IDispatchProps  {    
    selectCar: (carId:number) => any;
}
interface IStateProps  {    
    cars: ICar[],
    current: ICar
}
type MyProps = IDispatchProps & IStateProps;
const CarSelect: React.FC<MyProps> = (props:MyProps) => {
    
    const handleMenuClick = (param:ClickParam) => {props.selectCar(parseInt(param.key))}

    const menu = (cars : ICar[]) => (
        <Menu onClick={handleMenuClick}>
            {cars.map(c => (<Menu.Item key={c.id} >{c.name}</Menu.Item>))}        
        </Menu>
    );
   return (
       <>
        <Dropdown overlay={menu(props.cars)}>
            <Button>
            {props.current.name}<DownOutlined />
            </Button>
        </Dropdown>
       </>
   );
}

export default CarSelect

