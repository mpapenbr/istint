import "antd/dist/antd.css";
import { History } from "history";
import React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import "./App.css";
import AppHeader from "./components/AppHeader";
import { AppRouter } from "./routes";
import { AuthProvider } from "./routes/auth";
import { ApplicationState } from "./stores";

interface AppProps {
  store: Store<ApplicationState>;
  history: History;
}

const App: React.FC<AppProps> = ({ store, history }) => {
  return (
    <Provider store={store}>
      <div className="App">
        {/* <Login /> */}
        {/* <DevContainer /> */}
        <AuthProvider>
          <AppHeader />
          {/* <TabContainer /> */}
          {/* <Switch>
              <Route path="/" exact={true} component={TabContainer} />
              <Route path="/login" component={SocialLogin} />
            </Switch> */}
          <AppRouter />
        </AuthProvider>
        {/* <RaceContainer /> */}
      </div>
    </Provider>
  );
};

export default App;
