import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from "./store";
import { bugAdded, bugResolved } from "./actions";

// Redux setup
store.subscribe(() => {
	console.log("Store changed!", store.getState());
});
store.dispatch(bugAdded("Bug 1"));
store.dispatch(bugResolved(1));
console.log(store.getState());

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
