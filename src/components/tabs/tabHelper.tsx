import { Tabs } from "antd";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DriverMasterDetailContainer from "../../container/driverMasterDetailContainer";
import OtherSettingsContainer from "../../container/otherSettingsContainer";
import QuickProposalContainer from "../../container/quickProposalContainer";
import RaceSettingsContainer from "../../container/raceSettingsContainer";
import { UiMainEnum } from "../../stores/ui/types";
import CompactStints from "../stint/compactStints";

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
      <TabPane tab="Other" key={UiMainEnum.OtherSettings}>
        <OtherSettingsContainer />
      </TabPane>
      <TabPane tab="Planning" key={UiMainEnum.Planing}>
        <DndProvider backend={HTML5Backend}>
          <CompactStints />
        </DndProvider>
      </TabPane>
    </Tabs>
  );
};

export default TabHelper;
