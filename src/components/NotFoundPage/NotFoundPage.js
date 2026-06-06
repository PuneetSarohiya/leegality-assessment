import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/NotFound.module.css";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.errorCode}>404</h1>

        <h2 className={styles.title}>Oops! Page Not Found</h2>

        <p className={styles.description}>
          The page you are looking for doesn't exist or has been moved.
        </p>

        <div className={styles.buttons}>
          <button className={styles.primaryBtn} onClick={() => navigate("/")}>
            🏠 Back Home
          </button>

          <button className={styles.secondaryBtn} onClick={() => navigate(-1)}>
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
