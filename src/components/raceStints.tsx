import { CheckCircleOutlined, MenuOutlined, WarningOutlined } from "@ant-design/icons";
import { Checkbox, Form, Input, InputNumber, Table, Tooltip } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import classNames from "classnames";
import _ from "lodash";
import React, { useContext, useEffect, useRef, useState } from "react";
import { SortableContainer, SortableElement, SortableHandle } from "react-sortable-hoc";
import { sprintf } from "sprintf-js";
import { IModifyStintParam, IMoveStint, ITimedRace } from "../stores/race/types";
import { ISettings, StintEditMode, TimeDisplayMode } from "../stores/settings/types";
import { IPitTime, IStintProblem, Stint } from "../stores/stint/types";
import { lapTimeString, secAsString } from "../utils/output";
import "./raceStints.css";
import DroppableStint from "./stint/droppableStint";
import PitToolTip from "./stint/pitToolTip";
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
  settings: ISettings;
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
  // console.log(props);
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
    // console.log({ e }, { values });
    toggleEdit();
    const x = _.merge(record, values);
    // console.log({ x });
    handleSave(x);
  };

  const saveNoToggle = async (e: any) => {
    try {
      console.log({ e });
      const values = await form.validateFields();
      const x = _.merge(record, values);
      if (handleSaveSingle !== undefined) {
        // console.log("handleSaveSingle called");
        handleSaveSingle(record.no, e);
      } else {
        // console.log("Standard handleSave called");
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

  var components;
  switch (props.settings.stintEditMode) {
    case StintEditMode.MoveRows:
      components = componentsDragable;
      break;
    case StintEditMode.EditRow:
    default:
      components = componentsEditable;
  }
  //const components = componentsEditable;

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

  const TireChangeBox: React.FC<IDisplayStint> = (data: IDisplayStint) => {
    const handleChange = (e: CheckboxChangeEvent) => {
      props.updateTireRequest(data.no, e.target.checked);
    };
    return <Checkbox checked={data.wantNewTires} onChange={handleChange} />;
  };
  const timeRangeSelector = () => {
    switch (props.settings.timeDisplayMode) {
      case TimeDisplayMode.Sim:
        return "simTime";
      default:
        return "realTime";
    }
  };

  var columns = [
    {
      title: "Sort",
      dataIndex: "no",
      className: "drag-visible",
      editable: false,
      width: 30,
      render: () => <DragHandle />,
    },
    { title: "#", dataIndex: "no", className: "drag-visible", editable: false },
    {
      title: "Driver",
      dataIndex: ["driver", "name"],
      className: "drag-visible",
      editable: false,

      render: (d: string, record: IDisplayStint) => <DroppableStint no={record.no}>{d}</DroppableStint>,
    },
    {
      title: "Laps",
      dataIndex: "numLaps",
      editable: true,
      columHandleSave: props.updateNumLaps,
      inputElementProvider: (props: any) => <InputNumber {...props} min={0} />,
      className: "drag-visible",
    },
    {
      title: "Total",
      dataIndex: ["rollingData", "elapsedLaps"],
      editable: false,
    },
    {
      title: "Avg",
      dataIndex: ["driver", "baseLaptime"],
      render: (t: number) => lapTimeString(t),
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
      dataIndex: [timeRangeSelector(), "start"],
      editable: false,
      render: (d: Date) => d.toLocaleTimeString(),
    },
    {
      title: "Duration",
      dataIndex: "duration",
      editable: false,
      render: (t: number) => secAsString(t),
    },
    {
      title: "End",
      dataIndex: [timeRangeSelector(), "end"],
      editable: false,
      render: (d: Date) => d.toLocaleTimeString(),
    },
    {
      title: "Fuel",
      dataIndex: "fuel",
      editable: false,
      render: (f: number) => sprintf("%0.2f", f),
    },
    {
      title: "Tires",
      dataIndex: "wantNewTires",
      editable: false,
      render: (b: boolean, record: IDisplayStint) => <TireChangeBox {...record} />,
    },
    {
      title: "Pit",
      dataIndex: ["pitTime"],
      editable: false,
      render: (d: IPitTime) => <PitToolTip {...d} />,
    },
    {
      title: "Info",
      dataIndex: ["problems"],
      editable: false,
      render: (p: IStintProblem[]) => renderStintProblems(p),
    },
  ];

  if (props.settings.stintEditMode === StintEditMode.EditRow) {
    // in EditRow-Mode we don't need the sort handle column
    columns = _.slice(columns, 1);
  }
  const cellColumns = columns.map((col) => {
    const wantEdit = props.settings.stintEditMode === StintEditMode.EditRow && col.editable;
    if (!wantEdit) {
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

  // https://www.npmjs.com/package/classnames ausprobieren zur dyn. Generierung von driverClass-CSS (mit backgroundColor)
  const myRowKey = (item: IDisplayStint) => item.no - 1; // easier for table move ops
  const enhancedStints: IDisplayStint[] = props.raceData.stints.map((v, i) => ({
    ...v,
    no: i + 1,
  }));

  enhancedStints.forEach((s) => {
    classNames(sprintf("stint_%d", s.no), { backgroundColor: "lightblue" });
  });
  return (
    <>
      <Table
        pagination={false}
        components={components}
        columns={cellColumns}
        dataSource={enhancedStints}
        rowClassName={(s: IDisplayStint) => sprintf("editable-row stint-row driver-%d", s.driver.id)}
        rowKey={myRowKey}
      />
    </>
  );
};

export default RaceStints;

// 22:24
