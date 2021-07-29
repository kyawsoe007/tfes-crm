import * as types from './creditTermTypes';
import { NotificationManager } from 'react-notifications'


const INIT_STATE = {

    creditTermsAll: {
        loading: false,
        data: []
    },

    creditTerm: {
        loading: false,
        data: {}
    },

    postCreditTermBody: {
        loading: false,
        data: {}
    },

    patchCreditTermBody: {
        loading: false,
        data: {}
    },

    deleteCreditTermBody: {
        loading: false,
        data: {}
    }
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        //GET all credit terms 
        case types.GET_ALL_CREDIT_TERMS:
            // console.log ("JIJIJIJIJIJIJIJIJIJI")
            return {
                ...state,
                creditTermsAll: {
                    ...state.creditTermsAll,
                    loading: true,
                }
            }

        case types.GET_ALL_CREDIT_TERMS_SUCCESS:
            // console.log("HUHUHUHUHUHUHUHU", { data })
            return {
                ...state,
                creditTermsAll: {
                    ...state.creditTermsAll,
                    loading: false,                
                    data: action.payload
                }
            }

        case types.GET_ALL_CREDIT_TERMS_FAILURE:
            console.log(action.payload);
            return {
                ...state,
                creditTermsAll: {
                    ...state.creditTermsAll,
                    loading: false,                                   
                }
            }

        //GET one credit term 
        case types.GET_CREDIT_TERM: 
            return {
                ...state,
                creditTerm: {
                    ...state.creditTerm,
                    loading: true,
                    data: action.payload
                }
            }
        
        case types.GET_CREDIT_TERM_SUCCESS:
            return {
                ...state,
                creditTerm: {
                    ...state.creditTerm,
                    loading: false,
                    data: action.payload
                }
            } 

        case types.GET_CREDIT_TERM_FAILURE:
            return {
                ...state,
                creditTerm: {
                    ...state.creditTerm,
                    loading: false,
                    data: action.payload
                }
            }

        // POST credit term 
        case types.POST_CREDIT_TERM:
        case types.PATCH_CREDIT_TERM:
        case types.DELETE_CREDIT_TERM:
            return {
                ...state,               
            }

        case types.POST_CREDIT_TERM_SUCCESS:
            NotificationManager.success("credit term succesfully created")
            let data = [...state.creditTermsAll.data];
            data.push(action.payload);
            return {
                ...state,
                creditTermsAll: {
                    loading: false,
                    data: data
                }
            }

        case types.POST_CREDIT_TERM_FAILURE:
            NotificationManager.error("error in creating credit term")
            return {
                ...state,                
            }

        case types.PATCH_CREDIT_TERM_SUCCESS:
            NotificationManager.success("successfully edited credit term")
            data = state.creditTermsAll.data.map(item => item.id === action.payload.id ? action.payload : item);
            return {
                ...state,
                creditTermsAll: {
                    loading: false,
                    data: data
                }
            }

        case types.PATCH_CREDIT_TERM_FAILURE:
            NotificationManager.error("error in editing credit term")
            return {
                ...state                
            }


        case types.DELETE_CREDIT_TERM_SUCCESS:
            NotificationManager.success("credit term deleted!")
            data = state.creditTermsAll.data.filter(item => item.id !== action.payload.id);
            return {
                ...state,
                creditTermsAll: {
                    loading: false,
                    data: data
                }
            }

        case types.DELETE_CREDIT_TERM_FAILURE:
            NotificationManager.error("error in deleting credit term")
            return {
                ...state                
            }

        default:
            return { ...state }
    }
}