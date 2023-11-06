import { combineReducers } from "redux";
import auth from './authReducer'
import homePosts from './postReducer'

export default combineReducers({
  auth,
  homePosts
});
