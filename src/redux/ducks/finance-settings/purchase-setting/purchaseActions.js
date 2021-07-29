
import data from "@iconify/icons-ic/baseline-delete-forever";
import * as types from "./purchaseTypes";

// Get data of selected model

// GET all stock locations 
export const getAllPurchaseSettings = () => ({
    type: types.GET_ALL_PURCHASE_SETTINGS,
})

export const getAllPurchaseSettingsSuccess = (data) => ({
    type: types.GET_ALL_PURCHASE_SETTINGS_SUCCESS,
    payload: data
})

export const getAllPurchaseSettingsFailure = (data) => ({
    type: types.GET_ALL_PURCHASE_SETTINGS_FAILURE,
    payload: data
})

//GET one stock location 
export const getPurchaseSetting = (data) => ({
    type: types.GET_PURCHASE_SETTING,
    payload: data
})

export const getPurchaseSettingSuccess = (data) => ({
    type: types.GET_PURCHASE_SETTING_SUCCESS,
    payload: data
})

export const getPurchaseSettingFailure = (data) => ({
    type: types.GET_PURCHASE_SETTING_SUCCESS,
    payload: data
})

// POST one stock location 
export const postPurchaseSetting = (data) => ({
    type: types.POST_PURCHASE_SETTING,
    payload: data
})

export const postPurchaseSettingSuccess = (data) => ({
    type: types.POST_PURCHASE_SETTING_SUCCESS,
    payload: data
})

export const postPurchaseSettingFailure = (data) => ({
    type: types.POST_PURCHASE_SETTING_FAILURE,
    payload: data
})

// PATCH one stock location 
export const patchPurchaseSetting = (data) => ({
    type: types.PATCH_PURCHASE_SETTING,
    payload: data
})

export const patchPurchaseSettingSuccess = (data) => ({
    type: types.PATCH_PURCHASE_SETTING_SUCCESS,
    payload: data
})

export const patchPurchaseSettingFailure = (data) => ({
    type: types.PATCH_PURCHASE_SETTING_FAILURE,
    payload: data
})

// DELETE one stock location 
export const deletePurchaseSetting = (data) => ({
    type: types.DELETE_PURCHASE_SETTING,
    payload: data
})

export const deletePurchaseSettingSuccess = (data) => ({
    type: types.DELETE_PURCHASE_SETTING_SUCCESS,
    payload: data
})

export const deletePurchaseSettingFailure = (data) => ({
    type: types.DELETE_PURCHASE_SETTING_FAILURE,
    payload: data
})