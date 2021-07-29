import { NotificationManager } from "react-notifications";
import * as types from "./CampaignTypes";

const INIT_STATE = {
  campaignList: {
    list: [],
    loading: false
  },
  campaignToView: {
    loading: false,
    id: null,
    data: null
  },
  campaignForm: {
    loading: false,
    successDialog: false
  }
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    /**
     * Get All Campaigns
     */
    case types.GET_ALL_CAMPAIGN:
      return {
        ...state,
        campaignList: { ...state.campaignList, loading: true }
      };
    case types.GET_ALL_CAMPAIGN_SUCCESS:
      return {
        ...state,
        campaignList: {
          ...state.campaignList,
          loading: false,
          list: action.payload
        }
      };
    case types.GET_ALL_CAMPAIGN_FAILURE:
      NotificationManager.error("Error in fetching Campaign List");
      return {
        ...state,
        campaignList: { ...state.campaignList, loading: false }
      };

    /**
     * Get Campaign
     */
    case types.GET_CAMPAIGN:
      return {
        ...state,
        campaignToView: {
          ...state.campaignToView,
          loading: true,
          id: action.payload
        }
      };
    case types.GET_CAMPAIGN_SUCCESS:
      return {
        ...state,
        campaignToView: {
          ...state.campaignToView,
          loading: false,
          data: action.payload
        }
      };
    case types.GET_CAMPAIGN_FAILURE:
      NotificationManager.error("Error in retreiving Campaign Details");
      return {
        ...state,
        campaignToView: { ...state.campaignToView, loading: false }
      };

    /**
     * New Campaign
     */
    case types.NEW_CAMPAIGN:
      return {
        ...state,
        campaignForm: { ...state.campaignForm, loading: true }
      };
    case types.NEW_CAMPAIGN_SUCCESS:
      return {
        ...state,
        campaignForm: {
          ...state.campaignForm,
          loading: false,
          successDialog: true
        }
      };
    case types.NEW_CAMPAIGN_FAILURE:
      NotificationManager.error("Error in creating campaign");
      return {
        ...state,
        campaignForm: { ...state.campaignForm, loading: false }
      };
    /**
     * Close Success Dialog
     */
    case types.CLOSE_CAMPAIGN_SUCCESS:
      return {
        ...state,
        campaignForm: { ...state.campaignForm, successDialog: false }
      };

    /**
     * Send campaign now
     */
    case types.SEND_CAMPAIGN_NOW:
      return {
        ...state,
        campaignList: { ...state.campaignList, loading: true },
        campaignToView: { ...state.campaignToView, loading: true }
      };
    case types.SEND_CAMPAIGN_NOW_SUCCESS:
      NotificationManager.success("Campaign Sent!");
      const sendNow = Object.assign([], state.campaignList).map(campaign =>
        campaign.id == action.payload.id ? action.payload : campaign
      );
      return {
        ...state,
        campaignList: { ...state.campaignList, loading: false, list: sendNow },
        campaignToView: {
          ...state.campaignToView,
          loading: false,
          data: action.payload
        }
      };
    case types.SEND_CAMPAIGN_NOW_FAILURE:
      NotificationManager.error("Error in sending campaign");
      return {
        ...state,
        campaignList: { ...state.campaignList, loading: false },
        campaignToView: { ...state.campaignToView, loading: false }
      };

    /**
     * Delete Campaign
     */
    case types.DELETE_CAMPAIGN:
      return {
        ...state,
        campaignList: { ...state.campaignList, loading: true },
        campaignToView: { ...state.campaignToView, loading: true }
      };
    case types.DELETE_CAMPAIGN_SUCCESS:
      NotificationManager.success("Campaign Deleted!");
      const deleteCampaign = Object.assign([], state.campaignList.list).filter(
        campaign => campaign.id != action.payload
      );
      return {
        ...state,
        campaignList: {
          ...state.campaignList,
          list: deleteCampaign,
          loading: false
        },
        campaignToView: { ...INIT_STATE.campaignToView }
      };
    case types.DELETE_CAMPAIGN_FAILURE:
      NotificationManager.error("Error in deleting campaign");
      return {
        ...state,
        campaignList: { ...state.campaignList, loading: false },
        campaignToView: { ...state.campaignToView, loading: false }
      };
    default:
      return { ...state };
  }
};
