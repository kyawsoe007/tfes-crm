
import data from "@iconify/icons-ic/baseline-delete-forever";
import * as types from "./account-journalTypes";

// Get data of selected model

// GET all ACCOUNT JOURNALs 
export const getAllAccountJournals = () => ({
    type: types.GET_ALL_ACCOUNT_JOURNALS,
})

export const getAllAccountJournalsSuccess = (data) => ({
    type: types.GET_ALL_ACCOUNT_JOURNALS_SUCCESS,
    payload: data
})

export const getAllAccountJournalsFailure = (data) => ({
    type: types.GET_ALL_ACCOUNT_JOURNALS_FAILURE,
    payload: data
})

//GET one ACCOUNT JOURNAL 
export const getAccountJournal = (data) => ({
    type: types.GET_ACCOUNT_JOURNAL,
    payload: data
})

export const getAccountJournalSuccess = (data) => ({
    type: types.GET_ACCOUNT_JOURNAL_SUCCESS,
    payload: data
})

export const getAccountJournalFailure = (data) => ({
    type: types.GET_ACCOUNT_JOURNAL_SUCCESS,
    payload: data
})

// POST one ACCOUNT JOURNAL 
export const postAccountJournal = (data) => ({
    type: types.POST_ACCOUNT_JOURNAL,
    payload: data
})

export const postAccountJournalSuccess = (data) => ({
    type: types.POST_ACCOUNT_JOURNAL_SUCCESS,
    payload: data
})

export const postAccountJournalFailure = (data) => ({
    type: types.POST_ACCOUNT_JOURNAL_FAILURE,
    payload: data
})

// PATCH one ACCOUNT JOURNAL 
export const patchAccountJournal = (data) => ({
    type: types.PATCH_ACCOUNT_JOURNAL,
    payload: data
})

export const patchAccountJournalSuccess = (data) => ({
    type: types.PATCH_ACCOUNT_JOURNAL_SUCCESS,
    payload: data
})

export const patchAccountJournalFailure = (data) => ({
    type: types.PATCH_ACCOUNT_JOURNAL_FAILURE,
    payload: data
})

// DELETE one ACCOUNT JOURNAL 
export const deleteAccountJournal = (data) => ({
    type: types.DELETE_ACCOUNT_JOURNAL,
    payload: data
})

export const deleteAccountJournalSuccess = (data) => ({
    type: types.DELETE_ACCOUNT_JOURNAL_SUCCESS,
    payload: data
})

export const deleteAccountJournalFailure = (data) => ({
    type: types.DELETE_ACCOUNT_JOURNAL_FAILURE,
    payload: data
})