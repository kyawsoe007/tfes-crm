import * as types from './WorkpickingorderstfesTypes'
import { NotificationManager } from 'react-notifications'

const INIT_STATE = {
  WorkpickingOrdersAll: {
    loading: false,
    data: []
  },
  workpickingOrder: {
    loading: false,
    data: []
  },
  workpickingOrderItem: {
    loading: false,
    data: []
  }
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    //GET ALL WORK PICKING ORDERS
    case types.GET_ALL_WORKPICKING_ORDER:
      return {
        ...state,
        WorkpickingOrdersAll: {
          ...state.WorkpickingOrdersAll,
          loading: true
        }
      }

    case types.GET_ALL_WORKPICKING_ORDER_SUCCESS:
      // NotificationManager.success('Success in fetching Workorders')
      // console.log("Action", action)
      // console.log(action.payload)
      const { data } = action.payload
      // console.log({ data })
      return {
        ...state,
        WorkpickingOrdersAll: {
          loading: false,
          data: data
        }
      }

    case types.GET_ALL_WORKPICKING_ORDER_FAILURE:
      // NotificationManager.warning('Error in fetching Workorders')
      return {
        ...state,
        WorkpickingOrdersAll: {
          loading: false,
          data: {}
        }
      }

    //GET SINGLE WORKPICKING ORDER  POST CALL 

    case types.POST_WORKPICKING_ORDER:
      return {
        ...state,
        workpickingOrder: {
          ...state.workpickingOrder,
          loading: true
        }
      }

    case types.POST_WORKPICKING_ORDER_SUCCESS:
      NotificationManager.success('Success in saving workpicking order')
      return {
        ...state,
        workpickingOrder: {
          ...state.workpickingOrder,
          loading: false,
          data: action.payload
        }
      }

    case types.POST_WORKORDER_FAILURE:
      //NotificationManager.warning('Error in fetching Workorders')
      return {
        ...state,
        workpickingOrder: {
          ...state.workpickingOrder,
          loading: false,
          data: {}
        }
      }

    //UPDATES WORKING PICKING ORDER ITEM
    case types.SET_WORKPICKING_ORDER_ITEM:
      return {
        ...state,
        workpickingOrder: {
          ...state.workpickingOrder,
          loading: true
        }
      }

    case types.SET_WORKPICKING_ORDER_ITEM_SUCCESS:
      NotificationManager.success('Success in updating work picking order')
      return {
        ...state,
        workpickingOrder: {
          ...state.workpickingOrder,
          loading: false,
          data: action.payload
        }
      }

    case types.SET_WORKPICKING_ORDER_ITEM_FAILURE:
      return {
        ...state,
        workpickingOrder: {
          ...state.workpickingOrder,
          loading: false,
          data: action.payload
        }
      }

    default:
      return { ...state }
  }
}
