import { useKeycloak } from "@react-keycloak/web";
import * as React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import TabContainer from "../container/tabContainer";
import External from "../pages/External";
import LoginPage from "../pages/Login";
import { PrivateRoute } from "./utils";

export const AppRouter = () => {
  const { initialized } = useKeycloak();

  if (!initialized) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Redirect from="/" exact={true} to="/home" />
      {/* <Route exact={true} path="/" to="/home" /> */}
      <PrivateRoute path="/home" component={TabContainer} />
      <Route path="/ext" component={External} />
      <Route path="/login" component={LoginPage} />
    </Router>
  );
};
