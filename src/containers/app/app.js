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
import RegistrationPage from '../../screens/registration';
import LoginPage from '../../screens/login';


import './app.css';

import mainReducer from '../../store/main-reducer';
import { loadProductsAndSetToStore, loadUserBySessionAndSetToStore } from '../../store/actions';

const loggerMiddleware = createLogger();
const store = createStore(
  mainReducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

export default class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadProductsAndSetToStore());
    store.dispatch(loadUserBySessionAndSetToStore());
    store.subscribe(() => {
      const {cart, user} = store.getState();
      const cartLength = cart.length;
      this.setState({ cartLength, user });
    });
  }

  state = {
    cartLength: 0,
    user: null
  }

  render () {
    const {cartLength, user} = this.state;
    
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="container"> 
            {user && 
              <Header cartLength={cartLength} />
            } 
            <Switch>
              
              { 
                !user && (() => (
                <React.Fragment>
                  <Route path='/' exact component={LoginPage} />
                  <Route path='/registration' exact component={RegistrationPage} />
                </React.Fragment>
                ))()
              }
              
              {
                user && (() => (
                <React.Fragment>
                  <Route path='/' exact component={HomePage} />
                  <Route path='/products' exact component={ProductsPage} />
                  <Route path='/cart' exact component={CartPage} />   
                </React.Fragment>             
                ))()
              }    

              <Route component={ErrorPage} />
            </Switch>
          
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
};