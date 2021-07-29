/**
 * App Reducers
 */
import { combineReducers } from "redux";
import { reducer as modal } from "redux-modal";

// session
import {
  AuthReducer,
  RegisterReducer,
  ForgetPasswordReducer
} from "Ducks/session";

// accounting
import {
  // AccountingReducer,
  JournalReducer,
  CapexReducer,
  DebitNoteReducer,
  DepositReducer,
} from "Ducks/accounting";

import {
  AdminSettingReducer,
  LeaveManagementReducer
} from "Ducks/admin";

import {
  GeneratingReportReducer
} from "Ducks/generatingReport"

// crm
import {
  LeadReducer,
  CustomerReducer,
  AccountReducer,
  DealReducer,
  CrmFieldReducer,
  OnlinePaymentReducer,
  ConfigReducer
} from "Ducks/crm";

//cms
import {
  BannerReducer,
  FeaturedReducer,
  CarReducer,
  BlogReducer,
  ConfigOptionsReducer,
  FooterReducer
} from "Ducks/cms";

import {
  PaymentTermsReducer,
  DownPaymentsReducer,
  CreditLimitsReducer,
  CreditTermsReducer,
  CurrencesReducer,
  FiscalYearsReducer,
  AccountJournalsReducer,
  PurchaseSettingsReducer,
  PaymentMethodsReducer,
  ProfitAndLossReducer,
  BalanceSheetReducer
} from "Ducks/finance-settings"

//inventory
import {
  ProductReducer
} from "Ducks/inventory";

//stocktfes
import { StockReducer } from "Ducks/stocktfes";
//Stock ExpenseSaga TFES
import { StockExpenseReducer } from "Ducks/stockexpensetfes";

//producttfes
import {
  ProducttfesReducer
} from "Ducks/producttfes";

//customertfes
import {
  CustomertfesReducer
} from "Ducks/customertfes";

//suppliertfes
import {
  SuppliertfesReducer
} from "Ducks/suppliertfes";

//quotationtfes
import {
  PurchasetfesReducer
} from "Ducks/purchasetfes";

//quotationtfes
import {
  QuotationtfesReducer
} from "Ducks/quotationtfes";

import {
  WorkordertfesReducer
} from "Ducks/workorders";

import {
  WorkpickingorderstfesReducer
} from "Ducks/workpickingorders"

import {
  DeliveryorderstfesReducer
} from "Ducks/deliveryordertfes"

import {
  MaintenancetfesReducer
} from "Ducks/maintenancetfes"

import {
  WarehouseSettingsReducer
} from "Ducks/warehouse/warehouseSettings"
import {
  IncoTermsReducer
} from "Ducks/warehouse/incoTerm"

import {
  InventorySettingsReducer
} from "Ducks/warehouse/inventorySettings"

import {
  DiscountSettingsReducer 
} from "Ducks/discounttfes"

//invoicetfes
import {
  InvoicetfesReducer
} from "Ducks/invoicetfes";
//Loan Management tfes
import {
  LoanReducer
} from "Ducks/loanManagement";

import {
  SupplierInvoiceReducer
} from "Ducks/supplier-invoice"
//CreditNotetfes
import {
  CreditNotetfesReducer
} from "Ducks/creditnotetfes";

//paymenttfes
import {
  PaymenttfesReducer
} from "Ducks/paymenttfes";

import {SupplierPaymentReducer} from "Ducks/supplier-payment"
//salesordertfes
import {
  SalesOrdertfesReducer
} from "Ducks/salesordertfes";

import {
  PackingReducer
} from "Ducks/packing";

//AccountItem
import {
  AccountItemReducer
} from "Ducks/account-item";

// upload file
import { UploadFileReducer } from "Ducks/uploadFile"

// expense claims 
import { ExpenseClaimsReducer } from "Ducks/expenseClaims"

// Marketing
import { MailReducer } from "Ducks/marketing/mail";
import { CampaignReducer } from "Ducks/marketing/campaign";
import { TemplateReducer } from "Ducks/marketing/template";

// follow ups
import { FollowupReducer } from "Ducks/followUp";

//settings
import {
  UserManagementReducer,
  RolesReducer,
  WebsiteSettingsReducer,
  CommissionReducer,
  EmailSettingsReducer,
} from "Ducks/setting";

// system
import { ReportReducer } from "Ducks/report";
import { CalendarReducer } from "Ducks/calendar";
import { WidgetReducer } from "Ducks/widget";

// Call To Action
import { AnnouncementReducer } from "Ducks/CallToAction";

// Bookings
import { BookingReducer } from "Ducks/booking";

// Configurator
import { ConfiguratorReducer } from "Ducks/configurator";

// Rental
import { RentalReducer } from "Ducks/rental";

//User
import {UserReducer} from "Ducks/user"
import { ApprovalRightsReducer,SaleTargetsReducer } from "Ducks/general-setting";

const reducers = combineReducers({
  sessionState: combineReducers({
    authState: AuthReducer,
    registerState: RegisterReducer,
    forgetPasswordState: ForgetPasswordReducer
  }),
  crmState: combineReducers({
    leadState: LeadReducer,
    customerState: CustomerReducer,
    accountState: AccountReducer,
    dealState: DealReducer,
    crmField: CrmFieldReducer,
    onlinepaymentState: OnlinePaymentReducer,
    configState: ConfigReducer
  }),
  cmsState: combineReducers({
    bannerState: BannerReducer,
    featuredState: FeaturedReducer,
    carState: CarReducer,
    blogState: BlogReducer,
    footerState: FooterReducer,
    configState: ConfigOptionsReducer
  }),
  financeState: combineReducers({
    PaymentTermsState: PaymentTermsReducer,
    CreditTermsState: CreditTermsReducer,
    CreditLimitsState: CreditLimitsReducer,
    DownPaymentsState:DownPaymentsReducer,
    CurrencesState:CurrencesReducer,
    FiscalYearsState:FiscalYearsReducer,
    AccountJournalsState:AccountJournalsReducer,
    PurchaseSettingsState:PurchaseSettingsReducer,
    PaymentMethodsState:PaymentMethodsReducer,
    ProfitAndLossState: ProfitAndLossReducer,
    BalanceSheetState: BalanceSheetReducer
  }),
  generalState: combineReducers({
    ApprovalRightsState:ApprovalRightsReducer,
    SaleTargetsState:SaleTargetsReducer
  }),
  inventoryState: ProductReducer,
  stocktfesState: StockReducer,           //stock stuff
  stocktexpensetfesState: StockExpenseReducer,           //stock expense stuff
  producttfesState: ProducttfesReducer,
  customertfesState: CustomertfesReducer, // Customer stuff
  suppliertfesState: SuppliertfesReducer, // Supplier stuff
  purchasetfesState: PurchasetfesReducer, //Purchase stuff
  quotationtfesState: QuotationtfesReducer, // Quotation stuff
  salesorderState: SalesOrdertfesReducer, // SalesOrder Stuff,
  invoiceState: InvoicetfesReducer, // Invoice Stuff
  LoanManagementState: LoanReducer, // Loan Management Stuff
  supplierinvoiceState:SupplierInvoiceReducer,
  creditNoteState: CreditNotetfesReducer, //Credit Note Stuff
  paymentState: PaymenttfesReducer, //Payment Stuff
  supplierPaymentState:SupplierPaymentReducer,
  workorderState: WorkordertfesReducer, //WorkOrder Stuff
  workpickingorderState: WorkpickingorderstfesReducer, //workPickingOrder Stuff
  deliveryorderState: DeliveryorderstfesReducer, //deliveryORder stuff
  packinglistState: PackingReducer,//PackingList
  accountItemState:AccountItemReducer,
  userState:UserReducer,//user
  maintenanceState: MaintenancetfesReducer, //maintenance roles stuff 
  warehouseSettingsState: WarehouseSettingsReducer, // warehouse settings stuff 
  discountSettingsState: DiscountSettingsReducer,
  incoTermsState:IncoTermsReducer,
  inventorySettingsState: InventorySettingsReducer, // inventory setting
  generatingReportingState: GeneratingReportReducer,
  fileUploadState: UploadFileReducer,
  expenseClaimsState: ExpenseClaimsReducer,
  debitnoteState: DebitNoteReducer,
  depositState: DepositReducer,
  accountingState: combineReducers({
    journalState: JournalReducer,
    capexState:CapexReducer
    // accountState: AccountingReducer
  }),
  adminState: combineReducers({
    adminSettingState: AdminSettingReducer,
    leaveManagementState: LeaveManagementReducer
  }),
  marketingState: combineReducers({
    mailState: MailReducer,
    campaignState: CampaignReducer,
    templateState: TemplateReducer
  }),
  configuratorState: ConfiguratorReducer,
  followupState: FollowupReducer,
  announcementState: AnnouncementReducer,
  widgetState: WidgetReducer,
  reportState: ReportReducer,
  calendarState: CalendarReducer,
  usersState: UserManagementReducer,
  rolesState: RolesReducer,
  bookingState: BookingReducer,
  modal,
  webSettingsState: WebsiteSettingsReducer,
  commissionState: CommissionReducer,
  rentalState: RentalReducer,
  EmailSettingsState: EmailSettingsReducer
});

export default reducers;
