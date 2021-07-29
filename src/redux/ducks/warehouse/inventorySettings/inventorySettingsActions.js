import * as types from "./inventorySettingsTypes";

// Get data of selected model

// GET all GRP ONE  
export const getAllGrpOneSettings = () => ({
    type: types.GET_ALL_GRP_ONE_SETTINGS,
})

export const getAllGrpOneSettingsSuccess = (data) => ({
    type: types.GET_ALL_GRP_ONE_SETTINGS_SUCCESS,
    payload: data
})

export const getAllGrpOneSettingsFailure = (data) => ({
    type: types.GET_ALL_GRP_ONE_SETTINGS_FAILURE,
    payload: data
})

//GET one GRP ONE 
export const getGrpOneSetting = (data) => ({
    type: types.GET_GRP_ONE_SETTING,
    payload: data
})

export const getGrpOneSettingSuccess = (data) => ({
    type: types.GET_GRP_ONE_SETTING_SUCCESS,
    payload: data
})

export const getGrpOneSettingFailure = (data) => ({
    type: types.GET_GRP_ONE_SETTING_FAILURE,
    payload: data
})

// POST one GRP ONE
export const postGrpOne = (data) => ({
    type: types.POST_GRP_ONE_SETTING,
    payload: data
})

export const postGrpOneSuccess = (data) => ({
    type: types.POST_GRP_ONE_SETTING_SUCCESS,
    payload: data
})

export const postGrpOneFailure = (data) => ({
    type: types.POST_GRP_ONE_SETTING_FAILURE,
    payload: data
})

// PUT  one GRP ONE 
export const putGrpOne = (data) => ({
    type: types.PUT_GRP_ONE_SETTING,
    payload: data
})

export const putGrpOneSuccess = (data) => ({
    type: types.PUT_GRP_ONE_SETTING_SUCCESS,
    payload: data
})

export const putGrpOneFailure = (data) => ({
    type: types.PUT_GRP_ONE_SETTING_FAILURE,
    payload: data
})

// DELETE one GRP ONE
export const deleteGrpOne = (data) => ({
    type: types.DELETE_GRP_ONE_SETTING,
    payload: data
})

export const deleteGrpOneSuccess = (data) => ({
    type: types.DELETE_GRP_ONE_SETTING_SUCCESS,
    payload: data
})

export const deleteGrpOneFailure = (data) => ({
    type: types.DELETE_GRP_ONE_SETTING_FAILURE,
    payload: data
})





// GET all GRP TWO  
export const getAllGrpTwoSettings = () => ({
    type: types.GET_ALL_GRP_TWO_SETTINGS,
})

export const getAllGrpTwoSettingsSuccess = (data) => ({
    type: types.GET_ALL_GRP_TWO_SETTINGS_SUCCESS,
    payload: data
})

export const getAllGrpTwoSettingsFailure = (data) => ({
    type: types.GET_ALL_GRP_TWO_SETTINGS_FAILURE,
    payload: data
})

//GET one GRP TWO 
export const getGrpTwoSetting = (data) => ({
    type: types.GET_GRP_TWO_SETTING,
    payload: data
})

export const getGrpTwoSettingSuccess = (data) => ({
    type: types.GET_GRP_TWO_SETTING_SUCCESS,
    payload: data
})

export const getGrpTwoSettingFailure = (data) => ({
    type: types.GET_GRP_TWO_SETTING_FAILURE,
    payload: data
})

// POST one GRP TWO
export const postGrpTwo = (data) => ({
    type: types.POST_GRP_TWO_SETTING,
    payload: data
})

export const postGrpTwoSuccess = (data) => ({
    type: types.POST_GRP_TWO_SETTING_SUCCESS,
    payload: data
})

export const postGrpTwoFailure = (data) => ({
    type: types.POST_GRP_TWO_SETTING_FAILURE,
    payload: data
})

// PUT  one GRP TWO 
export const putGrpTwo = (data) => ({
    type: types.PUT_GRP_TWO_SETTING,
    payload: data
})

export const putGrpTwoSuccess = (data) => ({
    type: types.PUT_GRP_TWO_SETTING_SUCCESS,
    payload: data
})

export const putGrpTwoFailure = (data) => ({
    type: types.PUT_GRP_TWO_SETTING_FAILURE,
    payload: data
})

// DELETE one GRP TWO
export const deleteGrpTwo = (data) => ({
    type: types.DELETE_GRP_TWO_SETTING,
    payload: data
})

export const deleteGrpTwoSuccess = (data) => ({
    type: types.DELETE_GRP_TWO_SETTING_SUCCESS,
    payload: data
})

export const deleteGrpTwoFailure = (data) => ({
    type: types.DELETE_GRP_TWO_SETTING_FAILURE,
    payload: data
})





// GET all Size
export const getAllSizeSettings = () => ({
    type: types.GET_ALL_SIZE_SETTINGS,
})

export const getAllSizeSettingsSuccess = (data) => ({
    type: types.GET_ALL_SIZE_SETTINGS_SUCCESS,
    payload: data
})

export const getAllSizeSettingsFailure = (data) => ({
    type: types.GET_ALL_SIZE_SETTINGS_FAILURE,
    payload: data
})

//GET one SIZE
export const getSizeSetting = (data) => ({
    type: types.GET_SIZE_SETTING,
    payload: data
})

export const getSizeSettingSuccess = (data) => ({
    type: types.GET_SIZE_SETTING_SUCCESS,
    payload: data
})

export const getSizeSettingFailure = (data) => ({
    type: types.GET_SIZE_SETTING_FAILURE,
    payload: data
})

// POST one SIZE
export const postSize = (data) => ({
    type: types.POST_SIZE_SETTING,
    payload: data
})

export const postSizeSuccess = (data) => ({
    type: types.POST_SIZE_SETTING_SUCCESS,
    payload: data
})

export const postSizeFailure = (data) => ({
    type: types.POST_SIZE_SETTING_FAILURE,
    payload: data
})

// PUT  one Size
export const putSize = (data) => ({
    type: types.PUT_SIZE_SETTING,
    payload: data
})

export const putSizeSuccess = (data) => ({
    type: types.PUT_SIZE_SETTING_SUCCESS,
    payload: data
})

export const putSizeFailure = (data) => ({
    type: types.PUT_SIZE_SETTING_FAILURE,
    payload: data
})

// DELETE one Size
export const deleteSize = (data) => ({
    type: types.DELETE_SIZE_SETTING,
    payload: data
})

export const deleteSizeSuccess = (data) => ({
    type: types.DELETE_SIZE_SETTING_SUCCESS,
    payload: data
})

export const deleteSizeFailure = (data) => ({
    type: types.DELETE_SIZE_SETTING_FAILURE,
    payload: data
})




// GET all MATERIAL
export const getAllMaterialSettings = () => ({
    type: types.GET_ALL_MATERIAL_SETTINGS,
})

export const getAllMaterialSettingsSuccess = (data) => ({
    type: types.GET_ALL_MATERIAL_SETTINGS_SUCCESS,
    payload: data
})

export const getAllMaterialSettingsFailure = (data) => ({
    type: types.GET_ALL_MATERIAL_SETTINGS_FAILURE,
    payload: data
})

//GET one SIZE
export const getMaterialSetting = (data) => ({
    type: types.GET_MATERIAL_SETTING,
    payload: data
})

export const getMaterialSettingSuccess = (data) => ({
    type: types.GET_MATERIAL_SETTING_SUCCESS,
    payload: data
})

export const getMaterialSettingFailure = (data) => ({
    type: types.GET_MATERIAL_SETTING_FAILURE,
    payload: data
})

// POST one SIZE
export const postMaterial = (data) => ({
    type: types.POST_MATERIAL_SETTING,
    payload: data
})

export const postMaterialSuccess = (data) => ({
    type: types.POST_MATERIAL_SETTING_SUCCESS,
    payload: data
})

export const postMaterialFailure = (data) => ({
    type: types.POST_MATERIAL_SETTING_FAILURE,
    payload: data
})

// PUT  one Size
export const putMaterial = (data) => ({
    type: types.PUT_MATERIAL_SETTING,
    payload: data
})

export const putMaterialSuccess = (data) => ({
    type: types.PUT_MATERIAL_SETTING_SUCCESS,
    payload: data
})

export const putMaterialFailure = (data) => ({
    type: types.PUT_MATERIAL_SETTING_FAILURE,
    payload: data
})

// DELETE one Size
export const deleteMaterial = (data) => ({
    type: types.DELETE_MATERIAL_SETTING,
    payload: data
})

export const deleteMaterialSuccess = (data) => ({
    type: types.DELETE_MATERIAL_SETTING_SUCCESS,
    payload: data
})

export const deleteMaterialFailure = (data) => ({
    type: types.DELETE_MATERIAL_SETTING_FAILURE,
    payload: data
})





// GET all BRAND
export const getAllBrandSettings = () => ({
    type: types.GET_ALL_BRAND_SETTINGS,
})

export const getAllBrandSettingsSuccess = (data) => ({
    type: types.GET_ALL_BRAND_SETTINGS_SUCCESS,
    payload: data
})

export const getAllBrandSettingsFailure = (data) => ({
    type: types.GET_ALL_BRAND_SETTINGS_FAILURE,
    payload: data
})

//GET one BRAND
export const getBrandSetting = (data) => ({
    type: types.GET_BRAND_SETTING,
    payload: data
})

export const getBrandSettingSuccess = (data) => ({
    type: types.GET_BRAND_SETTING_SUCCESS,
    payload: data
})

export const getBrandSettingFailure = (data) => ({
    type: types.GET_BRAND_SETTING_FAILURE,
    payload: data
})

// POST one BRAND
export const postBrand = (data) => ({
    type: types.POST_BRAND_SETTING,
    payload: data
})

export const postBrandSuccess = (data) => ({
    type: types.POST_BRAND_SETTING_SUCCESS,
    payload: data
})

export const postBrandFailure = (data) => ({
    type: types.POST_BRAND_SETTING_FAILURE,
    payload: data
})

// PUT  one BRAND
export const putBrand = (data) => ({
    type: types.PUT_BRAND_SETTING,
    payload: data
})

export const putBrandSuccess = (data) => ({
    type: types.PUT_BRAND_SETTING_SUCCESS,
    payload: data
})

export const putBrandFailure = (data) => ({
    type: types.PUT_BRAND_SETTING_FAILURE,
    payload: data
})

// DELETE one BRAND
export const deleteBrand = (data) => ({
    type: types.DELETE_BRAND_SETTING,
    payload: data
})

export const deleteBrandSuccess = (data) => ({
    type: types.DELETE_BRAND_SETTING_SUCCESS,
    payload: data
})

export const deleteBrandFailure = (data) => ({
    type: types.DELETE_BRAND_SETTING_FAILURE,
    payload: data
})




// GET all UOM
export const getAllUomSettings = () => ({
    type: types.GET_ALL_UOM_SETTINGS,
})

export const getAllUomSettingsSuccess = (data) => ({
    type: types.GET_ALL_UOM_SETTINGS_SUCCESS,
    payload: data
})

export const getAllUomSettingsFailure = (data) => ({
    type: types.GET_ALL_UOM_SETTINGS_FAILURE,
    payload: data
})

//GET one UOM
export const getUomSetting = (data) => ({
    type: types.GET_UOM_SETTING,
    payload: data
})

export const getUomSettingSuccess = (data) => ({
    type: types.GET_UOM_SETTING_SUCCESS,
    payload: data
})

export const getUomSettingFailure = (data) => ({
    type: types.GET_UOM_SETTING_FAILURE,
    payload: data
})

// POST one UOM
export const postUom = (data) => ({
    type: types.POST_UOM_SETTING,
    payload: data
})

export const postUomSuccess = (data) => ({
    type: types.POST_UOM_SETTING_SUCCESS,
    payload: data
})

export const postUomFailure = (data) => ({
    type: types.POST_UOM_SETTING_FAILURE,
    payload: data
})

// PUT  one UOM
export const putUom = (data) => ({
    type: types.PUT_UOM_SETTING,
    payload: data
})

export const putUomSuccess = (data) => ({
    type: types.PUT_UOM_SETTING_SUCCESS,
    payload: data
})

export const putUomFailure = (data) => ({
    type: types.PUT_UOM_SETTING_FAILURE,
    payload: data
})

// DELETE one UOM
export const deleteUom = (data) => ({
    type: types.DELETE_UOM_SETTING,
    payload: data
})

export const deleteUomSuccess = (data) => ({
    type: types.DELETE_UOM_SETTING_SUCCESS,
    payload: data
})

export const deleteUomFailure = (data) => ({
    type: types.DELETE_UOM_SETTING_FAILURE,
    payload: data
})