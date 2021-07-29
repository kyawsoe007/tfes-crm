import * as types from './payment-methodTypes';
import { NotificationManager } from 'react-notifications'


const INIT_STATE = {

    paymentMethodsAll: {
        loading: false,
        data: []
    },

    paymentMethod: {
        loading: false,
        data: {}
    }
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        //GET all Payment Methods 
        case types.GET_ALL_PAYMENT_METHODS:
            // console.log ("JIJIJIJIJIJIJIJIJIJI")
            return {
                ...state,
                paymentMethodsAll: {
                    ...state.paymentMethodsAll,
                    loading: true
                }
            }

        case types.GET_ALL_PAYMENT_METHODS_SUCCESS:
            // console.log("HUHUHUHUHUHUHUHU", { data })
            return {
                ...state,
                paymentMethodsAll: {
                    ...state.paymentMethodsAll,
                    loading: false,                
                    data: action.payload
                }
            }

        case types.GET_ALL_PAYMENT_METHODS_FAILURE:
            return {
                ...state,
                paymentMethodsAll: {
                    ...state.paymentMethodsAll,
                    loading: false
                }
            }

        //GET one Payment Method 
        case types.GET_PAYMENT_METHOD: 
            return {
                ...state,
                paymentMethod: {
                    ...state.paymentMethod,
                    loading: true
                }
            }
        
        case types.GET_PAYMENT_METHOD_SUCCESS:
            return {
                ...state,
                paymentMethod: {
                    ...state.paymentMethod,
                    loading: false,
                    data: action.payload
                }
            } 

        case types.GET_PAYMENT_METHOD_FAILURE:
            return {
                ...state,
                paymentMethod: {
                    ...state.paymentMethod,
                    loading: false,
                    data: action.payload
                }
            }

        // POST Payment Method 
        case types.POST_PAYMENT_METHOD:
        case types.PATCH_PAYMENT_METHOD:
        case types.DELETE_PAYMENT_METHOD:
            return {
                ...state,
                
            }

        case types.POST_PAYMENT_METHOD_SUCCESS:
            NotificationManager.success("Payment Method succesfully created")
            //insert Method into table
            let data = [...state.paymentMethodsAll.data];
            data.push(action.payload);
            return {
                ...state,
                paymentMethodsAll: {
                    loading:false,
                    data: data
                }
            }

        case types.POST_PAYMENT_METHOD_FAILURE:
            NotificationManager.error("error in creating Payment Method")
            return {
                ...state,                
            }


        case types.PATCH_PAYMENT_METHOD_SUCCESS:
            NotificationManager.success("successfully edited Payment Method")
            data = state.paymentMethodsAll.data.map(item => item._id === action.payload._id ? action.payload : item);
            console.log(action.payload);
            return {
                ...state,
                paymentMethodsAll: {
                    loading: false,
                    data: data
                }
            }

        case types.PATCH_PAYMENT_METHOD_FAILURE:
            NotificationManager.error("error in editing Payment Method")
            return {
                ...state
            }


        case types.DELETE_PAYMENT_METHOD_SUCCESS:
            NotificationManager.success("Payment Method deleted!")
            data = state.paymentMethodsAll.data.filter(item => item._id !== action.payload._id);

            return {
                ...state,
                paymentMethodsAll: {
                    loading: false,
                    data: data
                }
            }

        case types.DELETE_PAYMENT_METHOD_FAILURE:
            NotificationManager.error("error in deleting Payment Method")
            return {
                ...state
            }

        default:
            return { ...state }
    }
}