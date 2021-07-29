import {
    all,
    call,
    fork,
    put,
    takeEvery,
    delay,
    select,
  } from 'redux-saga/effects'
  
  import * as types from './inventorySettingsTypes'
  import * as actions from './inventorySettingsActions'
  import api from 'Api'
  
  
  //=========================
  // REQUESTS
  //=========================

  // GRP ONE
  const getAllGrpOneRequest = async(payload) => {
      const result = await api.get(`/grp-one`);
      return result.data
  }

  const putGrpOneRequest = async({payload}) => {
      const result = await api.put(`grp-one/${payload.id}`, payload)
      return result.data
  }
  
  const postGrpOneRequest = async({payload}) => {
      const result = await api.post(`grp-one`, payload)
      return result.data;
  }

  const deleteGrpOneRequest = async({payload}) => {
      const result = await api.delete(`grp-one/${payload}`)
      return result.data;
  }


  //GRP TWO
  const getAllGrpTwoRequest = async(payload) => {
    const result = await api.get(`/grp-two`);
    return result.data
}

const putGrpTwoRequest = async({payload}) => {
    const result = await api.put(`grp-two/${payload.id}`, payload)
    return result.data
}

  const postGrpTwoRequest = async({payload}) => {
    const result = await api.post(`grp-two`, payload)
    return result.data;
}

  const deleteGrpTwoRequest = async({payload}) => {
    const result = await api.delete(`grp-two/${payload}`)
    return result.data;
}




  //SIZE
  const getAllSizeRequest = async(payload) => {
    const result = await api.get(`/size`);
    return result.data
  }

   const putSizeRequest = async({payload}) => {
    const result = await api.put(`size/${payload.id}`, payload)
    return result.data
  }

  const postSizeRequest = async({payload}) => {
    const result = await api.post(`size`, payload)
    return result.data;
  }

  const deleteSizeRequest = async({payload}) => {
    const result = await api.delete(`size/${payload}`)
    return result.data;
  }
 

  
  //MATERIAL
  const getAllMaterialRequest = async(payload) => {
    const result = await api.get(`/material`);
    return result.data
  }

   const putMaterialRequest = async({payload}) => {
    const result = await api.put(`material/${payload.id}`, payload)
    return result.data
  }

  const postMaterialRequest = async({payload}) => {
    const result = await api.post(`material`, payload)
    return result.data;
  }

  const deleteMaterialRequest = async({payload}) => {
    const result = await api.delete(`material/${payload}`)
    return result.data;
  }




    //BRAND
  const getAllBrandRequest = async(payload) => {
    const result = await api.get(`/brand`);
    return result.data
  }

   const putBrandRequest = async({payload}) => {
    const result = await api.put(`brand/${payload.id}`, payload)
    return result.data
  }

  const postBrandRequest = async({payload}) => {
    const result = await api.post(`brand`, payload)
    return result.data;
  }

  const deleteBrandRequest = async({payload}) => {
    const result = await api.delete(`brand/${payload}`)
    return result.data;
  }


    //UOM 
  const getAllUomRequest = async(payload) => {
    const result = await api.get(`/uom`);
    return result.data
  }

   const putUomRequest = async({payload}) => {
    const result = await api.put(`uom/${payload.id}`, payload)
    return result.data
  }

  const postUomRequest = async({payload}) => {
    const result = await api.post(`uom`, payload)
    return result.data;
  }

  const deleteUomRequest = async({payload}) => {
    const result = await api.delete(`uom/${payload}`)
    return result.data;
  }

  //=========================
  // CALL(GENERATOR) ACTIONS
  //=========================
  
  // GRP ONE 
  function* getAllGrpOneData(payload) {
      try {
          const data = yield call(getAllGrpOneRequest, payload) 
          yield put(actions.getAllGrpOneSettingsSuccess(data))
      } catch (error) {
          yield put(actions.getAllGrpOneSettingsFailure(error))
      }
  }
  
  function* putGrpOneData(payload) {
      try {
          const data = yield call(putGrpOneRequest, payload)
          yield put(actions.putGrpOneSuccess(data))
      } catch (error) {
          yield put(actions.putGrpOneFailure(error))
      }
  }

  function* postGrpOneData(payload) {
      try {
          const data = yield call(postGrpOneRequest, payload)
          yield put(actions.postGrpOneSuccess(data))
      } catch (error) {
          yield put(actions.postGrpOneFailure(error))
      }
  }

  function* deleteGrpOneData(payload) {
      try {
          const data = yield call(deleteGrpOneRequest, payload)
          yield put(actions.deleteGrpOneSuccess(data))
      } catch (error) {
          yield put(actions.deleteGrpOneFailure(error))
      }
  }



  // GRP TWO    
  function* getAllGrpTwoData(payload) {
    try {
        const data = yield call(getAllGrpTwoRequest, payload) 
        yield put(actions.getAllGrpTwoSettingsSuccess(data))
    } catch (error) {
        yield put(actions.getAllGrpTwoSettingsFailure(error))
    }
}

function* putGrpTwoData(payload) {
    try {
        const data = yield call(putGrpTwoRequest, payload) 
        yield put(actions.putGrpTwoSuccess(data))
    } catch (error) {
        yield put(actions.putGrpTwoFailure(error))
    }
}

function* postGrpTwoData(payload) {
    try {
        const data = yield call(postGrpTwoRequest, payload) 
        yield put(actions.postGrpTwoSuccess(data))
    } catch (error) {
        yield put(actions.postGrpTwoFailure(error))
    }
}

function* deleteGrpTwoData(payload) {
    try {
        const data = yield call(deleteGrpTwoRequest, payload) 
        yield put(actions.deleteGrpTwoSuccess(data))
    } catch (error) {
        yield put(actions.deleteGrpTwoFailure(error))
    }
}




  // SIZE    
  function* getAllSizeData(payload) {
    try {
        const data = yield call(getAllSizeRequest, payload) 
        yield put(actions.getAllSizeSettingsSuccess(data))
    } catch (error) {
        yield put(actions.getAllSizeSettingsFailure(error))
    }
}

function* putSizeData(payload) {
    try {
        const data = yield call(putSizeRequest, payload) 
        yield put(actions.putSizeSuccess(data))
    } catch (error) {
        yield put(actions.putSizeFailure(error))
    }
}

function* postSizeData(payload) {
    try {
        const data = yield call(postSizeRequest, payload) 
        yield put(actions.postSizeSuccess(data))
    } catch (error) {
        yield put(actions.postSizeFailure(error))
    }
}

function* deleteSizeData(payload) {
    try {
        const data = yield call(deleteSizeRequest, payload) 
        yield put(actions.deleteSizeSuccess(data))
    } catch (error) {
        yield put(actions.deleteSizeFailure(error))
    }
}



  // MATERIAL    
  function* getAllMaterialData(payload) {
    try {
        const data = yield call(getAllMaterialRequest, payload) 
        yield put(actions.getAllMaterialSettingsSuccess(data))
    } catch (error) {
        yield put(actions.getAllMaterialSettingsFailure(error))
    }
}

function* putMaterialData(payload) {
    try {
        const data = yield call(putMaterialRequest, payload) 
        yield put(actions.putMaterialSuccess(data))
    } catch (error) {
        yield put(actions.putMaterialFailure(error))
    }
}

function* postMaterialData(payload) {
    try {
        const data = yield call(postMaterialRequest, payload) 
        yield put(actions.postMaterialSuccess(data))
    } catch (error) {
        yield put(actions.postMaterialFailure(error))
    }
}

function* deleteMaterialData(payload) {
    try {
        const data = yield call(deleteMaterialRequest, payload) 
        yield put(actions.deleteMaterialSuccess(data))
    } catch (error) {
        yield put(actions.deleteMaterialFailure(error))
    }
}



  // BRAND    
  function* getAllBrandData(payload) {
    try {
        const data = yield call(getAllBrandRequest, payload) 
        yield put(actions.getAllBrandSettingsSuccess(data))
    } catch (error) {
        yield put(actions.getAllBrandSettingsFailure(error))
    }
}

function* putBrandData(payload) {
    try {
        const data = yield call(putBrandRequest, payload) 
        yield put(actions.putBrandSuccess(data))
    } catch (error) {
        yield put(actions.putBrandFailure(error))
    }
}

function* postBrandData(payload) {
    try {
        const data = yield call(postBrandRequest, payload) 
        yield put(actions.postBrandSuccess(data))
    } catch (error) {
        yield put(actions.postBrandFailure(error))
    }
}

function* deleteBrandData(payload) {
    try {
        const data = yield call(deleteBrandRequest, payload) 
        yield put(actions.deleteBrandSuccess(data))
    } catch (error) {
        yield put(actions.deleteBrandFailure(error))
    }
}



  // UOM     
  function* getAllUomData(payload) {
    try {
        const data = yield call(getAllUomRequest, payload) 
        yield put(actions.getAllUomSettingsSuccess(data))
    } catch (error) {
        yield put(actions.getAllUomSettingsFailure(error))
    }
}

function* putUomData(payload) {
    try {
        const data = yield call(putUomRequest, payload) 
        yield put(actions.putUomSuccess(data))
    } catch (error) {
        yield put(actions.putUomFailure(error))
    }
}

function* postUomData(payload) {
    try {
        const data = yield call(postUomRequest, payload) 
        yield put(actions.postUomSuccess(data))
    } catch (error) {
        yield put(actions.postUomFailure(error))
    }
}

function* deleteUomData(payload) {
    try {
        const data = yield call(deleteUomRequest, payload) 
        yield put(actions.deleteUomSuccess(data))
    } catch (error) {
        yield put(actions.deleteUomFailure(error))
    }
}

  //=======================
  // WATCHER FUNCTIONS
  //=======================
  
  // GRP ONE 
  export function* getAllGrpOneWatcher() {
      yield takeEvery(types.GET_ALL_GRP_ONE_SETTINGS, getAllGrpOneData)
  }

  export function* putGrpOneWatcher() {
      yield takeEvery(types.PUT_GRP_ONE_SETTING, putGrpOneData)
  }
 
  export function* postGrpOneWatcher() {
      yield takeEvery(types.POST_GRP_ONE_SETTING, postGrpOneData)
  }

  export function* deleteGrpOneWatcher() {
      yield takeEvery(types.DELETE_GRP_ONE_SETTING, deleteGrpOneData)
  }
  


  // GRP TWO 
  export function* getAllGrpTwoWatcher() {
    yield takeEvery(types.GET_ALL_GRP_TWO_SETTINGS, getAllGrpTwoData)
  }

  export function* putGrpTwoWatcher() {
    yield takeEvery(types.PUT_GRP_TWO_SETTING, putGrpTwoData)
  }

  export function* postGrpTwoWatcher() {
    yield takeEvery(types.POST_GRP_TWO_SETTING, postGrpTwoData)
  }

  export function* deleteGrpTwoWatcher() {
    yield takeEvery(types.DELETE_GRP_TWO_SETTING, deleteGrpTwoData)
  }


    // SIZE 
  export function* getAllSizeWatcher() {
    yield takeEvery(types.GET_ALL_SIZE_SETTINGS, getAllSizeData)
  }

  export function* putSizeWatcher() {
    yield takeEvery(types.PUT_SIZE_SETTING, putSizeData)
  }

  export function* postSizeWatcher() {
    yield takeEvery(types.POST_SIZE_SETTING, postSizeData)
  }

  export function* deleteSizeWatcher() {
    yield takeEvery(types.DELETE_SIZE_SETTING, deleteSizeData)
  }



// MATERIAL 
  export function* getAllMaterialWatcher() {
    yield takeEvery(types.GET_ALL_MATERIAL_SETTINGS, getAllMaterialData)
  }

  export function* putMaterialWatcher() {
    yield takeEvery(types.PUT_MATERIAL_SETTING, putMaterialData)
  }

  export function* postMaterialWatcher() {
    yield takeEvery(types.POST_MATERIAL_SETTING, postMaterialData)
  }

  export function* deleteMaterialWatcher() {
    yield takeEvery(types.DELETE_MATERIAL_SETTING, deleteMaterialData)
  }



// BRAND 
export function* getAllBrandWatcher() {
    yield takeEvery(types.GET_ALL_BRAND_SETTINGS, getAllBrandData)
  }

  export function* putBrandWatcher() {
    yield takeEvery(types.PUT_BRAND_SETTING, putBrandData)
  }

  export function* postBrandWatcher() {
    yield takeEvery(types.POST_BRAND_SETTING, postBrandData)
  }

  export function* deleteBrandWatcher() {
    yield takeEvery(types.DELETE_BRAND_SETTING, deleteBrandData)
  }


// UOM
export function* getAllUomWatcher() {
    yield takeEvery(types.GET_ALL_UOM_SETTINGS, getAllUomData)
  }

  export function* putUomWatcher() {
    yield takeEvery(types.PUT_UOM_SETTING, putUomData)
  }

  export function* postUomWatcher() {
    yield takeEvery(types.POST_UOM_SETTING, postUomData)
  }

  export function* deleteUomWatcher() {
    yield takeEvery(types.DELETE_UOM_SETTING, deleteUomData)
  }


  //=======================
  // FORK SAGAS TO STORE
  //=======================
  export default function* inventorySettingsSaga() {
    yield all([
      fork(getAllGrpOneWatcher),
      fork(putGrpOneWatcher),
      fork(postGrpOneWatcher),
      fork(deleteGrpOneWatcher),

      fork(getAllGrpTwoWatcher),
      fork(postGrpTwoWatcher),
      fork(deleteGrpTwoWatcher),
      fork(putGrpTwoWatcher),

      fork(getAllSizeWatcher),
      fork(postSizeWatcher),
      fork(deleteSizeWatcher),
      fork(putSizeWatcher),

      fork(getAllMaterialWatcher),
      fork(postMaterialWatcher),
      fork(deleteMaterialWatcher),
      fork(putMaterialWatcher),

      fork(getAllBrandWatcher),
      fork(postBrandWatcher),
      fork(deleteBrandWatcher),
      fork(putBrandWatcher),

      fork(getAllUomWatcher),
      fork(postUomWatcher),
      fork(deleteUomWatcher),
      fork(putUomWatcher),
    ])
  }