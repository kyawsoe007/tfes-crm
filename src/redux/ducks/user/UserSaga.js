import { all, call, fork, put, takeEvery, delay, select } from "redux-saga/effects";

import * as types from "./UserTypes";
import * as actions from "./UserActions";
import api from "Api";

//=========================
// REQUESTS
//=========================
const getUser = async () => {
  const data = await api.get(`/users/findAllUsers`)
  return data;
}

const createUser = async (payload) => {
  const result = await api.post(`/users/register`, payload);
  console.log('hi', result)
  return result.data;
};

const updatePassword = async (payload) => {
  const result = await api.patch(`/users/change-password`, payload);
  return result.data;
};

// Delete
const deleteUser = async (id) => {

  const result = await api.delete(`/users/${id}`);
  return result.data;
};

const patchUser = async (data) => {
  console.log(data);
  const result = await api.patch(`/users/${data.id}`, data);
  return result.data;
};
const getOneUser = async (id) => {
  const result = await api.get(`users/findOnePics/${id}`);
  return result.data
}
const getPicUser = async () => {
  const data = await api.get('/users/findAllPics');
  return data;
}

const getUserProfile = async () => {
  const data = await api.get(`/users/myProfile`)
  return data.data;
}

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getUserData(e) {
  try {
    const data = yield call(getUser, e);
    yield put(actions.getuserSuccess(data));
  } catch (error) {
    yield put(actions.getuserFailure(error));
  }
}

function* getUserProfileData(e) {
  try {
    const data = yield call(getUserProfile, e);
    yield put(actions.getUserProfileSuccess(data));
  } catch (error) {
    yield put(actions.getUserProfileFailure(error));
  }
}
function* getOneUserData({ payload }) {
  try {
    const data = yield call(getOneUser, payload);
    console.log('data', data)
    yield put(actions.getOneUserSuccess(data));
  } catch (error) {
    yield put(actions.getOneUserFailure(error));
  }
}

function* createUserData({ payload }) {
  try {
    const data = yield call(createUser, payload);
    yield put(actions.createUserSuccess(data));
    yield put(actions.getuser())
  } catch (error) {
    yield put(actions.createUserFailure(error));
  }
}
function* updatePasswordData({ payload }) {
  try {
    const data = yield call(updatePassword, payload);
    yield put(actions.UpdatePasswordSuccess(data));
  } catch (error) {
    yield put(actions.UpdatePasswordFailure(error));
  }
}

function* deleteUserData({ payload }) {

  console.log("PAYLOAD", payload)
  try {
    const data = yield call(deleteUser, payload);
    // yield delay(500);
    yield put(actions.deleteUserSuccess(data));
    yield put(actions.getuser())
  } catch (error) {
    yield put(actions.deleteUserFailure(error));
  }
}

function* patchSingleUser({ payload }) {

  // console.log("HEYYYYYYYY", payload)
  try {
    const data = yield call(patchUser, payload);
    yield put(actions.patchUserSuccess(data));
    yield put(actions.getuser())
    //   yield put(actions.getSingleUserRequest(payload.id)) 
  } catch (error) {
    yield put(actions.patchUserFailure(error));
  }
}
function* getAllPicUsers() {
  try {
    const data = yield call(getPicUser);
    yield put(actions.getPicUserSuccess(data));
  } catch (error) {
    yield put(actions.getPicUserFailure(error));
  }
}

//Export function with takeEvery
export function* getAllUserWatcher() {
  yield takeEvery(types.GET_USER, getUserData);
}
export function* createUserWatcher() {
  yield takeEvery(types.CREATE_USER, createUserData);
}
export function* updatePasswordWatcher() {
  yield takeEvery(types.UPDATE_PASSWORD, updatePasswordData);
}
export function* patchUserWatcher() {
  yield takeEvery(types.PATCH_USER, patchSingleUser);
}
export function* deleteUserWatcher() {
  yield takeEvery(types.DELETE_USER, deleteUserData);
}
export function* getOneUserWatcher() {
  yield takeEvery(types.GET_ONE_USER, getOneUserData)
}
export function* getUserProfileWatcher() {
  yield takeEvery(types.USER_PROFILE, getUserProfileData)
}
export function* getAllPicUserWatcher() {
  yield takeEvery(types.GET_PIC_USER, getAllPicUsers);
}

//Export function with fork
export default function* UserSaga() {
  yield all([
    fork(getAllUserWatcher),
    fork(createUserWatcher),
    fork(patchUserWatcher),
    fork(deleteUserWatcher),
    fork(getOneUserWatcher),
    fork(updatePasswordWatcher),
    fork(getUserProfileWatcher),
    fork(getAllPicUserWatcher)
  ])
}