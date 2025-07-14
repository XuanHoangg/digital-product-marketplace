import axios from "../../utils/axiosCustom";
const getOTP = async (email) => {
  return await axios.post("api/Auth/enable-2fa", {
    email,
  });
};
const postRegister = async (
  email,
  password,
  passwordComfirmed,
  isBuyer,
  isEnabled2FA = true
) => {
  return await axios.post("api/Auth/register", {
    email,
    password,
    passwordComfirmed,
    isBuyer,
    isEnabled2FA,
  });
};
const postLogin = async (email, password) => {
  return await axios.post("api/Auth/login", {
    email,
    password,
  });
};

const verifyOTP = async (email, secretCode) => {
  return await axios.post("api/Auth/confirm-2fa", {
    email,
    secretCode,
  });
};
export { postRegister, postLogin, getOTP, verifyOTP };
