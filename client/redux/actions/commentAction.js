import { GLOBAL_TYPES } from "./globalTypes";
import {POST_TYPES} from "./postAction"
import { getDataAPI, postDataAPI, deleteDataAPI, patchDataAPI } from "../../utils/fetchData";
import { imageUpload } from "../../utils/imageUpload";

export const COMMENT_TYPES = {
  CREATE_COMMENT: "CREATE_COMMENT",
};

export const createComment  = ({postData,content, auth}) => async (dispatch) =>{
    dispatch({
        type: POST_TYPES.UPDATE_POST,
        payload: postData
    })

    try {
        const res = await postDataAPI("comments",
        {
            postId: postData._id,
            content: content
        },auth.token)
    } catch (err) {
        console.log(err)
    }
}

export const updateComment = ({commentData, postData, auth}) => async  (dispatch) => {
    const newPost = postData.comments.map(comment =>
        comment._id === commentData._id ? commentData : comment
    )
   const res = await patchDataAPI("update_comment",
   {
         content: commentData.content,
         _id: commentData._id
   }, auth.token)
    dispatch({
        type: POST_TYPES.UPDATE_POST,
        payload: newPost
    })
}
export const likeComment = ({commentData, postData, auth}) => async (dispatch) => {
    const newPost = postData.comments.map(comment =>
        comment._id === commentData._id ? commentData : comment
    )
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
    const newPost = postData.comments.map(comment =>
        comment._id === commentData._id ? commentData : comment
    )
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