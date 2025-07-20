import React, { useState } from "react";
import { TrendingUp, ShoppingCart, Package, Star } from "lucide-react";
import "./Overview.scss";

const Overview = () => {
  const [chartPeriod, setChartPeriod] = useState("day");

  const statsData = [
    {
      title: "Doanh Thu",
      value: "25.480.000đ",
      change: "~ 12.5% so với tuần trước",
      trend: "up",
      icon: TrendingUp,
    },
    {
      title: "Đơn Hàng",
      value: "128",
      change: "~ 8.2% so với tuần trước",
      trend: "up",
      icon: ShoppingCart,
    },
    {
      title: "Sản Phẩm",
      value: "24",
      change: "22 đang hoạt động, 2 đang chờ",
      trend: "neutral",
      icon: Package,
    },
    {
      title: "Đánh Giá",
      value: "4.8",
      change: "Dựa trên 96 đánh giá",
      trend: "up",
      icon: Star,
      suffix: "/5",
    },
  ];

  const chartData = [
    { label: "T2", value: 65 },
    { label: "T3", value: 45 },
    { label: "T4", value: 85 },
    { label: "T5", value: 55 },
    { label: "T6", value: 75 },
    { label: "T7", value: 95 },
    { label: "CN", value: 60 },
  ];

  const bestSellingProducts = [
    {
      id: "UI",
      name: "Premium UI Kit Bundle",
      sold: "42 bản đã bán",
      price: "8.400.000đ",
      color: "#4F46E5",
    },
    {
      id: "PH",
      name: "Photography Masterclass",
      sold: "36 bản đã bán",
      price: "7.200.000đ",
      color: "#06B6D4",
    },
    {
      id: "BS",
      name: "Business Strategy Course",
      sold: "28 bản đã bán",
      price: "5.600.000đ",
      color: "#8B5CF6",
    },
    {
      id: "IC",
      name: "Icon Library Pro",
      sold: "22 bản đã bán",
      price: "4.280.000đ",
      color: "#10B981",
    },
  ];

  const recentOrders = [
    {
      id: "NT",
      customer: "Nguyễn Văn Tùng",
      product: "Premium UI Kit Bundle",
      amount: "1.250.000đ",
      status: "Hoàn thành",
      statusColor: "#10B981",
    },
    {
      id: "LH",
      customer: "Lê Thị Hương",
      product: "Photography Masterclass",
      amount: "2.900.000đ",
      status: "Đang xử lý",
      statusColor: "#F59E0B",
    },
    {
      id: "TH",
      customer: "Trần Văn Hùng",
      product: "Business Strategy Course",
      amount: "1.800.000đ",
      status: "Hoàn thành",
      statusColor: "#10B981",
    },
    {
      id: "PM",
      customer: "Phạm Thị Mai",
      product: "Icon Library Pro",
      amount: "700.000đ",
      status: "Khiếu nại",
      statusColor: "#EF4444",
    },
  ];

  const recentNotifications = [
    {
      id: "NT",
      customer: "Nguyễn Văn Tùng",
      message: "Cảm ơn bạn rất nhiều về UI Kit. Tôi có thể...",
      time: "10:23",
      type: "review",
    },
    {
      id: "LH",
      customer: "Lê Thị Hương",
      message: "Tôi muốn hỏi về khóa học Photography...",
      time: "Hôm qua",
      type: "question",
    },
    {
      id: "PM",
      customer: "Phạm Thị Mai",
      message: "Tôi gặp vấn đề khi tải xuống Icon Library...",
      time: "15/05",
      type: "support",
    },
    {
      id: "TH",
      customer: "Trần Văn Hùng",
      message: "Khóa học rất hay, tôi muốn hỏi về phần...",
      time: "12/05",
      type: "question",
    },
  ];

  return (
    <div className="overview-content">
      <h1 className="headerTitle">Tổng quan</h1>
      <p className="headerSubtitle">Chào mừng bạn đến với store.</p>

      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-header">
              <span className="stat-title">{stat.title}</span>
              <stat.icon className="stat-icon" size={20} />
            </div>
            <div className="stat-value">
              {stat.value}
              {stat.suffix && (
                <span className="stat-suffix">{stat.suffix}</span>
              )}
            </div>
            <div className={`stat-change ${stat.trend}`}>{stat.change}</div>
          </div>
        ))}
      </div>

      {/* Chart and Best Selling Products */}
      <div className="content-row">
        <div className="chart-section">
          <div className="section-header">
            <h3>Doanh Thu Theo Thời Gian</h3>
            <div className="chart-filters">
              <button
                className={chartPeriod === "day" ? "active" : ""}
                onClick={() => setChartPeriod("day")}
              >
                Ngày
              </button>
              <button
                className={chartPeriod === "week" ? "active" : ""}
                onClick={() => setChartPeriod("week")}
              >
                Tuần
              </button>
              <button
                className={chartPeriod === "month" ? "active" : ""}
                onClick={() => setChartPeriod("month")}
              >
                Tháng
              </button>
            </div>
          </div>
          <div className="chart-container">
            <div className="chart-bars">
              {chartData.map((item, index) => (
                <div key={index} className="bar-container">
                  <div
                    className="bar"
                    style={{ height: `${item.value}%` }}
                  ></div>
                  <span className="bar-label">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color"></div>
                <span>Doanh thu</span>
              </div>
            </div>
          </div>
        </div>

        <div className="best-selling-section">
          <div className="section-header">
            <h3>Sản Phẩm Bán Chạy</h3>
            <button className="view-all-btn">Xem tất cả sản phẩm</button>
          </div>
          <div className="product-list">
            {bestSellingProducts.map((product) => (
              <div key={product.id} className="product-item">
                <div
                  className="product-avatar"
                  style={{ backgroundColor: product.color }}
                >
                  {product.id}
                </div>
                <div className="product-info">
                  <div className="product-name">{product.name}</div>
                  <div className="product-sold">{product.sold}</div>
                </div>
                <div className="product-price">{product.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders and Notifications */}
      <div className="content-row">
        <div className="orders-section">
          <div className="section-header">
            <h3>Đơn Hàng Gần Đây</h3>
            <button className="view-all-btn">Xem tất cả</button>
          </div>
          <div className="orders-list">
            {recentOrders.map((order) => (
              <div key={order.id} className="order-item">
                <div className="order-avatar">{order.id}</div>
                <div className="order-info">
                  <div className="order-customer">{order.customer}</div>
                  <div className="order-product">{order.product}</div>
                </div>
                <div className="order-amount">{order.amount}</div>
                <div
                  className="order-status"
                  style={{ color: order.statusColor }}
                >
                  {order.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="notifications-section">
          <div className="section-header">
            <h3>Tin Nhắn Gần Đây</h3>
            <button className="view-all-btn">Xem tất cả</button>
          </div>
          <div className="notifications-list">
            {recentNotifications.map((notification) => (
              <div key={notification.id} className="notification-item">
                <div className="notification-avatar">{notification.id}</div>
                <div className="notification-info">
                  <div className="notification-customer">
                    {notification.customer}
                  </div>
                  <div className="notification-message">
                    {notification.message}
                  </div>
                </div>
                <div className="notification-time">{notification.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
