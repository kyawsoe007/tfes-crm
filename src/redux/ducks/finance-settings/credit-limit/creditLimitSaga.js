import {
    all,
    call,
    fork,
    put,
    takeEvery,
    delay,
    select,
  } from 'redux-saga/effects'
  
  import * as types from './creditLimitTypes'
  import * as actions from './creditLimitActions'
  import api from 'Api'
  
  
  //=========================
  // REQUESTS
  //=========================

  const getAllCreditLimitsRequest = async(payload) => {
      const result = await api.get(`/credit-limit`);
      return result.data
  }

  const patchCreditLimitRequest = async({payload}) => {
      console.log("PAYLOAD", payload)
      const result = await api.patch(`/credit-limit/${payload.id}`, payload)
      return result.data
  }
  
  const postCreditLimitRequest = async({payload}) => {
      console.log("PAYLOAD", payload)
      const result = await api.post(`/credit-limit`, payload)
      return result.data;
  }

  const deleteCreditLimitRequest = async({payload}) => {
      console.log("PAYLOAD", payload)
      const result = await api.delete(`/credit-limit/${payload}`)
      return result.data;
  }

    
  //=========================
  // CALL(GENERATOR) ACTIONS
  //=========================
  
  function* getAllCreditLimitsData(payload) {
      try {
          const data = yield call(getAllCreditLimitsRequest, payload) 
          yield put(actions.getAllCreditLimitsSuccess(data))
      } catch (error) {
          yield put(actions.getAllCreditLimitsFailure(error))
      }
  }
  
  function* patchCreditLimitData(payload) {
      try {
          const data = yield call(patchCreditLimitRequest, payload)
          yield put(actions.patchCreditLimitSuccess(data))
      } catch (error) {
          yield put(actions.patchCreditLimitFailure(error))
      }
  }

  function* postCreditLimitData(payload) {
      try {
          const data = yield call(postCreditLimitRequest, payload)
          yield put(actions.postCreditLimitSuccess(data))
      } catch (error) {
          yield put(actions.postCreditLimitFailure(error))
      }
  }

  function* deleteCreditLimitData(payload) {
      try {
          const data = yield call(deleteCreditLimitRequest, payload)
          yield put(actions.deleteCreditLimitSuccess(data))
      } catch (error) {
          yield put(actions.deleteCreditLimitFailure(error))
      }
  }

  //=======================
  // WATCHER FUNCTIONS
  //=======================
  
  export function* getAllCreditLimitsWatcher() {
      yield takeEvery(types.GET_ALL_CREDIT_LIMITS, getAllCreditLimitsData)
  }

  export function* patchCreditLimitWatcher() {
      yield takeEvery(types.PATCH_CREDIT_LIMIT, patchCreditLimitData)
  }
 
  export function* postCreditLimitWatcher() {
      yield takeEvery(types.POST_CREDIT_LIMIT, postCreditLimitData)
  }

  export function* deleteCreditLimitWatcher() {
      yield takeEvery(types.DELETE_CREDIT_LIMIT, deleteCreditLimitData)
  }
  

  
  //=======================
  // FORK SAGAS TO STORE
  //=======================
  export default function* rootSaga() {
    yield all([
      fork(getAllCreditLimitsWatcher),
      fork(patchCreditLimitWatcher),
      fork(postCreditLimitWatcher),
      fork(deleteCreditLimitWatcher)
    ])
  }