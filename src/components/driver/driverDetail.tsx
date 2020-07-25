import { Button, Card, Form, Input, InputNumber } from "antd";
import { Store } from "antd/lib/form/interface";
import React from "react";
import { IDriver } from "../../stores/driver/types";
// import "./compact-stints.css";

interface IStateProps {
  data: IDriver;
}
interface IDispatchProps {
  updateDriver: (d: IDriver) => void;
}
type MyProps = IStateProps & IDispatchProps;

const DriverDetail: React.FC<MyProps> = (props: MyProps) => {
  const [form] = Form.useForm();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = (values: Store) => {
    //const toUpdate = { ...props.data, ...values };
    // const { backgroundColorForm } = values;
    // console.log(backgroundColorForm.hex);
    // const toUpdate = { ...props.data, ...values, backgroundColorForm: {}, backgroundColor: backgroundColorForm.hex };
    const toUpdate = { ...props.data, ...values };
    console.log({ ...toUpdate });
    props.updateDriver(toUpdate);
  };
  form.setFieldsValue(props.data);
  return (
    <Card title="Driver data" size="small">
      <Form {...layout} form={form} onFinish={onFinish}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="fuelPerLap" label="Fuel per lap" rules={[{ required: true }]}>
          <InputNumber
            prefix="Fuel"
            min={0}
            max={20}
            step={0.1}

            // onChange={props.setFuelPerLap}
          />
        </Form.Item>
        <Form.Item name="baseLaptime" label="Base laptime" rules={[{ required: true }]}>
          <InputNumber
            min={0}
            max={720}
            step={0.1}

            // onChange={props.setFuelPerLap}
          />
        </Form.Item>
        <Form.Item name="doubleStintAdd" label="Double stint+" rules={[{ required: true }]}>
          <InputNumber
            min={0}
            max={5}
            step={0.1}

            // onChange={props.setFuelPerLap}
          />
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
    </Card>
  );
};
export default DriverDetail;
