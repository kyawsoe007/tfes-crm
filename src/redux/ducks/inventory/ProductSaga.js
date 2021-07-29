import { all, call, fork, put, takeEvery, delay } from "redux-saga/effects";
import api from "Api";

import { GET_ALL_PRODUCTS, GET_ALL_PREOWNED_PRODUCTS } from "./ProductTypes";
import * as actions from "./ProductActions";

const getAllProductRequest = async () => {
  const result = await api.get("/products/allproducts");
  return result.data;
};
function* getAllProductFromDB() {
  try {
    const data = yield call(getAllProductRequest);
    yield put(actions.getAllProductsSuccess(data));
  } catch (error) {
    yield put(actions.getAllProductsFailure(error));
  }
}

const getAllPreownedProductRequest = async () => {
  const result = await api.get("/products/preownedProducts");
  return result.data;
};
function* getAllPreownedProductFromDB() {
  try {
    console.log("PREOWNED PRODUCTS HERE");
    const data = yield call(getAllPreownedProductRequest);
    //console.log(data);
    yield put(actions.getAllPreownedProductsSuccess(data));
  } catch (error) {
    yield put(actions.getAllPreownedProductsFailure(error));
  }
}

export function* getAllProductWatcher() {
  yield takeEvery(GET_ALL_PRODUCTS, getAllProductFromDB);
}

export function* getAllPreownedProductWatcher() {
  yield takeEvery(GET_ALL_PREOWNED_PRODUCTS, getAllPreownedProductFromDB);
}

export default function* rootSaga() {
  yield all([fork(getAllProductWatcher), fork(getAllPreownedProductWatcher)]);
}
