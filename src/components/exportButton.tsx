import { Button, Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import copy from "copy-to-clipboard";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "../stores";
import { compressJson } from "../utils/compressJson";

const ExportButton: React.FC = () => {
  const myAppState = useSelector((appState: ApplicationState) => appState);

  const [visible, setVisible] = useState(false);
  const [urlData, setUrlData] = useState("");

  const handleClick = () => {
    setVisible(true);
    // console.log(myAppState)
    compressJson(myAppState).then((d) => setUrlData(d));
  };
  const closeDialog = () => {
    setVisible(false);
  };

  const copyAndCloseDialog = () => {
    copy(urlData);
    setVisible(false);
  };

  // console.log(whereAmI)
  return (
    <>
      <Button onClick={handleClick}>Export</Button>
      <Modal
        open={visible}
        title="Export data to clipboard"
        onCancel={closeDialog}
        onOk={copyAndCloseDialog}
        okButtonProps={{ title: "copy data to clipboard" }}
      >
        <TextArea rows={10} value={urlData} readOnly={true} />
      </Modal>
    </>
  );
};

export default ExportButton;
