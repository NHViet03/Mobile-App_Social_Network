import { imageUpload } from "../../utils/imageUpload";
import { postDataAPI, getDataAPI } from "../../utils/fetchData";

export const POST_TYPES = {
  CREATE_POST: "CREATE_POST",
  GET_POSTS: "GET_POSTS",
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
