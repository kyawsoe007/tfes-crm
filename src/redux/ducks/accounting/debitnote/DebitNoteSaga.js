import {
    all,
    call,
    fork,
    put,
    takeEvery,
    delay,
    select,
  } from "redux-saga/effects";
  
  import * as types from "./DebitNoteTypes";
  import * as actions from "./DebitNoteActions";
  import api from "Api";
  
  //=========================
  // REQUESTS
  //=========================
  const getDebitNoteRequest = async (payload) => {
    const data = await api.get(`/debit-note/all`);
    return data;
  };
  
  const setDebitNoteRequest = async (payload) => {
    const result = await api.post(`/debit-note`, payload);
    return result.data;
  };
  
  // Delete
  const deleteDebitNoteRequest = async (id) => {
    const result = await api.delete(`/debit-note/${id}`); // /DebitNotetfess
    return id;
  };
  
  
  const getFilterDebitNoteRequest = async ({
    limit,
    skip,
    filter,
    searchText,
    orderBy,
  }) => {
    const result = await api.post(`/debit-note/getfilters`, {
      limit: limit,
      skip: skip,
      filter: filter,
      searchText: searchText,
      orderBy: orderBy,
    });
    return result.data;
  };
  
  // David - GET single DebitNote
  const getSingleDebitNoteFromDBRequest = async (id) => {
    const result = await api.get(`/debit-note/${id}`);
    return result.data;
  };
  
  // David - PATCH Single DebitNote
  const patchSingleDebitNoteToDBRequest = async (data) => {
    const result = await api.patch(`/debit-note/${data.id}`, data);
    return result.data;
  };
  
  const getDebitNotePdfFromDBRequest = async (payload) => {

    console.log("payload", payload)
    window.open(`${api.defaults.baseURL}/debit-note/debit-note-print-Pdf/${payload}`)
      
  
    // /credit-note-print-Pdf/:id
  }
  
  
  //=========================
  // CALL(GENERATOR) ACTIONS
  //=========================
  function* getDebitNoteData(e) {
    try {
      const data = yield call(getDebitNoteRequest, e);
      yield put(actions.getDebitNoteSuccess(data));
    } catch (error) {
      yield put(actions.getDebitNoteFailure(error));
    }
  }
  
  function* setDebitNoteData({ payload }) {
    try {
      const data = yield call(setDebitNoteRequest, payload);
      yield put(actions.setDebitNoteSuccess(data));
    } catch (error) {
      yield put(actions.setDebitNoteFailure(error));
    }
  }
  
  function* deleteDebitNoteFromDB({ payload }) {
    try {
      yield call(deleteDebitNoteRequest, payload);
      yield put(actions.deleteDebitNoteSuccess(payload));
    } catch (error) {
      yield put(actions.deleteDebitNoteFailure(error));
    }
  }
  
  // Payload = ID
  function* getFilterDebitNoteFromDB({ payload }) {
    try {
      const data = yield call(getFilterDebitNoteRequest, payload);
      yield put(actions.getFilterDebitNoteSuccess(data));
    } catch (error) {
      yield put(actions.getFilterDebitNoteFailure(error));
    }
  }
  
  function* getSingleDebitNoteFromDB({ payload }) {
    try {
      const data = yield call(getSingleDebitNoteFromDBRequest, payload);
      yield put(actions.getSingleDebitNoteSuccess(data));
    } catch (error) {
      yield put(actions.getSingleDebitNoteFailure(error));
    }
  }
  
  function* patchSingleDebitNoteToDB({ payload }) {
    try {
      const data = yield call(patchSingleDebitNoteToDBRequest, payload);
      yield put(actions.patchSingleDebitNoteSuccess(data));
    } catch (error) {
      yield put(actions.patchSingleDebitNoteFailure(error));
    }
  }
  
  function* getDebitNotePdfFromDB({ payload }) {
    try {
      const data = yield call(getDebitNotePdfFromDBRequest, payload);
      yield put(actions.getDebitNotePdfSuccess);
    } catch (error) {
      yield put(actions.getDebitNotePdfFailure(error));
    }
  }

  function* getSavedDebitNoteQueryData({payload}) {
    try {
      yield put(actions.getSavedDebitNoteQuerySuccess(payload))
    } catch (error) {
      yield put(actions.getSavedDebitNoteQueryFailure(error))
    }
  }
  
  //=======================
  // WATCHER FUNCTIONS
  //=======================
  export function* getDebitNoteWatcher() {
    yield takeEvery(types.GET_DEBIT_NOTE, getDebitNoteData);
  }
  export function* setDebitNoteWatcher() {
    yield takeEvery(types.SET_DEBIT_NOTE, setDebitNoteData);
  }
  
  export function* getFilterDebitNoteWatcher() {
    yield takeEvery(types.GET_FILTER_DEBIT_NOTE, getFilterDebitNoteFromDB);
  }
  export function* deleteDebitNoteWatcher() {
    yield takeEvery(types.DELETE_DEBIT_NOTE, deleteDebitNoteFromDB);
  }
  
  
  export function* getSingleDebitNoteWatcher() {
    yield takeEvery(types.GET_SINGLE_DEBIT_NOTE_REQUEST, getSingleDebitNoteFromDB);
  }
  
  export function* patchSingleDebitNoteWatcher() {
    yield takeEvery(types.PATCH_SINGLE_DEBIT_NOTE, patchSingleDebitNoteToDB);
  }
  export function* getDebitNotePdfWatcher() {
    yield takeEvery(types.GET_DEBIT_NOTE_PDF, getDebitNotePdfFromDB);
  }
  
  export function* getSavedDebitNoteQueryWatcher(){
    yield takeEvery(types.GET_SAVED_DEBIT_NOTE_QUERY, getSavedDebitNoteQueryData)
  }


  //=======================
  // FORK SAGAS TO STORE
  //=======================
  export default function* DebitNotetfesSaga() {
    yield all([
      fork(getDebitNoteWatcher),
      fork(setDebitNoteWatcher),
      fork(getFilterDebitNoteWatcher),
      fork(deleteDebitNoteWatcher),
      fork(getSingleDebitNoteWatcher),
      fork(patchSingleDebitNoteWatcher),
      fork(getDebitNotePdfWatcher),
      fork(getSavedDebitNoteQueryWatcher)
    ]);
  }
  