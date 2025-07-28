import React, { useState } from "react";
import styles from "./Category.module.scss";

const Category = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Tất cả");
  const [sortBy, setSortBy] = useState("Sort");
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data - sẽ thay thế bằng API call sau
  const summaryData = {
    totalCategories: 24,
    activeCategories: 21,
  };

  const filterOptions = ["Tất cả", "Hoạt động", "Chờ duyệt", "Tạm dừng"];
  const sortOptions = [
    "Sort",
    "Tên A-Z",
    "Tên Z-A",
    "Số sản phẩm cao",
    "Số sản phẩm thấp",
  ];

  const categories = [
    {
      id: 1,
      name: "UI/UX Design",
      description: "Thiết kế giao diện và trải nghiệm người dùng",
      productCount: "15.234 sản phẩm",
      icon: "★",
      iconBg: "#4285f4",
      status: "Hoạt động",
      statusColor: "#00bcd4",
    },
    {
      id: 2,
      name: "Photography",
      description: "Khóa học và tài liệu nhiếp ảnh",
      productCount: "8.567 sản phẩm",
      icon: "📷",
      iconBg: "#00bcd4",
      status: "Hoạt động",
      statusColor: "#00bcd4",
    },
    {
      id: 3,
      name: "Business",
      description: "Khóa học kinh doanh và quản lý",
      productCount: "12.890 sản phẩm",
      icon: "💼",
      iconBg: "#ff9800",
      status: "Hoạt động",
      statusColor: "#00bcd4",
    },
    {
      id: 4,
      name: "Education",
      description: "Tài liệu học tập và giáo dục",
      productCount: "9.456 sản phẩm",
      icon: "🎓",
      iconBg: "#9c27b0",
      status: "Hoạt động",
      statusColor: "#00bcd4",
    },
    {
      id: 5,
      name: "Marketing",
      description: "Tài liệu và khóa học marketing",
      productCount: "6.789 sản phẩm",
      icon: "📊",
      iconBg: "#f44336",
      status: "Hoạt động",
      statusColor: "#00bcd4",
    },
    {
      id: 6,
      name: "Technology",
      description: "Công nghệ và lập trình",
      productCount: "4.123 sản phẩm",
      icon: "💻",
      iconBg: "#00bcd4",
      status: "Chờ duyệt",
      statusColor: "#ff9800",
    },
    {
      id: 7,
      name: "Health & Fitness",
      description: "Sức khỏe và thể hình",
      productCount: "2.456 sản phẩm",
      icon: "💪",
      iconBg: "#e91e63",
      status: "Tạm dừng",
      statusColor: "#f44336",
    },
    {
      id: 8,
      name: "Art & Design",
      description: "Nghệ thuật và thiết kế sáng tạo",
      productCount: "7.234 sản phẩm",
      icon: "🎨",
      iconBg: "#8bc34a",
      status: "Hoạt động",
      statusColor: "#00bcd4",
    },
  ];

  const filteredCategories = categories.filter((category) => {
    const matchesSearch =
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilter === "Tất cả" || category.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredCategories.length / 8);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * 8,
    currentPage * 8
  );

  return (
    <div className={styles.category}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Quản Lý Danh Mục</h1>
          <p className={styles.subtitle}>
            Tổ chức và quản lý danh mục sản phẩm
          </p>
        </div>
        <button className={styles.addBtn}>+ Thêm danh mục</button>
      </div>

      {/* Summary Cards */}
      <div className={styles.summaryCards}>
        <div className={styles.summaryCard}>
          <div
            className={styles.cardIcon}
            style={{ backgroundColor: "#e3f2fd" }}
          >
            <span style={{ color: "#2196f3" }}>≡</span>
          </div>
          <div className={styles.cardContent}>
            <p className={styles.cardLabel}>Tổng Danh Mục</p>
            <h3 className={styles.cardValue}>{summaryData.totalCategories}</h3>
          </div>
        </div>

        <div className={styles.summaryCard}>
          <div
            className={styles.cardIcon}
            style={{ backgroundColor: "#e8f5e8" }}
          >
            <span style={{ color: "#4caf50" }}>✓</span>
          </div>
          <div className={styles.cardContent}>
            <p className={styles.cardLabel}>Danh Mục Hoạt Động</p>
            <h3 className={styles.cardValue}>{summaryData.activeCategories}</h3>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className={styles.filterSection}>
        <div className={styles.searchBox}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Tìm kiếm danh mục..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterControls}>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className={styles.filterSelect}
          >
            {filterOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.sortSelect}
          >
            {sortOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Categories Grid */}
      <div className={styles.categoriesGrid}>
        {paginatedCategories.map((category) => (
          <div key={category.id} className={styles.categoryCard}>
            <div className={styles.categoryHeader}>
              <div
                className={styles.categoryIcon}
                style={{ backgroundColor: category.iconBg }}
              >
                {category.icon}
              </div>
              <div
                className={styles.statusBadge}
                style={{ backgroundColor: category.statusColor }}
              >
                {category.status}
              </div>
            </div>

            <div className={styles.categoryContent}>
              <h3 className={styles.categoryName}>{category.name}</h3>
              <p className={styles.categoryDescription}>
                {category.description}
              </p>
              <div className={styles.categoryStats}>
                <span className={styles.productCount}>
                  {category.productCount}
                </span>
                <div className={styles.categoryActions}>
                  <button className={styles.editBtn}>✏️</button>
                  <button className={styles.trendBtn}>📈</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button
          className={styles.paginationBtn}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          ‹
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`${styles.paginationBtn} ${
              currentPage === page ? styles.active : ""
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}

        <button
          className={styles.paginationBtn}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default Category;
