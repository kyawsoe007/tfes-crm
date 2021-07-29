import * as types from "./discountSettingsTypes";

// Get data of selected model

// GET all discounts
export const getAllDiscounts = () => ({
    type: types.GET_ALL_DISCOUNTS,
})

export const getAllDiscountsSuccess = (data) => ({
    type: types.GET_ALL_DISCOUNTS_SUCCESS,
    payload: data
})

export const getAllDiscountsFailure = (data) => ({
    type: types.GET_ALL_DISCOUNTS_FAILURE,
    payload: data
})

//GET one discount 
export const getDiscount = (data) => ({
    type: types.GET_DISCOUNT,
    payload: data
})

export const getDiscountSuccess = (data) => ({
    type: types.GET_DISCOUNT_SUCCESS,
    payload: data
})

export const getStockLocationFailure = (data) => ({
    type: types.GET_STOCK_LOCATION_SUCCESS,
    payload: data
})

// POST one discount 
export const postDiscount = (data) => ({
    type: types.POST_DISCOUNT,
    payload: data
})

export const postDiscountSuccess = (data) => ({
    type: types.POST_DISCOUNT_SUCCESS,
    payload: data
})

export const postDiscountFailure = (data) => ({
    type: types.POST_DISCOUNT_FAILURE,
    payload: data
})

// PUT one discount 
export const putDiscount = (data) => ({
    type: types.PUT_DISCOUNT,
    payload: data
})

export const putDiscountSuccess = (data) => ({
    type: types.PUT_DISCOUNT_SUCCESS,
    payload: data
})

export const putDiscountFailure = (data) => ({
    type: types.PUT_DISCOUNT_FAILURE,
    payload: data
})

// DELETE discount
export const deleteDiscount = (data) => ({
    type: types.DELETE_DISCOUNT,
    payload: data
})

export const deleteDiscountSuccess = (data) => ({
    type: types.DELETE_DISCOUNT_SUCCESS,
    payload: data
})

export const deleteDiscountFailure = (data) => ({
    type: types.DELETE_DISCOUNT_FAILURE,
    payload: data
}) 