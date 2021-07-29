import data from "@iconify/icons-ic/baseline-delete-forever";
import * as types from "./StockExpenseTypes";
// Get data of selected model

// GET all Stock Expenses 
export const getAllStockExpenses = () => ({
    type: types.GET_ALL_STOCK_EXPENSE,
})

export const getAllStockExpensesSuccess = (data) => ({
    type: types.GET_ALL_STOCK_EXPENSE_SUCCESS,
    payload: data
})

export const getAllStockExpensesFailure = (data) => ({
    type: types.GET_ALL_STOCK_EXPENSE_FAILURE,
    payload: data
})



//GET one Stock Expense 
export const getStockExpense = (data) => ({
    type: types.GET_STOCK_EXPENSE,
    payload: data
})

export const getStockExpenseSuccess = (data) => ({
    type: types.GET_STOCK_EXPENSE_SUCCESS,
    payload: data
})

export const getStockExpenseFailure = (data) => ({
    type: types.GET_STOCK_EXPENSE_SUCCESS,
    payload: data
})

// POST one Stock Expense 
export const postStockExpense = (data) => ({
    type: types.POST_STOCK_EXPENSE,
    payload: data
})

export const postStockExpenseSuccess = (data) => ({
    type: types.POST_STOCK_EXPENSE_SUCCESS,
    payload: data
})

export const postStockExpenseFailure = (data) => ({
    type: types.POST_STOCK_EXPENSE_FAILURE,
    payload: data
})

// PATCH one Stock Expense 
export const patchStockExpense = (data) => ({
    type: types.PATCH_STOCK_EXPENSE,
    payload: data
})

export const patchStockExpenseSuccess = (data) => ({
    type: types.PATCH_STOCK_EXPENSE_SUCCESS,
    payload: data
})

export const patchStockExpenseFailure = (data) => ({
    type: types.PATCH_STOCK_EXPENSE_FAILURE,
    payload: data
})

// DELETE one Stock Expense 
export const deleteStockExpense = (data) => ({
    type: types.DELETE_STOCK_EXPENSE,
    payload: data
})

export const deleteStockExpenseSuccess = (data) => ({
    type: types.DELETE_STOCK_EXPENSE_SUCCESS,
    payload: data
})

export const deleteStockExpenseFailure = (data) => ({
    type: types.DELETE_STOCK_EXPENSE_FAILURE,
    payload: data
})

// Save Query
export const getSavedStockExpenseQuery = (data) => ({
    type: types.GET_SAVED_STOCK_EXPENSE_QUERY,
    payload:data,
  })
  
  export const getSavedStockExpenseQuerySuccess = (data) => ({
    type: types.GET_SAVED_STOCK_EXPENSE_QUERY_SUCCESS,
    payload: data,
  })
  
  export const getSavedStockExpenseQueryFailure = (data) => ({
    type: types.GET_SAVED_STOCK_EXPENSE_QUERY_FAILURE,
    payload: data,
  })
