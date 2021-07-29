
import data from "@iconify/icons-ic/baseline-delete-forever";
import * as types from "./incoTermTypes";

// Get data of selected model

// GET all stock locations 
export const getAllIncoTerms = () => ({
    type: types.GET_ALL_INCO_TERMS,
})

export const getAllIncoTermsSuccess = (data) => ({
    type: types.GET_ALL_INCO_TERMS_SUCCESS,
    payload: data
})

export const getAllIncoTermsFailure = (data) => ({
    type: types.GET_ALL_INCO_TERMS_FAILURE,
    payload: data
})

//GET one stock location 
export const getIncoTerm = (data) => ({
    type: types.GET_INCO_TERM,
    payload: data
})

export const getIncoTermSuccess = (data) => ({
    type: types.GET_INCO_TERM_SUCCESS,
    payload: data
})

export const getIncoTermFailure = (data) => ({
    type: types.GET_INCO_TERM_SUCCESS,
    payload: data
})

// POST one stock location 
export const postIncoTerm = (data) => ({
    type: types.POST_INCO_TERM,
    payload: data
})

export const postIncoTermSuccess = (data) => ({
    type: types.POST_INCO_TERM_SUCCESS,
    payload: data
})

export const postIncoTermFailure = (data) => ({
    type: types.POST_INCO_TERM_FAILURE,
    payload: data
})

// PATCH one stock location 
export const patchIncoTerm = (data) => ({
    type: types.PATCH_INCO_TERM,
    payload: data
})

export const patchIncoTermSuccess = (data) => ({
    type: types.PATCH_INCO_TERM_SUCCESS,
    payload: data
})

export const patchIncoTermFailure = (data) => ({
    type: types.PATCH_INCO_TERM_FAILURE,
    payload: data
})

// DELETE one stock location 
export const deleteIncoTerm = (data) => ({
    type: types.DELETE_INCO_TERM,
    payload: data
})

export const deleteIncoTermSuccess = (data) => ({
    type: types.DELETE_INCO_TERM_SUCCESS,
    payload: data
})

export const deleteIncoTermFailure = (data) => ({
    type: types.DELETE_INCO_TERM_FAILURE,
    payload: data
})