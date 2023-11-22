import { GLOBAL_TYPES } from "../actions/globalTypes";
const initialState = false;

const sharePostModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBAL_TYPES.SHARE_POST_MODAL:
      return action.payload;
    default:
      return state;
  }
};

export default sharePostModalReducer;
