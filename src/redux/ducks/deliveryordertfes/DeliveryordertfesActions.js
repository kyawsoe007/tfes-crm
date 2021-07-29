import * as types from './DeliveryordertfesTypes';


// GET ALL DELIVERY ORDERS 
export const getAllDeliveryOrders = () => ({
    type: types.GET_ALL_DELIVERYORDER
})

export const getAllDeliveryOrderSuccess = (data) => ({
    type: types.GET_ALL_DELIVERYORDER_SUCCESS,
    payload: data
})

export const getAllDeliveryOrderFailure = (error) => ({
    type: types.GET_ALL_DELIVERYORDER_FAILURE,
    payload: error
})

// GET FILTER REQUEST 
export const getFilterDeliveryOrderRequest = (
    limit,
    skip,
    filter,
    searchText,
    orderBy,
) => ({
    type: types.GET_FILTER_DELIVERYORDER_REQUEST,
    payload: { limit, skip, filter, searchText, orderBy },
})

export const getFilterDeliveryOrderSuccess = (data) => ({
    type: types.GET_FILTER_DELIVERYORDER_SUCCESS,
    payload: data,
})

export const getFilterDeliveryOrderFailure = (error) => ({
    type: types.GET_FILTER_DELIVERYORDER_FAILURE,
    payload: error,
})



// GET DELIVERY ORDER 
export const getDeliveryOrder = (data) => ({
    type: types.GET_DELIVERYORDER,
    payload: data
})

export const getDeliveryOrderSuccess = (data) => ({
    type: types.GET_DELIVERYORDER_SUCCESS,
    payload: data
})

export const getDeliveryOrderFailure = (error) => ({
    type: types.GET_DELIVERYORDER_FAILURE,
    payload: error
})

// PATCH DELIVERY ORDER ITEM 

export const setDeliveryOrderItem = (data) => ({
    type: types.SET_DELIVERYORDER_ITEM,
    payload: data
})

export const setDeliveryOrderItemSuccess = (data) => ({
    type: types.SET_DELIVERYORDER_ITEM_SUCCESS,
    payload: data
})

export const setDeliveryOrderItemFailure = (error) => ({
    type: types.DELETE_DELIVERYORDER_ITEM_FAILURE,
    payload: error
})


export const deleteDeliveryOrderItem = (data) => ({
    type: types.DELETE_DELIVERYORDER_ITEM,
    payload: data
})

export const deleteDeliveryOrderItemSuccess = (data) => ({
    type: types.DELETE_DELIVERYORDER_ITEM_SUCCESS,
    payload: data
})

export const deleteDeliveryOrderItemFailure = (error) => ({
    type: types.DELETE_DELIVERYORDER_ITEM_FAILURE,
    payload: error
})

// post /api/delivery-orders/create-new-based-selection

export const setDeliveryOrderItemFromPackingList = (data) => ({
    type: types.SET_DELIVERYORDER_ITEM_FROM_PACKING_LIST,
    payload: data
})

export const setDeliveryOrderItemFromPackingListSuccess = (data) => ({
    type: types.SET_DELIVERYORDER_ITEM_FROM_PACKING_LIST_SUCCESS,
    payload: data
})

export const setDeliveryOrderItemFromPackingListFailure = (error) => ({
    type: types.SET_DELIVERYORDER_ITEM_FROM_PACKING_LIST_FAILURE,
    payload: error
})

export const resetDeliveryOrderItemFromPackingList = (data) => ({
    type: types.RESET_DELIVERYORDER_ITEM_FROM_PACKING_LIST,
    payload: data
})



// PATCH DELIVERY ORDER ITEM  update all delivery order item 

export const patchDeliveryOrderItem = (data) => ({
    type: types.PATCH_DELIVERYORDER_ITEM,
    payload: data
})

export const patchDeliveryOrderItemSuccess = (data) => ({
    type: types.PATCH_DELIVERYORDER_ITEM_SUCCESS,
    payload: data
})

export const patchDeliveryOrderItemFailure = (error) => ({
    type: types.PATCH_DELIVERYORDER_ITEM_FAILURE,
    payload: error
})

// // Get Pdf data 
export const getDeliveryPdf = (data) => ({
    type: types.PDF_CREATE_DELIVERY_ORDER,
    payload: data
})
export const getDeliveryPdfSuccess = (data) => ({
    type: types.PDF_CREATE_DELIVERY_ORDER_SUCCESS,
    payload: data
})
export const getDeliveryPdfFailure = (error) => ({
    type: types.PDF_CREATE_DELIVERY_ORDER_FAILURE,
    payload: error
})

// Save Query
export const getSavedDeliveryOrderQuery = (data) => ({
    type: types.GET_SAVED_DELIVERY_ORDER_QUERY,
    payload: data,
})

export const getSavedDeliveryOrderQuerySuccess = (data) => ({
    type: types.GET_SAVED_DELIVERY_ORDER_QUERY_SUCCESS,
    payload: data,
})

export const getSavedDeliveryOrderQueryFailure = (data) => ({
    type: types.GET_SAVED_DELIVERY_ORDER_QUERY_FAILURE,
    payload: data,
})
