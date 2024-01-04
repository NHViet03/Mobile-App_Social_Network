import { getDataAPI, postDataAPI } from "../../utils/fetchData";

export const NOTIFY_TYPES = {
    GET_NOTIFIES: "GET_NOTIFIES",
    CREATE_NOTIFY: "CREATE_NOTIFY",
    REMOVE_NOTIFY: "REMOVE_NOTIFY",
};

export const createNotify = ({ msg, auth }) => async (dispatch) => {

  try {
    const res = await postDataAPI("notify", msg, auth.token);
  } catch (error) {
    console.log(error);
  }
};

export const removeNotify = ({ msg, auth }) => async (dispatch) => {
    try {
        const res = await postDataAPI("notify", msg, auth.token);
    } catch (error) {
        console.log(error);
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