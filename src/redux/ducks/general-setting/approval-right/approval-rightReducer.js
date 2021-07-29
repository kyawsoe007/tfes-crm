import * as types from './approval-rightTypes';
import { NotificationManager } from 'react-notifications'


const INIT_STATE = {

    approvalRightsAll: {
        loading: false,
        data: []
    },

    approvalRight: {
        loading: false,
        data: {}
    },

    postPaymentTermBody: {
        loading: false,
        data: {}
    },

    patchPaymentTermBody: {
        loading: false,
        data: {}
    },

    deletePaymentTermBody: {
        loading: false,
        data: {}
    }
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        //GET all Approval Rights 
        case types.GET_ALL_APPROVAL_RIGHTS:
            // console.log ("JIJIJIJIJIJIJIJIJIJI")
            return {
                ...state,
                approvalRightsAll: {
                    ...state.approvalRightsAll,
                    loading: true
                }
            }

        case types.GET_ALL_APPROVAL_RIGHTS_SUCCESS:
            // console.log("HUHUHUHUHUHUHUHU", { data })
            return {
                ...state,
                approvalRightsAll: {
                    ...state.approvalRightsAll,
                    loading: false,                
                    data: action.payload
                }
            }

        case types.GET_ALL_APPROVAL_RIGHTS_FAILURE:
            return {
                ...state,
                approvalRightsAll: {
                    ...state.approvalRightsAll,
                    loading: false
                }
            }
        
            case types.GET_ALL_DELIVERY_APPROVAL_RIGHTS:
                // console.log ("JIJIJIJIJIJIJIJIJIJI")
                return {
                    ...state,
                    approvalRightsAll: {
                        ...state.approvalRightsAll,
                        loading: true
                    }
                }
    
            case types.GET_ALL_DELIVERY_APPROVAL_RIGHTS_SUCCESS:
                // console.log("HUHUHUHUHUHUHUHU", { data })
                return {
                    ...state,
                    approvalRightsAll: {
                        ...state.approvalRightsAll,
                        loading: false,                
                        data: action.payload
                    }
                }
    
            case types.GET_ALL_DELIVERY_APPROVAL_RIGHTS_FAILURE:
                return {
                    ...state,
                    approvalRightsAll: {
                        ...state.approvalRightsAll,
                        loading: false
                    }
                }

        //GET one Approval Right 
        case types.GET_APPROVAL_RIGHT: 
            return {
                ...state,
                approvalRight: {
                    ...state.approvalRight,
                    loading: true
                }
            }
        
        case types.GET_APPROVAL_RIGHT_SUCCESS:
            return {
                ...state,
                approvalRight: {
                    ...state.approvalRight,
                    loading: false,
                    data: action.payload
                }
            } 

        case types.GET_APPROVAL_RIGHT_FAILURE:
            return {
                ...state,
                approvalRight: {
                    ...state.approvalRight,
                    loading: false,
                    data: action.payload
                }
            }

        // POST Approval Right 
        case types.POST_APPROVAL_RIGHT:
        case types.PATCH_APPROVAL_RIGHT:
        case types.DELETE_APPROVAL_RIGHT:
            return {
                ...state,
                
            }

        case types.POST_APPROVAL_RIGHT_SUCCESS:
            NotificationManager.success("Approval Right succesfully created")
            //insert term into table
            let data = [...state.approvalRightsAll.data];
            data.push(action.payload);
            return {
                ...state,
                approvalRightsAll: {
                    loading:false,
                    data: data
                }
            }

        case types.POST_APPROVAL_RIGHT_FAILURE:
            NotificationManager.error("error in creating Approval Right")
            return {
                ...state,                
            }


        case types.PATCH_APPROVAL_RIGHT_SUCCESS:
            NotificationManager.success("successfully edited Approval Right")
            data = state.approvalRightsAll.data.map(item => item.id === action.payload.id ? action.payload : item);
            console.log(action.payload);
            return {
                ...state,
                approvalRightsAll: {
                    loading: false,
                    data: data
                }
            }

        case types.PATCH_APPROVAL_RIGHT_FAILURE:
            NotificationManager.error("error in editing Approval Right")
            return {
                ...state
            }


        case types.DELETE_APPROVAL_RIGHT_SUCCESS:
            NotificationManager.success("Approval Right deleted!")
            data = state.approvalRightsAll.data.filter(item => item.id !== action.payload.id);

            return {
                ...state,
                approvalRightsAll: {
                    loading: false,
                    data: data
                }
            }

        case types.DELETE_APPROVAL_RIGHT_FAILURE:
            NotificationManager.error("error in deleting Approval Right")
            return {
                ...state
            }

        default:
            return { ...state }
    }
}