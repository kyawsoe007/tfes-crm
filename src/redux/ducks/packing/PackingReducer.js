import { NotificationManager } from "react-notifications";
import * as types from "./PackingTypes";

const INIT_STATE = {
    packingList: {
      loading: false,
      tableData: [],
      totalCount: 0,
    },
    filteredPackingList: {
      loading: false,
      tableData: [],
      totalCount: 0,
    },
    packingMoveLines: {
      loading: false,
      tableData: [],
      totalCount: 0,
  },
  packingListProduct: {
    loading: false,
    data:{},
  },
  packingOrderPdfCreate:{
    loading:false,
    data:{}
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
    case types.GET_ALL_PACKING:
      return {
        ...state,
        packingList: {
          ...state.packingList,
          loading: true,
        }
      };
    case types.GET_ALL_PACKING_FAILURE:
      return {
        ...state,
        packingList: {
          ...state.packingList,
          loading: false,
        }
      };
    case types.GET_ALL_PACKING_SUCCESS:
      // NotificationManager.success('Packing loaded successfully!');
      return {
        ...state,
        packingList: {
        loading: false,
          tableData: action.payload,
        }
            };
        
    //FILTER PACKING
    case types.GET_FILTER_PACKING:
        return {
          ...state,
          filteredPackingList: {
            ...state.filteredPackingList,
            loading: true,
          }
        };
    case types.GET_FILTER_PACKING_SUCCESS:
        return {
          ...state,
          filteredPackingList: {
            ...state.filteredPackingList,
            tableData: action.payload[0],
            totalCount: action.payload[1],
            loading: false,
          }
        };
   case types.GET_FILTER_PACKING_FAILURE:
    // NotificationManager.warning("Failed to load Packing Data");
        return {
          ...state,
          filteredPackingList: {
            ...state.filteredPackingList,
            loading: false,
          }
            };
        
   //MOVE PACKING ITEM
   case types.GET_PACKING_MOVE_LINE:
    return {
      ...state,
      packingMoveLines: {
        ...state.packingMoveLines,
        loading: true
      }
    };
    case types.GET_PACKING_MOVE_LINE_SUCCESS:
    return {
      ...state,
      packingMoveLines: {
        ...state.packingMoveLines,
        tableData: action.payload,
        totalCount: action.payload.length,
        loading: false
      }
    };
  case types.GET_PACKING_MOVE_LINE_FAILURE:
    // NotificationManager.warning("Failed to load Move Lines");
    return {
      ...state,
      packingMoveLines: {
        ...state.packingMoveLines,
        loading: false
      }
            }; 
        
    //SAVE PACKING TO DB    
   case types.SAVE_PACKING_FORM:
     return {  ...state };
   case types.SAVE_PACKING_FORM_SUCCESS:
    NotificationManager.success("Successfully created!");
     return { ...state };
  case types.SAVE_PACKING_FORM_FAILURE:
    // NotificationManager.warning("Failed to update moves");
            return { ...state }; 
        
   // FILTER MOVE ITEM
   case types.GET_FILTER_MOVES:
    return {
      ...state,
      packingMoveLines: {
        ...state.packingMoveLines,
        loading: true
      }
    };
  case types.GET_FILTER_MOVES_SUCCESS:
    return {
      ...state,
      packingMoveLines: {
        ...state.packingMoveLines,
        tableData: action.payload,
        totalCount: action.payload.length,
        loading: false
      }
    };
  case types.GET_FILTER_MOVES_FAILURE:
    return {
      ...state,
      packingMoveLines: {
        ...state.packingMoveLines,
        loading: false
      }
      }; 
    
      case types.PATCH_SINGLE_SKU_PACKING_ORDER_REQUEST:
        return {
          ...state,
          packingListProduct: {
            ...state.packingListProduct,
            loading: true
          },
        };
  
      case types.PATCH_SINGLE_SKU_PACKING_ORDER_SUCCESS:
        NotificationManager.success("PackingList Successfully Edited!");
      return {
          ...state,
          packingListProduct: {
            loading: false,
            data: action.payload
          },
        };
      case types.PATCH_SINGLE_SKU_PACKING_ORDER_FAILURE:
        // NotificationManager.error("Error in Editing PackingList Details");
        return {
          ...state,
          packingListProduct: {
            ...state.packingListProduct,
            loading: false
          },
      };
    
    case types.PATCH_SINGLE_QTY_PACKING:
      // console.log('hh')
        return {
          ...state,
          packingListProduct: {
            ...state.packingListProduct,
            loading: true
          },
        };
  
      case types.PATCH_SINGLE_QTY_PACKING_SUCCESS:
        NotificationManager.success("PackingList Successfully Qty!");
      return {
          ...state,
          packingListProduct: {
            loading: false,
            data: action.payload
          },
        };
      case types.PATCH_SINGLE_QTY_PACKING_FAILURE:
        // NotificationManager.error("Error in Editing PackingList Qty");
        return {
          ...state,
          packingListProduct: {
            ...state.packingListProduct,
            loading: false
          },
      };
    
    //Container
      case types.PATCH_CONTAINER_PACKING_ORDER:
          return {
            ...state,
            packingListProduct: {
              ...state.packingListProduct,
              loading: true
            },
          };
    
        case types.PATCH_CONTAINER_PACKING_ORDER_SUCCESS:
          NotificationManager.success("PackingList Successfully Container!");
        return {
            ...state,
            packingListProduct: {
              loading: false,
              data: action.payload
            },
          };
        case types.PATCH_CONTAINER_PACKING_ORDER_FAILURE:
          // NotificationManager.error("Error in Editing PackingList Container");
          return {
            ...state,
            packingListProduct: {
              ...state.packingListProduct,
              loading: false
            },
          };
  
      // DELETE SALES_ORDER
      case types.DELETE_PACKING_ORDER:
        return {
          ...state,
          filteredPackingList: {
            ...state.filteredPackingList,
            loading: true,
          },
        };
  
      case types.DELETE_PACKING_ORDER_SUCCESS:
        NotificationManager.success("SKU Successfully Deleted!");
        let filteredPackingList = state.filteredPackingList.data.filter(
          (e) => e.id !== action.payload
        );
        return {
          ...state,
          filteredPackingList: {
            loading: false,
            data: filteredPackingList,
          },
        };
  
      case types.DELETE_PACKING_ORDER_FAILURE:
        // NotificationManager.error("Error in Deleting SKU Details");
        return {
          ...state,
          filteredPackingList: {
            ...state.filteredPackingList,
            loading: false,
          },
        };
        
      // Pdf Create
      case types.PDF_CREATE_PACKING_ORDER:
        return {
          ...state,
          loading:true
        }

      case types.PDF_CREATE_PACKING_ORDER_SUCCESS:
        return {
          ...state,
          loading:false
        }

      case types.PDF_CREATE_PACKING_ORDER_FAILURE:
        NotificationManager.warning('Error in fetching packingOrderPdfCreate')
        return {
          ...state,
          loading:false
        } 
        case types.GET_CREATE_COMMERCIAL_INVOICE_PDF:
          return {
            ...state,
          loading:false
          }
        case types.GET_CREATE_COMMERCIAL_INVOICE_PDF_SUCCESS:
          return {
            ...state,
            loading:false
          };
    
        case types.GET_CREATE_COMMERCIAL_INVOICE_PDF_FAILURE:
          return {
            ...state,
            loading:false
          };  

          case types.GET_SAVED_PACKING_QUERY:
            return {
              ...state,
              SavedQuery: {
                ...state.SavedQuery,
                ...action.payload
              }
            }
      
          case types.GET_SAVED_PACKING_QUERY_SUCCESS:
            return {
              ...state,
              SavedQuery: {
                ...state.SavedQuery,
                ...action.payload
              }
            }
      
          case types.GET_SAVED_PACKING_QUERY_FAILURE:
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
            }
    }
}