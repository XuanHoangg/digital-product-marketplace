import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Cart.module.scss";
import { IoClose } from "react-icons/io5";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoMdArrowBack } from "react-icons/io";

const Cart = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  return (
    <div className={`${styles.cartOverlay} ${isOpen ? styles.open : ""}`}>
      <div className={styles.cartPanel}>
        <div className={styles.cartHeader}>
          <h3>Giỏ hàng</h3>
          <span className={styles.cartClose} onClick={onClose}>
            <IoClose size={24} />
          </span>
        </div>

        <div className={styles.cartBody}>
          {/* Thay bằng dữ liệu thật sau này */}
          <div className={styles.cartItem}>
            <div className={styles.cartItemBadge}>UI</div>
            <div className={styles.cartItemInfo}>
              <div className={styles.cartItemTitle}>Complete UI Kit Bundle</div>
              <div className={styles.cartItemSubtitle}>
                Bộ kit UI hoàn chỉnh...
              </div>
            </div>
            <div className={styles.cartItemPrice}>1.250.000 đ</div>
          </div>

          <div className={styles.cartItem}>
            <div className={`${styles.cartItemBadge} ${styles.green}`}>PH</div>
            <div className={styles.cartItemInfo}>
              <div className={styles.cartItemTitle}>
                Photography Masterclass
              </div>
              <div className={styles.cartItemSubtitle}>
                Khóa học nhiếp ảnh từ cơ bản đến nâng cao
              </div>
              <div className={styles.cartItemOldPrice}>6.000.000 đ</div>
            </div>
            <div className={styles.cartItemPrice} style={{ color: "#e11d48" }}>
              5.400.000 đ
            </div>
          </div>

          {/* More items... */}

          <div className={styles.cartSummary}>
            <div className={styles.summaryItem}>
              <span>Tạm tính (4 sản phẩm)</span>
              <span>8.750.000 đ</span>
            </div>
            <div className={styles.summaryItem}>
              <span>Phí vận chuyển</span>
              <span className={styles.free}>Miễn phí</span>
            </div>
            <div className={styles.summaryItem}>
              <span>VAT (5%)</span>
              <span>700.000 đ</span>
            </div>
            <div className={styles.summaryTotal}>
              <span>Tổng cộng</span>
              <span>7.700.000 đ</span>
            </div>
          </div>

          <div className={styles.cartActions}>
            <button className={styles.checkoutBtn}>
              <FaRegCircleCheck /> Thanh toán
            </button>
            <button
              className={styles.keepShoppingBtn}
              onClick={() => {
                onClose();
                navigate("/product");
              }}
            >
              <IoMdArrowBack /> Tiếp tục mua sắm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
