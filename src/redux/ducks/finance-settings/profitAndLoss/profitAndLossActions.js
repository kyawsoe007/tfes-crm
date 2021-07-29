
import * as types from "./profitAndLossTypes";


// GET all stock locations 
export const getAllProfitAndLoss = () => ({
    type: types.GET_ALL_PROFIT_LOSS,
})

export const getAllProfitAndLossSuccess = (data) => ({
    type: types.GET_ALL_PROFIT_LOSS_SUCCESS,
    payload: data
})

export const getAllProfitAndLossFailure = (data) => ({
    type: types.GET_ALL_PROFIT_LOSS_FAILURE,
    payload: data
})

//GET one stock location 
export const getProfitAndLoss = (data) => ({
    type: types.GET_PROFIT_LOSS,
    payload: data
})

export const getProfitAndLossSuccess = (data) => ({
    type: types.GET_PROFIT_LOSS_SUCCESS,
    payload: data
})

export const getProfitAndLossFailure = (data) => ({
    type: types.GET_PROFIT_LOSS_SUCCESS,
    payload: data
})

// POST one stock location 
export const postProfitAndLoss = (data) => ({
    type: types.POST_PROFIT_LOSS,
    payload: data
})

export const postProfitAndLossSuccess = (data) => ({
    type: types.POST_PROFIT_LOSS_SUCCESS,
    payload: data
})

export const postProfitAndLossFailure = (data) => ({
    type: types.POST_PROFIT_LOSS_FAILURE,
    payload: data
})

// PATCH one stock location 
export const patchProfitAndLoss = (data) => ({
    type: types.PATCH_PROFIT_LOSS,
    payload: data
})

export const patchProfitAndLossSuccess = (data) => ({
    type: types.PATCH_PROFIT_LOSS_SUCCESS,
    payload: data
})

export const patchProfitAndLossFailure = (data) => ({
    type: types.PATCH_PROFIT_LOSS_FAILURE,
    payload: data
})

// DELETE one stock location 
export const deleteProfitAndLoss = (data) => ({
    type: types.DELETE_PROFIT_LOSS,
    payload: data
})

export const deleteProfitAndLossSuccess = (data) => ({
    type: types.DELETE_PROFIT_LOSS_SUCCESS,
    payload: data
})

export const deleteProfitAndLossFailure = (data) => ({
    type: types.DELETE_PROFIT_LOSS_FAILURE,
    payload: data
})