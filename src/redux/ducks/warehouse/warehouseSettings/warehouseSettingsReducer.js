import * as types from './warehouseSettingsTypes';
import { NotificationManager } from 'react-notifications'


const INIT_STATE = {

    stockLocationsAll: {
        loading: false,
        data: []
    },

    stockLocation: {
        loading: false,
        data: {}
    },
}

export default (state = INIT_STATE, action) => {
    let data;
    switch (action.type) {
        //GET all stock locations 
        case types.GET_ALL_STOCK_LOCATIONS:
            // console.log ("JIJIJIJIJIJIJIJIJIJI")
            return {
                ...state,
                stockLocationsAll: {
                    ...state.stockLocationsAll,
                    loading: true,
                    data: action.payload
                }
            }

        case types.GET_ALL_STOCK_LOCATIONS_SUCCESS:
            // console.log("HUHUHUHUHUHUHUHU", { data })
            return {
                ...state,
                stockLocationsAll: {
                    ...state.stockLocationsAll,
                    loading: false,                
                    data: action.payload
                }
            }

        case types.GET_ALL_STOCK_LOCATIONS_FAILURE:
            return {
                ...state,
                stockLocationsAll: {
                    ...state.stockLocationsAll,
                    loading: false,                
                    data: action.payload
                }
            }

        //GET one stock location 
        case types.GET_STOCK_LOCATION: 
            return {
                ...state,
                stockLocation: {
                    ...state.stockLocation,
                    loading: true,
                    data: action.payload
                }
            }
        
        case types.GET_STOCK_LOCATION_SUCCESS:
            return {
                ...state,
                stockLocation: {
                    ...state.stockLocation,
                    loading: false,
                    data: action.payload
                }
            } 

        case types.GET_STOCK_LOCATION_FAILURE:
            return {
                ...state,
                stockLocation: {
                    ...state.stockLocation,
                    loading: false,
                    data: action.payload
                }
            }

        // POST stock location 
        case types.POST_STOCK_LOCATION:
            return {
                ...state,
            }

        case types.POST_STOCK_LOCATION_SUCCESS:
            NotificationManager.success("stock location succesfully created")
            data = [...state.stockLocationsAll.data];
            data.push(action.payload)
            return {
                ...state,
                stockLocationsAll: {
                    loading: false,
                    data: data
                }
            }

        case types.POST_STOCK_LOCATION_FAILURE:
            NotificationManager.error("error in creating stock location")
            return {
                ...state,
                stockLocationsAll: {
                    loading: false,
                }
            }

        // PATCH stock location 
        case types.PATCH_STOCK_LOCATION:
            return {
                ...state,
            }
        
        case types.PATCH_STOCK_LOCATION_SUCCESS:
            NotificationManager.success("successfully edited stock location")
            data = state.stockLocationsAll.data.map(item => item.id === action.payload.id ? action.payload : item);

            return {
                ...state,
                stockLocationsAll: {
                    loading: false,
                    data: data
                }
            }

        case types.PATCH_STOCK_LOCATION_FAILURE:
            NotificationManager.error("error in editing stock location")
            return {
                ...state,
                patchStockLocationBody: {
                    ...state.patchStockLocationBody,
                    loading: false,
                    data: action.payload
                }
            }

        // DELETE one stock location 
        case types.DELETE_STOCK_LOCATION:
            return {
                ...state,
            }

        case types.DELETE_STOCK_LOCATION_SUCCESS:
            NotificationManager.success("stock location deleted!")
            console.log(state.stockLocationsAll.data);
            console.log(action);
            data = state.stockLocationsAll.data.filter(item => item.id !== action.payload.id);
            return {
                ...state,
                stockLocationsAll: {
                    loading: false,
                    data: data
                }
            }

        case types.DELETE_STOCK_LOCATION_FAILURE:
            NotificationManager.error("error in deleting stock location")
            return {
                ...state,
                stockLocationsAll: {
                    loading: false,
                }
            }

        default:
            return { ...state }
    }
}