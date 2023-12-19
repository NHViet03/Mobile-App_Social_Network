import React, { useEffect } from "react";
import { View } from "react-native";
import { Redirect } from "expo-router";
import moment from "moment";
import { useDispatch } from "react-redux";
import { refreshToken } from "../redux/actions/authAction";

import { io } from "socket.io-client";
import { uri } from "../utils/fetchData";
import { GLOBAL_TYPES } from "../redux/actions/globalTypes";

import "moment/locale/vi";
moment.locale("vi");

// Config moment
moment.updateLocale("vi", {
  relativeTime: {
    future: "trong %s",
    past: "%s trước",
    s: "1 giây",
    ss: "%d giây",
    m: "1 phút",
    mm: "%d phút",
    h: "1 giờ",
    hh: "%d giờ",
    d: "một ngày",
    dd: "%d ngày",
    w: "1 tuần",
    ww: "%d tuần",
    M: "1 tháng",
    MM: "%d tháng",
    y: "1 năm",
    yy: "%d năm",
  },
});

const index = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());

    const socket = io(`http://${uri}`, {
      transports: ["websocket"],
    });

    dispatch({
      type: GLOBAL_TYPES.SOCKET,
      payload: socket,
    });

    socket.on("connect", () => {
      console.log("Socket Connected");
    });
  }, [dispatch]);

  return (
    <View>
      <Redirect href="/(tabs)/home" />
    </View>
  );
};

export default index;
