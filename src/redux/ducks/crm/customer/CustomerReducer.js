import { NotificationManager } from "react-notifications";
import * as types from "./CustomerTypes";

const INIT_STATE = {
  customerList: {
    action: false,
    loading: false,
    tableData: [],
    totalCount: 0
  },
  customerToView: {
    loading: false,
    customer: null,
    sectionLoading: false
  },
  customerForm: {
    loading: false,
    fields: {
      leadSource: [],
      users: [],
      accounts: []
    }
  }
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    /**
     * Get Customers
     */
    case types.GET_CUSTOMER_FAILURE:
      NotificationManager.warning("Error in fetching Customer Data");
      return {
        ...state,
        customerToView: INIT_STATE.customerToView,
        customerList: INIT_STATE.customerList
      };
    case types.GET_ALL_CUSTOMER:
      return {
        ...state,
        customerList: { ...state.customerList, loading: true }
      };
    case types.GET_CUSTOMER_SUCCESS:
      const { data, totalCount } = action.payload;
      return {
        ...state,
        customerList: {
          ...state.customerList,
          loading: false,
          tableData: data,
          totalCount: totalCount
        }
      };

    /**
     * Get Single Customer
     */
    case types.GET_SINGLE_CUSTOMER:
      return {
        ...state,
        customerToView: { ...state.customerToView, loading: true }
      };
    case types.GET_SINGLE_CUSTOMER_SUCCESS:
      return {
        ...state,
        customerToView: {
          ...state.customerToView,
          loading: false,
          customer: action.payload
        }
      };
    case types.CLEAR_SINGLE_CUSTOMER:
      return {
        ...state,
        customerToView: INIT_STATE.customerToView
      };

    /**
     * New Customer
     */

    case types.NEW_CUSTOMER:
      return {
        ...state,
        customerForm: { ...state.customerForm, loading: true }
      };
    case types.NEW_CUSTOMER_SUCCESS:
      NotificationManager.success("Customer Created");
      return {
        ...state,
        customerForm: { ...state.customerForm, loading: false }
      };
    case types.NEW_CUSTOMER_FAILURE:
      NotificationManager.error("Error in POST API");
      return {
        ...state,
        customerForm: { ...state.customerForm, loading: false }
      };

    /**
     * Edit
     */
    case types.EDIT_CUSTOMER:
      return {
        ...state,
        customerForm: { ...state.customerForm, loading: true }
      };
    case types.EDIT_CUSTOMER_SUCCESS:
      NotificationManager.success("Customer Edited");
      return {
        ...state,
        customerForm: { ...state.customerForm, loading: false }
      };
    case types.EDIT_CUSTOMER_FAILURE:
      NotificationManager.error("Error in Edit");
      return {
        ...state,
        customerForm: { ...state.customerForm, loading: false }
      };

    /**
     * Form Fields
     */
    case types.GET_CUSTOMER_FORM_SUCCESS:
      return {
        ...state,
        customerForm: { ...state.customerForm, fields: action.payload.fields }
      };
    case types.GET_CUSTOMER_FORM_FAILURE:
      NotificationManager.error("Error in fetching form fields");
      return { ...state };

    /**
     * Delete
     */
    case types.DELETE_CUSTOMER:
      return {
        ...state,
        customerToView: { ...state.customerToView, loading: true },
        customerList: { ...state.customerList, loading: true }
      };
    case types.DELETE_CUSTOMER_SUCCESS:
      NotificationManager.success("Customer Deleted");
      // remove from state
      var afterDeleteData = Object.assign(
        [],
        state.customerList.tableData
      ).filter(cust => cust.id != action.payload);
      return {
        ...state,
        customerToView: { ...state.customerToView, loading: false },
        customerList: {
          ...state.customerList,
          loading: false,
          tableData: afterDeleteData
        }
      };
    case types.DELETE_CUSTOMER_FAILURE:
      NotificationManager.error("Error in Deleting Customer");
      return {
        ...state,
        customerToView: { ...state.customerToView, loading: false },
        customerList: { ...state.customerList, loading: false }
      };

    /**
     * Notes
     */
    case types.ADD_NOTE_CUSTOMER:
      return {
        ...state,
        customerToView: { ...state.customerToView, sectionLoading: true }
      };
    case types.ADD_NOTE_CUSTOMER_SUCCESS:
      var newNotes = Object.assign([], state.customerToView.customer.notes);
      newNotes.unshift(action.payload);
      return {
        ...state,
        customerToView: {
          ...state.customerToView,
          customer: { ...state.customerToView.customer, notes: newNotes },
          sectionLoading: false
        }
      };
    case types.ADD_NOTE_CUSTOMER_FAILURE:
      NotificationManager.error("Error in adding Note");
      return {
        ...state,
        customerToView: { ...state.customerToView, sectionLoading: false }
      };

    /**
     * Set Active
     */
    case types.SET_CUSTOMER_ACTIVE:
      NotificationManager.success("Customer Status Updated");
      return {
        ...state,
        customerToView: { ...state.customerToView, loading: true }
      };
    case types.SET_CUSTOMER_ACTIVE_SUCCESS:
      return {
        ...state,
        customerToView: {
          ...state.customerToView,
          customer: action.payload,
          loading: false
        }
      };
    case types.SET_CUSTOMER_ACTIVE_FAILURE:
      NotificationManager.error("Error");
      return {
        ...state,
        customerToView: { ...state.customerToView, loading: false }
      };

    /**
     * Transfer
     */
    case types.TRANSFER_CUSTOMER:
      return {
        ...state,
        customerToView: { ...state.customerToView, loading: true }
      };
    case types.TRANSFER_CUSTOMER_SUCCESS:
      NotificationManager.success("Record Transferred");
      return {
        ...state,
        customerToView: {
          ...state.customerToView,
          customer: action.payload,
          loading: false
        }
      };
    case types.TRANSFER_CUSTOMER_FAILURE:
      NotificationManager.error("Error in Transferring Record");
      return {
        ...state,
        customerToView: { ...state.customerToView, loading: false }
      };

    /**
     * Event
     */
    case types.ADD_CUSTOMER_EVENT:
      var newEvent = Object.assign([], state.customerToView.customer.events);
      newEvent.push(action.payload);
      return {
        ...state,
        customerToView: {
          ...state.customerToView,
          customer: { ...state.customerToView.customer, events: newEvent }
        }
      };

    default:
      return { ...state };
  }
};
