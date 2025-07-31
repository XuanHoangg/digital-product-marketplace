import React, { useState, useEffect } from "react";
import styles from "./SellerManagement.module.scss";
import { getSellerList } from "@service/admin/adminManagement";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const SellerManagement = () => {
  const [stateFilter, setStateFilter] = useState("Trạng thái");

  const userId = useSelector((state) => state?.auth?.account?.userId);
  const [selectedUserToBan, setSelectedUserToBan] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);
  const [sellers, setSellers] = useState([]);

  const [totalSellers, setTotalSellers] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetchData();
  }, [currentPage, statusFilter, searchTerm]);
  const fetchData = async () => {
    try {
      const filterStatus =
        statusFilter === "Tất cả"
          ? 0
          : statusFilter === "Hoạt động"
          ? 1
          : statusFilter === "Tạm ngưng"
          ? 2
          : 3;

      const response = await getSellerList(
        userId,
        searchTerm,
        filterStatus,
        pageSize,
        currentPage
      );

      const stores = response?.data?.storeIndices || [];
      console.log("Stores:", response);
      const mappedSellers = stores.map((store) => {
        const statusText = store.status;
        let status = "unknown";
        if (statusText === "Hoạt động") status = "active";
        else if (statusText === "Tạm ngưng") status = "suspended";
        else if (statusText === "Đã xóa") status = "deleted";

        return {
          id: store.storeId,
          name: store.storeName,
          owner: store.storeName.split(" ")[2]?.split("@")[0] || "Chưa rõ",
          products: store.countProduct,
          revenue: store.revenue?.toLocaleString("vi-VN") + " đ" || "0 đ",
          rating: store.rating,
          status,
          avatar:
            store.storeName
              ?.split(" ")
              .slice(-2)
              .map((s) => s[0])
              .join("") || "ST",
        };
      });

      setSellers(mappedSellers);
      setTotalSellers(response?.data?.total || 0); // Cập nhật tổng seller
    } catch (error) {
      console.error("Error fetching seller list:", error);
      toast.error("Không thể tải danh sách người bán");
    }
  };

  const statsData = {
    totalSellers: 3254,
    activeSellers: 2847,
    newSellers: 1847,
    blockedSellers: 234,
  };

  const sellersData = [
    {
      id: "SH001",
      name: "DigitalMarket Store",
      owner: "Nguyễn Văn A",
      products: 156,
      revenue: "850M đ",
      rating: 4.8,
      status: "active",
      avatar: "DM",
    },
    {
      id: "SH002",
      name: "TechShop Vietnam",
      owner: "Trần Thị B",
      products: 89,
      revenue: "720M đ",
      rating: 4.6,
      status: "active",
      avatar: "TS",
    },
    {
      id: "SH003",
      name: "Creative Studio",
      owner: "Lê Minh C",
      products: 234,
      revenue: "680M đ",
      rating: 4.9,
      status: "blocked",
      avatar: "CS",
    },
    {
      id: "SH004",
      name: "EduTech Solutions",
      owner: "Phạm Thị D",
      products: 67,
      revenue: "520M đ",
      rating: 4.7,
      status: "active",
      avatar: "ED",
    },
  ];

  const statusOptions = ["Tất cả", "Hoạt động", "Tạm ngưng", "Đã xóa"];

  // const stateOptions = ["Trạng thái", "Hoạt động", "Bị chán"];
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return { text: "Hoạt động", class: "active" };
      case "suspended":
        return { text: "Tạm ngưng", class: "suspended" };
      case "deleted":
        return { text: "Đã xóa", class: "deleted" };
      case "blocked":
        return { text: "Bị chặn", class: "blocked" };
      default:
        return { text: "Không xác định", class: "unknown" };
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`${styles.table__star} ${
          index < Math.floor(rating) ? styles["table__star--filled"] : ""
        }`}
      >
        ★
      </span>
    ));
  };

  const filteredSellers = sellers.filter((seller) => {
    const matchesSearch =
      seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.owner.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "Tất cả" ||
      (statusFilter === "Hoạt động" && seller.status === "active") ||
      (statusFilter === "Tạm ngưng" && seller.status === "suspended") ||
      (statusFilter === "Đã xóa" && seller.status === "deleted");

    return matchesSearch && matchesStatus;
  });
  const paginatedSellers = filteredSellers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const totalPages = Math.ceil(totalSellers / pageSize);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className={styles.userManagement}>
      <div className={styles.userManagement__header}>
        <div className={styles.userManagement__titleSection}>
          <h1 className={styles.userManagement__title}>Quản Lý Người Bán</h1>
          <p className={styles.userManagement__subtitle}>
            Quản lý shop và hoạt động kinh doanh
          </p>
        </div>
        <button className={styles.userManagement__addButton}>
          <span className={styles.userManagement__addIcon}>+</span>
          Thêm người bán
        </button>
      </div>

      {/* Stats Cards */}
      <div className={styles.stats}>
        <div
          className={`${styles.stats__card} ${styles["stats__card--total"]}`}
        >
          <div className={styles.stats__icon}>
            <span className={styles.stats__iconSymbol}>🏪</span>
          </div>
          <div className={styles.stats__content}>
            <h3 className={styles.stats__label}>Tổng Người Bán</h3>
            <p className={styles.stats__value}>
              {statsData.totalSellers.toLocaleString()}
            </p>
          </div>
        </div>

        <div
          className={`${styles.stats__card} ${styles["stats__card--active"]}`}
        >
          <div className={styles.stats__icon}>
            <span className={styles.stats__iconSymbol}>✅</span>
          </div>
          <div className={styles.stats__content}>
            <h3 className={styles.stats__label}>Người Bán Hoạt Động</h3>
            <p className={styles.stats__value}>
              {statsData.activeSellers.toLocaleString()}
            </p>
          </div>
        </div>

        <div className={`${styles.stats__card} ${styles["stats__card--new"]}`}>
          <div className={styles.stats__icon}>
            <span className={styles.stats__iconSymbol}>🆕</span>
          </div>
          <div className={styles.stats__content}>
            <h3 className={styles.stats__label}>Người Bán Mới</h3>
            <p className={styles.stats__value}>
              {statsData.newSellers.toLocaleString()}
            </p>
          </div>
        </div>

        <div
          className={`${styles.stats__card} ${styles["stats__card--blocked"]}`}
        >
          <div className={styles.stats__icon}>
            <span className={styles.stats__iconSymbol}>🚫</span>
          </div>
          <div className={styles.stats__content}>
            <h3 className={styles.stats__label}>Người Bán Bị Chặn</h3>
            <p className={styles.stats__value}>
              {statsData.blockedSellers.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className={styles.controls}>
        <div className={styles.controls__search}>
          <div className={styles.searchBox}>
            <span className={styles.searchBox__icon}>🔍</span>
            <input
              type="text"
              className={styles.searchBox__input}
              placeholder="Tìm kiếm theo tên shop, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.controls__filters}>
          <div className={styles.dropdown}>
            <select
              className={styles.dropdown__select}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span className={styles.dropdown__arrow}>▼</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableContainer}>
        <p style={{ textAlign: "center", marginBottom: "16px" }}>
          Tổng số người bán: {totalSellers}{" "}
          <span style={{ fontSize: "0.9em", color: "#666" }}>
            (Hiển thị {paginatedSellers.length} người bán trên mỗi trang)
          </span>
        </p>
        <table className={styles.table}>
          <thead className={styles.table__head}>
            <tr className={styles.table__row}>
              <th className={styles.table__header}>SHOP</th>
              <th className={styles.table__header}>CHỦ SHOP</th>
              <th className={styles.table__header}>SẢN PHẨM</th>
              <th className={styles.table__header}>DOANH THU</th>
              <th className={styles.table__header}>ĐÁNH GIÁ</th>
              <th className={styles.table__header}>TRẠNG THÁI</th>
              <th className={styles.table__header}>THAO TÁC</th>
            </tr>
          </thead>
          <tbody className={styles.table__body}>
            {paginatedSellers.map((seller) => {
              const statusBadge = getStatusBadge(seller.status);
              return (
                <tr key={seller.id} className={styles.table__row}>
                  <td className={styles.table__cell}>
                    <div className={styles.table__shop}>
                      <div className={styles.table__avatar}>
                        <span>{seller.avatar}</span>
                      </div>
                      <div className={styles.table__shopInfo}>
                        <div className={styles.table__shopName}>
                          {seller.name}
                        </div>
                        <div className={styles.table__shopId}>
                          ID: #{seller.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className={styles.table__cell}>
                    <span className={styles.table__owner}>{seller.owner}</span>
                  </td>
                  <td className={styles.table__cell}>
                    <span className={styles.table__products}>
                      {seller.products}
                    </span>
                  </td>
                  <td className={styles.table__cell}>
                    <span className={styles.table__revenue}>
                      {seller.revenue}
                    </span>
                  </td>
                  <td className={styles.table__cell}>
                    <div className={styles.table__rating}>
                      <div className={styles.table__stars}>
                        {renderStars(seller.rating)}
                      </div>
                      <span className={styles.table__ratingValue}>
                        {seller.rating}
                      </span>
                    </div>
                  </td>
                  <td className={styles.table__cell}>
                    <span
                      className={`${styles.table__status} ${
                        styles[`table__status--${statusBadge.class}`]
                      }`}
                    >
                      {statusBadge.text}
                    </span>
                  </td>
                  <td className={styles.table__cell}>
                    <div className={styles.table__actions}>
                      <button
                        className={styles.table__actionButton}
                        title="Xem chi tiết"
                      >
                        👁️
                      </button>
                      <button
                        className={styles.table__actionButton}
                        title="Chỉnh sửa"
                      >
                        ✏️
                      </button>
                      <button
                        className={styles.table__actionButton}
                        title="Xóa"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button
          className={`${styles.pagination__button} ${styles.pagination__prev}`}
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          ‹
        </button>

        {pages.map((page) => (
          <button
            key={page}
            className={`${styles.pagination__button} ${
              currentPage === page ? styles["pagination__button--active"] : ""
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}

        <button
          className={`${styles.pagination__button} ${styles.pagination__next}`}
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default SellerManagement;
