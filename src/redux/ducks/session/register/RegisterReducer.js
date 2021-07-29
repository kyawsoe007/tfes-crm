import { NotificationManager } from "react-notifications";
import * as types from "./RegisterTypes";

/**
 * initial auth user
 */
const INIT_STATE = {
  form: {
    email: "",
    password: "",
    repassword: undefined,
    priceplan: "",
    userInfo: { firstName: "", lastName: "" },
    companyInfo: { name: "" },
    paymentInfo: {
      name: "",
      payment_name: "",
      paymentType: "CreditCard",
      payment_no: "",
      payment_username: "",
      payment_company: "",
      payment_expiry: "",
      payment_code: ""
    }
  },
  loading: false,
  success: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    /**
     * Register
     */
    case types.SIGNUP_USER:
      return { ...state, loading: true };
    case types.SIGNUP_USER_SUCCESS:
      NotificationManager.success("Accout Created");
      return { ...state, loading: false, success: true };

    case types.SIGNUP_USER_FAILURE:
      NotificationManager.error(action.payload);
      return { ...state, loading: false };
    /**
     * Reset Success
     */
    case types.HANDLE_RESET_SUCCESS:
      return INIT_STATE;

    /**
     * Handle Change
     */
    case types.HANDLE_REGISTER_FORM:
      if (action.payload.type == "userInfo")
        return {
          ...state,
          form: {
            ...state.form,
            userInfo: {
              ...state.form.userInfo,
              [action.payload.field]: action.payload.value
            }
          }
        };
      else if (action.payload.type == "companyInfo")
        return {
          ...state,
          form: {
            ...state.form,
            companyInfo: {
              ...state.form.companyInfo,
              [action.payload.field]: action.payload.value
            }
          }
        };
      else if (action.payload.type == "paymentInfo")
        return {
          ...state,
          form: {
            ...state.form,
            paymentInfo: {
              ...state.form.paymentInfo,
              [action.payload.field]: action.payload.value
            }
          }
        };
      else
        return {
          ...state,
          form: {
            ...state.form,
            [action.payload.field]: action.payload.value
          }
        };

    case types.HANDLE_REGISTER_ERROR:
      NotificationManager.error(action.payload);
      return { ...state, loading: false };

    case types.HANDLE_REGISTER_SUCCESS:
      NotificationManager.success(action.payload);
      return { ...state, loading: false };

    case types.HANDLE_REGISTER_WARNING:
      NotificationManager.warning(action.payload);
      return { ...state, loading: false };

    default:
      return { ...state };
  }
};
