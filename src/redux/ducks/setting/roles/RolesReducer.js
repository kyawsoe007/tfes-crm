// /**
//  * Roles Reducers
//  */
// import { NotificationManager } from "react-notifications";
// import {
//   GET_ALL_ROLES,
//   GET_ALL_ROLES_SUCCESS,
//   GET_ALL_ROLES_FAILURE,
//   ADD_ROLE,
//   ADD_ROLE_SUCCESS,
//   ADD_ROLE_FAILURE,
//   ON_CHANGE_UPDATE_ROLE,
//   ON_CHANGE_UPDATE_ROLE_RIGHTS,
//   UPDATE_ROLE,
//   UPDATE_ROLE_SUCCESS,
//   UPDATE_ROLE_FAILURE,
//   DELETE_ROLE,
//   DELETE_ROLE_SUCCESS,
//   DELETE_ROLE_FAILURE,
//   GET_ROLE_FAILURE
// } from "./RolesTypes";

// const INIT_STATE = {
//   allRoles: null,
//   loading: false
// };

// export default (state = INIT_STATE, action) => {
//   switch (action.type) {
//     /**
//      * Get All Roles
//      */
//     case GET_ALL_ROLES:
//       return {
//         ...state,
//         loading: true
//       };
//     case GET_ALL_ROLES_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         allRoles: action.payload
//       };

//     case GET_ALL_ROLES_FAILURE:
//       NotificationManager.error("Error in fetching roles");
//       return { ...state, loading: false };

//     /**
//      * Add Role
//      */
//     case ADD_ROLE:
//       return {
//         ...state,
//         loading: true
//       };
//     case ADD_ROLE_SUCCESS:
//       var allRoles = Object.assign([], state.accessRoles);
//       var accessRoles = [...allRoles, action.payload];
//       NotificationManager.success("New Role Created");
//       return {
//         ...state,
//         allRoles: accessRoles,
//         loading: false
//       };
//     case ADD_ROLE_FAILURE:
//       NotificationManager.warning("Failed to Create Role");
//       return {
//         ...state,
//         loading: false
//       };

//     /**
//      * Update Role
//      */
//     case ON_CHANGE_UPDATE_ROLE: // On change selected role attributes; name etc.
//       return {
//         ...state,
//         selectedRole: {
//           ...state.selectedRole,
//           [action.payload.field]: action.payload.value
//         }
//       };
//     case ON_CHANGE_UPDATE_ROLE_RIGHTS: // On change checkboxes in Roles & Permissions Settings
//       return {
//         ...state,
//         selectedRoleRights: action.payload
//       };
//     case UPDATE_ROLE:
//       return {
//         ...state,
//         loading: true
//       };
//     case UPDATE_ROLE_SUCCESS:
//       var accessRoles = updateAccessRoleState(action.payload);
//       NotificationManager.success("Role Updated");
//       return {
//         ...state,
//         loading: false,
//         allRoles: accessRoles
//       };
//     case UPDATE_ROLE_FAILURE:
//       NotificationManager.warning("Failed to Update Role");
//       return {
//         ...state,
//         rolesLoding: false
//       };

//     /**
//      * Delete Role
//      */
//     case DELETE_ROLE:
//       return {
//         ...state,
//         loading: true
//       };
//     case DELETE_ROLE_SUCCESS:
//       NotificationManager.success("Role Deleted");
//       return {
//         ...state,
//         loading: false
//       };
//     case DELETE_ROLE_FAILURE:
//       NotificationManager.warning("Failed to Delete Role");
//       return {
//         ...state,
//         loading: false
//       };

//     /**
//      * Get Role Failure
//      */
//     case GET_ROLE_FAILURE:
//       NotificationManager.warning("Error in fetching Role Data");
//       return INIT_STATE;

//     default:
//       return { ...state };
//   }
// };
