import * as types from "./CampaignTypes";

/**
 * Get All Campaign
 */
export const getAllCampaign = () => ({
  type: types.GET_ALL_CAMPAIGN
});
export const getAllCampaignSuccess = data => ({
  type: types.GET_ALL_CAMPAIGN_SUCCESS,
  payload: data
});
export const getAllCampaignFailure = error => ({
  type: types.GET_ALL_CAMPAIGN_FAILURE,
  payload: error
});

/**
 * Get one Campaign
 */
export const getCampaign = id => ({
  type: types.GET_CAMPAIGN,
  payload: id
});
export const getCampaignSuccess = data => ({
  type: types.GET_CAMPAIGN_SUCCESS,
  payload: data
});
export const getCampaignFailure = error => ({
  type: types.GET_CAMPAIGN_FAILURE,
  payload: error
});

/**
 * New Campaign
 */
export const newCampaign = data => ({
  type: types.NEW_CAMPAIGN,
  payload: data
});
export const newCampaignSuccess = data => ({
  type: types.NEW_CAMPAIGN_SUCCESS,
  payload: data
});
export const newCampaignFailure = error => ({
  type: types.NEW_CAMPAIGN_FAILURE,
  payload: error
});

/**
 * Close Success Dialog
 */
export const closeCampaignSuccess = () => ({
  type: types.CLOSE_CAMPAIGN_SUCCESS
});

/**
 * Send Campaign Now
 */
export const sendCampaignNow = campaignId => ({
  type: types.SEND_CAMPAIGN_NOW,
  payload: campaignId
});
export const sendCampaignNowSuccess = data => ({
  type: types.SEND_CAMPAIGN_NOW_SUCCESS,
  payload: data
});
export const sendCampaignNowFailure = error => ({
  type: types.SEND_CAMPAIGN_NOW_FAILURE,
  payload: error
});

/**
 * Delete Campaign
 */
export const deleteCampaign = campaignId => ({
  type: types.DELETE_CAMPAIGN,
  payload: campaignId
});
export const deleteCampaignSuccess = campaignId => ({
  type: types.DELETE_CAMPAIGN_SUCCESS,
  payload: campaignId
});
export const deleteCampaignFailure = error => ({
  type: types.DELETE_CAMPAIGN_FAILURE,
  payload: error
});
