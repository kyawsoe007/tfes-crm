
import * as types from "./GeneratingReportTypes"
// Get Generating Report Data
export const getGeneratingReport  = (data)=>({
    type: types.GET_GENERATING_REPORT,
    payload: data,
})
export const getGeneratingReportSuccess  = (data)=>({
    type: types.GET_GENERATING_REPORT_SUCCESS,
    payload: data,
})
export const getGeneratingReportFailure  = (error)=>({
    type: types.GET_GENERATING_REPORT_FAILURE,
    payload: error,
})