import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import * as actions from "./AuthActions";
import {
  LOGIN_USER,
  LOGOUT_USER,
  USER_RIGHTS,
  UPDATE_CURRENT_USER,
  UPDATE_PASSWORD,
  USER_PROFILE,
  GET_USER_MY_PROFILE,
  MOVEMENT_OUT_USER
} from './AuthTypes'

import {
  signinUserSuccess,
  signinUserFailure,
  logoutUserSuccess,
  logoutUserFailure,
  userRightsSuccess,
  userRightsFailure,
  updateCurrentUserSuccess,
  updateCurrentUserFailure,
  updateMovementUserSuccess,
  updateMovementUserFailure,
  updatePasswordSuccess,
  updatePasswordFailure,
  getUserProfileSuccess,
  getUserProfileFailure,
  getUserMyProfile,
  getUserMyProfileSuccess,
  getUserMyProfileFailure
} from './AuthActions'

import Auth from 'Auth'
import api from 'Api'
import { CodeSharp } from '@material-ui/icons'

/**
 * Login User
 */
const signInUserWithEmailPasswordRequest = async (email, password) => {
  const result = await api.post('/users/login', {
    email: email,
    password: password
  })
  return result.data
}
const getUserProfileRequest = async (userID) => {
  const result = await api.get(`/users/${userID}`, userID)
  return result.data
}

function* signInUserWithEmailPassword({ payload }) {
  const { emailAddress, password } = payload.user
  const { history } = payload
  console.log('what is history', history)

  try {
    const signInUser = yield call(
      signInUserWithEmailPasswordRequest,
      emailAddress,
      password
    )
    // console.log('sinInUser ', signInUser)
    // if (signInUser.id) {
    //   localStorage.setItem("user_id", signInUser.userId);
    //   localStorage.setItem("accessKey", signInUser.id);
    //   const userRights = yield call(getUserAccessRightsRequest);
    //   const userInfo = yield call(getUserProfileRequest, signInUser.userId);
    //   new Auth().setSession(signInUser);
    //   yield put(signinUserSuccess(signInUser, userRights, userInfo));
    //   history.push("/");
    //   //Get User Access Rights
    // }
    if (signInUser) {
      // localStorage.setItem('userInfo', JSON.stringify(signInUser.userInfo))
      //const userRights = yield call(getUserAccessRightsRequest);
      //const userInfo = yield call(getUserProfileRequest, signInUser.userId);
      new Auth().setSession(signInUser.userInfo)
      //yield put(signinUserSuccess(signInUser, userRights, userInfo));
      yield put(signinUserSuccess(signInUser.userInfo))
      history.push('/app/dashboard')

      //Get User Access Rights
    }
  } catch (error) {
    yield put(signinUserFailure(error.response.data.error))
  }
}

/**
 * Get User rights
 */
const getUserAccessRightsRequest = async () => {
  const result = await api.get(`/accesssettings/user/accessRights`)
  return result.data.data
}
function* getUserRights() {
  try {
    const userRights = yield call(getUserAccessRightsRequest)
    // let userid = localStorage.getItem('user_id')
    const userInfo = yield call(getUserProfileRequest, userid)
    yield put(userRightsSuccess(userRights, userInfo))
  } catch (error) {
    yield put(userRightsFailure(error.response.data.error))
  }
}



/**
 * Log out user
 */
const logoutUserWithAccessToken = async () => {
  console.log("mark++++++++")
  const result = await api.post(`/users/logout`)
  return result.data
}
function* logoutUser({ payload }) {
  console.log('payload', payload)

  try {
    yield call(logoutUserWithAccessToken)
    yield put(logoutUserSuccess())
    new Auth().logout()
    //new Auth().isAuthenticated(false)
    payload.push('/login')


  } catch (error) {
    yield put(logoutUserFailure(error))
  }
}

/**
 * Update current user
 */
const updateCurrentUserRequest = async (data) => {
  const result = await api.patch(`users/${data.id}`, data)
  return result.data
}
function* updateCurrentUser({ payload }) {
  try {
    const data = yield call(updateCurrentUserRequest, payload)
    yield put(updateCurrentUserSuccess(data))
  } catch (error) {
    yield put(updateCurrentUserFailure(error))
  }
}

//Movement update when logout
function* updateMovementUser({ payload }) {
  try {
    const data = yield call(updateCurrentUserRequest, payload)
    yield put(updateMovementUserSuccess(data))
  } catch (error) {
    yield put(updateMovementUserFailure(error))
  }
}


const getUserMyProfileRequest = async (data) => {
  const result = await api.get(`users/myProfile`)
  console.log("RESULT", result)
  return result.data
}

// http://localhost:3001/api/users/myProfile

function* getUserMyProfileData(data) {
  console.log("payload", data)
  try {
    const data = yield call(getUserMyProfileRequest, data)
    yield put(getUserMyProfileSuccess(data))
  } catch (error) {
    // console.log("error")
    yield put(getUserMyProfileFailure(error))
  }
}


/**
 * Update Password
 */
// const updateUserPassword = async (oldPassword, newPassword) => {
//   await api.post(`/users/change-password`, {
//     oldPassword: oldPassword,
//     newPassword: newPassword
//   })
//   return true
// }
// const updateUserPassword = async (payload) => {
//   const result = await api.patch(`/users/change-password`, payload);
//   return result.data;
// };
// function* updatePasswordToDB({ payload }) {
//   try {
//     const data = yield call(
//       updateUserPassword,
//       payload.oldPassword,
//       payload.newPassword
//     )
//     yield put(updatePasswordSuccess(data))
//   } catch (err) {
//     yield put(updatePasswordFailure(err))
//   }
// }
// function* updatePasswordToDB({ payload }) {
//   try {
//     const data = yield call(updateUserPassword, payload);
//     yield put(updatePasswordSuccess(data));
//   } catch (error) {
//     yield put(updatePasswordFailure(error));
//   }
// }



//=======================
// WATCHER FUNCTIONS
//=======================
export function* signinUserWatcher() {
  yield takeEvery(LOGIN_USER, signInUserWithEmailPassword)
}
export function* signoutUser() {
  yield takeEvery(LOGOUT_USER, logoutUser)
}
export function* getAccessRights() {
  yield takeEvery(USER_RIGHTS, getUserRights)
}
export function* updateCurrentUserWatcher() {
  yield takeEvery(UPDATE_CURRENT_USER, updateCurrentUser)
}
export function* updateMovementUserWatcher() {
  yield takeEvery(MOVEMENT_OUT_USER, updateMovementUser)
}


export function* getUserMyProfileWatcher() {
  yield takeEvery(GET_USER_MY_PROFILE, getUserMyProfileData)
}
// export function* updatePasswordWatcher() {
//   yield takeEvery(UPDATE_PASSWORD, updatePasswordToDB)
// }

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
    fork(signinUserWatcher),
    fork(signoutUser),
    fork(getAccessRights),
    fork(updateCurrentUserWatcher),
    fork(getUserMyProfileWatcher),
    fork(updateMovementUserWatcher)
    // fork(updatePasswordWatcher)
  ])
}
