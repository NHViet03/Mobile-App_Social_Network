import { Redirect } from "expo-router";

const index = () => {
  return <Redirect href={"/(auth)/login"} />;
};

export default index;
