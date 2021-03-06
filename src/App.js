import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Scenes/Dashboard';
import store from './store';
import {Provider} from 'react-redux';

function App() {
  return (
    <Provider store={store}>
        <Dashboard />
    </Provider>
  );
}

export default App;
