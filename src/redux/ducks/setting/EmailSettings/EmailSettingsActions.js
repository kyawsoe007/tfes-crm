/**
 * Website Settings Actions
 */
import {
  GET_EMAIL_SETTINGS,
  GET_EMAIL_SETTINGS_SUCCESS,
  GET_EMAIL_SETTINGS_FAILURE,
  SET_EMAIL_SETTINGS,
  SET_EMAIL_SETTINGS_SUCCESS,
  SET_EMAIL_SETTINGS_FAILURE,
  UPDATE_EMAIL_SETTINGS,
  UPDATE_EMAIL_SETTINGS_SUCCESS,
  UPDATE_EMAIL_SETTINGS_FAILURE,
  DELETE_EMAIL_SETTINGS,
  DELETE_EMAIL_SETTINGS_SUCCESS,
  DELETE_EMAIL_SETTINGS_FAILURE

} from "./EmailSettingsTypes";

/**
 * GET EMAIL SETTINGS
 */
export const getEmailSettings = () => ({
  type: GET_EMAIL_SETTINGS
});
export const getEmailSettingsSuccess = data => ({
  type: GET_EMAIL_SETTINGS_SUCCESS,
  payload: data
});
export const getEmailSettingsFailure = err => ({
  type: GET_EMAIL_SETTINGS_FAILURE,
  payload: err
});

/**
 * SET EMAIL SETTINGS
 */
export const setEmailSettings = data => ({
  type:  SET_EMAIL_SETTINGS,
  payload: data
});
export const setEmailSettingsSuccess = data => ({
  type:  SET_EMAIL_SETTINGS_SUCCESS,
  payload: data
});
export const setEmailSettingsFailure = err => ({
  type:  SET_EMAIL_SETTINGS_FAILURE,
  payload: err
});


/**
 * SET EMAIL SETTINGS
 */
export const updateEmailSettings = data => ({
  type:  UPDATE_EMAIL_SETTINGS,
  payload: data
});
export const updateEmailSettingsSuccess = data => ({
  type:   UPDATE_EMAIL_SETTINGS_SUCCESS,
  payload: data
});
export const updateEmailSettingsFailure = err => ({
  type:   UPDATE_EMAIL_SETTINGS_FAILURE,
  payload: err
});

//
/**
 * DELETE EMAIL SETTINGS
 */
export const deleteEmailSettings = data => ({
  
  type:  DELETE_EMAIL_SETTINGS,
  payload: data
});
export const deleteEmailSettingsSuccess = data => ({
  type:  DELETE_EMAIL_SETTINGS_SUCCESS,
  payload: data
});
export const deleteEmailSettingsFailure = err => ({
  type:   DELETE_EMAIL_SETTINGS_FAILURE,
  payload: err
});

