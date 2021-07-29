import {
  all,
  call,
  fork,
  put,
  takeEvery,
  select,
  delay
} from "redux-saga/effects";

import * as types from "./JournalTypes";
import * as actions from "./JournalActions";

import api from "Api";
import {createJournalEntry} from "./JournalActions";
import {getJournalLists} from "./JournalActions";

//=========================
// REQUESTS
//=========================
const getJournalListsFromDBRequest = async ({
    limit,
    skip,
    filter,
    searchText,
    orderBy
  }) => {
    const result = await api.post('/journal-entry/getfilters', {
        limit: limit,
        skip: skip,
        filter: filter,
        searchText: searchText,
        orderBy: orderBy
    });
    return result.data;
};
const deleteJournalEntryToDBRequest = async (id) => {
    const result = await api.delete(`/journal-entry/${id}`);
    return result.data;
};
const getSingleEntryRequestFromDBRequest = async (id) => {
    const result = await api.get(`/journal-entry/${id}`);
    return result.data;
};
const getJournalsFromDBRequest = async () => {
    const result = await api.get('/account-journal');
    return result.data;
};
const createJournalEntryToDBRequest = async (data) => {
    const result = await api.post('/journal-entry', data);
    return result.data;
};
const updateJournalEntryToDBRequest = async (data) => {
    const result = await api.patch(`/journal-entry/${data.id}`, data);
    return result.data;
};
const getFilterPartnerJournalFromDBRequest = async ({
    limit,
    skip,
    filter,
    searchText,
    orderBy,
}) => {
    const result = await api.post("/partners/getfilters", {
        limit: limit,
        skip: skip,
        filter: filter,
        searchText: searchText,
        orderBy: orderBy,
    });
    return result.data;
};
const getFilterAccountJournalFromDBRequest = async () => {
    const result = await api.get('/account-item');
    return result.data;
};

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getJournalListsFromDB({ payload }) {
    try {
        const data = yield call(getJournalListsFromDBRequest, payload);
        yield put(actions.getJournalListsSuccess(data));
    } catch (error) {
        yield put(actions.getJournalListsFailure(error));
    }
}
function* deleteJournalEntryToDB({ payload }) {
    try {
        const data = yield call(deleteJournalEntryToDBRequest, payload);
        yield put(actions.deleteJournalEntrySuccess(data));
    } catch (error) {
        yield put(actions.deleteJournalEntryFailure(error));
    }
}
function* getSingleEntryRequestFromDB({ payload }) {
    try {
        const data = yield call(getSingleEntryRequestFromDBRequest, payload);
        yield put(actions.getSingleEntryRequestSuccess(data));
    } catch (error) {
        yield put(actions.getSingleEntryRequestFailure(error));
    }
}
function* getJournalsFromDB() {
    try {
        const data = yield call(getJournalsFromDBRequest);
        yield put(actions.getJournalsSuccess(data));
    } catch (error) {
        yield put(actions.getJournalsFailure(error));
    }
}
function* createJournalEntryToDB({ payload }) {
    try {
        const data = yield call(createJournalEntryToDBRequest, payload);
        yield put(actions.createJournalEntrySuccess(data));
    } catch (error) {
        yield put(actions.createJournalEntryFailure(error));
    }
}
function* updateJournalEntryToDB({ payload }) {
    try {
        const data = yield call(updateJournalEntryToDBRequest, payload);
        yield put(actions.updateJournalEntrySuccess(data));
    } catch (error) {
        yield put(actions.updateJournalEntryFailure(error));
    }
}
function* getFilterPartnerJournalFromDB({ payload }) {
  try {
    const data = yield call(getFilterPartnerJournalFromDBRequest, payload);
    yield put(actions.getFilterPartnerJournalSuccess(data));
  } catch (error) {
    yield put(actions.getFilterPartnerJournalFailure(error));
  }
}
function* getFilterAccountJournalFromDB({ payload }) {
  try {
    const data = yield call(getFilterAccountJournalFromDBRequest, payload);
    yield put(actions.getFilterAccountJournalSuccess(data));
  } catch (error) {
    yield put(actions.getFilterAccountJournalFailure(error));
  }
}

function* getSavedJournalQueryData({payload}) {
    try {
      yield put(actions.getSavedJournalQuerySuccess(payload))
    } catch (error) {
      yield put(actions.getSavedJournalQueryFailure(error))
    }
  }


//=======================
// WATCHER FUNCTIONS
//=======================
export function* getJournalListsWatcher() {
    yield takeEvery(types.GET_JOURNAL_LIST, getJournalListsFromDB);
}
export function* deleteJournalEntryWatcher() {
    yield takeEvery(types.DELETE_JOURNAL_ENTRY, deleteJournalEntryToDB);
}
export function* getSingleEntryRequestWatcher() {
    yield takeEvery(types.GET_SINGLE_JOURNAL_ENTRY, getSingleEntryRequestFromDB);
}
export function* getJournalsWatcher() {
    yield takeEvery(types.GET_JOURNALS, getJournalsFromDB);
}
export function* createJournalEntryWatcher() {
    yield takeEvery(types.CREATE_JOURNAL_ENTRY, createJournalEntryToDB);
}
export function* updateJournalEntryWatcher() {
    yield takeEvery(types.UPDATE_JOURNAL_ENTRY, updateJournalEntryToDB);
}
export function* getFilterPartnerJournalWatcher() {
  yield takeEvery(types.GET_FILTER_PARTNER_JOURNAL, getFilterPartnerJournalFromDB);
}
export function* getFilterAccountJournalWatcher() {
  yield takeEvery(types.GET_FILTER_ACCOUNT_JOURNAL, getFilterAccountJournalFromDB);
}

export function* getSavedJournalQueryWatcher(){
    yield takeEvery(types.GET_SAVED_JOURNAL_QUERY, getSavedJournalQueryData)
  }

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
    fork(getJournalListsWatcher),
    fork(deleteJournalEntryWatcher),
    fork(getSingleEntryRequestWatcher),
    fork(getJournalsWatcher),
    fork(createJournalEntryWatcher),
    fork(updateJournalEntryWatcher),
    fork(getFilterPartnerJournalWatcher),
    fork(getFilterAccountJournalWatcher),
    fork(getSavedJournalQueryWatcher)
  ]);
}
