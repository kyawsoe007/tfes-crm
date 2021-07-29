/**
 * Users Reducers
 */
import { NotificationManager } from "react-notifications";
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
  DELETE_EMAIL_SETTINGS_FAILURE,

} from "./EmailSettingsTypes";

const INIT_STATE = {
  loading: false,
  tableData: [],
};

export default (state = INIT_STATE, action) => {

  switch (action.type) {
 
    /**
     * GET Interest Rate
     */
    case  GET_EMAIL_SETTINGS:
      return {
        ...state,
        loading: true
      };

    case  GET_EMAIL_SETTINGS_SUCCESS:
      // console.log("success ah");

      return {
        loading: false,
        tableData: action.payload
      };

    case GET_EMAIL_SETTINGS_FAILURE:
      NotificationManager.error("Error Retreiving Email Settings !");
      return {
        ...state,
        loading: false
      };
        /**
     * SET EMAIL
     */
    case SET_EMAIL_SETTINGS:
      return {
        ...state,
        loading: true
      };

    case  SET_EMAIL_SETTINGS_SUCCESS:
      // console.log("success ah");
      NotificationManager.success("Email Settings Updated!");
      return {
        loading: false,
        tableData: [...state.tableData, action.payload]
      };

    case SET_EMAIL_SETTINGS_FAILURE:
      NotificationManager.error("Error Retreiving Email Settings !");
      return {
        ...state,
        loading: false
      };

    /**
     * UPDATE Interest Rate
     */
    case UPDATE_EMAIL_SETTINGS:
      return {
        ...state,
        loading: true
      };
    case UPDATE_EMAIL_SETTINGS_SUCCESS:
      NotificationManager.success("Email Settings Updated!");
      return {
        ...state,
        loading: false,
        // tableData: [...state.tableData,action.payload]
        tableData: action.payload 
      }
    case UPDATE_EMAIL_SETTINGS_FAILURE:
      NotificationManager.error("An error occurred updating Email Settings");
      return {
        ...state,
        loading: false
      };
      case DELETE_EMAIL_SETTINGS:
        return {
          ...state,
          loading: true
        };
      case DELETE_EMAIL_SETTINGS_SUCCESS:
        NotificationManager.success("Email Settings Deleted!");
        return {
          ...state,
          loading: false,
          // tableData: [...state.tableData,action.payload]
          tableData: action.payload 
        }
      case DELETE_EMAIL_SETTINGS_FAILURE:
        NotificationManager.error("An error occurred deleting Email Settings");
        return {
          ...state,
          loading: false
        };

    // /**
    //  * ADD Interest Rate
    //  */
    // case ADD_INTEREST_RATE:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case ADD_INTEREST_RATE_SUCCESS:
    //   NotificationManager.success("Interest rate added");
    //   return {
    //     ...state,
    //     loading: false,
    //     interestRate: action.payload
    //   };
    // case ADD_INTEREST_RATE_FAILURE:
    //   NotificationManager.error("An error occurred");
    //   return {
    //     ...state,
    //     loading: false
    //   };

    default:
      return { ...state };
  }
};
