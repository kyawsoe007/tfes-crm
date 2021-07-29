import * as types from "./CreditNotetfesTypes";
import { NotificationManager } from "react-notifications";

const INIT_STATE = {
  CreditNotes: {
    loading: false,
    data: [],
  },
  CreditNoteDetails: {
    loading: false,
    data: [],
  },
  CreditNoteFiltered: {
    loading: false,
    data: [],
    count: 0,
  },
  CreditNoteProduct: {
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
    case types.GET_CREDIT_NOTE:
      return {
        ...state,
        CreditNotes: {
          ...state.CreditNotes,
          loading: true,
        },
      };

    case types.GET_CREDIT_NOTE_SUCCESS:
      return {
        ...state,
        CreditNotes: {
          loading: false,
          data: action.payload,
        },
      };

    case types.GET_CREDIT_NOTE_FAILURE:
      NotificationManager.warning("Error in fetching CreditNotes");
      NotificationManager.warning("Over here");
      return {
        ...state,
        CreditNotes: {
          loading: false,
          data: { ...state.CreditNotes },
        },
      };

    case types.SET_CREDIT_NOTE:
      return {
        ...state,
        CreditNoteProduct: {
          loading: true,
          ...state.CreditNoteProduct,
        },
      };

    case types.SET_CREDIT_NOTE_SUCCESS:
      NotificationManager.success("Success in Creating CreditNote");
      return {
        ...state,
        CreditNoteProduct: {
          ...state.CreditNoteProduct,
          loading: false,
          data: action.payload
        },
      };

    case types.SET_CREDIT_NOTE_FAILURE:
      NotificationManager.warning("Error in Creating CreditNote");
      return {
        ...state,
        CreditNoteProduct: {
          ...state.CreditNoteProduct,
          loading: false,
        },
      };

    case types.GET_DROPDOWN_GROUP:
      return {
        ...state,
        CreditNoteDetails: {
          ...state.CreditNoteDetails,
          loading: true,
        },
      };


    case types.GET_DROPDOWN_GROUP_SUCCESS:
      return {
        ...state,
        CreditNoteDetails: {
          loading: false,
          data: action.payload,
        },
      };

    case types.GET_DROPDOWN_GROUP_FAILURE:
      NotificationManager.warning("Error in Fetching Dropdown Details");
      return {
        ...state,
        CreditNoteDetails: {
          ...state.CreditNoteDetails,
          loading: false,
        },
      };

    case types.GET_SINGLE_CREDIT_NOTE_REQUEST:
      return {
        ...state,
        CreditNoteProduct: {
          ...state.CreditNoteProduct,
          loading: true
        },
      };
    case types.GET_SINGLE_CREDIT_NOTE_REQUEST_SUCCESS:
      return {
        ...state,
        CreditNoteProduct: {
          loading: false,
          data: action.payload,
        },
      };
    case types.GET_SINGLE_CREDIT_NOTE_REQUEST_FAILURE:
      return {
        ...state,
        CreditNoteProduct: {
          ...state.CreditNoteProduct,
          loading: false
        },
      };

    case types.PATCH_SINGLE_CREDIT_NOTE:
      return {
        ...state,
        CreditNoteProduct: {
          ...state.CreditNoteProduct,
          loading: true
        },
      };

    case types.PATCH_SINGLE_CREDIT_NOTE_SUCCESS:
      NotificationManager.success("CreditNote Successfully Edited!");
     
      return {
        ...state,
        CreditNoteProduct: {
          loading: false,
          data: action.payload
        },
      };
    case types.PATCH_SINGLE_CREDIT_NOTE_FAILURE:
      NotificationManager.error("Error in Editing CreditNote Details");
      return {
        ...state,
        CreditNoteProduct: {
          ...state.CreditNoteProduct,
          loading: false
        },
      };

    case types.GET_FILTER_CREDIT_NOTE:
      return {
        ...state,
        CreditNoteFiltered: {
          ...state.CreditNoteFiltered,
          loading: true,
        },
      };

    case types.GET_FILTER_CREDIT_NOTE_SUCCESS:
      return {
        ...state,
        CreditNoteFiltered: {
          loading: false,
          data: action.payload[0],
          count: action.payload[1],
        },
      };

    case types.GET_FILTER_CREDIT_NOTE_FAILURE:
      return {
        ...state,
        CreditNoteFiltered: {
          loading: false,
        },
      };

      // DELETE SALES_ORDER
    case types.DELETE_CREDIT_NOTE:
      return {
        ...state,
        CreditNoteFiltered: {
          ...state.CreditNoteFiltered,
          loading: true,
        },
      };

    case types.DELETE_CREDIT_NOTE_SUCCESS:
      NotificationManager.success("CreditNote Successfully Deleted!");
      let deletedCreditNoteFiltered = state.CreditNoteFiltered.data.filter(
          (e) => e.id !== action.payload
      );
      return {
        ...state,
        CreditNoteFiltered: {
          loading: false,
          data: deletedCreditNoteFiltered,
        },
      };

    case types.DELETE_CREDIT_NOTE_FAILURE:
      NotificationManager.error("Error in Deleting CreditNote Details");
      return {
        ...state,
        CreditNoteFiltered: {
          ...state.CreditNoteFiltered,
          loading: false,
        },
      };

    // IAN DUPLICATE CREDIT_NOTE
    case types.SET_DUPLICATE:
      return {
        ...state,
        CreditNoteProduct: {
          ...state.CreditNoteProduct,
          loading: true,
        },
      };
    case types.SET_DUPLICATE_SUCCESS:
      // NotificationManager.success("SKU Duplicate Successfully Saved!");
      return {
        ...state,
        CreditNoteProduct: {
          loading: false,
          data: action.payload,
        },
      };
    case types.SET_DUPLICATE_FAILURE:
      return {
        ...state,
        CreditNoteProduct: {
          ...state.CreditNoteProduct,
          loading: false
        },
      };

    //CLEAR DUPLICATE
    case types.CLEAR_DUPLICATE:
      return {
        ...state,
        CreditNoteProduct: {
          data: [],
          loading: true,
        },
      };
    case types.CLEAR_DUPLICATE_SUCCESS:
      return {
        CreditNoteProduct: {
          loading: false,
          data: [],
        },
      };
    case types.CLEAR_DUPLICATE_FAILURE:
      return {
        ...state,
        CreditNoteProduct: { data: [], loading: false },
      };

    // GET PDF
    case types.GET_CREDIT_NOTE_PDF:
      return {
        ...state,
        loading: true
      }

    case types.GET_CREDIT_NOTE_SUCCESS:
      return {
        ...state,
        loading: false
      }

    case types.GET_CREDIT_NOTE_FAILURE:
      return {
        ...state,
        loading: false
      }
    
      case types.GET_SAVED_CREDIT_NOTE_QUERY:
        return {
          ...state,
          SavedQuery: {
            ...state.SavedQuery,
            ...action.payload
          }
        }
  
      case types.GET_SAVED_CREDIT_NOTE_QUERY_SUCCESS:
        return {
          ...state,
          SavedQuery: {
            ...state.SavedQuery,
            ...action.payload
          }
        }
  
      case types.GET_SAVED_CREDIT_NOTE_QUERY_FAILURE:
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
