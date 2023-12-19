import { GLOBAL_TYPES } from "./globalTypes";
import { getDataAPI } from "../../utils/fetchData";
import { imageUpload } from "../../utils/imageUpload";

export const MESS_TYPES = {
  GET_CONVERSATIONS: "GET_CONVERSATIONS",
  GET_MESSAGES: "GET_MESSAGES",
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
  ({ id, auth }) =>
  async (dispatch) => {
    try {
      const res = await getDataAPI(`messages/${id}`, auth.token);

      dispatch({ type: MESS_TYPES.GET_MESSAGES, payload: res.data.messages });
    } catch (error) {
      console.log(error);
    }
  };
