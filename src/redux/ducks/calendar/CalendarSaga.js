import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import * as Types from "./CalendarTypes";
import * as Actions from "./CalendarActions";

import api from "Api";

//=========================
// REQUESTS
//=========================
const getAllEventsRequestWithFilter = async (start, end, id) => {
  try {
    // const result = await api.get(`/events?filter[where][start][lt]=2019-07-18T02:38:03.197Z`);
    // const stringify = {where: {start: {gt: "2019-07-18T02:38:03.197Z"}}}
    // const result = await api.get(`/events?filter={where: {start: {gt: "2019-07-18T02:38:03.197Z"}}}`)

    // const result = await api.get(`events?filter[where][start][gte]=${start}&filter[where][end][lte]=${end}&`);
    // const result = await api.get(`events?filter[where][start][gte]=${start}&filter[where][end][lte]=${end}&filter[order]=start ASC&`);
    // const result = await api.get(`events?filter[where][userId]=${id}&filter[where][end][gt]=${start}&filter[where][end][lt]=${end}&filter[order]=start ASC&`);
    const result = await api.get(
      `events?filter[where][userId]=${id}&filter[where][end][gt]=${start}&filter[where][end][lt]=${end}&filter[order]=start ASC&`
    );

    return result.data.data;
  } catch (err) {
    return err;
  }
};
const getAllEventsRequest = async () => {
  try {
    const result = await api.post("/events/getAllMethods");
    //console.log("UUUUUUUUUUUUUU");
    //console.log(result.data);
    return result.data;
  } catch (err) {
    return err;
  }
};
const addEventRequest = async (newEvent) => {
  try {

    const result = await api.post("/events/customCreate", { data: newEvent });
    return result.data.data;
  } catch (err) {
    return err;
  }
};
const deleteEventRequest = async id => {
  try {
    const result = await api.delete(`/events/${id}`);
    // const result = newEvent;
    return result.data;
  } catch (err) {
    return err;
  }
};
const updateEventRequest = async id => {
  try {
    const result = await api.patch(`/events/?id=${id.id}`, id);
    // const result = newEvent;
    return result.data;
  } catch (err) {
    return err;
  }
};

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getAllEventsFromDB(item) {
  const { payload } = item;

  if (payload.filter) {
    try {
      let myEvents = yield call(
        getAllEventsRequestWithFilter,
        payload.start,
        payload.end,
        payload.id
      );
      myEvents.map(item => {
        item.start = new Date(item.start);
        item.end = new Date(item.end);
        return;
      });
      yield put(Actions.getAllEventsSuccess(myEvents, myEvents));
    } catch (err) {

      yield put(Actions.getEventFailure(err));
    }
  } else {
    try {
      console.log("Yielding getAllEventsSuccess here");
      let event = [];
      //let testevent = myEvents;
      let myEvents = yield call(getAllEventsRequest);
      myEvents.data.map(item => {
        item.start = new Date(item.start);
        item.end = new Date(item.end);
      });

      yield put(Actions.getAllEventsSuccess(myEvents, myEvents));
    } catch (err) {
      console.log(err);
      yield put(Actions.getEventFailure(err));
    }
  }
}

function* addEventToDB({ payload }) {
  const { item, type } = payload;
  try {
    const data = yield call(addEventRequest, item);
    if (type == "Lead") {
      yield put(Actions.addLeadEvent(data));
    } else if (type == "Customer") {
      yield put(Actions.addCustomerEvent(data));
    } else if (type == "Account") {
      yield put(Actions.addAccountEvent(data));
    } else if (type == "Deal") {
      yield put(Actions.addDealEvent(data));
    } else {
      yield put(Actions.addEventSuccess(data));
    }
  } catch (err) {
    yield put(Actions.addEventFailure(err));
  }
}

function* deleteEventFromDB(item) {
  try {
    const data = yield call(deleteEventRequest, item.payload);
    if (!data.count == 1) {
      throw "Item could not be deleted";
    }
    yield put(Actions.deleteEventSuccess(item.payload));
  } catch (err) {
    yield put(Actions.deleteEventFailure(err));
  }
}
function* updateEventFromDB(item) {
  try {
    const data = yield call(updateEventRequest, item.payload);
    yield put(Actions.updateEventSuccess(data));
  } catch (err) {
    yield put(Actions.updateEventFailure(err));
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* getAllEventsWatcher() {
  yield takeEvery(Types.GET_ALL_EVENTS, getAllEventsFromDB);
}
export function* addEventWatcher() {
  yield takeEvery(Types.ADD_EVENT, addEventToDB);
}
export function* deleteEventWatcher() {
  yield takeEvery(Types.DELETE_EVENT, deleteEventFromDB);
}

export function* updateEventWatcher() {
  yield takeEvery(Types.UPDATE_EVENT, updateEventFromDB);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
    ,
    fork(getAllEventsWatcher),
    fork(addEventWatcher),
    fork(deleteEventWatcher),
    fork(updateEventWatcher)
  ]);
}
