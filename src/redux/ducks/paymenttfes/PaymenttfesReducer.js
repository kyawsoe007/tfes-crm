import * as types from "./PaymenttfesTypes";
import { NotificationManager } from "react-notifications";

const INIT_STATE = {
  PaymentFiltered: {
    loading: false,
    data: [],
  },
  OutstandingInvoice: {
    loading: false,
    invoices: [],
    creditNotes: []
  },
  PaymentProduct: {
    loading: false,
    data: {}
  },
  paymentMethod: {
    loading: false,
    data: []
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
    case types.GET_FILTER_PAYMENT_REQUEST:
      return {
        ...state,
        PaymentFiltered: {
          ...state.PaymentFiltered,
          loading: true,
        },
      };

    case types.GET_FILTER_PAYMENT_REQUEST_SUCCESS:
      return {
        ...state,
        PaymentFiltered: {
          loading: false,
          data: action.payload[0],
          count: action.payload[1],
        },
      };

    case types.GET_FILTER_PAYMENT_REQUEST_FAILURE:
      return {
        ...state,
        PaymentFiltered: {
          loading: false,
        },
      };

    case types.GET_SINGLE_PAYMENT_REQUEST:
      return {
        ...state,
        PaymentProduct: {
          ...state.PaymentProduct,
          loading: true
        },
      };
    case types.GET_SINGLE_PAYMENT_REQUEST_SUCCESS:
      return {
        ...state,
        PaymentProduct: {
          loading: false,
          data: action.payload.payment,
        },
        OutstandingInvoice: {
          loading: false,
          invoices: action.payload.invoices,
          creditNotes: action.payload.creditNotes
        }
      };
    case types.GET_SINGLE_PAYMENT_REQUEST_FAILURE:
      NotificationManager.warning("Error in fetching single payment");
      return {
        ...state,
        PaymentProduct: {
          ...state.PaymentProduct,
          loading: false
        },
      };

    case types.PATCH_SINGLE_PAYMENT:
      return {
        ...state,
        PaymentProduct: {
          data: {},
          loading: true
        },
      };

    case types.PATCH_SINGLE_PAYMENT_SUCCESS:
      NotificationManager.success("Payment Successfully Edited!");
      return {
        ...state,
        PaymentProduct: {
          loading: false,
          data: action.payload.payment,
        },
        OutstandingInvoice: {
          loading: false,
          invoices: action.payload.invoices,
          creditNotes: action.payload.creditNotes
        }
      };
    case types.PATCH_SINGLE_PAYMENT_FAILURE:
      NotificationManager.error("Error in Editing Payment Details");
      return {
        ...state,
        PaymentProduct: {
          ...state.PaymentProduct,
          loading: false
        },
      };

    case types.DELETE_PAYMENT:
      return {
        ...state,
        PaymentFiltered: {
          ...state.PaymentFiltered,
          loading: true,
        },
      };

    case types.DELETE_PAYMENT_SUCCESS:
      NotificationManager.success("Payment Successfully Deleted!");
      let PaymentFiltered = state.PaymentFiltered.data.filter(
          (e) => e.id !== action.payload
      );
      return {
        ...state,
        PaymentFiltered: {
          loading: false,
          data: PaymentFiltered,
        },
      };

    case types.DELETE_PAYMENT_FAILURE:
      NotificationManager.error("Error in Deleting Invoice Details");
      return {
        ...state,
        PaymentFiltered: {
          ...state.PaymentFiltered,
          loading: false,
        },
      };

    case types.GET_OUTSTANDING_INVOICES:
      return {
        ...state,
        PaymentProduct: {
          loading: false,
          data: {},
        },
        OutstandingInvoice: {
          ...state.OutstandingInvoice,
          loading: true,
        },
      };

    case types.GET_OUTSTANDING_INVOICES_SUCCESS:
      return {
        ...state,
        OutstandingInvoice: {
          loading: false,
          data: [],
          invoices: action.payload.invoices,
          creditNotes: action.payload.creditNotes
        },
      };

    case types.GET_OUTSTANDING_INVOICES_FAILURE:
      NotificationManager.warning("Error in fetching Outstanding Invoices");
      return {
        ...state,
        OutstandingInvoice: {
          loading: false,
          data: { ...state.OutstandingInvoice },
        },
      };

    case types.SET_PAYMENT:
      return {
        ...state,
        OutstandingInvoice: {
          ...state.OutstandingInvoice,
          loading: true,
        },
      };

    case types.SET_PAYMENT_SUCCESS:
      NotificationManager.success("Payment Successfully Saved!");
      return {
        ...state,
        PaymentProduct: {
          loading: false,
          data: action.payload.payment,
        },
        OutstandingInvoice: {
          loading: false,
          invoices: action.payload.invoices,
          creditNotes: action.payload.creditNotes
        }
      };

    case types.SET_PAYMENT_FAILURE:
      NotificationManager.warning("Error in fetching Outstanding Invoices");
      return {
        ...state,
        OutstandingInvoice: {
          loading: false,
          data: { ...state.OutstandingInvoice },
        },
      };

    case types.GET_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: {
          ...state.paymentMethod,
          loading: true,
        },
      };

    case types.GET_PAYMENT_METHOD_SUCCESS:
      return {
        ...state,
        paymentMethod: {
          loading: false,
          data: action.payload,
        }
      };

    case types.GET_PAYMENT_METHOD_FAILURE:
      NotificationManager.warning("Error in fetching payment method");
      return {
        ...state,
        paymentMethod: {
          loading: false,
          data: { ...state.paymentMethod },
        },
      };

    //CLEAR DATA LOADED FROM PREVIOUS FORMS
    case types.CLEAR_DUPLICATE:
      return {
        ...state,
        PaymentProduct: {
          data: [],
          loading: true,
        },
      }
    case types.CLEAR_DUPLICATE_SUCCESS:
      return {
        PaymentProduct: {
          loading: false,
          data: [],
        },
      }
    case types.CLEAR_DUPLICATE_FAILURE:
      return {
        ...state,
        PaymentProduct: { data: [], loading: false },
      }
      case types.GET_SAVED_PAYMENT_QUERY:
        return {
          ...state,
          SavedQuery: {
            ...state.SavedQuery,
            ...action.payload
          }
        }
  
      case types.GET_SAVED_PAYMENT_QUERY_SUCCESS:
        return {
          ...state,
          SavedQuery: {
            ...state.SavedQuery,
            ...action.payload
          }
        }
  
      case types.GET_SAVED_PAYMENT_QUERY_FAILURE:
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
