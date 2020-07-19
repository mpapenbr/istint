import { Col, Row } from "antd";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DriverDetail from "../components/driver/driverDetail";
import DriverMaster from "../components/driver/driverMaster";
import { addNewDriver, removeDriver, updateDriver } from "../stores/driver/actions";
import { IDriver } from "../stores/driver/types";
import { ApplicationState } from "../stores/index";

const DriverMasterDetailContainer: React.FC = () => {
  const dispatch = useDispatch();
  const [editDriver, setEditDriver] = useState(-1);
  const stateToProps = useSelector(({ driver }: ApplicationState) => ({}));
  const driverData = useSelector(({ driver }: ApplicationState) => ({ ...driver }.allDrivers));

  const dispatchToProps = {
    driverSelected: (id: number) => {
      setEditDriver(id);
    },
    updateDriver: useCallback((d: IDriver) => dispatch(updateDriver(d)), [dispatch]),
    removeDriver: useCallback((id: number) => dispatch(removeDriver(id)), [dispatch]),
    addNewDriver: useCallback(() => dispatch(addNewDriver()), [dispatch]),
  };

  const detailPart = () => {
    if (editDriver === -1) {
      return <span>No driver selected</span>;
    }
    const idx = driverData.findIndex((d) => d.id === editDriver);
    if (idx === -1) {
      return <span>driver with id {editDriver} not found</span>;
    }
    // console.log({ ...driverData[idx] });
    return <DriverDetail data={driverData[idx]} {...dispatchToProps} />;
  };
  return (
    <Row>
      <Col span={4}>
        <DriverMaster {...stateToProps} {...dispatchToProps} />
      </Col>
      <Col span={8}>{detailPart()}</Col>
    </Row>
  );
};

export default DriverMasterDetailContainer;
