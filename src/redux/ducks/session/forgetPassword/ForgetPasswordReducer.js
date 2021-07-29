/**
 * Auth User Reducers
 */
import { NotificationManager } from "react-notifications";
import * as types from "./ForgetPasswordTypes";

/**
 * initial auth user
 */
const INIT_STATE = {
  loading: false,
  error: ""
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    /**
     * Resent Verificaiton Email
     */
    case types.LOGIN_USER_RESENT_EMAIL:
      return { ...state, loading: false };

    case types.LOGIN_USER_RESENT_EMAIL_SUCCESS:
      NotificationManager.success(
        "A verification email has been sent, please check in your inbox"
      );
      return { ...state, loading: false, error: "" };

    case types.LOGIN_USER_RESENT_EMAIL_FAILURE:
      NotificationManager.error(
        "Unable to send verification email, please contact your admin"
      );
      return { ...state, loading: false, error: "" };

    /**
     * Resent Verificaiton Password
     */
    case types.LOGIN_USER_RESET_PASSWORD:
      return { ...state, loading: false };

    case types.LOGIN_USER_RESET_PASSWORD_SUCCESS:
      NotificationManager.success(
        "A reset password email has been sent, please check in your inbox"
      );
      return { ...state, loading: false, error: "" };

    case types.LOGIN_USER_RESET_PASSWORD_FAILURE:
      NotificationManager.error(action.payload);
      return { ...state, loading: false, error: "" };

    case types.LOGIN_USER_RESENT_EMAIL_SUCCESS:
      NotificationManager.success(
        "A verification email has been sent, please check in your inbox"
      );
      return { ...state, loading: false, error: "" };

    case types.LOGIN_USER_RESENT_EMAIL_FAILURE:
      NotificationManager.error(
        "Unable to send verification email, please contact your admin"
      );
      return { ...state, loading: false, error: "" };

    default:
      return { ...state };
  }
};
