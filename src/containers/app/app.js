import React, { useState, useEffect } from 'react';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from '../header';
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

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // load products
    store.dispatch(loadProductsAndSetToStore());

    // load user by session
    store.dispatch(loadUserBySessionAndSetToStore())
    .then(() => {
      const {user} = store.getState();
      setUser(user);
    });
  }, []);

  if (user === null)
      return <div>Loading...</div>

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="container"> 
          {
            user._id && 
            <Header />
          } 
          { 
            !user._id && (
            <Switch>
              <Route path='/' exact component={LoginPage} />
              <Route path='/registration' exact component={RegistrationPage} />
              <Route component={ErrorPage} />
            </Switch>
            )
          }
          
          {
            user._id && (
            <Switch>
              <Route path='/' exact component={HomePage} />
              <Route path='/products' exact component={ProductsPage} />
              <Route path='/cart' exact component={CartPage} />  
              <Route component={ErrorPage} /> 
            </Switch>             
            )
          }         
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;