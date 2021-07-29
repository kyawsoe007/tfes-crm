import * as types from "./PurchasetfesTypes";
import { NotificationManager } from "react-notifications";

const INIT_STATE = {
  Purchases: {
    loading: false,
    data: [],
  },
  PurchaseDetails: {
    loading: false,
    data: [],
  },
  PurchaseFiltered: {
    loading: false,
    data: [],
  },
  singlePurchase: {
    loading: false,
    data: {},
  },
  PurchaseOrderPdfCreate:{
    loading:false,
    data:{}
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
    case types.GET_PURCHASE:
      return {
        ...state,
        Purchases: {
          ...state.Purchases,
          loading: true,
        },
      };

    case types.GET_PURCHASE_SUCCESS:
      const { data } = action.payload;
      return {
        ...state,
        Purchases: {
          ...state.Purchases,
          loading: false,
          data: data,
        },
      };

    case types.GET_PURCHASE_FAILURE:
      NotificationManager.warning("Error in fetching Purchases");
      return {
        ...state,
        Purchases: {
          ...state.Purchases,
          loading: false,
          data: { ...state.Purchases },
        },
      };

    case types.SET_PURCHASE:
      return {
        ...state,
        Purchases: {
          ...state.Purchases,
          loading: true,
        },
        singlePurchase: {
          loading: true,
          data: {},
        },
      };

    case types.SET_PURCHASE_SUCCESS:
      NotificationManager.success("Create Purchase successful!");
      return {
        ...state,
        Purchases: {
          ...state.Purchases,
          loading: false,
          data: [...state.Purchases.data, action.payload],
        },
        singlePurchase: {
          loading: false,
          data: action.payload,
        },
      };

    case types.SET_PURCHASE_FAILURE:
      NotificationManager.warning("Error in Creating Purchase");
      return {
        ...state,
        Purchases: {
          ...state.Purchases,
          loading: false,
        },
        singlePurchase: {
          ...state.singlePurchase,
          loading: false,
        },
      };

    case types.GET_PURCHASE_DETAILS:
      return {
        ...state,
        PurchaseDetails: {
          ...state.PurchaseDetails,
          loading: true,
        },
      };

    case types.GET_PURCHASE_DETAILS_SUCCESS:
      return {
        ...state,
        PurchaseDetails: {
          loading: false,
          data: action.payload.data,
        },
      };

    case types.GET_PURCHASE_DETAILS_FAILURE:
      NotificationManager.warning("Error in Fetching Purchase Details");
      return {
        ...state,
        PurchaseDetails: {
          ...state.PurchasesDetails,
          loading: false,
        },
      };

    case types.GET_FILTER_PURCHASE:
      return {
        ...state,
        PurchaseFiltered: {
          ...state.PurchaseFiltered,
          loading: true,
        },
      };

    case types.GET_FILTER_PURCHASE_SUCCESS:
      return {
        ...state,
        PurchaseFiltered: {
          loading: false,
          data: action.payload[0],
          count: action.payload[1]
        },
      };

    case types.GET_FILTER_PURCHASE_FAILURE:
      NotificationManager.warning("Error in Fetching Purchase Details");
      return {
        ...state,
        PurchaseFiltered: {
          loading: false,
        },
      };

    case types.DELETE_PURCHASE:
      return {
        ...state,
        PurchaseFiltered: {
          ...state.PurchaseFiltered,
          loading: true,
        },
      };

    case types.DELETE_PURCHASE_SUCCESS:
      NotificationManager.success("Purchase Successfully Deleted!");
      let PurchaseFiltered = state.PurchaseFiltered.data.filter((e) => e.id != action.payload);
      return {
        ...state,
        PurchaseFiltered: {
          loading: false,
          data: PurchaseFiltered,
        },
      };

    case types.DELETE_PURCHASE_FAILURE:
      NotificationManager.error("Error in Deleting SKU Details");
      return {
        ...state,
        PurchaseFiltered: {
          loading: false,
        },
      };

    // DAVID - GET
    case types.GET_SINGLE_PURCHASE_REQUEST:
      return {
        ...state,
        singlePurchase: { loading: true },
      };
    case types.GET_SINGLE_PURCHASE_SUCCESS:
      return {
        ...state,
        singlePurchase: {
          loading: false,
          data: action.payload,
        },
      };
    case types.GET_SINGLE_PURCHASE_FAILURE:
      NotificationManager.error("Failed to retrieve Purchase information");
      return {
        ...state,
        singlePurchase: { loading: false },
      };

    // DAVID - PATCH
    case types.PATCH_SINGLE_PURCHASE_REQUEST:
      return {
        ...state,
        singlePurchase: { loading: true },
      };
    case types.PATCH_SINGLE_PURCHASE_SUCCESS:
      NotificationManager.success("Purchase information was successfully updated");
      return {
        ...state,
        singlePurchase: {
          loading: false,
          data: action.payload,
        },
      };
    case types.PATCH_SINGLE_PURCHASE_FAILURE:
      NotificationManager.error("Failed to update Purchase information");
      return {
        ...state,
        singlePurchase: { loading: false },
      };

    case types.SET_DUPLICATE:
      return {
        ...state,
        singlePurchase: {
          ...state.singlePurchase,
          loading: true,
        },
      };

    case types.SET_DUPLICATE_SUCCESS:
      return {
        ...state,
        singlePurchase: {
          loading: false,
          data: action.payload,
        },
      };

    case types.SET_DUPLICATE_FAILURE:
      return {
        ...state,
        singlePurchase: { loading: false },
      };

    //CLEAR DUPLICATE
    case types.CLEAR_DUPLICATE:
      return {
        ...state,
        singlePurchase: {
          data: [],
          loading: true,
        },
      };
    case types.CLEAR_DUPLICATE_SUCCESS:
      return {
        ...state,
        singlePurchase: {
          loading: false,
          data: [],
        },
        Purchase: {
          loading: false,
          data: [],
        },
      };
    case types.CLEAR_DUPLICATE_FAILURE:
      return {
        ...state,
        singlePurchase: {
          loading: false,
          data: [],
        },
        Purchase: {
          loading: false,
          data: [],
        },
      };

      case types.PDF_CREATE_PURCHASE_ORDER:
      return {
        ...state,
        loading:true
      }

    case types.PDF_CREATE_PURCHASE_ORDER_SUCCESS:
      return {
        ...state,
        loading:false
      }

    case types.PDF_CREATE_PURCHASE_ORDER_FAILURE:
      NotificationManager.warning('Error in fetching QuotationPdfCreate')
      return {
        ...state,
        loading:false
      }
      
    case types.PATCH_SINGLE_PURCHASE_REQUEST_INTERNAL_REMARKS:
      return {
        ...state,
        PurchaseFiltered: {
          ...state.PurchaseFiltered,
          loading: true
        }
      }

    case types.PATCH_SINGLE_PURCHASE_REQUEST_INTERNAL_REMARKS_SUCCESS:
      NotificationManager.success('Internal Remarks Saved!')

      let internalRemarks = state.PurchaseFiltered.data.map(item => item.id === action.payload.id ? action.payload : item);

      return {
        ...state, 
        PurchaseFiltered: {
          ...state.PurchaseFiltered,
          loading: false,
          data: internalRemarks
        }
      }

    case types.PATCH_SINGLE_PURCHASE_REQUEST_INTERNAL_REMARKS_FAILURE:
      NotificationManager.error('Failed to save internal Remarks')
      return {
        ...state, 
        PurchaseFiltered: {
          ...state.PurchaseFiltered,
          loading: false,
        }
      }

    case types.GET_SAVED_PURCHASE_QUERY:
      return {
        ...state,
        SavedQuery: {
          ...state.SavedQuery,
          ...action.payload
        }
      }

    case types.GET_SAVED_PURCHASE_QUERY_SUCCESS:
      return {
        ...state,
        SavedQuery: {
          ...state.SavedQuery,
          ...action.payload
        }
      }

    case types.GET_SAVED_PURCHASE_QUERY_FAILURE:
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
