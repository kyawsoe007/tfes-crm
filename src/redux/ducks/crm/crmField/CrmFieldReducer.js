import { NotificationManager } from "react-notifications";
import {
  GET_CRM_FIELDS_FAILURE,
  GET_LEAD_SOURCE_SUCCESS,
  GET_LEAD_STATUS_SUCCESS,
  GET_INDUSTRY_SUCCESS,
  GET_LEAD_INTEREST_SUCCESS,
  GET_DEAL_TYPE_SUCCESS,
  GET_DEAL_STAGE_SUCCESS
} from "./CrmFieldTypes";

const INIT_STATE = {
  leadSource: [],
  leadStatus: [],
  industry: [],
  leadInterest: [],
  dealType: [],
  dealStage: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CRM_FIELDS_FAILURE:
      NotificationManager.warning("Error in Fetching Fields");
      console.log(action.payload);
      return { ...state };

    /**
     * Lead source
     */
    case GET_LEAD_SOURCE_SUCCESS:
      return { ...state, leadSource: action.payload };
    /**
     * Lead Status
     */
    case GET_LEAD_STATUS_SUCCESS:
      return { ...state, leadStatus: action.payload };
    /**
     * Industry
     */
    case GET_INDUSTRY_SUCCESS:
      return { ...state, industry: action.payload };
    /**
     * Lead Interest
     */
    case GET_LEAD_INTEREST_SUCCESS:
      return { ...state, leadInterest: action.payload };
    /**
     * Deal Type
     */
    case GET_DEAL_TYPE_SUCCESS:
      return { ...state, dealType: action.payload };
    /**
     * Deal Stage
     */
    case GET_DEAL_STAGE_SUCCESS:
      return { ...state, dealStage: action.payload };

    default:
      return { ...state };
  }
};
