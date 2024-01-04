import { GLOBAL_TYPES } from "../actions/globalTypes";
import { POST_TYPES } from "../actions/postAction";

const initialState = {
  posts: [],
  result: 0,
  firstLoad: false,
  post: {},
  onEdit: false,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_TYPES.CREATE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case POST_TYPES.GET_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        result: action.payload.result,
        firstLoad: true,
      };

    case GLOBAL_TYPES.LOGOUT:
      return {
        ...initialState,
      };
    case POST_TYPES.EDIT_POST:
      return {
        ...state,
        post: action.payload.post,
        onEdit: action.payload.onEdit,
      };
    case POST_TYPES.UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
      case POST_TYPES.DELETE_POST:
        return {
          ...state,
          posts: state.posts.filter((post) => post._id !== action.payload._id),
        };

    default:
      return state;
  }
};

export default postReducer;
