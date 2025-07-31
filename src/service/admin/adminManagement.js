import axios from "./../../utils/axiosCustom";

const getUserList = async (UserId, text, IsAvalible, PageSize, PageCount) => {
  return await axios.get("api/Admin/user/list", {
    params: {
      UserId,
      "Condition.Text": text,
      "Condition.IsAvalible": IsAvalible,
      PageSize,
      PageCount,
    },
  });
};
const getSellerList = async (UserId, text, IsAvalible, PageSize, PageCount) => {
  return await axios.get("api/Admin/seller/list", {
    params: {
      UserId,
      "Condition.Text": text,
      "Condition.StoreStatus": IsAvalible,
      PageSize,
      PageCount,
    },
  });
};
const putUpdateUser = async (adminId, targetUserId, isAvailable) => {
  return await axios.put("api/Admin/user/update", {
    userId: adminId,
    updateUser: {
      userId: targetUserId,
      isAvailable: isAvailable,
    },
  });
};

export { getUserList, getSellerList, putUpdateUser };
