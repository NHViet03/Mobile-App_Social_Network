import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MESS_TYPES } from "../redux/actions/messageAction";
import { GLOBAL_TYPES } from "../redux/actions/globalTypes";
import { POST_TYPES } from "../redux/actions/postAction";
import { NOTIFY_TYPES } from "../redux/actions/notifyAction";

export default function SocketClient() {
  const auth = useSelector((state) => state.auth);
  const socket = useSelector((state) => state.socket);
  const online = useSelector((state) => state.online);
  const dispatch = useDispatch();

  // Join User

  useEffect(() => {
    if (!socket || Object.keys(auth.user).length === 0) return;
    socket.emit("joinUser", {
      _id: auth.user._id,
      followers: auth.user.followers,
    });
  }, [socket, auth.user]);

  // Message
  useEffect(() => {
    if (!socket) return;
    socket.on("createMessageToClient", (message) => {
      dispatch({
        type: MESS_TYPES.UPDATE_MESSAGES,
        payload: message,
      });
    });

    return () => socket.off("createMessageToClient");
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    socket.on("updateConversationToClient", (conversation) => {
      dispatch({
        type: MESS_TYPES.UPDATE_CONVERSATION,
        payload: conversation,
      });
    });

    return () => socket.off("updateConversationToClient");
  }, [socket]);

  useEffect(() => {
    if (!socket || Object.keys(auth.user).length === 0) return;

    socket.emit("checkUserOnline", {
      _id: auth.user._id,
      following: auth.user.following,
      followers: auth.user.followers,
    });
  }, [socket, auth.user]);

  useEffect(() => {
    if (!socket) return;

    socket.on("checkUserOnlineToMe", (following) => {
      following.forEach((item) => {
        if (!online.includes(item.id)) {
          dispatch({ type: GLOBAL_TYPES.ONLINE, payload: item.id });
        }
      });
    });

    return () => socket.off("checkUserOnlineToMe");
  }, [socket, online, dispatch]);

  useEffect(() => {
    if (!socket) return;

    socket.on("checkUserOnlineToClient", (id) => {
      if (!online.includes(id)) {
        dispatch({ type: GLOBAL_TYPES.ONLINE, payload: id });
      }
    });

    return () => socket.off("checkUserOnlineToClient");
  }, [socket, online, dispatch]);

  useEffect(() => {
    if (!socket) return;

    socket.on("checkUserOfflineToClient", (id) => {
      dispatch({
        type: GLOBAL_TYPES.OFFLINE,
        payload: id,
      });
    });

    return () => socket.off("checkUserOfflineToClient");
  }, [socket, dispatch]);

  // Likes
  useEffect(() => {
    if (!socket) return;
    socket.on("likeToClient", (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });
    return () => socket.off("likeToClient");
  }, [socket, dispatch]);

  useEffect(() => {
    if (!socket) return;
    socket.on("unLikeToClient", (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });
    return () => socket.off("unLikeToClient");
  }, [socket, dispatch]);

  // Comments
  useEffect(() => {
    if (!socket) return;
    socket.on("createCommentToClient", (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });
    return () => socket.off("createCommentToClient");
  }, [socket, dispatch]);

  useEffect(() => {
    if (!socket) return;
    socket.on("deleteCommentToClient", (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });
    return () => socket.off("deleteCommentToClient");
  }, [socket, dispatch]);

  // Follow
  useEffect(() => {
    if (!socket) return;
    socket.on("followToClient", (user) => {
      dispatch({ type: GLOBAL_TYPES.AUTH, payload: { ...auth, user: user } });
    });
    return () => socket.off("followToClient");
  }, [socket, dispatch, auth]);

  // Notification
  useEffect(() => {
    if (!socket) return;
    socket.on("createNotifyToClient", (notify) => {
      dispatch({
        type: NOTIFY_TYPES.CREATE_NOTIFY,
        payload: notify,
      });
    });

    return () => socket.off("createNotifyToClient");
  }, [dispatch, socket]);

  return <></>;
}
