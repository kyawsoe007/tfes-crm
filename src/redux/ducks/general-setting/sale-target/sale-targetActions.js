
import data from "@iconify/icons-ic/baseline-delete-forever";
import * as types from "./sale-targetTypes";

// Get data of selected model

// GET all Approval Rights 
export const getAllSaleTargets = () => ({
    type: types.GET_ALL_SALE_TARGETS,
})

export const getAllSaleTargetsSuccess = (data) => ({
    type: types.GET_ALL_SALE_TARGETS_SUCCESS,
    payload: data
})

export const getAllSaleTargetsFailure = (data) => ({
    type: types.GET_ALL_SALE_TARGETS_FAILURE,
    payload: data
})

//GET one APPROVAL RIGHT
export const getSaleTarget = (data) => ({
    type: types.GET_SALE_TARGET,
    payload: data
})

export const getSaleTargetSuccess = (data) => ({
    type: types.GET_SALE_TARGET_SUCCESS,
    payload: data
})

export const getSaleTargetFailure = (data) => ({
    type: types.GET_SALE_TARGET_SUCCESS,
    payload: data
})

//GET All Perform
export const getPerform = (data) => ({
    type: types.GET_PERFORM,
    payload: data
})

export const getPerformSuccess = (data) => ({
    type: types.GET_PERFORM_SUCCESS,
    payload: data
})

export const getPerformFailure = (data) => ({
    type: types.GET_PERFORM_SUCCESS,
    payload: data
})

// POST one APPROVAL RIGHT
export const postSaleTarget = (data) => ({
    type: types.POST_SALE_TARGET,
    payload: data
})

export const postSaleTargetSuccess = (data) => ({
    type: types.POST_SALE_TARGET_SUCCESS,
    payload: data
})

export const postSaleTargetFailure = (data) => ({
    type: types.POST_SALE_TARGET_FAILURE,
    payload: data
})

// PATCH one APPROVAL RIGHT
export const patchSaleTarget = (data) => ({
    type: types.PATCH_SALE_TARGET,
    payload: data
})

export const patchSaleTargetSuccess = (data) => (console.log('data',data),{
    type: types.PATCH_SALE_TARGET_SUCCESS,
    payload: data
    
})

export const patchSaleTargetFailure = (data) => ({
    type: types.PATCH_SALE_TARGET_FAILURE,
    payload: data
})

// DELETE one APPROVAL RIGHT
export const deleteSaleTarget = (data) => ({
    type: types.DELETE_SALE_TARGET,
    payload: data
})

export const deleteSaleTargetSuccess = (data) => ({
    type: types.DELETE_SALE_TARGET_SUCCESS,
    payload: data
})

export const deleteSaleTargetFailure = (data) => ({
    type: types.DELETE_SALE_TARGET_FAILURE,
    payload: data
})