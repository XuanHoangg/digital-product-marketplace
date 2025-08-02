import React from "react";
import styles from "./Revenue.module.scss";

const Revenue = () => {
  const revenueData = {
    totalRevenue: 45250000,
    thisMonthRevenue: 8750000,
    orders: 156,
  };

  const topProducts = [
    {
      id: 1,
      name: "Complete UI Kit Bundle",
      category: "42 đơn hàng",
      revenue: 56250000,
      icon: "UI",
      iconBg: "#2196F3",
    },
    {
      id: 2,
      name: "Photography Masterclass",
      category: "32 đơn hàng",
      revenue: 185600000,
      icon: "PH",
      iconBg: "#4CAF50",
    },
    {
      id: 3,
      name: "Business Strategy Course",
      category: "28 đơn hàng",
      revenue: 50400000,
      icon: "BS",
      iconBg: "#FF9800",
    },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN").format(amount) + " đ";
  };

  return (
    <div className={styles.revenue}>
      <div className={styles.header}>
        <h2 className={styles.title}>Doanh Thu</h2>
        <p className={styles.subtitle}>
          Theo dõi và phân tích doanh thu của bạn
        </p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ backgroundColor: "#4CAF50" }}
          >
            <span>₫</span>
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>Tổng Doanh Thu</p>
            <h3 className={styles.statValue}>
              {formatCurrency(revenueData.totalRevenue)}
            </h3>
            <span className={styles.statChange}>+12.5% so với tháng trước</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ backgroundColor: "#2196F3" }}
          >
            <span>📊</span>
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>Doanh Thu Tháng</p>
            <h3 className={styles.statValue}>
              {formatCurrency(revenueData.thisMonthRevenue)}
            </h3>
            <span className={styles.statChange}>+8.2% so với tháng trước</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ backgroundColor: "#FF9800" }}
          >
            <span>📦</span>
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>Số Đơn Hàng</p>
            <h3 className={styles.statValue}>{revenueData.orders}</h3>
            <span className={styles.statChange}>+15 đơn hàng</span>
          </div>
        </div>
      </div>

      <div className={styles.chartSection}>
        <h3 className={styles.chartTitle}>Biểu Đồ Doanh Thu</h3>
        <div className={styles.chartPlaceholder}>
          <p>Biểu đồ doanh thu theo thời gian</p>
        </div>
        <div className={styles.chartTabs}>
          <button className={`${styles.chartTab} ${styles.active}`}>
            7 ngày
          </button>
          <button className={styles.chartTab}>30 ngày</button>
          <button className={styles.chartTab}>90 ngày</button>
        </div>
      </div>

      <div className={styles.topProducts}>
        <h3 className={styles.productsTitle}>Top 3 Sản Phẩm Bán Chạy</h3>
        <div className={styles.productsList}>
          {topProducts.map((product) => (
            <div key={product.id} className={styles.productItem}>
              <div
                className={styles.productIcon}
                style={{ backgroundColor: product.iconBg }}
              >
                {product.icon}
              </div>
              <div className={styles.productInfo}>
                <h4 className={styles.productName}>{product.name}</h4>
                <p className={styles.productCategory}>{product.category}</p>
              </div>
              <div className={styles.productRevenue}>
                {formatCurrency(product.revenue)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Revenue;
