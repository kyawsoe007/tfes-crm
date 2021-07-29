import { NotificationManager } from "react-notifications";
import * as types from "./FollowupTypes";

const INIT_STATE = {
  followupResult: [],
  followupType: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    /**
     * Get follow up result
     */
    case types.GET_FOLLOWUP_RESULT_SUCCESS:
      return { ...state, followupResult: action.payload };
    case types.GET_FOLLOWUP_RESULT_FAILURE:
      NotificationManager.warning("Error retrieving follow-up results");
      return { ...state };

    /**
     * Get follow up type
     */
    case types.GET_FOLLOWUP_TYPE_SUCCESS:
      return { ...state, followupType: action.payload };
    case types.GET_FOLLOWUP_TYPE_FAILURE:
      NotificationManager.warning("Error retrieving follow-up type");
      return { ...state };

    /**
     * post/delete follow up
     */

    case types.DELETE_FOLLOWUP_FAILURE:
    case types.NEW_FOLLOWUP_FAILURE:
    case types.EDIT_FOLLOWUP_FAILURE:
      NotificationManager.warning("Error with follow-up");
      return { ...state };

    default:
      return { ...state };
  }
};
