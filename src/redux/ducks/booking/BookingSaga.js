import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  GET_RECENT_BOOKINGS,
  GET_BOOKINGS,
  UPDATE_BOOKING_STATUS
} from "./BookingTypes";
import * as actions from "./BookingActions";

import api from "Api";

//=========================
// REQUESTS
//=========================
const getRecentBookingRequest = async ({ type, id }) => {
  console.log("GET BOOKING REQUEST")
  
  const result = await api.get(`/bookings/recentbooking/${type}/${id}`);
  console.log("AFTER RES")
  console.log(result)
  return result.data.data;
};
const getBookingsRequest = async type => {

  const result = await api.get(`/bookings?filter[where][service]=${type}`);
 console.log(results)
  return result.data;
};
const updateBookingStatusRequest = async ({ id, status }) => {
  const result = await api.post(`/bookings/changeBookingStatus`, {
    data: { id, status }
  });
  return result.data.fields;
};

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getRecentBookings({ payload }) {
  try {
    const data = yield call(getRecentBookingRequest, payload);
    yield put(actions.getRecentBookingsSuccess(data));
  } catch (error) {
    yield put(actions.getRecentBookingsFailure(error));
  }
}
function* getBookings({ payload }) {
  try {
    const data = yield call(getBookingsRequest, payload);
    yield put(actions.getBookingsSuccess(data));
  } catch (error) {
    yield put(actions.getBookingsFailure(error));
  }
}
function* updateBookingsStatus({ payload }) {
  try {
    const data = yield call(updateBookingStatusRequest, payload);
    yield put(actions.updateBookingStatusSuccess(data));
  } catch (error) {
    yield put(actions.updateBookingStatusFailure(error));
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* getRecentBookingWatcher() {
  yield takeEvery(GET_RECENT_BOOKINGS, getRecentBookings);
}
export function* getBookingsWatcher() {
  yield takeEvery(GET_BOOKINGS, getBookings);
}
export function* updateBookingStatusWatcher() {
  yield takeEvery(UPDATE_BOOKING_STATUS, updateBookingsStatus);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
    fork(getRecentBookingWatcher),
    fork(getBookingsWatcher),
    fork(updateBookingStatusWatcher)
  ]);
}
