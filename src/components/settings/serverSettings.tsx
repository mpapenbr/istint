import { LogoutOutlined, ReloadOutlined, SaveOutlined } from "@ant-design/icons";
import { useKeycloak } from "@react-keycloak/web";
import { Button, Card, Col, Row } from "antd";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import EventsService, { InternalRawData, MyEvent } from "../../api/events";
import { replaceDriverState } from "../../stores/driver/actions";
import { IDriver } from "../../stores/driver/types";
import { replaceRace } from "../../stores/race/actions";
import { ITimedRace } from "../../stores/race/types";
import { IUser } from "../../stores/user/types";
import EventList from "../events/events";

interface IStateProps {
  user: IUser;
  raceData: ITimedRace;
  drivers: IDriver[];
}
interface IDispatchProps {
  reset: () => any;
  login: () => any;
  eventList: () => any;
  loadEvent: (eventId: string) => any;
  updateEvent: (event: MyEvent) => any;
}

type MyProps = IStateProps & IDispatchProps;

const ServerSettings: React.FC<MyProps> = (props: MyProps) => {
  const { keycloak } = useKeycloak();
  const dispatch = useDispatch();
  const loadData = useCallback(
    (data: InternalRawData) => {
      dispatch(replaceRace(data.race));
      dispatch(replaceDriverState({ currentDriver: data.drivers[0], allDrivers: data.drivers }));
    },
    [dispatch]
  );
  const deleteEvent = (id: string) => {
    EventsService.deleteEvent(keycloak?.token!, id);
  };
  const doSaveEvent = () => {
    const ev: MyEvent = {
      id: props.raceData.id ? props.raceData.id : uuidv4(),
      name: props.raceData.name,
      carName: props.raceData.car.name,
      trackName: props.raceData.track.name,
      rawData: {
        race: props.raceData,
        drivers: props.drivers,
      },
    };
    EventsService.storeEvent(keycloak?.token!, ev);
  };

  const doLogout = () => {
    console.log("execute logout");
    keycloak?.logout();
  };

  const persData = () => {
    if (keycloak?.authenticated) {
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
              <EventList
                events={props.user.events}
                loadEvent={props.loadEvent}
                deleteEvent={deleteEvent}
                updateEvent={props.updateEvent}
              />
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
          <Button icon={<LogoutOutlined />} onClick={doLogout}>
            Logout
          </Button>
        </Card>
      </Col>
      {persData()}
    </Row>
  );
};

export default ServerSettings;

// 22:24
