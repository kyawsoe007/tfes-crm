import {
  all,
  call,
  fork,
  put,
  takeEvery,
  delay,
  select,
} from "redux-saga/effects";

import * as types from "./SupplierPaymentTypes";
import * as actions from "./SupplierPaymentActions";
import api from "Api";

//=========================
// REQUESTS
//=========================
const getFilterSupplierPaymentRequestFromDBRequest = async ({
  limit,
  skip,
  filter,
  searchText,
  orderBy,
}) => {
  const result = await api.post(`/supplier-payment/getfilters`, {
    limit: limit,
    skip: skip,
    filter: filter,
    searchText: searchText,
    orderBy: orderBy,
  });
  return result.data;
};
const getOutstandingSupplierInvoicesFromDBRequest = async (id) => {
  const result = await api.get(`/reconcile/getSupplierOutstands/${id}`);
  return result.data;
};
const getSingleSupplierPaymentRequestFromDBRequest = async (id) => {
  const result = await api.get(`/supplier-payment/${id}`);
  return result.data;
};
const patchSingleSupplierPaymentToDBRequest = async (data) => {
  const result = await api.patch(`/supplier-payment/${data.id}`, data);
  return result.data;
};
const setSupplierPaymentToDBRequest = async (data) => {
  const result = await api.post(`/supplier-payment`, data);
  return result.data;
};
const deleteSupplierPaymentFromDBRequest = async (id) => {
  const result = await api.delete(`/supplier-payment/${id}`, { id: id });
  return id;
};

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getFilterSupplierPaymentRequestFromDB({ payload }) {
  try {
    const data = yield call(getFilterSupplierPaymentRequestFromDBRequest, payload);
    yield put(actions.getFilterSupplierPaymentRequestSuccess(data));
  } catch (error) {
    yield put(actions.getFilterSupplierPaymentRequestFailure(error));
  }
}

function* getSingleSupplierPaymentRequestFromDB({ payload }) {
  try {
    const data = yield call(getSingleSupplierPaymentRequestFromDBRequest, payload);
    yield put(actions.getSingleSupplierPaymentRequestSuccess(data));
  } catch (error) {
    yield put(actions.getSingleSupplierPaymentRequestFailure(error));
  }
}

function* patchSingleSupplierPaymentToDB({ payload }) {
  try {
    const data = yield call(patchSingleSupplierPaymentToDBRequest, payload);
    yield put(actions.patchSingleSupplierPaymentSuccess(data));
  } catch (error) {
    yield put(actions.patchSingleSupplierPaymentFailure(error));
  }
}

function* getOutstandingSupplierInvoicesFromDB({ payload }) {
  try {
    const data = yield call(getOutstandingSupplierInvoicesFromDBRequest, payload);
    yield put(actions.getOutstandingSupplierInvoicesSuccess(data));
  } catch (error) {
    yield put(actions.getOutstandingSupplierInvoicesFailure(error));
  }
}

function* setSupplierPaymentToDB({ payload }) {
  try {
    const data = yield call(setSupplierPaymentToDBRequest, payload);
    yield put(actions.setSupplierPaymentSuccess(data));
  } catch (error) {
    yield put(actions.setSupplierPaymentFailure(error));
  }
}

function* deleteSupplierPaymentFromDB({ payload }) {
  try {
    const data = yield call(deleteSupplierPaymentFromDBRequest, payload);
    yield put(actions.deleteSupplierPaymentSuccess(data));
  } catch (error) {
    yield put(actions.deleteSupplierPaymentFailure(error));
  }
}

function* clearDuplicateFromDB() {
  try {
    yield put(actions.clearDuplicateSuccess)
  } catch (error) {
    yield put(actions.clearDuplicateFailure(error))
  }
}

function* getSavedSupplierPaymentQueryData({payload}) {
  try {
    yield put(actions.getSavedSupplierPaymentQuerySuccess(payload))
  } catch (error) {
    yield put(actions.getSavedSupplierPaymentQueryFailure(error))
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* getFilterSupplierPaymentRequestWatcher() {
  yield takeEvery(types.GET_FILTER_SUPPLIER_PAYMENT_REQUEST, getFilterSupplierPaymentRequestFromDB);
}
export function* getSingleSupplierPaymentRequestWatcher() {
  yield takeEvery(types.GET_SINGLE_SUPPLIER_PAYMENT_REQUEST, getSingleSupplierPaymentRequestFromDB);
}
export function* patchSingleSupplierPaymentWatcher() {
  yield takeEvery(types.PATCH_SINGLE_SUPPLIER_PAYMENT, patchSingleSupplierPaymentToDB);
}
export function* getOutstandingSupplierInvoicesWatcher() {
  yield takeEvery(types.GET_OUTSTANDING_SUPPLIER_INVOICES, getOutstandingSupplierInvoicesFromDB);
}
export function* setSupplierPaymentWatcher() {
  yield takeEvery(types.SET_SUPPLIER_PAYMENT, setSupplierPaymentToDB);
}
export function* deleteSupplierPaymentWatcher() {
  yield takeEvery(types.DELETE_SUPPLIER_PAYMENT, deleteSupplierPaymentFromDB);
}

// CLEAR Data loaded from previous forms
export function* clearDuplicateWatcher() {
  yield takeEvery(types.CLEAR_DUPLICATE, clearDuplicateFromDB)
}

// save query 
export function* getSavedSupplierPaymentQueryWatcher(){
  yield takeEvery(types.GET_SAVED_SUPPLIER_PAYMENT_QUERY, getSavedSupplierPaymentQueryData)
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* SupplierPaymentSaga() {
  yield all([
    fork(getFilterSupplierPaymentRequestWatcher),
    fork(getOutstandingSupplierInvoicesWatcher),
    fork(setSupplierPaymentWatcher),
    fork(getSingleSupplierPaymentRequestWatcher),
    fork(patchSingleSupplierPaymentWatcher),
    fork(deleteSupplierPaymentWatcher),
    fork(clearDuplicateWatcher),
    fork(getSavedSupplierPaymentQueryWatcher)
  ]);
}
