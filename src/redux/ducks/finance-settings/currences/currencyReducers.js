import * as types from './currencyTypes';
import { NotificationManager } from 'react-notifications'


const INIT_STATE = {

    currencesAll: {
        loading: false,
        data: []
    },

    currency: {
        loading: false,
        data: {}
    },

    postPaymentTermBody: {
        loading: false,
        data: {}
    },

    patchPaymentTermBody: {
        loading: false,
        data: {}
    },

    deletePaymentTermBody: {
        loading: false,
        data: {}
    }
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        //GET all Currencys 
        case types.GET_ALL_CURRENCES:
            // console.log ("JIJIJIJIJIJIJIJIJIJI")
            return {
                ...state,
                currencesAll: {
                    ...state.currencesAll,
                    loading: true
                }
            }

        case types.GET_ALL_CURRENCES_SUCCESS:
            // console.log("HUHUHUHUHUHUHUHU", { data })
            return {
                ...state,
                currencesAll: {
                    ...state.currencesAll,
                    loading: false,                
                    data: action.payload
                }
            }

        case types.GET_ALL_CURRENCES_FAILURE:
            return {
                ...state,
                currencesAll: {
                    ...state.currencesAll,
                    loading: false
                }
            }

        //GET one Currency 
        case types.GET_CURRENCY: 
            return {
                ...state,
                currency: {
                    ...state.currency,
                    loading: true
                }
            }
        
        case types.GET_CURRENCY_SUCCESS:
            return {
                ...state,
                currency: {
                    ...state.currency,
                    loading: false,
                    data: action.payload
                }
            } 

        case types.GET_CURRENCY_FAILURE:
            return {
                ...state,
                currency: {
                    ...state.currency,
                    loading: false,
                }
            }

        // POST Currency 
        case types.POST_CURRENCY: 
        case types.PATCH_CURRENCY:
        case types.DELETE_CURRENCY:
            return {
                ...state,
                
            }

        case types.POST_CURRENCY_SUCCESS:
            NotificationManager.success("Currency succesfully created")
            //insert term into table
            let data = [...state.currencesAll.data];
            data.push(action.payload);
            return {
                ...state,
                currencesAll: {
                    loading:false,
                    data: data
                }
            }

        case types.POST_CURRENCY_FAILURE:
            NotificationManager.error("error in creating Currency")
            return {
                ...state,                
            }
           

        case types.PATCH_CURRENCY_SUCCESS:
            NotificationManager.success("successfully edited Currency")
            data = state.currencesAll.data.map(item => item.id === action.payload.id ? action.payload : item);
            console.log(action.payload);
            return {
                ...state,
                currencesAll: {
                    loading: false,
                    data: data
                }
            }

        case types.PATCH_CURRENCY_FAILURE:
            NotificationManager.error("error in editing Currency")
            return {
                ...state
            }


        case types.DELETE_CURRENCY_SUCCESS:
            NotificationManager.success("Currency deleted!")
            data = state.currencesAll.data.filter(item => item.id !== action.payload.id);

            return {
                ...state,
                currencesAll: {
                    loading: false,
                    data: data
                }
            }

        case types.DELETE_CURRENCY_FAILURE:
            NotificationManager.error("error in deleting Currency")
            return {
                ...state
            }

        default:
            return { ...state }
    }
}