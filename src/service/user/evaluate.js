import axios from "./../../utils/axiosCustom";

const putReviewProduct = async (
  productId,
  buyerId,
  qualityRating,
  valueRating,
  usabilityRating,
  reviewTitle,
  reviewContent,
  recommendToOthers
) => {
  return await axios.put("api/Buyer/review-product", {
    productId,
    buyerId,
    qualityRating,
    valueRating,
    usabilityRating,
    reviewTitle,
    reviewContent,
    recommendToOthers,
  });
};

export { putReviewProduct };
