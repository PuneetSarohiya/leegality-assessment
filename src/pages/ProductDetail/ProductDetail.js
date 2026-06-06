import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-stars";
import styles from "../../styles/ProductDetail.module.css";
import { fetchProductById } from "../../redux/Actions/AppActions";
import {
  fetchloadingproductdetailsstate,
  fetchProductDetail,
} from "../../redux/Reducers/AppReducers";
import Loader from "../../components/Loader/Loader";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = useSelector((state) => fetchProductDetail(state));
  const isLoading = useSelector((state) => fetchloadingproductdetailsstate(state));


  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [id, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className={styles.wrapper}>
        <div className={styles.imageSection}>
          <img
            src={product?.thumbnail}
            alt={product?.title}
            className={styles.image}
          />
        </div>

        <div className={styles.details}>
          <h1 className={styles.title}>{product?.title}</h1>

          <div className={styles.priceRow}>
            <span className={styles.price}>${product?.price}</span>
            <div className={styles.ratingWrapper}>
              <ReactStars
                count={5}
                value={product?.rating}
                size={20}
                edit={false}
                half={true}
              />
              <span className={styles.ratingText}>({product?.rating})</span>
            </div>
          </div>

          <div className={styles.meta}>
            <p>
              <span>Brand:</span> {product?.brand}
            </p>
            <p>
              <span>Category:</span> {product?.category}
            </p>
            <p>
              <span>Stock:</span> {product?.stock} units available
            </p>
          </div>

          <div className={styles.descSection}>
            <h3>Description</h3>
            <p>{product?.description}</p>
          </div>

          {product?.reviews?.length > 0 && (
            <div className={styles.reviewSection}>
              <h3>Reviews</h3>
              {product?.reviews.map((review, index) => (
                <div key={index} className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <strong>{review.reviewerName}</strong>
                    <ReactStars
                      count={5}
                      value={review.rating}
                      size={16}
                      edit={false}
                      half={true}
                    />
                    <span className={styles.reviewRating}>
                      ({review.rating})
                    </span>
                  </div>
                  <p className={styles.reviewComment}>{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
