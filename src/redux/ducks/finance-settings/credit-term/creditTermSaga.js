import {
    all,
    call,
    fork,
    put,
    takeEvery,
    delay,
    select,
  } from 'redux-saga/effects'
  
  import * as types from './creditTermTypes'
  import * as actions from './creditTermActions'
  import api from 'Api'
  
  
  //=========================
  // REQUESTS
  //=========================

  const getAllCreditTermsRequest = async(payload) => {
      const result = await api.get(`/credit-term`);
      return result.data
  }

  const patchCreditTermRequest = async({payload}) => {
      console.log("PAYLOAD", payload)
      const result = await api.patch(`/credit-term/${payload.id}`, payload)
      return result.data
  }
  
  const postCreditTermRequest = async({payload}) => {
      console.log("PAYLOAD", payload)
      const result = await api.post(`/credit-term`, payload)
      return result.data;
  }

  const deleteCreditTermRequest = async({payload}) => {
      console.log("PAYLOAD", payload)
      const result = await api.delete(`/credit-term/${payload}`)
      return result.data;
  }

    
  //=========================
  // CALL(GENERATOR) ACTIONS
  //=========================
  
  function* getAllCreditTermsData(payload) {
      try {
          const data = yield call(getAllCreditTermsRequest, payload) 
          yield put(actions.getAllCreditTermsSuccess(data))
      } catch (error) {
          yield put(actions.getAllCreditTermsFailure(error))
      }
  }
  
  function* patchCreditTermData(payload) {
      try {
          const data = yield call(patchCreditTermRequest, payload)
          yield put(actions.patchCreditTermSuccess(data))
      } catch (error) {
          yield put(actions.patchCreditTermFailure(error))
      }
  }

  function* postCreditTermData(payload) {
      try {
          const data = yield call(postCreditTermRequest, payload)
          yield put(actions.postCreditTermSuccess(data))
      } catch (error) {
          yield put(actions.postCreditTermFailure(error))
      }
  }

  function* deleteCreditTermData(payload) {
      try {
          const data = yield call(deleteCreditTermRequest, payload)
          yield put(actions.deleteCreditTermSuccess(data))
      } catch (error) {
          yield put(actions.deleteCreditTermFailure(error))
      }
  }

  //=======================
  // WATCHER FUNCTIONS
  //=======================
  
  export function* getAllCreditTermsWatcher() {
      yield takeEvery(types.GET_ALL_CREDIT_TERMS, getAllCreditTermsData)
  }

  export function* patchCreditTermWatcher() {
      yield takeEvery(types.PATCH_CREDIT_TERM, patchCreditTermData)
  }
 
  export function* postCreditTermWatcher() {
      yield takeEvery(types.POST_CREDIT_TERM, postCreditTermData)
  }

  export function* deleteCreditTermWatcher() {
      yield takeEvery(types.DELETE_CREDIT_TERM, deleteCreditTermData)
  }
  

  
  //=======================
  // FORK SAGAS TO STORE
  //=======================
  export default function* rootSaga() {
    yield all([
      fork(getAllCreditTermsWatcher),
      fork(patchCreditTermWatcher),
      fork(postCreditTermWatcher),
      fork(deleteCreditTermWatcher)
    ])
  }