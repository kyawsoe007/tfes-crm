import {
    all,
    call,
    fork,
    put,
    takeEvery,
    delay,
    select,
  } from 'redux-saga/effects'
  
  import * as types from './paymentTypes'
  import * as actions from './paymentActions'
  import api from 'Api'
  
  
  //=========================
  // REQUESTS
  //=========================

  const getAllPaymentTermsRequest = async(payload) => {
      const result = await api.get(`/payment-terms`);
      return result.data
  }

  const patchPaymentTermRequest = async({payload}) => {
      const result = await api.patch(`/payment-terms/${payload.id}`, payload)
      return result.data
  }
  
  const postPaymentTermRequest = async({payload}) => {
      const result = await api.post(`/payment-terms`, payload)
      return result.data;
  }

  const deletePaymentTermRequest = async({payload}) => {
      const result = await api.delete(`/payment-terms/${payload}`)
      return result.data;
  }

    
  //=========================
  // CALL(GENERATOR) ACTIONS
  //=========================
  
  function* getAllPaymentTermsData(payload) {
      try {
          const data = yield call(getAllPaymentTermsRequest, payload) 
          yield put(actions.getAllPaymentTermsSuccess(data))
      } catch (error) {
          yield put(actions.getAllPaymentTermsFailure(error))
      }
  }
  
  function* patchPaymentTermData(payload) {
      try {
          const data = yield call(patchPaymentTermRequest, payload)
          yield put(actions.patchPaymentTermSuccess(data))
      } catch (error) {
          yield put(actions.patchPaymentTermFailure(error))
      }
  }

  function* postPaymentTermData(payload) {
      try {
          const data = yield call(postPaymentTermRequest, payload)
          yield put(actions.postPaymentTermSuccess(data))
      } catch (error) {
          yield put(actions.postPaymentTermFailure(error))
      }
  }

  function* deletePaymentTermData(payload) {
      try {
          const data = yield call(deletePaymentTermRequest, payload)
          yield put(actions.deletePaymentTermSuccess(data))
      } catch (error) {
          yield put(actions.deletePaymentTermFailure(error))
      }
  }

  //=======================
  // WATCHER FUNCTIONS
  //=======================
  
  export function* getAllPaymentTermsWatcher() {
      yield takeEvery(types.GET_ALL_PAYMENT_TERMS, getAllPaymentTermsData)
  }

  export function* patchPaymentTermWatcher() {
      yield takeEvery(types.PATCH_PAYMENT_TERM, patchPaymentTermData)
  }
 
  export function* postPaymentTermWatcher() {
      yield takeEvery(types.POST_PAYMENT_TERM, postPaymentTermData)
  }

  export function* deletePaymentTermWatcher() {
      yield takeEvery(types.DELETE_PAYMENT_TERM, deletePaymentTermData)
  }
  

  
  //=======================
  // FORK SAGAS TO STORE
  //=======================
  export default function* rootSaga() {
    yield all([
      fork(getAllPaymentTermsWatcher),
      fork(patchPaymentTermWatcher),
      fork(postPaymentTermWatcher),
      fork(deletePaymentTermWatcher)
    ])
  }