import * as types from "./AnnouncementTypes";

// Get All Announcement
export const getAllAnnouncement = () => ({
  type: types.GET_ALL_ANNOUNCEMENT
});
export const getAllAnnouncementSuccess = data => ({
  type: types.GET_ALL_ANNOUNCEMENT_SUCCESS,
  payload: data
});
export const getAllAnnouncementFailure = error => ({
  type: types.GET_ALL_ANNOUNCEMENT_FAILURE,
  payload: error
});

// New Announcement
export const newAnnouncement = data => ({
  type: types.NEW_ANNOUNCEMENT,
  payload: data
});
export const newAnnouncementSuccess = data => ({
  type: types.NEW_ANNOUNCEMENT_SUCCESS,
  payload: data
});
export const newAnnouncementFailure = error => ({
  type: types.NEW_ANNOUNCEMENT_FAILURE,
  payload: error
});

// Edit Announcement
export const editAnnouncement = data => ({
  type: types.EDIT_ANNOUNCEMENT,
  payload: data
});
export const editAnnouncementSuccess = data => ({
  type: types.EDIT_ANNOUNCEMENT_SUCCESS,
  payload: data
});
export const editAnnouncementFailure = error => ({
  type: types.EDIT_ANNOUNCEMENT_FAILURE,
  payload: error
});

// Delete Announcement
export const deleteAnnouncement = data => ({
  type: types.DELETE_ANNOUNCEMENT,
  payload: data
});
export const deleteAnnouncementSuccess = data => ({
  type: types.DELETE_ANNOUNCEMENT_SUCCESS,
  payload: data
});
export const deleteAnnouncementFailure = error => ({
  type: types.DELETE_ANNOUNCEMENT_FAILURE,
  payload: error
});

// Get Latest Announcement
export const getLatestAnnouncement = () => ({
  type: types.GET_LATEST_ANNOUNCEMENT
});
export const getLatestAnnouncementSuccess = data => ({
  type: types.GET_LATEST_ANNOUNCEMENT_SUCCESS,
  payload: data
});
export const getLatestAnnouncementFailure = error => ({
  type: types.GET_LATEST_ANNOUNCEMENT_FAILURE,
  payload: error
});

// Read Announcement
export const readAnnouncement = data => ({
  type: types.READ_ANNOUNCEMENT,
  payload: data
});
export const readAnnouncementSuccess = data => ({
  type: types.READ_ANNOUNCEMENT_SUCCESS,
  payload: data
});
export const readAnnouncementFailure = error => ({
  type: types.READ_ANNOUNCEMENT_FAILURE,
  payload: error
});
