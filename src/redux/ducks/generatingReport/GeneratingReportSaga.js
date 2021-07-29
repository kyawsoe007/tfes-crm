import {
  all,
  call,
  fork,
  put,
  takeEvery,
  delay,
  select
} from 'redux-saga/effects'

import * as types from './GeneratingReportTypes'
import * as actions from './GeneratingReportActions'
import api from 'Api'

//=========================
// REQUESTS
//=========================

const getGeneralLedgerPdfRequest = async (payload) => {
  const result = await api.post(`/reports/generalledger-pdf`, payload, { responseType: 'blob' });

  const file = new Blob(
    [await result.data],
    { type: 'application/pdf' });

  //const fileURL = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(file);
  link.download = "generalledger.pdf"
  link.click();
  //window.open(fileURL);
  return result.payload
  //window.open(`${api.defaults.baseURL}/reports/generalledger-pdf`)
}

const getGstReportPdfRequest = async (payload) => {
  const result = await api.post(`/reports/gst-pdf`, payload, { responseType: 'blob' });

  const file = new Blob(
    [await result.data],
    { type: 'application/pdf' });

  //const fileURL = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(file);
  link.download = "gstReport.pdf"
  link.click();
  //window.open(fileURL);
  return result.payload
  //window.open(`${api.defaults.baseURL}/reports/generalledger-pdf`)
}

const getStockMovementReportCsvRequest = async (payload) => {
  const result = await api.post(`/stock-move/exportcsv`, payload, { responseType: 'blob' });

  const file = new Blob(
    [await result.data],
    { type: 'text/csv' });

  //const fileURL = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(file);
  link.download = "stockMove.csv"
  link.click();
  return result.payload
}

const getJournalItemReportCsvRequest = async (payload) => {
  const result = await api.post(`/journal-entry/getJournalWithDate`, payload, { responseType: 'blob' });

  const file = new Blob(
    [await result.data],
    { type: 'text/csv' });

  //const fileURL = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(file);
  link.download = "journal.csv"
  link.click();
  return result.payload

  // console.log("journal", payload);
  // return null
}

const getAccountJournalReportCsvRequest = async (payload) => {
  const result = await api.post(`/journal-entry/getJournalWithDateAndAccount`, payload, { responseType: 'blob' });

  const file = new Blob(
    [await result.data],
    { type: 'text/csv' });

  //const fileURL = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(file);
  link.download = "journal.csv"
  link.click();
  return result.payload

  // console.log("journal", payload);
  // return null
}

const getTrialBalanceReportCsvRequest = async (payload) => {
  const result = await api.post(`/reports/trial-balance`, payload, { responseType: 'blob' });

  const file = new Blob(
    [await result.data],
    { type: 'text/csv' });

  //const fileURL = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(file);
  link.download = "trialbalance.csv"
  link.click();
  return result.payload
}

const getProfitAndLossReportCsvRequest = async (payload) => {
  const result = await api.post(`/reports/profitnloss-report`, payload, { responseType: 'blob' });

  const file = new Blob(
    [await result.data],
    { type: 'text/csv' });

  //const fileURL = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(file);
  link.download = "profitandloss.csv"
  link.click();
  return result.payload
}

const getBalanceSheetCsvRequest = async (payload) => {
  const result = await api.post(`/reports/balance-sheet`, payload, { responseType: 'blob' });

  const file = new Blob(
    [await result.data],
    { type: 'text/csv' });

  //const fileURL = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(file);
  link.download = "balancesheet.csv"
  link.click();
  return result.payload
}

const getSalesOrderReportCsvRequest = async (payload) => {
  const result = await api.post(`/sales-orders/saleOrderCsv`, payload, { responseType: 'blob' });

  const file = new Blob(
    [await result.data],
    { type: 'text/csv' });

  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(file);
  link.download = "saleOrders.csv"
  link.click();
  return result.payload
}

const getSalesOrderReportPdfRequest = async (payload) => {
  const result = await api.post(`/sales-orders/AllSaleOrder/pdf`, payload, { responseType: 'blob' });

  const file = new Blob(
    [await result.data],
    { type: 'application/pdf' });

  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(file);
  link.download = "salesorderAll.pdf"
  link.click();
  return result.payload
}

const getBackOrderReportCsvRequest = async () => {
  console.log("in back csv")
  window.open(`${api.defaults.baseURL}/sales-orders/backOrder/csv`)
}

const getBackOrderReportPdfRequest = async () => {
  console.log("in back pdf")
  window.open(`${api.defaults.baseURL}/sales-orders/AllBackOrder/pdf`)
}

// const getPurchaseOrderReportCsvRequest = async () => {
//   console.log("in purchase csv")
//   window.open(`${api.defaults.baseURL}/purchase`)
// }

// const getPurchaseOrderReportPdfRequest = async () => {
//   console.log("in purchase pdf")
//   window.open(`${api.defaults.baseURL}/purchase/AllPurchaseOrder/pdf`)
// }

const getPurchaseOrderReportCsvRequest = async (payload) => {
  const result = await api.post(`/purchase/purchaseOrderCsv`, payload, { responseType: 'blob' });

  const file = new Blob(
    [await result.data],
    { type: 'text/csv' });

  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(file);
  link.download = "purchases.csv"
  link.click();
  return result.payload
}

const getPurchaseOrderReportPdfRequest = async (payload) => {
  const result = await api.post(`/purchase/AllPurchaseOrder/pdf`, payload, { responseType: 'blob' });

  const file = new Blob(
    [await result.data],
    { type: 'application/pdf' });

  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(file);
  link.download = "purchaseOrdersList.pdf"
  link.click();
  return result.payload
}

const getSalesReportCsvRequest = async (payload) => {
  const result = await api.post(`invoices/invoice-csv`, payload, { responseType: 'blob' });

  const file = new Blob(
    [await result.data],
    { type: 'text/csv' });

  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(file);
  link.download = "invoice.csv"
  link.click();
  return result.payload
}

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getGeneratingReportData({ payload }) {
  console.log("payload", payload);
  switch (payload.reportName) {
    case "General Ledger":
      try {
        yield call(getGeneralLedgerPdfRequest, payload)
        yield put(actions.getGeneratingReportSuccess())
      } catch (error) {
        yield put(actions.getGeneratingReportFailure(error))
      }
      break;

    case "GST Report":
      try {
        yield call(getGstReportPdfRequest, payload)
        yield put(actions.getGeneratingReportSuccess())
      } catch (error) {
        yield put(actions.getGeneratingReportFailure(error))
      }
      break;

    case "Stock Movement Report":
      try {
        yield call(getStockMovementReportCsvRequest, payload)
        yield put(actions.getGeneratingReportSuccess())
      } catch (error) {
        yield put(actions.getGeneratingReportFailure(error))
      }
      break;

    case "SalesOrderList CSV":
      try {
        yield call(getSalesOrderReportCsvRequest, payload)
        yield put(actions.getGeneratingReportSuccess())
      } catch (error) {
        yield put(actions.getGeneratingReportFailure(error))
      }
      break;

    case "SalesOrderList PDF":
      try {
        yield call(getSalesOrderReportPdfRequest, payload)
        yield put(actions.getGeneratingReportSuccess())
      } catch (error) {
        yield put(actions.getGeneratingReportFailure(error))
      }
      break;

    case "BackOrderList CSV":
      try {
        yield call(getBackOrderReportCsvRequest)
        yield put(actions.getGeneratingReportSuccess())
      } catch (error) {
        yield put(actions.getGeneratingReportFailure(error))
      }
      break;

    case "BackOrderList PDF":
      try {
        yield call(getBackOrderReportPdfRequest)
        yield put(actions.getGeneratingReportSuccess())
      } catch (error) {
        yield put(actions.getGeneratingReportFailure(error))
      }
      break;

    case "PurchaseOrderList CSV":
      try {
        yield call(getPurchaseOrderReportCsvRequest, payload)
        yield put(actions.getGeneratingReportSuccess())
      } catch (error) {
        yield put(actions.getGeneratingReportFailure(error))
      }
      break;

    case "PurchaseOrderList PDF":
      try {
        yield call(getPurchaseOrderReportPdfRequest, payload)
        yield put(actions.getGeneratingReportSuccess())
      } catch (error) {
        yield put(actions.getGeneratingReportFailure(error))
      }
      break;

    case "Journal Item Report CSV":
      try {
        yield call(getJournalItemReportCsvRequest, payload)
        yield put(actions.getGeneratingReportSuccess())
      } catch (error) {
        yield put(actions.getGeneratingReportFailure(error))
      }
      break;

    case "Account Journal Report CSV":
      try {
        yield call(getAccountJournalReportCsvRequest, payload)
        yield put(actions.getGeneratingReportSuccess())
      } catch (error) {
        yield put(actions.getGeneratingReportFailure(error))
      }
      break;

    case "Trial Balance Report CSV":
      try {
        yield call(getTrialBalanceReportCsvRequest, payload)
        yield put(actions.getGeneratingReportSuccess())
      } catch (error) {
        yield put(actions.getGeneratingReportFailure(error))
      }
      break;
    case "Profit and Loss CSV":
      try {
        yield call(getProfitAndLossReportCsvRequest, payload)
        yield put(actions.getGeneratingReportSuccess())
      } catch (error) {
        yield put(actions.getGeneratingReportFailure(error))
      }
      break;
    case "Balance Sheet CSV":
      try {
        yield call(getBalanceSheetCsvRequest, payload)
        yield put(actions.getGeneratingReportSuccess())
      } catch (error) {
        yield put(actions.getGeneratingReportFailure(error))
      }
      break;
    case "Sales Report CSV":
      try {
        yield call(getSalesReportCsvRequest, payload)
        yield put(actions.getGeneratingReportSuccess())
      } catch (error) {
        yield put(actions.getGeneratingReportFailure(error))
      }
      break;

    default:
      break;
  }


}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* getGeneratingReportWatcher() {
  yield takeEvery(types.GET_GENERATING_REPORT, getGeneratingReportData)
}


//=======================
// FORK SAGAS TO STORE
//=======================
export default function* GeneratingReportSaga() {
  yield all([
    fork(getGeneratingReportWatcher),
  ])
}
