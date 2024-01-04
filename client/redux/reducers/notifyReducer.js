import { GLOBAL_TYPES } from "../actions/globalTypes";
import { NOTIFY_TYPES } from "../actions/notifyAction";

const initialState = {
  notifies: [],
};

const notifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBAL_TYPES.LOGOUT:
      return {
        ...initialState,
      };

    case NOTIFY_TYPES.CREATE_NOTIFY:
      return {
        ...state,
        notifies: [action.payload, ...state.notifies],
      };
    case NOTIFY_TYPES.GET_NOTIFIES:
      return {
        ...state,
        notifies: action.payload,
      };

    case NOTIFY_TYPES.DELETE_NOTIFIES:
      return {
        ...state,
        notifies: action.payload,
      };
    default:
      return state;
  }
};

export default notifyReducer;
