/**
 * Initialise Modules
 */

import HomebaseComponent from "Routes/homebase/AsyncRoutes";
import CalendarComponent from "Routes/calendar/AsyncRoutes";
import DashboardComponent from "Routes/dashboard/AsyncRoutes";
import ReportComponent from "Routes/report/AsyncRoutes";
import workOrders from "Routes/warehouse/AsyncRoutes";



import admin from "Routes/admin";
import crm from "Routes/crm";
import warehouse from "Routes/warehouse";
import accounting from "Routes/accounting";
// import Setting from "Routes/setting";
import maintenance from "Routes/maintenance";

export default [
  {
    path: "homebase",
    component: HomebaseComponent
  },
  {
    path: "crm",
    component: crm
  },
  {
    path: "admin",
    component: admin
  },
  
  {
    path: "reports",
    component: ReportComponent
  },
  {
    path: "calendar",
    component: CalendarComponent
  },
  {
    path: "dashboard",
    component: DashboardComponent
  },
  // {
  //   path: "settings",
  //   component: Setting
  // },
  {
    path: "warehouse",
    component: warehouse
  },
  {
    path: "accounting",
    component: accounting
  },
  {
    path: "maintenance",
    component: maintenance
  },
];
