import axios from "./../../utils/axiosCustom";
const getProducts = async (
  Text = null,
  RatingOverall = 0,
  CategoryIds = [],
  PageSize = 15,
  PageNumber = 1
) => {
  return await axios.get("/api/Buyer/product-index", {
    params: {
      "Condition.Text": Text,
      "Condition.RatingOverall": RatingOverall,
      ...(CategoryIds.length > 0 && {
        "Condition.CategoryIds": CategoryIds,
      }),

      PageSize,
      PageNumber,
    },
  });
};
const getDetailProduct = async (ProjectId) => {
  return await axios.get("api/Buyer/product-detail", {
    params: { ProjectId },
  });
};
const getCategory = () => {
  return axios.get("/api/Buyer/get-categories");
};
export { getProducts, getDetailProduct, getCategory };
