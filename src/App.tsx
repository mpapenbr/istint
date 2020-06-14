import 'antd/dist/antd.css';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import './App.css';
import DevContainer from './container/devContainer';
import DriverContainer from './container/driverContainer';
import RaceContainer from './container/raceContainer';
import { ApplicationState } from './stores';

interface AppProps {
  store: Store<ApplicationState>,
  history: History
}

const App: React.FC<AppProps> = ({ store, history }) => {

  return (

    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div className="App">
          <DevContainer />
          <DriverContainer />
          <RaceContainer />
        </div>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
