
import data from "@iconify/icons-ic/baseline-delete-forever";
import * as types from "./LeaveManagementTypes";

// Get data of selected model

// GET all LeaveManagements 
export const getAllLeaveManagement = () => ({
    type: types.GET_ALL_LEAVE_MANAGEMENT,
})

export const getAllLeaveManagementSuccess = (data) => ({
    type: types.GET_ALL_LEAVE_MANAGEMENT_SUCCESS,
    payload: data
})

export const getAllLeaveManagementFailure = (data) => ({
    type: types.GET_ALL_LEAVE_MANAGEMENT_FAILURE,
    payload: data
})

//GET one LeaveManagement 
export const getLeaveManagement = (data) => ({
    type: types.GET_LEAVE_MANAGEMENT,
    payload: data
})

export const getLeaveManagementSuccess = (data) => ({
    type: types.GET_LEAVE_MANAGEMENT_SUCCESS,
    payload: data
})

export const getLeaveManagementFailure = (data) => ({
    type: types.GET_LEAVE_MANAGEMENT_SUCCESS,
    payload: data
})

// POST one LeaveManagement 
export const postLeaveManagement = (data) => ({
    type: types.POST_LEAVE_MANAGEMENT,
    payload: data
})

export const postLeaveManagementSuccess = (data) => ({
    type: types.POST_LEAVE_MANAGEMENT_SUCCESS,
    payload: data
})

export const postLeaveManagementFailure = (data) => ({
    type: types.POST_LEAVE_MANAGEMENT_FAILURE,
    payload: data
})

// PATCH one LeaveManagement 
export const patchLeaveManagement = (data) => ({
    type: types.PATCH_LEAVE_MANAGEMENT,
    payload: data
})

export const patchLeaveManagementSuccess = (data) => ({
    type: types.PATCH_LEAVE_MANAGEMENT_SUCCESS,
    payload: data
})

export const patchLeaveManagementFailure = (data) => ({
    type: types.PATCH_LEAVE_MANAGEMENT_FAILURE,
    payload: data
})

// DELETE one LeaveManagement 
export const deleteLeaveManagement = (data) => ({
    type: types.DELETE_LEAVE_MANAGEMENT,
    payload: data
})

export const deleteLeaveManagementSuccess = (data) => ({
    type: types.DELETE_LEAVE_MANAGEMENT_SUCCESS,
    payload: data
})

export const deleteLeaveManagementFailure = (data) => ({
    type: types.DELETE_LEAVE_MANAGEMENT_FAILURE,
    payload: data
})

export const getFilterLeaveManagementRequest = (limit, skip, filter, searchText, orderBy) => ({
    type: types.GET_FILTER_LEAVE_MANAGEMENT,
    payload: { limit, skip, filter, searchText, orderBy },
});
export const getFilterLeaveManagementSuccess = (data) => ({
    type: types.GET_FILTER_LEAVE_MANAGEMENT_SUCCESS,
    payload: data,
});
export const getFilterLeaveManagementFailure = (error) => ({
    type: types.GET_FILTER_LEAVE_MANAGEMENT_FAILURE,
    payload: error,
});

//CLEAR
export const clearDuplicate = (data) => ({
    type: types.CLEAR_DUPLICATE,
    payload: data,
});

export const clearDuplicateSuccess = (data) => ({
    type: types.CLEAR_DUPLICATE_SUCCESS,
    payload: data,
});

export const clearDuplicateFailure = (data) => ({
    type: types.CLEAR_DUPLICATE_FAILURE,
    payload: data,
});