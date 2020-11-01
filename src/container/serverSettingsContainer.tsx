import { useKeycloak } from "@react-keycloak/web";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MyEvent } from "../api/events";
import ServerSettings from "../components/settings/serverSettings";
import { ApplicationState } from "../stores/index";
import { resetRace } from "../stores/race/actions";
import { fetchEvent, fetchUserEvents, updateEvent, userLogin } from "../stores/user/action";

const ServerSettingsContainer: React.FC = () => {
  const dispatch = useDispatch();
  const stateToProps = useSelector(({ user, race, driver }: ApplicationState) => ({
    // raceTimeMsec: race.data.duration *60 *1000|| 0
    user: user.data,
    raceData: race.data,
    drivers: driver.allDrivers,
  }));
  const { keycloak } = useKeycloak();

  const dispatchToProps = {
    reset: useCallback(() => dispatch(resetRace()), [dispatch]),
    login: useCallback(() => dispatch(userLogin()), [dispatch]),
    eventList: useCallback(() => dispatch(fetchUserEvents(keycloak?.token!)), [dispatch]),
    loadEvent: useCallback((eventId: string) => dispatch(fetchEvent(keycloak?.token!, eventId)), [dispatch]),
    updateEvent: useCallback((event: MyEvent) => dispatch(updateEvent(event)), [dispatch]),
    // setDuration: useCallback((d: number) => dispatch(setDuration(d)), [dispatch]),
    // sagaTestDouble: useCallback((d: number) => dispatch(sagaTestDouble(d)), [dispatch]),
    // quickProposal: useCallback((param: ISimpleRaceProposalParam) => dispatch(computeQuickProposal(param)), [dispatch]),
  };
  return <ServerSettings {...stateToProps} {...dispatchToProps} />;
};

export default ServerSettingsContainer;
