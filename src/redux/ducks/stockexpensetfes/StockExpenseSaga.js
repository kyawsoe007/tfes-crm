import {
    all,
    call,
    fork,
    put,
    takeEvery,
    delay,
    select,
  } from 'redux-saga/effects'
  
  import * as types from './StockExpenseTypes'
  import * as actions from './StockExpenseActions'
  import api from 'Api'
  
  
  //=========================
  // REQUESTS
  //=========================

const getAllStockExpensesRequest = async(payload) => {
    
      const result = await api.get(`/stock-expense`);
      return result.data
}
  
const getStockExpensesRequest = async(payload) => {
    console.log("getAllStockExpensesRequest call saga" ,payload )
    const result = await api.get(`/stock-expense/${payload}`);
    return result.data
}

  const patchStockExpenseRequest = async({payload}) => {
      const result = await api.patch(`/stock-expense/${payload.id}`, payload)
      return result.data
  }
  
  const postStockExpenseRequest = async({payload}) => {

      const result = await api.post(`/stock-expense`, payload)
      return result.data;
  }

  const deleteStockExpenseRequest = async({payload}) => {
      const result = await api.delete(`/stock-expense/${payload}`)
      return result.data;
  }
  
  //=========================
  // CALL(GENERATOR) ACTIONS
  //=========================
  
  function* getAllStockExpensesData(payload) {
      
      try {
          const data = yield call(getAllStockExpensesRequest, payload) 
          console.log('data',data)
          yield put(actions.getAllStockExpensesSuccess(data))
      } catch (error) {
          yield put(actions.getAllStockExpensesFailure(error))
      }
}
  
function* getSingleStockExpenseFromDB({ payload }) {
    console.log("getSingleStockExpenseFromDB",payload)
    try {
      const data = yield call(getStockExpensesRequest, payload)
      yield put(actions.getStockExpenseSuccess(data))
    } catch (error) {
      yield put(actions.getStockExpenseFailure(error))
    }
  }
  
  function* patchStockExpenseData(payload) {
      try {
          const data = yield call(patchStockExpenseRequest, payload)
          yield put(actions.patchStockExpenseSuccess(data))
      } catch (error) {
          yield put(actions.patchStockExpenseFailure(error))
      }
  }

  function* postStockExpenseData(payload) {
      try {
          const data = yield call(postStockExpenseRequest, payload)
          yield put(actions.postStockExpenseSuccess(data))
      } catch (error) {
          yield put(actions.postStockExpenseFailure(error))
      }
  }

  function* deleteStockExpenseData(payload) {
      try {
          const data = yield call(deleteStockExpenseRequest, payload)
          yield put(actions.deleteStockExpenseSuccess(data))
      } catch (error) {
          yield put(actions.deleteStockExpenseFailure(error))
      }
  }

  function* getSavedStockExpenseQueryData({payload}) {
    try {
      yield put(actions.getSavedStockExpenseQuerySuccess(payload))
    } catch (error) {
      yield put(actions.getSavedStockExpenseQueryFailure(error))
    }
  }

  //=======================
  // WATCHER FUNCTIONS
  //=======================
  
  export function* getAllStockExpensesWatcher() {
      yield takeEvery(types.GET_ALL_STOCK_EXPENSE, getAllStockExpensesData)
  }

  export function* patchStockExpenseWatcher() {
      yield takeEvery(types.PATCH_STOCK_EXPENSE, patchStockExpenseData)
  }
 
  export function* postStockExpenseWatcher() {
      yield takeEvery(types.POST_STOCK_EXPENSE, postStockExpenseData)
  }

  export function* deleteStockExpenseWatcher() {
      yield takeEvery(types.DELETE_STOCK_EXPENSE, deleteStockExpenseData)
}
export function* getStockExpenseWatcher() {
    yield takeEvery(types.GET_STOCK_EXPENSE, getSingleStockExpenseFromDB)
}

export function* getSavedStockExpenseQueryWatcher(){
    yield takeEvery(types.GET_SAVED_STOCK_EXPENSE_QUERY, getSavedStockExpenseQueryData)
  }

  
  //=======================
  // FORK SAGAS TO STORE
  //=======================
  export default function* rootSaga() {
    yield all([
      fork(getAllStockExpensesWatcher),
      fork(patchStockExpenseWatcher),
      fork(postStockExpenseWatcher),
      fork(deleteStockExpenseWatcher),
      fork(getStockExpenseWatcher)
    ])
  }