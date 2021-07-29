import data from "@iconify/icons-ic/baseline-delete-forever";
import * as types from "./CustomertfesTypes";

// Get data of selected model

export const getCustomerTfesSuccess = (e) => ({
  type: types.GET_CUSTOMERTFES_SUCCESS,
  payload: e,
});

export const getCustomerTfesFailure = (e) => ({
  type: types.GET_CUSTOMERTFES_FAILURE,
  payload: e,
});

// Get data of selected model
export const setCustomerTfes = (data) => ({
  type: types.SET_CUSTOMERTFES,
  payload: data,
});

export const setCustomerTfesSuccess = (data) => ({
  type: types.SET_CUSTOMERTFES_SUCCESS,
  payload: data,
});

export const setCustomerTfesFailure = (error) => ({
  type: types.SET_CUSTOMERTFES_FAILURE,
  payload: error,
});

// Get data of selected model
export const getCustomerTfesDetails = () => ({
  type: types.GET_CUSTOMERTFES_DETAILS,
});

export const getCustomerTfesDetailsSuccess = (data) => ({
  type: types.GET_CUSTOMERTFES_DETAILS_SUCCESS,
  payload: data,
});

export const getCustomerTfesDetailsFailure = (error) => ({
  type: types.GET_CUSTOMERTFES_DETAILS_FAILURE,
  payload: error,
});

export const getFilterCustomerTfes = (
  limit,
  skip,
  filter,
  searchText,
  orderBy
) => ({
  type: types.GET_FILTER_CUSTOMERTFES,
  payload: { limit, skip, filter, searchText, orderBy },
});
export const getFilterCustomerTfesSuccess = (data) => ({
  type: types.GET_FILTER_CUSTOMERTFES_SUCCESS,
  payload: data,
});
export const getFilterCustomerTfesFailure = (error) => ({
  type: types.GET_FILTER_CUSTOMERTFES_FAILURE,
  payload: error,
});

// Delete sku details
export const deleteCustomerTfes = (id) => ({
  type: types.DELETE_CUSTOMERTFES,
  payload: id,
});

export const deleteCustomerTfesSuccess = (id) => ({
  type: types.DELETE_CUSTOMERTFES_SUCCESS,
  payload: id,
});

export const deleteCustomerTfesFailure = (error) => ({
  type: types.DELETE_CUSTOMERTFES_FAILURE,
  payload: error,
});

// DAVID Get Single customer by ID

export const getSingleCustomerRequest = (id) => ({
  type: types.GET_SINGLE_CUSTOMER_REQUEST,
  payload: id,
});
export const getSingleCustomerSuccess = (data) => ({
  type: types.GET_SINGLE_CUSTOMER_SUCCESS,
  payload: data,
});
export const getSingleCustomerFailure = (error) => ({
  type: types.GET_SINGLE_CUSTOMER_FAILURE,
  payload: error,
});

// DAVID Patch Single Customer by ID

export const patchSingleCustomerRequest = (data) => ({
  type: types.PATCH_SINGLE_CUSTOMER_REQUEST,
  payload: data,
});
export const patchSingleCustomerSuccess = (data) => ({
  type: types.PATCH_SINGLE_CUSTOMER_SUCCESS,
  payload: data,
});
export const patchSingleCustomerFailure = (error) => ({
  type: types.PATCH_SINGLE_CUSTOMER_FAILURE,
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

// Save Query
export const getSavedCustomerQuery = (data) => ({
  type: types.GET_SAVED_CUSTOMER_QUERY,
  payload:data,
})

export const getSavedCustomerQuerySuccess = (data) => ({
  type: types.GET_SAVED_CUSTOMER_QUERY_SUCCESS,
  payload: data,
})

export const getSavedCustomerQueryFailure = (data) => ({
  type: types.GET_SAVED_CUSTOMER_QUERY_FAILURE,
  payload: data,
})