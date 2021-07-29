import {
  all,
  call,
  fork,
  put,
  takeEvery,
  delay,
  select,
} from "redux-saga/effects";

import * as types from "./PaymenttfesTypes";
import * as actions from "./PaymenttfesActions";
import api from "Api";
import {getPaymentMethods} from "./PaymenttfesActions";

//=========================
// REQUESTS
//=========================
const getFilterPaymentRequestFromDBRequest = async ({
 limit,
 skip,
 filter,
 searchText,
 orderBy,
}) => {
  const result = await api.post(`/payment/getfilters`, {
    limit: limit,
    skip: skip,
    filter: filter,
    searchText: searchText,
    orderBy: orderBy,
  });
  return result.data;
};
const getOutstandingInvoicesFromDBRequest = async (id) => {
  const result = await api.get(`/reconcile/getOutstands/${id}`);
  return result.data;
};
const getSinglePaymentRequestFromDBRequest = async (id) => {
  const result = await api.get(`/payment/${id}`);
  return result.data;
};
const patchSinglePaymentToDBRequest = async (data) => {
  const result = await api.patch(`/payment/${data.id}`, data);
  return result.data;
};
const setPaymentToDBRequest = async (data) => {
  const result = await api.post(`/payment`, data);
  return result.data;
};
const deletePaymentFromDBRequest = async (id) => {
  const result = await api.delete(`/payment/${id}`, { id: id });
  return id;
};
const getPaymentMethodsFromDBRequest = async () => {
  const result = await api.get(`/payment-method`);
  return result.data;
};

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getFilterPaymentRequestFromDB({ payload }) {
  try {
    const data = yield call(getFilterPaymentRequestFromDBRequest, payload);
    yield put(actions.getFilterPaymentRequestSuccess(data));
  } catch (error) {
    yield put(actions.getFilterPaymentRequestFailure(error));
  }
}

function* getSinglePaymentRequestFromDB({ payload }) {
  try {
    const data = yield call(getSinglePaymentRequestFromDBRequest, payload);
    yield put(actions.getSinglePaymentRequestSuccess(data));
  } catch (error) {
    yield put(actions.getSinglePaymentRequestFailure(error));
  }
}

function* patchSinglePaymentToDB({ payload }) {
  try {
    const data = yield call(patchSinglePaymentToDBRequest, payload);
    yield put(actions.patchSinglePaymentSuccess(data));
  } catch (error) {
    yield put(actions.patchSinglePaymentFailure(error));
  }
}

function* getOutstandingInvoicesFromDB({ payload }) {
  try {
    const data = yield call(getOutstandingInvoicesFromDBRequest, payload);
    yield put(actions.getOutstandingInvoicesSuccess(data));
  } catch (error) {
    yield put(actions.getOutstandingInvoicesFailure(error));
  }
}

function* setPaymentToDB({ payload }) {
  try {
    const data = yield call(setPaymentToDBRequest, payload);
    yield put(actions.setPaymentSuccess(data));
  } catch (error) {
    yield put(actions.setPaymentFailure(error));
  }
}

function* deletePaymentFromDB({ payload }) {
  try {
    const data = yield call(deletePaymentFromDBRequest, payload);
    yield put(actions.deletePaymentSuccess(data));
  } catch (error) {
    yield put(actions.deletePaymentFailure(error));
  }
}

function* getPaymentMethodsFromDB() {
  try {
    const data = yield call(getPaymentMethodsFromDBRequest);
    yield put(actions.getPaymentMethodsSuccess(data));
  } catch (error) {
    yield put(actions.getPaymentMethodsFailure(error));
  }
}

function* clearDuplicateFromDB() {
  try {
    yield put(actions.clearDuplicateSuccess)
  } catch (error) {
    yield put(actions.clearDuplicateFailure(error))
  }
}

function* getSavedPaymentQueryData({payload}) {
  try {
    yield put(actions.getSavedPaymentQuerySuccess(payload))
  } catch (error) {
    yield put(actions.getSavedPaymentQueryFailure(error))
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* getFilterPaymentRequestWatcher() {
  yield takeEvery(types.GET_FILTER_PAYMENT_REQUEST, getFilterPaymentRequestFromDB);
}
export function* getSinglePaymentRequestWatcher() {
  yield takeEvery(types.GET_SINGLE_PAYMENT_REQUEST, getSinglePaymentRequestFromDB);
}
export function* patchSinglePaymentWatcher() {
  yield takeEvery(types.PATCH_SINGLE_PAYMENT, patchSinglePaymentToDB);
}
export function* getOutstandingInvoicesWatcher() {
  yield takeEvery(types.GET_OUTSTANDING_INVOICES, getOutstandingInvoicesFromDB);
}
export function* setPaymentWatcher() {
  yield takeEvery(types.SET_PAYMENT, setPaymentToDB);
}
export function* deletePaymentWatcher() {
  yield takeEvery(types.DELETE_PAYMENT, deletePaymentFromDB);
}
export function* getPaymentMethodsWatcher() {
  yield takeEvery(types.GET_PAYMENT_METHOD, getPaymentMethodsFromDB);
}

// CLEAR Data loaded from previous forms
export function* clearDuplicateWatcher() {
  yield takeEvery(types.CLEAR_DUPLICATE, clearDuplicateFromDB)
}

// save query 
export function* getSavedPaymentQueryWatcher(){
  yield takeEvery(types.GET_SAVED_PAYMENT_QUERY, getSavedPaymentQueryData)
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* InvoicetfesSaga() {
  yield all([
    fork(getFilterPaymentRequestWatcher),
    fork(getOutstandingInvoicesWatcher),
    fork(setPaymentWatcher),
    fork(getSinglePaymentRequestWatcher),
    fork(patchSinglePaymentWatcher),
    fork(deletePaymentWatcher),
    fork(getPaymentMethodsWatcher),
    fork(clearDuplicateWatcher),
    fork(getSavedPaymentQueryWatcher)
  ]);
}
