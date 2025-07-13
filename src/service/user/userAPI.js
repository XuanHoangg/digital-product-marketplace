import axios from "../../utils/axiosCustom";
const getUserProfile = async (UserId) => {
  return await axios.get("api/Buyer/profile", {
    params: { UserId },
  });
};
const getProfileMini = async (UserId) => {
  return await axios.get("api/Buyer/profile-mini", {
    params: { UserId },
  });
};
export { getUserProfile, getProfileMini };
