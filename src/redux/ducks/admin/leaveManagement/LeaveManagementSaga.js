import {
    all,
    call,
    fork,
    put,
    takeEvery,
    delay,
    select,
} from 'redux-saga/effects'

import * as types from './LeaveManagementTypes'
import * as actions from './LeaveManagementActions'
import api from 'Api'


//=========================
// REQUESTS
//=========================

const getAllLeaveManagementsRequest = async (payload) => {
    const result = await api.get(`/leave-management`);
    return result.data
}

const getLeaveManagementRequest = async (payload) => {
    const result = await api.get(`/leave-management/${payload}`);
    return result.data
}

// Patch single
const patchLeaveManagementRequest = async (data) => {
    const result = await api.patch(`/leave-management/${data.id}`, data)
    return result.data
}

const postLeaveManagementRequest = async ({ payload }) => {
    const result = await api.post(`/leave-management`, payload)
    return result.data;
}

const deleteLeaveManagementRequest = async (payload) => {
    console.log('data', payload)
    const result = await api.delete(`/leave-management/${payload}`, { id: payload })
    return payload;
}

const getFilterLeaveManagementRequest = async ({
    limit,
    skip,
    filter,
    searchText,
    orderBy
}) => {
    const result = await api.post(`/leave-management/getfilters`, {
        limit: limit,
        skip: skip,
        filter: filter,
        searchText: searchText,
        orderBy: orderBy
    })
    return result.data
}

//=========================
// CALL(GENERATOR) ACTIONS
//=========================

function* getAllLeaveManagementsData(payload) {
    try {
        const data = yield call(getAllLeaveManagementsRequest, payload)
        yield put(actions.getAllLeaveManagementSuccess(data))
    } catch (error) {
        yield put(actions.getAllLeaveManagementFailure(error))
    }
}

function* getSingleLeaveManagementFromDB({ payload }) {
    try {
        const data = yield call(getLeaveManagementRequest, payload)
        yield put(actions.getLeaveManagementSuccess(data))
    } catch (error) {
        yield put(actions.getLeaveManagementFailure(error))
    }
}


function* patchLeaveManagementData({ payload }) {
    try {
        const data = yield call(patchLeaveManagementRequest, payload)
        yield put(actions.patchLeaveManagementSuccess(data))
    } catch (error) {
        yield put(actions.patchLeaveManagementFailure(error))
    }
}

function* postLeaveManagementData(payload) {
    try {
        const data = yield call(postLeaveManagementRequest, payload)
        yield put(actions.postLeaveManagementSuccess(data))
    } catch (error) {
        yield put(actions.postLeaveManagementFailure(error))
    }
}

function* deleteLeaveManagementData({ payload }) {
    console.log('de', payload)
    try {
        const data = yield call(deleteLeaveManagementRequest, payload)

        yield put(actions.deleteLeaveManagementSuccess(payload))
    } catch (error) {
        yield put(actions.deleteLeaveManagementFailure(error))
    }
}
// Payload = ID
function* getFilterLeaveManagementFromDB({ payload }) {
    try {
        const data = yield call(getFilterLeaveManagementRequest, payload)
        yield put(actions.getFilterLeaveManagementSuccess(data))
    } catch (error) {
        yield put(actions.getFilterLeaveManagementFailure(error))
    }
}

function* clearDuplicateFromDB() {
    try {
        yield put(actions.clearDuplicateSuccess);
    } catch (error) {
        yield put(actions.clearDuplicateFailure(error));
    }
}

//=======================
// WATCHER FUNCTIONS
//=======================

export function* getAllLeaveManagementsWatcher() {
    yield takeEvery(types.GET_ALL_LEAVE_MANAGEMENT, getAllLeaveManagementsData)
}

export function* patchLeaveManagementWatcher() {
    yield takeEvery(types.PATCH_LEAVE_MANAGEMENT, patchLeaveManagementData)
}

export function* postLeaveManagementWatcher() {
    yield takeEvery(types.POST_LEAVE_MANAGEMENT, postLeaveManagementData)
}

export function* deleteLeaveManagementWatcher() {
    yield takeEvery(types.DELETE_LEAVE_MANAGEMENT, deleteLeaveManagementData)
}
export function* getLeaveManagementWatcher() {
    yield takeEvery(types.GET_LEAVE_MANAGEMENT, getSingleLeaveManagementFromDB)
}
export function* getFilterLeaveManagementWatcher() {
    yield takeEvery(types.GET_FILTER_LEAVE_MANAGEMENT, getFilterLeaveManagementFromDB)
}

export function* clearDuplicateWatcher() {
    yield takeEvery(types.CLEAR_DUPLICATE, clearDuplicateFromDB);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
    yield all([
        fork(getAllLeaveManagementsWatcher),
        fork(patchLeaveManagementWatcher),
        fork(postLeaveManagementWatcher),
        fork(deleteLeaveManagementWatcher),
        fork(getLeaveManagementWatcher),
        fork(getFilterLeaveManagementWatcher),
        fork(clearDuplicateWatcher),
    ])
}