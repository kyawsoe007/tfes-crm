import {
    all,
    call,
    fork,
    put,
    takeEvery,
    delay,
    select
} from 'redux-saga/effects'
  
  import * as types from './LoanTypes'
  import * as actions from './LoanActions'
  import api from 'Api'

  //=========================
// REQUESTS
//=========================
// Get all
const getAllLongLoansRequest =async (payload) =>{
  const data = await api.get(`/loan-long-term`)
  return data
}

/*
const getAllShortLoansRequest =async (payload) =>{
  const data = await api.get(`/loan-short-term`)
  return data
}
*/

const getFilterShortTermRequestFromDBRequest = async ({
  limit,
  skip,
  filter,
  searchText,
  orderBy,
}) => {
  const result = await api.post(`/loan-short-term/getfilters`, {
    limit: limit,
    skip: skip,
    filter: filter,
    searchText: searchText,
    orderBy: orderBy,
  });
  return result.data;
};
// Get single 
const getSingleLongTermLoanRequest = async (id) => {
  const result = await api.get(`/loan-long-term/${id.payload}`)
  return result.data
}
const getSingleShortTermLoanRequest = async (id) => {
  const result = await api.get(`/loan-short-term/${id.payload}`)
  return result.data
}
// Post single
const postSingleLongTermLoanRequest = async (payload) => {
  const result = await api.post(`/loan-long-term`, payload)
  return result.data
}
const postSingleShortTermLoanRequest = async (payload) => {
  const result = await api.post(`/loan-short-term`, payload)
  return result.data
}
// Patch single
const patchSingleLongTermLoanRequest = async (data) => {
  const result = await api.patch(`/loan-long-term/${data.id}`, data)
  return result.data
}
const patchSingleShortTermLoanRequest = async (data) => {
  const result = await api.patch(`/loan-short-term/${data.id}`, data)
  return result.data
}
// Delete 
const deleteLongLoanRequest = async (id) => {
  console.log("deleteLongLoanRequest",id)
    const result = await api.delete(`/loan-long-term/${id}`, { id: id }) //loan-long-term
    return id
}
const deleteShortLoanRequest = async (id) => {
    const result = await api.delete(`/loan-short-term/${id}`, { id: id }) //loan-short-term
    return id
}

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
// Get all
function* getAllLongLoansData(e) {
  try {
    const data = yield call(getAllLongLoansRequest, e)
    yield put(actions.getAllLongTermLoansSuccess(data))
  } catch (error) {
    yield put(actions.getAllLongTermLoansFailure(error))
  }
}
function* getAllShortLoansData({ payload }) {
  try {
    const data = yield call(getFilterShortTermRequestFromDBRequest, payload)
    yield put(actions.getAllShortTermLoansSuccess(data))
  } catch (error) {
    yield put(actions.getAllShortTermLoansFailure(error))
  }
}
// Get single 
function* getSingleLongTermLoanFromDB(payload) {
  try {
    const data = yield call(getSingleLongTermLoanRequest,payload)
    yield put(actions.getSingleLongTermLoanSuccess(data))
  } catch (error) {
    yield put(actions.getSingleLongTermLoanFailure(error))
  }
}
function* getSingleShortTermLoanFromDB(payload) {
  try {
    const data = yield call(getSingleShortTermLoanRequest,payload)
    yield put(actions.getSingleShortTermLoanSuccess(data))
  } catch (error) {
    yield put(actions.getSingleShortTermLoanFailure(error))
  }
}
// Post single
function* postSingleLongTermLoanFromDB({ payload }) {
  try {
    const data = yield call(postSingleLongTermLoanRequest, payload)
    yield put(actions.postSingleLongTermLoanSuccess(data))
  } catch (error) {
    yield put(actions.postSingleLongTermLoanFailure(error))
  }
}
function* postSingleShortTermLoanFromDB({ payload }) {
  try {
    const data = yield call(postSingleShortTermLoanRequest, payload)
    yield put(actions.postSingleShortTermLoanSuccess(data))
  } catch (error) {
    yield put(actions.postSingleShortTermLoanFailure(error))
  }
}
// Patch single
function* patchSingleLongTermLoanToDB({ payload }) {
  try {
    const data = yield call(patchSingleLongTermLoanRequest, payload)
    yield put(actions.patchSingleLongTermLoanSuccess(data))
  } catch (error) {
    yield put(actions.patchSingleLongTermLoanFailure(error))
  }
}
function* patchSingleShortTermLoanToDB({ payload }) {
  try {
    const data = yield call(patchSingleShortTermLoanRequest, payload)
    yield put(actions.patchSingleShortTermLoanSuccess(data))
  } catch (error) {
    yield put(actions.patchSingleShortTermLoanFailure(error))
  }
}
// Delete 
function* deleteLongLoanFromDB({ payload }) {
    try {
      yield call(deleteLongLoanRequest, payload)
      yield put(actions.deleteLongTermLoanSuccess(payload))
    } catch (error) {
      yield put(actions.deleteLongTermLoanFailure(error))
    }
}
function* deleteShortLoanFromDB({ payload }) {
  debugger
    try {
      yield call(deleteShortLoanRequest, payload)
      yield put(actions.deleteShortTermLoanSuccess(payload))
    } catch (error) {
      yield put(actions.deleteShortTermLoanFailure(error))
    }
}

function* getSavedShortLoanQueryData({payload}) {
  try {
    yield put(actions.getSavedShortLoanQuerySuccess(payload))
  } catch (error) {
    yield put(actions.getSavedShortLoanQueryFailure(error))
  }
}

function* getSavedLongLoanQueryData({payload}) {
  try {
    yield put(actions.getSavedLongLoanQuerySuccess(payload))
  } catch (error) {
    yield put(actions.getSavedLongLoanQueryFailure(error))
  }
}


//=======================
// WATCHER FUNCTIONS
//=======================
// Get all
export function* getAllLongLoansWatcher() {
  yield takeEvery(types.GET_ALL_LONG_TERM_LOANS, getAllLongLoansData)
}
export function* getAllShortLoanWatcher() {
  yield takeEvery(types.GET_ALL_SHORT_TERM_LOANS, getAllShortLoansData)
}
// Get single 
export function* getSingleLongTermLoanWatcher() {
  yield takeEvery(types.GET_SINGLE_LONG_TERM_LOAN, getSingleLongTermLoanFromDB)
}
export function* getSingleShortTermLoanWatcher() {
  yield takeEvery(types.GET_SINGLE_SHORT_TERM_LOAN, getSingleShortTermLoanFromDB)
}
// Post single
export function* postSingleLongTermLoanWatcher() {
  yield takeEvery(types.POST_SINGLE_LONG_TERM_LOAN, postSingleLongTermLoanFromDB)
}
export function* postSingleShortTermLoanWatcher() {
  yield takeEvery(types.POST_SINGLE_SHORT_TERM_LOAN, postSingleShortTermLoanFromDB)
}
// Patch single
export function* patchSingleLongTermLoanWatcher() {
  yield takeEvery(types.PATCH_SINGLE_LONG_TERM_LOAN, patchSingleLongTermLoanToDB)
}
export function* patchSingleShortTermLoanWatcher() {
  yield takeEvery(types.PATCH_SINGLE_SHORT_TERM_LOAN, patchSingleShortTermLoanToDB)
}
// Delete 
export function* deleteLongLoanWatcher() {
    yield takeEvery(types.DELETE_LONG_TERM_LOAN, deleteLongLoanFromDB)
}
export function* deleteShortLoanWatcher() {
    yield takeEvery(types.DELETE_SHORT_TERM_LOAN, deleteShortLoanFromDB)
}

export function* getSavedShortLoanQueryWatcher(){
  yield takeEvery(types.GET_SAVED_SHORT_LOAN_QUERY, getSavedShortLoanQueryData)
}

export function* getSavedLongLoanQueryWatcher(){
  yield takeEvery(types.GET_SAVED_LONG_LOAN_QUERY, getSavedLongLoanQueryData)
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* LoanSaga() {
    yield all([
      fork(getAllLongLoansWatcher),
      fork(getAllShortLoanWatcher),
      fork(getSingleLongTermLoanWatcher),
      fork(getSingleShortTermLoanWatcher),
      fork(postSingleLongTermLoanWatcher),
      fork(postSingleShortTermLoanWatcher),
      fork(patchSingleLongTermLoanWatcher),
      fork(patchSingleShortTermLoanWatcher),
      fork(deleteLongLoanWatcher),
      fork(deleteShortLoanWatcher),
      fork(getSavedShortLoanQueryWatcher),
      fork(getSavedLongLoanQueryWatcher)
    ])
  }
  
  