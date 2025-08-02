import React, { useState } from "react";
import styles from "./UpdateStoreModal.module.scss";

const UpdateStoreModal = ({ isOpen, onClose, onSubmit, userId, storeId }) => {
  const [name, setName] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [preview, setPreview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result);
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    onSubmit(userId, storeId, name, imageBase64);
    onClose(); // Close modal after submit
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Cập nhật cửa hàng</h2>
        <input
          type="text"
          placeholder="Tên cửa hàng mới"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className={styles.input}
        />
        {preview && (
          <img className={styles.previewImage} src={preview} alt="Preview" />
        )}
        <div className={styles.modalActions}>
          <button className={styles.saveBtn} onClick={handleSubmit}>
            Lưu
          </button>
          <button className={styles.cancelBtn} onClick={onClose}>
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateStoreModal;
