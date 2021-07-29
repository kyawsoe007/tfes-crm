import {
    all,
    call,
    fork,
    put,
    takeEvery,
    delay,
    select,
  } from "redux-saga/effects";
  
  import * as types from "./SupplierInvoiceTypes";
  import * as actions from "./SupplierInvoiceActions";
  import api from "Api";
  
  //=========================
  // REQUESTS
  //=========================
  const getSupplierInvoiceRequest = async (payload) => {
    const data = await api.get(`/supplier-invoice/getAll`);
    return data;
  };
  
  const setSupplierInvoiceRequest = async (payload) => {
    const result = await api.post(`/supplier-invoice`, payload);
    return result.data;
  };
  
  // Delete
  const deleteSupplierInvoiceRequest = async (id) => {
    const result = await api.delete(`/supplier-invoice/${id}`, { id: id }); // /Invoicetfess
    return id;
  };
  
  const getSupplierInvoiceDetailsRequest = async () => {
    const data = await api.get(`/supplier-invoice/dropdown-group`); // /Invoicetfess/getAllDetails
    return data;
  };
  
  const getFilterSupplierInvoiceRequest = async ({
    limit,
    skip,
    filter,
    searchText,
    orderBy,
  }) => {
    const result = await api.post(`/supplier-invoice/getfilters`, {
      limit: limit,
      skip: skip,
      filter: filter,
      searchText: searchText,
      orderBy: orderBy,
    });
    return result.data;
  };
  
  // David - GET single Invoice
  const getSingleSupplierInvoiceFromDBRequest = async (id) => {
    const result = await api.get(`/supplier-invoice/${id}`);
    return result.data;
  };
  
  // David - PATCH Single Invoice
  const patchSingleSupplierInvoiceToDBRequest = async (data) => {
    const result = await api.patch(`/supplier-invoice/${data.id}`, data);
    return result.data;
  };
  
  //=========================
  // CALL(GENERATOR) ACTIONS
  //=========================
  function* getInvoiceData(e) {
    try {
      const data = yield call(getSupplierInvoiceRequest, e);
      yield put(actions.getSupplierInvoiceSuccess(data));
    } catch (error) {
      yield put(actions.getSupplierInvoiceFailure(error));
    }
  }
  
  function* setInvoiceData({ payload }) {
    try {
      const data = yield call(setSupplierInvoiceRequest, payload);
      yield put(actions.setSupplierInvoiceSuccess(data));
    } catch (error) {
      yield put(actions.setSupplierInvoiceFailure(error));
    }
  }
  
  function* deleteInvoiceFromDB({ payload }) {
    try {
      yield call(deleteSupplierInvoiceRequest, payload);
      yield put(actions.deleteSupplierInvoiceSuccess(payload));
    } catch (error) {
      yield put(actions.deleteSupplierInvoiceFailure(error));
    }
  }
  
  function* getInvoiceDetailsData(data) {
    try {
      const data = yield call(getSupplierInvoiceDetailsRequest);
      yield put(actions.getSupplierInvoiceDetailsSuccess(data));
    } catch (error) {
      yield put(actions.getSupplierInvoiceDetailsFailure(error));
    }
  }
  // Payload = ID
  function* getFilterInvoiceFromDB({ payload }) {
    try {
      const data = yield call(getFilterSupplierInvoiceRequest, payload);
      yield put(actions.getFilterSupplierInvoiceSuccess(data));
    } catch (error) {
      yield put(actions.getFilterSupplierInvoiceFailure(error));
    }
  }
  
  function* getSingleInvoiceFromDB({ payload }) {
    try {
      const data = yield call(getSingleSupplierInvoiceFromDBRequest, payload);
      yield put(actions.getSingleSupplierInvoiceSuccess(data));
    } catch (error) {
      yield put(actions.getSingleSupplierInvoiceFailure(error));
    }
  }
  
  function* patchSingleInvoiceToDB({ payload }) {
    try {
      const data = yield call(patchSingleSupplierInvoiceToDBRequest, payload);
      yield put(actions.patchSingleSupplierInvoiceSuccess(data));
    } catch (error) {
      yield put(actions.patchSingleSupplierInvoiceFailure(error));
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

  function* getSavedSupplierInvoiceQueryData({payload}) {
    try {
      yield put(actions.getSavedSupplierInvoiceQuerySuccess(payload))
    } catch (error) {
      yield put(actions.getSavedSupplierInvoiceQueryFailure(error))
    }
  }
  
  //=======================
  // WATCHER FUNCTIONS
  //=======================
  export function* getInvoiceWatcher() {
    yield takeEvery(types.GET_SUPPLIER_INVOICE, getInvoiceData);
  }
  export function* setInvoiceWatcher() {
    yield takeEvery(types.SET_SUPPLIER_INVOICE, setInvoiceData);
  }
  
  export function* getInvoiceDetailsWatcher() {
    yield takeEvery(types.GET_SUPPLIER_INVOICE_DETAILS, getInvoiceDetailsData);
  }
  export function* getFilterInvoiceWatcher() {
    yield takeEvery(types.GET_FILTER_SUPPLIER_INVOICE, getFilterInvoiceFromDB);
  }
  export function* deleteInvoiceWatcher() {
    yield takeEvery(types.DELETE_SUPPLIER_INVOICE, deleteInvoiceFromDB);
  }
  
  // Ian- Duplicate Invoice
  export function* setDuplicateWatcher() {
    yield takeEvery(types.SET_DUPLICATE, setDuplicateFromDB);
  }
  
  // Ian- CLEAR Duplicate Invoice
  export function* clearDuplicateWatcher() {
    yield takeEvery(types.CLEAR_DUPLICATE, clearDuplicateFromDB);
  }
  
  export function* getSingleInvoiceWatcher() {
    yield takeEvery(types.GET_SINGLE_SUPPLIER_INVOICE_REQUEST, getSingleInvoiceFromDB);
  }
  
  export function* patchSingleInvoiceWatcher() {
    yield takeEvery(types.PATCH_SINGLE_SUPPLIER_INVOICE, patchSingleInvoiceToDB);
  }

  // save query 
export function* getSavedSupplierInvoiceQueryWatcher(){
  yield takeEvery(types.GET_SAVED_SUPPLIER_INVOICE_QUERY, getSavedSupplierInvoiceQueryData)
}
  
  //=======================
  // FORK SAGAS TO STORE
  //=======================
  export default function* SupplierInvoiceSaga() {
    yield all([
      fork(getInvoiceWatcher),
      fork(setInvoiceWatcher),
      fork(setDuplicateWatcher),
      fork(clearDuplicateWatcher),
      fork(getInvoiceDetailsWatcher),
      fork(getFilterInvoiceWatcher),
      fork(deleteInvoiceWatcher),
      fork(clearDuplicateWatcher),
      fork(getSingleInvoiceWatcher),
      fork(patchSingleInvoiceWatcher),
      fork(getSavedSupplierInvoiceQueryWatcher)
    ]);
  }
  