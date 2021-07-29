import *as types from "./GeneratingReportTypes";
import {NotificationManager} from "react-notifications";

const INIT_STATE = {
  // GeneralPdfCreate: {
  //   loading: false,
  //   data: {}
  // },

};


export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case types.GET_GENERATING_REPORT:
      return {
        ...state,
        loading: true
      }

    case types.GET_GENERATING_REPORT_SUCCESS:
      return {
        ...state,
        loading: false
      }

    case types.GET_GENERATING_REPORT_FAILURE:
      return {
        ...state,
        loading: false
      }

    default:
      return { ...state };
  }
};
