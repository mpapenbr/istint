import { Button, message, Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../stores";
import { replaceCarState } from "../stores/car/actions";
import { replaceDriverState } from "../stores/driver/actions";
import { replaceRace } from "../stores/race/actions";
import { replaceTrackState } from "../stores/track/actions";
import { decompress } from "../utils/compressJson";

const ImportButton: React.FC = () => {
  const myAppState = useSelector((appState: ApplicationState) => appState);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [importData, setImportData] = useState("");


  const handleClick = () => {
    setImportData("");
    setVisible(true);

  };
  const closeDialog = () => {

    setVisible(false);
  };

  const handleImportData = () => {
    decompress(importData)
      .then((d: ApplicationState) => {
        // console.log(d)
        dispatch(replaceRace(d.race.data));
        dispatch(replaceCarState(d.cars));
        dispatch(replaceTrackState(d.tracks));
        dispatch(replaceDriverState(d.driver));
        setVisible(false);

      })
      .catch((e: any) => {

        message.error("Input could not be processed.");
      })

  };

  const handleInputChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const x = e.target.value
    setImportData(x);
  }

  return (
    <>
      <Button onClick={handleClick}>Import</Button>
      <Modal
        visible={visible}
        title="Import data to clipboard"
        onCancel={closeDialog}
        onOk={handleImportData}
        okButtonProps={{ title: "import data to clipboard" }}
      >
        <TextArea defaultValue="" value={importData} rows={10} onChange={handleInputChanged} />

      </Modal>
    </>
  );
};

export default ImportButton;
