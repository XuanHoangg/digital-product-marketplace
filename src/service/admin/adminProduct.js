import axios from "./../../utils/axiosCustom";
const getOverviewProduct = async (userId) => {
  return await axios.get("api/Admin/product/overview", {
    params: {
      userId,
    },
  });
};
export { getOverviewProduct };
