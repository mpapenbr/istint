import { ShareAltOutlined } from "@ant-design/icons";
import { Button, notification } from "antd";
import copy from "copy-to-clipboard";
import React from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "../stores";

const ShareEvent: React.FC = () => {
  const myAppState = useSelector((appState: ApplicationState) => appState);

  const handleClick = () => {
    const url = window.location.origin + "/ext?id=" + myAppState.race.data.id;
    copy(url);
    notification.open({
      message: "Share event",
      description: (
        <div>
          Copied to clipboard. Anyone who has the link can access.
          <br />
          {url}
        </div>
      ),
      onClick: () => {
        console.log("done");
      },
    });
  };

  // console.log(whereAmI)
  return (
    <Button disabled={myAppState.race.data.id === undefined} icon={<ShareAltOutlined />} onClick={handleClick}>
      Share
    </Button>
  );
};

export default ShareEvent;
