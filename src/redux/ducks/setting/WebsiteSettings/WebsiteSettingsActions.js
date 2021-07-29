/**
 * Website Settings Actions
 */
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

/**
 * GET Interest Rate
 */
export const getInterestRate = () => ({
  type: GET_INTEREST_RATE
});
export const getInterestRateSuccess = data => ({
  type: GET_INTEREST_RATE_SUCCESS,
  payload: data
});
export const getInterestRateFailure = err => ({
  type: GET_INTEREST_RATE_FAILURE,
  payload: err
});

/**
 * UPDATE Interest Rate
 */
export const updateInterestRate = data => ({
  type: UPDATE_INTEREST_RATE,
  payload: data
});
export const updateInterestRateSuccess = data => ({
  type: UPDATE_INTEREST_RATE_SUCCESS,
  payload: data
});
export const updateInterestRateFailure = err => ({
  type: UPDATE_INTEREST_RATE_FAILURE,
  payload: err
});

/**
 * ADD Interest Rate
 */
export const addInterestRate = data => ({
  type: ADD_INTEREST_RATE,
  payload: data
});
export const addInterestRateSuccess = data => ({
  type: ADD_INTEREST_RATE_SUCCESS,
  payload: data
});
export const addInterestRateFailure = err => ({
  type: ADD_INTEREST_RATE_FAILURE,
  payload: err
});
