import { TableOutlined } from "@ant-design/icons";
import { Button, Card, Col, InputNumber, Row } from "antd";
import React from "react";
import { ISettings } from "../../stores/settings/types";
import RaceStrategySelect from "../strategySelect";

interface IStateProps {
  settings: ISettings;
  fuelPerLap: number;
  baseLaptime: number;
}
interface IDispatchProps {
  setStrategy: (data: number) => void;
  setFuelPerLap: (d: any) => any;
  setBaseLaptime: (d: any) => any;
  computeProposal: () => any;
}

type MyProps = IStateProps & IDispatchProps;

const QuickProposal: React.FC<MyProps> = (props: MyProps) => {
  return (
    <Row gutter={8}>
      <Col span={4}>
        <Card title="Strategy" size="small">
          <Row gutter={8} justify="start">
            {/* <Col flex="75px" style={{ textAlign: "right" }}>
              Strategy
            </Col> */}
            <Col className="full-width" flex="inherit">
              <RaceStrategySelect current={props.settings.strategy} selectStrategy={props.setStrategy} />
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={4}>
        <Card title="Parameters" size="small">
          <Row gutter={0}>
            <Col span={24}>
              <Row gutter={8}>
                <Col flex="75px" style={{ textAlign: "right" }}>
                  Fuel/Lap
                </Col>
                <Col className="xfull-width" flex="inherit">
                  <InputNumber
                    prefix="Fuel"
                    min={0}
                    max={20}
                    step={0.1}
                    value={props.fuelPerLap}
                    onChange={props.setFuelPerLap}
                  />
                </Col>
              </Row>
              <Row gutter={8}>
                <Col flex="75px" style={{ textAlign: "right" }}>
                  Laptime
                </Col>
                <Col className="xfull-width" span={4}>
                  <InputNumber
                    prefix="Time"
                    min={0}
                    max={720}
                    step={0.1}
                    value={props.baseLaptime}
                    onChange={props.setBaseLaptime}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={4}>
        <Card title="Action" size="small">
          <Button icon={<TableOutlined />} onClick={props.computeProposal}>
            Compute
          </Button>
        </Card>
      </Col>
    </Row>
  );
};

export default QuickProposal;

// 22:24
