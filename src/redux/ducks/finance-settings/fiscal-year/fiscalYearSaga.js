import {
    all,
    call,
    fork,
    put,
    takeEvery,
    delay,
    select,
  } from 'redux-saga/effects'
  
  import * as types from './fiscalYearTypes'
  import * as actions from './fiscalYearActions'
  import api from 'Api'
  
  
  //=========================
  // REQUESTS
  //=========================

  const getAllFiscalYearsRequest = async(payload) => {
      const result = await api.get(`/fiscal-year`);
      return result.data
  }

  const patchFiscalYearRequest = async({payload}) => {
      const result = await api.patch(`/fiscal-year/${payload.id}`, payload)
      return result.data
  }
  
  const postFiscalYearRequest = async({payload}) => {
      const result = await api.post(`/fiscal-period/fiscal_period_data`, payload)
      return result.data;
  }

  const getAllFiscalYearByMonthlyRequest = async({payload}) => {
    const result = await api.post(`/fiscal-year/get-fiscal-year`, payload)
    return result.data;
}
  const deleteFiscalYearRequest = async({payload}) => {
      const result = await api.delete(`/fiscal-period/fiscalYearPeriod/${payload}`)
      return result.data;
  }
  
  const getCurrenyRequest = async (id) => {
    const result = await api.get(`/fiscal-year/${id}`)
    return result.data
  }

  const getAllFiscalPeriod = async (id) => {
      console.log('saga',id)
    const result = await api.get(`/fiscal-period/findWithYear/${id}`)
    return result.data
  }

  const getAllFiscalPeriodByMonthRequest = async(payload) => {
    const result = await api.get(`/fiscal-period/find_current_date`);
    return result.data
}
    
  //=========================
  // CALL(GENERATOR) ACTIONS
  //=========================
  
  function* getAllFiscalPeriodData({payload}) {
    try {
        console.log('payload',payload)
        const data = yield call(getAllFiscalPeriod, payload)
        console.log('data',data)
        yield put(actions.getFiscalPeriodSuccess(data))
    } catch (error) {
        yield put(actions.getFiscalPeriodFailure(error))
    }
}

  function* getAllFiscalYearsData(payload) {
      try {
          const data = yield call(getAllFiscalYearsRequest, payload) 
          yield put(actions.getAllFiscalYearsSuccess(data))
      } catch (error) {
          yield put(actions.getAllFiscalYearsFailure(error))
      }
  }
  
  function* getAllFiscalPeriodByMonthData(payload) {
    try {
        const data = yield call(getAllFiscalPeriodByMonthRequest, payload) 
        yield put(actions.getAllFiscalPeriodByMonthSuccess(data))
    } catch (error) {
        yield put(actions.getAllFiscalPeriodByMonthFailure(error))
    }
}
  function* getFiscalYearFromDB({ payload }) {
    try {
      const data = yield call(getCurrenyRequest, payload)
      yield put(actions.getFiscalYearSuccess(data))
    } catch (error) {
      yield put(actions.getFiscalYearFailure(error))
    }
  }
  function* patchFiscalYearData(payload) {
      try {
          const data = yield call(patchFiscalYearRequest, payload)
          yield put(actions.patchFiscalYearSuccess(data))
      } catch (error) {
          yield put(actions.patchFiscalYearFailure(error))
      }
  }

  function* postFiscalYearData(payload) {
      try {
          const data = yield call(postFiscalYearRequest, payload)
          yield put(actions.postFiscalYearSuccess(data))
      } catch (error) {
          yield put(actions.postFiscalYearFailure(error))
      }
  }
  function* getAllFiscalYearByMonthlyData(payload) {
    try {
        const data = yield call(getAllFiscalYearByMonthlyRequest, payload)
        yield put(actions.postFiscalYearByMonthlySuccess(data))
    } catch (error) {
        yield put(actions.postFiscalYearByMonthlyFailure(error))
    }
}
  
  function* deleteFiscalYearData(payload) {
      try {
          const data = yield call(deleteFiscalYearRequest, payload)
          yield put(actions.deleteFiscalYearSuccess(data))
      } catch (error) {
          yield put(actions.deleteFiscalYearFailure(error))
      }
  }

  //=======================
  // WATCHER FUNCTIONS
  //=======================
  
  export function* getAllFiscalYearsWatcher() {
      yield takeEvery(types.GET_ALL_FISCAL_YEARS, getAllFiscalYearsData)
  }

  export function* patchFiscalYearWatcher() {
      yield takeEvery(types.PATCH_FISCAL_YEAR, patchFiscalYearData)
  }
 
  export function* postFiscalYearWatcher() {
      yield takeEvery(types.POST_FISCAL_YEAR, postFiscalYearData)
  }
  export function* getAllFiscalYearsByMonthlyWatcher() {
    yield takeEvery(types.GET_ALL_FISCAL_YEARS_BY_MONTHLY, getAllFiscalYearByMonthlyData)
}
  
  export function* deleteFiscalYearWatcher() {
      yield takeEvery(types.DELETE_FISCAL_YEAR, deleteFiscalYearData)
  }
  
  export function* getFiscalYearWatcher() {
    yield takeEvery(types.GET_FISCAL_YEAR,getFiscalYearFromDB)
}
export function* getFiscalPeriodWatcher() {
    yield takeEvery(types.GET_ALL_FISCAL_PERIODS,getAllFiscalPeriodData)
}
export function* getAllFiscalPeriodByMonthWatcher(){
    yield takeEvery(types.GET_FISCAL_PERIOD_BY_MONTH,getAllFiscalPeriodByMonthData)
}

  
  //=======================
  // FORK SAGAS TO STORE
  //=======================
  export default function* rootSaga() {
    yield all([
      fork(getAllFiscalYearsWatcher),
      fork(patchFiscalYearWatcher),
      fork(postFiscalYearWatcher),
        fork(deleteFiscalYearWatcher),
        fork(getFiscalYearWatcher),
        fork(getAllFiscalYearsByMonthlyWatcher),
        fork(getFiscalPeriodWatcher),
        fork(getAllFiscalPeriodByMonthWatcher)
    ])
  }