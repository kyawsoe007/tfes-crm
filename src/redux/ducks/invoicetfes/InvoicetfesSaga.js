import {
  all,
  call,
  fork,
  put,
  takeEvery,
  delay,
  select
} from 'redux-saga/effects'

import * as types from './InvoicetfesTypes'
import * as actions from './InvoicetfesActions'
import api from 'Api'

//=========================
// REQUESTS
//=========================
const getInvoiceRequest = async (payload) => {
  const data = await api.get(`/Invoicetfess/getAll`)
  return data
}

const setInvoiceRequest = async (payload) => {
  const result = await api.post(`/invoices`, payload)
  return result.data
}

// Delete
const deleteInvoiceRequest = async (id) => {
  const result = await api.delete(`/invoices/${id}`, { id: id }) // /Invoicetfess
  return id
}

const getInvoiceDetailsRequest = async () => {
  const data = await api.get(`/Invoices/dropdown-group`) // /Invoicetfess/getAllDetails
  return data
}

const getFilterInvoiceRequest = async ({
  limit,
  skip,
  filter,
  searchText,
  orderBy
}) => {
  const result = await api.post(`/invoices/getfilters`, {
    limit: limit,
    skip: skip,
    filter: filter,
    searchText: searchText,
    orderBy: orderBy
  })
  return result.data
}

// David - GET single Invoice
const getSingleInvoiceFromDBRequest = async (id) => {
  const result = await api.get(`/invoices/${id}`)
  return result.data
}

// David - PATCH Single Invoice
const patchSingleInvoiceToDBRequest = async (data) => {
  const result = await api.patch(`/invoices/${data.id}`, data)
  return result.data
}

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getInvoiceData(e) {
  try {
    const data = yield call(getInvoiceRequest, e)
    yield put(actions.getInvoiceSuccess(data))
  } catch (error) {
    yield put(actions.getInvoiceFailure(error))
  }
}

function* setInvoiceData({ payload }) {
  try {
    const data = yield call(setInvoiceRequest, payload)
    yield put(actions.setInvoiceSuccess(data))
  } catch (error) {
    yield put(actions.setInvoiceFailure(error))
  }
}

function* deleteInvoiceFromDB({ payload }) {
  try {
    yield call(deleteInvoiceRequest, payload)
    yield put(actions.deleteInvoiceSuccess(payload))
  } catch (error) {
    yield put(actions.deleteInvoiceFailure(error))
  }
}

function* getDropdownGroupFromDB(data) {
  try {
    const data = yield call(getInvoiceDetailsRequest)
    yield put(actions.getInvoiceDetailsSuccess(data))
  } catch (error) {
    yield put(actions.getInvoiceDetailsFailure(error))
  }
}
// Payload = ID
function* getFilterInvoiceFromDB({ payload }) {
  try {
    const data = yield call(getFilterInvoiceRequest, payload)
    yield put(actions.getFilterInvoiceSuccess(data))
  } catch (error) {
    yield put(actions.getFilterInvoiceFailure(error))
  }
}

function* getSingleInvoiceFromDB({ payload }) {
  try {
    const data = yield call(getSingleInvoiceFromDBRequest, payload)
    yield put(actions.getSingleInvoiceSuccess(data))
  } catch (error) {
    yield put(actions.getSingleInvoiceFailure(error))
  }
}

function* patchSingleInvoiceToDB({ payload }) {
  try {
    const data = yield call(patchSingleInvoiceToDBRequest, payload)
    yield put(actions.patchSingleInvoiceSuccess(data))
  } catch (error) {
    yield put(actions.patchSingleInvoiceFailure(error))
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

function* getSavedInvoiceQueryData({payload}) {
  try {
    yield put(actions.getSavedInvoiceQuerySuccess(payload))
  } catch (error) {
    yield put(actions.getSavedInvoiceQueryFailure(error))
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* getInvoiceWatcher() {
  yield takeEvery(types.GET_INVOICE, getInvoiceData)
}
export function* setInvoiceWatcher() {
  yield takeEvery(types.SET_INVOICE, setInvoiceData)
}

export function* getInvoiceDetailsWatcher() {
  yield takeEvery(types.GET_INVOICE_DETAILS, getInvoiceDetailsData)
}
export function* getFilterInvoiceWatcher() {
  yield takeEvery(types.GET_FILTER_INVOICE, getFilterInvoiceFromDB)
}
export function* deleteInvoiceWatcher() {
  yield takeEvery(types.DELETE_INVOICE, deleteInvoiceFromDB)
}

// Ian- Duplicate Invoice
export function* setDuplicateWatcher() {
  yield takeEvery(types.SET_DUPLICATE, setDuplicateFromDB)
}

// Ian- CLEAR Duplicate Invoice
export function* clearDuplicateWatcher() {
  yield takeEvery(types.CLEAR_DUPLICATE, clearDuplicateFromDB)
}

export function* getSingleInvoiceWatcher() {
  yield takeEvery(types.GET_SINGLE_INVOICE_REQUEST, getSingleInvoiceFromDB)
}

export function* patchSingleInvoiceWatcher() {
  yield takeEvery(types.PATCH_SINGLE_INVOICE, patchSingleInvoiceToDB)
}

const getTaxInvoicePdfRequest = async (payload) => {
  window.open(`${api.defaults.baseURL}/invoices/tax-invoice-print-Pdf/${payload}`)
}

function* getTaxInvoicePdf({ payload }) {
  try {
    yield call(getTaxInvoicePdfRequest, payload)
    yield put(actions.getTaxInvoicePdfSuccess())
  } catch (error) {
    yield put(actions.getTaxInvoicePdfFailure(error))
  }
}

export function* getTaxInvoicePdfWatcher() {
  yield takeEvery(types.GET_TAX_INVOICE_PDF, getTaxInvoicePdf)
}

// Proforma Invoice PDF
const getProformaInvoicePdfRequest = async (payload) => {
  window.open(`${api.defaults.baseURL}/invoices/proforma-invoice-print-Pdf/${payload}`)
}

function* getProformaInvoicePdf({ payload }) {
  try {
    yield call(getProformaInvoicePdfRequest, payload)
    yield put(actions.getProformaInvoicePdfSuccess())
  } catch (error) {
    yield put(actions.getProformaInvoicePdfFailure(error))
  }
}

export function* getProformaInvoicePdfWatcher() {
  yield takeEvery(types.GET_PROFORMA_INVOICE_PDF, getProformaInvoicePdf)
}

// Commercial Invoice PDF
const getCommercialInvoicePdfRequest = async (payload) => {
  window.open(`${api.defaults.baseURL}/invoices/commercial-invoice-print-Pdf/${payload}`)
}

function* getCommercialInvoicePdf({ payload }) {
  try {
    yield call(getCommercialInvoicePdfRequest, payload)
    yield put(actions.getCommercialInvoicePdfSuccess())
  } catch (error) {
    yield put(actions.getCommercialInvoicePdfFailure(error))
  }
}

export function* getCommercialInvoicePdfWatcher() {
  yield takeEvery(types.GET_COMMERCIAL_INVOICE_PDF, getCommercialInvoicePdf)
}

// save query 
export function* getSavedInvoiceQueryWatcher(){
  yield takeEvery(types.GET_SAVED_INVOICE_QUERY, getSavedInvoiceQueryData)
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* InvoicetfesSaga() {
  yield all([
    fork(getInvoiceWatcher),
    fork(setInvoiceWatcher),
    fork(setDuplicateWatcher),
    fork(clearDuplicateWatcher),
    fork(getFilterInvoiceWatcher),
    fork(deleteInvoiceWatcher),
    fork(clearDuplicateWatcher),
    fork(getSingleInvoiceWatcher),
    fork(patchSingleInvoiceWatcher),
    fork(getTaxInvoicePdfWatcher),
    fork(getProformaInvoicePdfWatcher),
    fork(getCommercialInvoicePdfWatcher),
    fork(getSavedInvoiceQueryWatcher)
  ])
}
