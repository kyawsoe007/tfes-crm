import { all, call, fork, put, takeEvery, delay } from "redux-saga/effects";
import {
    GET_CONFIGS
} from "./ConfigTypes";
import * as actions from './ConfigActions';

import api from "Api";

const getAllConfigsRequest = async ({
    limit,
    skip,
    filter,
    searchText,
    orderBy
  }) => {
    const result = await api.post("/carconfigurators/getall", {
      limit,
      skip,
      filter,
      searchText,
      orderBy
    });
    return result.data;
};
function* getAllConfigsFromDB({ payload }) {
    try {
      const data = yield call(getAllConfigsRequest, payload);
      yield put(actions.getConfigsSuccess(data));
    } catch (error) {
      yield put(actions.getConfigsFailure(error));
    }
}

export function* getAllConfigsWatcher() {
    yield takeEvery(GET_CONFIGS, getAllConfigsFromDB);
}

export default function* rootSaga(){
    yield all([
        fork(getAllConfigsWatcher)
    ])
}