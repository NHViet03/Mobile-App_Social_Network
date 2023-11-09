const initialState = {
  notifies: [
    {
      content: " đã bình luận về bài viết của bạn.",
      user: {
        _id: "abc123",
        username: "xeesoxee",
        fullname: "Han So-hee",
        avatar:
          "https://scontent.fsgn5-10.fna.fbcdn.net/v/t1.15752-9/396615157_551338183844421_7619172125110417112_n.png?_nc_cat=107&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeHRW7uHlh5XjzitCTbdFZMzNrbJfkSOG9E2tsl-RI4b0WVQrhPu2d1BZkDLRHgyc2zz7803SxyQYdAJ1xZ0ZK2e&_nc_ohc=E8Nu3nNn5psAX9UeJCw&_nc_ht=scontent.fsgn5-10.fna&oh=03_AdQtxzBRmbH7kuTuJj88fJBfpWJArRRQU3jWCX4BDMA8_w&oe=6566D742",
      },
      createdAt: "2023-11-9T07:08:08.000Z",
    },
    {
      content: " đã bắt đầu theo dõi bạn.",
      user: {
        _id: "abc670",
        username: "rohyoonseo",
        fullname: "Roh Yoon-seo",
        avatar:
          "https://scontent.fsgn5-2.fna.fbcdn.net/v/t1.15752-9/396419820_887913802728349_2601651184966517625_n.png?_nc_cat=105&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeGJur1UcJHdQB6lcwM3ZLlPZ63kFHMYKDNnreQUcxgoMyk1ANCoNc1WEa1qkikaLrB3j5g3q_vlKdG02jJqlQR6&_nc_ohc=frgmMR08utkAX8RzkOi&_nc_ht=scontent.fsgn5-2.fna&oh=03_AdSfsBFgUYCi7toROjKHPqDdEXHRIeZBISSNOgvGpqobJg&oe=6566E1FA",
      },
      createdAt: "2023-11-9T07:08:08.000Z",
    },
    {
      content: " đã bắt đầu theo dõi bạn.",
      user: {
        _id: "abc679",
        username: "rosalineyuhh",
        fullname: "Rosa Line",
        avatar:
          "https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.15752-9/395465307_532495459099163_6143034257415964199_n.png?_nc_cat=111&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeFcfoE6yIwvbxu7SkRe6Aqqz3ycLNOzlu3PfJws07OW7c75IV2cO9E9iLWj80zbzQvX_OyX4p-sn_N8lcbP4dh8&_nc_ohc=yzbKK_12uF0AX_xse8f&_nc_ht=scontent.fsgn5-6.fna&oh=03_AdSpk-zY4au6stUa5CEp4IduEINQfVcvoBkVwXkNfnFKjg&oe=65687E9F",
      },
      createdAt: "2023-11-8T07:08:08.000Z",
    },

    {
      content: " đã bắt đầu theo dõi bạn.",
      user: {
        _id: "abc680",
        username: "phs1116",
        fullname: "PARK HYUNGSIK",
        avatar:
          "https://scontent.fsgn5-8.fna.fbcdn.net/v/t1.15752-9/394659218_1087699275929146_1726840625700674151_n.png?_nc_cat=109&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeEEh8U0eNCfNj9jZso_tcwqSnwg7iJgOTFKfCDuImA5MRoIBO-Ip8bsLDV-d5Qug59T8UfGspJJ0eMfVvvWrpkS&_nc_ohc=kPZeMxIQctUAX-_b5rH&_nc_ht=scontent.fsgn5-8.fna&oh=03_AdS1qhet2-TpajuaYugcBOZ8pViStROqjkAsXAHvJNgvNw&oe=6568A5CB",
      },
      createdAt: "2023-11-8T07:08:08.000Z",
    },
    {
      content: " đã thích bài viết của bạn.",
      user: {
        _id: "abc105",
        username: "lavieenbluu",
        fullname: "Park Gyu-young",
        avatar:
          "https://scontent.fsgn5-10.fna.fbcdn.net/v/t1.15752-9/368591203_718249323495961_8215655904493420963_n.png?_nc_cat=107&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeF7av1jU9wtBPLnVg54AnFbh0UfhyrkjfuHRR-HKuSN-3EU3Zvcf_qyiDI0U6gGZF16FRYXkMPe2xjhsFsagWyx&_nc_ohc=NymJjJJjDYoAX9NNuQE&_nc_ht=scontent.fsgn5-10.fna&oh=03_AdR5YkeqJLOJCC4n4yUSA-ALVt9_3vELb6cGYO0Pn4O7MA&oe=65688115",
      },
      createdAt: "2023-11-1T07:08:08.000Z",
    },
  ],
};

const notifyReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default notifyReducer;
