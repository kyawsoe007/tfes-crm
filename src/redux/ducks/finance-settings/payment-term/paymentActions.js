
import data from "@iconify/icons-ic/baseline-delete-forever";
import * as types from "./paymentTypes";

// Get data of selected model

// GET all stock locations 
export const getAllPaymentTerms = () => ({
    type: types.GET_ALL_PAYMENT_TERMS,
})

export const getAllPaymentTermsSuccess = (data) => ({
    type: types.GET_ALL_PAYMENT_TERMS_SUCCESS,
    payload: data
})

export const getAllPaymentTermsFailure = (data) => ({
    type: types.GET_ALL_PAYMENT_TERMS_FAILURE,
    payload: data
})

//GET one stock location 
export const getPaymentTerm = (data) => ({
    type: types.GET_PAYMENT_TERM,
    payload: data
})

export const getPaymentTermSuccess = (data) => ({
    type: types.GET_PAYMENT_TERM_SUCCESS,
    payload: data
})

export const getPaymentTermFailure = (data) => ({
    type: types.GET_PAYMENT_TERM_SUCCESS,
    payload: data
})

// POST one stock location 
export const postPaymentTerm = (data) => ({
    type: types.POST_PAYMENT_TERM,
    payload: data
})

export const postPaymentTermSuccess = (data) => ({
    type: types.POST_PAYMENT_TERM_SUCCESS,
    payload: data
})

export const postPaymentTermFailure = (data) => ({
    type: types.POST_PAYMENT_TERM_FAILURE,
    payload: data
})

// PATCH one stock location 
export const patchPaymentTerm = (data) => ({
    type: types.PATCH_PAYMENT_TERM,
    payload: data
})

export const patchPaymentTermSuccess = (data) => ({
    type: types.PATCH_PAYMENT_TERM_SUCCESS,
    payload: data
})

export const patchPaymentTermFailure = (data) => ({
    type: types.PATCH_PAYMENT_TERM_FAILURE,
    payload: data
})

// DELETE one stock location 
export const deletePaymentTerm = (data) => ({
    type: types.DELETE_PAYMENT_TERM,
    payload: data
})

export const deletePaymentTermSuccess = (data) => ({
    type: types.DELETE_PAYMENT_TERM_SUCCESS,
    payload: data
})

export const deletePaymentTermFailure = (data) => ({
    type: types.DELETE_PAYMENT_TERM_FAILURE,
    payload: data
})