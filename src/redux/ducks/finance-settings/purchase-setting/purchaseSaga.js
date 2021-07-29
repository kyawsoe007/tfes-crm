import {
    all,
    call,
    fork,
    put,
    takeEvery,
    delay,
    select,
  } from 'redux-saga/effects'
  
  import * as types from './purchaseTypes'
  import * as actions from './purchaseActions'
  import api from 'Api'
  
  
  //=========================
  // REQUESTS
  //=========================

  const getAllPurchaseSettingsRequest = async(payload) => {
      const result = await api.get(`/purchase-setting`);
      return result.data
  }

  const patchPurchaseSettingRequest = async({payload}) => {
      const result = await api.patch(`/purchase-setting/${payload.id}`, payload)
      return result.data
  }
  
  const postPurchaseSettingRequest = async({payload}) => {
      const result = await api.post(`/purchase-setting`, payload)
      return result.data;
  }

  const deletePurchaseSettingRequest = async({payload}) => {
      const result = await api.delete(`/purchase-setting/${payload}`)
      return result.data;
  }

    
  //=========================
  // CALL(GENERATOR) ACTIONS
  //=========================
  
  function* getAllPurchaseSettingsData(payload) {
      try {
          const data = yield call(getAllPurchaseSettingsRequest, payload) 
          yield put(actions.getAllPurchaseSettingsSuccess(data))
      } catch (error) {
          yield put(actions.getAllPurchaseSettingsFailure(error))
      }
  }
  
  function* patchPurchaseSettingData(payload) {
      try {
          const data = yield call(patchPurchaseSettingRequest, payload)
          yield put(actions.patchPurchaseSettingSuccess(data))
          const datas = yield call(getAllPurchaseSettingsRequest, payload) 
          yield put(actions.getAllPurchaseSettingsSuccess(datas))
      } catch (error) {
          yield put(actions.patchPurchaseSettingFailure(error))
      }
  }

  function* postPurchaseSettingData(payload) {
      try {
          const data = yield call(postPurchaseSettingRequest, payload)
          yield put(actions.postPurchaseSettingSuccess(data))
          const datas = yield call(getAllPurchaseSettingsRequest, payload) 
          yield put(actions.getAllPurchaseSettingsSuccess(datas))
      } catch (error) {
          yield put(actions.postPurchaseSettingFailure(error))
      }
  }

  function* deletePurchaseSettingData(payload) {
      try {
          const data = yield call(deletePurchaseSettingRequest, payload)
          yield put(actions.deletePurchaseSettingSuccess(data))
      } catch (error) {
          yield put(actions.deletePurchaseSettingFailure(error))
      }
  }

  //=======================
  // WATCHER FUNCTIONS
  //=======================
  
  export function* getAllPurchaseSettingsWatcher() {
      yield takeEvery(types.GET_ALL_PURCHASE_SETTINGS, getAllPurchaseSettingsData)
  }

  export function* patchPurchaseSettingWatcher() {
      yield takeEvery(types.PATCH_PURCHASE_SETTING, patchPurchaseSettingData)
  }
 
  export function* postPurchaseSettingWatcher() {
      yield takeEvery(types.POST_PURCHASE_SETTING, postPurchaseSettingData)
  }

  export function* deletePurchaseSettingWatcher() {
      yield takeEvery(types.DELETE_PURCHASE_SETTING, deletePurchaseSettingData)
  }
  

  
  //=======================
  // FORK SAGAS TO STORE
  //=======================
  export default function* rootSaga() {
    yield all([
      fork(getAllPurchaseSettingsWatcher),
      fork(patchPurchaseSettingWatcher),
      fork(postPurchaseSettingWatcher),
      fork(deletePurchaseSettingWatcher)
    ])
  }