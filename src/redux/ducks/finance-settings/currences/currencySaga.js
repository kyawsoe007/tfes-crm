import {
    all,
    call,
    fork,
    put,
    takeEvery,
    delay,
    select,
  } from 'redux-saga/effects'
  
  import * as types from './currencyTypes'
  import * as actions from './currencyActions'
  import api from 'Api'
  
  
  //=========================
  // REQUESTS
  //=========================

  const getAllCurrencesRequest = async(payload) => {
      const result = await api.get(`/currencies/allrates`);
      return result.data
  }

  const patchCurrencyRequest = async({payload}) => {
      const result = await api.patch(`/currencies/${payload.id}`, payload)
      return result.data
  }
  
  const postCurrencyRequest = async({payload}) => {
      const result = await api.post(`/currencies`, payload)
      return result.data;
  }

  const deleteCurrencyRequest = async({payload}) => {
      const result = await api.delete(`/currencies/${payload}`)
      return result.data;
  }
  const getCurrenyRequest = async (id) => {
    const result = await api.get(`/currencies/${id}`)
    return result.data
  }
    
  //=========================
  // CALL(GENERATOR) ACTIONS
  //=========================
  
  function* getAllCurrencesData(payload) {
      try {
          const data = yield call(getAllCurrencesRequest, payload) 
          yield put(actions.getAllCurrencesSuccess(data))
      } catch (error) {
          yield put(actions.getAllCurrencesFailure(error))
      }
  }
  function* getCurrencyeFromDB({ payload }) {
    try {
      const data = yield call(getCurrenyRequest, payload)
      yield put(actions.getCurrencySuccess(data))
    } catch (error) {
      yield put(actions.getCurrencyFailure(error))
    }
  }
  function* patchCurrencyData(payload) {
      try {
          const data = yield call(patchCurrencyRequest, payload)
          yield put(actions.patchCurrencySuccess(data))
      } catch (error) {
          yield put(actions.patchCurrencyFailure(error))
      }
  }

  function* postCurrencyData(payload) {
      try {
          const data = yield call(postCurrencyRequest, payload)
          yield put(actions.postCurrencySuccess(data))
      } catch (error) {
          yield put(actions.postCurrencyFailure(error))
      }
  }

  function* deleteCurrencyData(payload) {
      try {
          const data = yield call(deleteCurrencyRequest, payload)
          yield put(actions.deleteCurrencySuccess(data))
      } catch (error) {
          yield put(actions.deleteCurrencyFailure(error))
      }
  }

  //=======================
  // WATCHER FUNCTIONS
  //=======================
  
  export function* getAllCurrencesWatcher() {
      yield takeEvery(types.GET_ALL_CURRENCES, getAllCurrencesData)
  }

  export function* patchCurrencyWatcher() {
      yield takeEvery(types.PATCH_CURRENCY, patchCurrencyData)
  }
 
  export function* postCurrencyWatcher() {
      yield takeEvery(types.POST_CURRENCY, postCurrencyData)
  }

  export function* deleteCurrencyWatcher() {
      yield takeEvery(types.DELETE_CURRENCY, deleteCurrencyData)
  }
  
  export function* getCurrencyWatcher() {
    yield takeEvery(types.GET_CURRENCY,getCurrencyeFromDB)
}
  
  //=======================
  // FORK SAGAS TO STORE
  //=======================
  export default function* rootSaga() {
    yield all([
      fork(getAllCurrencesWatcher),
      fork(patchCurrencyWatcher),
      fork(postCurrencyWatcher),
        fork(deleteCurrencyWatcher),
        fork(getCurrencyWatcher)
    ])
  }