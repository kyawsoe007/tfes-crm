import { all, call, fork, put, takeEvery, select } from "redux-saga/effects";
import {
  GET_ALL_USERS,
  ADD_USER,
  UPDATE_USER,
  GET_USER_PROFILE,
  UPDATE_USER_RIGHTS
} from "./UserManagementTypes";
import {
  getAllUsersSuccess,
  addUserSuccess,
  addUserFailure,
  updateUserSuccess,
  updateUserFailure,
  getUserProfileSuccess,
  getUserFailure,
  updateUserRightsSuccess
} from "./UserManagementActions";
import api from "Api";

//=========================
// REQUESTS
//=========================
const getAllUsersRequest = async () => {
  const result = await api.get("/users");
  return result.data;
};

const getAllSettingsRequest = async () => {
  const result = await api.post("/accesssettings/viewall");
  return result.data.data;
};

const getAllGroupsRequest = async () => {
  const result = await api.post(`/accessgroups/viewall`);
  return result.data.data;
};

const addUserRequest = async newUser => {
  const result = await api.post("/users", newUser);
  console.log(result);
  return result.data;
};
const updateUserRequest = async user => {
  const result = user;
  return result;
};
const getUserProfileRequest = async userID => {
  const result = await api.get(`/users/${userID}`, userID);
  return result.data;
};

const updateUserRights = async (userId, rights) => {
  const result = await api.post("/accesssettings/saveUserRights", {
    saveUserId: userId,
    rights: rights
  });
  return result.data;
};

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getAllUsersFromDB() {
  try {
    const data = yield call(getAllUsersRequest);
    const settings = yield call(getAllSettingsRequest);
    const groups = yield call(getAllGroupsRequest);
    yield put(getAllUsersSuccess(data, settings, groups));
  } catch (err) {
    yield put(getUserFailure(err));
  }
}
function* addUserToDB({ payload }) {
  const { roles, confirmPassword, ...others } = payload;
  try {
    var userdata = { roles: [] };
    for (const role of roles) {
      userdata.roles.push({ id: role });
    }
    const data = yield call(addUserRequest, { ...others });
    yield call(updateUserRights, data.id, [userdata]);

    yield put(addUserSuccess(data));
  } catch (err) {
    yield put(addUserFailure(err));
  }
}
function* updateUserToDB() {
  const getUser = state => state.usersState.userUpdate;
  const user = yield select(getUser);
  try {
    const data = yield call(updateUserRequest, user);
    yield put(updateUserSuccess(data));
  } catch (err) {
    yield put(updateUserFailure(err));
  }
}
function* getUserProfileFromDB({ payload }) {
  try {
    const data = yield call(getUserProfileRequest, payload);
    yield put(getUserProfileSuccess(data));
  } catch (err) {
    yield put(getUserFailure(err));
  }
}
function* updateUserRightsToDB() {
  const getUserSettings = state => state.usersState.userSettings;
  const user = yield select(getUserSettings);
  try {
    const data = yield call(updateUserRights, user.userid, user.groups);
    yield put(updateUserRightsSuccess(data));
  } catch (err) {
    yield put(updateUserFailure(err));
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* getAllUsersWatcher() {
  yield takeEvery(GET_ALL_USERS, getAllUsersFromDB);
}
export function* addUserWatcher() {
  yield takeEvery(ADD_USER, addUserToDB);
}
export function* updateUserWatcher() {
  yield takeEvery(UPDATE_USER, updateUserToDB);
}
export function* getUserProfileWatcher() {
  yield takeEvery(GET_USER_PROFILE, getUserProfileFromDB);
}
export function* updateUserRightsWatcher() {
  yield takeEvery(UPDATE_USER_RIGHTS, updateUserRightsToDB);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
    ,
    fork(getAllUsersWatcher),
    fork(addUserWatcher),
    fork(updateUserWatcher),
    fork(getUserProfileWatcher),
    fork(updateUserRightsWatcher)
  ]);
}
