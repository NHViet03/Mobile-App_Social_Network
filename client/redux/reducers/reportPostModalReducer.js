import {GLOBAL_TYPES} from '../actions/globalTypes';
const initialState = false;


const reportPostModalReducer =(state=initialState,action)=>{
    switch(action.type){
        case GLOBAL_TYPES.REPORT_POST_MODAL:
            return action.payload;
        default:
            return state;
    }
}

export default reportPostModalReducer