import React, { useEffect, useRef, useState } from "react";
import styles from "./ModalProductDetail.module.scss";
import {
  deleteProductImage,
  postProductImage,
} from "@service/seller/product/productAPI.js";
import { toast } from "react-toastify";
const ModalProductDetail = ({ product, onClose, storeId, sellerId }) => {
  const fileInputRef = useRef();
  const [reload, setReload] = useState(false);
  if (!product) return null;
  useEffect(() => {}, [reload]);
  const handleDeleteImage = async (imageId) => {
    const response = await deleteProductImage(
      sellerId,
      storeId,
      product.productId,
      imageId
    );
    if (response.status === 0) {
      toast.success(response.data);
      setReload(true);
    }
  };
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result;
      await handleAddImage(base64String); // Gửi base64 string lên server
    };
    reader.readAsDataURL(file); // Chuyển file sang base64
  };

  const handleAddImage = async (base64Image) => {
    try {
      const response = await postProductImage({
        sellerId,
        storeId,
        productId: product.productId,
        imagePath: base64Image, // base64 string
      });
      if (response.status === 0) {
        toast.success(response.data);

        setReload(true);
      }
    } catch (error) {
      console.error("Lỗi khi thêm ảnh:", error);
    }
  };
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          &times;
        </button>

        <div className={styles.content}>
          <div className={styles.imagesSection}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              ref={fileInputRef}
            />

            <button
              className={styles.addImageBtn}
              onClick={() => fileInputRef.current.click()}
            >
              Thêm ảnh
            </button>
            {product.images && product.images.length > 0 ? (
              product.images.map((img, index) => (
                <div key={img.id || index} className={styles.imageWrapper}>
                  <img
                    src={img.imagePath}
                    alt={`image-${index}`}
                    className={styles.imagePreview}
                  />
                  <button
                    className={styles.deleteImageBtn}
                    onClick={() => handleDeleteImage(img.id)}
                  >
                    ❌
                  </button>
                </div>
              ))
            ) : (
              <div className={styles.noImage}>Không có ảnh</div>
            )}
          </div>

          <div className={styles.detailsSection}>
            <h2 className={styles.productName}>{product.name}</h2>
            <p className={styles.category}>
              {" "}
              <span style={{ fontWeight: "bold", color: "blue" }}>
                Danh mục:{" "}
              </span>
              {product.categoryName}
            </p>
            <p className={styles.price}>
              Giá gốc: {Number(product.originalPrice).toLocaleString("vi-VN")}đ,
              Giá bán: {Number(product.price).toLocaleString("vi-VN")}đ, Giảm
              giá {product.discountedValue}% (
              {Number(product.discountedPrice).toLocaleString("vi-VN")}đ)
            </p>
            <p className={styles.description}>
              {" "}
              <span style={{ fontWeight: "bold", color: "blue" }}>Mô tả: </span>
              {product.description}
            </p>
            <p className={styles.summary}>
              {" "}
              <span style={{ fontWeight: "bold", color: "blue" }}>
                Tóm tắt:{" "}
              </span>
              {product.summaryFeature}
            </p>
            <p className={styles.sold}>
              <span style={{ fontWeight: "bold", color: "blue" }}>
                Tổng số lượt góp ý:{" "}
              </span>
              {product.totalComplaints} sản phẩm
            </p>
            <p className={styles.created}>
              <span style={{ fontWeight: "bold", color: "blue" }}>
                Ngày đăng bán:{" "}
              </span>{" "}
              {new Date(product.createdAt).toLocaleString()}
            </p>
            <p className={styles.updated}>
              <span style={{ fontWeight: "bold", color: "blue" }}>
                Giờ truy cập:{" "}
              </span>
              {new Date(product.updatedAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalProductDetail;
