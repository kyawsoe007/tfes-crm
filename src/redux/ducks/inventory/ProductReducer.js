import { NotificationManager } from "react-notifications";
import * as types from "./ProductTypes";

const INIT_STATE = {
  productList: {
    loading: false,
    tableData: [],
    totalCount: 0,
  },
  preownedProductList: {
    loading: false,
    tableData: [],
    totalCount: 0,
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case types.GET_ALL_PRODUCTS:
      return {
        ...state,
        productList: {
          ...state.productList,
          loading: true,
        },
      };
    case types.GET_ALL_PRODUCTS_FAILURE:
      return {
        ...state,
        productList: {
          ...state.productList,
          loading: false,
        },
      };
    case types.GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        productList: {
          loading: false,
          tableData: action.payload.fields,
        },
      };
    case types.GET_ALL_PREOWNED_PRODUCTS:
      return {
        ...state,
        preownedProductList: {
          ...state.preownedProductList,
          loading: true,
        },
      };
    case types.GET_ALL_PREOWNED_PRODUCTS_FAILURE:
      return {
        ...state,
        preownedProductList: {
          ...state.preownedProductList,
          loading: false,
        },
      };
    case types.GET_ALL_PREOWNED_PRODUCTS_SUCCESS:
      return {
        ...state,
        preownedProductList: {
          loading: false,
          tableData: action.payload.fields,
        },
      };
    default:
      return {
        ...state,
      };
  }
};
