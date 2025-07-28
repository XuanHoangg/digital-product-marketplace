import React, { useState } from "react";
import styles from "./Overview.module.scss";

const Overview = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Tuần");

  // Mock data - sẽ thay thế bằng API call sau
  const statsData = {
    totalUsers: 125847,
    totalSellers: 3254,
    totalProducts: 89632,
    monthlyRevenue: "2.8 tỷ đ",
  };

  const activityData = [
    {
      id: 1,
      type: "new_user",
      title: "Người dùng mới đăng ký",
      subtitle: "Nguyễn Văn A đã tạo tài khoản",
      time: "5 phút trước",
      count: 45231,
    },
    {
      id: 2,
      type: "new_registration",
      title: "Đơn hàng mới",
      subtitle: "Đơn hàng #DH001 trị giá 1.250.000đ",
      time: "12 phút trước",
      count: 1847,
    },
    {
      id: 3,
      type: "new_product",
      title: "Sản phẩm mới",
      subtitle: 'Shop ABC đã thêm "UI Kit Pro"',
      time: "25 phút trước",
      count: 892,
    },
    {
      id: 4,
      type: "new_review",
      title: "Đánh giá mới",
      subtitle: "Khách hàng đánh giá 5 sao cho sản phẩm",
      time: "1 giờ trước",
      count: "125M đ",
    },
  ];

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
    { label: "Người dùng hoạt động", value: 45231, color: "green" },
    { label: "Đăng ký mới", value: 1847, color: "blue" },
    { label: "Đơn hàng hôm nay", value: 892, color: "orange" },
    { label: "Doanh thu hôm nay", value: "125M đ", color: "purple" },
  ];

  const getIconByType = (type) => {
    const icons = {
      new_user: "👤",
      new_registration: "📋",
      new_product: "📦",
      new_review: "⭐",
    };
    return icons[type] || "📊";
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
            <p className={styles.stats__value}>
              {statsData.totalUsers.toLocaleString()}
            </p>
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
            <p className={styles.stats__value}>
              {statsData.totalSellers.toLocaleString()}
            </p>
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
            <p className={styles.stats__value}>
              {statsData.totalProducts.toLocaleString()}
            </p>
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
            <p className={styles.stats__value}>{statsData.monthlyRevenue}</p>
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
              <p className={styles.chart__placeholder}>
                Biểu đồ doanh thu theo thời gian
              </p>
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
              <button className={styles.recentActivity__viewAll}>
                Xem tất cả
              </button>
            </div>
            <div className={styles.recentActivity__list}>
              {activityData.map((activity) => (
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
