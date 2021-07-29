import {
    all,
    call,
    fork,
    put,
    takeEvery,
    delay,
    select,
  } from 'redux-saga/effects'
  
  import * as types from './sale-targetTypes'
  import * as actions from './sale-targetActions'
  import api from 'Api'
  
  
  //=========================
  // REQUESTS
  //=========================

  const getAllSaleTargetsRequest = async(payload) => {
      const result = await api.get(`/sale-target`);
      return result.data
}
const getAllPerformsRequest = async(payload) => {
    const result = await api.get(`/sale-target/dashboard`);
    return result.data
}
  const patchSaleTargetRequest = async({payload}) => {
      const result = await api.patch(`/sale-target/${payload.id}`, payload)
      return result.data
  }
  
  const postSaleTargetRequest = async({payload}) => {
      const result = await api.post(`/sale-target`, payload)
      return result.data;
  }

  const deleteSaleTargetRequest = async({payload}) => {
      const result = await api.delete(`/sale-target/${payload}`)
      return result.data;
  }
//   /api/approval-rights/get-approval-right/{id}
    
  //=========================
  // CALL(GENERATOR) ACTIONS
  //=========================
  
  function* getAllSaleTargetsData(payload) {
      try {
          const data = yield call(getAllSaleTargetsRequest, payload) 
          yield put(actions.getAllSaleTargetsSuccess(data))
      } catch (error) {
          yield put(actions.getAllSaleTargetsFailure(error))
      }
}
function* getAllPerformsData(payload) {
    try {
        const data = yield call(getAllPerformsRequest, payload) 
        yield put(actions.getPerformSuccess(data))
    } catch (error) {
        yield put(actions.getPerformFailure(error))
    }
}

  
  function* patchSaleTargetData(payload) {
      try {
          const data = yield call(patchSaleTargetRequest, payload)
          yield put(actions.patchSaleTargetSuccess(data))
      } catch (error) {
          yield put(actions.patchSaleTargetFailure(error))
      }
  }

  function* postSaleTargetData(payload) {
      try {
          const data = yield call(postSaleTargetRequest, payload)
          yield put(actions.postSaleTargetSuccess(data))
      } catch (error) {
          yield put(actions.postSaleTargetFailure(error))
      }
  }

  function* deleteSaleTargetData(payload) {
      try {
          const data = yield call(deleteSaleTargetRequest, payload)
          yield put(actions.deleteSaleTargetSuccess(data))
      } catch (error) {
          yield put(actions.deleteSaleTargetFailure(error))
      }
  }

  //=======================
  // WATCHER FUNCTIONS
  //=======================
  
  export function* getAllSaleTargetsWatcher() {
      yield takeEvery(types.GET_ALL_SALE_TARGETS, getAllSaleTargetsData)
}
  
  export function* patchSaleTargetWatcher() {
      yield takeEvery(types.PATCH_SALE_TARGET, patchSaleTargetData)
  }
 
  export function* postSaleTargetWatcher() {
      yield takeEvery(types.POST_SALE_TARGET, postSaleTargetData)
  }

  export function* deleteSaleTargetWatcher() {
      yield takeEvery(types.DELETE_SALE_TARGET, deleteSaleTargetData)
  }

  export function* getAllPerformsWatcher() {
    yield takeEvery(types.GET_PERFORM, getAllPerformsData)
}
  

  
  //=======================
  // FORK SAGAS TO STORE
  //=======================
  export default function* rootSaga() {
    yield all([
      fork(getAllSaleTargetsWatcher),
      fork(patchSaleTargetWatcher),
      fork(postSaleTargetWatcher),
        fork(deleteSaleTargetWatcher),
        fork(getAllPerformsWatcher)
    ])
  }