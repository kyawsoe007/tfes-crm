import * as types from "./ProducttfesTypes";
import { NotificationManager } from "react-notifications";

const INIT_STATE = {
  Products: {
    loading: false,
    data: [],
  },
  ProductDetails: {
    loading: false,
    data: [],
  },
  ProductFiltered: {
    loading: false,
    data: [],
    count: 0,
    filters: [],
    columns: [],
    orderBy: {}
  },
  SkuProduct: {
    loading: false,
    data: {},
  },
  BomProduct: {
    loading: false,
    data: [],
  },
  LocationDetails: {
    loading: false,
    data: [],
  },
  ProductCsvCreate: {
    loading: false,
    data: {}
  },
  StockAdjustmentDetails: {
    loading: false,
    data: {}
  },
  SavedInventoryQuery: {
    saved: false,
    limit: 20,
    skip: 0,
    filter: [],
    filterList: [],
    searchText: ""
  },
  SavedSKUListQuery: {
    saved: false,
    limit: 20,
    skip: 0,
    filter: [],
    filterList: [],
    searchText: ""
  },
  SavedSKUMainQuery: {
    saved: false,
    limit: 20,
    skip: 0,
    filter: [],
    filterList: [],
    searchText: ""
  },
  SavedStockAdjQuery: {
    saved: false,
    limit: 20,
    skip: 0,
    filter: [],
    filterList: [],
    searchText: ""
  },
  stockMergeData: {
    loading: false,
    data: {}
  }
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case types.GET_PRODUCT:
      return {
        ...state,
        Products: {
          ...state.Products,
          loading: true,
        },
      };

    case types.GET_PRODUCT_SUCCESS:
      const { data } = action.payload;
      return {
        ...state,
        Products: {
          loading: false,
          data: data,
        },
      };

    case types.GET_PRODUCT_FAILURE:
      NotificationManager.warning("Error in fetching Products");
      return {
        ...state,
        Products: {
          loading: false,
          data: { ...state.Products },
        },
      };

    case types.SET_PRODUCT:
      return {
        ...state,
        Products: {
          ...state.Products,
          loading: true,
        },
        SkuProduct: {
          loading: true,
          data: {},
        },
      };

    case types.SET_PRODUCT_SUCCESS:
      NotificationManager.success("Success in Creating SKU Details");
      return {
        ...state,
        Products: {
          ...state.Products,
          loading: false,
          data: [...state.Products.data, action.payload],
        },
        SkuProduct: {
          loading: false,
          data: action.payload,
        },
      };

    case types.SET_PRODUCT_FAILURE:
      NotificationManager.warning("Error in Creating Product");
      return {
        ...state,
        Products: {
          ...state.Products,
          loading: false,
        },
        SkuProduct: {
          ...state.SkuProduct,
          loading: false,
        },
      };
    case types.CREATE_STOCK_MOVE_SKU:
      return {
        ...state,
        SkuProduct: {
          loading: true,
          data: {},
        },
      };
    case types.CREATE_STOCK_MOVE_SKU_SUCCESS:
      NotificationManager.success("Successfully create MoveSku!");
      // const bird = state.find(b => action.data[0].produ === b.name);
      return {
        ...state,
        SkuProduct: {
          loading: false,
          data: action.payload,
        }
      };
    case types.CREATE_STOCK_MOVE_SKU_FAILURE:
      NotificationManager.warning("Failed to create MoveSku");
      return { ...state };

    case types.PATCH_STOCK_MERGE_SKU:
      // return { ...state };

      return {
        ...state,
        stockMergeData: {
          loading: true,
          data: action.payload
        }
      };
    case types.PATCH_STOCK_MERGE_SKU_SUCCESS:
      NotificationManager.success("Successfully merged SKU!");

      return {
        ...state,
        stockMergeData: {
          loading: false,
          data: action.payload
        }
      };
    case types.PATCH_STOCK_MERGE_SKU_FAILURE:
      
      NotificationManager.warning("Failed to merge SKU");
      return { ...state };

    case types.SET_BOM:
      return {
        ...state,
        BomProduct: {
          ...state.BomProduct,
          loading: true,
        }
      };

    case types.SET_BOM_SUCCESS:
      NotificationManager.success("Success in Creating BOM");
      return {
        ...state,
        BomProduct: {
          ...state.BomProduct,
          loading: false,
          data: [...state.BomProduct.data, action.payload],
        }
      };

    case types.SET_BOM_FAILURE:
      NotificationManager.warning("Error in Creating BOM");
      return {
        ...state,
        BomProduct: {
          ...state.BomProduct,
          loading: false,
        }
      };

    case types.GET_PRODUCT_DETAILS:
      return {
        ...state,
        ProductsDetails: {
          ...state.ProductDetails,
          loading: true,
        },
      };

    case types.GET_PRODUCT_DETAILS_SUCCESS:

      return {
        ...state,
        ProductDetails: {
          loading: false,
          data: action.payload.data,
        },
      };

    case types.GET_PRODUCT_DETAILS_FAILURE:
      NotificationManager.warning("Error in Fetching Product Details");
      return {
        ...state,
        Products: {
          loading: false,
        },
      };

    case types.GET_FILTER_PRODUCT:
      return {
        ...state,
        ProductFiltered: {
          ...state.ProductFiltered,
          loading: true,
          filters: action.payload.filter,
          columns: action.payload.columns,
          orderBy: action.payload.orderBy,
        },
      };

    case types.GET_FILTER_PRODUCT_SUCCESS:
      return {
        ...state,
        ProductFiltered: {
          ...state.ProductFiltered,
          loading: false,
          data: action.payload.data[0],
          count: action.payload.data[1],
        },
      };

    case types.GET_FILTER_PRODUCT_FAILURE:
      NotificationManager.warning("Error in Fetching Product Details");
      return {
        ...state,
        ProductFiltered: {
          ...state.ProductFiltered,
          loading: false,
        },
      };
    case types.GET_FILTER_PRODUCT_AND_SINGLE_SKU_RESET:
      return {
        ...state,
        ProductFiltered: {
          loading: false,
          data: [],
          filters: []
        },
        SkuProduct: {
          loading: false,
          data: {},
        },
      };

    case types.GET_FILTER_PRODUCT_DETAILS:
      return {
        ...state,
        Products: {
          loading: true,
        },
      };

    case types.GET_FILTER_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        Products: {
          loading: false,
          data: action.payload.data,
        },
      };

    case types.GET_FILTER_PRODUCT_DETAILS_FAILURE:
      NotificationManager.warning("Error in Fetching Product Details");
      return {
        ...state,
        Products: {
          loading: false,
        },
      };

    // DAVID - GET
    case types.GET_SINGLE_SKU_PRODUCT_REQUEST:
      return {
        ...state,
        SkuProduct: { loading: true },
      };
    case types.GET_SINGLE_SKU_PRODUCT_SUCCESS:
      return {
        ...state,
        SkuProduct: {
          loading: false,
          data: action.payload,
        },
      };
    case types.GET_SINGLE_SKU_PRODUCT_FAILURE:
      return {
        ...state,
        SkuProduct: { loading: false },
      };

    // DAVID - PATCH
    case types.PATCH_SINGLE_SKU_PRODUCT_REQUEST:
      return {
        ...state,
        SkuProduct: { loading: true },
      };
    case types.PATCH_SINGLE_SKU_PRODUCT_SUCCESS:
      NotificationManager.success("SKU Successfully Edited!");
      return {
        ...state,
        SkuProduct: {
          loading: false,
          data: action.payload ? action.payload : [],
        },
      };
    case types.PATCH_SINGLE_SKU_PRODUCT_FAILURE:
      NotificationManager.error("Error in Editing SKU Details");
      return {
        SkuProduct: { loading: false },
      };

    // DELETE PRODUCT
    case types.DELETE_PRODUCT:
      return {
        ...state,
        ProductFiltered: {
          ...state.ProductFiltered,
          loading: true,
        },
      };

    case types.DELETE_PRODUCT_SUCCESS:
      NotificationManager.success("SKU Successfully Deleted!");
      let ProductFiltered = state.ProductFiltered.data.filter((e) => e.id != action.payload);
      return {
        ...state,
        ProductFiltered: {
          ...state.ProductFiltered,
          loading: false,
          data: ProductFiltered,
          count: state.ProductFiltered.count - 1
        },
      };

    case types.DELETE_PRODUCT_FAILURE:
      NotificationManager.error("Error in Deleting SKU Details");
      return {
        ...state,
        ProductFiltered: {
          ...state.ProductFiltered,
          loading: false,
        },
      };

    // IAN DUPLICATE PRODUCT
    case types.SET_DUPLICATE:
      return {
        ...state,
        SkuProduct: {
          ...state.SkuProduct,
          loading: true,
        },
      };
    case types.SET_DUPLICATE_SUCCESS:
      // NotificationManager.success("SKU Duplicate Successfully Saved!");
      return {
        ...state,
        SkuProduct: {
          loading: false,
          data: action.payload,
        },
      };
    case types.SET_DUPLICATE_FAILURE:
      return {
        ...state,
        SkuProduct: { loading: false },
      };

    //CLEAR DUPLICATE
    case types.CLEAR_DUPLICATE:
      return {
        ...state,
        SkuProduct: {
          data: [],
          loading: true,
        },
      };
    case types.CLEAR_DUPLICATE_SUCCESS:
      return {
        SkuProduct: {
          loading: false,
          data: [],
        },
      };
    case types.CLEAR_DUPLICATE_FAILURE:
      return {
        ...state,
        SkuProduct: { data: [], loading: false },
      };

    case types.GET_LOCATION:
      return {
        ...state,
        LocationsDetails: {
          ...state.LocationDetails,
          loading: true,
        },
      };

    case types.GET_LOCATION_SUCCESS:
      return {
        ...state,
        LocationDetails: {
          loading: false,
          data: action.payload.data,
        },
      };

    case types.GET_LOCATION_FAILURE:
      NotificationManager.warning("Error in Fetching Location Details");
      return {
        ...state,
        Products: {
          loading: false,
        },
      };

    case types.PATCH_SINGLE_SKU:
      // console.log('hh')
      return {
        ...state,
        SkuProduct: {
          ...state.SkuProduct,
          loading: true
        },
      };

    case types.PATCH_SINGLE_SKU_SUCCESS:
      NotificationManager.success("Sku Successfully !");
      return {
        ...state,
        SkuProduct: {
          loading: false,
          data: action.payload
        },
      };
    case types.PATCH_SINGLE_SKU_FAILURE:
      // NotificationManager.error("Error in Editing PackingList Qty");
      return {
        ...state,
        SkuProduct: {
          ...state.SkuProduct,
          loading: false
        },
      };

    case types.CSV_CREATE_PRODUCT_SKU:
      return {
        ...state,
        ProductCsvCreate: {
          ...state.ProductCsvCreate,
          loading: true
        }
      }

    case types.CSV_CREATE_PRODUCT_SKU_SUCCESS:
      return {
        ...state,
        ProductCsvCreate: {
          ...state.ProductCsvCreate,
          loading: false
        }
      }

    case types.CSV_CREATE_PRODUCT_SKU_FAILURE:
      return {
        ...state,
        ProductCsvCreate: {
          ...state.ProductCsvCreate,
          loading: false
        }
      }

    case types.POST_ADD_STOCK_CREATE_JOURNAL_ENTRY:
      return {
        ...state,
        StockAdjustmentDetails: {
          ...state.StockAdjustmentDetails,
          loading: true,
          data: action.payload
        }
      }

    case types.POST_ADD_STOCK_CREATE_JOURNAL_ENTRY_SUCCESS:
      NotificationManager.success("Stock Qty Added!");
      return {
        ...state,
        StockAdjustmentDetails: {
          ...state.StockAdjustmentDetails,
          loading: false,
          data: action.payload
        }
      }

    case types.POST_ADD_STOCK_CREATE_JOURNAL_ENTRY_FAILURE:
      return {
        ...state,
        StockAdjustmentDetails: {
          ...state.StockAdjustmentDetails,
          loading: false,
          data: action.payload
        }
      }

    case types.POST_DEDUCT_STOCK_CREATE_JOURNAL_ENTRY:
      return {
        ...state,
        StockAdjustmentDetails: {
          ...state.StockAdjustmentDetails,
          loading: true,
          data: action.payload
        }
      }

    case types.POST_DEDUCT_STOCK_CREATE_JOURNAL_ENTRY_SUCCESS:
      NotificationManager.success("Stock Qty Deducted!");
      return {
        ...state,
        StockAdjustmentDetails: {
          ...state.StockAdjustmentDetails,
          loading: false,
          data: action.payload
        }
      }

    case types.POST_DEDUCT_STOCK_CREATE_JOURNAL_ENTRY_FAILURE:
      return {
        ...state,
        StockAdjustmentDetails: {
          ...state.StockAdjustmentDetails,
          loading: false,
          data: action.payload
        }
      }

    case types.GET_SAVED_INVENTORY_QUERY:
      return {
        ...state,
        SavedInventoryQuery: {
          ...state.SavedInventoryQuery,
          ...action.payload
        }
      }

    case types.GET_SAVED_INVENTORY_QUERY_SUCCESS:
      return {
        ...state,
        SavedInventoryQuery: {
          ...state.SavedInventoryQuery,
          ...action.payload
        }
      }

    case types.GET_SAVED_INVENTORY_QUERY_FAILURE:
      // NotificationManager.warning('Error in fetching QuotationPdfCreate')
      return {
        ...state,
        SavedInventoryQuery: {
          ...state.SavedInventoryQuery,
          ...action.payload
        }
      }

    case types.GET_SAVED_SKU_LIST_QUERY:
      return {
        ...state,
        SavedSKUListQuery: {
          ...state.SavedSKUListQuery,
          ...action.payload
        }
      }

    case types.GET_SAVED_SKU_LIST_QUERY_SUCCESS:
      return {
        ...state,
        SavedSKUListQuery: {
          ...state.SavedSKUListQuery,
          ...action.payload
        }
      }

    case types.GET_SAVED_SKU_LIST_QUERY_FAILURE:
      // NotificationManager.warning('Error in fetching QuotationPdfCreate')
      return {
        ...state,
        SavedSKUListQuery: {
          ...state.SavedSKUListQuery,
          ...action.payload
        }
      }

    case types.GET_SAVED_SKU_MAIN_QUERY:
      return {
        ...state,
        SavedSKUMainQuery: {
          ...state.SavedSKUMainQuery,
          ...action.payload
        }
      }

    case types.GET_SAVED_SKU_MAIN_QUERY_SUCCESS:
      return {
        ...state,
        SavedSKUMainQuery: {
          ...state.SavedSKUMainQuery,
          ...action.payload
        }
      }

    case types.GET_SAVED_SKU_MAIN_QUERY_FAILURE:
      // NotificationManager.warning('Error in fetching QuotationPdfCreate')
      return {
        ...state,
        SavedSKUMainQuery: {
          ...state.SavedSKUMainQuery,
          ...action.payload
        }
      }

    case types.GET_SAVED_STOCK_ADJ_QUERY:
      return {
        ...state,
        SavedStockAdjQuery: {
          ...state.SavedStockAdjQuery,
          ...action.payload
        }
      }

    case types.GET_SAVED_STOCK_ADJ_QUERY_SUCCESS:
      return {
        ...state,
        SavedStockAdjQuery: {
          ...state.SavedStockAdjQuery,
          ...action.payload
        }
      }

    case types.GET_SAVED_STOCK_ADJ_QUERY_FAILURE:
      // NotificationManager.warning('Error in fetching QuotationPdfCreate')
      return {
        ...state,
        SavedStockAdjQuery: {
          ...state.SavedStockAdjQuery,
          ...action.payload
        }
      }

    default:
      return { ...state };
  }
};
