import * as types from "./SupplierPaymentTypes";
import { NotificationManager } from "react-notifications";

const INIT_STATE = {
  SupplierPaymentFiltered: {
    loading: false,
    data: [],
  },
  OutstandingSupplierInvoice: {
    loading: false,
    invoices: [],
    debitNotes: []
  },
  SupplierPaymentProduct: {
    loading: false,
    data: {}
  },
  SavedQuery: {
    saved: false,
    limit: 20,
    skip: 0,
    filter: [],
    filterList: [],
    searchText: ""
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case types.GET_FILTER_SUPPLIER_PAYMENT_REQUEST:
      return {
        ...state,
        SupplierPaymentFiltered: {
          ...state.SupplierPaymentFiltered,
          loading: true,
        },
      };

    case types.GET_FILTER_SUPPLIER_PAYMENT_REQUEST_SUCCESS:
      return {
        ...state,
        SupplierPaymentFiltered: {
          loading: false,
          data: action.payload[0],
          count: action.payload[1],
        },
      };

    case types.GET_FILTER_SUPPLIER_PAYMENT_REQUEST_FAILURE:
      return {
        ...state,
        SupplierPaymentFiltered: {
          loading: false,
        },
      };

    case types.GET_SINGLE_SUPPLIER_PAYMENT_REQUEST:
      return {
        ...state,
        SupplierPaymentProduct: {
          ...state.SupplierPaymentProduct,
          loading: true
        },
      };
    case types.GET_SINGLE_SUPPLIER_PAYMENT_REQUEST_SUCCESS:
      return {
        ...state,
        SupplierPaymentProduct: {
          loading: false,
          data: action.payload.payment,
        },
        OutstandingSupplierInvoice: {
          loading: false,
          invoices: action.payload.invoices,
          debitNotes: action.payload.debitNotes
        }
      };
    case types.GET_SINGLE_SUPPLIER_PAYMENT_REQUEST_FAILURE:
      NotificationManager.warning("Error in fetching single payment");
      return {
        ...state,
        SupplierPaymentProduct: {
          ...state.SupplierPaymentProduct,
          loading: false
        },
      };

    case types.PATCH_SINGLE_SUPPLIER_PAYMENT:
      return {
        ...state,
        SupplierPaymentProduct: {
          data: {},
          loading: true
        },
      };

    case types.PATCH_SINGLE_SUPPLIER_PAYMENT_SUCCESS:
      NotificationManager.success("Payment Successfully Edited!");
      return {
        ...state,
        SupplierPaymentProduct: {
          loading: false,
          data: action.payload.payment,
        },
        OutstandingSupplierInvoice: {
          loading: false,
          invoices: action.payload.invoices,
          debitNotes: action.payload.debitNotes
        }
      };
    case types.PATCH_SINGLE_SUPPLIER_PAYMENT_FAILURE:
      NotificationManager.error("Error in Editing Payment Details");
      return {
        ...state,
        SupplierPaymentProduct: {
          ...state.SupplierPaymentProduct,
          loading: false
        },
      };

    case types.DELETE_SUPPLIER_PAYMENT:
      return {
        ...state,
        SupplierPaymentFiltered: {
          ...state.SupplierPaymentFiltered,
          loading: true,
        },
      };

    case types.DELETE_SUPPLIER_PAYMENT_SUCCESS:
      NotificationManager.success("Invoice Successfully Deleted!");
      let SupplierPaymentFiltered = state.SupplierPaymentFiltered.data.filter(
          (e) => e.id !== action.payload
      );
      return {
        ...state,
        SupplierPaymentFiltered: {
          loading: false,
          data: SupplierPaymentFiltered,
        },
      };

    case types.DELETE_SUPPLIER_PAYMENT_FAILURE:
      NotificationManager.error("Error in Deleting Invoice Details");
      return {
        ...state,
        SupplierPaymentFiltered: {
          ...state.SupplierPaymentFiltered,
          loading: false,
        },
      };

    case types.GET_OUTSTANDING_SUPPLIER_INVOICES:
      return {
        ...state,
        SupplierPaymentProduct: {
          loading: false,
          data: {},
        },
        OutstandingSupplierInvoice: {
          ...state.OutstandingSupplierInvoice,
          loading: true,
        },
      };

    case types.GET_OUTSTANDING_SUPPLIER_INVOICES_SUCCESS:
      return {
        ...state,
        OutstandingSupplierInvoice: {
          loading: false,
          invoices: action.payload.invoices,
          debitNotes: action.payload.debitNotes
        },
      };

    case types.GET_OUTSTANDING_SUPPLIER_INVOICES_FAILURE:
      NotificationManager.warning("Error in fetching Outstanding Invoices");
      return {
        ...state,
        OutstandingSupplierInvoice: {
          loading: false,
          data: { ...state.OutstandingSupplierInvoice },
        },
      };

    case types.SET_SUPPLIER_PAYMENT:
      return {
        ...state,
        OutstandingSupplierInvoice: {
          ...state.OutstandingSupplierInvoice,
          loading: true,
        },
      };

    case types.SET_SUPPLIER_PAYMENT_SUCCESS:
      return {
        ...state,
        SupplierPaymentProduct: {
          loading: false,
          data: action.payload.payment,
        },
        OutstandingSupplierInvoice: {
          loading: false,
          invoices: action.payload.invoices,
          debitNotes: action.payload.debitNotes
        }
      };

    case types.SET_SUPPLIER_PAYMENT_FAILURE:
      NotificationManager.warning("Error in fetching Outstanding Invoices");
      return {
        ...state,
        OutstandingSupplierInvoice: {
          loading: false,
          data: { ...state.OutstandingSupplierInvoice },
        },
      };

    //CLEAR DATA LOADED FROM PREVIOUS FORMS
    case types.CLEAR_DUPLICATE:
      return {
        ...state,
        SupplierPaymentProduct: {
          data: [],
          loading: true,
        },
      }
    case types.CLEAR_DUPLICATE_SUCCESS:
      return {
        SupplierPaymentProduct: {
          loading: false,
          data: [],
        },
      }
    case types.CLEAR_DUPLICATE_FAILURE:
      return {
        ...state,
        SupplierPaymentProduct: { data: [], loading: false },
      }
    
      case types.GET_SAVED_SUPPLIER_PAYMENT_QUERY:
      return {
        ...state,
        SavedQuery: {
          ...state.SavedQuery,
          ...action.payload
        }
      }

    case types.GET_SAVED_SUPPLIER_PAYMENT_QUERY_SUCCESS:
      return {
        ...state,
        SavedQuery: {
          ...state.SavedQuery,
          ...action.payload
        }
      }

    case types.GET_SAVED_SUPPLIER_PAYMENT_QUERY_FAILURE:
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
