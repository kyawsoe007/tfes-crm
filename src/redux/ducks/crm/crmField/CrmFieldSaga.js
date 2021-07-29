import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  GET_LEAD_SOURCE,
  GET_LEAD_STATUS,
  GET_INDUSTRY,
  GET_LEAD_INTEREST,
  GET_DEAL_TYPE,
  GET_DEAL_STAGE
} from "./CrmFieldTypes";
import {
  getCrmFieldFailure,
  getLeadSourceSuccess,
  getLeadStatusSuccess,
  getIndustrySuccess,
  getLeadInterestSuccess,
  getDealTypeSuccess,
  getDealStageSuccess
} from "./CrmFieldActions";

import api from "Api";

//=========================
// REQUESTS
//=========================
const getLeadSourceRequest = async () => {
  const result = await api.get("/leadsources");
  return result.data;
};
const getLeadStatusRequest = async () => {
  const result = await api.get("/leadstatus");
  return result.data;
};
const getIndustryRequest = async () => {
  const result = await api.get("/leadindustries");
  return result.data;
};
const getLeadInterestRequest = async () => {
  const result = await api.get("/leadinterestlevels");
  return result.data;
};
const getDealTypeRequest = async () => {
  const result = await api.get("/dealtypes");
  return result.data;
};
const getDealStageRequest = async () => {
  const result = await api.get("/dealstages");
  return result.data;
};

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getLeadSourceFromDB() {
  try {
    const data = yield call(getLeadSourceRequest);
    yield put(getLeadSourceSuccess(data));
  } catch (error) {
    yield put(getCrmFieldFailure(error));
  }
}
function* getLeadStatusFromDB() {
  try {
    const data = yield call(getLeadStatusRequest);
    yield put(getLeadStatusSuccess(data));
  } catch (error) {
    yield put(getCrmFieldFailure(error));
  }
}
function* getIndustryFromDB() {
  try {
    const data = yield call(getIndustryRequest);
    yield put(getIndustrySuccess(data));
  } catch (error) {
    yield put(getCrmFieldFailure(error));
  }
}
function* getLeadInterestFromDB() {
  try {
    const data = yield call(getLeadInterestRequest);
    yield put(getLeadInterestSuccess(data));
  } catch (error) {
    yield put(getCrmFieldFailure(error));
  }
}
function* getDealTypeFromDB() {
  try {
    const data = yield call(getDealTypeRequest);
    yield put(getDealTypeSuccess(data));
  } catch (error) {
    yield put(getCrmFieldFailure(error));
  }
}
function* getDealStageFromDB() {
  try {
    const data = yield call(getDealStageRequest);
    yield put(getDealStageSuccess(data));
  } catch (error) {
    yield put(getCrmFieldFailure(error));
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* getLeadSourceWatcher() {
  yield takeEvery(GET_LEAD_SOURCE, getLeadSourceFromDB);
}
export function* getLeadStatusWatcher() {
  yield takeEvery(GET_LEAD_STATUS, getLeadStatusFromDB);
}
export function* getIndustryWatcher() {
  yield takeEvery(GET_INDUSTRY, getIndustryFromDB);
}
export function* getLeadInterestWatcher() {
  yield takeEvery(GET_LEAD_INTEREST, getLeadInterestFromDB);
}
export function* getDealTypeWatcher() {
  yield takeEvery(GET_DEAL_TYPE, getDealTypeFromDB);
}
export function* getDealStageWatcher() {
  yield takeEvery(GET_DEAL_STAGE, getDealStageFromDB);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
    fork(getLeadSourceWatcher),
    fork(getLeadStatusWatcher),
    fork(getIndustryWatcher),
    fork(getLeadInterestWatcher),
    fork(getDealTypeWatcher),
    fork(getDealStageWatcher)
  ]);
}
