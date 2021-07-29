import * as types from './account-journalTypes';
import { NotificationManager } from 'react-notifications'


const INIT_STATE = {

    accountJournalsAll: {
        loading: false,
        data: []
    },

    accountJournal: {
        loading: false,
        data: {}
    },

    postaccountJournalBody: {
        loading: false,
        data: {}
    },

    patchaccountJournalBody: {
        loading: false,
        data: {}
    },

    deleteaccountJournalBody: {
        loading: false,
        data: {}
    }
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        //GET all account journals 
        case types.GET_ALL_ACCOUNT_JOURNALS:
            return {
                ...state,
                accountJournalsAll: {
                    ...state.accountJournalsAll,
                    loading: true,
                }
            }

        case types.GET_ALL_ACCOUNT_JOURNALS_SUCCESS:
            // console.log("HUHUHUHUHUHUHUHU", { data })
            return {
                ...state,
                accountJournalsAll: {
                    ...state.accountJournalsAll,
                    loading: false,                
                    data: action.payload
                }
            }

        case types.GET_ALL_ACCOUNT_JOURNALS_FAILURE:
            return {
                ...state,
                accountJournalsAll: {
                    ...state.accountJournalsAll,
                    loading: false,                
                }
            }

        //GET one account journal 
        case types.GET_ACCOUNT_JOURNAL: 
            return {
                ...state,
                accountJournal: {
                    ...state.accountJournal,
                    loading: true,
                    data: action.payload
                }
            }
        
        case types.GET_ACCOUNT_JOURNAL_SUCCESS:
            return {
                ...state,
                accountJournal: {
                    ...state.accountJournal,
                    loading: false,
                    data: action.payload
                }
            } 

        case types.GET_ACCOUNT_JOURNAL_FAILURE:
            return {
                ...state,
                accountJournal: {
                    ...state.accountJournal,
                    loading: false,
                    data: action.payload
                }
            }

        // POST account journal 
        case types.POST_ACCOUNT_JOURNAL:
        case types.PATCH_ACCOUNT_JOURNAL:
        case types.DELETE_ACCOUNT_JOURNAL:
            return {
                ...state,
            }

        case types.POST_ACCOUNT_JOURNAL_SUCCESS:
            NotificationManager.success("account journal succesfully created")
            let data = [...state.accountJournalsAll.data];
            data.push(action.payload);
            return {
                ...state,
                accountJournalsAll: {
                    loading: false,
                    data: data
                }
            }

        case types.POST_ACCOUNT_JOURNAL_FAILURE:
            NotificationManager.error("error in creating account journal")
            return {
                ...state                
            }


        
        case types.PATCH_ACCOUNT_JOURNAL_SUCCESS:
            NotificationManager.success("successfully edited account journal")
            data = state.accountJournalsAll.data.map(item => item._id === action.payload._id ? action.payload : item);
            return {
                ...state,
                accountJournalsAll: {
                    loading: false,
                    data: data
                }
            }

        case types.PATCH_ACCOUNT_JOURNAL_FAILURE:
            NotificationManager.error("error in editing account journal")
            return {
                ...state               
            }


        case types.DELETE_ACCOUNT_JOURNAL_SUCCESS:
            NotificationManager.success("account journal deleted!")
            data = state.accountJournalsAll.data.filter(item => item._id !== action.payload._id);
            return {
                ...state,
                accountJournalsAll: {
                    loading: false,
                    data: data
                }
            }

        case types.DELETE_ACCOUNT_JOURNAL_FAILURE:
            NotificationManager.error("error in deleting account journal")
            return {
                ...state                
            }

        default:
            return { ...state }
    }
}