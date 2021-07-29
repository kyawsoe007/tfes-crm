
import data from "@iconify/icons-ic/baseline-delete-forever";
import * as types from "./warehouseSettingsTypes";

// Get data of selected model

// GET all stock locations 
export const getAllStockLocations = () => ({
    type: types.GET_ALL_STOCK_LOCATIONS,
})

export const getAllStockLocationsSuccess = (data) => ({
    type: types.GET_ALL_STOCK_LOCATIONS_SUCCESS,
    payload: data
})

export const getAllStockLocationsFailure = (data) => ({
    type: types.GET_ALL_STOCK_LOCATIONS_FAILURE,
    payload: data
})

//GET one stock location 
export const getStockLocation = (data) => ({
    type: types.GET_STOCK_LOCATION,
    payload: data
})

export const getStockLocationSuccess = (data) => ({
    type: types.GET_STOCK_LOCATION_SUCCESS,
    payload: data
})

export const getStockLocationFailure = (data) => ({
    type: types.GET_STOCK_LOCATION_SUCCESS,
    payload: data
})

// POST one stock location 
export const postStockLocation = (data) => ({
    type: types.POST_STOCK_LOCATION,
    payload: data
})

export const postStockLocationSuccess = (data) => ({
    type: types.POST_STOCK_LOCATION_SUCCESS,
    payload: data
})

export const postStockLocationFailure = (data) => ({
    type: types.POST_STOCK_LOCATION_FAILURE,
    payload: data
})

// PATCH one stock location 
export const patchStockLocation = (data) => ({
    type: types.PATCH_STOCK_LOCATION,
    payload: data
})

export const patchStockLocationSuccess = (data) => ({
    type: types.PATCH_STOCK_LOCATION_SUCCESS,
    payload: data
})

export const patchStockLocationFailure = (data) => ({
    type: types.PATCH_STOCK_LOCATION_FAILURE,
    payload: data
})

// DELETE one stock location 
export const deleteStockLocation = (data) => ({
    type: types.DELETE_STOCK_LOCATION,
    payload: data
})

export const deleteStockLocationSuccess = (data) => ({
    type: types.DELETE_STOCK_LOCATION_SUCCESS,
    payload: data
})

export const deleteStockLocationFailure = (data) => ({
    type: types.DELETE_STOCK_LOCATION_FAILURE,
    payload: data
})