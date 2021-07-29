import * as types from './fiscalYearTypes';
import { NotificationManager } from 'react-notifications'


const INIT_STATE = {

    fiscalYearsAll: {
        loading: false,
        data: []
    },
    fiscalYearsByMonthlyAll: {
        loading: false,
        data: []
    },

    fiscalYear: {
        loading: false,
        data: {}
    },
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        //GET all FiscalYear 
        case types.GET_ALL_FISCAL_YEARS:
            // console.log ("JIJIJIJIJIJIJIJIJIJI")
            return {
                ...state,
                fiscalYearsAll: {
                    ...state.fiscalYearsAll,
                    loading: true
                }
            }

        case types.GET_ALL_FISCAL_YEARS_SUCCESS:
            // console.log("HUHUHUHUHUHUHUHU", { data })
            return {
                ...state,
                fiscalYearsAll: {
                    ...state.fiscalYearsAll,
                    loading: false,                
                    data: action.payload
                }
            }

        case types.GET_ALL_FISCAL_YEARS_FAILURE:
            return {
                ...state,
                fiscalYearsAll: {
                    ...state.fiscalYearsAll,
                    loading: false
                }
            }

            case types.GET_FISCAL_PERIOD_BY_MONTH:
                // console.log ("JIJIJIJIJIJIJIJIJIJI")
                return {
                    ...state,
                    fiscalYearsAll: {
                        ...state.fiscalYearsAll,
                        loading: true
                    }
                }
    
            case types.GET_FISCAL_PERIOD_BY_MONTH_SUCCESS:
                // console.log("HUHUHUHUHUHUHUHU", { data })
                return {
                    ...state,
                    fiscalYearsAll: {
                        ...state.fiscalYearsAll,
                        loading: false,                
                        data: action.payload
                    }
                }
    
            case types.GET_FISCAL_PERIOD_BY_MONTH_FAILURE:
                return {
                    ...state,
                    fiscalYearsAll: {
                        ...state.fiscalYearsAll,
                        loading: false
                    }
                }

            case types.GET_ALL_FISCAL_PERIODS:
                // console.log ("JIJIJIJIJIJIJIJIJIJI")
                return {
                    ...state,
                    fiscalYearsByMonthlyAll: {
                        ...state.fiscalYearsByMonthlyAll,
                        loading: true
                    }
                }
    
            case types.GET_ALL_FISCAL_PERIODS_SUCCESS:
                // console.log("HUHUHUHUHUHUHUHU", { data })
                return {
                    ...state,
                    fiscalYearsByMonthlyAll: {
                        ...state.fiscalYearsByMonthlyAll,
                        loading: false,                
                        data: action.payload
                    }
                }
    
            case types.GET_ALL_FISCAL_PERIODS_FAILURE:
                return {
                    ...state,
                    fiscalYearsByMonthlyAll: {
                        ...state.fiscalYearsByMonthlyAll,
                        loading: false
                    }
                }
            

        //GET one fiscalYear 
        case types.GET_FISCAL_YEAR: 
            return {
                ...state,
                fiscalYear: {
                    ...state.fiscalYear,
                    loading: true
                }
            }
        
        case types.GET_FISCAL_YEAR_SUCCESS:
            return {
                ...state,
                fiscalYear: {
                    ...state.fiscalYear,
                    loading: false,
                    data: action.payload
                }
            } 

        case types.GET_FISCAL_YEAR_FAILURE:
            return {
                ...state,
                fiscalYear: {
                    ...state.fiscalYear,
                    loading: false,
                }
            }

        // POST fiscalYear 
        case types.POST_FISCAL_YEAR: 
        case types.PATCH_FISCAL_YEAR:
        case types.DELETE_FISCAL_YEAR:
        case types.GET_ALL_FISCAL_YEARS_BY_MONTHLY:    
            return {
                ...state,
                
            }

        case types.POST_FISCAL_YEAR_SUCCESS:
            NotificationManager.success("fiscalYear succesfully created")
            //insert term into table
            let data = [...state.fiscalYearsAll.data];
            data.push(action.payload);
            console.log('data',data)
            return {
                ...state,
                fiscalYearsAll: {
                    loading:false,
                    data: data
                }
            }

        case types.POST_FISCAL_YEAR_FAILURE:
            NotificationManager.error("error in creating fiscalYear")
            return {
                ...state,                
            }
        
            case types.GET_ALL_FISCAL_YEARS_BY_MONTHLY_SUCCESS:
                NotificationManager.success("fiscalYear succesfully created monthly")
                return {
                    ...state,
                    fiscalYearsByMonthlyAll: {
                        loading:false,
                        data: action.payload
                    }
                }
    
            case types.GET_ALL_FISCAL_YEARS_BY_MONTHLY_FAILURE:
                NotificationManager.error("error in creating fiscalYear")
                return {
                    ...state,                
                }    
           

        case types.PATCH_FISCAL_YEAR_SUCCESS:
            NotificationManager.success("successfully edited fiscalYear")
            data = state.fiscalYearsAll.data.map(item => item.id === action.payload.id ? action.payload : item);
            console.log('pa',action.payload);
            return {
                ...state,
                fiscalYearsAll: {
                    loading: false,
                    data: data
                }
            }

        case types.PATCH_FISCAL_YEAR_FAILURE:
            NotificationManager.error("error in editing fiscalYear")
            return {
                ...state
            }


        case types.DELETE_FISCAL_YEAR_SUCCESS:
            NotificationManager.success("fiscalYear deleted!")
            data = state.fiscalYearsAll.data.filter(item => item.id !== action.payload.id);

            return {
                ...state,
                fiscalYearsAll: {
                    loading: false,
                    data: data
                }
            }

        case types.DELETE_FISCAL_YEAR_FAILURE:
            NotificationManager.error("error in deleting fiscalYear")
            return {
                ...state
            }

        default:
            return { ...state }
    }
}