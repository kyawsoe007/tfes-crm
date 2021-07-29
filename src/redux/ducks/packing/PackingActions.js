
import * as types from "./PackingTypes";

export const getAllPacking = () => ({
    type: types.GET_ALL_PACKING
});
export const getAllPackingSuccess = data => ({
    type: types.GET_ALL_PACKING_SUCCESS,
   payload:data 
});
export const getAllPackingFailure = error => ({
    type: types.GET_FILTER_PACKING_FAILURE,
    payload: error
});

//GET FILTERED PACKING
export const getFilterPacking = (
    limit,
    skip,
    filter,
    searchText,
    orderBy
) => ({
    type: types.GET_FILTER_PACKING,
    payload: { limit, skip, filter, searchText, orderBy },
});
export const getFilterPackingSuccess = (data) => ({
    type: types.GET_FILTER_PACKING_SUCCESS,
    payload: data,
});
export const getFilterPackingFailure = (error) => ({
    type: types.GET_FILTER_PACKING_FAILURE,
    payload: error,
});

//get move lines
export const getMoveLines = (data) => ({
    type: types.GET_PACKING_MOVE_LINE,
    payload: data
});
export const getMoveLinesSuccess = data => (console.log('hello',data),{    
    type: types.GET_PACKING_MOVE_LINE_SUCCESS,
    payload: data
});
export const getMoveLinesFailure = error => ({
    type: types.GET_PACKING_MOVE_LINE_FAILURE,
    payload: error
});

//save receive form
export const savePACKINGForm = (data) => ({
    type: types.SAVE_PACKING_FORM,
    payload: data
});
export const savePACKINGFormSuccess = data => ({
    type: types.SAVE_PACKING_FORM_SUCCESS,
    payload: data
});
export const savePACKINGFormFailure = error => ({
    type: types.SAVE_PACKING_FORM_FAILURE,
    payload: error
});

//put all
export const patchSingleSkuPackingOrderRequest = (data) => (console.log('========', data), {
    type: types.PATCH_SINGLE_SKU_PACKING_ORDER_REQUEST,
    payload: data,
  });
  export const patchSingleSkuPackingOrderSuccess = (data) => ({
    type: types.PATCH_SINGLE_SKU_PACKING_ORDER_SUCCESS,
    payload: data,
  });
  export const patchSingleSkuPackingOrderFailure = (error) => ({
    type: types.PATCH_SINGLE_SKU_PACKING_ORDER_FAILURE,
    payload: error,
});
  
  //Qty
  export const patchSingleQtyPacking = (data) => (console.log('========', data), {
    type: types.PATCH_SINGLE_QTY_PACKING,
    payload: data,
  });
  export const patchSingleQtyPackingSuccess = (data) => (console.log('dd',data), {
    type: types.PATCH_SINGLE_QTY_PACKING_SUCCESS,
    payload: data,
  });
  export const patchSingleQtyPackingFailure = (error) => ({
    type: types.PATCH_SINGLE_QTY_PACKING_FAILURE,
    payload: error,
});

//Container  
export const patchContainerPacking = (data) => (console.log('========', data), {
  type: types.PATCH_CONTAINER_PACKING_ORDER,
  payload: data,
});
export const patchContainerPackingSuccess = (data) => (console.log('dd',data), {
  type: types.PATCH_CONTAINER_PACKING_ORDER_SUCCESS,
  payload: data,
});
export const patchContainerPackingFailure = (error) => ({
  type: types.PATCH_CONTAINER_PACKING_ORDER_FAILURE,
  payload: error,
});

  // Delete sku details
  export const deletePackingOrder = (id) => ({
    type: types.DELETE_PACKING_ORDER,
    payload: id,
  });
  
  export const deletePackingOrderSuccess = (id) => ({
    type: types.DELETE_PACKING_ORDER_SUCCESS,
    payload: id,
  });
  
  export const deletePackingOrderFailure = (error) => ({
    type: types.DELETE_PACKING_ORDER_FAILURE,
    payload: error,
  });

  // Get Pdf data 
export const getPdfCreate = (data) => ({
  type: types.PDF_CREATE_PACKING_ORDER,
  payload:data,
})

export const getPdfCreateSuccess = (data) => ({
  type: types.PDF_CREATE_PACKING_ORDER_SUCCESS,
  payload: data,
})

export const getPdfCreateFailure = (data) => ({
  type: types.PDF_CREATE_PACKING_ORDER_FAILURE,
  payload: data,
})

//Get Commercial Invoice Pdf data 
export const getPackingCommercialInvoicePdf = (data) => ({
  type: types.GET_CREATE_COMMERCIAL_INVOICE_PDF,
  payload: data
});

export const getPackingCommercialInvoicePdfSuccess = () => ({
  type: types.GET_CREATE_COMMERCIAL_INVOICE_PDF_SUCCESS,
  payload: {}
});

export const getPackingCommercialInvoicePdfFailure = (error) => ({
  type: types.GET_CREATE_COMMERCIAL_INVOICE_PDF_FAILURE,
  payload: error
});

// Save Query
export const getSavedPackingQuery = (data) => ({
  type: types.GET_SAVED_PACKING_QUERY,
  payload:data,
})

export const getSavedPackingQuerySuccess = (data) => ({
  type: types.GET_SAVED_PACKING_QUERY_SUCCESS,
  payload: data,
})

export const getSavedPackingQueryFailure = (data) => ({
  type: types.GET_SAVED_PACKING_QUERY_FAILURE,
  payload: data,
})