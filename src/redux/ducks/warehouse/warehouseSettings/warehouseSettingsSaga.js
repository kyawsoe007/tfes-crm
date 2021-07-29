import {
    all,
    call,
    fork,
    put,
    takeEvery,
    delay,
    select,
  } from 'redux-saga/effects'
  
  import * as types from './warehouseSettingsTypes'
  import * as actions from './warehouseSettingsActions'
  import api from 'Api'
  
  
  //=========================
  // REQUESTS
  //=========================

  const getAllStockLocationsRequest = async(payload) => {
      const result = await api.get(`/stock-location/get-all-location`);
      return result.data
  }

  const patchStockLocationRequest = async({payload}) => {
      console.log("PAYLOAD", payload)
      const result = await api.patch(`stock-location/update-location/${payload.id}`, payload)
      return result.data
  }
  
  const postStockLocationRequest = async({payload}) => {
      console.log("PAYLOAD", payload)
      const result = await api.post(`stock-location/create-new-location`, payload)
      return result.data;
  }

  const deleteStockLocationRequest = async({payload}) => {
      console.log("PAYLOAD", payload)
      const result = await api.delete(`stock-location/remove-location/${payload}`, payload)
      return result.data;
  }

    
  //=========================
  // CALL(GENERATOR) ACTIONS
  //=========================
  
  function* getAllStockLocationsData(payload) {
      try {
          const data = yield call(getAllStockLocationsRequest, payload) 
          yield put(actions.getAllStockLocationsSuccess(data))
      } catch (error) {
          yield put(actions.getAllStockLocationsFailure(error))
      }
  }
  
  function* patchStockLocationData(payload) {
      try {
          const data = yield call(patchStockLocationRequest, payload)
          yield put(actions.patchStockLocationSuccess(data))
      } catch (error) {
          yield put(actions.patchStockLocationFailure(error))
      }
  }

  function* postStockLocationData(payload) {
      try {
          const data = yield call(postStockLocationRequest, payload)
          yield put(actions.postStockLocationSuccess(data))
      } catch (error) {
          yield put(actions.postStockLocationFailure(error))
      }
  }

  function* deleteStockLocationData(payload) {

        console.log("JUJUJ", payload);
      try {
          const data = yield call(deleteStockLocationRequest, payload)
          yield put(actions.deleteStockLocationSuccess(data))
      } catch (error) {
          yield put(actions.deleteStockLocationFailure(error))
      }
  }

  //=======================
  // WATCHER FUNCTIONS
  //=======================
  
  export function* getAllStockLocationsWatcher() {
      yield takeEvery(types.GET_ALL_STOCK_LOCATIONS, getAllStockLocationsData)
  }

  export function* patchStockLocationWatcher() {
      yield takeEvery(types.PATCH_STOCK_LOCATION, patchStockLocationData)
  }
 
  export function* postStockLocationWatcher() {
      yield takeEvery(types.POST_STOCK_LOCATION, postStockLocationData)
  }

  export function* deleteStockLocationWatcher() {
      yield takeEvery(types.DELETE_STOCK_LOCATION, deleteStockLocationData)
  }
  

  
  //=======================
  // FORK SAGAS TO STORE
  //=======================
  export default function* maintenancetfesSaga() {
    yield all([
      fork(getAllStockLocationsWatcher),
      fork(patchStockLocationWatcher),
      fork(postStockLocationWatcher),
      fork(deleteStockLocationWatcher)
    ])
  }