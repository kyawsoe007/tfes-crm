import { NotificationManager } from "react-notifications";
import * as types from "./JournalTypes";

const INIT_STATE = {
  journalLists: {
    loading: false,
    data: [],
    count: 0,
  },
  journals: {
    loading: false,
    data: []
  },
  journalPartnerFiltered: {
    loading: false,
    data: [],
  },
  journalAccountFiltered: {
    loading: false,
    data: [],
  },
  journalEntry: {
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
  }
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case types.GET_JOURNAL_LIST:
      return {
        ...state,
        journalLists: {
          ...state.journalLists,
          loading: true
        },
      };
    case types.GET_JOURNAL_LIST_SUCCESS:
      return {
        ...state,
        journalLists: {
          data: action.payload[0],
          count: action.payload[1],
          loading: false
        },
      };
    case types.GET_JOURNAL_LIST_FAILURE:
      NotificationManager.warning("Failed to get Journal List");
      return {
        ...state,
        journalLists: {
          ...state.journalLists,
          loading: false
        },
      };

    case types.DELETE_JOURNAL_ENTRY:
      return {
        ...state,
        journalLists: {
          ...state.journalLists,
          loading: true
        },
      };
    case types.DELETE_JOURNAL_ENTRY_SUCCESS:
      NotificationManager.success("deleted entry successfully!");
      const deletedList = state.journalLists.data.filter(entry => entry._id !== action.payload._id);
      return {
        ...state,
        journalLists: {
          ...state.journalLists,
          data: deletedList,
          loading: false
        },
      };
    case types.DELETE_JOURNAL_ENTRY_FAILURE:
      NotificationManager.warning("Failed to delete entry");
      return {
        ...state,
        journalLists: {
          ...state.journalLists,
          loading: false
        },
      };

    case types.GET_SINGLE_JOURNAL_ENTRY:
      return {
        ...state,
        journalEntry: {
          loading: true,
          data: {}
        },
      };
    case types.GET_SINGLE_JOURNAL_ENTRY_SUCCESS:
      return {
        ...state,
        journalEntry: {
          data: action.payload,
          loading: false
        },
      };
    case types.GET_SINGLE_JOURNAL_ENTRY_FAILURE:
      NotificationManager.warning("Failed to get Journal Entry!");
      return {
        ...state,
        journalEntry: {
          data: {},
          loading: false
        },
      };

    case types.GET_JOURNALS:
      return {
        ...state,
        journals: {
          ...state.journals,
          loading: true
        },
        journalEntry: {
          ...state.journalEntry,
          data: {}
        }
      };
    case types.GET_JOURNALS_SUCCESS:
      return {
        ...state,
        journals: {
          ...state.journals,
          data: action.payload,
          loading: false
        },
      };
    case types.GET_JOURNALS_FAILURE:
      NotificationManager.warning("Failed to get Journals");
      return {
        ...state,
        journals: {
          ...state.journals,
          loading: false
        },
      };

    case types.CREATE_JOURNAL_ENTRY:
      return {
        ...state,
        journalEntry: {
          loading: true,
          data: {}
        },
      };
    case types.CREATE_JOURNAL_ENTRY_SUCCESS:
      return {
        ...state,
        journalEntry: {
          data: action.payload,
          loading: false
        },
      };
    case types.CREATE_JOURNAL_ENTRY_FAILURE:
      NotificationManager.warning("Failed to create Journal Entry!");
      return {
        ...state,
        journalEntry: {
          data: {},
          loading: false
        },
      };

    case types.UPDATE_JOURNAL_ENTRY:
      return {
        ...state,
        journalEntry: {
          loading: true,
          data: {}
        },
      };
    case types.UPDATE_JOURNAL_ENTRY_SUCCESS:
      NotificationManager.success("updated Entry successfully!");
      return {
        ...state,
        journalEntry: {
          data: action.payload,
          loading: false
        },
      };
    case types.UPDATE_JOURNAL_ENTRY_FAILURE:
      NotificationManager.warning("Failed to update Journal Entry!");
      return {
        ...state,
        journalEntry: {
          data: {},
          loading: false
        },
      };

      case types.GET_FILTER_PARTNER_JOURNAL:
        return {
          ...state,
          journalPartnerFiltered: {
            ...state.journalPartnerFiltered,
            loading: true
          },
        };
      case types.GET_FILTER_PARTNER_JOURNAL_SUCCESS:
  
        return {
          ...state,
          journalPartnerFiltered: {
            loading: false,
            data: action.payload[0],
            count: action.payload[1],
          },
        };
      case types.GET_FILTER_PARTNER_JOURNAL_FAILURE:
        NotificationManager.warning("Failed to get Partners");
        return {
          ...state,
          journalPartnerFiltered: {
            ...state.journalPartnerFiltered,
            loading: false
          },
        };

    case types.GET_FILTER_ACCOUNT_JOURNAL:
      return {
        ...state,
        journalAccountFiltered: {
          ...state.journalAccountFiltered,
          loading: true
        },
      };
    case types.GET_FILTER_ACCOUNT_JOURNAL_SUCCESS:
      return {
        ...state,
        journalAccountFiltered: {
          ...state.journalAccountFiltered,
          data: action.payload,
          loading: false
        },
      };
    case types.GET_FILTER_ACCOUNT_JOURNAL_FAILURE:
      NotificationManager.warning("Failed to get Partners");
      return {
        ...state,
        journalAccountFiltered: {
          ...state.journalAccountFiltered,
          loading: false
        },
      };

      case types.GET_SAVED_JOURNAL_QUERY:
        return {
          ...state,
          SavedQuery: {
            ...state.SavedQuery,
            ...action.payload
          }
        }
  
      case types.GET_SAVED_JOURNAL_QUERY_SUCCESS:
        return {
          ...state,
          SavedQuery: {
            ...state.SavedQuery,
            ...action.payload
          }
        }
  
      case types.GET_SAVED_JOURNAL_QUERY_FAILURE:
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
