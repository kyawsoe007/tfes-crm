import * as types from "./SupplierInvoiceTypes";

// Get data of selected model
export const getSupplierInvoice = (e) => ({
  type: types.GET_SUPPLIER_INVOICE,
  payload: e,
});

export const getSupplierInvoiceSuccess = (e) => ({
  type: types.GET_SUPPLIER_INVOICE_SUCCESS,
  payload: e,
});

export const getSupplierInvoiceFailure = (e) => ({
  type: types.GET_SUPPLIER_INVOICE_FAILURE,
  payload: e,
});

export const getFilterSupplierInvoiceRequest = (limit, skip, filter, searchText, orderBy) => ({
  type: types.GET_FILTER_SUPPLIER_INVOICE,
  payload: { limit, skip, filter, searchText, orderBy },
});
export const getFilterSupplierInvoiceSuccess = (data) => ({
  type: types.GET_FILTER_SUPPLIER_INVOICE_SUCCESS,
  payload: data,
});
export const getFilterSupplierInvoiceFailure = (error) => ({
  type: types.GET_FILTER_SUPPLIER_INVOICE_FAILURE,
  payload: error,
});

//get single invoice
export const getSingleSupplierInvoiceRequest = (id) => ({
  type: types.GET_SINGLE_SUPPLIER_INVOICE_REQUEST,
  payload: id,
});
export const getSingleSupplierInvoiceSuccess = (data) => ({
  type: types.GET_SINGLE_SUPPLIER_INVOICE_REQUEST_SUCCESS,
  payload: data,
});
export const getSingleSupplierInvoiceFailure = (error) => ({
  type: types.GET_SINGLE_SUPPLIER_INVOICE_REQUEST_FAILURE,
  payload: error,
});

//patch single invoice
export const patchSingleSupplierInvoice = (data) => ({
  type: types.PATCH_SINGLE_SUPPLIER_INVOICE,
  payload: data,
});
export const patchSingleSupplierInvoiceSuccess = (data) => ({
  type: types.PATCH_SINGLE_SUPPLIER_INVOICE_SUCCESS,
  payload: data,
});
export const patchSingleSupplierInvoiceFailure = (error) => ({
  type: types.PATCH_SINGLE_SUPPLIER_INVOICE_FAILURE,
  payload: error,
});

//delete single invoice
export const deleteSupplierInvoice = (id) => ({
  type: types.DELETE_SUPPLIER_INVOICE,
  payload: id,
});
export const deleteSupplierInvoiceSuccess = (data) => ({
  type: types.DELETE_SUPPLIER_INVOICE_SUCCESS,
  payload: data,
});
export const deleteSupplierInvoiceFailure = (error) => ({
  type: types.DELETE_SUPPLIER_INVOICE_FAILURE,
  payload: error,
});

// Get data of selected model
export const setSupplierInvoice = (data) => ({
  type: types.SET_SUPPLIER_INVOICE,
  payload: data,
});

export const setSupplierInvoiceSuccess = (data) => ({
  type: types.SET_SUPPLIER_INVOICE_SUCCESS,
  payload: data,
});

export const setSupplierInvoiceFailure = (data) => ({
  type: types.SET_SUPPLIER_INVOICE_FAILURE,
  payload: data,
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

// SAVE QUERY 
export const getSavedSupplierInvoiceQuery = (data) => ({
  type: types.GET_SAVED_SUPPLIER_INVOICE_QUERY,
  payload:data,
})

export const getSavedSupplierInvoiceQuerySuccess = (data) => ({
  type: types.GET_SAVED_SUPPLIER_INVOICE_QUERY_SUCCESS,
  payload: data,
})

export const getSavedSupplierInvoiceQueryFailure = (data) => ({
  type: types.GET_SAVED_SUPPLIER_INVOICE_QUERY_FAILURE,
  payload: data,
})