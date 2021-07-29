import { NotificationManager } from "react-notifications";
import * as types from "./AccountTypes";

const INIT_STATE = {
  accountList: {
    nowShowing: "All Accounts",
    options: ["All Accounts", "Active Accounts", "Inactive Accounts"],
    action: false,
    loading: false,
    tableData: []
  },
  accountToView: {
    loading: false,
    account: null,
    sectionLoading: false
  },
  accountForm: {
    loading: false,
    fields: {
      industry: [],
      users: []
    }
  }
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case types.CHANGE_ACCOUNT_LIST_VIEW:
      if (action.payload == "My Accounts") {
        return {
          ...state,
          accountList: {
            ...state.accountList,
            nowShowing: action.payload,
            action: true,
            loading: true
          }
        };
      } else {
        return {
          ...state,
          accountList: {
            ...state.accountList,
            nowShowing: action.payload,
            action: false,
            loading: true
          }
        };
      }

    /**
     * Get Accounts
     */
    case types.GET_ACCOUNT_FAILURE:
      NotificationManager.warning("Error in fetching Account Data");
      return {
        ...state,
        accountToView: INIT_STATE.accountToView,
        accountList: INIT_STATE.accountList
      };
    case types.GET_ALL_ACCOUNT:
    case types.GET_MY_ACCOUNT:
    case types.GET_OPEN_ACCOUNT:
      return {
        ...state,
        accountList: { ...state.accountList, loading: true }
      };
    case types.GET_ACCOUNT_SUCCESS:
      // sort by createdAt
      var defaultSort = action.payload.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      return {
        ...state,
        accountList: {
          ...state.accountList,
          loading: false,
          tableData: defaultSort
        }
      };

    /**
     * Get Single Account
     */
    case types.GET_SINGLE_ACCOUNT:
      return {
        ...state,
        accountToView: { ...state.accountToView, loading: true }
      };
    case types.GET_SINGLE_ACCOUNT_SUCCESS:
      return {
        ...state,
        accountToView: {
          ...state.accountToView,
          loading: false,
          account: action.payload
        }
      };
    case types.CLEAR_SINGLE_ACCOUNT:
      return {
        ...state,
        accountToView: INIT_STATE.accountToView
      };

    /**
     * New Account
     */

    case types.NEW_ACCOUNT:
      return {
        ...state,
        accountForm: { ...state.accountForm, loading: true }
      };
    case types.NEW_ACCOUNT_SUCCESS:
      NotificationManager.success("Account Created");
      return {
        ...state,
        accountForm: { ...state.accountForm, loading: false }
      };
    case types.NEW_ACCOUNT_FAILURE:
      NotificationManager.error("Error in POST API");
      return {
        ...state,
        accountForm: { ...state.accountForm, loading: false }
      };

    /**
     * Edit
     */
    case types.EDIT_ACCOUNT:
      return {
        ...state,
        accountForm: { ...state.accountForm, loading: true }
      };
    case types.EDIT_ACCOUNT_SUCCESS:
      NotificationManager.success("Account Edited");
      return {
        ...state,
        accountForm: { ...state.accountForm, loading: false }
      };
    case types.EDIT_ACCOUNT_FAILURE:
      NotificationManager.error("Error in Edit");
      return {
        ...state,
        accountForm: { ...state.accountForm, loading: false }
      };

    /**
     * Form Fields
     */
    case types.GET_ACCOUNT_FORM_SUCCESS:
      return {
        ...state,
        accountForm: { ...state.accountForm, fields: action.payload.fields }
      };
    case types.GET_ACCOUNT_FORM_FAILURE:
      NotificationManager.error("Error in fetching form fields");
      return { ...state };

    /**
     * Delete
     */
    case types.DELETE_ACCOUNT:
      return {
        ...state,
        accountToView: { ...state.accountToView, loading: true },
        accountList: { ...state.accountList, loading: true }
      };
    case types.DELETE_ACCOUNT_SUCCESS:
      NotificationManager.success("Account Deleted");
      // remove from state
      var afterDeleteData = Object.assign(
        [],
        state.accountList.tableData
      ).filter(acct => acct.id != action.payload);
      return {
        ...state,
        accountToView: { ...state.accountToView, loading: false },
        accountList: {
          ...state.accountList,
          loading: false,
          tableData: afterDeleteData
        }
      };
    case types.DELETE_ACCOUNT_FAILURE:
      NotificationManager.error(action.payload.message);
      return {
        ...state,
        accountToView: { ...state.accountToView, loading: false },
        accountList: { ...state.accountList, loading: false }
      };

    /**
     * Notes
     */
    case types.ADD_NOTE_ACCOUNT:
      return {
        ...state,
        accountToView: { ...state.accountToView, sectionLoading: true }
      };
    case types.ADD_NOTE_ACCOUNT_SUCCESS:
      var newNotes = Object.assign([], state.accountToView.account.notes);
      newNotes.unshift(action.payload);
      return {
        ...state,
        accountToView: {
          ...state.accountToView,
          account: { ...state.accountToView.account, notes: newNotes },
          sectionLoading: false
        }
      };
    case types.ADD_NOTE_ACCOUNT_FAILURE:
      NotificationManager.error("Error in adding Note");
      return {
        ...state,
        accountToView: { ...state.accountToView, sectionLoading: false }
      };

    /**
     * Set Active
     */
    case types.SET_ACCOUNT_ACTIVE:
      NotificationManager.success("Account Status Updated");
      return {
        ...state,
        accountToView: { ...state.accountToView, loading: true }
      };
    case types.SET_ACCOUNT_ACTIVE_SUCCESS:
      return {
        ...state,
        accountToView: {
          ...state.accountToView,
          account: action.payload,
          loading: false
        }
      };
    case types.SET_ACCOUNT_ACTIVE_FAILURE:
      NotificationManager.error("Error");
      return {
        ...state,
        accountToView: { ...state.accountToView, loading: false }
      };

    /**
     * Transfer
     */
    case types.TRANSFER_ACCOUNT:
      return {
        ...state,
        accountToView: { ...state.accountToView, loading: true }
      };
    case types.TRANSFER_ACCOUNT_SUCCESS:
      NotificationManager.success("Record Transferred");
      return {
        ...state,
        accountToView: {
          ...state.accountToView,
          account: action.payload,
          loading: false
        }
      };
    case types.TRANSFER_ACCOUNT_FAILURE:
      NotificationManager.error("Error in Transferring Record");
      return {
        ...state,
        accountToView: { ...state.accountToView, loading: false }
      };

    /**
     * Event
     */
    case types.ADD_ACCOUNT_EVENT:
      var newEvent = Object.assign([], state.accountToView.account.events);
      newEvent.push(action.payload);
      return {
        ...state,
        accountToView: {
          ...state.accountToView,
          account: { ...state.accountToView.account, events: newEvent }
        }
      };

    default:
      return { ...state };
  }
};
