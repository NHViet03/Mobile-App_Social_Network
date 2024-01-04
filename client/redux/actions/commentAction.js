import { GLOBAL_TYPES } from "./globalTypes";
import {POST_TYPES} from "./postAction"
import { getDataAPI, postDataAPI, deleteDataAPI, patchDataAPI } from "../../utils/fetchData";
import { imageUpload } from "../../utils/imageUpload";

export const COMMENT_TYPES = {
  CREATE_COMMENT: "CREATE_COMMENT",
};

export const createComment  = ({postData,content, auth, socket}) => async (dispatch) =>{
    const newPost = {...postData}
    try {
        const res = await postDataAPI("comments",
        {
            postId: postData._id,
            content: content
        },auth.token)

        // Socket
        socket.emit('createComment', newPost)
        // dispatch({
        //     type: POST_TYPES.UPDATE_POST,
        //     payload: {
        //         ...postData,
        //         comments: [...postData.comments, res.data.newComment]
        //     }
        // })
    
    } catch (err) {
        console.log(err)
    }
}

export const updateComment = ({commentData, postData, auth}) => async  (dispatch) => {
    const newPost = {
        ...postData,
        comments: postData.comments.map(comment =>
            comment._id === commentData._id ? commentData : comment
        )
    }
    // dispatch({
    //     type: GLOBAL_TYPES.COMMENT_MODAL,
    //     payload: newPost
    // })
    // dispatch({
    //     type: POST_TYPES.UPDATE_POST,
    //     payload: newPost
    // })
   const res = await patchDataAPI("update_comment",
   {
         content: commentData.content,
         _id: commentData._id
   }, auth.token)
   
}
export const likeComment = ({commentData, postData, auth}) => async (dispatch) => {
    const newPost = {
        ...postData,
        comments: postData.comments.map(comment =>
            comment._id === commentData._id ? commentData : comment
        )
    }
    dispatch({
        type: GLOBAL_TYPES.COMMENT_MODAL,
        payload: newPost
    })
    dispatch({
        type: POST_TYPES.UPDATE_POST,
        payload: newPost
    })

   
    try {
        const res = await patchDataAPI("like_comment",
        {
            _id: commentData._id
        }, auth.token)
    } catch (err) {
        console.log(err)
    }
}

export const unlikeComment = ({commentData, postData, auth}) => async (dispatch) => {
    const newPost = {
        ...postData,
        comments: postData.comments.map(comment =>
            comment._id === commentData._id ? commentData : comment
        )
    }
   
    dispatch({
        type: GLOBAL_TYPES.COMMENT_MODAL,
        payload: newPost
    })
    dispatch({
        type: POST_TYPES.UPDATE_POST,
        payload: newPost
    })
   
    try {
        const res = await patchDataAPI("unlike_comment",
        {
            _id: commentData._id
        }, auth.token)
    } catch (err) {
        console.log(err)
    }
}

export const deleteComment = ({postData ,comment , auth, socket}) => async (dispatch) => {
   
    dispatch({
        type: POST_TYPES.UPDATE_POST,
        payload: postData
    })
    try {
      const res = await deleteDataAPI(`delete_comment/${comment._id}`, auth.token)
       
    //   Socket
    socket.emit('deleteComment', postData)
    } catch (err) {
        console.log(err)
    }
   
}