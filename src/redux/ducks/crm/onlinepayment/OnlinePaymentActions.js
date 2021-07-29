import * as types from "./OnlinePaymentTypes";

export const getAllPayment = (limit, skip, filter, searchText, orderBy) => ({
    type: types.GET_ALL_ONLINEPAYMENT,
    payload: { limit, skip, filter, searchText, orderBy }
});
export const getAllPaymentSuccess = (data) => ({
    type: types.GET_ALL_ONLINEPAYMENT_SUCCESS,
    payload: data
});
export const getAllPaymentFailure = (error) => ({
    type: types.GET_ALL_ONLINEPAYMENT_FAILURE,
    payload: error
});

export const exportPayment = (selectedIds) => ({
    type: types.EXPORT_ONLINEPAYMENT,
    payload: selectedIds
});
export const exportPaymentSuccess = (data) => ({
    type: types.EXPORT_ONLINEPAYMENT_SUCCESS,
    payload: data
});
export const exportPaymentFailure = (error) => ({
    type: types.EXPORT_ONLINEPAYMENT_FAILURE,
    payload: error
})