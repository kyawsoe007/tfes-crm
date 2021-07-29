import * as types from './profitAndLossTypes';
import { NotificationManager } from 'react-notifications'


const INIT_STATE = {

    profitLossAll: {
        loading: false,
        data: []
    },

    profitLoss: {
        loading: false,
        data: {}
    },
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        //GET all P&L
        case types.GET_ALL_PROFIT_LOSS:
            return {
                ...state,
                profitLossAll: {
                    ...state.profitLossAll,
                    loading: true
                }
            }

        case types.GET_ALL_PROFIT_LOSS_SUCCESS:
            // console.log("HUHUHUHUHUHUHUHU", { data })
            return {
                ...state,
                profitLossAll: {
                    ...state.profitLossAll,
                    loading: false,                
                    data: action.payload
                }
            }

        case types.GET_ALL_PROFIT_LOSS_FAILURE:
            return {
                ...state,
                profitLossAll: {
                    ...state.profitLossAll,
                    loading: false
                }
            }

        //GET one Payment Term 
        case types.GET_PROFIT_LOSS: 
            return {
                ...state,
                profitLoss: {
                    ...state.profitLoss,
                    loading: true
                }
            }
        
        case types.GET_PROFIT_LOSS_SUCCESS:
            return {
                ...state,
                profitLoss: {
                    ...state.profitLoss,
                    loading: false,
                    data: action.payload
                }
            } 

        case types.GET_PROFIT_LOSS_FAILURE:
            return {
                ...state,
                profitLoss: {
                    ...state.profitLoss,
                    loading: false,
                }
            }

        // POST Payment Term 
        case types.POST_PROFIT_LOSS:
        case types.PATCH_PROFIT_LOSS:
        case types.DELETE_PROFIT_LOSS:
            return {
                ...state,
                
            }

        case types.POST_PROFIT_LOSS_SUCCESS:
            NotificationManager.success("P&L succesfully created")
            //insert term into table
            let data = [...state.profitLossAll.data];
            data.push(action.payload);
            return {
                ...state,
                profitLossAll: {
                    loading:false,
                    data: data
                }
            }

        case types.POST_PROFIT_LOSS_FAILURE:
            NotificationManager.error("error in creating P&L")
            return {
                ...state,                
            }


        case types.PATCH_PROFIT_LOSS_SUCCESS:
            NotificationManager.success("successfully edited P&L")
            data = state.paymentTermsAll.data.map(item => item.id === action.payload.id ? action.payload : item);
            console.log(action.payload);
            return {
                ...state,
                profitLossAll: {
                    loading: false,
                    data: data
                }
            }

        case types.PATCH_PROFIT_LOSS_FAILURE:
            NotificationManager.error("error in editing P&L")
            return {
                ...state
            }


        case types.DELETE_PROFIT_LOSS_SUCCESS:
            NotificationManager.success("P&L deleted!")
            data = state.profitLossAll.data.filter(item => item.id !== action.payload.id);

            return {
                ...state,
                profitLossAll: {
                    loading: false,
                    data: data
                }
            }

        case types.DELETE_PROFIT_LOSS_FAILURE:
            NotificationManager.error("error in deleting P&L")
            return {
                ...state
            }

        default:
            return { ...state }
    }
}