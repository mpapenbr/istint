import { Tabs } from "antd";
import React from "react";
import DriverMasterDetailContainer from "../../container/driverMasterDetailContainer";
import OtherSettingsContainer from "../../container/otherSettingsContainer";
import QuickProposalContainer from "../../container/quickProposalContainer";
import RaceContainer from "../../container/raceContainer";
import RaceSettingsContainer from "../../container/raceSettingsContainer";
import ServerSettingsContainer from "../../container/serverSettingsContainer";
import { UiMainEnum } from "../../stores/ui/types";
import FuelInfo from "../info/fuelInfo";

interface IStateProps {}
interface IDispatchProps {}
type MyProps = IStateProps & IDispatchProps;
const { TabPane } = Tabs;

const TabHelper: React.FC<MyProps> = (props: MyProps) => {
  // TODO: Refactor keys with Typescript 4.9.x
  return (
    <Tabs
      type="card"
      items={[
        { label: "Settings", key: "" + UiMainEnum.Settings, children: <RaceSettingsContainer /> },
        { label: "Drivers", key: "" + UiMainEnum.Drivers, children: <DriverMasterDetailContainer /> },
        { label: "Quick Proposal", key: "" + UiMainEnum.QuickProposal, children: <QuickProposalContainer /> },
        { label: "Planning", key: "" + UiMainEnum.Planing, children: <RaceContainer /> },
        { label: "Fuel calc", key: "" + UiMainEnum.FuleInfos, children: <FuelInfo /> },
        { label: "Other", key: "" + UiMainEnum.OtherSettings, children: <OtherSettingsContainer /> },
        { label: "Server", key: "" + UiMainEnum.Server, children: <ServerSettingsContainer /> },
      ]}
    />
  );
};

export default TabHelper;
