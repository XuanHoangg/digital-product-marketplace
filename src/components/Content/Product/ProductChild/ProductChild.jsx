import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./ProductChild.module.scss";
import { TiShoppingCart } from "react-icons/ti";

const ProductChild = ({
  products,
  pageNumber,
  totalCount,
  pageSize,
  onPageChange,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    // console.log("ProductChild updated products:", products);
  }, [products]);
  // console.log("ProductChild products:", products);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return (
    <>
      <div className={styles.grid}>
        {products.map((p) => (
          <div
            key={p.productId}
            className={styles.item}
            onClick={() =>
              navigate(`/product/${p.productId}`, {
                state: { categoryName: p.categoryName },
              })
            }
          >
            <div className={styles.item__image}>
              <img src={p.productImage} alt={p.productName} />
            </div>
            <div className={styles.item__info}>
              <span className={styles.item__tag}>{p.categoryName}</span>
              <h4 className={styles.item__title}>{p.productName}</h4>
              <div className={styles.item__rating}>
                {p.ratingOverallAverage} {"★"}{" "}
                <span className={styles.item__reviewCount}>
                  ({p.ratingOverallCount} lượt đánh giá)
                </span>
              </div>
              <div className={styles.item__price}>
                {new Intl.NumberFormat("vi-VN").format(p.price)}₫
                <button className={styles.item__button}>
                  <TiShoppingCart style={{ fontSize: "24px" }} />
                </button>
              </div>
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
