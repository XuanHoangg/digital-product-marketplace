import React from "react";
import styles from "./SameType.module.scss";
import { useNavigate } from "react-router-dom";

const SameType = ({ products }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.sameType}>
      <h3 className={styles.title}>Các sản phẩm có thể bạn thích</h3>
      <div className={styles.grid}>
        {products.map((item, idx) => (
          <div key={idx} className={styles.card}>
            <div className={styles.image}>
              <img src={item.productImage} alt={item.productName} />
            </div>
            <div className={styles.info}>
              <div className={styles.name}>{item.productName}</div>
              <div className={styles.rating}>★ ({item.ratingOverallCount})</div>
              <div className={styles.price}>
                {new Intl.NumberFormat("vi-VN").format(item.price)}₫
                <span
                  className={styles.review}
                  onClick={() => navigate(`/product/${item.productId}`)}
                >
                  Xem ngay
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SameType;
