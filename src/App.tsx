import { ReactKeycloakProvider } from "@react-keycloak/web";
import "antd/dist/antd.css";
import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import "./App.css";
import AppHeader from "./components/AppHeader";
import keycloak from "./keycloak";
import { AppRouter } from "./routes";
import { ApplicationState } from "./stores";

interface AppProps {
  store: Store<ApplicationState>;
  history: History;
}

const App: React.FC<AppProps> = ({ store, history }) => {
  const eventLogger = (event: unknown, error: unknown) => {
    console.log("onKeycloakEvent", event, error);
  };

  const tokenLogger = (tokens: unknown) => {
    console.log("onKeycloakTokens", tokens);
  };

  return (
    <ReactKeycloakProvider onEvent={eventLogger} onTokens={tokenLogger} authClient={keycloak}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div className="App">
            {/* <Login /> */}
            {/* <DevContainer /> */}
            <AppHeader />
            {/* <TabContainer /> */}
            {/* <Switch>
              <Route path="/" exact={true} component={TabContainer} />
              <Route path="/login" component={SocialLogin} />
            </Switch> */}
            <AppRouter />
            {/* <RaceContainer /> */}
          </div>
        </ConnectedRouter>
      </Provider>
    </ReactKeycloakProvider>
  );
};

export default App;
