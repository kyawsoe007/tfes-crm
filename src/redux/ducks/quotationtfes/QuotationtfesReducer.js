import * as types from './QuotationtfesTypes'
import { NotificationManager } from 'react-notifications'

const INIT_STATE = {
  Quotations: {
    loading: false,
    data: [],
  },
  QuotationDetails: {
    loading: false,
    data: [],
  },
  QuotationFiltered: {
    loading: false,
    data: [],
    count: 0,
  },
  QuotationProduct: {
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
  }
}

const quotationRemap = (payload) => {
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
    case types.GET_QUOTATION:
      return {
        ...state,
        Quotations: {
          ...state.Quotations,
          loading: true,
        },
      }

    case types.GET_QUOTATION_SUCCESS:
      const { data } = action.payload
      return {
        ...state,
        Quotations: {
          loading: false,
          data: data,
        },
      }

    case types.GET_QUOTATION_FAILURE:
      NotificationManager.warning('Error in fetching Quotations')
      return {
        ...state,
        Quotations: {
          loading: false,
          data: { ...state.Quotations },
        },
      }

    case types.SET_QUOTATION:
      return {
        ...state,
        QuotationProduct: {
          ...state.QuotationProduct,
          loading: true,
        },
      }

    case types.SET_QUOTATION_SUCCESS:
      NotificationManager.success('Success in Creating Quotation');
      var dt = quotationRemap(action.payload);
      return {
        ...state,
        QuotationProduct: {
          loading: false,
          data: dt
        },
      }

    case types.SET_QUOTATION_FAILURE:
      NotificationManager.warning('Error in Creating Quotation')
      return {
        ...state,
        QuotationProduct: {
          ...state.QuotationProduct,
          loading: false,
        },
      }

    case types.GET_QUOTATION_DETAILS:
      return {
        ...state,
        QuotationsDetails: {
          ...state.QuotationDetails,
          loading: true,
        },
      }

    case types.GET_QUOTATION_DETAILS_SUCCESS:
      //NotificationManager.success('Success in Fetching Quotation Details')
      return {
        ...state,
        QuotationDetails: {
          loading: false,
          data: action.payload.data,
        },
      }

    case types.GET_QUOTATION_DETAILS_FAILURE:
      NotificationManager.warning('Error in Fetching Quotation Details')
      return {
        ...state,
        Quotations: {
          loading: false,
        },
      }

    case types.GET_FILTER_QUOTATION_REQUEST:

        // console.log(state);
        // debugger
        return {
          ...state,
          QuotationFiltered: {
            ...state.QuotationFiltered,
            loading: true,
          },
        }

    case types.GET_FILTER_QUOTATION_SUCCESS:
      //NotificationManager.success('Success in Fetching Quotation Details')

      // debugger
      return {
        ...state,
        QuotationFiltered: {
          loading: false,
          // data: action.payload,
          data: action.payload[0],
          count: action.payload[1],
        },
      }

    case types.GET_FILTER_QUOTATION_FAILURE:
      NotificationManager.warning('Error in Fetching Quotation Details')
      return {
        ...state,
        QuotationFiltered: {
          loading: false,
        },
      }
    case types.GET_FILTER_QUOTATION_AND_SINGLE_SKU_RESET:
      return {
        ...state,
        QuotationFiltered: {
          loading: false,
          data: [],
        },
        QuotationProduct: {
          loading: false,
          data: {},
        },
      }

    case types.GET_FILTER_QUOTATION_DETAILS:
      return {
        ...state,
        Quotations: {
          loading: true,
        },
      }

    case types.GET_FILTER_QUOTATION_DETAILS_SUCCESS:
      return {
        ...state,
        Quotations: {
          loading: false,
          data: action.payload.data,
        },
      }

    case types.GET_FILTER_QUOTATION_DETAILS_FAILURE:
      NotificationManager.warning('Error in Fetching Quotation Details')
      return {
        ...state,
        Quotations: {
          loading: false,
        },
      }

    // DAVID - GET
    case types.GET_SINGLE_SKU_QUOTATION_REQUEST:
      return {
        ...state,
        QuotationProduct: { loading: true },
      }
    case types.GET_SINGLE_SKU_QUOTATION_SUCCESS:
      dt = quotationRemap(action.payload);
      return {
        ...state,
        QuotationProduct: {
          loading: false,
          data: dt,
        },
      }
    case types.GET_SINGLE_SKU_QUOTATION_FAILURE:
      return {
        ...state,
        QuotationProduct: { loading: false },
      }

    // DAVID - PATCH
    case types.PATCH_SINGLE_SKU_QUOTATION_REQUEST:
      return {
        ...state,
        QuotationProduct: { loading: true },
      }
    case types.PATCH_SINGLE_SKU_QUOTATION_SUCCESS:
      NotificationManager.success('Quotation Successfully Edited!')
      dt = quotationRemap(action.payload);
      return {
        ...state,
        QuotationProduct: {
          loading: false,
          data: dt
          // data: action.payload ? action.payload : [],
        },
      }
      case types.PATCH_SINGLE_SKU_QUOTATION_FAILURE:
        return {
          ...state,
          QuotationProduct: {
            ...state.QuotationProduct,
            loading: false
          }
        }

    // DELETE QUOTATION
    case types.DELETE_QUOTATION:
      return {
        ...state,
        QuotationFiltered: {
          ...state.QuotationFiltered,
          loading: true,
        },
      }

    case types.DELETE_QUOTATION_SUCCESS:
      NotificationManager.success('Quotation Successfully Deleted!')
      let QuotationFiltered = state.QuotationFiltered.data.filter(
        (e) => e.id != action.payload,
      )
      return {
        ...state,
        QuotationFiltered: {
          loading: false,
          data: QuotationFiltered,
        },
      }

    case types.DELETE_QUOTATION_FAILURE:
      NotificationManager.error('Error in Deleting SKU Details')
      return {
        ...state,
        QuotationFiltered: {
          ...state.QuotationFiltered,
          loading: false,
        },
      }

    // IAN DUPLICATE QUOTATION
    case types.SET_DUPLICATE:
      return {
        ...state,
        QuotationProduct: {
          ...state.QuotationProduct,
          loading: true,
        },
      }
    case types.SET_DUPLICATE_SUCCESS:
      // NotificationManager.success("SKU Duplicate Successfully Saved!");
      return {
        ...state,
        QuotationProduct: {
          loading: false,
          data: action.payload,
        },
      }
    case types.SET_DUPLICATE_FAILURE:
      return {
        ...state,
        QuotationProduct: {
          ...state.QuotationProduct,
          loading: false
        },
      }

    //CLEAR DUPLICATE
    case types.CLEAR_DUPLICATE:
      return {
        ...state,
        QuotationProduct: {
          data: [],
          loading: true,
        },
      }
    case types.CLEAR_DUPLICATE_SUCCESS:
      return {
        QuotationProduct: {
          loading: false,
          data: [],
        },
      }
    case types.CLEAR_DUPLICATE_FAILURE:
      return {
        ...state,
        QuotationProduct: { data: [], loading: false },
      }

    // Set New Version
    case types.SET_NEW_VERSION_REQUEST:
      return {
        ...state,
        QuotationProduct: {
          data: {},
          loading: true,
        },
      }
    case types.SET_NEW_VERSION_SUCCESS:
      dt = quotationRemap(action.payload);
      return {
        ...state,
        QuotationProduct: {
          loading: false,
          data: dt
        },
      }
    case types.SET_NEW_VERSION_FAILURE:
      NotificationManager.warning('Error in fetching New Version')
      return {
        ...state,
        QuotationProduct: {
          loading: false,
          data: { ...state.QuotationProduct },
        },
      }

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
      NotificationManager.warning('Error in fetching QuotationPdfCreate')
      return {
        ...state,
        loading:false
      } 

    case types.GET_SAVED_QUOTATION_QUERY:
      return {
        ...state,
        SavedQuery: {
          ...state.SavedQuery,
          ...action.payload
        }
      }

    case types.GET_SAVED_QUOTATION_QUERY_SUCCESS:
      return {
        ...state,
        SavedQuery: {
          ...state.SavedQuery,
          ...action.payload
        }
      }

    case types.GET_SAVED_QUOTATION_QUERY_FAILURE:
      // NotificationManager.warning('Error in fetching QuotationPdfCreate')
      return {
        ...state,
        SavedQuery: {
          ...state.SavedQuery,
          ...action.payload
        }
      } 
        
    default:
      return { ...state }
  }
}
