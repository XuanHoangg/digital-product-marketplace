import axios from "./../../../utils/axiosCustom";
const getProducts = async (
  SellerId,
  Text,
  CategoryId,
  Status,
  PageSize,
  PageCount
) => {
  return await axios.get("api/Seller/product-items", {
    params: {
      SellerId,
      "Condition.Text": Text,
      "Condition.CategoryId": CategoryId,
      "Condition.Status": Status,
      PageSize,
      PageCount,
    },
  });
};
const getProductDetail = async (ProductId, UserId) => {
  return await axios.get("api/Seller/product-detail", {
    params: { ProductId, UserId },
  });
};
const postAddProduct = async ({
  sellerId,
  storeId,
  productName,
  description,
  categoryId,
  originalPrice,
  sumaryFeature,
  images,
}) => {
  return await axios.post("api/Seller/product-add", {
    sellerId,
    storeId,
    productName,
    description,
    categoryId,
    originalPrice,
    sumaryFeature,
    images,
  });
};
const postProductImage = async ({
  sellerId,
  storeId,
  productId,
  imagePath,
}) => {
  return await axios.post("api/Seller/product-image-add", {
    sellerId,
    storeId,
    productId,
    imagePath,
  });
};
const deleteProductImage = async (sellerId, storeId, productId, imageId) => {
  return await axios.delete("api/Seller/product-image-delete", {
    data: {
      sellerId,
      storeId,
      productId,
      imageId,
    },
  });
};
export {
  postAddProduct,
  getProducts,
  getProductDetail,
  postProductImage,
  deleteProductImage,
};
