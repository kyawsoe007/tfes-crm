import * as types from "./WidgetTypes";

export const getCrmSummary = () => ({
  type: types.GET_CRM_SUMMARY
});
export const getCrmSummarySuccess = data => ({
  type: types.GET_CRM_SUMMARY_SUCCESS,
  payload: data
});
export const getCrmSummaryFailure = error => ({
  type: types.GET_CRM_SUMMARY_FAILURE,
  payload: error
});

export const getUntouchedLeads = date => ({
  type: types.GET_UNTOUCHED_LEADS,
  payload: date
});
export const getUntouchedLeadsSuccess = data => ({
  type: types.GET_UNTOUCHED_LEADS_SUCCESS,
  payload: data
});
export const getUntouchedLeadsFailure = error => ({
  type: types.GET_UNTOUCHED_LEADS_FAILURE,
  payload: error
});
