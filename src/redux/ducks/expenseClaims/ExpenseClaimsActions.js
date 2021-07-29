import * as types from "./ExpenseClaimsTypes"

// Get all claims
export const getAllExpenseClaims  = (data)=>({
    type: types.GET_ALL_EXPENSE_CLAIMS,
    payload: data,
})
export const getAllExpenseClaimsSuccess  = (data)=>({
    type: types.GET_ALL_EXPENSE_CLAIMS_SUCCESS,
    payload: data,
})
export const getAllExpenseClaimsFailure  = (error)=>({
    type: types.GET_ALL_EXPENSE_CLAIMS_FAILURE,
    payload: error,
})

export const getAllFilterExpenseClaims = (limit, skip, filter, searchText, orderBy) => ({
    type: types.GET_ALL_FILTER_EXPENSE_CLAIMS,
    payload: { limit, skip, filter, searchText, orderBy },
  });
  export const getAllFilterExpenseClaimsSuccess = (data) => ({
    type: types.GET_ALL_FILTER_EXPENSE_CLAIMS_SUCCESS,
    payload: data,
  });
  export const getAllFilterExpenseClaimsFailure = (error) => ({
    type: types.GET_ALL_FILTER_EXPENSE_CLAIMS_FAILURE,
    payload: error,
  });

// Get claim
export const getExpenseClaims  = (id)=>({
    type: types.GET_EXPENSE_CLAIMS,
    payload: id,
})
export const getExpenseClaimsSuccess  = (data)=>({
    type: types.GET_EXPENSE_CLAIMS_SUCCESS,
    payload: data,
})
export const getExpenseClaimsFailure  = (error)=>({
    type: types.GET_EXPENSE_CLAIMS_FAILURE,
    payload: error,
})

// Post claim 
export const postExpenseClaims  = (data)=>({
    type: types.POST_EXPENSE_CLAIMS,
    payload: data,
})
export const postExpenseClaimsSuccess  = (data)=>({
    type: types.POST_EXPENSE_CLAIMS_SUCCESS,
    payload: data,
})
export const postExpenseClaimsFailure  = (error)=>({
    type: types.POST_EXPENSE_CLAIMS_FAILURE,
    payload: error,
})

// patch claim 
export const patchExpenseClaims  = (data)=>({
    type: types.PATCH_EXPENSE_CLAIMS,
    payload: data,
})
export const patchExpenseClaimsSuccess  = (data)=>({
    type: types.PATCH_EXPENSE_CLAIMS_SUCCESS,
    payload: data,
})
export const patchExpenseClaimsFailure  = (error)=>({
    type: types.PATCH_EXPENSE_CLAIMS_FAILURE,
    payload: error,
})

// delete claim
export const deleteExpenseClaims  = (id)=>({
    type: types.DELETE_EXPENSE_CLAIMS,
    payload: id,
})
export const deleteExpenseClaimsSuccess  = (data)=>({
    type: types.DELETE_EXPENSE_CLAIMS_SUCCESS,
    payload: data,
})
export const deleteExpenseClaimsFailure  = (error)=>({
    type: types.DELETE_EXPENSE_CLAIMS_FAILURE,
    payload: error,
})
