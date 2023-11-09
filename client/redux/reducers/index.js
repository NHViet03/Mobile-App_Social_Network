import { combineReducers } from "redux";
import auth from './authReducer'
import homePosts from './postReducer'
import commentModal from './commentModalReducer'

export default combineReducers({
  auth,
  homePosts,
  commentModal
});
