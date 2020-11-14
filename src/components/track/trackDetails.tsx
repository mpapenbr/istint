import { Button, Form, Input, InputNumber } from "antd";
import React, { useEffect } from "react";
import { Store } from "redux";
import "../../App.css";
import { ITrack } from "../../stores/track/types";

interface IStateProps {
  data: ITrack;
}
interface IDispatchProps {
  // setCar: (id: number) => void;
  updateTrackData: (data: ITrack) => void;
}

type MyProps = IStateProps & IDispatchProps;

const TrackDetails: React.FC<MyProps> = (props: MyProps) => {
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
    props.updateTrackData(toUpdate);
  };
  useEffect(() => form.setFieldsValue(props.data));
  return (
    <Form className="istint-form" {...layout} form={form} onFinish={onFinish}>
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="pitDelta"
        label="Pit delta"
        tooltip="Contains the amount of seconds you will lose when doing a pit stop (without actions during the pitstop)."
        rules={[{ required: true }]}
      >
        <InputNumber
          min={0}
          max={90}
          step={1}

          // onChange={props.setFuelPerLap}
        />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TrackDetails;
