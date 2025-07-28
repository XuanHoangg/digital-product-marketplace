import axios from "./../../utils/axiosCustom";
const getProducts = async (
  Text,
  CategoryIds = [],
  RatingOverall,
  PageSize = 15,
  PageNumber = 1
) => {
  return await axios.get("api/Buyer/product-index", {
    params: {
      "Condition.Text": Text,
      "Condition.CategoryIds": CategoryIds,
      "Condition.RatingOverall": RatingOverall,
      PageSize,
      PageNumber,
    },
    paramsSerializer: (params) => {
      // Serialize array to multiple entries, e.g. CategoryIds=1&CategoryIds=2
      return new URLSearchParams(params).toString();
    },
  });
};
const getDetailProduct = async (ProjectId) => {
  return await axios.get("api/Buyer/product-detail", {
    params: { ProjectId },
  });
};
export { getProducts, getDetailProduct };
