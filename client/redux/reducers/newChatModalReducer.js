import {GLOBAL_TYPES} from '../actions/globalTypes';
const initialState = false;


const newChatReducer =(state=initialState,action)=>{
    switch(action.type){
        case GLOBAL_TYPES.NEWCHAT_MODAL:
            return action.payload;
        default:
            return state;
    }
}

export default newChatReducer