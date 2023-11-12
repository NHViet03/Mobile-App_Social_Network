import { GLOBAL_TYPES } from "./globalTypes";
import { postDataAPI } from "../../utils/fetchData";

export const registerAction = (data) => async (dispatch) => {

  try {
    const res = await postDataAPI("register", data);
    console.log(res.data);
    dispatch({
      type: GLOBAL_TYPES.AUTH,
      payload: res.data.user,
    });
    return {
        success: res.data.msg,
    }
  } catch (err) {
    return {
        error: err.response.data.msg,
    }
  }
};

export const loginAction = (data) => async (dispatch) => {
 
    try {
      const res = await postDataAPI("login", data);
      console.log(res.data);
      dispatch({
        type: GLOBAL_TYPES.AUTH,
        payload: res.data.user,
      });
      return {
          success: res.data.msg,
      }
    } catch (err) {
        console.log(err.response.data.msg)
      return {
          error: err.response.data.msg,
      }
    }
  };
