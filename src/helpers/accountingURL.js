//====================
// ACCOUNTING ROUTES
//====================

/**
 *  ------- /Account Maintenance -------
 */
export const acctMaintenanceListPage = "/app/accounting/acctMaintenance";
export const acctMaintenanceNewPage = acctMaintenanceListPage + "/new";
export const singleAcctMaintenance = (id) => `${acctMaintenanceListPage}/${id}`;
/**
 *  ------- /tfesInvoice-------
 */
export const tfesInvoiceListPage = "/app/accounting/tfesInvoice";
export const tfesInvoiceNewPage = tfesInvoiceListPage + "/new";
export const singleTfesInvoice = (id) => `${tfesInvoiceListPage}/${id}`;

/**
 *  ------- /tfesCreditNote-------
 */
export const tfesCreditNoteListPage = "/app/accounting/tfesCreditNote";
export const tfesCreditNoteNewPage = tfesCreditNoteListPage + "/new";
export const singleTfesCreditNote = (id) => `${tfesCreditNoteListPage}/${id}`;

/**
 *  ------- /tfesPayment-------
 */
export const tfesPaymentListPage = "/app/accounting/tfesPayment";
export const tfesPaymentNewPage = tfesPaymentListPage + "/new";
export const singleTfesPayment = (id) => `${tfesPaymentListPage}/${id}`;

/**
 *  ------- /supplierPayment-------
 */
 export const supplierPaymentListPage = "/app/accounting/supplierPayment";
 export const supplierPaymentNewPage = supplierPaymentListPage + "/new";
 export const singleSupplierPayment = (id) => `${supplierPaymentListPage}/${id}`;
 
 /**
 *  ------- /supplierInvoice-------
 */
  export const supplierInvoiceListPage = "/app/accounting/supplierInvoice";
  export const supplierInvoiceNewPage = supplierInvoiceListPage + "/new";
  export const singleSupplierInvoice = (id) => `${supplierInvoiceListPage}/${id}`;


  /**
 *  ------- /tfesDebitNote-------
 */
export const debitNoteListPage = "/app/accounting/debitNote";
export const debitNoteNewPage = debitNoteListPage + "/new";
export const singledebitNote = (id) => `${debitNoteListPage}/${id}`;

  /**
 *  ------- /expenseManagement-------
 */
  export const expenseManagementListPage = "/app/accounting/expenseManagement";
  export const expenseManagementNewPage = expenseManagementListPage + "/new";
  export const singleExpenseManagement = (id) => `${expenseManagementListPage}/${id}`;
 
  /**
 *  ------- /expensePayment-------
 */
   export const expensePaymentListPage = "/app/accounting/expensePayment";
   export const expensePaymentNewPage = expensePaymentListPage + "/new";
   export const singleExpensePayment = (id) => `${expensePaymentListPage}/${id}`;  

  /**
*  ------- /Journal Entries -------
 */
export const journalEntriesListPage = "/app/accounting/journalEntries";
export const journalEntriesNewPage = journalEntriesListPage + "/new";
export const singleJournalEntries = (id) => `${journalEntriesListPage}/${id}`;
/**
 *  ------- /Journal Entries -------
 */
export const CapexManagementListPage = "/app/accounting/capexManagement";
export const CapexManagementNewPage = CapexManagementListPage + "/new";
export const singleCapexManagement = (id) => `${CapexManagementListPage}/${id}`;

export const financeSettingsPage = '/app/accounting/financeSettings';
export const EditCurrencyPage = financeSettingsPage +'/new';

export const acctSalesListPage = '/app/accounting/acctSales'
export const acctSalesNewPage = acctSalesListPage + '/new'
export const acctSalesEditPage = (id) => `${acctSalesListPage}/${id}`

{/* ------- /Loan Management------- */}
export const loanManagementListPage = '/app/accounting/loanManagement'
export const longLoanManagementNewPage = loanManagementListPage + '/new'
export const shortLoanManagementNewPage = loanManagementListPage + '/new/shortTermForm'
export const singleLongLoanManagementPage= (id) => `${loanManagementListPage}/${id}`
export const singleShortLoanManagementPage= (id) => `${loanManagementListPage}/shortTermForm/${id}`

/**
 *  ------- /Generating Report -------
 */
 export const generatingReportListPage = '/app/accounting/generatingReport';
 
 
export const stockAdjustmentListPage = '/app/accounting/stockAdjustment'
export const stockAdjustmentNewPage = stockAdjustmentListPage + '/new'
export const stockAdjustmentEditPage = (id) => `${stockAdjustmentListPage}/${id}`

/**
 *  ------- /tfesDeposit -------
 */
 export const depositListPage = "/app/accounting/tfesDeposit";
 export const depositNewPage = depositListPage + "/new";
 export const singleTfesDeposit = (id) => `${depositListPage}/${id}`;