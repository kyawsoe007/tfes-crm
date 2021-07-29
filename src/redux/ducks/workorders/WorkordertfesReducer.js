import * as types from './WorkordertfesTypes';
import { NotificationManager } from 'react-notifications'
import { getWorkOrder } from './WorkordertfesActions';


const INIT_STATE = {
    WorkordersAll: {
        loading: false,
        data: [],
        count: 0
    },

    workOrderFiltered: {
        loading: false,
        data: [],
        count: 0,
    },
    workOrder: {
        loading: false,
        data: []
    },
    getWoBySoIdBody: {
        loading: false,
        data: []
    },
    WorkOrderPDFCreate:{
        loading:false,
        data:[]
    },
    SavedQuery: {
        saved: false,
        limit: 20,
        skip: 0,
        filter: [],
        filterList: [],
        searchText: ""
      }
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        //GET ALL ORDERS 
        case types.GET_ALL_WORKORDER:
            // console.log ("JIJIJIJIJIJIJIJIJIJI")
            return {
                ...state,
                WorkordersAll: {
                    ...state.WorkordersAll,
                    loading: true
                }
            }

        case types.GET_ALL_WORKORDER_SUCCESS:
            // NotificationManager.success('Success in fetching Workorders')
            // console.log("Action", action)
            // console.log(action.payload)
            //const { data } = action.payload
            // console.log("HUHUHUHUHUHUHUHU", { data })
            return {
                ...state,
                WorkordersAll: {
                    loading: false,                
                    data: action.payload.data[0],
                    count: action.payload.data[1]
                }
            }

        case types.GET_ALL_WORKORDER_FAILURE:
            NotificationManager.warning('Error in fetching Workorders')
            return {
                ...state,
                WorkordersAll: {
                    loading: false,
                    data: {}
                }
            }



        // GET FILTER 
        case types.GET_FILTER_WORKORDER_REQUEST:
            return {
                ...state,
                workOrderFiltered: {
                ...state.workOrderFiltered,
                loading: true,
                },
            }

        case types.GET_FILTER_WORKORDER_SUCCESS:
        //NotificationManager.success('Success in Fetching Quotation Details')
            return {
                ...state,
                workOrderFiltered: {
                loading: false,
                // data: action.payload,
                data: action.payload[0],
                count: action.payload[1],
                },
            }

        case types.GET_FILTER_WORKORDER_FAILURE:
            NotificationManager.warning('Error in Fetching Quotation Details')
            return {
                ...state,
                workOrderFiltered: {
                loading: false,
                },
            }

        // GET SINGLE ORDER 
        case types.GET_WORKORDER:
        case types.SET_WORKORDER:
            // console.log("Action", action)
            // console.log(action.payload)
            return {
                ...state,
                workOrder: {
                    ...state.workOrder,
                    loading: true
                }
            }
        
        case types.GET_WORKORDER_SUCCESS:
            
            return {
                ...state,
                workOrder: {
                    ...state.workOrder,
                    loading: false,
                    data: action.payload
                }
            }
        case types.SET_WORKORDER_SUCCESS:
            NotificationManager.success("Update successful!");
            return {
                ...state,
                workOrder: {
                    ...state.workOrder,
                    loading: false,
                    data: action.payload
                }
            }

            case types.GET_WORKORDER_FAILURE:
                NotificationManager.warning('Error in fetching Workorders');
                return {
                    ...state,
                    workOrder: {
                        ...state.workOrder,
                        loading: false,
                        data: {}
                    }
                }
            case types.SET_WORKORDER_FAILURE:
                NotificationManager.warning('Error in updating Workorders');
                return {
                    ...state,
                    workOrder: {
                        ...state.workOrder,
                        loading: false,
                        
                    }
                }

            //UPDATES WORKORDER ITEM 

            case types.SET_WORKORDER_ITEM:
                // console.log("WORK ITEMMMMMM")
                return {
                    ...state,
                    workOrderItem : {
                        ...state.workOrderItem,
                        loading: true,
                    }
                }

            case types.SET_WORKORDER_ITEM_SUCCESS:
                NotificationManager.success('Success in updating Work Order Item');
                
                return {
                    ...state,
                    workOrderItem: {
                        ...state.workOrderItem,
                        loading: false,
                        data: action.payload
                    }
                }

            case types.SET_WORKORDER_ITEM_FAILURE:
                return {
                    ...state,
                    workOrderItem: {
                        ...state.workOrderItem,
                        loading: false,
                        data: {}
                    }
                }



            // GET WO by SOID 
            case types.GET_WO_BY_SOID:
                // console.log("WORK ITEMMMMMM")
                return {
                    ...state,
                    getWoBySoIdBody : {
                        ...state.getWoBySoIdBody,
                        loading: true,
                    }
                }

            case types.GET_WO_BY_SOID_SUCCESS:
                return {
                    ...state,
                    getWoBySoIdBody: {
                        ...state.getWoBySoIdBody,
                        loading: false,
                        data: action.payload
                    }
                }

            case types.GET_WO_BY_SOID_FAILURE:
                return {
                    ...state,
                    getWoBySoIdBody: {
                        ...state.getWoBySoIdBody,
                        loading: false,
                        data: {}
                    }
                }

        // PDF
        case types.PDF_CREATE_WORKER_ORDER:
            return{
                ...state,
                loading:true
            }
        case types.PDF_CREATE_WORKER_ORDER_SUCCESS:
            return{
                ...state,
                loading:false
            }
        case types.PDF_CREATE_WORKER_ORDER_FAILURE:
            NotificationManager.warning('Error in fetching WorkOrderPdfCreate')
            return{
                ...state,
                loading:false
            }
        
        // post checked sku
        case types.POST_CHECKED_SKU:
            return{
                ...state,
                workOrder:{
                    ...state.workOrder,
                    loading:true,
                },

            }
        case types.POST_CHECKED_SKU_SUCCESS:
            NotificationManager.success("Update successful!");

            return{
                ...state,
                workOrder: {
                    ...state.workOrder,
                    loading: false,
                    data: action.payload
                }
            }
            case types.POST_CHECKED_SKU_FAILURE:
                NotificationManager.warning("Update failed");
                return{
                    ...state,
                    workOrder: {
                        ...state.workOrder,
                        loading: false,                        
                    }
    
                }

        case types.GET_SAVED_WORKORDER_QUERY:
            return {
                ...state,
                SavedQuery: {
                ...state.SavedQuery,
                ...action.payload
                }
            }
        
        case types.GET_SAVED_WORKORDER_QUERY_SUCCESS:
        return {
            ...state,
            SavedQuery: {
            ...state.SavedQuery,
            ...action.payload
            }
        }
    
        case types.GET_SAVED_WORKORDER_QUERY_FAILURE:
        // NotificationManager.warning('Error in fetching QuotationPdfCreate')
        return {
            ...state,
            SavedQuery: {
            ...state.SavedQuery,
            ...action.payload
            }
        } 

        case types.PATCH_LIGHT_RESET_WORKORDER:
            return {
                ...state,
                workOrder : {
                    ...state.workOrder,
                    loading: true,
                }
            }
        
        case types.PATCH_LIGHT_RESET_WORKORDER_SUCCESS:
            NotificationManager.success("Light revert successful!");
            return {
                ...state,
                workOrder : {
                    ...state.workOrder,
                    loading: false,
                    data: action.payload
                }
        }
    
        case types.PATCH_LIGHT_RESET_WORKORDER_FAILURE:
            NotificationManager.warning("revert failed!");
            return {
                ...state,
        }
        
        case types.PATCH_MEDIUM_RESET_WORKORDER:
            return {
                ...state,
                workOrder : {
                    ...state.workOrder,
                    loading: true,
                }
            }
        
        case types.PATCH_MEDIUM_RESET_WORKORDER_SUCCESS:
            NotificationManager.success("medium revert successful!");
            return {
                ...state,
                workOrder : {
                    ...state.workOrder,
                    loading: false,
                    data: action.payload
                }
        }
    
        case types.PATCH_MEDIUM_RESET_WORKORDER_FAILURE:
            NotificationManager.warning("revert failed!");
            return {
                ...state,
        } 

        default:
            return{ ...state};
    }

    


}