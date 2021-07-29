import { all, call, fork, put, takeEvery, delay } from "redux-saga/effects";
import {
    GET_ALL_BANNER,
    GET_SINGLE_BANNER,
    NEW_BANNER,
    EDIT_BANNER,
    DELETE_BANNER
} from './BannerTypes';
import * as actions from './BannerActions';



import api from "Api";

/* GET ALL */

const getAllBannerRequest = async () => {
    const result = await api.get("/homebanners");
    return result.data;
}

function* getAllBannerFromDB() {
    try {
        const data = yield call(getAllBannerRequest);        
        yield put(actions.getAllBannerSuccess(data));        
    }
    catch(error){        
        yield put(actions.getAllBannerFailure(error));
    }
}

export function* getAllBannerWatcher(){
    yield takeEvery(GET_ALL_BANNER, getAllBannerFromDB);    
}

/* GET SINGLE  */
const getBannerRequest = async (id) => {
    const result = await api.get(`/homebanners/${id}`);
    console.log(result.data);
    return result.data;
}

function* getBannerFromDB({payload}){
    try {
        const data = yield call(getBannerRequest, payload);
        yield put(actions.getSingleBannerSuccess(data));
    } catch(error){
        yield put(actions.getSingleBannerFailure(error));
    }
}

export function* getBannerWatcher(){
    yield takeEvery(GET_SINGLE_BANNER, getBannerFromDB);    
}

/* NEW BANNER */
const postNewBanner = async data => {
    const result = await api.post("/homebanners/new", data);
    return result.data;
}

function* createNewBanner({ payload }){
    const { form, redirect, history } = payload;
    try {
        const data = yield call(postNewBanner, form);
        console.log(data);
        yield delay(500);
        if (redirect) history.push(singleBanner(data.id));
        yield put(actions.newBannerSuccess(data));
    } catch (error) {
        yield put(actions.newBannerFailure(error));
    }
}

export function* postBannerWatcher(){
    yield takeEvery(NEW_BANNER, createNewBanner);
}

/* EDIT BANNER */
const editBannerRequest = async data => {   
    const result = await api.post('/homebanners/edit', data);
    return result.data;
}

function* editBannerDB({ payload }){
    try {
        const data = yield call(editBannerRequest, payload);
        yield delay(500);
        yield put(actions.editBannerSuccess(data));        
    }
    catch(error){
        yield put(actions.editBannerFailure(error));
    }
}
export function* editBannerWatcher(){
    yield takeEvery(EDIT_BANNER, editBannerDB);
}

/* DELETE BANNER  */
const deleteBannerRequest = async id => {
    const result = await api.delete(`/homebanners/${id}`);
    return result.data;
}
function* deleteBannerDB({ payload }){
    try {
        yield call(deleteBannerRequest, payload);
        yield delay(500);
        yield put(actions.deleteBannerSuccess(payload));
    } catch(error){
        yield put(actions.deleteBannerFailure(error));
    }
}
export function* deleteBannerWatcher(){
    yield takeEvery(DELETE_BANNER, deleteBannerDB);
}



export default function* rootSaga(){
    yield all([
        fork(getAllBannerWatcher),
        fork(getBannerWatcher),
        fork(postBannerWatcher),
        fork(editBannerWatcher),
        fork(deleteBannerWatcher)
    ])
}