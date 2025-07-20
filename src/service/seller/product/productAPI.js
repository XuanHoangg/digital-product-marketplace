import axios from "./../../../utils/axiosCustom";
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
export { postAddProduct };
