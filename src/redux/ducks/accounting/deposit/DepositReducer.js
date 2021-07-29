import * as types from "./DepositTypes";
import { NotificationManager } from "react-notifications";

const INIT_STATE = {
  Deposits: {
    loading: false,
    data: [],
  },
  DepositDetails: {
    loading: false,
    data: [],
  },
  DepositFiltered: {
    loading: false,
    data: [],
    count: 0,
  },
  DepositProduct: {
    loading: false,
    data: {},
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
    case types.GET_PAYMENT_DEPOSIT:
      return {
        ...state,
        Deposits: {
          ...state.Deposits,
          loading: true,
        },
      };

    case types.GET_PAYMENT_DEPOSIT_SUCCESS:
      return {
        ...state,
        Deposits: {
          loading: false,
          data: action.payload,
        },
      };

    case types.GET_PAYMENT_DEPOSIT_FAILURE:
      NotificationManager.warning("Error in fetching Deposits");
      NotificationManager.warning("Over here");
      return {
        ...state,
        Deposits: {
          loading: false,
          data: { ...state.Deposits },
        },
      };

    case types.SET_PAYMENT_DEPOSIT:
      return {
        ...state,
        DepositProduct: {
          loading: true,
          ...state.DepositProduct,
        },
      };

    case types.SET_PAYMENT_DEPOSIT_SUCCESS:
      NotificationManager.success("Success in Creating Deposit");
      return {
        ...state,
        DepositProduct: {
          ...state.DepositProduct,
          loading: false,
          data: action.payload
        },
      };

    case types.SET_PAYMENT_DEPOSIT_FAILURE:
      NotificationManager.warning("Error in Creating Deposit");
      return {
        ...state,
        DepositProduct: {
          ...state.DepositProduct,
          loading: false,
        },
      };


    case types.GET_SINGLE_PAYMENT_DEPOSIT_REQUEST:
      return {
        ...state,
        DepositProduct: {
          ...state.DepositProduct,
          loading: true
        },
      };
    case types.GET_SINGLE_PAYMENT_DEPOSIT_REQUEST_SUCCESS:
      return {
        ...state,
        DepositProduct: {
          loading: false,
          data: action.payload,
        },
      };
    case types.GET_SINGLE_PAYMENT_DEPOSIT_REQUEST_FAILURE:
      return {
        ...state,
        DepositProduct: {
          ...state.DepositProduct,
          loading: false
        },
      };

    case types.PATCH_SINGLE_PAYMENT_DEPOSIT:
      return {
        ...state,
        DepositProduct: {
          ...state.DepositProduct,
          loading: true
        },
      };

    case types.PATCH_SINGLE_PAYMENT_DEPOSIT_SUCCESS:
      NotificationManager.success("Deposit Successfully Edited!");
      return {
        ...state,
        DepositProduct: {
          loading: false,
          data: action.payload
        },
      };
    case types.PATCH_SINGLE_PAYMENT_DEPOSIT_FAILURE:
      NotificationManager.error("Error in Editing Deposit Details");
      console.log(action.payload);
      return {
        ...state,
        DepositProduct: {
          ...state.DepositProduct,
          loading: false
        },
      };

    case types.GET_FILTER_PAYMENT_DEPOSIT:
      return {
        ...state,
        DepositFiltered: {
          ...state.DepositFiltered,
          loading: true,
        },
      };

    case types.GET_FILTER_PAYMENT_DEPOSIT_SUCCESS:
      return {
        ...state,
        DepositFiltered: {
          loading: false,
          data: action.payload[0],
          count: action.payload[1],
        },
      };

    case types.GET_FILTER_PAYMENT_DEPOSIT_FAILURE:
      return {
        ...state,
        DepositFiltered: {
          loading: false,
        },
      };

    // DELETE SALES_ORDER
    case types.DELETE_PAYMENT_DEPOSIT:
      return {
        ...state,
        DepositFiltered: {
          ...state.DepositFiltered,
          loading: true,
        },
      };

    case types.DELETE_PAYMENT_DEPOSIT_SUCCESS:
      NotificationManager.success("Deposit Successfully Deleted!");
      let deletedDepositFiltered = state.DepositFiltered.data.filter(
        (e) => e.id !== action.payload
      );
      return {
        ...state,
        DepositFiltered: {
          loading: false,
          data: deletedDepositFiltered,
        },
      };

    case types.DELETE_PAYMENT_DEPOSIT_FAILURE:
      NotificationManager.error("Error in Deleting Deposit Details");
      return {
        ...state,
        DepositFiltered: {
          ...state.DepositFiltered,
          loading: false,
        },
      };



    case types.GET_PAYMENT_DEPOSIT_SUCCESS:
      return {
        ...state,
        loading: false
      }

    case types.GET_PAYMENT_DEPOSIT_FAILURE:
      return {
        ...state,
        loading: false
      }

    case types.GET_SAVED_DEPOSIT_QUERY:
      return {
        ...state,
        SavedQuery: {
          ...state.SavedQuery,
          ...action.payload
        }
      }

    case types.GET_SAVED_DEPOSIT_QUERY_SUCCESS:
      return {
        ...state,
        SavedQuery: {
          ...state.SavedQuery,
          ...action.payload
        }
      }

    case types.GET_SAVED_DEPOSIT_QUERY_FAILURE:
      // NotificationManager.warning('Error in fetching QuotationPdfCreate')
      return {
        ...state,
        SavedQuery: {
          ...state.SavedQuery,
          ...action.payload
        }
      }

    default:
      return { ...state };
  }
};
