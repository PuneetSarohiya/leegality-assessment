import { showNotification } from "../../components/Toastify/Toast";
import callApi from "../../util/apiCaller";

export const FETCH_PRODUCTS_DETAILS = "FETCH_PRODUCTS_DETAILS";
export const FETCH_PRODUCTS_COUNT = "FETCH_PRODUCTS_COUNT";
export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const FETCH_PRODUCT_detail = "FETCH_PRODUCT_detail";
export const SET_FILTERS = "SET_FILTERS";
export const LOADING_PRODUCTS_STATE = "LOADING_PRODUCTS_STATE";
export const LOADING_CATEGORIES_STATE = "LOADING_CATEGORIES_STATE";
export const LOADING_PRODUCT_DETAIL_STATE = "LOADING_PRODUCT_DETAIL_STATE";
export const LOADING_CATEGORY_STATE = "LOADING_CATEGORY_STATE";

export function setFilters(payload) {
  return {
    type: SET_FILTERS,
    payload,
  };
}
export function loadProductsDetails(data) {
  return {
    type: FETCH_PRODUCTS_DETAILS,
    products: data,
  };
}

export function loadCategories(data) {
  return {
    type: FETCH_CATEGORIES,
    categories: data,
  };
}

export function totalProductsCounts(data) {
  return {
    type: FETCH_PRODUCTS_COUNT,
    totalCount: data,
  };
}

export function loadingstate(status) {
  return {
    type: LOADING_PRODUCTS_STATE,
    isloadingproducts: status,
  };
}

export function loadingcategoriesstate(status) {
  return {
    type: LOADING_CATEGORIES_STATE,
    isloadingcategories: status,
  };
}
export function loadingproductdetailstate(status) {
  return {
    type: LOADING_PRODUCT_DETAIL_STATE,
    isloadingproductdetail: status,
  };
}
export function loadingcategorystate(status) {
  return {
    type: LOADING_CATEGORY_STATE,
    isloadingcategory: status,
  };
}

export function loadProductbyId(data) {
  return { 
    type: FETCH_PRODUCT_detail,
    productdetail: data 
  };
}

export function fetchAllProductDetails(payload) {
  return async (dispatch) => {
    dispatch(loadingstate(true));
    try {
      const res = await callApi("products", "get");

      dispatch(loadProductsDetails(res.products));

      dispatch(
        totalProductsCounts(res.limit),
      );

      showNotification("Product List Fetched Successfully", "success");
      dispatch(loadingstate(false));
    } catch (error) {
      console.log(error);
      showNotification("Products Not Fetched", "error");
    }
  };
}

export function fetchCategories() {
  return async (dispatch) => {
    dispatch(loadingcategoriesstate(true));

    try {
      const res = await callApi("products/categories", "get");

      dispatch(loadCategories(res));
      dispatch(loadingcategoriesstate(false));
    } catch (error) {
      console.log(error);

      showNotification("Categories Not Fetched", "error");
    }
  };
}

export function fetchProductsByCategory(category) {
  return async (dispatch) => {
    dispatch(loadingcategorystate(true));

    try {
      const res = await callApi(`products/category/${category}`, "get");

      dispatch(loadProductsDetails(res.products));
      dispatch(loadingcategorystate(false));

      dispatch(
        totalProductsCounts({
          total: res.total,
        }),
      );
    } catch (error) {
      console.log(error);

      showNotification("Products Not Fetched", "error");
    }
  };
}

export function fetchProductById(id) {
  return async (dispatch) => {
    dispatch(loadingproductdetailstate(true));

    try {
      const res = await callApi(`products/${id}`, "get");
      dispatch(loadProductbyId(res));
      dispatch(loadingproductdetailstate(false));
    } catch (error) {
      showNotification("Product Not Fetched", "error");
    }
  };
}
