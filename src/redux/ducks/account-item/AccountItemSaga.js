import * as actions from "./AccountItemActions";
import api from "Api";
import { all, call, fork, put, takeEvery, delay } from "redux-saga/effects";
import { GET_ALL_ACCOUNT_ITEM, GET_ONE_LINE, CREATE_ACCOUNT_ITEM, PATCH_ACCOUNT_ITEM, DELETE_ACCOUNT_ITEM,GET_CURRENCY_DATA, GET_SAVED_ACCOUNT_QUERY } from "./AccountItemTypes";

//=========================
// REQUESTS
//=========================

const getAllAccountItemFromDBRequest = async ({ limit, skip, filter, searchText, orderBy }) => {
    const result = await api.post(`/account-item/getfilters`, {
        limit: limit,
    skip: skip,
    filter: filter,
    searchText: searchText,
    orderBy: orderBy,
    })
    return result.data
}
const getOneLineFromDBRequest = async (id) => {
    const result = await api.get(`/account-item/${id}`);
    return result.data
}
const createAccountItemToDBRequest = async (data) => {
    const result = await api.post(`/account-item`, data);
    return result.data
}
const patchAccountItemFromDBRequest = async (data) => {
    const result = await api.put(`/account-item/${data.id}`, data);
    return result.data
}
const deleteAccountItemFromDBRequest = async (id) => {
    const result = await api.delete(`/account-item/${id}`);
    return result.data;
}
const getAllCurrencyDataRequest = async () => {
    const data = await api.get(`/account-item/dropdown-currency`)
    return data
}

//=========================
// CALL(GENERATOR) ACTIONS
//=========================


function* getAllAccountItemFromDB({ payload }) {
    try {
        const data = yield call(getAllAccountItemFromDBRequest, payload);
        yield put(actions.getAllAccountItemSuccess(data));
    } catch (error) {
        yield put(actions.getAllAccountItemFailure(error));
    }
}
function* getOneLineFromDB({ payload }) {
    try {
        const data = yield call(getOneLineFromDBRequest, payload);
        yield put(actions.getOneLineAccountItemSuccess(data));
    } catch (error) {
        yield put(actions.getOneLineAccountItemFailure(error));
    }
}
function* createAccountItemFromDB({ payload }) {
    try {
        const data = yield call(createAccountItemToDBRequest, payload);
        yield put(actions.createAccountItemSuccess(data))
    } catch (error) {
        yield put(actions.createAccountItemFailure(error))
    }
}
function* patchAccountItemFromDB({ payload }) {
    try {
        const data = yield call(patchAccountItemFromDBRequest, payload);
        yield put(actions.patchAccountItemSuccess(data))
    } catch (error) {
        yield put(actions.patchAccountItemFailure(error))
    }
}
function* deleteAccountItemFromDB({ payload }) {
    try {
      yield call(deleteAccountItemFromDBRequest, payload);
        yield put(actions.deleteAccountItemSuccess(payload))
    } catch (error) {
        yield put(actions.deleteAccountItemFailure(error))
    }
}
function* getAllCurrencyDataFromDB(data) {
    try {
      const data = yield call(getAllCurrencyDataRequest)
      yield put(actions.getAllCurrencyDataSuccess(data))
    } catch (error) {
      yield put(actions.getAllCurrencyDataFailure(error))
    }
  }

  function* getSavedAccountQueryData({payload}) {
    try {
      yield put(actions.getSavedAccountQuerySuccess(payload))
    } catch (error) {
      yield put(actions.getSavedAccountQueryFailure(error))
    }
  }
  
  //=======================
  // WATCHER FUNCTIONS
  //=======================
  
export function* getAllAccountItemWatcher() {
    yield takeEvery(GET_ALL_ACCOUNT_ITEM, getAllAccountItemFromDB);
}
export function* getOneLineAccountItemWatcher() {
    yield takeEvery(GET_ONE_LINE,getOneLineFromDB)
}
export function* createAccountItemWatcher() {
    yield takeEvery(CREATE_ACCOUNT_ITEM,createAccountItemFromDB)
}
export function* patchAccountItemWatcher() {
    yield takeEvery(PATCH_ACCOUNT_ITEM,patchAccountItemFromDB)
}
export function* deleteAccountItemWatcher() {
    yield takeEvery(DELETE_ACCOUNT_ITEM,deleteAccountItemFromDB)
}
export function* getCurrencyDataWatcher() {
    yield takeEvery(GET_CURRENCY_DATA,getAllCurrencyDataFromDB)
}

export function* getSavedAccountQueryWatcher(){
    yield takeEvery(GET_SAVED_ACCOUNT_QUERY, getSavedAccountQueryData)
  }
  
  //=======================
  // FORK SAGAS TO STORE
  //=======================

export default function* AccountItemSaga() {
    yield all([
        fork(getAllAccountItemWatcher),
        fork(getOneLineAccountItemWatcher),
        fork(createAccountItemWatcher),
        fork(patchAccountItemWatcher),
        fork(deleteAccountItemWatcher),
        fork(getCurrencyDataWatcher),
        fork(getSavedAccountQueryWatcher)
    ]);
}
