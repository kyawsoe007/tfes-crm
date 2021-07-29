import * as types from './sale-targetTypes';
import { NotificationManager } from 'react-notifications'


const INIT_STATE = {

    saleTargetsAll: {
        loading: false,
        data: []
    },

    saleTarget: {
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
        //GET all Sale Targets 
        case types.GET_ALL_SALE_TARGETS:
            // console.log ("JIJIJIJIJIJIJIJIJIJI")
            return {
                ...state,
                saleTargetsAll: {
                    ...state.saleTargetsAll,
                    loading: true
                }
            }

        case types.GET_ALL_SALE_TARGETS_SUCCESS:
            // console.log("HUHUHUHUHUHUHUHU", { data })
            return {
                ...state,
                saleTargetsAll: {
                    ...state.saleTargetsAll,
                    loading: false,                
                    data: action.payload
                }
            }

        case types.GET_ALL_SALE_TARGETS_FAILURE:
            return {
                ...state,
                saleTargetsAll: {
                    ...state.saleTargetsAll,
                    loading: false
                }
            }

        //GET one Sale Target 
        case types.GET_SALE_TARGET: 
            return {
                ...state,
                saleTarget: {
                    ...state.saleTarget,
                    loading: true
                }
            }
        
        case types.GET_SALE_TARGET_SUCCESS:
            return {
                ...state,
                saleTarget: {
                    ...state.saleTarget,
                    loading: false,
                    data: action.payload
                }
            } 

        case types.GET_SALE_TARGET_FAILURE:
            return {
                ...state,
                saleTarget: {
                    ...state.saleTarget,
                    loading: false,
                    data: action.payload
                }
            }

            //GET All Perform 
        case types.GET_PERFORM: 
        return {
            ...state,
            saleTarget: {
                ...state.saleTarget,
                loading: true
            }
        }
    
    case types.GET_PERFORM_SUCCESS:
        return {
            ...state,
            saleTarget: {
                ...state.saleTarget,
                loading: false,
                data: action.payload
            }
        } 

    case types.GET_PERFORM_FAILURE:
        return {
            ...state,
            saleTarget: {
                ...state.saleTarget,
                loading: false,
                data: action.payload
            }
        }

        // POST Sale Target 
        case types.POST_SALE_TARGET:
        case types.PATCH_SALE_TARGET:
        case types.DELETE_SALE_TARGET:
            return {
                ...state,
                
            }

        case types.POST_SALE_TARGET_SUCCESS:
            NotificationManager.success("Sale Target succesfully created")
            //insert term into table
            let data = [...state.saleTargetsAll.data];
            data.push(action.payload);
            return {
                ...state,
                saleTargetsAll: {
                    loading:false,
                    data: data
                }
            }

        case types.POST_SALE_TARGET_FAILURE:
            NotificationManager.error("error in creating Sale Target")
            return {
                ...state,                
            }


        case types.PATCH_SALE_TARGET_SUCCESS:
            NotificationManager.success("successfully edited Sale Target")
            data = state.saleTargetsAll.data.map(item => item.id === action.payload.id ? action.payload : item);
            console.log('act',action.payload);
            return {
                ...state,
                saleTargetsAll: {
                    loading: false,
                    data: data
                }
            }

        case types.PATCH_SALE_TARGET_FAILURE:
            NotificationManager.error("error in editing Sale Target")
            return {
                ...state
            }


        case types.DELETE_SALE_TARGET_SUCCESS:
            NotificationManager.success("Sale Target deleted!")
            data = state.saleTargetsAll.data.filter(item => item.id !== action.payload.id);

            return {
                ...state,
                saleTargetsAll: {
                    loading: false,
                    data: data
                }
            }

        case types.DELETE_SALE_TARGET_FAILURE:
            NotificationManager.error("error in deleting Sale Target")
            return {
                ...state
            }

        default:
            return { ...state }
    }
}