import {
    all,
    call,
    fork,
    put,
    takeEvery,
    delay,
    select,
  } from "redux-saga/effects";
  
  import * as types from "./DepositTypes";
  import * as actions from "./DepositActions";
  import api from "Api";
  
  //=========================
  // REQUESTS
  //=========================
  const getDepositRequest = async (payload) => {
    const data = await api.get(`/payment-deposit/all`);
    return data;
  };
  
  const setDepositRequest = async (payload) => {
    console.log("save deposite");
    const result = await api.post(`/payment-deposit`, payload);
    return result.data;
  };
  
  // Delete
  const deleteDepositRequest = async (id) => {
    const result = await api.delete(`/payment-deposit/${id}`); // /Deposittfess
    return id;
  };
  
  
  const getFilterDepositRequest = async ({
    limit,
    skip,
    filter,
    searchText,
    orderBy,
  }) => {
    const result = await api.post(`/payment-deposit/getfilters`, {
      limit: limit,
      skip: skip,
      filter: filter,
      searchText: searchText,
      orderBy: orderBy,
    });
    return result.data;
  };
  
  // David - GET single Deposit
  const getSingleDepositFromDBRequest = async (id) => {
    const result = await api.get(`/payment-deposit/${id}`);
    return result.data;
  };
  
  // David - PATCH Single Deposit
  const patchSingleDepositToDBRequest = async (data) => {
    const result = await api.patch(`/payment-deposit/${data.id}`, data);
    return result.data;
  };
  
  const getDepositPdfFromDBRequest = async (payload) => {

    console.log("payload", payload)
    window.open(`${api.defaults.baseURL}/payment-deposit/payment-deposit-print-Pdf/${payload}`)
      
  
    // /credit-note-print-Pdf/:id
  }
  
  
  //=========================
  // CALL(GENERATOR) ACTIONS
  //=========================
  function* getDepositData(e) {
    try {
      const data = yield call(getDepositRequest, e);
      yield put(actions.getDepositSuccess(data));
    } catch (error) {
      yield put(actions.getDepositFailure(error));
    }
  }
  
  function* setDepositData({ payload }) {
    try {
      const data = yield call(setDepositRequest, payload);
      yield put(actions.setDepositSuccess(data));
    } catch (error) {
      yield put(actions.setDepositFailure(error));
    }
  }
  
  function* deleteDepositFromDB({ payload }) {
    try {
      yield call(deleteDepositRequest, payload);
      yield put(actions.deleteDepositSuccess(payload));
    } catch (error) {
      yield put(actions.deleteDepositFailure(error));
    }
  }
  
  // Payload = ID
  function* getFilterDepositFromDB({ payload }) {
    try {
      const data = yield call(getFilterDepositRequest, payload);
      yield put(actions.getFilterDepositSuccess(data));
    } catch (error) {
      yield put(actions.getFilterDepositFailure(error));
    }
  }
  
  function* getSingleDepositFromDB({ payload }) {
    try {
      const data = yield call(getSingleDepositFromDBRequest, payload);
      yield put(actions.getSingleDepositSuccess(data));
    } catch (error) {
      yield put(actions.getSingleDepositFailure(error));
    }
  }
  
  function* patchSingleDepositToDB({ payload }) {
    try {
      const data = yield call(patchSingleDepositToDBRequest, payload);
      yield put(actions.patchSingleDepositSuccess(data));
    } catch (error) {
      yield put(actions.patchSingleDepositFailure(error));
    }
  }
  
  function* getDepositPdfFromDB({ payload }) {
    try {
      const data = yield call(getDepositPdfFromDBRequest, payload);
      yield put(actions.getDepositPdfSuccess);
    } catch (error) {
      yield put(actions.getDepositPdfFailure(error));
    }
  }

  function* getSavedDepositQueryData({payload}) {
    try {
      yield put(actions.getSavedDepositQuerySuccess(payload))
    } catch (error) {
      yield put(actions.getSavedDepositQueryFailure(error))
    }
  }
  
  //=======================
  // WATCHER FUNCTIONS
  //=======================
  export function* getDepositWatcher() {
    yield takeEvery(types.GET_PAYMENT_DEPOSIT, getDepositData);
  }
  export function* setDepositWatcher() {
    yield takeEvery(types.SET_PAYMENT_DEPOSIT, setDepositData);
  }
  
  export function* getFilterDepositWatcher() {
    yield takeEvery(types.GET_FILTER_PAYMENT_DEPOSIT, getFilterDepositFromDB);
  }
  export function* deleteDepositWatcher() {
    yield takeEvery(types.DELETE_PAYMENT_DEPOSIT, deleteDepositFromDB);
  }
  
  
  export function* getSingleDepositWatcher() {
    yield takeEvery(types.GET_SINGLE_PAYMENT_DEPOSIT_REQUEST, getSingleDepositFromDB);
  }
  
  export function* patchSingleDepositWatcher() {
    yield takeEvery(types.PATCH_SINGLE_PAYMENT_DEPOSIT, patchSingleDepositToDB);
  }
  export function* getDepositPdfWatcher() {
    yield takeEvery(types.GET_PAYMENT_DEPOSIT_PDF, getDepositPdfFromDB);
  }
  
  export function* getSavedDepositQueryWatcher(){
    yield takeEvery(types.GET_SAVED_DEPOSIT_QUERY, getSavedDepositQueryData)
  }


  //=======================
  // FORK SAGAS TO STORE
  //=======================
  export default function* DeposittfesSaga() {
    yield all([
      fork(getDepositWatcher),
      fork(setDepositWatcher),
      fork(getFilterDepositWatcher),
      fork(deleteDepositWatcher),
      fork(getSingleDepositWatcher),
      fork(patchSingleDepositWatcher),
      fork(getDepositPdfWatcher),
      fork(getSavedDepositQueryWatcher)
    ]);
  }
  