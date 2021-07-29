
import data from "@iconify/icons-ic/baseline-delete-forever";
import * as types from "./CapexTypes";

// Get data of selected model

// GET all capexs 
export const getAllCapexs = () => ({
    type: types.GET_ALL_CAPEXS,
})

export const getAllCapexsSuccess = (data) => ({
    type: types.GET_ALL_CAPEXS_SUCCESS,
    payload: data
})

export const getAllCapexsFailure = (data) => ({
    type: types.GET_ALL_CAPEXS_FAILURE,
    payload: data
})

//GET one capex 
export const getCapex = (data) => ({
    type: types.GET_CAPEX,
    payload: data
})

export const getCapexSuccess = (data) => ({
    type: types.GET_CAPEX_SUCCESS,
    payload: data
})

export const getCapexFailure = (data) => ({
    type: types.GET_CAPEX_SUCCESS,
    payload: data
})

// POST one capex 
export const postCapex = (data) => ({
    type: types.POST_CAPEX,
    payload: data
})

export const postCapexSuccess = (data) => ({
    type: types.POST_CAPEX_SUCCESS,
    payload: data
})

export const postCapexFailure = (data) => ({
    type: types.POST_CAPEX_FAILURE,
    payload: data
})

// PATCH one capex 
export const patchCapex = (data) => ({
    type: types.PATCH_CAPEX,
    payload: data
})

export const patchCapexSuccess = (data) => ({
    type: types.PATCH_CAPEX_SUCCESS,
    payload: data
})

export const patchCapexFailure = (data) => ({
    type: types.PATCH_CAPEX_FAILURE,
    payload: data
})

// DELETE one capex 
export const deleteCapex = (data) => ({
    type: types.DELETE_CAPEX,
    payload: data
})

export const deleteCapexSuccess = (data) => ({
    type: types.DELETE_CAPEX_SUCCESS,
    payload: data
})

export const deleteCapexFailure = (data) => ({
    type: types.DELETE_CAPEX_FAILURE,
    payload: data
})