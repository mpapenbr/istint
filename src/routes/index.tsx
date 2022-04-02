import { useKeycloak } from "@react-keycloak/web";
import * as React from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { EXT_LOAD_ID } from "../constants";
import TabContainer from "../container/tabContainer";
import { useAuth } from "./auth";
import { PrivateRoute } from "./utils";

const Home = () => {
  const { name } = useAuth();
  if (!name) return <p>Please use the login button.</p>;
  return <TabContainer />;
};

const External = () => {
  const location = useLocation();

  const regex = new RegExp("id=(?<myid>[a-f0-9\\-]{36})");
  const results = regex.exec(location.search);
  if (results === null) {
    return <p>Invalid query parameters.</p>;
  }

  window.sessionStorage.setItem(EXT_LOAD_ID, results[1]);
  return <Navigate to="/home" replace />;
};

const Unknown = () => {
  return <p>NotMatched route</p>;
};

export const AppRouter = () => {
  const { initialized } = useKeycloak();

  if (!initialized) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="ext" element={<External />} />

        <Route
          path="home"
          element={
            <PrivateRoute>
              <TabContainer />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Unknown />} />
      </Routes>
    </BrowserRouter>
  );
  // http://localhost:3000/ext?id=caa3d195-9ed0-47e2-84a8-db008f76358c

  // return (
  //   <Router>
  //     <Redirect from="/" exact={true} to="/home" />
  //     {/* <Route exact={true} path="/" to="/home" /> */}
  //     <PrivateRoute path="/home" component={TabContainer} />
  //     <Route path="/ext" component={External} />
  //     <Route path="/login" component={LoginPage} />
  //   </Router>
  // );
};
