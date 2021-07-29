import { all, call, fork, put, takeEvery, delay } from "redux-saga/effects";
import * as Types from "./CreditNoteTypes";
import * as Actions from "./CreditNoteActions";

import api from "Api";

//=========================
// REQUESTS
//=========================


const getAllCreditNoteRequest = async () => {
  const result = await api.get("/creditnotes/getAllCompanyCreditNotes");
  return result.data;
};
const getSingleCreditNoteRequest = async data => {
  const result = await api.post("/creditnotes/getSingleCompanyCreditNotes", {data: data});
  return result.data
};

const postSingleCreditNoteRequest = async data => {
  const result = await api.post("/creditnotes/credit", {data: data});
  return result.data
};


const convertSingleCreditNoteRequest = async payload => {
  const result = await api.post(`/creditnotes/convertcredit/`, {data: payload});
  return result.data
};
//=========================
// CALL(GENERATOR) ACTIONS
//=========================

function* getAllCreditNoteFromDB() {
  try {
    const data = yield call(getAllCreditNoteRequest);
    yield delay(500);
    yield put(Actions.getAllCreditNoteSuccess(data.fields));
  } catch (error) {
    yield put(Actions.getAllCreditNoteFailure(error));
  }
}

function* getCreditNoteFromDB({ payload }) {
  try {
    const data = yield call(getSingleCreditNoteRequest, payload);
    yield delay(500);
    yield put(Actions.getSingleCreditNoteSuccess(data.data));
  } catch (error) {
    yield put(Actions.getSingleCreditNoteFailure(error));
  }
}

function* postCreditNoteFromDB({ payload }) {
  try {
    const data = yield call(postSingleCreditNoteRequest, payload);
    yield delay(500);
    yield put(Actions.postSingleCreditNoteSuccess(data));
  } catch (error) {
    yield put(Actions.postSingleCreditNoteFailure(error));
  }
}

function* convertCreditNoteFromDB({ payload }) {
  try {
    const data = yield call(convertSingleCreditNoteRequest, payload);
    yield delay(500);
    yield put(Actions.converSingleCreditNoteSuccess(data.data));
  } catch (error) {
    yield put(Actions.converSingleCreditNoteFailure(error));
  }
}



//=======================
// WATCHER FUNCTIONS
//=======================

export function* getAllCreditNoteWatcher() {
  yield takeEvery(Types.GET_ALL_CREDIT_NOTE, getAllCreditNoteFromDB);
}
export function* getSingleCreditNoteWatcher() {
  yield takeEvery(Types.GET_SINGLE_CREDIT_NOTE, getCreditNoteFromDB);
}
export function* postSingleCreditNoteWatcher() {
  yield takeEvery(Types.POST_SINGLE_CREDIT_NOTE, postCreditNoteFromDB);
}
export function* convertSingleCreditNoteWatcher() {
  yield takeEvery(Types.CONVERT_SINGLE_CREDIT_NOTE, convertCreditNoteFromDB);
}
//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
    fork(getAllCreditNoteWatcher),
    fork(getSingleCreditNoteWatcher),
    fork(postSingleCreditNoteWatcher),
    fork(convertSingleCreditNoteWatcher)

  ]);
}
