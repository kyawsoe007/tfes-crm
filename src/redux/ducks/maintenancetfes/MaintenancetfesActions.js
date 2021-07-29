import { data } from 'jquery';
import * as types from './MaintenancetfesTypes';

// GET ALL ROLES 
export const getAllUserRoles = () => ({
    type: types.GET_ALL_USER_ROLES,
})

export const getAllUserRolesSuccess = (data) => ({
    type: types.GET_ALL_USER_ROLES_SUCCESS,
    payload: data
}) 

export const getAllUserRolesFailure = (date) => ({
    type: types.GET_ALL_USER_ROLES_FAILURE,
    payload: data
})


// POST ROLES 
export const postUserRole = (data) => ({
    type: types.POST_USER_ROLE,
    payload: data
})

export const postUserRoleSuccess = (data) => ({
    type: types.POST_USER_ROLE_SUCCESS,
    payload: data
})

export const postUserRoleFailure = (data) => ({
    type: types.POST_USER_ROLE_FAILURE,
    payload: data
})


// GET ROLE 
export const getUserRole = (data) => ({
    type: types.GET_USER_ROLE,
    payload: data
})

export const getUserRoleSuccess = (data) => ({
    type: types.GET_USER_ROLE_SUCCESS,
    payload: data
})

export const getUserRoleFailure = (data) => ({
    type: types.GET_USER_ROLE_FAILURE,
    payload: data
})


// PATCH ROLE 
export const patchUserRole = (data) => ({
    type: types.PATCH_USER_ROLE,
    payload: data
})

export const patchUserRoleSuccess = (data) => ({
    type: types.PATCH_USER_ROLE_SUCCESS,
    payload: data
})

export const patchUserRoleFailure = (data) => ({
    type: types.PATCH_USER_ROLE_FAILURE,
    payload: data
})


// DELETE ROLE 
export const deleteUserRole = (data) => ({
    type: types.DELETE_USER_ROLE,
    payload: data
})

export const deleteUserRoleSuccess = (data) => ({
    type: types.DELETE_USER_ROLE_SUCCESS,
    payload: data
})

export const deleteUserRoleFailure = (data) => ({
    type: types.DELETE_USER_ROLE_FAILURE,
    payload: data
})