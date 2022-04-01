import { useKeycloak } from "@react-keycloak/web";
import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TabContainer from "../container/tabContainer";
import { useAuth } from "./auth";
import { PrivateRoute } from "./utils";

const Home = () => {
  const { name } = useAuth();
  if (!name) return <p>Please use the login button.</p>;
  return <TabContainer />;
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
