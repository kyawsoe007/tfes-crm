import React from "react";
import Loadable from "react-loadable";

// rct page loader
import RctPageLoader from "Components/RctPageLoader";

// Account Maintenance
export const UserMaintenanceListView = Loadable({
  loader: () => import("./userMaintenance"),
  loading: () => <RctPageLoader />
});
export const UserMaintenanceProfileSetting = Loadable({
  loader: () => import("./userProfile"),
  loading: () => <RctPageLoader />
});

// Roles Maintenance 
export const RolesMaintenanceListView = Loadable({
  loader: () => import("./rolesMaintenance"),
  loading: () => <RctPageLoader />
});

// General Settings 
export const GeneralSettingsListView = Loadable({
  loader: () => import("./generalSettings"),
  loading: () => <RctPageLoader />
});







