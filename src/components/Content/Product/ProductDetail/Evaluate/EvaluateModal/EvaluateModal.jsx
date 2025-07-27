import React, { useState } from "react";
import styles from "./EvaluateModal.module.scss";
import { putReviewProduct } from "@service/user/evaluate";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";

const descriptions = [
  "Rất tệ (1/5 sao)",
  "Tệ (2/5 sao)",
  "Tạm được (3/5 sao)",
  "Hài lòng (4/5 sao)",
  "Rất hài lòng (5/5 sao)",
];

const EvaluateModal = ({ onClose, productId, onSuccess }) => {
  const buyerId = useSelector((state) => state?.auth?.account?.userId);
  const [recommend, setRecommend] = useState(true);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [overallRating, setOverallRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(null);
  const [detailRatings, setDetailRatings] = useState({
    quality: 5,
    value: 5,
    usability: 5,
  });

  const handleDetailRate = (field, value) => {
    setDetailRatings((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = async () => {
    const data = {
      productId,
      buyerId,

      qualityRating: detailRatings.quality,
      valueRating: detailRatings.value,
      usabilityRating: detailRatings.usability,
      reviewTitle,
      reviewContent,
      recommendToOthers: recommend,
    };
    const res = await putReviewProduct(
      data.productId,
      data.buyerId,
      data.qualityRating,
      data.valueRating,
      data.usabilityRating,
      data.reviewTitle,
      data.reviewContent,
      data.recommendToOthers
    );
    if (res.status === 0) {
      onSuccess();
      toast(res.data);
      onClose();
    } else {
      toast.error(res.messageResult);
    }
    // console.log("Dữ liệu đánh giá:", data);
    // console.log(res);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div className={styles.productInfo}>
            <div className={styles.avatar}>UI</div>
            <div className={styles.productText}>
              <h3 className={styles.title}>Đánh giá sản phẩm</h3>
              <p className={styles.subtitle}>Complete UI Kit Bundle</p>
            </div>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <AiOutlineClose />
          </button>
        </div>

        <div className={styles.section}>
          <h4>Đánh giá tổng thể</h4>
          <p className={styles.question}>
            Bạn cảm thấy sản phẩm này như thế nào?
          </p>
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className={
                  i <= (hoverRating || overallRating)
                    ? styles.starFilled
                    : styles.star
                }
                onMouseEnter={() => setHoverRating(i)}
                onMouseLeave={() => setHoverRating(null)}
                onClick={() => setOverallRating(i)}
              >
                ★
              </span>
            ))}
          </div>
          <p className={styles.ratingText}>{descriptions[overallRating - 1]}</p>
        </div>

        <div className={styles.section}>
          <h4>Đánh giá chi tiết</h4>
          <div className={styles.detailRatings}>
            {["Chất lượng", "Giá trị", "Dễ sử dụng"].map((label, i) => {
              const field = ["quality", "value", "usability"][i];
              return (
                <div key={field} className={styles.detailItem}>
                  <span className={styles.detailLabel}>{label}</span>
                  <div>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={
                          star <= detailRatings[field]
                            ? styles.starFilled
                            : styles.star
                        }
                        onClick={() => handleDetailRate(field, star)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.section}>
          <h4>Tiêu đề đánh giá</h4>
          <input
            type="text"
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
            placeholder="Tóm tắt trải nghiệm của bạn..."
            className={styles.input}
          />
        </div>

        <div className={styles.section}>
          <h4>Nội dung đánh giá</h4>
          <textarea
            maxLength={500}
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
            placeholder="Chia sẻ chi tiết về sản phẩm, điều bạn thích và không thích..."
            className={styles.textarea}
          />
          <div className={styles.charCount}>0/500 ký tự</div>
        </div>

        <div className={styles.section}>
          <h4>Bạn có giới thiệu sản phẩm này không?</h4>
          <div className={styles.recommendOptions}>
            <button
              className={`${styles.recommendYes} ${
                recommend === true ? styles.active : ""
              }`}
              onClick={() => setRecommend(true)}
            >
              👍 Có, tôi sẽ giới thiệu
            </button>
            <button
              className={`${styles.recommendNo} ${
                recommend === false ? styles.active : ""
              }`}
              onClick={() => setRecommend(false)}
            >
              👎 Không
            </button>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.cancelButton} onClick={onClose}>
            Hủy
          </button>
          <button className={styles.submitButton} onClick={handleSubmit}>
            Gửi đánh giá
          </button>
        </div>
      </div>
    </div>
  );
};

export default EvaluateModal;
