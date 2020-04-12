import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ApplicationState } from './stores';
import { Store } from 'redux';
import { History } from 'history';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

interface AppProps {
  store: Store<ApplicationState>,
  history: History
}

const App: React.FC<AppProps> = ({store, history}) => {  
  return (
    
    <Provider store={store}>
      <ConnectedRouter history={history}>
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  >
                  Learn React
                </a>
              </header>
            </div>
          </ConnectedRouter>
    </Provider>
  );
}

export default App;
