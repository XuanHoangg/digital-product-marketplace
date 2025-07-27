import React, { useState, useEffect } from "react";
import styles from "./Product.module.scss";
import CategoryFilter from "./ProductFilters/CategoryFilter";
import RatingFilter from "./ProductFilters/RatingFilter";
import ProductChild from "./ProductChild/ProductChild";
import { getProducts } from "@service/user/store";

const PAGE_SIZE = 9;

// Category và rating cứng, sẽ dùng để hiển thị nhưng chưa filter API
const STATIC_CATEGORIES = [
  { id: "", name: "Tất cả sản phẩm" },
  { id: "template", name: "Giao diện & Template" },
  { id: "plugin", name: "Plugin" },
  { id: "software", name: "Phần mềm" },
  { id: "graphic", name: "Tài nguyên đồ họa" },
  { id: "course", name: "Khóa học" },
  { id: "ebook", name: "Sách PDF" },
  { id: "code", name: "Source code" },
];
const STATIC_RATINGS = [0, 1, 2, 3, 4, 5];

const Product = () => {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([""]);
  const [selectedRating, setSelectedRating] = useState(0);
  const fetchData = async () => {
    try {
      const res = await getProducts(
        null,
        selectedCategories,
        selectedRating,
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
  }, [pageNumber]);

  return (
    <div className={styles.product__container}>
      <h2 className={styles.product__title}>Sản phẩm</h2>
      <p className={styles.product__description}>
        Khám phá hơn 10.000+ sản phẩm số chất lượng cao
      </p>

      <div className={styles.product}>
        <aside className={styles.product__filters}>
          <CategoryFilter
            categories={STATIC_CATEGORIES}
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
