import * as types from "./AccountItemTypes";

export const getAllAccountItem = (limit, skip, filter, searchText, orderBy) => ({
    type: types.GET_ALL_ACCOUNT_ITEM,
    payload: { limit, skip, filter, searchText, orderBy }
});
export const getAllAccountItemSuccess = data => ({
    type: types.GET_ALL_ACCOUNT_ITEM_SUCCESS,
    payload: data
});
export const getAllAccountItemFailure = error => ({
    type: types.GET_ALL_ACCOUNT_ITEM_FAILURE
});

export const getAllCurrencyData = () => ({
    type: types.GET_CURRENCY_DATA
});
export const getAllCurrencyDataSuccess = data => ({
    type: types.GET_CURRENCY_DATA_SUCCESS,
    payload: data
});
export const getAllCurrencyDataFailure = error => ({
    type: types.GET_CURRENCY_DATA_FAILURE
});

export const getOneLineAccountItem = (data) => ({
    type: types.GET_ONE_LINE,
    payload: data
});
export const getOneLineAccountItemSuccess = data => ({
    type: types.GET_ONE_LINE_SUCCESS,
    payload: data
});
export const getOneLineAccountItemFailure = error => ({
    type: types.GET_ONE_LINE_FAILURE,
    payload: error
});

export const createAccountItem = (data) => ({
    type: types.CREATE_ACCOUNT_ITEM,
    payload:data
});
export const createAccountItemSuccess = data => ({
    type: types.CREATE_ACCOUNT_ITEM_SUCCESS,
    payload: data
});
export const createAccountItemFailure = error => ({
    type: types.CREATE_ACCOUNT_ITEM_FAILURE,
    payload: error
});

export const patchAccountItem = (data) => ({
    type: types.PATCH_ACCOUNT_ITEM,
    payload: data
});
export const patchAccountItemSuccess = (data) => ({
    type: types.PATCH_ACCOUNT_ITEM_SUCCESS,
    payload: data
});
export const patchAccountItemFailure = error => ({
    type: types.PATCH_ACCOUNT_ITEM_FAILURE,
    payload: error
});

export const deleteAccountItem = (data) => ({
    type: types.DELETE_ACCOUNT_ITEM,
    payload: data
});
export const deleteAccountItemSuccess = (data) => ({
    type: types.DELETE_ACCOUNT_ITEM_SUCCESS,
    payload: data
});
export const deleteAccountItemFailure = error => ({
    type: types.DELETE_ACCOUNT_ITEM_FAILURE,
    payload:error
})

// Save Query
export const getSavedAccountQuery = (data) => ({
    type: types.GET_SAVED_ACCOUNT_QUERY,
    payload:data,
  })
  
  export const getSavedAccountQuerySuccess = (data) => ({
    type: types.GET_SAVED_ACCOUNT_QUERY_SUCCESS,
    payload: data,
  })
  
  export const getSavedAccountQueryFailure = (data) => ({
    type: types.GET_SAVED_ACCOUNT_QUERY_FAILURE,
    payload: data,
  })