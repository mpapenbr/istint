import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ApplicationState } from './stores';
import { Store } from 'redux';
import { History } from 'history';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import HelperContainer from './container/devhelper';
import RaceContainer from './container/raceContainer';

interface AppProps {
  store: Store<ApplicationState>,
  history: History
}

const App: React.FC<AppProps> = ({store, history}) => {  
  return (
    
    <Provider store={store}>
      <ConnectedRouter history={history}>
            <div className="App">
              <HelperContainer />
              <RaceContainer />
            </div>
          </ConnectedRouter>
    </Provider>
  );
}

export default App;
