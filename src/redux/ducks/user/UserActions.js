import data from "@iconify/icons-ic/baseline-delete-forever";
import * as types from "./UserTypes";

// Get data of selected model
export const getuser = (e) => ({
    type: types.GET_USER,
    payload: e,
  });
  
  export const getuserSuccess = (e) => ({
    type: types.GET_USER_SUCCESS,
    payload: e,
  });
  
  export const getuserFailure = (e) => ({
    type: types.GET_USER_FAILURE,
    payload: e,
  });
  
  //get one User
  export const getOneUser = (id) => ({
    type: types.GET_ONE_USER,
    payload: id,
  });
  
  export const getOneUserSuccess = (data) => ({
    type: types.GET_ONE_USER_SUCCESS,
    payload: data,
  });
  
  export const getOneUserFailure = (error) => ({
    type: types.GET_ONE_USER_FAILURE,
    payload: error,
});
  
  // Delete user details
export const deleteUser = (id) => ({
    type: types.DELETE_USER,
    payload: id,
  });
  
  export const deleteUserSuccess = (id) => ({
    type: types.DELETE_USER_SUCCESS,
    payload: id,
  });
  
  export const deleteUserFailure = (error) => ({
    type: types.DELETE_USER_FAILURE,
    payload: error,
});
  
//patch user
export const patchUser = (data) => ({
    type: types.PATCH_USER,
    payload: data,
  });
  export const patchUserSuccess = (data) => ({
    type: types.PATCH_USER_SUCCESS,
    payload: data,
  });
  export const patchUserFailure = (error) => ({
    type: types.PATCH_USER_FAILURE,
    payload: error,
  });

// Create data of selected model
export const createUser = (data) => ({
  type: types.CREATE_USER,
  payload: data,
});

export const createUserSuccess = (data) => ({
  type: types.CREATE_USER_SUCCESS,
  payload: data,
});

export const createUserFailure = (data) => ({
  type: types.CREATE_USER_FAILURE,
  payload: data,
});
  
// Update change password
export const UpdatePassword = (data) => ({
  type: types.UPDATE_PASSWORD,
  payload: data,
});

export const UpdatePasswordSuccess = (data) => ({
  type: types.UPDATE_PASSWORD_SUCCESS,
  payload: data,
});

export const UpdatePasswordFailure = (data) => ({
  type: types.UPDATE_PASSWORD_FAILURE,
  payload: data,
});

export const getUserProfile = (e) => ({
  type: types.USER_PROFILE,
  payload: e,
});

export const getUserProfileSuccess = (e) => ({
  type: types.USER_PROFILE_SUCCESS,
  payload: e,
});

export const getUserProfileFailure = (e) => ({
  type: types.USER_PROFILE_FAILURE,
  payload: e,
});

// Get data of selected model
export const getPicUsers = (e) => ({
  type: types.GET_PIC_USER,
  payload: e,
});
export const getPicUserSuccess = (e) => ({
  type: types.GET_PIC_USER_SUCCESS,
  payload: e,
});
export const getPicUserFailure = (e) => ({
  type: types.GET_PIC_USER_FAILURE,
  payload: e,
});
