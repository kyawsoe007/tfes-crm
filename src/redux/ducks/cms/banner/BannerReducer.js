import { NotificationManager } from "react-notifications";
import * as types from "./BannerTypes";

const INIT_STATE = {
    bannerList: {
        loading: false,
        action: false,
        tableData: [],
        totalCount: 0
    },
    bannerToView: {
        loading: false,
        banner: {
            images:[]
        },
        sectionLoading: false
    },
    bannerForm: {
        loading: false,        
    }
}

export default (state = INIT_STATE, action) => {
    switch(action.type){
        case types.GET_ALL_BANNER:            
            return {
                ...state,
                bannerList: { ...state.bannerList, loading: true }
            }
        case types.GET_SINGLE_BANNER_FAILURE:
        case types.GET_ALL_BANNER_FAILURE:
            NotificationManager.warning("Error in fetching Banner data");
            return {
                ...state,
                bannerToView: INIT_STATE.bannerToView,
                bannerList: INIT_STATE.bannerList
            }
        case types.GET_ALL_BANNER_SUCCESS:
            let totalCount = action.payload.length;            
            return {
                ...state,
                bannerList: {
                    ...state.bannerList,
                    loading: false,
                    tableData: action.payload,
                    totalCount: totalCount
                }
            }
        case types.GET_SINGLE_BANNER:
            return {
                ...state,
                bannerToView: { ...state.bannerToView, loading: true}
            }
        case types.GET_SINGLE_BANNER_SUCCESS:
            return {
                ...state,
                bannerToView: {
                    ...state.bannerToView,
                    loading:false,
                    banner: action.payload
                }
            }
        case types.EDIT_BANNER:
        case types.NEW_BANNER:
            return {
                ...state,
                bannerForm: { ...state.bannerForm, loading: true}            
            }
        case types.NEW_BANNER_FAILURE:
            NotificationManager.warning("Error in creating Banner");
            return {
                bannerForm: { ...state.bannerForm, loading: false}
            }
        case types.NEW_BANNER_SUCCESS:
            NotificationManager.success("Banner created");
            return {
                ...state,
                bannerForm: { ...INIT_STATE.bannerForm }
            }
        case types.EDIT_BANNER_FAILURE:
            NotificationManager.error("Error in Edit");
            return {
                ...state,
                bannerForm: { ...state.bannerForm, loading: false } 
            }
        case types.EDIT_BANNER_SUCCESS:
            NotificationManager.success("Banner edited!");
            return {
                ...state,
                bannerForm: { ...state.bannerForm, loading: false }
            }
        case types.DELETE_BANNER:
            return {
                ...state,
                bannerToView: { ...state.bannerToView, loading: true},
                bannerList: { ...state.bannerList, loading: true }
            }
        case types.DELETE_BANNER_FAILURE:
            NotificationManager.warning("Error in deleting banner");
            return {
                ...state,
                bannerToView: { ...state.bannerToView, loading: false },
                bannerList: { ...state.bannerList, loading: false }
            }
        case types.DELETE_BANNER_SUCCESS:
            NotificationManager.success("Banner Deleted");
            var afterDeleteData = Object.assign([], state.bannerList.tableData)
            .filter(banner => banner.id != action.payload )
            return {
                ...state,
                bannerToView: { ...state.bannerToView, loading: false },
                bannerList: { 
                    ...state.bannerList,
                    loading: false,
                    tableData: afterDeleteData
                }
            }
        default:
            return { ...state };
    }
}