import React from 'react'
import Loadable from 'react-loadable'

// rct page loader
import RctPageLoader from 'Components/RctPageLoader'

/**
 * Customer2 Routes
 */
export const crm_customer_list = Loadable({
  loader: () => import('./customer'),
  loading: () => <RctPageLoader />,
})
export const crm_single_customer = Loadable({
  loader: () => import('./customer/view'),
  loading: () => <RctPageLoader />,
})
export const crm_new_customer = Loadable({
  loader: () => import('./customer/new'),
  loading: () => <RctPageLoader />,
})
/**
 * Supplier Routes
 */
export const crm_supplier_list = Loadable({
  loader: () => import("./supplier"),
  loading: () => <RctPageLoader />
});
export const crm_new_supplier = Loadable({
  loader: () => import("./supplier/new"),
  loading: () => <RctPageLoader />
});
// export const crm_single_supplier = Loadable({
//   loader: () => import("./supplier/view"),
//   loading: () => <RctPageLoader />
// });
/**
 * Purchase Routes
 */
export const crm_purchase_list = Loadable({
  loader: () => import('./purchase'),
  loading: () => <RctPageLoader />,
})
export const crm_new_purchase = Loadable({
  loader: () => import('./purchase/new'),
  loading: () => <RctPageLoader />,
})

// export const crm_single_purchase = Loadable({
//   loader: () => import("./purchase/view"),
//   loading: () => <RctPageLoader />
// });

/**
 * Quotation Routes
 */
export const crm_quotation_list = Loadable({
  loader: () => import('./quotation'),
  loading: () => <RctPageLoader />,
})
export const crm_new_quotation = Loadable({
  loader: () => import('./quotation/new'),
  loading: () => <RctPageLoader />,
})
// export const crm_single_quotation = Loadable({
//   loader: () => import("./quotation/view"),
//   loading: () => <RctPageLoader />
// });
// export const crm_quotationBom_page = Loadable({
//   loader: () => import('./quotation/new/components/material'),
//   loading: () => <RctPageLoader />,
// })
/**
 * Sales Order Routes
 */
export const crm_salesOrder_list = Loadable({
  loader: () => import('./salesOrder'),
  loading: () => <RctPageLoader />,
})
export const crm_new_salesOrder = Loadable({
  loader: () => import('./salesOrder/new'),
  loading: () => <RctPageLoader />,
})
/**
 * Inventory Enquiry Routes
 */
export const InventoryEnquiryList = Loadable({
  loader: () => import('./inventoryEnquiry'),
  loading: () => <RctPageLoader />,
})
export const InventoryEnquiryForm = Loadable({
  loader: () => import('./inventoryEnquiry/view'),
  loading: () => <RctPageLoader />,
})

export const commercialSettings = Loadable({
  loader: () => import('./commercialSettings'),
  loading: () => <RctPageLoader />,
})



// export const crm_Bom_page = Loadable({
//   loader: () => import("./salesOrder/new/components/material"),
//   loading: () => <RctPageLoader />
// });

/**
 * Account Routes
 */
// export const crm_account_list = Loadable({
//   loader: () => import('./account'),
//   loading: () => <RctPageLoader />,
// })
// export const crm_single_account = Loadable({
//   loader: () => import('./account/view'),
//   loading: () => <RctPageLoader />,
// })
// export const crm_new_account = Loadable({
//   loader: () => import('./account/new'),
//   loading: () => <RctPageLoader />,
// })
// export const crm_edit_account = Loadable({
//   loader: () => import('./account/edit'),
//   loading: () => <RctPageLoader />,
// })
// export const crm_import_account = Loadable({
//   loader: () => import('./account/import'),
//   loading: () => <RctPageLoader />,
// })


/**
 * Deal Routes
 */

// export const crm_deal_list = Loadable({
//   loader: () => import("./deal"),
//   loading: () => <RctPageLoader />
// });
// export const crm_single_deal = Loadable({
//   loader: () => import("./deal/view"),
//   loading: () => <RctPageLoader />
// });
// export const crm_new_deal = Loadable({
//   loader: () => import("./deal/new"),
//   loading: () => <RctPageLoader />
// });
// export const crm_edit_deal = Loadable({
//   loader: () => import("./deal/edit"),
//   loading: () => <RctPageLoader />
// });
// export const crm_import_deal = Loadable({
//   loader: () => import("./deal/import"),
//   loading: () => <RctPageLoader />
// });

// export const crm_config_list = Loadable({
//   loader: () => import("./carconfig"),
//   loading: () => <RctPageLoader />
// });

// export const crm_payment_list = Loadable({
//   loader: () => import("./payment"),
//   loading: () => <RctPageLoader />
// });
