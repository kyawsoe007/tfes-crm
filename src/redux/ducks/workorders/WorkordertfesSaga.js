import {
  all,
  call,
  fork,
  put,
  takeEvery,
  delay,
  select,
} from 'redux-saga/effects'

import * as types from './WorkordertfesTypes'
import * as actions from './WorkordertfesActions'
import api from 'Api'


//=========================
// REQUESTS
//=========================

const getAllWorkOrdersRequest = async ({
  limit,
  skip,
  filter,
  searchText,
  orderBy
}) => {
  const result = await api.post(`/work-orders/getfilters`, { 
    limit: limit,
    skip: skip,
    filter: filter,
    searchText: searchText,
    orderBy: orderBy
  });
  console.log("DATAAAAA", result);
  return result.data;
}

const getFilterWorkOrderRequest = async ({
  limit,
  skip,
  filter,
  searchText,
  orderBy,
}) => {
  const result = await api.post(`/work-orders/getfilters`, {
    // api.post("/quotationtfess/getfilters"
    limit: limit,
    skip: skip,
    filter: filter,
    searchText: searchText,
    orderBy: orderBy,
  })
  return result.data
}

const getWorkOrderRequest = async (id) => {
  const result = await api.get(`/work-orders/${id}`);
  // console.log("SINGLE DATA", result);
  return result.data;
}

const setWorkOrderItemRequest = async ({ id, patchData }) => {
  const result = await api.patch(`/work-orders/${id}`, patchData);
  // console.log("PATCH DATA", result);
  // console.log("PATCH DATA", patchData);
  return result.data
}

const setWorkOrderItemDescriptionRequest = async ({ id, patchData }) => {

  const data = {
    description: patchData
  }
const result = await api.patch(`/work-orders/update-desc/${id}`, data);

  // console.log("PATCH DATA", result);
  // console.log("PATCH DATA", patchData);
  return result.data
}


const getWoBySoIdRequest = async (payload) => {
  console.log("WORK ORDERSSS", payload)
  const result = await api.get(`/work-orders/find-completed-wo-by-soId/${payload}`);
  return result.data
  // /api/work-orders/find-completed-wo-by-soId/{salesOrderId}
}

const getPdfCreate = async(id) =>{
  window.open(`${api.defaults.baseURL}/work-orders/pdf/${id}`,id)

}
// const postCheckSkuRequest = async(id,patchData) =>{
//   console.log("postCheckSkuRequest", id ) 
//   const result = await api.patch(`/work-orders/confirmWoSkuQty/${id}`,patchData);
//   return result.data
  
// }
const postCheckSkuRequest = async(payload) =>{
  console.log("ADASDSdDsd", payload)
  const result = await api.patch(`/work-orders/confirmWoSkuQty/${payload.woItemId}`, payload);
  return result.data
  
}

const patchLightResetWorkorderRequest = async(payload) =>{
  const result = await api.patch(`/work-orders/lightResetWorkOrder/${payload}`)
  return result.data
}


const patchMediumResetWorkorderRequest = async(payload) =>{
  console.log("ADASDSdDsd", payload)
  let patchBody = {
    workOrderItems: payload.workOrderItems
  }
  const result = await api.patch(`/work-orders/mediumResetWorkItems/${payload.id}`, patchBody)
  return result.data
  // return true
}



//=========================
// CALL(GENERATOR) ACTIONS
//=========================


function* getAllWorkOrdersData(payload) {
  try {
    const data = yield call(getAllWorkOrdersRequest, payload)
    yield put(actions.getAllWorkOrdersSuccess(data))
  } catch (error) {
    yield put(actions.getAllWorkOrdersFailure(error))
  }
}

function* getFilterWorkOrderFromDB({ payload }) {

  console.log("PAYLOAD", payload);
  try {
    const data = yield call(getFilterWorkOrderRequest, payload)
    yield put(actions.getFilterWorkOrderSuccess(data))
  } catch (error) {
    yield put(actions.getFilterWorkOrderFailure(error))
  }
}

function* getWorkOrderData({ payload }) {
 
  try {
    const data = yield call(getWorkOrderRequest, payload)
    yield put(actions.getWorkOrderSuccess(data))
  } catch (error) {
    yield put(actions.getWorkOrderFailure(error))
  }
}

function* setWorkOrderItemData({ payload }) {
  try {
    const data = yield call(setWorkOrderItemRequest, payload)
    yield put(actions.setWorkOrderItemSuccess(data))
  } catch (error) {
    yield put(actions.setWorkOrderItemFailure(error))
  }
}

function* setWorkOrderItemDescriptionData({ payload }) {
  try {
    const data = yield call(setWorkOrderItemDescriptionRequest, payload)
    yield put(actions.setWorkOrderItemDescriptionSuccess(data))
  } catch (error) {
    yield put(actions.setWorkOrderItemDescriptionFailure(error))
  }
}


function* getWoBySoIdData({ payload }) {
  try {
    const data = yield call(getWoBySoIdRequest, payload)
    yield put(actions.getWoBySoIdSuccess(data))
  } catch (error) {
    yield put(actions.getWoBySoIdFailure(error))
  }
}

function* setWorkOrder({ payload }) {
  try {
    const data = yield call(setWorkOrderItemRequest, payload);
    yield put(actions.setWorkOrderSuccess(data));
  }
  catch(error){
    yield put(actions.setWorkOrderFailure(error));
  }
}
function* getPdfCreateData({payload}){
  try{
      const data = yield call (getPdfCreate,payload)
      yield put(actions.getPdfCreateSuccess(data))
  }catch(error){
    yield put(actions.getPdfCreateFailure(error))
  }
}

function* postCheckSkuData ({payload}){


  try{
      const data = yield call(postCheckSkuRequest , payload) 
      //reload work order

      let workOrder = yield select(state => state.workorderState.workOrder.data);
      if(workOrder){
        console.log(workOrder);
        let updated = yield call(getWorkOrderRequest, workOrder.id);
        yield put (actions.postCheckSkuSuccess(updated));
      }
      else {
        yield put (actions.postCheckSkuFailure(new Error("Unable to load Work order")));
      }
      
      //yield put (actions.setWorkOrderItemSuccess(data))
  }catch(error){


    console.log(error);

    yield put (actions.postCheckSkuFailure(error))
  }
}

function* getSavedWorkOrderQueryData({payload}) {
  try {
    yield put(actions.getSavedWorkOrderQuerySuccess(payload))
  } catch (error) {
    yield put(actions.getSavedWorkOrderQueryFailure(error))
  }
}

function* patchLightResetWorkorderData({payload}) {
  try {
    const data = yield call(patchLightResetWorkorderRequest, payload);
    yield put(actions.patchLightResetWorkorderSuccess(data))
  } catch (error) {
    yield put(actions.patchLightResetWorkorderFailure(error))
  }
}

function* patchMediumResetWorkorderData({payload}) {
  try {
    const data = yield call(patchMediumResetWorkorderRequest, payload);
    yield put(actions.patchMediumResetWorkorderSuccess(data))
  } catch (error) {
    yield put(actions.patchMediumResetWorkorderFailure(error))
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================

export function* getAllWorkOrdersWatcher() {
  yield takeEvery(types.GET_ALL_WORKORDER, getAllWorkOrdersData)
}

export function* getFilterDeliveryWatcher() {
  yield takeEvery(types.GET_FILTER_WORKORDER_REQUEST, getFilterWorkOrderFromDB)
}

export function* getWorkOrderWatcher() {
  yield takeEvery(types.GET_WORKORDER, getWorkOrderData)
}

export function* setWorkOrderItemWatcher() {
  yield takeEvery(types.SET_WORKORDER_ITEM, setWorkOrderItemData)
}

export function* setWorkOrderItemDescriptionWatcher() {
  yield takeEvery(types.SET_WORKORDER_ITEM_DESCRIPTION, setWorkOrderItemDescriptionData)
}

export function* getWoBySoIdWatcher() {
  yield takeEvery(types.GET_WO_BY_SOID, getWoBySoIdData)
}

export function* setWorkOrderWatcher(){
  yield takeEvery(types.SET_WORKORDER, setWorkOrder);
}

export  function* getPdfCreateDataWatcher(){
  yield takeEvery(types.PDF_CREATE_WORKER_ORDER,getPdfCreateData)
}

export  function* postCheckSkuDataWatcher(){
  yield takeEvery(types.POST_CHECKED_SKU ,postCheckSkuData)
}

export function* getSavedWorkOrderQueryWatcher(){
  yield takeEvery(types.GET_SAVED_WORKORDER_QUERY, getSavedWorkOrderQueryData)
}

export function* patchLightResetWorkorderWatcher(){
  yield takeEvery(types.PATCH_LIGHT_RESET_WORKORDER, patchLightResetWorkorderData)
}

export function* patchMediumResetWorkorderWatcher(){
  yield takeEvery(types.PATCH_MEDIUM_RESET_WORKORDER, patchMediumResetWorkorderData)
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* workordertfesSaga() {
  yield all([
    fork(getAllWorkOrdersWatcher),
    fork(getFilterDeliveryWatcher),
    fork(getWorkOrderWatcher),
    fork(setWorkOrderItemWatcher),
    fork(setWorkOrderItemDescriptionWatcher),
    fork(setWorkOrderWatcher),
    fork(getWoBySoIdWatcher),
    fork(getPdfCreateDataWatcher),
    fork(postCheckSkuDataWatcher),
    fork(getSavedWorkOrderQueryWatcher),
    fork(patchLightResetWorkorderWatcher),
    fork(patchMediumResetWorkorderWatcher)
  ])
}