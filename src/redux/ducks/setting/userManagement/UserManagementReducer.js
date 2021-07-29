/**
 * Users Reducers
 */
import { NotificationManager } from "react-notifications";
import {
  GET_ALL_USERS,
  GET_ALL_USERS_SUCCESS,
  ADD_USER,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
  UPDATE_USER_START,
  ON_CHANGE_UPDATE_USER,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  ON_CHANGE_UPDATE_USER_RIGHTS,
  UPDATE_USER_RIGHTS,
  UPDATE_USER_RIGHTS_SUCCESS,
  GET_USER_FAILURE
} from "./UserManagementTypes";

const INIT_STATE = {
  userList: [],
  usersLoading: false,

  isUserControl: false,
  userControl: {},

  userSettings: [],
  accessGroups: [],
  userUpdate: null
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    /**
     * GET All Users
     */
    case GET_ALL_USERS:
      return {
        ...state,
        usersLoading: true
      };

    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        usersLoading: false,
        userList: action.payload.users,
        userSettings: action.payload.settings,
        accessGroups: action.payload.accessGroups
      };

    /**
     * ADD User
     */
    case ADD_USER:
      return {
        ...state,
        usersLoading: true
      };
    case ADD_USER_SUCCESS:
      var allUsers = Object.assign([], state.userList);
      var users = [...allUsers, action.payload];
      NotificationManager.success("User Added");
      return {
        ...state,
        // userAdd: INIT_STATE.userAdd,
        usersLoading: false,
        userList: users
      };
    case ADD_USER_FAILURE:
      NotificationManager.error("Failed to Add User");
      return {
        ...state,
        usersLoading: false
      };

    /**
     * UPDATE User
     */
    case UPDATE_USER_START:
      return {
        ...state,
        userUpdate: action.payload
      };
    case ON_CHANGE_UPDATE_USER:
      return {
        ...state,
        userUpdate: {
          ...state.userUpdate,
          [action.payload.field]: action.payload.value
        }
      };
    case UPDATE_USER:
      return {
        ...state,
        profileLoading: true
      };
    case UPDATE_USER_SUCCESS:
      NotificationManager.success("User Updated");
      return {
        ...state,
        profileLoading: false,
        userUpdate: action.payload
      };
    case UPDATE_USER_FAILURE:
      NotificationManager.error("Failed to Update User");
      return {
        ...state,
        profileLoading: false
      };
    case ON_CHANGE_UPDATE_USER_RIGHTS:
      //console.log(action.payload);
      var userRightsObject = {
        userid: action.payload.userid,
        username: action.payload.username,
        groups: []
      };
      for (const grp of action.payload.groups) {
        var grpObject = { id: grp.id, name: grp.name, roles: [] };
        for (const role of grp.roles) {
          grpObject.roles.push({
            id: role.id,
            roleId: role.roleId,
            name: role.name,
            tier: role.tier
          });
        }
        userRightsObject.groups.push(grpObject);
      }

      return {
        ...state,
        userSettings: userRightsObject
      };
    case UPDATE_USER_RIGHTS:
      return {
        ...state,
        usersLoading: true
      };
    case UPDATE_USER_RIGHTS_SUCCESS:
      NotificationManager.success("User Updated");
      return {
        ...state,
        usersLoading: false
      };

    /**
     * GET_USER_FAILURE
     */
    case GET_USER_FAILURE:
      NotificationManager.warning("Error in fetching User Data");
      return INIT_STATE;

    /**
     * State Changes
     */
    // case SHOW_USER_CONTROLS:
    //   var allsettings = state.userSettings;
    //   var userSetting = allsettings.find(setting => {
    //     return action.payload == setting.userid;
    //   });
    //   var userControl = state.users.find(user => user.id == action.payload);
    //   return {
    //     ...state,
    //     isUserControl: true,
    //     userControl: userControl,
    //     userSettings: userSetting
    //   };

    // case HIDE_USER_CONTROLS:
    //   return {
    //     ...state,
    //     isUserControl: false
    //   };

    default:
      return { ...state };
  }
};
