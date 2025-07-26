import axios from "./../../utils/axiosCustom";
const getProducts = async (
  Text,
  CategoryId,
  RatingOverall,
  PageSize,
  PageNumber
) => {
  return await axios.get("api/Buyer/product-index", {
    params: {
      Text,
      CategoryId,
      RatingOverall,
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
export { getProducts, getDetailProduct };
