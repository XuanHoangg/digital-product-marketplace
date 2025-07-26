import React from "react";
import styles from "./ProductChild.module.scss";

const ProductChild = ({
  products,
  pageNumber,
  totalCount,
  pageSize,
  onPageChange,
}) => {
  console.log("ProductChild products:", products);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return (
    <>
      <div className={styles.grid}>
        {products.map((p) => (
          <div key={p.productId} className={styles.item}>
            <div className={styles.item__image}>
              <img
                src={`data:image/png;base64,${p.productImage}`}
                alt={p.productName}
              />
            </div>
            <div className={styles.item__info}>
              <h4>{p.productName}</h4>
              <div className={styles.item__price}>
                {p.price.toLocaleString()}₫
              </div>
              <button className={styles.item__button}>Thêm vào giỏ</button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.pagination}>
        <button
          disabled={pageNumber <= 1}
          onClick={() => onPageChange(pageNumber - 1)}
        >
          &lt;
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={pageNumber === i + 1 ? styles.active : ""}
            onClick={() => onPageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={pageNumber >= totalPages}
          onClick={() => onPageChange(pageNumber + 1)}
        >
          &gt;
        </button>
      </div>
    </>
  );
};

export default ProductChild;
