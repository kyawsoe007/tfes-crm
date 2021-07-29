import { NotificationManager } from "react-notifications";
import * as types from "./StockTypes";

const INIT_STATE = {
  stockList: {
    loading: false,
    tableData: [],
    totalCount: 0,
  },
  filteredStockList: {
    loading: false,
    tableData: [],
    totalCount: 0,
  },
  stockMoveLines: {
    loading: false,
    tableData: [],
    totalCount: 0,
  },
  SavedQuery: {
    saved: false,
    limit: 20,
    skip: 0,
    filter: [],
    filterList: [],
    searchText: ""
  }
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case types.GET_ALL_STOCKS:
      return {
        ...state,
        stockList: {
          ...state.stockList,
          loading: true,
        },
      };
    case types.GET_ALL_STOCKS_FAILURE:
      return {
        ...state,
        stockList: {
          ...state.stockList,
          loading: false,
        },
      };
    case types.GET_ALL_STOCKS_SUCCESS:
      NotificationManager.success('Stocks loaded successfully!');
      return {
        ...state,
        stockList: {
          loading: false,
          tableData: action.payload.fields,
        },
      };
    case types.GET_FILTER_STOCKS:
      return {
        ...state,
        filteredStockList: {
          ...state.filteredStockList,
          loading: true,
        }
      };
    case types.GET_FILTER_STOCKS_SUCCESS:
      return {
        ...state,
        filteredStockList: {
          ...state.filteredStockList,
          tableData: action.payload[0],
          totalCount: action.payload[1],
          loading: false,
        }
      };
    case types.GET_FILTER_STOCKS_FAILURE:
      NotificationManager.warning("Failed to load Stock Data");
      return {
        ...state,
        filteredStockList: {
          ...state.filteredStockList,
          loading: false,
        }
      };
    case types.GET_MOVE_LINE:
      return {
        ...state,
        stockMoveLines: {
          ...state.stockMoveLines,
          loading: true
        }
      };
    case types.GET_MOVE_LINE_SUCCESS:
      return {
        ...state,
        stockMoveLines: {
          ...state.stockMoveLines,
          tableData: action.payload,
          totalCount: action.payload.length,
          loading: false
        }
      };
    case types.GET_MOVE_LINE_FAILURE:
      NotificationManager.warning("Failed to load Move Lines");
      return {
        ...state,
        stockMoveLines: {
          ...state.stockMoveLines,
          loading: false
        }
      };
    case types.SAVE_OPERATION_FORM:
      return {  ...state };
    case types.SAVE_OPERATION_FORM_SUCCESS:
      NotificationManager.success("Successfully updated!");
      return { ...state };
    case types.SAVE_OPERATION_FORM_FAILURE:
      NotificationManager.warning("Failed to update moves");
      return { ...state };
    
      case types.CREATE_STOCK_OPERATION:
        return {  ...state };
      case types.CREATE_STOCK_OPERATION_SUCCESS:
        NotificationManager.success("Successfully create Operation!");
        return { ...state };
      case types.CREATE_STOCK_OPERATION_FAILURE:
        NotificationManager.warning("Failed to create Operation");
        return { ...state };
    
   
    case types.GET_FILTER_MOVES:
      return {
        ...state,
        stockMoveLines: {
          ...state.stockMoveLines,
          loading: true
        }
      };
    case types.GET_FILTER_MOVES_SUCCESS:
      return {
        ...state,
        stockMoveLines: {
          ...state.stockMoveLines,
          tableData: action.payload,
          totalCount: action.payload.length,
          loading: false
        }
      };
    case types.GET_FILTER_MOVES_FAILURE:
      return {
        ...state,
        stockMoveLines: {
          ...state.stockMoveLines,
          loading: false
        }
      };
    
    case types.GET_SAVED_STOCK_QUERY:
      return {
        ...state,
        SavedQuery: {
          ...state.SavedQuery,
          ...action.payload
        }
      }

    case types.GET_SAVED_STOCK_QUERY_SUCCESS:
      return {
        ...state,
        SavedQuery: {
          ...state.SavedQuery,
          ...action.payload
        }
      }

    case types.GET_SAVED_STOCK_QUERY_FAILURE:
      return {
        ...state,
        SavedQuery: {
          ...state.SavedQuery,
          ...action.payload
        }
      } 

    default:
      return {
        ...state,
      };
  }
};
