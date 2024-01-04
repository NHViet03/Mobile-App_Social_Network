import { Text, View, Pressable, ActivityIndicator } from "react-native";
import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { router } from "expo-router";
import {
  Feather,
  MaterialCommunityIcons,
  Octicons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import {
  POST_TYPES,
  deletePost,
  reportPost,
} from "../redux/actions/postAction";
import Loading from "./Loading";

const ModalReportPost = ({ handleCloseReportPostModal }) => {
  const auth = useSelector((state) => state.auth);
  const reportPostModal = useSelector((state) => state.reportPostModal);

  const [isOpenReport, setIsOpenReport] = useState(false);
  const [reportStep, setReportStep] = useState(1);
  const [loadReport, setLoadReport] = useState(false);

  const dispatch = useDispatch();

  const reportContent = useMemo(
    () => [
      {
        id: 1,
        content: "Đây là spam",
      },
      {
        id: 2,
        content: "Ảnh khỏa thân hoặc hoạt động tình dục",
      },
      {
        id: 3,
        content: "Bạo lực hoặc tổ chức nguy hiểm",
      },
      {
        id: 4,
        content: "Bắt nạt hoặc quấy rối",
      },
      {
        id: 5,
        content: "Vi phạm quyền sở hữu trí tuệ",
      },
      {
        id: 6,
        content: "Lừa đạo hoặc gian lận",
      },
      {
        id: 7,
        content: "Thông tin sai sự thật",
      },
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

  const handleReportPost = async (reason) => {
    if (loadReport) return;
    setReportStep(2);
    setLoadReport(true);
    await dispatch(reportPost({ post: reportPostModal, reason, auth }));
    setLoadReport(false);
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
          {reportStep === 1 ? (
            <BottomSheetScrollView showsVerticalScrollIndicator={false}>
              <View className="mt-2 px-3 mb-3">
                <View className="mb-4">
                  <Text className="font-semibold text-base">
                    Tại sao bạn báo cáo bài viết này ?
                  </Text>
                  <Text className="text-[13px] text-textColor mt-1">
                    Báo cáo của bạn sẽ ở dạng ẩn danh, trừ khi đó là báo cáo về
                    hành vi vi phạm quyền sở hữu trí tụê. Tác giả bài viết sẽ
                    không biết bạn đã báo cáo bài viết này.
                  </Text>
                </View>
                {reportContent.map((report) => (
                  <Pressable
                    key={report.id}
                    className="mb-4"
                    onPress={() => handleReportPost(report.content)}
                  >
                    <Text className="text-base">{report.content}</Text>
                  </Pressable>
                ))}
              </View>
            </BottomSheetScrollView>
          ) : loadReport ? (
            <View className="flex-1">
              <Loading />
            </View>
          ) : (
            <View className="flex-1 px-3">
              <View className="flex-1 justify-center items-center mb-8 mx-4">
                <AntDesign
                  name="checkcircle"
                  size={36}
                  color="rgb(88, 195, 34)"
                />
                <Text className="mt-3 text-center text-[15px]">
                  Cảm ơn bạn đã báo cáo bài viết này
                </Text>
                <Text className="text-textColor text-center mt-[2px]">
                  Ý kiến đóng góp của bạn rất quan trọng để giúp chúng tôi bảo
                  vệ cộng đồng Dreamers.
                </Text>
              </View>
              <Pressable
                className="bg-primary mb-3 rounded-lg py-[10px]"
                onPress={() => handleCloseReportPostModal()}
              >
                <Text className="text-center text-white text-base font-medium">
                  Hoàn tất
                </Text>
              </Pressable>
            </View>
          )}
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
            <Pressable className="flex-row items-center p-4 border-borderColor border-b-[0.5px]">
              <Feather name="link" size={24} color="black" />
              <Text className="text-base ml-2">Sao chép liên kết</Text>
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
      )}
    </View>
  );
};

export default ModalReportPost;
