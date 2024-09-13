import { combineReducers } from 'redux';
import sessionReducer from './session';
import uiReducer from './ui';
import mapReducer from './map';


const rootReducer = combineReducers({
  sessionState: sessionReducer,
  uiState: uiReducer,
  mapState: mapReducer
});

export default rootReducer;
