import { useKeycloak } from "@react-keycloak/web";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MyEvent } from "../api/events";
import ServerSettings from "../components/settings/serverSettings";
import { ApplicationState } from "../stores/index";
import { resetRace } from "../stores/race/actions";
import { fetchEvent, fetchUserEvents, removeEvent, storeAndUpdateEvent, userLogin } from "../stores/user/action";

const ServerSettingsContainer: React.FC = () => {
  const dispatch = useDispatch();
  const stateToProps = useSelector(({ user, race, driver }: ApplicationState) => ({
    user: user.data,
    raceData: race.data,
    drivers: driver.allDrivers,
  }));
  const { keycloak } = useKeycloak();
  const token = useCallback((): string => {
    return keycloak.token !== undefined ? keycloak.token : "haveNoToken";
  }, [keycloak]);
  const dispatchToProps = {
    reset: useCallback(() => dispatch(resetRace()), [dispatch]),
    login: useCallback(() => dispatch(userLogin()), [dispatch]),
    eventList: useCallback(() => dispatch(fetchUserEvents(token())), [dispatch, token]),
    loadEvent: useCallback((eventId: string) => dispatch(fetchEvent(token(), eventId)), [dispatch, token]),
    deleteEvent: useCallback((eventId: string) => dispatch(removeEvent(token(), eventId)), [dispatch, token]),

    storeAndUpdateEvent: useCallback((event: MyEvent) => dispatch(storeAndUpdateEvent(token(), event)), [
      dispatch,
      token,
    ]),
  };
  return <ServerSettings {...stateToProps} {...dispatchToProps} />;
};

export default ServerSettingsContainer;
