import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
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
  const items: MenuProps["items"] = props.tracks
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((value) => ({ label: value.name, key: "" + value.id }));
  const onClick: MenuProps["onClick"] = ({ key }) => {
    // console.log("onClick: " + key);
    props.selectTrack(parseInt(key));
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

export default TrackSelect;
