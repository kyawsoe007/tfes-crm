import * as types from './inventorySettingsTypes';
import { NotificationManager } from 'react-notifications'


const INIT_STATE = {

    grpOneAll: {
        loading: false,
        data: []
    },
    grpOne: {
        loading: false,
        data: {}
    },


    grpTwoAll: {
        loading: false,
        data: []
    },
    grpTwo: {
        loading: false,
        data: {}
    },


    sizeAll: {
        loading: false,
        data: []
    },
    size: {
        loading: false,
        data: {}
    },

    materialAll: {
        loading: false,
        data: []
    },
    material: {
        loading: false,
        data: {}
    },


    brandAll: {
        loading: false,
        data: []
    },
    brand: {
        loading: false,
        data: {}
    },

    uomAll: {
        loading: false,
        data: []
    },
    uom: {
        loading: false,
        data: {}
    },

}

export default (state = INIT_STATE, action) => {

    let data;
    switch (action.type) {
        //GET all GRP ONE
        case types.GET_ALL_GRP_ONE_SETTINGS:
            // console.log ("JIJIJIJIJIJIJIJIJIJI")
            return {
                ...state,
            }

        case types.GET_ALL_GRP_ONE_SETTINGS_SUCCESS:
            // console.log("HUHUHUHUHUHUHUHU", { data })
            return {
                ...state,
                grpOneAll: {
                    loading: false,                
                    data: action.payload
                }
            }

        case types.GET_ALL_GRP_ONE_SETTINGS_FAILURE:
            return {
                ...state,
                grpOneAll: {
                    loading: false,                
                    data: action.payload
                }
            }

        //GET one GRP ONE
        case types.GET_GRP_ONE_SETTING: 
            return {
                ...state,
                grpOne: {
                    ...state.grpOne,
                    loading: true,
                    data: action.payload
                }
            }
        
        case types.GET_GRP_ONE_SETTING_SUCCESS:
            return {
                ...state,
                grpOne: {
                    ...state.grpOne,
                    loading: false,
                    data: action.payload
                }
            } 

        case types.GET_GRP_ONE_SETTING_FAILURE:
            return {
                ...state,
            }

        // POST GRP ONE
        case types.POST_GRP_ONE_SETTING:
            return {
                ...state,
            }

        case types.POST_GRP_ONE_SETTING_SUCCESS:
            NotificationManager.success("grp one succesfully created")
            data = [...state.grpOneAll.data]
            data.push(action.payload)
            return {
                ...state,
                grpOneAll: {
                    loading: false,
                    data: data
                }
            }

        case types.POST_GRP_ONE_SETTING_FAILURE:
            NotificationManager.error("error in creating grp one")
            return {
                ...state,
            }

        // PATCH grp One
        case types.PUT_GRP_ONE_SETTING:
            return {
                ...state,
            }
        
        case types.PUT_GRP_ONE_SETTING_SUCCESS:
            NotificationManager.success("successfully edited grp one")
            data = state.grpOneAll.data.map(item => item.id === action.payload.id ? action.payload : item);
            return {
                ...state,
                grpOneAll: {
                    loading: false,
                    data: data
                }
            }

        case types.PUT_GRP_ONE_SETTING_FAILURE:
            NotificationManager.error("error in editing grp one")
            return {
                ...state,
            }

        // DELETE grp one
        case types.DELETE_GRP_ONE_SETTING:
            return {
                ...state,
            }

        case types.DELETE_GRP_ONE_SETTING_SUCCESS:
            NotificationManager.success("grp one deleted!")
            data = state.grpOneAll.data.filter(item => item.id !== action.payload.id)
            return {
                ...state,
                grpOneAll: {
                    loading: false,
                    data: data
                }
            }

        case types.DELETE_GRP_ONE_SETTING_FAILURE:
            NotificationManager.error("error in deleting grp one")
            return {
                ...state,
            }




        //GET all GRP TWO
        case types.GET_ALL_GRP_TWO_SETTINGS:
            // console.log ("JIJIJIJIJIJIJIJIJIJI")
            return {
                ...state,
            }

        case types.GET_ALL_GRP_TWO_SETTINGS_SUCCESS:
            // console.log("HUHUHUHUHUHUHUHU", { data })
            return {
                ...state,
                grpTwoAll: {
                    loading: false,                
                    data: action.payload
                }
            }

        case types.GET_ALL_GRP_TWO_SETTINGS_FAILURE:
            return {
                ...state,
            }

        //GET one GRP TWO
        case types.GET_GRP_TWO_SETTING: 
            return {
                ...state,
                grpTwo: {
                    ...state.grpTwo,
                    loading: true,
                    data: action.payload
                }
            }
        
        case types.GET_GRP_TWO_SETTING_SUCCESS:
            return {
                ...state,
                grpTwo: {
                    ...state.grpTwo,
                    loading: false,
                    data: action.payload
                }
            } 

        case types.GET_GRP_TWO_SETTING_FAILURE:
            return {
                ...state,
            }

        // POST GRP TWO
        case types.POST_GRP_TWO_SETTING:
            return {
                ...state,
            }

        case types.POST_GRP_TWO_SETTING_SUCCESS:
            NotificationManager.success("grp two succesfully created")
            data = [...state.grpTwoAll.data];
            data.push(action.payload);
            return {
                ...state,
                grpTwoAll: {
                    loading: false,
                    data: data
                }
            }

        case types.POST_GRP_TWO_SETTING_FAILURE:
            NotificationManager.error("error in creating grp two")
            return {
                ...state,
            }

        // PATCH grp Two
        case types.PUT_GRP_TWO_SETTING:
            return {
                ...state,
            }
        
        case types.PUT_GRP_TWO_SETTING_SUCCESS:
            NotificationManager.success("successfully edited grp two")
            data = state.grpTwoAll.data.map(item => item.id === action.payload.id ? action.payload : item)

            return {
                ...state,
                grpTwoAll: {
                    loading: false,
                    data: data
                }
            }

        case types.PUT_GRP_TWO_SETTING_FAILURE:
            NotificationManager.error("error in editing grp two")
            return {
                ...state
            }

        // DELETE grp two
        case types.DELETE_GRP_TWO_SETTING:
            return {
                ...state,
            }

        case types.DELETE_GRP_TWO_SETTING_SUCCESS:
            NotificationManager.success("grp two deleted!")
            data = state.grpTwoAll.data.filter(item => item.id !== action.payload.id)
            return {
                ...state,
                grpTwoAll: {
                    loading: false,
                    data: data
                }
            }

        case types.DELETE_GRP_TWO_SETTING_FAILURE:
            NotificationManager.error("error in deleting grp two")
            return {
                ...state,
            }




        //GET all SIZE
        case types.GET_ALL_SIZE_SETTINGS:
            // console.log ("JIJIJIJIJIJIJIJIJIJI")
            return {
                ...state,
            }

        case types.GET_ALL_SIZE_SETTINGS_SUCCESS:
            // console.log("HUHUHUHUHUHUHUHU", { data })
            return {
                ...state,
                sizeAll: {
                    loading: false,                
                    data: action.payload
                }
            }

        case types.GET_ALL_SIZE_SETTINGS_FAILURE:
            return {
                ...state,
            }

        //GET one SIZE
        case types.GET_SIZE_SETTING: 
            return {
                ...state,
                size: {
                    ...state.size,
                    loading: true,
                    data: action.payload
                }
            }
        
        case types.GET_SIZE_SETTING_SUCCESS:
            return {
                ...state,
                size: {
                    ...state.size,
                    loading: false,
                    data: action.payload
                }
            } 

        case types.GET_SIZE_SETTING_FAILURE:
            return {
                ...state,
                size: {
                    ...state.size,
                    loading: false,
                    data: action.payload
                }
            }

        // POST GRP TWO
        case types.POST_SIZE_SETTING:
            return {
                ...state,
            }

        case types.POST_SIZE_SETTING_SUCCESS:
            NotificationManager.success("size succesfully created")
            data = [...state.sizeAll.data];
            data.push(action.payload);
            return {
                ...state,
                sizeAll: {
                    loading: false,
                    data: data
                }
            }

        case types.POST_SIZE_SETTING_FAILURE:
            NotificationManager.error("error in creating size")
            return {
                ...state,
            }

        // PATCH SIZE
        case types.PUT_SIZE_SETTING:
            return {
                ...state,
            }
        
        case types.PUT_SIZE_SETTING_SUCCESS:
            NotificationManager.success("successfully edited size")
            data = state.sizeAll.data.map(item => item.id === action.payload.id ? action.payload : item)
            return {
                ...state,
                sizeAll: {
                    loading: false,
                    data: data
                }
            }

        case types.PUT_SIZE_SETTING_FAILURE:
            NotificationManager.error("error in editing size")
            return {
                ...state,
            }

        // DELETE size
        case types.DELETE_SIZE_SETTING:
            return {
                ...state,
            }

        case types.DELETE_SIZE_SETTING_SUCCESS:
            NotificationManager.success("size deleted!")
            data = state.sizeAll.data.filter(item => item.id !== action.payload.id)
            return {
                ...state,
                sizeAll: {
                    loading: false,
                    data: data
                }
            }

        case types.DELETE_SIZE_SETTING_FAILURE:
            NotificationManager.error("error in deleting size")
            return {
                ...state,
            }



        //GET all MATERIAL
        case types.GET_ALL_MATERIAL_SETTINGS:
            // console.log ("JIJIJIJIJIJIJIJIJIJI")
            return {
                ...state,
            }

        case types.GET_ALL_MATERIAL_SETTINGS_SUCCESS:
            // console.log("HUHUHUHUHUHUHUHU", { data })
            return {
                ...state,
                materialAll: {
                    loading: false,                
                    data: action.payload
                }
            }

        case types.GET_ALL_MATERIAL_SETTINGS_FAILURE:
            return {
                ...state,
            }

        //GET one MATERIAL
        case types.GET_MATERIAL_SETTING: 
            return {
                ...state,
            }
        
        case types.GET_MATERIAL_SETTING_SUCCESS:
            return {
                ...state,
                material: {
                    loading: false,
                    data: action.payload
                }
            } 

        case types.GET_MATERIAL_SETTING_FAILURE:
            return {
                ...state,
            }

        // POST MATERIAL
        case types.POST_MATERIAL_SETTING:
            return {
                ...state,
            }

        case types.POST_MATERIAL_SETTING_SUCCESS:
            NotificationManager.success("material succesfully created")
            data = [...state.materialAll.data];
            data.push(action.payload);
            return {
                ...state,
                materialAll: {
                    loading: false,
                    data: data
                }
            }

        case types.POST_MATERIAL_SETTING_FAILURE:
            NotificationManager.error("error in creating material")
            return {
                ...state,
            }

        // PATCH MATERIAL
        case types.PUT_MATERIAL_SETTING:
            return {
                ...state,
            }
        
        case types.PUT_MATERIAL_SETTING_SUCCESS:
            NotificationManager.success("successfully edited material")
            data = state.materialAll.data.map(item => item.id === action.payload.id ? action.payload : item);
            return {
                ...state,
                materialAll: {
                    loading: false,
                    data: data
                }
            }

        case types.PUT_MATERIAL_SETTING_FAILURE:
            NotificationManager.error("error in editing material")
            return {
                ...state,
            }

        // DELETE size
        case types.DELETE_MATERIAL_SETTING:
            return {
                ...state,
            }

        case types.DELETE_MATERIAL_SETTING_SUCCESS:
            NotificationManager.success("material deleted!")
            data = state.materialAll.data.filter(item => item.id !== action.payload.id)
            return {
                ...state,
                materialAll: {
                    loading: false,
                    data: data
                }
            }

        case types.DELETE_MATERIAL_SETTING_FAILURE:
            NotificationManager.error("error in deleting material")
            return {
                ...state,
            }



        //GET all BRAND
        case types.GET_ALL_BRAND_SETTINGS:
            // console.log ("JIJIJIJIJIJIJIJIJIJI")
            return {
                ...state,
            }

        case types.GET_ALL_BRAND_SETTINGS_SUCCESS:
            // console.log("HUHUHUHUHUHUHUHU", { data })
            return {
                ...state,
                brandAll: {
                    loading: false,                
                    data: action.payload
                }
            }

        case types.GET_ALL_BRAND_SETTINGS_FAILURE:
            return {
                ...state,
            }

        //GET one BRAND
        case types.GET_BRAND_SETTING: 
            return {
                ...state,
            }
        
        case types.GET_BRAND_SETTING_SUCCESS:
            return {
                ...state,
                brand: {
                    loading: false,
                    data: action.payload
                }
            } 

        case types.GET_BRAND_SETTING_FAILURE:
            return {
                ...state,
            }

        // POST BRAND
        case types.POST_BRAND_SETTING:
            return {
                ...state,
            }

        case types.POST_BRAND_SETTING_SUCCESS:
            NotificationManager.success("brand succesfully created")
            data = [...state.brandAll.data];
            data.push(action.payload)
            return {
                ...state,
                brandAll: {
                    loading: false,
                    data: data
                }
            }

        case types.POST_BRAND_SETTING_FAILURE:
            NotificationManager.error("error in creating brand")
            return {
                ...state,
            }

        // PATCH BRAND
        case types.PUT_BRAND_SETTING:
            return {
                ...state,
            }
        
        case types.PUT_BRAND_SETTING_SUCCESS:
            NotificationManager.success("successfully edited brand")
            data = state.brandAll.data.map(item => item.id === action.payload.id ? action.payload : item )
            return {
                ...state,
                brandAll: {
                    loading: false,
                    data: data
                }
            }

        case types.PUT_BRAND_SETTING_FAILURE:
            NotificationManager.error("error in editing brand")
            return {
                ...state,
            }

        // DELETE size
        case types.DELETE_BRAND_SETTING:
            return {
                ...state,
            }

        case types.DELETE_BRAND_SETTING_SUCCESS:
            NotificationManager.success("brand deleted!")
            data = state.brandAll.data.filter(item => item.id !== action.payload.id)
            return {
                ...state,
                brandAll: {
                    loading: false,
                    data: data
                }
            }

        case types.DELETE_BRAND_SETTING_FAILURE:
            NotificationManager.error("error in deleting brand")
            return {
                ...state,
            }


        //GET all UOM
        case types.GET_ALL_UOM_SETTINGS:
            // console.log ("JIJIJIJIJIJIJIJIJIJI")
            return {
                ...state,
            }

        case types.GET_ALL_UOM_SETTINGS_SUCCESS:
            // console.log("HUHUHUHUHUHUHUHU", { data })
            return {
                ...state,
                uomAll: {
                    loading: false,                
                    data: action.payload
                }
            }

        case types.GET_ALL_UOM_SETTINGS_FAILURE:
            return {
                ...state,
            }

        //GET one UOM
        case types.GET_UOM_SETTING: 
            return {
                ...state,
            }
        
        case types.GET_UOM_SETTING_SUCCESS:
            return {
                ...state,
                uom: {
                    loading: false,
                    data: action.payload
                }
            } 

        case types.GET_UOM_SETTING_FAILURE:
            return {
                ...state,
            }

        // POST UOM
        case types.POST_UOM_SETTING:
            return {
                ...state,
            }

        case types.POST_UOM_SETTING_SUCCESS:
            NotificationManager.success("uom succesfully created")
            data = [...state.uomAll.data];
            data.push(action.payload)
            return {
                ...state,
                uomAll: {
                    loading: false,
                    data: data
                }
            }

        case types.POST_UOM_SETTING_FAILURE:
            NotificationManager.error("error in creating uom")
            return {
                ...state,
            }

        // PATCH UOM
        case types.PUT_UOM_SETTING:
            return {
                ...state,
            }
        
        case types.PUT_UOM_SETTING_SUCCESS:
            NotificationManager.success("successfully edited uom")
            data = state.uomAll.data.map(item => item.id === action.payload.id ? action.payload: item )
            return {
                ...state,
                uomAll: {
                    loading: false,
                    data: data
                }
            }

        case types.PUT_UOM_SETTING_FAILURE:
            NotificationManager.error("error in editing uom")
            return {
                ...state,
            }

        // DELETE size
        case types.DELETE_UOM_SETTING:
            return {
                ...state,
            }

        case types.DELETE_UOM_SETTING_SUCCESS:
            NotificationManager.success("uom deleted!")
            data = state.uomAll.data.filter(item => item.id !== action.payload.id)
            return {
                ...state,
                uomAll: {
                    loading: false,
                    data: data
                }
            }

        case types.DELETE_UOM_SETTING_FAILURE:
            NotificationManager.error("error in deleting uom")
            return {
                ...state,
            }


        default:
            return { ...state }
    }
}