import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  GET_FOLLOWUP_RESULT,
  GET_FOLLOWUP_TYPE,
  NEW_FOLLOWUP
} from "./FollowupTypes";
import * as actions from "./FollowupActions";

import api from "Api";

//=========================
// GET FOLLOWUP RESULT
//=========================
const getFollowupResultRequest = async () => {
  const result = await api.get("/followupresults");
  return result.data;
};
function* getFollowupResult() {
  try {
    const data = yield call(getFollowupResultRequest);
    yield put(actions.getFollowupResultSuccess(data));
  } catch (error) {
    yield put(actions.getFollowupResultFailure(error));
  }
}
export function* getFollowupResultWatcher() {
  yield takeEvery(GET_FOLLOWUP_RESULT, getFollowupResult);
}

//=========================
// GET FOLLOWUP TYPE
//=========================
const getFollowupTypeRequest = async () => {
  const result = await api.get("/followuptypes");
  return result.data;
};
function* getFollowupType() {
  try {
    const data = yield call(getFollowupTypeRequest);
    yield put(actions.getFollowupTypeSuccess(data));
  } catch (error) {
    yield put(actions.getFollowupTypeFailure(error));
  }
}
export function* getFollowupTypeWatcher() {
  yield takeEvery(GET_FOLLOWUP_TYPE, getFollowupType);
}

//=========================
// NEW FOLLOWUP
//=========================
const newFollowupRequest = async data => {
  const result = await api.post("/followups", data);
  return result.data;
};
function* newFollowup({ payload }) {
  try {
    const data = yield call(newFollowupRequest, payload);
    // yield put(actions.n(data));
    console.log(data);
  } catch (error) {
    yield put(actions.newFollowupFailure(error));
  }
}
export function* postFollowupWatcher() {
  yield takeEvery(NEW_FOLLOWUP, newFollowup);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
    fork(getFollowupResultWatcher),
    fork(getFollowupTypeWatcher),
    fork(postFollowupWatcher)
  ]);
}
