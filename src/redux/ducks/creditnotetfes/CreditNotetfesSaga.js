import {
  all,
  call,
  fork,
  put,
  takeEvery,
  delay,
  select,
} from "redux-saga/effects";

import * as types from "./CreditNotetfesTypes";
import * as actions from "./CreditNotetfesActions";
import api from "Api";

//=========================
// REQUESTS
//=========================
const getCreditNoteRequest = async (payload) => {
  const data = await api.get(`/credit-note/all`);
  return data;
};

const setCreditNoteRequest = async (payload) => {
  const result = await api.post(`/credit-note`, payload);
  return result.data;
};

// Delete
const deleteCreditNoteRequest = async (id) => {
  const result = await api.delete(`/credit-note/${id}`); // /CreditNotetfess
  return id;
};

const getDropdownGroupFromDBRequest = async () => {
  const result = await api.get(`/credit-note/dropdown-group`); // /CreditNotetfess/getAllDetails
  return result.data;
};

const getFilterCreditNoteRequest = async ({
  limit,
  skip,
  filter,
  searchText,
  orderBy,
}) => {
  const result = await api.post(`/credit-note/getfilters`, {
    limit: limit,
    skip: skip,
    filter: filter,
    searchText: searchText,
    orderBy: orderBy,
  });
  return result.data;
};

// David - GET single CreditNote
const getSingleCreditNoteFromDBRequest = async (id) => {
  const result = await api.get(`/credit-note/${id}`);
  return result.data;
};

// David - PATCH Single CreditNote
const patchSingleCreditNoteToDBRequest = async (data) => {
  const result = await api.patch(`/credit-note/${data.id}`, data);
  return result.data;
};

const getCreditNotePdfFromDBRequest = async (payload) => {

  console.log("payload", payload)
  window.open(`${api.defaults.baseURL}/credit-note/credit-note-print-Pdf/${payload}`)

  console.log(`${api.defaults.baseURL}/invoices/commercial-invoice-print-Pdf/${payload}`)

  // /credit-note-print-Pdf/:id
}

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getCreditNoteData(e) {
  try {
    const data = yield call(getCreditNoteRequest, e);
    yield put(actions.getCreditNoteSuccess(data));
  } catch (error) {
    yield put(actions.getCreditNoteFailure(error));
  }
}

function* setCreditNoteData({ payload }) {
  try {
    const data = yield call(setCreditNoteRequest, payload);
    yield put(actions.setCreditNoteSuccess(data));
  } catch (error) {
    yield put(actions.setCreditNoteFailure(error));
  }
}

function* deleteCreditNoteFromDB({ payload }) {
  try {
    yield call(deleteCreditNoteRequest, payload);
    yield put(actions.deleteCreditNoteSuccess(payload));
  } catch (error) {
    yield put(actions.deleteCreditNoteFailure(error));
  }
}

function* getDropdownGroupFromDB() {
  try {
    const data = yield call(getDropdownGroupFromDBRequest);
    yield put(actions.getDropdownGroupSuccess(data));
  } catch (error) {
    yield put(actions.getDropdownGroupFailure(error));
  }
}
// Payload = ID
function* getFilterCreditNoteFromDB({ payload }) {
  try {
    const data = yield call(getFilterCreditNoteRequest, payload);
    yield put(actions.getFilterCreditNoteSuccess(data));
  } catch (error) {
    yield put(actions.getFilterCreditNoteFailure(error));
  }
}

function* getSingleCreditNoteFromDB({ payload }) {
  try {
    const data = yield call(getSingleCreditNoteFromDBRequest, payload);
    yield put(actions.getSingleCreditNoteSuccess(data));
  } catch (error) {
    yield put(actions.getSingleCreditNoteFailure(error));
  }
}

function* patchSingleCreditNoteToDB({ payload }) {
  try {
    const data = yield call(patchSingleCreditNoteToDBRequest, payload);
    yield put(actions.patchSingleCreditNoteSuccess(data));
  } catch (error) {
    yield put(actions.patchSingleCreditNoteFailure(error));
  }
}

function* setDuplicateFromDB({ payload }) {
  try {
    yield put(actions.setDuplicateSuccess(payload));
  } catch (error) {
    yield put(actions.setDuplicateFailure(error));
  }
}

function* clearDuplicateFromDB() {
  try {
    yield put(actions.clearDuplicateSuccess);
  } catch (error) {
    yield put(actions.clearDuplicateFailure(error));
  }
}

function* getCreditNotePdfFromDB({ payload }) {
  try {
    const data = yield call(getCreditNotePdfFromDBRequest, payload);
    yield put(actions.getCreditNotePdfSuccess);
  } catch (error) {
    yield put(actions.getCreditNotePdfFailure(error));
  }
}

function* getSavedCreditNoteQueryData({payload}) {
  try {
    yield put(actions.getSavedCreditNoteQuerySuccess(payload))
  } catch (error) {
    yield put(actions.getSavedCreditNoteQueryFailure(error))
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* getCreditNoteWatcher() {
  yield takeEvery(types.GET_CREDIT_NOTE, getCreditNoteData);
}
export function* setCreditNoteWatcher() {
  yield takeEvery(types.SET_CREDIT_NOTE, setCreditNoteData);
}

export function* getDropdownGroupWatcher() {
  yield takeEvery(types.GET_DROPDOWN_GROUP, getDropdownGroupFromDB);
}
export function* getFilterCreditNoteWatcher() {
  yield takeEvery(types.GET_FILTER_CREDIT_NOTE, getFilterCreditNoteFromDB);
}
export function* deleteCreditNoteWatcher() {
  yield takeEvery(types.DELETE_CREDIT_NOTE, deleteCreditNoteFromDB);
}

// Ian- Duplicate CreditNote
export function* setDuplicateWatcher() {
  yield takeEvery(types.SET_DUPLICATE, setDuplicateFromDB);
}

// Ian- CLEAR Duplicate CreditNote
export function* clearDuplicateWatcher() {
  yield takeEvery(types.CLEAR_DUPLICATE, clearDuplicateFromDB);
}

export function* getSingleCreditNoteWatcher() {
  yield takeEvery(types.GET_SINGLE_CREDIT_NOTE_REQUEST, getSingleCreditNoteFromDB);
}

export function* patchSingleCreditNoteWatcher() {
  yield takeEvery(types.PATCH_SINGLE_CREDIT_NOTE, patchSingleCreditNoteToDB);
}

export function* getCreditNotePdfWatcher() {
  yield takeEvery(types.GET_CREDIT_NOTE_PDF, getCreditNotePdfFromDB);
}

export function* getSavedCreditNoteQueryWatcher(){
  yield takeEvery(types.GET_SAVED_CREDIT_NOTE_QUERY, getSavedCreditNoteQueryData)
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* CreditNotetfesSaga() {
  yield all([
    fork(getCreditNoteWatcher),
    fork(setCreditNoteWatcher),
    fork(setDuplicateWatcher),
    fork(clearDuplicateWatcher),
    fork(getDropdownGroupWatcher),
    fork(getFilterCreditNoteWatcher),
    fork(deleteCreditNoteWatcher),
    fork(clearDuplicateWatcher),
    fork(getSingleCreditNoteWatcher),
    fork(patchSingleCreditNoteWatcher),
    fork(getCreditNotePdfWatcher),
    fork(getSavedCreditNoteQueryWatcher)
  ]);
}
