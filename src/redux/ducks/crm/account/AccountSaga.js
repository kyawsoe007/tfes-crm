import { all, call, fork, put, takeEvery, delay } from "redux-saga/effects";
import {
  CHANGE_ACCOUNT_LIST_VIEW,
  GET_ALL_ACCOUNT,
  GET_SINGLE_ACCOUNT,
  NEW_ACCOUNT,
  EDIT_ACCOUNT,
  ADD_NOTE_ACCOUNT,
  DELETE_ACCOUNT,
  SET_ACCOUNT_ACTIVE,
  TRANSFER_ACCOUNT,
  GET_ACCOUNT_FORM_FIELDS
} from "./AccountTypes";
import * as actions from "./AccountActions";
import { singleAccount, accountListPage } from "Helpers/crmURL";

import api from "Api";

//=========================
// REQUESTS
//=========================
const getAllAccountRequest = async () => {
  const result = await api.get("/accounts/getall");
  return result.data.data;
};
const getActiveAccountRequest = async () => {
  const result = await api.get("/accounts");
  return result.data;
};
const getInactiveAccountRequest = async () => {
  const result = await api.get("/accounts");
  return result.data;
};
const getAccountRequest = async acctID => {
  const result = await api.get(`/accounts/${acctID}`);
  return result.data;
};
const postAccountRequest = async acct => {
  const result = await api.post("/accounts", acct);
  return result.data;
};
const patchAccountRequest = async acct => {
  const result = await api.patch(`/accounts/${acct.id}`, acct);
  return result.data;
};
const deleteAccountRequest = async id => {
  const result = await api.delete(`/accounts/${id}`);
  return result.data;
};
const addNoteAccountRequest = async (id, note) => {
  const result = await api.post(`/accounts/${id}/notes`, note);
  return result.data;
};
const setAccountActiveRequest = async (id, status) => {
  const result = await api.patch(`/accounts/${id}`, { isActive: status });
  return result.data;
};
const transferAccountRequest = async (id, newOwner) => {
  const result = await api.post("/accounts/transfer", {
    acctIds: [id],
    newOwner
  });
  return result.data.updatedRecords[0];
};
const getAccountFielsRequest = async () => {
  const result = await api.get("/accounts/formFields");
  return result.data;
};

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* changeAccountList({ payload }) {
  let data;
  try {
    if (payload == "All Accounts") {
      // All Accounts
      data = yield call(getAllAccountRequest);
      yield put(actions.getAccountSuccess(data));
    } else if (payload == "Active Accounts") {
      // My Accounts
      data = yield call(getActiveAccountRequest);
      yield put(actions.getAccountSuccess(data));
    } else if (payload == "Inactive Accounts") {
      // Open Accounts
      data = yield call(getInactiveAccountRequest);
      yield put(actions.getAccountSuccess(data));
    } else {
      data = yield call(getAllAccountRequest);
      yield put(actions.getAccountSuccess(data));
    }
  } catch (error) {
    yield put(actions.getAccountFailure(error));
  }
}
function* getAllAccountFromDB() {
  try {
    const data = yield call(getAllAccountRequest);
    yield put(actions.getAccountSuccess(data));
  } catch (error) {
    yield put(actions.getAccountFailure(error));
  }
}
function* getAccountFromDB({ payload }) {
  try {
    const data = yield call(getAccountRequest, payload);
    yield put(actions.getSingleAccountSuccess(data));
  } catch (error) {
    yield put(actions.getAccountFailure(error));
  }
}
function* postAccountToDB({ payload }) {
  const { form, redirect, history } = payload;
  try {
    const data = yield call(postAccountRequest, form);
    yield delay(500);
    if (redirect) history.push(singleAccount(data.id));
    yield put(actions.newAccountSuccess(data));
  } catch (error) {
    yield put(actions.newAccountFailure(error));
  }
}
function* patchAccountToDB({ payload }) {
  try {
    const data = yield call(patchAccountRequest, payload);
    yield delay(500);
    yield put(actions.editAccountSuccess(data));
  } catch (error) {
    yield put(actions.editAccountFailure(error));
  }
}
function* deleteAccountFromDB({ payload }) {
  try {
    yield call(deleteAccountRequest, payload);
    yield delay(500);
    yield put(actions.deleteAccountSuccess(payload));
  } catch (error) {
    let errorMessage;
    if (error.response) {
      errorMessage = error.response.data.error;
    } else {
      errorMessage = error;
    }
    yield put(actions.deleteAccountFailure(errorMessage));
  }
}
function* addNoteAccountToDB({ payload }) {
  const { id, note } = payload;
  try {
    const data = yield call(addNoteAccountRequest, id, note);
    yield put(actions.addNoteAccountSuccess(data));
  } catch (error) {
    yield put(actions.addNoteAccountFailure(error));
  }
}
function* setAccountActiveToDB({ payload }) {
  const { id, status } = payload;
  try {
    const data = yield call(setAccountActiveRequest, id, status);
    yield delay(500);
    yield put(actions.setAccountActiveSuccess(data));
  } catch (error) {
    yield put(actions.setAccountActiveFailure(error));
  }
}
function* transferAccountInDB({ payload }) {
  const { id, newOwner, history } = payload;
  try {
    const data = yield call(transferAccountRequest, id, newOwner);
    yield delay(500);
    history.push(accountListPage);
    yield put(actions.transferAccountSuccess(data));
  } catch (error) {
    yield put(actions.transferAccountFailure(error));
  }
}
function* getAccountFieldsFromDB() {
  try {
    const data = yield call(getAccountFielsRequest);
    yield put(actions.getAccountFormSuccess(data));
  } catch (error) {
    yield put(actions.getAccountFormFailure(error));
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* changeViewWatcher() {
  yield takeEvery(CHANGE_ACCOUNT_LIST_VIEW, changeAccountList);
}
export function* getAllAccountWatcher() {
  yield takeEvery(GET_ALL_ACCOUNT, getAllAccountFromDB);
}
export function* getSingleAccountWatcher() {
  yield takeEvery(GET_SINGLE_ACCOUNT, getAccountFromDB);
}
export function* postAccountWatcher() {
  yield takeEvery(NEW_ACCOUNT, postAccountToDB);
}
export function* patchAccountWatcher() {
  yield takeEvery(EDIT_ACCOUNT, patchAccountToDB);
}
export function* deleteAccounttWatcher() {
  yield takeEvery(DELETE_ACCOUNT, deleteAccountFromDB);
}
export function* addNoteAccountWatcher() {
  yield takeEvery(ADD_NOTE_ACCOUNT, addNoteAccountToDB);
}
export function* setAccountActiveWatcher() {
  yield takeEvery(SET_ACCOUNT_ACTIVE, setAccountActiveToDB);
}
export function* transferAccountWatcher() {
  yield takeEvery(TRANSFER_ACCOUNT, transferAccountInDB);
}
export function* getAccountFormFieldsWatcher() {
  yield takeEvery(GET_ACCOUNT_FORM_FIELDS, getAccountFieldsFromDB);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
    fork(changeViewWatcher),
    fork(getAllAccountWatcher),
    fork(getSingleAccountWatcher),
    fork(postAccountWatcher),
    fork(patchAccountWatcher),
    fork(deleteAccounttWatcher),
    fork(addNoteAccountWatcher),
    fork(setAccountActiveWatcher),
    fork(transferAccountWatcher),
    fork(getAccountFormFieldsWatcher)
  ]);
}
