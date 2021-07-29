import * as types from "./RentalTypes";

// GET Rental
export const getRentalCar = () => ({
  type: types.GET_RENTAL_CAR
});
export const getRentalCarSuccess = data => ({
  type: types.GET_RENTAL_CAR_SUCCESS,
  payload: data
});
export const getRentalCarFailure = error => ({
  type: types.GET_RENTAL_CAR_FAILURE,
  payload: error
});

// CREATE Rental
export const createRentalCar = data => ({
  type: types.CREATE_RENTAL_CAR,
  payload: data
});
export const createRentalCarSuccess = data => ({
  type: types.CREATE_RENTAL_CAR_SUCCESS,
  payload: data
});
export const createRentalCarFailure = error => ({
  type: types.CREATE_RENTAL_CAR_FAILURE,
  payload: error
});

// UPDATE Rental
export const updateRentalCar = (id, data) => ({
  type: types.UPDATE_RENTAL_CAR,
  payload: { id, data }
});
export const updateRentalCarSuccess = data => ({
  type: types.UPDATE_RENTAL_CAR_SUCCESS,
  payload: data
});
export const updateRentalCarFailure = error => ({
  type: types.UPDATE_RENTAL_CAR_FAILURE,
  payload: error
});

// DELETE Rental
export const deleteRentalCar = data => ({
  type: types.DELETE_RENTAL_CAR,
  payload: data
});
export const deleteRentalCarSuccess = data => ({
  type: types.DELETE_RENTAL_CAR_SUCCESS,
  payload: data
});
export const deleteRentalCarFailure = error => ({
  type: types.DELETE_RENTAL_CAR_FAILURE,
  payload: error
});

// GET Rental Category
export const getRentalCategory = () => ({
  type: types.GET_RENTAL_CATEGORY
});
export const getRentalCategorySuccess = data => ({
  type: types.GET_RENTAL_CATEGORY_SUCCESS,
  payload: data
});
export const getRentalCategoryFailure = error => ({
  type: types.GET_RENTAL_CATEGORY_FAILURE,
  payload: error
});
