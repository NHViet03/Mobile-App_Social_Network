import { GLOBAL_TYPES } from "./globalTypes";
import { patchDataAPI } from "../../utils/fetchData";
import { imageUpload } from "../../utils/imageUpload";

export const USER_TYPES = {
  SAVE_POST: "SAVE_POST",
  UNSAVE_POST: "UNSAVE_POST",
}

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

    dispatch({
      type: GLOBAL_TYPES.AUTH,
      payload: newAuth,
    });

    try {
      await patchDataAPI(`follow/${user._id}`, null, auth.token);
     
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

    dispatch({
      type: GLOBAL_TYPES.AUTH,
      payload: newAuth,
    });

    try {
      await patchDataAPI(`unfollow/${user._id}`, null, auth.token);
     
    } catch (error) {
      console.log(error);
    }
  };

export const updateProfile =
  ({ newUser, auth }) =>
  async (dispatch) => {
    const oldUser = auth.user;
    if (
      newUser.username === oldUser.username &&
      newUser.fullname === oldUser.fullname &&
      newUser.avatar === oldUser.avatar &&
      newUser.story === oldUser.story &&
      newUser.gender === oldUser.gender &&
      newUser.website === oldUser.website
    )
      return;

    try {
      let media = [];

      if (newUser.avatar !== oldUser.avatar)
        media = await imageUpload([newUser.avatar]);

      await patchDataAPI(
        `update_profile`,
        {
          username: newUser.username,
          fullname: newUser.fullname,
          avatar: media.length > 0 ? media[0].url : oldUser.avatar,
          story: newUser.story,
          gender: newUser.gender,
          website: newUser.website,
        },
        auth.token
      );

      dispatch({
        type: GLOBAL_TYPES.AUTH,
        payload: {
          ...auth,
          user: {
            ...newUser,
            avatar: media.length > 0 ? media[0].url : oldUser.avatar,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

export const changePassword =
  ({ passwords, auth }) =>
  async (dispatch) => {
    try {
      const res = await patchDataAPI(
        "change_password",
        {
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        },
        auth.token
      );

      return {
        success: res.data.msg,
      };
    } catch (error) {
      return {
        error: error.response.data.msg,
      };
    }
  };
