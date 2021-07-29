import * as types from './creditLimitTypes';
import { NotificationManager } from 'react-notifications'


const INIT_STATE = {

    creditLimitsAll: {
        loading: false,
        data: []
    },

    creditLimit: {
        loading: false,
        data: {}
    },

    postCreditLimitBody: {
        loading: false,
        data: {}
    },

    patchCreditLimitBody: {
        loading: false,
        data: {}
    },

    deleteCreditLimitBody: {
        loading: false,
        data: {}
    }
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        //GET all credit limits 
        case types.GET_ALL_CREDIT_LIMITS:
            return {
                ...state,
                creditLimitsAll: {
                    ...state.creditLimitsAll,
                    loading: true,
                }
            }

        case types.GET_ALL_CREDIT_LIMITS_SUCCESS:
            // console.log("HUHUHUHUHUHUHUHU", { data })
            return {
                ...state,
                creditLimitsAll: {
                    ...state.creditLimitsAll,
                    loading: false,                
                    data: action.payload
                }
            }

        case types.GET_ALL_CREDIT_LIMITS_FAILURE:
            return {
                ...state,
                creditLimitsAll: {
                    ...state.creditLimitsAll,
                    loading: false,                
                }
            }

        //GET one credit limit 
        case types.GET_CREDIT_LIMIT: 
            return {
                ...state,
                creditLimit: {
                    ...state.creditLimit,
                    loading: true,
                    data: action.payload
                }
            }
        
        case types.GET_CREDIT_LIMIT_SUCCESS:
            return {
                ...state,
                creditLimit: {
                    ...state.creditLimit,
                    loading: false,
                    data: action.payload
                }
            } 

        case types.GET_CREDIT_LIMIT_FAILURE:
            return {
                ...state,
                creditLimit: {
                    ...state.creditLimit,
                    loading: false,
                    data: action.payload
                }
            }

        // POST credit limit 
        case types.POST_CREDIT_LIMIT:
        case types.PATCH_CREDIT_LIMIT:
        case types.DELETE_CREDIT_LIMIT:
            return {
                ...state,
            }

        case types.POST_CREDIT_LIMIT_SUCCESS:
            NotificationManager.success("credit limit succesfully created")
            let data = [...state.creditLimitsAll.data];
            data.push(action.payload);
            return {
                ...state,
                creditLimitsAll: {
                    loading: false,
                    data: data
                }
            }

        case types.POST_CREDIT_LIMIT_FAILURE:
            NotificationManager.error("error in creating credit limit")
            return {
                ...state                
            }


        
        case types.PATCH_CREDIT_LIMIT_SUCCESS:
            NotificationManager.success("successfully edited credit limit")
            data = state.creditLimitsAll.data.map(item => item.id === action.payload.id ? action.payload : item);
            return {
                ...state,
                creditLimitsAll: {
                    loading: false,
                    data: data
                }
            }

        case types.PATCH_CREDIT_LIMIT_FAILURE:
            NotificationManager.error("error in editing credit limit")
            return {
                ...state               
            }


        case types.DELETE_CREDIT_LIMIT_SUCCESS:
            NotificationManager.success("credit limit deleted!")
            data = state.creditLimitsAll.data.filter(item => item.id !== action.payload.id);
            return {
                ...state,
                creditLimitsAll: {
                    loading: false,
                    data: data
                }
            }

        case types.DELETE_CREDIT_LIMIT_FAILURE:
            NotificationManager.error("error in deleting credit limit")
            return {
                ...state                
            }

        default:
            return { ...state }
    }
}