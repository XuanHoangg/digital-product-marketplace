import React, { useState } from "react";
import { Eye, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Orders.module.scss";

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data - replace with API call
  const orders = [
    {
      id: "DH001",
      time: "14:30",
      customer: "Nguyễn Văn A",
      phone: "0123456789",
      product: "Complete UI Kit Bundle",
      total: "1.250.000 đ",
      status: "Chờ xác nhận",
      statusType: "pending",
      date: "2024-05-23",
    },
    {
      id: "DH002",
      time: "10:15",
      customer: "Trần Thị B",
      phone: "0987654321",
      product: "Photography Masterclass",
      total: "5.800.000 đ",
      status: "Đã xác nhận",
      statusType: "confirmed",
      date: "2024-05-23",
    },
    {
      id: "DH003",
      time: "16:45",
      customer: "Lê Minh C",
      phone: "0369852147",
      product: "Business Strategy Course",
      total: "1.800.000 đ",
      status: "Đã xác nhận",
      statusType: "confirmed",
      date: "2024-05-22",
    },
    {
      id: "DH004",
      time: "09:20",
      customer: "Phạm Thị D",
      phone: "0741852963",
      product: "Icon Library Pro",
      total: "2.100.000 đ",
      status: "Hoàn thành",
      statusType: "completed",
      date: "2024-05-22",
    },
    {
      id: "DH005",
      time: "11:30",
      customer: "Hoàng Văn E",
      phone: "0852741963",
      product: "Digital Marketing Guide",
      total: "850.000 đ",
      status: "Đã hủy",
      statusType: "cancelled",
      date: "2024-05-21",
    },
  ];

  const getStatusClass = (statusType) => {
    switch (statusType) {
      case "pending":
        return styles.statusPending;
      case "confirmed":
        return styles.statusConfirmed;
      case "completed":
        return styles.statusCompleted;
      case "cancelled":
        return styles.statusCancelled;
      default:
        return "";
    }
  };

  return (
    <div className={styles.ordersContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Quản Lý Đơn Hàng</h1>
        <p className={styles.subtitle}>
          Quản lý tất cả đơn hàng và trạng thái giao hàng
        </p>
      </div>

      <div className={styles.searchAndFilter}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Tìm kiếm đơn hàng, khách hàng..."
            className={styles.searchInput}
          />
        </div>
        <div className={styles.filterActions}>
          <button className={styles.filterBtn}>Tất cả trạng thái</button>
          <button className={styles.sortBtn}>Bộ lọc</button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <div className={styles.tableWrapper}>
          <table className={styles.ordersTable}>
            <thead className={styles.tableHeader}>
              <tr>
                <th className={styles.columnHeader}>MÃ ĐƠN HÀNG</th>
                <th className={styles.columnHeader}>KHÁCH HÀNG</th>
                <th className={styles.columnHeader}>SẢN PHẨM</th>
                <th className={styles.columnHeader}>TỔNG TIỀN</th>
                <th className={styles.columnHeader}>TRẠNG THÁI</th>
                <th className={styles.columnHeader}>NGÀY ĐẶT</th>
                <th className={styles.columnHeader}>THAO TÁC</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {orders.map((order) => (
                <tr key={order.id} className={styles.tableRow}>
                  <td className={styles.orderIdCell}>
                    <div className={styles.orderInfo}>
                      <span className={styles.orderId}>{order.id}</span>
                      <span className={styles.orderTime}>{order.time}</span>
                    </div>
                  </td>
                  <td className={styles.customerCell}>
                    <div className={styles.customerInfo}>
                      <span className={styles.customerName}>
                        {order.customer}
                      </span>
                      <span className={styles.customerPhone}>
                        {order.phone}
                      </span>
                    </div>
                  </td>
                  <td className={styles.productCell}>
                    <span className={styles.productName}>{order.product}</span>
                  </td>
                  <td className={styles.totalCell}>
                    <span className={styles.totalAmount}>{order.total}</span>
                  </td>
                  <td className={styles.statusCell}>
                    <span
                      className={`${styles.statusBadge} ${getStatusClass(
                        order.statusType
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className={styles.dateCell}>
                    <span className={styles.orderDate}>{order.date}</span>
                  </td>
                  <td className={styles.actionsCell}>
                    <div className={styles.actionButtons}>
                      <button className={styles.actionBtn}>
                        <Eye size={16} />
                      </button>
                      <button className={styles.actionBtn}>
                        <Edit size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.pagination}>
        <button
          className={styles.paginationBtn}
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={16} />
        </button>

        <div className={styles.paginationNumbers}>
          <button
            className={`${styles.pageNumber} ${
              currentPage === 1 ? styles.active : ""
            }`}
          >
            1
          </button>
          <button
            className={`${styles.pageNumber} ${
              currentPage === 2 ? styles.active : ""
            }`}
          >
            2
          </button>
          <button
            className={`${styles.pageNumber} ${
              currentPage === 3 ? styles.active : ""
            }`}
          >
            3
          </button>
        </div>

        <button
          className={styles.paginationBtn}
          onClick={() => setCurrentPage((prev) => Math.min(3, prev + 1))}
          disabled={currentPage === 3}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Orders;
