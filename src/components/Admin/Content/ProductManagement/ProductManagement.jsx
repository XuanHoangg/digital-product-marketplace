import React, { useEffect, useState } from "react";
import styles from "./ProductManagement.module.scss";
import { useSelector } from "react-redux";
import { getOverviewProduct } from "@service/admin/adminProduct";
const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Danh mục");
  const [statusFilter, setStatusFilter] = useState("Trạng thái");
  const [currentPage, setCurrentPage] = useState(1);
  const [stats, setStats] = useState([]);
  const userId = useSelector((state) => state?.auth?.account?.userId);

  useEffect(() => {
    fetchOverview();
  }, [userId]);
  const fetchOverview = async () => {
    try {
      const response = await getOverviewProduct(userId);
      const data = response?.data?.indexDtos || [];

      const mappedStats = data.map((item) => {
        let color = "";
        let icon = "";

        switch (item.name) {
          case "Tổng sản phẩm":
            color = "blue";
            icon = "📦";
            break;
          case "Sản phẩm hoạt động":
            color = "green";
            icon = "✅";
            break;
          case "Chờ duyệt":
            color = "orange";
            icon = "⏳";
            break;
          default:
            color = "gray";
            icon = "❔";
        }

        return {
          title: item.name,
          count: item.value,
          color,
          icon,
        };
      });

      setStats(mappedStats);
    } catch (error) {
      console.error("Error fetching product overview:", error);
    }
  };

  const products = [
    {
      id: "SP001",
      name: "Complete UI Kit Bundle",
      sku: "#SP001",
      shop: "DigitalMarket Store",
      category: "UI/UX Design",
      price: "1.250.000 đ",
      stock: "∞",
      status: "Hoạt động",
      avatar: "UI",
    },
    {
      id: "SP002",
      name: "Complete UI Kit Bundle",
      sku: "#SP002",
      shop: "DigitalMarket Store",
      category: "UI/UX Design",
      price: "1.250.000 đ",
      stock: "∞",
      status: "Hoạt động",
      avatar: "UI",
    },
    {
      id: "SP003",
      name: "Complete UI Kit Bundle",
      sku: "#SP003",
      shop: "DigitalMarket Store",
      category: "UI/UX Design",
      price: "1.250.000 đ",
      stock: "∞",
      status: "Hoạt động",
      avatar: "UI",
    },
    {
      id: "SP004",
      name: "Complete UI Kit Bundle",
      sku: "#SP004",
      shop: "DigitalMarket Store",
      category: "UI/UX Design",
      price: "1.250.000 đ",
      stock: "∞",
      status: "Hoạt động",
      avatar: "UI",
    },
    {
      id: "SP005",
      name: "Complete UI Kit Bundle",
      sku: "#SP005",
      shop: "DigitalMarket Store",
      category: "UI/UX Design",
      price: "1.250.000 đ",
      stock: "∞",
      status: "Hoạt động",
      avatar: "UI",
    },
  ];

  const getStatusBadgeClass = (status) => {
    return status === "Hoạt động" ? styles.statusActive : styles.statusPending;
  };

  const getStatCardClass = (color) => {
    return `${styles.statCard} ${styles[`statCard--${color}`]}`;
  };

  return (
    <div className={styles.productManagement}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Quản Lý Sản Phẩm</h1>
          <p className={styles.subtitle}>
            Quản lý và kiểm duyệt sản phẩm trên nền tảng
          </p>
        </div>
      </div>

      <div className={styles.statsContainer}>
        {stats.map((stat, index) => (
          <div key={index} className={getStatCardClass(stat.color)}>
            <div className={styles.statContent}>
              <h3 className={styles.statTitle}>{stat.title}</h3>
              <div className={styles.statCount}>{stat.count}</div>
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
                placeholder="Tìm kiếm theo tên, SKU, shop..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>
          <div className={styles.filtersContainer}>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="Danh mục">Danh mục</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Graphics">Graphics</option>
              <option value="Photography">Photography</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="Trạng thái">Trạng thái</option>
              <option value="Hoạt động">Hoạt động</option>
              <option value="Chờ duyệt">Chờ duyệt</option>
              <option value="Tạm dừng">Tạm dừng</option>
            </select>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th className={styles.tableHeaderCell}>SAN PHẨM</th>
                <th className={styles.tableHeaderCell}>SHOP</th>
                <th className={styles.tableHeaderCell}>DANH MỤC</th>
                <th className={styles.tableHeaderCell}>GIÁ</th>
                <th className={styles.tableHeaderCell}>KHO</th>
                <th className={styles.tableHeaderCell}>TRẠNG THÁI</th>
                <th className={styles.tableHeaderCell}>THAO TÁC</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {products.map((product) => (
                <tr key={product.id} className={styles.tableRow}>
                  <td className={styles.tableCell}>
                    <div className={styles.productInfo}>
                      <div className={styles.avatar}>{product.avatar}</div>
                      <div className={styles.productDetails}>
                        <div className={styles.productName}>{product.name}</div>
                        <div className={styles.productSku}>
                          SKU: {product.sku}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className={styles.tableCell}>{product.shop}</td>
                  <td className={styles.tableCell}>{product.category}</td>
                  <td className={styles.tableCell}>{product.price}</td>
                  <td className={styles.tableCell}>{product.stock}</td>
                  <td className={styles.tableCell}>
                    <span className={getStatusBadgeClass(product.status)}>
                      {product.status}
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

export default ProductManagement;
