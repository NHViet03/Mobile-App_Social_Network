import { EXPLORE_TYPES } from "../actions/exploreAction";

const initialState = {
  posts: [],
  result: 0,
  firstLoad: false,
};

const exploreReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXPLORE_TYPES.GET_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        result: action.payload.result,
        firstLoad: true,
      };
    default:
      return state;
  }
};

export default exploreReducer;
