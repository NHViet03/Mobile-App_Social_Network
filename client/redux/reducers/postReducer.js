import { GLOBAL_TYPES } from "../actions/globalTypes";
import { POST_TYPES } from "../actions/postAction";

const initialState = {
  posts: [],
  result: 0,
  users: [
    {
      _id: "abc680",
      username: "phs1116",
      fullname: "Park Min Young",
      avatar:
        "https://i.pinimg.com/736x/e2/72/76/e272766e212038f7b9291c8187d3f024.jpg",
    },
    {
      _id: "abc681",
      username: "bogummy",
      fullname: "PARK BO GUM",
      avatar:
        "https://i.pinimg.com/736x/94/b4/4f/94b44fe398d3fc668dfaa35cb0a7d66d.jpg",
    },
    {
      _id: "abc105",
      username: "lavieenbluu",
      fullname: "Park Gyu-young",
      avatar:
        "https://scontent.fsgn5-10.fna.fbcdn.net/v/t1.15752-9/368591203_718249323495961_8215655904493420963_n.png?_nc_cat=107&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeF7av1jU9wtBPLnVg54AnFbh0UfhyrkjfuHRR-HKuSN-3EU3Zvcf_qyiDI0U6gGZF16FRYXkMPe2xjhsFsagWyx&_nc_ohc=NymJjJJjDYoAX9NNuQE&_nc_ht=scontent.fsgn5-10.fna&oh=03_AdR5YkeqJLOJCC4n4yUSA-ALVt9_3vELb6cGYO0Pn4O7MA&oe=65688115",
    },
    {
      _id: "abc108",
      username: "thv",
      fullname: "V",
      avatar:
        "https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.15752-9/396312643_709463721056013_4572404616959222186_n.png?_nc_cat=111&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeGLZ6HANuhQdEz8n1sDN-9ohUcHDfNEpOSFRwcN80Sk5NuBZKcEYdth6upfKiXSMirE2q3sfAqQjNPiWYYelvPi&_nc_ohc=3n4Fm1lEUdAAX8XTlwE&_nc_ht=scontent.fsgn5-6.fna&oh=03_AdQSWM-iVEMCRoo1o5LpH2g9AskZ7Cv4_rkd9MDPXqIm6A&oe=6568AEC7",
    },
    {
      _id: "abc107",
      username: "hihyunwoo",
      fullname: "이현우",
      avatar:
        "https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.15752-9/371461896_1709932952822028_4130076371343332306_n.png?_nc_cat=100&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeFPQOdI5j1QutUf6Fzasj95INzZLAVViM0g3NksBVWIzU7SqJu85zlgFs_z-QdKJfsy36-lCSmEyy7Ut-N0_LdR&_nc_ohc=NY1irItYTK8AX_R4Oim&_nc_ht=scontent.fsgn5-5.fna&oh=03_AdQvCTFmNkvcdBX8-hTc8zPITiZloeNkw_YVD7VJqzsysQ&oe=6568AD6C",
    },
    {
      _id: "abc111",
      username: "yejinhand",
      fullname: "Son Ye-Jin",
      avatar:
        "https://scontent.fsgn5-12.fna.fbcdn.net/v/t1.15752-9/396697211_205262485926980_571658785852988638_n.png?_nc_cat=103&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeFSXVawaqJiUqdMTtaWf9C4WqrNaMkxIVRaqs1oyTEhVEEg2xaTPI20Yu-fVm_AVM571uS7q2Ft8sMS_nriJTP4&_nc_ohc=HJUWvVcFjNIAX_IGNkn&_nc_ht=scontent.fsgn5-12.fna&oh=03_AdQj0ZsRzFi1P1lx2VDbgq_yObpHijXetP2azEoh9QRyrA&oe=65689A53",
    },
    {
      _id: "abc456",
      username: "shinseulkee",
      fullname: "Shin Seul-Ki",
      avatar:
        "https://i.pinimg.com/564x/22/60/3a/22603ab665885115366fdc481c652628.jpg",
    },
  ],
  firstLoad: false,
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
    default:
      return state;
  }
};

export default postReducer;
