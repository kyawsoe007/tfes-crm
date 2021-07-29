import {
    all,
    call,
    fork,
    put,
    takeEvery,
    delay,
    select,
  } from 'redux-saga/effects'
  
  import * as types from './approval-rightTypes'
  import * as actions from './approval-rightActions'
  import api from 'Api'
  
  
  //=========================
  // REQUESTS
  //=========================

  const getAllApprovalRightsRequest = async(payload) => {
      const result = await api.get(`/approval-rights/get-all-approval-rights`);
      return result.data
}
  
const getAllDeliveryApprovalRightsRequest = async(payload) => {
    const result = await api.get(`/approval-rights/get-all-delivery-approval-rights`);
    return result.data
}

  const patchApprovalRightRequest = async({payload}) => {
      const result = await api.patch(`/approval-rights/update-approval-right/${payload.id}`, payload)
      return result.data
  }
  
  const postApprovalRightRequest = async({payload}) => {
      const result = await api.post(`/approval-rights/create-new-approval-right`, payload)
      return result.data;
  }

  const deleteApprovalRightRequest = async({payload}) => {
      const result = await api.delete(`/approval-rights/remove-approval-right/${payload}`)
      return result.data;
  }
//   /api/approval-rights/get-approval-right/{id}
    
  //=========================
  // CALL(GENERATOR) ACTIONS
  //=========================
  
  function* getAllApprovalRightsData(payload) {
      try {
          const data = yield call(getAllApprovalRightsRequest, payload) 
          yield put(actions.getAllApprovalRightsSuccess(data))
      } catch (error) {
          yield put(actions.getAllApprovalRightsFailure(error))
      }
}
  
function* getAllDeliveryApprovalRightsData(payload) {
    try {
        const data = yield call(getAllDeliveryApprovalRightsRequest, payload) 
        yield put(actions.getAllDeliveryApprovalRightsSuccess(data))
    } catch (error) {
        yield put(actions.getAllDeliveryApprovalRightsFailure(error))
    }
}
  
  function* patchApprovalRightData(payload) {
      try {
          const data = yield call(patchApprovalRightRequest, payload)
          yield put(actions.patchApprovalRightSuccess(data))
      } catch (error) {
          yield put(actions.patchApprovalRightFailure(error))
      }
  }

  function* postApprovalRightData(payload) {
      try {
          const data = yield call(postApprovalRightRequest, payload)
          yield put(actions.postApprovalRightSuccess(data))
      } catch (error) {
          yield put(actions.postApprovalRightFailure(error))
      }
  }

  function* deleteApprovalRightData(payload) {
      try {
          const data = yield call(deleteApprovalRightRequest, payload)
          yield put(actions.deleteApprovalRightSuccess(data))
      } catch (error) {
          yield put(actions.deleteApprovalRightFailure(error))
      }
  }

  //=======================
  // WATCHER FUNCTIONS
  //=======================
  
  export function* getAllApprovalRightsWatcher() {
      yield takeEvery(types.GET_ALL_APPROVAL_RIGHTS, getAllApprovalRightsData)
}
export function* getAllDeliveryApprovalRightsWatcher() {
    yield takeEvery(types.GET_ALL_DELIVERY_APPROVAL_RIGHTS, getAllDeliveryApprovalRightsData)
}
  
  export function* patchApprovalRightWatcher() {
      yield takeEvery(types.PATCH_APPROVAL_RIGHT, patchApprovalRightData)
  }
 
  export function* postApprovalRightWatcher() {
      yield takeEvery(types.POST_APPROVAL_RIGHT, postApprovalRightData)
  }

  export function* deleteApprovalRightWatcher() {
      yield takeEvery(types.DELETE_APPROVAL_RIGHT, deleteApprovalRightData)
  }
  

  
  //=======================
  // FORK SAGAS TO STORE
  //=======================
  export default function* rootSaga() {
    yield all([
      fork(getAllApprovalRightsWatcher),
      fork(patchApprovalRightWatcher),
      fork(postApprovalRightWatcher),
        fork(deleteApprovalRightWatcher),
      fork(getAllDeliveryApprovalRightsWatcher)
    ])
  }