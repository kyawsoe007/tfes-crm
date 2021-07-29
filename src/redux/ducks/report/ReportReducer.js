import { NotificationManager } from "react-notifications";
import * as types from "./ReportTypes";

const INIT_STATE = {
  dealsReport: {
    dealsByOwner: { loading: false, data: null },
    dealsByType: { loading: false, data: null },
    dealsBySource: { loading: false, data: null },
    dealsPipeline: { loading: false, data: null }
  },
  leadsReport: {
    leadsByStatus: { loading: false, data: null },
    leadsByOwner: { loading: false, data: null },
    leadsBySource: { loading: false, data: null }
  },
  acctcustReport: {
    topSpenderAccount: { loading: false, data: null },
    topSpenderCustomer: { loading: false, data: null }
  },
  individualReport: { loading: false, data: null },
  closedDealsReport: {
    wonByOwner: { loading: false, data: null }
  },
  salesReport: {
    commsReport: { loading: false, data: null },
    topSeller: { loading: false, data: null }
  }
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    //=====================
    // Reports Failure
    //=====================
    case types.GET_REPORT_FAILURE:
      NotificationManager.error("Error in fetching Report");
      return INIT_STATE;

    //=====================
    // Deal Reports
    //=====================

    //Deal By Owner
    case types.GET_DEALS_BY_OWNER:
      return {
        ...state,
        dealsReport: {
          ...state.dealsReport,
          dealsByOwner: { ...state.dealsReport.dealsByOwner, loading: true }
        }
      };
    case types.GET_DEALS_BY_OWNER_SUCCESS:
      return {
        ...state,
        dealsReport: {
          ...state.dealsReport,
          dealsByOwner: {
            ...state.dealsReport.dealsByOwner,
            loading: false,
            data: action.payload
          }
        }
      };

    // Deal By Type
    case types.GET_DEALS_BY_TYPE:
      return {
        ...state,
        dealsReport: {
          ...state.dealsReport,
          dealsByType: { ...state.dealsReport.dealsByType, loading: true }
        }
      };
    case types.GET_DEALS_BY_TYPE_SUCCESS:
      return {
        ...state,
        dealsReport: {
          ...state.dealsReport,
          dealsByType: {
            ...state.dealsReport.dealsByType,
            loading: false,
            data: action.payload
          }
        }
      };

    // Deal By Source
    case types.GET_DEALS_BY_SOURCE:
      return {
        ...state,
        dealsReport: {
          ...state.dealsReport,
          dealsBySource: { ...state.dealsReport.dealsBySource, loading: true }
        }
      };
    case types.GET_DEALS_BY_SOURCE_SUCCESS:
      return {
        ...state,
        dealsReport: {
          ...state.dealsReport,
          dealsBySource: {
            ...state.dealsReport.dealsBySource,
            loading: false,
            data: action.payload
          }
        }
      };

    // Deals Pipeline
    case types.GET_DEALS_PIPELINE:
      return {
        ...state,
        dealsReport: {
          ...state.dealsReport,
          dealsPipeline: { ...state.dealsReport.dealsPipeline, loading: true }
        }
      };
    case types.GET_DEALS_PIPELINE_SUCCESS:
      return {
        ...state,
        dealsReport: {
          ...state.dealsReport,
          dealsPipeline: {
            ...state.dealsReport.dealsPipeline,
            loading: false,
            data: action.payload
          }
        }
      };

    //=====================
    // Lead Reports
    //=====================

    // Leads by status
    case types.GET_LEADS_BY_STATUS:
      return {
        ...state,
        leadsReport: {
          ...state.leadsReport,
          leadsByStatus: { ...state.leadsByStatus, loading: true }
        }
      };
    case types.GET_LEADS_BY_STATUS_SUCCESS:
      return {
        ...state,
        leadsReport: {
          ...state.leadsReport,
          leadsByStatus: {
            ...state.leadsByStatus,
            loading: false,
            data: action.payload
          }
        }
      };

    // Leads by owner
    case types.GET_LEADS_BY_OWNER:
      return {
        ...state,
        leadsReport: {
          ...state.leadsReport,
          leadsByOwner: { ...state.leadsByOwner, loading: true }
        }
      };
    case types.GET_LEADS_BY_OWNER_SUCCESS:
      return {
        ...state,
        leadsReport: {
          ...state.leadsReport,
          leadsByOwner: {
            ...state.leadsByOwner,
            loading: false,
            data: action.payload
          }
        }
      };

    // Leads by source
    case types.GET_LEADS_BY_SOURCE:
      return {
        ...state,
        leadsReport: {
          ...state.leadsReport,
          leadsBySource: { ...state.leadsBySource, loading: true }
        }
      };
    case types.GET_LEADS_BY_SOURCE_SUCCESS:
      return {
        ...state,
        leadsReport: {
          ...state.leadsReport,
          leadsBySource: {
            ...state.leadsBySource,
            loading: false,
            data: action.payload
          }
        }
      };

    //=====================
    // Acct Cust Reports
    //=====================

    // Top Spender Accounts
    case types.GET_TOP_SPENDER_ACCOUNT:
      return {
        ...state,
        acctcustReport: {
          ...state.acctcustReport,
          topSpenderAccount: { loading: true }
        }
      };
    case types.GET_TOP_SPENDER_ACCOUNT_SUCCESS:
      return {
        ...state,
        acctcustReport: {
          ...state.acctcustReport,
          topSpenderAccount: { loading: false, data: action.payload }
        }
      };

    // Top Spender Customers
    case types.GET_TOP_SPENDER_CUSTOMER:
      return {
        ...state,
        acctcustReport: {
          ...state.acctcustReport,
          topSpenderCustomer: { loading: true }
        }
      };
    case types.GET_TOP_SPENDER_CUSTOMER_SUCCESS:
      return {
        ...state,
        acctcustReport: {
          ...state.acctcustReport,
          topSpenderCustomer: { loading: false, data: action.payload }
        }
      };

    //=====================
    // Individual Reports
    //=====================
    case types.GET_INDIVIDUAL_REPORT:
      return {
        ...state,
        individualReport: { ...state.individualReport, loading: true }
      };
    case types.GET_INDIVIDUAL_REPORT_SUCCESS:
      return {
        ...state,
        individualReport: {
          ...state.individualReport,
          loading: false,
          data: action.payload
        }
      };

    //=====================
    // Closed Deal Reports
    //=====================

    //Closed By Owner
    case types.GET_CLOSED_BY_OWNER:
      return {
        ...state,
        closedDealsReport: {
          ...state.closedDealsReport,
          wonByOwner: {
            ...state.closedDealsReport.wonByOwner,
            loading: true
          }
        }
      };
    case types.GET_CLOSED_BY_OWNER_SUCCESS:
      return {
        ...state,
        closedDealsReport: {
          ...state.closedDealsReport,
          wonByOwner: {
            ...state.closedDealsReport.wonByOwner,
            loading: false,
            data: action.payload
          }
        }
      };

    //=====================
    // Sales Reports
    //=====================

    // Commission Report
    case types.GET_COMMISSION_REPORT:
      return {
        ...state,
        salesReport: {
          ...state.salesReport,
          commsReport: {
            ...state.salesReport.commsReport,
            loading: true
          }
        }
      };
    case types.GET_COMMISSION_REPORT_SUCCESS:
      return {
        ...state,
        salesReport: {
          ...state.salesReport,
          commsReport: {
            ...state.salesReport.commsReport,
            loading: false,
            data: action.payload
          }
        }
      };

    // Top Selling Products Report
    case types.GET_TOP_SELLING_REPORT:
      return {
        ...state,
        salesReport: {
          ...state.salesReport,
          topSeller: {
            ...state.salesReport.topSeller,
            loading: true
          }
        }
      };
    case types.GET_TOP_SELLING_REPORT_SUCCESS:
      return {
        ...state,
        salesReport: {
          ...state.salesReport,
          topSeller: {
            ...state.salesReport.topSeller,
            loading: false,
            data: action.payload
          }
        }
      };

    default:
      return { ...state };
  }
};
