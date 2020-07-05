import { Col, Row } from "antd";
import React from "react";
import { ISettings } from "../../stores/settings/types";
import TopLabel from "../topLabel";
import StintEditModeSelect from "./stintEditModeSelect";
import TimeDisplayModeSelect from "./timeDisplayModeSelect";

interface IStateProps {
  settings: ISettings;
}

interface IDispatchProps {
  setStintEditMode: (id: number) => any;
  setTimeDisplayMode: (id: number) => any;
}
type MyProps = IStateProps & IDispatchProps;

const StintTableControls: React.FC<MyProps> = (props: MyProps) => {
  return (
    <Row gutter={4}>
      <Col>
        <TopLabel
          label="Edit mode"
          content={
            <StintEditModeSelect current={props.settings.stintEditMode} selectStintEditMode={props.setStintEditMode} />
          }
        />
      </Col>
      <Col>
        <TopLabel
          label="Time"
          content={
            <TimeDisplayModeSelect
              current={props.settings.timeDisplayMode}
              selectTimeDisplayMode={props.setTimeDisplayMode}
            />
          }
        />
      </Col>
    </Row>
  );
};
export default StintTableControls;
