import { all, call, fork, put, takeEvery, delay, select } from "redux-saga/effects";

import * as types from "./CustomertfesTypes";
import * as actions from "./CustomertfesActions";
import api from "Api";

//=========================
// REQUESTS
//=========================

const getCustomerRequest = async ({ limit, skip, filter, searchText, orderBy }) => {
  /*
  const result = await api.post("/customer/getfilters", {
    limit: limit,
    skip: skip,
    filter: filter,
    searchText: searchText,
    orderBy: orderBy,
  });
  return result;
  */
};


const setCustomerRequest = async (payload) => {
  const result = await api.post(`/customer`, payload);
  return result.data;
};

// Delete
const deleteCustomerRequest = async (id) => {
  const result = await api.delete(`/customer/${id}`);
  return result.data;
};

const getCustomerDetailsRequest = async () => {
  const data = await api.get(`/customer/getAllDetails`); // /customer/getAllDetails
  return data;
};

const getFilterCustomerRequest = async ({
  limit,
  skip,
  filter,
  searchText,
  orderBy,
}) => {
 
  const result = await api.post("/customer/getfilters", {
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
function* getCustomerData({ payload }) {
  try {
    const data = yield call(getCustomerRequest, payload);
    yield put(actions.getCustomerSuccess(data));
  } catch (error) {
    yield put(actions.getCustomerFailure(error));
  }
}



function* setCustomerData({ payload }) {
  try {
    const data = yield call(setCustomerRequest, payload);
    yield put(actions.setCustomerTfesSuccess(data));
  } catch (error) {
    yield put(actions.setCustomerTfesFailure(error));
  }
}

function* deleteCustomerFromDB({ payload }) {
  try {
    yield call(deleteCustomerRequest, payload);
    // yield delay(500);
    yield put(actions.deleteCustomerTfesSuccess(payload));
  } catch (error) {
    yield put(actions.deleteCustomerTfesFailure(error));
  }
}

function* getCustomerDetailsData(data) {
  try {
    const data = yield call(getCustomerDetailsRequest);
    yield put(actions.getCustomerTfesDetailsSuccess(data));
  } catch (error) {
    yield put(actions.getCustomerTfesDetailsFailure(error));
  }
}

function* getFilterCustomerFromDB({ payload }) {
  try {
    const data = yield call(getFilterCustomerRequest, payload);
    yield put(actions.getFilterCustomerTfesSuccess(data));
  } catch (error) {
    yield put(actions.getFilterCustomerTfesSuccess(error));
  }
}

// David - GET single Customer
const getSingleCustomerRequest = async (id) => {
  // API call ?
  const result = await api.get(`/customer/${id}`);
  return result.data;
};

function* getSingleCustomerFromDB({ payload }) {
  try {
    const data = yield call(getSingleCustomerRequest, payload);
    yield put(actions.getSingleCustomerSuccess(data));
  } catch (error) {
    yield put(actions.getSingleCustomerFailure(error));
  }
}

// David - PATCH Single Customer
const patchSingleCustomerRequest = async (data) => {
  const result = await api.put(`/customer/${data.id}`, data);
  return result.data;
};

function* patchSingleCustomer({ payload }) {
  try {
    const data = yield call(patchSingleCustomerRequest, payload);
    yield put(actions.patchSingleCustomerSuccess(data));
    yield put(actions.getSingleCustomerRequest(payload.id)) 
  } catch (error) {
    yield put(actions.patchSingleCustomerFailure(error));
  }
}

function* setDuplicateFromDB({ payload }) {
  try {
    yield put(actions.setDuplicateSuccess(payload));
  } catch (error) {
    yield put(actions.setDuplicateFailure(error));
  }
}

function* getSavedCustomerQueryData({payload}) {
  try {
    yield put(actions.getSavedCustomerQuerySuccess(payload))
  } catch (error) {
    yield put(actions.getSavedCustomerQueryFailure(error))
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* getCustomerWatcher() {
  yield takeEvery(types.GET_CUSTOMERTFES, getCustomerData);
}
export function* setCustomerWatcher() {
  yield takeEvery(types.SET_CUSTOMERTFES, setCustomerData);
}
export function* getCustomerDetailsWatcher() {
  yield takeEvery(types.GET_CUSTOMERTFES_DETAILS, getCustomerDetailsData);
}
export function* getFilterCustomerWatcher() {
  yield takeEvery(types.GET_FILTER_CUSTOMERTFES, getFilterCustomerFromDB);
}
export function* deleteCustomerWatcher() {
  yield takeEvery(types.DELETE_CUSTOMERTFES, deleteCustomerFromDB);
}

export function* getSingleCustomerWatcher() {
  yield takeEvery(types.GET_SINGLE_CUSTOMER_REQUEST, getSingleCustomerFromDB);
}

export function* patchSingleCustomerWatcher() {
  yield takeEvery(types.PATCH_SINGLE_CUSTOMER_REQUEST, patchSingleCustomer);
}

// Ian- Duplicate product
export function* setDuplicateWatcher() {
  yield takeEvery(types.SET_DUPLICATE, setDuplicateFromDB);
}

export function* getSavedCustomerQueryWatcher(){
  yield takeEvery(types.GET_SAVED_CUSTOMER_QUERY, getSavedCustomerQueryData)
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* customertfesSaga() {
  yield all([
    fork(getCustomerWatcher),
    fork(setCustomerWatcher),
    fork(getCustomerDetailsWatcher),
    fork(getFilterCustomerWatcher),
    fork(deleteCustomerWatcher),
    fork(getSingleCustomerWatcher),
    fork(patchSingleCustomerWatcher),
    fork(setDuplicateWatcher),
    fork(getSavedCustomerQueryWatcher)
  ]);
}
