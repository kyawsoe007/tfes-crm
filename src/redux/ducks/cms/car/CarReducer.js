import { NotificationManager } from "react-notifications";
import * as types from "./CarTypes";

const INIT_STATE = {
  loading: false,
  category: [],
  products: [],
  carList: {
    nowShowing: "All Cars",
    options: ["All Cars", "Open Car", "Closed Car", "Won Car"],
    action: false,
    loading: false,
    tableData: []
  },
  makes: {
    loading: false,
    tableData: []
  },
  models: {
    loading: false,
    tableData: []
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    
    /**
     * CRM Summary
     */
    case types.GET_ALL_CAR:
      return { ...state, carList: { ...state.carList, loading: true } };
    case types.GET_ALL_CAR_SUCCESS:
      return {
        ...state,
        carList: {
          ...state.carList,
          loading: false,
          tableData: action.payload
        }
      };
    case types.GET_ALL_CAR_FAILURE:
      NotificationManager.warning("failed to get data!");
      return { ...state, carList: { ...state.carList, loading: false } };

    case types.GET_CATEGORY:
      return { ...state, loading: true };
    case types.GET_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        category: action.payload
      };
    case types.GET_CATEGORY_FAILURE:
      NotificationManager.warning("failed to get category");
      return { ...state, loading: false };

    case types.GET_PRODUCTS:
      return { ...state, loading: true };
    case types.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload
      };
    case types.GET_PRODUCTS_FAILURE:
      NotificationManager.warning("failed to get products");
      return { ...state, loading: false };

      
    case types.GET_MAKES:

      return { ...state, makes: { ...state.makes, loading: true }};
    case types.GET_MAKES_SUCCESS:

      return {
        ...state,
        makes: {
          ...state.makes,
          loading: false,
          tableData: action.payload.data
        }
      };
    case types.GET_MAKES_FAILURE:

      NotificationManager.warning("failed to get Makes");
      return { ...state, makes: { ...state.makes, loading: false }};


      //For models
      case types.GET_MODELS:

        return { ...state, models: { ...state.models, loading: true }};
      case types.GET_MODELS_SUCCESS:
        console.log(action.payload.fields)
        return {
          ...state,
          models: {
            ...state.models,
            loading: false,
            tableData: action.payload
          }
        };
      case types.GET_MODELS_FAILURE:
  
        NotificationManager.warning("failed to get Models");
        return { ...state, models: { ...state.models, loading: false }};
    default:
      return { ...state };
  }
};
