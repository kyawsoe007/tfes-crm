import {
    all,
    call,
    fork,
    put,
    takeEvery,
    delay,
    select,
} from 'redux-saga/effects'

import * as types from './AdminSettingTypes'
import * as actions from './AdminSettingActions'
import api from 'Api'


//=========================
// REQUESTS
//=========================

const getAllAdminSettingsRequest = async (payload) => {
    const result = await api.get(`/employee-setting`);
    return result.data
}

const getAdminSettingRequest = async (payload) => {
    const result = await api.get(`/employee-setting/${payload}`);
    return result.data
}

// Patch single
const patchAdminSettingRequest = async (data) => {
    const result = await api.patch(`/employee-setting/${data.id}`, data)
    return result.data
}

const postAdminSettingRequest = async ({ payload }) => {
    const result = await api.post(`/employee-setting`, payload)
    return result.data;
}

const deleteAdminSettingRequest = async (payload) => {
    console.log('data', payload)
    const result = await api.delete(`/employee-setting/${payload}`, { id: payload })
    return payload;
}

const getFilterAdminSettingRequest = async ({
    limit,
    skip,
    filter,
    searchText,
    orderBy
}) => {
    const result = await api.post(`/employee-setting/getfilters`, {
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

function* getAllAdminSettingsData(payload) {
    try {
        const data = yield call(getAllAdminSettingsRequest, payload)
        yield put(actions.getAllAdminSettingSuccess(data))
    } catch (error) {
        yield put(actions.getAllAdminSettingFailure(error))
    }
}

function* getSingleAdminSettingFromDB({ payload }) {
    try {
        const data = yield call(getAdminSettingRequest, payload)
        yield put(actions.getAdminSettingSuccess(data))
    } catch (error) {
        yield put(actions.getAdminSettingFailure(error))
    }
}


function* patchAdminSettingData({ payload }) {
    try {
        const data = yield call(patchAdminSettingRequest, payload)
        yield put(actions.patchAdminSettingSuccess(data))
    } catch (error) {
        yield put(actions.patchAdminSettingFailure(error))
    }
}

function* postAdminSettingData(payload) {
    try {
        const data = yield call(postAdminSettingRequest, payload)
        yield put(actions.postAdminSettingSuccess(data))
    } catch (error) {
        yield put(actions.postAdminSettingFailure(error))
    }
}

function* deleteAdminSettingData({ payload }) {
    console.log('de', payload)
    try {
        const data = yield call(deleteAdminSettingRequest, payload)

        yield put(actions.deleteAdminSettingSuccess(payload))
    } catch (error) {
        yield put(actions.deleteAdminSettingFailure(error))
    }
}
// Payload = ID
function* getFilterAdminSettingFromDB({ payload }) {
    try {
        const data = yield call(getFilterAdminSettingRequest, payload)
        yield put(actions.getFilterAdminSettingSuccess(data))
    } catch (error) {
        yield put(actions.getFilterAdminSettingFailure(error))
    }
}

function* clearAdminDuplicateFromDB() {
    try {
        yield put(actions.clearAdminDuplicateSuccess);
    } catch (error) {
        yield put(actions.clearAdminDuplicateFailure(error));
    }
}

//=======================
// WATCHER FUNCTIONS
//=======================

export function* getAllAdminSettingsWatcher() {
    yield takeEvery(types.GET_ALL_ADMIN_SETTING, getAllAdminSettingsData)
}

export function* patchAdminSettingWatcher() {
    yield takeEvery(types.PATCH_ADMIN_SETTING, patchAdminSettingData)
}

export function* postAdminSettingWatcher() {
    yield takeEvery(types.POST_ADMIN_SETTING, postAdminSettingData)
}

export function* deleteAdminSettingWatcher() {
    yield takeEvery(types.DELETE_ADMIN_SETTING, deleteAdminSettingData)
}
export function* getAdminSettingWatcher() {
    yield takeEvery(types.GET_ADMIN_SETTING, getSingleAdminSettingFromDB)
}
export function* getFilterAdminSettingWatcher() {
    yield takeEvery(types.GET_FILTER_ADMIN_SETTING, getFilterAdminSettingFromDB)
}

export function* clearAdminDuplicateWatcher() {
    yield takeEvery(types.CLEAR_ADMIN_DUPLICATE, clearAdminDuplicateFromDB);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
    yield all([
        fork(getAllAdminSettingsWatcher),
        fork(patchAdminSettingWatcher),
        fork(postAdminSettingWatcher),
        fork(deleteAdminSettingWatcher),
        fork(getAdminSettingWatcher),
        fork(getFilterAdminSettingWatcher),
        fork(clearAdminDuplicateWatcher),
    ])
}