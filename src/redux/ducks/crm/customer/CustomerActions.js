import * as types from "./CustomerTypes";

/**
 * Get CUSTOMER Failure
 */
export const getCustomerFailure = error => ({
  type: types.GET_CUSTOMER_FAILURE,
  payload: error
});

/**
 * Get CUSTOMER Success
 */
export const getCustomerSuccess = data => ({
  type: types.GET_CUSTOMER_SUCCESS,
  payload: data
});

/**
 * Get All CUSTOMERs
 */
export const getAllCustomer = (limit, skip, filter, searchText, orderBy) => ({
  type: types.GET_ALL_CUSTOMER,
  payload: { limit, skip, filter, searchText, orderBy }
});

/**
 * Get Single Customer
 */
export const getSingleCustomer = custID => ({
  type: types.GET_SINGLE_CUSTOMER,
  payload: custID
});
export const getSingleCustomerSuccess = custData => ({
  type: types.GET_SINGLE_CUSTOMER_SUCCESS,
  payload: custData
});
export const clearSingleCustomer = () => ({
  type: types.CLEAR_SINGLE_CUSTOMER
});

/**
 * New Customer
 */

export const newCustomer = (form, redirect, history) => ({
  type: types.NEW_CUSTOMER,
  payload: { form, redirect, history }
});

export const newCustomerSuccess = data => ({
  type: types.NEW_CUSTOMER_SUCCESS,
  payload: data
});
export const newCustomerFailure = error => ({
  type: types.NEW_CUSTOMER_FAILURE,
  payload: error
});

/**
 * Edit
 */

export const editCustomer = form => ({
  type: types.EDIT_CUSTOMER,
  payload: form
});
export const editCustomerSuccess = data => ({
  type: types.EDIT_CUSTOMER_SUCCESS,
  payload: data
});
export const editCustomerFailure = error => ({
  type: types.EDIT_CUSTOMER_FAILURE,
  payload: error
});

/**
 * Form Fields
 */
export const getCustomerFormFields = () => ({
  type: types.GET_CUSTOMER_FORM_FIELDS
});
export const getCustomerFormSuccess = fields => ({
  type: types.GET_CUSTOMER_FORM_SUCCESS,
  payload: fields
});
export const getCustomerFormFailure = error => ({
  type: types.GET_CUSTOMER_FORM_FAILURE,
  payload: error
});

/**
 * Delete
 */
export const deleteCustomer = id => ({
  type: types.DELETE_CUSTOMER,
  payload: id
});
export const deleteCustomerSuccess = id => ({
  type: types.DELETE_CUSTOMER_SUCCESS,
  payload: id
});
export const deleteCustomerFailure = error => ({
  type: types.DELETE_CUSTOMER_FAILURE,
  payload: error
});

/**
 * Notes
 */
export const addNoteCustomer = (id, note) => ({
  type: types.ADD_NOTE_CUSTOMER,
  payload: { id, note }
});
export const addNoteCustomerSuccess = data => ({
  type: types.ADD_NOTE_CUSTOMER_SUCCESS,
  payload: data
});
export const addNoteCustomerFailure = error => ({
  type: types.ADD_NOTE_CUSTOMER_FAILURE,
  payload: error
});

/**
 * Set Active
 */
export const setCustomerActive = (id, status) => ({
  type: types.SET_CUSTOMER_ACTIVE,
  payload: { id, status }
});
export const setCustomerActiveSuccess = data => ({
  type: types.SET_CUSTOMER_ACTIVE_SUCCESS,
  payload: data
});
export const setCustomerActiveFailure = error => ({
  type: types.SET_CUSTOMER_ACTIVE_FAILURE,
  payload: error
});

/**
 * Transfer
 */
export const transferCustomer = (id, newOwner, history) => ({
  type: types.TRANSFER_CUSTOMER,
  payload: { id, newOwner, history }
});
export const transferCustomerSuccess = data => ({
  type: types.TRANSFER_CUSTOMER_SUCCESS,
  payload: data
});
export const transferCustomerFailure = error => ({
  type: types.TRANSFER_CUSTOMER_FAILURE,
  payload: error
});

/**
 * Event
 */
export const addCustomerEvent = data => ({
  type: types.ADD_CUSTOMER_EVENT,
  payload: data
});
