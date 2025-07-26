import React from "react";
import styles from "./ProductFilters.module.scss";

const RatingFilter = ({ ratings, selected, onSelect }) => (
  <div className={styles.filter}>
    <h3 className={styles.filter__title}>Đánh Giá</h3>
    <ul className={styles.filter__list}>
      {ratings.map((r) => (
        <li key={r} className={styles.filter__item}>
          <label>
            <input
              type="radio"
              name="rating"
              value={r}
              checked={selected === r}
              onChange={() => onSelect(r)}
            />
            {r === 0 ? "Tất cả" : "★".repeat(r) + " trở lên"}
          </label>
        </li>
      ))}
    </ul>
  </div>
);

export default RatingFilter;
