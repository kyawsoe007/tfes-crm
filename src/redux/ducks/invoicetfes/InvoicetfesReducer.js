import * as types from "./InvoicetfesTypes";
import { NotificationManager } from "react-notifications";

const INIT_STATE = {
  Invoices: {
    loading: false,
    data: [],
  },
  InvoiceDetails: {
    loading: false,
    data: [],
  },
  InvoiceFiltered: {
    loading: false,
    data: [],
    count: 0,
  },
  InvoiceProduct: {
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
    case types.GET_INVOICE:
      return {
        ...state,
        Invoices: {
          ...state.Invoices,
          loading: true,
        },
      };

    case types.GET_INVOICE_SUCCESS:
      return {
        ...state,
        Invoices: {
          loading: false,
          data: action.payload,
        },
      };

    case types.GET_INVOICE_FAILURE:
      NotificationManager.warning("Error in fetching Invoices");
      NotificationManager.warning("Over here");
      return {
        ...state,
        Invoices: {
          loading: false,
          data: { ...state.Invoices },
        },
      };

    case types.SET_INVOICE:
      return {
        ...state,
        InvoiceProduct: {
          loading: true,
          ...state.InvoiceProduct,
        },
      };

    case types.SET_INVOICE_SUCCESS:
      NotificationManager.success("Success in Creating Invoice");
      return {
        ...state,
        InvoiceProduct: {
          ...state.InvoiceProduct,
          loading: false,
          data: action.payload
        },
      };

    case types.SET_INVOICE_FAILURE:
      NotificationManager.warning("Error in Creating Invoice");
      return {
        ...state,
        InvoiceProduct: {
          ...state.InvoiceProduct,
          loading: false,
        },
      };

    case types.GET_DROPDOWN_GROUP:
      return {
        ...state,
        InvoiceDetails: {
          ...state.InvoiceDetails,
          loading: true,
        },
      };


    case types.GET_DROPDOWN_GROUP_SUCCESS:
      return {
        ...state,
        InvoiceDetails: {
          loading: false,
          data: action.payload,
        },
      };

    case types.GET_DROPDOWN_GROUP_FAILURE:
      NotificationManager.warning("Error in Fetching Invoice Details");
      return {
        ...state,
        InvoiceDetails: {
          ...state.InvoiceDetails,
          loading: false,
        },
      };

    case types.GET_SINGLE_INVOICE_REQUEST:
      return {
        ...state,
        InvoiceProduct: {
          ...state.InvoiceProduct,
          loading: true
        },
      };
    case types.GET_SINGLE_INVOICE_REQUEST_SUCCESS:
      let dt = salesOrderRemap(action.payload);
      return {
        ...state,
        InvoiceProduct: {
          loading: false,
          data: dt,
        },
      };
    case types.GET_SINGLE_INVOICE_REQUEST_FAILURE:
      return {
        ...state,
        InvoiceProduct: {
          ...state.InvoiceProduct,
          loading: false
        },
      };

    case types.PATCH_SINGLE_INVOICE:
      return {
        ...state,
        InvoiceProduct: {
          ...state.InvoiceProduct,
          loading: true
        },
      };

    case types.PATCH_SINGLE_INVOICE_SUCCESS:
      NotificationManager.success("Invoice Successfully Edited!");
      dt = salesOrderRemap(action.payload);
      return {
        ...state,
        InvoiceProduct: {
          loading: false,
          data: dt
        },
      };
    case types.PATCH_SINGLE_INVOICE_FAILURE:
      NotificationManager.error("Error in Editing Invoice Details");
      return {
        ...state,
        InvoiceProduct: {
          ...state.InvoiceProduct,
          loading: false
        },
      };

    case types.GET_FILTER_INVOICE:
      return {
        ...state,
        InvoiceFiltered: {
          ...state.InvoiceFiltered,
          loading: true,
        },
      };

    case types.GET_FILTER_INVOICE_SUCCESS:
      return {
        ...state,
        InvoiceFiltered: {
          loading: false,
          data: action.payload[0],
          count: action.payload[1],
        },
      };

    case types.GET_FILTER_INVOICE_FAILURE:
      return {
        ...state,
        InvoiceFiltered: {
          loading: false,
        },
      };

    // DELETE SALES_ORDER
    case types.DELETE_INVOICE:
      return {
        ...state,
        InvoiceFiltered: {
          ...state.InvoiceFiltered,
          loading: true,
        },
      };

    case types.DELETE_INVOICE_SUCCESS:
      NotificationManager.success("Invoice Successfully Deleted!");
      let InvoiceFiltered = state.InvoiceFiltered.data.filter(
        (e) => e.id !== action.payload
      );
      return {
        ...state,
        InvoiceFiltered: {
          loading: false,
          data: InvoiceFiltered,
          count: state.InvoiceFiltered.count - 1
        },
      };

    case types.DELETE_INVOICE_FAILURE:
      NotificationManager.error("Error in Deleting Invoice Details");
      console.log(action.payload);
      return {
        ...state,
        InvoiceFiltered: {
          ...state.InvoiceFiltered,
          loading: false,
        },
      };

    // IAN DUPLICATE INVOICE
    case types.SET_DUPLICATE:
      return {
        ...state,
        InvoiceProduct: {
          ...state.InvoiceProduct,
          loading: true,
        },
      };
    case types.SET_DUPLICATE_SUCCESS:
      // NotificationManager.success("SKU Duplicate Successfully Saved!");
      return {
        ...state,
        InvoiceProduct: {
          loading: false,
          data: action.payload,
        },
      };
    case types.SET_DUPLICATE_FAILURE:
      return {
        ...state,
        InvoiceProduct: {
          ...state.InvoiceProduct,
          loading: false
        },
      };

    //CLEAR DUPLICATE
    case types.CLEAR_DUPLICATE:
      return {
        ...state,
        InvoiceProduct: {
          data: [],
          loading: true,
        },
      };
    case types.CLEAR_DUPLICATE_SUCCESS:
      return {
        InvoiceProduct: {
          loading: false,
          data: [],
        },
      };
    case types.CLEAR_DUPLICATE_FAILURE:
      return {
        ...state,
        InvoiceProduct: { data: [], loading: false },
      };

    case types.GET_TAX_INVOICE_PDF:
      return {
        ...state,
        InvoiceProduct: {
          loading: true,
        },
      }
    case types.GET_TAX_INVOICE_PDF_SUCCESS:
      return {
        ...state,
        InvoiceProduct: {
          ...state.InvoiceProduct,
          loading: false
        },
      };

    case types.GET_TAX_INVOICE_PDF_FAILURE:
      return {
        ...state,
        InvoiceProduct: {
          ...state.InvoiceProduct,
          loading: false
        },
      };

    case types.GET_PROFORMA_INVOICE_PDF:
      return {
        ...state,
        InvoiceProduct: {
          loading: true,
        },
      }
    case types.GET_PROFORMA_INVOICE_PDF_SUCCESS:
      return {
        ...state,
        InvoiceProduct: {
          ...state.InvoiceProduct,
          loading: false
        },
      };

    case types.GET_PROFORMA_INVOICE_PDF_FAILURE:
      return {
        ...state,
        InvoiceProduct: {
          ...state.InvoiceProduct,
          loading: false
        },
      };

    case types.GET_COMMERCIAL_INVOICE_PDF:
      return {
        ...state,
        InvoiceProduct: {
          loading: true,
        },
      }
    case types.GET_COMMERCIAL_INVOICE_PDF_SUCCESS:
      return {
        ...state,
        InvoiceProduct: {
          ...state.InvoiceProduct,
          loading: false
        },
      };

    case types.GET_COMMERCIAL_INVOICE_PDF_FAILURE:
      return {
        ...state,
        InvoiceProduct: {
          ...state.InvoiceProduct,
          loading: false
        },
      };

    case types.GET_SAVED_INVOICE_QUERY:
      return {
        ...state,
        SavedQuery: {
          ...state.SavedQuery,
          ...action.payload
        }
      }

    case types.GET_SAVED_INVOICE_QUERY_SUCCESS:
      return {
        ...state,
        SavedQuery: {
          ...state.SavedQuery,
          ...action.payload
        }
      }

    case types.GET_SAVED_INVOICE_QUERY_FAILURE:
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
