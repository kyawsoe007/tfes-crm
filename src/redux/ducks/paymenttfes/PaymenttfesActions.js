import * as types from "./PaymenttfesTypes";

//get filtered payments
export const getFilterPaymentRequest = (limit, skip, filter, searchText, orderBy) => ({
  type: types.GET_FILTER_PAYMENT_REQUEST,
  payload: { limit, skip, filter, searchText, orderBy },
});
export const getFilterPaymentRequestSuccess = (data) => ({
  type: types.GET_FILTER_PAYMENT_REQUEST_SUCCESS,
  payload: data,
});
export const getFilterPaymentRequestFailure = (error) => ({
  type: types.GET_FILTER_PAYMENT_REQUEST_FAILURE,
  payload: error,
});

//get single payment
export const getSinglePaymentRequest = (id) => ({
  type: types.GET_SINGLE_PAYMENT_REQUEST,
  payload: id,
});
export const getSinglePaymentRequestSuccess = (data) => ({
  type: types.GET_SINGLE_PAYMENT_REQUEST_SUCCESS,
  payload: data,
});
export const getSinglePaymentRequestFailure = (error) => ({
  type: types.GET_SINGLE_PAYMENT_REQUEST_FAILURE,
  payload: error,
});

//getPaymentMethods
export const getPaymentMethods = () => ({
  type: types.GET_PAYMENT_METHOD
});
export const getPaymentMethodsSuccess = (data) => ({
  type: types.GET_PAYMENT_METHOD_SUCCESS,
  payload: data,
});
export const getPaymentMethodsFailure = (error) => ({
  type: types.GET_PAYMENT_METHOD_FAILURE,
  payload: error,
});

//patch single payment
export const patchSinglePayment = (data) => ({
  type: types.PATCH_SINGLE_PAYMENT,
  payload: data,
});
export const patchSinglePaymentSuccess = (data) => ({
  type: types.PATCH_SINGLE_PAYMENT_SUCCESS,
  payload: data,
});
export const patchSinglePaymentFailure = (error) => ({
  type: types.PATCH_SINGLE_PAYMENT_FAILURE,
  payload: error,
});

//delete single payment
export const deletePayment = (id) => ({
  type: types.DELETE_PAYMENT,
  payload: id,
});
export const deletePaymentSuccess = (data) => ({
  type: types.DELETE_PAYMENT_SUCCESS,
  payload: data,
});
export const deletePaymentFailure = (error) => ({
  type: types.DELETE_PAYMENT_FAILURE,
  payload: error,
});

// Get data of selected customer outstanding invoices
export const getOutstandingInvoices = (id) => ({
  type: types.GET_OUTSTANDING_INVOICES,
  payload: id,
});

export const getOutstandingInvoicesSuccess = (data) => ({
  type: types.GET_OUTSTANDING_INVOICES_SUCCESS,
  payload: data,
});

export const getOutstandingInvoicesFailure = (error) => ({
  type: types.GET_OUTSTANDING_INVOICES_FAILURE,
  payload: error,
});

export const setPayment = (data) => ({
  type: types.SET_PAYMENT,
  payload: data,
});

export const setPaymentSuccess = (data) => ({
  type: types.SET_PAYMENT_SUCCESS,
  payload: data,
});

export const setPaymentFailure = (error) => ({
  type: types.SET_PAYMENT_FAILURE,
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
export const getSavedPaymentQuery = (data) => ({
  type: types.GET_SAVED_PAYMENT_QUERY,
  payload:data,
})

export const getSavedPaymentQuerySuccess = (data) => ({
  type: types.GET_SAVED_PAYMENT_QUERY_SUCCESS,
  payload: data,
})

export const getSavedPaymentQueryFailure = (data) => ({
  type: types.GET_SAVED_PAYMENT_QUERY_FAILURE,
  payload: data,
})