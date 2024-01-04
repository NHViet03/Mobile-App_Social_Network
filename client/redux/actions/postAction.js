import { imageUpload } from "../../utils/imageUpload";
import {
  postDataAPI,
  getDataAPI,
  patchDataAPI,
  deleteDataAPI,
} from "../../utils/fetchData";
import { USER_TYPES } from "../actions/userAction";
import { createNotify } from "./notifyAction";
export const POST_TYPES = {
  CREATE_POST: "CREATE_POST",
  GET_POSTS: "GET_POSTS",
  EDIT_POST: "EDIT_POST",
  UPDATE_POST: "UPDATE_POST",
  LIKE_POST: "LIKE_POST",
  DELETE_POST: "DELETE_POST",
};

export const createPost =
  ({ post, auth }) =>
  async (dispatch) => {
    try {
      let media = [];

      if (post.images.length > 0) media = await imageUpload(post.images);

      const res = await postDataAPI(
        "create_post",
        {
          content: post.content,
          images: media,
        },
        auth.token
      );

      dispatch({
        type: POST_TYPES.CREATE_POST,
        payload: {
          ...res.data.post,
          user: auth.user,
        },
      });

      // Notify
      const msg = {
        id: res.data.post._id,
        text: "Đã tạo bài viết",
        recipients: res.data.post.user.followers,
        url: `/post/${res.data.post._id}`,
        content: post.content,
        image: post.images[0].url,
      };
      dispatch(createNotify({msg, auth}))
    } catch (error) {
      console.log(error);
    }
  };

export const getPosts = (token) => async (dispatch) => {
  try {
    const res = await getDataAPI("posts", token);

    dispatch({
      type: POST_TYPES.GET_POSTS,
      payload: {
        posts: res.data.posts,
        result: res.data.result,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost =
  ({ editPost, auth }) =>
  async (dispatch) => {
    const { content, _id } = editPost;

    try {
      const res=await patchDataAPI(
        "post",
        {
          content,
          _id,
        },
        auth.token
      );
      dispatch({
        type: POST_TYPES.UPDATE_POST,
        payload: res.data.post,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const likePost =
  ({ post, auth, socket }) =>
  async (dispatch) => {
    const newPost = { ...post, likes: [...post.likes, auth.user._id] };
    socket.emit('likePost', newPost)
    try {
      const res = await patchDataAPI(
        "post/like",
        {
          post: post,
          user: auth.user,
        },
        auth.token
      );
      // Notify
      const msg = {
        id: auth.user._id,
        content: "đã yêu thích bài viết của bạn",
        recipients: [post.user._id],
        url: `/post/${post._id}`,
        image: post.images[0].url,
      };
      dispatch(createNotify({ msg, auth }));

      dispatch({
        type: POST_TYPES.UPDATE_POST,
        payload: res.data.newPost,
      });
    } catch (error) {
      console.log(error);
    }
  };
export const unlikePost =
  ({ post, auth, socket }) =>
  async (dispatch) => {
    const newPost = {
      ...post,
      likes: post.likes.filter((id) => id !== auth.user._id),
    };
    socket.emit('unLikePost', newPost)

    try {
      const res = await patchDataAPI(
        "post/unlike",
        {
          post: post,
          user: auth.user,
        },
        auth.token
      );
      dispatch({
        type: POST_TYPES.UPDATE_POST,
        payload: res.data.newPost,
      });
    } catch (error) {
      console.log(error);
    }
  };
export const deletePost =
  ({ post, auth }) =>
  async (dispatch) => {
    dispatch({
      type: POST_TYPES.DELETE_POST,
      payload: post,
    });

    try {
      const res = await deleteDataAPI(`delete_post/${post._id}`, auth.token);
    } catch (error) {
      console.log("lỗi");
    }
  };

export const savePost =
  ({ post, auth }) =>
  async (dispatch) => {
    dispatch({
      type: USER_TYPES.SAVE_POST,
      payload: post._id,
    });
    try {
      const res = await patchDataAPI(
        `save_post/${post._id}`,
        {
          user: auth.user,
        },
        auth.token
      );
    } catch (error) {
      console.log(error);
    }
  };

export const unsavePost =
  ({ post, auth }) =>
  async (dispatch) => {
    dispatch({
      type: USER_TYPES.UNSAVE_POST,
      payload: post._id,
    });
    try {
      const res = await patchDataAPI(
        `unsave_post/${post._id}`,
        {
          user: auth.user,
        },
        auth.token
      );
    } catch (error) {
      console.log(error);
    }
  };
