import * as types from "./BookingTypes";
import { NotificationManager } from "react-notifications";

const INIT_STATE = {
  recentBookings: {
    loading: false,
    listData: [],
    chartData: []
  },
  bookings: {
    loading: false,
    listData: []
  }
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    /**
     * Recent Booking
     */
    case types.GET_RECENT_BOOKINGS:
      return {
        ...state,
        recentBookings: { ...state.recentBookings, loading: true }
      };
    case types.GET_RECENT_BOOKINGS_SUCCESS:
      console.log(action.payload)
      const { allBookings, overview } = action.payload;
      return {
        ...state,
        recentBookings: {
          ...state.recentBookings,
          loading: false,
          listData: allBookings,
          chartData: overview
        }
      };
    case types.GET_RECENT_BOOKINGS_FAILURE:
      NotificationManager.error("Error in retreiving recent bookings");
      return {
        ...state,
        recentBookings: { ...state.recentBookings, loading: false }
      };

    /**
     * All Bookings
     */
    case types.GET_BOOKINGS:
      return {
        ...state,
        bookings: { ...state.bookings, loading: true }
      };
    case types.GET_BOOKINGS_SUCCESS:
      return {
        ...state,
        bookings: {
          ...state.bookings,
          loading: false,
          listData: action.payload
        }
      };
    case types.GET_BOOKINGS_FAILURE:
      NotificationManager.error("Error in retreiving bookings");
      return {
        ...state,
        bookings: { ...state.bookings, loading: false }
      };

    /**
     * Update status
     */
    case types.UPDATE_BOOKING_STATUS:
      return {
        ...state,
        bookings: { ...state.bookings, loading: true }
      };
    case types.UPDATE_BOOKING_STATUS_SUCCESS:
      var updateStatus = Object.assign([], state.bookings.listData).map(list =>
        list.id == action.payload.id ? action.payload : list
      );
      NotificationManager.success("Status changed!");
      return {
        ...state,
        bookings: { ...state.bookings, loading: false, listData: updateStatus }
      };
    case types.UPDATE_BOOKING_STATUS_FAILURE:
      NotificationManager.error("Error in updating status");
      return { ...state, bookings: { ...state.bookings, loading: false } };

    default:
      return { ...state };
  }
};
