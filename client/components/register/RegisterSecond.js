import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

const RegisterSecond = ({ userData, setUserData, setRegisterStep }) => {
  const { birthday } = userData;

  const [show, setShow] = useState(false);

  const handleChangeDate = (event, selectedDate) => {
    setShow(false);
    const currentDate = selectedDate || new Date();

    setUserData({
      ...userData,
      birthday: currentDate,
    });
  };
  return (
    <View className="w-full items-center mb-10">
      <View>
        <Image
          style={{
            width: 250,
            height: 200,
            objectFit: "contain",
          }}
          source={require("../../assets/cake.png")}
        />
      </View>
      <View className="w-3/4">
        <Text className="text-center font-medium text-base">Thêm ngày sinh</Text>
        <Text className="text-center text-textColor text-xs">
          Thông tin này sẽ không hiển thị trên trang cá nhân công khai của bạn.
        </Text>
      </View>
      <Pressable onPress={() => setShow(true)}>
        {show && (
          <DateTimePicker
            value={new Date()}
            timeZoneOffsetInMinutes={0}
            minimumDate={new Date(1900, 1, 1)}
            maximumDate={new Date()}
            mode="date"
            onChange={handleChangeDate}
          />
        )}
        <View
          className="w-3/4 flex-row justify-around items-center mt-6 mb-6"
          style={{
            gap: 24,
          }}
        >
          <View className="rounded-md border border-borderColor w-1/3 px-1 py-2 ">
            <Text className="text-textColor">
              Tháng {birthday.getMonth() + 1}
            </Text>
          </View>
          <View className="rounded-md border border-borderColor w-1/3 px-1 py-2">
            <Text className="text-textColor">{birthday.getDate()}</Text>
          </View>
          <View className="rounded-md border border-borderColor w-1/3 px-1 py-2">
            <Text className="text-textColor">{birthday.getFullYear()}</Text>
          </View>
        </View>
      </Pressable>

      <View className="w-3/4">
        <Text className="text-center text-textColor text-xs">Bạn cần nhập ngày sinh của mình</Text>
        <Text className="text-center text-textColor text-xs">
        Hãy thêm ngày sinh của chính bạn, dù đây là tài khoản dành cho doanh nghiệp, thú cưng hay bất cứ điều gì khác
        </Text>
      </View>

      <TouchableOpacity
        className="rounded-md w-3/4 bg-primary py-3 px-2 mb-3 mt-6"
        onPress={() => setRegisterStep((preStep) => preStep + 1)}
      >
        <Text className="text-white text-center">Tiếp</Text>
      </TouchableOpacity>
      <Pressable
        className="mt-2"
        onPress={() => setRegisterStep((pre) => pre - 1)}
      >
        <Text className="text-primary text-center font-bold text-base">
          Quay lại
        </Text>
      </Pressable>
    </View>
  );
};

export default RegisterSecond;

const styles = StyleSheet.create({});
