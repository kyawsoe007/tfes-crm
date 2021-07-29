import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  GET_ACCESSORIES,
  GET_INTERIOR,
  GET_EXTERIOR,
  GET_GRADES
} from "./ConfiguratorTypes";
import * as actions from "./ConfiguratorActions";

import api from "Api";

//=========================
// REQUESTS
//=========================
const getGradeRequest = async () => {
  const result = await api.get("/products/getModel");
  return result.data.fields;
};
const getExteriorRequest = async id => {
  const result = await api.get(`/products/specificVariantExterior/${id}`);
  return result.data.fields.Colors.objects;
};
const getInteriorRequest = async id => {
  const result = await api.get(`/products/specificVariantInterior/${id}`);
  return result.data.fields;
};
const getAccessoriesRequest = async id => {
  const result = await api.get(`/products/specificGradeProductOption/${id}`);
  return result.data.fields;
};

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getGrade() {
  try {
    const data = yield call(getGradeRequest);
    yield put(actions.getGradesSuccess(data));
  } catch (error) {
    yield put(actions.getGradesFailure(error));
  }
}
function* getExterior({ payload }) {
  try {
    const data = yield call(getExteriorRequest, payload);
    yield put(actions.getExteriorSuccess(data));
  } catch (error) {
    yield put(actions.getExteriorFailure(error));
  }
}
function* getInterior({ payload }) {
  try {
    const data = yield call(getInteriorRequest, payload);
    yield put(actions.getInteriorSuccess(data));
  } catch (error) {
    yield put(actions.getInteriorFailure(error));
  }
}
function* getAccessories({ payload }) {
  try {
    const data = yield call(getAccessoriesRequest, payload);
    yield put(actions.getAccessoriesSuccess(data));
  } catch (error) {
    yield put(actions.getAccessoriesFailure(error));
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* getGradeWatcher() {
  yield takeEvery(GET_GRADES, getGrade);
}
export function* getExteriorWatcher() {
  yield takeEvery(GET_EXTERIOR, getExterior);
}
export function* getInteriorWatcher() {
  yield takeEvery(GET_INTERIOR, getInterior);
}
export function* getAccessoriesWatcher() {
  yield takeEvery(GET_ACCESSORIES, getAccessories);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
    fork(getGradeWatcher),
    fork(getExteriorWatcher),
    fork(getInteriorWatcher),
    fork(getAccessoriesWatcher)
  ]);
}
