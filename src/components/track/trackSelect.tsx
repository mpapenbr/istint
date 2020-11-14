import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import { MenuInfo } from "rc-menu/lib/interface";
import React from "react";
import { ITrack } from "../../stores/track/types";

interface IDispatchProps {
  selectTrack: (trackId: number) => any;
}
interface IStateProps {
  tracks: ITrack[];
  current: ITrack;
}
type MyProps = IDispatchProps & IStateProps;
const TrackSelect: React.FC<MyProps> = (props: MyProps) => {
  const handleMenuClick = (param: MenuInfo) => {
    props.selectTrack(parseInt(param.key as string));
  };

  const menu = (tracks: ITrack[]) => (
    <Menu onClick={handleMenuClick}>
      {tracks.map((t) => (
        <Menu.Item key={t.id}>{t.name}</Menu.Item>
      ))}
    </Menu>
  );
  return (
    <>
      <Dropdown overlay={menu(props.tracks.sort((a, b) => a.name.localeCompare(b.name)))}>
        <Button>
          {props.current.name}
          <DownOutlined />
        </Button>
      </Dropdown>
    </>
  );
};

export default TrackSelect;
