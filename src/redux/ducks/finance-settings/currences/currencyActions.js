
import data from "@iconify/icons-ic/baseline-delete-forever";
import * as types from "./currencyTypes";

// Get data of selected model

// GET all currencys 
export const getAllCurrences = () => ({
    type: types.GET_ALL_CURRENCES,
})

export const getAllCurrencesSuccess = (data) => ({
    type: types.GET_ALL_CURRENCES_SUCCESS,
    payload: data
})

export const getAllCurrencesFailure = (data) => ({
    type: types.GET_ALL_CURRENCES_FAILURE,
    payload: data
})

//GET one currency 
export const getCurrency = (id) => ({
    type: types.GET_CURRENCY,
    payload: id
})

export const getCurrencySuccess = (data) => ({
    type: types.GET_CURRENCY_SUCCESS,
    payload: data
})

export const getCurrencyFailure = (error) => ({
    type: types.GET_CURRENCY_FAILURE,
    payload: error
})

// POST one currency 
export const postCurrency = (data) => ({
    type: types.POST_CURRENCY,
    payload: data
})

export const postCurrencySuccess = (data) => ({
    type: types.POST_CURRENCY_SUCCESS,
    payload: data
})

export const postCurrencyFailure = (data) => ({
    type: types.POST_CURRENCY_FAILURE,
    payload: data
})


// PATCH one currency 
export const patchCurrency = (data) => ({
    type: types.PATCH_CURRENCY,
    payload: data
})

export const patchCurrencySuccess = (data) => ({
    type: types.PATCH_CURRENCY_SUCCESS,
    payload: data
})

export const patchCurrencyFailure = (data) => ({
    type: types.PATCH_CURRENCY_FAILURE,
    payload: data
})

// DELETE one currency 
export const deleteCurrency = (data) => ({
    type: types.DELETE_CURRENCY,
    payload: data
})

export const deleteCurrencySuccess = (data) => ({
    type: types.DELETE_CURRENCY_SUCCESS,
    payload: data
})

export const deleteCurrencyFailure = (data) => ({
    type: types.DELETE_CURRENCY_FAILURE,
    payload: data
})