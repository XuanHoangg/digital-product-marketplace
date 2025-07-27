import React from "react";
import styles from "./UserWallet.module.scss";
import { FaPlus } from "react-icons/fa";

const transactions = [
  {
    type: "deposit",
    title: "Nạp tiền vào ví",
    time: "15/05/2023 - 10:23",
    amount: "+2.000.000đ",
    status: "Hoàn thành",
    icon: "⬆️",
  },
  {
    type: "purchase",
    title: "Mua Premium UI Kit",
    time: "15/05/2023 - 11:45",
    amount: "-1.250.000đ",
    status: "Đang xử lý",
    icon: "⚠️",
  },
  {
    type: "withdraw",
    title: "Rút tiền về ngân hàng",
    time: "14/05/2023 - 15:30",
    amount: "-3.000.000đ",
    status: "Hoàn thành",
    icon: "⬇️",
  },
  {
    type: "sale",
    title: "Bán Photography Course",
    time: "12/05/2023 - 09:15",
    amount: "+2.900.000đ",
    status: "Hoàn thành",
    icon: "📦",
  },
];

const UserWallet = () => {
  return (
    <div className={styles.walletContainer}>
      {/* Số dư khả dụng */}
      <div className={styles.balanceCard}>
        <div>
          <p className={styles.balanceLabel}>Số Dư Khả Dụng</p>
          <h2 className={styles.balanceAmount}>5.250.000đ</h2>
        </div>
        <button className={styles.addMoneyBtn}>
          <FaPlus />
          <span>Nạp Tiền</span>
        </button>
      </div>

      {/* Thao tác nhanh */}
      <div className={styles.quickActions}>
        <div className={styles.actionItem}>Nạp Tiền</div>
        <div className={styles.actionItem}>Rút Tiền</div>
        <div className={styles.actionItem}>Lịch Sử</div>
      </div>

      {/* Lịch sử giao dịch */}
      <div className={styles.transactionSection}>
        <div className={styles.transactionHeader}>
          <h3>Lịch Sử Giao Dịch</h3>
          <select className={styles.filterSelect}>
            <option>Tất cả</option>
          </select>
        </div>

        <ul className={styles.transactionList}>
          {transactions.map((item, idx) => (
            <li key={idx} className={styles.transactionItem}>
              <div className={styles.transactionIcon}>{item.icon}</div>
              <div className={styles.transactionInfo}>
                <p className={styles.transactionTitle}>{item.title}</p>
                <p className={styles.transactionTime}>{item.time}</p>
              </div>
              <div className={styles.transactionAmount}>
                <p
                  className={
                    item.amount.startsWith("+")
                      ? styles.amountPositive
                      : styles.amountNegative
                  }
                >
                  {item.amount}
                </p>
                <p className={styles.transactionStatus}>{item.status}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className={styles.transactionFooter}>
          <a href="#">Xem tất cả giao dịch</a>
        </div>
      </div>

      {/* Phương thức thanh toán */}
      <div className={styles.paymentSection}>
        <div className={styles.paymentHeader}>
          <h3>Phương Thức Thanh Toán</h3>
          <button className={styles.addMethodBtn}>+ Thêm Mới</button>
        </div>

        <div className={styles.paymentList}>
          <div className={styles.paymentItem}>
            <div className={styles.paymentInfo}>
              <p>Vietcombank</p>
              <span>**** **** **** 5678</span>
            </div>
            <span className={styles.defaultLabel}>Mặc định</span>
          </div>

          <div className={styles.paymentItem}>
            <div className={styles.paymentInfo}>
              <p>MoMo</p>
              <span>0912 *** ***</span>
            </div>
            <button className={styles.editBtn}>Chỉnh sửa</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserWallet;
