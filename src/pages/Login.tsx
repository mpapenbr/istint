import { useKeycloak } from "@react-keycloak/web";
import * as React from "react";
import { useCallback } from "react";
import { Redirect, useLocation } from "react-router-dom";

interface LocationState {
  from: {
    pathname: string;
  };
}
const LoginPage = () => {
  const location = useLocation<LocationState>();
  console.log(location);
  const currentLocationState: LocationState = location.state || {
    from: { pathname: "/home" },
  };

  const { keycloak } = useKeycloak();

  const login = useCallback(() => {
    keycloak?.login();
  }, [keycloak]);

  console.log(currentLocationState);
  if (keycloak?.authenticated) return <Redirect to={currentLocationState.from} />;

  return <></>;
};

export default LoginPage;
