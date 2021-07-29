import * as types from './DeliveryordertfesTypes';
import { NotificationManager } from 'react-notifications';

const INIT_STATE = {
    deliveryOrderAll: {
        loading: false,
        data: []
    },

    deliveryFiltered: {
        loading: false,
        data: [],
        count: 0,
    },

    deliveryOrder: {
        loading: false,
        doData: []
    },

    deliveryOrderItemPatch: {
        loading: false,
        patchBody: []
    },

    deliveryOrderItemFromPackingList: {
        loading: false,
        doItem: []
    },

    doItemPatch: {
        loading: false,
        data: {}
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

    // console.log("WHYYYYYYYYy")
    switch (action.type) {

        case types.GET_ALL_DELIVERYORDER:

            // console.log("ABSIDUBSUIDBSD", action)
            return {
                ...state,
                deliveryOrderAll: {
                    ...state.deliveryOrderAll,
                    loading: true
                }
            }

        case types.GET_ALL_DELIVERYORDER_SUCCESS:

            // console.log("ASDASASDDS")
            // const = action.payload

            return {
                ...state,
                deliveryOrderAll: {
                    loading: false,
                    data: action.payload
                }
            }

        case types.GET_ALL_DELIVERYORDER_FAILURE:
            return {
                ...state,
                deliveryOrderAll: {
                    loading: false,
                    data: action.payload
                }
            }


        // GET FILTER 
        case types.GET_FILTER_DELIVERYORDER_REQUEST:
            return {
                ...state,
                deliveryFiltered: {
                    ...state.deliveryFiltered,
                    loading: true,
                },
            }

        case types.GET_FILTER_DELIVERYORDER_SUCCESS:
            //NotificationManager.success('Success in Fetching Quotation Details')
            return {
                ...state,
                deliveryFiltered: {
                    loading: false,
                    // data: action.payload,
                    data: action.payload[0],
                    count: action.payload[1],
                },
            }

        case types.GET_FILTER_DELIVERYORDER_FAILURE:
            NotificationManager.warning('Error in Fetching Quotation Details')
            return {
                ...state,
                deliveryFiltered: {
                    loading: false,
                },
            }




        // GET DELIVERY ORDER 
        case types.GET_DELIVERYORDER:

            return {
                ...state,
                deliveryOrder: {
                    ...state.deliveryOrder,
                    loading: true
                }
            }

        case types.GET_DELIVERYORDER_SUCCESS:

            return {
                ...state,
                deliveryOrder: {
                    ...state.deliveryOrder,
                    loading: false,
                    doData: action.payload
                }
            }

        case types.GET_DELIVERYORDER_FAILURE:
            return {
                ...state,
                deliveryOrder: {
                    ...state.deliveryOrder,
                    loading: false,
                    doData: action.payload
                }
            }

        // PATCH DELIVERY ORDER ITEM 
        case types.SET_DELIVERYORDER_ITEM:
            return {
                ...state,
                deliveryOrderItemPatch,
                ...state.deliveryOrderItemPatch,
                loading: true,
                patchBody: action.payload
            }

        case types.SET_DELIVERYORDER_ITEM_SUCCESS:
            return {
                ...state,
                deliveryOrderItemPatch,
                ...state.deliveryOrderItemPatch,
                loading: false,
                patchBody: action.payload
            }

        case types.SET_DELIVERYORDER_ITEM_FAILURE:
            return {
                ...state,
                deliveryOrderItemPatch,
                ...state.deliveryOrderItemPatch,
                loading: false,
                patchBody: action.payload
            }

        // POST DELIVERY ORDER ITEM FROM PACKING LIST 
        case types.SET_DELIVERYORDER_ITEM_FROM_PACKING_LIST:

            console.log("reducer", action);
            console.log(state)
            // console.log(deliveryOrderItemFromPackingList);
            return {
                ...state,
                ...state.deliveryOrderItemFromPackingList,
                loading: true,
                doItem: action.payload
            }

        case types.SET_DELIVERYORDER_ITEM_FROM_PACKING_LIST_SUCCESS:
            NotificationManager.success('Success in setting delivery order');

            return {
                ...state,
                ...state.deliveryOrderItemFromPackingList,
                loading: false,
                doItem: action.payload
            }

        case types.SET_DELIVERYORDER_ITEM_FROM_PACKING_LIST_FAILURE:

            console.log("reducer fail", action);
            console.log(state)
            return {
                ...state,
                // deliveryOrderItemFromPackingList,
                ...state.deliveryOrderItemFromPackingList,
                loading: false,
                doItem: action.payload
            }

        case types.RESET_DELIVERYORDER_ITEM_FROM_PACKING_LIST:

            return {
                ...state,
                // deliveryOrderItemFromPackingList,
                ...state.deliveryOrderItemFromPackingList,
                loading: false,
                doItem: {}
            }
        // case SET_DELIVERYORDER_ITEM_FROM_PACKING_LIST_FAILURE:

        //     console.log("reducer fail", action);
        //     console.log(state)
        //     return {
        //         ...state,
        //         // deliveryOrderItemFromPackingList,
        //         ...state.deliveryOrderItemFromPackingList,
        //         loading: false,
        //         doItem: action.payload
        //     }

        case types.PATCH_DELIVERYORDER_ITEM:
            return {
                ...state,
                deliveryOrder: {
                    ...state.deliveryOrder,
                    loading: true,
                }
            }

        case types.PATCH_DELIVERYORDER_ITEM_SUCCESS:
            NotificationManager.success("Save Successful!")
            return {
                ...state,
                deliveryOrder: {
                    ...state.deliveryOrder,
                    loading: false,
                    doData: action.payload
                }
            }

        case types.PATCH_DELIVERYORDER_ITEM_FAILURE:
            NotificationManager.error("Unable to save delivery!")
            return {
                ...state,
                deliveryOrder: {
                    ...state.deliveryOrder,
                    loading: false,
                }
            }

        case types.DELETE_DELIVERYORDER_ITEM:
            return {
                ...state,
                deliveryOrderAll: {
                    ...state.deliveryOrderAll,
                    loading: true,
                }
            }

        case types.DELETE_DELIVERYORDER_ITEM_SUCCESS:
            NotificationManager.success("Delete Delivery Order Successful!")
            return {
                ...state
            }

        case types.DELETE_DELIVERYORDER_ITEM_FAILURE:
            NotificationManager.error("Unable to delete delivery item!")
            return {
                ...state,
            }

        // Pdf Create
        case types.PDF_CREATE_DELIVERY_ORDER:
            return {
                ...state,
                loading: true
            }

        case types.PDF_CREATE_DELIVERY_ORDER_SUCCESS:
            return {
                ...state,
                loading: false
            }

        case types.PDF_CREATE_DELIVERY_ORDER_FAILURE:
            return {
                ...state,
                loading: false
            }

        case types.GET_SAVED_DELIVERY_ORDER_QUERY:
            return {
                ...state,
                SavedQuery: {
                    ...state.SavedQuery,
                    ...action.payload
                }
            }

        case types.GET_SAVED_DELIVERY_ORDER_QUERY_SUCCESS:
            return {
                ...state,
                SavedQuery: {
                    ...state.SavedQuery,
                    ...action.payload
                }
            }

        case types.GET_SAVED_DELIVERY_ORDER_QUERY_FAILURE:
            // NotificationManager.warning('Error in fetching QuotationPdfCreate')
            return {
                ...state,
                SavedQuery: {
                    ...state.SavedQuery,
                    ...action.payload
                }
            }

        default:
            return { ...state }
    }
}