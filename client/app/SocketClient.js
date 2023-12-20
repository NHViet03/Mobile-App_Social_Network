import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MESS_TYPES } from "../redux/actions/messageAction";

export default function SocketClient() {
  const auth = useSelector((state) => state.auth);
  const socket = useSelector((state) => state.socket);
  const dispatch = useDispatch();

  // Join User

  useEffect(() => {
    if (!socket) return;
    socket.emit("joinUser", auth.user?._id);
  }, [socket, auth.user._id]);

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

  return <></>;
}
