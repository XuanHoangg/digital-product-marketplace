import React from "react";
import styles from "./ProductFilters.module.scss";

const RatingFilter = ({ ratings, selected, onSelect, onReset, onApply }) => {
  const handleRatingChange = (r) => {
    console.log(`Đã chọn: ${r} sao`);
    onSelect(r);
  };

  const renderStars = (count) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < count ? styles.starFilled : styles.starEmpty}
      >
        ★
      </span>
    ));
  };

  return (
    <div className={styles.filter}>
      <h3 className={styles.filter__title}>Đánh Giá</h3>
      <ul className={styles.filter__list}>
        {ratings
          .filter((r) => r > 0)
          .sort((a, b) => b - a)
          .map((r) => (
            <li key={r} className={styles.filter__item}>
              <label>
                <input
                  type="radio"
                  name="rating"
                  value={r}
                  checked={selected === r}
                  onChange={() => handleRatingChange(r)}
                />
                <span className={styles.stars}>
                  {renderStars(r)}
                  {r !== 5 && (
                    <span className={styles.starsLabel}> & trở lên</span>
                  )}
                  <span className={styles.filter__reviewCount}>(1024)</span>
                </span>
              </label>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default RatingFilter;
