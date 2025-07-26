import React from "react";
import styles from "./ProductFilters.module.scss";

const CategoryFilter = ({ categories, selected = [], onSelect }) => {
  const handleCheckboxChange = (catId) => {
    let updated;
    if (selected.includes(catId)) {
      updated = selected.filter((id) => id !== catId);
    } else {
      updated = [...selected, catId];
    }

    onSelect(updated);
  };

  return (
    <div className={styles.filter}>
      <h3 className={styles.filter__title}>Danh Mục</h3>
      <ul className={styles.filter__list}>
        {categories.map((cat) => (
          <li key={cat.id} className={styles.filter__item}>
            <label>
              <input
                type="checkbox"
                name="category"
                value={cat.id}
                checked={selected.includes(String(cat.id))} // Ép về string
                onChange={() => handleCheckboxChange(String(cat.id))}
              />
              {cat.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;
