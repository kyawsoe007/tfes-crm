import * as types from './WorkpickingorderstfesTypes'

// get all workpickingorders
export const getAllWorkPickingOrders = () => ({
  type: types.GET_ALL_WORKPICKING_ORDER
})
export const getAllWorkPickingOrdersSuccess = (data) => ({
  type: types.GET_ALL_WORKPICKING_ORDER_SUCCESS,
  payload: { data }
})
export const getAllWorkPickingOrdersFailure = (data) => ({
  type: types.GET_ALL_WORKPICKING_ORDER_FAILURE,
  payload: data
})

// get single workpicking order POST CALL
export const postWorkPickingOrder = (data) => ({
  type: types.POST_WORKPICKING_ORDER,
  payload: data
})

export const postWorkPickingOrderSuccess = (data) => ({
  type: types.POST_WORKPICKING_ORDER_SUCCESS,
  payload: data
})

export const postWorkPickingOrderFailure = (error) => ({
  type: types.POST_WORKPICKING_ORDER_FAILURE,
  payload: error
})

// update workpicking order item
export const setWorkPickingOrderItem = (data) => ({
  type: types.SET_WORKPICKING_ORDER_ITEM,
  payload: data
})

export const setWorkPickingOrderItemSuccess = (data) => ({
  type: types.SET_WORKPICKING_ORDER_ITEM_SUCCESS,
  payload: data
})

export const setWorkPickingOrderItemFailure = (error) => ({
  type: types.SET_WORKPICKING_ORDER_ITEM_FAILURE,
  payload: error
})
