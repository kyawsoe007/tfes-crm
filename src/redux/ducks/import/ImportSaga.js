import { all, call, fork, put, takeEvery, delay } from "redux-saga/effects";
import { IMPORT_RECORD, FETCH_IMPORT_MAPPING } from "./ImportTypes";
import {
  importRecordSuccess,
  importRecordFailure,
  fetchImportMappingSuccess,
  fetchImportMappingFailure
} from "./ImportActions";

import api from "Api";

//=========================
// REQUESTS
//=========================
const importRecordRequest = async (model, fileData) => {
  //const result = await api.post(`/${model}/import`, fileData);
  //return result.data;
  console.log(model, fileData);
};
const fetchImportMappingRequest = async model => {
  // const result = await api.get(`/${model}/importMapping`);
  // return result.data;
  console.log(model);
};

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* importRecordToDB({ payload }) {
  const { model, fileData } = payload;
  try {
    const data = yield call(importRecordRequest, model, fileData);
    yield delay(500);
    yield put(importRecordSuccess(data));
  } catch (error) {
    yield put(importRecordFailure(error));
  }
}
function* fetchImportMappingFromDB({ payload }) {
  try {
    const data = yield call(fetchImportMappingRequest, payload);
    yield delay(500);
    yield put(fetchImportMappingSuccess(data));
  } catch (error) {
    yield put(fetchImportMappingFailure(error));
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* importRecordWatcher() {
  yield takeEvery(IMPORT_RECORD, importRecordToDB);
}
export function* fetchImportMappingWatcher() {
  yield takeEvery(FETCH_IMPORT_MAPPING, fetchImportMappingFromDB);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([fork(importRecordWatcher), fork(fetchImportMappingWatcher)]);
}
