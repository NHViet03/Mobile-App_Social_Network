import {GLOBAL_TYPES} from '../actions/globalTypes';
const initialState = false;


const commentPostReducer =(state=initialState,action)=>{
    switch(action.type){
        case GLOBAL_TYPES.COMMENT_MODAL:
            return action.payload;
        default:
            return state;
    }
}

export default commentPostReducer