import {
    all,
    call,
    fork,
    put,
    takeEvery,
    delay,
    select,
} from 'redux-saga/effects'

import * as types from './balanceSheetTypes'
import * as actions from './balanceSheetActions'
import api from 'Api'


//=========================
// REQUESTS
//=========================

const getAllBalanceSheetRequest = async (payload) => {
    const result = await api.get(`/balance-sheet`);
    return result.data
}

const patchBalanceSheetRequest = async ({ payload }) => {
    const result = await api.patch(`/balance-sheet/${payload.id}`, payload)
    return result.data
}

const postBalanceSheetRequest = async ({ payload }) => {
    //console.log('before post', payload)
    const result = await api.post(`/balance-sheet`, payload)
    // console.log('after', result)
    return result.data;
}

const deleteBalanceSheetRequest = async ({ payload }) => {
    const result = await api.delete(`/balance-sheet/${payload}`)
    return result.data;
}


//=========================
// CALL(GENERATOR) ACTIONS
//=========================

function* getAllBalanceSheetData(payload) {
    try {
        const data = yield call(getAllBalanceSheetRequest, payload)
        yield put(actions.getAllBalanceSheetSuccess(data))
    } catch (error) {
        yield put(actions.getAllBalanceSheetFailure(error))
    }
}

function* patchBalanceSheetData(payload) {
    try {
        const data = yield call(patchBalanceSheetRequest, payload)
        console.log('data', data)
        yield put(actions.patchBalanceSheetSuccess(data))
    } catch (error) {
        yield put(actions.patchBalanceSheetFailure(error))
    }
}

function* postBalanceSheetData(payload) {
    try {
        const data = yield call(postBalanceSheetRequest, payload)
        console.log('data1', data)
        yield put(actions.postBalanceSheetSuccess(data))
    } catch (error) {
        yield put(actions.postBalanceSheetFailure(error))
    }
}

function* deleteBalanceSheetData(payload) {
    try {
        const data = yield call(deleteBalanceSheetRequest, payload)
        yield put(actions.deleteBalanceSheetSuccess(data))
    } catch (error) {
        yield put(actions.deleteBalanceSheetFailure(error))
    }
}

//=======================
// WATCHER FUNCTIONS
//=======================

export function* getAllBalanceSheetWatcher() {
    yield takeEvery(types.GET_ALL_BALANCE_SHEET, getAllBalanceSheetData)
}

export function* patchBalanceSheetWatcher() {
    yield takeEvery(types.PATCH_BALANCE_SHEET, patchBalanceSheetData)
}

export function* postBalanceSheetWatcher() {
    yield takeEvery(types.POST_BALANCE_SHEET, postBalanceSheetData)
}

export function* deleteBalanceSheetWatcher() {
    yield takeEvery(types.DELETE_BALANCE_SHEET, deleteBalanceSheetData)
}



//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
    yield all([
        fork(getAllBalanceSheetWatcher),
        fork(patchBalanceSheetWatcher),
        fork(postBalanceSheetWatcher),
        fork(deleteBalanceSheetWatcher)
    ])
}