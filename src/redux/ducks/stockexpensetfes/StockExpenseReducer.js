import * as types from './StockExpenseTypes';
import { NotificationManager } from 'react-notifications'


const INIT_STATE = {

    allStockExpenses: {
        loading: false,
        data: []
    },

    singleStockExpense: {
        loading: false,
        data: {}
    },
    SavedQuery: {
        saved: false,
        limit: 20,
        skip: 0,
        filter: [],
        filterList: [],
        searchText: ""
    }
    // stockExpensesFiltered: {
    //     loading: false,
    //     data: [],
    //     count: 0,
    //   },

}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        //GET all Stock Expensess 
        case types.GET_ALL_STOCK_EXPENSE:
            // console.log ("types.GET_ALL_STOCK_EXPENSE in reducer")
            return {
                ...state,
                allStockExpenses: {
                    ...state.allStockExpenses,
                    loading: true
                }
            }

        case types.GET_ALL_STOCK_EXPENSE_SUCCESS:
            // console.log("HUHUHUHUHUHUHUHU", { data })
            return {
                ...state,
                allStockExpenses: {
                    ...state.allStockExpenses,
                    loading: false,
                    data: action.payload
                }
            }

        case types.GET_ALL_STOCK_EXPENSE_FAILURE:
            NotificationManager.warning("Error in fetching Stock Expenses");
            return {
                ...state,
                allStockExpenses: {
                    ...state.allStockExpenses,
                    loading: false
                }
            }

        //GET one Stock Expenses 
        case types.GET_STOCK_EXPENSE:
            return {
                ...state,
                singleStockExpense: {
                    ...state.capex,
                    loading: true
                }
            }

        case types.GET_STOCK_EXPENSE_SUCCESS:
            return {
                ...state,
                singleStockExpense: {
                    loading: false,
                    data: action.payload
                }
            }

        case types.GET_STOCK_EXPENSE_FAILURE:
            return {
                ...state,
                singleStockExpense: {
                    ...state.capex,
                    loading: false,
                }
            }

        // POST Stock Expenses 
        case types.POST_STOCK_EXPENSE:
        case types.PATCH_STOCK_EXPENSE:
        case types.DELETE_STOCK_EXPENSE:
            return {
                ...state,

            }

        case types.POST_STOCK_EXPENSE_SUCCESS:
            NotificationManager.success("Stock Expenses succesfully created")
            //insert term into table
            let data = [...state.allStockExpenses.data];
            data.push(action.payload);
            return {
                ...state,
                allStockExpenses: {
                    loading: false,
                    data: data
                },
                singleStockExpense: {
                    loading: false,
                    data: action.payload
                }
            }

        case types.POST_STOCK_EXPENSE_FAILURE:
            NotificationManager.error("error in creating Stock Expenses")
            return {
                ...state,
            }


        case types.PATCH_STOCK_EXPENSE_SUCCESS:
            NotificationManager.success("successfully edited Stock Expenses")
            data = state.allStockExpenses.data.map(item => item.id === action.payload.id ? action.payload : item);
            console.log(action.payload);
            return {
                ...state,
                allStockExpenses: {
                    loading: false,
                    data: data
                },
                singleStockExpense: {
                    loading: false,
                    data: action.payload
                }
            }

        case types.PATCH_STOCK_EXPENSE_FAILURE:
            NotificationManager.error("error in editing Stock Expenses")
            return {
                ...state
            }


        case types.DELETE_STOCK_EXPENSE_SUCCESS:
            NotificationManager.success("Stock Expenses deleted!")
            data = state.allStockExpenses.data.filter(item => item.id !== action.payload.id);

            return {
                ...state,
                allStockExpenses: {
                    loading: false,
                    data: data
                }
            }

        case types.DELETE_STOCK_EXPENSE_FAILURE:
            NotificationManager.error("error in deleting Stock Expenses")
            return {
                ...state
            }

        case types.GET_SAVED_STOCK_EXPENSE_QUERY:
            return {
                ...state,
                SavedQuery: {
                    ...state.SavedQuery,
                    ...action.payload
                }
            }

        case types.GET_SAVED_STOCK_EXPENSE_QUERY_SUCCESS:
            return {
                ...state,
                SavedQuery: {
                    ...state.SavedQuery,
                    ...action.payload
                }
            }

        case types.GET_SAVED_STOCK_EXPENSE_QUERY_FAILURE:
            // NotificationManager.warning('Error in fetching QuotationPdfCreate')
            return {
                ...state,
                SavedQuery: {
                    ...state.SavedQuery,
                    ...action.payload
                }
            }

        default:
            return { ...state }
    }
}