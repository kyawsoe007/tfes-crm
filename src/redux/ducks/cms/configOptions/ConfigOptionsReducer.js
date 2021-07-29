import { NotificationManager } from 'react-notifications';
import * as types from "./ConfigOptionsTypes";

const INIT_STATE = {
    coeList : {
        loading: false,
        tableData:[],
        totalCount: 0
    },
    warrantyList: {
        loading: false,
        tableData: [],
        totalCount: 0
    },
    servicingList: {
        loading: false,
        tableData: [],
        totalCount: 0
    }
}

export default(state = INIT_STATE, action) => {
    switch(action.type){
        case types.GET_ALL_COE:
        case types.CREATE_COE:
        case types.EDIT_COE:
        case types.DELETE_COE:
            return {
                ...state,
                coeList: {
                    ...state.coeList,
                    loading: true
                }
            }
        case types.GET_ALL_COE_SUCCESS:
            return {
                ...state,
                coeList: {
                    ...state.coeList,
                    loading: false, 
                    tableData: action.payload               
                }
            }
        case types.GET_ALL_COE_FAILURE:
            NotificationManager.warning("Error in getting COE list");
            return {
                ...state,
                coeList: {
                    ...state.coeList,
                    loading: false
                }
            }   
        case types.CREATE_COE_FAILURE:
            NotificationManager.warning("Error creating COE");
            return {
                ...state,
                coeList: {
                    ...state.coeList,
                    loading: false
                }
            }
        case types.DELETE_COE_SUCCESS:
            NotificationManager.warning("COE deleted");
            var afterDeleteData = Object.assign([], state.coeList.tableData).filter(item => item.id != action.payload);            
            return {
                ...state,
                coeList: {
                    ...state.coeList,
                    loading: false,
                    tableData: afterDeleteData
                }
            }
        case types.GET_ALL_WARRANTY:
        case types.CREATE_WARRANTY:
        case types.EDIT_WARRANTY:
        case types.DELETE_WARRANTY:
            return {
                ...state,
                warrantyList: {
                    ...state.warrantyList,
                    loading: true
                }
            }
        case types.GET_ALL_WARRANTY_SUCCESS:
            return {
                ...state,
                warrantyList: {
                    ...state.warrantyList,
                    loading: false, 
                    tableData: action.payload               
                }
            }
        case types.GET_ALL_WARRANTY_FAILURE:
            NotificationManager.warning("Error in getting Warranty list");
            return {
                ...state,
                warrantyList: {
                    ...state.warrantyList,
                    loading: false
                }
            }   
        case types.CREATE_WARRANTY_FAILURE:
            NotificationManager.warning("Error creating Warranty");
            return {
                ...state,
                warrantyList: {
                    ...state.warrantyList,
                    loading: false
                }
            }
        case types.DELETE_WARRANTY_SUCCESS:
            NotificationManager.warning("Warranty deleted");
            var afterDeleteData = Object.assign([], state.warrantyList.tableData).filter(item => item.id != action.payload);            
            return {
                ...state,
                warrantyList: {
                    ...state.warrantyList,
                    loading: false,
                    tableData: afterDeleteData
                }
            }
        case types.GET_ALL_SERVICING:
        case types.CREATE_SERVICING:
        case types.EDIT_SERVICING:
        case types.DELETE_SERVICING:
            return {
                ...state,
                servicingList: {
                    ...state.servicingList,
                    loading: true
                }
            }
        case types.GET_ALL_SERVICING_SUCCESS:
            return {
                ...state,
                servicingList: {
                    ...state.servicingList,
                    loading: false, 
                    tableData: action.payload               
                }
            }
        case types.GET_ALL_SERVICING_FAILURE:
            NotificationManager.warning("Error in getting Servicing list");
            return {
                ...state,
                servicingList: {
                    ...state.servicingList,
                    loading: false
                }
            }   
        case types.CREATE_SERVICING_FAILURE:
            NotificationManager.warning("Error creating Servicing");
            return {
                ...state,
                servicingList: {
                    ...state.servicingList,
                    loading: false
                }
            }
        case types.DELETE_SERVICING_SUCCESS:
            NotificationManager.warning("Servicing deleted");
            var afterDeleteData = Object.assign([], state.servicingList.tableData).filter(item => item.id != action.payload);            
            return {
                ...state,
                servicingList: {
                    ...state.servicingList,
                    loading: false,
                    tableData: afterDeleteData
                }
            }
        default:
            return {
                ...state
            }
        
    }
}