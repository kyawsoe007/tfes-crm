import { all, call, fork, put, takeEvery, delay, select } from "redux-saga/effects";

import * as types from "./PurchasetfesTypes";
import * as actions from "./PurchasetfesActions";
import api from "Api";

//=========================
// REQUESTS
//=========================
const getPurchaseRequest = async () => {
  const data = await api.get(`/purchase`);
  return data;
};

const setPurchaseRequest = async (payload) => {
  const result = await api.post(`/purchase`, payload);
  return result.data;
};

// Delete
const deletePurchaseRequest = async (id) => {
  const result = await api.delete(`/purchase/${id}`);
  return result.data;
};

const getPurchaseDetailsRequest = async () => {
  const data = await api.get("/purchase/dropdown-group");
  return data;
};

const getFilterPurchaseRequest = async ({
  limit,
  skip,
  filter,
  searchText,
  orderBy,
}) => {
  const result = await api.post("/purchase/getfilters", {
    limit: limit,
    skip: skip,
    filter: filter,
    searchText: searchText,
    orderBy: orderBy,
  });
  return result.data;
};

const getPdfCreate = async(id)=>{
  // window.open(`${api.defaults.baseURL}/sales-orders/pdf/${id}`,id) 
  window.open(`${api.defaults.baseURL}/purchase/pdf/${id}`,id) 
}

const patchSinglePurchaseInternalRemarks = async(payload)=>{
  const result = await api.patch(`/purchase/newRemark/${payload.id}`, payload);
  return result.data;
}



//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getPurchaseData(e) {
  try {
    const data = yield call(getPurchaseRequest, e);
    yield put(actions.getPurchaseSuccess(data));
  } catch (error) {
    yield put(actions.getPurchaseFailure(error));
  }
}

function* setPurchaseData({ payload }) {
  try {
    const data = yield call(setPurchaseRequest, payload);
    yield put(actions.setPurchaseSuccess(data));
  } catch (error) {
    yield put(actions.setPurchaseFailure(error));
  }
}

function* deletePurchaseFromDB({ payload }) {
  try {
    yield call(deletePurchaseRequest, payload);
    // yield delay(500);
    yield put(actions.deletePurchaseSuccess(payload));
  } catch (error) {
    yield put(actions.deletePurchaseFailure(error));
  }
}

function* getPurchaseDetailsData(data) {
  try {
    const data = yield call(getPurchaseDetailsRequest);
    yield put(actions.getPurchaseDetailsSuccess(data));
  } catch (error) {
    yield put(actions.getPurchaseDetailsFailure(error));
  }
}

function* getFilterPurchaseFromDB({ payload }) {
  try {
    const data = yield call(getFilterPurchaseRequest, payload);
    yield put(actions.getFilterPurchaseSuccess(data));
  } catch (error) {
    yield put(actions.getFilterPurchaseFailure(error));
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

// David - GET single Purchase
const getSinglePurchaseRequest = async (id) => {
  // API call ?
  const result = await api.get(`/purchase/${id}`);
  return result.data;
};

function* getSinglePurchaseFromDB({ payload }) {
  try {
    const data = yield call(getSinglePurchaseRequest, payload);
    yield put(actions.getSinglePurchaseSuccess(data));
  } catch (error) {
    yield put(actions.getSinglePurchaseFailure(error));
  }
}

// David - PATCH Single Purchase
const patchSinglePurchaseRequest = async (data) => {
  const result = await api.patch(`/purchase/${data.id}`, data);
  console.log('segadata',data)
  return result.data;
};

function* patchSinglePurchase({ payload }) {
  try {
    const data = yield call(patchSinglePurchaseRequest, payload);
    yield put(actions.patchSinglePurchaseSuccess(data));
  } catch (error) {
    yield put(actions.patchSinglePurchaseFailure(error));
  }
}

function* getPdfCreateData({payload}) {
  try {
    const data=yield call(getPdfCreate,payload)
    yield put(actions.getPdfCreateSuccess(data))
  } catch (error) {
    yield put(actions.getPdfCreateFailure(error))
  }
}

function* patchSinglePurchaseInternalRemarksData({payload}) {
  // debugger

  // console.log("ASDASDASD", payload)
  try {
    const data = yield call(patchSinglePurchaseInternalRemarks,payload)
    yield put(actions.patchSinglePurchaseRequestInternalRemarksSuccess(data))
  } catch (error) {
    yield put(actions.patchSinglePurchaseRequestInternalRemarksFailure(error))
  }
}

function* getSavedPurchaseQueryData({payload}) {
  try {
    yield put(actions.getSavedPurchaseQuerySuccess(payload))
  } catch (error) {
    yield put(actions.getSavedPurchaseQueryFailure(error))
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* getPurchaseWatcher() {
  yield takeEvery(types.GET_PURCHASE, getPurchaseData);
}
export function* setPurchaseWatcher() {
  yield takeEvery(types.SET_PURCHASE, setPurchaseData);
}
export function* getPurchaseDetailsWatcher() {
  yield takeEvery(types.GET_PURCHASE_DETAILS, getPurchaseDetailsData);
}
export function* getFilterPurchaseWatcher() {
  yield takeEvery(types.GET_FILTER_PURCHASE, getFilterPurchaseFromDB);
}
export function* deletePurchaseWatcher() {
  yield takeEvery(types.DELETE_PURCHASE, deletePurchaseFromDB);
}
// Ian- Duplicate product
export function* setDuplicateWatcher() {
  yield takeEvery(types.SET_DUPLICATE, setDuplicateFromDB);
}

// Ian- CLEAR Duplicate product
export function* clearDuplicateWatcher() {
  yield takeEvery(types.CLEAR_DUPLICATE, clearDuplicateFromDB);
}

export function* getSinglePurchaseWatcher() {
  yield takeEvery(types.GET_SINGLE_PURCHASE_REQUEST, getSinglePurchaseFromDB);
}

export function* patchSinglePurchaseWatcher() {
  yield takeEvery(types.PATCH_SINGLE_PURCHASE_REQUEST, patchSinglePurchase);
}

export function* getPdfCreateDataWatcher(){
  yield takeEvery(types.PDF_CREATE_PURCHASE_ORDER,getPdfCreateData)
}

export function* patchSinglePurchaseInternalRemarksWatcher(){
  yield takeEvery(types.PATCH_SINGLE_PURCHASE_REQUEST_INTERNAL_REMARKS, patchSinglePurchaseInternalRemarksData)
}

export function* getSavedPurchaseQueryWatcher(){
  yield takeEvery(types.GET_SAVED_PURCHASE_QUERY, getSavedPurchaseQueryData)
}



//=======================
// FORK SAGAS TO STORE
//=======================
export default function* purchasestfesSaga() {
  yield all([
    fork(getPurchaseWatcher),
    fork(setPurchaseWatcher),
    fork(getPurchaseDetailsWatcher),
    fork(getFilterPurchaseWatcher),
    fork(deletePurchaseWatcher),
    fork(setDuplicateWatcher),
    fork(clearDuplicateWatcher),
    fork(getSinglePurchaseWatcher),
    fork(patchSinglePurchaseWatcher),
    fork(getPdfCreateDataWatcher),
    fork(patchSinglePurchaseInternalRemarksWatcher),
    fork(getSavedPurchaseQueryWatcher)
  ]);
}
