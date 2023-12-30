import { GLOBAL_TYPES } from "./globalTypes";
import {POST_TYPES} from "./postAction"
import { getDataAPI, postDataAPI, deleteDataAPI } from "../../utils/fetchData";
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