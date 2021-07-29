import {
    all,
    call,
    fork,
    put,
    takeEvery,
    delay,
    select,
  } from 'redux-saga/effects'
  
  import * as types from './account-journalTypes'
  import * as actions from './account-journalActions'
  import api from 'Api'
  
  
  //=========================
  // REQUESTS
  //=========================

  const getAllAccountJournalsRequest = async(payload) => {
      const result = await api.get(`/account-journal`);
      return result.data
  }

  const patchAccountJournalRequest = async({payload}) => {
      console.log("PAYLOAD", payload)
      const result = await api.patch(`/account-journal/${payload.id}`, payload)
      return result.data
  }
  
  const postAccountJournalRequest = async({payload}) => {
      console.log("PAYLOAD", payload)
      const result = await api.post(`/account-journal`, payload)
      return result.data;
  }

  const deleteAccountJournalRequest = async({payload}) => {
      console.log("PAYLOAD", payload)
      const result = await api.delete(`/account-journal/${payload}`)
      return result.data;
  }

    
  //=========================
  // CALL(GENERATOR) ACTIONS
  //=========================
  
  function* getAllAccountJournalsData(payload) {
      try {
          const data = yield call(getAllAccountJournalsRequest, payload) 
          yield put(actions.getAllAccountJournalsSuccess(data))
      } catch (error) {
          yield put(actions.getAllAccountJournalsFailure(error))
      }
  }
  
  function* patchAccountJournalData(payload) {
      try {
          const data = yield call(patchAccountJournalRequest, payload)
          yield put(actions.patchAccountJournalSuccess(data))
      } catch (error) {
          yield put(actions.patchAccountJournalFailure(error))
      }
  }

  function* postAccountJournalData(payload) {
      try {
          const data = yield call(postAccountJournalRequest, payload)
          yield put(actions.postAccountJournalSuccess(data))
      } catch (error) {
          yield put(actions.postAccountJournalFailure(error))
      }
  }

  function* deleteAccountJournalData(payload) {
      try {
          const data = yield call(deleteAccountJournalRequest, payload)
          yield put(actions.deleteAccountJournalSuccess(data))
      } catch (error) {
          yield put(actions.deleteAccountJournalFailure(error))
      }
  }

  //=======================
  // WATCHER FUNCTIONS
  //=======================
  
  export function* getAllAccountJournalsWatcher() {
      yield takeEvery(types.GET_ALL_ACCOUNT_JOURNALS, getAllAccountJournalsData)
  }

  export function* patchAccountJournalWatcher() {
      yield takeEvery(types.PATCH_ACCOUNT_JOURNAL, patchAccountJournalData)
  }
 
  export function* postAccountJournalWatcher() {
      yield takeEvery(types.POST_ACCOUNT_JOURNAL, postAccountJournalData)
  }

  export function* deleteAccountJournalWatcher() {
      yield takeEvery(types.DELETE_ACCOUNT_JOURNAL, deleteAccountJournalData)
  }
  

  
  //=======================
  // FORK SAGAS TO STORE
  //=======================
  export default function* rootSaga() {
    yield all([
      fork(getAllAccountJournalsWatcher),
      fork(patchAccountJournalWatcher),
      fork(postAccountJournalWatcher),
      fork(deleteAccountJournalWatcher)
    ])
  }