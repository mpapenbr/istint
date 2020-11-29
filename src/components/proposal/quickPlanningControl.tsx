import { Card, Col, Form, InputNumber, Row, Slider } from "antd";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../stores";
import { TireChangeMode } from "../../stores/car/types";
import { defaultDriver } from "../../stores/driver/types";
import { recomputeRaceStints } from "../../stores/race/compute";
import { computeFreshRace } from "../../stores/race/proposals";
import { RaceStrategyMode, Stint } from "../../stores/stint/types";
import QuickStintTable from "./quickStintTable";

interface IStateProps {
  // settings: ISettings;
  // fuelPerLap: number;
  // baseLaptime: number;
  // doubleStintAdd: number;
}
interface IDispatchProps {
  // setStrategy: (data: number) => void;
  // setFuelPerLap: (d: any) => any;
  // setBaseLaptime: (d: any) => any;
  // setDoubleStintAdd: (d: any) => any;
  // computeProposal: () => any;
}

type MyProps = IStateProps & IDispatchProps;

const QuickPlanningControl: React.FC<MyProps> = (props: MyProps) => {
  const car = useSelector(({ race }: ApplicationState) => race.data.car);
  const carTank = useSelector(({ race }: ApplicationState) => race.data.car.tank);
  const raceData = useSelector(({ race }: ApplicationState) => race.data);

  const currentDriver = useSelector(({ driver }: ApplicationState) => _.first(driver.allDrivers));
  const [driver, setDriver] = useState(currentDriver !== undefined ? currentDriver : defaultDriver);
  const [tank, setTank] = useState(carTank);
  const [fuelPerLap, setFuelPerLap] = useState(3);
  const [laptime, setLaptime] = useState(90);
  const [raceDuration, setRaceDuration] = useState(raceData.duration);
  const laps = Math.floor(tank / fuelPerLap);
  const doubleStintDelta = (calcLaps: number) => {
    return car.tireChangeMode === TireChangeMode.AFTER_REFILL ? car.tireChangeTime / calcLaps : 0;
  };

  const [stints, setStints] = useState<Stint[]>([]);

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  var mins = { fuelPerLap: 0.1, laptime: 0.1 };
  var maxs = { tank: 130, fuelPerLap: 15, laptime: 720 };
  var defaultValues = { fuelPerLap: 3, laptime: 90 };

  const fuelPerLapData = () => {
    return driver !== undefined
      ? { min: driver.fuelPerLap - 1, max: driver.fuelPerLap + 1, standard: driver.fuelPerLap }
      : { min: 0.1, max: 15, standard: 4.0 };
  };
  const laptimeData = () => {
    return driver !== undefined
      ? { min: driver.baseLaptime * 0.95, max: driver.baseLaptime * 1.05, standard: driver.baseLaptime }
      : { min: 0.1, max: 720, standard: 89 };
  };

  useEffect(() => {
    const driver = currentDriver !== undefined ? currentDriver : defaultDriver;
    setFuelPerLap(driver.fuelPerLap);
    setLaptime(driver.baseLaptime);
  }, [currentDriver]);

  useEffect(() => {
    const computeDriver = { ...driver, baseLaptime: laptime, fuelPerLap: fuelPerLap };
    // console.log({ computeDriver });
    const myRaceData = { ...raceData, duration: raceDuration };
    const rawComputedStints = computeFreshRace(myRaceData, [computeDriver], RaceStrategyMode.DOUBLE_STINT);
    const computedStints = recomputeRaceStints({ ...myRaceData, stints: rawComputedStints });
    // console.log(x);
    setStints(computedStints);
  }, [fuelPerLap, laptime, driver, raceData, raceDuration]);

  interface ITestProps {
    setValue: (v: number) => void;
    currentValue: number;
  }
  const Test: React.FC<ITestProps> = (myProps: ITestProps) => {
    const myChange = (v: number) => {
      console.log(v);
      myProps.setValue(v);
    };
    return (
      <Form.Item label="Fuel/Lap">
        <Form.Item style={{ display: "inline-block", width: "70%", marginRight: "8px" }}>
          <Slider
            style={{ marginLeft: "4px" }}
            min={1}
            max={10}
            value={myProps.currentValue}
            defaultValue={3}
            step={0.1}
            onChange={myChange}
          />
        </Form.Item>
        {/* <Form.Item style={{ display: "inline-block", width: "calc(30% - 8px)", margin: "0px" }}>
          <InputNumber />
        </Form.Item> */}
      </Form.Item>
    );
  };

  const Test2: React.FC<ITestProps> = (myProps: ITestProps) => {
    const myChange = (v: number) => {
      console.log(v);
      myProps.setValue(v);
    };
    return (
      <Form.Item label="Fuel/Lap">
        <Slider
          style={{ marginLeft: "4px" }}
          min={1}
          max={10}
          value={myProps.currentValue}
          defaultValue={3}
          step={0.1}
          onChange={myChange}
        />
      </Form.Item>
    );
  };

  return (
    <Row>
      <Col span={8}>
        <Card title="Quick plan settings">
          <Form {...layout}>
            <Test2 setValue={setFuelPerLap} currentValue={fuelPerLap} />
            <Test setValue={setFuelPerLap} currentValue={fuelPerLap} />
            <Form.Item label="Fuel/Lap">
              <Slider
                style={{ marginLeft: "4px" }}
                min={fuelPerLapData().min}
                max={fuelPerLapData().max}
                value={fuelPerLap}
                defaultValue={3}
                step={0.1}
                onChange={setFuelPerLap}
              />
            </Form.Item>

            <Form.Item label="Fuel/Lap">
              <Form.Item style={{ display: "inline-block", width: "70%", marginRight: "8px" }}>
                <Slider
                  style={{ marginLeft: "4px" }}
                  min={fuelPerLapData().min}
                  max={fuelPerLapData().max}
                  value={fuelPerLap}
                  defaultValue={3}
                  step={0.1}
                  onChange={setFuelPerLap}
                />
              </Form.Item>
              <Form.Item style={{ display: "inline-block", width: "calc(30% - 8px)", margin: "0px" }}>
                <InputNumber />
              </Form.Item>
            </Form.Item>
            <Form.Item label="Laptime">
              <Slider
                min={laptimeData().min}
                max={laptimeData().max}
                value={laptime}
                defaultValue={laptimeData().standard}
                step={0.1}
                onChange={setLaptime}
              />
              <InputNumber />
            </Form.Item>

            <Form.Item label="Race time">
              <Slider
                min={1}
                max={raceData.duration}
                value={raceDuration}
                defaultValue={raceData.duration}
                step={1}
                onChange={setRaceDuration}
              />
              <InputNumber
                // style={{ width: "inherit" }}
                min={1}
                max={raceDuration}
                step={1}
                value={raceDuration}
                // onChange={setRaceDuration}
              />
            </Form.Item>
          </Form>
        </Card>
      </Col>
      <Col>
        <Card title="Quick plan">
          <QuickStintTable raceDurationSecs={raceDuration * 60} stints={stints} />
        </Card>
      </Col>
    </Row>
  );
};

export default QuickPlanningControl;

// 22:24
