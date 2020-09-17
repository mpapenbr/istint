import "antd/dist/antd.css";
import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import React from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router";
import { Store } from "redux";
import "./App.css";
import AppHeader from "./components/AppHeader";
import SocialLogin from "./components/login/SocialLogin";
import TabContainer from "./container/tabContainer";
import { ApplicationState } from "./stores";

interface AppProps {
  store: Store<ApplicationState>;
  history: History;
}

const App: React.FC<AppProps> = ({ store, history }) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div className="App">
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
