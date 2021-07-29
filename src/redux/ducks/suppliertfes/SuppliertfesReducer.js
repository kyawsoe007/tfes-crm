import * as types from "./SuppliertfesTypes";
import { NotificationManager } from "react-notifications";

const INIT_STATE = {
  Suppliers: {
    loading: false,
    data: [],
  },
  SupplierDetails: {
    loading: false,
    data: [],
  },
  SupplierFiltered: {
    loading: false,
    data: [],
  },
  singleSupplier: {
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
    case types.GET_SUPPLIER:
      return {
        ...state,
        Suppliers: {
          ...state.Suppliers,
          loading: true,
        },
      };

    case types.GET_SUPPLIER_SUCCESS:
      const { data } = action.payload;
      return {
        ...state,
        Suppliers: {
          ...state.Suppliers,
          loading: false,
          data: data,
        },
      };

    case types.GET_SUPPLIER_FAILURE:
      NotificationManager.warning("Error in fetching Suppliers");
      return {
        ...state,
        Suppliers: {
          ...state.Suppliers,
          loading: false,
          data: { ...state.Suppliers },
        },
      };

    case types.SET_SUPPLIER:
      return {
        ...state,
        Suppliers: {
          ...state.Suppliers,
          loading: true,
        },
        singleSupplier: {
          loading: true,
          data: {},
        },
      };

    case types.SET_SUPPLIER_SUCCESS:
      NotificationManager.success("Create Supplier successful!");
      return {
        ...state,
        Suppliers: {
          ...state.Suppliers,
          loading: false,
          data: [...state.Suppliers.data, action.payload],
        },
        singleSupplier: {
          loading: false,
          data: action.payload,
        },
      };

    case types.SET_SUPPLIER_FAILURE:
      NotificationManager.warning("Error in Creating Supplier");
      return {
        ...state,
        Suppliers: {
          ...state.Suppliers,
          loading: false,
        },
        singleSupplier: {
          ...state.singleSupplier,
          loading: false,
        },
      };

    case types.GET_SUPPLIER_DETAILS:
      return {
        ...state,
        SupplierDetails: {
          ...state.SupplierDetails,
          loading: true,
        },
      };

    case types.GET_SUPPLIER_DETAILS_SUCCESS:
      NotificationManager.success("Success in Fetching Supplier Details");
      return {
        ...state,
        SupplierDetails: {
          loading: false,
          data: action.payload.data,
        },
      };

    case types.GET_SUPPLIER_DETAILS_FAILURE:
      NotificationManager.warning("Error in Fetching Supplier Details");
      return {
        ...state,
        SupplierDetails: {
          ...state.SuppliersDetails,
          loading: false,
        },
      };

    case types.GET_FILTER_SUPPLIER:
      return {
        ...state,
        SupplierFiltered: {
          ...state.SupplierFiltered,
          loading: true,
        },
      };

    case types.GET_FILTER_SUPPLIER_SUCCESS:
      return {
        ...state,
        SupplierFiltered: {
          loading: false,
          data: action.payload[0],
          count: action.payload[1]
        },
      };

    case types.GET_FILTER_SUPPLIER_FAILURE:
      NotificationManager.warning("Error in Fetching Supplier Details");
      return {
        ...state,
        SupplierFiltered: {
          loading: false,
        },
      };

    case types.DELETE_SUPPLIER:
      return {
        ...state,
        SupplierFiltered: {
          ...state.SupplierFiltered,
          loading: true,
        },
      };

    case types.DELETE_SUPPLIER_SUCCESS:
      NotificationManager.success("Supplier Successfully Deleted!");
      let SupplierFiltered = state.SupplierFiltered.data.filter((e) => e.id != action.payload);
      return {
        ...state,
        SupplierFiltered: {
          loading: false,
          data: SupplierFiltered,
        },
      };

    case types.DELETE_SUPPLIER_FAILURE:
      NotificationManager.error("Error in Deleting SKU Details");
      return {
        ...state,
        SupplierFiltered: {
          loading: false,
        },
      };

    // DAVID - GET
    case types.GET_SINGLE_SUPPLIER_REQUEST:
      return {
        ...state,
        singleSupplier: { loading: true },
      };
    case types.GET_SINGLE_SUPPLIER_SUCCESS:
      return {
        ...state,
        singleSupplier: {
          loading: false,
          data: action.payload,
        },
      };
    case types.GET_SINGLE_SUPPLIER_FAILURE:
      NotificationManager.error("Failed to retrieve supplier information");
      return {
        ...state,
        singleSupplier: { loading: false },
      };

    // DAVID - PATCH
    case types.PATCH_SINGLE_SUPPLIER_REQUEST:
      return {
        ...state,
        singleSupplier: { loading: true },
      };
    case types.PATCH_SINGLE_SUPPLIER_SUCCESS:
      NotificationManager.success("Supplier information was successfully updated");
      return {
        ...state,
        singleSupplier: {
          loading: false,
          data: action.payload,
        },
      };
    case types.PATCH_SINGLE_SUPPLIER_FAILURE:
      NotificationManager.error("Failed to update supplier information");
      return {
        singleSupplier: { loading: false },
      };

    case types.SET_DUPLICATE:
      return {
        ...state,
        singleSupplier: {
          ...state.singleSupplier,
          loading: true,
        },
      };

    case types.SET_DUPLICATE_SUCCESS:
      return {
        ...state,
        singleSupplier: {
          loading: false,
          data: action.payload,
        },
      };

    case types.SET_DUPLICATE_FAILURE:
      return {
        ...state,
        singleSupplier: { loading: false },
      };

    //CLEAR DUPLICATE
    case types.CLEAR_DUPLICATE:
      return {
        ...state,
        singleSupplier: {
          data: [],
          loading: true,
        },
      };
    case types.CLEAR_DUPLICATE_SUCCESS:
      return {
        ...state,
        singleSupplier: {
          loading: false,
          data: [],
        },
        Supplier: {
          loading: false,
          data: [],
        },
      };
    case types.CLEAR_DUPLICATE_FAILURE:
      return {
        ...state,
        singleSupplier: {
          loading: false,
          data: [],
        },
        Supplier: {
          loading: false,
          data: [],
        },
      };

      case types.GET_SAVED_SUPPLIER_MAIN_QUERY:
        return {
          ...state,
          SavedQuery: {
            ...state.SavedQuery,
            ...action.payload
          }
        }
  
      case types.GET_SAVED_SUPPLIER_MAIN_QUERY_SUCCESS:
        return {
          ...state,
          SavedQuery: {
            ...state.SavedQuery,
            ...action.payload
          }
        }
  
      case types.GET_SAVED_SUPPLIER_MAIN_QUERY_FAILURE:
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
