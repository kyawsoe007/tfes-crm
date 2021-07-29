import * as types from "./CreditNotetfesTypes";

// Get data of selected model
export const getCreditNote = (e) => ({
  type: types.GET_CREDIT_NOTE,
  payload: e,
});

export const getCreditNoteSuccess = (e) => ({
  type: types.GET_CREDIT_NOTE_SUCCESS,
  payload: e,
});

export const getCreditNoteFailure = (e) => ({
  type: types.GET_CREDIT_NOTE_FAILURE,
  payload: e,
});

// Get data for drop down group
export const getDropdownGroup = () => ({
  type: types.GET_DROPDOWN_GROUP
});

export const getDropdownGroupSuccess = (data) => ({
  type: types.GET_DROPDOWN_GROUP_SUCCESS,
  payload: data,
});

export const getDropdownGroupFailure = (e) => ({
  type: types.GET_DROPDOWN_GROUP_FAILURE,
  payload: e,
});

export const getFilterCreditNoteRequest = (limit, skip, filter, searchText, orderBy) => ({
  type: types.GET_FILTER_CREDIT_NOTE,
  payload: { limit, skip, filter, searchText, orderBy },
});
export const getFilterCreditNoteSuccess = (data) => ({
  type: types.GET_FILTER_CREDIT_NOTE_SUCCESS,
  payload: data,
});
export const getFilterCreditNoteFailure = (error) => ({
  type: types.GET_FILTER_CREDIT_NOTE_FAILURE,
  payload: error,
});

//get single credit note
export const getSingleCreditNoteRequest = (id) => ({
  type: types.GET_SINGLE_CREDIT_NOTE_REQUEST,
  payload: id,
});
export const getSingleCreditNoteSuccess = (data) => ({
  type: types.GET_SINGLE_CREDIT_NOTE_REQUEST_SUCCESS,
  payload: data,
});
export const getSingleCreditNoteFailure = (error) => ({
  type: types.GET_SINGLE_CREDIT_NOTE_REQUEST_FAILURE,
  payload: error,
});

//patch single credit note
export const patchSingleCreditNote = (data) => ({
  type: types.PATCH_SINGLE_CREDIT_NOTE,
  payload: data,
});
export const patchSingleCreditNoteSuccess = (data) => ({
  type: types.PATCH_SINGLE_CREDIT_NOTE_SUCCESS,
  payload: data,
});
export const patchSingleCreditNoteFailure = (error) => ({
  type: types.PATCH_SINGLE_CREDIT_NOTE_FAILURE,
  payload: error,
});

//delete single credit note
export const deleteCreditNote = (id) => ({
  type: types.DELETE_CREDIT_NOTE,
  payload: id,
});
export const deleteCreditNoteSuccess = (data) => ({
  type: types.DELETE_CREDIT_NOTE_SUCCESS,
  payload: data,
});
export const deleteCreditNoteFailure = (error) => ({
  type: types.DELETE_CREDIT_NOTE_FAILURE,
  payload: error,
});

// Get data of selected model
export const setCreditNote = (data) => ({
  type: types.SET_CREDIT_NOTE,
  payload: data,
});

export const setCreditNoteSuccess = (data) => ({
  type: types.SET_CREDIT_NOTE_SUCCESS,
  payload: data,
});

export const setCreditNoteFailure = (data) => ({
  type: types.SET_CREDIT_NOTE_FAILURE,
  payload: data,
});

//SET DUPLICATE
// Get data of selected model
export const setDuplicate = (data) => ({
  type: types.SET_DUPLICATE,
  payload: data,
});

export const setDuplicateSuccess = (data) => ({
  type: types.SET_DUPLICATE_SUCCESS,
  payload: data,
});

export const setDuplicateFailure = (data) => ({
  type: types.SET_DUPLICATE_FAILURE,
  payload: data,
});

//CLEAR
// Get data of selected model
export const clearDuplicate = (data) => ({
  type: types.CLEAR_DUPLICATE,
  payload: data,
});

export const clearDuplicateSuccess = (data) => ({
  type: types.CLEAR_DUPLICATE_SUCCESS,
  payload: data,
});

export const clearDuplicateFailure = (data) => ({
  type: types.CLEAR_DUPLICATE_FAILURE,
  payload: data,
});

export const getCreditNotePdf = (data) => ({
  type: types.GET_CREDIT_NOTE_PDF,
  payload: data
});

export const getCreditNotePdfSuccess = () => ({
  type: types.GET_CREDIT_NOTE_PDF_SUCCESS,
  payload: {}
});

export const getCreditNotePdfFailure = (error) => ({
  type: types.GET_CREDIT_NOTE_PDF_FAILURE,
  payload: error
});

export const getSavedCreditNoteQuery = (data) => ({
  type: types.GET_SAVED_CREDIT_NOTE_QUERY,
  payload:data,
})

export const getSavedCreditNoteQuerySuccess = (data) => ({
  type: types.GET_SAVED_CREDIT_NOTE_QUERY_SUCCESS,
  payload: data,
})

export const getSavedCreditNoteQueryFailure = (data) => ({
  type: types.GET_SAVED_CREDIT_NOTE_QUERY_FAILURE,
  payload: data,
})

