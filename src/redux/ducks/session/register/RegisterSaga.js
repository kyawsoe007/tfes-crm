import { all, call, fork, put, takeEvery, select } from "redux-saga/effects";

import { SIGNUP_USER } from "./RegisterTypes";

import { registerUserSuccess, registerUserFailure } from "./RegisterActions";

import api from "Api";

const registerUserRequest = async form => {
  const result = await api.post("/users/signup", form);
  return result.data;
};

function* registerUserToDB() {
  const getRegisterForm = state => state.sessionState.registerState.form;
  try {
    const form = yield select(getRegisterForm);
    const data = yield call(registerUserRequest, form);
    yield put(registerUserSuccess(data.msg));
  } catch (error) {
    yield put(registerUserFailure(error.response.data.error.message));
  }
}

export function* registerUserWatcher() {
  yield takeEvery(SIGNUP_USER, registerUserToDB);
}

export default function* rootSaga() {
  yield all([fork(registerUserWatcher)]);
}
