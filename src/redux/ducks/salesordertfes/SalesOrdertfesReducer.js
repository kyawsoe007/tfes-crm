import * as types from "./SalesOrdertfesTypes";
import { NotificationManager } from "react-notifications";

const INIT_STATE = {
  SalesOrders: {
    loading: false,
    data: [],
  },
  SalesOrderDetails: {
    loading: false,
    data: [],
  },
  SalesOrderFiltered: {
    loading: false,
    data: [],
    count: 0,
  },
  SalesOrderProduct: {
    loading: false,
    data: {},
  },
  SalesOrderPdfCreate: {
    loading: false,
    data: {}
  },
  SavedQuery: {
    saved: false,
    limit: 20,
    skip: 0,
    filter: [],
    filterList: [],
    searchText: ""
  },
  SavedAcctSalesQuery: {
    saved: false,
    limit: 20,
    skip: 0,
    filter: [],
    filterList: [],
    searchText: ""
  },
  TempList: {
    loading: false,
    data: []
  }
};

const salesOrderRemap = (payload) => {
  let dt = payload;
  if (dt.salesOrderItems) {
    dt.salesOrderItems = dt.salesOrderItems.map(line => {
      let returnLine = { ...line };
      if (line.BomList) {
        let bomList = line.BomList.map((bomline, index) => {

          return {
            index: index + 1,
            product: bomline.product,
            sku: bomline.sku,
            partNumberOne: bomline.productData.partNumber,
            descriptionTwo: bomline.productData.description,
            grpOne: bomline.productData.grpOne && bomline.productData.grpOne.name,
            grpTwo: bomline.productData.grpTwo && bomline.productData.grpTwo.name,
            size: bomline.productData.size && bomline.productData.size.name,
            selOne: bomline.productData.selOne && bomline.productData.selOne.name,
            selTwo: bomline.productData.selTwo && bomline.productData.selTwo.name,
            brand: bomline.productData.brand && bomline.productData.brand.name,
            supp: bomline.productData.supp1 && bomline.productData.supp1.name,
            uom: bomline.productData.uom && bomline.productData.uom.name,
            unitSgd: bomline.productData.listPrice,
            qtyTwo: bomline.qty
          }
        });
        returnLine.BomList = bomList;
      }
      return returnLine;
    });
  }
  return dt;
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case types.CONVERT_TO_SALES_ORDER_REQUEST:
      return {
        ...state,
        SalesOrderProduct: {
          ...state.SalesOrderProduct,
          loading: true,
        },
      };
    case types.CONVERT_TO_SALES_ORDER_SUCCESS:
      return {
        ...state,
        SalesOrderProduct: {
          loading: false,
          data: action.payload,
        },
      };

    case types.CONVERT_TO_SALES_ORDER_FAILURE:
      return {
        ...state,
        SalesOrderProduct: {
          ...state.SalesOrderProduct,
          loading: false
        },
      };

    case types.GET_SALES_ORDER:
      return {
        ...state,
        SalesOrders: {
          ...state.SalesOrders,
          loading: true,
        },
      };

    case types.GET_SALES_ORDER_SUCCESS:
      return {
        ...state,
        SalesOrders: {
          loading: false,
          data: action.payload,
        },
      };

    case types.GET_SALES_ORDER_FAILURE:
      NotificationManager.warning("Error in fetching SalesOrders");
      NotificationManager.warning("Over here");
      return {
        ...state,
        SalesOrders: {
          loading: false,
          data: { ...state.SalesOrders },
        },
      };

    case types.SET_SALES_ORDER:
      return {
        ...state,
        SalesOrders: { loading: true },
        SalesOrderProduct: {
          loading: true,
          ...state.SalesOrderProduct,
        },
      };

    case types.SET_SALES_ORDER_SUCCESS:
      NotificationManager.success("Success in Creating SalesOrder");
      let dt = salesOrderRemap(action.payload);
      return {
        ...state,
        SalesOrders: {
          ...state.SalesOrders,
          loading: false,
          data: action.payload
        },
        SalesOrderProduct: {
          loading: false,
          data: dt,
        },
      };

    case types.SET_SALES_ORDER_FAILURE:
      NotificationManager.warning("Error in Creating SalesOrder");
      return {
        ...state,
        SalesOrders: {
          ...state.SalesOrders,
          loading: false,
        },
        SalesOrderProduct: {
          ...state.SalesOrderProduct,
          loading: false,
        },
      };

    case types.GET_SALES_ORDER_DETAILS:
      return {
        ...state,
        SalesOrdersDetails: {
          ...state.SalesOrderDetails,
          loading: true,
        },
      };


    case types.GET_SALES_ORDER_DETAILS_SUCCESS:
      // NotificationManager.success("Success in Fetching SalesOrder Details");
      return {
        ...state,
        SalesOrderDetails: {
          loading: false,
          data: action.payload.data,
        },
      };

    case types.GET_SALES_ORDER_DETAILS_FAILURE:
      NotificationManager.warning("Error in Fetching SalesOrder Details");
      return {
        ...state,
        SalesOrders: {
          ...state.SalesOrderProduct,
          loading: false,
        },
      };

    case types.GET_FILTER_SALES_ORDER:
      return {
        ...state,
        SalesOrderFiltered: {
          ...state.SalesOrderFiltered,
          loading: true,
        },
      };

    case types.GET_FILTER_SALES_ORDER_SUCCESS:
      return {
        ...state,
        SalesOrderFiltered: {
          loading: false,
          data: action.payload[0],
          count: action.payload[1],
        },
      };

    case types.GET_FILTER_SALES_ORDER_FAILURE:
      return {
        ...state,
        SalesOrderFiltered: {
          loading: false,
        },
      };
    case types.GET_FILTER_SALES_ORDER_AND_SINGLE_SKU_RESET:
      return {
        ...state,
        SalesOrderFiltered: {
          loading: false,
          data: [],
        },
        SalesOrderProduct: {
          loading: false,
          data: {},
        },
      };

    case types.GET_FILTER_SALES_ORDER_DETAILS:
      return {
        ...state,
        SalesOrders: {
          ...state.SalesOrders,
          loading: true,
        },
      };

    case types.GET_FILTER_SALES_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        SalesOrders: {
          loading: false,
          data: action.payload.data,
        },
      };

    case types.GET_FILTER_SALES_ORDER_DETAILS_FAILURE:
      return {
        ...state,
        SalesOrders: {
          ...state.SalesOrders,
          loading: false,
        },
      };

    // DAVID - GET
    case types.GET_SINGLE_SKU_SALES_ORDER_REQUEST:
      return {
        ...state,
        SalesOrderProduct: {
          ...state.SalesOrderProduct,
          loading: true
        },
      };
    case types.GET_SINGLE_SKU_SALES_ORDER_SUCCESS:
      dt = salesOrderRemap(action.payload);
      return {
        ...state,
        SalesOrderProduct: {
          loading: false,
          data: dt,
        },
      };
    case types.GET_SINGLE_SKU_SALES_ORDER_FAILURE:
      return {
        ...state,
        SalesOrderProduct: {
          ...state.SalesOrderProduct,
          loading: false,
        },
      };

    // DAVID - PATCH
    case types.PATCH_SINGLE_SKU_SALES_ORDER_REQUEST:
      return {
        ...state,
        SalesOrderProduct: {
          ...state.SalesOrderProduct,
          loading: true
        },
      };

    case types.PATCH_SINGLE_SKU_SALES_ORDER_SUCCESS:
      NotificationManager.success("SalesOrder Successfully Edited!");
      dt = salesOrderRemap(action.payload);
      return {
        ...state,
        SalesOrderProduct: {
          loading: false,
          data: dt
        },
      };
    case types.PATCH_SINGLE_SKU_SALES_ORDER_FAILURE:
      NotificationManager.error("Error in Editing SalesOrder Details");
      return {
        ...state,
        SalesOrderProduct: {
          ...state.SalesOrderProduct,
          loading: false
        },
      };

    // DELETE SALES_ORDER
    case types.DELETE_SALES_ORDER:
      return {
        ...state,
        SalesOrderFiltered: {
          ...state.SalesOrderFiltered,
          loading: true,
        },
      };

    case types.DELETE_SALES_ORDER_SUCCESS:
      NotificationManager.success("SKU Successfully Deleted!");
      let SalesOrderFiltered = state.SalesOrderFiltered.data.filter(
        (e) => e.id !== action.payload
      );
      return {
        ...state,
        SalesOrderFiltered: {
          loading: false,
          data: SalesOrderFiltered,
        },
      };

    case types.DELETE_SALES_ORDER_FAILURE:
      NotificationManager.error("Error in Deleting SKU Details");
      return {
        ...state,
        SalesOrderFiltered: {
          ...state.SalesOrderFiltered,
          loading: false,
        },
      };

    // IAN DUPLICATE SALES_ORDER
    case types.SET_DUPLICATE:
      return {
        ...state,
        SalesOrderProduct: {
          ...state.SalesOrderProduct,
          loading: true,
        },
      };
    case types.SET_DUPLICATE_SUCCESS:
      // NotificationManager.success("SKU Duplicate Successfully Saved!");
      return {
        ...state,
        SalesOrderProduct: {
          loading: false,
          data: action.payload,
        },
      };
    case types.SET_DUPLICATE_FAILURE:
      return {
        ...state,
        SalesOrderProduct: {
          ...state.SalesOrderProduct,
          loading: false
        },
      };

    //CLEAR DUPLICATE
    case types.CLEAR_DUPLICATE:
      return {
        ...state,
        SalesOrderProduct: {
          data: [],
          loading: true,
        },
      };
    case types.CLEAR_DUPLICATE_SUCCESS:
      return {
        SalesOrderProduct: {
          loading: false,
          data: [],
        },
      };
    case types.CLEAR_DUPLICATE_FAILURE:
      return {
        ...state,
        SalesOrderProduct: { data: [], loading: false },
      };
    // Set New Version
    case types.SET_NEW_VERSION_SALESORDER_REQUEST:
      return {
        ...state,
        SalesOrderProduct: {
          data: {},
          loading: true,
        },
      }
    case types.SET_NEW_VERSION_SALESORDER_SUCCESS:
      dt = salesOrderRemap(action.payload);
      return {
        ...state,
        SalesOrderProduct: {
          loading: false,
          data: dt
        },
      }
    case types.SET_NEW_VERSION_SALESORDER_FAILURE:
      return {
        ...state,
        SalesOrderProduct: {
          ...state.SalesOrderProduct,
          loading: false,

        },
      }

    // Pdf Create
    case types.PDF_CREATE_SALES_ORDER:
      return {
        ...state,
        loading: true
      }

    case types.PDF_CREATE_SALES_ORDER_SUCCESS:
      return {
        ...state,
        loading: false
      }

    case types.PDF_CREATE_SALES_ORDER_FAILURE:
      return {
        ...state,
        loading: false
      }
    //  Invoice Pdf Create
    case types.GET_SALESORDER_PROFORMA_INVOICE_PDF:  
      console.log("GET_SALESORDER_PROFORMA_INVOICE_PDF in reducer");
      return {
        ...state,
        loading: true
      }

    case types.GET_SALESORDER_PROFORMA_INVOICE_PDF_SUCCESS:
      return {
        ...state,
        loading: false
      }

    case types.GET_SALESORDER_PROFORMA_INVOICE_PDF_FAILURE:
      return {
        ...state,
        loading: false
      }
    case types.GET_SALESORDER_COMMERCIAL_INVOICE_PDF:
      console.log("GET_SALESORDER_COMMERCIAL_INVOICE_PDF in reducer");
      return {
        ...state,
        loading: false
      }

    case types.GET_SALESORDER_COMMERCIAL_INVOICE_PDF_SUCCESS:
      return {
        ...state,
        loading: false
      }


    case types.GET_SALESORDER_COMMERCIAL_INVOICE_PDF_FAILURE:
      return {
        ...state,
        SalesOrderFiltered: {
          ...state.SalesOrderFiltered,
          loading: true
        }
      }

    case types.PATCH_SINGLE_SALES_REQUEST_INTERNAL_REMARKS_SUCCESS:

      let internalRemarks = state.SalesOrderFiltered.data.map(item => item.id === action.payload.id ? action.payload : item);

      NotificationManager.success('Internal Remarks Saved!')
      return {
        ...state, 
        SalesOrderFiltered: {
          ...state.SalesOrderFiltered,
          loading: false,
          data: internalRemarks
        }
      }

    case types.PATCH_SINGLE_SALES_REQUEST_INTERNAL_REMARKS_FAILURE:
      NotificationManager.error('Failed to save internal Remarks')
      return {
        ...state, 
        SalesOrderFiltered: {
          ...state.SalesOrderFiltered,
          loading: false,
        }
      }

    case types.GET_SAVED_SALES_QUERY:
      return {
        ...state,
        SavedQuery: {
          ...state.SavedQuery,
          ...action.payload
        }
      }

    case types.GET_SAVED_SALES_QUERY_SUCCESS:
      return {
        ...state,
        SavedQuery: {
          ...state.SavedQuery,
          ...action.payload
        }
      }

    case types.GET_SAVED_SALES_QUERY_FAILURE:
      return {
        ...state,
        SavedQuery: {
          ...state.SavedQuery,
          ...action.payload
        }
      } 
    
      case types.GET_SAVED_ACCT_SALES_QUERY:
      return {
        ...state,
        SavedAcctSalesQuery: {
          ...state.SavedAcctSalesQuery,
          ...action.payload
        }
      }

    case types.GET_SAVED_ACCT_SALES_QUERY_SUCCESS:
      return {
        ...state,
        SavedAcctSalesQuery: {
          ...state.SavedAcctSalesQuery,
          ...action.payload
        }
      }

    case types.GET_SAVED_ACCT_SALES_QUERY_FAILURE:
      return {
        ...state,
        SavedAcctSalesQuery: {
          ...state.SavedAcctSalesQuery,
          ...action.payload
        }
      } 

    case types.GET_PURCHASE_TEMP_LIST:
      return {
        ...state,
        TempList: {
          ...state.TempList,
          loading: true
        }
      }

    case types.GET_PURCHASE_TEMP_LIST_SUCCESS:
      return {
        ...state,
        TempList: {
          ...state.TempList,
          data: action.payload,
          loading: false
        }
      }

    case types.GET_PURCHASE_TEMP_LIST_FAILURE:
      return {
        ...state,
        TempList: {
          ...state.TempList,
          data: [],
          loading: false
        }
      }

    case types.POST_PURCHASE_TEMP_LIST:
      return {
        ...state,
        TempList: {
          ...state.TempList,
          loading: true,
        }
      }

    case types.POST_PURCHASE_TEMP_LIST_SUCCESS:
      NotificationManager.success('temp list posted')
      return {
        ...state,
        TempList: {
          ...state.TempList,
          data: action.payload,
          loading: false
        }
      }

    case types.POST_PURCHASE_TEMP_LIST_FAILURE:
      NotificationManager.error('fail to save temp list')
      return {
        ...state,
        TempList: {
          ...state.TempList,
          loading: false
        }
      }

    default:
      return { ...state };
  }
};
