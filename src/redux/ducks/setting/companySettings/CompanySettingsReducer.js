/**
 * Company Reducers
 */
import { NotificationManager } from "react-notifications";
import {
  GET_COMPANY,
  GET_COMPANY_SUCCESS,
  GET_COMPANY_FAILURE,
  ON_CHANGE_UPDATE_COMPANY,
  UPDATE_COMPANY,
  UPDATE_COMPANY_SUCCESS,
  UPDATE_COMPANY_FAILURE
} from "./CompanySettingsTypes";

const INIT_STATE = {
  company: {},
  companyLoading: false,
  companyUpdate: null
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    /**
     * GET Company
     */
    case GET_COMPANY:
      return {
        ...state,
        companyLoading: true
      };
    case GET_COMPANY_SUCCESS:
      return {
        ...state,
        companyLoading: false,
        company: action.payload,
        companyUpdate: action.payload
      };
    case GET_COMPANY_FAILURE:
      NotificationManager.warning("Error in fetching Company Data");
      return INIT_STATE;

    /**
     * UPDATE Company
     */
    case ON_CHANGE_UPDATE_COMPANY:
      return {
        ...state,
        companyUpdate: {
          ...state.companyUpdate,
          [action.payload.field]: action.payload.value
        }
      };
    case UPDATE_COMPANY:
      return {
        ...state,
        companyLoading: true
      };
    case UPDATE_COMPANY_SUCCESS:
      NotificationManager.success("Company Updated");
      return {
        ...state,
        companyLoading: false,
        company: action.payload,
        companyUpdate: action.payload
      };
    case UPDATE_COMPANY_FAILURE:
      NotificationManager.error("Failed to Update Company");
      return {
        ...state,
        companyLoading: false
      };

    default:
      return { ...state };
  }
};
