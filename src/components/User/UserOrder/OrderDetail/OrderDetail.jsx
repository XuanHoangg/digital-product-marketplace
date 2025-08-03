import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import styles from "./OrderDetail.module.scss";

const OrderDetail = () => {
  // Mock data - bạn sẽ thay thế bằng API call
  const orderData = {
    orderId: "#TRX-28756394",
    purchaseDate: "Đã mua vào ngày 1/1/2025 15:30:30",
    status: "Processing",
    product: {
      name: "Premium UI Kit Bundle",
      seller: "DesignStudio",
      image: "/api/placeholder/60/60",
    },
    pricing: {
      subtotal: 49.99,
      shipping: 2.5,
      tax: 5.25,
      total: 57.74,
    },
    paymentMethod: "Ví sàn",
  };

  // Bạn có thể tùy biến các status steps này
  const [orderSteps] = useState([
    {
      id: 1,
      title: "Đơn hàng đã được đặt",
      date: "May 15, 2023 • 10:23 AM",
      description: "Đơn hàng của bạn đã được đặt và đang được xử lý.",
      status: "completed", // completed, pending, current
    },
    {
      id: 2,
      title: "Người bán đã được thông báo",
      date: "May 15, 2023 • 10:25 AM",
      description: "",
      status: "completed",
    },
    {
      id: 3,
      title: "Thanh toán thành công",
      date: "",
      description: "Vui lòng đợi xác nhận từ người bán",
      status: "pending", // Bạn có thể thay đổi thành 'completed' để hiển thị xanh
    },
  ]);

  const getStepIcon = (status) => {
    switch (status) {
      case "completed":
        return <div className={styles.stepIconCompleted}>✓</div>;
      case "current":
        return <div className={styles.stepIconCurrent}>3</div>;
      case "pending":
      default:
        return <div className={styles.stepIconPending}>3</div>;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>
              Chi tiết đơn hàng {orderData.orderId}
            </h1>
            <div className={styles.statusTag}>{orderData.status}</div>
          </div>
          <p className={styles.purchaseDate}>{orderData.purchaseDate}</p>
        </div>

        {/* Product Info */}
        <div className={styles.productSection}>
          <div className={styles.productLabel}>Ảnh sản phẩm</div>
          <div className={styles.productInfo}>
            <div className={styles.productImage}>
              <div className={styles.imagePlaceholder}>
                <span>Jm</span>
              </div>
            </div>
            <div className={styles.productDetails}>
              <h3 className={styles.productName}>{orderData.product.name}</h3>
              <p className={styles.productSeller}>
                Người bán: {orderData.product.seller}
              </p>
            </div>
          </div>
        </div>

        {/* Order Timeline */}
        <div className={styles.timelineSection}>
          <h3 className={styles.sectionTitle}>Tiến trình mua hàng</h3>
          <div className={styles.timeline}>
            {orderSteps.map((step, index) => (
              <div key={step.id} className={styles.timelineItem}>
                <div className={styles.timelineIcon}>
                  {getStepIcon(step.status)}
                </div>
                <div className={styles.timelineContent}>
                  <h4 className={`${styles.stepTitle} ${styles[step.status]}`}>
                    {step.title}
                  </h4>
                  {step.date && <p className={styles.stepDate}>{step.date}</p>}
                  {step.description && (
                    <p className={styles.stepDescription}>{step.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className={styles.summarySection}>
          <h3 className={styles.sectionTitle}>Chi tiết</h3>

          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Phương thức thanh toán</span>
            <div className={styles.paymentMethod}>
              <span>💳</span>
              <span>{orderData.paymentMethod}</span>
            </div>
          </div>

          <div className={styles.pricingBreakdown}>
            <div className={styles.pricingRow}>
              <span className={styles.pricingLabel}>Tổng đơn hàng</span>
              <span className={styles.pricingValue}>
                ${orderData.pricing.subtotal}
              </span>
            </div>
            <div className={styles.pricingRow}>
              <span className={styles.pricingLabel}>Phí sàn (5%)</span>
              <span className={styles.pricingValue}>
                ${orderData.pricing.shipping}
              </span>
            </div>
            <div className={styles.pricingRow}>
              <span className={styles.pricingLabel}>Thuế</span>
              <span className={styles.pricingValue}>
                ${orderData.pricing.tax}
              </span>
            </div>
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Tổng cộng</span>
              <span className={styles.totalValue}>
                ${orderData.pricing.total}
              </span>
            </div>
          </div>
        </div>

        {/* Contact Seller Button */}
        <button className={styles.contactButton}>
          <MessageCircle size={20} />
          Nhắn với người bán
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
