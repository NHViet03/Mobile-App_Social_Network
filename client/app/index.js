import { Redirect } from "expo-router";
import moment from 'moment';

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
  return <Redirect href={"/(auth)/login"} />;
};

export default index;
