import { Button, Form, Input, InputNumber, Select } from "antd";
import React, { useEffect } from "react";
import { Store } from "redux";
import "../../App.css";
import { ICar, TireChangeMode } from "../../stores/car/types";

interface IStateProps {
  data: ICar;
}
interface IDispatchProps {
  // setCar: (id: number) => void;
  updateCarData: (data: ICar) => void;
}

type MyProps = IStateProps & IDispatchProps;

const CarDetails: React.FC<MyProps> = (props: MyProps) => {
  const [form] = Form.useForm();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = (values: Store) => {
    const toUpdate = { ...props.data, ...values };
    // const { backgroundColorForm } = values;
    // console.log(backgroundColorForm.hex);
    // const toUpdate = { ...props.data, ...values, backgroundColorForm: {}, backgroundColor: backgroundColorForm.hex };
    // const toUpdate = { ...props.data, ...values };
    console.log({ ...toUpdate });
    props.updateCarData(toUpdate);
  };
  useEffect(() => form.setFieldsValue(props.data));
  return (
    <Form className="istint-form" {...layout} form={form} onFinish={onFinish}>
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="tank" label="Tank" rules={[{ required: true }]}>
        <InputNumber
          // prefix="Fuel"
          min={0}
          max={150}
          step={1}

          // onChange={props.setFuelPerLap}
        />
      </Form.Item>
      <Form.Item
        name="refillRate"
        label="Refill rate"
        tooltip="How many liters get pumped into the tank per second"
        rules={[{ required: true }]}
      >
        <InputNumber
          min={0}
          max={5}
          precision={2}
          step={0.1}

          // formatter={(value) => sprintf("%.2f", value)}
          // onChange={props.setFuelPerLap}
        />
      </Form.Item>
      <Form.Item
        name="tireChangeTime"
        label="Tire change"
        tooltip="Time in seconds to change all 4 tires"
        rules={[{ required: true }]}
      >
        <InputNumber
          min={0}
          max={30}
          step={0.1}

          // onChange={props.setFuelPerLap}
        />
      </Form.Item>
      <Form.Item
        name="tireChangeMode"
        label="Change point"
        tooltip="Shows when the tire change will be done during pitstop."
        rules={[{ required: true }]}
      >
        <Select>
          <Select.Option value={TireChangeMode.DURING_REFILL}>During refueling</Select.Option>
          <Select.Option value={TireChangeMode.AFTER_REFILL}>After refueling</Select.Option>
        </Select>
      </Form.Item>

      {/* <Form.Item name="backgroundColorForm" label="Color">
          <CompactPicker color={props.data.backgroundColor} />
        </Form.Item> */}

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CarDetails;
