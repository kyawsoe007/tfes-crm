import React from 'react'
import Loadable from 'react-loadable'

// rct page loader
import RctPageLoader from 'Components/RctPageLoader'

{/* ------- /Leave Management Tfes------- */}
export const LeaveManagementListView = Loadable({
  loader: () => import('./leaveManagement'),
  loading: () => <RctPageLoader />,
})
export const LeaveManagementFormView = Loadable({
  loader: () => import('./leaveManagement/new'),
  loading: () => <RctPageLoader />,
})

{/* ------- /Expense Claims Tfes------- */}
export const ExpenseClaimsListView = Loadable({
  loader: () => import('./expenseClaims'),
  loading: () => <RctPageLoader />,
})
export const ExpenseClaimsFormView = Loadable({
  loader: () => import('./expenseClaims/new'),
  loading: () => <RctPageLoader />,
})
{/* ------- /Admin Setting Tfes------- */}
export const AdminSettingListView = Loadable({
  loader: () => import('./adminSetting'),
  loading: () => <RctPageLoader />,
})
export const AdminSettingFormView = Loadable({
  loader: () => import('./adminSetting/new'),
  loading: () => <RctPageLoader />,
})
