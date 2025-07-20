// Store.jsx
import React, { useState } from "react";
import PopupAddProduct from "./../Popup/PopupAddProduct/PopupAddProduct.jsx";
import styles from "./Store.module.scss";

const Store = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const products = [
    {
      id: 1,
      category: "UI KIT",
      title: "Premium UI Kit Bundle",
      price: "1.250.000đ",
      sold: "42 bản đã bán",
      status: "Hoạt động",
      statusType: "active",
      image: "/api/placeholder/280/160",
    },
    {
      id: 2,
      category: "Khóa học",
      title: "Photography Masterclass",
      price: "2.900.000đ",
      sold: "36 bản đã bán",
      status: "Hoạt động",
      statusType: "active",
      image: "/api/placeholder/280/160",
    },
    {
      id: 3,
      category: "Khóa học",
      title: "Business Strategy Course",
      price: "1.800.000đ",
      sold: "29 bản đã bán",
      status: "Hoạt động",
      statusType: "active",
      image: "/api/placeholder/280/160",
    },
    {
      id: 4,
      category: "3D Item",
      title: "Icon Library Pro",
      price: "700.000đ",
      sold: "22 bản đã bán",
      status: "Đang chờ",
      statusType: "pending",
      image: "/api/placeholder/280/160",
    },
    {
      id: 5,
      category: "Ebook",
      title: "Digital Marketing Guide",
      price: "450.000đ",
      sold: "18 bản đã bán",
      status: "Hoạt động",
      statusType: "active",
      image: "/api/placeholder/280/160",
    },
    {
      id: 6,
      category: "Template",
      title: "E-commerce Template",
      price: "1.600.000đ",
      sold: "15 bản đã bán",
      status: "Bị chặn",
      statusType: "blocked",
      image: "/api/placeholder/280/160",
    },
    {
      id: 7,
      category: "3D Model",
      title: "3D Character Pack",
      price: "2.400.000đ",
      sold: "12 bản đã bán",
      status: "Hoạt động",
      statusType: "active",
      image: "/api/placeholder/280/160",
    },
    {
      id: 8,
      category: "Khóa học",
      title: "Web Development Pro",
      price: "1.800.000đ",
      sold: "10 bản đã bán",
      status: "Đang chờ",
      statusType: "pending",
      image: "/api/placeholder/280/160",
    },
  ];

  const handleAddProduct = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.storeContainer}>
      <div className={styles.storeHeader}>
        <div className={styles.headerLeft}>
          <h1 className={styles.headerTitle}>Quản Lý Sản Phẩm</h1>
          <p className={styles.headerSubtitle}>
            Quản lý tất cả sản phẩm và dịch vụ của bạn
          </p>
        </div>
        <button className={styles.addProductBtn} onClick={handleAddProduct}>
          <span className={styles.addIcon}>+</span>
          Thêm Sản Phẩm
        </button>
      </div>

      <div className={styles.storeControls}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Tìm kiếm sản phẩm..."
          />
        </div>
        <div className={styles.filtersContainer}>
          <select className={styles.filterSelect}>
            <option>Tất cả danh mục</option>
            <option>UI KIT</option>
            <option>Khóa học</option>
            <option>3D Item</option>
            <option>Ebook</option>
            <option>Template</option>
            <option>3D Model</option>
          </select>
          <select className={styles.filterSelect}>
            <option>Tất cả trạng thái</option>
            <option>Hoạt động</option>
            <option>Đang chờ</option>
            <option>Bị chặn</option>
          </select>
        </div>
      </div>

      <div className={styles.productsGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <div className={styles.productImage}>
              <img src={product.image} alt={product.title} />
              <div className={styles.productCategory}>{product.category}</div>
            </div>
            <div className={styles.productContent}>
              <h3 className={styles.productTitle}>{product.title}</h3>
              <div className={styles.productPrice}>{product.price}</div>
              <div className={styles.productSold}>{product.sold}</div>
              <div className={styles.productActions}>
                <span
                  className={`${styles.productStatus} ${
                    styles[product.statusType]
                  }`}
                >
                  {product.status}
                </span>
                <div className={styles.actionButtons}>
                  <button className={styles.editBtn}>Sửa</button>
                  <button className={styles.moreBtn}>⋯</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.pagination}>
        <button
          className={styles.paginationBtn}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ‹
        </button>
        <button
          className={`${styles.paginationBtn} ${
            currentPage === 1 ? styles.active : ""
          }`}
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
        <button
          className={`${styles.paginationBtn} ${
            currentPage === 2 ? styles.active : ""
          }`}
          onClick={() => handlePageChange(2)}
        >
          2
        </button>
        <button
          className={`${styles.paginationBtn} ${
            currentPage === 3 ? styles.active : ""
          }`}
          onClick={() => handlePageChange(3)}
        >
          3
        </button>
        <button
          className={styles.paginationBtn}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === 3}
        >
          ›
        </button>
      </div>

      {isPopupOpen && <PopupAddProduct onClose={handleClosePopup} />}
    </div>
  );
};

export default Store;
