import React, { useState } from "react";
import { CreditCard, Smartphone, Building2, Shield, Check } from "lucide-react";
import styles from "./Checkout.module.scss";

import { NavLink, useNavigate } from "react-router-dom";

const Checkout = () => {
  const [selectedPayment, setSelectedPayment] = useState("visa");
  const navigate = useNavigate();
  // Mock data - bạn sẽ thay thế bằng API call
  const orderData = {
    items: [
      {
        id: 1,
        name: "Premium UI Kit Bundle",
        author: "DesignStudio",
        price: 49.99,
        image: "/api/placeholder/40/40",
      },
    ],
    shipping: 2.5,
    tax: 5.25,
    subtotal: 49.99,
    total: 57.74,
  };

  const paymentMethods = [
    {
      id: "visa",
      name: "Ví sàn",
      description: "Hiện có: $125.00",
      icon: CreditCard,
      available: true,
    },
    {
      id: "momo",
      name: "MoMo",
      description: "Ví điện tử",
      icon: Smartphone,
      available: true,
    },
    {
      id: "bank",
      name: "Ngân hàng",
      description: "Chuyển khoản trực tiếp",
      icon: Building2,
      available: true,
    },
  ];

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.checkoutCard}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Chi tiết thanh toán</h2>
        </div>

        {/* Order Items */}
        <div className={styles.orderSection}>
          {orderData.items.map((item) => (
            <div key={item.id} className={styles.orderItem}>
              <div className={styles.itemImage}>
                <div className={styles.imagePlaceholder}>
                  <span>Jm</span>
                </div>
              </div>
              <div className={styles.itemDetails}>
                <h4 className={styles.itemName}>{item.name}</h4>
                <p className={styles.itemAuthor}>Người bán: {item.author}</p>
              </div>
              <div className={styles.itemPrice}>${item.price}</div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className={styles.summarySection}>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Giá trị đơn hàng</span>
            <span className={styles.summaryValue}>${orderData.subtotal}</span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Phí vận chuyển (5%)</span>
            <span className={styles.summaryValue}>${orderData.shipping}</span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Thuế</span>
            <span className={styles.summaryValue}>${orderData.tax}</span>
          </div>
          <div className={styles.totalRow}>
            <span className={styles.totalLabel}>Tổng cộng</span>
            <span className={styles.totalValue}>${orderData.total}</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className={styles.paymentSection}>
          <h3 className={styles.paymentTitle}>Phương thức thanh toán</h3>

          <div className={styles.paymentMethods}>
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`${styles.paymentMethod} ${
                  selectedPayment === method.id ? styles.selected : ""
                } ${!method.available ? styles.disabled : ""}`}
                onClick={() =>
                  method.available && setSelectedPayment(method.id)
                }
              >
                <div className={styles.radioButton}>
                  <input
                    type="radio"
                    name="payment"
                    value={method.id}
                    checked={selectedPayment === method.id}
                    onChange={() =>
                      method.available && setSelectedPayment(method.id)
                    }
                    disabled={!method.available}
                  />
                </div>
                <div className={styles.methodIcon}>
                  <method.icon size={20} />
                </div>
                <div className={styles.methodInfo}>
                  <div className={styles.methodName}>{method.name}</div>
                  <div className={styles.methodDescription}>
                    {method.description}
                  </div>
                </div>
                {method.id === "visa" && method.available && (
                  <div className={styles.availableTag}>Có sẵn</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Security Notice */}
        <div className={styles.securitySection}>
          <div className={styles.securityIcon}>
            <Shield size={16} />
          </div>
          <div className={styles.securityContent}>
            <h4 className={styles.securityTitle}>
              Thanh toán an toàn qua Escrow
            </h4>
            <p className={styles.securityDescription}>
              Khoản thanh toán của bạn sẽ được giữ trong tài khoản ký quỹ cho
              đến khi bạn xác nhận đã nhận được sản phẩm và hài lòng với nó.
              Điều này giúp bảo vệ cả người mua và người bán trên nền tảng của
              chúng tôi.
            </p>
            <ul className={styles.securityFeatures}>
              <li>
                Bảo vệ thanh toán toàn diện (tiền sẽ được giữ bởi bên trung gian
                đảm bảo)
              </li>
              <li>Người bán chuyển giao sản phẩm kỹ thuật số</li>
              <li>
                Bạn xác nhận đã nhận sản phẩm, hệ thống sẽ chuyển tiền cho người
                bán
              </li>
            </ul>
          </div>
        </div>

        <button className={styles.paymentButton}>
          <Check size={20} />
          Thanh toán ${orderData.total}
        </button>

        <div className={styles.helpSection}>
          <NavLink to="/product" className={styles.helpLink}>
            Hủy và về trang sản phẩm
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
