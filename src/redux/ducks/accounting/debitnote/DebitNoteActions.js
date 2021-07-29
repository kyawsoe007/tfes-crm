import * as types from "./DebitNoteTypes";

// Get data of selected model
export const getDebitNote = (e) => ({
  type: types.GET_DEBIT_NOTE,
  payload: e,
});

export const getDebitNoteSuccess = (e) => ({
  type: types.GET_DEBIT_NOTE_SUCCESS,
  payload: e,
});

export const getDebitNoteFailure = (e) => ({
  type: types.GET_DEBIT_NOTE_FAILURE,
  payload: e,
});


export const getFilterDebitNoteRequest = (limit, skip, filter, searchText, orderBy) => ({
  type: types.GET_FILTER_DEBIT_NOTE,
  payload: { limit, skip, filter, searchText, orderBy },
});
export const getFilterDebitNoteSuccess = (data) => ({
  type: types.GET_FILTER_DEBIT_NOTE_SUCCESS,
  payload: data,
});
export const getFilterDebitNoteFailure = (error) => ({
  type: types.GET_FILTER_DEBIT_NOTE_FAILURE,
  payload: error,
});

//get single credit note
export const getSingleDebitNoteRequest = (id) => ({
  type: types.GET_SINGLE_DEBIT_NOTE_REQUEST,
  payload: id,
});
export const getSingleDebitNoteSuccess = (data) => ({
  type: types.GET_SINGLE_DEBIT_NOTE_REQUEST_SUCCESS,
  payload: data,
});
export const getSingleDebitNoteFailure = (error) => ({
  type: types.GET_SINGLE_DEBIT_NOTE_REQUEST_FAILURE,
  payload: error,
});

//patch single credit note
export const patchSingleDebitNote = (data) => ({
  type: types.PATCH_SINGLE_DEBIT_NOTE,
  payload: data,
});
export const patchSingleDebitNoteSuccess = (data) => ({
  type: types.PATCH_SINGLE_DEBIT_NOTE_SUCCESS,
  payload: data,
});
export const patchSingleDebitNoteFailure = (error) => ({
  type: types.PATCH_SINGLE_DEBIT_NOTE_FAILURE,
  payload: error,
});

//delete single credit note
export const deleteDebitNote = (id) => ({
  type: types.DELETE_DEBIT_NOTE,
  payload: id,
});
export const deleteDebitNoteSuccess = (data) => ({
  type: types.DELETE_DEBIT_NOTE_SUCCESS,
  payload: data,
});
export const deleteDebitNoteFailure = (error) => ({
  type: types.DELETE_DEBIT_NOTE_FAILURE,
  payload: error,
});

// Get data of selected model
export const setDebitNote = (data) => ({
  type: types.SET_DEBIT_NOTE,
  payload: data,
});

export const setDebitNoteSuccess = (data) => ({
  type: types.SET_DEBIT_NOTE_SUCCESS,
  payload: data,
});

export const setDebitNoteFailure = (data) => ({
  type: types.SET_DEBIT_NOTE_FAILURE,
  payload: data,
});


export const getDebitNotePdf = (data) => ({
  type: types.GET_DEBIT_NOTE_PDF,
  payload: data
});

export const getDebitNotePdfSuccess = () => ({
  type: types.GET_DEBIT_NOTE_PDF_SUCCESS,
  payload: {}
});

export const getDebitNotePdfFailure = (error) => ({
  type: types.GET_DEBIT_NOTE_PDF_FAILURE,
  payload: error
});

export const getSavedDebitNoteQuery = (data) => ({
  type: types.GET_SAVED_DEBIT_NOTE_QUERY,
  payload:data,
})

export const getSavedDebitNoteQuerySuccess = (data) => ({
  type: types.GET_SAVED_DEBIT_NOTE_QUERY_SUCCESS,
  payload: data,
})

export const getSavedDebitNoteQueryFailure = (data) => ({
  type: types.GET_SAVED_DEBIT_NOTE_QUERY_FAILURE,
  payload: data,
})