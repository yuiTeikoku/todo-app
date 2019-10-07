import React from 'react';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Header from '../../components/header';
import HomePage from '../../screens/home';
import ProductsPage from '../../screens/products';
import CartPage from '../../screens/cart';
import ErrorPage from '../../screens/error';

import './app.css';

import mainReducer from '../../store/main-reducer';
import { loadProductsAndSetToStore } from '../../store/actions';

const loggerMiddleware = createLogger();
const store = createStore(
  mainReducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
)

export default class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadProductsAndSetToStore());
    store.subscribe(() => {
      const {cart} = store.getState();
      const cartLength = cart.length;
      this.setState({ cartLength });
    })
  }

  state = {
    cartLength: 0
  }

  render () {
    const {cartLength} = this.state;

    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="container"> 
            <Header cartLength={cartLength} />
            <Switch>
              <Route path='/' exact component={HomePage} />
              <Route path='/products' exact component={ProductsPage} />
              <Route path='/cart' exact component={CartPage} />
              <Route component={ErrorPage} />
            </Switch>
          
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
};