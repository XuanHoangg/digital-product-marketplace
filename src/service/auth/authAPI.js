import axios from "../../utils/axiosCustom";
const postRegister = async (email, password, passwordComfirm, isBuyer) => {
  return await axios.post("api/NoDistinctionOfRoles/register", {
    email,
    password,
    passwordComfirm,
    isBuyer,
  });
};
const postLogin = async (email, password) => {
  return await axios.post("api/NoDistinctionOfRoles/login", {
    email,
    password,
  });
};
export { postRegister, postLogin };
