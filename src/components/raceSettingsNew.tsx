import { DownOutlined } from "@ant-design/icons";
import { Button, Card, Col, Dropdown, Input, Menu, Row } from "antd";
import { MenuInfo } from "rc-menu/lib/interface";
import React from "react";
import { CarState, ICar } from "../stores/car/types";
import { ITimedRace } from "../stores/race/types";
import { ISettings } from "../stores/settings/types";
import { ITrack, TrackState } from "../stores/track/types";
import CarEditCard from "./car/carEditCard";
import DurationInput from "./durationInput";
import RaceName from "./raceName";
import "./raceSettings.css";
import RaceStartSelect from "./raceStartSelect";
import TrackEditCard from "./track/trackEditCard";
interface IStateProps {
  raceData: ITimedRace;
  settings: ISettings;
  carData: CarState;
  trackData: TrackState;
}
interface IDispatchProps {
  setAutoRepair: (data: boolean) => void;
  setStrategy: (data: number) => void;
  setCar: (carId: number) => void;
  setTrack: (trackId: number) => void;
  updateCar: (data: ICar) => void;
  updateTrack: (data: ITrack) => void;
  setRaceStartReal: (date: Date) => void;
  setRaceStartSim: (date: Date) => void;
  setDuration: (duration: number) => void;
  setName: (value: string) => void;
  setStintEditMode: (value: number) => void;
  setTimeDisplayMode: (value: number) => void;
  reset: () => void;
}

type MyProps = IStateProps & IDispatchProps;

const RaceSettingsRework: React.FC<MyProps> = ({
  settings,
  raceData,
  carData,
  trackData,
  setAutoRepair,
  setStrategy,
  setCar,
  setTrack,
  updateCar,
  updateTrack,

  setRaceStartReal,
  setRaceStartSim,
  setDuration,
  setName,
  setStintEditMode,
  setTimeDisplayMode,
  reset,
}: MyProps) => {
  const handleSampleMenu = (param: MenuInfo) => {
    setDuration(parseInt(param.key as string));
  };

  const durationTemplates = (
    <Menu onClick={handleSampleMenu}>
      <Menu.Item key="60">60 min</Menu.Item>
      <Menu.Item key="360">6 h</Menu.Item>
      <Menu.Item key="720">12 h</Menu.Item>
      <Menu.Item key="1440">24 h</Menu.Item>
    </Menu>
  );
  return (
    <Row gutter={0}>
      <Col span={6}>
        <Card title="Common" size="small">
          <Row gutter={8}>
            <Col span={8} style={{ textAlign: "right" }}>
              Name
            </Col>
            <Col span={16}>
              <RaceName name={raceData.name} setName={setName} />
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={8} style={{ textAlign: "right" }}>
              Duration
            </Col>
            <Col className="full-width" span={16}>
              <Input.Group className="istint-settings-common">
                <DurationInput durationMin={raceData.duration} setDuration={setDuration} />
                <Dropdown overlay={durationTemplates}>
                  <Button>
                    Samples
                    <DownOutlined />
                  </Button>
                </Dropdown>
              </Input.Group>
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={6}>
        <Card title="Start" size="small">
          <Row gutter={8}>
            <Col span={8} style={{ textAlign: "right" }}>
              Real
            </Col>
            <Col span={16}>
              <RaceStartSelect time={raceData.startReal} setDate={setRaceStartReal} />
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={8} style={{ textAlign: "right" }}>
              Simulation
            </Col>
            <Col span={16}>
              <RaceStartSelect time={raceData.startSim} setDate={setRaceStartSim} />
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={6}>
        <TrackEditCard tracks={trackData} raceData={raceData} setTrack={setTrack} updateTrack={updateTrack} />
        {/* <Card title="Track" size="small">
          <TrackSelect current={raceData.track} tracks={trackData.allTracks} selectTrack={setTrack} />
        </Card> */}
      </Col>
      <Col span={6}>
        <CarEditCard cars={carData} raceData={raceData} setCar={setCar} updateCar={updateCar} />
      </Col>
    </Row>
    // <Descriptions column={4} title="Race settings">
    //   <Descriptions.Item label="">
    //     <RaceName name={raceData.name} setName={setName} />
    //   </Descriptions.Item>
    //   <Descriptions.Item label="">
    //     <DurationInput durationMin={raceData.duration} setDuration={setDuration} />
    //   </Descriptions.Item>
    //   <Descriptions.Item>
    //     <RaceStartSelect label="Race start (real)" time={raceData.startReal} setDate={setRaceStartReal} />
    //   </Descriptions.Item>

    //   <Descriptions.Item>
    //     <RaceStartSelect label="Race start (sim)" time={raceData.startSim} setDate={setRaceStartSim} />
    //   </Descriptions.Item>

    //   <Descriptions.Item label="Stint-Auto-Repair">
    //     <Switch checked={settings.autoRepair} onChange={setAutoRepair} />
    //   </Descriptions.Item>
    //   <Descriptions.Item label="Strategy">
    //     <RaceStrategySelect current={settings.strategy} selectStrategy={setStrategy} />
    //   </Descriptions.Item>
    //   <Descriptions.Item label="Car">
    //     <CarSelect current={raceData.car} cars={carData.allCars} selectCar={setCar} />
    //   </Descriptions.Item>
    //   <Descriptions.Item label="Track">
    //     <TrackSelect current={raceData.track} tracks={trackData.allTracks} selectTrack={setTrack} />
    //   </Descriptions.Item>
    //   <Descriptions.Item label="">
    //     <Button onClick={reset}>Reset</Button>
    //   </Descriptions.Item>
    //   <Descriptions.Item label="">
    //     <StintEditModeSelect current={settings.stintEditMode} selectStintEditMode={setStintEditMode} />
    //   </Descriptions.Item>
    //   <Descriptions.Item label="">
    //     <TimeDisplayModeSelect current={settings.timeDisplayMode} selectTimeDisplayMode={setTimeDisplayMode} />
    //   </Descriptions.Item>
    // </Descriptions>
  );
};

export default RaceSettingsRework;

// 22:24
