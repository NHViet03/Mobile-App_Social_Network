import { imageUpload } from "../../utils/imageUpload";
import { postDataAPI, getDataAPI, patchDataAPI, deleteDataAPI } from "../../utils/fetchData";

export const POST_TYPES = {
  CREATE_POST: "CREATE_POST",
  GET_POSTS: "GET_POSTS",
  EDIT_POST: "EDIT_POST",
  UPDATE_POST: "UPDATE_POST",
  LIKE_POST: "LIKE_POST",
  DELETE_POST: "DELETE_POST",
};

export const createPost =({ post, auth }) =>
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

export const updatePost = ({editPost, auth}) => async (dispatch) => {
    const { content, _id } = editPost
   
  try {
    const res = await patchDataAPI("post",{
      content,
      _id
    } ,auth.token);
    
    dispatch({
      type: POST_TYPES.UPDATE_POST,
      payload: res.data.post
    })
  } catch (error) {
    console.log(error);
  }
}

export const likePost = ({post, auth}) =>  async (dispatch) => {
    try{
    const res =  await patchDataAPI("post/like",{
      post: post,
      user: auth.user
      }, auth.token);
      dispatch({
        type: POST_TYPES.UPDATE_POST,
        payload: res.data.newPost
    })
    }catch(error){
        console.log(error);
    }
   
}
export const unlikePost = ({post, auth}) =>  async (dispatch) => {
  try{
  const res =  await patchDataAPI("post/unlike",{
    post: post,
    user: auth.user
    }, auth.token);
    dispatch({
      type: POST_TYPES.UPDATE_POST,
      payload: res.data.newPost
  })
  }catch(error){
      console.log(error);
  }
 
}
export const deletePost = ({post, auth}) => async (dispatch) => {

  dispatch({
    type: POST_TYPES.DELETE_POST,
    payload: post
  })

  try{
    const res = await deleteDataAPI(`delete_post/${post._id}`,auth.token)
  
  }catch(error){
    console.log("lỗi");
  }
}

export const savePost = ({post, auth}) => async (dispatch) => {
  try{
    const res = await patchDataAPI(`save_post/${post._id}`,
    {
      user: auth.user
    },auth.token)
  }catch(error){
    console.log(error);
  }
  
}

export const unsavePost = ({post, auth}) => async (dispatch) => {
  try{
    const res = await patchDataAPI(`unsave_post/${post._id}`,
    {
      user: auth.user
    },auth.token)
  }catch(error){
    console.log(error);
  }
  
}