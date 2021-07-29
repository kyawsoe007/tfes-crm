import {
  all,
  call,
  fork,
  put,
  takeEvery,
  delay,
  select
} from 'redux-saga/effects'

import * as types from './WorkpickingorderstfesTypes'
import * as actions from './WorkpickingorderstfesActions'
import api from 'Api'

//=========================
// REQUESTS
//=========================

const getAllWorkPickingOrdersRequest = async () => {
  const result = await api.get(`/work-order-pickings`)
  return result.data
}

const postWorkPickingOrderRequest = async (payload) => {
  console.log('are you coming in', payload)
  const result = await api.post(`/work-order-pickings`, payload)
  return result.data
}

const setWorkPickingOrderItemRequest = async (payload) => {
  const result = await api.patch(`/work-order-pickings/`, payload)
  return result.data
}

//=========================
// CALL(GENERATOR) ACTIONS
//=========================

function* getAllWorkPickingOrdersData(payload) {
  try {
    // console.log("ASDASDSDSD", payload)
    const data = yield call(getAllWorkPickingOrdersRequest, payload)
    yield put(actions.getAllWorkPickingOrdersSuccess(data))
  } catch (error) {
    yield put(actions.getAllWorkPickingOrdersFailure(error))
  }
}

function* postWorkPickingOrderData({ payload }) {
  try {
    const data = yield call(postWorkPickingOrderRequest, payload)
    yield put(actions.postWorkPickingOrderSuccess(data))
  } catch (error) {
    yield put(actions.postWorkPickingOrderFailure(error))
  }
}

function* setWorkPickingOrderItemData({ payload }) {
  try {
    const data = yield call(setWorkPickingOrderItemRequest, payload)
    yield put(actions.setWorkPickingOrderItemSuccess(data))
  } catch (error) {
    yield put(actions.setWorkPickingOrderItemFailure(error))
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================

export function* getAllWorkPickingOrdersWatcher() {
  yield takeEvery(types.GET_ALL_WORKPICKING_ORDER, getAllWorkPickingOrdersData)
}

export function* postWorkPickingOrderWatcher() {
  yield takeEvery(types.POST_WORKPICKING_ORDER, postWorkPickingOrderData)
}

export function* setWorkPickingOrderItemWatcher() {
  yield takeEvery(types.SET_WORKPICKING_ORDER_ITEM, setWorkPickingOrderItemData)
}

//=======================
// FORK SAGAS TO STORE
//=======================

export default function* WorkpickingorderstfesSaga() {
  yield all([
    fork(getAllWorkPickingOrdersWatcher),
    fork(postWorkPickingOrderWatcher),
    fork(setWorkPickingOrderItemWatcher)
  ])
}
