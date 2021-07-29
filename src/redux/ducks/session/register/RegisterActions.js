import {
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE,
  HANDLE_REGISTER_FORM,
  HANDLE_REGISTER_ERROR,
  HANDLE_REGISTER_SUCCESS,
  HANDLE_REGISTER_WARNING,
  HANDLE_RESET_SUCCESS
} from "./RegisterTypes";

export const registerUser = () => ({
  type: SIGNUP_USER
});
export const registerUserSuccess = (success, msg) => ({
  type: SIGNUP_USER_SUCCESS,
  payload: { success, msg }
});
export const registerUserFailure = error => ({
  type: SIGNUP_USER_FAILURE,
  payload: error
});

export const handleRegForm = (field, value, type) => ({
  type: HANDLE_REGISTER_FORM,
  payload: { field, value, type }
});

export const handleRegErrorForm = value => ({
  type: HANDLE_REGISTER_ERROR,
  payload: value
});

export const handleRegSuccessForm = value => ({
  type: HANDLE_REGISTER_SUCCESS,
  payload: value
});

export const handleRegWarningForm = value => ({
  type: HANDLE_REGISTER_WARNING,
  payload: value
});

export const resetSuccess = () => ({
  type: HANDLE_RESET_SUCCESS
});
