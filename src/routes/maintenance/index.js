import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// async components
import * as async from "./AsyncRoutes";
import * as url from "Helpers/maintenanceURL";

function acctSwitcher() {

  return (
    <div className="saas-dashboard">
      <Switch>
        {/* ------- /Account Maintenance ------- */}
      
        <Route
          path={url.userProfilePage}
          component={async.UserMaintenanceProfileSetting}
        />
        <Route
          path={url.UserListPage}
          component={async.UserMaintenanceListView}
        />
        <Route
          exact
          path={url.RoleListPage}
          component={async.RolesMaintenanceListView}
        />

        <Route
          exact
          path={url.generalSettingsPage}
          component={async.GeneralSettingsListView}
        />

        {/* ------- /404 ------- */}
        <Redirect to="/404" />
      </Switch>
    </div>
  );
}

export default acctSwitcher;
