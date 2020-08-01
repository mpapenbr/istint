import { ReloadOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import React from "react";
import ExportButton from "../exportButton";
import ImportButton from "../importButton";

interface IStateProps {}
interface IDispatchProps {
  reset: () => any;
}

type MyProps = IStateProps & IDispatchProps;

const OtherSettings: React.FC<MyProps> = (props: MyProps) => {
  return (
    <Row gutter={8}>
      <Col span={4}>
        <Card title="Action" size="small">
          <Button icon={<ReloadOutlined />} onClick={props.reset}>
            Reset
          </Button>
        </Card>
      </Col>
      <Col span={4}>
        <Card title="Exchange" size="small">
          <ExportButton />
          <ImportButton />
        </Card>
      </Col>
    </Row>
  );
};

export default OtherSettings;

// 22:24
