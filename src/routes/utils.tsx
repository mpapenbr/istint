import { useKeycloak } from "@react-keycloak/web";
import * as React from "react";
import type { RouteProps } from "react-router-dom";
import { Redirect, Route, RouteComponentProps } from "react-router-dom";

interface PrivateRouteParams extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

export function PrivateRoute({ component: Component, ...rest }: PrivateRouteParams) {
  // const { keycloak } = useKeycloak<KeycloakInstance>()
  const { keycloak } = useKeycloak();
  console.log("authenticated: " + keycloak?.authenticated);
  console.log(rest);
  return (
    <Route
      {...rest}
      render={(props) =>
        keycloak?.authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}
