import * as types from "./SupplierPaymentTypes";

//get filtered payments
export const getFilterSupplierPaymentRequest = (limit, skip, filter, searchText, orderBy) => ({
  type: types.GET_FILTER_SUPPLIER_PAYMENT_REQUEST,
  payload: { limit, skip, filter, searchText, orderBy },
});
export const getFilterSupplierPaymentRequestSuccess = (data) => ({
  type: types.GET_FILTER_SUPPLIER_PAYMENT_REQUEST_SUCCESS,
  payload: data,
});
export const getFilterSupplierPaymentRequestFailure = (error) => ({
  type: types.GET_FILTER_SUPPLIER_PAYMENT_REQUEST_FAILURE,
  payload: error,
});

//get single payment
export const getSingleSupplierPaymentRequest = (id) => ({
  type: types.GET_SINGLE_SUPPLIER_PAYMENT_REQUEST,
  payload: id,
});
export const getSingleSupplierPaymentRequestSuccess = (data) => ({
  type: types.GET_SINGLE_SUPPLIER_PAYMENT_REQUEST_SUCCESS,
  payload: data,
});
export const getSingleSupplierPaymentRequestFailure = (error) => ({
  type: types.GET_SINGLE_SUPPLIER_PAYMENT_REQUEST_FAILURE,
  payload: error,
});

//patch single payment
export const patchSingleSupplierPayment = (data) => ({
  type: types.PATCH_SINGLE_SUPPLIER_PAYMENT,
  payload: data,
});
export const patchSingleSupplierPaymentSuccess = (data) => ({
  type: types.PATCH_SINGLE_SUPPLIER_PAYMENT_SUCCESS,
  payload: data,
});
export const patchSingleSupplierPaymentFailure = (error) => ({
  type: types.PATCH_SINGLE_SUPPLIER_PAYMENT_FAILURE,
  payload: error,
});

//delete single payment
export const deleteSupplierPayment = (id) => ({
  type: types.DELETE_SUPPLIER_PAYMENT,
  payload: id,
});
export const deleteSupplierPaymentSuccess = (data) => ({
  type: types.DELETE_SUPPLIER_PAYMENT_SUCCESS,
  payload: data,
});
export const deleteSupplierPaymentFailure = (error) => ({
  type: types.DELETE_SUPPLIER_PAYMENT_FAILURE,
  payload: error,
});

// Get data of selected customer outstanding invoices
export const getOutstandingSupplierInvoices = (id) => ({
  type: types.GET_OUTSTANDING_SUPPLIER_INVOICES,
  payload: id,
});

export const getOutstandingSupplierInvoicesSuccess = (data) => ({
  type: types.GET_OUTSTANDING_SUPPLIER_INVOICES_SUCCESS,
  payload: data,
});

export const getOutstandingSupplierInvoicesFailure = (error) => ({
  type: types.GET_OUTSTANDING_SUPPLIER_INVOICES_FAILURE,
  payload: error,
});

export const setSupplierPayment = (data) => ({
  type: types.SET_SUPPLIER_PAYMENT,
  payload: data,
});

export const setSupplierPaymentSuccess = (data) => ({
  type: types.SET_SUPPLIER_PAYMENT_SUCCESS,
  payload: data,
});

export const setSupplierPaymentFailure = (error) => ({
  type: types.SET_SUPPLIER_PAYMENT_FAILURE,
  payload: error,
});

// CLEAR data loaded from previous form
export const clearDuplicate = (data) => ({
  type: types.CLEAR_DUPLICATE,
  payload: data,
})

export const clearDuplicateSuccess = (data) => ({
  type: types.CLEAR_DUPLICATE_SUCCESS,
  payload: data,
})

export const clearDuplicateFailure = (data) => ({
  type: types.CLEAR_DUPLICATE_FAILURE,
  payload: data,
})

// SAVE QUERY 
export const getSavedSupplierPaymentQuery = (data) => ({
  type: types.GET_SAVED_SUPPLIER_PAYMENT_QUERY,
  payload:data,
})

export const getSavedSupplierPaymentQuerySuccess = (data) => ({
  type: types.GET_SAVED_SUPPLIER_PAYMENT_QUERY_SUCCESS,
  payload: data,
})

export const getSavedSupplierPaymentQueryFailure = (data) => ({
  type: types.GET_SAVED_SUPPLIER_PAYMENT_QUERY_FAILURE,
  payload: data,
})
