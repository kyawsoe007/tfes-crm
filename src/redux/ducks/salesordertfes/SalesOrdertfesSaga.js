import {
  all,
  call,
  fork,
  put,
  takeEvery,
  delay,
  select
} from 'redux-saga/effects'

import * as types from './SalesOrdertfesTypes'
import * as actions from './SalesOrdertfesActions'
import api from 'Api'

//=========================
// REQUESTS
//=========================
const getSalesOrderRequest = async (payload) => {
  const data = await api.get(`/SalesOrdertfess/getAll`)
  return data
}

const setSalesOrderRequest = async (payload) => {
  console.log(payload);
  const result = await api.post(`/sales-orders`, payload)
  console.log('redux', result)
  return result.data
}

// Delete
const deleteSalesOrderRequest = async (id) => {
  const result = await api.delete(`/sales-orders/${id}`, { id: id }) // /SalesOrdertfess/deleteSku
  return result.data
}

const getSalesOrderDetailsRequest = async () => {
  const data = await api.get(`/SalesOrders/dropdown-group`) // /SalesOrdertfess/getAllDetails
  return data
}

const getFilterSalesOrderRequest = async ({
  limit,
  skip,
  filter,
  searchText,
  orderBy
}) => {
  const result = await api.post(`/sales-orders/getfilters`, {
    // api.post("/SalesOrdertfess/getfilters"
    limit: limit,
    skip: skip,
    filter: filter,
    searchText: searchText,
    orderBy: orderBy
  })
  return result.data
}

// David - GET single SalesOrder
const getSingleSkuSalesOrderRequest = async (id) => {
  const result = await api.get(`/sales-orders/${id}`)
  return result.data
}

// David - PATCH Single SalesOrder
const patchSingleSkuSalesOrderRequest = async (data) => {
  const result = await api.patch(`/sales-orders/${data.id}`, data)
  return result.data
}

// Set New Version Sales Order
const setNewVersionSalesOrderRequest = async (id) => {
  const result = await api.post(`/sales-orders/create-new-version/${id}`)
  return result.data
}

//PDF Create
const getPdfCreate = async (id) => {
  window.open(`${api.defaults.baseURL}/sales-orders/pdf/${id}`)
}
const getCommercialInvoicePdfRequest = async (id) => {
  console.log("getCommercialInvoicePdfRequest in saga",id),
  window.open(`${api.defaults.baseURL}/sales-orders/commercial-invoice-print-Pdf/${id}`)
}
const getProformaInvoicePdfRequest = async (id) => {
  console.log("getProformaInvoicePdfRequest in saga",id),
  window.open(`${api.defaults.baseURL}/sales-orders/proforma-invoice-print-Pdf/${id}`)
}

const patchSingleSaleInternalRemarks = async(payload)=>{
  const result = await api.patch(`/sales-orders/newRemark/${payload.id}`, payload);
  return result.data;
}

const getPurchaseTempListRequest = async(payload)=>{
  // const result = await api.get(`/Purchase-List-Temp/findAllPOListTempBySalesOrderIdNonChecked/${payload}`);
  const result = await api.get(`/Purchase-List-Temp/findAllPOListTempBySalesOrderId/${payload}`);
  return result.data;
}

const postPurchaseTempListRequest = async(payload)=>{
  console.log("erererer", payload)
  const result = await api.post(`purchase/createBySelection`, payload);

  console.log("DATA", result)
  return result.data;
}



//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getSalesOrderData(e) {
  try {
    yield call(getSalesOrderRequest, e)

    yield put(actions.getSalesOrderSuccess())
  } catch (error) {
    yield put(actions.getSalesOrderFailure(error))
  }
}

function* setSalesOrderData({ payload }) {
  try {
    const data = yield call(setSalesOrderRequest, payload)
    yield put(actions.setSalesOrderSuccess(data))
  } catch (error) {
    yield put(actions.setSalesOrderFailure(error))
  }
}

function* deleteSalesOrderFromDB({ payload }) {
  try {
    yield call(deleteSalesOrderRequest, payload)
    // yield delay(500);
    yield put(actions.deleteSalesOrderSuccess(payload))
  } catch (error) {
    yield put(actions.deleteSalesOrderFailure(error))
  }
}

function* getSalesOrderDetailsData(data) {
  try {
    const data = yield call(getSalesOrderDetailsRequest)
    yield put(actions.getSalesOrderDetailsSuccess(data))
  } catch (error) {
    yield put(actions.getSalesOrderDetailsFailure(error))
  }
}
// Payload = ID
function* getFilterSalesOrderFromDB({ payload }) {
  try {
    const data = yield call(getFilterSalesOrderRequest, payload)
    yield put(actions.getFilterSalesOrderSuccess(data))
  } catch (error) {
    yield put(actions.getFilterSalesOrderFailure(error))
  }
}

function* setNewVersionSalesOrderData({ payload }) {
  try {
    const data = yield call(setNewVersionSalesOrderRequest, payload)
    yield put(actions.setNewVersionSalesOrderSuccess(data))
  } catch (error) {
    yield put(actions.setNewVersionSalesOrderFailure(error))
  }
}

function* getSingleSkuSalesOrderFromDB({ payload }) {
  try {
    const data = yield call(getSingleSkuSalesOrderRequest, payload)
    yield put(actions.getSingleSkuSalesOrderSuccess(data))
  } catch (error) {
    yield put(actions.getSingleSkuSalesOrderFailure(error))
  }
}

function* patchSingleSkuSalesOrder({ payload }) {
  try {
    const data = yield call(patchSingleSkuSalesOrderRequest, payload)
    yield put(actions.patchSingleSkuSalesOrderSuccess(data))
  } catch (error) {
    yield put(actions.patchSingleSkuSalesOrderFailure(error))
  }
}

function* setDuplicateFromDB({ payload }) {
  try {
    yield put(actions.setDuplicateSuccess(payload))
  } catch (error) {
    yield put(actions.setDuplicateFailure(error))
  }
}

function* clearDuplicateFromDB() {
  try {
    yield put(actions.clearDuplicateSuccess)
  } catch (error) {
    yield put(actions.clearDuplicateFailure(error))
  }
}

function* convertToSalesOrderFromQuotation({ payload }) {
  try {
    yield put(actions.convertToSalesOrderSuccess(payload))
  } catch (error) {
    yield put(actions.convertToSalesOrderFailure(error))
  }
}

//PDF Create
function* getPdfCreateData({ payload }) {
  try {
    const data = yield call(getPdfCreate, payload)
    yield put(actions.getPdfCreateSuccess(data))
  } catch (error) {
    yield put(actions.getPdfCreateFailure(error))
  }
}
// Commercial Invoice Pdf
function* getCommercialInvoicePdfData({ payload }) {
  try {
    const data = yield call(getCommercialInvoicePdfRequest, payload)
    yield put(actions.getProformaInvoicePdfSuccess(data))
  } catch (error) {
    yield put(actions.getProformaInvoicePdfFailure(error))
  }
}
// Proforma Invoice Pdf
function* getProformaInvoicePdfData({ payload }) {
  try {
    const data = yield call(getProformaInvoicePdfRequest, payload)
    yield put(actions.getProformaInvoicePdfSuccess(data))
  } catch (error) {
    yield put(actions.getProformaInvoicePdfFailure(error))
  }
}

//PDF Create
function* patchSingleSaleInternalRemarksData({ payload }) {
  try {
    const data = yield call(patchSingleSaleInternalRemarks, payload)
    yield put(actions.patchSingleSalesRequestInternalRemarksSuccess(data))
  } catch (error) {
    yield put(actions.patchSingleSalesRequestInternalRemarksFailure(error))
  }
}

// For commercial sales order
function* getSavedSalesQueryData({payload}) {
  try {
    yield put(actions.getSavedSalesQuerySuccess(payload))
  } catch (error) {
    yield put(actions.getSavedSalesQueryFailure(error))
  }
}

// For accounting sales order
function* getSavedAcctSalesQueryData({payload}) {
  try {
    yield put(actions.getSavedAcctSalesQuerySuccess(payload))
  } catch (error) {
    yield put(actions.getSavedAcctSalesQueryFailure(error))
  }
}

function* getPurchaseTempListData({payload}) {
  try {
    const data = yield call(getPurchaseTempListRequest, payload)
    yield put(actions.getPurchaseTempListSuccess(data))
  } catch (error) {
    yield put(actions.getPurchaseTempListFailure(error))
  }
}

function* postPurchaseTempListData({payload}) {
  try {
    const data = yield call(postPurchaseTempListRequest, payload)
    yield put(actions.postPurchaseTempListSuccess(data))
  } catch (error) {
    yield put(actions.postPurchaseTempListFailure(error))
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* getSalesOrderWatcher() {
  yield takeEvery(types.GET_SALES_ORDER, getSalesOrderData)
}
export function* setSalesOrderWatcher() {
  yield takeEvery(types.SET_SALES_ORDER, setSalesOrderData)
}

export function* getSalesOrderDetailsWatcher() {
  yield takeEvery(types.GET_SALES_ORDER_DETAILS, getSalesOrderDetailsData)
}
export function* getFilterSalesOrderWatcher() {
  yield takeEvery(types.GET_FILTER_SALES_ORDER, getFilterSalesOrderFromDB)
}
export function* deleteSalesOrderWatcher() {
  yield takeEvery(types.DELETE_SALES_ORDER, deleteSalesOrderFromDB)
}

// David
export function* getSingleSkuSalesOrderWatcher() {
  yield takeEvery(
    types.GET_SINGLE_SKU_SALES_ORDER_REQUEST,
    getSingleSkuSalesOrderFromDB
  )
}

export function* patchSingleSkuSalesOrderWatcher() {
  yield takeEvery(
    types.PATCH_SINGLE_SKU_SALES_ORDER_REQUEST,
    patchSingleSkuSalesOrder
  )
}

// Ian- Duplicate SalesOrder
export function* setDuplicateWatcher() {
  yield takeEvery(types.SET_DUPLICATE, setDuplicateFromDB)
}

// Ian- CLEAR Duplicate SalesOrder
export function* clearDuplicateWatcher() {
  yield takeEvery(types.CLEAR_DUPLICATE, clearDuplicateFromDB)
}

export function* convertToSalesOrderWatcher() {
  yield takeEvery(
    types.CONVERT_TO_SALES_ORDER_REQUEST,
    convertToSalesOrderFromQuotation
  )
}

export function* setNewVersionSalesOrderWatcher() {
  yield takeEvery(
    types.SET_NEW_VERSION_SALESORDER_REQUEST,
    setNewVersionSalesOrderData
  )
}

//Create Pdf
export function* getPdfCreateDataWatcher() {
  yield takeEvery(types.PDF_CREATE_SALES_ORDER, getPdfCreateData)
}

export function* getCommercialInvoicePdfDataWatcher() {
  yield takeEvery(types.GET_SALESORDER_COMMERCIAL_INVOICE_PDF, getCommercialInvoicePdfData)
}
export function* getProformaInvoicePdfDataWatcher() {
  yield takeEvery(types.GET_SALESORDER_PROFORMA_INVOICE_PDF, getProformaInvoicePdfData)
}

//patch internal remarks 
export function* patchSingleSaleInternalRemarksWatcher() {
  yield takeEvery(types.PATCH_SINGLE_SALES_REQUEST_INTERNAL_REMARKS, patchSingleSaleInternalRemarksData)
}

// save query for commercial sales order
export function* getSavedSalesQueryWatcher(){
  yield takeEvery(types.GET_SAVED_SALES_QUERY, getSavedSalesQueryData)
}

// save query for accounting sales order
export function* getSavedAcctSalesQueryWatcher(){
  yield takeEvery(types.GET_SAVED_ACCT_SALES_QUERY, getSavedAcctSalesQueryData)
}

// get purchase temp list 
export function* getPurchaseTempListWatcher(){
  yield takeEvery(types.GET_PURCHASE_TEMP_LIST, getPurchaseTempListData)
}

// post purchase temp list 
export function* postPurchaseTempListWatcher(){
  yield takeEvery(types.POST_PURCHASE_TEMP_LIST, postPurchaseTempListData)
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* SalesOrdertfesSaga() {
  yield all([
    fork(getSalesOrderWatcher),
    fork(setSalesOrderWatcher),
    fork(setDuplicateWatcher),
    fork(clearDuplicateWatcher),
    fork(getSalesOrderDetailsWatcher),
    fork(getFilterSalesOrderWatcher),
    fork(getSingleSkuSalesOrderWatcher),
    fork(patchSingleSkuSalesOrderWatcher),
    fork(deleteSalesOrderWatcher),
    fork(clearDuplicateWatcher),
    fork(convertToSalesOrderWatcher),
    fork(setNewVersionSalesOrderWatcher),
    fork(getPdfCreateDataWatcher),
    fork(patchSingleSaleInternalRemarksWatcher),
    fork(getSavedSalesQueryWatcher),
    fork(getPurchaseTempListWatcher),
    fork(postPurchaseTempListWatcher),
    fork(getCommercialInvoicePdfDataWatcher),
    fork(getProformaInvoicePdfDataWatcher)
  ])
}
