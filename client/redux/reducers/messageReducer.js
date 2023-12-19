import { MESS_TYPES } from "../actions/messageAction";

const initialState = {
  conversations: [],
  result: 0,
  messages: [],
  firstLoad: false,
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case MESS_TYPES.GET_CONVERSATIONS:
      return {
        ...state,
        conversations: action.payload.conversations,
        result: action.payload.result,
        firstLoad: true,
      };

    case MESS_TYPES.GET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };
    default:
      return state;
  }
};

export default messageReducer;
