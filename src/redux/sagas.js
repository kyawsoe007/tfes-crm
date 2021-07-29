/**
 * Root Sagas
 */
import { all } from "redux-saga/effects";

// accounting
import {
  CreditNoteSaga,
  JournalSaga,
  CapexSaga,
  DebitNoteSaga,
  DepositSaga,
} from "Ducks/accounting";

import {
  GeneratingReportSaga
} from "Ducks/generatingReport"

import {
  AdminSettingSaga,
  LeaveManagementSaga
} from "Ducks/admin"

//  crm
import {
  LeadSaga,
  CustomerSaga,
  AccountSaga,
  DealSaga,
  CrmFieldSaga,
  OnlinePaymentSaga,
  ConfigSaga
} from "Ducks/crm";

//cms
import {
  BannerSaga,
  FeaturedSaga,
  CarSaga, BlogSaga,
  ConfigOptionsSaga,
  FooterSaga
} from "Ducks/cms";

import {
  PaymentTermsSaga,
  DownPaymentsSaga,
  CreditTermsSaga,
  CreditLimitsSaga,
  CurrencesSaga,
  FiscalYearsSaga,
  AccountJournalsSaga,
  PurchaseSettingsSaga,
  PaymentMethodsSaga,
  ProfitAndLossSaga,
  BalanceSheetSaga,
} from "Ducks/finance-settings"

//inventory
import {
  ProductSaga
} from "Ducks/inventory";

//STOCKTFES
import { StockSaga } from "Ducks/stocktfes";
//Stock ExpenseSaga TFES
import { StockExpenseSaga } from "Ducks/stockexpensetfes";

//TFES
import {
  CustomertfesSaga
} from "Ducks/customertfes";
//CUSTOMERTFES
import {
  ProducttfesSaga
} from "Ducks/producttfes";
//SUPPLIERTFES
import {
  SuppliertfesSaga
} from "Ducks/suppliertfes"
import {
  PurchasetfesSaga
} from "Ducks/purchasetfes"
//QUOTATIONTFES
import {
  QuotationtfesSaga
} from "Ducks/quotationtfes"
//SALESORDERTFES
import {
  SalesOrdertfesSaga
} from "Ducks/salesordertfes"

//INVOICETFES
import {
  InvoicetfesSaga
} from "Ducks/invoicetfes"
//Loan tfes
import {
  LoanSaga
} from "Ducks/loanManagement"

import {
  SupplierInvoiceSaga
} from "Ducks/supplier-invoice"
//CREDITNOTETFES
import {
  CreditNotetfesSaga
} from "Ducks/creditnotetfes"

//PAYMENTTFES
import {
  PaymenttfesSaga
} from "Ducks/paymenttfes"

//Packing
import {
  PackingSaga
} from "Ducks/packing"

//AccountItem
import {
  AccountItemSaga
} from "Ducks/account-item"

//WORKORDERS
import { WorkordertfesSaga } from "Ducks/workorders"
import { WorkpickingorderstfesSaga } from "Ducks/workpickingorders"

//UPLOAD
import { UploadFileSaga } from "Ducks/uploadFile"

//DeliveryOrders
import { DeliveryorderstfesSaga } from "Ducks/deliveryordertfes"

//Maintenance 
import { MaintenancetfesSaga } from "Ducks/maintenancetfes";

// Wwareshouse Settings 
import { WarehouseSettingsSaga } from "Ducks/warehouse/warehouseSettings";

import { InventorySettingsSaga } from "Ducks/warehouse/inventorySettings";

// Discount Settings 
import { DiscountSettingsSaga } from "Ducks/discounttfes";

import {IncoTermsSaga} from "Ducks/warehouse/incoTerm"

// expense claims 
import { ExpenseClaimsSaga } from "Ducks/expenseClaims";

//user
import { UserSaga } from "Ducks/user"

// marketing
import { MailSaga, CampaignSaga, TemplateSaga } from "Ducks/marketing";

// Call To Actions
import { AnnouncementSaga } from "Ducks/CallToAction";

// follow ups
import { FollowupSaga } from "Ducks/followUp";

// settings
import {
  UserManagementSaga,
  RolesSaga,
  WebsiteSettingsSaga,
  CommissionSaga,
  EmailSettingsSaga
} from "Ducks/setting";

// calendar
import { CalendarSaga } from "Ducks/calendar";

// session
import { ForgetPasswordSaga, RegisterSaga } from "Ducks/session";
import AuthSaga from "Ducks/session/auth/AuthSaga";

// reports
import { ReportSaga } from "Ducks/report";

// widgets
import { WidgetSaga } from "Ducks/widget";

// Booking
import { BookingSaga } from "Ducks/booking";

// Configurator
import { ConfiguratorSaga } from "Ducks/configurator";

// Rental
import { RentalSaga } from "Ducks/rental";

import { SupplierPaymentSaga } from "./ducks/supplier-payment";
import { ApprovalRightsSaga,SaleTargetsSaga } from "Ducks/general-setting";
export default function* rootSaga() {
  yield all([
    // Accounting
    CreditNoteSaga(),
    JournalSaga(),
    CapexSaga(),
    GeneratingReportSaga(),
    AdminSettingSaga(),
    LeaveManagementSaga(),
    // Loan Management TFES
    LoanSaga(),
    // CRM
    LeadSaga(),
    CustomerSaga(),
    AccountSaga(),
    DealSaga(),
    CrmFieldSaga(),
    OnlinePaymentSaga(),
    ConfigSaga(),

    //cms
    BannerSaga(),
    FeaturedSaga(),
    FooterSaga(),

    StockSaga(),
    ProductSaga(),
    StockExpenseSaga(),

    //finance-setting
    PaymentTermsSaga(),
    DownPaymentsSaga(),
    CreditLimitsSaga(),
    CreditTermsSaga(),

    //generalSetting
    ApprovalRightsSaga(),
    SaleTargetsSaga(),
    CurrencesSaga(),
    FiscalYearsSaga(),
    AccountJournalsSaga(),
    PurchaseSettingsSaga(),
    PaymentMethodsSaga(),
    ProfitAndLossSaga(),
    BalanceSheetSaga(),
    //tfes
    ProducttfesSaga(),
    CustomertfesSaga(),
    SuppliertfesSaga(),
    PurchasetfesSaga(),
    QuotationtfesSaga(),
    // SalesOrderSaga(),
    SalesOrdertfesSaga(),
    DiscountSettingsSaga(),
    //Invoice
    InvoicetfesSaga(),
    SupplierInvoiceSaga(),

    //Credit Note
    CreditNotetfesSaga(),
    DebitNoteSaga(),
    DepositSaga(),

    //Payment
    PaymenttfesSaga(),
    SupplierPaymentSaga(),
    //WAREHOUSE
    WorkordertfesSaga(),
    WorkpickingorderstfesSaga(),
    DeliveryorderstfesSaga(),
    MaintenancetfesSaga(),
    WarehouseSettingsSaga(),
    IncoTermsSaga(),
    InventorySettingsSaga(),
    //packing
    PackingSaga(),
    //Account
    AccountItemSaga(),
    //Expense Claims
    ExpenseClaimsSaga(),
    //user
    UserSaga(),
    // CMS
    CarSaga(),
    BlogSaga(),
    ConfigOptionsSaga(),

    UploadFileSaga(),

    // Marketing
    MailSaga(),
    CampaignSaga(),
    TemplateSaga(),

    // Follow ups
    FollowupSaga(),

    // Session
    AuthSaga(),
    ForgetPasswordSaga(),
    RegisterSaga(),

    // System
    ReportSaga(),
    WidgetSaga(),

    // Calendar
    CalendarSaga(),

    // Settings
    RolesSaga(),
    UserManagementSaga(),
    AnnouncementSaga(),
    WebsiteSettingsSaga(),
    CommissionSaga(),
    EmailSettingsSaga(),

    // Booking
    BookingSaga(),

    // Configurator
    ConfiguratorSaga(),

    RentalSaga()
  ]);
}
