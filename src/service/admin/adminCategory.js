import axios from "./../../utils/axiosCustom";

const getProductCategories = async () => {
  return await axios.get("api/Admin/product/categories");
};
const getCategoryOverview = async (userId) => {
  return await axios.get("api/Admin/category/overview", {
    params: { userId },
  });
};
const postCategory = async (userId, categoryData) => {
  const payload = {
    userId,
    addCategory: {
      categoryName: categoryData.categoryName,
      categoryDescription: categoryData.categoryDescription,
      categoryIcon: categoryData.categoryIcon,
    },
  };

  return await axios.post("api/Admin/category/add", payload);
};
export { getProductCategories, getCategoryOverview, postCategory };
