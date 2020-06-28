import { CheckCircleOutlined, MenuOutlined, WarningOutlined } from "@ant-design/icons";
import { Checkbox, Form, Input, InputNumber, Table, Tooltip } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import _ from "lodash";
import React, { useContext, useEffect, useRef, useState } from "react";
import { SortableContainer, SortableElement, SortableHandle } from "react-sortable-hoc";
import { sprintf } from "sprintf-js";
import { IModifyStintParam, IMoveStint, ITimedRace } from "../stores/race/types";
import { IPitTime, IStintProblem, Stint } from "../stores/stint/types";
import { secAsString } from "../utils/output";

export interface IDispatchToProps {
  updateStint: (param: IModifyStintParam) => void;
  updateNumLaps: (stintNo: number, value: number) => void;
  updateFuelPerLap: (stintNo: number, value: number) => void;
  updateLaptime: (stintNo: number, value: number) => void;
  updateTireRequest: (stintNo: number, value: boolean) => void;
  moveStint: (param: IMoveStint) => void;
}
interface IStateToProps {
  raceData: ITimedRace;
}

type MyProps = IDispatchToProps & IStateToProps;

// TODO: kann weg, Stint hat inzwischen no attr
interface IDisplayStint extends Stint {
  no: number;
}

interface EditableRowProps {
  index: number;
}

interface IIndexable {
  [key: string]: any;
}

const SortableItem = SortableElement((props: any) => <tr {...props} />);
const DragableBodyRow = ({ ...restProps }) => {
  //console.log(restProps["data-row-key"]);
  // console.log({ restProps });
  return <SortableItem index={restProps["data-row-key"]} {...restProps} />;
};
const DragHandle = SortableHandle(() => <MenuOutlined style={{ cursor: "pointer", color: "#999" }} />);

const EditableContext = React.createContext<any>(null);

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: string | string[];
  record: IDisplayStint;
  inputElementProvider: (props: any) => React.ReactNode;
  handleSave: (record: IDisplayStint) => void;
  handleSaveSingle: (stintNo: number, value: number) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  handleSaveSingle,
  inputElementProvider,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<Input>(null);

  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      if (inputRef && inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    // console.log("blödes problem lösen")
    //console.log("the join:", dataIndex instanceof Array ? _.join(dataIndex, '.') : dataIndex)
    const x = _.pick(record, dataIndex instanceof Array ? _.join(dataIndex, ".") : dataIndex);
    // console.log(dataIndex, {x})
    form.setFieldsValue(x);
  };
  const save = async (e: any) => {
    const values = await form.validateFields();
    console.log({ e }, { values });
    toggleEdit();
    const x = _.merge(record, values);
    console.log({ x });
    handleSave(x);
  };

  const saveNoToggle = async (e: any) => {
    try {
      console.log({ e });
      const values = await form.validateFields();
      const x = _.merge(record, values);
      if (handleSaveSingle !== undefined) {
        console.log("handleSaveSingle called");
        handleSaveSingle(record.no, e);
      } else {
        console.log("Standard handleSave called");
        handleSave(x);
      }
    } catch (e) {
      console.log("Error");
      console.log(e);
    }
  };

  let childNode = children;
  if (editable) {
    const inp = <InputNumber ref={inputRef} onPressEnter={save} onBlur={save} />;
    const inpt = inputElementProvider
      ? inputElementProvider({
          ref: inputRef,
          onPressEnter: save,
          onBlur: toggleEdit,
          onChange: saveNoToggle,
        })
      : inp;
    childNode = editing ? (
      <Form.Item style={{ margin: 0 }} name={dataIndex}>
        {inpt}
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

const RaceStints: React.FC<MyProps> = (props: MyProps) => {
  // race.stints[].
  const MySortableContainer = SortableContainer((props: any) => <tbody {...props} />);
  interface IOnSortData {
    oldIndex: number;
    newIndex: number;
  }
  const onSortEnd = ({ oldIndex, newIndex }: IOnSortData) => {
    props.moveStint({ oldIndex: oldIndex, newIndex: newIndex });
  };
  const DraggableContainer = (props: any) => (
    <MySortableContainer useDragHandle={true} helperClass="row-dragging" onSortEnd={onSortEnd} {...props} />
  );
  const componentsDragable = {
    body: {
      row: DragableBodyRow,
      cell: EditableCell,
      wrapper: DraggableContainer,
    },
  };
  const componentsEditable = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const components = componentsEditable;

  const renderStintProblems = (probs: IStintProblem[]) => {
    if (probs.length === 0) {
      return <CheckCircleOutlined style={{ color: "green" }} />;
    } else {
      return (
        <Tooltip title={probs[0].msg}>
          <WarningOutlined style={{ color: "red" }} />
        </Tooltip>
      );
    }
  };

  const renderPitTime = (data: IPitTime) => {
    const DetailTable: React.FC<IPitTime> = (localProps: IPitTime) => (
      <>
        <span>Pit stop details</span>
        <table>
          <tbody>
            <tr>
              <td align="left">Pit delta</td>
              <td>{sprintf("%.1f", localProps.pitDelta)}</td>
            </tr>
            <tr>
              <td>Refill</td>
              <td>{sprintf("%.1f", localProps.refill)}</td>
            </tr>
            <tr>
              <td>Driver</td>
              <td>{sprintf("%.1f", localProps.driverChange)}</td>
            </tr>
            <tr>
              <td>Tires</td>
              <td>{sprintf("%.1f", localProps.changeTires)}</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>{sprintf("%.1f", localProps.total)}</td>
            </tr>
          </tbody>
        </table>
      </>
    );
    return (
      <Tooltip title={DetailTable(data)}>
        <span>{secAsString(data.total)}</span>
      </Tooltip>
    );
  };

  const TireChangeBox: React.FC<IDisplayStint> = (data: IDisplayStint) => {
    const handleChange = (e: CheckboxChangeEvent) => {
      props.updateTireRequest(data.no, e.target.checked);
    };
    return <Checkbox checked={data.wantNewTires} onChange={handleChange} />;
  };
  const columns = [
    { title: "Sort", dataIndex: "no", className: "drag-visible", width: 30, render: () => <DragHandle /> },
    { title: "#", dataIndex: "no", className: "drag-visible" },
    { title: "Driver", dataIndex: ["driver", "name"], className: "drag-visible" },
    {
      title: "Laps",
      dataIndex: "numLaps",
      editable: true,
      columHandleSave: props.updateNumLaps,
      inputElementProvider: (props: any) => <InputNumber {...props} min={0} />,
      className: "drag-visible",
    },
    {
      title: "Avg",
      dataIndex: ["driver", "baseLaptime"],
      render: (t: number) => secAsString(t),
      editable: true,
      columHandleSave: props.updateLaptime,
      inputElementProvider: (props: any) => <InputNumber {...props} step={0.1} min={0} />,
    },
    {
      title: "l/Lap",
      dataIndex: ["driver", "fuelPerLap"],
      render: (f: number) => sprintf("%0.2f", f),
      editable: true,
      columHandleSave: props.updateFuelPerLap,
      inputElementProvider: (props: any) => <InputNumber {...props} step={0.1} min={0} />,
    },
    {
      title: "Start",
      dataIndex: ["simTime", "start"],
      render: (d: Date) => d.toLocaleTimeString(),
    },
    {
      title: "Duration",
      dataIndex: "duration",
      render: (t: number) => secAsString(t),
    },
    {
      title: "End",
      dataIndex: ["simTime", "end"],
      render: (d: Date) => d.toLocaleTimeString(),
    },
    {
      title: "Fuel",
      dataIndex: "fuel",
      render: (f: number) => sprintf("%0.2f", f),
    },
    {
      title: "Tires",
      dataIndex: "wantNewTires",
      render: (b: boolean, record: IDisplayStint) => <TireChangeBox {...record} />,
    },
    {
      title: "Pit",
      dataIndex: ["pitTime"],
      render: (d: IPitTime) => renderPitTime(d),
    },
    {
      title: "Info",
      dataIndex: ["problems"],
      render: (p: IStintProblem[]) => renderStintProblems(p),
    },
  ];
  const cellColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: IDisplayStint) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        inputElementProvider: col.inputElementProvider,
        handleSaveSingle: col.columHandleSave,
        handleSave: (record: IDisplayStint) => {
          console.log("inner save", { record });
          const param = {
            no: record.no,
            driver: record.driver,
            numLaps: record.numLaps,
          };
          props.updateStint(param);
        },
      }),
    };
  });
  const myRowKey = (item: IDisplayStint) => item.no - 1; // easier for table move ops
  const enhancedStints: IDisplayStint[] = props.raceData.stints.map((v, i) => ({
    ...v,
    no: i + 1,
  }));
  return (
    <>
      <Table
        components={components}
        columns={cellColumns}
        dataSource={enhancedStints}
        rowClassName={() => "editable-row"}
        rowKey={myRowKey}
      />
    </>
  );
};

export default RaceStints;

// 22:24
