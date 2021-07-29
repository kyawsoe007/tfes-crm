import * as Types from "./CreditNoteTypes";

/**
 * Get All CreditNote
 */
export const getAllCreditNote = data => ({
  type: Types.GET_ALL_CREDIT_NOTE,
  payload: data
});
export const getAllCreditNoteSuccess = data => ({
  type: Types.GET_ALL_CREDIT_NOTE_SUCCESS,
  payload: data
});
export const getAllCreditNoteFailure = () => ({
  type: Types.GET_ALL_CREDIT_NOTE_FAILTURE
});



/**
 * Get Single CreditNote
 */
export const getSingleCreditNote = data => ({
  type: Types.GET_SINGLE_CREDIT_NOTE,
  payload: data
});
export const getSingleCreditNoteSuccess = data => ({
  type: Types.GET_SINGLE_CREDIT_NOTE_SUCCESS,
  payload: data
});
export const getSingleCreditNoteFailure = () => ({
  type: Types.GET_SINGLE_CREDIT_NOTE_FAILURE,
});


/**
 * Post Single CreditNote
 */
export const postSingleCreditNote = data => ({
  type: Types.POST_SINGLE_CREDIT_NOTE,
  payload: data
});
export const postSingleCreditNoteSuccess = data => ({
  type: Types.POST_SINGLE_CREDIT_NOTE_SUCCESS,
  payload: data
});
export const postSingleCreditNoteFailure = () => ({
  type: Types.POST_SINGLE_CREDIT_NOTE_FAILURE,
});


/**
 * Post Single CreditNote
 */
export const convertSingleCreditNote = data => ({
  type: Types.CONVERT_SINGLE_CREDIT_NOTE,
  payload: data
});
export const converSingleCreditNoteSuccess = data => ({
  type: Types.CONVERT_SINGLE_CREDIT_NOTE_SUCCESS,
  payload: data
});
export const converSingleCreditNoteFailure = () => ({
  type: Types.CONVERT_SINGLE_CREDIT_NOTE_FAILURE,
});




