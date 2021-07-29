
import data from "@iconify/icons-ic/baseline-delete-forever";
import * as types from "./downPaymentTypes";

// Get data of selected model

// GET all stock locations 
export const getAllDownPayments = () => ({
    type: types.GET_ALL_DOWN_PAYMENTS,
})

export const getAllDownPaymentsSuccess = (data) => ({
    type: types.GET_ALL_DOWN_PAYMENTS_SUCCESS,
    payload: data
})

export const getAllDownPaymentsFailure = (data) => ({
    type: types.GET_ALL_DOWN_PAYMENTS_FAILURE,
    payload: data
})

//GET one stock location 
export const getDownPayment = (data) => ({
    type: types.GET_DOWN_PAYMENT,
    payload: data
})

export const getDownPaymentSuccess = (data) => ({
    type: types.GET_DOWN_PAYMENT_SUCCESS,
    payload: data
})

export const getDownPaymentFailure = (data) => ({
    type: types.GET_DOWN_PAYMENT_SUCCESS,
    payload: data
})

// POST one stock location 
export const postDownPayment = (data) => ({
    type: types.POST_DOWN_PAYMENT,
    payload: data
})

export const postDownPaymentSuccess = (data) => ({
    type: types.POST_DOWN_PAYMENT_SUCCESS,
    payload: data
})

export const postDownPaymentFailure = (data) => ({
    type: types.POST_DOWN_PAYMENT_FAILURE,
    payload: data
})

// PATCH one stock location 
export const patchDownPayment = (data) => ({
    type: types.PATCH_DOWN_PAYMENT,
    payload: data
})

export const patchDownPaymentSuccess = (data) => ({
    type: types.PATCH_DOWN_PAYMENT_SUCCESS,
    payload: data
})

export const patchDownPaymentFailure = (data) => ({
    type: types.PATCH_DOWN_PAYMENT_FAILURE,
    payload: data
})

// DELETE one stock location 
export const deleteDownPayment = (data) => ({
    type: types.DELETE_DOWN_PAYMENT,
    payload: data
})

export const deleteDownPaymentSuccess = (data) => ({
    type: types.DELETE_DOWN_PAYMENT_SUCCESS,
    payload: data
})

export const deleteDownPaymentFailure = (data) => ({
    type: types.DELETE_DOWN_PAYMENT_FAILURE,
    payload: data
})