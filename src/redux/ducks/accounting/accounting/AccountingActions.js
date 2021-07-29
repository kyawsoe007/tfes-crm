import * as types from './AccountingTypes'

export const submitAccountQuotationInvoice = (accountPage, formFields) => ({
    type: types.HANDLE_SUBMIT_ACCOUNT_QUOTATION_INVOICE,
    payload: {
        accountPage : accountPage,
        formField : formFields
    }
});
  
export const submitAccountQuotationInvoiceSuccess = () => ({
    type: types.HANDLE_SUBMIT_ACCOUNT_QUOTATION_INVOICE_SUCCESS
});
  
export const submitAccountQuotationInvoiceFailure = () => ({
    type: types.HANDLE_SUBMIT_ACCOUNT_QUOTATION_INVOICE_FAILURE
});
  
export const accountingClearState = () => ({
    type: types.ACCOUNTING_CLEAR_STATE
});


