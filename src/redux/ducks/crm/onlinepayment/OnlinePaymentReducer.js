import * as types from './OnlinePaymentTypes';
import { NotificationManager } from "react-notifications";

const INIT_STATE = {
    paymentList: {
        loading: false,
        tableData: [],
        totalCount: 0
    },
    exportData: {
        loading: false
    }
}

export default (state = INIT_STATE, action) => {
    switch(action.type){
        case types.GET_ALL_ONLINEPAYMENT:
            return {
                ...state,
                paymentList: {
                    ...state.paymentList,
                    loading: true,                    
                }
            }
        case types.GET_ALL_ONLINEPAYMENT_FAILURE:
            NotificationManager.warning("Error in Payment Data");
            return {
                ...state,
                paymentList: {
                    ...state.paymentList,
                    loading: false
                }
            }
        case types.GET_ALL_ONLINEPAYMENT_SUCCESS:
            const { data, totalCount } = action.payload;
            return {
                ...state,
                paymentList: {
                    ...state.paymentList,
                    loading:false,
                    tableData: data,
                    totalCount: totalCount
                }
            }
        case types.EXPORT_ONLINEPAYMENT:
            return {
                ...state,
                exportData: {                        
                    loading: true,                    
                }
            }
        case types.EXPORT_ONLINEPAYMENT_FAILURE:
            NotificationManager.warning("Error in exporting data");
            return {
                ...state,
                exportData: {                        
                    loading: false
                }
            }
        case types.EXPORT_ONLINEPAYMENT_SUCCESS:            
            return {
                ...state,
                exportData: {                        
                    loading: false
                }
            }
        default:
            return { ...state };
    }
}
