import data from "@iconify/icons-ic/baseline-delete-forever";
import * as types from "./PurchasetfesTypes";

// Get data of selected model
export const getPurchase = (e) => ({
  type: types.GET_PURCHASE,
  payload: e,
});

export const getPurchaseSuccess = (e) => ({
  type: types.GET_PURCHASE_SUCCESS,
  payload: e,
});

export const getPurchaseFailure = (e) => ({
  type: types.GET_PURCHASE_FAILURE,
  payload: e,
});

// Get data of selected model
export const setPurchase = (data) => ({
  type: types.SET_PURCHASE,
  payload: data,
});

export const setPurchaseSuccess = (data) => ({
  type: types.SET_PURCHASE_SUCCESS,
  payload: data,
});

export const setPurchaseFailure = (data) => ({
  type: types.SET_PURCHASE_FAILURE,
  payload: data,
});

// Get data of selected model
export const getPurchaseDetails = () => ({
  type: types.GET_PURCHASE_DETAILS,
});

export const getPurchaseDetailsSuccess = (data) => ({
  type: types.GET_PURCHASE_DETAILS_SUCCESS,
  payload: data,
});

export const getPurchaseDetailsFailure = (data) => ({
  type: types.GET_PURCHASE_DETAILS_FAILURE,
  payload: data,
});

// GET FILTERED DEETS
export const getFilterPurchase = (
  limit,
  skip,
  filter,
  searchText,
  orderBy
) => ({
  type: types.GET_FILTER_PURCHASE,
  payload: { limit, skip, filter, searchText, orderBy },
});
export const getFilterPurchaseSuccess = (data) => ({
  type: types.GET_FILTER_PURCHASE_SUCCESS,
  payload: data,
});
export const getFilterPurchaseFailure = (error) => ({
  type: types.GET_FILTER_PURCHASE_FAILURE,
  payload: error,
});

// Delete sku details
export const deletePurchase = (id) => ({
  type: types.DELETE_PURCHASE,
  payload: id,
});

export const deletePurchaseSuccess = (id) => ({
  type: types.DELETE_PURCHASE_SUCCESS,
  payload: id,
});

export const deletePurchaseFailure = (error) => ({
  type: types.DELETE_PURCHASE_FAILURE,
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
// DAVID Get Single Purchase by ID

export const getSinglePurchaseRequest = (id) => ({
  type: types.GET_SINGLE_PURCHASE_REQUEST,
  payload: id,
});
export const getSinglePurchaseSuccess = (data) => ({
  type: types.GET_SINGLE_PURCHASE_SUCCESS,
  payload: data,
});
export const getSinglePurchaseFailure = (error) => ({
  type: types.GET_SINGLE_PURCHASE_FAILURE,
  payload: error,
});

// DAVID Patch Single Purchase by ID

export const patchSinglePurchaseRequest = (data) => ({
  type: types.PATCH_SINGLE_PURCHASE_REQUEST,
  payload: data,
});
export const patchSinglePurchaseSuccess = (data) => ({
  type: types.PATCH_SINGLE_PURCHASE_SUCCESS,
  payload: data,
});
export const patchSinglePurchaseFailure = (error) => ({
  type: types.PATCH_SINGLE_PURCHASE_FAILURE,
  payload: error,
});

// CLEAR DUPLICATE
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

  // Get Pdf data 
export const getPdfCreate = (data) => ({
  type: types.PDF_CREATE_PURCHASE_ORDER,
  payload:data,
})
export const getPdfCreateSuccess = (data) => ({
  type: types.PDF_CREATE_PURCHASE_ORDER_SUCCESS,
  payload: data,
})
export const getPdfCreateFailure = (data) => ({
  type: types.PDF_CREATE_PURCHASE_ORDER_FAILURE,
  payload: data,
})

// patch internal remarks for single purchase on dashboard 
export const patchSinglePurchaseRequestInternalRemarks = (data) => ({
  type: types.PATCH_SINGLE_PURCHASE_REQUEST_INTERNAL_REMARKS,
  payload:data,
})
export const patchSinglePurchaseRequestInternalRemarksSuccess = (data) => ({
  type: types.PATCH_SINGLE_PURCHASE_REQUEST_INTERNAL_REMARKS_SUCCESS,
  payload: data,
})
export const patchSinglePurchaseRequestInternalRemarksFailure = (data) => ({
  type: types.PATCH_SINGLE_PURCHASE_REQUEST_INTERNAL_REMARKS_FAILURE,
  payload: data,
})

export const getSavedPurchaseQuery = (data) => ({
  type: types.GET_SAVED_PURCHASE_QUERY,
  payload:data,
})

export const getSavedPurchaseQuerySuccess = (data) => ({
  type: types.GET_SAVED_PURCHASE_QUERY_SUCCESS,
  payload: data,
})

export const getSavedPurchaseQueryFailure = (data) => ({
  type: types.GET_SAVED_PURCHASE_QUERY_FAILURE,
  payload: data,
})

