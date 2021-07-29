import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

// async components
import * as async from './AsyncRoutes'
import * as url from 'Helpers/crmURL'

function crmSwitcher() {
  return (
    <div className="saas-dashboard">
      <Switch>
        {/* ------- /Customers ------- */}
        <Route
          exact
          path={url.customerListPage}
          component={async.crm_customer_list}
        />
        <Route
          path={url.customerNewPage}
          component={async.crm_new_customer}
        />

        <Route
          exact
          path={`${url.customerListPage}/:id`}
          component={async.crm_new_customer}
        />
        {/* ------- /Supplier ------- */}
        <Route
          exact
          path={url.supplierListPage}
          component={async.crm_supplier_list}
        />
        <Route path={url.supplierNewPage} component={async.crm_new_supplier} />

        <Route
          exact
          path={`${url.supplierListPage}/:id`}
          component={async.crm_new_supplier}
        />

        {/* ------- /Purchase ------- */}
        <Route
          exact
          path={url.purchaseListPage}
          component={async.crm_purchase_list}
        />
        <Route path={url.purchaseNewPage} component={async.crm_new_purchase} />

        <Route
          exact
          path={`${url.purchaseListPage}/:id`}
          component={async.crm_new_purchase}   
        />
      

        {/* ------- /Quotation------- */}
        <Route
          exact
          path={url.quotationListPage}
          component={async.crm_quotation_list}
        />
        <Route
          path={url.quotationNewPage}
          component={async.crm_new_quotation}
        />

        <Route
          path="/app/crm/quotation/bom"
          component={async.crm_quotationBom_page}
        />

        <Route
          path={`${url.quotationListPage}/:id`}
          component={async.crm_new_quotation}
        />

        <Route
          path={`${url.quotationNewVersionPage}/:id`}
          component={async.crm_new_quotation}
        />

        {/* ------- /Sales Order------- */}
        <Route
          exact
          path={url.salesOrderListPage}
          component={async.crm_salesOrder_list}
        />
        <Route
          path={url.salesOrderNewPage}
          component={async.crm_new_salesOrder}
        />

        <Route path="/app/crm/salesOrder/bom" component={async.crm_Bom_page} />

        <Route
          path={`${url.salesOrderListPage}/:id`}
          component={async.crm_new_salesOrder}
        />
        {/* ------- /Inventory Enquiry------- */}
        <Route
          exact
          path={url.inventoryEnquiryListPage}
          component={async.InventoryEnquiryList}
        />
        <Route
          path={`${url.inventoryEnquiryListPage}/:id`}
          component={async.InventoryEnquiryForm}
        />
        <Route
          path={url.inventoryEnquiryViewPage}
          component={async.InventoryEnquiryForm}
        />

        {/* ------- Commercial Settings Page------- */}
        <Route
          path={url.commercialSettingsPage}
          component={async.commercialSettings}
        />

        {/* ------- /Accounts ------- */}
        <Route
          exact
          path={url.accountListPage}
          component={async.crm_account_list}
        />
        <Route path={url.accountNewPage} component={async.crm_new_account} />
        <Route
          path={url.accountImportPage}
          component={async.crm_import_account}
        />
        <Route
          exact
          path={`${url.accountListPage}/:id`}
          component={async.crm_single_account}
        />
        <Route
          path={`${url.accountListPage}/:id/edit`}
          component={async.crm_edit_account}
        />

        <Route
          exact
          path={url.configListPage}
          component={async.crm_config_list}
        />

        <Route
          exact
          path={url.paymentListPage}
          component={async.crm_payment_list}
        />
           

        {/* ------- /404 ------- */}
        <Redirect to="/404" />
      </Switch>
    </div>
  )
}

export default crmSwitcher
