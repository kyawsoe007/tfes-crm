import data from "@iconify/icons-ic/baseline-delete-forever";
import * as types from "./ProducttfesTypes";

// Get data of selected model
export const getProduct = (e) => ({
  type: types.GET_PRODUCT,
  payload: e,
});

export const getProductSuccess = (e) => ({
  type: types.GET_PRODUCT_SUCCESS,
  payload: e,
});

export const getProductFailure = (e) => ({
  type: types.GET_PRODUCT_FAILURE,
  payload: e,
});

// Get data of selected model
export const setProduct = (data) => ({
  type: types.SET_PRODUCT,
  payload: data,
});

export const setProductSuccess = (data) => ({
  type: types.SET_PRODUCT_SUCCESS,
  payload: data,
});

export const setProductFailure = (data) => ({
  type: types.SET_PRODUCT_FAILURE,
  payload: data,
});

// Get data of selected model
export const getProductDetails = () => ({
  type: types.GET_PRODUCT_DETAILS,
});

export const getProductDetailsSuccess = (data) => ({
  type: types.GET_PRODUCT_DETAILS_SUCCESS,
  payload: data,
});

export const getProductDetailsFailure = (data) => ({
  type: types.GET_PRODUCT_DETAILS_FAILURE,
  payload: data,
});

export const getFilterProduct = (limit, skip, filter, searchText, orderBy, columns) => ({
  type: types.GET_FILTER_PRODUCT,
  payload: { limit, skip, filter, searchText, orderBy, columns },
});
export const getFilterProductSuccess = (data) => ({
  type: types.GET_FILTER_PRODUCT_SUCCESS,
  payload: data,
});
export const getFilterProductFailure = (error) => ({
  type: types.GET_FILTER_PRODUCT_FAILURE,
  payload: error,
});

// david Product reset
export const getFilterProductAndSingleSkuReset = (data) => ({
  type: types.GET_FILTER_PRODUCT_AND_SINGLE_SKU_RESET,
  payload: data,
});

// DAVID Get Single Sku Product by ID

export const getSingleSkuProductRequest = (id) => ({
  type: types.GET_SINGLE_SKU_PRODUCT_REQUEST,
  payload: id,
});
export const getSingleSkuProductSuccess = (data) => ({
  type: types.GET_SINGLE_SKU_PRODUCT_SUCCESS,
  payload: data,
});
export const getSingleSkuProductFailure = (error) => ({
  type: types.GET_SINGLE_SKU_PRODUCT_FAILURE,
  payload: error,
});

// DAVID Patch Single Sku Product by ID

export const patchSingleSkuProductRequest = (data) => ({
  type: types.PATCH_SINGLE_SKU_PRODUCT_REQUEST,
  payload: data,
});
export const patchSingleSkuProductSuccess = (data) => ({
  type: types.PATCH_SINGLE_SKU_PRODUCT_SUCCESS,
  payload: data,
});
export const patchSingleSkuProductFailure = (error) => ({
  type: types.PATCH_SINGLE_SKU_PRODUCT_FAILURE,
  payload: error,
});

// Delete sku details
export const deleteProduct = (id) => ({
  type: types.DELETE_PRODUCT,
  payload: id,
});

export const deleteProductSuccess = (id) => ({
  type: types.DELETE_PRODUCT_SUCCESS,
  payload: id,
});

export const deleteProductFailure = (error) => ({
  type: types.DELETE_PRODUCT_FAILURE,
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


// Set BOM
export const setBom = (data) => ({
  type: types.SET_BOM,
  payload: data,
});

export const setBomSuccess = (data) => ({
  type: types.SET_BOM_SUCCESS,
  payload: data,
});

export const setBomFailure = (data) => ({
  type: types.SET_BOM_FAILURE,
  payload: data,
});

//Get data of stock_location
export const getLocationDetails = () => ({
  type: types.GET_LOCATION,
});

export const getLocationDetailsSuccess = (data) => ({
  type: types.GET_LOCATION_SUCCESS,
  payload: data,
});

export const getLocationDetailsFailure = (data) => ({
  type: types.GET_LOCATION_FAILURE,
  payload: data,
});

//Patch single Sku
export const patchSingleSku = (data) => ({
  type: types.PATCH_SINGLE_SKU,
  payload: data,
});
export const patchSingleSkuSuccess = (data) => ({
  type: types.PATCH_SINGLE_SKU_SUCCESS,
  payload: data,
});
export const patchSingleSkuFailure = (error) => ({
  type: types.PATCH_SINGLE_SKU_FAILURE,
  payload: error,
});

//Create Stock MoveSku form
export const createStockMoveSkuForm = (data) => ({
  type: types.CREATE_STOCK_MOVE_SKU,
  payload: data
});
export const createStockMoveSkuFormSuccess = data => ({
  type: types.CREATE_STOCK_MOVE_SKU_SUCCESS,
  payload: data
});
export const createStockMoveSkuFormFailure = error => ({
  type: types.CREATE_STOCK_MOVE_SKU_FAILURE,
  payload: error
});

// stock merge sku 
export const patchStockMergeSku = (data) => ({
  type: types.PATCH_STOCK_MERGE_SKU,
  payload: data
});
export const patchStockMergeSkuSuccess = data => ({
  type: types.PATCH_STOCK_MERGE_SKU_SUCCESS,
  payload: data
});
export const patchStockMergeSkuFailure = error => ({
  type: types.PATCH_STOCK_MERGE_SKU_FAILURE,
  payload: error
});


// create CSV
export const getCsvCreate = (data) => ({
  type: types.CSV_CREATE_PRODUCT_SKU,
  payload:data,
})

export const getCsvCreateSuccess = (data) => ({
  type: types.CSV_CREATE_PRODUCT_SKU_SUCCESS,
  payload: data,
})

export const getCsvCreateFailure = (data) => ({
  type: types.getCsvCreateFailure,
  payload: data,
})
// ADD PRODUCT CREATE JOURNAL ENTRY 
export const addStockCreateJournalEntry = (data) => ({
  type: types.POST_ADD_STOCK_CREATE_JOURNAL_ENTRY,
  payload: data
});
export const addStockCreateJournalEntrySuccess = (data) => ({
  type: types.POST_ADD_STOCK_CREATE_JOURNAL_ENTRY_SUCCESS,
  payload: data
});
export const addStockCreateJournalEntryFailure = (error) => ({
  type: types.POST_ADD_STOCK_CREATE_JOURNAL_ENTRY_FAILURE,
  payload: error
});


// DEDUCT PRODUCT CREATE JOURNAL ENTRY 
export const deductStockCreateJournalEntry = (data) => ({
  type: types.POST_DEDUCT_STOCK_CREATE_JOURNAL_ENTRY,
  payload: data
});
export const deductStockCreateJournalEntrySuccess = (data) => ({
  type: types.POST_DEDUCT_STOCK_CREATE_JOURNAL_ENTRY_SUCCESS,
  payload: data
});
export const deductStockCreateJournalEntryFailure = (error) => ({
  type: types.POST_DEDUCT_STOCK_CREATE_JOURNAL_ENTRY_FAILURE,
  payload: error
});

// Save query for Inventory Enquiry
export const getSavedInventoryQuery = (data) => ({
  type: types.GET_SAVED_INVENTORY_QUERY,
  payload:data,
})

export const getSavedInventoryQuerySuccess = (data) => ({
  type: types.GET_SAVED_INVENTORY_QUERY_SUCCESS,
  payload: data,
})

export const getSavedInventoryQueryFailure = (data) => ({
  type: types.GET_SAVED_INVENTORY_QUERY_FAILURE,
  payload: data,
})

// Save query for SKU LIST
export const getSavedSKUListQuery = (data) => ({
  type: types.GET_SAVED_SKU_LIST_QUERY,
  payload:data,
})

export const getSavedSKUListQuerySuccess = (data) => ({
  type: types.GET_SAVED_SKU_LIST_QUERY_SUCCESS,
  payload: data,
})

export const getSavedSKUListQueryFailure = (data) => ({
  type: types.GET_SAVED_SKU_LIST_QUERY_FAILURE,
  payload: data,
})

// Save query for SKU MAINETENANCE
export const getSavedSKUMainQuery = (data) => ({
  type: types.GET_SAVED_SKU_MAIN_QUERY,
  payload:data,
})

export const getSavedSKUMainQuerySuccess = (data) => ({
  type: types.GET_SAVED_SKU_MAIN_QUERY_SUCCESS,
  payload: data,
})

export const getSavedSKUMainQueryFailure = (data) => ({
  type: types.GET_SAVED_SKU_MAIN_QUERY_FAILURE,
  payload: data,
})

// Save query for Stock Adjustment
export const getSavedStockAdjQuery = (data) => ({
  type: types.GET_SAVED_STOCK_ADJ_QUERY,
  payload:data,
})

export const getSavedStockAdjQuerySuccess = (data) => ({
  type: types.GET_SAVED_STOCK_ADJ_QUERY_SUCCESS,
  payload: data,
})

export const getSavedStockAdjQueryFailure = (data) => ({
  type: types.GET_SAVED_STOCK_ADJ_QUERY_FAILURE,
  payload: data,
})