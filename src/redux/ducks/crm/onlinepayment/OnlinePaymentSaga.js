import { all, call, fork, put, takeEvery, delay } from "redux-saga/effects";
import {
  GET_ALL_ONLINEPAYMENT,
  EXPORT_ONLINEPAYMENT
} from "./OnlinePaymentTypes";
import * as actions from "./OnlinePaymentActions";

import api from "Api";

const getAllPaymentRequest = async ({
    limit,
    skip,
    filter,
    searchText,
    orderBy
  }) => {
    const result = await api.post("/transactions/getall", {
      limit,
      skip,
      filter,
      searchText,
      orderBy
    });
    return result.data;
  };

function* getAllPaymentFromDB({ payload }) {
    try {
        const data = yield call(getAllPaymentRequest, payload);
        yield put(actions.getAllPaymentSuccess(data));
    } catch (error) {
        yield put(actions.getAllPaymentFailure(error));
    }
}
export function* getAllPaymentWatcher() {
    yield takeEvery(GET_ALL_ONLINEPAYMENT, getAllPaymentFromDB);
}

export default function* rootSaga(){
    yield all([
        fork(getAllPaymentWatcher)
    ])
}