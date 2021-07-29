import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  GET_ALL_CAMPAIGN,
  GET_CAMPAIGN,
  NEW_CAMPAIGN,
  SEND_CAMPAIGN_NOW,
  DELETE_CAMPAIGN
} from "./CampaignTypes";

import {
  getAllCampaignSuccess,
  getAllCampaignFailure,
  getCampaignSuccess,
  getCampaignFailure,
  newCampaignSuccess,
  newCampaignFailure,
  sendCampaignNowSuccess,
  sendCampaignNowFailure,
  deleteCampaignSuccess,
  deleteCampaignFailure
} from "./CampaignActions";

import api from "Api";

//=========================
// REQUESTS
//=========================
const getAllCampaignRequest = async () => {
  const result = await api.get("/Campaigns");
  return result.data;
};
const getCampaignRequest = async id => {
  const result = await api.get(`/Campaigns/${id}`);
  return result.data;
};
const newCampaignRequest = async data => {
  const result = await api.post("/Campaigns/newCampaign", { data });
  return result.data;
};
const sendCampaignRequest = async id => {
  const result = await api.post(`/Campaigns/sendNow/${id}`);
  return result.data.success;
};
const deleteCampaignRequest = async id => {
  const result = await api.delete(`/Campaigns/${id}`);
  return result.data;
};

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getAllCampaign() {
  try {
    const data = yield call(getAllCampaignRequest);
    yield put(getAllCampaignSuccess(data));
  } catch (error) {
    yield put(getAllCampaignFailure(error));
  }
}
function* getCampaign({ payload }) {
  try {
    const data = yield call(getCampaignRequest, payload);
    yield put(getCampaignSuccess(data));
  } catch (error) {
    yield put(getCampaignFailure(error));
  }
}
function* newCampaign({ payload }) {
  try {
    const data = yield call(newCampaignRequest, payload);
    yield put(newCampaignSuccess(data));
  } catch (error) {
    yield put(newCampaignFailure(error));
  }
}
function* sendCampaign({ payload }) {
  try {
    const data = yield call(sendCampaignRequest, payload);
    yield put(sendCampaignNowSuccess(data));
  } catch (error) {
    yield put(sendCampaignNowFailure(error));
  }
}
function* deleteCampaign({ payload }) {
  try {
    yield call(deleteCampaignRequest, payload);
    yield put(deleteCampaignSuccess(payload));
  } catch (error) {
    yield put(deleteCampaignFailure(error));
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* getAllCampaignWatcher() {
  yield takeEvery(GET_ALL_CAMPAIGN, getAllCampaign);
}
export function* getCampaignWatcher() {
  yield takeEvery(GET_CAMPAIGN, getCampaign);
}
export function* newCampaignWatcher() {
  yield takeEvery(NEW_CAMPAIGN, newCampaign);
}
export function* sendCampaignWatcher() {
  yield takeEvery(SEND_CAMPAIGN_NOW, sendCampaign);
}
export function* deleteCampaignWatcher() {
  yield takeEvery(DELETE_CAMPAIGN, deleteCampaign);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
    fork(getAllCampaignWatcher),
    fork(getCampaignWatcher),
    fork(newCampaignWatcher),
    fork(sendCampaignWatcher),
    fork(deleteCampaignWatcher)
  ]);
}
