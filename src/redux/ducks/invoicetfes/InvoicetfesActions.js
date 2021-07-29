import * as types from "./InvoicetfesTypes";

// Get data of selected model
export const getInvoice = (e) => ({
  type: types.GET_INVOICE,
  payload: e,
});

export const getInvoiceSuccess = (e) => ({
  type: types.GET_INVOICE_SUCCESS,
  payload: e,
});

export const getInvoiceFailure = (e) => ({
  type: types.GET_INVOICE_FAILURE,
  payload: e,
});

// Get data for drop down group
export const getDropdownGroup = () => ({
  type: types.GET_DROPDOWN_GROUP
});

export const getDropdownGroupSuccess = (data) => ({
  type: types.GET_DROPDOWN_GROUP_SUCCESS,
  payload: data,
});

export const getDropdownGroupFailure = (e) => ({
  type: types.GET_DROPDOWN_GROUP_FAILURE,
  payload: e,
});

export const getFilterInvoiceRequest = (limit, skip, filter, searchText, orderBy) => ({
  type: types.GET_FILTER_INVOICE,
  payload: { limit, skip, filter, searchText, orderBy },
});
export const getFilterInvoiceSuccess = (data) => ({
  type: types.GET_FILTER_INVOICE_SUCCESS,
  payload: data,
});
export const getFilterInvoiceFailure = (error) => ({
  type: types.GET_FILTER_INVOICE_FAILURE,
  payload: error,
});

//get single invoice
export const getSingleInvoiceRequest = (id) => ({
  type: types.GET_SINGLE_INVOICE_REQUEST,
  payload: id,
});
export const getSingleInvoiceSuccess = (data) => ({
  type: types.GET_SINGLE_INVOICE_REQUEST_SUCCESS,
  payload: data,
});
export const getSingleInvoiceFailure = (error) => ({
  type: types.GET_SINGLE_INVOICE_REQUEST_FAILURE,
  payload: error,
});

//patch single invoice
export const patchSingleInvoice = (data) => ({
  type: types.PATCH_SINGLE_INVOICE,
  payload: data,
});
export const patchSingleInvoiceSuccess = (data) => ({
  type: types.PATCH_SINGLE_INVOICE_SUCCESS,
  payload: data,
});
export const patchSingleInvoiceFailure = (error) => ({
  type: types.PATCH_SINGLE_INVOICE_FAILURE,
  payload: error,
});

//delete single invoice
export const deleteInvoice = (id) => ({
  type: types.DELETE_INVOICE,
  payload: id,
});
export const deleteInvoiceSuccess = (data) => ({
  type: types.DELETE_INVOICE_SUCCESS,
  payload: data,
});
export const deleteInvoiceFailure = (error) => ({
  type: types.DELETE_INVOICE_FAILURE,
  payload: error,
});

// Get data of selected model
export const setInvoice = (data) => ({
  type: types.SET_INVOICE,
  payload: data,
});

export const setInvoiceSuccess = (data) => ({
  type: types.SET_INVOICE_SUCCESS,
  payload: data,
});

export const setInvoiceFailure = (data) => ({
  type: types.SET_INVOICE_FAILURE,
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

// 
export const getTaxInvoicePdf = (data) => ({
  type: types.GET_TAX_INVOICE_PDF,
  payload: data,
});

export const getTaxInvoicePdfSuccess = () => ({
  type: types.GET_TAX_INVOICE_PDF_SUCCESS,
  payload: {}
});

export const getTaxInvoicePdfFailure = (error) => ({
  type: types.GET_TAX_INVOICE_PDF_FAILURE,
  payload: error
});

// 

export const getProformaInvoicePdf = (data) => ({
  type: types.GET_PROFORMA_INVOICE_PDF,
  payload: data,
});

export const getProformaInvoicePdfSuccess = () => ({
  type: types.GET_PROFORMA_INVOICE_PDF_SUCCESS,
  payload: {}
});

export const getProformaInvoicePdfFailure = (error) => ({
  type: types.GET_PROFORMA_INVOICE_PDF_FAILURE,
  payload: error
});

//
export const getCommercialInvoicePdf = (data) => ({
  type: types.GET_COMMERCIAL_INVOICE_PDF,
  payload: data
});

export const getCommercialInvoicePdfSuccess = () => ({
  type: types.GET_COMMERCIAL_INVOICE_PDF_SUCCESS,
  payload: {}
});

export const getCommercialInvoicePdfFailure = (error) => ({
  type: types.GET_COMMERCIAL_INVOICE_PDF_FAILURE,
  payload: error
});

// SAVE QUERY 
export const getSavedInvoiceQuery = (data) => ({
  type: types.GET_SAVED_INVOICE_QUERY,
  payload:data,
})

export const getSavedInvoiceQuerySuccess = (data) => ({
  type: types.GET_SAVED_INVOICE_QUERY_SUCCESS,
  payload: data,
})

export const getSavedInvoiceQueryFailure = (data) => ({
  type: types.GET_SAVED_INVOICE_QUERY_FAILURE,
  payload: data,
})

