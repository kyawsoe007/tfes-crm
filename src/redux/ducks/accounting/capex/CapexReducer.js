import * as types from './CapexTypes';
import { NotificationManager } from 'react-notifications'


const INIT_STATE = {

    capexsAll: {
        loading: false,
        data: []
    },

    capex: {
        loading: false,
        data: {}
    },

    postcapexBody: {
        loading: false,
        data: {}
    },

    patchcapexBody: {
        loading: false,
        data: {}
    },

    deletecapexBody: {
        loading: false,
        data: {}
    }
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        //GET all Capexs 
        case types.GET_ALL_CAPEXS:
            // console.log ("JIJIJIJIJIJIJIJIJIJI")
            return {
                ...state,
                capexsAll: {
                    ...state.capexsAll,
                    loading: true
                }
            }

        case types.GET_ALL_CAPEXS_SUCCESS:
            // console.log("HUHUHUHUHUHUHUHU", { data })
            return {
                ...state,
                capexsAll: {
                    ...state.capexsAll,
                    loading: false,                
                    data: action.payload
                }
            }

        case types.GET_ALL_CAPEXS_FAILURE:
            return {
                ...state,
                capexsAll: {
                    ...state.capexsAll,
                    loading: false
                }
            }

        //GET one Capex 
        case types.GET_CAPEX: 
            return {
                ...state,
                capex: {
                    ...state.capex,
                    loading: true
                }
            }
        
        case types.GET_CAPEX_SUCCESS:
            return {
                ...state,
                capex: {
                    loading: false,
                    data: action.payload
                }
            } 

        case types.GET_CAPEX_FAILURE:
            return {
                ...state,
                capex: {
                    ...state.capex,
                    loading: false,
                }
            }

        // POST Capex 
        case types.POST_CAPEX:
        case types.PATCH_CAPEX:
        case types.DELETE_CAPEX:
            return {
                ...state,
                
            }

        case types.POST_CAPEX_SUCCESS:
            NotificationManager.success("Capex succesfully created")
            //insert term into table
            let data = [...state.capexsAll.data];
            data.push(action.payload);
            return {
                ...state,
                capexsAll: {
                    loading:false,
                    data: data
                },
                capex: {
                    loading: false,
                    data: action.payload
                }
            }

        case types.POST_CAPEX_FAILURE:
            NotificationManager.error("error in creating Capex")
            return {
                ...state,                
            }


        case types.PATCH_CAPEX_SUCCESS:
            NotificationManager.success("successfully edited Capex")
            data = state.capexsAll.data.map(item => item.id === action.payload.id ? action.payload : item);
            console.log(action.payload);
            return {
                ...state,
                capexsAll: {
                    loading: false,
                    data: data
                },
                capex: {
                    loading: false,
                    data: action.payload
                }
            }

        case types.PATCH_CAPEX_FAILURE:
            NotificationManager.error("error in editing Capex")
            return {
                ...state
            }


        case types.DELETE_CAPEX_SUCCESS:
            NotificationManager.success("Capex deleted!")
            data = state.capexsAll.data.filter(item => item.id !== action.payload.id);

            return {
                ...state,
                capexsAll: {
                    loading: false,
                    data: data
                }
            }

        case types.DELETE_CAPEX_FAILURE:
            NotificationManager.error("error in deleting Capex")
            return {
                ...state
            }

        default:
            return { ...state }
    }
}