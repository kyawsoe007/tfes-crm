import {
    all,
    call,
    fork,
    put,
    takeEvery,
    delay,
    select,
  } from 'redux-saga/effects'
  
  import * as types from './downPaymentTypes'
  import * as actions from './downPaymentActions'
  import api from 'Api'
  
  
  //=========================
  // REQUESTS
  //=========================

  const getAllDownPaymentsRequest = async(payload) => {
      const result = await api.get(`/down-payment`);
      return result.data
  }

  const patchDownPaymentRequest = async({payload}) => {
      console.log("PAYLOAD", payload)
      const result = await api.patch(`/down-payment/${payload.id}`, payload)
      return result.data
  }
  
  const postDownPaymentRequest = async({payload}) => {
      console.log("PAYLOAD", payload)
      const result = await api.post(`/down-payment`, payload)
      return result.data;
  }

  const deleteDownPaymentRequest = async({payload}) => {
      console.log("PAYLOAD", payload)
      const result = await api.delete(`/down-payment/${payload}`)
      return result.data;
  }

    
  //=========================
  // CALL(GENERATOR) ACTIONS
  //=========================
  
  function* getAllDownPaymentsData(payload) {
      try {
          const data = yield call(getAllDownPaymentsRequest, payload) 
          yield put(actions.getAllDownPaymentsSuccess(data))
      } catch (error) {
          yield put(actions.getAllDownPaymentsFailure(error))
      }
  }
  
  function* patchDownPaymentData(payload) {
      try {
          const data = yield call(patchDownPaymentRequest, payload)
          yield put(actions.patchDownPaymentSuccess(data))
      } catch (error) {
          yield put(actions.patchDownPaymentFailure(error))
      }
  }

  function* postDownPaymentData(payload) {
      try {
          const data = yield call(postDownPaymentRequest, payload)
          yield put(actions.postDownPaymentSuccess(data))
      } catch (error) {
          yield put(actions.postDownPaymentFailure(error))
      }
  }

  function* deleteDownPaymentData(payload) {
      try {
          const data = yield call(deleteDownPaymentRequest, payload)
          yield put(actions.deleteDownPaymentSuccess(data))
      } catch (error) {
          yield put(actions.deleteDownPaymentFailure(error))
      }
  }

  //=======================
  // WATCHER FUNCTIONS
  //=======================
  
  export function* getAllDownPaymentsWatcher() {
      yield takeEvery(types.GET_ALL_DOWN_PAYMENTS, getAllDownPaymentsData)
  }

  export function* patchDownPaymentWatcher() {
      yield takeEvery(types.PATCH_DOWN_PAYMENT, patchDownPaymentData)
  }
 
  export function* postDownPaymentWatcher() {
      yield takeEvery(types.POST_DOWN_PAYMENT, postDownPaymentData)
  }

  export function* deleteDownPaymentWatcher() {
      yield takeEvery(types.DELETE_DOWN_PAYMENT, deleteDownPaymentData)
  }
  

  
  //=======================
  // FORK SAGAS TO STORE
  //=======================
  export default function* rootSaga() {
    yield all([
      fork(getAllDownPaymentsWatcher),
      fork(patchDownPaymentWatcher),
      fork(postDownPaymentWatcher),
      fork(deleteDownPaymentWatcher)
    ])
  }