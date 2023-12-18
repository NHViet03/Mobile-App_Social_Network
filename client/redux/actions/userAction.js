import { GLOBAL_TYPES } from "./globalTypes";
import { getDataAPI, patchDataAPI, deleteDataAPI } from "../../utils/fetchData";

export const deleteFollower =
  ({ user, auth }) =>
  async (dispatch) => {
    const newAuth = {
      ...auth,
      user: {
        ...auth.user,
        followers: auth.user.followers.filter((item) => item._id !== user._id),
      },
    };

    try {
      await patchDataAPI(`delete_follower/${user._id}`, null, auth.token);
      dispatch({
        type: GLOBAL_TYPES.AUTH,
        payload: newAuth,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const follow =
  ({ user, auth }) =>
  async (dispatch) => {
    const newAuth = {
      ...auth,
      user: {
        ...auth.user,
        following: [...auth.user.following, user],
      },
    };

    try {
      await patchDataAPI(`follow/${user._id}`, null, auth.token);
      dispatch({
        type: GLOBAL_TYPES.AUTH,
        payload: newAuth,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const unFollow =
  ({ user, auth }) =>
  async (dispatch) => {
    const newAuth = {
      ...auth,
      user: {
        ...auth.user,
        following: auth.user.following.filter((item) => item._id !== user._id),
      },
    };

    try {
      await patchDataAPI(`unfollow/${user._id}`, null, auth.token);
      dispatch({
        type: GLOBAL_TYPES.AUTH,
        payload: newAuth,
      });
    } catch (error) {
      console.log(error);
    }
  };
