import * as types from "./FooterTypes";

export const getAllFooter = () => ({
    type: types.GET_ALL_FOOTER
});
export const getAllFooterSuccess = data => ({
    type: types.GET_ALL_FOOTER_SUCCESS,
    payload: data
});
export const getAllFooterFailure = error => ({
    type: types.GET_ALL_FOOTER_FAILURE,
    payload: error
});

export const getSingleFooter = id => ({
    type: types.GET_FOOTER_CHILDREN,
    payload: id
});
export const getSingleFooterSuccess = data => ({
    type: types.GET_FOOTER_CHILDREN_SUCCESS,
    payload: data
});
export const getSingleFooterFailure = error => ({
    type: types.GET_FOOTER_CHILDREN_FAILURE,
    payload: error
});

export const newFooterSection = (form, redirect, history) => ({
    type: types.NEW_FOOTER_SECTION,
    payload: { form, redirect, history }
});

export const newFooterSectionSuccess = data => ({
    type: types.NEW_FOOTER_SECTION_SUCCESS,
    payload: data
});
export const newFooterSectionFailure = error => ({
    type: types.NEW_FOOTER_SECTION_FAILURE,
    payload: error
});

export const newFooterCar = (form, redirect, history) => ({
    type: types.NEW_FOOTER_CAR,
    payload: { form, redirect, history }
});
export const newFooterCarSuccess = data => ({
    type: types.NEW_FOOTER_CAR_SUCCESS,
    payload: data
});
export const newFooterCarFailure = error => ({
    type: types.NEW_FOOTER_CAR_FAILURE,
    payload: error
});

export const editFooterSection = form => ({
    type: types.EDIT_FOOTER_SECTION,
    payload: form
});
export const editFooterSectionSuccess = data => ({
    types: types.EDIT_FOOTER_SECTION_SUCCESS,
    payload: data
});
export const editFooterSectionFailure = error => ({
    type: types.EDIT_FOOTER_SECTION_FAILURE,
    payload: error
});

export const editFooterCar = form => ({
    types: types.EDIT_FOOTER_CAR,
    payload: form
});
export const editFooterCarSuccess = data => ({
    types: types.EDIT_FOOTER_CAR_SUCCESS,
    payload: data
});
export const editFooterCarFailure = error => ({
    type: types.EDIT_FOOTER_CAR_FAILURE,
    payload: error
});

export const deleteFooterSection = id => ({
    type: types.DELETE_FOOTER_SECTION,
    payload: id
});
export const deleteFooterSectionSuccess = id => ({
    type: types.DELETE_FOOTER_SECTION_SUCCESS,
    payload: id
});
export const deleteFooterSectionFailure = error => ({
    type: types.DELETE_FOOTER_SECTION_FAILURE,
    payload: error
});

export const deleteFooterCar = id => ({
    type: types.DELETE_FOOTER_CAR,
    payload: id
});
export const deleteFooterCarSuccess = id => ({
    type: types.DELETE_FOOTER_CAR_SUCCESS,
    payload: id
});
export const deleteFooterCarFailure = error => ({
    type: types.DELETE_FOOTER_CAR_FAILURE,
    payload: error
})
