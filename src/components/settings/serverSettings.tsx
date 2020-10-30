import { ReloadOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import React from "react";
import EventsService, { MyEvent } from "../../api/events";
import { ITimedRace } from "../../stores/race/types";
import { IUser } from "../../stores/user/types";
import EventList from "../events/events";

interface IStateProps {
  user: IUser;
  raceData: ITimedRace;
}
interface IDispatchProps {
  reset: () => any;
  login: () => any;
  eventList: () => any;
}

type MyProps = IStateProps & IDispatchProps;

const ServerSettings: React.FC<MyProps> = (props: MyProps) => {
  const doSaveEvent = () => {
    const ev: MyEvent = {
      id: props.raceData.id,
      name: props.raceData.name,
      carName: props.raceData.car.name,
      trackName: props.raceData.track.name,
      rawData: props.raceData,
    };
    EventsService.storeEvent(props.user.token, ev);
  };

  const persData = () => {
    if (props.user.id.length > 0) {
      return (
        <>
          <Col span={4}>
            <Card title="User info" size="small">
              <Button icon={<ReloadOutlined />} onClick={props.eventList}>
                Refresh events
              </Button>
              <Button icon={<SaveOutlined />} onClick={doSaveEvent}>
                Save event
              </Button>
            </Card>
          </Col>

          <Col span={8}>
            <Card title="Events" size="small">
              <EventList events={props.user.events} />
            </Card>
          </Col>
        </>
      );
    } else {
      return (
        <Col span={4}>
          <Card title="Not logged in" size="small"></Card>
        </Col>
      );
    }
  };
  return (
    <Row gutter={8}>
      <Col span={4}>
        <Card title="Action" size="small">
          <Button icon={<ReloadOutlined />} onClick={props.reset}>
            Reset
          </Button>
        </Card>
      </Col>
      {persData()}
    </Row>
  );
};

export default ServerSettings;

// 22:24
