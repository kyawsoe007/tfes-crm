import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  GET_ALL_ANNOUNCEMENT,
  NEW_ANNOUNCEMENT,
  EDIT_ANNOUNCEMENT,
  DELETE_ANNOUNCEMENT,
  GET_LATEST_ANNOUNCEMENT,
  READ_ANNOUNCEMENT
} from "./AnnouncementTypes";
import * as actions from "./AnnouncementActions";

import api from "Api";

//=========================
// GET ANNOUNCEMENT
//=========================
const getAllAnnouncementRequest = async () => {
  const result = await api.get("/announcements");
  return result.data;
};
function* getAllAnnouncement() {
  try {
    const data = yield call(getAllAnnouncementRequest);
    yield put(actions.getAllAnnouncementSuccess(data));
  } catch (error) {
    yield put(actions.getAllAnnouncementFailure(error));
  }
}
export function* getAllAnnouncementWatcher() {
  yield takeEvery(GET_ALL_ANNOUNCEMENT, getAllAnnouncement);
}

//=========================
// NEW ANNOUNCEMENT
//=========================
const newAnnouncementRequest = async data => {
  const config = {
    headers: {
      "content-type": "application/json"
    }
  };
  console.log(data);
  const result = await api.post("/announcements/new", data, config);
  return result.data.data;
};
function* newAnnouncement({ payload }) {
  try {
    const data = yield call(newAnnouncementRequest, payload);
    yield put(actions.newAnnouncementSuccess(data));
  } catch (error) {
    yield put(actions.newAnnouncementFailure(error));
  }
}
export function* newAnnouncementWatcher() {
  yield takeEvery(NEW_ANNOUNCEMENT, newAnnouncement);
}

//=========================
// EDIT ANNOUNCEMENT
//=========================
const editAnnouncementRequest = async data => {
  const result = await api.patch(`/announcements/${data.id}`, data);
  return result.data;
};
function* editAnnouncement({ payload }) {
  try {
    const data = yield call(editAnnouncementRequest, payload);
    yield put(actions.editAnnouncementSuccess(data));
  } catch (error) {
    yield put(actions.editAnnouncementFailure(error));
  }
}
export function* editAnnouncementWatcher() {
  yield takeEvery(EDIT_ANNOUNCEMENT, editAnnouncement);
}

//=========================
// DELETE ANNOUNCEMENT
//=========================
const deleteAnnouncementRequest = async data => {
  const result = await api.post(`/announcements/delete`, {
    announcementId: data.id
  });
  return result.data;
};
function* deleteAnnouncement({ payload }) {
  try {
    yield call(deleteAnnouncementRequest, payload);
    yield put(actions.deleteAnnouncementSuccess(payload.id));
  } catch (error) {
    yield put(actions.deleteAnnouncementFailure(error));
  }
}
export function* deleteAnnouncementWatcher() {
  yield takeEvery(DELETE_ANNOUNCEMENT, deleteAnnouncement);
}

//=========================
// GET LATEST ANNOUNCEMENT
//=========================
const getLatestAnnouncementRequest = async () => {
  const result = await api.get(`/announcements/getLatest`);
  return result.data.data;
};
function* getLatestAnnouncement() {
  try {
    const data = yield call(getLatestAnnouncementRequest);
    yield put(actions.getLatestAnnouncementSuccess(data));
  } catch (error) {
    yield put(actions.getLatestAnnouncementFailure(error));
  }
}
export function* getLatestAnnouncementWatcher() {
  yield takeEvery(GET_LATEST_ANNOUNCEMENT, getLatestAnnouncement);
}

//=========================
// READ ANNOUNCEMENT
//=========================
const readAnnouncementRequest = async announcement => {
  const result = await api.post(`/announcements/read`, announcement);
  return result.data;
};
function* readAnnouncement({ payload }) {
  try {
    yield call(readAnnouncementRequest, payload);
    yield put(actions.readAnnouncementSuccess(payload));
  } catch (error) {
    yield put(actions.readAnnouncementFailure(error));
  }
}
export function* readAnnouncementWatcher() {
  yield takeEvery(READ_ANNOUNCEMENT, readAnnouncement);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
    fork(getAllAnnouncementWatcher),
    fork(newAnnouncementWatcher),
    fork(editAnnouncementWatcher),
    fork(deleteAnnouncementWatcher),
    fork(getLatestAnnouncementWatcher),
    fork(readAnnouncementWatcher)
  ]);
}
