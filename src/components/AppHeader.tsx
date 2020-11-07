import { Col, Row } from "antd";
import React from "react";
import UserInfo from "./user/userInfo";

const AppHeader: React.FC<{}> = () => {
  return (
    <>
      <Row align="middle">
        <Col flex={2} />
        <Col flex={4}>
          <h1>iStint</h1>
        </Col>
        <Col flex={2}>
          <UserInfo />
        </Col>
      </Row>
    </>
  );
};

export default AppHeader;
