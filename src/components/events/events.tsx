import { CopyOutlined, DeleteOutlined, EditOutlined, SearchOutlined, ShareAltOutlined } from "@ant-design/icons";
import { Button, Input, notification, Space, Table, Tooltip } from "antd";
import { ColumnsType } from "antd/lib/table";
import { FilterDropdownProps } from "antd/lib/table/interface";
import copy from "copy-to-clipboard";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { MyEvent } from "../../api/events";

interface IStateProps {
  events: MyEvent[];
}
interface IDispatchProps {
  loadEvent: (eventId: string) => any;
  deleteEvent: (id: string) => any;
  storeAndUpdateEvent: (event: MyEvent) => any;
}

type MyProps = IStateProps & IDispatchProps;

const EventList: React.FC<MyProps> = (props: MyProps) => {
  const onClickForEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.value);
    props.loadEvent(e.currentTarget.value);
  };
  const onClickForRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.deleteEvent(e.currentTarget.value);
  };
  const onClickForDuplicate = (e: React.MouseEvent<HTMLButtonElement>) => {
    const toLoad = props.events.find((v) => v.id === e.currentTarget.value);
    if (toLoad !== undefined) {
      // const dings = jsonDateEnhancer(JSON.stringify(toLoad.rawData));
      const dings = { ...toLoad };
      dings.id = uuidv4();
      dings.name = "Copy of " + dings.rawData.race.name;
      dings.rawData.race.id = dings.id;
      dings.rawData.race.name = dings.name;
      props.storeAndUpdateEvent(dings);
    }
  };

  const doOpenNotification = (e: React.MouseEvent<HTMLButtonElement>) => {
    const url = window.location.origin + "/ext?id=" + e.currentTarget.value;
    copy(url);
    notification.open({
      message: "Share event",
      description: (
        <div>
          Anyone who has the link can access. Copied to clipboard.
          <br />
          {url}
        </div>
      ),
      onClick: () => {
        console.log("done");
      },
    });
  };

  const extraButtons = (d: MyEvent) => (
    <div>
      <Tooltip title="Load the event">
        <Button icon={<EditOutlined />} value={d.id} onClick={onClickForEdit} />
      </Tooltip>
      <Tooltip title="Create a copy">
        <Button icon={<CopyOutlined />} value={d.id} onClick={onClickForDuplicate} />
      </Tooltip>
      <Tooltip title="Delete the event">
        <Button icon={<DeleteOutlined />} value={d.id} onClick={onClickForRemove} />
      </Tooltip>
      <Tooltip title="Share the event">
        <Button icon={<ShareAltOutlined />} value={d.id} onClick={doOpenNotification} />
      </Tooltip>
    </div>
  );
  const dateCompareValue = (d: Date | undefined | string) => {
    if (d === undefined) return 0;
    if (typeof d === "string") return new Date(d).getTime();
    if (typeof d === "object") return (d as Date).getTime();
    return 0;
  };
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  var searchInput: any;
  const getColumnSearchProps = (
    dataIndex: any,
    searchPlacerholder: string,
    extractor: (record: MyEvent) => string
  ) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: FilterDropdownProps) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`Search ${searchPlacerholder}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters !== undefined ? clearFilters : () => {})}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,

    onFilter: (value: any, record: MyEvent) => extractor(record).toLocaleLowerCase().includes(value.toLowerCase()),

    onFilterDropdownVisibleChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    // render: (text:any) =>
    //   searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ''}
    //     />
    //   ) : (
    //     text
    //   ),
  });

  const handleSearch = (selectedKeys: React.Key[], confirm: () => void, dataIndex: string) => {
    confirm();

    setSearchText(selectedKeys[0] as string);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const cellColumns: ColumnsType<MyEvent> = [
    {
      title: <Tooltip title="Event description">Event</Tooltip>,
      key: "name",
      dataIndex: "name",
      defaultSortOrder: "ascend",
      sorter: (a: MyEvent, b: MyEvent) => a.name.localeCompare(b.name),
      ...getColumnSearchProps("name", "events", (record: MyEvent) => record.name),
    },
    {
      title: "Car",
      key: "carName",
      dataIndex: "carName",
      defaultSortOrder: "ascend",
      sorter: (a: MyEvent, b: MyEvent) => a.carName.localeCompare(b.carName),
      ...getColumnSearchProps("carName", "cars", (record: MyEvent) => record.carName),
    },
    {
      title: "Track",
      key: "trackName",
      dataIndex: "trackName",
      defaultSortOrder: "ascend",
      sorter: (a: MyEvent, b: MyEvent) => a.trackName.localeCompare(b.trackName),
      ...getColumnSearchProps("trackName", "tracks", (record: MyEvent) => record.trackName),
    },
    {
      title: "Modified",
      key: "lastModified",
      dataIndex: "lastModified",
      defaultSortOrder: "descend",
      sorter: (a: MyEvent, b: MyEvent) => dateCompareValue(a.lastModified) - dateCompareValue(b.lastModified),
      render: (no: number, record: MyEvent) => new Date(record.lastModified!).toLocaleString(),
    },
    {
      title: "Action",
      dataIndex: ["no"],

      render: (no: number, record: MyEvent) => extraButtons(record),
    },
  ];
  return <Table pagination={false} rowKey="id" columns={cellColumns} dataSource={props.events} />;
};
export default EventList;
