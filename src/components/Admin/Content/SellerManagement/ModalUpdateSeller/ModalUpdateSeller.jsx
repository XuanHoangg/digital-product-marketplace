import React, { useState, useEffect } from "react";
import styles from "./ModalUpdateSeller.module.scss";
import { putUpdateSeller } from "@service/admin/adminManagement";
import { useSelector } from "react-redux";

const ModalUpdateSeller = ({ isOpen, onClose, seller }) => {
  const [status, setStatus] = useState(seller?.status || 1);
  const [loading, setLoading] = useState(false);
  const userId = useSelector((state) => state?.auth?.account?.userId);
  useEffect(() => {
    setStatus(seller?.status || 1);
  }, [seller]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      console.log(seller.id, status, userId);

      let data = await putUpdateSeller(userId, seller.id, parseInt(status));
      console.log("Update response:", data);

      onClose(true);
    } catch (error) {
      console.error("Update failed:", error);
      alert("Cập nhật thất bại!");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Cập nhật trạng thái shop</h2>

        <div className={styles.modalBody}>
          <label className={styles.label}>Trạng thái:</label>
          <select
            className={styles.select}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value={1}>Hoạt động</option>
            <option value={2}>Tạm ngưng</option>
            <option value={3}>Xóa</option>
          </select>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.cancelBtn} onClick={() => onClose(false)}>
            Hủy
          </button>
          <button
            className={styles.confirmBtn}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Đang cập nhật..." : "Xác nhận"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdateSeller;
