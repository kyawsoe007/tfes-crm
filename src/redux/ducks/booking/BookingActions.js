import * as types from "./BookingTypes";

export const getRecentBookings = (type, id) => ({
  type: types.GET_RECENT_BOOKINGS,
  payload: { type, id }
});
export const getRecentBookingsSuccess = data => ({
  type: types.GET_RECENT_BOOKINGS_SUCCESS,
  payload: data
});
export const getRecentBookingsFailure = error => ({
  type: types.GET_RECENT_BOOKINGS_FAILURE,
  payload: error
});

export const getBookings = type => ({
  type: types.GET_BOOKINGS,
  payload: type
});
export const getBookingsSuccess = data => ({
  type: types.GET_BOOKINGS_SUCCESS,
  payload: data
});
export const getBookingsFailure = error => ({
  type: types.GET_BOOKINGS_FAILURE,
  payload: error
});

export const updateBookingStatus = (id, status) => ({
  type: types.UPDATE_BOOKING_STATUS,
  payload: { id, status }
});
export const updateBookingStatusSuccess = data => ({
  type: types.UPDATE_BOOKING_STATUS_SUCCESS,
  payload: data
});
export const updateBookingStatusFailure = error => ({
  type: types.UPDATE_BOOKING_STATUS_FAILURE,
  payload: error
});
