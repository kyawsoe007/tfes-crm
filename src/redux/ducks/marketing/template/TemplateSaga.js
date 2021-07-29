import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  GET_ALL_TEMPLATE,
  ADD_TEMPLATE,
  UPDATE_TEMPLATE,
  DELETE_DEAL,
  DELETE_TEMPLATE,
  UPDATE_TEMPLATE_TITLE,
  GET_FILTER_TEMPLATE,
} from "./TemplateTypes";

import {
  getAllTemplateSuccess,
  getAllTemplateFailure,
  addTemplateSuccess,
  addTemplateFailure,
  updateTemplateSuccess,
  updateTemplateFailure,
  deleteTemplateSuccess,
  deleteTemplateFailure,
  updateTemplateTitleSuccess,
  updateTemplateTitleFailure,
  getFilterTemplateSuccess,
  getFilterTemplateFailure,
} from "./TemplateActions";

import api from "Api";

//=========================
// REQUESTS
//=========================
const getAllTemplateRequest = async () => {
  const result = await api.get("/MailingTemplates/getAll");
  return result.data;
};
const addCampaignTemplateRequest = async (data) => {
  const result = await api.post("/MailingTemplates/customTemplateCreate", data);
  return result.data.data;
};

const updateCampaignTemplateRequest = async (data) => {
  const result = await api.post(`/MailingTemplates/customUpdate`, {
    data: data,
  });
  return result.data.data;
};
const updateCampaignTemplateTitleRequest = async (data) => {
  const { id, title, description } = data;
  const result = await api.post(`/MailingTemplates/titleupdate`, {
    id,
    title,
    description,
  });
  return result.data.data;
};

const deleteTemplateRequest = async (id) => {
  const result = await api.delete(`/MailingTemplates/${id}`);
  return result.data;
};
const getFilterTemplateRequest = async ({
  limit,
  skip,
  filter,
  searchText,
  orderBy,
  custId,
}) => {
  console.log("GET TEMPLATE FILTER REQUEST");
  const result = await api.post("/MailingTemplates/filterall", {
    limit,
    skip,
    filter,
    searchText,
    orderBy,
    custId,
  });
  return result.data;
};
//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getAllTemplate() {
  try {
    const data = yield call(getAllTemplateRequest);
    yield put(getAllTemplateSuccess(data));
  } catch (error) {
    yield put(getAllTemplateFailure(error));
  }
}
function* addCampaignTemplate({ payload }) {
  try {
    const data = yield call(addCampaignTemplateRequest, payload);
    yield put(addTemplateSuccess(data));
  } catch (error) {
    yield put(addTemplateFailure(error));
  }
}

function* updateCampaignTemplate({ payload }) {
  try {
    const data = yield call(updateCampaignTemplateRequest, payload);
    yield put(updateTemplateSuccess(data));
  } catch (error) {
    yield put(updateTemplateFailure(error));
  }
}
function* updateCampaignTemplateTitle({ payload }) {
  try {
    const data = yield call(updateCampaignTemplateTitleRequest, payload);
    yield put(updateTemplateSuccess(data));
  } catch (error) {
    yield put(updateTemplateFailure(error));
  }
}

function* deleteTemplateFromDB({ payload }) {
  try {
    yield call(deleteTemplateRequest, payload);
    yield put(deleteTemplateSuccess(payload));
  } catch (error) {
    yield put(deleteTemplateFailure(error));
  }
}
function* getFilterTemplate({ payload }) {
  try {
    // console.log("GET FILTER TEMPLATE");
    // console.log(payload);
    const data = yield call(getFilterTemplateRequest, payload);
    yield put(getFilterTemplateSuccess(data));
  } catch (error) {
    yield put(getFilterTemplateFailure(error));
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* getAllTemplateWatcher() {
  yield takeEvery(GET_ALL_TEMPLATE, getAllTemplate);
}
export function* addTemplateWatcher() {
  yield takeEvery(ADD_TEMPLATE, addCampaignTemplate);
}
export function* updateTemplateWatcher() {
  yield takeEvery(UPDATE_TEMPLATE, updateCampaignTemplate);
}
export function* updateTemplateTitleWatcher() {
  yield takeEvery(UPDATE_TEMPLATE_TITLE, updateCampaignTemplateTitle);
}
export function* deleteTemplateWatcher() {
  yield takeEvery(DELETE_TEMPLATE, deleteTemplateFromDB);
}
export function* getFilterTemplateWatcher() {
  yield takeEvery(GET_FILTER_TEMPLATE, getFilterTemplate);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
    fork(getAllTemplateWatcher),
    fork(addTemplateWatcher),
    fork(updateTemplateWatcher),
    fork(deleteTemplateWatcher),
    fork(updateTemplateTitleWatcher),
    fork(getFilterTemplateWatcher),
  ]);
}
