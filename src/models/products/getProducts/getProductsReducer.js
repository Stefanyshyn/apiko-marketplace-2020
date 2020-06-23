import { combineReducers } from 'redux';
import latest from './getLatest';
import saved from './getSaved';
import user from './getUser';
import wanted from './getWanted';

export default combineReducers({
  latest,
  saved,
  user,
  wanted,
});
