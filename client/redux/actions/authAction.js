import { GLOBAL_TYPES } from "./globalTypes";
import { postDataAPI } from "../../utils/fetchData";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const registerAction = (data) => async (dispatch) => {
  try {
    const res = await postDataAPI("register", data);
    
    dispatch({
      type: GLOBAL_TYPES.AUTH,
      payload: {
        token: "",
        user: res.data.user,
      },
    });
    return {
      success: res.data.msg,
    };
  } catch (err) {
    return {
      error: err.response.data.msg,
    };
  }
};

export const loginAction = (data) => async (dispatch) => {
  try {
    const res = await postDataAPI("login", data);
    await AsyncStorage.setItem("firstLogin", "true");
    dispatch({
      type: GLOBAL_TYPES.AUTH,
      payload: {  
        token: res.data.access_token,
        user: res.data.user,
      },
    });

    return {
      success: res.data.msg,
    };
  } catch (err) {
    console.log(err.response.data.msg);
    return {
      error: err.response.data.msg,
    };
  }
};

export const refreshToken = () => async (dispatch) => {
  try {
    const firstLogin = await AsyncStorage.getItem("firstLogin");

    if (firstLogin !== null) {
      const res = await postDataAPI("refresh_token");
      dispatch({
        type: GLOBAL_TYPES.AUTH,
        payload: {
          token: res.data.access_token,
          user: res.data.user,
        },
      });
    }
  } catch (err) {
    console.log(err.response.data.msg);
  }
};

export const logoutAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.AUTH,
      payload: {
        token: "",
        user: {},
      },
    });
    await AsyncStorage.removeItem("firstLogin");
    await postDataAPI("logout");
  
  } catch (err) {
    console.log(err.response.data.msg);
    return {
      error: err.response.data.msg,
    };
  }
};
