import React from "react";
import Loadable from "react-loadable";

// rct page loader
import RctPageLoader from "Components/RctPageLoader";

// Account Maintenance

export const AcctMaintenanceListView = Loadable({
  loader: () => import("./acctMaintenance"),
  loading: () => <RctPageLoader />
});

export const AcctMaintenanceFormView = Loadable({
  loader: () => import("./acctMaintenance/new"),
  loading: () => <RctPageLoader />
});

export const AcctSalesListView = Loadable({
  loader: () => import("./acctSales"),
  loading: () => <RctPageLoader />
});

export const AcctSalesFormView = Loadable({
  loader: () => import("./acctSales/new"),
  loading: () => <RctPageLoader />
});


// tfesInvoice

export const TfesInvoiceListView = Loadable({
  loader: () => import("./tfesInvoice"),
  loading: () => <RctPageLoader />
});

export const TfesInvoiceFormView = Loadable({
  loader: () => import("./tfesInvoice/new"),
  loading: () => <RctPageLoader />
});

//supplierInvoice
export const SupplierInvoiceListView = Loadable({
  loader: () => import("./supplierInvoice"),
  loading: () => <RctPageLoader />
});

export const SupplierInvoiceFormView = Loadable({
  loader: () => import("./supplierInvoice/new"),
  loading: () => <RctPageLoader />
});

// expenses Management 
export const ExpenseManagementListView = Loadable({
  loader: () => import("./expenseManagement"),
  loading: () => <RctPageLoader />
});

export const ExpenseManagementFormView = Loadable({
  loader: () => import("./expenseManagement/new"),
  loading: () => <RctPageLoader />
});

// expenses payment 
export const ExpensePaymentListView = Loadable({
  loader: () => import("./expensePayment"),
  loading: () => <RctPageLoader />
});

export const ExpensePaymentFormView = Loadable({
  loader: () => import("./expensePayment/new"),
  loading: () => <RctPageLoader />
});

// supplierPayment
export const SupplierPaymentListView = Loadable({
  loader: () => import("./supplierPayment"),
  loading: () => <RctPageLoader />
});

export const SupplierPaymentFormView = Loadable({
  loader: () => import("./supplierPayment/new"),
  loading: () => <RctPageLoader />
});

// tfesInvoice
export const TfesPaymentListView = Loadable({
  loader: () => import("./tfesPayment"),
  loading: () => <RctPageLoader />
});

// tfesCreditNote

export const TfesCreditNoteListView = Loadable({
  loader: () => import("./tfesCreditNote"),
  loading: () => <RctPageLoader />
});

export const TfesCreditNoteFormView = Loadable({
  loader: () => import("./tfesCreditNote/new"),
  loading: () => <RctPageLoader />
});

//debit note
export const DebitNoteListView = Loadable({
  loader: () => import("./debitNote"),
  loading: () => <RctPageLoader />
});

export const DebitNoteFormView = Loadable({
  loader: () => import("./debitNote/new"),
  loading: () => <RctPageLoader />
});

export const TfesPaymentFormView = Loadable({
  loader: () => import("./tfesPayment/new"),
  loading: () => <RctPageLoader />
});

// Journal Entries
export const JournalEntriesListView = Loadable({
  loader: () => import("./journalEntries"),
  loading: () => <RctPageLoader />
});

export const JournalEntriesFormView = Loadable({
  loader: () => import("./journalEntries/new"),
  loading: () => <RctPageLoader />
});
// Caped Management
export const CapexManagementListView = Loadable({
  loader: () => import("./capexManagement"),
  loading: () => <RctPageLoader />
});

export const CapexManagementFormView = Loadable({
  loader: () => import("./capexManagement/new"),
  loading: () => <RctPageLoader />
});

export const financeSettingsView = Loadable({
  loader: () => import('./financeSettings'),
  loading: () => <RctPageLoader />,
})
export const EditCurrency = Loadable({
  loader: () => import('./financeSettings/new'),
  loading: () => <RctPageLoader />,
})

// Generating Report
export const GeneratingReportList = Loadable({
  loader: () => import("./generatingReport"),
  loading: () => <RctPageLoader />
});

export const StockAdjustmentListView = Loadable({
  loader: () => import("./stockAdjustment"),
  loading: () => <RctPageLoader />
});

export const StockAdjustmentFormView = Loadable({
  loader: () => import("./stockAdjustment/new"),
  loading: () => <RctPageLoader />  
})

// Deposit tfes
export const DepositListView = Loadable({
  loader: () => import("./tfesDeposit"),
  loading: () => <RctPageLoader />
});

export const DepositFormView = Loadable({
  loader: () => import("./tfesDeposit/new"),
  loading: () => <RctPageLoader />  
})
// Loan Management
export const LoanManagementListView = Loadable({
  loader: () => import("./loanManagement"),
  loading: () => <RctPageLoader />
});
    //  For Long Term forms
export const LoanManagementFormView = Loadable({
  loader: () => import("./loanManagement/new"),
  loading: () => <RctPageLoader />
});
    //  For Short Term forms
export const ShortLoanManagementFormView = Loadable({
  loader: () => import("./loanManagement/new/shortTermForm"),
  loading: () => <RctPageLoader />
});







