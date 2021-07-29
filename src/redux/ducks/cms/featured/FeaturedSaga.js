import { all, call, fork, put, takeEvery, delay } from "redux-saga/effects";
import api from "Api";

import {
    GET_ALL_FEATURED,
    GET_FEATURED_CHILDREN,
    NEW_FEATURED_SECTION,
    NEW_FEATURED_CAR,
    EDIT_FEATURED_SECTION,
    EDIT_FEATURED_CAR,
    DELETE_FEATURED_SECTION,
    DELETE_FEATURED_CAR
} from './FeaturedTypes';
import * as actions from './FeaturedActions';


const getAllFeaturedRequest = async() => {
    const result = await api.get("/featuredsections");
    return result.data;
}
function* getAllFeaturedFromDB(){
    try {
        const data = yield call(getAllFeaturedRequest);        
        yield put(actions.getAllFeaturedSuccess(data));
    }
    catch(error){
        yield put(actions.getAllFeaturedFailure(error));
    }
}
export function* getAllFeaturedWatcher(){
    yield takeEvery(GET_ALL_FEATURED, getAllFeaturedFromDB);
}

const getSingleFeaturedRequest = async id => {
    const result = await api.get(`/featuredsections/children/${id}`);
    return result.data.data;
}
function* getSingleFeaturedFromDB({ payload }){
    try {
        const data = yield call(getSingleFeaturedRequest, payload);
        yield put(actions.getSingleFeatureSuccess(data));
    }
    catch(error){
        yield put(actions.getSingleFeaturedFailure(error));
    }
}
export function* getSingleFeaturedWatcher(){
    yield takeEvery(GET_FEATURED_CHILDREN, getSingleFeaturedFromDB);
}

const postFeaturedSection = async data => {
    const result = await api.post("/featuredsections/new", data);
    return result.data;
}
function* createNewFeaturedSection({ payload }){
    const { form, redirect, history } = payload;
    try {
        const data = yield call(postFeaturedSection, form);
        yield put(actions.newFeaturedSectionSuccess(data.data));        
    } catch(error){
        console.log(error);
        yield put(actions.newFeaturedSectionFailure(error));
    }
}
export function* postFeaturedSectionWatcher(){
    yield takeEvery(NEW_FEATURED_SECTION, createNewFeaturedSection);
}

const postFeaturedCar = async data => {
    const result = await api.post("/featuredcars/new", {data: data} );
    return result.data;
}
function* createNewFeaturedCar({ payload }){
    const { form, redirect, history } = payload;
    try {
        const data = yield call(postFeaturedCar, form);
        yield put(actions.newFeaturedCarSuccess(data));        
    } catch(error){
        yield put(actions.newFeaturedCarFailure(error));
    }
}
export function* postFeaturedCarWatcher(){
    yield takeEvery(NEW_FEATURED_CAR, createNewFeaturedCar);
}


const editFeaturedSectionRequest = async data => {
    const result = await api.post('/featuredsections/edit', data);
    return result.data;
}
function* editFeaturedSectionDB({ payload }){
    try {
        const data = yield call(editFeaturedSectionRequest, payload);
        yield delay(500);
        yield put(actions.editFeaturedSectionSuccess(data));
    }
    catch(error){
        yield put(actions.editFeaturedSectionFailure(error));
    }
}
export function* editFeaturedSectionWatcher(){
    yield takeEvery(EDIT_FEATURED_SECTION, editFeaturedSectionDB);
}

const editFeaturedCarRequest = async data => {
    const result = await api.post('/featuredcars/edit', data);
    return result.data;
}
function* editFeaturedCarsDB({ payload }){
    try {
        const data = yield call(editFeaturedCarRequest, payload);
        yield delay(500);
        yield put(actions.editFeaturedCarSuccess(data));
    }
    catch(error){
        yield put(actions.editFeaturedSectionFailure(error));
    }
}
export function* editFeaturedCarWatcher(){
    yield takeEvery(EDIT_FEATURED_CAR, editFeaturedCarsDB);
}


const deleteFeaturedSectionRequest = async id => {
    const result = await api.delete(`/featuredsections/${id}`);
    return result.data;
}
function* deleteFeaturedSectionDB({ payload }){
    try {
        yield call(deleteFeaturedSectionRequest, payload);
        yield delay(500);
        yield put(actions.deleteFeaturedSectionSuccess(payload));
    } catch(error){
        yield put(actions.deleteFeaturedSectionFailure(error));
    }
}
export function* deleteFeaturedSectionWatcher(){
    yield takeEvery(DELETE_FEATURED_SECTION, deleteFeaturedSectionDB);
}

const deleteFeaturedCarRequest = async id => {
    const result = await api.delete(`/featuredcars/${id}`);
    return result.data;
}
function* deleteFeaturedCarDB({ payload }){
    try {
        yield call(deleteFeaturedCarRequest, payload);
        yield delay(500);
        yield put(actions.deleteFeaturedCarSuccess(payload));
    } catch(error){
        yield put(actions.deleteFeaturedCarFailure(error));
    }
}
export function* deleteFeaturedCarsWatcher(){
    yield takeEvery(DELETE_FEATURED_CAR, deleteFeaturedCarDB);
}


export default function* rootSaga(){
    yield all([
        fork(getAllFeaturedWatcher),
        fork(editFeaturedSectionWatcher),
        fork(postFeaturedSectionWatcher),
        fork(deleteFeaturedSectionWatcher),
        fork(getSingleFeaturedWatcher),
        fork(postFeaturedCarWatcher),
        fork(editFeaturedCarWatcher),
        fork(deleteFeaturedCarsWatcher)
    ])
}