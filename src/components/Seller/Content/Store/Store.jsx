// Store.jsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStoreDetails } from "@service/seller/sellerAPI";
import ModalProductDetail from "./ModalProductDetail/ModalProductDetail.jsx";
import PopupAddProduct from "./../Popup/PopupAddProduct/PopupAddProduct.jsx";
import styles from "./Store.module.scss";
import { getStoreId } from "@service/seller/sellerAPI";
import {
  getProducts,
  getProductDetail,
} from "@service/seller/product/productAPI";
import { getCategories } from "@service/seller/sellerCategories.js";
const Store = () => {
  const userId = useSelector((state) => state?.auth?.account?.userId);
  const [categories, setCategories] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [storeId, setStoreId] = useState("");
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const PAGE_SIZE = 10;

  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  useEffect(() => {
    fetchStoreId();
    fetchProducts();
    fetchCategories();
    // fetchProductDetail();
  }, [storeId, currentPage, searchText, selectedCategory, selectedStatus]);
  const fetchProducts = async () => {
    try {
      const response = await getProducts(
        userId,
        searchText || "",
        selectedCategory || "",
        selectedStatus || 0,
        PAGE_SIZE,
        currentPage
      );
      // console.log("Products response:", response);

      const mappedProducts = response.data.items.map((item) => ({
        id: item.productId,
        category: item.category,
        productName: item.productName,
        price: `${item.price.toLocaleString("vi-VN")}đ`,
        quantitySelled: item.quantitySelled,
        status: item.status,
        ratingOverall: item.ratingOverall,
        image: item.image,
      }));

      setProducts(mappedProducts);
      setTotalPages(Math.ceil(response.data.total / PAGE_SIZE));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const fetchStoreId = async () => {
    try {
      const response = await getStoreId(userId);
      setStoreId(response.data.storeId);
    } catch (error) {
      console.error("Error fetching store ID:", error);
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      // console.log("Categories response:", response);
      const categoryList = response?.data?.categoryIndexDtos || [];
      setCategories(categoryList);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const fetchProductDetail = async (productId) => {
    try {
      const response = await getProductDetail(productId, userId);
      console.log("Product detail response:", response);
      return response.data;
    } catch (error) {
      console.error("Error fetching product detail:", error);
      return null;
    }
  };
  const handleAddProduct = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };
  const handleCardClick = async (productId) => {
    const detail = await fetchProductDetail(productId);
    setSelectedProduct(detail);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
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
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className={styles.filtersContainer}>
          <select
            className={styles.filterSelect}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Tất cả danh mục</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            className={styles.filterSelect}
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">Tất cả trạng thái</option>
            <option value="1">Đang chờ duyệt</option>
            <option value="2">Đang bán</option>
            <option value="3">Đã khóa</option>
            <option value="4">Đã xóa</option>
          </select>
        </div>
      </div>

      <div className={styles.productsGrid}>
        {products.map((product) => (
          <div
            key={product.id}
            className={styles.productCard}
            onClick={() => handleCardClick(product.id)}
          >
            <div className={styles.productImage}>
              <img src={product.image} alt={product.title} />
              <div className={styles.productCategory}>{product.category}</div>
            </div>
            <div className={styles.productContent}>
              <h3 className={styles.productTitle}>{product.productName}</h3>
              <div className={styles.productDetails}>
                <div>
                  <div className={styles.productPrice}>{product.price}</div>
                  <div className={styles.productSold}>
                    Đã bán {product.quantitySelled} sản phẩm
                  </div>
                </div>

                <span
                  className={`${styles.productStatus} ${
                    styles[product.statusType]
                  }`}
                >
                  {product.status}
                </span>
              </div>

              <div className={styles.productActions}>
                <button className={styles.editBtn}>✏️Sửa</button>
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

        {[...Array(totalPages)].map((_, index) => {
          const pageNum = index + 1;
          return (
            <button
              key={pageNum}
              className={`${styles.paginationBtn} ${
                currentPage === pageNum ? styles.active : ""
              }`}
              onClick={() => handlePageChange(pageNum)}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          className={styles.paginationBtn}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          ›
        </button>
      </div>

      {isPopupOpen && (
        <PopupAddProduct
          onClose={handleClosePopup}
          storeId={storeId}
          categories={categories}
        />
      )}
      {selectedProduct && (
        <ModalProductDetail
          product={selectedProduct}
          onClose={handleCloseModal}
          storeId={storeId}
          sellerId={userId}
        />
      )}
    </div>
  );
};

export default Store;
