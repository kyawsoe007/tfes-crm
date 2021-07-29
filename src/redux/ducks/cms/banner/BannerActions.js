import * as types from "./BannerTypes";

export const getAllBanner = () => ({
    type: types.GET_ALL_BANNER
});
export const getAllBannerSuccess = data => ({
    type: types.GET_ALL_BANNER_SUCCESS,
    payload: data
});
export const getAllBannerFailure = error => ({
    type: types.GET_ALL_BANNER_FAILURE,
    payload: error
});

export const getSingleBanner = id => ({
    type: types.GET_SINGLE_BANNER,
    payload: id
});
export const getSingleBannerSuccess = data => ({
    type: types.GET_SINGLE_BANNER_SUCCESS,
    payload: data
});
export const getSingleBannerFailure = error => ({
    type: types.GET_SINGLE_BANNER_FAILURE,
    payload: error
});

export const newBanner = (form, redirect, history) => ({
    type: types.NEW_BANNER,
    payload: { form, redirect, history}
})
export const newBannerSuccess = data => ({
    type: types.NEW_BANNER_SUCCESS,
    payload: data
});
export const newBannerFailure = error => ({
    type: types.NEW_BANNER_FAILURE,
    payload: error
});

export const editBanner = form => ({
    type: types.EDIT_BANNER,
    payload: form
});
export const editBannerSuccess = data => ({
    type:types.EDIT_BANNER_SUCCESS,
    payload: data
});
export const editBannerFailure = error => ({
    type:types.EDIT_BANNER_FAILURE,
    payload: error
});

export const deleteBanner = id => ({
    type: types.DELETE_BANNER,
    payload: id
})
export const deleteBannerSuccess = id => ({
    type: types.DELETE_BANNER_SUCCESS,
    payload: id
});
export const deleteBannerFailure = error => ({
    type: types.DELETE_BANNER_FAILURE,
    payload: error
});





