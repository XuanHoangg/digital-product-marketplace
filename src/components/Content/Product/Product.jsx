import React, { useState, useEffect } from "react";
import styles from "./Product.module.scss";
import CategoryFilter from "./ProductFilters/CategoryFilter";
import RatingFilter from "./ProductFilters/RatingFilter";
import ProductChild from "./ProductChild/ProductChild";
import { getProducts, getCategory } from "@service/user/store";

const PAGE_SIZE = 9;

const STATIC_RATINGS = [0, 1, 2, 3, 4, 5];

const Product = () => {
  const [categories, setCategories] = useState([
    { id: "", name: "Tất cả sản phẩm" },
  ]);
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  // Mặc định chọn "Tất cả sản phẩm" (id = "")
  const [selectedCategories, setSelectedCategories] = useState([""]);
  // Mặc định rating là 5 sao
  const [selectedRating, setSelectedRating] = useState(0);
  const fetchDataCategory = async () => {
    const res = await getCategory();
    // res.data là mảng { categoryId, categoryName, categoriesCount }
    const mapped = (res.data || []).map((item) => ({
      id: item.categoryId,
      name: item.categoryName,
    }));
    setCategories([{ id: "", name: "Tất cả sản phẩm" }, ...mapped]);
    // console.log("Fetched categories:", mapped);
  };

  const fetchData = async () => {
    let text = null;
    try {
      console.log("Fetching products with params:", {
        Text: text,
        selectedCategories,
        selectedRating,
        PAGE_SIZE,
        pageNumber,
      });

      const res = await getProducts(
        null,
        selectedRating,
        selectedCategories,
        PAGE_SIZE,
        pageNumber
      );
      console.log("Fetch products response:", res);

      if (res.status === 0) {
        setProducts(res.data.productIndexList || []);
        setTotalCount(res.data.totalCount || 0);
      }
    } catch (err) {
      console.error("Fetch products error", err);
    }
  };

  const handleSelectCategories = (updated) => {
    // console.log("Đã chọn categories:", updated);
    setSelectedCategories(updated);
  };

  useEffect(() => {
    fetchData();
    fetchDataCategory();
  }, [pageNumber, selectedCategories, selectedRating]);

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
            onSelect={setSelectedRating}
          />
          <div className={styles.product__actions}>
            <button className={styles.reset}>Đặt Lại</button>
            <button className={styles.apply}>Áp Dụng</button>
          </div>
        </aside>

        <section className={styles.product__list}>
          <div className={styles.product__resultBox}>
            Hiển thị <strong>{PAGE_SIZE}</strong> trong{" "}
            <strong>{totalCount.toLocaleString()}</strong> kết quả
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
