import React from "react";
import { ReportDefaultMessage } from "../DefaultMessages";

// Deal Reports
import DealsByOwnerReport from "./DealReports/DealsByOwnerReport";
// import DealsByTypeReport from "./DealReports/DealsByTypeReport";
import DealsPipelineReport from "./DealReports/DealsPipelineReport";
import DealsBySourceReport from "./DealReports/DealsBySourceReport";

// Closed Deal Reports
// import WonByOwnerReport from "./ClosedDealReports/WonByOwnerReport";

// Acct Cust Reports
// import TopSpenderAccountReport from "./AcctCustReports/TopSpenderAccountReport";
import TopSpenderCustomerReport from "./AcctCustReports/TopSpenderCustomerReport";

// Individual Report
import IndividualReport from "./IndividualReport";

// Sales Report
import CommissionReport from "./SalesReports/CommissionReport";
import TopSellingProductReport from "./SalesReports/TopSellingProductReport";

const Reports = {
  // Deals Report
  dealsByOwner: DealsByOwnerReport,
  // dealsByType: DealsByTypeReport,
  dealsPipeline: DealsPipelineReport,
  dealsBySource: DealsBySourceReport,

  // // Closed Deals
  // wonByOwner: WonByOwnerReport,
  // lostDealsReason: ReportDefaultMessage,

  // Acct Cust Report
  // topSpenderAccount: TopSpenderAccountReport,
  topSpenderCustomer: TopSpenderCustomerReport,

  // Customer Analysis
  custDemographic: ReportDefaultMessage,

  // Sales
  topSeller: TopSellingProductReport,
  commission: CommissionReport,
  individualReport: IndividualReport
};

const ReportRender = ({ componentToRender }) => {
  const Handler = Reports[componentToRender] || ReportDefaultMessage;
  return <Handler />;
};
export default ReportRender;
