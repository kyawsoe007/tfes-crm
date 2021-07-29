/**
 * User Management Actions
 */
import {
  GET_ALL_USERS,
  GET_ALL_USERS_SUCCESS,
  ON_CHANGE_ADD_USER,
  ADD_USER,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
  UPDATE_USER_START,
  ON_CHANGE_UPDATE_USER,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  ON_CHANGE_UPDATE_USER_RIGHTS,
  UPDATE_USER_RIGHTS,
  UPDATE_USER_RIGHTS_SUCCESS,
  GET_USER_FAILURE
} from "./UserManagementTypes";

/**
 * GET All Users
 */
export const getAllUsers = () => ({
  type: GET_ALL_USERS
});
export const getAllUsersSuccess = (users, settings, groups) => ({
  type: GET_ALL_USERS_SUCCESS,
  payload: { users: users, settings: settings, accessGroups: groups }
});

/**
 * ADD User
 */
export const onChangeAddUser = (field, value) => ({
  type: ON_CHANGE_ADD_USER,
  payload: { field, value }
});
export const addUser = data => ({
  type: ADD_USER,
  payload: data
});
export const addUserSuccess = user => ({
  type: ADD_USER_SUCCESS,
  payload: user
});
export const addUserFailure = err => ({
  type: ADD_USER_FAILURE,
  payload: err
});

/**
 * UPDATE User
 */
export const updateUserStart = user => ({
  type: UPDATE_USER_START,
  payload: user
});
export const onChangeUpdateUser = (field, value) => ({
  type: ON_CHANGE_UPDATE_USER,
  payload: { field, value }
});
export const updateUser = data => ({
  type: UPDATE_USER,
  payload: data
});
export const updateUserSuccess = user => ({
  type: UPDATE_USER_SUCCESS,
  payload: user
});
export const updateUserFailure = err => ({
  type: UPDATE_USER_FAILURE,
  payload: err
});
export const onChangeUpdateUserRights = rights => ({
  type: ON_CHANGE_UPDATE_USER_RIGHTS,
  payload: rights
});
export const updateUserRights = () => ({
  type: UPDATE_USER_RIGHTS
});
export const updateUserRightsSuccess = userRights => ({
  type: UPDATE_USER_RIGHTS_SUCCESS,
  payload: userRights
});

/**
 * GET User Failure
 */
export const getUserFailure = err => ({
  type: GET_USER_FAILURE,
  payload: err
});
