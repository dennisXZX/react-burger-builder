import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import burgerBuilderReducer from './stores/reducers/burgerBuilder';
import orderReducer from './stores/reducers/order';
import authReducer from './stores/reducers/auth';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

// setting up Redux DevTools Extension
// only use on development mode
const composeEnhancers = (process.env.NODE_ENV === 'development'
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : null) || compose;

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
});

const store = createStore(
  rootReducer, composeEnhancers(
    applyMiddleware(thunk)
  )
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
