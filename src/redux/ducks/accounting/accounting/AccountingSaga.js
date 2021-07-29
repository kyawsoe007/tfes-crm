import {
    all,
    call,
    fork,
    put,
    takeEvery,
    select,
    delay
  } from "redux-saga/effects";
  
  
  import * as types from './AccountingTypes'
  import * as actions from './AccountingActions'
  import api from "Api";
  
  //=========================
  // REQUESTS
  //=========================
  const submitAccountFormFieldsRequest = async ({payload}) => {
    let result = null

    if(payload.accountPage == "Quotation"){
      result = await api.post("/quotations", {data: payload.formField}); 
    } else {
      result = await api.post("/invoices", {data: payload.formField});
    }
    return result.data
  };


  //=========================
  // CALL(GENERATOR) Actions
  //=========================
  function* submitAccountFormFields(payload) {
    try {
      const data = yield call(submitAccountFormFieldsRequest, payload);
      yield delay(500);

      yield put(actions.submitAccountQuotationInvoiceSuccess(data));
    } catch (error) {
      yield put(actions.submitAccountQuotationInvoiceFailure(error));
    }
  }
  
  
  //=======================
  // WATCHER FUNCTIONS
  //=======================
 
  export function* submitAccountingFormFieldsWatcher() {
    yield takeEvery(types.HANDLE_SUBMIT_ACCOUNT_QUOTATION_INVOICE, submitAccountFormFields);
  }
 

  //=======================
  // FORK SAGAS TO STORE
  //=======================
  export default function* rootSaga() {
    yield all([
      fork(submitAccountingFormFieldsWatcher),
    ]);
  }
  