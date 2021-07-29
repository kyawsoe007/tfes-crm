// crm routes
import {
  customer2ListPage,
  supplierListPage,
  quotationListPage,
  salesOrderListPage,
  purchaseListPage
} from "Helpers/crmURL";
import { 
  workOrderPage, 
  skuListPage, 
  stockListPage,
  deliveryOrderListPage,
  packingListPage } from "Helpers/warehouseURL";

export default [
  {
    url: "/app/dashboard",
    baseUrl: "/app/dashboard",
    name: "Dashboard",
    child_routes: []
  },
  {
    url: "/app/calendar",
    baseUrl: "/app/calendar",
    name: "Calendar",
    child_routes: []
  },
  
  {
    url: "/app/crm/customers2",
    baseUrl: "/app/crm",
    name: "CRM",
    child_routes: [
      {
        title: "sidebar.customers2",
        path: customer2ListPage
      },
      {
        title: "sidebar.supplier",
        path: supplierListPage
      },
      {
        title: "sidebar.purchase",
        path: purchaseListPage
      },
      {
        title: "sidebar.quotation",
        path: quotationListPage
      },
      {
        title: "sidebar.salesOrder",
        path: salesOrderListPage
      },
    ]
  },
  {
    url: "/app/reports",
    baseUrl: "/app/reports",
    name: "Reports",
    child_routes: []
  },
  {
    url: workOrderPage,
    baseUrl: "/app/warehouse",
    name: "Warehouse",
    child_routes: [
      {
        title: "sidebar.workOrders",
        path: workOrderPage
      },
      {
        title: "sidebar.SKU",
        path: skuListPage
      },
      {
        title: "sidebar.Stock",
        path: stockListPage
      },
      {
        title: "sidebar.packing",
        path: packingListPage
      },
      {
        title: "sidebar.deliveryOrder",
        path: deliveryOrderListPage
      },
      
    ]
  }
];





