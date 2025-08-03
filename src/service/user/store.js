import axios from "./../../utils/axiosCustom";

const getProducts = async (
  Text = null,
  RatingOverall = 0,
  CategoryIds = [],
  PageSize = 15,
  PageNumber = 1
) => {
  const params = {
    "Condition.Text": Text,
    "Condition.RatingOverall": RatingOverall,
    PageSize,
    PageNumber,
  };

  if (CategoryIds && CategoryIds.length > 0) {
    CategoryIds.forEach((id, index) => {
      params[`Condition.CategoryIds[${index}]`] = id;
    });
  }

  return await axios.get("/api/Buyer/product-index", { params });
};
const getDetailProduct = async (ProjectId) => {
  return await axios.get("api/Buyer/product-detail", {
    params: { ProjectId },
  });
};
const getCategory = () => {
  return axios.get("/api/Buyer/get-categories");
};
const postAddToCart = async (projectId, userId, quantities = 1) => {
  const data = {
    projectId,
    userId,
    quantities,
  };
  return await axios.post("/api/Buyer/add-to-cart", data);
};
const putCheckBuyNow = async (userId, productId, quantity = 1) => {
  return await axios.put("api/Buyer/check-buy-now", {
    userId,
    productId,
    quantity,
  });
};
export {
  getProducts,
  getDetailProduct,
  getCategory,
  postAddToCart,
  putCheckBuyNow,
};
