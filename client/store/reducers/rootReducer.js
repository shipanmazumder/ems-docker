import { combineReducers } from 'redux';
import authReducer from './authReducer';
import classReducer from './classReducer';
import examReducer from "./examReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  classes: classReducer,
  exams: examReducer,
});

export default rootReducer;
