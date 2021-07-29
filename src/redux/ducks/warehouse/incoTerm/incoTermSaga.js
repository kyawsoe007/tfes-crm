import {
    all,
    call,
    fork,
    put,
    takeEvery,
    delay,
    select,
  } from 'redux-saga/effects'
  
  import * as types from './incoTermTypes'
  import * as actions from './incoTermActions'
  import api from 'Api'
  
  
  //=========================
  // REQUESTS
  //=========================

  const getAllIncoTermsRequest = async(payload) => {
      const result = await api.get(`incoterm`);
      return result.data
  }

  const patchIncoTermRequest = async({payload}) => {
      console.log("PAYLOAD", payload)
      const result = await api.patch(`incoterm/${payload.id}`, payload)
      return result.data
  }
  
  const postIncoTermRequest = async({payload}) => {
      console.log("PAYLOAD", payload)
      const result = await api.post(`incoterm`, payload)
      return result.data;
  }

  const deleteIncoTermRequest = async({payload}) => {
      console.log("PAYLOAD", payload)
      const result = await api.delete(`incoterm/${payload}`)
      return result.data;
  }

    
  //=========================
  // CALL(GENERATOR) ACTIONS
  //=========================
  
  function* getAllIncoTermsData(payload) {
      try {
          const data = yield call(getAllIncoTermsRequest, payload) 
          yield put(actions.getAllIncoTermsSuccess(data))
      } catch (error) {
          yield put(actions.getAllIncoTermsFailure(error))
      }
  }
  
  function* patchIncoTermData(payload) {
      try {
          const data = yield call(patchIncoTermRequest, payload)
          yield put(actions.patchIncoTermSuccess(data))
      } catch (error) {
          yield put(actions.patchIncoTermFailure(error))
      }
  }

  function* postIncoTermData(payload) {
      try {
          const data = yield call(postIncoTermRequest, payload)
          yield put(actions.postIncoTermSuccess(data))
      } catch (error) {
          yield put(actions.postIncoTermFailure(error))
      }
  }

  function* deleteIncoTermData(payload) {
      try {
          const data = yield call(deleteIncoTermRequest, payload)
          yield put(actions.deleteIncoTermSuccess(data))
      } catch (error) {
          yield put(actions.deleteIncoTermFailure(error))
      }
  }

  //=======================
  // WATCHER FUNCTIONS
  //=======================
  
  export function* getAllIncoTermsWatcher() {
      yield takeEvery(types.GET_ALL_INCO_TERMS, getAllIncoTermsData)
  }

  export function* patchIncoTermWatcher() {
      yield takeEvery(types.PATCH_INCO_TERM, patchIncoTermData)
  }
 
  export function* postIncoTermWatcher() {
      yield takeEvery(types.POST_INCO_TERM, postIncoTermData)
  }

  export function* deleteIncoTermWatcher() {
      yield takeEvery(types.DELETE_INCO_TERM, deleteIncoTermData)
  }
  

  
  //=======================
  // FORK SAGAS TO STORE
  //=======================
  export default function* rootSaga() {
    yield all([
      fork(getAllIncoTermsWatcher),
      fork(patchIncoTermWatcher),
      fork(postIncoTermWatcher),
      fork(deleteIncoTermWatcher)
    ])
  }