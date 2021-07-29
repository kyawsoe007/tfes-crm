import { all, call, fork, put, takeEvery, delay } from "redux-saga/effects";
import api from "Api";

import {
    GET_ALL_FOOTER,
    GET_FOOTER_CHILDREN,
    NEW_FOOTER_SECTION,
    NEW_FOOTER_CAR,
    EDIT_FOOTER_SECTION,
    EDIT_FOOTER_CAR,
    DELETE_FOOTER_SECTION,
    DELETE_FOOTER_CAR
} from './FooterTypes';
import * as actions from './FooterActions';


const getAllFooterRequest = async() => {
    // console.log("test test")
    const result = await api.get("/footersections");
    return result.data;
}
function* getAllFooterFromDB(){
    try {
        const data = yield call(getAllFooterRequest);        
        yield put(actions.getAllFooterSuccess(data));
    }
    catch(error){
        yield put(actions.getAllFooterFailure(error));
    }
}
export function* getAllFooterWatcher(){
    yield takeEvery(GET_ALL_FOOTER, getAllFooterFromDB);
}

const getSingleFooterRequest = async id => {
    const result = await api.get(`/Footersections/children/${id}`);
    return result.data.data;
}
function* getSingleFooterFromDB({ payload }){
    try {
        const data = yield call(getSingleFooterRequest, payload);
        yield put(actions.getSingleFooterSuccess(data));
    }
    catch(error){
        yield put(actions.getSingleFooterFailure(error));
    }
}
export function* getSingleFooterWatcher(){
    yield takeEvery(GET_FOOTER_CHILDREN, getSingleFooterFromDB);
}

const postFooterSection = async data => {
    const result = await api.post("/footersections/new", data);
    console.log(data);
    return result.data;
}
function* createNewFooterSection({ payload }){
    const { form, redirect, history } = payload;
    try {
        const data = yield call(postFooterSection, form);
        yield put(actions.newFooterSectionSuccess(data.data));        
    } catch(error){
        console.log(error);
        yield put(actions.newFooterSectionFailure(error));
    }
}
export function* postFooterSectionWatcher(){
    yield takeEvery(NEW_FOOTER_SECTION, createNewFooterSection);
}

const postFooterCar = async data => {
    const result = await api.post("/Footercars/new", {data: data} );
    return result.data;
}
function* createNewFooterCar({ payload }){
    const { form, redirect, history } = payload;
    try {
        const data = yield call(postFooterCar, form);
        yield put(actions.newFooterCarSuccess(data));        
    } catch(error){
        yield put(actions.newFooterCarFailure(error));
    }
}
export function* postFooterCarWatcher(){
    yield takeEvery(NEW_FOOTER_CAR, createNewFooterCar);
}


const editFooterSectionRequest = async data => {
    console.log("redux saga")
    const result = await api.post('/footersections/edit', data);
    console.log(result)
    return result.data;
}
function* editFooterSectionDB({ payload }){
    try {
        const data = yield call(editFooterSectionRequest, payload);
        yield delay(500);
        yield put(actions.editFooterSectionSuccess(data));
    }
    catch(error){
        yield put(actions.editFooterSectionFailure(error));
    }
}
export function* editFooterSectionWatcher(){
    yield takeEvery(EDIT_FOOTER_SECTION, editFooterSectionDB);
}

const editFooterCarRequest = async data => {
    const result = await api.post('/Footercars/edit', data);
    return result.data;
}
function* editFooterCarsDB({ payload }){
    try {
        const data = yield call(editFooterCarRequest, payload);
        yield delay(500);
        yield put(actions.editFooterCarSuccess(data));
    }
    catch(error){
        yield put(actions.editFooterSectionFailure(error));
    }
}
export function* editFooterCarWatcher(){
    yield takeEvery(EDIT_FOOTER_CAR, editFooterCarsDB);
}


const deleteFooterSectionRequest = async id => {
    const result = await api.delete(`/Footersections/${id}`);
    return result.data;
}
function* deleteFooterSectionDB({ payload }){
    try {
        yield call(deleteFooterSectionRequest, payload);
        yield delay(500);
        yield put(actions.deleteFooterSectionSuccess(payload));
    } catch(error){
        yield put(actions.deleteFooterSectionFailure(error));
    }
}
export function* deleteFooterSectionWatcher(){
    yield takeEvery(DELETE_FOOTER_SECTION, deleteFooterSectionDB);
}

const deleteFooterCarRequest = async id => {
    const result = await api.delete(`/Footercars/${id}`);
    return result.data;
}
function* deleteFooterCarDB({ payload }){
    try {
        yield call(deleteFooterCarRequest, payload);
        yield delay(500);
        yield put(actions.deleteFooterCarSuccess(payload));
    } catch(error){
        yield put(actions.deleteFooterCarFailure(error));
    }
}
export function* deleteFooterCarsWatcher(){
    yield takeEvery(DELETE_FOOTER_CAR, deleteFooterCarDB);
}


export default function* rootSaga(){
    yield all([
        fork(getAllFooterWatcher),
        fork(editFooterSectionWatcher),
        fork(postFooterSectionWatcher),
        fork(deleteFooterSectionWatcher),
        fork(getSingleFooterWatcher),
        fork(postFooterCarWatcher),
        fork(editFooterCarWatcher),
        fork(deleteFooterCarsWatcher)
    ])
}