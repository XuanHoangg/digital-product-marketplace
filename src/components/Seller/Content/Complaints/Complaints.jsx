import React, { useState } from "react";
import styles from "./Complaints.module.scss";

const Complain = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const complainStats = [
    {
      label: "Tổng Khiếu Nại",
      value: 23,
      change: "+3 khiếu nại mới",
      icon: "A",
      color: "#ef4444",
    },
    {
      label: "Chờ Xử Lý",
      value: 8,
      change: "+2 từ hôm qua",
      icon: "C",
      color: "#f59e0b",
    },
    {
      label: "Đã Giải Quyết",
      value: 15,
      change: "Tỷ lệ giải quyết 65%",
      icon: "G",
      color: "#10b981",
    },
  ];

  const complainsList = [
    {
      id: 1,
      avatar: "KN",
      title: "Khiếu nại về chất lượng sản phẩm",
      customer: "Khách hàng: Nguyễn Văn A",
      date: "Đơn hàng: DH001",
      time: "2024-05-23 14:30",
      description:
        "Sản phẩm UI Kit không đúng như mô tả, thiếu nhiều component quan trọng. Khách hàng yêu cầu hoàn tiền hoặc cập nhật đủ sản phẩm.",
      status: "Chờ xử lý",
      statusColor: "#f59e0b",
      actions: ["Xử lý", "Chi tiết"],
    },
    {
      id: 2,
      avatar: "HT",
      title: "Yêu cầu hoàn tiền",
      customer: "Khách hàng: Lê Minh C",
      date: "Đơn hàng: DH003",
      time: "2024-05-21 10:15",
      description:
        "Khách hàng không hài lòng về khóa học và yêu cầu hoàn tiền. Đã sử dụng hoàn tiền 100% theo chính sách.",
      status: "Đã giải quyết",
      statusColor: "#10b981",
      actions: ["Xem lại"],
    },
  ];

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Chờ xử lý":
        return styles.statusPending;
      case "Đã giải quyết":
        return styles.statusResolved;
      default:
        return styles.statusDefault;
    }
  };

  const filteredComplaints = complainsList.filter(
    (complaint) =>
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.complain}>
      <div className={styles.header}>
        <h2 className={styles.title}>Quản Lý Khiếu Nại</h2>
        <p className={styles.subtitle}>
          Xử lý và theo dõi các khiếu nại từ khách hàng
        </p>
      </div>

      <div className={styles.statsGrid}>
        {complainStats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div
              className={styles.statIcon}
              style={{ backgroundColor: stat.color }}
            >
              {stat.icon}
            </div>
            <div className={styles.statContent}>
              <p className={styles.statLabel}>{stat.label}</p>
              <h3 className={styles.statValue}>{stat.value}</h3>
              <span className={styles.statChange}>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.complainsSection}>
        <div className={styles.sectionHeader}>
          <input
            type="text"
            placeholder="Tìm kiếm khiếu nại..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className={styles.filterBtn}>Tất cả trạng thái ▼</button>
        </div>

        <div className={styles.complainsList}>
          {filteredComplaints.map((complaint) => (
            <div key={complaint.id} className={styles.complainItem}>
              <div className={styles.complainHeader}>
                <div className={styles.complainAvatar}>{complaint.avatar}</div>
                <div className={styles.complainInfo}>
                  <h4 className={styles.complainTitle}>{complaint.title}</h4>
                  <div className={styles.complainMeta}>
                    <span>{complaint.customer}</span>
                    <span>•</span>
                    <span>{complaint.date}</span>
                  </div>
                  <div className={styles.complainTime}>{complaint.time}</div>
                </div>
                <div className={styles.complainStatus}>
                  <span
                    className={`${styles.statusBadge} ${getStatusBadgeClass(
                      complaint.status
                    )}`}
                  >
                    {complaint.status}
                  </span>
                </div>
              </div>
              <div className={styles.complainBody}>
                <p className={styles.complainDescription}>
                  {complaint.description}
                </p>
                <div className={styles.complainActions}>
                  {complaint.actions.map((action, index) => (
                    <button
                      key={index}
                      className={
                        index === 0 ? styles.primaryBtn : styles.secondaryBtn
                      }
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Complain;
