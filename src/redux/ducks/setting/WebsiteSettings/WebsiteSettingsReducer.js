/**
 * Users Reducers
 */
import { NotificationManager } from "react-notifications";
import {
  GET_INTEREST_RATE,
  GET_INTEREST_RATE_SUCCESS,
  GET_INTEREST_RATE_FAILURE,
  UPDATE_INTEREST_RATE,
  UPDATE_INTEREST_RATE_SUCCESS,
  UPDATE_INTEREST_RATE_FAILURE,
  ADD_INTEREST_RATE,
  ADD_INTEREST_RATE_SUCCESS,
  ADD_INTEREST_RATE_FAILURE
} from "./WebsiteSettingsTypes";

const INIT_STATE = {
  loading: false,
  interestRate: 0
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    /**
     * GET Interest Rate
     */
    case GET_INTEREST_RATE:
      return {
        ...state,
        loading: true
      };

    case GET_INTEREST_RATE_SUCCESS:
      // console.log("success ah");
      if (!!action.payload[0] == false) {
        return {
          loading: false,
          interestRate: {}
        };
      }
      return {
        loading: false,
        interestRate: action.payload[0]
      };

    case GET_INTEREST_RATE_FAILURE:
      NotificationManager.error("An error occurred");
      return {
        ...state,
        loading: false
      };

    /**
     * UPDATE Interest Rate
     */
    case UPDATE_INTEREST_RATE:
      return {
        ...state,
        loading: true
      };
    case UPDATE_INTEREST_RATE_SUCCESS:
      NotificationManager.success("Interest rate updated");
      return {
        ...state,
        loading: false,
        interestRate: action.payload
      };
    case UPDATE_INTEREST_RATE_FAILURE:
      NotificationManager.error("An error occurred");
      return {
        ...state,
        loading: false
      };

    /**
     * ADD Interest Rate
     */
    case ADD_INTEREST_RATE:
      return {
        ...state,
        loading: true
      };
    case ADD_INTEREST_RATE_SUCCESS:
      NotificationManager.success("Interest rate added");
      return {
        ...state,
        loading: false,
        interestRate: action.payload
      };
    case ADD_INTEREST_RATE_FAILURE:
      NotificationManager.error("An error occurred");
      return {
        ...state,
        loading: false
      };

    default:
      return { ...state };
  }
};
