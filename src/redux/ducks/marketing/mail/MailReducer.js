import { NotificationManager } from "react-notifications";
import * as types from "./MailTypes";

const INIT_STATE = {
  allMailingList: {
    list: [],
    loading: false,
    nowShowing: null,
    nowShowingName: ""
  },
  adminMailingList: {
    list: [],
    loading: false
  },
  mailingList: {
    list: [],
    loading: false
  },
  contacts: {
    list: [],
    loading: false
  }
};

function filterContact(contactList, mailingList) {
  for (let i = 0; i < contactList.length; i++) {
    var match = mailingList.find(mailing => mailing.id == contactList[i].id);
    if (match) {
      contactList[i].disable = true;
    } else {
      contactList[i].disable = false;
    }
  }
  return contactList;
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    /**
     * Get all mailing list
     */
    case types.GET_ALL_MAILING_LIST:
      return {
        ...state,
        allMailingList: { ...state.allMailingList, loading: true }
      };
    case types.GET_ALL_MAILING_LIST_SUCCESS:
      return {
        ...state,
        allMailingList: {
          ...state.allMailingList,
          loading: false,
          list: action.payload
        }
      };
    case types.GET_ALL_MAILING_LIST_SUCCESS:
      NotificationManager.error("Error in retrieving all Mailing List");
      return {
        ...state,
        allMailingList: { ...state.allMailingList, loading: false }
      };
    /**
     * Get Admin Mailing List
     */
    case types.GET_ALL_ADMIN_MAILING_LIST:
      return {
        ...state,
        adminMailingList: { ...state.adminMailingList, loading: true }
      };
    case types.GET_ALL_ADMIN_MAILING_LIST_SUCCESS:
      return {
        ...state,
        adminMailingList: {
          ...state.adminMailingList,
          loading: false,
          list: action.payload
        }
      };
    case types.GET_ALL_ADMIN_MAILING_LIST_FAILURE:
      NotificationManager.error("Error in fetching Admin Mailing List");
      return {
        ...state,
        adminMailingList: { ...state.adminMailingList, loading: false }
      };

    /**
     * Get Contacts in Mailing List
     */
    case types.GET_MAILING_LIST:
      return {
        ...state,
        allMailingList: {
          ...state.allMailingList,
          nowShowing: action.payload.id,
          nowShowingName: action.payload.name
        },
        mailingList: { ...state.mailingList, loading: true },
        contacts: { ...state.contacts, loading: true }
      };
    case types.GET_MAILING_LIST_SUCCESS:
    case types.SAVE_TO_MAILING_LIST_SUCCESS:
    case types.REMOVE_FROM_MAILING_LIST_SUCCESS:
      var contactList = filterContact(state.contacts.list, action.payload);
      return {
        ...state,
        mailingList: {
          ...state.mailingList,
          loading: false,
          list: action.payload
        },
        contacts: {
          ...state.contacts,
          list: contactList,
          loading: false
        }
      };
    case types.GET_MAILING_LIST_FAILURE:
      NotificationManager.error("Error in retrieving Mailing List");
      return {
        ...state,
        mailingList: { ...state.mailingList, loading: false },
        contacts: { ...state.contacts, loading: false }
      };

    /**
     * Get Contacts
     */
    case types.GET_CONTACTS:
      return { ...state, contacts: { ...state.contacts, loading: true } };
    case types.GET_CONTACTS_SUCCESS:
      return {
        ...state,
        contacts: {
          ...state.contacts,
          loading: false,
          list: action.payload
        }
      };
    case types.GET_CONTACTS_FAILURE:
      NotificationManager.error("Error in retrieving Contacts");
      return { ...state, contacts: { ...state.contacts, loading: false } };

    /**
     * Save to Mailing List
     */
    case types.SAVE_TO_MAILING_LIST:
      return { ...state, mailingList: { ...state.mailingList, loading: true } };

    case types.SAVE_TO_MAILING_LIST_FAILURE:
      NotificationManager.error("Error in updating mailing list");
      return {
        ...state,
        mailingList: { ...state.mailingList, loading: false }
      };
    /**
     * Remove from Mailing List
     */
    case types.REMOVE_FROM_MAILING_LIST:
      return { ...state };
    case types.REMOVE_FROM_MAILING_LIST_FAILURE:
      NotificationManager.error("Error in updating mailing list");
      return {
        ...state,
        contacts: { ...state.contacts, loading: false }
      };
    /**
     * New Mailing List
     */
    case types.CREATE_MAILING_LIST:
      return { ...state };
    case types.CREATE_MAILING_LIST_SUCCESS:
      NotificationManager.success("Successfully created a mailing list");
      var newMailingList = Object.assign([], state.allMailingList.list);
      newMailingList.push(action.payload);
      return {
        ...state,
        allMailingList: { ...state.allMailingList, list: newMailingList }
      };
    case types.CREATE_MAILING_LIST_FAILURE:
      NotificationManager.error("Error in creating Mail List");
      return { ...state };

    /**
     * Update Mailing List
     */
    case types.UPDATE_MAILING_LIST:
      return { ...state, mailingList: { ...state.mailingList, loading: true } };
    case types.UPDATE_MAILING_LIST_SUCCESS:
      NotificationManager.success("Successfully updated mailing list");
      return {
        ...state,
        mailingList: { ...state.mailingList, loading: false },
        allMailingList: {
          ...state.allMailingList,
          nowShowingName: action.payload.name
        }
      };
    case types.UPDATE_MAILING_LIST_FAILURE:
      NotificationManager.error("Error in updating mailing list");
      return {
        ...state,
        mailingList: { ...state.mailingList, loading: false }
      };

    /**
     * Delete Mailing List
     */
    case types.DELETE_MAILING_LIST:
      return {
        ...state,
        mailingList: { ...state.mailingList, loading: true }
      };
    case types.DELETE_MAILING_LIST_SUCCESS:
      const deleteMailingList = Object.assign(
        [],
        state.allMailingList.list
      ).filter(list => list.id != action.payload);
      return {
        ...state,
        mailingList: { ...INIT_STATE.mailingList },
        allMailingList: {
          ...INIT_STATE.allMailingList,
          list: deleteMailingList
        }
      };
    case types.DELETE_MAILING_LIST_FAILURE:
      NotificationManager.error("Error in deleting mailing list");
      return { ...state, mailingList: { ...state.mailingList, loading: true } };

    default:
      return { ...state };
  }
};
