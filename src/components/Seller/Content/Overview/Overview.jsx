import React, { useState, useEffect } from "react";
import { TrendingUp, ShoppingCart, Package, Star } from "lucide-react";
import styles from "./Overview.module.scss";
import { useSelector } from "react-redux";
import { getSellerOverview } from "@service/seller/sellerOverview";
import { getStoreDetails, putUpdateStore } from "@service/seller/sellerAPI";
import { getRevenue } from "@service/seller/sellerRevenue";
import UpdateStoreModal from "./UpdateStoreModal/UpdateStoreModal";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { toast } from "react-toastify";

const Overview = () => {
  const userId = useSelector((state) => state?.auth?.account?.userId);
  const [storeDetails, setStoreDetails] = useState({});

  const [chartPeriod, setChartPeriod] = useState("7");
  const [statsData, setStatsData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState(7);
  const [isModalOpen, setModalOpen] = useState(false);
  const iconMap = {
    "Doanh thu": TrendingUp,
    "Đơn hàng": ShoppingCart,
    "Sản phẩm": Package,
    "Đánh giá": Star,
  };
  useEffect(() => {
    fetchDataOverview(userId, chartPeriod, setStatsData);
    fetchDataChart(userId, chartType);
    fetchStoreDetails(userId);
  }, [userId, chartPeriod, chartType]);

  const fetchDataOverview = async (userId, CountDay, setStatsData) => {
    try {
      const res = await getSellerOverview(userId, CountDay);
      const rawData = res?.data || [];
      const mapped = rawData.map((item) => {
        const icon = iconMap[item.overViewName] || BarChart;
        let suffix = "";
        let trend = "neutral";
        if (
          item.overViewName === "Doanh thu" ||
          item.overViewName === "Đơn hàng"
        ) {
          trend = item.information.includes("100%") ? "neutral" : "up"; // Tuỳ bạn xử lý tăng/giảm
        }

        return {
          title: item.overViewName,
          value: item.value,
          change: item.information,
          icon,
          suffix,
          trend,
        };
      });

      setStatsData(mapped);
    } catch (error) {
      console.error("Lỗi lấy dữ liệu tổng quan:", error);
    }
  };
  const fetchDataChart = async (userId, CountDay) => {
    try {
      const res = await getRevenue(userId, CountDay);

      const rawData = res?.data || [];

      const maxRevenue = Math.max(
        ...rawData.map((item) => item.revenue || 0),
        1
      );

      const transformedData = rawData.map((item) => ({
        date: new Date(item.date).toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit", // thêm dòng này
        }),
        revenue: item.revenue,
      }));
      setChartData(transformedData);
    } catch (error) {
      console.error("Lỗi lấy dữ liệu biểu đồ:", error);
    }
  };
  const fetchStoreDetails = async (userId) => {
    try {
      const res = await getStoreDetails(userId);
      if (res?.data) {
        setStoreDetails(res.data);
      } else {
        return toast.error("Không tìm thấy thông tin cửa hàng.");
      }
    } catch (error) {
      console.error("Lỗi lấy thông tin cửa hàng:", error);
    }
  };

  const handleUpdateStore = async (userId, storeDetails, name, image) => {
    try {
      const data = await putUpdateStore(
        userId,
        storeDetails.storeId,
        name,
        image
      );
      if (data.status === 0) {
        setModalOpen(false);
        toast.success(data.data);
      } else {
        toast.error(data.data);
      }
    } catch (err) {
      toast.error("Cập nhật thất bại, vui lòng thử lại sau.");
    }
  };

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
    <div className={styles.overviewContent}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.headerTitle}>Tổng quan</h1>
          <p className={styles.headerSubtitle}>Chào mừng bạn đến với store.</p>
        </div>

        <select
          className={styles.numberSelect}
          value={chartPeriod}
          onChange={(e) => setChartPeriod(e.target.value)}
        >
          <option value="7">7 ngày</option>
          <option value="30">30 ngày</option>
        </select>
      </div>
      <div className={styles.storeInfo}>
        <button
          className={styles.editStoreBtn}
          onClick={() => setModalOpen(true)}
        >
          Sửa thông tin cửa hàng
        </button>
      </div>
      <div className={styles.statsGrid}>
        {statsData.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.statHeader}>
              <span className={styles.statTitle}>{stat.title}</span>
              <stat.icon className={styles.statIcon} size={20} />
            </div>
            <div className={styles.statValue}>
              {stat.value}
              {stat.suffix && (
                <span className={styles.statSuffix}>{stat.suffix}</span>
              )}
            </div>
            <div className={`${styles.statChange} ${styles[stat.trend]}`}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Chart and Best Selling Products */}
      <div className={styles.contentRow}>
        <div className={styles.chartSection}>
          <div className={styles.sectionHeader}>
            <h3>Doanh Thu Theo Thời Gian</h3>
            <div className={styles.chartFilters}>
              <button
                className={chartType === 7 ? styles.active : ""}
                onClick={() => setChartType(7)}
              >
                Tuần
              </button>
              <button
                className={chartType === 30 ? styles.active : ""}
                onClick={() => setChartType(30)}
              >
                Tháng
              </button>
            </div>
          </div>

          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => `${value}₫`} />
                <Bar dataKey="revenue" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/*  */}
        <div className={styles.bestSellingSection}>
          <div className={styles.sectionHeader}>
            <h3>Sản Phẩm Bán Chạy</h3>
            <button className={styles.viewAllBtn}>Xem tất cả sản phẩm</button>
          </div>
          <div className={styles.productList}>
            {bestSellingProducts.map((product) => (
              <div key={product.id} className={styles.productItem}>
                <div
                  className={styles.productAvatar}
                  style={{ backgroundColor: product.color }}
                >
                  {product.id}
                </div>
                <div className={styles.productInfo}>
                  <div className={styles.productName}>{product.name}</div>
                  <div className={styles.productSold}>{product.sold}</div>
                </div>
                <div className={styles.productPrice}>{product.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders and Notifications */}
      <div className={styles.contentRow}>
        <div className={styles.ordersSection}>
          <div className={styles.sectionHeader}>
            <h3>Đơn Hàng Gần Đây</h3>
            <button className={styles.viewAllBtn}>Xem tất cả</button>
          </div>
          <div className={styles.ordersList}>
            {recentOrders.map((order) => (
              <div key={order.id} className={styles.orderItem}>
                <div className={styles.orderAvatar}>{order.id}</div>
                <div className={styles.orderInfo}>
                  <div className={styles.orderCustomer}>{order.customer}</div>
                  <div className={styles.orderProduct}>{order.product}</div>
                </div>
                <div className={styles.orderAmount}>{order.amount}</div>
                <div
                  className={styles.orderStatus}
                  style={{ color: order.statusColor }}
                >
                  {order.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.notificationsSection}>
          <div className={styles.sectionHeader}>
            <h3>Tin Nhắn Gần Đây</h3>
            <button className={styles.viewAllBtn}>Xem tất cả</button>
          </div>
          <div className={styles.notificationsList}>
            {recentNotifications.map((notification) => (
              <div key={notification.id} className={styles.notificationItem}>
                <div className={styles.notificationAvatar}>
                  {notification.id}
                </div>
                <div className={styles.notificationInfo}>
                  <div className={styles.notificationCustomer}>
                    {notification.customer}
                  </div>
                  <div className={styles.notificationMessage}>
                    {notification.message}
                  </div>
                </div>
                <div className={styles.notificationTime}>
                  {notification.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <UpdateStoreModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleUpdateStore}
        userId={userId}
        storeId={storeDetails}
      />
    </div>
  );
};

export default Overview;
