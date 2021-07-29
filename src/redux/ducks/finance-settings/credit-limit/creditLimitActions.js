
import data from "@iconify/icons-ic/baseline-delete-forever";
import * as types from "./creditLimitTypes";

// Get data of selected model

// GET all stock locations 
export const getAllCreditLimits = () => ({
    type: types.GET_ALL_CREDIT_LIMITS,
})

export const getAllCreditLimitsSuccess = (data) => ({
    type: types.GET_ALL_CREDIT_LIMITS_SUCCESS,
    payload: data
})

export const getAllCreditLimitsFailure = (data) => ({
    type: types.GET_ALL_CREDIT_LIMITS_FAILURE,
    payload: data
})

//GET one stock location 
export const getCreditLimit = (data) => ({
    type: types.GET_CREDIT_LIMIT,
    payload: data
})

export const getCreditLimitSuccess = (data) => ({
    type: types.GET_CREDIT_LIMIT_SUCCESS,
    payload: data
})

export const getCreditLimitFailure = (data) => ({
    type: types.GET_CREDIT_LIMIT_SUCCESS,
    payload: data
})

// POST one stock location 
export const postCreditLimit = (data) => ({
    type: types.POST_CREDIT_LIMIT,
    payload: data
})

export const postCreditLimitSuccess = (data) => ({
    type: types.POST_CREDIT_LIMIT_SUCCESS,
    payload: data
})

export const postCreditLimitFailure = (data) => ({
    type: types.POST_CREDIT_LIMIT_FAILURE,
    payload: data
})

// PATCH one stock location 
export const patchCreditLimit = (data) => ({
    type: types.PATCH_CREDIT_LIMIT,
    payload: data
})

export const patchCreditLimitSuccess = (data) => ({
    type: types.PATCH_CREDIT_LIMIT_SUCCESS,
    payload: data
})

export const patchCreditLimitFailure = (data) => ({
    type: types.PATCH_CREDIT_LIMIT_FAILURE,
    payload: data
})

// DELETE one stock location 
export const deleteCreditLimit = (data) => ({
    type: types.DELETE_CREDIT_LIMIT,
    payload: data
})

export const deleteCreditLimitSuccess = (data) => ({
    type: types.DELETE_CREDIT_LIMIT_SUCCESS,
    payload: data
})

export const deleteCreditLimitFailure = (data) => ({
    type: types.DELETE_CREDIT_LIMIT_FAILURE,
    payload: data
})