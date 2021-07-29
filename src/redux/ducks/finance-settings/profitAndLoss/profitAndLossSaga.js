import {
    all,
    call,
    fork,
    put,
    takeEvery,
    delay,
    select,
} from 'redux-saga/effects'

import * as types from './profitAndLossTypes'
import * as actions from './profitAndLossActions'
import api from 'Api'


//=========================
// REQUESTS
//=========================

const getAllProfitAndLossRequest = async (payload) => {
    const result = await api.get(`/profit`);
    return result.data
}

const patchProfitAndLossRequest = async ({ payload }) => {
    const result = await api.patch(`/profit/${payload.id}`, payload)
    return result.data
}

const postProfitAndLossRequest = async ({ payload }) => {
    console.log('before post', payload)
    const result = await api.post(`/profit`, payload)
    console.log('after', result)
    return result.data;
}

const deleteProfitAndLossRequest = async ({ payload }) => {
    const result = await api.delete(`/profit/${payload}`)
    return result.data;
}


//=========================
// CALL(GENERATOR) ACTIONS
//=========================

function* getAllProfitAndLossData(payload) {
    try {
        const data = yield call(getAllProfitAndLossRequest, payload)
        yield put(actions.getAllProfitAndLossSuccess(data))
    } catch (error) {
        yield put(actions.getAllProfitAndLossFailure(error))
    }
}

function* patchProfitAndLossData(payload) {
    try {
        const data = yield call(patchProfitAndLossRequest, payload)
        yield put(actions.patchProfitAndLossSuccess(data))
    } catch (error) {
        yield put(actions.patchProfitAndLossFailure(error))
    }
}

function* postProfitAndLossData(payload) {
    try {
        const data = yield call(postProfitAndLossRequest, payload)
        yield put(actions.postProfitAndLossSuccess(data))
    } catch (error) {
        yield put(actions.postProfitAndLossFailure(error))
    }
}

function* deleteProfitAndLossData(payload) {
    try {
        const data = yield call(deleteProfitAndLossRequest, payload)
        yield put(actions.deleteProfitAndLossSuccess(data))
    } catch (error) {
        yield put(actions.deleteProfitAndLossFailure(error))
    }
}

//=======================
// WATCHER FUNCTIONS
//=======================

export function* getAllProfitAndLossWatcher() {
    yield takeEvery(types.GET_ALL_PROFIT_LOSS, getAllProfitAndLossData)
}

export function* patchProfitAndLossWatcher() {
    yield takeEvery(types.PATCH_PROFIT_LOSS, patchProfitAndLossData)
}

export function* postProfitAndLossWatcher() {
    yield takeEvery(types.POST_PROFIT_LOSS, postProfitAndLossData)
}

export function* deleteProfitAndLossWatcher() {
    yield takeEvery(types.DELETE_PROFIT_LOSS, deleteProfitAndLossData)
}



//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
    yield all([
        fork(getAllProfitAndLossWatcher),
        fork(patchProfitAndLossWatcher),
        fork(postProfitAndLossWatcher),
        fork(deleteProfitAndLossWatcher)
    ])
}