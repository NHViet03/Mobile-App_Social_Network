import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import homePosts from "./postReducer";
import explore from "./exploreReducer";
import notify from "./notifyReducer";
import commentModal from "./commentModalReducer";
import reportPostModal from "./reportPostModalReducer";
import sharePostModal from "./sharePostModalReducer";
import logOutModal from "./logOutModalReducer";
import message from "./messageReducer";
import socket from "./socketReducer";
import online from "./onlineReducer";

export default combineReducers({
  auth,
  alert,
  homePosts,
  explore,
  notify,
  commentModal,
  reportPostModal,
  sharePostModal,
  commentModal,
  logOutModal,
  message,
  socket,
  online,
});
