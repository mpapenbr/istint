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
  return (
    <Tabs type="card">
      <TabPane tab="Drivers" key={UiMainEnum.Drivers}>
        <DriverMasterDetailContainer />
      </TabPane>
      <TabPane tab="Cars" key={UiMainEnum.Cars}></TabPane>
      <TabPane tab="Settings" key={UiMainEnum.Settings}>
        <RaceSettingsContainer />
      </TabPane>
      <TabPane tab="Quick proposal" key={UiMainEnum.QuickProposal}>
        <QuickProposalContainer />
      </TabPane>
      <TabPane tab="Planning" key={UiMainEnum.Planing}>
        <RaceContainer />
      </TabPane>
      {/* <TabPane tab="Compact" key={UiMainEnum.Compact}>
        <DndProvider backend={HTML5Backend}>
          <CompactStints />
        </DndProvider>
      </TabPane> */}
      <TabPane tab="Fuel calc" key={UiMainEnum.FuleInfos}>
        <FuelInfo />
      </TabPane>
      <TabPane tab="Other" key={UiMainEnum.OtherSettings}>
        <OtherSettingsContainer />
      </TabPane>
      <TabPane tab="Server" key={UiMainEnum.Server}>
        <ServerSettingsContainer />
      </TabPane>
    </Tabs>
  );
};

export default TabHelper;
