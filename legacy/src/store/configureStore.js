import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';

import rootReducer from '../reducers';

const loggerMiddleware = createLogger();

export default function configureStore(preloadedState = {}) {
  let middlewares = [];
  if (process.env.NODE_ENV === 'development') {
    middlewares = [...middlewares, thunkMiddleware, loggerMiddleware];
  } else {
    middlewares = [...middlewares, thunkMiddleware];
  }

  const middlewareEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares)
  );

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
}
