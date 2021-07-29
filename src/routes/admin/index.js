import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

// async components
import * as async from './AsyncRoutes'
import * as url from 'Helpers/adminURL'

function crmSwitcher() {
  return (
    <div className="saas-dashboard">
      <Switch>
        {/* ------- /Leave Management Tfes------- */}
          <Route
            exact
            path={url.leaveManagementListPage}
            component={async.LeaveManagementListView}
          />
          <Route
            path={url.leaveManagementNewPage}
            component={async.LeaveManagementFormView}
          />
          <Route
            exact
            path={`${url.leaveManagementListPage}/:id`}
            component={async.LeaveManagementFormView}
          />

       
        {/* ------- /Expense Claims Tfes------- */}
          <Route
              exact
              path={url.expenseClaimsListPage}
              component={async.ExpenseClaimsListView}
            />
            <Route
              path={url.expenseClaimsNewPage}
              component={async.ExpenseClaimsFormView}
            />
            <Route
              exact
              path={`${url.expenseClaimsListPage}/:id`}
              component={async.ExpenseClaimsFormView}
            />

        {/* ------- /Admin Setting Tfes------- */}
          <Route
              exact
              path={url.adminSettingListPage}
              component={async.AdminSettingListView}
            />
            <Route
              path={url.adminSettingNewPage}
              component={async.AdminSettingFormView}
            />
            <Route
              exact
              path={`${url.adminSettingListPage}/:id`}
              component={async.AdminSettingFormView}
            />
       
        <Redirect to="/404" />
      </Switch>
    </div>
  )
}

export default crmSwitcher
