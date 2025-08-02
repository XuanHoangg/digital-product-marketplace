import React, { useState, useEffect } from "react";
import styles from "./UserManagement.module.scss";
import { getUserList, putUpdateUser } from "@service/admin/adminManagement";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const UserManagement = () => {
  const userId = useSelector((state) => state?.auth?.account?.userId);
  const [selectedUserToBan, setSelectedUserToBan] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const count = 5;

  useEffect(() => {
    fetchData();
  }, [userId, searchTerm, statusFilter, currentPage]);

  const fetchData = async () => {
    try {
      const filterStatus =
        statusFilter === "Tất cả"
          ? null
          : statusFilter === "Hoạt động"
          ? true
          : false;
      const response = await getUserList(
        userId,
        searchTerm,
        filterStatus,
        count,
        currentPage
      );

      const usersFromAPI = response.data?.users || [];
      const totalFromAPI = response.data?.total || 0;

      const mapped = usersFromAPI.map((item) => ({
        id: item.id,
        name: item.name,
        email: item.email || "chưa có email",
        joinDate: new Date(item.joinAt).toLocaleDateString("vi-VN"),
        orders: item.countOrder || 0,
        totalSpent: item.expenditure?.toLocaleString("vi-VN") + " đ" || "0 đ",
        status: item.status,
        avatar: item.name
          ?.split(" ")
          .slice(-2)
          .map((s) => s[0])
          .join(""),
      }));

      setUsers(mapped);
      setTotalUsers(totalFromAPI);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };
  const handleConfirmBan = async () => {
    if (!selectedUserToBan) return;

    try {
      await putUpdateUser(userId, selectedUserToBan);
      toast.success("Đã khóa người dùng!");
      fetchData();
    } catch (error) {
      toast.error("Khóa người dùng thất bại!");
      console.error("Error banning user:", error);
    } finally {
      setShowConfirmModal(false);
      setSelectedUserToBan(null);
    }
  };
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
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <p style={{ textAlign: "center", marginBottom: "16px" }}>
            Hiển thị {users.length} người dùng trên tổng {totalUsers} người dùng
          </p>
          <table className={styles.table}>
            <thead className={styles.tableRow}>
              <tr>
                <th style={{ paddingLeft: "24px" }}>NGƯỜI DÙNG</th>

                <th style={{ paddingLeft: "24px" }}>NGÀY THAM GIA</th>
                <th style={{ paddingLeft: "24px" }}>ĐƠN HÀNG</th>
                <th style={{ paddingLeft: "24px" }}>CHI TIÊU</th>
                <th style={{ paddingLeft: "24px" }}>TRẠNG THÁI</th>
                <th style={{ paddingLeft: "24px" }}>THAO TÁC</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {users.length > 0 ? (
                users.map((user) => (
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
                          title="Khóa người dùng"
                          onClick={() => {
                            setSelectedUserToBan(user.id);
                            setShowConfirmModal(true);
                          }}
                        >
                          🔒
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className={styles.tableCell}
                    style={{ textAlign: "center" }}
                  >
                    Không tìm thấy người dùng với “{searchTerm}”
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className={styles.pagination}>
          <button
            className={styles.paginationButton}
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            ‹
          </button>

          {Array.from({ length: Math.ceil(totalUsers / count) }, (_, i) => (
            <button
              key={i + 1}
              className={`${styles.paginationButton} ${
                currentPage === i + 1 ? styles.paginationButtonActive : ""
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className={styles.paginationButton}
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(Math.ceil(totalUsers / count), prev + 1)
              )
            }
            disabled={currentPage === Math.ceil(totalUsers / count)}
          >
            ›
          </button>
        </div>
      </div>
      {showConfirmModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Xác nhận khóa người dùng</h3>
            <p>
              Bạn có chắc muốn khóa người dùng có ID #{selectedUserToBan} không?
            </p>
            <div className={styles.modalActions}>
              <button
                className={styles.confirmButton}
                onClick={handleConfirmBan}
              >
                Xác nhận
              </button>
              <button
                className={styles.cancelButton}
                onClick={() => {
                  setShowConfirmModal(false);
                  setSelectedUserToBan(null);
                }}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
