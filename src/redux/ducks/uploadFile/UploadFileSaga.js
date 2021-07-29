import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { DELETE_UPLOAD_FILE, DOWNLOAD_UPLOAD_FILE, GET_UPLOAD_FILE, PATCH_UPLOAD_FILE, UPLOAD_FILE, UPLOAD_MULTIPLE_FILE } from "./UploadFileTypes";

import { 
  uploadFileSuccess, 
  uploadFileFailure, 
  uploadMultipleFileSuccess, 
  uploadMultipleFileFailure, 
  getUploadFileSuccess, 
  getUploadFileFailure,
  deleteUploadFileSuccess,
  deleteUploadFileFailure, 
  patchUploadFileSuccess,
  patchUploadFileFailure,
  downloadUploadFileSuccess,
  downloadUploadFileFailure
} from "./UploadFileActions";

import api from "Api";

const uploadFileRequest = async (payload) => {
  const result = await api.post(`/upload`, payload);
  return result.data;
};

const uploadMultipleFileRequest = async (payload) => {
  const result = await api.post(`/upload/multiple`, payload);
  return result.data;
};

const getUploadFileRequest = async (payload) => {
  const result = await api.get(`/upload/${payload}`);
  return result.data;
};

const deleteUploadFileRequest = async (payload) => {
  // const result = await api.delete(`/upload/${payload}`);
  const result = await api.post(`/upload/removeFilePath`, payload);

  //path file is returned so that can filter in reducer 
  const returnBody = {
    filepath: payload,
    data: result && result.data ? result.data : ""
  }

  console.log(returnBody)
  return returnBody

};


const patchUploadFileRequest = async (payload) => {

  const result = await api.patch(`/upload/${payload.id}`, payload.formData);
  return result.data;
};

const downloadUploadFileRequest = async (payload) => {

  window.open(`${api.defaults.baseURL}/upload/filepath/${payload}`)
  // return result.data;
};


function* uploadFile({payload}) {

  try {
    const upload = yield call(uploadFileRequest, payload);

    yield put(uploadFileSuccess(upload));
  } catch (error) {
    yield put(uploadFileFailure(error.response.data.error));
  }
}

function* uploadMultipleFile({payload}) {

  try {
    const upload = yield call(uploadMultipleFileRequest, payload);

    yield put(uploadMultipleFileSuccess(upload));
  } catch (error) {
    yield put(uploadMultipleFileFailure(error.response.data.error));
  }
}

function* getUploadFile({payload}) {

  try {
    const upload = yield call(getUploadFileRequest, payload);

    yield put(getUploadFileSuccess(upload));
  } catch (error) {
    yield put(getUploadFileFailure(error.response.data.error));
  }
}

function* deleteUploadFile({payload}) {
  try {
    const upload = yield call(deleteUploadFileRequest, payload);
    yield put(deleteUploadFileSuccess(upload));
  } catch (error) {
    yield put(deleteUploadFileFailure(error.response.data.error));
  }
}

function* patchUploadFile({payload}) {
  try {
    const upload = yield call(patchUploadFileRequest, payload);
    yield put(patchUploadFileSuccess(upload));
  } catch (error) {
    yield put(patchUploadFileFailure(error.response.data.error));
  }
}

function* downloadUploadFile({payload}) {
  try {
    const upload = yield call(downloadUploadFileRequest, payload);
    yield put(downloadUploadFileSuccess(upload));
  } catch (error) {
    yield put(downloadUploadFileFailure(error.response.data.error));
  }
}


export function* uploadFileFunc() {
  yield takeEvery(UPLOAD_FILE, uploadFile);
}

export function* uploadMultipleFileFunc() {
  yield takeEvery(UPLOAD_MULTIPLE_FILE, uploadMultipleFile);
}

export function* getUploadedFileFunc() {
  yield takeEvery(GET_UPLOAD_FILE, getUploadFile);
}

export function* deleteUploadedFileFunc() {
  yield takeEvery(DELETE_UPLOAD_FILE, deleteUploadFile);
}

export function* patchUploadedFileFunc() {
  yield takeEvery(PATCH_UPLOAD_FILE, patchUploadFile);
}

export function* downloadUploadedFileFunc() {  
  yield takeEvery(DOWNLOAD_UPLOAD_FILE, downloadUploadFile);
}

export default function* rootSaga() {
  yield all([
    fork(uploadFileFunc),
    fork(uploadMultipleFileFunc),
    fork(getUploadedFileFunc),
    fork(deleteUploadedFileFunc),
    fork(patchUploadedFileFunc),
    fork(downloadUploadedFileFunc)
  ]);
}
