import axios from "../../utils/axiosCustom";
const getCategories = async () => {
  return await axios.get("api/Seller/get-categories", {});
};

export { getCategories };
