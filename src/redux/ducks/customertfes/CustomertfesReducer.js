import * as types from "./CustomertfesTypes";
import { NotificationManager } from "react-notifications";

const INIT_STATE = {
  customers: {
    loading: false,
    data: [],
  },
  customerDetails: {
    loading: false,
    data: [],
  },
  customerFiltered: {
    loading: false,
    data: [],
    count: 0,
  },
  singleCustomer: {
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
    case types.GET_CUSTOMERTFES:
      return {
        ...state,
        customers: {
          ...state.customers,
          loading: true,
        },
      };

    case types.GET_CUSTOMERTFES_SUCCESS:
      // const { data } = action.payload;
      return {
        ...state,
        customers: {
          loading: false,
          data: [...state.customers.data, action.payload.data],
        },
      };

    case types.GET_CUSTOMERTFES_FAILURE:
      NotificationManager.warning("Error in fetching customers");
      return {
        ...state,
        customers: {
          loading: false,
          data: { ...state.customers },
        },
      };

    case types.SET_CUSTOMERTFES:
      return {
        ...state,
        customers: {
          ...state.customers,
          loading: true,
        },
        singleCustomer: {
          loading: true,
          data: {},
        },
      };

    case types.SET_CUSTOMERTFES_SUCCESS:
      NotificationManager.success("Success in Creating Customer");
      return {
        ...state,
        customers: {
          ...state.customers,
          loading: false,
          data: action.payload
          // data: [...state.customers.data, action.payload.data],
        },
        singleCustomer: {
          loading: false,
          data: action.payload,
        },
      };

    case types.SET_CUSTOMERTFES_FAILURE:
      NotificationManager.warning("Error in Creating customer");
      return {
        ...state,
        customers: {
          loading: false,
        },
        singleCustomer: {
          ...state.SkuProduct,
          loading: false,
        },
      };

    case types.GET_CUSTOMERTFES_DETAILS:
      return {
        ...state,
        customerDetails: {
          ...state.customerDetails,
          loading: true,
        },
      };

    case types.GET_CUSTOMERTFES_DETAILS_SUCCESS:
      // NotificationManager.success("Success in Fetching customer Details");
      return {
        ...state,
        customerDetails: {
          loading: false,
          data: action.payload,
        },
      };

    case types.GET_CUSTOMERTFES_DETAILS_FAILURE:
      NotificationManager.warning("Error in Fetching customer Details");
      return {
        ...state,
        customers: {
          loading: false,
        },
      };

    case types.GET_FILTER_CUSTOMERTFES:
      return {
        ...state,
        customerFiltered: {
          ...state.customerFiltered,
          loading: true,
        },
      };

    case types.GET_FILTER_CUSTOMERTFES_SUCCESS:
      return {
        ...state,
        customerFiltered: {
          loading: false,
          data: action.payload[0],
          count: action.payload[1]
        },
      };

    case types.GET_FILTER_CUSTOMERTFES_FAILURE:
      NotificationManager.warning("Error in Fetching Customer Details");
      return {
        ...state,
        customerFiltered: {
          loading: false,
        },
      };

    case types.DELETE_CUSTOMERTFES:
      return {
        ...state,
        customerFiltered: {
          ...state.customerFiltered,
          loading: true,
        },
      };

    case types.DELETE_CUSTOMERTFES_SUCCESS:
      NotificationManager.success("Customer Successfully Deleted!");
      let customerFiltered = state.customerFiltered.data.filter(
        (e) => e.id != action.payload
      );
      return {
        ...state,
        customerFiltered: {
          loading: false,
          data: customerFiltered,
        },
      };

    case types.DELETE_CUSTOMERTFES_FAILURE:
      NotificationManager.error("Error in Deleting Customer");
      return {
        ...state,
        customerFiltered: {
          loading: false,
        },
      };
    // DAVID - GET
    case types.GET_SINGLE_CUSTOMER_REQUEST:
      return {
        ...state,
        singleCustomer: { loading: true },
      };
    case types.GET_SINGLE_CUSTOMER_SUCCESS:
      return {
        ...state,
        singleCustomer: {
          loading: false,
          data: action.payload,
        },
      };
    case types.GET_SINGLE_CUSTOMER_FAILURE:
      NotificationManager.error("Failed to retrieve customer information");
      return {
        ...state,
        singleCustomer: { loading: false },
      };

    // DAVID - PATCH
    case types.PATCH_SINGLE_CUSTOMER_REQUEST:
      return {
        ...state,
        singleCustomer: { loading: true },
      };
    case types.PATCH_SINGLE_CUSTOMER_SUCCESS:
      NotificationManager.success("Customer information was successfully updated");
      return {
        ...state,
        singleCustomer: {
          loading: false,
          data: action.payload,
        },
      };
    case types.PATCH_SINGLE_CUSTOMER_FAILURE:
      NotificationManager.error("Failed to update customer information");
      return {
        singleCustomer: { loading: false },
      };

    case types.SET_DUPLICATE:
      return {
        ...state,
        singleCustomer: {
          ...state.singleCustomer,
          loading: true,
        },
      };
    case types.SET_DUPLICATE_SUCCESS:
      return {
        ...state,
        singleCustomer: {
          loading: false,
          data: action.payload,
        },
      };
    case types.SET_DUPLICATE_FAILURE:
      return {
        ...state,
        singleCustomer: { loading: false },
      };

    //CLEAR DUPLICATE
    case types.CLEAR_DUPLICATE:
      return {
        ...state,
        singleCustomer: {
          data: [],
          loading: true,
        },
      };
    case types.CLEAR_DUPLICATE_SUCCESS:
      return {
        ...state,
        singleCustomer: {
          loading: false,
          data: [],
        },
        customers: {
          loading: false,
          data: [],
        },
      };
    case types.CLEAR_DUPLICATE_FAILURE:
      return {
        ...state,
        singleCustomer: {
          loading: false,
          data: [],
        },
        customers: {
          loading: false,
          data: [],
        },
      };

      case types.GET_SAVED_CUSTOMER_QUERY:
        return {
          ...state,
          SavedQuery: {
            ...state.SavedQuery,
            ...action.payload
          }
        }
  
      case types.GET_SAVED_CUSTOMER_QUERY_SUCCESS:
        return {
          ...state,
          SavedQuery: {
            ...state.SavedQuery,
            ...action.payload
          }
        }
  
      case types.GET_SAVED_CUSTOMER_QUERY_FAILURE:
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
