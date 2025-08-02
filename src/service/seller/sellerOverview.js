import axios from "../../utils/axiosCustom";
const getSellerOverview = async (SellerId, CountDay) => {
  return await axios.get("api/Seller/overview", {
    params: { SellerId, CountDay },
  });
};

export { getSellerOverview };
