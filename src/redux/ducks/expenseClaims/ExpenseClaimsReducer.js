import * as types from "./ExpenseClaimsTypes";
import { NotificationManager } from "react-notifications";

const INIT_STATE = {
    allExpenseClaims: {
        loading: false,
        data: []
    },

    allFilteredExpenseClaims: {
        loading: false,
        data: [],
        count: 0
    },

    expenseClaims: {
        loading: false,
        data: {}
    }
}

export default (state = INIT_STATE, action) => {
    let newState;
    switch (action.type) {

        // get ALL
        case types.GET_ALL_EXPENSE_CLAIMS:
            return {
                ...state,
                allExpenseClaims: {
                    ...state.allExpenseClaims,
                    loading: true
                }
            }

        case types.GET_ALL_EXPENSE_CLAIMS_SUCCESS:
            return {
                ...state,
                allExpenseClaims: {
                    ...state.allExpenseClaims,
                    loading: false,
                    data: action.payload
                }
            }

        case types.GET_ALL_EXPENSE_CLAIMS_FAILURE:
            return {
                ...state,
                allExpenseClaims: {
                    ...state.allExpenseClaims,
                    loading: false
                }
            }


        case types.GET_ALL_FILTER_EXPENSE_CLAIMS:
            return {
                ...state,
                allFilteredExpenseClaims: {
                    ...state.allFilteredExpenseClaims,
                    loading: true,
                },
            };

        case types.GET_ALL_FILTER_EXPENSE_CLAIMS_SUCCESS:
            return {
                ...state,
                allFilteredExpenseClaims: {
                    loading: false,
                    data: action.payload[0],
                    count: action.payload[1],
                },
            };

        case types.GET_ALL_FILTER_EXPENSE_CLAIMS_FAILURE:
            return {
                ...state,
                allFilteredExpenseClaims: {
                    loading: false,
                },
            };

        // GET ONE 
        case types.GET_EXPENSE_CLAIMS:
            return {
                ...state,
                expenseClaims: {
                    ...state.expenseClaims,
                    loading: true
                }
            }

        case types.GET_EXPENSE_CLAIMS_SUCCESS:
            return {
                ...state,
                expenseClaims: {
                    ...state.expenseClaims,
                    loading: false,
                    data: action.payload
                }
            }

        case types.GET_EXPENSE_CLAIMS_FAILURE:
            return {
                ...state,
                expenseClaims: {
                    ...state.expenseClaims,
                    loading: false
                }
            }

        // POST 
        case types.POST_EXPENSE_CLAIMS:
            return {
                ...state,
                expenseClaims: {
                    ...state.expenseClaims,
                    loading: true
                }
            }

        case types.POST_EXPENSE_CLAIMS_SUCCESS:
            NotificationManager.success('Expense claims created!')
            return {
                ...state,
                expenseClaims: {
                    ...state.expenseClaims,
                    loading: false,
                    data: action.payload
                }
            }

        case types.POST_EXPENSE_CLAIMS_FAILURE:
            NotificationManager.error('Expense claims not created!')
            return {
                ...state,
                expenseClaims: {
                    ...state.expenseClaims,
                    loading: false
                }
            }

        // UPDATE
        case types.PATCH_EXPENSE_CLAIMS:
            return {
                ...state,
                expenseClaims: {
                    ...state.expenseClaims,
                    loading: true
                }
            }

        case types.PATCH_EXPENSE_CLAIMS_SUCCESS:
            NotificationManager.success('Expense claims updated!')
            return {
                ...state,
                expenseClaims: {
                    ...state.expenseClaims,
                    loading: false,
                    data: action.payload
                }
            }

        case types.PATCH_EXPENSE_CLAIMS_FAILURE:
            NotificationManager.error('Expense claims not updated!')
            return {
                ...state,
                expenseClaims: {
                    ...state.expenseClaims,
                    loading: false
                }
            }

        //DELETE
        case types.DELETE_EXPENSE_CLAIMS:
            return {
                ...state,
                allExpenseClaims: {
                    ...state.allExpenseClaims,
                    loading: true
                }
            }

        case types.DELETE_EXPENSE_CLAIMS_SUCCESS:
            NotificationManager.success('Expense claims deleted!')

            let newState = state.allExpenseClaims.data.filter(x => x.id !== action.payload.id);
            return {
                ...state,
                allExpenseClaims: {
                    ...state.allExpenseClaims,
                    loading: false,
                    data: newState
                }
            }

        case types.DELETE_EXPENSE_CLAIMS_FAILURE:
            NotificationManager.success('Expense claims not deleted!')
            return {
                ...state,
                allExpenseClaims: {
                    ...state.allExpenseClaims,
                    loading: false
                }
            }

        default:
            return state
    }
}