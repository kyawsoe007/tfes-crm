import * as types from './incoTermTypes';
import { NotificationManager } from 'react-notifications'


const INIT_STATE = {

    incoTermsAll: {
        loading: false,
        data: []
    },

    incoTerm: {
        loading: false,
        data: {}
    },

    postIncoTermBody: {
        loading: false,
        data: {}
    },

    patchIncoTermBody: {
        loading: false,
        data: {}
    },

    deleteIncoTermBody: {
        loading: false,
        data: {}
    }
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        //GET all inco terms 
        case types.GET_ALL_INCO_TERMS:
            // console.log ("JIJIJIJIJIJIJIJIJIJI")
            return {
                ...state,
                incoTermsAll: {
                    ...state.incoTermsAll,
                    loading: true,
                }
            }

        case types.GET_ALL_INCO_TERMS_SUCCESS:
            // console.log("HUHUHUHUHUHUHUHU", { data })
            return {
                ...state,
                incoTermsAll: {
                    ...state.incoTermsAll,
                    loading: false,                
                    data: action.payload
                }
            }

        case types.GET_ALL_INCO_TERMS_FAILURE:
            return {
                ...state
            }

        //GET one inco term 
        case types.GET_INCO_TERM:
        case types.POST_INCO_TERM:
        case types.PATCH_INCO_TERM:
        case types.DELETE_INCO_TERM: 
            return {
                ...state
            }
        
        case types.GET_INCO_TERM_SUCCESS:
            return {
                ...state,
                incoTerm: {
                    ...state.incoTerm,
                    loading: false,
                    data: action.payload
                }
            } 

        case types.GET_INCO_TERM_FAILURE:
            return {
                ...state,
                incoTerm: {
                    ...state.incoTerm,
                    loading: false,
                    data: action.payload
                }
            }



        case types.POST_INCO_TERM_SUCCESS:
            NotificationManager.success("inco term succesfully created")
            let data = [...state.incoTermsAll.data];
            data.push(action.payload);
            return {
                ...state,
                incoTermsAll: {
                    loading: false,
                    data: data
                }
            }

        case types.POST_INCO_TERM_FAILURE:
            NotificationManager.error("error in creating inco term")
            return {
                ...state,
            }

        
        case types.PATCH_INCO_TERM_SUCCESS:
            NotificationManager.success("successfully edited inco term")
            data = state.incoTermsAll.data.map(item => item.id == action.payload.id ? action.payload : item)
            return {
                ...state,
                incoTermsAll: {
                    loading: false,
                    data: data
                }
            }

        case types.PATCH_INCO_TERM_FAILURE:
            NotificationManager.error("error in editing inco term")
            return {
                ...state               
            }

        case types.DELETE_INCO_TERM_SUCCESS:
            NotificationManager.success("inco term deleted!")            
            data = state.incoTermsAll.data.filter(item => item.id !== action.payload.id)
            return {
                ...state,
                incoTermsAll: {
                    loading: false,
                    data: data
                }
            }

        case types.DELETE_INCO_TERM_FAILURE:
            NotificationManager.error("error in deleting inco term")
            return {
                ...state,                
            }

        default:
            return { ...state }
    }
}