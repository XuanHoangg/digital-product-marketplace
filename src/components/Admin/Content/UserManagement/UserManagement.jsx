import React, { useState } from "react";
import styles from "./UserManagement.module.scss";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data - replace with API call later
  const stats = [
    {
      title: "Tổng Người Dùng",
      count: "125.847",
      icon: "👥",
      color: "blue",
    },
    {
      title: "Người Dùng Hoạt Động",
      count: "45.231",
      icon: "✅",
      color: "green",
    },
    {
      title: "Người Dùng Mới",
      count: "1.847",
      subtitle: "7 ngày qua",
      icon: "🆕",
      color: "orange",
    },
    {
      title: "Người Dùng Bị Chặn",
      count: "234",
      icon: "🚫",
      color: "red",
    },
  ];

  const users = [
    {
      id: "ND001",
      name: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      joinDate: "15/03/2024",
      orders: 24,
      totalSpent: "15.750.000 đ",
      status: "Hoạt động",
      avatar: "NV",
    },
    {
      id: "ND002",
      name: "Trần Thị B",
      email: "tranthib@email.com",
      joinDate: "20/03/2024",
      orders: 18,
      totalSpent: "12.300.000 đ",
      status: "Hoạt động",
      avatar: "TT",
    },
    {
      id: "ND003",
      name: "Lê Minh C",
      email: "leminhc@email.com",
      joinDate: "25/03/2024",
      orders: 8,
      totalSpent: "5.200.000 đ",
      status: "Hoạt động",
      avatar: "LM",
    },
    {
      id: "ND004",
      name: "Phạm Thị D",
      email: "phamthid@email.com",
      joinDate: "28/03/2024",
      orders: 0,
      totalSpent: "0 đ",
      status: "Bị chặn",
      avatar: "PT",
    },
  ];

  const getStatusBadgeClass = (status) => {
    return status === "Hoạt động" ? styles.statusActive : styles.statusBlocked;
  };

  const getStatCardClass = (color) => {
    return `${styles.statCard} ${styles[`statCard--${color}`]}`;
  };

  return (
    <div className={styles.userManagement}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Quản Lý Người Dùng</h1>
          <p className={styles.subtitle}>
            Quản lý tài khoản và hoạt động của người dùng
          </p>
        </div>
        <button className={styles.addButton}>+ Thêm người dùng</button>
      </div>

      <div className={styles.statsContainer}>
        {stats.map((stat, index) => (
          <div key={index} className={getStatCardClass(stat.color)}>
            <div className={styles.statIcon}>
              <span className={styles.iconEmoji}>{stat.icon}</span>
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statTitle}>{stat.title}</h3>
              <div className={styles.statCount}>{stat.count}</div>
              {stat.subtitle && (
                <p className={styles.statSubtitle}>{stat.subtitle}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, email, ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <div className={styles.filtersContainer}>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="Tất cả">Tất cả</option>
              <option value="Hoạt động">Hoạt động</option>
              <option value="Bị chặn">Bị chặn</option>
            </select>
            <select className={styles.filterSelect}>
              <option value="all">Trạng thái</option>
            </select>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th className={styles.tableHeaderCell}>NGƯỜI DÙNG</th>
                <th className={styles.tableHeaderCell}>EMAIL</th>
                <th className={styles.tableHeaderCell}>NGÀY THAM GIA</th>
                <th className={styles.tableHeaderCell}>ĐƠN HÀNG</th>
                <th className={styles.tableHeaderCell}>CHI TIÊU</th>
                <th className={styles.tableHeaderCell}>TRẠNG THÁI</th>
                <th className={styles.tableHeaderCell}>THAO TÁC</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {users.map((user) => (
                <tr key={user.id} className={styles.tableRow}>
                  <td className={styles.tableCell}>
                    <div className={styles.userInfo}>
                      <div className={styles.avatar}>{user.avatar}</div>
                      <div className={styles.userDetails}>
                        <div className={styles.userName}>{user.name}</div>
                        <div className={styles.userId}>ID: #{user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className={styles.tableCell}>{user.email}</td>
                  <td className={styles.tableCell}>{user.joinDate}</td>
                  <td className={styles.tableCell}>{user.orders}</td>
                  <td className={styles.tableCell}>{user.totalSpent}</td>
                  <td className={styles.tableCell}>
                    <span className={getStatusBadgeClass(user.status)}>
                      {user.status}
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
                      <button className={styles.actionButton} title="Xóa">
                        🗑️
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

export default UserManagement;
