import * as types from "./LoanTypes";
// GET ALL LOANS
export const getAllLongTermLoans = (data) => ({
    type: types.GET_ALL_LONG_TERM_LOANS,
    payload: data,
})
export const getAllLongTermLoansSuccess = (data) => ({
    type: types.GET_ALL_LONG_TERM_LOANS_SUCCESS,
    payload: data,
})
export const getAllLongTermLoansFailure = (error) => ({
    type: types.GET_ALL_LONG_TERM_LOANS_FAILURE,
    payload: error,
})
export const getAllShortTermLoans = (limit, skip, filter, searchText, orderBy) => ({
    type: types.GET_ALL_SHORT_TERM_LOANS,
    payload: { limit, skip, filter, searchText, orderBy },
})
export const getAllShortTermLoansSuccess = (data) => ({
    type: types.GET_ALL_SHORT_TERM_LOANS_SUCCESS,
    payload: data,
})
export const getAllShortTermLoansFailure = (error) => ({
    type: types.GET_ALL_SHORT_TERM_LOANS_FAILURE,
    payload: error,
})

// GET SINGLE LOAN
export const getSingleLongTermLoan = (id) => ({
    type: types.GET_SINGLE_LONG_TERM_LOAN,
    payload: id,
});
export const getSingleLongTermLoanSuccess = (data) => ({
    type: types.GET_SINGLE_LONG_TERM_LOAN_SUCCESS,
    payload: data,
});
export const getSingleLongTermLoanFailure = (error) => ({
    type: types.GET_SINGLE_LONG_TERM_LOAN_FAILURE,
    payload: error,
});
export const getSingleShortTermLoan = (id) => ({
    type: types.GET_SINGLE_SHORT_TERM_LOAN,
    payload: id,
});
export const getSingleShortTermLoanSuccess = (data) => ({
    type: types.GET_SINGLE_SHORT_TERM_LOAN_SUCCESS,
    payload: data,
});
export const getSingleShortTermLoanFailure = (error) => ({
    type: types.GET_SINGLE_SHORT_TERM_LOAN_FAILURE,
    payload: error,
});

// POET SINGLE LOAN
export const postSingleLongTermLoan = (data) => ({
    type: types.POST_SINGLE_LONG_TERM_LOAN,
    payload: data,
});
export const postSingleLongTermLoanSuccess = (data) => ({
    type: types.POST_SINGLE_LONG_TERM_LOAN_SUCCESS,
    payload: data,
});
export const postSingleLongTermLoanFailure = (data) => ({
    type: types.POST_SINGLE_LONG_TERM_LOAN_FAILURE,
    payload: data,
});
export const postSingleShortTermLoan = (data) => ({
    type: types.POST_SINGLE_SHORT_TERM_LOAN,
    payload: data,
});
export const postSingleShortTermLoanSuccess = (data) => ({
    type: types.POST_SINGLE_SHORT_TERM_LOAN_SUCCESS,
    payload: data,
});

export const postSingleShortTermLoanFailure = (data) => ({
    type: types.POST_SINGLE_SHORT_TERM_LOAN_FAILURE,
    payload: data,
});

// PATCH SINGLE LOAN
export const patchSingleLongTermLoan = (data) => ({
    type: types.PATCH_SINGLE_LONG_TERM_LOAN,
    payload: data,
});
export const patchSingleLongTermLoanSuccess = (data) => ({
    type: types.PATCH_SINGLE_LONG_TERM_LOAN_SUCCESS,
    payload: data,
});
export const patchSingleLongTermLoanFailure = (error) => ({
    type: types.PATCH_SINGLE_LONG_TERM_LOAN_FAILURE,
    payload: error,
});
export const patchSingleShortTermLoan = (data) => ({
    type: types.PATCH_SINGLE_SHORT_TERM_LOAN,
    payload: data,
});
export const patchSingleShortTermLoanSuccess = (data) => ({
    type: types.PATCH_SINGLE_SHORT_TERM_LOAN_SUCCESS,
    payload: data,
});
export const patchSingleShortTermLoanFailure = (error) => ({
    type: types.PATCH_SINGLE_SHORT_TERM_LOAN_FAILURE,
    payload: error,
});

// DELETE SINGLE LOAN
export const deleteLongTermLoan = (data) => ({
    type: types.DELETE_LONG_TERM_LOAN,
    payload: data,
})
export const deleteLongTermLoanSuccess = (data) => ({
    type: types.DELETE_LONG_TERM_LOAN_SUCCESS,
    payload: data,
})
export const deleteLongTermLoanFailure = (error) => ({
    type: types.DELETE_LONG_TERM_LOAN_FAILURE,
    payload: error,
})
export const deleteShortTermLoan = (data) => ({
    type: types.DELETE_SHORT_TERM_LOAN,
    payload: data,
})
export const deleteShortTermLoanSuccess = (data) => ({
    type: types.DELETE_SHORT_TERM_LOAN_SUCCESS,
    payload: data,
})
export const deleteShortTermLoanFailure = (error) => ({
    type: types.DELETE_SHORT_TERM_LOAN_FAILURE,
    payload: error,
})

// Save Query for Short Term Loan
export const getSavedShortLoanQuery = (data) => ({
    type: types.GET_SAVED_SHORT_LOAN_QUERY,
    payload: data,
})

export const getSavedShortLoanQuerySuccess = (data) => ({
    type: types.GET_SAVED_SHORT_LOAN_QUERY_SUCCESS,
    payload: data,
})

export const getSavedShortLoanQueryFailure = (data) => ({
    type: types.GET_SAVED_SHORT_LOAN_QUERY_FAILURE,
    payload: data,
})

// Save Query for Long Term Loan
export const getSavedLongLoanQuery = (data) => ({
    type: types.GET_SAVED_LONG_LOAN_QUERY,
    payload: data,
})

export const getSavedLongLoanQuerySuccess = (data) => ({
    type: types.GET_SAVED_LONG_LOAN_QUERY_SUCCESS,
    payload: data,
})

export const getSavedLongLoanQueryFailure = (data) => ({
    type: types.GET_SAVED_LONG_LOAN_QUERY_FAILURE,
    payload: data,
})
