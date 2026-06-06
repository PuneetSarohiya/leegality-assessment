import React from "react";
import Filters from "../Filters/Filters";
import styles from "../../styles/FilterDrawer.module.css";

function FilterDrawer(props) {
  const {
    isOpen,
    onClose,
    categories,
    products,
    selectedCategory,
    setSelectedCategory,
    selectedBrands,
    setSelectedBrands,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    width
  } = props;

  const handleClearFilters = () => {
    setSelectedCategory("");
    setSelectedBrands([]);
    setMinPrice("");
    setMaxPrice("");
    onClose();
  };

  if (width > 768) {
    return null;
  }

  return (
    <>
      {isOpen && <div className={styles.backdrop} onClick={onClose} />}

      <div className={`${styles.drawer} ${isOpen ? styles.open : ""}`}>
        <div className={styles.drawerHeader}>
          <h3>Filters</h3>

          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.drawerBody}>
          <Filters
            categories={categories}
            products={products}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />
        </div>

        <div className={styles.drawerFooter}>
          <button className={styles.clearBtn} onClick={handleClearFilters}>
            Clear All
          </button>

          <button className={styles.applyBtn} onClick={onClose}>
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
}

export default FilterDrawer;
