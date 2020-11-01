import { useKeycloak } from "@react-keycloak/web";
import * as React from "react";
import { useCallback } from "react";

export default () => {
  const { keycloak } = useKeycloak();

  const callApi = useCallback(() => {
    console.log("log something");
  }, []);

  return (
    <div>
      <div>User is {!keycloak?.authenticated ? "NOT " : ""} authenticated</div>

      {!!keycloak?.authenticated && (
        <button type="button" onClick={() => keycloak.logout()}>
          Logout
        </button>
      )}

      <button type="button" onClick={callApi}>
        Call API
      </button>
    </div>
  );
};
