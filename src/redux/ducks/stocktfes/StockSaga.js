import { all, call, fork, put, takeEvery, delay } from "redux-saga/effects";
import api from "Api";

import { GET_ALL_STOCKS, GET_FILTER_STOCKS,CREATE_STOCK_OPERATION, GET_MOVE_LINE, SAVE_OPERATION_FORM, GET_FILTER_MOVES, CREATE_STOCK_MOVE_SKU, GET_SAVED_STOCK_QUERY } from "./StockTypes";
import * as actions from "./StockActions";


//=========================
// REQUESTS
//=========================

const getAllStocksFromDBRequest = async () => {
  const result = await api.get("/stock-operation");
  return result.data;
};

const getFilterStocksFromDBRequest = async ({
  limit,
  skip,
  filter,
  searchText,
  orderBy,
}) => {
  const result = await api.post("/stock-operation/getfilters", {
    limit: limit,
    skip: skip,
    filter: filter,
    searchText: searchText,
    orderBy: orderBy,
  });
  return result.data;
};

const getMoveLinesFromDBRequest = async (id) => {
  const result = await api.get(`/stock-move/${id}`);
  return result.data;
};

const saveOperationFormToDBRequest = async (data) => {
  const result = await api.post(`/stock-move/save-operation-form`, data);
  return result.data;
};

const getFilterMovesFromDBRequest = async ({
 limit,
 skip,
 filter,
 searchText,
 orderBy,
}) => {
  const result = await api.post("/stock-move/getfilters", {
    limit: limit,
    skip: skip,
    filter: filter,
    searchText: searchText,
    orderBy: orderBy,
  });
  return result.data;
};


//=========================
// CALL(GENERATOR) ACTIONS
//=========================

function* getAllStocksFromDB() {
  try {
    const data = yield call(getAllStocksFromDBRequest);
    yield put(actions.getAllStocksSuccess(data));
  } catch (error) {
    yield put(actions.getAllStocksFailure(error));
  }
}
function* getFilterStocksFromDB({ payload }) {

  console.log("11111")
  try {
    const data = yield call(getFilterStocksFromDBRequest, payload);
    yield put(actions.getFilterStocksSuccess(data));
    console.log("222222222")
  } catch (error) {
    console.log("3333333", error)
    yield put(actions.getFilterStocksFailure(error));
  }
}
function* getMoveLinesFromDB({ payload }) {
  try {
    const data = yield call(getMoveLinesFromDBRequest, payload);
    yield put(actions.getMoveLinesSuccess(data));
  } catch (error) {
    yield put(actions.getMoveLinesFailure(error));
  }
}
function* saveOperationFormToDB({ payload }) {
  try {
    const data = yield call(saveOperationFormToDBRequest, payload);
    yield put(actions.saveOperationFormSuccess(data));
  } catch (error) {
    yield put(actions.saveOperationFormFailure(error));
  }
}
function* getFilterMovesFromDB({ payload }) {
  try {
    const data = yield call(getFilterMovesFromDBRequest, payload);
    yield put(actions.getFilterMovesSuccess(data));
  } catch (error) {
    yield put(actions.getFilterMovesFailure(error));
  }
}

const saveStockOperationToDBRequest = async (data) => {
  const result = await api.post(`/stock-operation`, data);
  return result.data
}

function* saveStockOperationFormDB({ payload }) {
  try {
    const data = yield call(saveStockOperationToDBRequest, payload);
    yield put(actions.createStockOperationFormSuccess(data))
  } catch (error) {
    yield put(actions.createStockOperationFormFailure)
  }
}


function* getSavedStockQueryData({payload}) {
  try {
    yield put(actions.getSavedStockQuerySuccess(payload))
  } catch (error) {
    yield put(actions.getSavedStockQueryFailure(error))
  }
}


//=======================
// WATCHER FUNCTIONS
//=======================

export function* saveStockOperationFormWatcher() {
  yield takeEvery(CREATE_STOCK_OPERATION, saveStockOperationFormDB)
}


export function* getAllStocksWatcher() {
  yield takeEvery(GET_ALL_STOCKS, getAllStocksFromDB);
}
export function* getFilterStocksWatcher() {
  yield takeEvery(GET_FILTER_STOCKS, getFilterStocksFromDB);
}
export function* getMoveLinesWatcher() {
  yield takeEvery(GET_MOVE_LINE, getMoveLinesFromDB);
}
export function* saveOperationFormWatcher() {
  yield takeEvery(SAVE_OPERATION_FORM, saveOperationFormToDB);
}
export function* getFilterMovesWatcher() {
  yield takeEvery(GET_FILTER_MOVES, getFilterMovesFromDB);
}

export function* getSavedStockQueryWatcher(){
  yield takeEvery(GET_SAVED_STOCK_QUERY, getSavedStockQueryData)
}

export default function* rootSaga() {
  yield all([
    fork(getAllStocksWatcher),
    fork(getFilterStocksWatcher),
    fork(getMoveLinesWatcher),
    fork(saveOperationFormWatcher),
    fork(getFilterMovesWatcher),
    fork(saveStockOperationFormWatcher),
    fork(getSavedStockQueryWatcher),
  ]);
}
