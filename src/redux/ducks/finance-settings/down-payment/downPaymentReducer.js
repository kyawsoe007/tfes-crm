import * as types from './downPaymentTypes';
import { NotificationManager } from 'react-notifications'


const INIT_STATE = {

    downPaymentsAll: {
        loading: false,
        data: []
    },

    downPayment: {
        loading: false,
        data: {}
    },

    postDownPaymentBody: {
        loading: false,
        data: {}
    },

    patchDownPaymentBody: {
        loading: false,
        data: {}
    },

    deleteDownPaymentBody: {
        loading: false,
        data: {}
    }
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        //GET all DOWN PAYMENTs 
        case types.GET_ALL_DOWN_PAYMENTS:
            // console.log ("JIJIJIJIJIJIJIJIJIJI")
            return {
                ...state,
                downPaymentsAll: {
                    ...state.downPaymentsAll,
                    loading: true,
                }
            }

        case types.GET_ALL_DOWN_PAYMENTS_SUCCESS:
            // console.log("HUHUHUHUHUHUHUHU", { data })
            return {
                ...state,
                downPaymentsAll: {
                    ...state.downPaymentsAll,
                    loading: false,                
                    data: action.payload
                }
            }

        case types.GET_ALL_DOWN_PAYMENTS_FAILURE:
            return {
                ...state,
                downPaymentsAll: {
                    ...state.downPaymentsAll,
                    loading: false,                
                }
            }

        //GET one DOWN PAYMENT 
        case types.GET_DOWN_PAYMENT: 
            return {
                ...state,
                downPayment: {
                    ...state.downPayment,
                    loading: true,
                    data: action.payload
                }
            }
        
        case types.GET_DOWN_PAYMENT_SUCCESS:
            return {
                ...state,
                downPayment: {
                    ...state.downPayment,
                    loading: false,
                    data: action.payload
                }
            } 

        case types.GET_DOWN_PAYMENT_FAILURE:
            return {
                ...state,
                downPayment: {
                    ...state.downPayment,
                    loading: false,
                    data: action.payload
                }
            }

        // POST DOWN PAYMENT 
        case types.POST_DOWN_PAYMENT:
        case types.PATCH_DOWN_PAYMENT:
        case types.DELETE_DOWN_PAYMENT:
            return {
                ...state,
            }

        case types.POST_DOWN_PAYMENT_SUCCESS:
            NotificationManager.success("DOWN PAYMENT succesfully created")
            let data = [...state.downPaymentsAll.data];
            data.push(action.payload);
            return {
                ...state,
                downPaymentsAll: {                   
                    loading: false,
                    data: data
                }
            }

        case types.POST_DOWN_PAYMENT_FAILURE:
            NotificationManager.error("error in creating DOWN PAYMENT")
            return {
                ...state,
            }

        
        case types.PATCH_DOWN_PAYMENT_SUCCESS:
            NotificationManager.success("successfully edited DOWN PAYMENT")
            data = state.downPaymentsAll.data.map(item => item.id === action.payload.id ? action.payload : item);
            return {
                ...state,
                downPaymentsAll: {                   
                    loading: false,
                    data: data
                }
            }

        case types.PATCH_DOWN_PAYMENT_FAILURE:
            NotificationManager.error("error in editing DOWN PAYMENT")
            return {
                ...state,
            }

       

        case types.DELETE_DOWN_PAYMENT_SUCCESS:
            NotificationManager.success("DOWN PAYMENT deleted!")
            data = state.downPaymentsAll.data.filter(item => item.id !== action.payload.id);
            return {
                ...state,
                downPaymentsAll: {                   
                    loading: false,
                    data: data
                }
            }

        case types.DELETE_DOWN_PAYMENT_FAILURE:
            NotificationManager.error("error in deleting DOWN PAYMENT")
            return {
                ...state,
            }

        default:
            return { ...state }
    }
}