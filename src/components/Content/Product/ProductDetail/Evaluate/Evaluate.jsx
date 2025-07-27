import React from "react";
import styles from "./Evaluate.module.scss";
import { useState } from "react";
import EvaluateModal from "./EvaluateModal/EvaluateModal";
const Evaluate = ({ productId, onSuccess }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className={styles.evaluate}>
      <div className={styles.header}>
        <h3 className={styles.title}>Đánh giá tổng thể</h3>
        <button
          className={styles.writeButton}
          onClick={() => setShowModal(true)}
        >
          Viết đánh giá
        </button>
      </div>

      <div className={styles.ratingSection}>
        {showModal && (
          <EvaluateModal
            onClose={() => setShowModal(false)}
            productId={productId}
            onSuccess={onSuccess}
          />
        )}
        <div className={styles.ratingSummary}>
          <span className={styles.average}>4.9</span>
          <div className={styles.stars}>★★★★★</div>
          <p className={styles.count}>128 đánh giá</p>
        </div>

        <div className={styles.ratingBreakdown}>
          {[5, 4, 3, 2, 1].map((star, i) => (
            <div key={i} className={styles.barGroup}>
              <span className={styles.starLabel}>{star}</span>
              <div className={styles.bar}>
                <div style={{ width: `${[90, 7, 2, 1, 0][i]}%` }} />
              </div>
              <span className={styles.percent}>{[90, 7, 2, 1, 0][i]}%</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.reviews}>
        <h3 className={styles.title}>Đánh giá của người dùng</h3>

        <div className={styles.reviewCard}>
          <div className={styles.headerReview}>
            <span className={styles.avatar}>MJ</span>
            <div>
              <p className={styles.name}>Michael Johnson</p>
              <p className={styles.role}>UX Designer</p>
            </div>
          </div>
          <p className={styles.commentTitle}>
            Chất lượng vượt trội và sự chú ý tỉ mỉ đến từng chi tiết
          </p>
          <p className={styles.comment}>
            Bộ UI kit này thực sự tuyệt vời. Các thành phần được tổ chức rất
            khoa học...
          </p>
          <p className={styles.date}>
            2 tuần trước <span>★★★★★</span>
          </p>
        </div>

        <div className={styles.reviewCard}>
          <div className={styles.headerReview}>
            <span className={styles.avatar}>SL</span>
            <div>
              <p className={styles.name}>Sarah Lee</p>
              <p className={styles.role}>Frontend Developer</p>
            </div>
          </div>
          <p className={styles.commentTitle}>
            Giúp tôi tiết kiệm vô số giờ làm việc
          </p>
          <p className={styles.comment}>
            Tôi đã mua bộ UI kit này cho một dự án khách hàng với thời hạn
            gấp...
          </p>
          <p className={styles.date}>
            1 tháng trước <span>★★★★★</span>
          </p>
        </div>
      </div>

      <button className={styles.viewMore}>Hiển thị thêm ▾</button>
    </div>
  );
};

export default Evaluate;
