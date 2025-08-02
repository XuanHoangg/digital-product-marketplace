import axios from "./../../utils/axiosCustom";
const getOverview = async (userId) => {
  return await axios.get("api/Admin/overview", {
    params: { userId },
  });
};

const getOverviewRecentActivity = async (userId) => {
  return await axios.get("api/Admin/overview/recent-activity", {
    params: { userId },
  });
};
const getOverviewTopStores = async (userId) => {
  return await axios.get("api/Admin/overview/top-store", {
    params: { userId },
  });
};
const getOverviewUserActivity = async (userId) => {
  return await axios.get("/api/Admin/overview/user-activity", {
    params: { userId },
  });
};
const getOverviewDaySales = async (userId) => {
  return await axios.get("api/Admin/overview/day-sales", {
    params: { userId },
  });
};
const getOverviewMonthlySales = async (userId) => {
  return await axios.get("api/Admin/overview/monthly-sales", {
    params: { userId },
  });
};
const getSellerOverview = async (userId) => {
  return await axios.get("/api/Admin/seller/overview", {
    params: { userId },
  });
};
export {
  getOverview,
  getOverviewRecentActivity,
  getOverviewTopStores,
  getOverviewUserActivity,
  getOverviewDaySales,
  getOverviewMonthlySales,
  getSellerOverview,
};
