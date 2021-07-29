import { all, call, fork, put, takeEvery, select } from "redux-saga/effects";
import { GET_COMPANY, UPDATE_COMPANY } from "./CompanySettingsTypes";
import {
  getCompanySuccess,
  getCompanyFailure,
  updateCompanySuccess,
  updateCompanyFailure
} from "./CompanySettingsActions";
//import api from "Api";
const company1 = {
  name: "Fish LLC",
  contact: "98765432",
  email: "flying@fish.com",
  website: "flyingfish.com",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque feugiat ac neque a bibendum. Phasellus tempus varius magna convallis volutpat. Sed justo elit, pellentesque id sem sit amet, ultrices ullamcorper risus. Vivamus dictum mi ante, non interdum libero commodo id. Nunc gravida congue sapien vitae rutrum.",
  currency: "Singapore, SGD ($)",
  timezone: "(GMT +08:00) Singapore Time (Asia/Singapore)",
  location: "50 Tuas Avenue 11 #02-06 Tuas Lot, 639107, Singapore",
  fiscalYear: "April",
  openingHours: "09:00 - 18:00",
  holidays: [{ id: 1, name: "Games Night", date: "14 June" }]
};

//=========================
// REQUESTS
//=========================
const getCompanyRequest = async () => {
  const result = company1;
  return result;
};
const updateCompanyRequest = async company => {
  const result = company1;
  return result;
};

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getCompanyFromDB() {
  try {
    const data = yield call(getCompanyRequest);
    yield put(getCompanySuccess(data));
  } catch (err) {
    yield put(getCompanyFailure(err));
  }
}
function* updateCompanyToDB() {
  const getCompany = state => state.companyState.companyUpdate;
  const company = yield select(getCompany);
  try {
    const data = yield call(updateCompanyRequest, company);
    yield put(updateCompanySuccess(data));
  } catch (err) {
    yield put(updateCompanyFailure(err));
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* getCompanyWatcher() {
  yield takeEvery(GET_COMPANY, getCompanyFromDB);
}
export function* updateCompanyWatcher() {
  yield takeEvery(UPDATE_COMPANY, updateCompanyToDB);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([, fork(getCompanyWatcher), fork(updateCompanyWatcher)]);
}
