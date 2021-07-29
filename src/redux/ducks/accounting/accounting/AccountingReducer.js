import { NotificationManager } from "react-notifications";

import * as types from './AccountingTypes'


const INIT_STATE = {
    loading: false,
    success: false
};


export default (state = INIT_STATE, action) => {
  
    switch (action.type) {

        case types.ACCOUNTING_CLEAR_STATE:
            return {
                ...state,
                success: false
            }

        case types.HANDLE_SUBMIT_ACCOUNT_QUOTATION_INVOICE:
            return {
                ...state,
            };

        case types.HANDLE_SUBMIT_ACCOUNT_QUOTATION_INVOICE_SUCCESS:
            NotificationManager.success("New form has been successfully created");
            return {
                ...state,
                success: true
            };

        case types.HANDLE_SUBMIT_ACCOUNT_QUOTATION_INVOICE_FAILURE:
            NotificationManager.error("Unable to create form fields, please try again");
            return {
                ...state,
                success: false
            };

        default:
            return {...state};
    }
}