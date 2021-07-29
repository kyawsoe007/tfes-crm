import React from "react";
import { connect } from "react-redux";
import ReportContainer from "../../../ReportContainer";
import RctSectionLoader from "Components/RctSectionLoader";
// Charts
import CommissionReportChart from "./chart";
// Action
import { getCommissionReport } from "Ducks/report";

function CommissionReport(props) {
  const { loading, data } = props.commsReport;
  return (
    <React.Fragment>
      {loading && <RctSectionLoader />}
      <ReportContainer handleSubmit={props.getCommissionReport}>
        {data ? (
          <CommissionReportChart data={data} />
        ) : (
          <p className="text-muted text-center">
            <i>No Records</i>
          </p>
        )}
      </ReportContainer>
    </React.Fragment>
  );
}

const mapStateToProps = ({ reportState }) => {
  const { commsReport } = reportState.salesReport;
  return { commsReport };
};

export default connect(mapStateToProps, { getCommissionReport })(
  CommissionReport
);
