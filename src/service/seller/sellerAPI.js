import axios from "../../utils/axiosCustom";
const getStoreId = async (SellerId) => {
  return await axios.get("api/Seller/store-detail", {
    params: { SellerId },
  });
};

export { getStoreId };
