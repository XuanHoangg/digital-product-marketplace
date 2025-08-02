import React, { useState } from "react";
import styles from "./ModalAddCategory.module.scss";
import { postCategory } from "@service/admin/adminCategory";

const ModalAddCategory = ({ isOpen, onClose, userId, onSuccess }) => {
  const [formData, setFormData] = useState({
    categoryName: "",
    categoryDescription: "",
    categoryIcon: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postCategory(userId, formData);
      onSuccess?.(); // gọi lại danh sách hoặc cập nhật UI
      onClose(); // đóng modal
    } catch (error) {
      console.error("Lỗi khi thêm danh mục:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.ModalAddCategory}>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modalContent}>
        <h2>Thêm danh mục mới</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Tên danh mục</label>
            <input
              type="text"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Mô tả</label>
            <textarea
              name="categoryDescription"
              value={formData.categoryDescription}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Biểu tượng</label>
            <input
              type="text"
              name="categoryIcon"
              value={formData.categoryIcon}
              onChange={handleChange}
              placeholder="VD: 📱"
            />
          </div>

          <div className={styles.actions}>
            <button type="submit">Lưu</button>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelBtn}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAddCategory;
