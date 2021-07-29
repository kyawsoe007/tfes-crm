import { all, call, fork, put, takeEvery, delay } from "redux-saga/effects";
import {
  GET_ALL_BLOG, GET_SINGLE_BLOG, NEW_BLOG
} from "./BlogTypes";

import {
  getAllBlogFailure,
  getAllBlogSuccess, getSingleBlog, getSingleBlogFailure, getSingleBlogSuccess, newBlogFailure, newBlogSuccess
} from "./BlogActions";

import api from "Api";

//=========================
// REQUESTS
//=========================
const getAllBlogFromDBRequest = async () => {
  const result = await api.get("/carblogs/getAllBlog");
  return result.data;
};
const getSingleBlogFromDBRequest = async (id) => {
  let result = await api.get(`/carblogs/getSingleBlog/?id=${id}`);
  return result.data.data;
};
const newBlogToDBRequest = async (params) => {
  let formData = new FormData();
  formData.append('title', params.title);
  formData.append('intro', params.intro);
  formData.append('publishDate', params.publishDate);
  formData.append('content', params.content);
  formData.append('keywords', params.keywords);
  formData.append('tags', params.tags);
  formData.append('status', params.status);
  formData.append('articleImage', params.articleImage[0]);
  const result = await api.post('/carblogs/new', formData);
  return result.data;
};

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getAllBlogFromDB() {
  try {
    const data = yield call(getAllBlogFromDBRequest);
    yield put(getAllBlogSuccess(data));
  } catch (error) {
    yield put(getAllBlogFailure(error));
  }
}
function* newBlogToDB({ payload }) {
  try {
    const data = yield call(newBlogToDBRequest, payload);
    yield put(newBlogSuccess(data));
  } catch (error) {
    yield put(newBlogFailure(error));
  }
}
function* getSingleBlogFromDB({ payload }) {
  try {
    const data = yield call(getSingleBlogFromDBRequest, payload);
    yield put(getSingleBlogSuccess(data));
  } catch (error) {
    yield put(getSingleBlogFailure(error));
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* getAllBlogWatcher() {
  yield takeEvery(GET_ALL_BLOG, getAllBlogFromDB);
}
export function* newBlogWatcher() {
  yield takeEvery(NEW_BLOG, newBlogToDB);
}
export function* getSingleBlogWatcher() {
  yield takeEvery(GET_SINGLE_BLOG, getSingleBlogFromDB);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
      fork(getAllBlogWatcher),
      fork(newBlogWatcher),
      fork(getSingleBlogWatcher)
  ]);
}
