import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import * as types from "./RentalTypes";
import * as actions from "./RentalActions";

import api from "Api";

//=========================
// REQUESTS
//=========================
const getRentalRequest = async () => {
  const result = await api.get(`/rentalCars`);
  return result.data;
};
const createRentalRequest = async data => {
  const result = await api.post(`/rentalCars/new`, data);
  return result.data.data;
};
const getRentalCatRequest = async () => {
  const result = await api.get("/rentalCarCategories");
  return result.data;
};
const deleteRentalCarRequest = async id => {
  const result = await api.delete(`/rentalCars/${id}`);
  return result.data;
};
const updateRentalCarRequest = async ({ id, data }) => {
  const result = await api.patch(`/rentalCars/edit/${id}`, data);
  return result.data.data;
};

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getRental() {
  try {
    const data = yield call(getRentalRequest);
    yield put(actions.getRentalCarSuccess(data));
  } catch (error) {
    yield put(actions.getRentalCarFailure(error));
  }
}
function* createRental({ payload }) {
  try {
    const data = yield call(createRentalRequest, payload);
    yield put(actions.createRentalCarSuccess(data));
  } catch (error) {
    yield put(actions.createRentalCarFailure(error));
  }
}
function* getRentalCat() {
  try {
    const data = yield call(getRentalCatRequest);
    yield put(actions.getRentalCategorySuccess(data));
  } catch (error) {
    yield put(actions.getRentalCategoryFailure(error));
  }
}
function* deleteRentalCar({ payload }) {
  try {
    yield call(deleteRentalCarRequest, payload);
    yield put(actions.deleteRentalCarSuccess(payload));
  } catch (error) {
    yield put(actions.deleteRentalCarFailure(error));
  }
}
function* updateRentalCar({ payload }) {
  try {
    const data = yield call(updateRentalCarRequest, payload);
    yield put(actions.updateRentalCarSuccess(data));
  } catch (error) {
    yield put(actions.updateRentalCarFailure(error));
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* getRentalWatcher() {
  yield takeEvery(types.GET_RENTAL_CAR, getRental);
}
export function* createRentalWatcher() {
  yield takeEvery(types.CREATE_RENTAL_CAR, createRental);
}
export function* getRentalCatWatcher() {
  yield takeEvery(types.GET_RENTAL_CATEGORY, getRentalCat);
}
export function* deleteRentalCarWatcher() {
  yield takeEvery(types.DELETE_RENTAL_CAR, deleteRentalCar);
}
export function* updateRentalCarWatcher() {
  yield takeEvery(types.UPDATE_RENTAL_CAR, updateRentalCar);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
    fork(getRentalWatcher),
    fork(createRentalWatcher),
    fork(getRentalCatWatcher),
    fork(deleteRentalCarWatcher),
    fork(updateRentalCarWatcher)
  ]);
}
