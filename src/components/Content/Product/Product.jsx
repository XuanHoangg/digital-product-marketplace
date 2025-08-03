import React, { useState, useEffect } from "react";
import styles from "./Product.module.scss";
import CategoryFilter from "./ProductFilters/CategoryFilter";
import RatingFilter from "./ProductFilters/RatingFilter";
import ProductChild from "./ProductChild/ProductChild";
import { getProducts, getCategory } from "@service/user/store";

const PAGE_SIZE = 10;
const STATIC_RATINGS = [0, 1, 2, 3, 4, 5];

const Product = () => {
  const [categories, setCategories] = useState([
    { id: "", name: "Tất cả sản phẩm" },
  ]);
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const fetchDataCategory = async () => {
    try {
      const res = await getCategory();
      const mapped = (res.data || []).map((item) => ({
        id: String(item.categoryId),
        name: item.categoryName,
      }));
      setCategories([{ id: "", name: "Tất cả sản phẩm" }, ...mapped]);
    } catch (err) {
      console.error("Fetch categories error:", err);
    }
  };

  const fetchData = async () => {
    try {
      let categoryIds = [];

      if (selectedCategories.length > 0 && !selectedCategories.includes("")) {
        categoryIds = selectedCategories.filter(
          (id) => id !== "" && id !== null && id !== undefined
        );
      }

      const res = await getProducts(
        searchText || null,
        selectedRating,
        categoryIds,
        PAGE_SIZE,
        pageNumber
      );
      console.log("Product list response:", res);

      if (res.status === 0) {
        setProducts(res.data.productIndexList || []);
        setTotalCount(res.data.totalCount || 0);
      } else {
        console.error("API returned error status:", res.status);
      }
    } catch (err) {
      console.error("Fetch products error:", err);
    }
  };

  const handleSelectCategories = (updated) => {
    setSelectedCategories(updated);
    setPageNumber(1);
  };

  const handleSelectRating = (rating) => {
    setSelectedRating(rating);
    setPageNumber(1);
  };

  useEffect(() => {
    fetchData();
    fetchDataCategory();
  }, [pageNumber, selectedCategories, selectedRating, searchText]);

  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedRating(0);
    setPageNumber(1);
  };
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      setSearchText(searchInput.trim());
      setPageNumber(1); // Reset to page 1 when searching
    }
  };
  return (
    <div className={styles.product__container}>
      <h2 className={styles.product__title}>Sản phẩm</h2>
      <p className={styles.product__description}>
        Khám phá hơn 10.000+ sản phẩm số chất lượng cao
      </p>

      <div className={styles.product}>
        <aside className={styles.product__filters}>
          <CategoryFilter
            categories={categories}
            selected={selectedCategories}
            onSelect={handleSelectCategories}
          />
          <RatingFilter
            ratings={STATIC_RATINGS}
            selected={selectedRating}
            onSelect={handleSelectRating}
          />
          <div className={styles.product__actions}>
            <button className={styles.reset} onClick={handleReset}>
              Đặt Lại
            </button>
            <button className={styles.apply}>Áp Dụng</button>
          </div>
        </aside>

        <section className={styles.product__list}>
          <div className={styles.product__searchBox}>
            <input
              type="text"
              className={styles.product__search}
              placeholder="Tìm kiếm sản phẩm..."
              value={searchInput}
              onChange={handleSearchInputChange}
              onKeyPress={handleSearchSubmit}
            />
            <button
              className={styles.product__searchBtn}
              onClick={handleSearchSubmit}
              type="button"
            >
              🔍
            </button>
          </div>
          <div className={styles.product__resultBox}>
            Hiển thị <strong>{Math.min(PAGE_SIZE, products.length)}</strong>{" "}
            trong <strong>{totalCount.toLocaleString()}</strong> kết quả
          </div>
          <ProductChild
            products={products}
            pageNumber={pageNumber}
            totalCount={totalCount}
            pageSize={PAGE_SIZE}
            onPageChange={setPageNumber}
          />
        </section>
      </div>
    </div>
  );
};

export default Product;
