import * as types from "./FollowupTypes";

/**
 * Get Followup results
 */
export const getFollowupResult = () => ({
  type: types.GET_FOLLOWUP_RESULT
});
export const getFollowupResultSuccess = data => ({
  type: types.GET_FOLLOWUP_RESULT_SUCCESS,
  payload: data
});
export const getFollowupResultFailure = error => ({
  type: types.GET_FOLLOWUP_RESULT_FAILURE,
  payload: error
});

/**
 * Get Followup types
 */
export const getFollowupType = () => ({
  type: types.GET_FOLLOWUP_TYPE
});
export const getFollowupTypeSuccess = data => ({
  type: types.GET_FOLLOWUP_TYPE_SUCCESS,
  payload: data
});
export const getFollowupTypeFailure = error => ({
  type: types.GET_FOLLOWUP_TYPE_FAILURE,
  payload: error
});

/**
 * Create new follow up
 */
export const newFollowUp = data => ({
  type: types.NEW_FOLLOWUP,
  payload: data
});
export const newFollowUpSuccess = data => ({
  type: types.NEW_FOLLOWUP_SUCCESS,
  payload: data
});
export const newFollowUpFailure = error => ({
  type: types.NEW_FOLLOWUP_FAILURE,
  payload: error
});

/**
 * Edit follow up
 */
export const editFollowUp = data => ({
  type: types.EDIT_FOLLOWUP,
  payload: data
});
export const editFollowUpSuccess = data => ({
  type: types.EDIT_FOLLOWUP_SUCCESS,
  payload: data
});
export const editFollowUpFailure = error => ({
  type: types.EDIT_FOLLOWUP_FAILURE,
  payload: error
});

/**
 * Delete follow up
 */
export const deleteFollowUp = id => ({
  type: types.DELETE_FOLLOWUP,
  payload: id
});
export const deleteFollowUpSuccess = id => ({
  type: types.DELETE_FOLLOWUP_SUCCESS,
  payload: id
});
export const deleteFollowUpFailure = error => ({
  type: types.DELETE_FOLLOWUP_FAILURE,
  payload: error
});
