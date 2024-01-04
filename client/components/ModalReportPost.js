import { Text, View, Pressable } from "react-native";
import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { router } from "expo-router";
import {
  Feather,
  MaterialCommunityIcons,
  FontAwesome5,
  Octicons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import { POST_TYPES, deletePost } from "../redux/actions/postAction";

const ModalReportPost = ({ handleCloseReportPostModal }) => {
  const auth = useSelector((state) => state.auth);
  const reportPostModal = useSelector((state) => state.reportPostModal);

  const [isOpenReport, setIsOpenReport] = useState(false);

  const dispatch = useDispatch();

  const reportContent = useMemo(
    () => [
      "Đây là spam",
      "Ảnh khỏa thân hoặc hoạt động tình dục",
      "Lừa đảo hoặc gian lận",
      "Thông tin sai sự thật",
      "Vi phạm quyền sở hữu trí tuệ",
    ],
    []
  );

  const handleOpenReport = () => {
    setIsOpenReport(true);
  };

  const handleCloseReport = () => {
    setIsOpenReport(false);
  };

  const handleUpdatePost = () => {
    router.push("home/editPost");
    handleCloseReportPostModal();
    dispatch({
      type: POST_TYPES.EDIT_POST,
      payload: {
        post: reportPostModal,
        onEdit: true,
      },
    });
  };
  const handleDeletePost = () => {
    dispatch(deletePost({ post: reportPostModal, auth: auth }));
    handleCloseReportPostModal();
  };

  return (
    <View className="flex-1">
      {isOpenReport ? (
        <>
          <Pressable
            className="mt-3 pb-2 border-borderColor border-b-[0.5px]  flex-row relative items-center"
            onPress={handleCloseReport}
          >
            <View className="absolute top-0 left-4">
              <MaterialIcons
                name="keyboard-backspace"
                size={28}
                color="black"
              />
            </View>
            <Text className="font-semibold text-lg flex-1 text-center">
              Báo cáo
            </Text>
          </Pressable>
          <View className="mt-2 px-3">
            <View className="mb-3">
              <Text className="font-semibold text-base">
                Tại sao bạn báo cáo bài viết này ?
              </Text>
              <Text className="text-[13px] text-textColor mt-1">
                Báo cáo của bạn sẽ ở dạng ẩn danh, trừ khi đó là báo cáo về hành
                vi vi phạm quyền sở hữu trí tụê. Tác giả bài viết sẽ không biết
                bạn đã báo cáo bài viết này.
              </Text>
            </View>
            {reportContent.map((content, index) => (
              <Pressable key={index} className="mt-[6px] mb-[6px]">
                <Text className="text-base">{content}</Text>
              </Pressable>
            ))}
          </View>
        </>
      ) : reportPostModal?.user._id === auth?.user._id ? (
        <>
          <View className="mt-4 pb-4 border-borderColor border-b-[0.5px] flex-row justify-around items-center">
            <View className="items-center">
              <View className="w-14 h-14 rounded-[28px] border-dark border-[1px] justify-center items-center ">
                <Feather name="bookmark" size={28} color="black" />
              </View>
              <Text className="font-semibold mt-1">Lưu</Text>
            </View>
            <View className="items-center">
              <View className="w-14 h-14 rounded-[28px] border-dark border-[1px] justify-center items-center ">
                <MaterialCommunityIcons
                  name="qrcode-scan"
                  size={28}
                  color="black"
                />
              </View>
              <Text className="font-semibold mt-1">Mã QR</Text>
            </View>
          </View>
          <View className="flex-1">
            {/* <Pressable className="flex-row items-center p-4 border-borderColor border-b-[0.5px]">
              <Feather name="link" size={24} color="black" />
              <Text className="text-base ml-2">Sao chép liên kết</Text>
            </Pressable> */}
            <Pressable
              className="flex-row items-center p-4 border-borderColor border-b-[0.5px]"
              onPress={handleUpdatePost}
            >
              <MaterialIcons name="edit" size={24} color="black" />
              <Text className="text-base ml-2">Chỉnh sửa</Text>
            </Pressable>
            <Pressable
              className="flex-row items-center p-4 border-borderColor border-b-[0.5px]"
              onPress={handleDeletePost}
            >
              <AntDesign name="delete" size={24} color="black" />
              <Text className="text-base ml-2">Xóa Bài viết</Text>
            </Pressable>
            <Pressable
              className="flex-row items-center p-4 border-borderColor border-b-[0.5px]"
              onPress={handleOpenReport}
            >
              <Octicons name="report" size={24} color="#c43302" />
              <Text className="text-base ml-2 text-primary">Báo cáo</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <>
          <View className="mt-4 pb-4 border-borderColor border-b-[0.5px] flex-row justify-around items-center">
            <View className="items-center">
              <View className="w-14 h-14 rounded-[28px] border-dark border-[1px] justify-center items-center ">
                <Feather name="bookmark" size={28} color="black" />
              </View>
              <Text className="font-semibold mt-1">Lưu</Text>
            </View>
            <View className="items-center">
              <View className="w-14 h-14 rounded-[28px] border-dark border-[1px] justify-center items-center ">
                <MaterialCommunityIcons
                  name="qrcode-scan"
                  size={28}
                  color="black"
                />
              </View>
              <Text className="font-semibold mt-1">Mã QR</Text>
            </View>
          </View>
          <View className="flex-1">
            {/* <Pressable className="flex-row items-center p-4 border-borderColor border-b-[0.5px]">
              <Feather name="link" size={24} color="black" />
              <Text className="text-base ml-2">Sao chép liên kết</Text>
            </Pressable> */}

            <Pressable
              className="flex-row items-center p-4 border-borderColor border-b-[0.5px]"
              onPress={handleOpenReport}
            >
              <Octicons name="report" size={24} color="#c43302" />
              <Text className="text-base ml-2 text-primary">Báo cáo</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
};

export default ModalReportPost;
