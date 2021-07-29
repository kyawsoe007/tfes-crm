import * as types from "./AccountTypes";

/**
 * Change List View
 */
export const changeAccountView = newValue => ({
  type: types.CHANGE_ACCOUNT_LIST_VIEW,
  payload: newValue
});

/**
 * Get ACCOUNT Failure
 */
export const getAccountFailure = error => ({
  type: types.GET_ACCOUNT_FAILURE,
  payload: error
});

/**
 * Get ACCOUNT Success
 */
export const getAccountSuccess = data => ({
  type: types.GET_ACCOUNT_SUCCESS,
  payload: data
});

/**
 * Get All ACCOUNTs
 */
export const getAllAccount = () => ({
  type: types.GET_ALL_ACCOUNT
});

/**
 * Get My ACCOUNTs
 */
export const getMyAccount = () => ({
  type: types.GET_MY_ACCOUNT
});

/**
 * Get Open ACCOUNTs
 */
export const getOpenAccount = () => ({
  type: types.GET_OPEN_ACCOUNT
});

/**
 * Get Single Account
 */
export const getSingleAccount = acctID => ({
  type: types.GET_SINGLE_ACCOUNT,
  payload: acctID
});
export const getSingleAccountSuccess = acctData => ({
  type: types.GET_SINGLE_ACCOUNT_SUCCESS,
  payload: acctData
});
export const clearSingleAccount = () => ({
  type: types.CLEAR_SINGLE_ACCOUNT
});

/**
 * New Account
 */
export const newAccount = (form, redirect, history) => ({
  type: types.NEW_ACCOUNT,
  payload: { form, redirect, history }
});
export const newAccountSuccess = data => ({
  type: types.NEW_ACCOUNT_SUCCESS,
  payload: data
});
export const newAccountFailure = error => ({
  type: types.NEW_ACCOUNT_FAILURE,
  payload: error
});

/**
 * Edit
 */
export const editAccount = form => ({
  type: types.EDIT_ACCOUNT,
  payload: form
});
export const editAccountSuccess = data => ({
  type: types.EDIT_ACCOUNT_SUCCESS,
  payload: data
});
export const editAccountFailure = error => ({
  type: types.EDIT_ACCOUNT_FAILURE,
  payload: error
});

/**
 * Form Fields
 */
export const getAccountFormFields = () => ({
  type: types.GET_ACCOUNT_FORM_FIELDS
});
export const getAccountFormSuccess = fields => ({
  type: types.GET_ACCOUNT_FORM_SUCCESS,
  payload: fields
});
export const getAccountFormFailure = error => ({
  type: types.GET_ACCOUNT_FORM_FAILURE,
  payload: error
});

/**
 * Delete
 */
export const deleteAccount = id => ({
  type: types.DELETE_ACCOUNT,
  payload: id
});
export const deleteAccountSuccess = id => ({
  type: types.DELETE_ACCOUNT_SUCCESS,
  payload: id
});
export const deleteAccountFailure = error => ({
  type: types.DELETE_ACCOUNT_FAILURE,
  payload: error
});

/**
 * Notes
 */
export const addNoteAccount = (id, note) => ({
  type: types.ADD_NOTE_ACCOUNT,
  payload: { id, note }
});
export const addNoteAccountSuccess = data => ({
  type: types.ADD_NOTE_ACCOUNT_SUCCESS,
  payload: data
});
export const addNoteAccountFailure = error => ({
  type: types.ADD_NOTE_ACCOUNT_FAILURE,
  payload: error
});

/**
 * Set Active
 */
export const setAccountActive = (id, status) => ({
  type: types.SET_ACCOUNT_ACTIVE,
  payload: { id, status }
});
export const setAccountActiveSuccess = data => ({
  type: types.SET_ACCOUNT_ACTIVE_SUCCESS,
  payload: data
});
export const setAccountActiveFailure = error => ({
  type: types.SET_ACCOUNT_ACTIVE_FAILURE,
  payload: error
});

/**
 * Transfer
 */
export const transferAccount = (id, newOwner, history) => ({
  type: types.TRANSFER_ACCOUNT,
  payload: { id, newOwner, history }
});
export const transferAccountSuccess = data => ({
  type: types.TRANSFER_ACCOUNT_SUCCESS,
  payload: data
});
export const transferAccountFailure = error => ({
  type: types.TRANSFER_ACCOUNT_FAILURE,
  payload: error
});

/**
 * Event
 */
export const addAccountEvent = data => ({
  type: types.ADD_ACCOUNT_EVENT,
  payload: data
});
