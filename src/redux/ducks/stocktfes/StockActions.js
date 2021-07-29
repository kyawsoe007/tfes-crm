import * as types from "./StockTypes";

export const getAllStocks = () => ({
    type: types.GET_ALL_STOCKS
});
export const getAllStocksSuccess = data => ({
    type: types.GET_ALL_STOCKS_SUCCESS,
    payload: data
});
export const getAllStocksFailure = error => ({
    type: types.GET_ALL_STOCKS_FAILURE,
    payload: error
});

// GET FILTERED STOCKS
export const getFilterStocks = (
    limit,
    skip,
    filter,
    searchText,
    orderBy
) => ({
    type: types.GET_FILTER_STOCKS,
    payload: { limit, skip, filter, searchText, orderBy },
});
export const getFilterStocksSuccess = (data) => ({
    type: types.GET_FILTER_STOCKS_SUCCESS,
    payload: data,
});
export const getFilterStocksFailure = (error) => ({
    type: types.GET_FILTER_STOCKS_FAILURE,
    payload: error,
});

//get move lines
export const getMoveLines = (data) => ({
    type: types.GET_MOVE_LINE,
    payload: data
});
export const getMoveLinesSuccess = data => ({
    type: types.GET_MOVE_LINE_SUCCESS,
    payload: data
});
export const getMoveLinesFailure = error => ({
    type: types.GET_MOVE_LINE_FAILURE,
    payload: error
});

//save receive form
export const saveOperationForm = (data) => ({
    type: types.SAVE_OPERATION_FORM,
    payload: data
});
export const saveOperationFormSuccess = data => ({
    type: types.SAVE_OPERATION_FORM_SUCCESS,
    payload: data
});
export const saveOperationFormFailure = error => ({
    type: types.SAVE_OPERATION_FORM_FAILURE,
    payload: error
});

// GET FILTERED STOCKS
export const getFilterMoves = (
    limit,
    skip,
    filter,
    searchText,
    orderBy
) => ({
    type: types.GET_FILTER_MOVES,
    payload: { limit, skip, filter, searchText, orderBy },
});
export const getFilterMovesSuccess = (data) => ({
    type: types.GET_FILTER_MOVES_SUCCESS,
    payload: data,
});
export const getFilterMovesFailure = (error) => ({
    type: types.GET_FILTER_MOVES_FAILURE,
    payload: error,
});

//Create Stock Operation form
export const createStockOperationForm = (data) => ({
    type: types.CREATE_STOCK_OPERATION,
    payload: data
});
export const createStockOperationFormSuccess = data => ({
    type: types.CREATE_STOCK_OPERATION_SUCCESS,
    payload: data
});
export const createStockOperationFormFailure = error => ({
    type: types.CREATE_STOCK_OPERATION_FAILURE,
    payload: error
});

export const getSavedStockQuery = (data) => ({
    type: types.GET_SAVED_STOCK_QUERY,
    payload:data,
  })
  
export const getSavedStockQuerySuccess = (data) => ({
    type: types.GET_SAVED_STOCK_QUERY_SUCCESS,
    payload: data,
})

export const getSavedStockQueryFailure = (data) => ({
    type: types.GET_SAVED_STOCK_QUERY_FAILURE,
    payload: data,
})
