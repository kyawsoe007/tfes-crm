import {
    all,
    call,
    fork,
    put,
    takeEvery,
    delay,
    select,
  } from 'redux-saga/effects'
  
  import * as types from './payment-methodTypes'
  import * as actions from './payment-methodActions'
  import api from 'Api'
  
  
  //=========================
  // REQUESTS
  //=========================

  const getAllPaymentMethodsRequest = async(payload) => {
      const result = await api.get(`/payment-method`);
      return result.data
  }

  const patchPaymentMethodRequest = async({payload}) => {
      const result = await api.patch(`/payment-method/${payload.id}`, payload)
      console.log('result',result)
      return result.data

  }
  
  const postPaymentMethodRequest = async({payload}) => {
      const result = await api.post(`/payment-method`, payload)
      return result.data;
  }

  const deletePaymentMethodRequest = async({payload}) => {
      const result = await api.delete(`/payment-method/${payload}`)
      return result.data;
  }

    
  //=========================
  // CALL(GENERATOR) ACTIONS
  //=========================
  
  function* getAllPaymentMethodsData(payload) {
      try {
          const data = yield call(getAllPaymentMethodsRequest, payload) 
          yield put(actions.getAllPaymentMethodsSuccess(data))
      } catch (error) {
          yield put(actions.getAllPaymentMethodsFailure(error))
      }
  }
  
  function* patchPaymentMethodData(payload) {
      try {
          const data = yield call(patchPaymentMethodRequest, payload)
          yield put(actions.patchPaymentMethodSuccess(data))
          const datas = yield call(getAllPaymentMethodsRequest, payload) 
          yield put(actions.getAllPaymentMethodsSuccess(datas))
      } catch (error) {
          yield put(actions.patchPaymentMethodFailure(error))
      }
  }

  function* postPaymentMethodData(payload) {
      try {
          const data = yield call(postPaymentMethodRequest, payload)
          yield put(actions.postPaymentMethodSuccess(data))
          const datas = yield call(getAllPaymentMethodsRequest, payload) 
          yield put(actions.getAllPaymentMethodsSuccess(datas))
      } catch (error) {
          yield put(actions.postPaymentMethodFailure(error))
      }
  }

  function* deletePaymentMethodData(payload) {
      try {
          const data = yield call(deletePaymentMethodRequest, payload)
          yield put(actions.deletePaymentMethodSuccess(data))
      } catch (error) {
          yield put(actions.deletePaymentMethodFailure(error))
      }
  }

  //=======================
  // WATCHER FUNCTIONS
  //=======================
  
  export function* getAllPaymentMethodsWatcher() {
      yield takeEvery(types.GET_ALL_PAYMENT_METHODS, getAllPaymentMethodsData)
  }

  export function* patchPaymentMethodWatcher() {
      yield takeEvery(types.PATCH_PAYMENT_METHOD, patchPaymentMethodData)
  }
 
  export function* postPaymentMethodWatcher() {
      yield takeEvery(types.POST_PAYMENT_METHOD, postPaymentMethodData)
  }

  export function* deletePaymentMethodWatcher() {
      yield takeEvery(types.DELETE_PAYMENT_METHOD, deletePaymentMethodData)
  }
  

  
  //=======================
  // FORK SAGAS TO STORE
  //=======================
  export default function* rootSaga() {
    yield all([
      fork(getAllPaymentMethodsWatcher),
      fork(patchPaymentMethodWatcher),
      fork(postPaymentMethodWatcher),
      fork(deletePaymentMethodWatcher)
    ])
  }