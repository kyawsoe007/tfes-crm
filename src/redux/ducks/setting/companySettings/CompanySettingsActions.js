/**
 * Users Actions
 */
import {
  GET_COMPANY,
  GET_COMPANY_SUCCESS,
  GET_COMPANY_FAILURE,
  ON_CHANGE_UPDATE_COMPANY,
  UPDATE_COMPANY,
  UPDATE_COMPANY_SUCCESS,
  UPDATE_COMPANY_FAILURE
} from "./CompanySettingsTypes";

/**
 * GET Company
 */
export const getCompany = () => ({
  type: GET_COMPANY
});
export const getCompanySuccess = company => ({
  type: GET_COMPANY_SUCCESS,
  payload: company
});
export const getCompanyFailure = err => ({
  type: GET_COMPANY_FAILURE,
  payload: err
});

/**
 * UPDATE Company
 */
export const updateCompanyStart = () => ({
  type: UPDATE_COMPANY_START
});
export const onChangeUpdateCompany = (field, value) => ({
  type: ON_CHANGE_UPDATE_COMPANY,
  payload: { field, value }
});
export const updateCompany = () => ({
  type: UPDATE_COMPANY
});
export const updateCompanySuccess = company => ({
  type: UPDATE_COMPANY_SUCCESS,
  payload: company
});
export const updateCompanyFailure = err => ({
  type: UPDATE_COMPANY_FAILURE,
  payload: err
});
