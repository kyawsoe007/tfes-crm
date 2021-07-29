import { NotificationManager } from "react-notifications";
import * as types from "./DealTypes";

const INIT_STATE = {
  dealList: {
    nowShowing: "All Deals",
    options: ["All Deals", "Open Deals", "Closed Deals", "Won Deals"],
    action: false,
    loading: false,
    tableData: []
  },
  dealSummary: {
    loading: false,
    summary: []
  },
  dealToView: {
    loading: false,
    deal: null,
    sectionLoading: false,
    dealStageStepper: {
      activeStep: 0,
      completed: new Set(),
      loading: false
    }
  },
  dealForm: {
    loading: false,
    fields: {
      leadSource: [],
      dealStage: [],
      types: [],
      users: [],
      accounts: [],
      customers: []
    }
  }
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    /**
     * Deal Summary
     */
    case types.GET_DEAL_SUMMARY:
      return {
        ...state,
        dealSummary: {
          ...state.dealSummary,
          loading: true
        }
      };
    case types.GET_DEAL_SUMMARY_SUCCESS:
      return {
        ...state,
        dealSummary: {
          ...state.dealSummary,
          summary: action.payload,
          loading: false
        }
      };
    case types.GET_DEAL_SUMMARY_FAILURE:
      NotificationManager.warning("Error in fetching Deal Summary");
      return { ...state, dealSummary: INIT_STATE.dealSummary };

    /**
     * Get Deals
     */
    case types.GET_DEAL_FAILURE:
      NotificationManager.warning("Error in fetching Deal Data");
      return {
        ...state,
        dealToView: INIT_STATE.dealToView,
        dealList: INIT_STATE.dealList
      };
    case types.GET_ALL_DEAL:
      return {
        ...state,
        dealList: { ...state.dealList, loading: true }
      };
    case types.GET_DEAL_SUCCESS:
      // sort by createdAt
      var defaultSort = action.payload.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      return {
        ...state,
        dealList: {
          ...state.dealList,
          loading: false,
          tableData: defaultSort
        }
      };

    /**
     * Get Single Deal
     */
    case types.GET_SINGLE_DEAL:
      return {
        ...state,
        dealToView: { ...state.dealToView, loading: true }
      };
    case types.GET_SINGLE_DEAL_SUCCESS:
      return {
        ...state,
        dealToView: {
          ...state.dealToView,
          loading: false,
          deal: action.payload
        }
      };
    case types.CLEAR_SINGLE_DEAL:
      return {
        ...state,
        dealToView: INIT_STATE.dealToView
      };

    /**
     * Handle Deal Stage
     */
    case types.ON_CLICK_STEP:
      return {
        ...state,
        dealToView: {
          ...state.dealToView,
          dealStageStepper: {
            ...state.dealToView.dealStageStepper,
            activeStep: action.payload
          }
        }
      };
    case types.SET_CURRENT_STEP:
      const completed = new Set();
      for (let i = 0; i <= action.payload; i++) {
        completed.add(i);
      }
      return {
        ...state,
        dealToView: {
          ...state.dealToView,
          dealStageStepper: {
            ...state.dealToView.dealStageStepper,
            completed,
            activeStep: action.payload
          }
        }
      };
    case types.ON_CHANGE_STEP_STATE:
      const activeStep = state.dealToView.dealStageStepper.activeStep;
      const completedSet = new Set();
      for (let i = 0; i <= activeStep; i++) {
        completedSet.add(i);
      }
      return {
        ...state,
        dealToView: {
          ...state.dealToView,
          dealStageStepper: {
            ...state.dealToView.dealStageStepper,
            completed: completedSet,
            activeStep: activeStep
          }
        }
      };
    case types.ON_SUBMIT_NEW_STAGE:
      return {
        ...state,
        dealToView: {
          ...state.dealToView,
          dealStageStepper: {
            ...state.dealToView.dealStageStepper,
            loading: true
          }
        }
      };
    case types.ON_SUBMIT_NEW_STAGE_SUCCESS:
      return {
        ...state,
        dealToView: {
          ...state.dealToView,
          deal: action.payload,
          dealStageStepper: {
            ...state.dealToView.dealStageStepper,
            loading: false
          }
        }
      };
    case types.ON_SUBMIT_NEW_STAGE_FAILURE:
      NotificationManager.error("Error in POST API");
      return {
        ...state,
        dealToView: {
          ...state.dealToView,
          dealStageStepper: {
            ...state.dealToView.dealStageStepper,
            loading: false
          }
        }
      };

    /**
     * New Deal
     */
    case types.NEW_DEAL:
      return {
        ...state,
        dealForm: { ...state.dealForm, loading: true }
      };
    case types.NEW_DEAL_SUCCESS:
      NotificationManager.success("Deal Created");
      return { ...state, dealForm: { ...state.dealForm, loading: false } };
    case types.NEW_DEAL_FAILURE:
      NotificationManager.error("Error in POST API");
      return { ...state, dealForm: { ...state.dealForm, loading: false } };

    /**
     * Edit
     */
    case types.EDIT_DEAL:
      return {
        ...state,
        dealForm: { ...state.dealForm, loading: true }
      };
    case types.EDIT_DEAL_SUCCESS:
      NotificationManager.success("Deal Edited");
      return {
        ...state,
        dealForm: { ...state.dealForm, loading: false }
      };
    case types.EDIT_DEAL_FAILURE:
      NotificationManager.error("Error in Edit");
      return {
        ...state,
        dealForm: { ...state.dealForm, loading: false }
      };

    /**
     * Form Fields
     */
    case types.GET_DEAL_FORM_SUCCESS:
      return {
        ...state,
        dealForm: { ...state.dealForm, fields: action.payload.fields }
      };
    case types.GET_DEAL_FORM_FAILURE:
      NotificationManager.error("Error in fetching form fields");
      return { ...state };

    /**
     * Delete
     */
    case types.DELETE_DEAL:
      return {
        ...state,
        dealToView: { ...state.dealToView, loading: true },
        dealList: { ...state.dealList, loading: true }
      };
    case types.DELETE_DEAL_SUCCESS:
      NotificationManager.success("Deal Deleted");
      // remove from state
      var afterDeleteData = Object.assign([], state.dealList.tableData).filter(
        cust => cust.id != action.payload
      );
      return {
        ...state,
        dealToView: { ...state.dealToView, loading: false },
        dealList: {
          ...state.dealList,
          loading: false,
          tableData: afterDeleteData
        }
      };
    case types.DELETE_DEAL_FAILURE:
      NotificationManager.error("Error in Deleting Deal");
      return {
        ...state,
        dealToView: { ...state.dealToView, loading: false },
        dealList: { ...state.dealList, loading: false }
      };

    /**
     * Notes
     */
    case types.ADD_NOTE_DEAL:
      return {
        ...state,
        dealToView: { ...state.dealToView, sectionLoading: true }
      };
    case types.ADD_NOTE_DEAL_SUCCESS:
      var newNotes = Object.assign([], state.dealToView.deal.notes);
      newNotes.unshift(action.payload);
      return {
        ...state,
        dealToView: {
          ...state.dealToView,
          deal: { ...state.dealToView.deal, notes: newNotes },
          sectionLoading: false
        }
      };
    case types.ADD_NOTE_DEAL_FAILURE:
      NotificationManager.error("Error in adding Note");
      return {
        ...state,
        dealToView: { ...state.dealToView, sectionLoading: false }
      };

    /**
     * Transfer
     */
    case types.TRANSFER_DEAL:
      return { ...state, dealToView: { ...state.dealToView, loading: true } };
    case types.TRANSFER_DEAL_SUCCESS:
      NotificationManager.success("Record Transferred");
      return {
        ...state,
        dealToView: {
          ...state.dealToView,
          deal: action.payload,
          loading: false
        }
      };
    case types.TRANSFER_DEAL_FAILURE:
      NotificationManager.error("Error in Transferring Record");
      return { ...state, dealToView: { ...state.dealToView, loading: false } };

    /**
     * Event
     */
    case types.ADD_DEAL_EVENT:
      var newEvent = Object.assign([], state.dealToView.deal.events);
      newEvent.push(action.payload);
      return {
        ...state,
        dealToView: {
          ...state.dealToView,
          deal: { ...state.dealToView.deal, events: newEvent }
        }
      };

    // =======================
    // Integration
    // =======================

    /**
     * Deal Product
     */
    case types.ADD_DEAL_PRODUCT:
      return {
        ...state,
        dealToView: { ...state.dealToView, sectionLoading: true }
      };
    case types.ADD_DEAL_PRODUCT_SUCCESS:
      NotificationManager.success("Successfully added product!");
      // console.log(action.payload);
      // const addDealProduct = Object.assign([], state.dealToView.deal.products);
      // addDealProduct.push(action.payload);
      return {
        ...state,
        dealToView: {
          ...state.dealToView,
          sectionLoading: false
          // deal: { ...state.dealToView.deal, products: action.payload }
        }
      };
    case types.ADD_DEAL_PRODUCT_FAILURE:
      NotificationManager.error("Error in adding products");
      return {
        ...state,
        dealToView: { ...state.dealToView, sectionLoading: false }
      };
    case types.DELETE_DEAL_PRODUCT:
      return {
        ...state,
        dealToView: { ...state.dealToView, sectionLoading: true }
      };
    case types.DELETE_DEAL_PRODUCT_SUCCESS:
      NotificationManager.success("Product Deleted");
      var deleteProduct = Object.assign(
        [],
        state.dealToView.deal.products
      ).filter(cust => cust.id != action.payload);
      return {
        ...state,
        dealToView: {
          ...state.dealToView,
          sectionLoading: false,
          deal: { ...state.dealToView.deal, products: deleteProduct }
        }
      };
    case types.DELETE_DEAL_PRODUCT_FAILURE:
      NotificationManager.error("Error in deleting products");
      return {
        ...state,
        dealToView: { ...state.dealToView, sectionLoading: false }
      };

    default:
      return { ...state };
  }
};
