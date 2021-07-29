import {
    all,
    call,
    fork,
    put,
    takeEvery,
    delay,
    select,
  } from 'redux-saga/effects'
  
  import * as types from './CapexTypes'
  import * as actions from './CapexActions'
  import api from 'Api'
  
  
  //=========================
  // REQUESTS
  //=========================

  const getAllCapexsRequest = async(payload) => {
      const result = await api.get(`/capex-management`);
      return result.data
}
  
const getCapexsRequest = async(payload) => {
    const result = await api.get(`/capex-management/${payload}`);
    return result.data
}

  const patchCapexRequest = async({payload}) => {
      const result = await api.patch(`/capex-management/${payload.id}`, payload)
      return result.data
  }
  
  const postCapexRequest = async({payload}) => {
      const result = await api.post(`/capex-management`, payload)
      return result.data;
  }

  const deleteCapexRequest = async({payload}) => {
      const result = await api.delete(`/capex-management/${payload}`)
      return result.data;
  }

    
  //=========================
  // CALL(GENERATOR) ACTIONS
  //=========================
  
  function* getAllCapexsData(payload) {
      try {
          const data = yield call(getAllCapexsRequest, payload) 
          yield put(actions.getAllCapexsSuccess(data))
      } catch (error) {
          yield put(actions.getAllCapexsFailure(error))
      }
}
  
function* getSingleCapexFromDB({ payload }) {
    try {
      const data = yield call(getCapexsRequest, payload)
      yield put(actions.getCapexSuccess(data))
    } catch (error) {
      yield put(actions.getCapexFailure(error))
    }
  }
  
  function* patchCapexData(payload) {
      try {
          const data = yield call(patchCapexRequest, payload)
          yield put(actions.patchCapexSuccess(data))
      } catch (error) {
          yield put(actions.patchCapexFailure(error))
      }
  }

  function* postCapexData(payload) {
      try {
          const data = yield call(postCapexRequest, payload)
          yield put(actions.postCapexSuccess(data))
      } catch (error) {
          yield put(actions.postCapexFailure(error))
      }
  }

  function* deleteCapexData(payload) {
      try {
          const data = yield call(deleteCapexRequest, payload)
          yield put(actions.deleteCapexSuccess(data))
      } catch (error) {
          yield put(actions.deleteCapexFailure(error))
      }
  }

  //=======================
  // WATCHER FUNCTIONS
  //=======================
  
  export function* getAllCapexsWatcher() {
      yield takeEvery(types.GET_ALL_CAPEXS, getAllCapexsData)
  }

  export function* patchCapexWatcher() {
      yield takeEvery(types.PATCH_CAPEX, patchCapexData)
  }
 
  export function* postCapexWatcher() {
      yield takeEvery(types.POST_CAPEX, postCapexData)
  }

  export function* deleteCapexWatcher() {
      yield takeEvery(types.DELETE_CAPEX, deleteCapexData)
}
export function* getCapexWatcher() {
    yield takeEvery(types.GET_CAPEX, getSingleCapexFromDB)
}
  

  
  //=======================
  // FORK SAGAS TO STORE
  //=======================
  export default function* rootSaga() {
    yield all([
      fork(getAllCapexsWatcher),
      fork(patchCapexWatcher),
      fork(postCapexWatcher),
        fork(deleteCapexWatcher),
      fork(getCapexWatcher)
    ])
  }