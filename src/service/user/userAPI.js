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
const putProfile = async (
  userId,
  fullName,
  phoneNumber,
  email,
  street,
  city,
  district,
  postalCode,
  country
) => {
  return await axios.put("api/Buyer/profile-update", {
    userId,
    fullName,
    phoneNumber,
    email,
    street,
    city,
    district,
    postalCode,
    country,
  });
};
const putProfileMini = async (userId, fullName, imageUser, email) => {
  return await axios.put("api/Buyer/profile-mini-update", {
    userId,
    fullName,
    imageUser,
    email,
  });
};

export { getUserProfile, getProfileMini, putProfile, putProfileMini };
