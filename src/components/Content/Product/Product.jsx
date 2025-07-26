import React, { useState, useEffect } from "react";
import styles from "./Product.module.scss";
import CategoryFilter from "./ProductFilters/CategoryFilter";
import RatingFilter from "./ProductFilters/RatingFilter";
import ProductChild from "./ProductChild/ProductChild";
import { getProducts } from "@service/user/store";

const PAGE_SIZE = 3;

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

  const fetchData = async () => {
    try {
      const res = await getProducts(null, null, 0, PAGE_SIZE, pageNumber);
      console.log("Fetch products response:", res);

      if (res?.data?.status === 0) {
        const { data } = res.data;
        setProducts(data.productIndexList || []);
        setTotalCount(data.totalCount || 0);
      }
    } catch (err) {
      console.error("Fetch products error", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNumber]);

  return (
    <div className={styles.product}>
      <aside className={styles.product__filters}>
        <CategoryFilter
          categories={STATIC_CATEGORIES}
          selected={""}
          onSelect={() => {}}
        />
        <RatingFilter
          ratings={STATIC_RATINGS}
          selected={0}
          onSelect={() => {}}
        />
      </aside>

      <section className={styles.product__list}>
        <ProductChild
          products={products}
          pageNumber={pageNumber}
          totalCount={totalCount}
          pageSize={PAGE_SIZE}
          onPageChange={setPageNumber}
        />
      </section>
    </div>
  );
};

export default Product;
