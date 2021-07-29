import {
    all,
    call,
    fork,
    put,
    takeEvery,
    delay,
    select
} from 'redux-saga/effects'

import * as types from './ExpenseClaimsTypes'
import * as actions from './ExpenseClaimsActions'
import api from 'Api'

//=========================
// REQUESTS
//=========================

const getAllExpenseClaimsRequest = async (payload) => {
    // this section needs to change to getFilter call 
    const result = await api.get(`/expenses-claim`);
    return result.data
}

const getAllFilterExpenseClaimsRequest = async ({ limit, skip, filter, searchText, orderBy }) => {
    // this section needs to change to getFilter call 
    const result = await api.post(`/expenses-claim/getfilters`, {
        limit: limit,
        skip: skip,
        filter: filter,
        searchText: searchText,
        orderBy: orderBy
    });
    return result.data
}

const postExpenseClaimsDataRequest = async (payload) => {
    const result = await api.post(`/expenses-claim`, payload)
    return result.data
}

const getExpenseClaimsDataRequest = async (payload) => {
    const result = await api.get(`/expenses-claim/${payload}`,)
    return result.data
}

const patchExpenseClaimsDataRequest = async (payload) => {

    // console.log(payload)
    // return true
    const result = await api.patch(`/expenses-claim/${payload.id}`, payload)
    return result.data
}

const deleteExpenseClaimsDataRequest = async (payload) => {
    const result = await api.delete(`/expenses-claim/${payload}`,)
    return result.data
}

//=========================
// CALL(GENERATOR) ACTIONS
//=========================

function* getAllExpenseClaimsData({ payload }) {
    try {
        const data = yield call(getAllExpenseClaimsRequest, payload)
        yield put(actions.getAllExpenseClaimsSuccess(data))
    } catch (error) {
        yield put(actions.getAllExpenseClaimsFailure(error))
    }
}

function* getAllFilterExpenseClaimsData({ payload }) {
    try {
        const data = yield call(getAllFilterExpenseClaimsRequest, payload)
        yield put(actions.getAllFilterExpenseClaimsSuccess(data))
    } catch (error) {
        yield put(actions.getAllFilterExpenseClaimsFailure(error))
    }
}

function* postExpenseClaimsData({ payload }) {
    try {
        const data = yield call(postExpenseClaimsDataRequest, payload)
        yield put(actions.postExpenseClaimsSuccess(data))
    } catch (error) {
        yield put(actions.postExpenseClaimsFailure(error))
    }
}

function* getExpenseClaimsData({ payload }) {
    try {
        const data = yield call(getExpenseClaimsDataRequest, payload)
        yield put(actions.getExpenseClaimsSuccess(data))
    } catch (error) {
        yield put(actions.getExpenseClaimsFailure(error))
    }
}

function* patchExpenseClaimsData({ payload }) {
    try {
        const data = yield call(patchExpenseClaimsDataRequest, payload)
        yield put(actions.patchExpenseClaimsSuccess(data))
    } catch (error) {
        yield put(actions.patchExpenseClaimsFailure(error))
    }
}

function* deleteExpenseClaimsData({ payload }) {
    try {
        const data = yield call(deleteExpenseClaimsDataRequest, payload)
        yield put(actions.deleteExpenseClaimsSuccess(data))
    } catch (error) {
        yield put(actions.deleteExpenseClaimsFailure(error))
    }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* getAllExpenseClaimsWatcher() {
    yield takeEvery(types.GET_ALL_EXPENSE_CLAIMS, getAllExpenseClaimsData)
}

export function* getFilterAllExpenseClaimsWatcher() {
    yield takeEvery(types.GET_ALL_FILTER_EXPENSE_CLAIMS, getAllFilterExpenseClaimsData)
}

export function* postExpenseClaimsWatcher() {
    yield takeEvery(types.POST_EXPENSE_CLAIMS, postExpenseClaimsData)
}

export function* getExpenseClaimsWatcher() {
    yield takeEvery(types.GET_EXPENSE_CLAIMS, getExpenseClaimsData)
}

export function* patchExpenseClaimsWatcher() {
    yield takeEvery(types.PATCH_EXPENSE_CLAIMS, patchExpenseClaimsData)
}

export function* deleteExpenseClaimsWatcher() {
    yield takeEvery(types.DELETE_EXPENSE_CLAIMS, deleteExpenseClaimsData)
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* ExpenseClaimsSaga() {
    yield all([
        fork(getAllExpenseClaimsWatcher),
        fork(getFilterAllExpenseClaimsWatcher),
        fork(postExpenseClaimsWatcher),
        fork(getExpenseClaimsWatcher),
        fork(patchExpenseClaimsWatcher),
        fork(deleteExpenseClaimsWatcher),
    ])
}
