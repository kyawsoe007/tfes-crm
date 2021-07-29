import * as types from "./DepositTypes";

// Get data of selected model
export const getDeposit = (e) => ({
  type: types.GET_PAYMENT_DEPOSIT,
  payload: e,
});

export const getDepositSuccess = (e) => ({
  type: types.GET_PAYMENT_DEPOSIT_SUCCESS,
  payload: e,
});

export const getDepositFailure = (e) => ({
  type: types.GET_PAYMENT_DEPOSIT_FAILURE,
  payload: e,
});


export const getFilterDepositRequest = (limit, skip, filter, searchText, orderBy) => ({
  type: types.GET_FILTER_PAYMENT_DEPOSIT,
  payload: { limit, skip, filter, searchText, orderBy },
});
export const getFilterDepositSuccess = (data) => ({
  type: types.GET_FILTER_PAYMENT_DEPOSIT_SUCCESS,
  payload: data,
});
export const getFilterDepositFailure = (error) => ({
  type: types.GET_FILTER_PAYMENT_DEPOSIT_FAILURE,
  payload: error,
});

//get single credit note
export const getSingleDepositRequest = (id) => ({
  type: types.GET_SINGLE_PAYMENT_DEPOSIT_REQUEST,
  payload: id,
});
export const getSingleDepositSuccess = (data) => ({
  type: types.GET_SINGLE_PAYMENT_DEPOSIT_REQUEST_SUCCESS,
  payload: data,
});
export const getSingleDepositFailure = (error) => ({
  type: types.GET_SINGLE_PAYMENT_DEPOSIT_REQUEST_FAILURE,
  payload: error,
});

//patch single credit note
export const patchSingleDeposit = (data) => ({
  type: types.PATCH_SINGLE_PAYMENT_DEPOSIT,
  payload: data,
});
export const patchSingleDepositSuccess = (data) => ({
  type: types.PATCH_SINGLE_PAYMENT_DEPOSIT_SUCCESS,
  payload: data,
});
export const patchSingleDepositFailure = (error) => ({
  type: types.PATCH_SINGLE_PAYMENT_DEPOSIT_FAILURE,
  payload: error,
});

//delete single credit note
export const deleteDeposit = (id) => ({
  type: types.DELETE_PAYMENT_DEPOSIT,
  payload: id,
});
export const deleteDepositSuccess = (data) => ({
  type: types.DELETE_PAYMENT_DEPOSIT_SUCCESS,
  payload: data,
});
export const deleteDepositFailure = (error) => ({
  type: types.DELETE_PAYMENT_DEPOSIT_FAILURE,
  payload: error,
});

// Get data of selected model
export const setDeposit = (data) => ({
  type: types.SET_PAYMENT_DEPOSIT,
  payload: data,
});

export const setDepositSuccess = (data) => ({
  type: types.SET_PAYMENT_DEPOSIT_SUCCESS,
  payload: data,
});

export const setDepositFailure = (data) => ({
  type: types.SET_PAYMENT_DEPOSIT_FAILURE,
  payload: data,
});


export const getDepositPdf = (data) => ({
  type: types.GET_PAYMENT_DEPOSIT_PDF,
  payload: data
});

export const getDepositPdfSuccess = () => ({
  type: types.GET_PAYMENT_DEPOSIT_PDF_SUCCESS,
  payload: {}
});

export const getDepositPdfFailure = (error) => ({
  type: types.GET_PAYMENT_DEPOSIT_PDF_FAILURE,
  payload: error
});

export const getSavedDepositQuery = (data) => ({
  type: types.GET_SAVED_DEPOSIT_QUERY,
  payload:data,
})

export const getSavedDepositQuerySuccess = (data) => ({
  type: types.GET_SAVED_DEPOSIT_QUERY_SUCCESS,
  payload: data,
})

export const getSavedDepositQueryFailure = (data) => ({
  type: types.GET_SAVED_DEPOSIT_QUERY_FAILURE,
  payload: data,
})
