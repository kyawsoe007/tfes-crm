
import data from "@iconify/icons-ic/baseline-delete-forever";
import * as types from "./payment-methodTypes";

// Get data of selected model

// GET all stock locations 
export const getAllPaymentMethods = () => ({
    type: types.GET_ALL_PAYMENT_METHODS,
})

export const getAllPaymentMethodsSuccess = (data) => ({
    type: types.GET_ALL_PAYMENT_METHODS_SUCCESS,
    payload: data
})

export const getAllPaymentMethodsFailure = (data) => ({
    type: types.GET_ALL_PAYMENT_METHODS_FAILURE,
    payload: data
})

//GET one stock location 
export const getPaymentMethod = (data) => ({
    type: types.GET_PAYMENT_METHOD,
    payload: data
})

export const getPaymentMethodSuccess = (data) => ({
    type: types.GET_PAYMENT_METHOD_SUCCESS,
    payload: data
})

export const getPaymentMethodFailure = (data) => ({
    type: types.GET_PAYMENT_METHOD_SUCCESS,
    payload: data
})

// POST one stock location 
export const postPaymentMethod = (data) => ({
    type: types.POST_PAYMENT_METHOD,
    payload: data
})

export const postPaymentMethodSuccess = (data) => ({
    type: types.POST_PAYMENT_METHOD_SUCCESS,
    payload: data
})

export const postPaymentMethodFailure = (data) => ({
    type: types.POST_PAYMENT_METHOD_FAILURE,
    payload: data
})

// PATCH one stock location 
export const patchPaymentMethod = (data) => ({
    type: types.PATCH_PAYMENT_METHOD,
    payload: data
})

export const patchPaymentMethodSuccess = (data) => ({
    type: types.PATCH_PAYMENT_METHOD_SUCCESS,
    payload: data
})

export const patchPaymentMethodFailure = (data) => ({
    type: types.PATCH_PAYMENT_METHOD_FAILURE,
    payload: data
})

// DELETE one stock location 
export const deletePaymentMethod = (data) => ({
    type: types.DELETE_PAYMENT_METHOD,
    payload: data
})

export const deletePaymentMethodSuccess = (data) => ({
    type: types.DELETE_PAYMENT_METHOD_SUCCESS,
    payload: data
})

export const deletePaymentMethodFailure = (data) => ({
    type: types.DELETE_PAYMENT_METHOD_FAILURE,
    payload: data
})