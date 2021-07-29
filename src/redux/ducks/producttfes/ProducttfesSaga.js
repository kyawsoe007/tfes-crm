import { all, call, fork, put, takeEvery, delay, select } from "redux-saga/effects";

import * as types from "./ProducttfesTypes";
import * as actions from "./ProducttfesActions";
import api from "Api";

//=========================
// REQUESTS
//=========================
const getProductRequest = async (payload) => {
  const data = await api.get(`/producttfess/getAll`);
  return data;
};

const setProductRequest = async (payload) => {
  const result = await api.post(`/products`, {
    data: payload,
  });
  return result.data;
};

const deleteProductRequest = async (id) => {
  const result = await api.delete(`/products/${id}`, { id: id });
  return result.data;
};

const getProductDetailsRequest = async () => {
  const data = await api.get("/products/getAllDetails");
  return data;
};

const getFilterProductRequest = async ({ limit, skip, filter, searchText, orderBy }) => {
  const result = await api.post("/products/getfilters", {
    limit: limit,
    skip: skip,
    filter: filter,
    searchText: searchText,
    orderBy: orderBy,
  });
  return result;
};

// Request for BOM
const setBomRequest = async (payload) => {
  const result = await api.post(`/boms`, payload); // /products
  return result.data;
};

const getCsvProduct = async () => {
  window.open(`${api.defaults.baseURL}/products`)
}
const postAddStockCreateJournalEntry = async (payload) => {
  const result = await api.post(`/stock-operation/add-stock`, payload); // /products
  return result.data;
};

const postDeductStockCreateJournalEntry = async (payload) => {
  const result = await api.post(`/stock-operation/remove-stock`, payload); // /products
  return result.data;
};

const patchStockMergeSkuRequest = async (payload) => {
  // return true
  const result = await api.patch(`/skus/mergeSku/${payload.productId}`, payload); // /products
  console.log("MERGING", payload, result.data)
  return result.data;
};

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getProducData(e) {
  try {
    const data = yield call(getProductRequest, e);

    yield put(actions.getProductSuccess(data));
  } catch (error) {
    yield put(actions.getProductFailure(error));
  }
}

function* setProductData({ payload }) {
  try {
    const data = yield call(setProductRequest, payload);
    yield put(actions.setProductSuccess(data));
  } catch (error) {
    yield put(actions.setProductFailure(error));
  }
}

function* deleteProductFromDB({ payload }) {
  try {
    yield call(deleteProductRequest, payload);
    // yield delay(500);
    yield put(actions.deleteProductSuccess(payload));
  } catch (error) {
    yield put(actions.deleteProductFailure(error));
  }
}

function* getProductDetailsData(data) {
  try {
    const data = yield call(getProductDetailsRequest);
    yield put(actions.getProductDetailsSuccess(data));
  } catch (error) {
    yield put(actions.getProductDetailsFailure(error));
  }
}
// Payload = ID
function* getFilterProductFromDB({ payload }) {
  try {

    const data = yield call(getFilterProductRequest, payload);
    yield put(actions.getFilterProductSuccess(data));
  } catch (error) {
    yield put(actions.getFilterProductFailure(error));
  }
}

// David - GET single SKU Product/api/products/{id}
const getSingleSkuProductRequest = async (id) => {
  const result = await api.get(`/products/${id}`);
  return result.data;
};

function* getSingleSkuProductFromDB({ payload }) {
  try {
    const data = yield call(getSingleSkuProductRequest, payload);
    yield put(actions.getSingleSkuProductSuccess(data));
  } catch (error) {
    yield put(actions.getSingleSkuProductFailure(error));
  }
}

// David - PATCH SingleSkuProduct
const patchSingleSkuProductRequest = async (data) => {
  const result = await api.put(`/products/${data.id}`, data);
  return result.data;
};

function* patchSingleSkuProduct({ payload }) {
  try {
    const data = yield call(patchSingleSkuProductRequest, payload);
    yield put(actions.patchSingleSkuProductSuccess(data));
  } catch (error) {
    yield put(actions.patchSingleSkuProductFailure(error));
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

function* setBomData({ payload }) {
  try {
    const data = yield call(setBomRequest, payload);
    yield put(actions.setBomSuccess(data));
  } catch (error) {
    yield put(actions.setBomFailure(error));
  }
}

const getLocationRequest = async (payload) => {
  const data = await api.get(`/stock-location/get-all-location`);
  return data;
};
function* getLocationData(e) {
  try {
    const data = yield call(getLocationRequest);
    yield put(actions.getLocationDetailsSuccess(data));
  } catch (error) {
    yield put(actions.getLocationDetailsFailure(error));
  }
}
const saveStockMoveSkuToDBRequest = async (data) => {
  const result = await api.post(`/stock-operation/createInternalMove`, data);
  return result.data
}

function* saveStockMoveSkuFormDB({ payload }) {
  //let pay={filter: "",limit: 0,orderBy: "",searchText: "",skip: 0}
  try {
    const data = yield call(saveStockMoveSkuToDBRequest, payload);
    yield put(actions.createStockMoveSkuFormSuccess(data))    
  } catch (error) {
    yield put(actions.createStockMoveSkuFormFailure)
  }
}


export function* saveStockMoveSkuFormWatcher() {
  yield takeEvery(types.CREATE_STOCK_MOVE_SKU, saveStockMoveSkuFormDB)
}
//Path sku 
const patchSingleSku = async (data) => {
  const result = await api.patch(`/skus/${data.id}`, data);
  return result.data;
};

function* patchSingleSkuData({ payload }) {
  try {
    const data = yield call(patchSingleSku, payload);
    yield put(actions.patchSingleSkuSuccess(data));
  } catch (error) {
    yield put(actions.patchSingleSkuFailure(error));
  }
}

function* getCsvProductData() {
  try {
    const data = yield call(getCsvProduct);
    yield put(actions.getCsvCreateSuccess(data));
  } catch (error) {
    yield put(actions.getCsvCreateFailure(error));
  }
}
function* postAddStockCreateJournalEntryData({ payload }) {
  try {
    const data = yield call(postAddStockCreateJournalEntry, payload);
    yield put(actions.addStockCreateJournalEntrySuccess(data));
  } catch (error) {
    yield put(actions.addStockCreateJournalEntryFailure(error));
  }
}

function* postStockProductCreateJournalEntryData({ payload }) {
  try {
    const data = yield call(postDeductStockCreateJournalEntry, payload);
    yield put(actions.deductStockCreateJournalEntrySuccess(data));
  } catch (error) {
    yield put(actions.deductStockCreateJournalEntryFailure(error));
  }
}

function* getSavedInventoryQueryData({payload}) {
  try {
    yield put(actions.getSavedInventoryQuerySuccess(payload))
  } catch (error) {
    yield put(actions.getSavedInventoryQueryFailure(error))
  }
}

function* getSavedSKUListQueryData({payload}) {
  try {
    yield put(actions.getSavedSKUListQuerySuccess(payload))
  } catch (error) {
    yield put(actions.getSavedSKUListQueryFailure(error))
  }
}

function* getSavedSKUMainQueryData({payload}) {
  try {
    yield put(actions.getSavedSKUMainQuerySuccess(payload))
  } catch (error) {
    yield put(actions.getSavedSKUMainQueryFailure(error))
  }
}

function* getSavedStockAdjQueryData({payload}) {
  try {
    yield put(actions.getSavedStockAdjQuerySuccess(payload))
  } catch (error) {
    yield put(actions.getSavedStockAdjQueryFailure(error))
  }
}

function* patchStockMergeSkuData({ payload }) {
  try {
    const data = yield call(patchStockMergeSkuRequest, payload);
    yield put(actions.patchStockMergeSkuSuccess(data));
  } catch (error) {
    yield put(actions.patchStockMergeSkuFailure(error));
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* getProductWatcher() {
  yield takeEvery(types.GET_PRODUCT, getProducData);
}
export function* setProductWatcher() {
  yield takeEvery(types.SET_PRODUCT, setProductData);
}

export function* getProductDetailsWatcher() {
  yield takeEvery(types.GET_PRODUCT_DETAILS, getProductDetailsData);
}
export function* getFilterProductWatcher() {
  yield takeEvery(types.GET_FILTER_PRODUCT, getFilterProductFromDB);
}
export function* deleteProductWatcher() {
  yield takeEvery(types.DELETE_PRODUCT, deleteProductFromDB);
}

// David
export function* getSingleSkuProductWatcher() {
  yield takeEvery(types.GET_SINGLE_SKU_PRODUCT_REQUEST, getSingleSkuProductFromDB);
}

export function* patchSingleSkuProductWatcher() {
  yield takeEvery(types.PATCH_SINGLE_SKU_PRODUCT_REQUEST, patchSingleSkuProduct);
}

// Ian- Duplicate product
export function* setDuplicateWatcher() {
  yield takeEvery(types.SET_DUPLICATE, setDuplicateFromDB);
}

// Ian- CLEAR Duplicate product
export function* clearDuplicateWatcher() {
  yield takeEvery(types.CLEAR_DUPLICATE, clearDuplicateFromDB);
}

export function* setBomWatcher() {
  yield takeEvery(types.SET_BOM, setBomData);
}

export function* getLocationWatcher() {
  yield takeEvery(types.GET_LOCATION, getLocationData);
}

export function* patchSingleSkuWatcher() {
  yield takeEvery(types.PATCH_SINGLE_SKU, patchSingleSkuData);
}

export function* getCsvProductWatcher() {
  yield takeEvery(types.CSV_CREATE_PRODUCT_SKU, getCsvProductData);
}

export function* postAddStockCreateJournalEntryWatcher() {
  yield takeEvery(types.POST_ADD_STOCK_CREATE_JOURNAL_ENTRY, postAddStockCreateJournalEntryData);
}

export function* postDeductStockCreateJournalEntryWatcher() {
  yield takeEvery(types.POST_DEDUCT_STOCK_CREATE_JOURNAL_ENTRY, postStockProductCreateJournalEntryData);
}

export function* getSavedInventoryQueryWatcher(){
  yield takeEvery(types.GET_SAVED_INVENTORY_QUERY, getSavedInventoryQueryData)
}

export function* getSavedSKUListQueryWatcher(){
  yield takeEvery(types.GET_SAVED_SKU_LIST_QUERY, getSavedSKUListQueryData)
}

export function* getSavedSKUMainQueryWatcher(){
  yield takeEvery(types.GET_SAVED_SKU_MAIN_QUERY, getSavedSKUMainQueryData)
}

export function* getSavedStockAdjQueryWatcher(){
  yield takeEvery(types.GET_SAVED_STOCK_ADJ_QUERY, getSavedStockAdjQueryData)
}

export function* patchStockMergeSkuWatcher() {
  yield takeEvery(types.PATCH_STOCK_MERGE_SKU, patchStockMergeSkuData)
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* producttfesSaga() {
  yield all([
    fork(getProductWatcher),
    fork(setProductWatcher),
    fork(setDuplicateWatcher),
    fork(clearDuplicateWatcher),
    fork(getProductDetailsWatcher),
    fork(getFilterProductWatcher),
    fork(getSingleSkuProductWatcher),
    fork(patchSingleSkuProductWatcher),
    fork(deleteProductWatcher),
    fork(clearDuplicateWatcher),
    fork(setBomWatcher),
    fork(getLocationWatcher),
    fork(patchSingleSkuWatcher),
    fork(saveStockMoveSkuFormWatcher),
    fork(patchStockMergeSkuWatcher),
    fork(getCsvProductWatcher),
    fork(postAddStockCreateJournalEntryWatcher),
    fork(postDeductStockCreateJournalEntryWatcher),
    fork(getSavedInventoryQueryWatcher),
    fork(getSavedSKUListQueryWatcher),
    fork(getSavedSKUMainQueryWatcher),
    fork(getSavedStockAdjQueryWatcher)
  ]);
}
