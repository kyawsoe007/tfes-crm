import * as types from './balanceSheetTypes';
import { NotificationManager } from 'react-notifications'


const INIT_STATE = {

    balanceSheetAll: {
        loading: false,
        data: []
    },

    balanceSheet: {
        loading: false,
        data: {}
    },
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        //GET all Balance Sheet
        case types.GET_ALL_BALANCE_SHEET:
            return {
                ...state,
                balanceSheetAll: {
                    ...state.balanceSheetAll,
                    loading: true
                }
            }

        case types.GET_ALL_BALANCE_SHEET_SUCCESS:
            // console.log("HUHUHUHUHUHUHUHU", { data })
            return {
                ...state,
                balanceSheetAll: {
                    ...state.balanceSheetAll,
                    loading: false,
                    data: action.payload
                }
            }

        case types.GET_ALL_BALANCE_SHEET_FAILURE:
            return {
                ...state,
                balanceSheetAll: {
                    ...state.balanceSheetAll,
                    loading: false
                }
            }

        //GET one Payment Term 
        case types.GET_BALANCE_SHEET:
            return {
                ...state,
                balanceSheet: {
                    ...state.balanceSheet,
                    loading: true
                }
            }

        case types.GET_BALANCE_SHEET_SUCCESS:
            return {
                ...state,
                balanceSheet: {
                    ...state.balanceSheet,
                    loading: false,
                    data: action.payload
                }
            }

        case types.GET_BALANCE_SHEET_FAILURE:
            return {
                ...state,
                balanceSheet: {
                    ...state.balanceSheet,
                    loading: false,
                }
            }

        // POST Payment Term 
        case types.POST_BALANCE_SHEET:
        case types.PATCH_BALANCE_SHEET:
        case types.DELETE_BALANCE_SHEET:
            return {
                ...state,

            }

        case types.POST_BALANCE_SHEET_SUCCESS:
            NotificationManager.success("Balance Sheet succesfully created")
            //insert term into table
            let data = [...state.balanceSheetAll.data];
            data.push(action.payload);
            return {
                ...state,
                balanceSheetAll: {
                    loading: false,
                    data: data
                }
            }

        case types.POST_BALANCE_SHEET_FAILURE:
            NotificationManager.error("error in creating Balance Sheet")
            return {
                ...state,
            }


        case types.PATCH_BALANCE_SHEET_SUCCESS:
            NotificationManager.success("successfully edited Balance Sheet")
            data = state.balanceSheetAll.data.map(item => item.id === action.payload.id ? action.payload : item);
            console.log(action.payload);
            return {
                ...state,
                balanceSheetAll: {
                    loading: false,
                    data: data
                }
            }

        case types.PATCH_BALANCE_SHEET_FAILURE:
            NotificationManager.error("error in editing Balance Sheet")
            return {
                ...state
            }


        case types.DELETE_BALANCE_SHEET_SUCCESS:
            NotificationManager.success("Balance Sheet deleted!")
            data = state.balanceSheetAll.data.filter(item => item.id !== action.payload.id);

            return {
                ...state,
                balanceSheetAll: {
                    loading: false,
                    data: data
                }
            }

        case types.DELETE_BALANCE_SHEET_FAILURE:
            NotificationManager.error("error in deleting Balance Sheet")
            return {
                ...state
            }

        default:
            return { ...state }
    }
}