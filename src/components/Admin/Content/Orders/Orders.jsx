import React, { useState } from "react";
import styles from "./Orders.module.scss";

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Trạng thái");
  const [dateFilter, setDateFilter] = useState("Hôm nay");
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data - replace with API call later
  const stats = [
    {
      title: "Tổng Đơn Hàng",
      count: "45.892",
      subtitle: "+892 hôm nay",
      icon: "📋",
      color: "blue",
    },
    {
      title: "Chờ Xử Lý",
      count: "2.847",
      icon: "⏳",
      color: "orange",
    },
    {
      title: "Hoàn Thành",
      count: "38.456",
      icon: "✅",
      color: "green",
    },
    {
      title: "Đã Hủy",
      count: "4.589",
      icon: "❌",
      color: "red",
    },
  ];

  const orders = [
    {
      id: "DH001",
      time: "14:30",
      customerName: "Nguyễn Văn A",
      customerEmail: "nguyenvana@email.com",
      total: "1.250.000 đ",
      date: "23/05/2024",
      status: "Chờ xác nhận",
    },
    {
      id: "DH002",
      time: "10:15",
      customerName: "Trần Thị B",
      customerEmail: "tranthib@email.com",
      total: "5.800.000 đ",
      date: "23/05/2024",
      status: "Đang giao",
    },
    {
      id: "DH003",
      time: "16:45",
      customerName: "Lê Minh C",
      customerEmail: "leminhc@email.com",
      total: "1.800.000 đ",
      date: "22/05/2024",
      status: "Hoàn thành",
    },
    {
      id: "DH004",
      time: "11:30",
      customerName: "Hoàng Văn E",
      customerEmail: "hoangvane@email.com",
      total: "850.000 đ",
      date: "21/05/2024",
      status: "Đã hủy",
    },
  ];

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Hoàn thành":
        return styles.statusCompleted;
      case "Đang giao":
        return styles.statusDelivering;
      case "Chờ xác nhận":
        return styles.statusPending;
      case "Đã hủy":
        return styles.statusCancelled;
      default:
        return styles.statusPending;
    }
  };

  const getStatCardClass = (color) => {
    return `${styles.statCard} ${styles[`statCard--${color}`]}`;
  };

  return (
    <div className={styles.orderManagement}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Quản Lý Đơn Hàng</h1>
          <p className={styles.subtitle}>
            Theo dõi và xử lý tất cả đơn hàng trên nền tảng
          </p>
        </div>
        <button className={styles.refreshButton}>🔄 Làm mới</button>
      </div>

      <div className={styles.statsContainer}>
        {stats.map((stat, index) => (
          <div key={index} className={getStatCardClass(stat.color)}>
            <div className={styles.statContent}>
              <h3 className={styles.statTitle}>{stat.title}</h3>
              <div className={styles.statCount}>{stat.count}</div>
              {stat.subtitle && (
                <p className={styles.statSubtitle}>{stat.subtitle}</p>
              )}
            </div>
            <div className={styles.statIcon}>
              <span className={styles.iconEmoji}>{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <div className={styles.searchContainer}>
            <div className={styles.searchInputWrapper}>
              <span className={styles.searchIcon}>🔍</span>
              <input
                type="text"
                placeholder="Tìm kiếm theo mã đơn, khách hàng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>
          <div className={styles.filtersContainer}>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="Trạng thái">Trạng thái</option>
              <option value="Chờ xác nhận">Chờ xác nhận</option>
              <option value="Đang giao">Đang giao</option>
              <option value="Hoàn thành">Hoàn thành</option>
              <option value="Đã hủy">Đã hủy</option>
            </select>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="Hôm nay">Hôm nay</option>
              <option value="Tuần này">Tuần này</option>
              <option value="Tháng này">Tháng này</option>
              <option value="Tất cả">Tất cả</option>
            </select>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th className={styles.tableHeaderCell}>MÃ ĐƠN HÀNG</th>
                <th className={styles.tableHeaderCell}>KHÁCH HÀNG</th>
                <th className={styles.tableHeaderCell}>TỔNG TIỀN</th>
                <th className={styles.tableHeaderCell}>NGÀY ĐẶT</th>
                <th className={styles.tableHeaderCell}>TRẠNG THÁI</th>
                <th className={styles.tableHeaderCell}>THAO TÁC</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {orders.map((order) => (
                <tr key={order.id} className={styles.tableRow}>
                  <td className={styles.tableCell}>
                    <div className={styles.orderInfo}>
                      <div className={styles.orderId}>#{order.id}</div>
                      <div className={styles.orderTime}>{order.time}</div>
                    </div>
                  </td>
                  <td className={styles.tableCell}>
                    <div className={styles.customerInfo}>
                      <div className={styles.customerName}>
                        {order.customerName}
                      </div>
                      <div className={styles.customerEmail}>
                        {order.customerEmail}
                      </div>
                    </div>
                  </td>
                  <td className={styles.tableCell}>{order.total}</td>
                  <td className={styles.tableCell}>{order.date}</td>
                  <td className={styles.tableCell}>
                    <span className={getStatusBadgeClass(order.status)}>
                      {order.status}
                    </span>
                  </td>
                  <td className={styles.tableCell}>
                    <div className={styles.actions}>
                      <button
                        className={styles.actionButton}
                        title="Xem chi tiết"
                      >
                        👁️
                      </button>
                      <button className={styles.actionButton} title="Chỉnh sửa">
                        ✏️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.pagination}>
          <button
            className={styles.paginationButton}
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            ‹
          </button>
          <button
            className={`${styles.paginationButton} ${styles.paginationButtonActive}`}
          >
            1
          </button>
          <button className={styles.paginationButton}>2</button>
          <button className={styles.paginationButton}>3</button>
          <button
            className={styles.paginationButton}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
