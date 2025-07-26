import React from "react";
import styles from "./ProductFilters.module.scss";

const CategoryFilter = ({ categories, selected, onSelect }) => (
  <div className={styles.filter}>
    <h3 className={styles.filter__title}>Danh Mục</h3>
    <ul className={styles.filter__list}>
      {categories.map((cat) => (
        <li key={cat.id} className={styles.filter__item}>
          <label>
            <input
              type="radio"
              name="category"
              value={cat.id}
              checked={selected === cat.id}
              onChange={() => onSelect(cat.id)}
            />
            {cat.name}
          </label>
        </li>
      ))}
    </ul>
  </div>
);

export default CategoryFilter;
