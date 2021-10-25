import React from 'react';
import { Provider } from 'react-redux'
import { configureStore } from './redux'
import OrderBook from './Component/order-book'
import Ticker from './Component/ticker'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
  return (
    <Provider store={configureStore()}>
      <div className="container">
        <div className="row">
          <div className="col-md-6 box">
            <Ticker/>
          </div>
          <div className="col-md-6 box">
            <OrderBook/>
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
