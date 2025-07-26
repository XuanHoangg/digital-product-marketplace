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
export { getProducts };
