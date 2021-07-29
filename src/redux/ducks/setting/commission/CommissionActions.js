import * as types from "./CommissionTypes";

export const getCommission = () => ({
  type: types.GET_COMMISSION
});
export const getCommissionSuccess = data => ({
  type: types.GET_COMMISSION_SUCCESS,
  payload: data
});
export const getCommissionFailure = error => ({
  type: types.GET_COMMISSION_FAILURE,
  payload: error
});

export const createCommission = data => ({
  type: types.CREATE_COMMISSION,
  payload: data
});
export const createCommissionSuccess = data => ({
  type: types.CREATE_COMMISSION_SUCCESS,
  payload: data
});
export const createCommissionFailure = error => ({
  type: types.CREATE_COMMISSION_FAILURE,
  payload: error
});

export const updateCommission = data => ({
  type: types.UPDATE_COMMISSION,
  payload: data
});
export const updateCommissionSuccess = data => ({
  type: types.UPDATE_COMMISSION_SUCCESS,
  payload: data
});
export const updateCommissionFailure = error => ({
  type: types.UPDATE_COMMISSION_FAILURE,
  payload: error
});

export const deleteCommission = data => ({
  type: types.DELETE_COMMISSION,
  payload: data
});
export const deleteCommissionSuccess = data => ({
  type: types.DELETE_COMMISSION_SUCCESS,
  payload: data
});
export const deleteCommissionFailure = error => ({
  type: types.DELETE_COMMISSION_FAILURE,
  payload: error
});
