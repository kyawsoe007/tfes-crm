import {
    all,
    call,
    fork,
    put,
    takeEvery,
    delay,
    select,
  } from 'redux-saga/effects'
  
  import * as types from './MaintenancetfesTypes'
  import * as actions from './MaintenancetfesActions'
  import api from 'Api'
  
  
  //=========================
  // REQUESTS
  //=========================
  
  const getAllUserRolesRequest = async(payload) => {
    const result = await api.get(`/access-rights`);
    console.log("DATAAAAA", result);
    return result.data;
  }

  const postUserRoleRequest = async({payload}) => {
    const result = await api.post(`/access-rights`, payload)
    console.log("PAYLOAD", payload);
    return result.data;
  }

  const getUserRoleRequest = async(payload) => {
    const result = await api.get(`/access-rights/${payload.id}`, payload)
    // console.log("PAYLOAD", payload);
    return result.data;
  }
 
  
  const patchUserRoleRequest = async({payload}) => {
    const result = await api.patch(`/access-rights/${payload.id}`, payload)
    console.log("PAYLOAD", payload);
    return result.data;
  }

  const deleteUserRoleRequest = async({payload}) => {
    const result = await api.delete(`/access-rights/${payload}`)
    console.log("PAYLOAD DELETE", payload);
    return result.data;
  }
    
  //=========================
  // CALL(GENERATOR) ACTIONS
  //=========================
  
  
  function* getAllUserRolesData(payload) {
    try {
        // console.log("ASDASDSDSD", payload)
        const data = yield call(getAllUserRolesRequest, payload)
        yield put(actions.getAllUserRolesSuccess(data))
    } catch (error) {
        yield put(actions.getAllUserRolesFailure(error))
    }
  }

  function* postUserRoleData(payload) {
    try {
        // console.log("ASDASDSDSD", payload)
        const data = yield call(postUserRoleRequest, payload)
        yield put(actions.postUserRoleSuccess(data))
    } catch (error) {
        yield put(actions.postUserRoleFailure(error))
    }
  }

  function* getUserRoleData(payload) {
    try {
        // console.log("ASDASDSDSD", payload)
        const data = yield call(getUserRoleRequest, payload)
        yield put(actions.getUserRoleSuccess(data))
    } catch (error) {
        yield put(actions.getUserRoleFailure(error))
    }
  }

  function* patchUserRoleData(payload) {
    try {
        // console.log("ASDASDSDSD", payload)
        const data = yield call(patchUserRoleRequest, payload)
        yield put(actions.patchUserRoleSuccess(data))
    } catch (error) {
        yield put(actions.patchUserRoleFailure(error))
    }
  }
 
  function* deleteUserRoleData(payload) {
    try {
        // console.log("ASDASDSDSD", payload)
        const data = yield call(deleteUserRoleRequest, payload)
        yield put(actions.deleteUserRoleSuccess(data))
    } catch (error) {
        yield put(actions.deleteUserRoleFailure(error))
    }
  }
  
  //=======================
  // WATCHER FUNCTIONS
  //=======================
  
  export function* getAllUserRolesWatcher() {
    yield takeEvery(types.GET_ALL_USER_ROLES, getAllUserRolesData)
  }

  export function* postUserRoleWatcher() {
    yield takeEvery(types.POST_USER_ROLE, postUserRoleData)
  }

  export function* getUserRoleWatcher() {
    yield takeEvery(types.GET_USER_ROLE, getUserRoleData)
  }

  export function* patchUserRoleWatcher() {
    yield takeEvery(types.PATCH_USER_ROLE, patchUserRoleData)
  }

  export function* deleteUserRoleWatcher() {
    yield takeEvery(types.DELETE_USER_ROLE, deleteUserRoleData)
  }


  
  //=======================
  // FORK SAGAS TO STORE
  //=======================
  export default function* maintenancetfesSaga() {
    yield all([
      fork(getAllUserRolesWatcher),
      fork(postUserRoleWatcher),
      fork(getUserRoleWatcher),
      fork(patchUserRoleWatcher),
      fork(deleteUserRoleWatcher),
    ])
  }