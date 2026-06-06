import React from "react";
import ReactStars from "react-stars";
import styles from "../../styles/ProductListing.module.css";

function ProductCard({ product, navigate }) {
  const redirecttodetailpage = () => {
    navigate(`/product/${product.id}`);
  };
  return (
    <div
      key={product.id}
      className={styles.card}
      onClick={redirecttodetailpage}
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        className={styles.image}
      />

      <div className={styles.cardBody}>
        <h3 className={styles.title}>{product.title}</h3>

        <p className={styles.price}>${product.price}</p>

        <div className={styles.ratingWrapper}>
          <ReactStars
            count={5}
            value={product.rating}
            size={18}
            edit={false}
            half
          />
          <span>({product.rating})</span>
        </div>

        <p className={styles.brand}>{product.brand}</p>
      </div>
    </div>
  );
}

export default ProductCard;
