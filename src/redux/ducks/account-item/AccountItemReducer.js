import {NotificationManager} from "react-notifications"
import * as types from "./AccountItemTypes";

const INIT_STATE = {
    accountItem: {
        loading: false,
        data: [],
        count: 0,
    },
    accountItemPath: {
        loading: false,
        data: {}
    },
    singleAccountItem: {
        loading: false,
        data:{}
    },
    currencyData: {
        loading: false,
        data:[],
    },
    SavedQuery: {
      saved: false,
      limit: 20,
      skip: 0,
      filter: [],
      filterList: [],
      searchText: ""
    }
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case types.GET_ALL_ACCOUNT_ITEM:
            return {
                ...state,
                accountItem: {
                    ...state.accountItem,
                    loading: true,
                }
            };
        case types.GET_ALL_ACCOUNT_ITEM_FAILURE:
            return {
                ...state,
                accountItem: {
                    ...state.accountItem,
                    loading: false,
                }
            };
        case types.GET_ALL_ACCOUNT_ITEM_SUCCESS:
            console.log(action.payload);
            //NotificationManager.success('Account Item loaded successfully');
            return {
                ...state,
                accountItem: {
                    loading: false,
                    data: action.payload[0],
                    count: action.payload[1]
                }
            };

            case types.GET_CURRENCY_DATA:
                return {
                  ...state,
                  currencyData: {
                    ...state.currencyData,
                    loading: true,
                  },
                }

              case types.GET_CURRENCY_DATA_SUCCESS:
                //NotificationManager.success('Success in Fetching Quotation Details')
                return {
                  ...state,
                  currencyData: {
                    loading: false,
                    data: action.payload.data,
                  },
                }

              case types.GET_CURRENCY_DATA_FAILURE:
                NotificationManager.warning('Error in Fetching Currency Details')
                return {
                  ...state,
                  currencyData: {
                    loading: false,
                  },
                }

        case types.GET_ONE_LINE:
        case types.PATCH_ACCOUNT_ITEM:
        case types.CREATE_ACCOUNT_ITEM:
            return {
                ...state,
                singleAccountItem:{
                    ...state.singleAccountItem,
                    loading:true
                }
            };
        case types.GET_ONE_LINE_SUCCESS:
            return {
                ...state,
                singleAccountItem: {
                    loading: false,
                    data:action.payload
                }
            };
        case types.GET_ONE_LINE_FAILURE:
            NotificationManager.warning('Failed to Account Item');
            return {
                ...state,
                singleAccountItem:{
                    ...state.singleAccountItem,
                    loading:false
                }
            };
           //SAVE PACKING TO DB    
        
        case types.DELETE_ACCOUNT_ITEM:
            return {
                ...state,
                accountItem: {
                    ...state.accountItem,
                    loading:true,
                },                
            };
  case types.CREATE_ACCOUNT_ITEM_SUCCESS:
   NotificationManager.success("Account Item Created!");
              
            return {
                ...state,
                singleAccountItem: {
                    loading: false,
                    data:action.payload
                }
            };
 case types.CREATE_ACCOUNT_ITEM_FAILURE:
    NotificationManager.warning("Failed to crate AccountItem");
           return { ...state }; 
      
        case types.PATCH_ACCOUNT_ITEM_SUCCESS:
            NotificationManager.success("Account Item Successfully Edited");
            return {
                ...state,
                singleAccountItem: {
                    loading: false,
                    data:action.payload
                }
            };
        case types.PATCH_ACCOUNT_ITEM_FAILURE:
            NotificationManager.error("Error in Editing Account Item");
            return {
                ...state,
                singleAccountItem: {
                    ...state.singleAccountItem,
                    loading: false
                }
            };
        

        case types.DELETE_ACCOUNT_ITEM_SUCCESS:
            NotificationManager.success("AccountItem Successfully Deleted")
            console.log(action.payload);
            let filteredItems = state.accountItem.data.filter((e) => e.id != action.payload);
            return {
                ...state,
                accountItem: {
                    loading: false,
                    data: filteredItems,
                    count: state.accountItem.count-1
                }
            };
        case types.DELETE_ACCOUNT_ITEM_FAILURE:
            NotificationManager.error("Error in Deleting AccountItem");
            return {
                ...state,
                accountItem: {
                    ...state.accountItem,
                    loading: false
                }
            };

            case types.GET_SAVED_ACCOUNT_QUERY:
                return {
                  ...state,
                  SavedQuery: {
                    ...state.SavedQuery,
                    ...action.payload
                  }
                }
          
              case types.GET_SAVED_ACCOUNT_QUERY_SUCCESS:
                return {
                  ...state,
                  SavedQuery: {
                    ...state.SavedQuery,
                    ...action.payload
                  }
                }
          
              case types.GET_SAVED_ACCOUNT_QUERY_FAILURE:
                // NotificationManager.warning('Error in fetching QuotationPdfCreate')
                return {
                  ...state,
                  SavedQuery: {
                    ...state.SavedQuery,
                    ...action.payload
                  }
                }

        default:
            return {
                ...state,
            };
    }
}
