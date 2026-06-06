import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/Navbar.module.css";

function Navbar() {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.left}>
          <span className={styles.logo} onClick={() => navigate("/")}>
            🛒 ShopNow
          </span>
        </div>

        <div className={styles.center}>
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Search products..."
              className={styles.searchInput}
            />
          </div>
        </div>

        <div className={styles.right}>
          <button
            className={`${styles.iconBtn} ${styles.mobileSearchBtn}`}
            onClick={() => setShowSearch(true)}
          >
            🔍
          </button>

          <button className={styles.iconBtn}>
            🛒
            <span className={styles.badge}>2</span>
          </button>

          <button className={styles.iconBtn}>👤</button>
        </div>
      </nav>

      <div className={`${styles.searchModal} ${showSearch ? styles.open : ""}`}>
        <div className={styles.searchModalContent}>
          <input
            autoFocus
            type="text"
            placeholder="Search products..."
            className={styles.modalInput}
          />

          <button
            className={styles.closeBtn}
            onClick={() => setShowSearch(false)}
          >
            ✕
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar;
