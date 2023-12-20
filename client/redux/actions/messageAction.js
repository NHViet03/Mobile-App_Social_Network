import { GLOBAL_TYPES } from "./globalTypes";
import { getDataAPI, postDataAPI } from "../../utils/fetchData";
import { imageUpload } from "../../utils/imageUpload";

export const MESS_TYPES = {
  GET_CONVERSATIONS: "GET_CONVERSATIONS",
  GET_MESSAGES: "GET_MESSAGES",
  UPDATE_MESSAGES: "UPDATE_MESSAGES",
  UPDATE_CONVERSATION: "UPDATE_CONVERSATION",
};

export const getConversations =
  ({ auth }) =>
  async (dispatch) => {
    try {
      const res = await getDataAPI("conversations", auth.token);

      dispatch({ type: MESS_TYPES.GET_CONVERSATIONS, payload: res.data });
    } catch (error) {}
  };

export const getMessages =
  ({ id, page = 1, auth }) =>
  async (dispatch) => {
    try {
      const res = await getDataAPI(
        `messages/${id}?limit=${page * 10}`,
        auth.token
      );

      dispatch({ type: MESS_TYPES.GET_MESSAGES, payload: res.data.messages });
    } catch (error) {
      console.log(error);
    }
  };

export const createMessage =
  ({ message, auth, socket }) =>
  async (dispatch) => {
    try {
      let media = [];

      if (message.media.length > 0) media = await imageUpload(message.media);
      message = {
        ...message,
        media,
      };

      dispatch({
        type: MESS_TYPES.UPDATE_MESSAGES,
        payload: message,
      });

      //Socket
      socket.emit && socket.emit("createMessage", message);

      const res = await postDataAPI(
        "create_message",
        {
          text: message.text,
          recipient: message.recipient._id,
          media: message.media,
        },
        auth.token
      );

      dispatch({
        type: MESS_TYPES.UPDATE_CONVERSATION,
        payload: res.data.conversation,
      });

      //Socket
      socket.emit && socket.emit("updateConversation", res.data.conversation);
      
    } catch (error) {
      console.log(error);
    }
  };
