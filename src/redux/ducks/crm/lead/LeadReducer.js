import { NotificationManager } from "react-notifications";
import * as types from "./LeadTypes";

const INIT_STATE = {
  leadList: {
    nowShowing: "All Leads",
    options: ["All Leads", "Open Leads", "Hot Leads", "Cold Leads"],
    action: false,
    loading: false,
    tableData: []
  },
  leadSummary: {
    summary: [],
    loading: false
  },
  leadToView: {
    loading: false,
    lead: null,
    sectionLoading: false
  },
  leadForm: {
    loading: false,
    fields: {
      leadSource: [],
      leadStatus: [],
      industry: [],
      leadInterest: [],
      users: []
    }
  },
  leadToConvert: {
    modal: {
      count: 0,
      data: [],
      loading: false,
      show: false
    },
    successMsg: {
      show: false,
      newDeal: null,
      newCust: {},
      newAcct: {}
    }
  }
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case types.CHANGE_LEAD_LIST_VIEW:
      if (action.payload == "My Leads") {
        return {
          ...state,
          leadList: {
            ...state.leadList,
            nowShowing: action.payload,
            action: true,
            loading: true
          }
        };
      } else {
        return {
          ...state,
          leadList: {
            ...state.leadList,
            nowShowing: action.payload,
            action: false,
            loading: true
          }
        };
      }

    /**
     * Lead Summary
     */
    case types.GET_LEAD_SUMMARY:
      return {
        ...state,
        leadSummary: {
          ...state.leadSummary,
          loading: true
        }
      };
    case types.GET_LEAD_SUMMARY_SUCCESS:
      return {
        ...state,
        leadSummary: {
          ...state.leadSummary,
          summary: action.payload,
          loading: false
        }
      };
    case types.GET_LEAD_SUMMARY_FAILURE:
      NotificationManager.warning("Error in fetching Lead Summary");
      return { ...state, leadSummary: INIT_STATE.leadSummary };

    /**
     * Get Leads
     */
    case types.GET_LEAD_FAILURE:
      NotificationManager.warning("Error in fetching Lead Data");
      return {
        ...state,
        leadToView: INIT_STATE.leadToView,
        leadList: INIT_STATE.leadList
      };
    case types.GET_ALL_LEAD:
    case types.GET_MY_LEAD:
    case types.GET_OPEN_LEAD:
    case types.GET_HOT_LEAD:
    case types.GET_COLD_LEAD:
      return {
        ...state,
        leadList: { ...state.leadList, loading: true }
      };
    case types.GET_LEAD_SUCCESS:
      // sort by createdAt
      var defaultSort = action.payload.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      return {
        ...state,
        leadList: {
          ...state.leadList,
          loading: false,
          tableData: defaultSort
        }
      };

    /**
     * Get Single Lead
     */
    case types.GET_SINGLE_LEAD:
      return { ...state, leadToView: { ...state.leadToView, loading: true } };
    case types.GET_SINGLE_LEAD_SUCCESS:
      return {
        ...state,
        leadToView: {
          ...state.leadToView,
          loading: false,
          lead: action.payload
        }
      };
    case types.CLEAR_SINGLE_LEAD:
      return {
        ...state,
        leadToView: INIT_STATE.leadToView
      };

    /**
     * New Lead
     */
    case types.NEW_LEAD:
      return { ...state, leadForm: { ...state.leadForm, loading: true } };
    case types.NEW_LEAD_SUCCESS:
      NotificationManager.success("Lead Created");
      return { ...state, leadForm: { ...state.leadForm, loading: false } };
    case types.NEW_LEAD_FAILURE:
      NotificationManager.error("Error in POST API");
      return { ...state, leadForm: { ...state.leadForm, loading: false } };

    /**
     * Edit
     */
    case types.EDIT_LEAD:
      return { ...state, leadForm: { ...state.leadForm, loading: true } };
    case types.EDIT_LEAD_SUCCESS:
      NotificationManager.success("Lead Edited");
      return { ...state, leadForm: { ...state.leadForm, loading: false } };
    case types.EDIT_LEAD_FAILURE:
      NotificationManager.error("Error in Edit Lead");
      return { ...state, leadForm: { ...state.leadForm, loading: false } };

    /**
     * Fields
     */
    case types.GET_LEADFORM_FIELDS_SUCCESS:
      return {
        ...state,
        leadForm: { ...state.leadForm, fields: action.payload.fields }
      };
    case types.GET_LEADFORM_FIELDS_FAILURE:
      NotificationManager.error("Error in fetching form fields");
      return { ...state };

    /**
     * Convert Lead
     */
    case types.HANDLE_CONVERT_MODAL:
      return {
        ...state,
        leadToConvert: {
          ...state.leadToConvert,
          modal: {
            ...state.leadToConvert.modal,
            show: !state.leadToConvert.modal.show
          }
        }
      };
    case types.HANDLE_SUCCESS_CONVERT_MODAL:
      return {
        ...state,
        leadToConvert: {
          ...state.leadToConvert,
          successMsg: INIT_STATE.leadToConvert.successMsg
        }
      };
    case types.CHECK_ACCOUNT_EXIST:
      return {
        ...state,
        leadToView: { ...state.leadToView, loading: true }
      };
    case types.CHECK_ACCOUNT_EXIST_SUCCESS:
      return {
        ...state,
        leadToView: { ...state.leadToView, loading: false },
        leadToConvert: {
          ...state.leadToConvert,
          modal: {
            ...state.leadToConvert.modal,
            show: true,
            count: action.payload.count,
            data: action.payload.existingAccounts
          }
        }
      };
    case types.CHECK_ACCOUNT_EXIST_FAILURE:
      NotificationManager.error("Error in Account Check");
      return {
        ...state,
        leadToView: { ...state.leadToView, loading: false }
      };
    case types.CONVERT_LEAD:
      return {
        ...state,
        leadToConvert: {
          ...state.leadToConvert,
          modal: {
            ...state.leadToConvert.modal,
            loading: true
          }
        }
      };
    case types.CONVERT_LEAD_SUCCESS:
      return {
        ...state,
        leadToConvert: {
          ...state.leadToConvert,
          modal: INIT_STATE.leadToConvert.modal,
          successMsg: {
            show: true,
            newDeal: action.payload.newDeal,
            newCust: action.payload.newCust,
            newAcct: action.payload.newAcct
          }
        }
      };
    case types.CONVERT_LEAD_FAILURE:
      NotificationManager.warning("Error in Convert POST API");
      return {
        ...state,
        leadToConvert: {
          ...state.leadToConvert,
          modal: {
            ...state.leadToConvert.modal,
            loading: false
          }
        }
      };

    /**
     * Delete
     */
    case types.DELETE_LEAD:
      return {
        ...state,
        leadToView: { ...state.leadToView, loading: true },
        leadList: { ...state.leadList, loading: true }
      };
    case types.DELETE_LEAD_SUCCESS:
      NotificationManager.success("Lead Deleted!");
      // remove from state
      var afterDeleteData = Object.assign([], state.leadList.tableData).filter(
        lead => lead.id != action.payload
      );
      return {
        ...state,
        leadToView: { ...state.leadToView, loading: false },
        leadList: {
          ...state.leadList,
          loading: false,
          tableData: afterDeleteData
        }
      };
    case types.DELETE_LEAD_FAILURE:
      NotificationManager.error("Error in Deleting Lead");
      return {
        ...state,
        leadToView: { ...state.leadToView, loading: false },
        leadList: { ...state.leadList, loading: false }
      };

    /**
     * Notes
     */
    case types.ADD_NOTE_LEAD:
      return {
        ...state,
        leadToView: { ...state.leadToView, sectionLoading: true }
      };
    case types.ADD_NOTE_LEAD_SUCCESS:
      var newNotes = Object.assign([], state.leadToView.lead.notes);
      newNotes.unshift(action.payload);
      return {
        ...state,
        leadToView: {
          ...state.leadToView,
          lead: { ...state.leadToView.lead, notes: newNotes },
          sectionLoading: false
        }
      };
    case types.ADD_NOTE_LEAD_FAILURE:
      NotificationManager.error("Error in adding Note");
      return {
        ...state,
        leadToView: { ...state.leadToView, sectionLoading: false }
      };

    /**
     * Transfer
     */
    case types.TRANSFER_LEAD:
      return { ...state, leadToView: { ...state.leadToView, loading: true } };
    case types.TRANSFER_LEAD_SUCCESS:
      NotificationManager.success("Record Transferred");
      return {
        ...state,
        leadToView: {
          ...state.leadToView,
          lead: action.payload,
          loading: false
        }
      };
    case types.TRANSFER_LEAD_FAILURE:
      NotificationManager.error("Error in Transferring Record");
      return { ...state, leadToView: { ...state.leadToView, loading: false } };

    /**
     * Events
     */
    case types.ADD_LEAD_EVENT:
      var newEvent = Object.assign([], state.leadToView.lead.events);
      newEvent.push(action.payload);
      return {
        ...state,
        leadToView: {
          ...state.leadToView,
          lead: { ...state.leadToView.lead, events: newEvent }
        }
      };

    default:
      return { ...state };
  }
};
