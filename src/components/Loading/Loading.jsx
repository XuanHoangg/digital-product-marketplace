import React from "react";
import styles from "./Loading.module.scss";

const Loading = ({
  type = "boat",
  size = "medium",
  color = "#3b82f6",
  fullscreen = false,
  overlay = false,
  text = "Sản phẩm không tồn tại ...",
  className = "",
}) => {
  const containerClasses = [
    styles.loadingContainer,
    fullscreen && styles.fullscreen,
    overlay && styles.overlay,
    !fullscreen && !overlay && styles.inline,
    styles[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const renderBoatLoading = () => (
    <div className={styles.boatContainer}>
      <div className={styles.waves}>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
      </div>
      <div className={styles.boat} style={{ color }}>
        <svg width="40" height="40" viewBox="0 0 100 100" fill="currentColor">
          {/* Thân thuyền */}
          <path
            d="M20 70 Q50 80 80 70 L75 60 L25 60 Z"
            fill="currentColor"
            opacity="0.8"
          />
          {/* Cột buồm */}
          <rect x="48" y="30" width="4" height="30" fill="currentColor" />
          {/* Buồm */}
          <path d="M52 35 Q70 30 52 50 Z" fill="currentColor" opacity="0.6" />
          {/* Cờ */}
          <path d="M52 30 L65 25 L65 35 L52 30" fill="#ff6b6b" />
        </svg>
      </div>
      <div className={styles.dots}>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
    </div>
  );

  const renderPlaneLoading = () => (
    <div className={styles.planeContainer}>
      <div className={styles.plane} style={{ color }}>
        <svg width="40" height="40" viewBox="0 0 100 100" fill="currentColor">
          {/* Thân máy bay */}
          <ellipse cx="50" cy="50" rx="30" ry="8" fill="currentColor" />
          {/* Cánh */}
          <ellipse
            cx="35"
            cy="45"
            rx="15"
            ry="4"
            fill="currentColor"
            opacity="0.7"
          />
          <ellipse
            cx="35"
            cy="55"
            rx="15"
            ry="4"
            fill="currentColor"
            opacity="0.7"
          />
          {/* Đuôi */}
          <path d="M20 50 L10 45 L10 55 Z" fill="currentColor" />
        </svg>
      </div>
      <div className={styles.clouds}>
        <div className={styles.cloud}></div>
        <div className={styles.cloud}></div>
        <div className={styles.cloud}></div>
      </div>
      <div className={styles.dots}>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
    </div>
  );

  const renderCarLoading = () => (
    <div className={styles.carContainer}>
      <div className={styles.road}>
        <div className={styles.roadLine}></div>
      </div>
      <div className={styles.car} style={{ color }}>
        <svg width="50" height="30" viewBox="0 0 100 60" fill="currentColor">
          {/* Thân xe */}
          <rect
            x="20"
            y="30"
            width="60"
            height="15"
            rx="5"
            fill="currentColor"
          />
          {/* Cabin */}
          <rect
            x="30"
            y="20"
            width="30"
            height="15"
            rx="8"
            fill="currentColor"
            opacity="0.8"
          />
          {/* Bánh xe */}
          <circle cx="30" cy="50" r="8" fill="currentColor" opacity="0.6" />
          <circle cx="70" cy="50" r="8" fill="currentColor" opacity="0.6" />
          {/* Đèn */}
          <circle cx="85" cy="37" r="3" fill="#ffeb3b" />
        </svg>
      </div>
      <div className={styles.dots}>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
    </div>
  );

  const renderSpinner = () => (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner} style={{ borderTopColor: color }}></div>
      <div className={styles.dots}>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
    </div>
  );

  const renderLoading = () => {
    switch (type) {
      case "plane":
        return renderPlaneLoading();
      case "car":
        return renderCarLoading();
      case "spinner":
        return renderSpinner();
      default:
        return renderBoatLoading();
    }
  };

  return (
    <div className={containerClasses}>
      <div className={styles.loadingContent}>
        {renderLoading()}
        {text && (
          <div className={styles.text} style={{ color }}>
            {text}
          </div>
        )}
      </div>
    </div>
  );
};

export default Loading;
