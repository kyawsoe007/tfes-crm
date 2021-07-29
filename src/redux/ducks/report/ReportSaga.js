import { all, call, fork, put, takeEvery, delay } from "redux-saga/effects";
import {
  GET_DEALS_BY_OWNER,
  GET_DEALS_BY_TYPE,
  GET_DEALS_BY_SOURCE,
  GET_DEALS_PIPELINE,
  GET_LEADS_BY_STATUS,
  GET_LEADS_BY_OWNER,
  GET_LEADS_BY_SOURCE,
  GET_TOP_SPENDER_ACCOUNT,
  GET_TOP_SPENDER_CUSTOMER,
  GET_INDIVIDUAL_REPORT,
  GET_CLOSED_BY_OWNER,
  GET_COMMISSION_REPORT,
  GET_TOP_SELLING_REPORT
} from "./ReportTypes";

import {
  getReportFailure,
  getDealsByOwnerSuccess,
  getDealsByTypeSuccess,
  getDealsBySourceSuccess,
  getDealsPipelineSuccess,
  getLeadsByStatusSuccess,
  getLeadsByOwnerSuccess,
  getLeadsBySourceSuccess,
  getTopSpenderAccountSuccess,
  getTopSpenderCustomerSuccess,
  getIndividualReportSuccess,
  getWonByOwnerSuccess,
  getCommissionReportSuccess,
  getTopSellerSuccess
} from "./ReportActions";

import api from "Api";

//=========================
// REQUESTS
//=========================
const getDealsByOwnerRequest = async (startDate, endDate) => {
  const result = await api.post("/reports/dealsbyowner", {
    startDate,
    endDate
  });
  return result.data.data;
};
const getDealsByTypeRequest = async (startDate, endDate) => {
  const result = await api.post("/reports/dealsbytype", {
    startDate,
    endDate
  });
  return result.data.data;
};
const getDealsBySourceRequest = async (startDate, endDate) => {
  const result = await api.post("/reports/dealsbysource", {
    startDate,
    endDate
  });
  return result.data.data;
};
const getDealsPipelineRequest = async (startDate, endDate) => {
  const result = await api.post("/reports/dealspipeline", {
    startDate,
    endDate
  });
  return result.data.data;
};
const getLeadsByStatusRequest = async (startDate, endDate) => {
  const result = await api.post("/reports/leadsbystatus", {
    startDate,
    endDate
  });
  return result.data.data;
};
const getLeadsByOwnerRequest = async (startDate, endDate) => {
  const result = await api.post("/reports/leadsbyowner", {
    startDate,
    endDate
  });
  return result.data.data;
};
const getLeadsBySourceRequest = async (startDate, endDate) => {
  const result = await api.post("/reports/leadsbysource", {
    startDate,
    endDate
  });
  return result.data.data;
};
const getTopSpenderAccountRequest = async (startDate, endDate) => {
  const result = await api.post("/reports/topspenderacct", {
    startDate,
    endDate
  });
  return result.data.data;
};
const getTopSpenderCustomerRequest = async (startDate, endDate) => {
  const result = await api.post("/reports/topspendercust", {
    startDate,
    endDate
  });
  return result.data.data;
};
const getIndividualReportRequest = async (startDate, endDate, userId) => {
  const result = await api.post("/reports/individualsales", {
    startDate,
    endDate,
    userId
  });
  return result.data.data;
};
const getWonByOwnerRequest = async (startDate, endDate) => {
  const result = await api.post("/reports/closedbyowner", {
    startDate,
    endDate
  });
  return result.data.data;
};
const getCommissionRequest = async (startDate, endDate) => {
  const result = await api.post("/reports/commsreport", { startDate, endDate });
  return result.data.data;
};
const getTopSellerRequest = async (startDate, endDate) => {
  const result = await api.post("/reports/topseller", { startDate, endDate });
  return result.data.data;
};

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getDealsByOwner({ payload }) {
  const { start, end } = payload;
  try {
    const data = yield call(getDealsByOwnerRequest, start, end);
    yield delay(500);
    yield put(getDealsByOwnerSuccess(data));
  } catch (error) {
    yield put(getReportFailure(error));
  }
}
function* getDealsByType({ payload }) {
  const { start, end } = payload;
  try {
    const data = yield call(getDealsByTypeRequest, start, end);
    yield delay(500);
    yield put(getDealsByTypeSuccess(data));
  } catch (error) {
    yield put(getReportFailure(error));
  }
}
function* getDealsBySource({ payload }) {
  const { start, end } = payload;
  try {
    const data = yield call(getDealsBySourceRequest, start, end);
    yield delay(500);
    yield put(getDealsBySourceSuccess(data));
  } catch (error) {
    yield put(getReportFailure(error));
  }
}
function* getDealsPipeline({ payload }) {
  const { start, end } = payload;
  try {
    const data = yield call(getDealsPipelineRequest, start, end);
    yield delay(500);
    yield put(getDealsPipelineSuccess(data));
  } catch (error) {
    yield put(getReportFailure(error));
  }
}
function* getLeadsByStatus({ payload }) {
  const { start, end } = payload;
  try {
    const data = yield call(getLeadsByStatusRequest, start, end);
    yield delay(500);
    yield put(getLeadsByStatusSuccess(data));
  } catch (error) {
    yield put(getReportFailure(error));
  }
}
function* getLeadsByOwner({ payload }) {
  const { start, end } = payload;
  try {
    const data = yield call(getLeadsByOwnerRequest, start, end);
    yield delay(500);
    yield put(getLeadsByOwnerSuccess(data));
  } catch (error) {
    yield put(getReportFailure(error));
  }
}
function* getLeadsBySource({ payload }) {
  const { start, end } = payload;
  try {
    const data = yield call(getLeadsBySourceRequest, start, end);
    yield delay(500);
    yield put(getLeadsBySourceSuccess(data));
  } catch (error) {
    yield put(getReportFailure(error));
  }
}
function* getTopSpenderAccount({ payload }) {
  const { start, end } = payload;
  try {
    const data = yield call(getTopSpenderAccountRequest, start, end);
    yield delay(500);
    yield put(getTopSpenderAccountSuccess(data));
  } catch (error) {
    yield put(getReportFailure(error));
  }
}
function* getTopSpenderCustomer({ payload }) {
  const { start, end } = payload;
  try {
    const data = yield call(getTopSpenderCustomerRequest, start, end);
    yield delay(500);
    yield put(getTopSpenderCustomerSuccess(data));
  } catch (error) {
    yield put(getReportFailure(error));
  }
}
function* getIndividualReport({ payload }) {
  const { start, end, id } = payload;
  try {
    const data = yield call(getIndividualReportRequest, start, end, id);
    yield delay(500);
    yield put(getIndividualReportSuccess(data));
  } catch (error) {
    yield put(getReportFailure(error));
  }
}
function* getWonByOwner({ payload }) {
  const { start, end } = payload;
  try {
    const data = yield call(getWonByOwnerRequest, start, end);
    yield delay(500);
    yield put(getWonByOwnerSuccess(data));
  } catch (error) {
    yield put(getReportFailure(error));
  }
}
function* getCommission({ payload }) {
  const { start, end } = payload;
  try {
    const data = yield call(getCommissionRequest, start, end);
    yield delay(500);
    yield put(getCommissionReportSuccess(data));
  } catch (error) {
    yield put(getReportFailure(error));
  }
}
function* getTopSeller({ payload }) {
  const { start, end } = payload;
  try {
    const data = yield call(getTopSellerRequest, start, end);
    yield delay(500);
    yield put(getTopSellerSuccess(data));
  } catch (error) {
    yield put(getReportFailure(error));
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* getDealsByOwnerWatcher() {
  yield takeEvery(GET_DEALS_BY_OWNER, getDealsByOwner);
}
export function* getDealsByTypeWatcher() {
  yield takeEvery(GET_DEALS_BY_TYPE, getDealsByType);
}
export function* getDealsBySourceWatcher() {
  yield takeEvery(GET_DEALS_BY_SOURCE, getDealsBySource);
}
export function* getDealsPipelineWatcher() {
  yield takeEvery(GET_DEALS_PIPELINE, getDealsPipeline);
}
export function* getLeadsByStatusWatcher() {
  yield takeEvery(GET_LEADS_BY_STATUS, getLeadsByStatus);
}
export function* getLeadsByOwnerWatcher() {
  yield takeEvery(GET_LEADS_BY_OWNER, getLeadsByOwner);
}
export function* getLeadsBySourceWatcher() {
  yield takeEvery(GET_LEADS_BY_SOURCE, getLeadsBySource);
}
export function* getTopSpenderAccountWatcher() {
  yield takeEvery(GET_TOP_SPENDER_ACCOUNT, getTopSpenderAccount);
}
export function* getTopSpenderCustomerWatcher() {
  yield takeEvery(GET_TOP_SPENDER_CUSTOMER, getTopSpenderCustomer);
}
export function* getIndividualReportWatcher() {
  yield takeEvery(GET_INDIVIDUAL_REPORT, getIndividualReport);
}
export function* getWonByOwnerWatcher() {
  yield takeEvery(GET_CLOSED_BY_OWNER, getWonByOwner);
}
export function* getCommissionWatcher() {
  yield takeEvery(GET_COMMISSION_REPORT, getCommission);
}
export function* getTopSellerWatcher() {
  yield takeEvery(GET_TOP_SELLING_REPORT, getTopSeller);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
    fork(getDealsByOwnerWatcher),
    fork(getDealsByTypeWatcher),
    fork(getDealsBySourceWatcher),
    fork(getDealsPipelineWatcher),
    fork(getLeadsByStatusWatcher),
    fork(getLeadsByOwnerWatcher),
    fork(getLeadsBySourceWatcher),
    fork(getTopSpenderAccountWatcher),
    fork(getTopSpenderCustomerWatcher),
    fork(getIndividualReportWatcher),
    fork(getWonByOwnerWatcher),
    fork(getCommissionWatcher),
    fork(getTopSellerWatcher)
  ]);
}
