import React, { useMemo } from "react";
import styles from "../../styles/Filters.module.css";
import Checkbox from "../Checkbox/Checkbox";
import Loader from "../Loader/Loader";
import { useSelector } from "react-redux";
import { fetchloadingcategoriesstate } from "../../redux/Reducers/AppReducers";

function Filters({
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
}) {
  const brands = useMemo(() => {
    const brandList = [];

    products.forEach((product) => {
      const brandName = product.brand;

      if (brandName && !brandList.includes(brandName)) {
        brandList.push(brandName);
      }
    });

    brandList.sort();

    return brandList;
  }, [products]);

  const isLoading = useSelector((state) => fetchloadingcategoriesstate(state));

  const handleCategoryChange = (categorySlug) => {
    if (selectedCategory === categorySlug) {
      setSelectedCategory("");
      return;
    }

    setSelectedCategory(categorySlug);
  };

  const handleBrandChange = (brand) => {
    const isSelected = selectedBrands.includes(brand);

    if (isSelected) {
      const updatedBrands = selectedBrands.filter((item) => item !== brand);

      setSelectedBrands(updatedBrands);
      return;
    }

    setSelectedBrands([...selectedBrands, brand]);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  return (
    <div className={styles.sidebar}>
      <h3 className={styles.heading}>Filters</h3>

      <div className={styles.section}>
        <h4>Categories</h4>
        {isLoading ? (
          <Loader />
        ) : (
          <div className={styles.checkboxContainer}>
            {categories.map((category) => (
              <Checkbox
                key={category.slug}
                label={category.name}
                checked={selectedCategory === category.slug}
                onChange={() => handleCategoryChange(category.slug)}
              />
            ))}
          </div>
        )}
      </div>

      <div className={styles.section}>
        <h4>Price Range</h4>

        <div className={styles.priceInputs}>
          <input
            type="number"
            placeholder="Min"
            className={styles.priceInput}
            value={minPrice}
            onChange={handleMinPriceChange}
          />

          <input
            type="number"
            placeholder="Max"
            className={styles.priceInput}
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
        </div>
      </div>

      <div className={styles.section}>
        <h4>
          Brands
          <span className={styles.filterCount}>{selectedBrands.length}</span>
        </h4>

        <div className={styles.checkboxContainer}>
          {brands.map((brand) => (
            <Checkbox
              key={brand}
              label={brand}
              checked={selectedBrands.includes(brand)}
              onChange={() => handleBrandChange(brand)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Filters;
