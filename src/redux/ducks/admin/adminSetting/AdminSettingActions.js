
import data from "@iconify/icons-ic/baseline-delete-forever";
import * as types from "./AdminSettingTypes";

// Get data of selected model

// GET all AdminSettings 
export const getAllAdminSetting = () => ({
    type: types.GET_ALL_ADMIN_SETTING,
})

export const getAllAdminSettingSuccess = (data) => ({
    type: types.GET_ALL_ADMIN_SETTING_SUCCESS,
    payload: data
})

export const getAllAdminSettingFailure = (data) => ({
    type: types.GET_ALL_ADMIN_SETTING_FAILURE,
    payload: data
})

//GET one AdminSetting 
export const getAdminSetting = (data) => ({
    type: types.GET_ADMIN_SETTING,
    payload: data
})

export const getAdminSettingSuccess = (data) => ({
    type: types.GET_ADMIN_SETTING_SUCCESS,
    payload: data
})

export const getAdminSettingFailure = (data) => ({
    type: types.GET_ADMIN_SETTING_SUCCESS,
    payload: data
})

// POST one AdminSetting 
export const postAdminSetting = (data) => ({
    type: types.POST_ADMIN_SETTING,
    payload: data
})

export const postAdminSettingSuccess = (data) => ({
    type: types.POST_ADMIN_SETTING_SUCCESS,
    payload: data
})

export const postAdminSettingFailure = (data) => ({
    type: types.POST_ADMIN_SETTING_FAILURE,
    payload: data
})

// PATCH one AdminSetting 
export const patchAdminSetting = (data) => ({
    type: types.PATCH_ADMIN_SETTING,
    payload: data
})

export const patchAdminSettingSuccess = (data) => ({
    type: types.PATCH_ADMIN_SETTING_SUCCESS,
    payload: data
})

export const patchAdminSettingFailure = (data) => ({
    type: types.PATCH_ADMIN_SETTING_FAILURE,
    payload: data
})

// DELETE one AdminSetting 
export const deleteAdminSetting = (data) => ({
    type: types.DELETE_ADMIN_SETTING,
    payload: data
})

export const deleteAdminSettingSuccess = (data) => ({
    type: types.DELETE_ADMIN_SETTING_SUCCESS,
    payload: data
})

export const deleteAdminSettingFailure = (data) => ({
    type: types.DELETE_ADMIN_SETTING_FAILURE,
    payload: data
})

export const getFilterAdminSettingRequest = (limit, skip, filter, searchText, orderBy) => ({
    type: types.GET_FILTER_ADMIN_SETTING,
    payload: { limit, skip, filter, searchText, orderBy },
});
export const getFilterAdminSettingSuccess = (data) => ({
    type: types.GET_FILTER_ADMIN_SETTING_SUCCESS,
    payload: data,
});
export const getFilterAdminSettingFailure = (error) => ({
    type: types.GET_FILTER_ADMIN_SETTING_FAILURE,
    payload: error,
});

//CLEAR
export const clearAdminDuplicate = (data) => ({
    type: types.CLEAR_ADMIN_DUPLICATE,
    payload: data,
});

export const clearAdminDuplicateSuccess = (data) => ({
    type: types.CLEAR_ADMIN_DUPLICATE_SUCCESS,
    payload: data,
});

export const clearAdminDuplicateFailure = (data) => ({
    type: types.CLEAR_ADMIN_DUPLICATE_FAILURE,
    payload: data,
});