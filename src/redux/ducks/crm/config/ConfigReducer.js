import * as types from './ConfigTypes';
import { NotificationManager } from "react-notifications";

const INIT_STATE = {
    configList: {
        loading: false,
        tableData: [],
        totalCount: 0
    }
}

export default (state = INIT_STATE, action) => {
    switch(action.type) {
        case types.GET_CONFIGS: 
            return {
                ...state,
                configList: {
                    ...state.configList,
                    loading:true
                }
            }
        case types.GET_CONFIGS_SUCCESS:
            return {
                ...state,
                configList: {
                    loading: false,
                    tableData: action.payload.data,
                    totalCount: action.payload.totalCount
                }
            }
        case types.GET_CONFIGS_FAILURE:
            NotificationManager.error("Error getting config list");
            return {
                ...state,
                configList: {
                    ...state.configList,
                    loading: false
                }
            }
        default:
            return { ...state }
    }
}