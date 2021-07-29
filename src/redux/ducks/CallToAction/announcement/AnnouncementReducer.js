import { NotificationManager } from "react-notifications";
import * as types from "./AnnouncementTypes";

const INIT_STATE = {
  announcements: [],
  loading: false,

  latest: {
    loading: false,
    announcements: []
  }
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    /**
     * Loading State
     */
    case types.GET_ALL_ANNOUNCEMENT:
    case types.NEW_ANNOUNCEMENT:
    case types.EDIT_ANNOUNCEMENT:
    case types.DELETE_ANNOUNCEMENT:
      return { ...state, loading: true };

    /**
     * Get all announcements
     */
    case types.GET_ALL_ANNOUNCEMENT_SUCCESS:
      return { ...state, announcements: action.payload, loading: false };
    case types.GET_ALL_ANNOUNCEMENT_FAILURE:
      NotificationManager.error("Error in fetching announcements");
      return { ...state, loading: false };

    /**
     * New Announcements
     */
    case types.NEW_ANNOUNCEMENT_SUCCESS:
      var newAnnouncement = Object.assign([], state.announcements);
      newAnnouncement.unshift(action.payload);
      NotificationManager.success("Announcement created successfully");
      return { ...state, loading: false, announcements: newAnnouncement };
    case types.NEW_ANNOUNCEMENT_FAILURE:
      NotificationManager.error("Error in creating announcement");
      return { ...state, loading: false };

    /**
     * Edit Announcements
     */
    case types.EDIT_ANNOUNCEMENT_SUCCESS:
      var editAnnouncement = Object.assign([], state.announcements);
      var editIndex = editAnnouncement.findIndex(
        announcement => announcement.id == action.payload.id
      );
      editAnnouncement[editIndex] = action.payload;
      NotificationManager.success("Announcement edited successfully");
      return { ...state, loading: false, announcements: editAnnouncement };
    case types.EDIT_ANNOUNCEMENT_FAILURE:
      NotificationManager.error("Error in editing announcement");
      return { ...state, loading: false };

    /**
     * Delete Announcements
     */
    case types.DELETE_ANNOUNCEMENT_SUCCESS:
      var deleteAnnouncement = Object.assign([], state.announcements).filter(
        announcement => announcement.id != action.payload
      );
      NotificationManager.success("Announcement deleted successfully");
      return { ...state, loading: false, announcements: deleteAnnouncement };
    case types.DELETE_ANNOUNCEMENT_FAILURE:
      NotificationManager.error("Error in deleting announcement");
      return { ...state, loading: false };

    /**
     * Latest Announcement Loading
     */
    case types.READ_ANNOUNCEMENT:
    case types.GET_LATEST_ANNOUNCEMENT:
      return { ...state, latest: { ...state.latest, loading: true } };
    /**
     * Get Latest Announcement
     */
    case types.GET_LATEST_ANNOUNCEMENT_SUCCESS:
      return {
        ...state,
        latest: {
          ...state.latest,
          loading: false,
          announcements: action.payload
        }
      };
    case types.GET_LATEST_ANNOUNCEMENT_FAILURE:
      NotificationManager.error("Error retreiving latest announcmeents");
      return { ...state, latest: { ...state.latest, loading: false } };

    /**
     * Read Announcement
     */
    case types.READ_ANNOUNCEMENT_SUCCESS:
      const read = Object.assign([], state.latest.announcements);
      for (let i = 0; i < read.length; i++) {
        if (action.payload.includes(read[i].id)) read.splice(i, 1);
      }
      return {
        ...state,
        latest: { ...state.latest, loading: false, announcements: read }
      };

    case types.READ_ANNOUNCEMENT_FAILURE:
      NotificationManager.error("Error in announcement");
      return { ...state, latest: { ...state.latest, loading: false } };

    default:
      return { ...state };
  }
};
