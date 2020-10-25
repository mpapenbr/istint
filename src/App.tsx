import "antd/dist/antd.css";
import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import Keycloak from "keycloak-js";
import React from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router";
import { Store } from "redux";
import "./App.css";
import AppHeader from "./components/AppHeader";
import SocialLogin from "./components/login/SocialLogin";
import { API_AUTH_URL } from "./constants";
import TabContainer from "./container/tabContainer";
import { ApplicationState } from "./stores";
import { userAuthData } from "./stores/user/action";

interface AppProps {
  store: Store<ApplicationState>;
  history: History;
}

const App: React.FC<AppProps> = ({ store, history }) => {
  const keycloak = Keycloak({
    realm: "iracing-tools",
    url: API_AUTH_URL,
    clientId: "login-web",
  });

  keycloak
    .init({
      onLoad: "login-required",
    })
    .then((authenticated) => {
      if (authenticated) {
        store.dispatch(userAuthData(keycloak));
      }
    });

  keycloak.onTokenExpired = () => {
    // console.log("token expired", keycloak.token);
    keycloak
      .updateToken(30)
      .then((refreshed) => {
        console.log("Successful refreshed token result: " + refreshed);
        store.dispatch(userAuthData(keycloak));
      })
      .catch((e) => console.log("Error refreshing token " + e));
  };

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div className="App">
          {/* <Login /> */}
          {/* <DevContainer /> */}
          <AppHeader />
          {/* <TabContainer /> */}
          <Switch>
            <Route path="/" exact={true} component={TabContainer} />
            <Route path="/login" component={SocialLogin} />
          </Switch>

          {/* <RaceContainer /> */}
        </div>
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
