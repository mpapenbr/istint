import { Card, Col, Form, Row, Slider, Space, Statistic, Table, Tooltip } from "antd";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { sprintf } from "sprintf-js";
import { ApplicationState } from "../../stores";
import { TireChangeMode } from "../../stores/car/types";
import { lapTimeString, secAsMMSS } from "../../utils/output";

interface IData {
  key: number;
  laps: number;
  fuel: number;
}
const FuelInfo: React.FC<{}> = () => {
  const car = useSelector(({ race }: ApplicationState) => race.data.car);
  const carTank = useSelector(({ race }: ApplicationState) => race.data.car.tank);

  const driver = useSelector(({ driver }: ApplicationState) => _.first(driver.allDrivers));
  const [tank, setTank] = useState(carTank);
  const [fuelPerLap, setFuelPerLap] = useState(3);
  const [laptime, setLaptime] = useState(90);
  const laps = Math.floor(tank / fuelPerLap);
  const doubleStintDelta = (calcLaps: number) => {
    return car.tireChangeMode === TireChangeMode.AFTER_REFILL ? car.tireChangeTime / calcLaps : 0;
  };
  const data = _.range(laps - 2, laps + 3).map((l) => ({
    key: l,
    laps: l,
    fuel: tank / l,
    time: l * laptime,
    tireChangeSave: doubleStintDelta(l),
    avgTCSpareTime: laptime + doubleStintDelta(l),
  }));
  var mins = { tank: 0, fuelPerLap: 0.1, laptime: 0.1 };
  var maxs = { tank: 130, fuelPerLap: 15, laptime: 720 };
  var defaultValues = { tank: carTank, fuelPerLap: 3, laptime: 90 };
  useEffect(() => {
    setTank(carTank);
  }, [carTank]);
  useEffect(() => {
    setFuelPerLap(driver?.fuelPerLap || 4);
    setLaptime(driver?.baseLaptime || 91);
  }, [driver]);

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

  const ttTCD = (children: any) => (
    <Tooltip title="Time in seconds you can afford to be slower on average per lap during the next stint when not changing tires.">
      {children}
    </Tooltip>
  );
  const ttTCL = (children: any) => (
    <Tooltip title="The average target laptime when not changing tires">{children}</Tooltip>
  );

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  return (
    <Row>
      <Col span={8}>
        <Card>
          <Form {...layout}>
            <Form.Item label="Tank">
              <Slider
                min={mins.tank}
                max={maxs.tank}
                value={tank}
                defaultValue={defaultValues.tank}
                onChange={setTank}
              />
            </Form.Item>
            <Form.Item label="Fuel/lap">
              <Slider
                min={fuelPerLapData().min}
                max={fuelPerLapData().max}
                value={fuelPerLap}
                defaultValue={3}
                step={0.1}
                onChange={setFuelPerLap}
              />
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
            </Form.Item>
          </Form>
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Space size="large">
            <Statistic title="Tank" value={tank} />
            <Statistic title="Fuel/lap" value={fuelPerLap} />
            <Statistic title="Laps" value={laps} />
            <Statistic title="Laptime" value={lapTimeString(laptime)} />

            {ttTCD(<Statistic title="TCD" value={doubleStintDelta(laps)} precision={2} />)}
            {ttTCL(<Statistic title="TCL" value={lapTimeString(laptime + doubleStintDelta(laps))} />)}
          </Space>
        </Card>
      </Col>
      <Col span={8}>
        <Table
          pagination={false}
          columns={[
            { title: "Laps", key: "laps", dataIndex: "laps" },
            { title: "Fuel/Lap", key: "fuel", dataIndex: "fuel", render: (v) => sprintf("%.2f", v) },
            { title: "Time", key: "time", dataIndex: "time", render: (v) => secAsMMSS(v) },
            {
              title: ttTCD("TCD"),
              key: "tireChangeSave",
              dataIndex: "tireChangeSave",
              render: (v) => sprintf("%.2f", v),
            },
            {
              title: ttTCL("TCL"),
              key: "avgTCSpareTime",
              dataIndex: "avgTCSpareTime",
              render: (v) => lapTimeString(v),
            },
          ]}
          dataSource={data}
        />
      </Col>
    </Row>
  );
};

export default FuelInfo;
