import * as types from "./LeadTypes";

/**
 * Change List View
 */
export const changeLeadView = newValue => ({
  type: types.CHANGE_LEAD_LIST_VIEW,
  payload: newValue
});

/**
 * Get Lead Failure
 */
export const getLeadFailure = error => ({
  type: types.GET_LEAD_FAILURE,
  payload: error
});

/**
 * Get Lead Success
 */
export const getLeadSuccess = data => ({
  type: types.GET_LEAD_SUCCESS,
  payload: data
});

/**
 * Get All Leads
 */
export const getAllLead = () => ({
  type: types.GET_ALL_LEAD
});

/**
 * Get My Leads
 */
export const getMyLead = () => ({
  type: types.GET_MY_LEAD
});

/**
 * Get Open Leads
 */
export const getOpenLead = () => ({
  type: types.GET_OPEN_LEAD
});

/**
 * Get Hot Leads
 */
export const getHotLead = () => ({
  type: types.GET_HOT_LEAD
});

/**
 * Get Cold Leads
 */
export const getColdLead = () => ({
  type: types.GET_COLD_LEAD
});

/**
 * Get Single Lead
 */
export const getSingleLead = leadID => ({
  type: types.GET_SINGLE_LEAD,
  payload: leadID
});
export const getSingleLeadSuccess = leadData => ({
  type: types.GET_SINGLE_LEAD_SUCCESS,
  payload: leadData
});
export const clearSingleLead = () => ({
  type: types.CLEAR_SINGLE_LEAD
});

/**
 * Get Lead Summary
 */
export const getLeadSummary = () => ({
  type: types.GET_LEAD_SUMMARY
});
export const getLeadSummarySuccess = data => ({
  type: types.GET_LEAD_SUMMARY_SUCCESS,
  payload: data
});
export const getLeadSummaryFailure = error => ({
  type: types.GET_LEAD_SUMMARY_FAILURE,
  payload: error
});

/**
 * New Lead
 */
export const newLead = (form, redirect, history) => ({
  type: types.NEW_LEAD,
  payload: { form, redirect, history }
});
export const newLeadSuccess = lead => ({
  type: types.NEW_LEAD_SUCCESS,
  payload: lead
});
export const newLeadFailure = error => ({
  type: types.NEW_LEAD_FAILURE,
  payload: error
});

/**
 * Edit
 */
export const editLead = form => ({
  type: types.EDIT_LEAD,
  payload: form
});
export const editLeadSuccess = data => ({
  type: types.EDIT_LEAD_SUCCESS,
  payload: data
});
export const editLeadFailure = error => ({
  type: types.EDIT_LEAD_FAILURE,
  payload: error
});

/**
 * Fields
 */
export const getLeadFormFields = () => ({
  type: types.GET_LEADFORM_FIELDS
});
export const getLeadFormFieldsSuccess = fields => ({
  type: types.GET_LEADFORM_FIELDS_SUCCESS,
  payload: fields
});
export const getLeadFormFieldsFailure = error => ({
  type: types.GET_LEADFORM_FIELDS_FAILURE,
  payload: error
});

/**
 * Convert Lead
 */
export const checkAccountExist = companyName => ({
  type: types.CHECK_ACCOUNT_EXIST,
  payload: companyName
});
export const checkAccountExistSuccess = (count, existingAccounts) => ({
  type: types.CHECK_ACCOUNT_EXIST_SUCCESS,
  payload: { count, existingAccounts }
});
export const checkAccountExistFailure = error => ({
  type: types.CHECK_ACCOUNT_EXIST_FAILURE,
  payload: error
});
export const convertLead = (id, dealDetails, accountId) => ({
  type: types.CONVERT_LEAD,
  payload: { id, dealDetails, accountId }
});
export const convertLeadSuccess = data => ({
  type: types.CONVERT_LEAD_SUCCESS,
  payload: data
});
export const convertLeadFailure = error => ({
  type: types.CONVERT_LEAD_FAILURE,
  payload: error
});
export const handleConvertModal = () => ({
  type: types.HANDLE_CONVERT_MODAL
});
export const handleSuccessConvertModal = () => ({
  type: types.HANDLE_SUCCESS_CONVERT_MODAL
});

/**
 * Delete
 */
export const deleteLead = id => ({
  type: types.DELETE_LEAD,
  payload: id
});
export const deleteLeadSuccess = id => ({
  type: types.DELETE_LEAD_SUCCESS,
  payload: id
});
export const deleteLeadFailure = error => ({
  type: types.DELETE_LEAD_FAILURE,
  payload: error
});

/**
 * Notes
 */
export const addNoteLead = (id, note) => ({
  type: types.ADD_NOTE_LEAD,
  payload: { id, note }
});
export const addNoteLeadSuccess = data => ({
  type: types.ADD_NOTE_LEAD_SUCCESS,
  payload: data
});
export const addNoteLeadFailure = error => ({
  type: types.ADD_NOTE_LEAD_FAILURE,
  payload: error
});

/**
 * Transfer
 */
export const transferLead = (id, newOwner, history) => ({
  type: types.TRANSFER_LEAD,
  payload: { id, newOwner, history }
});
export const transferLeadSuccess = data => ({
  type: types.TRANSFER_LEAD_SUCCESS,
  payload: data
});
export const transferLeadFailure = error => ({
  type: types.TRANSFER_LEAD_FAILURE,
  payload: error
});

/**
 * Events
 */
export const addLeadEvent = data => ({
  type: types.ADD_LEAD_EVENT,
  payload: data
});
