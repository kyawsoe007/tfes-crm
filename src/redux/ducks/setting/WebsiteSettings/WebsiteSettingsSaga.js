import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  GET_INTEREST_RATE,
  UPDATE_INTEREST_RATE,
  ADD_INTEREST_RATE
} from "./WebsiteSettingsTypes";
import {
  getInterestRateSuccess,
  getInterestRateFailure,
  updateInterestRateSuccess,
  updateInterestRateFailure,
  addInterestRateSuccess,
  addInterestRateFailure
} from "./WebsiteSettingsActions";
import api from "Api";

//=========================
// REQUESTS
//=========================
const getInterestRateRequest = async () => {
  const result = await api.get("/WebsiteSettings");
  return result.data;
};

const updateInterestRate = async payload => {
  const result = await api.patch(`/WebsiteSettings/${payload.id}`, {
    interestRate: payload.interestRate
  });
  return result.data;
};

const addInterestRate = async payload => {
  console.log("payload= ", payload);
  const result = await api.post(`/WebsiteSettings`, {
    interestRate: payload.interestRate
  });
  return result.data;
};

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getInterestRateFromDB() {
  try {
    const data = yield call(getInterestRateRequest);
    yield put(getInterestRateSuccess(data));
  } catch (err) {
    yield put(getInterestRateFailure(err));
  }
}

function* updateInterestRateToDB({ payload }) {
  try {
    const data = yield call(updateInterestRate, payload);
    yield put(updateInterestRateSuccess(data));
  } catch (err) {
    yield put(updateInterestRateFailure(err));
  }
}

function* addInterestRateToDB({ payload }) {
  try {
    const data = yield call(addInterestRate, payload);
    yield put(addInterestRateSuccess(data));
  } catch (err) {
    yield put(addInterestRateFailure(err));
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* getInterestRateWatcher() {
  yield takeEvery(GET_INTEREST_RATE, getInterestRateFromDB);
}
export function* updateInterestRateWatcher() {
  yield takeEvery(UPDATE_INTEREST_RATE, updateInterestRateToDB);
}
export function* addInterestRateWatcher() {
  yield takeEvery(ADD_INTEREST_RATE, addInterestRateToDB);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
    fork(getInterestRateWatcher),
    fork(updateInterestRateWatcher),
    fork(addInterestRateWatcher)
  ]);
}
