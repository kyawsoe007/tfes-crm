import * as types from "./CommissionTypes";
import { NotificationManager } from "react-notifications";

const INIT_STATE = {
  list: [],
  loading: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    /**
     * LOADING
     */
    case types.DELETE_COMMISSION:
    case types.UPDATE_COMMISSION:
    case types.CREATE_COMMISSION:
    case types.GET_COMMISSION:
      return { ...state, loading: true };

    /**
     * GET
     */
    case types.GET_COMMISSION_SUCCESS:
      return { ...state, loading: false, list: action.payload };
    case types.GET_COMMISSION_FAILURE:
      NotificationManager.error("Error in getting Commission Data");
      return { ...state, loading: false };

    /**
     * CREATE
     */
    case types.CREATE_COMMISSION_SUCCESS:
      NotificationManager.success("Successfully created commission");
      const createComms = Object.assign([], state.list);
      createComms.push(action.payload);
      return { ...state, loading: false, list: createComms };
    case types.CREATE_COMMISSION_FAILURE:
      NotificationManager.error("Error in creating commission");
      return { ...state, loading: false };

    /**
     * UPDATE
     */
    case types.UPDATE_COMMISSION_SUCCESS:
      NotificationManager.success("Successfully updated commission");
      const updateComms = Object.assign([], state.list).map(comm =>
        comm.id == action.payload.id ? action.payload : comm
      );
      return { ...state, loading: false, list: updateComms };
    case types.UPDATE_COMMISSION_FAILURE:
      NotificationManager.error("Error in updating commission");
      return { ...state, loading: false };

    /**
     * DELETE
     */
    case types.DELETE_COMMISSION_SUCCESS:
      NotificationManager.success("Successfully deleted commission");
      const deleteComms = Object.assign([], state.list).filter(
        comm => comm.id != action.payload
      );
      return { ...state, loading: false, list: deleteComms };
    case types.DELETE_COMMISSION_FAILURE:
      NotificationManager.error("Error in deleted commission");
      return { ...state, loading: false };

    default:
      return { ...state };
  }
};
