import { all, call, fork, put, takeEvery, delay } from "redux-saga/effects";
import api from "Api";

import {
    GET_ALL_COE,
    GET_ALL_SERVICING,
    GET_ALL_WARRANTY,
    CREATE_COE,
    CREATE_SERVICING,
    CREATE_WARRANTY,
    EDIT_COE,
    EDIT_SERVICING,
    EDIT_WARRANTY,
    DELETE_COE,
    DELETE_SERVICING,
    DELETE_WARRANTY    
} from './ConfigOptionsTypes'
import * as actions from './ConfigOptionsActions';

const getAllCoeRequest = async() => {
    const result = await api.get("/coeselects?filter[order]=position%20ASC");
    return result.data;
}
function* getAllCoeFromDB(){
    try {
        const data = yield call(getAllCoeRequest);
        yield put(actions.getCoeSelectedSuccess(data));        
    }
    catch(error){
        yield put(actions.getCoeSelectedFailure(error));
    }
}
export function* getAllCoeWatcher(){
    yield takeEvery(GET_ALL_COE, getAllCoeFromDB);
}

const postCoe = async data => {
    const result = api.post("/coeselects", data);
    return result.data;
}
function* createNewCoe({ payload }){
    try {
        const data = yield call(postCoe, payload);
        yield delay(500);
        const alldata = yield call(getAllCoeRequest);
        yield put(actions.getCoeSelectedSuccess(alldata));
    }
    catch(error){
        yield put(actions.getCoeSelectedFailure(error));
    }
}
export function* createNewCoeWatcher(){
    yield takeEvery(CREATE_COE, createNewCoe);
}

const editCoe = async (id, data) => {
    const result = await api.patch(`/coeselects/${id}`, data);
    return result.data;
}
function* editCoeDB({ payload }){
    try {
        const { id, ...others} = payload;
        yield call(editCoe, id, others);
        yield delay(500);
        const alldata = yield call(getAllCoeRequest);
        yield put(actions.getCoeSelectedSuccess(alldata));
    }
    catch(error){
        yield put(actions.getCoeSelectedFailure(error));
    }
}
export function* editCoeWatcher(){
    yield takeEvery(EDIT_COE, editCoeDB);
}

const deleteCoe = async id => {
    const result = await api.delete(`/coeselects/${id}`);
    return result.data;
}
function* deleteCoeDB({ payload }){
    try{ 
        yield call(deleteCoe, payload);
        yield  put(actions.deleteCoeSuccess(payload));
    }
    catch(error){
        yield put(actions.deleteCoeFailure(error));
    }
}
export function* deleteCoeWatcher(){
    yield takeEvery(DELETE_COE, deleteCoeDB);
}

//warranty
const getAllWarrantyRequest = async() => {
    const result = await api.get("/warrantyselects?filter[order]=position%20ASC");
    return result.data;
}
function* getAllWarrantyFromDB(){
    try {
        const data = yield call(getAllWarrantyRequest);
        yield put(actions.getWarrantySelectedSuccess(data));        
    }
    catch(error){
        yield put(actions.getWarrantySelectedFailure(error));
    }
}
export function* getAllWarrantyWatcher(){
    yield takeEvery(GET_ALL_WARRANTY, getAllWarrantyFromDB);
}

const postWarranty = async data => {
    const result = api.post("/warrantyselects", data);
    return result.data;
}
function* createNewWarranty({ payload }){
    try {
        const data = yield call(postWarranty, payload);
        yield delay(500);
        const alldata = yield call(getAllWarrantyRequest);
        yield put(actions.getWarrantySelectedSuccess(alldata));
    }
    catch(error){
        yield put(actions.getWarrantySelectedFailure(error));
    }
}
export function* createNewWarrantyWatcher(){
    yield takeEvery(CREATE_WARRANTY, createNewWarranty);
}

const editWarranty = async (id, data) => {
    const result = await api.patch(`/warrantyselects/${id}`, data);
    return result.data;
}
function* editWarrantyDB({ payload }){
    try {
        const { id, ...others} = payload;
        yield call(editWarranty, id, others);
        yield delay(500);
        const alldata = yield call(getAllWarrantyRequest);
        yield put(actions.getWarrantySelectedSuccess(alldata));
    }
    catch(error){
        yield put(actions.getWarrantySelectedFailure(error));
    }
}
export function* editWarrantyWatcher(){
    yield takeEvery(EDIT_WARRANTY, editWarrantyDB);
}

const deleteWarranty = async id => {
    const result = await api.delete(`/warrantyselects/${id}`);
    return result.data;
}
function* deleteWarrantyDB({ payload }){
    try{ 
        yield call(deleteWarranty, payload);
        yield  put(actions.deleteWarrantySuccess(payload));
    }
    catch(error){
        yield put(actions.deleteWarrantyFailure(error));
    }
}
export function* deleteWarrantyWatcher(){
    yield takeEvery(DELETE_WARRANTY, deleteWarrantyDB);
}

//servicing
const getAllServicingRequest = async() => {
    const result = await api.get("/servicingselects?filter[order]=position%20ASC");
    return result.data;
}
function* getAllServicingFromDB(){
    try {
        const data = yield call(getAllServicingRequest);
        yield put(actions.getServicingSelectedSuccess(data));        
    }
    catch(error){
        yield put(actions.getServicingSelectedFailure(error));
    }
}
export function* getAllServicingWatcher(){
    yield takeEvery(GET_ALL_SERVICING, getAllServicingFromDB);
}

const postServicing = async data => {
    const result = api.post("/servicingselects", data);
    return result.data;
}
function* createNewServicing({ payload }){
    try {
        const data = yield call(postServicing, payload);
        yield delay(500);
        const alldata = yield call(getAllServicingRequest);
        yield put(actions.getServicingSelectedSuccess(alldata));
    }
    catch(error){
        yield put(actions.getServicingSelectedFailure(error));
    }
}
export function* createNewServicingWatcher(){
    yield takeEvery(CREATE_SERVICING, createNewServicing);
}

const editServicing = async (id, data) => {
    const result = await api.patch(`/servicingselects/${id}`, data);
    return result.data;
}
function* editServicingDB({ payload }){
    try {
        const { id, ...others} = payload;
        yield call(editServicing, id, others);
        yield delay(500);
        const alldata = yield call(getAllServicingRequest);
        yield put(actions.getServicingSelectedSuccess(alldata));
    }
    catch(error){
        yield put(actions.getServicingSelectedFailure(error));
    }
}
export function* editServicingWatcher(){
    yield takeEvery(EDIT_SERVICING, editServicingDB);
}

const deleteServicing = async id => {
    const result = await api.delete(`/servicingselects/${id}`);
    return result.data;
}
function* deleteServicingDB({ payload }){
    try{ 
        yield call(deleteServicing, payload);
        yield  put(actions.deleteServicingSuccess(payload));
    }
    catch(error){
        yield put(actions.deleteServicingFailure(error));
    }
}
export function* deleteServicingWatcher(){
    yield takeEvery(DELETE_SERVICING, deleteServicingDB);
}

export default function* rootSaga(){
    yield all([
        fork(getAllCoeWatcher),
        fork(createNewCoeWatcher),
        fork(editCoeWatcher),
        fork(deleteCoeWatcher),
        fork(getAllWarrantyWatcher),
        fork(createNewWarrantyWatcher),
        fork(editWarrantyWatcher),
        fork(deleteWarrantyWatcher),
        fork(getAllServicingWatcher),
        fork(createNewServicingWatcher),
        fork(editServicingWatcher),
        fork(deleteServicingWatcher)
    ])
}