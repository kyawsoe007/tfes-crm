import React from "react";
import Loadable from "react-loadable";


// rct page loader
import RctPageLoader from "Components/RctPageLoader";
/**
 * Stock Expense Routes
 */
 export const StockExpenseListView = Loadable({
  loader: () => import('./stockExpense'),
  loading: () => <RctPageLoader />,
})
 export const StockExpenseFormView = Loadable({
  loader: () => import('./stockExpense/new'),
  loading: () => <RctPageLoader />,
})

/**
 * Work Order Routes
 */
export const warehouse_workOrders = Loadable({
  loader: () => import('./workorders'),
  loading: () => <RctPageLoader />,
})

export const warehouse_workOrderSingle = Loadable({
  loader: () => import('./workorders/workorderSingle'),
  loading: () => <RctPageLoader />,
})
/**
 * Inventory Order Routes
 */
export const skuListPageView = Loadable({
  loader: () => import('./SKU'),
  loading: () => <RctPageLoader />,
})

export const SkuNew = Loadable({
  loader: () => import("./SKU/new"),
  loading: () => <RctPageLoader />,
});



export const stockListPageView = Loadable({
  loader: () => import('./Stock'),
  loading: () => <RctPageLoader />,
})

export const StockOperation = Loadable({
  loader: () => import('./Stock/operation'),
  loading: () => <RctPageLoader />,
})
/**
 * Packing Routes
 */
export const packingListView = Loadable({
  loader: () => import('./packing'),
  loading: () => <RctPageLoader />,
})
export const packingFormView = Loadable({
  loader: () => import('./packing/new'),
  loading: () => <RctPageLoader />,
})

/**
 * Delivery Order Routes
 */
export const deliveryOrderListView = Loadable({
  loader: () => import('./deliveryOrder'),
  loading: () => <RctPageLoader />,
})
export const deliveryOrderFormView = Loadable({
  loader: () => import('./deliveryOrder/new'),
  loading: () => <RctPageLoader />,
})


/**
 * Wareshouse Settings Routes
 */
 export const warehouseSettingsView = Loadable({
  loader: () => import('./warehouseSettings'),
  loading: () => <RctPageLoader />,
})
 export const warehouseSkuListView = Loadable({
  loader: () => import('./warehouseSettings/skuList'),
  loading: () => <RctPageLoader />,
})


/**
 * Inventory Settings Routes
 */
 export const inventorySettingsView = Loadable({
  loader: () => import('./inventorySettings'),
  loading: () => <RctPageLoader />,
})



 
