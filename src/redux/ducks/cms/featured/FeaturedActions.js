import * as types from "./FeaturedTypes";

export const getAllFeatured = () => ({
    type: types.GET_ALL_FEATURED
});
export const getAllFeaturedSuccess = data => ({
    type: types.GET_ALL_FEATURED_SUCCESS,
    payload: data
});
export const getAllFeaturedFailure = error => ({
    type: types.GET_ALL_FEATURED_FAILURE,
    payload: error
});

export const getSingleFeatured = id => ({
    type: types.GET_FEATURED_CHILDREN,
    payload: id
});
export const getSingleFeatureSuccess = data => ({
    type: types.GET_FEATURED_CHILDREN_SUCCESS,
    payload: data
});
export const getSingleFeaturedFailure = error => ({
    type: types.GET_FEATURED_CHILDREN_FAILURE,
    payload: error
});

export const newFeaturedSection = (form, redirect, history) => ({
    type: types.NEW_FEATURED_SECTION,
    payload: { form, redirect, history }
});

export const newFeaturedSectionSuccess = data => ({
    type: types.NEW_FEATURED_SECTION_SUCCESS,
    payload: data
});
export const newFeaturedSectionFailure = error => ({
    type: types.NEW_FEATURED_SECTION_FAILURE,
    payload: error
});

export const newFeaturedCar = (form, redirect, history) => ({
    type: types.NEW_FEATURED_CAR,
    payload: { form, redirect, history }
});
export const newFeaturedCarSuccess = data => ({
    type: types.NEW_FEATURED_CAR_SUCCESS,
    payload: data
});
export const newFeaturedCarFailure = error => ({
    type: types.NEW_FEATURED_CAR_FAILURE,
    payload: error
});

export const editFeaturedSection = form => ({
    types: types.EDIT_FEATURED_SECTION,
    payload: form
});
export const editFeaturedSectionSuccess = data => ({
    types: types.EDIT_FEATURED_SECTION_SUCCESS,
    payload: data
});
export const editFeaturedSectionFailure = error => ({
    type: types.EDIT_FEATURED_SECTION_FAILURE,
    payload: error
});

export const editFeaturedCar = form => ({
    types: types.EDIT_FEATURED_CAR,
    payload: form
});
export const editFeaturedCarSuccess = data => ({
    types: types.EDIT_FEATURED_CAR_SUCCESS,
    payload: data
});
export const editFeaturedCarFailure = error => ({
    type: types.EDIT_FEATURED_CAR_FAILURE,
    payload: error
});

export const deleteFeaturedSection = id => ({
    type: types.DELETE_FEATURED_SECTION,
    payload: id
});
export const deleteFeaturedSectionSuccess = id => ({
    type: types.DELETE_FEATURED_SECTION_SUCCESS,
    payload: id
});
export const deleteFeaturedSectionFailure = error => ({
    type: types.DELETE_FEATURED_SECTION_FAILURE,
    payload: error
});

export const deleteFeaturedCar = id => ({
    type: types.DELETE_FEATURED_CAR,
    payload: id
});
export const deleteFeaturedCarSuccess = id => ({
    type: types.DELETE_FEATURED_CAR_SUCCESS,
    payload: id
});
export const deleteFeaturedCarFailure = error => ({
    type: types.DELETE_FEATURED_CAR_FAILURE,
    payload: error
})
