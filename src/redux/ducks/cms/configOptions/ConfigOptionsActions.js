import * as types from './ConfigOptionsTypes';

export const getCoeSelected = () => ({
    type: types.GET_ALL_COE
});
export const getCoeSelectedSuccess = data => ({
    type: types.GET_ALL_COE_SUCCESS,
    payload: data
});
export const getCoeSelectedFailure = error => ({
    type: types.GET_ALL_COE_FAILURE,
    payload: error
});

export const newCoe = form => ({
    type: types.CREATE_COE,
    payload: form
});
export const newCoeSuccess = data => ({
    type: types.CREATE_COE_SUCCESS,
    payload: data
});
export const newCoeFailure = error => ({
    type: types.CREATE_COE_FAILURE,
    payload: error
})

export const editCoe = form => ({
    type: types.EDIT_COE,
    payload: form
});
export const editCoeSuccess = data => ({
    type: types.EDIT_COE_SUCCESS,
    payload: data
});
export const editCoeFailure = error => ({
    type: types.EDIT_COE_FAILURE,
    payload: error
});

export const deleteCoe = id => ({
    type: types.DELETE_COE,
    payload: id
});
export const deleteCoeSuccess = id => ({
    type: types.DELETE_COE_SUCCESS,
    payload: id
});
export const deleteCoeFailure = error => ({
    type: types.DELETE_COE_FAILURE,
    payload: error
});

export const getWarrantySelected = () => ({
    type: types.GET_ALL_WARRANTY
});
export const getWarrantySelectedSuccess = data => ({
    type: types.GET_ALL_WARRANTY_SUCCESS,
    payload: data
});
export const getWarrantySelectedFailure = error => ({
    type: types.GET_ALL_WARRANTY_FAILURE,
    payload: error
});

export const newWarranty = form => ({
    type: types.CREATE_WARRANTY,
    payload: form
});
export const newWarrantySuccess = data => ({
    type: types.CREATE_WARRANTY_SUCCESS,
    payload: data
});
export const newWarrantyFailure = error => ({
    type: types.CREATE_WARRANTY_FAILURE,
    payload: error
})

export const editWarranty = form => ({
    type: types.EDIT_WARRANTY,
    payload: form
});
export const editWarrantySuccess = data => ({
    type: types.EDIT_WARRANTY_SUCCESS,
    payload: data
});
export const editWarrantyFailure = error => ({
    type: types.EDIT_WARRANTY_FAILURE,
    payload: error
});

export const deleteWarranty = id => ({
    type: types.DELETE_WARRANTY,
    payload: id
});
export const deleteWarrantySuccess = id => ({
    type: types.DELETE_WARRANTY_SUCCESS,
    payload: id
});
export const deleteWarrantyFailure = error => ({
    type: types.DELETE_WARRANTY_FAILURE,
    payload: error
});

export const getServicingSelected = () => ({
    type: types.GET_ALL_SERVICING
});
export const getServicingSelectedSuccess = data => ({
    type: types.GET_ALL_SERVICING_SUCCESS,
    payload: data
});
export const getServicingSelectedFailure = error => ({
    type: types.GET_ALL_SERVICING_FAILURE,
    payload: error
});

export const newServicing = form => ({
    type: types.CREATE_SERVICING,
    payload: form
});
export const newServicingSuccess = data => ({
    type: types.CREATE_SERVICING_SUCCESS,
    payload: data
});
export const newServicingFailure = error => ({
    type: types.CREATE_SERVICING_FAILURE,
    payload: error
})

export const editServicing = form => ({
    type: types.EDIT_SERVICING,
    payload: form
});
export const editServicingSuccess = data => ({
    type: types.EDIT_SERVICING_SUCCESS,
    payload: data
});
export const editServicingFailure = error => ({
    type: types.EDIT_SERVICING_FAILURE,
    payload: error
});

export const deleteServicing = id => ({
    type: types.DELETE_SERVICING,
    payload: id
});
export const deleteServicingSuccess = id => ({
    type: types.DELETE_SERVICING_SUCCESS,
    payload: id
});
export const deleteServicingFailure = error => ({
    type: types.DELETE_SERVICING_FAILURE,
    payload: error
});