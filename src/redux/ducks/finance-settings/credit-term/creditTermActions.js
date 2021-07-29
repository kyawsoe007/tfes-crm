
import data from "@iconify/icons-ic/baseline-delete-forever";
import * as types from "./creditTermTypes";

// Get data of selected model

// GET all stock locations 
export const getAllCreditTerms = () => ({
    type: types.GET_ALL_CREDIT_TERMS,
})

export const getAllCreditTermsSuccess = (data) => ({
    type: types.GET_ALL_CREDIT_TERMS_SUCCESS,
    payload: data
})

export const getAllCreditTermsFailure = (data) => ({
    type: types.GET_ALL_CREDIT_TERMS_FAILURE,
    payload: data
})

//GET one stock location 
export const getCreditTerm = (data) => ({
    type: types.GET_CREDIT_TERM,
    payload: data
})

export const getCreditTermSuccess = (data) => ({
    type: types.GET_CREDIT_TERM_SUCCESS,
    payload: data
})

export const getCreditTermFailure = (data) => ({
    type: types.GET_CREDIT_TERM_SUCCESS,
    payload: data
})

// POST one stock location 
export const postCreditTerm = (data) => ({
    type: types.POST_CREDIT_TERM,
    payload: data
})

export const postCreditTermSuccess = (data) => ({
    type: types.POST_CREDIT_TERM_SUCCESS,
    payload: data
})

export const postCreditTermFailure = (data) => ({
    type: types.POST_CREDIT_TERM_FAILURE,
    payload: data
})

// PATCH one stock location 
export const patchCreditTerm = (data) => ({
    type: types.PATCH_CREDIT_TERM,
    payload: data
})

export const patchCreditTermSuccess = (data) => ({
    type: types.PATCH_CREDIT_TERM_SUCCESS,
    payload: data
})

export const patchCreditTermFailure = (data) => ({
    type: types.PATCH_CREDIT_TERM_FAILURE,
    payload: data
})

// DELETE one stock location 
export const deleteCreditTerm = (data) => ({
    type: types.DELETE_CREDIT_TERM,
    payload: data
})

export const deleteCreditTermSuccess = (data) => ({
    type: types.DELETE_CREDIT_TERM_SUCCESS,
    payload: data
})

export const deleteCreditTermFailure = (data) => ({
    type: types.DELETE_CREDIT_TERM_FAILURE,
    payload: data
})