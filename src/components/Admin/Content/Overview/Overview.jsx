import React, { useState } from "react";
import styles from "./Overview.module.scss";
import {
  getOverview,
  getOverviewRecentActivity,
  getOverviewTopStores,
  getOverviewUserActivity,
  getOverviewDaySales,
  getOverviewMonthlySales,
} from "@service/admin/adminOverviewAPI";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const Overview = () => {
  const userId = useSelector((state) => state?.auth?.account?.userId);
  // state của các thông tin tổng quan
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalSellers, setTotalSellers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  // state của hoạt động gần đây
  const [activityData, setActivityData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  // state của hoạt động người dùng
  const [activeUser, setActiveUser] = useState(0);
  const [newRegister, setNewRegister] = useState(0);
  const [todayOrder, setTodayOrder] = useState(0);
  const [todayRevenue, setTodayRevenue] = useState(0);
  // state của charts
  const [selectedPeriod, setSelectedPeriod] = useState("Tuần");
  const [chartdata, setChartData] = useState([]);
  useEffect(() => {
    fetchData();
    if (selectedPeriod === "Tuần") {
      fetchDaySales();
    } else if (selectedPeriod === "Tháng") {
      fetchMonthlySales();
    } else {
      fakeYearlySales(); // chưa có API
    }
  }, [selectedPeriod]);
  const fetchData = async () => {
    try {
      // Lấy dữ liệu tổng quan
      fetchDataOvewrview();
      // Lấy dữ liệu hoạt động gần đây
      fetchDataRecentActivity();
      // Lấy dữ liệu cửa hàng hàng đầu
      const topStoresResponse = await getOverviewTopStores(userId);
      // Lấy dữ liệu hoạt động người dùng,
      fetchDataUserActivity();
      // Lấy dữ liệu doanh thu theo ngày
      // fetchDaySales();
      // Lấy dữ liệu doanh thu theo tháng
      // fetchMonthlySales();
      // const userActivityResponse = await getOverviewUserActivity(userId);
      // const daySalesResponse = await getOverviewDaySales(userId);
      // const monthlySalesResponse = await getOverviewMonthlySales(userId);
      // console.log("Recent Activity:", recentActivityResponse);
      // console.log("Top Stores:", topStoresResponse);
      // console.log("User Activity:", userActivityResponse);
      // console.log("Day Sales:", daySalesResponse);
      // console.log("Monthly Sales:", monthlySalesResponse);
    } catch (error) {
      console.error("Lỗi lấy dữ liệu tổng quan:", error);
    }
  };
  const fetchDataOvewrview = async () => {
    try {
      const response = await getOverview(userId);
      const data = response.data;
      setTotalUsers(data[0].value);
      setTotalSellers(data[1].value);
      setTotalProducts(data[2].value);
      setMonthlyRevenue(data[3].value);
    } catch (error) {
      console.error("Lỗi lấy dữ liệu tổng quan:", error);
    }
  };
  const fetchDataRecentActivity = async () => {
    try {
      const res = await getOverviewRecentActivity(userId);
      const rawData = res.data;
      const formatted = rawData.map((item, index) => ({
        id: index,
        title: item.name,
        subtitle: item.description || "Không có mô tả",
        time: new Date(item.createAt).toLocaleString("vi-VN"),
        type: item.name,
      }));
      setActivityData(formatted);
    } catch (error) {
      console.error("Lỗi lấy dữ liệu hoạt động gần đây:", error);
    }
  };
  const fetchDataUserActivity = async () => {
    try {
      const response = await getOverviewUserActivity(userId);
      const activities = response?.data?.userActivities || [];

      activities.forEach((item) => {
        switch (item.name) {
          case "Người dùng đang hoạt động":
            setActiveUser(item.value);
            break;
          case "Đăng ký mới":
            setNewRegister(item.value);
            break;
          case "Đơn hàng hôm nay":
            setTodayOrder(item.value);
            break;
          case "Doanh thu hôm nay":
            setTodayRevenue(item.value);
            break;
          default:
            break;
        }
      });
    } catch (err) {
      console.error("Lỗi khi fetch hoạt động người dùng:", err);
    }
  };
  const fetchDaySales = async () => {
    try {
      const res = await getOverviewDaySales(userId);
      const nodes = res?.data?.nodes || [];
      console.log("Doanh thu theo ngày:", nodes);
      setChartData(nodes);
    } catch (err) {
      console.error("Lỗi fetch doanh thu theo ngày", err);
    }
  };

  const fetchMonthlySales = async () => {
    try {
      const res = await getOverviewMonthlySales(userId);
      const nodes = res?.data?.nodes || [];
      const monthMap = {
        1: "Thg 1",
        2: "Thg 2",
        3: "Thg 3",
        4: "Thg 4",
        5: "Thg 5",
        6: "Thg 6",
        7: "Thg 7",
        8: "Thg 8",
        9: "Thg 9",
        10: "Thg 10",
        11: "Thg 11",
        12: "Thg 12",
      };
      const formatted = nodes.map((item) => ({
        name: monthMap[item.name] || `Thg ${item.name}`,
        value: item.value,
      }));
      setChartData(formatted);
    } catch (err) {
      console.error("Lỗi fetch doanh thu theo tháng", err);
    }
  };

  const fakeYearlySales = () => {
    const fake = [
      { name: "2020", value: 1500 },
      { name: "2021", value: 3200 },
      { name: "2022", value: 2700 },
      { name: "2023", value: 4000 },
      { name: "2024", value: 3600 },
    ];
    setChartData(fake);
  };
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  const topSellersData = [
    {
      id: 1,
      name: "DigitalMarket Store",
      products: 156,
      rating: 4.8,
      revenue: "850M đ",
      avatar: "DM",
    },
    {
      id: 2,
      name: "TechShop Vietnam",
      products: 89,
      rating: 4.6,
      revenue: "720M đ",
      avatar: "TS",
    },
    {
      id: 3,
      name: "Creative Studio",
      products: 234,
      rating: 4.9,
      revenue: "680M đ",
      avatar: "CS",
    },
    {
      id: 4,
      name: "EduTech Solutions",
      products: 67,
      rating: 4.7,
      revenue: "520M đ",
      avatar: "ED",
    },
  ];

  const userActivityData = [
    {
      label: "Người dùng đang hoạt động",
      value: activeUser,
      color: "green",
    },
    {
      label: "Đăng ký mới",
      value: newRegister,
      color: "blue",
    },
    {
      label: "Đơn hàng hôm nay",
      value: todayOrder,
      color: "orange",
    },
    {
      label: "Doanh thu hôm nay",
      value: todayRevenue,
      color: "red",
    },
  ];

  const getIconByType = (type) => {
    const icons = {
      new_user: "👤",
      new_registration: "📋",
      new_product: "📦",
      new_review: "⭐",
    };
    return icons[type] || "⭐";
  };

  const getColorByType = (color) => {
    return styles[`activity__${color}`] || styles.activity__default;
  };

  return (
    <div className={styles.overview}>
      <div className={styles.overview__header}>
        <h1 className={styles.overview__title}>Dashboard Quản Trị</h1>
        <p className={styles.overview__subtitle}>
          Tổng quan về nền tảng thương mại điện tử
        </p>
      </div>

      {/* Stats Cards */}
      <div className={styles.stats}>
        <div
          className={`${styles.stats__card} ${styles["stats__card--users"]}`}
        >
          <div className={styles.stats__icon}>
            <span className={styles.stats__iconSymbol}>👥</span>
          </div>
          <div className={styles.stats__content}>
            <h3 className={styles.stats__label}>Tổng Người Dùng</h3>
            <p className={styles.stats__value}>{totalUsers}</p>
          </div>
        </div>

        <div
          className={`${styles.stats__card} ${styles["stats__card--sellers"]}`}
        >
          <div className={styles.stats__icon}>
            <span className={styles.stats__iconSymbol}>🏪</span>
          </div>
          <div className={styles.stats__content}>
            <h3 className={styles.stats__label}>Số Người Bán</h3>
            <p className={styles.stats__value}>{totalSellers}</p>
          </div>
        </div>

        <div
          className={`${styles.stats__card} ${styles["stats__card--products"]}`}
        >
          <div className={styles.stats__icon}>
            <span className={styles.stats__iconSymbol}>📦</span>
          </div>
          <div className={styles.stats__content}>
            <h3 className={styles.stats__label}>Số Sản Phẩm</h3>
            <p className={styles.stats__value}>{totalProducts}</p>
          </div>
        </div>

        <div
          className={`${styles.stats__card} ${styles["stats__card--revenue"]}`}
        >
          <div className={styles.stats__icon}>
            <span className={styles.stats__iconSymbol}>💰</span>
          </div>
          <div className={styles.stats__content}>
            <h3 className={styles.stats__label}>Doanh Thu Tháng</h3>

            <p className={styles.stats__value}>{monthlyRevenue}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        {/* Revenue Chart Section */}
        <div className={styles.content__left}>
          <div className={styles.chart}>
            <div className={styles.chart__header}>
              <h2 className={styles.chart__title}>Biểu Đồ Doanh Thu</h2>
              <div className={styles.chart__controls}>
                {["Tuần", "Tháng", "Năm"].map((period) => (
                  <button
                    key={period}
                    className={`${styles.chart__button} ${
                      selectedPeriod === period
                        ? styles["chart__button--active"]
                        : ""
                    }`}
                    onClick={() => setSelectedPeriod(period)}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.chart__content}>
              {selectedPeriod === "Năm" ? (
                <p className={styles.chart__placeholder}>
                  Chức năng đang được phát triển
                </p>
              ) : chartdata.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={chartdata}
                    margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className={styles.chart__placeholder}>
                  Không có dữ liệu doanh thu
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className={styles.content__right}>
          {/* User Activity */}
          <div className={styles.activity}>
            <div className={styles.activity__header}>
              <h2 className={styles.activity__title}>Hoạt Động Người Dùng</h2>
            </div>
            <div className={styles.activity__list}>
              {userActivityData.map((item, index) => (
                <div key={index} className={styles.activity__item}>
                  <div
                    className={`${styles.activity__dot} ${getColorByType(
                      item.color
                    )}`}
                  ></div>
                  <div className={styles.activity__info}>
                    <span className={styles.activity__label}>{item.label}</span>
                    <span className={styles.activity__value}>
                      {typeof item.value === "number"
                        ? item.value.toLocaleString()
                        : item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className={styles.bottom}>
        {/* Recent Activity */}
        <div className={styles.bottom__left}>
          <div className={styles.recentActivity}>
            <div className={styles.recentActivity__header}>
              <h2 className={styles.recentActivity__title}>
                Hoạt Động Gần Đây
              </h2>
              {activityData.length > visibleCount && (
                <button
                  className={styles.recentActivity__viewAll}
                  onClick={handleLoadMore}
                >
                  Xem tiếp
                </button>
              )}
            </div>
            <div className={styles.recentActivity__list}>
              {activityData.slice(0, visibleCount).map((activity) => (
                <div key={activity.id} className={styles.recentActivity__item}>
                  <div className={styles.recentActivity__icon}>
                    <span>{getIconByType(activity.type)}</span>
                  </div>
                  <div className={styles.recentActivity__content}>
                    <h4 className={styles.recentActivity__itemTitle}>
                      {activity.title}
                    </h4>
                    <p className={styles.recentActivity__subtitle}>
                      {activity.subtitle}
                    </p>
                    <span className={styles.recentActivity__time}>
                      {activity.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Sellers */}
        <div className={styles.bottom__right}>
          <div className={styles.topSellers}>
            <div className={styles.topSellers__header}>
              <h2 className={styles.topSellers__title}>Top Người Bán</h2>
              <button className={styles.topSellers__viewAll}>Xem tất cả</button>
            </div>
            <div className={styles.topSellers__list}>
              {topSellersData.map((seller) => (
                <div key={seller.id} className={styles.topSellers__item}>
                  <div className={styles.topSellers__avatar}>
                    <span>{seller.avatar}</span>
                  </div>
                  <div className={styles.topSellers__info}>
                    <h4 className={styles.topSellers__name}>{seller.name}</h4>
                    <div className={styles.topSellers__meta}>
                      <span className={styles.topSellers__products}>
                        {seller.products} sản phẩm
                      </span>
                      <span className={styles.topSellers__rating}>
                        ★ {seller.rating}
                      </span>
                    </div>
                  </div>
                  <div className={styles.topSellers__revenue}>
                    {seller.revenue}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
