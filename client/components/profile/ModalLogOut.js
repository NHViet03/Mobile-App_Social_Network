import React from "react";
import { View, Text } from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";
import { useSelector,useDispatch } from "react-redux";
import { logoutAction } from "../../redux/actions/authAction";
import Avatar from "../Avatar";

const ModalLogOut = ({ handleCloseLogOutModal }) => {
  const auth = useSelector((state) => state.auth);
  const socket=useSelector(state=>state.socket);
  const dispatch=useDispatch();

  const handlePresslogout = async () => {
    router.replace("/(auth)/login");
    handleCloseLogOutModal();
    await dispatch(logoutAction());
    socket.close();
  };
  return (
    <View>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#e6e6e6",
          paddingBottom: 20,
          paddingTop: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            marginStart: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar size="medium" avatar={auth.user.avatar}></Avatar>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              textAlign: "center",
              marginStart: 12,
            }}
          >
            {auth.user.username}
          </Text>
        </View>

        <AntDesign
          style={{
            marginEnd: 20,
          }}
          name="checkcircle"
          size={24}
          color="#c43302"
        />
      </View>
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingBottom: 20,
          paddingTop: 20,
        }}
        onPress={handlePresslogout}
      >
        <MaterialIcons
          style={{
            marginStart: 20,
            marginEnd: 24,
          }}
          name="logout"
          size={30}
          color="#c43302"
        />
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            textAlign: "center",
            color: "#c43302",

            marginEnd: 20,
          }}
        >
          Đăng xuất
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalLogOut;
