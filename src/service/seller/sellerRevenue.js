import axios from "../../utils/axiosCustom";
const getRevenue = async (SellerId, CountDay) => {
  return await axios.get("api/Seller/revenue-chart", {
    params: { SellerId, CountDay },
  });
};

export { getRevenue };
