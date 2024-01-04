import { GLOBAL_TYPES } from "../actions/globalTypes";
import { NOTIFY_TYPES } from "../actions/notifyAction";

const initialState = {
  notifies: [
    // {
    //   content: " đã bình luận về bài viết của bạn.",
    //   user: {
    //     _id: "abc123",
    //     username: "xeesoxee",
    //     fullname: "Han So-hee",
    //     avatar:
    //     "https://i.pinimg.com/564x/14/9a/e0/149ae0f72060755d652d4d09591c6691.jpg",
    //   },
    //   createdAt: "2023-11-9T07:08:08.000Z",
    // },
    // {
    //   content: " đã bắt đầu theo dõi bạn.",
    //   user: {
    //     _id: "abc670",
    //     username: "rohyoonseo",
    //     fullname: "Roh Yoon-seo",
    //     avatar:
    //     "https://i.pinimg.com/564x/20/92/2c/20922c29d6d7ec392068f4a924a5ebd6.jpg",
    //   },
    //   createdAt: "2023-11-9T07:08:08.000Z",
    // },
    // {
    //   content: " đã bắt đầu theo dõi bạn.",
    //   user: {
    //     _id: "abc679",
    //     username: "rosalineyuhh",
    //     fullname: "Rosa Line",
    //     avatar:
    //       "https://i.pinimg.com/736x/8d/89/c9/8d89c9bb216425049ac816a80f9424c7.jpg",
    //   },
    //   createdAt: "2023-11-8T07:08:08.000Z",
    // },

    // {
    //   content: " đã bắt đầu theo dõi bạn.",
    //   user: {
    //     _id: "abc680",
    //     username: "phs1116",
    //     fullname: "PARK HYUNGSIK",
    //     avatar:
    //     "https://i.pinimg.com/564x/1e/b0/22/1eb022bc5bc2be053ba0f363de7b75ad.jpg",
    //   },
    //   createdAt: "2023-11-8T07:08:08.000Z",
    // },
    // {
    //   content: " đã thích bài viết của bạn.",
    //   user: {
    //     _id: "abc105",
    //     username: "lavieenbluu",
    //     fullname: "Park Gyu-young",
    //     avatar:
    //       "https://i.pinimg.com/564x/d9/88/d0/d988d08b5e68200d1232409af8cabbdf.jpg",
    //   },
    //   createdAt: "2023-11-1T07:08:08.000Z",
    // },
  ],
};

const notifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBAL_TYPES.LOGOUT:
      return {
        ...initialState,
      };
    case NOTIFY_TYPES.GET_NOTIFIES:
      return {
        ...state,
        notifies: action.payload,
      };
    default:
      return state;
  }
};

export default notifyReducer;
