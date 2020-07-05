import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TabHelper from "../components/tabs/tabHelper";
import { ApplicationState } from "../stores/index";

const TabContainer: React.FC = () => {
  const dispatch = useDispatch();
  const stateToProps = useSelector(({ ui }: ApplicationState) => ({
    // raceTimeMsec: race.data.duration *60 *1000|| 0
    uiData: ui.data,
  }));
  const dispatchToProps = {
    // setDuration: useCallback((d: number) => dispatch(setDuration(d)), [dispatch]),
    // sagaTestDouble: useCallback((d: number) => dispatch(sagaTestDouble(d)), [dispatch]),
    // quickProposal: useCallback((param: ISimpleRaceProposalParam) => dispatch(computeQuickProposal(param)), [dispatch]),
  };
  return <TabHelper {...stateToProps} {...dispatchToProps} />;
};

export default TabContainer;
