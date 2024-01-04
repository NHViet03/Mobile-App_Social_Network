import { getDataAPI, postDataAPI,deleteDataAPI } from "../../utils/fetchData";

export const NOTIFY_TYPES = {
    GET_NOTIFIES: "GET_NOTIFIES",
    CREATE_NOTIFY: "CREATE_NOTIFY",
    REMOVE_NOTIFY: "REMOVE_NOTIFY",
    DELETE_NOTIFIES: "DELETE_NOTIFIES",
};

export const createNotify = ({ msg, auth,socket }) => async (dispatch) => {

  try {
    const res = await postDataAPI("notify", msg, auth.token);

    socket.emit && socket.emit("createNotify", res.data.notify);
  } catch (error) {
    console.log(error);
  }
};

export const removeNotify =
  ({ msg, auth, socket }) =>
  async (dispatch) => {
    dispatch({
      type: NOTIFY_TYPES.REMOVE_NOTIFY,
      payload: msg,
    });

    // Socket
    socket.emit && socket.emit("removeNotify", msg);

    try {
      await deleteDataAPI(`notify/${msg.id}?url=${msg.url}`, auth.token);
    } catch (error) {
      dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          error: error.response.data.msg,
        },
      });
    }
  };

export const getNotifies = ({ auth }) => async (dispatch) => {
    try {
        const res = await getDataAPI("notifies", auth.token);

        dispatch({type: NOTIFY_TYPES.GET_NOTIFIES, payload: res.data.notifies})
    } catch (error) {
        console.log(error);
    }
};

export const deleteNotifies = ({ auth }) => async (dispatch) => {

    dispatch({
        type:NOTIFY_TYPES.DELETE_NOTIFIES,
        payload:[]
    })


    try {
        await deleteDataAPI("delete_notifies",auth.token);
    } catch (error) {
        console.log(error);
    }
};