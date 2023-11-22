import {GLOBAL_TYPES} from '../actions/globalTypes';
const initialState = false;


const logOutModalReducer =(state=initialState,action)=>{
    switch(action.type){
        case GLOBAL_TYPES.LOGOUT_MODAL:
            return action.payload;
        default:
            return state;
    }
}

export default logOutModalReducer