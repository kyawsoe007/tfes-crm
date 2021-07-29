import * as types from './paymentTypes';
import { NotificationManager } from 'react-notifications'


const INIT_STATE = {

    paymentTermsAll: {
        loading: false,
        data: []
    },

    paymentTerm: {
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
        //GET all Payment Terms 
        case types.GET_ALL_PAYMENT_TERMS:
            // console.log ("JIJIJIJIJIJIJIJIJIJI")
            return {
                ...state,
                paymentTermsAll: {
                    ...state.paymentTermsAll,
                    loading: true
                }
            }

        case types.GET_ALL_PAYMENT_TERMS_SUCCESS:
            // console.log("HUHUHUHUHUHUHUHU", { data })
            return {
                ...state,
                paymentTermsAll: {
                    ...state.paymentTermsAll,
                    loading: false,                
                    data: action.payload
                }
            }

        case types.GET_ALL_PAYMENT_TERMS_FAILURE:
            return {
                ...state,
                paymentTermsAll: {
                    ...state.paymentTermsAll,
                    loading: false
                }
            }

        //GET one Payment Term 
        case types.GET_PAYMENT_TERM: 
            return {
                ...state,
                paymentTerm: {
                    ...state.paymentTerm,
                    loading: true
                }
            }
        
        case types.GET_PAYMENT_TERM_SUCCESS:
            return {
                ...state,
                paymentTerm: {
                    ...state.paymentTerm,
                    loading: false,
                    data: action.payload
                }
            } 

        case types.GET_PAYMENT_TERM_FAILURE:
            return {
                ...state,
                paymentTerm: {
                    ...state.paymentTerm,
                    loading: false,
                    data: action.payload
                }
            }

        // POST Payment Term 
        case types.POST_PAYMENT_TERM:
        case types.PATCH_PAYMENT_TERM:
        case types.DELETE_PAYMENT_TERM:
            return {
                ...state,
                
            }

        case types.POST_PAYMENT_TERM_SUCCESS:
            NotificationManager.success("Payment Term succesfully created")
            //insert term into table
            let data = [...state.paymentTermsAll.data];
            data.push(action.payload);
            return {
                ...state,
                paymentTermsAll: {
                    loading:false,
                    data: data
                }
            }

        case types.POST_PAYMENT_TERM_FAILURE:
            NotificationManager.error("error in creating Payment Term")
            return {
                ...state,                
            }


        case types.PATCH_PAYMENT_TERM_SUCCESS:
            NotificationManager.success("successfully edited Payment Term")
            data = state.paymentTermsAll.data.map(item => item.id === action.payload.id ? action.payload : item);
            console.log(action.payload);
            return {
                ...state,
                paymentTermsAll: {
                    loading: false,
                    data: data
                }
            }

        case types.PATCH_PAYMENT_TERM_FAILURE:
            NotificationManager.error("error in editing Payment Term")
            return {
                ...state
            }


        case types.DELETE_PAYMENT_TERM_SUCCESS:
            NotificationManager.success("Payment Term deleted!")
            data = state.paymentTermsAll.data.filter(item => item.id !== action.payload.id);

            return {
                ...state,
                paymentTermsAll: {
                    loading: false,
                    data: data
                }
            }

        case types.DELETE_PAYMENT_TERM_FAILURE:
            NotificationManager.error("error in deleting Payment Term")
            return {
                ...state
            }

        default:
            return { ...state }
    }
}