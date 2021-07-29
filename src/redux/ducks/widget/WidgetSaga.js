import { all, call, fork, put, takeEvery, delay } from "redux-saga/effects";
import { GET_CRM_SUMMARY, GET_UNTOUCHED_LEADS } from "./WidgetTypes";
import {
  getCrmSummarySuccess,
  getCrmSummaryFailure,
  getUntouchedLeadsSuccess,
  getUntouchedLeadsFailure
} from "./WidgetActions";

import api from "Api";

//=========================
// REQUESTS
//=========================
const getCrmSummaryRequest = async () => {
  const result = await api.get("/widgets/crmsummary");
  return result.data.data;
};
const getUntouchedLeadsRequest = async date => {
  const result = await api.post("/widgets/untouchedleads", { date });
  return result.data.data;
};

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getCrmSummary() {
  try {
    const data = yield call(getCrmSummaryRequest);
    yield put(getCrmSummarySuccess(data));
  } catch (error) {
    yield put(getCrmSummaryFailure(error));
  }
}
function* getUntouchedLeads({ payload }) {
  try {
    const data = yield call(getUntouchedLeadsRequest, payload);
    yield delay(500);
    yield put(getUntouchedLeadsSuccess(data));
  } catch (error) {
    yield put(getUntouchedLeadsFailure(error));
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* getCrmSummaryWatcher() {
  yield takeEvery(GET_CRM_SUMMARY, getCrmSummary);
}
export function* getUntouchedLeadsWatcher() {
  yield takeEvery(GET_UNTOUCHED_LEADS, getUntouchedLeads);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([fork(getCrmSummaryWatcher), fork(getUntouchedLeadsWatcher)]);
}
