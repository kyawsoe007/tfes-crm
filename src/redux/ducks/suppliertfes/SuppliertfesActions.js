import data from "@iconify/icons-ic/baseline-delete-forever";
import * as types from "./SuppliertfesTypes";

// Get data of selected model
export const getSupplier = (e) => ({
  type: types.GET_SUPPLIER,
  payload: e,
});

export const getSupplierSuccess = (e) => ({
  type: types.GET_SUPPLIER_SUCCESS,
  payload: e,
});

export const getSupplierFailure = (e) => ({
  type: types.GET_SUPPLIER_FAILURE,
  payload: e,
});

// Get data of selected model
export const setSupplier = (data) => ({
  type: types.SET_SUPPLIER,
  payload: data,
});

export const setSupplierSuccess = (data) => ({
  type: types.SET_SUPPLIER_SUCCESS,
  payload: data,
});

export const setSupplierFailure = (data) => ({
  type: types.SET_SUPPLIER_FAILURE,
  payload: data,
});

// Get data of selected model
export const getSupplierDetails = () => ({
  type: types.GET_SUPPLIER_DETAILS,
});

export const getSupplierDetailsSuccess = (data) => ({
  type: types.GET_SUPPLIER_DETAILS_SUCCESS,
  payload: data,
});

export const getSupplierDetailsFailure = (data) => ({
  type: types.GET_SUPPLIER_DETAILS_FAILURE,
  payload: data,
});

export const getFilterSupplier = (
  limit,
  skip,
  filter,
  searchText,
  orderBy
) => ({
  type: types.GET_FILTER_SUPPLIER,
  payload: { limit, skip, filter, searchText, orderBy },
});
export const getFilterSupplierSuccess = (data) => ({
  type: types.GET_FILTER_SUPPLIER_SUCCESS,
  payload: data,
});
export const getFilterSupplierFailure = (error) => ({
  type: types.GET_FILTER_SUPPLIER_FAILURE,
  payload: error,
});

// Delete sku details
export const deleteSupplier = (id) => ({
  type: types.DELETE_SUPPLIER,
  payload: id,
});

export const deleteSupplierSuccess = (id) => ({
  type: types.DELETE_SUPPLIER_SUCCESS,
  payload: id,
});

export const deleteSupplierFailure = (error) => ({
  type: types.DELETE_SUPPLIER_FAILURE,
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
// DAVID Get Single Supplier by ID

export const getSingleSupplierRequest = (id) => ({
  type: types.GET_SINGLE_SUPPLIER_REQUEST,
  payload: id,
});
export const getSingleSupplierSuccess = (data) => ({
  type: types.GET_SINGLE_SUPPLIER_SUCCESS,
  payload: data,
});
export const getSingleSupplierFailure = (error) => ({
  type: types.GET_SINGLE_SUPPLIER_FAILURE,
  payload: error,
});

// DAVID Patch Single Supplier by

export const patchSingleSupplierRequest = (data) => ({
  type: types.PATCH_SINGLE_SUPPLIER_REQUEST,
  payload: data,
});
export const patchSingleSupplierSuccess = (data) => ({
  type: types.PATCH_SINGLE_SUPPLIER_SUCCESS,
  payload: data,
});
export const patchSingleSupplierFailure = (error) => ({
  type: types.PATCH_SINGLE_SUPPLIER_FAILURE,
  payload: error,
});

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
export const getSavedSupplierMainQuery = (data) => ({
  type: types.GET_SAVED_SUPPLIER_MAIN_QUERY,
  payload:data,
})

export const getSavedSupplierMainQuerySuccess = (data) => ({
  type: types.GET_SAVED_SUPPLIER_MAIN_QUERY_SUCCESS,
  payload: data,
})

export const getSavedSupplierMainQueryFailure = (data) => ({
  type: types.GET_SAVED_SUPPLIER_MAIN_QUERY_FAILURE,
  payload: data,
})