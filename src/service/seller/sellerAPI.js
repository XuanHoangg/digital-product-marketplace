import axios from "../../utils/axiosCustom";
const getStoreId = async (SellerId) => {
  return await axios.get("api/Seller/store-detail", {
    params: { SellerId },
  });
};
const getStoreDetails = async (SellerId) => {
  return await axios.get("api/Seller/store-detail", {
    params: { SellerId },
  });
};
const putUpdateStore = async (userId, storeId, name, image) => {
  return await axios.put("api/Seller/update-store", {
    userId,
    storeId,
    updateStore: {
      name,
      image,
    },
  });
};
export { getStoreId, getStoreDetails, putUpdateStore };
