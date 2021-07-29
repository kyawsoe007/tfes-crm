import * as types from './discountSettingsTypes';
import { NotificationManager } from 'react-notifications'

const INIT_STATE = {

    discountsAll: {
        loading: false,
        data: []
    },

    discount: {
        loading: false,
        data: {}
    },

    postDiscountBody: {
        loading: false,
        data: {}
    },

    putDiscountBody: {
        loading: false,
        data: {}
    },

    deleteDiscountBody: {
        loading: false,
        data: {}
    }
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        //GET all discounts
        case types.GET_ALL_DISCOUNTS:
            // console.log ("JIJIJIJIJIJIJIJIJIJI")
            return {
                ...state,
                discountsAll: {
                    ...state.discountsAll,
                    loading: true,
                    data: action.payload
                }
            }

        case types.GET_ALL_DISCOUNTS_SUCCESS:
            // console.log("HUHUHUHUHUHUHUHU", { data })
            return {
                ...state,
                discountsAll: {
                    ...state.discountsAll,
                    loading: false,                
                    data: action.payload
                }
            }

        case types.GET_ALL_DISCOUNTS_FAILURE:
            return {
                ...state,
                discountsAll: {
                    ...state.discountsAll,
                    loading: false,                
                    data: action.payload
                }
            }

        //GET one discount 
        case types.GET_DISCOUNT: 
            return {
                ...state,
                discount: {
                    ...state.discount,
                    loading: true,
                    data: action.payload
                }
            }

        case types.GET_DISCOUNT_SUCCESS:
            return {
                ...state,
                discount: {
                    ...state.discount,
                    loading: false,
                    data: action.payload
                }
            } 

        case types.GET_DISCOUNT_FAILURE:
            return {
                ...state,
                discount: {
                    ...state.discount,
                    loading: false,
                    data: action.payload
                }
            }

        // POST discount
        case types.POST_DISCOUNT:
            return {
                ...state,
                postDiscountBody: {
                    ...state.postDiscountBody,
                    loading: true,
                    data: action.payload
                }
            }

        case types.POST_DISCOUNT_SUCCESS:
            NotificationManager.success("discount succesfully created")
            return {
                ...state,
                postDiscountBody: {
                    ...state.postDiscountBody,
                    loading: false,
                    data: action.payload
                }
            }

        case types.POST_DISCOUNT_FAILURE:
            NotificationManager.error("error in creating stock location")
            return {
                ...state,
                postDiscountBody: {
                    ...state.postDiscountBody,
                    loading: false,
                    data: action.payload
                }
            }

        // PUT discount 
        case types.PUT_DISCOUNT:
            return {
                ...state,
                putDiscountBody: {
                    ...state.putDiscountBody,
                    loading: true,
                    data: action.payload
                }
            }

        case types.PUT_DISCOUNT_SUCCESS:
            NotificationManager.success("successfully edited discount")
            return {
                ...state,
                putDiscountBody: {
                    ...state.putDiscountBody,
                    loading: false,
                    data: action.payload
                }
            }

        case types.PUT_DISCOUNT_FAILURE:
            NotificationManager.error("error in editing discount")
            return {
                ...state,
                putDiscountBody: {
                    ...state.putDiscountBody,
                    loading: false,
                    data: action.payload
                }
            }

        // DELETE one discount 
        case types.DELETE_DISCOUNT_FAILURE:
            return {
                ...state,
                deleteDiscountBody: {
                    ...state.deleteDiscountBody,
                    loading: true,
                    data: action.payload
                }
            }

        case types.DELETE_DISCOUNT_SUCCESS:
            NotificationManager.success("discount deleted!")
            return {
                ...state,
                deleteDiscountBody: {
                    ...state.deleteDiscountBody,
                    loading: false,
                    data: action.payload
                }
            }

        case types.DELETE_DISCOUNT_FAILURE:
            NotificationManager.error("error in deleting discount")
            return {
                ...state,
                deleteDiscountBody: {
                    ...state.deleteDiscountBody,
                    loading: false,
                    data: action.payload
                }
            }

        default:
            return { ...state }
    }
} 