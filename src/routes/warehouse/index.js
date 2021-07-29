import React, { Component, Fragment } from "react";
import { Route, Switch, Redirect } from 'react-router-dom';

// async components
import * as async from './AsyncRoutes';
import * as url from 'Helpers/warehouseURL';
// import * as url2 from 'Helpers/inventoryURL';


function warehouseSwitcher() {
  return (
    <div className="saas-dashboard">
      <Switch>
          {/* ------- StockExpense ------- */}
          <Route
          exact
          path={url.stockExpenseListPage}
          component={async.StockExpenseListView}
        />

        <Route
          exact
          path={`${url.stockExpenseListPage}/:id`}
          component={async.StockExpenseFormView}
        />

        <Route
          exact
          path={url.stockExpenseSinglePage}
          component={async.StockExpenseFormView}
        />

        {/* ------- Work Order ------- */}
        <Route
          exact
          path={url.workOrderPage}
          component={async.warehouse_workOrders}
        />

        <Route
          exact
          path={`${url.workOrderPage}/:id`}
          component={async.warehouse_workOrderSingle}
        />

        <Route
          exact
          path={url.skuListPage}
          component={async.skuListPageView}
        />

        <Route 
          exact 
          path={url.skuNewPage} 
          component={async.SkuNew} 
        />

        <Route 
          exact 
          path={`${url.skuListPage}/:id`} 
          component={async.SkuNew} />

        <Route
          exact
          path={url.stockListPage}
          component={async.stockListPageView}
        />

          <Route
            exact
            path={`${url.stockListPage}/:id`}
            component={async.StockOperation}
        />

        
         {/* ------- Packing ------- */}
         <Route
          exact
          path={url.packingListPage}
          component={async.packingListView}
        />
        <Route
          exact
          path={url.packingNewPage}
          component={async.packingFormView}
        />
        <Route
          exact
          path={`${url.packingNewPage}/:id`}
          component={async.packingFormView}
        />

         {/* ------- Delivery Order ------- */}
        <Route
          exact
          path={url.deliveryOrderListPage}
          component={async.deliveryOrderListView}
        />

        <Route
          exact
          path={`${url.deliveryOrderListPage}/:id`}
          component={async.deliveryOrderFormView}
        />

        <Route
          exact
          path={url.deliveryOrderNewPage}
          component={async.deliveryOrderFormView}
        />

        {/* ------- Warehouse Settings ------- */}
        <Route
          exact
          path={url.warehouseSettingsPage}
          component={async.warehouseSettingsView}
        />
        <Route
          exact
          path={url.warehouseSkuListViewPage}
          component={async.warehouseSkuListView}
        />
       

        
        {/* ------- Inventory Settings ------- */}
        <Route
          exact
          path={url.inventorySettingsPage}
          component={async.inventorySettingsView}
        />

        


        {/* ------- /404 ------- */}
        {/* <Redirect to="/404" /> */}
      </Switch>
    </div>
  )
}

export default warehouseSwitcher

