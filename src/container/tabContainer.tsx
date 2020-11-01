import { useKeycloak } from "@react-keycloak/web";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TabHelper from "../components/tabs/tabHelper";
import { EXT_LOAD_ID } from "../constants";
import { ApplicationState } from "../stores/index";
import { fetchSharedEvent } from "../stores/user/action";

const TabContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { keycloak } = useKeycloak();
  const stateToProps = useSelector(({ ui }: ApplicationState) => ({
    // raceTimeMsec: race.data.duration *60 *1000|| 0
    uiData: ui.data,
  }));
  const dispatchToProps = {
    // setDuration: useCallback((d: number) => dispatch(setDuration(d)), [dispatch]),
    // sagaTestDouble: useCallback((d: number) => dispatch(sagaTestDouble(d)), [dispatch]),
    // quickProposal: useCallback((param: ISimpleRaceProposalParam) => dispatch(computeQuickProposal(param)), [dispatch]),
  };
  const loadKey = window.sessionStorage.getItem(EXT_LOAD_ID);
  if (loadKey) {
    console.log("should now load data " + loadKey);
    dispatch(fetchSharedEvent(keycloak?.token!, loadKey));
    window.sessionStorage.removeItem(EXT_LOAD_ID);
  }
  return <TabHelper {...stateToProps} {...dispatchToProps} />;
};

export default TabContainer;
