
import data from "@iconify/icons-ic/baseline-delete-forever";
import * as types from "./approval-rightTypes";

// Get data of selected model

// GET all Approval Rights 
export const getAllApprovalRights = () => ({
    type: types.GET_ALL_APPROVAL_RIGHTS,
})

export const getAllApprovalRightsSuccess = (data) => ({
    type: types.GET_ALL_APPROVAL_RIGHTS_SUCCESS,
    payload: data
})

export const getAllApprovalRightsFailure = (data) => ({
    type: types.GET_ALL_APPROVAL_RIGHTS_FAILURE,
    payload: data
})

// GET all Delivery Approval Rights 
export const getAllDeliveryApprovalRights = () => ({
    type: types.GET_ALL_DELIVERY_APPROVAL_RIGHTS,
})

export const getAllDeliveryApprovalRightsSuccess = (data) => ({
    type: types.GET_ALL_DELIVERY_APPROVAL_RIGHTS_SUCCESS,
    payload: data
})

export const getAllDeliveryApprovalRightsFailure = (data) => ({
    type: types.GET_ALL_DELIVERY_APPROVAL_RIGHTS_FAILURE,
    payload: data
})

//GET one APPROVAL RIGHT
export const getApprovalRight = (data) => ({
    type: types.GET_APPROVAL_RIGHT,
    payload: data
})

export const getApprovalRightSuccess = (data) => ({
    type: types.GET_APPROVAL_RIGHT_SUCCESS,
    payload: data
})

export const getApprovalRightFailure = (data) => ({
    type: types.GET_APPROVAL_RIGHT_SUCCESS,
    payload: data
})

// POST one APPROVAL RIGHT
export const postApprovalRight = (data) => ({
    type: types.POST_APPROVAL_RIGHT,
    payload: data
})

export const postApprovalRightSuccess = (data) => ({
    type: types.POST_APPROVAL_RIGHT_SUCCESS,
    payload: data
})

export const postApprovalRightFailure = (data) => ({
    type: types.POST_APPROVAL_RIGHT_FAILURE,
    payload: data
})

// PATCH one APPROVAL RIGHT
export const patchApprovalRight = (data) => ({
    type: types.PATCH_APPROVAL_RIGHT,
    payload: data
})

export const patchApprovalRightSuccess = (data) => ({
    type: types.PATCH_APPROVAL_RIGHT_SUCCESS,
    payload: data
})

export const patchApprovalRightFailure = (data) => ({
    type: types.PATCH_APPROVAL_RIGHT_FAILURE,
    payload: data
})

// DELETE one APPROVAL RIGHT
export const deleteApprovalRight = (data) => ({
    type: types.DELETE_APPROVAL_RIGHT,
    payload: data
})

export const deleteApprovalRightSuccess = (data) => ({
    type: types.DELETE_APPROVAL_RIGHT_SUCCESS,
    payload: data
})

export const deleteApprovalRightFailure = (data) => ({
    type: types.DELETE_APPROVAL_RIGHT_FAILURE,
    payload: data
})