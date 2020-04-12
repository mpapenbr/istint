import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { createBrowserHistory } from 'history';
import configureStore from './configureStore';

const history = createBrowserHistory()
const initialState = window.INITIAL_REDUX_STATE
const store = configureStore(history, initialState)

test('renders learn react link', () => {
  const { getByText } = render(<App store={store} history={history}/>);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
