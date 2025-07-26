import axios from "./../../../utils/axiosCustom";
const getProducts = async (SellerId, PageSize, PageCount) => {
  return await axios.get("api/Seller/product-items", {
    params: {
      SellerId,
      PageSize,
      PageCount,
    },
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
export { postAddProduct, getProducts };
