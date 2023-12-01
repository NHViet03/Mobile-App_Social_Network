import { getDataAPI } from "../../utils/fetchData";

export const EXPLORE_TYPES = {
  GET_POSTS: "GET_EXPLORE_POSTS",
};

export const getExplorePosts = (token) => async (dispatch) => {
  try {
    const res = await getDataAPI("explore_posts", token);

    dispatch({
        type:EXPLORE_TYPES.GET_POSTS,
        payload:res.data
    })
  } catch (error) {
    console.log(error.response.data.msg);
  }
};
