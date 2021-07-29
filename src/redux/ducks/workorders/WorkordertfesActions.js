import * as types from './WorkordertfesTypes';


// get all workorders 
// export const getAllWorkOrders = () => ({
//     type: types.GET_ALL_WORKORDER,
// })

export const getAllWorkOrders = (
    limit,
    skip,
    filter,
    searchText,
    orderBy,
  ) => ({
    type: types.GET_ALL_WORKORDER,
    payload: { limit, skip, filter, searchText, orderBy },
  })
  
export const getAllWorkOrdersSuccess = (data) => ({
    type: types.GET_ALL_WORKORDER_SUCCESS,
    payload: { data },
})
export const getAllWorkOrdersFailure = (data) => ({
    type: types.GET_ALL_WORKORDER_FAILURE,
    payload: data,
})


export const getFilterWorkOrderRequest = (
    limit,
    skip,
    filter,
    searchText,
    orderBy,
  ) => ({
    type: types.GET_FILTER_WORKORDER_REQUEST,
    payload: { limit, skip, filter, searchText, orderBy },
  })

export const getFilterWorkOrderSuccess = (data) => ({
    type: types.GET_FILTER_WORKORDER_SUCCESS,
    payload: data,
})

export const getFilterWorkOrderFailure = (error) => ({
    type: types.GET_FILTER_WORKORDER_FAILURE,
    payload: error,
})


// get single workorder 
export const getWorkOrder = (id) => ({
    type: types.GET_WORKORDER,
    payload: id,
})

export const getWorkOrderSuccess = (data) => ({
    type: types.GET_WORKORDER_SUCCESS,
    payload: data
})

export const getWorkOrderFailure = (data) => ({
    type: types.GET_WORKORDER_FAILURE,
    payload: data
})






// update workorder item
export const setWorkOrder = (id, patchData) => ({
    type: types.SET_WORKORDER,
    payload: {
        id,
        patchData
    },
})

export const setWorkOrderSuccess = (data) => ({
    type: types.SET_WORKORDER_SUCCESS,
    payload: data
})

export const setWorkOrderFailure = (data) => ({
    type: types.SET_WORKORDER_FAILURE,

});


export const getWoBySoId = (data) => ({
    type: types.GET_WO_BY_SOID,
    payload: data
})

export const getWoBySoIdSuccess = (data) => ({
    type: types.GET_WO_BY_SOID_SUCCESS,
    payload: data
})

export const getWoBySoIdFailure = (data) => ({
    type: types.GET_WO_BY_SOID_FAILURE,
    payload: data
})

// PDF

export const getPdfCreate = (data) =>({
    type:types.PDF_CREATE_WORKER_ORDER,
    payload:data
})
export const getPdfCreateSuccess = (data) =>({
    type:types.PDF_CREATE_WORKER_ORDER_SUCCESS,
    payload:data
})
export const getPdfCreateFailure = (data) =>({
    type:types.PDF_CREATE_WORKER_ORDER_FAILURE,
    payload:data
})

// post checked sku
export const postCheckSku = (data) =>({
    type :types.POST_CHECKED_SKU,
    payload:data,
})
export const postCheckSkuSuccess = (data) =>({
    type :types.POST_CHECKED_SKU_SUCCESS,
    payload:data,
})
export const postCheckSkuFailure = (error) =>({
    type :types.POST_CHECKED_SKU_FAILURE,
    payload:error,
})

// post checked sku
export const updateWoPostCheckSku = (data) =>({
    type :types.UPDATE_WO_POST_CHECKED_SKU,
    payload:data,
})
export const updateWoPostCheckSkuSuccess = (data) =>({
    type :types.UPDATE_WO_POST_CHECKED_SKU_SUCCESS,
    payload:data,
})
export const updateWoPostCheckSkuFailure = (error) =>({
    type :types.UPDATE_WO_POST_CHECKED_SKU_FAILURE,
    payload:error,
});

// save query
export const getSavedWorkOrderQuery = (data) => ({
    type: types.GET_SAVED_WORKORDER_QUERY,
    payload:data,
  })
  
export const getSavedWorkOrderQuerySuccess = (data) => ({
type: types.GET_SAVED_WORKORDER_QUERY_SUCCESS,
payload: data,
})

export const getSavedWorkOrderQueryFailure = (data) => ({
type: types.GET_SAVED_WORKORDER_QUERY_FAILURE,
payload: data,
})

// light reset 
export const patchLightResetWorkorder = (data) => ({
    type: types.PATCH_LIGHT_RESET_WORKORDER,
    payload:data,
  })
  
export const patchLightResetWorkorderSuccess = (data) => ({
    type: types.PATCH_LIGHT_RESET_WORKORDER_SUCCESS,
    payload: data,
})

export const patchLightResetWorkorderFailure = (data) => ({
    type: types.PATCH_LIGHT_RESET_WORKORDER_FAILURE,
    payload: data,
})

// medium reset 
export const patchMediumResetWorkorder = (data) => ({
    type: types.PATCH_MEDIUM_RESET_WORKORDER,
    payload:data,
  })
  
export const patchMediumResetWorkorderSuccess = (data) => ({
    type: types.PATCH_MEDIUM_RESET_WORKORDER_SUCCESS,
    payload: data,
})

export const patchMediumResetWorkorderFailure = (data) => ({
    type: types.PATCH_MEDIUM_RESET_WORKORDER_FAILURE,
    payload: data,
})