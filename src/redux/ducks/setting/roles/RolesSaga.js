import { all, call, fork, put, takeEvery, select } from "redux-saga/effects";
import {
  GET_ALL_ROLES,
  ADD_ROLE,
  UPDATE_ROLE,
  DELETE_ROLE
} from "./RolesTypes";
import {
  getAllRolesSuccess,
  getAllRolesFailure,
  addRoleSuccess,
  addRoleFailure,
  updateRoleSuccess,
  updateRoleFailure,
  deleteRoleSuccess,
  deleteRoleFailure
} from "./RolesActions";

import api from "Api";

// import { role1, role2, role3, bestCase } from "./dummy";

//=========================
// REQUESTS
//=========================

const getAllRolesRequest = async () => {
  const result = await api.post(`/accessroles/viewall`);
  return result.data.data;
  // return bestCase;
};

const addRoleRequest = async () => {
  const result = await api.post(`/accessroles`, {
    name: "New Role"
  });
  return result.data;
};

const updateRoleNameRequest = async (roleName, roleId) => {
  const result = await api.patch(`accessRoles/${roleId}`, {
    name: roleName
  });
  return result.data;
};
const updateRoleRightRequest = async (roleId, rights) => {
  const result = await api.post(`accessRoles/saveRights`, {
    id: roleId,
    rights: rights
  });
  return result.data;
};

const deleteRoleRequest = async role => {
  try {
    const result = role;
    return result;
  } catch (err) {
    return err;
  }
};

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getAllRolesFromDB() {
  try {
    const data = yield call(getAllRolesRequest);
    yield put(getAllRolesSuccess(data));
  } catch (err) {
    yield put(getAllRolesFailure(err));
  }
}
function* addRoleToDB() {
  try {
    const data = yield call(addRoleRequest);
    yield put(addRoleSuccess(data));
  } catch (err) {
    yield put(addRoleFailure(err));
  }
}
function* updateRoleToDB() {
  try {
    const getRights = state => state.rolesState.selectedRoleRights;
    const rights = yield select(getRights);
    const getRole = state => state.rolesState.selectedRole;
    const role = yield select(getRole);
    yield call(updateRoleNameRequest, role.name, role.id);
    const data = yield call(updateRoleRightRequest, role.id, rights);
    yield put(updateRoleSuccess(data));
  } catch (err) {
    yield put(updateRoleFailure(err));
  }
}
function* deleteRoleFromDB() {
  try {
    const getRole = state => state.rolesState.selectedRole;
    const role = yield select(getRole);
    const data = yield call(deleteRoleRequest, role);
    yield put(deleteRoleSuccess(data));
  } catch (err) {
    yield put(deleteRoleFailure(err));
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* getAllRolesWatcher() {
  yield takeEvery(GET_ALL_ROLES, getAllRolesFromDB);
}
export function* addRoleWatcher() {
  yield takeEvery(ADD_ROLE, addRoleToDB);
}
export function* updateRoleWatcher() {
  yield takeEvery(UPDATE_ROLE, updateRoleToDB);
}
export function* deleteRoleWatcher() {
  yield takeEvery(DELETE_ROLE, deleteRoleFromDB);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
    fork(getAllRolesWatcher),
    fork(addRoleWatcher),
    fork(updateRoleWatcher),
    fork(deleteRoleWatcher)
  ]);
}
