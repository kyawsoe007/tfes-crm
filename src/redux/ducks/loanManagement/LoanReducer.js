import * as types from "./LoanTypes";
import { NotificationManager } from "react-notifications";

const INIT_STATE = {
    loanAll: {
        loading: false,
        data: []
    },
    longTermLoanAll: {
        loading: false,
        data: []
    },
    shortTermLoanAll: {
        loading: false,
        data: []
    },

    longLoanSingle: {
        loading: false,
        data: {}
    },
    shortLoanSingle: {
        loading: false,
        data: {}
    },
    SavedShortLoanQuery: {
        saved: false,
        limit: 20,
        skip: 0,
        filter: [],
        filterList: [],
        searchText: ""
    },
    SavedLongLoanQuery: {
        saved: false,
        limit: 20,
        skip: 0,
        filter: [],
        filterList: [],
        searchText: ""
    }
};
export default (state = INIT_STATE, action) => {
    switch (action.type) {
        // Get all loans
        case types.GET_ALL_LONG_TERM_LOANS:
            return {
                ...state,
                longTermLoanAll: {
                    ...state.longTermLoanAll,
                    loading: true,
                },
            };

        case types.GET_ALL_LONG_TERM_LOANS_SUCCESS:

            // console.log("Success in get all long term loan",action.payload)
            return {
                ...state,
                longTermLoanAll: {
                    loading: false,
                    data: action.payload.data,
                },
            };

        case types.GET_ALL_LONG_TERM_LOANS_FAILURE:
            NotificationManager.warning("Error in fetching loan");
            return {
                ...state,
                longTermLoanAll: {
                    loading: false,
                    data: { ...state.longTermLoanAll },
                },
            };
        case types.GET_ALL_SHORT_TERM_LOANS:
            return {
                ...state,
                shortTermLoanAll: {
                    ...state.shortTermLoanAll,
                    loading: true,
                },
            };

        case types.GET_ALL_SHORT_TERM_LOANS_SUCCESS:

            return {
                ...state,
                shortTermLoanAll: {
                    loading: false,
                    data: action.payload[0],
                    count: action.payload[1]
                },
            };

        case types.GET_ALL_SHORT_TERM_LOANS_FAILURE:
            NotificationManager.warning("Error in fetching loan");
            return {
                ...state,
                shortTermLoanAll: {
                    loading: false,
                    data: { ...state.shortTermLoanAll },
                },
            };

        // Get single loan
        case types.GET_SINGLE_LONG_TERM_LOAN:
            return {
                ...state,
                longLoanSingle: {
                    ...state.longLoanSingle,
                    loading: true
                },
            };
        case types.GET_SINGLE_LONG_TERM_LOAN_SUCCESS:
            return {
                ...state,
                longLoanSingle: {
                    loading: false,
                    data: action.payload,
                },
            };
        case types.GET_SINGLE_LONG_TERM_LOAN_FAILURE:
            return {
                ...state,
                longLoanSingle: {
                    ...state.longLoanSingle,
                    loading: false
                },
            };
        case types.GET_SINGLE_SHORT_TERM_LOAN:
            return {
                ...state,
                shortLoanSingle: {
                    ...state.shortLoanSingle,
                    loading: true
                },
            };
        case types.GET_SINGLE_SHORT_TERM_LOAN_SUCCESS:
            return {
                ...state,
                shortLoanSingle: {
                    loading: false,
                    data: action.payload,
                },
            };
        case types.GET_SINGLE_SHORT_TERM_LOAN_FAILURE:
            return {
                ...state,
                shortLoanSingle: {
                    ...state.shortLoanSingle,
                    loading: false
                },
            };

        // post single loan
        case types.POST_SINGLE_LONG_TERM_LOAN:
            return {
                ...state,
                longLoanSingle: {
                    loading: true,
                    ...state.longLoanSingle,
                },
            };

        case types.POST_SINGLE_LONG_TERM_LOAN_SUCCESS:
            NotificationManager.success("Success in creating long term loan");
            return {
                ...state,
                longLoanSingle: {
                    ...state.longLoanSingle,
                    loading: false,
                    data: action.payload
                },
            };

        case types.POST_SINGLE_LONG_TERM_LOAN_FAILURE:
            NotificationManager.warning("Error in creating long term loan");
            return {
                ...state,
                longLoanSingle: {
                    ...state.longLoanSingle,
                    loading: false,
                },
            };
        case types.POST_SINGLE_SHORT_TERM_LOAN:
            return {
                ...state,
                shortLoanSingle: {
                    loading: true,
                    ...state.shortLoanSingle,
                },
            };

        case types.POST_SINGLE_SHORT_TERM_LOAN_SUCCESS:
            NotificationManager.success("Success in creating long term loan");
            return {
                ...state,
                shortLoanSingle: {
                    ...state.shortLoanSingle,
                    loading: false,
                    data: action.payload
                },
            };

        case types.POST_SINGLE_SHORT_TERM_LOAN_FAILURE:
            NotificationManager.warning("Error in creating long term loan");
            return {
                ...state,
                shortLoanSingle: {
                    ...state.shortLoanSingle,
                    loading: false,
                },
            };

        // patch single loan
        case types.PATCH_SINGLE_LONG_TERM_LOAN:
            return {
                ...state,
                longLoanSingle: {
                    loading: true,
                    ...state.longLoanSingle,
                },
            };

        case types.PATCH_SINGLE_LONG_TERM_LOAN_SUCCESS:
            NotificationManager.success("Success in patching long term loan");
            return {
                ...state,
                longLoanSingle: {
                    ...state.longLoanSingle,
                    loading: false,
                    data: action.payload
                },
            };

        case types.PATCH_SINGLE_LONG_TERM_LOAN_FAILURE:
            NotificationManager.warning("Error in patching long term loan");
            return {
                ...state,
                longLoanSingle: {
                    ...state.longLoanSingle,
                    loading: false,
                },
            };

        case types.PATCH_SINGLE_SHORT_TERM_LOAN:
            return {
                ...state,
                shortLoanSingle: {
                    loading: true,
                    ...state.shortLoanSingle,
                },
            };

        case types.PATCH_SINGLE_SHORT_TERM_LOAN_SUCCESS:
            NotificationManager.success("Success in patching long term loan");
            return {
                ...state,
                shortLoanSingle: {
                    ...state.shortLoanSingle,
                    loading: false,
                    data: action.payload
                },
            };

        case types.POST_SINGLE_SHORT_TERM_LOAN_FAILURE:
            NotificationManager.warning("Error in patching long term loan");
            return {
                ...state,
                shortLoanSingle: {
                    ...state.shortLoanSingle,
                    loading: false,
                },
            };

        // delete single loan
        case types.DELETE_LONG_TERM_LOAN:
            console.log("DELETE_LONG_TERM_LOAN in reducer",)
            return {
                ...state,
                longTermLoanAll: {
                    ...state.longTermLoanAll,
                    loading: true,
                },
            };
        case types.DELETE_LONG_TERM_LOAN_SUCCESS:
            NotificationManager.success("LoanSuccessfully Deleted!");
            // console.log("DELETE_LONG_TERM_LOAN_SUCCESS in reducer",action.payload);
            let longTermLoanAll = state.longTermLoanAll.data.filter(
                (e) => e.id !== action.payload
            )
            return {
                ...state,
                longTermLoanAll: {
                    data: longTermLoanAll,
                    loading: false,
                    count: state.longTermLoanAll.count - 1
                },
            };
        case types.DELETE_LONG_TERM_LOAN_FAILURE:
            NotificationManager.success("Error in Deleting Loan");
            //  console.log("DELETE_LONG_TERM_LOAN_FAILURE in reducer" ,action)
            return {
                ...state,
                longTermLoanAll: {
                    ...state.longTermLoanAll,
                    loading: false,
                },
            };

        case types.DELETE_SHORT_TERM_LOAN:
            console.log("DELETE_SHORT_TERM_LOAN in reducer",)
            return {
                ...state,
                shortTermLoanAll: {
                    ...state.shortTermLoanAll,
                    loading: true,
                },
            };
        case types.DELETE_SHORT_TERM_LOAN_SUCCESS:
            NotificationManager.success("Loan Record Successfully Deleted!", action.payload);
            console.log("DELETE_SHORT_TERM_LOAN_SUCCESS in reducer", action.payload);
            let shortTermLoanAll = state.shortTermLoanAll.data.filter(
                (e) => e.id !== action.payload
            )
            return {
                ...state,
                shortTermLoanAll: {
                    data: shortTermLoanAll,
                    loading: false,
                    count: state.shortTermLoanAll.count - 1
                },
            };
        case types.DELETE_SHORT_TERM_LOAN_FAILURE:
            NotificationManager.success("Error in Deleting Loan");
            console.log("DELETE_SHORT_TERM_LOAN_FAILURE in reducer", action.payload)
            return {
                ...state,
                shortTermLoanAll: {
                    ...state.shortTermLoanAll,
                    loading: false,
                },
            };

        case types.GET_SAVED_SHORT_LOAN_QUERY:
            return {
                ...state,
                SavedShortLoanQuery: {
                    ...state.SavedShortLoanQuery,
                    ...action.payload
                }
            }

        case types.GET_SAVED_SHORT_LOAN_QUERY_SUCCESS:
            return {
                ...state,
                SavedShortLoanQuery: {
                    ...state.SavedShortLoanQuery,
                    ...action.payload
                }
            }

        case types.GET_SAVED_SHORT_LOAN_QUERY_FAILURE:
            return {
                ...state,
                SavedShortLoanQuery: {
                    ...state.SavedShortLoanQuery,
                    ...action.payload
                }
            }

        case types.GET_SAVED_LONG_LOAN_QUERY:
            return {
                ...state,
                SavedLongLoanQuery: {
                    ...state.SavedLongLoanQuery,
                    ...action.payload
                }
            }

        case types.GET_SAVED_LONG_LOAN_QUERY_SUCCESS:
            return {
                ...state,
                SavedLongLoanQuery: {
                    ...state.SavedLongLoanQuery,
                    ...action.payload
                }
            }

        case types.GET_SAVED_LONG_LOAN_QUERY_FAILURE:
            return {
                ...state,
                SavedLongLoanQuery: {
                    ...state.SavedLongLoanQuery,
                    ...action.payload
                }
            }


        default:
            return { ...state };

    }
}