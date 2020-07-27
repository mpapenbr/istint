import { Card, Col, Row, Slider, Statistic, Table } from "antd";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { sprintf } from "sprintf-js";
import { ApplicationState } from "../../stores";
import { lapTimeString, secAsMMSS } from "../../utils/output";

interface IData {
  key: number;
  laps: number;
  fuel: number;
}
const FuelInfo: React.FC<{}> = () => {
  const carTank = useSelector(({ race }: ApplicationState) => race.data.car.tank);
  const driver = useSelector(({ driver }: ApplicationState) => _.first(driver.allDrivers));
  const [tank, setTank] = useState(carTank);
  const [fuelPerLap, setFuelPerLap] = useState(3);
  const [laptime, setLaptime] = useState(90);
  const laps = Math.floor(tank / fuelPerLap);
  const data = _.range(laps - 1, laps + 2).map((l) => ({ key: l, laps: l, fuel: tank / l, time: l * laptime }));
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
  return (
    <Row>
      <Col span={8}>
        <Card>
          <Slider min={mins.tank} max={maxs.tank} value={tank} defaultValue={defaultValues.tank} onChange={setTank} />
          <Slider
            min={fuelPerLapData().min}
            max={fuelPerLapData().max}
            value={fuelPerLap}
            defaultValue={3}
            step={0.1}
            onChange={setFuelPerLap}
          />
          <Slider
            min={laptimeData().min}
            max={laptimeData().max}
            value={laptime}
            defaultValue={laptimeData().standard}
            step={0.1}
            onChange={setLaptime}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Row gutter={4}>
            <Col>
              <Statistic title="Tank" value={tank} />
            </Col>
            <Col>
              <Statistic title="Fuel/lap" value={fuelPerLap} />
            </Col>
            <Col>
              <Statistic title="Laps" value={laps} />
            </Col>
            <Col>
              <Statistic title="Laptime" value={lapTimeString(laptime)} />
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={8}>
        <Table
          pagination={false}
          columns={[
            { title: "Laps", key: "laps", dataIndex: "laps" },
            { title: "Fuel/Lap", key: "fuel", dataIndex: "fuel", render: (v) => sprintf("%.2f", v) },
            { title: "Time", key: "time", dataIndex: "time", render: (v) => secAsMMSS(v) },
          ]}
          dataSource={data}
        />
      </Col>
    </Row>
  );
};

export default FuelInfo;
