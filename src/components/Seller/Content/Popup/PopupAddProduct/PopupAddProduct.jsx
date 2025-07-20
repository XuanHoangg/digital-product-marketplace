import React, { useState } from "react";
import styles from "./PopupAddProduct.module.scss";
import { postAddProduct } from "@service/seller/product/productAPI";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { convertFileToBase64 } from "@utils/helper.js";
const PopupAddProduct = ({ onClose }) => {
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    price: "",
    description: "",
    sumaryFeature: "",
    images: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const base64Images = await Promise.all(
      files.map((file) => convertFileToBase64(file))
    );
    setFormData((prev) => ({
      ...prev,
      images: base64Images,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        sellerId: "0cf705af-6ba1-4374-a2b2-16c6a9e198a5",
        storeId: "8ca1d64d-4c30-46ac-8033-224bafa78392",
        productName: formData.productName,
        description: formData.description,
        categoryId: "course",
        originalPrice: parseFloat(formData.price),
        sumaryFeature: formData.sumaryFeature,
        images: formData.images,
      };

      console.log("Payload to send:", payload);
      const data = await postAddProduct(payload);
      console.log("Response data:", data);

      // onClose();
    } catch (error) {
      console.error("Lỗi thêm sản phẩm:", error);
    }
  };
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.popupOverlay} onClick={handleOverlayClick}>
      <div className={styles.popupContainer}>
        <div className={styles.popupHeader}>
          <h2 className={styles.popupTitle}>Thêm Sản Phẩm Mới</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ×
          </button>
        </div>

        <form className={styles.popupForm} onSubmit={handleSubmit}>
          {/* Tên sản phẩm */}
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Tên sản phẩm</label>
              <input
                type="text"
                name="productName"
                className={styles.formInput}
                placeholder="Nhập tên sản phẩm..."
                value={formData.productName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Danh mục & Giá */}
          <div className={styles.formRow}>
            <div className={`${styles.formGroup} ${styles.halfWidth}`}>
              <label className={styles.formLabel}>Danh mục</label>
              <select
                name="category"
                className={styles.formSelect}
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Chọn danh mục</option>
                <option value="ui-kit">UI Kit</option>
                <option value="course">Khóa học</option>
                <option value="3d-item">3D Item</option>
                <option value="ebook">Ebook</option>
                <option value="template">Template</option>
                <option value="3d-model">3D Model</option>
              </select>
            </div>
            <div className={`${styles.formGroup} ${styles.halfWidth}`}>
              <label className={styles.formLabel}>Giá</label>
              <input
                type="number"
                name="price"
                className={styles.formInput}
                placeholder="VD: 1250000"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Ảnh */}
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Hình ảnh (nhiều)</label>

              <div className={styles.imageGroup}>
                <label
                  htmlFor="image-upload"
                  className={styles.imageUploadLabel}
                >
                  📁 Chọn hình ảnh
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className={styles.imageUploadInput}
                />
              </div>

              {formData.images.length > 0 && (
                <div className={styles.previewContainer}>
                  {formData.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`preview-${idx}`}
                      className={styles.previewImage}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mô tả */}
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Mô tả</label>
              <textarea
                name="description"
                className={styles.formTextarea}
                placeholder="Nhập mô tả sản phẩm..."
                rows="4"
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>

          {/* Tính năng nổi bật */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Tính năng nổi bật</label>
            <input
              type="text"
              name="sumaryFeature"
              className={styles.formInput}
              placeholder="VD: Thiết kế đẹp, dễ dùng..."
              value={formData.sumaryFeature}
              onChange={handleInputChange}
            />
          </div>

          {/* Actions */}
          <div className={styles.popupActions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              Hủy
            </button>
            <button type="submit" className={styles.submitBtn}>
              Thêm Sản Phẩm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupAddProduct;
