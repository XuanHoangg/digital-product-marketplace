import React from "react";
import { Check } from "lucide-react";
import styles from "./CheckoutSuccess.module.scss";

const CheckoutSuccess = () => {
  // Mock data - bạn sẽ thay thế bằng API call
  const transactionData = {
    transactionId: "#TRX-28756394",
    date: "May 16, 2023 • 10:23 AM",
    paymentMethod: "Ví sàn",
    totalAmount: "$57.74",
    status: "Funds in Escrow",
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Thanh toán thành công</h1>
        </div>

        {/* Success Icon */}
        <div className={styles.iconSection}>
          <div className={styles.successIcon}>
            <Check size={24} />
          </div>
        </div>

        {/* Success Message */}
        <div className={styles.messageSection}>
          <h2 className={styles.messageTitle}>Thanh toán hoàn tất</h2>
          <p className={styles.messageDescription}>
            Thanh toán của bạn đã được thực hiện thành công và hiện đang được
            giữ an toàn qua trung gian cho đến khi giao dịch hoàn tất.
          </p>
        </div>

        {/* Transaction Details */}
        <div className={styles.detailsSection}>
          <h3 className={styles.detailsTitle}>Thông tin giao dịch</h3>

          <div className={styles.detailsGrid}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Mã giao dịch</span>
              <span className={styles.detailValue}>
                {transactionData.transactionId}
              </span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Ngày</span>
              <span className={styles.detailValue}>{transactionData.date}</span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Phương thức thanh toán</span>
              <span className={styles.detailValue}>
                {transactionData.paymentMethod}
              </span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Tổng số tiền</span>
              <span className={styles.detailValue}>
                {transactionData.totalAmount}
              </span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Trạng thái</span>
              <span className={styles.statusTag}>{transactionData.status}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
