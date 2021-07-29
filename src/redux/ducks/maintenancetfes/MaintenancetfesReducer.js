import * as types from './MaintenancetfesTypes';
import { NotificationManager } from 'react-notifications'


const INIT_STATE = {
    rolesAll: {
        loading: false,
        data: []
    },
    postRoleBody: {
        loading: false,
        data: {}
    },
    userRole: {
        loading: false,
        data: {}
    },
    patchUserRoleBody: {
        loading: false,
        data: {}
    },
    deleteRoleBody: {
        loading: false,
        data: {}
    }
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        //GET ALL ROLES 
        case types.GET_ALL_USER_ROLES:
            // console.log ("JIJIJIJIJIJIJIJIJIJI")
            return {
                ...state,
                rolesAll: {
                    ...state.rolesAll,
                    loading: true
                }
            }

        case types.GET_ALL_USER_ROLES_SUCCESS:
            // console.log("HUHUHUHUHUHUHUHU", { data })
            return {
                ...state,
                rolesAll: {
                    ...state.rolesAll,
                    loading: false,                
                    data: action.payload
                }
            }

        case types.GET_ALL_USER_ROLES_FAILURE:
            NotificationManager.warning('Error in fetching Roles')
            return {
                ...state,
                rolesAll: {
                    ...state.rolesAll,
                    loading: false,                
                    data: action.payload
                }
            }


        //CREATE NEW ROLE  
        case types.POST_USER_ROLE:
            // NotificationManager.warning('Error in fetching Roles')
            return {
                ...state,
                postRoleBody: {
                    ...state.postRoleBody,
                    loading: true,                
                    data: action.payload
                }
            }

        case types.POST_USER_ROLE_SUCCESS:
            NotificationManager.success('User role created!')
            return {
                ...state,
                postRoleBody: {
                    ...state.postRoleBody,
                    loading: false,                
                    data: action.payload
                }
            }

        case types.POST_USER_ROLE_FAILURE:
            NotificationManager.error('User role not created!')
            return {
                ...state,
                postRoleBody: {
                    ...state.postRoleBody,
                    loading: false,                
                    data: action.payload
                }
            }

        

        // GET USER ROLE 
        case types.GET_USER_ROLE:
            // NotificationManager.warning('Error in fetching Roles')
            return {
                ...state,
                userRole: {
                    ...state.userRole,
                    loading: true,                
                    data: action.payload
                }
            }

        case types.GET_USER_ROLE_SUCCESS:
            // NotificationManager.warning('Error in fetching Roles')
            return {
                ...state,
                userRole: {
                    ...state.userRole,
                    loading: false,                
                    data: action.payload
                }
            }

        case types.GET_USER_ROLE_FAILURE:
            // NotificationManager.warning('Error in fetching Roles')
            return {
                ...state,
                userRole: {
                    ...state.userRole,
                    loading: false,                
                    data: action.payload
                }
            }



        // PATCH USER ROLE 
        case types.PATCH_USER_ROLE:
            // NotificationManager.warning('Error in fetching Roles')
            return {
                ...state,
                patchUserRoleBody: {
                    ...state.patchUserRoleBody,
                    loading: true,                
                    data: action.payload
                }
            }

        case types.PATCH_USER_ROLE_SUCCESS:
            NotificationManager.success('User role edited!')
            return {
                ...state,
                patchUserRoleBody: {
                    ...state.patchUserRoleBody,
                    loading: false,                
                    data: action.payload
                }
            }

        case types.PATCH_USER_ROLE_FAILURE:
            NotificationManager.warning('User role edit error!')
            return {
                ...state,
                patchUserRoleBody: {
                    ...state.patchUserRoleBody,
                    loading: false,                
                    data: action.payload
                }
            }

        
        // DELETE ROLE 
        case types.DELETE_USER_ROLE:
            // NotificationManager.warning('Error in fetching Roles')
            return {
                ...state,
                deleteRoleBody: {
                    ...state.deleteRoleBody,
                    loading: true,                
                    data: action.payload
                }
            }

        case types.DELETE_USER_ROLE_SUCCESS:
            NotificationManager.success('Role sucesfully deleted')
            return {
                ...state,
                deleteRoleBody: {
                    ...state.deleteRoleBody,
                    loading: false,                
                    data: action.payload
                }
            }

        case types.DELETE_USER_ROLE_FAILURE:
            NotificationManager.warning('Error in deleting Role')
            return {
                ...state,
                deleteRoleBody: {
                    ...state.deleteRoleBody,
                    loading: false,                
                    data: action.payload
                }
            }

        default:
            return { ...state }
    }
}