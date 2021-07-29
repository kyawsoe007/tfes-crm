import * as types from "./SupplierInvoiceTypes";
import { NotificationManager } from "react-notifications";

const INIT_STATE = {
  SupplierInvoices: {
    loading: false,
    data: [],
  },
  SupplierInvoiceDetails: {
    loading: false,
    data: [],
  },
  SupplierInvoiceFiltered: {
    loading: false,
    data: [],
    count: 0,
  },
  SupplierInvoiceProduct: {
    loading: false,
    data: {},
  },
  SavedQuery: {
    saved: false,
    limit: 20,
    skip: 0,
    filter: [],
    filterList: [],
    searchText: ""
  },
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
            productId: bomline.sku,
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
            unitSgd: bomline.skuData.unitCost,
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
    case types.GET_SUPPLIER_INVOICE:
      return {
        ...state,
        SupplierInvoices: {
          ...state.SupplierInvoices,
          loading: true,
        },
      };

    case types.GET_SUPPLIER_INVOICE_SUCCESS:
      return {
        ...state,
        SupplierInvoices: {
          loading: false,
          data: action.payload,
        },
      };

    case types.GET_SUPPLIER_INVOICE_FAILURE:
      NotificationManager.warning("Error in fetching Supplier Invoices");
      NotificationManager.warning("Over here");
      return {
        ...state,
        SupplierInvoices: {
          loading: false,
          data: { ...state.SupplierInvoices },
        },
      };

    case types.SET_SUPPLIER_INVOICE:
      return {
        ...state,
        SupplierInvoiceProduct: {
          loading: true,
          ...state.SupplierInvoiceProduct,
        },
      };

    case types.SET_SUPPLIER_INVOICE_SUCCESS:
      NotificationManager.success("Success in Creating Supplier Invoice");
      return {
        ...state,
        SupplierInvoiceProduct: {
          ...state.SupplierInvoiceProduct,
          loading: false,
          data: action.payload
        },
      };

    case types.SET_SUPPLIER_INVOICE_FAILURE:
      NotificationManager.warning("Error in Creating Supplier Invoice");
      return {
        ...state,
        SupplierInvoiceProduct: {
          ...state.SupplierInvoiceProduct,
          loading: false,
        },
      };

    case types.GET_SUPPLIER_INVOICE_DETAILS:
      return {
        ...state,
        SupplierInvoicesDetails: {
          ...state.SupplierInvoiceDetails,
          loading: true,
        },
      };


    case types.GET_SUPPLIER_INVOICE_DETAILS_SUCCESS:
      NotificationManager.success("Success in Fetching Supplier Invoice Details");
      return {
        ...state,
        SupplierInvoiceDetails: {
          loading: false,
          data: action.payload.data,
        },
      };

    case types.GET_SUPPLIER_INVOICE_DETAILS_FAILURE:
      NotificationManager.warning("Error in Fetching Supplier Invoice Details");
      return {
        ...state,
        SupplierInvoices: {
          ...state.SupplierInvoiceProduct,
          loading: false,
        },
      };

    case types.GET_SINGLE_SUPPLIER_INVOICE_REQUEST:
      return {
        ...state,
        SupplierInvoiceProduct: {
          ...state.SupplierInvoiceProduct,
          loading: true
        },
      };
    case types.GET_SINGLE_SUPPLIER_INVOICE_REQUEST_SUCCESS:
      let dt = salesOrderRemap(action.payload);
      return {
        ...state,
        SupplierInvoiceProduct: {
          loading: false,
          data: dt,
        },
      };
    case types.GET_SINGLE_SUPPLIER_INVOICE_REQUEST_FAILURE:
      return {
        ...state,
        SupplierInvoiceProduct: {
          ...state.SupplierInvoiceProduct,
          loading: false
        },
      };

    case types.PATCH_SINGLE_SUPPLIER_INVOICE:
      return {
        ...state,
        SupplierInvoiceProduct: {
          ...state.SupplierInvoiceProduct,
          loading: true
        },
      };

    case types.PATCH_SINGLE_SUPPLIER_INVOICE_SUCCESS:
      NotificationManager.success("Supplier Invoice Successfully Edited!");
      dt = salesOrderRemap(action.payload);
      return {
        ...state,
        SupplierInvoiceProduct: {
          loading: false,
          data: dt
        },
      };
    case types.PATCH_SINGLE_SUPPLIER_INVOICE_FAILURE:
      NotificationManager.error("Error in Editing Supplier Invoice Details");
      return {
        ...state,
        SupplierInvoiceProduct: {
          ...state.SupplierInvoiceProduct,
          loading: false
        },
      };

    case types.GET_FILTER_SUPPLIER_INVOICE:
      return {
        ...state,
        SupplierInvoiceFiltered: {
          ...state.SupplierInvoiceFiltered,
          loading: true,
        },
      };

    case types.GET_FILTER_SUPPLIER_INVOICE_SUCCESS:
      return {
        ...state,
        SupplierInvoiceFiltered: {
          ...state.SupplierInvoiceFiltered,
          loading: false,
          data: action.payload[0],
          count: action.payload[1],
        },
      };

    case types.GET_FILTER_SUPPLIER_INVOICE_FAILURE:
      return {
        ...state,
        SupplierInvoiceFiltered: {
          loading: false,
        },
      };

      // DELETE SALES_ORDER
    case types.DELETE_SUPPLIER_INVOICE:
      return {
        ...state,
        SupplierInvoiceFiltered: {
          ...state.SupplierInvoiceFiltered,
          loading: true,
        },
      };

    case types.DELETE_SUPPLIER_INVOICE_SUCCESS:
      NotificationManager.success("Supplier Invoice Successfully Deleted!");
      let SupplierInvoiceFiltered = state.SupplierInvoiceFiltered.data.filter(
          (e) => e.id !== action.payload
      );
      return {
        ...state,
        SupplierInvoiceFiltered: {
          loading: false,
          data: SupplierInvoiceFiltered,
        },
      };

    case types.DELETE_SUPPLIER_INVOICE_FAILURE:
      NotificationManager.error("Error in Deleting Supplier Invoice Details");
      return {
        ...state,
        SupplierInvoiceFiltered: {
          ...state.SupplierInvoiceFiltered,
          loading: false,
        },
      };

    // IAN DUPLICATE SUPPLIER_INVOICE
    case types.SET_DUPLICATE:
      return {
        ...state,
        SupplierInvoiceProduct: {
          ...state.SupplierInvoiceProduct,
          loading: true,
        },
      };
    case types.SET_DUPLICATE_SUCCESS:
      // NotificationManager.success("SKU Duplicate Successfully Saved!");
      return {
        ...state,
        SupplierInvoiceProduct: {
          loading: false,
          data: action.payload,
        },
      };
    case types.SET_DUPLICATE_FAILURE:
      return {
        ...state,
        SupplierInvoiceProduct: {
          ...state.SupplierInvoiceProduct,
          loading: false
        },
      };

    //CLEAR DUPLICATE
    case types.CLEAR_DUPLICATE:
      return {
        ...state,
        SupplierInvoiceProduct: {
          data: [],
          loading: true,
        },
      };
    case types.CLEAR_DUPLICATE_SUCCESS:
      return {
        SupplierInvoiceProduct: {
          loading: false,
          data: [],
        },
      };
    case types.CLEAR_DUPLICATE_FAILURE:
      return {
        ...state,
        SupplierInvoiceProduct: { data: [], loading: false },
      };

      case types.GET_SAVED_SUPPLIER_INVOICE_QUERY:
        return {
          ...state,
          SavedQuery: {
            ...state.SavedQuery,
            ...action.payload
          }
        }
  
      case types.GET_SAVED_SUPPLIER_INVOICE_QUERY_SUCCESS:
        return {
          ...state,
          SavedQuery: {
            ...state.SavedQuery,
            ...action.payload
          }
        }
  
      case types.GET_SAVED_SUPPLIER_INVOICE_QUERY_FAILURE:
        return {
          ...state,
          SavedQuery: {
            ...state.SavedQuery,
            ...action.payload
          }
        }
        
    default:
      return { ...state };
  }
};
