import { all, call, fork, put, takeEvery, delay, select } from "redux-saga/effects";

import * as types from "./SuppliertfesTypes";
import * as actions from "./SuppliertfesActions";
import api from "Api";

//=========================
// REQUESTS
//=========================
const getSupplierRequest = async (payload) => {
  const data = await api.get(`/suppliers/allsupplies`);
  return data;
};

const setSupplierRequest = async (payload) => {
  const result = await api.post(`/supplier`, payload);
  return result.data;
};

// Delete
const deleteSupplierRequest = async (id) => {
  
  const result = await api.delete(`/supplier/${id}`);
  return result.data;
};

const getSupplierDetailsRequest = async () => {
  const data = await api.get(`/supplier/getAllDetails`); // supplier/getAllDetails
  return data;
};

const getFilterSupplierRequest = async ({
  limit,
  skip,
  filter,
  searchText,
  orderBy,
}) => {
  const result = await api.post("/supplier/getfilters", {
    limit: limit,
    skip: skip,
    filter: filter,
    searchText: searchText,
    orderBy: orderBy,
  });
  return result.data;
};

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getSupplierData(e) {
  try {
    const data = yield call(getSupplierRequest, e);
    yield put(actions.getSupplierSuccess(data));
  } catch (error) {
    yield put(actions.getSupplierFailure(error));
  }
}

function* setSupplierData({ payload }) {
  try {
    const data = yield call(setSupplierRequest, payload);
    yield put(actions.setSupplierSuccess(data));
  } catch (error) {
    yield put(actions.setSupplierFailure(error));
  }
}

function* deleteSupplierFromDB({ payload }) {
  try {
    yield call(deleteSupplierRequest, payload);
    // yield delay(500);
    yield put(actions.deleteSupplierSuccess(payload));
  } catch (error) {
    yield put(actions.deleteSupplierFailure(error));
  }
}

function* getSupplierDetailsData(data) {
  try {
    const data = yield call(getSupplierDetailsRequest);
    yield put(actions.getSupplierDetailsSuccess(data));
  } catch (error) {
    yield put(actions.getSupplierDetailsFailure(error));
  }
}

function* getFilterSupplierFromDB({ payload }) {
  try {
    const data = yield call(getFilterSupplierRequest, payload);
    yield put(actions.getFilterSupplierSuccess(data));
  } catch (error) {
    yield put(actions.getFilterSupplierFailure(error));
  }
}

function* setDuplicateFromDB({ payload }) {
  try {
    yield put(actions.setDuplicateSuccess(payload));
  } catch (error) {
    yield put(actions.setDuplicateFailure(error));
  }
}

function* clearDuplicateFromDB({ payload }) {
  try {
    yield put(actions.clearDuplicateSuccess);
  } catch (error) {
    yield put(actions.clearDuplicateFailure(error));
  }
}

// David - GET single Supplier
const getSingleSupplierRequest = async (id) => {
  // API call ?
  const result = await api.get(`/supplier/${id}`);
  return result.data;
};

function* getSingleSupplierFromDB({ payload }) {
  try {
    const data = yield call(getSingleSupplierRequest, payload);
    yield put(actions.getSingleSupplierSuccess(data));
  } catch (error) {
    yield put(actions.getSingleSupplierFailure(error));
  }
}

// David - PATCH Single Supplier
const patchSingleSupplierRequest = async (data) => {
  const result = await api.put(`/supplier/${data.id}`, data);
  return result.data;
};

function* patchSingleSupplier({ payload }) {

  // console.log("HEYYYYYYYY", payload)
  try {
    const data = yield call(patchSingleSupplierRequest, payload);
    yield put(actions.patchSingleSupplierSuccess(data));
    yield put(actions.getSingleSupplierRequest(payload.id)) 
  } catch (error) {
    yield put(actions.patchSingleSuppplierFailure(error));
  }
}

function* getSavedSupplierMainQueryData({payload}) {
  try {
    yield put(actions.getSavedSupplierMainQuerySuccess(payload))
  } catch (error) {
    yield put(actions.getSavedSupplierMainQueryFailure(error))
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* getSupplierWatcher() {
  yield takeEvery(types.GET_SUPPLIER, getSupplierData);
}
export function* setSupplierWatcher() {
  yield takeEvery(types.SET_SUPPLIER, setSupplierData);
}
export function* getSupplierDetailsWatcher() {
  yield takeEvery(types.GET_SUPPLIER_DETAILS, getSupplierDetailsData);
}
export function* getFilterSupplierWatcher() {
  yield takeEvery(types.GET_FILTER_SUPPLIER, getFilterSupplierFromDB);
}
export function* deleteSupplierWatcher() {
  yield takeEvery(types.DELETE_SUPPLIER, deleteSupplierFromDB);
}
// Ian- Duplicate product
export function* setDuplicateWatcher() {
  yield takeEvery(types.SET_DUPLICATE, setDuplicateFromDB);
}

// Ian- CLEAR Duplicate product
export function* clearDuplicateWatcher() {
  yield takeEvery(types.CLEAR_DUPLICATE, clearDuplicateFromDB);
}

export function* getSingleSupplierWatcher() {
  yield takeEvery(types.GET_SINGLE_SUPPLIER_REQUEST, getSingleSupplierFromDB);
}

export function* patchSingleSupplierWatcher() {
  yield takeEvery(types.PATCH_SINGLE_SUPPLIER_REQUEST, patchSingleSupplier);
}

export function* getSavedSupplierMainQueryWatcher(){
  yield takeEvery(types.GET_SAVED_SUPPLIER_MAIN_QUERY, getSavedSupplierMainQueryData)
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* suppliertfesSaga() {
  yield all([
    fork(getSupplierWatcher),
    fork(setSupplierWatcher),
    fork(getSupplierDetailsWatcher),
    fork(getFilterSupplierWatcher),
    fork(deleteSupplierWatcher),
    fork(setDuplicateWatcher),
    fork(clearDuplicateWatcher),
    fork(getSingleSupplierWatcher),
    fork(patchSingleSupplierWatcher),
    fork(getSavedSupplierMainQueryWatcher)
  ]);
}
