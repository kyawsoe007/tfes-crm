import * as types from './LeaveManagementTypes';
import { NotificationManager } from 'react-notifications'


const INIT_STATE = {

    leaveManagementsAll: {
        loading: false,
        data: []
    },

    leaveManagementFiltered: {
        loading: false,
        data: [],
        count: 0,
    },

    leaveManagement: {
        loading: false,
        data: {}
    },

    postleaveManagementBody: {
        loading: false,
        data: {}
    },

    patchleaveManagementBody: {
        loading: false,
        data: {}
    },

    deleteleaveManagementBody: {
        loading: false,
        data: {}
    }
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        //GET all Leave Managements 
        case types.GET_ALL_LEAVE_MANAGEMENT:
            return {
                ...state,
                leaveManagementsAll: {
                    ...state.leaveManagementsAll,
                    loading: true
                }
            }

        case types.GET_ALL_LEAVE_MANAGEMENT_SUCCESS:
            return {
                ...state,
                leaveManagementsAll: {
                    ...state.leaveManagementsAll,
                    loading: false,
                    data: action.payload
                }
            }

        case types.GET_ALL_LEAVE_MANAGEMENT_FAILURE:
            return {
                ...state,
                leaveManagementsAll: {
                    ...state.leaveManagementsAll,
                    loading: false
                }
            }

        case types.GET_FILTER_LEAVE_MANAGEMENT:
            return {
                ...state,
                leaveManagementFiltered: {
                    ...state.leaveManagementFiltered,
                    loading: true,
                },
            };

        case types.GET_FILTER_LEAVE_MANAGEMENT_SUCCESS:
            return {
                ...state,
                leaveManagementFiltered: {
                    loading: false,
                    data: action.payload[0],
                    count: action.payload[1],
                },
            };

        case types.GET_FILTER_LEAVE_MANAGEMENT_FAILURE:
            return {
                ...state,
                leaveManagementFiltered: {
                    loading: false,
                },
            };

        //GET one Leave Management 
        case types.GET_LEAVE_MANAGEMENT:
            return {
                ...state,
                leaveManagement: {
                    ...state.leaveManagement,
                    loading: true
                }
            }

        case types.GET_LEAVE_MANAGEMENT_SUCCESS:
            return {
                ...state,
                leaveManagement: {
                    loading: false,
                    data: action.payload
                }
            }

        case types.GET_LEAVE_MANAGEMENT_FAILURE:
            return {
                ...state,
                leaveManagement: {
                    ...state.leaveManagement,
                    loading: false,
                }
            }

        // POST Leave Management 
        case types.POST_LEAVE_MANAGEMENT:
        case types.PATCH_LEAVE_MANAGEMENT:
            return {
                ...state,

            }

        case types.POST_LEAVE_MANAGEMENT_SUCCESS:
            NotificationManager.success("Leave Management succesfully created")
            //insert term into table
            let data = [...state.leaveManagementsAll.data];
            data.push(action.payload);
            return {
                ...state,
                leaveManagementsAll: {
                    loading: false,
                    data: data
                },
                leaveManagement: {
                    loading: false,
                    data: action.payload
                }
            }

        case types.POST_LEAVE_MANAGEMENT_FAILURE:
            NotificationManager.error("error in creating Leave Management")
            return {
                ...state,
            }


        case types.PATCH_LEAVE_MANAGEMENT_SUCCESS:
            NotificationManager.success("successfully edited Leave Management")
            data = state.leaveManagementsAll.data.map(item => item.id === action.payload.id ? action.payload : item);
            console.log(action.payload);
            return {
                ...state,
                leaveManagementsAll: {
                    loading: false,
                    data: data
                },
                leaveManagement: {
                    loading: false,
                    data: action.payload
                }
            }

        case types.PATCH_LEAVE_MANAGEMENT_FAILURE:
            NotificationManager.error("error in editing Leave Management")
            return {
                ...state
            }

        case types.DELETE_LEAVE_MANAGEMENT:
            return {
                ...state,
                leaveManagementFiltered: {
                    ...state.leaveManagementFiltered,
                    loading: true,
                },
            };
        case types.DELETE_LEAVE_MANAGEMENT_SUCCESS:
            NotificationManager.success("Leave Management deleted!")
            let leaveManagementFiltered = state.leaveManagementFiltered.data.filter(
                (e) => e.id !== action.payload
            );
            console.log('data', state.leaveManagementFiltered.data)
            return {
                ...state,
                leaveManagementFiltered: {
                    loading: false,
                    data: leaveManagementFiltered,
                    count: state.leaveManagementFiltered.count - 1
                }
            }
        case types.DELETE_LEAVE_MANAGEMENT_FAILURE:
            NotificationManager.error("Error in Deleting Leave Management");
            console.log(action.payload);
            return {
                ...state,
                leaveManagementFiltered: {
                    ...state.leaveManagementFiltered,
                    loading: false,
                },
            };

        //CLEAR DUPLICATE
        case types.CLEAR_DUPLICATE:
            return {
                ...state,
                leaveManagement: {
                    data: [],
                    loading: true,
                },
            };
        case types.CLEAR_DUPLICATE_SUCCESS:
            return {
                leaveManagement: {
                    loading: false,
                    data: [],
                },
            };
        case types.CLEAR_DUPLICATE_FAILURE:
            return {
                ...state,
                leaveManagement: { data: [], loading: false },
            };

        default:
            return { ...state }
    }
}