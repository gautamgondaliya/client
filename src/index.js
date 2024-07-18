// index.js (or your root component)
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // Import Provider
import { createStore } from 'redux'; // Import createStore
import rootReducer from '../src/components/reducers'; // Import your root reducer
import { FileProvider } from './contexts/FileContext';
import App from './App'; // Your root component

// Create Redux store
const store = createStore(rootReducer);

// Wrap your root component with Provider and pass the Redux store
ReactDOM.render(
  <Provider store={store}>
   <FileProvider>
      <App />
    </FileProvider>
  </Provider>,
  document.getElementById('root')
);
