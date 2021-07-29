import * as types from "./ConfigTypes";

export const getAllConfigs = (limit, skip, filter, searchText, orderBy) => ({
    type: types.GET_CONFIGS,
    payload: { limit, skip, filter, searchText, orderBy }
});
export const getConfigsSuccess = data => ({
    type: types.GET_CONFIGS_SUCCESS,
    payload: data
});
export const getConfigsFailure = error => ({
    type: types.GET_CONFIGS_FAILURE,
    payload: error
});