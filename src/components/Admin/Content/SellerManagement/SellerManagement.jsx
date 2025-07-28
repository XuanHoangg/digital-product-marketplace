import React, { useState } from "react";
import styles from "./SellerManagement.module.scss";

const SellerManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);
  const [stateFilter, setStateFilter] = useState("Trạng thái");

  // Mock data - sẽ thay thế bằng API call sau
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

  const statusOptions = ["Tất cả", "Hoạt động", "Bị chán"];
  const stateOptions = ["Trạng thái", "Hoạt động", "Bị chán"];

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return { text: "Hoạt động", class: "active" };
      case "blocked":
        return { text: "Bị chán", class: "blocked" };
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

  const filteredSellers = sellersData.filter((seller) => {
    const matchesSearch =
      seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "Tất cả" ||
      (statusFilter === "Hoạt động" && seller.status === "active") ||
      (statusFilter === "Bị chán" && seller.status === "blocked");
    return matchesSearch && matchesStatus;
  });

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

          <div className={styles.dropdown}>
            <select
              className={styles.dropdown__select}
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
            >
              {stateOptions.map((option) => (
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
            {filteredSellers.map((seller) => {
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
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          ‹
        </button>

        {[1, 2, 3].map((page) => (
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

        <span className={styles.pagination__dots}>...</span>

        <button
          className={`${styles.pagination__button} ${styles.pagination__next}`}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default SellerManagement;
