import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// async components
import * as async from "./AsyncRoutes";
import * as url from "Helpers/accountingURL";

function acctSwitcher() {
  return (
    
    <div className="saas-dashboard">
      <Switch>
        {/* ------- /Account Maintenance ------- */}
        <Route
          exact
          path={url.acctMaintenanceListPage}
          component={async.AcctMaintenanceListView}
        />
        <Route
          exact
          path={url.acctMaintenanceNewPage}
          component={async.AcctMaintenanceFormView}
        />
        <Route
          exact
          path={`${url.acctMaintenanceListPage}/:id`}
          component={async.AcctMaintenanceFormView}
        />

        <Route
          exact
          path={url.acctSalesListPage}
          component={async.AcctSalesListView}
        />
        <Route
          exact
          path={url.acctSalesNewPage}
          component={async.AcctSalesFormView}
        />
        <Route
          exact
          path={`${url.acctSalesListPage}/:id`}
          component={async.AcctSalesFormView}
        />


        {/* ------- /tfesInvoice------- */}
        <Route
          exact
          path={url.tfesInvoiceListPage}
          component={async.TfesInvoiceListView}
        />
        <Route
          exact
          path={url.tfesInvoiceNewPage}
          component={async.TfesInvoiceFormView}
        />
        <Route
          exact
          path={`${url.tfesInvoiceListPage}/:id`}
          component={async.TfesInvoiceFormView}
        />

        {/* ------- /tfesInvoice------- */}
        <Route
            exact
            path={url.tfesCreditNoteListPage}
            component={async.TfesCreditNoteListView}
        />
        <Route
            exact
            path={url.tfesCreditNoteNewPage}
            component={async.TfesCreditNoteFormView}
        />
        <Route
            exact
            path={`${url.tfesCreditNoteListPage}/:id`}
            component={async.TfesCreditNoteFormView}
        />

         {/* ------- /debit note------ */}
         <Route
            exact
            path={url.debitNoteListPage}
            component={async.DebitNoteListView}
        />
        <Route
            exact
            path={url.debitNoteNewPage}
            component={async.DebitNoteFormView}
        />
        <Route
            exact
            path={`${url.debitNoteListPage}/:id`}
            component={async.DebitNoteFormView}
        />

        {/* ------- /tfesPayment------- */}
        <Route
            exact
            path={url.tfesPaymentListPage}
            component={async.TfesPaymentListView}
        />
        <Route
            exact
            path={url.tfesPaymentNewPage}
            component={async.TfesPaymentFormView}
        />
        <Route
            exact
            path={`${url.tfesPaymentListPage}/:id`}
            component={async.TfesPaymentFormView}
        />

        {/* ------- /supplierPayment-------- */}
        <Route
            exact
            path={url.supplierPaymentListPage}
            component={async.SupplierPaymentListView}
        />
        <Route
            exact
            path={url.supplierPaymentNewPage}
            component={async.SupplierPaymentFormView}
        />
        <Route
            exact
            path={`${url.supplierPaymentListPage}/:id`}
            component={async.SupplierPaymentFormView}
        />

          {/* ------- /supplierInvoice------- */}
          <Route
          exact
          path={url.supplierInvoiceListPage}
          component={async.SupplierInvoiceListView}
        />
        <Route
          exact
          path={url.supplierInvoiceNewPage}
          component={async.SupplierInvoiceFormView}
        />
        <Route
          exact
          path={`${url.supplierInvoiceListPage}/:id`}
          component={async.SupplierInvoiceFormView}
        />



        {/* ------- /Journal Entries ------- */}
        <Route
          exact
          path={url.journalEntriesListPage}

          component={async.JournalEntriesListView}
        />
        <Route
          path={url.journalEntriesNewPage}
          component={async.JournalEntriesFormView}
        />
        <Route
          exact
          path={`${url.journalEntriesListPage}/:id`}
          component={async.JournalEntriesFormView}
        />
        {/* ------- /Caped Management------- */}
        <Route
          exact
          path={url.CapexManagementListPage}
          component={async.CapexManagementListView}
        />
        <Route
          exact
          path={url.CapexManagementNewPage}
          component={async.CapexManagementFormView}
        />
        <Route
          exact
          path={`${url.CapexManagementListPage}/:id`}
          component={async.CapexManagementFormView}
        />
        <Route
          exact
          path={url.financeSettingsPage}
          component={async.financeSettingsView}
        />
        <Route
          exact
          path={url.EditCurrencyPage}
          component={async.EditCurrency}
        />

         {/* ------- /Generating Report------- */}
         <Route
          exact
          path={url.generatingReportListPage}
          component={async.GeneratingReportList}
        />
         {/* <Route
          exact
          path={url.generatingReportListPage}
          component={async.GeneratingReportList}
        /> */}


        {/* ------- /expensePayment------- */}
        <Route
          exact
          path={url.expensePaymentListPage}
          component={async.ExpensePaymentListView}
        />
        <Route
          exact
          path={url.expensePaymentNewPage}
          component={async.ExpensePaymentFormView}
        />
        <Route
          exact
          path={`${url.expensePaymentListPage}/:id`}
          component={async.ExpensePaymentFormView}
        />
        
        {/* ------- /Loan Management------- */}
         <Route
          exact
          path={url.loanManagementListPage}
          component={async.LoanManagementListView}
        />
            {/* Route to LONG TERM forms */}
        <Route
          exact
          path={url.longLoanManagementNewPage}
          component={async.LoanManagementFormView}
        />
        <Route
          exact
          path={`${url.loanManagementListPage}/:id`}
          component={async.LoanManagementFormView}
        />
            {/* Route to SHORT TERM forms */}
        <Route
          exact
          path={url.shortLoanManagementNewPage}
          component={async.ShortLoanManagementFormView}
        />
        <Route
          exact
          path={`${url.loanManagementListPage}/shortTermForm/:id`}
          component={async.ShortLoanManagementFormView}
        />

        {/* ------- /stockAdjustment------- */}
        <Route
          exact
          path={url.stockAdjustmentListPage}
          component={async.StockAdjustmentListView}
        />
        <Route
          path={url.stockAdjustmentNewPage}
          component={async.StockAdjustmentFormView}
        />
        <Route
          exact
          path={`${url.stockAdjustmentListPage}/:id`}
          component={async.StockAdjustmentFormView}
        />

        {/* ------- /expenseManagement------- */}
        <Route
          exact
          path={url.expenseManagementListPage}
          component={async.ExpenseManagementListView}
        />
        <Route
          exact
          path={url.expenseManagementNewPage}
          component={async.ExpenseManagementFormView}
        />
        <Route
          exact
          path={`${url.expenseManagementListPage}/:id`}
          component={async.ExpenseManagementFormView}
        />
        
        {/* ------- /Deposit tfes------- */}
        <Route
          exact
          path={url.depositListPage}
          component={async.DepositListView}
        />
        <Route
          exact
          path={url.depositNewPage}
          component={async.DepositFormView}
        />
        <Route
          exact
          path={`${url.depositListPage}/:id`}
          component={async.DepositFormView}
        />
       
        

        {/* ------- /404 ------- */}
        <Redirect to="/404" />
      </Switch>
    </div>
  );
}

export default acctSwitcher;
