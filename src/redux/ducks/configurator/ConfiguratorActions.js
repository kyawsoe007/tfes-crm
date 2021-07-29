import * as types from "./ConfiguratorTypes";

// get grades
export const getGrades = () => ({
  type: types.GET_GRADES
});
export const getGradesSuccess = data => ({
  type: types.GET_GRADES_SUCCESS,
  payload: data
});
export const getGradesFailure = error => ({
  type: types.GET_GRADES_FAILURE,
  payload: error
});

// get variants
export const getExterior = id => ({
  type: types.GET_EXTERIOR,
  payload: id
});
export const getExteriorSuccess = data => ({
  type: types.GET_EXTERIOR_SUCCESS,
  payload: data
});
export const getExteriorFailure = error => ({
  type: types.GET_EXTERIOR_FAILURE,
  payload: error
});

export const getInterior = id => ({
  type: types.GET_INTERIOR,
  payload: id
});
export const getInteriorSuccess = data => ({
  type: types.GET_INTERIOR_SUCCESS,
  payload: data
});
export const getInteriorFailure = error => ({
  type: types.GET_INTERIOR_FAILURE,
  payload: error
});

export const getAccessories = id => ({
  type: types.GET_ACCESSORIES,
  payload: id
});
export const getAccessoriesSuccess = data => ({
  type: types.GET_ACCESSORIES_SUCCESS,
  payload: data
});
export const getAccessoriesFailure = error => ({
  type: types.GET_ACCESSORIES_FAILURE,
  payload: error
});
