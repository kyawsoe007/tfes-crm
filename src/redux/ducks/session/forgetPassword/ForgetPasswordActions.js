import * as types from "./ForgetPasswordTypes";
/**
 * User resent verification email
 */
export const userResentEmail = user => ({
  type: types.LOGIN_USER_RESENT_EMAIL,
  payload: { user }
});
export const userResentEmailSuccess = () => ({
  type: types.LOGIN_USER_RESENT_EMAIL_SUCCESS
});
export const userResentEmailFailure = () => ({
  type: types.LOGIN_USER_RESENT_EMAIL_FAILURE
});

/**
 * Reset Password
 */
export const userResetPassword = email => ({
  type: types.LOGIN_USER_RESET_PASSWORD,
  payload: { email }
});
export const userResetPasswordSuccess = () => ({
  type: types.LOGIN_USER_RESET_PASSWORD_SUCCESS
});
export const userResetPasswordFailure = error => ({
  type: types.LOGIN_USER_RESET_PASSWORD_FAILURE,
  payload: error
});
