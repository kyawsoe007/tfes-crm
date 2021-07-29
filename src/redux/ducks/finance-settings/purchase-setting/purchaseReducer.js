import * as types from './purchaseTypes';
import { NotificationManager } from 'react-notifications'


const INIT_STATE = {

    purchaseSettingsAll: {
        loading: false,
        data: []
    },

    purchaseSetting: {
        loading: false,
        data: {}
    }
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        //GET all Purchase Settings 
        case types.GET_ALL_PURCHASE_SETTINGS:
            // console.log ("JIJIJIJIJIJIJIJIJIJI")
            return {
                ...state,
                purchaseSettingsAll: {
                    ...state.purchaseSettingsAll,
                    loading: true
                }
            }

        case types.GET_ALL_PURCHASE_SETTINGS_SUCCESS:
            // console.log("HUHUHUHUHUHUHUHU", { data })
            return {
                ...state,
                purchaseSettingsAll: {
                    ...state.purchaseSettingsAll,
                    loading: false,                
                    data: action.payload
                }
            }

        case types.GET_ALL_PURCHASE_SETTINGS_FAILURE:
            return {
                ...state,
                purchaseSettingsAll: {
                    ...state.purchaseSettingsAll,
                    loading: false
                }
            }

        //GET one Purchase Setting 
        case types.GET_PURCHASE_SETTING: 
            return {
                ...state,
                purchaseSetting: {
                    ...state.purchaseSetting,
                    loading: true
                }
            }
        
        case types.GET_PURCHASE_SETTING_SUCCESS:
            return {
                ...state,
                purchaseSetting: {
                    ...state.purchaseSetting,
                    loading: false,
                    data: action.payload
                }
            } 

        case types.GET_PURCHASE_SETTING_FAILURE:
            return {
                ...state,
                purchaseSetting: {
                    ...state.purchaseSetting,
                    loading: false,
                    data: action.payload
                }
            }

        // POST Purchase Setting 
        case types.POST_PURCHASE_SETTING:
        case types.PATCH_PURCHASE_SETTING:
        case types.DELETE_PURCHASE_SETTING:
            return {
                ...state,
                
            }

        case types.POST_PURCHASE_SETTING_SUCCESS:
            NotificationManager.success("Purchase Setting succesfully created")
            //insert term into table
            let data = [...state.purchaseSettingsAll.data];
            data.push(action.payload);
            return {
                ...state,
                purchaseSettingsAll: {
                    loading:false,
                    data: data
                }
            }

        case types.POST_PURCHASE_SETTING_FAILURE:
            NotificationManager.error("error in creating Purchase Setting")
            return {
                ...state,                
            }


        case types.PATCH_PURCHASE_SETTING_SUCCESS:
            NotificationManager.success("successfully edited Purchase Setting")
            data = state.purchaseSettingsAll.data.map(item => item.id === action.payload.id ? action.payload : item);
            console.log(action.payload);
            return {
                ...state,
                purchaseSettingsAll: {
                    loading: false,
                    data: data
                }
            }

        case types.PATCH_PURCHASE_SETTING_FAILURE:
            NotificationManager.error("error in editing Purchase Setting")
            return {
                ...state
            }


        case types.DELETE_PURCHASE_SETTING_SUCCESS:
            NotificationManager.success("Purchase Setting deleted!")
            data = state.purchaseSettingsAll.data.filter(item => item.id !== action.payload.id);

            return {
                ...state,
                purchaseSettingsAll: {
                    loading: false,
                    data: data
                }
            }

        case types.DELETE_PURCHASE_SETTING_FAILURE:
            NotificationManager.error("error in deleting Purchase Setting")
            return {
                ...state
            }

        default:
            return { ...state }
    }
}