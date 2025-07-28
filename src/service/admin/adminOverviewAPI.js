import axios from "../../utils/axiosCustom";
const getOverview = async (userId) => {
  return await axios.post("api/Admin/overview", {
    userId,
  });
};
const getOverviewRecentActivity = async (userId) => {
  return await axios.post("api/Admin/overview/recent-activity", {
    userId,
  });
};
const getOverviewTopStores = async (userId) => {
  return await axios.post("api/Admin/overview/top-stores", {
    userId,
  });
};
const getOverviewUserActivity = async (userId) => {
  return await axios.post("/api/Admin/overview/user-activity", {
    userId,
  });
};
const getOverviewDaySales = async (userId) => {
  return await axios.post("/api/Admin/overview/day-sales", {
    userId,
  });
};
const getOverviewMonthlySales = async (userId) => {
  return await axios.post("/api/Admin/overview/monthly-sales", {
    userId,
  });
};
export {
  getOverview,
  getOverviewRecentActivity,
  getOverviewTopStores,
  getOverviewUserActivity,
  getOverviewDaySales,
  getOverviewMonthlySales,
};
