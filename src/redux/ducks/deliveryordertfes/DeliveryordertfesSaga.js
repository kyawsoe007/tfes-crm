import {
    all,
    call,
    fork,
    put,
    takeEvery,
    delay,
    select
} from 'redux-saga/effects'

import * as types from './DeliveryordertfesTypes'
import * as actions from './DeliveryordertfesActions'
import api from 'Api'

//watcher catches hold of actions and doesnt let go until the action is completed

//=========================
// REQUESTS
//=========================

const getAllDeliveryOrdersRequest = async () => {
    const result = await api.get(`/delivery-orders`);
    // console.log("CMNNGG?", result)
    return result.data;
}

const getFilterDeliveryRequest = async ({
    limit,
    skip,
    filter,
    searchText,
    orderBy,
}) => {
    const result = await api.post(`/delivery-orders/getfilters`, {
        // api.post("/quotationtfess/getfilters"
        limit: limit,
        skip: skip,
        filter: filter,
        searchText: searchText,
        orderBy: orderBy,
    })
    return result.data
}

const getDeliveryOrderRequest = async (id) => {
    const result = await api.get(`/delivery-orders/${id}`);
    return result.data;
}

const setDeliveryOrderItemRequest = async (data) => {


    const result = await api.patch(`/delivery-orders/${data.deliveryOrderId}`, data);
    return result.data;
}

const setDeliveryOrderItemFromPackingListRequest = async (data) => {
    const result = await api.post(`delivery-orders/create-new-based-selection`, data);
    return result.data;
}


const patchDeliveryOrderItemRequest = async (data) => {


    const result = await api.patch(`/delivery-orders/update-all-delivery-order/${data.doId}`, data);
    return result.data;

}

const deleteDeliveryOrderItemRequest = async (data) => {
    console.log("DELETE", data)

    const result = await api.delete(`/delivery-orders/${data}`);
    return result.data;

}

const getPdfCreate = async (id) => {
    window.open(`${api.defaults.baseURL}/delivery-orders/pdf/${id}`)
}


//=========================
// CALL(GENERATOR) ACTIONS
//=========================

function* getAllDeliveryOrdersData(payload) {
    // console.log("???????")

    try {
        const data = yield call(getAllDeliveryOrdersRequest, payload)

        // console.log(">>>>>>>>>>>>", data)
        yield put(actions.getAllDeliveryOrderSuccess(data))
    } catch (error) {
        yield put(actions.getAllDeliveryOrderFailure(error))
    }
}

function* getFilterDeliveryOrderFromDB({ payload }) {
    try {
        const data = yield call(getFilterDeliveryRequest, payload)
        yield put(actions.getFilterDeliveryOrderSuccess(data))
    } catch (error) {
        yield put(actions.getFilterDeliveryOrderFailure(error))
    }
}

function* getDeliveryOrderData({ payload }) {
    // console.log("???????")
    try {
        const data = yield call(getDeliveryOrderRequest, payload)
        yield put(actions.getDeliveryOrderSuccess(data));
    } catch (error) {
        yield put(actions.getDeliveryOrderFailure(error));

    }
}

function* setDeliveryOrderItemData(action) {
    // console.log("?????asdasd!!!", action.payload)
    try {
        const data = yield call(setDeliveryOrderItemRequest, action.payload);
        yield put(actions.setDeliveryOrderItemSuccess(data));
    } catch (error) {
        yield put(actions.setDeliveryOrderItemFailure(error))
    }
}

function* setDeliveryOrderItemFromPackingListData(action) {

    try {
        const data = yield call(setDeliveryOrderItemFromPackingListRequest, action.payload);
        yield put(actions.setDeliveryOrderItemFromPackingListSuccess(data));
        yield put(actions.resetDeliveryOrderItemFromPackingList(data))
    } catch (error) {

        yield put(actions.setDeliveryOrderItemFromPackingListFailure(error))
    }
}


function* patchDeliveryOrderItemData(action) {
    // console.log("?????asdasd!!!", action.payload)
    try {
        const data = yield call(patchDeliveryOrderItemRequest, action.payload);
        yield put(actions.patchDeliveryOrderItemSuccess(data));
    } catch (error) {
        yield put(actions.patchDeliveryOrderItemFailure(error))
    }
}

function* deleteDeliveryOrderItemData(action) {
    try {
        const data = yield call(deleteDeliveryOrderItemRequest, action.payload);
        yield put(actions.deleteDeliveryOrderItemSuccess(data));
    } catch (error) {
        yield put(actions.deleteDeliveryOrderItemFailure(error))
    }
}

function* getPdfCreateData({ payload }) {
    try {
        const data = yield call(getPdfCreate, payload)
        yield put(actions.getDeliveryPdfSuccess(data))
    } catch (error) {
        yield put(actions.getDeliveryPdfFailure(error))
    }
}

function* getSavedDeliveryOrderQueryData({ payload }) {
    try {
        yield put(actions.getSavedDeliveryOrderQuerySuccess(payload))
    } catch (error) {
        yield put(actions.getSavedDeliveryOrderQueryFailure(error))
    }
}

//=======================
// WATCHER FUNCTIONS
//=======================

export function* getAllDeliveryOrdersWatcher() {
    yield takeEvery(types.GET_ALL_DELIVERYORDER, getAllDeliveryOrdersData)
}

export function* getFilterDeliveryWatcher() {
    yield takeEvery(types.GET_FILTER_DELIVERYORDER_REQUEST, getFilterDeliveryOrderFromDB)
}

export function* getDeliveryOrderWatcher() {
    yield takeEvery(types.GET_DELIVERYORDER, getDeliveryOrderData)
}

export function* setDeliveryOrderItemWatcher() {
    yield takeEvery(types.SET_DELIVERYORDER_ITEM, setDeliveryOrderItemData)
}

export function* setDeliveryOrderItemFromPackingListWatcher() {
    yield takeEvery(types.SET_DELIVERYORDER_ITEM_FROM_PACKING_LIST, setDeliveryOrderItemFromPackingListData)
}

export function* patchDeliveryOrderItemWatcher() {
    yield takeEvery(types.PATCH_DELIVERYORDER_ITEM, patchDeliveryOrderItemData)
}

export function* deleteDeliveryOrderItemWatcher() {
    yield takeEvery(types.DELETE_DELIVERYORDER_ITEM, deleteDeliveryOrderItemData)
}

//Create Pdf
export function* getPdfCreateDataWatcher() {
    yield takeEvery(types.PDF_CREATE_DELIVERY_ORDER, getPdfCreateData)
}

export function* getSavedDeliveryOrderQueryWatcher() {
    yield takeEvery(types.GET_SAVED_DELIVERY_ORDER_QUERY, getSavedDeliveryOrderQueryData)
}

//=======================
// FORK SAGAS TO STORE
//=======================

export default function* DeliveryorderstfesSaga() {
    yield all([
        fork(getAllDeliveryOrdersWatcher),
        fork(getFilterDeliveryWatcher),
        fork(getDeliveryOrderWatcher),
        fork(setDeliveryOrderItemWatcher),
        fork(setDeliveryOrderItemFromPackingListWatcher),
        fork(patchDeliveryOrderItemWatcher),
        fork(deleteDeliveryOrderItemWatcher),
        fork(getPdfCreateDataWatcher),
        fork(getSavedDeliveryOrderQueryWatcher)
    ])
}

