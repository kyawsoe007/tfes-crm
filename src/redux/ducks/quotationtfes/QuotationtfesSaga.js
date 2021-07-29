import {
  all,
  call,
  fork,
  put,
  takeEvery,
  delay,
  select,
} from 'redux-saga/effects'

import * as types from './QuotationtfesTypes'
import * as actions from './QuotationtfesActions'
import api from 'Api'

//=========================
// REQUESTS
//=========================

const setQuotationRequest = async (payload) => {
  const result = await api.post(`/quotations`, payload)
  return result.data
}

// Delete
const deleteQuotationRequest = async (id) => {
  const result = await api.delete(`/quotations/${id}`) // /quotationtfess/deleteSku
  return result.data
}

const getQuotationDetailsRequest = async () => {
  const data = await api.get(`/quotations/dropdown-group`) // /quotationtfess/getAllDetails
  return data
}

const getFilterQuotationRequest = async ({
  limit,
  skip,
  filter,
  searchText,
  orderBy,
}) => {
  const result = await api.post(`/quotations/getfilters`, {
    // api.post("/quotationtfess/getfilters"
    limit: limit,
    skip: skip,
    filter: filter,
    searchText: searchText,
    orderBy: orderBy,
  })
  return result.data
}

  //PDF Create
  const getPdfCreate = async(id)=>{
    // window.open(`${api.defaults.baseURL}/sales-orders/pdf/${id}`,id) 
    window.open(`${api.defaults.baseURL}/quotations/pdf/${id}`,id) 

    console.log(`${api.defaults.baseURL}/quotations/pdf/${id}`)
    console.log('id',id)
  }

//=========================
// CALL(GENERATOR) ACTIONS
//=========================

function* setQuotationData({ payload }) {
  try {
    const data = yield call(setQuotationRequest, payload)
    yield put(actions.setQuotationSuccess(data))
  } catch (error) {
    yield put(actions.setQuotationFailure(error))
  }
}

function* deleteQuotationFromDB({ payload }) {
  try {
    yield call(deleteQuotationRequest, payload)
    // yield delay(500);
    yield put(actions.deleteQuotationSuccess(payload))
  } catch (error) {
    yield put(actions.deleteQuotationFailure(error))
  }
}

function* getQuotationDetailsData(data) {
  try {
    const data = yield call(getQuotationDetailsRequest)
    yield put(actions.getQuotationDetailsSuccess(data))
  } catch (error) {
    yield put(actions.getQuotationDetailsFailure(error))
  }
}
// focus here *******************
function* getFilterQuotationFromDB({ payload }) {
  try {
    const data = yield call(getFilterQuotationRequest, payload)
    yield put(actions.getFilterQuotationSuccess(data))
  } catch (error) {
    yield put(actions.getFilterQuotationFailure(error))
  }
}

// David - GET single SKU Quotation
const getSingleSkuQuotationRequest = async (id) => {
  const result = await api.get(`/quotations/${id}`)
  return result.data
}

function* getSingleSkuQuotationFromDB({ payload }) {
  try {
    const data = yield call(getSingleSkuQuotationRequest, payload)
    yield put(actions.getSingleSkuQuotationSuccess(data))
  } catch (error) {
    yield put(actions.getSingleSkuQuotationFailure(error))
  }
}

// David - PATCH SingleSkuQuotation
const patchSingleSkuQuotationRequest = async (data) => {
  const result = await api.patch(`/quotations/${data.id}`, data)
  return result.data
}

function* patchSingleSkuQuotation({ payload }) {
  try {
    const data = yield call(patchSingleSkuQuotationRequest, payload)
    yield put(actions.patchSingleSkuQuotationSuccess(data))
  } catch (error) {
    yield put(actions.patchSingleSkuQuotationFailure(error))
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

function* getPdfCreateData({payload}) {
  try {
    const data=yield call(getPdfCreate,payload)
    yield put(actions.getPdfCreateSuccess(data))
  } catch (error) {
    yield put(actions.getPdfCreateFailure(error))
  }
}

function* getSavedQuotationQueryData({payload}) {
  try {
    yield put(actions.getSavedQuotationQuerySuccess(payload))
  } catch (error) {
    yield put(actions.getSavedQuotationQueryFailure(error))
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================

export function* setQuotationWatcher() {
  yield takeEvery(types.SET_QUOTATION, setQuotationData)
}

export function* getQuotationDetailsWatcher() {
  yield takeEvery(types.GET_QUOTATION_DETAILS, getQuotationDetailsData)
}
export function* getFilterQuotationWatcher() {
  yield takeEvery(types.GET_FILTER_QUOTATION_REQUEST, getFilterQuotationFromDB)
}
export function* deleteQuotationWatcher() {
  yield takeEvery(types.DELETE_QUOTATION, deleteQuotationFromDB)
}

// David
export function* getSingleSkuQuotationWatcher() {
  yield takeEvery(
    types.GET_SINGLE_SKU_QUOTATION_REQUEST,
    getSingleSkuQuotationFromDB,
  )
}

export function* patchSingleSkuQuotationWatcher() {
  yield takeEvery(
    types.PATCH_SINGLE_SKU_QUOTATION_REQUEST,
    patchSingleSkuQuotation,
  )
}

// Ian- Duplicate quotation
export function* setDuplicateWatcher() {
  yield takeEvery(types.SET_DUPLICATE, setDuplicateFromDB)
}

// Ian- CLEAR Duplicate quotation
export function* clearDuplicateWatcher() {
  yield takeEvery(types.CLEAR_DUPLICATE, clearDuplicateFromDB)
}

// SET NEW VERSION

// Create new Sales Order
const setNewVersionRequest = async (payload) => {
  const result = await api.post(
    `/quotations/create-new-version/${payload}`,
    payload,
  )
  return result.data
}

function* setNewVersionData({ payload }) {
  try {
    const data = yield call(setNewVersionRequest, payload)
    yield put(actions.setNewVersionSuccess(data))
  } catch (error) {
    yield put(actions.setNewVersionFailure(error))
  }
}

export function* setNewVersionWatcher() {
  yield takeEvery(types.SET_NEW_VERSION_REQUEST, setNewVersionData)
}

export function* getPdfCreateDataWatcher(){
  yield takeEvery(types.PDF_CREATE_QUOTATION_ORDER,getPdfCreateData)
}

export function* getSavedQuotationQueryWatcher(){
  yield takeEvery(types.GET_SAVED_QUOTATION_QUERY, getSavedQuotationQueryData)
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* quotationtfesSaga() {
  yield all([
    fork(setQuotationWatcher),
    fork(setDuplicateWatcher),
    fork(clearDuplicateWatcher),
    fork(getQuotationDetailsWatcher),
    fork(getFilterQuotationWatcher),
    fork(getSingleSkuQuotationWatcher),
    fork(patchSingleSkuQuotationWatcher),
    fork(deleteQuotationWatcher),
    fork(clearDuplicateWatcher),
    fork(setNewVersionWatcher),
    fork(getPdfCreateDataWatcher),
    fork(getSavedQuotationQueryWatcher)
  ])
}
