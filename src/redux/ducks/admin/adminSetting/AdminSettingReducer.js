import * as types from './AdminSettingTypes';
import { NotificationManager } from 'react-notifications'


const INIT_STATE = {

    adminSettingsAll: {
        loading: false,
        data: []
    },

    adminSettingFiltered: {
        loading: false,
        data: [],
        count: 0,
    },

    adminSetting: {
        loading: false,
        data: {}
    },

    postAdminSettingBody: {
        loading: false,
        data: {}
    },

    patchAdminSettingBody: {
        loading: false,
        data: {}
    },

    deleteAdminSettingBody: {
        loading: false,
        data: {}
    }
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        //GET all Employee Settings 
        case types.GET_ALL_ADMIN_SETTING:
            return {
                ...state,
                adminSettingsAll: {
                    ...state.adminSettingsAll,
                    loading: true
                }
            }

        case types.GET_ALL_ADMIN_SETTING_SUCCESS:
            return {
                ...state,
                adminSettingsAll: {
                    ...state.adminSettingsAll,
                    loading: false,
                    data: action.payload
                }
            }

        case types.GET_ALL_ADMIN_SETTING_FAILURE:
            return {
                ...state,
                adminSettingsAll: {
                    ...state.adminSettingsAll,
                    loading: false
                }
            }

        case types.GET_FILTER_ADMIN_SETTING:
            return {
                ...state,
                adminSettingFiltered: {
                    ...state.adminSettingFiltered,
                    loading: true,
                },
            };

        case types.GET_FILTER_ADMIN_SETTING_SUCCESS:
            return {
                ...state,
                adminSettingFiltered: {
                    loading: false,
                    data: action.payload[0],
                    count: action.payload[1],
                },
            };

        case types.GET_FILTER_ADMIN_SETTING_FAILURE:
            return {
                ...state,
                adminSettingFiltered: {
                    loading: false,
                },
            };

        //GET one Employee Setting 
        case types.GET_ADMIN_SETTING:
            return {
                ...state,
                adminSetting: {
                    ...state.adminSetting,
                    loading: true
                }
            }

        case types.GET_ADMIN_SETTING_SUCCESS:
            return {
                ...state,
                adminSetting: {
                    loading: false,
                    data: action.payload
                }
            }

        case types.GET_ADMIN_SETTING_FAILURE:
            return {
                ...state,
                adminSetting: {
                    ...state.adminSetting,
                    loading: false,
                }
            }

        // POST Employee Setting 
        case types.POST_ADMIN_SETTING:
        case types.PATCH_ADMIN_SETTING:
            return {
                ...state,

            }

        case types.POST_ADMIN_SETTING_SUCCESS:
            NotificationManager.success("Employee Setting succesfully created")
            //insert term into table
            let data = [...state.adminSettingsAll.data];
            data.push(action.payload);
            return {
                ...state,
                adminSettingsAll: {
                    loading: false,
                    data: data
                },
                adminSetting: {
                    loading: false,
                    data: action.payload
                }
            }

        case types.POST_ADMIN_SETTING_FAILURE:
            NotificationManager.error("error in creating Employee Setting")
            return {
                ...state,
            }


        case types.PATCH_ADMIN_SETTING_SUCCESS:
            NotificationManager.success("successfully edited Employee Setting")
            data = state.adminSettingsAll.data.map(item => item.id === action.payload.id ? action.payload : item);
            console.log(action.payload);
            return {
                ...state,
                adminSettingsAll: {
                    loading: false,
                    data: data
                },
                adminSetting: {
                    loading: false,
                    data: action.payload
                }
            }

        case types.PATCH_ADMIN_SETTING_FAILURE:
            NotificationManager.error("error in editing Employee Setting")
            return {
                ...state
            }

        case types.DELETE_ADMIN_SETTING:
            return {
                ...state,
                adminSettingFiltered: {
                    ...state.adminSettingFiltered,
                    loading: true,
                },
            };
        case types.DELETE_ADMIN_SETTING_SUCCESS:
            NotificationManager.success("Employee Setting deleted!")
            let AdminSettingFiltered = state.adminSettingFiltered.data.filter(
                (e) => e.id !== action.payload
            );
            console.log('data', state.adminSettingFiltered.data)
            return {
                ...state,
                adminSettingFiltered: {
                    loading: false,
                    data: AdminSettingFiltered,
                    count: state.adminSettingFiltered.count - 1
                }
            }
        case types.DELETE_ADMIN_SETTING_FAILURE:
            NotificationManager.error("Error in Deleting Employee Setting");
            console.log(action.payload);
            return {
                ...state,
                adminSettingFiltered: {
                    ...state.adminSettingFiltered,
                    loading: false,
                },
            };

        //CLEAR DUPLICATE
        case types.CLEAR_ADMIN_DUPLICATE:
            return {
                ...state,
                adminSetting: {
                    data: [],
                    loading: true,
                },
            };
        case types.CLEAR_ADMIN_DUPLICATE_SUCCESS:
            return {
                adminSetting: {
                    loading: false,
                    data: [],
                },
            };
        case types.CLEAR_ADMIN_DUPLICATE_FAILURE:
            return {
                ...state,
                adminSetting: { data: [], loading: false },
            };

        default:
            return { ...state }
    }
}