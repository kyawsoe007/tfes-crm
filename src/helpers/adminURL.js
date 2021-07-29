//====================
// ADMIN ROUTES
//====================

 
{/* ------- /Leave Management Tfes------- */}
export const leaveManagementListPage = "/app/admin/leaveManagement";
export const leaveManagementNewPage = leaveManagementListPage + "/new";
export const singleLeaveManagement = (id) => `${leaveManagementListPage}/${id}`;
  
{/* ------- /Expense Claims Tfes------- */}
export const expenseClaimsListPage = "/app/admin/expenseClaims";
export const expenseClaimsNewPage = expenseClaimsListPage + "/new";
export const singleExpenseClaims = (id) => `${expenseClaimsListPage}/${id}`;

 {/* ------- /Admin Setting Tfes------- */}
export const adminSettingListPage = "/app/admin/adminSetting";
export const adminSettingNewPage = adminSettingListPage + "/new";
export const singleEmployeeSetting = (id) => `${adminSettingListPage}/${id}`;