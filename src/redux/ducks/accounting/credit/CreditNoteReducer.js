import { NotificationManager } from "react-notifications";
import * as Types from "./CreditNoteTypes";


const INIT_STATE = {
  creditNoteList: {  
    action: false,
    loading: false,
    tableData: []
  },
  creditNoteToView: { 
    loading: false, 
    creditNote: null,
    creditReconcile: null
  }
};



export default (state = INIT_STATE, action) => {
  switch (action.type) {

   
    case Types.GET_ALL_CREDIT_NOTE:
      return {
        ...state,
        creditNoteList: {
          ...state.creditNoteList,
          loading: true
        }
      };

    case Types.GET_ALL_CREDIT_NOTE_SUCCESS:
      return {
        ...state,
        creditNoteList: {
          ...state.creditNoteList,
          loading: false,
          tableData: action.payload
        }
      };

    case Types.GET_ALL_CREDIT_NOTE_FAILTURE:
      return {
        ...state,
        creditNoteList: {
          ...state.creditNoteList,
          tableData: [],
          loading: false
        }
      };


    // View Single Credit Note
    case Types.POST_SINGLE_CREDIT_NOTE:
      return {
        ...state,
        creditNoteList: { 
          ...state.creditNoteList, 
          loading: true
        }
      };
    case Types.POST_SINGLE_CREDIT_NOTE_SUCCESS:

      setTimeout(() =>{
        window.history.back()
      }, 250)

      return {
        ...state,
        creditNoteList: {
          ...state.creditNoteList,
          loading: false,
        }
      };
    case Types.POST_SINGLE_CREDIT_NOTE_FAILURE:
      return {
        ...state,
        creditNoteList: {
          ...state.creditNoteList,
          loading: false,
        }
      };


      
    // View Single Credit Note
    case Types.GET_SINGLE_CREDIT_NOTE:
      return {
        ...state,
        creditNoteToView: { ...state.creditNoteToView, loading: true }
      };
    case Types.GET_SINGLE_CREDIT_NOTE_SUCCESS:
    
      return {
        ...state,
        creditNoteToView: {
          ...state.creditNoteToView,
          loading: false,
          creditNote: action.payload.creditNote,
          creditReconcile : action.payload.reconcileSource
        }
      };
    case Types.GET_SINGLE_CREDIT_NOTE_FAILURE:
      return {
        ...state,
        creditNoteToView: {
          ...state.creditNoteToView,
          loading: false,
        }
      };

      

    // Convert Credit Note
    case Types.CONVERT_SINGLE_CREDIT_NOTE:
      return {
        ...state,
        creditNoteToView: { ...state.creditNoteToView, loading: true }
      };
    case Types.CONVERT_SINGLE_CREDIT_NOTE_SUCCESS:
      
      return {
        ...state,
        creditNoteToView: {
          ...state.creditNoteToView,
          loading: false,
          creditNote: action.payload.creditNoteObject,
          creditReconcile: action.payload.AccountReconcileSource
        }
      };
    case Types.CONVERT_SINGLE_CREDIT_NOTE_FAILURE:
      return {
        ...state,
        creditNoteToView: {
          ...state.creditNoteToView,
          loading: false,
        }
      };



    default:
      return { ...state };
  }
};
