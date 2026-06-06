import {
  FETCH_PRODUCTS_COUNT,
  FETCH_PRODUCTS_DETAILS,
  FETCH_CATEGORIES,
  FETCH_PRODUCT_detail,
  SET_FILTERS,
  LOADING_PRODUCTS_STATE,
  LOADING_PRODUCT_DETAIL_STATE,
  LOADING_CATEGORIES_STATE,
  LOADING_CATEGORY_STATE,
} from "../Actions/AppActions";

const initialState = {
  products: [],
  categories: [],
  totalCount: 0,
  productdetail: null,
  filters: {
    selectedCategory: "",
    selectedBrands: [],
    minPrice: "",
    maxPrice: "",
    isloadingproducts: false,
    isloadingcategories: false,
    isloadingproductdetail: false,
    isloadingcategory: false,
  },
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_DETAILS:
      return {
        ...state,
        products: action.products,
      };
    case LOADING_PRODUCTS_STATE:
      return {
        ...state,
        isloadingproducts: action.isloadingproducts,
      };
    case LOADING_CATEGORIES_STATE:
      return {
        ...state,
        isloadingcategories: action.isloadingcategories,
      };
    case LOADING_PRODUCT_DETAIL_STATE:
      return {
        ...state,
        isloadingproductdetail: action.isloadingproductdetail,
      };
    case LOADING_CATEGORY_STATE:
      return {
        ...state,
        isloadingcategory: action.isloadingcategory,
      };
    case FETCH_PRODUCTS_COUNT:
      return {
        ...state,
        totalCount: action.totalCount,
      };
    case FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
      };
    case SET_FILTERS:
      return {
        ...state,
        filters: action.payload,
      };
    case FETCH_PRODUCT_detail:
      return { ...state, 
        productdetail: action.productdetail 
      };
    default:
      return state;
  }
};
export const fetchProductsListDetails = (state) => state.app.products;
export const fetchProductsCategoriesList = (state) => state.app.categories;
export const fetchProductsCounts = (state) => state.app.totalCount;
export const fetchUsersDetails = (state) => state.app.user;
export const fetchProductDetail = (state) => state.app.productdetail;
export const fetchFilters = (state) => state.app.filters;
export const fetchloadingproductsstate = (state) => state.app.isloadingproducts;
export const fetchloadingcategoriesstate = (state) => state.app.isloadingcategories;
export const fetchloadingcategorystate = (state) => state.app.isloadingcategory;
export const fetchloadingproductdetailsstate = (state) => state.app.isloadingproductdetail;

export default AppReducer;
