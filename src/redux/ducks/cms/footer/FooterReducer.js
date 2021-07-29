import { NotificationManager } from "react-notifications";
import * as types from "./FooterTypes";

const INIT_STATE = {
    sectionList: {
        loading: false,
        tableData: [],
        totalCount: 0
    },
    sectionForm: {
        loading: false,
    },
    carForm: {
        loading: false,
    }
}

export default (state = INIT_STATE, action) => {
    // console.log(action)
    switch (action.type) {
        case types.GET_ALL_FOOTER:
            return {
                ...state,
                sectionList: { ...state.sectionList, loading: true }
            }

        case types.GET_ALL_FOOTER_FAILURE:
        case types.GET_FOOTER_CHILDREN_FAILURE:
            NotificationManager.warning("Error in fetching Footer car data");
            return {
                ...state,
                sectionForm: INIT_STATE.sectionForm,
                carForm: INIT_STATE.carForm,
                sectionList: {
                    ...state.sectionList,
                    loading: false
                }
            }
        case types.GET_ALL_FOOTER_SUCCESS:
            return {
                ...state,
                sectionList: {
                    ...state.sectionList,
                    loading: false,
                    tableData: action.payload
                }
            }
        case types.GET_FOOTER_CHILDREN:

            let tableData = [...state.sectionList.tableData];

            console.log(action.payload);
            for (let i = 0; i < tableData.length; i++) {
                if (tableData[i].id == action.payload) {
                    tableData[i].expanded = true;

                }
                else {
                    tableData[i].expanded = false;
                }
            }
            return {
                ...state,
                sectionList: {
                    loading: true,
                    tableData: tableData
                }
            }
        case types.NEW_FOOTER_SECTION:
        case types.EDIT_FOOTER_SECTION:
            return {
                ...state,
                sectionForm: { ...state.sectionForm, loading: true }
            }
        case types.NEW_FOOTER_CAR:
        case types.EDIT_FOOTER_CAR:
            return {
                ...state,
                carForm: { ...state.carForm, loading: true }
            }
        case types.GET_FOOTER_CHILDREN_SUCCESS:
            tableData = [...state.sectionList.tableData];
            if (action.payload && action.payload.length > 0) {
                console.log(action.payload);
                for (let i = 0; i < tableData.length; i++) {
                    if (tableData[i].id == action.payload[0].sectionId) {
                        tableData[i].cars = action.payload;

                    }
                }
            }

            return {
                ...state,
                sectionList: {
                    loading: false,
                    tableData: tableData
                }
            }
        case types.NEW_FOOTER_CAR_SUCCESS:
        case types.EDIT_FOOTER_CAR_SUCCESS:
            if (action.type == types.NEW_FOOTER_CAR_SUCCESS) {
                NotificationManager.success("FOOTER car created");
            }
            else if (action.type == types.EDIT_FOOTER_CAR_SUCCESS) {
                NotificationManager.success("FOOTER car edited");
            }
            //get car info to tabledata
            tableData = [...state.sectionList.tableData];
            for (let i = 0; i < tableData.length; i++) {
                if (tableData[i].id == action.payload.sectionId) {
                    let added = false;
                    if (tableData[i].cars === undefined) {
                        tableData[i].cars = [];
                    }
                    for (let j = 0; j < tableData[i].cars.length; j++) {
                        if (tableData[i].cars[j].id == action.payload.id) {
                            tableData[i].cars[j] = action.payload;
                            added = true;
                        }
                    }
                    if (!added) {
                        tableData[i].cars.push(action.payload);
                    }
                }
            }
            return {
                ...state,
                sectionList: {
                    loading: false,
                    tableData: tableData
                },
                sectionForm: {
                    loading: false
                },
                carForm: {
                    loading: false
                }
            }
        case types.NEW_FOOTER_SECTION_SUCCESS:
            NotificationManager.success("FOOTER section created");
            return {
                ...state,
                sectionList: {
                    loading: false,
                    tableData: action.payload
                },
                sectionForm: {
                    loading: false
                }
            }
        case types.NEW_FOOTER_SECTION_FAILURE:
            NotificationManager.error("Error creating new section");
            return {
                ...state,
                sectionForm: {
                    ...state.sectionForm,
                    loading: false
                }
            }

        case types.NEW_FOOTER_CAR_FAILURE:
            NotificationManager.error("Error creating new car");
            return {
                ...state,
                carForm: {
                    ...state.carForm,
                    loading: false
                }
            }
        case types.EDIT_FOOTER_SECTION_SUCCESS:
            NotificationManager.success("Edit section success");
            return {
                ...state,
                sectionList: {
                    loading: false,
                    tableData: action.payload
                }
            }
        case types.DELETE_FOOTER_SECTION:
            return {
                ...state,
                sectionList: {
                    ...state.sectionList,
                    loading: true
                }
            }
        case types.DELETE_FOOTER_SECTION_FAILURE:
            NotificationManager.error("Error deleting section");
            return {
                ...state,
                sectionList: {
                    ...state.sectionList,
                    loading: false
                }
            }

        case types.DELETE_FOOTER_SECTION_SUCCESS:
            NotificationManager.success("Section Deleted");
            var afterDeleteData = Object.assign([], state.sectionList.tableData)
                .filter(banner => banner.id != action.payload)
            return {
                ...state,
                sectionList: {
                    loading: false,
                    tableData: afterDeleteData
                }
            }
        case types.DELETE_FOOTER_CAR_FAILURE:
            NotificationManager.error("Error deleting car");
            return {
                ...state,
                sectionList: {
                    ...state.sectionList,
                    loading: false
                }
            }

        case types.DELETE_FOOTER_CAR_SUCCESS:
            NotificationManager.success("Car Deleted");
            tableData = [...state.sectionList.tableData];
            for (let i = 0; i < tableData.length; i++) {
                let cars = [];
                if (tableData[i].cars == undefined) {
                    tableData[i].cars = [];
                }
                for (let j = 0; j < tableData[i].cars.length; j++) {
                    if (tableData[i].cars[j].id != action.payload) {
                        cars.push(tableData[i].cars[j]);
                    }
                }
                tableData[i].cars = cars;

            }
            return {
                ...state,
                sectionList: {
                    loading: true,
                    tableData: tableData
                }
            }
        default:
            return { ...state }
    }

}