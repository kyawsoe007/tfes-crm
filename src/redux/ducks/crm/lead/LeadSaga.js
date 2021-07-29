import { all, call, fork, put, takeEvery, delay } from "redux-saga/effects";
import {
  CHANGE_LEAD_LIST_VIEW,
  GET_ALL_LEAD,
  GET_SINGLE_LEAD,
  GET_LEAD_SUMMARY,
  NEW_LEAD,
  CONVERT_LEAD,
  EDIT_LEAD,
  DELETE_LEAD,
  ADD_NOTE_LEAD,
  CHECK_ACCOUNT_EXIST,
  TRANSFER_LEAD,
  GET_LEADFORM_FIELDS
} from "./LeadTypes";
import * as actions from "./LeadActions";
import { singleLead, leadListPage } from "Helpers/crmURL";

import api from "Api";

//=========================
// REQUESTS
//=========================
const getAllLeadRequest = async () => {
  const result = await api.get("/leads/getall");
  return result.data.data;
};
const getOpenLeadRequest = async () => {
  const result = await api.get("/leads");
  return result.data;
};
const getHotLeadRequest = async () => {
  const result = await api.get("/leads");
  return result.data;
};
const getColdLeadRequest = async () => {
  const result = await api.get("/leads");
  return result.data;
};
const getLeadRequest = async leadID => {
  const result = await api.get(`/leads/${leadID}`);
  return result.data;
};
const getLeadSummaryRequest = async () => {
  const result = [];
  return result;
};
const postLeadRequest = async lead => {
  const result = await api.post("/leads", lead);
  return result.data;
};
const convertLeadRequest = async (id, dealDetails, accountId) => {
  const result = await api.post(`/leads/convert/${id}`, {
    dealDetails: dealDetails,
    existingAccountId: accountId
  });
  return result.data;
};
const editLeadRequest = async lead => {
  const result = await api.patch(`/leads/${lead.id}`, lead);
  return result.data;
};
const deleteLeadRequest = async id => {
  const result = await api.delete(`/leads/${id}`);
  return result.data;
};
const addNoteLeadRequest = async (id, note) => {
  const result = await api.post(`/leads/${id}/notes`, note);
  return result.data;
};
const checkAccountRequest = async companyName => {
  const result = await api.post(`/leads/ifAccountExist`, {
    accountName: companyName
  });
  return result.data;
};
const transferLeadRequest = async (id, newOwner) => {
  const result = await api.post(`/leads/transfer`, { leadIds: [id], newOwner });
  return result.data.updatedRecords[0];
};
const getLeadFormFieldsRequest = async () => {
  const result = await api.get("/leads/formFields");
  return result.data;
};

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* changeLeadList({ payload }) {
  let data;
  try {
    if (payload == "All Leads") {
      // All Leads
      data = yield call(getAllLeadRequest);
      yield put(actions.getLeadSuccess(data));
    } else if (payload == "Open Leads") {
      // Open Leads
      data = yield call(getOpenLeadRequest);
      yield put(actions.getLeadSuccess(data));
    } else if (payload == "Hot Leads") {
      // Hot Leads
      data = yield call(getHotLeadRequest);
      yield put(actions.getLeadSuccess(data));
    } else if (payload == "Cold Leads") {
      // Cold Leads
      data = yield call(getColdLeadRequest);
      yield put(actions.getLeadSuccess(data));
    } else {
      data = yield call(getAllLeadRequest);
      yield put(actions.getLeadSuccess(data));
    }
  } catch (error) {
    yield put(actions.getLeadFailure(error));
  }
}
function* getAllLeadFromDB() {
  try {
    const data = yield call(getAllLeadRequest);
    yield put(actions.getLeadSuccess(data));
  } catch (error) {
    yield put(actions.getLeadFailure(error));
  }
}
function* getLeadFromDB({ payload }) {
  try {
    const data = yield call(getLeadRequest, payload);
    yield put(actions.getSingleLeadSuccess(data));
  } catch (error) {
    yield put(actions.getLeadFailure(error));
  }
}
function* getLeadSummaryFromDB() {
  try {
    const data = yield call(getLeadSummaryRequest);
    yield put(actions.getLeadSummarySuccess(data));
  } catch (error) {
    yield put(actions.getLeadSummaryFailure(error));
  }
}
function* postLeadToDB({ payload }) {
  const { form, redirect, history } = payload;
  try {
    const data = yield call(postLeadRequest, form);
    yield delay(500);
    if (redirect) history.push(singleLead(data.id));
    yield put(actions.newLeadSuccess(data));
  } catch (error) {
    yield put(actions.newLeadFailure(error));
  }
}
function* convertLeadToDB({ payload }) {
  const { id, dealDetails, accountId } = payload;
  try {
    const data = yield call(convertLeadRequest, id, dealDetails, accountId);
    yield delay(500);
    yield put(actions.convertLeadSuccess(data));
  } catch (error) {
    yield put(actions.convertLeadFailure(error));
  }
}
function* editLeadToDB({ payload }) {
  try {
    const data = yield call(editLeadRequest, payload);
    yield delay(500);
    yield put(actions.editLeadSuccess(data));
  } catch (error) {
    yield put(actions.editLeadFailure(error));
  }
}
function* deleteLeadFromDB({ payload }) {
  try {
    yield call(deleteLeadRequest, payload);
    yield delay(500);
    yield put(actions.deleteLeadSuccess(payload));
  } catch (error) {
    yield put(actions.deleteLeadFailure(error));
  }
}
function* addLeadNoteToDB({ payload }) {
  const { id, note } = payload;
  try {
    const data = yield call(addNoteLeadRequest, id, note);
    yield put(actions.addNoteLeadSuccess(data));
  } catch (error) {
    yield put(actions.addNoteLeadFailure(error));
  }
}
function* checkAccountFromDB({ payload }) {
  try {
    const data = yield call(checkAccountRequest, payload);
    yield put(actions.checkAccountExistSuccess(data.count, data.data));
  } catch (error) {
    yield put(actions.checkAccountExistFailure(error));
  }
}
function* transferLeadToDB({ payload }) {
  const { id, newOwner, history } = payload;
  try {
    const data = yield call(transferLeadRequest, id, newOwner);
    yield delay(500);
    history.push(leadListPage);
    yield put(actions.transferLeadSuccess(data));
  } catch (error) {
    yield put(actions.transferLeadFailure(error));
  }
}
function* getLeadFormFieldsFromDB() {
  try {
    const data = yield call(getLeadFormFieldsRequest);
    yield put(actions.getLeadFormFieldsSuccess(data));
  } catch (error) {
    yield put(actions.getLeadFormFieldsFailure(error));
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* changeViewWatcher() {
  yield takeEvery(CHANGE_LEAD_LIST_VIEW, changeLeadList);
}
export function* getAllLeadWatcher() {
  yield takeEvery(GET_ALL_LEAD, getAllLeadFromDB);
}
export function* getSingleLeadWatcher() {
  yield takeEvery(GET_SINGLE_LEAD, getLeadFromDB);
}
export function* getLeadSummaryWatcher() {
  yield takeEvery(GET_LEAD_SUMMARY, getLeadSummaryFromDB);
}
export function* postLeadWatcher() {
  yield takeEvery(NEW_LEAD, postLeadToDB);
}
export function* convertLeadWatcher() {
  yield takeEvery(CONVERT_LEAD, convertLeadToDB);
}
export function* editLeadWatcher() {
  yield takeEvery(EDIT_LEAD, editLeadToDB);
}
export function* deleteLeadWatcher() {
  yield takeEvery(DELETE_LEAD, deleteLeadFromDB);
}
export function* addNoteLeadWatcher() {
  yield takeEvery(ADD_NOTE_LEAD, addLeadNoteToDB);
}
export function* checkAccountExistWatcher() {
  yield takeEvery(CHECK_ACCOUNT_EXIST, checkAccountFromDB);
}
export function* transferLeadWatcher() {
  yield takeEvery(TRANSFER_LEAD, transferLeadToDB);
}
export function* getLeadFormFieldsWatcher() {
  yield takeEvery(GET_LEADFORM_FIELDS, getLeadFormFieldsFromDB);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
    fork(changeViewWatcher),
    fork(getAllLeadWatcher),
    fork(getSingleLeadWatcher),
    fork(getLeadSummaryWatcher),
    fork(postLeadWatcher),
    fork(convertLeadWatcher),
    fork(editLeadWatcher),
    fork(deleteLeadWatcher),
    fork(addNoteLeadWatcher),
    fork(checkAccountExistWatcher),
    fork(transferLeadWatcher),
    fork(getLeadFormFieldsWatcher)
  ]);
}
