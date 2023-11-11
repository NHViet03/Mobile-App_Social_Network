import { combineReducers } from "redux";
import auth from './authReducer'
import homePosts from './postReducer'
import commentModal from './commentModalReducer'
import newChatModal from  './newChatModalReducer'

export default combineReducers({
  auth,
  homePosts,
  commentModal,
  newChatModal
});
