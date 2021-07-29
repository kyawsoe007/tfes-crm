import { all, call, fork, put, takeEvery, delay } from "redux-saga/effects";
import api from "Api";

import { GET_ALL_PACKING, GET_PACKING_MOVE_LINE, SAVE_PACKING_FORM, PATCH_SINGLE_SKU_PACKING_ORDER_REQUEST, DELETE_PACKING_ORDER, PATCH_SINGLE_QTY_PACKING, PATCH_CONTAINER_PACKING_ORDER } from "./PackingTypes";
import * as actions from "./PackingActions";
import * as types from "./PackingTypes";

//=========================
// REQUESTS
//=========================

const getAllPackingFromDBRequest = async () => {
  const result = await api.get(`/packing-lists`);
  return result.data;

}

const getFilterPackingRequest = async ({
  limit,
  skip,
  filter,
  searchText,
  orderBy,
}) => {
  const result = await api.post(`/packing-lists/getfilters`, {
    // api.post("/quotationtfess/getfilters"
    limit: limit,
    skip: skip,
    filter: filter,
    searchText: searchText,
    orderBy: orderBy,
  })
  return result.data
}


const getMoveLinesFromDBRequest = async (id) => {
  const result = await api.get(`/packing-lists/${id}`);
  return result.data
}
const savePackingListToDBRequest = async (data) => {
  const result = await api.post(`/packing-lists`, data);
  return result.data
}
//  PATCH
const patchSingleSkuPackingOrderRequest = async (data) => {
  const result = await api.patch(`/packing-lists/${data.id}`, data);
  return result.data;
};
// PATCH Single Qty
const patchSingleQtyPacking = async (data) => {
  const result = await api.patch(`/packing-lists/qty/${data.id}`, data);
  console.log('res', data)
  return result;
};
//PATCH Container
const patchContainerPacking = async (data) => {
  const result = await api.patch(`packing-lists/container/${data.id}`, data);
  return result;
}
// Delete
const deletePackingOrderRequest = async (id) => {
  const result = await api.delete(`/packing-lists/${id}`, { id: id });
  return result.data;
};

//PDF Create
const getPdfCreate = async (id) => {
  window.open(`${api.defaults.baseURL}/packing-lists/pdf/${id}`, id)
}

// Commercial Invoice PDF
const getPackingCommercialInvoicePdfRequest = async (payload) => {
  window.open(`${api.defaults.baseURL}/packing-lists/packing-commercial-invoice-print-Pdf/${payload}`)
}


//=========================
// CALL(GENERATOR) ACTIONS
//=========================

// function with call
function* getAllPackingFromDB() {
  try {
    const data = yield call(getAllPackingFromDBRequest);
    yield put(actions.getAllPackingSuccess(data));
  } catch (error) {
    yield put(actions.getAllPackingFailure(error));
  }
}

function* getFilterPackingFromDB({ payload }) {
  try {
    const data = yield call(getFilterPackingRequest, payload)
    yield put(actions.getFilterPackingSuccess(data))
  } catch (error) {
    yield put(actions.getFilterPackingFailure(error))
  }
}

function* getMoveLinesFromDB({ payload }) {
  try {
    const data = yield call(getMoveLinesFromDBRequest, payload);
    yield put(actions.getMoveLinesSuccess(data));
  } catch (error) {
    yield put(actions.getMoveLinesFailure(error));
  }
}
function* savePackingFormDB({ payload }) {
  try {
    const data = yield call(savePackingListToDBRequest, payload);
    yield put(actions.savePACKINGFormSuccess(data))
  } catch (error) {
    yield put(actions.savePACKINGFormFailure)
  }
}
function* patchSingleSkuPackingOrder({ payload }) {

  console.log("payload", payload)
  try {
    const data = yield call(patchSingleSkuPackingOrderRequest, payload);
    yield put(actions.patchSingleSkuPackingOrderSuccess(data));
    yield put(actions.getMoveLines(payload.id));
  } catch (error) {
    yield put(actions.patchSingleSkuPackingOrderFailure(error));
  }
}
function* patchSingleQtyPackingOrder({ payload }) {
  console.log('sa', payload)
  try {
    const data = yield call(patchSingleQtyPacking, payload);
    yield put(actions.patchSingleQtyPackingSuccess(data));
  } catch (error) {
    yield put(actions.patchSingleQtyPackingFailure(error));
  }
}
function* patchContainerPackingOrder({ payload }) {
  console.log('sa', payload)
  try {
    const data = yield call(patchContainerPacking, payload);
    yield put(actions.patchContainerPackingSuccess(data));
  } catch (error) {
    yield put(actions.patchContainerPackingFailure(error));
  }
}
function* deletePackingOrderFromDB({ payload }) {
  try {
    yield call(deletePackingOrderRequest, payload);
    // yield delay(500);
    yield put(actions.deletePackingOrderSuccess(payload));
  } catch (error) {
    yield put(actions.deletePackingOrderFailure(error));
  }
}

function* getPdfCreateData({ payload }) {
  try {
    const data = yield call(getPdfCreate, payload)
    yield put(actions.getPdfCreateSuccess(data))
  } catch (error) {
    yield put(actions.getPdfCreateFailure(error))
  }
}

function* getPackingCommercialInvoicePdf({ payload }) {
  try {
    yield call(getPackingCommercialInvoicePdfRequest, payload)
    yield put(actions.getPackingCommercialInvoicePdfSuccess())
  } catch (error) {
    yield put(actions.getPackingCommercialInvoicePdfFailure(error))
  }
}

function* getSavedPackingQueryData({payload}) {
  try {
    yield put(actions.getSavedPackingQuerySuccess(payload))
  } catch (error) {
    yield put(actions.getSavedPackingQueryFailure(error))
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================

//Export function with takeEvery
export function* getAllPackingWatcher() {
  yield takeEvery(GET_ALL_PACKING, getAllPackingFromDB);
}

export function* getFilterPackingWatcher() {
  yield takeEvery(types.GET_FILTER_PACKING, getFilterPackingFromDB)
}

export function* getMoveLinesWatcher() {
  yield takeEvery(GET_PACKING_MOVE_LINE, getMoveLinesFromDB)
}
export function* savePackingFormWatcher() {
  yield takeEvery(SAVE_PACKING_FORM, savePackingFormDB)
}
export function* patchSingleSkuPackingOrderWatcher() {
  yield takeEvery(
    PATCH_SINGLE_SKU_PACKING_ORDER_REQUEST,
    patchSingleSkuPackingOrder
  );
}
export function* patchSingleQtyPackingOrderWatcher() {
  yield takeEvery(
    PATCH_SINGLE_QTY_PACKING,
    patchSingleQtyPackingOrder
  );
}
export function* patchContainerPackingOrderWatcher() {
  yield takeEvery(
    PATCH_CONTAINER_PACKING_ORDER,
    patchContainerPackingOrder
  );
}
export function* deletePackingOrderWatcher() {
  yield takeEvery(DELETE_PACKING_ORDER, deletePackingOrderFromDB);
}

export function* getPdfCreateDataWatcher() {
  yield takeEvery(types.PDF_CREATE_PACKING_ORDER, getPdfCreateData)
}
export function* getPackingCommercialInvoicePdfWatcher() {
  yield takeEvery(types.GET_CREATE_COMMERCIAL_INVOICE_PDF, getPackingCommercialInvoicePdf)
}

export function* getSavedPackingQueryWatcher(){
  yield takeEvery(types.GET_SAVED_PACKING_QUERY, getSavedPackingQueryData)
}

//=======================
// FORK SAGAS TO STORE
//=======================

//Export function with fork
export default function* PackingSaga() {
  yield all([
    fork(getAllPackingWatcher),
    fork(getFilterPackingWatcher), 
    fork(getMoveLinesWatcher),
    fork(savePackingFormWatcher),
    fork(patchSingleSkuPackingOrderWatcher),
    fork(deletePackingOrderWatcher),
    fork(patchSingleQtyPackingOrderWatcher),
    fork(patchContainerPackingOrderWatcher),
    fork(getPdfCreateDataWatcher),
    fork(getPackingCommercialInvoicePdfWatcher),
    fork(getSavedPackingQueryWatcher)
  ]);
}