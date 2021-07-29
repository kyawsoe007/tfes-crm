import * as types from './JournalTypes'

/**
 * Get Journal List Data
 */
export const getJournalLists = (limit, skip, filter, searchText, orderBy) => ({
  type: types.GET_JOURNAL_LIST,
  payload: { limit, skip, filter, searchText, orderBy },
});

export const getJournalListsSuccess = data => ({
  type: types.GET_JOURNAL_LIST_SUCCESS,
  payload: data
});

export const getJournalListsFailure = error => ({
  type: types.GET_JOURNAL_LIST_FAILURE,
  payload: error
});

/**
 * delete journal entry
 */
export const deleteJournalEntry = (id) => ({
  type: types.DELETE_JOURNAL_ENTRY,
  payload: id
});

export const deleteJournalEntrySuccess = data => ({
  type: types.DELETE_JOURNAL_ENTRY_SUCCESS,
  payload: data
});

export const deleteJournalEntryFailure = error => ({
  type: types.DELETE_JOURNAL_ENTRY_FAILURE,
  payload: error
});

/**
 * get single journal entry
 */
export const getSingleEntryRequest = (id) => ({
  type: types.GET_SINGLE_JOURNAL_ENTRY,
  payload: id
});

export const getSingleEntryRequestSuccess = data => ({
  type: types.GET_SINGLE_JOURNAL_ENTRY_SUCCESS,
  payload: data
});

export const getSingleEntryRequestFailure = error => ({
  type: types.GET_SINGLE_JOURNAL_ENTRY_FAILURE,
  payload: error
});

/**
 * Get Journals Dropdown
 */
export const getJournals = () => ({
  type: types.GET_JOURNALS,
});

export const getJournalsSuccess = data => ({
  type: types.GET_JOURNALS_SUCCESS,
  payload: data
});

export const getJournalsFailure = error => ({
  type: types.GET_JOURNALS_FAILURE,
  payload: error
});

/**
 * Create Journal Entry
 */
export const createJournalEntry = (data) => ({
  type: types.CREATE_JOURNAL_ENTRY,
  payload: data
});

export const createJournalEntrySuccess = data => ({
  type: types.CREATE_JOURNAL_ENTRY_SUCCESS,
  payload: data
});

export const createJournalEntryFailure = error => ({
  type: types.CREATE_JOURNAL_ENTRY_FAILURE,
  payload: error
});

/**
 * Update Journal Entry
 */
export const updateJournalEntry = (data) => ({
  type: types.UPDATE_JOURNAL_ENTRY,
  payload: data
});

export const updateJournalEntrySuccess = data => ({
  type: types.UPDATE_JOURNAL_ENTRY_SUCCESS,
  payload: data
});

export const updateJournalEntryFailure = error => ({
  type: types.UPDATE_JOURNAL_ENTRY_FAILURE,
  payload: error
});

/**
 * Get Journal Partners
 */
 export const getFilterPartnerJournal = (limit, skip, filter, searchText, orderBy) => ({
  type: types.GET_FILTER_PARTNER_JOURNAL,
  payload: { limit, skip, filter, searchText, orderBy },
});
export const getFilterPartnerJournalSuccess = (data) => ({
  type: types.GET_FILTER_PARTNER_JOURNAL_SUCCESS,
  payload: data,
});
export const getFilterPartnerJournalFailure = (error) => ({
  type: types.GET_FILTER_PARTNER_JOURNAL_FAILURE,
  payload: error,
});


/**
 * Get Journal Accounts
 */
export const getFilterAccountJournal = () => ({
  type: types.GET_FILTER_ACCOUNT_JOURNAL,
});

export const getFilterAccountJournalSuccess = data => ({
  type: types.GET_FILTER_ACCOUNT_JOURNAL_SUCCESS,
  payload: data
});

export const getFilterAccountJournalFailure = error => ({
  type: types.GET_FILTER_ACCOUNT_JOURNAL_FAILURE,
  payload: error
});

export const getSavedJournalQuery = (data) => ({
  type: types.GET_SAVED_JOURNAL_QUERY,
  payload:data,
})

export const getSavedJournalQuerySuccess = (data) => ({
  type: types.GET_SAVED_JOURNAL_QUERY_SUCCESS,
  payload: data,
})

export const getSavedJournalQueryFailure = (data) => ({
  type: types.GET_SAVED_JOURNAL_QUERY_FAILURE,
  payload: data,
})