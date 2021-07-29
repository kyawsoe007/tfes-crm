import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  GET_EMAIL_SETTINGS,
  SET_EMAIL_SETTINGS,
  UPDATE_EMAIL_SETTINGS,
  DELETE_EMAIL_SETTINGS

} from "./EmailSettingsTypes";
import {
  getEmailSettingsSuccess,
  getEmailSettingsFailure,
  setEmailSettingsSuccess,
  setEmailSettingsFailure,
  updateEmailSettingsSuccess,
  updateEmailSettingsFailure,
  deleteEmailSettingsSuccess,
  deleteEmailSettingsFailure
} from "./EmailSettingsActions";
import api from "Api";

//=========================
// REQUESTS
//=========================
const  getEmailSettingsRequest = async () => {
  const result = await api.get("/EmailSettings");
  return result.data;
};

const setEmailSettingsRequest = async payload => {

  const data = {
    email: payload.email,
    testDrive: payload.testDrive,
    maintenance: payload.maintenance,
  enquiry: payload.enquiry
  }
  const result = await api.post("/EmailSettings/newEmail",  {data});

  // return result;
  return result.data.data;
};


const updateEmailSettingsRequest = async payload => {

  const data = {
    email: payload.email,
    testDrive: payload.testDrive,
    maintenance: payload.maintenance,
  enquiry: payload.enquiry,
  id: payload.id
  }
  const result = await api.post("/EmailSettings/updateEmail",  {data});

  // return result;
  return result.data.data;
};

const deleteEmailSettingsRequest = async payload => {

  const id =  payload;
  
  const result = await api.post("/EmailSettings/deleteEmail", {id});


  return result.data.data;
};
//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getEmailSettingsFromDB() {
  try {
    const data = yield call(getEmailSettingsRequest);
    yield put(getEmailSettingsSuccess(data));
  } catch (err) {
    yield put( getEmailSettingsFailure(err));
  }
}

function* setEmailSettingsToDB({ payload }) {
  try {
    const data = yield call(setEmailSettingsRequest, payload);
    yield put(setEmailSettingsSuccess(data));
  } catch (err) {
    yield put(setEmailSettingsFailure(err));
  }
}
function* updateEmailSettingsToDB({ payload }) {
  try {
    const data = yield call(updateEmailSettingsRequest, payload);
    yield put(updateEmailSettingsSuccess(data));
  } catch (err) {
    yield put(updateEmailSettingsFailure(err));
  }
}
function* deleteEmailSettingsToDB({ payload }) {
  try {

    const data = yield call(deleteEmailSettingsRequest, payload);
    yield put(deleteEmailSettingsSuccess(data));
  } catch (err) {
    yield put(deleteEmailSettingsFailure(err));
  }
}

// function* addInterestRateToDB({ payload }) {
//   try {
//     const data = yield call(addInterestRate, payload);
//     yield put(addInterestRateSuccess(data));
//   } catch (err) {
//     yield put(addInterestRateFailure(err));
//   }
// }

//=======================
// WATCHER FUNCTIONS
//=======================
export function*  getEmailSettingsWatcher() {
  yield takeEvery( GET_EMAIL_SETTINGS, getEmailSettingsFromDB);
}
export function* setEmailSettingsWatcher() {
  yield takeEvery(SET_EMAIL_SETTINGS, setEmailSettingsToDB);
}
export function* updateEmailSettingsWatcher() {
  yield takeEvery(UPDATE_EMAIL_SETTINGS, updateEmailSettingsToDB);
}
export function* deleteEmailSettingsWatcher() {
  yield takeEvery(DELETE_EMAIL_SETTINGS, deleteEmailSettingsToDB);
}
// export function* addInterestRateWatcher() {
//   yield takeEvery(ADD_INTEREST_RATE, addInterestRateToDB);
// }

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
    fork(getEmailSettingsWatcher),
    fork(setEmailSettingsWatcher),
    fork(updateEmailSettingsWatcher),
    fork(deleteEmailSettingsWatcher),
  ]);
}
