import { combineReducers } from 'redux';

import sessionReducer from './session';
import dataReducer from './data';
import uiReducer from './ui';
import mapReducer from './map';


const rootReducer = combineReducers({
  sessionState: sessionReducer,
  dataState: dataReducer,
  uiState: uiReducer,
  mapState: mapReducer
});

export default rootReducer;
