import React, { useEffect, useState } from "react";
import styles from "./ProductDetail.module.scss";
import Evaluate from "./Evaluate/Evaluate";
import SameType from "./SameType/SameType";
import Loading from "@components/Loading/Loading";
import Chat from "@components/Chat/Chat";
import { getDetailProduct } from "@service/user/store";
import { useParams, useLocation } from "react-router-dom";

const DetailProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const location = useLocation();
  const categoryName = location.state?.categoryName;
  useEffect(() => {
    fetchProduct();
  }, [id]);
  const fetchProduct = async () => {
    try {
      const res = await getDetailProduct(id);
      // console.log("Fetch product response:", res);

      if (res.status === 0) {
        setProduct(res.data);
        setMainImage(res.data.productImage?.[0]);
      }
    } catch (error) {
      console.error("Failed to fetch product", error);
    }
  };

  if (!product) return <Loading type="car" size="large" color="#2563eb" />;

  return (
    <div className={styles.detailProduct}>
      <div className={styles.productSection}>
        <div className={styles.productImages}>
          <div className={styles.mainImage}>
            <img src={mainImage} alt={product.productName} />
          </div>
          <div className={styles.subImages}>
            {product.productImage?.map((img, idx) => (
              <div
                key={idx}
                className={`${styles.imageItem} ${
                  mainImage === img ? styles.active : ""
                }`}
                onClick={() => setMainImage(img)}
              >
                <img src={img} alt={`Ảnh ${idx + 1}`} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.productInfo}>
          <div className={styles.title}>{product.productName}</div>
          <div className={styles.rating}>
            {product.ratingOverall || 0}★ ({product.countReviews} đánh giá)
          </div>
          <div className={styles.priceSection}>
            <span className={styles.price}>
              {product.price.toLocaleString("vi-VN")}₫
            </span>
            <div className={styles.oldPriceSection}>
              {" "}
              <p className={styles.oldPrice}>79.999₫</p>
              <p className={styles.discount}>-38%</p>
            </div>
          </div>
          <div className={styles.buttonGroup}>
            <button className={styles.buyNow}>Mua ngay</button>
            <button className={styles.addToCart}>Thêm vào giỏ</button>
          </div>
          <div className={styles.includes}>
            <p className={styles.boldTitle}>Bao gồm:</p>
            <p>{product.summaryFeature}</p>
          </div>
          <button
            className={styles.chatButton}
            onClick={() => setIsChatOpen(true)}
          >
            💬 Chat với {product.storeName}
          </button>
        </div>
      </div>

      <div className={styles.description}>
        <h3 className={styles.title}>Mô tả</h3>
        <p>{product.description}</p>
      </div>

      <Evaluate productId={id} onSuccess={fetchProduct} />
      <SameType products={product.productSuggest} />
      {isChatOpen && (
        <div className={styles.chatOverlay}>
          <div className={styles.chatPopup}>
            <Chat
              onClose={() => setIsChatOpen(false)}
              receiverId="ca988f34-894e-417c-aeb4-99010daca640"
              storeId="c3bfaba3-1349-4aa7-a9c2-bfbacdcf3a64"
              isBuyer={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailProduct;
