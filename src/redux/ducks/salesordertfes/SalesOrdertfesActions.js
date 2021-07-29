import data from "@iconify/icons-ic/baseline-delete-forever";
// import { dataBind } from "jodit/src/core/helpers";
import * as types from "./SalesOrdertfesTypes";



// Convert to Sales order 
export const convertToSalesOrderRequest = (data) => ({
  type: types.CONVERT_TO_SALES_ORDER_REQUEST,
  payload: data,
});
export const convertToSalesOrderSuccess = (data) => ({
  type: types.CONVERT_TO_SALES_ORDER_SUCCESS,
  payload: data,
});
export const convertToSalesOrderFailure = (error) => ({
  type: types.CONVERT_TO_SALES_ORDER_FAILURE,
  payload: error,
});

// Get data of selected model
export const getSalesOrder = (e) => ({
  type: types.GET_SALES_ORDER,
  payload: e,
});

export const getSalesOrderSuccess = (e) => ({
  type: types.GET_SALES_ORDER_SUCCESS,
  payload: e,
});

export const getSalesOrderFailure = (e) => ({
  type: types.GET_SALES_ORDER_FAILURE,
  payload: e,
});

// Get data of selected model
export const setSalesOrder = (data) => ({
  type: types.SET_SALES_ORDER,
  payload: data,
});

export const setSalesOrderSuccess = (data) => ({
  type: types.SET_SALES_ORDER_SUCCESS,
  payload: data,
});

export const setSalesOrderFailure = (data) => ({
  type: types.SET_SALES_ORDER_FAILURE,
  payload: data,
});

// Get data of selected model
export const getSalesOrderDetails = () => ({
  type: types.GET_SALES_ORDER_DETAILS,
});

export const getSalesOrderDetailsSuccess = (data) => ({
  type: types.GET_SALES_ORDER_DETAILS_SUCCESS,
  payload: data,
});

export const getSalesOrderDetailsFailure = (data) => ({
  type: types.GET_SALES_ORDER_DETAILS_FAILURE,
  payload: data,
});

export const getFilterSalesOrderRequest = (limit, skip, filter, searchText, orderBy) => ({
  type: types.GET_FILTER_SALES_ORDER,
  payload: { limit, skip, filter, searchText, orderBy },
});
export const getFilterSalesOrderSuccess = (data) => ({
  type: types.GET_FILTER_SALES_ORDER_SUCCESS,
  payload: data,
});
export const getFilterSalesOrderFailure = (error) => ({
  type: types.GET_FILTER_SALES_ORDER_FAILURE,
  payload: error,
});

// david SalesOrder reset
export const getFilterSalesOrderAndSingleSkuReset = (data) => ({
  type: types.GET_FILTER_SALES_ORDER_AND_SINGLE_SKU_RESET,
  payload: data,
});

// DAVID Get Single Sku SalesOrder by ID

export const getSingleSkuSalesOrderRequest = (id) => ({
  type: types.GET_SINGLE_SKU_SALES_ORDER_REQUEST,
  payload: id,
});
export const getSingleSkuSalesOrderSuccess = (data) => ({
  type: types.GET_SINGLE_SKU_SALES_ORDER_SUCCESS,
  payload: data,
});
export const getSingleSkuSalesOrderFailure = (error) => ({
  type: types.GET_SINGLE_SKU_SALES_ORDER_FAILURE,
  payload: error,
});

// DAVID Patch Single Sku SalesOrder by ID

export const patchSingleSkuSalesOrderRequest = (data) => (console.log('========', data), {
  type: types.PATCH_SINGLE_SKU_SALES_ORDER_REQUEST,
  payload: data,
});
export const patchSingleSkuSalesOrderSuccess = (data) => (console.log('====patchSingleSkuSalesOrderSuccess====', data),{
  type: types.PATCH_SINGLE_SKU_SALES_ORDER_SUCCESS,
  payload: data,
});
export const patchSingleSkuSalesOrderFailure = (error) => (console.log('====patchSingleSkuSalesOrderFailure====', data),{
  type: types.PATCH_SINGLE_SKU_SALES_ORDER_FAILURE,
  payload: error,
});

// Delete sku details
export const deleteSalesOrder = (id) => ({
  type: types.DELETE_SALES_ORDER,
  payload: id,
});

export const deleteSalesOrderSuccess = (id) => ({
  type: types.DELETE_SALES_ORDER_SUCCESS,
  payload: id,
});

export const deleteSalesOrderFailure = (error) => ({
  type: types.DELETE_SALES_ORDER_FAILURE,
  payload: error,
});

//SET DUPLICATE
// Get data of selected model
export const setDuplicate = (data) => ({
  type: types.SET_DUPLICATE,
  payload: data,
});

export const setDuplicateSuccess = (data) => ({
  type: types.SET_DUPLICATE_SUCCESS,
  payload: data,
});

export const setDuplicateFailure = (data) => ({
  type: types.SET_DUPLICATE_FAILURE,
  payload: data,
});

//CLEAR
// Get data of selected model
export const clearDuplicate = (data) => ({
  type: types.CLEAR_DUPLICATE,
  payload: data,
});

export const clearDuplicateSuccess = (data) => ({
  type: types.CLEAR_DUPLICATE_SUCCESS,
  payload: data,
});

export const clearDuplicateFailure = (data) => ({
  type: types.CLEAR_DUPLICATE_FAILURE,
  payload: data,
});

// Set New Version
export const setNewVersionSalesOrderRequest = (data) => ({
  type: types.SET_NEW_VERSION_SALESORDER_REQUEST,
  payload: data,
})

export const setNewVersionSalesOrderSuccess = (data) => ({
  type: types.SET_NEW_VERSION_SALESORDER_SUCCESS,
  payload: data,
})

export const setNewVersionSalesOrderFailure = (data) => ({
  type: types.SET_NEW_VERSION_SALESORDER_FAILURE,
  payload: data,
})

// Get Pdf data 
export const getPdfCreate = (data) => ( {
  type: types.PDF_CREATE_SALES_ORDER,
  payload:data,
})

export const getPdfCreateSuccess = (data) => ({
  type: types.PDF_CREATE_SALES_ORDER_SUCCESS,
  payload: data,
})

export const getPdfCreateFailure = (data) => ({
  type: types.PDF_CREATE_SALES_ORDER_FAILURE,
  payload: data,
})


// patch internal remarks for single sales on dashboard 
export const patchSingleSalesRequestInternalRemarks = (data) => ({
  type: types.PATCH_SINGLE_SALES_REQUEST_INTERNAL_REMARKS,
  payload:data,
})
export const patchSingleSalesRequestInternalRemarksSuccess = (data) => ({
  type: types.PATCH_SINGLE_SALES_REQUEST_INTERNAL_REMARKS_SUCCESS,
  payload: data,
})
export const patchSingleSalesRequestInternalRemarksFailure = (data) => ({
  type: types.PATCH_SINGLE_SALES_REQUEST_INTERNAL_REMARKS_FAILURE,
  payload: data,
})


// SAVE QUERY FOR COMMERCIAL SALES ORDER
export const getSavedSalesQuery = (data) => ({
  type: types.GET_SAVED_SALES_QUERY,
  payload:data,
})

export const getSavedSalesQuerySuccess = (data) => ({
  type: types.GET_SAVED_SALES_QUERY_SUCCESS,
  payload: data,
})

export const getSavedSalesQueryFailure = (data) => ({
  type: types.GET_SAVED_SALES_QUERY_FAILURE,
  payload: data,
})

// SAVE QUERY FOR ACCOUNTING SALES ORDER
export const getSavedAcctSalesQuery = (data) => ({
  type: types.GET_SAVED_ACCT_SALES_QUERY,
  payload:data,
})

export const getSavedAcctSalesQuerySuccess = (data) => ({
  type: types.GET_SAVED_ACCT_SALES_QUERY_SUCCESS,
  payload: data,
})

export const getSavedAcctSalesQueryFailure = (data) => ({
  type: types.GET_SAVED_ACCT_SALES_QUERY_FAILURE,
  payload: data,
})

//GET PURCHASE TEMP LIST 
export const getPurchaseTempList = (id) => ({
  type: types.GET_PURCHASE_TEMP_LIST,
  payload: id
})

export const getPurchaseTempListSuccess = (data) => ({
  type: types.GET_PURCHASE_TEMP_LIST_SUCCESS,
  payload: data
})

export const getPurchaseTempListFailure = (error) => ({
  type: types.GET_PURCHASE_TEMP_LIST_FAILURE,
  payload: error
})

// POST PURCHASE TEMP LIST 
export const postPurchaseTempList = (data) => ({
  type: types.POST_PURCHASE_TEMP_LIST,
  payload: data
})

export const postPurchaseTempListSuccess = (data) => ({
  type: types.POST_PURCHASE_TEMP_LIST_SUCCESS,
  payload: data
})

export const postPurchaseTempListFailure = (error) => ({
  type: types.POST_PURCHASE_TEMP_LIST_FAILURE,
  payload: error
})

// Get Invoice Pdf data 
export const getProformaInvoicePdf = (data) => (
  console.log("getProformaInvoicePdf in action",data),
  {
  type: types.GET_SALESORDER_PROFORMA_INVOICE_PDF,
  payload: data
});

export const getProformaInvoicePdfSuccess = (data) => (
  console.log("getProformaInvoicePdfSuccess in action",data),
  {
  type: types.GET_SALESORDER_PROFORMA_INVOICE_PDF_SUCCESS,
  payload: {}
});

export const getProformaInvoicePdfFailure = (error) => (
  console.log("getProformaInvoicePdfFailure in action",data),
  {
  type: types.GET_SALESORDER_PROFORMA_INVOICE_PDF_FAILURE,
  payload: error
});
export const getCommercialInvoicePdf = (data) => (
  console.log("getCommercialInvoicePdf in action",data),
  {
  type: types.GET_SALESORDER_COMMERCIAL_INVOICE_PDF,
  payload: data
});

export const getCommercialInvoicePdfSuccess = (data) => ({
  type: types.GET_SALESORDER_COMMERCIAL_INVOICE_PDF_SUCCESS,
  payload: {}
});

export const getCommercialInvoicePdfFailure = (error) => ({
  type: types.GET_SALESORDER_COMMERCIAL_INVOICE_PDF_FAILURE,
  payload: error
});
