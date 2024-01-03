import { GLOBAL_TYPES } from "../actions/globalTypes";
import { USER_TYPES } from "../actions/userAction";
const initialState = {
  token: "",
  user: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBAL_TYPES.AUTH:
      return action.payload;
    case USER_TYPES.SAVE_POST:
      return {
        ...state,
        user: {
          ...state.user,
          saved: [...state.user.saved, action.payload],
        },
      };
    case USER_TYPES.UNSAVE_POST:
      return {
        ...state,
        user: {
          ...state.user,
          saved: state.user.saved.filter((id) => id !== action.payload),
        },
      };
    default:
      return state;
  }
};

export default authReducer;
