
import * as types from "./balanceSheetTypes";


// GET all balance sheets 
export const getAllBalanceSheet = () => ({
    type: types.GET_ALL_BALANCE_SHEET,
})

export const getAllBalanceSheetSuccess = (data) => ({
    type: types.GET_ALL_BALANCE_SHEET_SUCCESS,
    payload: data
})

export const getAllBalanceSheetFailure = (data) => ({
    type: types.GET_ALL_BALANCE_SHEET_FAILURE,
    payload: data
})

//GET one balance sheet 
export const getBalanceSheet = (data) => ({
    type: types.GET_BALANCE_SHEET,
    payload: data
})

export const getBalanceSheetSuccess = (data) => ({
    type: types.GET_BALANCE_SHEET_SUCCESS,
    payload: data
})

export const getBalanceSheetFailure = (data) => ({
    type: types.GET_BALANCE_SHEET_SUCCESS,
    payload: data
})

// POST one balance sheet 
export const postBalanceSheet = (data) => ({
    type: types.POST_BALANCE_SHEET,
    payload: data
})

export const postBalanceSheetSuccess = (data) => ({
    type: types.POST_BALANCE_SHEET_SUCCESS,
    payload: data
})

export const postBalanceSheetFailure = (data) => ({
    type: types.POST_BALANCE_SHEET_FAILURE,
    payload: data
})

// PATCH one balance sheet 
export const patchBalanceSheet = (data) => ({
    type: types.PATCH_BALANCE_SHEET,
    payload: data
})

export const patchBalanceSheetSuccess = (data) => ({
    type: types.PATCH_BALANCE_SHEET_SUCCESS,
    payload: data
})

export const patchBalanceSheetFailure = (data) => ({
    type: types.PATCH_BALANCE_SHEET_FAILURE,
    payload: data
})

// DELETE one balance sheet 
export const deleteBalanceSheet = (data) => ({
    type: types.DELETE_BALANCE_SHEET,
    payload: data
})

export const deleteBalanceSheetSuccess = (data) => ({
    type: types.DELETE_BALANCE_SHEET_SUCCESS,
    payload: data
})

export const deleteBalanceSheetFailure = (data) => ({
    type: types.DELETE_BALANCE_SHEET_FAILURE,
    payload: data
})