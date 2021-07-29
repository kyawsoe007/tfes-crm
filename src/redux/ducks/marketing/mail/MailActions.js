import * as types from "./MailTypes";

/**
 * Get All Mailing List
 */
export const getAllMailingList = () => ({
  type: types.GET_ALL_MAILING_LIST
});
export const getAllMailingListSuccess = data => ({
  type: types.GET_ALL_MAILING_LIST_SUCCESS,
  payload: data
});
export const getAllMailingListFailure = error => ({
  type: types.GET_ALL_MAILING_LIST_FAILURE,
  payload: error
});
/**
 * Get All Mailing List
 */
export const getAllAdminMailingList = () => ({
  type: types.GET_ALL_ADMIN_MAILING_LIST
});
export const getAllAdminMailingListSuccess = data => ({
  type: types.GET_ALL_ADMIN_MAILING_LIST_SUCCESS,
  payload: data
});
export const getAllAdminMailingListFailure = error => ({
  type: types.GET_ALL_ADMIN_MAILING_LIST_FAILURE,
  payload: error
});

/**
 * Get Contacts in Mailing List
 */
export const getMailingList = data => ({
  type: types.GET_MAILING_LIST,
  payload: data
});
export const getMailingListSuccess = data => ({
  type: types.GET_MAILING_LIST_SUCCESS,
  payload: data
});
export const getMailingListFailure = error => ({
  type: types.GET_MAILING_LIST_FAILURE,
  payload: error
});

/**
 * Get All Contacts
 */
export const getContacts = () => ({
  type: types.GET_CONTACTS
});
export const getContactsSuccess = data => ({
  type: types.GET_CONTACTS_SUCCESS,
  payload: data
});
export const getContactsFailure = error => ({
  type: types.GET_CONTACTS_FAILURE,
  payload: error
});

/**
 * Save to Mailing List
 */
export const saveToMailingList = data => ({
  type: types.SAVE_TO_MAILING_LIST,
  payload: data
});
export const saveToMailingListSuccess = data => ({
  type: types.SAVE_TO_MAILING_LIST_SUCCESS,
  payload: data
});
export const saveToMailingListFailure = error => ({
  type: types.SAVE_TO_MAILING_LIST_FAILURE,
  payload: error
});

/**
 * Remove from Mailing List
 */
export const removeFromMailingList = data => ({
  type: types.REMOVE_FROM_MAILING_LIST,
  payload: data
});
export const removeFromMailingListSuccess = data => ({
  type: types.REMOVE_FROM_MAILING_LIST_SUCCESS,
  payload: data
});
export const removeFromMailingListFailure = error => ({
  type: types.REMOVE_FROM_MAILING_LIST_FAILURE,
  payload: error
});

/**
 * Create Mailing List
 */
export const createMailingList = data => ({
  type: types.CREATE_MAILING_LIST,
  payload: data
});
export const createMailingListSuccess = data => ({
  type: types.CREATE_MAILING_LIST_SUCCESS,
  payload: data
});
export const createMailingListFailure = error => ({
  type: types.CREATE_MAILING_LIST_FAILURE,
  payload: error
});

/**
 * Update Mailing List
 */

export const updateMailingList = data => ({
  type: types.UPDATE_MAILING_LIST,
  payload: data
});
export const updateMailingListSuccess = data => ({
  type: types.UPDATE_MAILING_LIST_SUCCESS,
  payload: data
});
export const updateMailingListFailure = error => ({
  type: types.UPDATE_MAILING_LIST_FAILURE,
  payload: error
});

/**
 * Delete Mailing List
 */
export const deleteMailingList = data => ({
  type: types.DELETE_MAILING_LIST,
  payload: data
});
export const deleteMailingListSuccess = data => ({
  type: types.DELETE_MAILING_LIST_SUCCESS,
  payload: data
});
export const deleteMailingListFailure = error => ({
  type: types.DELETE_MAILING_LIST_FAILURE,
  payload: error
});
