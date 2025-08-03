import React from "react";
import styles from "./ProductFilters.module.scss";

const CategoryFilter = ({ categories, selected = [], onSelect }) => {
  const handleCheckboxChange = (catId) => {
    let updated;

    // Nếu click vào "Tất cả sản phẩm" (id = "")
    if (catId === "") {
      // Nếu "Tất cả" đang được chọn, thì bỏ chọn
      if (selected.includes("")) {
        updated = [];
      } else {
        // Nếu "Tất cả" chưa được chọn, thì chọn "Tất cả" và bỏ chọn tất cả category khác
        updated = [""];
      }
    } else {
      // Nếu click vào category khác (không phải "Tất cả")
      if (selected.includes(catId)) {
        // Nếu category này đang được chọn, thì bỏ chọn
        updated = selected.filter((id) => id !== catId);
      } else {
        // Nếu category này chưa được chọn
        // Bỏ chọn "Tất cả" (nếu có) và thêm category mới
        updated = selected.filter((id) => id !== "");
        updated = [...updated, catId];
      }
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
