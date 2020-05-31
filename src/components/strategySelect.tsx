import React from "react"
import { Button, Descriptions, Table, InputNumber, Form, Dropdown, Menu } from "antd"
import { DownOutlined } from '@ant-design/icons';
import { ICar } from "../stores/car/types";
import { MenuProps, ClickParam } from "antd/lib/menu";
import { RaceStrategyMode } from "../stores/stint/types";


interface IDispatchProps  {    
    selectStrategy: (id:number) => any;
}
interface IStateProps  {    
    
    current: RaceStrategyMode
}
type MyProps = IDispatchProps & IStateProps;
const RaceStrategySelect: React.FC<MyProps> = (props:MyProps) => {
    
    const handleMenuClick = (param:ClickParam) => {props.selectStrategy(parseInt(param.key))}
    const keys = Object.keys(RaceStrategyMode).filter(k => typeof RaceStrategyMode[k as any] === "number");
    const menu = () => (
        <Menu onClick={handleMenuClick}>
            {keys.map((c,i) => (<Menu.Item key={i} >{c}</Menu.Item>))}        
        </Menu>
    );
   return (
       <>
        <Dropdown overlay={menu}>
            <Button>
            {RaceStrategyMode[props.current]}<DownOutlined />
            </Button>
        </Dropdown>
       </>
   );
}

export default RaceStrategySelect

