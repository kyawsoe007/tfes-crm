//====================
// WAREHOUSE ROUTES
//====================

/**
 * StockExpense Pages
 */
 export const stockExpenseListPage = '/app/warehouse/stockExpense';
 export const stockExpenseSinglePage = stockExpenseListPage + '/new';
 export const singleStockExpense = (id) => `${stockExpenseListPage}/${id}`;

/**
 * Workorder Pages
 */
export const workOrderPage = "/app/warehouse/workorder";
export const workOrderSingle = (id) => `${workOrderPage}/${id}`;


/**
 * Inventory Pages
 */

export const skuListPage = "/app/warehouse/sku";
export const singleSKU = (id) => `${skuListPage}/${id}`;
export const skuNewPage = skuListPage + "/new";

export const stockListPage = "/app/warehouse/stock";
/**
 * Delivery Order Pages
 */
export const deliveryOrderListPage = '/app/warehouse/deliveryOrder';
export const deliveryOrderNewPage = deliveryOrderListPage + '/new';
export const singleDeliveryOrder = (id) => `${deliveryOrderListPage}/${id}`;
/**
 * Packing Pages
 */
export const packingListPage = '/app/warehouse/packing';
export const packingNewPage = packingListPage + '/new';
export const singlePacking = (id) => `${packingListPage}/${id}`;

/**
 * Warehouse Settings Pages
 */
 export const warehouseSettingsPage = '/app/warehouse/settings';
 export const warehouseSkuListViewPage = '/app/warehouse/settings/skuList';

 /**
 * Inventory Settings Pages
 */
export const inventorySettingsPage = '/app/warehouse/inventory/settings';
/**
 * Finance Settings Pages
 */





