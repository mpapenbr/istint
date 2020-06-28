import { MenuOutlined } from "@ant-design/icons";
import { Table } from "antd";
import React from "react";
import { SortableContainer, SortableElement, SortableHandle } from "react-sortable-hoc";
interface IStateProps {}
type MyProps = IStateProps;

/* not used by now, but kept here for experiments */
const DragHandle = SortableHandle(() => <MenuOutlined style={{ cursor: "pointer", color: "#999" }} />);

const columns = [
  {
    title: "Sort",
    dataIndex: "sort",
    width: 30,
    className: "drag-visible",
    render: (a: any, b: any) => <DragHandle />,
  },
  {
    title: "Name",
    dataIndex: "name",
    className: "drag-visible",
  },
  {
    title: "Age",
    dataIndex: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    index: 0,
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    index: 1,
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    index: 2,
  },
];
const SortableItem = SortableElement((props: any) => <tr {...props} />);
const MySortableContainer = SortableContainer((props: any) => <tbody {...props} />);
//const DragableBodyRow = ({ index, className, style, ...restProps }) => (
const DragableBodyRow = ({ ...restProps }) => <SortableItem index={restProps["data-row-key"]} {...restProps} />;
const onSortEnd = (oldIndex: any, newIndex: any) => {
  console.log(oldIndex);
  console.log(newIndex);
};
const TestTable: React.FC<MyProps> = (props: MyProps) => {
  const dataSource = data;
  const DraggableContainer = (props: any) => (
    <MySortableContainer useDragHandle helperClass="row-dragging" onSortEnd={onSortEnd} {...props} />
  );
  return (
    <Table
      pagination={false}
      dataSource={dataSource}
      columns={columns}
      rowKey="index"
      components={{
        body: {
          wrapper: DraggableContainer,
          row: DragableBodyRow,
        },
      }}
    />
  );
};
export default TestTable;
