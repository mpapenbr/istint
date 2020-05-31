import React from "react"
import { Button, Descriptions, Table, InputNumber, Form, Dropdown, Menu } from "antd"
import { DownOutlined } from '@ant-design/icons';

import { MenuProps, ClickParam } from "antd/lib/menu";
import { ITrack } from "../stores/track/types";


interface IDispatchProps  {    
    selectTrack: (trackId:number) => any;
}
interface IStateProps  {    
    tracks: ITrack[],
    current: ITrack
}
type MyProps = IDispatchProps & IStateProps;
const TrackSelect: React.FC<MyProps> = (props:MyProps) => {
    
    const handleMenuClick = (param:ClickParam) => {props.selectTrack(parseInt(param.key))}

    const menu = (tracks : ITrack[]) => (
        <Menu onClick={handleMenuClick}>
            {tracks.map(t => (<Menu.Item key={t.id} >{t.name}</Menu.Item>))}        
        </Menu>
    );
   return (
       <>
        <Dropdown overlay={menu(props.tracks)}>
            <Button>
            {props.current.name}<DownOutlined />
            </Button>
        </Dropdown>
       </>
   );
}

export default TrackSelect

