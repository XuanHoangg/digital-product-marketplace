import React, { useState } from "react";
import styles from "./Revenue.module.scss";

const Revenue = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("30 ngày qua");
  const [chartPeriod, setChartPeriod] = useState("Tuần");

  // Mock data - sẽ thay thế bằng API call sau
  const summaryData = {
    totalRevenue: "2.8 tỷ đ",
    platform: "280M đ",
    growth: "+15.3%",
    growthNote: "+370M đ so với tháng trước",
    marketValue: "610.000 đ",
  };

  const revenueBreakdown = [
    { category: "UI/UX Design", amount: "850M đ", color: "#4285f4" },
    { category: "Photography", amount: "720M đ", color: "#00bcd4" },
    { category: "Business", amount: "680M đ", color: "#ff9800" },
    { category: "Education", amount: "520M đ", color: "#9c27b0" },
    { category: "Marketing", amount: "230M đ", color: "#f44336" },
  ];

  const topSellers = [
    {
      name: "DigitalMarket Store",
      orders: "156 đơn hàng",
      revenue: "850M đ",
      avatar: "DM",
      color: "#4285f4",
    },
    {
      name: "TechShop Vietnam",
      orders: "89 đơn hàng",
      revenue: "720M đ",
      avatar: "TS",
      color: "#00bcd4",
    },
    {
      name: "Creative Studio",
      orders: "234 đơn hàng",
      revenue: "680M đ",
      avatar: "CS",
      color: "#ff9800",
    },
  ];

  const topProducts = [
    {
      name: "Complete UI Kit Bundle",
      sales: "45 lượt bán",
      revenue: "56.25M đ",
      avatar: "UI",
      color: "#4285f4",
    },
    {
      name: "Photography Masterclass",
      sales: "32 lượt bán",
      revenue: "185.6M đ",
      avatar: "PH",
      color: "#00bcd4",
    },
    {
      name: "Business Strategy Course",
      sales: "28 lượt bán",
      revenue: "50.4M đ",
      avatar: "BS",
      color: "#ff9800",
    },
  ];

  return (
    <div className={styles.revenue}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Báo Cáo Doanh Thu</h1>
          <p className={styles.subtitle}>
            Phân tích doanh thu và hiệu suất kinh doanh
          </p>
        </div>
        <div className={styles.headerRight}>
          <select
            className={styles.periodSelect}
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="30 ngày qua">30 ngày qua</option>
            <option value="7 ngày qua">7 ngày qua</option>
            <option value="90 ngày qua">90 ngày qua</option>
          </select>
          <button className={styles.exportBtn}>↓ Xuất báo cáo</button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className={styles.summaryCards}>
        <div className={styles.card}>
          <div
            className={styles.cardIcon}
            style={{ backgroundColor: "#e8f5e8" }}
          >
            <span style={{ color: "#4caf50" }}>₫</span>
          </div>
          <div className={styles.cardContent}>
            <p className={styles.cardLabel}>Tổng Doanh Thu</p>
            <h3 className={styles.cardValue}>{summaryData.totalRevenue}</h3>
          </div>
        </div>

        <div className={styles.card}>
          <div
            className={styles.cardIcon}
            style={{ backgroundColor: "#e3f2fd" }}
          >
            <span style={{ color: "#2196f3" }}>↑</span>
          </div>
          <div className={styles.cardContent}>
            <p className={styles.cardLabel}>Phí Nền Tảng</p>
            <h3 className={styles.cardValue}>{summaryData.platform}</h3>
          </div>
        </div>

        <div className={styles.card}>
          <div
            className={styles.cardIcon}
            style={{ backgroundColor: "#fff3e0" }}
          >
            <span style={{ color: "#ff9800" }}>%</span>
          </div>
          <div className={styles.cardContent}>
            <p className={styles.cardLabel}>Tăng Trưởng Tháng</p>
            <h3 className={styles.cardValue} style={{ color: "#ff9800" }}>
              {summaryData.growth}
            </h3>
            <p className={styles.cardNote}>{summaryData.growthNote}</p>
          </div>
        </div>

        <div className={styles.card}>
          <div
            className={styles.cardIcon}
            style={{ backgroundColor: "#f3e5f5" }}
          >
            <span style={{ color: "#9c27b0" }}>G</span>
          </div>
          <div className={styles.cardContent}>
            <p className={styles.cardLabel}>Giá Trị TB/Đơn</p>
            <h3 className={styles.cardValue}>{summaryData.marketValue}</h3>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Chart Section */}
        <div className={styles.chartSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Biểu Đồ Doanh Thu</h2>
            <div className={styles.chartTabs}>
              {["Tuần", "Tháng", "Năm"].map((period) => (
                <button
                  key={period}
                  className={`${styles.chartTab} ${
                    chartPeriod === period ? styles.active : ""
                  }`}
                  onClick={() => setChartPeriod(period)}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.chartPlaceholder}>
            <p>Biểu đồ doanh thu theo thời gian</p>
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className={styles.revenueBreakdown}>
          <h2 className={styles.sectionTitle}>Phân Tích Doanh Thu</h2>
          <div className={styles.breakdownList}>
            {revenueBreakdown.map((item, index) => (
              <div key={index} className={styles.breakdownItem}>
                <div
                  className={styles.breakdownDot}
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className={styles.breakdownCategory}>
                  {item.category}
                </span>
                <span className={styles.breakdownAmount}>{item.amount}</span>
              </div>
            ))}
          </div>
          <div className={styles.breakdownFooter}>
            <p>Biểu đồ tròn phân bổ doanh thu</p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className={styles.bottomSection}>
        {/* Top Sellers */}
        <div className={styles.topSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Top Người Bán Theo Doanh Thu
            </h2>
            <button className={styles.viewAllBtn}>Xem tất cả</button>
          </div>
          <div className={styles.topList}>
            {topSellers.map((seller, index) => (
              <div key={index} className={styles.topItem}>
                <div
                  className={styles.topAvatar}
                  style={{ backgroundColor: seller.color }}
                >
                  {seller.avatar}
                </div>
                <div className={styles.topInfo}>
                  <h4 className={styles.topName}>{seller.name}</h4>
                  <p className={styles.topSubtext}>{seller.orders}</p>
                </div>
                <div className={styles.topAmount}>{seller.revenue}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className={styles.topSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Top Sản Phẩm Theo Doanh Thu</h2>
            <button className={styles.viewAllBtn}>Xem tất cả</button>
          </div>
          <div className={styles.topList}>
            {topProducts.map((product, index) => (
              <div key={index} className={styles.topItem}>
                <div
                  className={styles.topAvatar}
                  style={{ backgroundColor: product.color }}
                >
                  {product.avatar}
                </div>
                <div className={styles.topInfo}>
                  <h4 className={styles.topName}>{product.name}</h4>
                  <p className={styles.topSubtext}>{product.sales}</p>
                </div>
                <div className={styles.topAmount}>{product.revenue}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
