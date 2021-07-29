import {
    all,
    call,
    fork,
    put,
    takeEvery,
    delay,
    select,
  } from 'redux-saga/effects'
  
  import * as types from './discountSettingsTypes'
  import * as actions from './discountSettingsActions'
  import api from 'Api'
  
  
  //=========================
  // REQUESTS
  //=========================

  const getAllDiscountsRequest = async(payload) => {
      const result = await api.get(`/discounts`);
      return result.data
  }

  const putDiscountRequest = async({payload}) => {
      console.log("PAYLOAD", payload)
      const result = await api.put(`discounts/${payload.id}`, payload)
      return result.data
  }
  
  const postDiscountRequest = async({payload}) => {
      console.log("PAYLOAD", payload)
      const result = await api.post(`discounts`, payload)
      return result.data;
  }

  const deleteDiscountRequest = async({payload}) => {
      console.log("PAYLOAD", payload)
      const result = await api.delete(`discounts/${payload}`)
      return result.data;
  }

    
  //=========================
  // CALL(GENERATOR) ACTIONS
  //=========================
  
  function* getAllDiscountsData(payload) {
      try {
          const data = yield call(getAllDiscountsRequest, payload) 
          yield put(actions.getAllDiscountsSuccess(data))
      } catch (error) {
          yield put(actions.getAllDiscountsFailure(error))
      }
  }
  
  function* putDiscountData(payload) {
      try {
          const data = yield call(putDiscountRequest, payload)
          yield put(actions.putDiscountSuccess(data))
      } catch (error) {
          yield put(actions.putDiscountFailure(error))
      }
  }

  function* postDiscountData(payload) {
      try {
          const data = yield call(postDiscountRequest, payload)
          yield put(actions.postDiscountSuccess(data))
      } catch (error) {
          yield put(actions.postDiscountFailure(error))
      }
  }

  function* deleteDiscountData(payload) {
      try {
          const data = yield call(deleteDiscountRequest, payload)
          yield put(actions.deleteDiscountSuccess(data))
      } catch (error) {
          yield put(actions.deleteDiscountFailure(error))
      }
  }

  //=======================
  // WATCHER FUNCTIONS
  //=======================
  
  export function* getAllDiscountsWatcher() {
      yield takeEvery(types.GET_ALL_DISCOUNTS, getAllDiscountsData)
  }

  export function* putDiscountWatcher() {
      yield takeEvery(types.PUT_DISCOUNT, putDiscountData)
  }
 
  export function* postDiscountWatcher() {
      yield takeEvery(types.POST_DISCOUNT, postDiscountData)
  }

  export function* deleteDiscountWatcher() {
      yield takeEvery(types.DELETE_DISCOUNT, deleteDiscountData)
  }
  

  
  //=======================
  // FORK SAGAS TO STORE
  //=======================
  export default function* discounttfesSaga() {
    yield all([
      fork(getAllDiscountsWatcher),
      fork(putDiscountWatcher),
      fork(postDiscountWatcher),
      fork(deleteDiscountWatcher)
    ])
  }