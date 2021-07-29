import data from '@iconify/icons-ic/baseline-delete-forever'
import * as types from './QuotationtfesTypes'

// Set quotation
export const setQuotation = (data) => ({
  type: types.SET_QUOTATION,
  payload: data,
})

export const setQuotationSuccess = (data) => ({
  type: types.SET_QUOTATION_SUCCESS,
  payload: data,
})

export const setQuotationFailure = (data) => ({
  type: types.SET_QUOTATION_FAILURE,
  payload: data,
})

// Get data of selected model
export const getQuotationDetails = () => ({
  type: types.GET_QUOTATION_DETAILS,
})

export const getQuotationDetailsSuccess = (data) => ({
  type: types.GET_QUOTATION_DETAILS_SUCCESS,
  payload: data,
})

export const getQuotationDetailsFailure = (data) => ({
  type: types.GET_QUOTATION_DETAILS_FAILURE,
  payload: data,
})

// get All Quotation + Filtered
export const getFilterQuotationRequest = (
  limit,
  skip,
  filter,
  searchText,
  orderBy,
) => ({
  type: types.GET_FILTER_QUOTATION_REQUEST,
  payload: { limit, skip, filter, searchText, orderBy },
})
export const getFilterQuotationSuccess = (data) => ({
  type: types.GET_FILTER_QUOTATION_SUCCESS,
  payload: data,
})
export const getFilterQuotationFailure = (error) => ({
  type: types.GET_FILTER_QUOTATION_FAILURE,
  payload: error,
})

// david Quotation reset
export const getFilterQuotationAndSingleSkuReset = (data) => ({
  type: types.GET_FILTER_QUOTATION_AND_SINGLE_SKU_RESET,
  payload: data,
})

// DAVID Get Single Sku Quotation by ID

export const getSingleSkuQuotationRequest = (id) => ({
  type: types.GET_SINGLE_SKU_QUOTATION_REQUEST,
  payload: id,
})
export const getSingleSkuQuotationSuccess = (data) => ({
  type: types.GET_SINGLE_SKU_QUOTATION_SUCCESS,
  payload: data,
})
export const getSingleSkuQuotationFailure = (error) => ({
  type: types.GET_SINGLE_SKU_QUOTATION_FAILURE,
  payload: error,
})

// DAVID Patch Single Sku Quotation by ID

export const patchSingleSkuQuotationRequest = (data) => ({
  type: types.PATCH_SINGLE_SKU_QUOTATION_REQUEST,
  payload: data,
})
export const patchSingleSkuQuotationSuccess = (data) => ({
  type: types.PATCH_SINGLE_SKU_QUOTATION_SUCCESS,
  payload: data,
})
export const patchSingleSkuQuotationFailure = (error) => ({
  type: types.PATCH_SINGLE_SKU_QUOTATION_FAILURE,
  payload: error,
})

// Delete sku details
export const deleteQuotation = (id) => ({
  type: types.DELETE_QUOTATION,
  payload: id,
})

export const deleteQuotationSuccess = (id) => ({
  type: types.DELETE_QUOTATION_SUCCESS,
  payload: id,
})

export const deleteQuotationFailure = (error) => ({
  type: types.DELETE_QUOTATION_FAILURE,
  payload: error,
})

//SET DUPLICATE
// Get data of selected model
export const setDuplicate = (data) => ({
  type: types.SET_DUPLICATE,
  payload: data,
})

export const setDuplicateSuccess = (data) => ({
  type: types.SET_DUPLICATE_SUCCESS,
  payload: data,
})

export const setDuplicateFailure = (data) => ({
  type: types.SET_DUPLICATE_FAILURE,
  payload: data,
})

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

// Set New Version
export const setNewVersionRequest = (data) => ({
  type: types.SET_NEW_VERSION_REQUEST,
  payload: data,
})

export const setNewVersionSuccess = (data) => ({
  type: types.SET_NEW_VERSION_SUCCESS,
  payload: data,
})

export const setNewVersionFailure = (data) => ({
  type: types.SET_NEW_VERSION_FAILURE,
  payload: data,
})

export const getPdfCreate = (data) => ({
  type: types.PDF_CREATE_QUOTATION_ORDER,
  payload:data,
})

export const getPdfCreateSuccess = (data) => ({
  type: types.PDF_CREATE_QUOTATION_ORDER_SUCCESS,
  payload: data,
})

export const getPdfCreateFailure = (data) => ({
  type: types.PDF_CREATE_QUOTATION_ORDER_FAILURE,
  payload: data,
})

export const getSavedQuotationQuery = (data) => ({
  type: types.GET_SAVED_QUOTATION_QUERY,
  payload:data,
})

export const getSavedQuotationQuerySuccess = (data) => ({
  type: types.GET_SAVED_QUOTATION_QUERY_SUCCESS,
  payload: data,
})

export const getSavedQuotationQueryFailure = (data) => ({
  type: types.GET_SAVED_QUOTATION_QUERY_FAILURE,
  payload: data,
})