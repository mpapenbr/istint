import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import OtherSettings from "../components/settings/otherSettings";
import { ApplicationState } from "../stores/index";
import { resetRace } from "../stores/race/actions";

const OtherSettingsContainer: React.FC = () => {
  const dispatch = useDispatch();
  const stateToProps = useSelector(({ ui }: ApplicationState) => ({
    // raceTimeMsec: race.data.duration *60 *1000|| 0
    uiData: ui.data,
  }));
  const dispatchToProps = {
    reset: useCallback(() => dispatch(resetRace()), [dispatch]),
    // setDuration: useCallback((d: number) => dispatch(setDuration(d)), [dispatch]),
    // sagaTestDouble: useCallback((d: number) => dispatch(sagaTestDouble(d)), [dispatch]),
    // quickProposal: useCallback((param: ISimpleRaceProposalParam) => dispatch(computeQuickProposal(param)), [dispatch]),
  };
  return <OtherSettings {...stateToProps} {...dispatchToProps} />;
};

export default OtherSettingsContainer;
