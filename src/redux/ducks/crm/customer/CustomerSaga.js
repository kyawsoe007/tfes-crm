import { all, call, fork, put, takeEvery, delay } from "redux-saga/effects";
import {
  GET_ALL_CUSTOMER,
  GET_SINGLE_CUSTOMER,
  NEW_CUSTOMER,
  EDIT_CUSTOMER,
  DELETE_CUSTOMER,
  ADD_NOTE_CUSTOMER,
  SET_CUSTOMER_ACTIVE,
  TRANSFER_CUSTOMER,
  GET_CUSTOMER_FORM_FIELDS
} from "./CustomerTypes";
import * as actions from "./CustomerActions";

import { singleCustomer, customerListPage } from "Helpers/crmURL";

import api from "Api";

//=========================
// REQUESTS
//=========================
const getAllCustomerRequest = async ({
  limit,
  skip,
  filter,
  searchText,
  orderBy
}) => {
  const result = await api.post("/customers/getall", {
    limit,
    skip,
    filter,
    searchText,
    orderBy
  });
  return result.data;
};
const getCustomerRequest = async custID => {
  const result = await api.get(`/customers/${custID}`);
  return result.data;
};
const postCustomerRequest = async cust => {
  const result = await api.post("/customers", cust);
  return result.data;
};
const editCustomerRequest = async cust => {
  const result = await api.patch(`/customers/${cust.id}`, cust);
  return result.data;
};
const deleteCustomerRequest = async id => {
  const result = await api.delete(`/customers/${id}`);
  return result.data;
};
const addNoteCustomerRequest = async (id, note) => {
  const result = await api.post(`/customers/${id}/notes`, note);
  return result.data;
};
const setCustomerActiveRequest = async (id, status) => {
  const result = await api.patch(`/customers/${id}`, { isActive: status });
  return result.data;
};
const transferCustomerRequest = async (id, newOwner) => {
  const result = await api.post("/customers/transfer", {
    custIds: [id],
    newOwner
  });
  return result.data.updatedRecords[0];
};
const getCustomerFormFieldsRequest = async () => {
  const result = await api.get("/customers/formFields");
  return result.data;
};

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getAllCustomerFromDB({ payload }) {
  try {
    const data = yield call(getAllCustomerRequest, payload);
    yield put(actions.getCustomerSuccess(data));
  } catch (error) {
    yield put(actions.getCustomerFailure(error));
  }
}
function* getCustomerFromDB({ payload }) {
  try {
    const data = yield call(getCustomerRequest, payload);
    yield put(actions.getSingleCustomerSuccess(data));
  } catch (error) {
    yield put(actions.getCustomerFailure(error));
  }
}
function* postCustomerToDB({ payload }) {
  const { form, redirect, history } = payload;
  try {
    const data = yield call(postCustomerRequest, form);
    yield delay(500);
    if (redirect) history.push(singleCustomer(data.id));
    yield put(actions.newCustomerSuccess(data));
  } catch (error) {
    yield put(actions.newCustomerFailure(error));
  }
}
function* editCustomerToDB({ payload }) {
  try {
    const data = yield call(editCustomerRequest, payload);
    yield delay(500);
    yield put(actions.editCustomerSuccess(data));
  } catch (error) {
    yield put(actions.editCustomerFailure(error));
  }
}
function* deleteCustomerFromDB({ payload }) {
  try {
    yield call(deleteCustomerRequest, payload);
    yield delay(500);
    yield put(actions.deleteCustomerSuccess(payload));
  } catch (error) {
    yield put(actions.deleteCustomerFailure(error));
  }
}
function* addNoteCustomerToDB({ payload }) {
  const { id, note } = payload;
  try {
    const data = yield call(addNoteCustomerRequest, id, note);
    yield put(actions.addNoteCustomerSuccess(data));
  } catch (error) {
    yield put(actions.addNoteCustomerFailure(error));
  }
}
function* setCustomerToDB({ payload }) {
  const { id, status } = payload;
  try {
    const data = yield call(setCustomerActiveRequest, id, status);
    yield delay(500);
    yield put(actions.setCustomerActiveSuccess(data));
  } catch (error) {
    yield put(actions.setCustomerActiveFailure(error));
  }
}
function* transferCustomerInDB({ payload }) {
  const { id, newOwner, history } = payload;
  try {
    const data = yield call(transferCustomerRequest, id, newOwner);
    yield delay(500);
    history.push(customerListPage);
    yield put(actions.transferCustomerSuccess(data));
  } catch (error) {
    yield put(actions.transferCustomerFailure(error));
  }
}
function* getCustomerFormFieldsFromDB() {
  try {
    const data = yield call(getCustomerFormFieldsRequest);
    yield put(actions.getCustomerFormSuccess(data));
  } catch (error) {
    yield put(actions.getCustomerFormFailure(error));
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* getAllCustomerWatcher() {
  yield takeEvery(GET_ALL_CUSTOMER, getAllCustomerFromDB);
}
export function* getSingleCustomerWatcher() {
  yield takeEvery(GET_SINGLE_CUSTOMER, getCustomerFromDB);
}
export function* postCustomerWatcher() {
  yield takeEvery(NEW_CUSTOMER, postCustomerToDB);
}
export function* editCustomerWatcher() {
  yield takeEvery(EDIT_CUSTOMER, editCustomerToDB);
}
export function* deleteCustomerWatcher() {
  yield takeEvery(DELETE_CUSTOMER, deleteCustomerFromDB);
}
export function* addNoteCustomerWatcher() {
  yield takeEvery(ADD_NOTE_CUSTOMER, addNoteCustomerToDB);
}
export function* setCustomerActiveWatcher() {
  yield takeEvery(SET_CUSTOMER_ACTIVE, setCustomerToDB);
}
export function* transferCustomerWatcher() {
  yield takeEvery(TRANSFER_CUSTOMER, transferCustomerInDB);
}
export function* getCustomerFormFieldWatcher() {
  yield takeEvery(GET_CUSTOMER_FORM_FIELDS, getCustomerFormFieldsFromDB);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
    fork(getAllCustomerWatcher),
    fork(getSingleCustomerWatcher),
    fork(postCustomerWatcher),
    fork(editCustomerWatcher),
    fork(deleteCustomerWatcher),
    fork(addNoteCustomerWatcher),
    fork(setCustomerActiveWatcher),
    fork(transferCustomerWatcher),
    fork(getCustomerFormFieldWatcher)
  ]);
}
