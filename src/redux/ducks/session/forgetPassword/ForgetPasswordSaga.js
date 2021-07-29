import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
  LOGIN_USER_RESENT_EMAIL,
  LOGIN_USER_RESET_PASSWORD
} from "./ForgetPasswordTypes";

import {
  userResentEmailSuccess,
  userResentEmailFailure,
  userResetPasswordFailure,
  userResetPasswordSuccess
} from "./ForgetPasswordActions";

import api from "Api";

/**
 * Resend verification email
 */
const userResentVerificationEmail = async userId => {
  const result = await api.post(`/users/verify`, { id: userId });
  return result.data;
};
function* UserResentEmail({ payload }) {
  try {
    yield call(userResentVerificationEmail, payload.user);
    yield put(userResentEmailSuccess());
  } catch (error) {
    yield put(userResentEmailFailure());
  }
}

/**
 * Resent forget password email
 */
const userResentPasswordEmail = async email => {
  const result = await api.post(`/users/reset`, { email: email });

  if (result.data) {
    return result.data;
  } else {
    return result;
  }
};
function* UserResentPassword({ payload }) {
  try {
    yield call(userResentPasswordEmail, payload.email);
    yield put(userResetPasswordSuccess());
  } catch (error) {
    let errorMessage;
    if (error.response) {
      errorMessage = error.response.data.error.message;
    } else {
      errorMessage = error.message;
    }
    yield put(userResetPasswordFailure(errorMessage));
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* usersentEmail() {
  yield takeEvery(LOGIN_USER_RESENT_EMAIL, UserResentEmail);
}
export function* usersentPassword() {
  yield takeEvery(LOGIN_USER_RESET_PASSWORD, UserResentPassword);
}

export default function* rootSaga() {
  yield all([fork(usersentEmail), fork(usersentPassword)]);
}
