/**
 * Auth User Reducers
 */
import { NotificationManager } from 'react-notifications'
import * as types from './AuthTypes'

/**
 * initial auth user
 */
const INIT_STATE = {
  //user: localStorage.getItem('user_id'),
  user: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : {},
  loading: false,
  error: '',
  loggedInUser: {
    access: [],
    baseContact: {}
  },

}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    /**
     * Login User
     */
    // case types.LOGIN_USER:
    //   return { ...state, loading: true };
    // case types.LOGIN_USER_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     user: action.payload.user.userId,
    //     loggedInUser: {
    //       access: action.payload.accessRights,
    //       ...action.payload.userInfo
    //     }
    //   };

    case types.LOGIN_USER:
      return { ...state, loading: true }
    case types.LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload
      }

    case types.LOGIN_USER_FAILURE:
      // if (action.payload.message == 'login failed') {
      //   NotificationManager.error(action.payload.message)

      //   return {
      //     ...state,
      //     loading: false,
      //     error: action.payload.code,
      //     user: {}
      //   }
      // } else {
      //   NotificationManager.error(action.payload.message)

      //   return {
      //     ...state,
      //     loading: false,
      //     error: action.payload.code,
      //     user: action.payload.user
      //   }
      // }
      return {
        ...state,
        loading: false,
        error: action.payload.code,
        user: action.payload.user
      }
    /**
     * User rights
     */
    case types.USER_RIGHTS:
      return { ...state, loading: true }
    case types.USER_RIGHTS_SUCCESS:

      return {
        ...state,
        loading: false,
        loggedInUser: {
          access: action.payload.accessRights,
          ...action.payload.userInfo,
          ...action.payload
        }
      }

    // Warning to take note for every time, Must get fix
    case types.USER_RIGHTS_FAILURE:
      // NotificationManager.error(
      //   'Unable to load access rights. Please logout and try again.'
      // )
      return { ...state, loading: false, error: '' }

    /**
     * Log out User
     */
    case types.LOGOUT_USER:
      return { ...state }
    case types.LOGOUT_USER_SUCCESS:
      return { ...state, user: null }

    case types.LOGOUT_USER_FAILURE:
      NotificationManager.error('Unable to logout"')
      return { ...state }

    /**
     * Edit User
     */

    /* profile stuff */
    // case types.UPDATE_PASSWORD:
    //   return { ...state, loading: true }
    // case types.UPDATE_PASSWORD_SUCCESS:
    //   NotificationManager.success('Password changed successfully.')
    //   return { ...state, loading: false }

    // case types.UPDATE_PASSWORD_FAILURE:
    //   NotificationManager.error(action.payload)
    //   return { ...state, loading: false }
    /**
     * Update current user details
     */
    case types.UPDATE_CURRENT_USER:
      return { ...state, loading: true }
    case types.UPDATE_CURRENT_USER_SUCCESS:
      NotificationManager.success('Personal details updated')
      return {
        ...state,
        loading: false,
        loggedInUser: { access: state.loggedInUser.access, ...action.payload }
      }
    case types.UPDATE_CURRENT_USER_FAILURE:
      NotificationManager.error('Error in updating details')
      return {
        ...state,
        loading: false
      }

         /**
     * Update Movement when user logout
     */
    case types.MOVEMENT_OUT_USER:
      return { ...state, loading: true }
    case types.MOVEMENT_OUT_USER_SUCCESS:
      // NotificationManager.success('Personal details updated')
      return {
        ...state,
        loading: false,
        loggedInUser: { access: state.loggedInUser.access, ...action.payload }
      }
    case types.MOVEMENT_OUT_USER_FAILURE:
      NotificationManager.error('Error in updating details')
      return {
        ...state,
        loading: false
      }


    case types.GET_USER_MY_PROFILE:
      return { ...state, loading: true }

    case types.GET_USER_MY_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload
      }

    case types.GET_USER_MY_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.code,
        user: action.payload.user
      }


    default:
      return { ...state }
  }
}
