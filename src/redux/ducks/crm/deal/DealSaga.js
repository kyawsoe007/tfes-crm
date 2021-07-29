import { all, call, fork, put, takeEvery, delay } from "redux-saga/effects";
import {
  GET_ALL_DEAL,
  GET_SINGLE_DEAL,
  GET_DEAL_SUMMARY,
  NEW_DEAL,
  ON_SUBMIT_NEW_STAGE,
  EDIT_DEAL,
  DELETE_DEAL,
  ADD_NOTE_DEAL,
  TRANSFER_DEAL,
  GET_DEAL_FORM_FIELDS,
  ADD_DEAL_PRODUCT,
  DELETE_DEAL_PRODUCT
} from "./DealTypes";
import * as actions from "./DealActions";

import { singleDeal, dealListPage } from "Helpers/crmURL";

import api from "Api";

//=========================
// REQUESTS
//=========================
const getAllDealRequest = async () => {
  const result = await api.get("/deals/getall");
  return result.data.data;
};
const getDealRequest = async dealID => {
  const result = await api.get(`/deals/${dealID}`);
  return result.data;
};
const getDealSummaryRequest = async () => {
  const result = [];
  return result;
};
const postDealRequest = async deal => {
  const result = await api.post("/deals", deal);
  return result.data;
};
const postNewStageRequest = async (dealID, stageID) => {
  const result = await api.post(`/deals/updateStage`, {
    dealID: dealID,
    stageID: stageID
  });
  return result.data.data;
};
const patchDealRequest = async deal => {
  const result = await api.patch(`/deals/${deal.id}`, deal);
  return result.data;
};
const deleteDealRequest = async id => {
  const result = await api.delete(`/deals/${id}`);
  return result.data;
};
const addNoteDealRequest = async (id, note) => {
  const result = await api.post(`/deals/${id}/notes`, note);
  return result.data;
};
const transferDealRequest = async (id, newOwner) => {
  const result = await api.post(`/deals/transfer`, { dealIds: [id], newOwner });
  return result.data.updatedRecords[0];
};
const getDealFormFieldsRequest = async () => {
  const result = await api.get("/deals/formFields");
  return result.data;
};
const addDealProductRequest = async ({ dealId, data }) => {
  const result = await api.post(`/deals/${dealId}/products`, data);
  return result;
};
const deleteDealProductRequest = async ({ dealId, productId }) => {
  const result = await api.delete(`/deals/${dealId}/products/${productId}`);
  return result;
  // const result = await api.delete(`/deals/${id}`)
  // console.log(result);
};

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getAllDealFromDB() {
  try {
    const data = yield call(getAllDealRequest);
    yield put(actions.getDealSuccess(data));
  } catch (error) {
    yield put(actions.getDealFailure(error));
  }
}
function* getDealFromDB({ payload }) {
  try {
    const data = yield call(getDealRequest, payload);
    yield put(actions.getSingleDealSuccess(data));
  } catch (error) {
    yield put(actions.getDealFailure(error));
  }
}
function* getDealSummaryFromDB() {
  try {
    const data = yield call(getDealSummaryRequest);
    yield put(actions.getDealSummarySuccess(data));
  } catch (error) {
    yield put(actions.getDealSummaryFailure(error));
  }
}
function* postDealToDB({ payload }) {
  const { form, redirect, history } = payload;
  try {
    const data = yield call(postDealRequest, form);
    yield delay(500);
    if (redirect) history.push(singleDeal(data.id));
    yield put(actions.newDealSuccess(data));
  } catch (error) {
    yield put(actions.newDealFailure(error));
  }
}
function* postStageToDB({ payload }) {
  const { dealID, stageID } = payload;
  try {
    const deal = yield call(postNewStageRequest, dealID, stageID);
    yield delay(500);
    yield put(actions.newStageSuccess(deal));
  } catch (error) {
    yield put(actions.newStageFailure(error));
  }
}
function* patchDealToDB({ payload }) {
  try {
    const data = yield call(patchDealRequest, payload);
    yield delay(500);
    yield put(actions.editDealSuccess(data));
  } catch (error) {
    yield put(actions.editDealFailure(error));
  }
}
function* deleteDealFromDB({ payload }) {
  try {
    yield call(deleteDealRequest, payload);
    yield delay(500);
    yield put(actions.deleteDealSuccess(payload));
  } catch (error) {
    yield put(actions.deleteDealFailure(error));
  }
}
function* addNoteDealToDB({ payload }) {
  const { id, note } = payload;
  try {
    const data = yield call(addNoteDealRequest, id, note);
    yield put(actions.addNoteDealSuccess(data));
  } catch (error) {
    yield put(actions.addNoteDealFailure(error));
  }
}
function* transferDealInDB({ payload }) {
  const { id, newOwner, history } = payload;
  try {
    const data = yield call(transferDealRequest, id, newOwner);
    yield delay(500);
    history.push(dealListPage);
    yield put(actions.transferDealSuccess(data));
  } catch (error) {
    yield put(actions.transferDealFailure(error));
  }
}
function* getDealFormFieldsFromDB() {
  try {
    const data = yield call(getDealFormFieldsRequest);
    yield put(actions.getDealFormSuccess(data));
  } catch (error) {
    yield put(actions.getDealFormFailure(error));
  }
}
function* addDealProduct({ payload }) {
  try {
    const data = yield call(addDealProductRequest, payload);
    yield put(actions.addDealProductSuccess(data));
  } catch (error) {
    yield put(actions.addDealProductFailure(error));
  }
}
function* deleteDealProduct({ payload }) {
  try {
    yield call(deleteDealProductRequest, payload);
    yield put(actions.deleteDealProductSuccess(payload.productId));
  } catch (error) {
    yield put(actions.deleteDealProductFailure(error));
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* getAllDealWatcher() {
  yield takeEvery(GET_ALL_DEAL, getAllDealFromDB);
}
export function* getSingleDealWatcher() {
  yield takeEvery(GET_SINGLE_DEAL, getDealFromDB);
}
export function* getDealSummaryWatcher() {
  yield takeEvery(GET_DEAL_SUMMARY, getDealSummaryFromDB);
}
export function* postDealWatcher() {
  yield takeEvery(NEW_DEAL, postDealToDB);
}
export function* updateDealStageWatcher() {
  yield takeEvery(ON_SUBMIT_NEW_STAGE, postStageToDB);
}
export function* patchDealWatcher() {
  yield takeEvery(EDIT_DEAL, patchDealToDB);
}
export function* deleteDealWatcher() {
  yield takeEvery(DELETE_DEAL, deleteDealFromDB);
}
export function* addNoteDealWatcher() {
  yield takeEvery(ADD_NOTE_DEAL, addNoteDealToDB);
}
export function* transferDealWatcher() {
  yield takeEvery(TRANSFER_DEAL, transferDealInDB);
}
export function* getDealFormFieldsWatcher() {
  yield takeEvery(GET_DEAL_FORM_FIELDS, getDealFormFieldsFromDB);
}
export function* addDealProductWatcher() {
  yield takeEvery(ADD_DEAL_PRODUCT, addDealProduct);
}
export function* deleteDealProductWatcher() {
  yield takeEvery(DELETE_DEAL_PRODUCT, deleteDealProduct);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
    fork(getAllDealWatcher),
    fork(getSingleDealWatcher),
    fork(getDealSummaryWatcher),
    fork(postDealWatcher),
    fork(updateDealStageWatcher),
    fork(patchDealWatcher),
    fork(deleteDealWatcher),
    fork(addNoteDealWatcher),
    fork(transferDealWatcher),
    fork(getDealFormFieldsWatcher),
    fork(addDealProductWatcher),
    fork(deleteDealProductWatcher)
  ]);
}
