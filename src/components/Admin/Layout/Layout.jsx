import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  TrendingUp,
  Package,
  ShoppingCart,
  DollarSign,
  Users,
  Menu,
  X,
} from "lucide-react";
import { FaStore } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

import styles from "./Layout.module.scss";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentPath =
    location.pathname === "/" ? "overview" : location.pathname.substring(1);

  const sidebarItems = [
    {
      id: "overview",
      label: "Tổng Quan",
      icon: TrendingUp,
      path: "overview",
    },
    {
      id: "user",
      label: "Người mua",
      icon: FaRegUser,
      path: "/admin/user-management",
    },
    {
      id: "seller",
      label: "Người Bán",
      icon: FaRegUser,
      path: "/admin/seller-management",
    },
    {
      id: "products",
      label: "Sản Phẩm",
      icon: Package,
      path: "/admin/products-management",
    },
    {
      id: "category",
      label: "Danh Mục",
      icon: Package,
      path: "/admin/category-management",
    },
    {
      id: "orders",
      label: "Đơn Hàng",
      icon: ShoppingCart,
      path: "/admin/orders-management",
    },
    {
      id: "revenue",
      label: "Doanh Thu",
      icon: DollarSign,
      path: "/admin/revenue-management",
    },
    {
      id: "setting",
      label: "Setting",
      icon: IoSettingsOutline,
      path: "/admin/setting",
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const currentItem =
    sidebarItems.find((item) => item.id === currentPath) || sidebarItems[0];

  return (
    <div className={styles.dashboardContainer}>
      <div
        className={`${styles.sidebarOverlay} ${sidebarOpen ? styles.show : ""}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <button
        className={styles.mobileMenuBtn}
        onClick={() => setSidebarOpen(true)}
      >
        <Menu size={20} />
      </button>

      <div
        className={`${styles.dashboardContent} ${
          sidebarOpen ? styles.sidebarOpen : ""
        }`}
      >
        <div className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <div className={styles.brand}>
              <div className={styles.brandIcon}>D</div>
              <span className={styles.brandName}>DigitalMarket</span>
            </div>
            <button
              className={styles.sidebarCloseBtn}
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          <nav className={styles.sidebarNav}>
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                className={`${styles.sidebarItem} ${
                  currentPath === item.id ? styles.active : ""
                }`}
                onClick={() => handleNavigation(item.path)}
              >
                <item.icon className={styles.sidebarIcon} size={20} />
                <span className={styles.sidebarLabel}>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.contentOutlet}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
