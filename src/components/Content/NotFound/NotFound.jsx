// import React from "react";
// import "./NotFound.scss";
// import { Outlet, NavLink, useNavigate } from "react-router-dom";

// const NotFound = () => {
//   const navigate = useNavigate();
//   return (
//     <div className="not-found-page">
//       <div className="not-found-container">
//         <div className="logo-section">
//           <div className="logo-icon">
//             <span className="logo-text">D</span>
//           </div>
//           <span className="brand-name">DigitalMarket</span>
//         </div>
//         <div className="error-section">
//           <h1 className="error-code">404</h1>
//           <h2 className="error-title">Trang Không Tìm Thấy</h2>
//         </div>
//         <div className="message-section">
//           <h3 className="message-title">
//             Rất tiếc, trang bạn tìm kiếm không tồn tại
//           </h3>
//           <p className="message-description">
//             Có thể trang đã bị di chuyển, xóa hoặc không tồn tại. Vui lòng kiểm
//             tra lại URL hoặc quay lại trang chủ.
//           </p>
//         </div>
//         <div className="action-section">
//           <button className="btn btn-secondary" onClick={() => navigate(-1)}>
//             <span className="btn-icon">←</span>
//             Quay Lại
//           </button>
//           <NavLink to="/" className="btn btn-primary">
//             <span className="btn-icon">🏠</span>
//             Về Trang Chủ
//           </NavLink>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NotFound;
import React from "react";
import styles from "./NotFound.module.scss";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className={styles["not-found-page"]}>
      <div className={styles["not-found-container"]}>
        <div className={styles["logo-section"]}>
          <div className={styles["logo-icon"]}>
            <span className={styles["logo-text"]}>D</span>
          </div>
          <span className={styles["brand-name"]}>DigitalMarket</span>
        </div>
        <div className={styles["error-section"]}>
          <h1 className={styles["error-code"]}>404</h1>
          <h2 className={styles["error-title"]}>Trang Không Tìm Thấy</h2>
        </div>
        <div className={styles["message-section"]}>
          <h3 className={styles["message-title"]}>
            Rất tiếc, trang bạn tìm kiếm không tồn tại
          </h3>
          <p className={styles["message-description"]}>
            Có thể trang đã bị di chuyển, xóa hoặc không tồn tại. Vui lòng kiểm
            tra lại URL hoặc quay lại trang chủ.
          </p>
        </div>
        <div className={styles["action-section"]}>
          <button
            className={`${styles.btn} ${styles["btn-secondary"]}`}
            onClick={() => navigate(-1)}
          >
            <span className={styles["btn-icon"]}>←</span>
            Quay Lại
          </button>
          <NavLink to="/" className={`${styles.btn} ${styles["btn-primary"]}`}>
            <span className={styles["btn-icon"]}>🏠</span>
            Về Trang Chủ
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
