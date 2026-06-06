import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import styles from "../../styles/ProductListing.module.css";
import Pagination from "../../components/Pagination/Pagination";
import Filters from "../../components/Filters/Filters";
import FilterDrawer from "../../components/FilterDrawer/FilterDrawer";
import ProductCard from "../../components/ProductCard/ProductCard";
import Loader from "../../components/Loader/Loader";

import {
  fetchAllProductDetails,
  fetchCategories,
  fetchProductsByCategory,
  setFilters,
} from "../../redux/Actions/AppActions";

import {
  fetchProductsListDetails,
  fetchProductsCategoriesList,
  fetchFilters,
  fetchloadingproductsstate,
  fetchProductsCounts,
} from "../../redux/Reducers/AppReducers";

function ProductListing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => fetchProductsListDetails(state));
  const categories = useSelector((state) => fetchProductsCategoriesList(state));
  const savedFilters = useSelector((state) => fetchFilters(state));
  const isLoading = useSelector((state) => fetchloadingproductsstate(state));
  const totalCount = useSelector((state) => fetchProductsCounts(state))

  const [filters, setLocalFilters] = useState({
    selectedCategory: savedFilters.selectedCategory,
    selectedBrands: savedFilters.selectedBrands,
    minPrice: savedFilters.minPrice,
    maxPrice: savedFilters.maxPrice,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  const productsPerPage = 14;

  const {
    selectedCategory,
    selectedBrands,
    minPrice,
    maxPrice,
  } = filters;

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    }
  }, [dispatch,categories.length]);

  useEffect(() => {
  if (selectedCategory) {
    dispatch(fetchProductsByCategory(selectedCategory));
    return;
  }

  dispatch(fetchAllProductDetails());
}, [dispatch, selectedCategory]);

  useEffect(() => {
    dispatch(setFilters(filters));
  }, [filters, dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedBrands, minPrice, maxPrice]);

    useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const brandMatch =
        selectedBrands.length === 0 ||
        selectedBrands.includes(product.brand);

      const minMatch =
        minPrice === "" ||
        product.price >= Number(minPrice);

      const maxMatch =
        maxPrice === "" ||
        product.price <= Number(maxPrice);

      return brandMatch && minMatch && maxMatch;
    });
  }, [
    products,
    selectedBrands,
    minPrice,
    maxPrice,
  ]);

  const totalPages = Math.ceil(
    totalCount / productsPerPage
  );

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const updateFilter = (key, value) => {
    if (key === "selectedCategory") {
      setLocalFilters((prev) => ({
        ...prev,
        selectedCategory: value,
      }));

      setCurrentPage(1);
      return;
    }

    setLocalFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const activeFilterCount =
    (selectedCategory ? 1 : 0) +
    selectedBrands.length +
    (minPrice ? 1 : 0) +
    (maxPrice ? 1 : 0);

  const filterProps = {
    categories,
    products,
    width,
    selectedCategory,
    setSelectedCategory: (value) =>
      updateFilter("selectedCategory", value),

    selectedBrands,
    setSelectedBrands: (value) =>
      updateFilter("selectedBrands", value),

    minPrice,
    setMinPrice: (value) =>
      updateFilter("minPrice", value),

    maxPrice,
    setMaxPrice: (value) =>
      updateFilter("maxPrice", value),
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Filters {...filterProps} />
      </div>

      <div className={styles.content}>
        <h1 className={styles.heading}>Products</h1>

        <button
          className={styles.mobileFilterBtn}
          onClick={() => setDrawerOpen(true)}
        >
         <FaFilter/> Filters

          {activeFilterCount > 0 && (
            <span className={styles.filterBadge}>
              {activeFilterCount}
            </span>
          )}
        </button>

        {isLoading ? (
          <Loader />
        ) : currentProducts.length === 0 ? (
          <div className={styles.noData}>
            No products found.
          </div>
        ) : (
          <>
            <div className={styles.grid}>
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  navigate={navigate}
                />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>

      <FilterDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        {...filterProps}
      />
    </div>
  );
}

export default ProductListing;
