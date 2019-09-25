import React from 'react';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import TodoList from '../todo-list';

import mainReducer from '../../store/main-reducer';
import { loadProductsAndSetToStore } from '../../store/actions';

const loggerMiddleware = createLogger();
const store = createStore(
  mainReducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
)

// load products to store
store.dispatch(loadProductsAndSetToStore());

const App = () => {
  return (
    <Provider store={store}>
      <div className="container">
        <div className="row">
          <TodoList />
        </div> 
      </div>
    </Provider>
  )
};
export default App;