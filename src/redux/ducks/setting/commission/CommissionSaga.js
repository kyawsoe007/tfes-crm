import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import * as types from "./CommissionTypes";
import * as actions from "./CommissionActions";

import api from "Api";

//=========================
// REQUESTS
//=========================
const getCommissionRequest = async () => {
  const result = await api.get("/commissions");
  return result.data;
};
const createCommissionRequest = async payload => {
  const result = await api.post("/commissions", payload);
  return result.data;
};
const updateCommissionRequest = async ({ id, ...data }) => {
  const result = await api.patch(`/commissions/${id}`, data);
  return result.data;
};
const deleteCommissionRequest = async id => {
  const result = await api.delete(`/commissions/${id}`);
  return result;
};

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getCommission() {
  try {
    const data = yield call(getCommissionRequest);
    yield put(actions.getCommissionSuccess(data));
  } catch (err) {
    yield put(actions.getCommissionFailure(err));
  }
}
function* createCommission({ payload }) {
  try {
    const data = yield call(createCommissionRequest, payload);
    yield put(actions.createCommissionSuccess(data));
  } catch (err) {
    yield put(actions.createCommissionFailure(err));
  }
}
function* updateCommission({ payload }) {
  try {
    const data = yield call(updateCommissionRequest, payload);
    yield put(actions.updateCommissionSuccess(data));
  } catch (err) {
    yield put(actions.updateCommissionFailure(err));
  }
}
function* deleteCommission({ payload }) {
  try {
    yield call(deleteCommissionRequest, payload);
    yield put(actions.deleteCommissionSuccess(payload));
  } catch (err) {
    yield put(actions.deleteCommissionFailure(err));
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* getCommissionWatcher() {
  yield takeEvery(types.GET_COMMISSION, getCommission);
}
export function* createCommissionWatcher() {
  yield takeEvery(types.CREATE_COMMISSION, createCommission);
}
export function* updateCommissionWatcher() {
  yield takeEvery(types.UPDATE_COMMISSION, updateCommission);
}
export function* deleteCommissionWatcher() {
  yield takeEvery(types.DELETE_COMMISSION, deleteCommission);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
    fork(getCommissionWatcher),
    fork(createCommissionWatcher),
    fork(updateCommissionWatcher),
    fork(deleteCommissionWatcher)
  ]);
}
