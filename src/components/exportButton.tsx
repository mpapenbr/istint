import { Button, Modal } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "../stores";
import { compressJson } from "../utils/compressJson";

const ExportButton: React.FC = () => {
  const myAppState = useSelector(
    (appState: ApplicationState) => (appState))

  const [visible, setVisible] = useState(false);
  const [urlData, setUrlData] = useState("");

  const handleClick = () => {
    setVisible(true);
    // console.log(myAppState)
    compressJson(myAppState).then(d => setUrlData(d))
  }
  const closeDialog = () => {
    setVisible(false)
  }

  // console.log(whereAmI)
  return (
    <>

      <Button onClick={handleClick}>Export</Button>
      <Modal visible={visible} title="Data export" onCancel={closeDialog} onOk={closeDialog} >
        {urlData}
      </Modal>
    </>
  );
}

export default ExportButton;