import * as types from "./DebitNoteTypes";
import { NotificationManager } from "react-notifications";

const INIT_STATE = {
  DebitNotes: {
    loading: false,
    data: [],
  },
  DebitNoteDetails: {
    loading: false,
    data: [],
  },
  DebitNoteFiltered: {
    loading: false,
    data: [],
    count: 0,
  },
  DebitNoteProduct: {
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
    case types.GET_DEBIT_NOTE:
      return {
        ...state,
        DebitNotes: {
          ...state.DebitNotes,
          loading: true,
        },
      };

    case types.GET_DEBIT_NOTE_SUCCESS:
      return {
        ...state,
        DebitNotes: {
          loading: false,
          data: action.payload,
        },
      };

    case types.GET_DEBIT_NOTE_FAILURE:
      NotificationManager.warning("Error in fetching DebitNotes");
      NotificationManager.warning("Over here");
      return {
        ...state,
        DebitNotes: {
          loading: false,
          data: { ...state.DebitNotes },
        },
      };

    case types.SET_DEBIT_NOTE:
      return {
        ...state,
        DebitNoteProduct: {
          loading: true,
          ...state.DebitNoteProduct,
        },
      };

    case types.SET_DEBIT_NOTE_SUCCESS:
      NotificationManager.success("Success in Creating DebitNote");
      return {
        ...state,
        DebitNoteProduct: {
          ...state.DebitNoteProduct,
          loading: false,
          data: action.payload
        },
      };

    case types.SET_DEBIT_NOTE_FAILURE:
      NotificationManager.warning("Error in Creating DebitNote");
      return {
        ...state,
        DebitNoteProduct: {
          ...state.DebitNoteProduct,
          loading: false,
        },
      };


    case types.GET_SINGLE_DEBIT_NOTE_REQUEST:
      return {
        ...state,
        DebitNoteProduct: {
          ...state.DebitNoteProduct,
          loading: true
        },
      };
    case types.GET_SINGLE_DEBIT_NOTE_REQUEST_SUCCESS:
      return {
        ...state,
        DebitNoteProduct: {
          loading: false,
          data: action.payload,
        },
      };
    case types.GET_SINGLE_DEBIT_NOTE_REQUEST_FAILURE:
      return {
        ...state,
        DebitNoteProduct: {
          ...state.DebitNoteProduct,
          loading: false
        },
      };

    case types.PATCH_SINGLE_DEBIT_NOTE:
      return {
        ...state,
        DebitNoteProduct: {
          ...state.DebitNoteProduct,
          loading: true
        },
      };

    case types.PATCH_SINGLE_DEBIT_NOTE_SUCCESS:
      NotificationManager.success("DebitNote Successfully Edited!");
      return {
        ...state,
        DebitNoteProduct: {
          loading: false,
          data: action.payload
        },
      };
    case types.PATCH_SINGLE_DEBIT_NOTE_FAILURE:
      NotificationManager.error("Error in Editing DebitNote Details");
      console.log(action.payload);
      return {
        ...state,
        DebitNoteProduct: {
          ...state.DebitNoteProduct,
          loading: false
        },
      };

    case types.GET_FILTER_DEBIT_NOTE:
      return {
        ...state,
        DebitNoteFiltered: {
          ...state.DebitNoteFiltered,
          loading: true,
        },
      };

    case types.GET_FILTER_DEBIT_NOTE_SUCCESS:
      return {
        ...state,
        DebitNoteFiltered: {
          loading: false,
          data: action.payload[0],
          count: action.payload[1],
        },
      };

    case types.GET_FILTER_DEBIT_NOTE_FAILURE:
      return {
        ...state,
        DebitNoteFiltered: {
          loading: false,
        },
      };

      // DELETE SALES_ORDER
    case types.DELETE_DEBIT_NOTE:
      return {
        ...state,
        DebitNoteFiltered: {
          ...state.DebitNoteFiltered,
          loading: true,
        },
      };

    case types.DELETE_DEBIT_NOTE_SUCCESS:
      NotificationManager.success("DebitNote Successfully Deleted!");
      let deletedDebitNoteFiltered = state.DebitNoteFiltered.data.filter(
          (e) => e.id !== action.payload
      );
      return {
        ...state,
        DebitNoteFiltered: {
          loading: false,
          data: deletedDebitNoteFiltered,
        },
      };

    case types.DELETE_DEBIT_NOTE_FAILURE:
      NotificationManager.error("Error in Deleting DebitNote Details");
      return {
        ...state,
        DebitNoteFiltered: {
          ...state.DebitNoteFiltered,
          loading: false,
        },
      };



    case types.GET_DEBIT_NOTE_SUCCESS:
      return {
        ...state,
        loading: false
      }

    case types.GET_DEBIT_NOTE_FAILURE:
      return {
        ...state,
        loading: false
      }

      case types.GET_SAVED_DEBIT_NOTE_QUERY:
        return {
          ...state,
          SavedQuery: {
            ...state.SavedQuery,
            ...action.payload
          }
        }
  
      case types.GET_SAVED_DEBIT_NOTE_QUERY_SUCCESS:
        return {
          ...state,
          SavedQuery: {
            ...state.SavedQuery,
            ...action.payload
          }
        }
  
      case types.GET_SAVED_DEBIT_NOTE_QUERY_FAILURE:
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
