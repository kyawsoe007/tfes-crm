import * as types from "./ReportTypes";

//=====================
// Reports Failure
//=====================
export const getReportFailure = error => ({
  type: types.GET_REPORT_FAILURE,
  payload: error
});

//=====================
// Deal Reports
//=====================

// Deal by Owner
export const getDealsByOwner = (start, end) => ({
  type: types.GET_DEALS_BY_OWNER,
  payload: { start, end }
});
export const getDealsByOwnerSuccess = data => ({
  type: types.GET_DEALS_BY_OWNER_SUCCESS,
  payload: data
});

// Deal by Type
export const getDealsByType = (start, end) => ({
  type: types.GET_DEALS_BY_TYPE,
  payload: { start, end }
});
export const getDealsByTypeSuccess = data => ({
  type: types.GET_DEALS_BY_TYPE_SUCCESS,
  payload: data
});

// Deal by Source
export const getDealsBySource = (start, end) => ({
  type: types.GET_DEALS_BY_SOURCE,
  payload: { start, end }
});
export const getDealsBySourceSuccess = data => ({
  type: types.GET_DEALS_BY_SOURCE_SUCCESS,
  payload: data
});

// Deals Pipeline
export const getDealsPipeline = (start, end) => ({
  type: types.GET_DEALS_PIPELINE,
  payload: { start, end }
});
export const getDealsPipelineSuccess = data => ({
  type: types.GET_DEALS_PIPELINE_SUCCESS,
  payload: data
});

//=====================
// Lead Reports
//=====================

// Lead by status
export const getLeadsByStatus = (start, end) => ({
  type: types.GET_LEADS_BY_STATUS,
  payload: { start, end }
});
export const getLeadsByStatusSuccess = data => ({
  type: types.GET_LEADS_BY_STATUS_SUCCESS,
  payload: data
});

// Lead by owner
export const getLeadsByOwner = (start, end) => ({
  type: types.GET_LEADS_BY_OWNER,
  payload: { start, end }
});
export const getLeadsByOwnerSuccess = data => ({
  type: types.GET_LEADS_BY_OWNER_SUCCESS,
  payload: data
});

// Lead by source
export const getLeadsBySource = (start, end) => ({
  type: types.GET_LEADS_BY_SOURCE,
  payload: { start, end }
});
export const getLeadsBySourceSuccess = data => ({
  type: types.GET_LEADS_BY_SOURCE_SUCCESS,
  payload: data
});

//=====================
// Acct Cust Reports
//=====================

// Top Spender Accounts
export const getTopSpenderAccount = (start, end) => ({
  type: types.GET_TOP_SPENDER_ACCOUNT,
  payload: { start, end }
});
export const getTopSpenderAccountSuccess = data => ({
  type: types.GET_TOP_SPENDER_ACCOUNT_SUCCESS,
  payload: data
});

// Top Spender Customer
export const getTopSpenderCustomer = (start, end) => ({
  type: types.GET_TOP_SPENDER_CUSTOMER,
  payload: { start, end }
});
export const getTopSpenderCustomerSuccess = data => ({
  type: types.GET_TOP_SPENDER_CUSTOMER_SUCCESS,
  payload: data
});

//=====================
// Individual Reports
//=====================
export const getIndividualReport = (start, end, id) => ({
  type: types.GET_INDIVIDUAL_REPORT,
  payload: { start, end, id }
});
export const getIndividualReportSuccess = data => ({
  type: types.GET_INDIVIDUAL_REPORT_SUCCESS,
  payload: data
});

//=====================
// Closed Deal Reports
//=====================

// Closed by Owner
export const getWonByOwner = (start, end) => ({
  type: types.GET_CLOSED_BY_OWNER,
  payload: { start, end }
});
export const getWonByOwnerSuccess = data => ({
  type: types.GET_CLOSED_BY_OWNER_SUCCESS,
  payload: data
});

//=====================
// Sales Reports
//=====================

// Commission Report
export const getCommissionReport = (start, end) => ({
  type: types.GET_COMMISSION_REPORT,
  payload: { start, end }
});
export const getCommissionReportSuccess = data => ({
  type: types.GET_COMMISSION_REPORT_SUCCESS,
  payload: data
});

// Top Selling Products Report
export const getTopSeller = (start, end) => ({
  type: types.GET_TOP_SELLING_REPORT,
  payload: { start, end }
});
export const getTopSellerSuccess = data => ({
  type: types.GET_TOP_SELLING_REPORT_SUCCESS,
  payload: data
});
