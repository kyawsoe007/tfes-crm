
import data from "@iconify/icons-ic/baseline-delete-forever";
import * as types from "./fiscalYearTypes";

// Get data of selected model

// GET all Fiscal Years 
export const getAllFiscalYears = () => ({
    type: types.GET_ALL_FISCAL_YEARS,
})

export const getAllFiscalYearsSuccess = (data) => ({
    type: types.GET_ALL_FISCAL_YEARS_SUCCESS,
    payload: data
})

export const getAllFiscalYearsFailure = (data) => ({
    type: types.GET_ALL_FISCAL_YEARS_FAILURE,
    payload: data
})

// GET all Fiscal Years 
export const getAllFiscalPeriodByMonth = () => ({
    type: types.GET_FISCAL_PERIOD_BY_MONTH,
})

export const getAllFiscalPeriodByMonthSuccess = (data) => ({
    type: types.GET_FISCAL_PERIOD_BY_MONTH_SUCCESS,
    payload: data
})

export const getAllFiscalPeriodByMonthFailure = (data) => ({
    type: types.GET_FISCAL_PERIOD_BY_MONTH_FAILURE,
    payload: data
})

//GET one Fiscal Year 
export const getFiscalYear = (id) => ({
    type: types.GET_FISCAL_YEAR,
    payload: id
})

export const getFiscalYearSuccess = (data) => ({
    type: types.GET_FISCAL_YEAR_SUCCESS,
    payload: data
})

export const getFiscalYearFailure = (error) => ({
    type: types.GET_FISCAL_YEAR_FAILURE,
    payload: error
})

//GET one Fiscal Year 
export const getFiscalPeriod = (id) => (console.log('action',id),{
    
    type: types.GET_ALL_FISCAL_PERIODS,
    payload: id
})

export const getFiscalPeriodSuccess = (data) => ({
    type: types.GET_ALL_FISCAL_PERIODS_SUCCESS,
    payload: data
})

export const getFiscalPeriodFailure = (error) => ({
    type: types.GET_ALL_FISCAL_PERIODS_FAILURE,
    payload: error
})

// POST one Fiscal Year 
export const postFiscalYear = (data) => ({
    type: types.POST_FISCAL_YEAR,
    payload: data
})

export const postFiscalYearSuccess = (data) => ({
    type: types.POST_FISCAL_YEAR_SUCCESS,
    payload: data
})

export const postFiscalYearFailure = (data) => ({
    type: types.POST_FISCAL_YEAR_FAILURE,
    payload: data
})


// POST one Fiscal Year By Monthly
export const postFiscalYearByMonthly = (data) => ({
    type: types.GET_ALL_FISCAL_YEARS_BY_MONTHLY,
    payload: data
})

export const postFiscalYearByMonthlySuccess = (data) => ({
    type: types.GET_ALL_FISCAL_YEARS_BY_MONTHLY_SUCCESS,
    payload: data
})

export const postFiscalYearByMonthlyFailure = (data) => ({
    type: types.GET_ALL_FISCAL_YEARS_BY_MONTHLY_FAILURE,
    payload: data
})

// PATCH one Fiscal Year 
export const patchFiscalYear = (data) => ({
    type: types.PATCH_FISCAL_YEAR,
    payload: data
})

export const patchFiscalYearSuccess = (data) => ({
    type: types.PATCH_FISCAL_YEAR_SUCCESS,
    payload: data
})

export const patchFiscalYearFailure = (data) => ({
    type: types.PATCH_FISCAL_YEAR_FAILURE,
    payload: data
})

// DELETE one Fiscal Year 
export const deleteFiscalYear = (data) => ({
    type: types.DELETE_FISCAL_YEAR,
    payload: data
})

export const deleteFiscalYearSuccess = (data) => ({
    type: types.DELETE_FISCAL_YEAR_SUCCESS,
    payload: data
})

export const deleteFiscalYearFailure = (data) => ({
    type: types.DELETE_FISCAL_YEAR_FAILURE,
    payload: data
})