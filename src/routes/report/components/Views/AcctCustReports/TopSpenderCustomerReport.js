import React from "react";
import { connect } from "react-redux";
import ReportContainer from "../../ReportContainer";
import RctSectionLoader from "Components/RctSectionLoader";
// Charts
import TopSpenderCustomerChart from "Components/Charts/TopSpenderCustomerChart";
// Actions
import { getTopSpenderCustomer } from "Ducks/report";

function TopSpenderCustomerReport(props) {
  const { loading, data } = props.topSpenderCustomer;
  return (
    <React.Fragment>
      {loading && <RctSectionLoader />}
      <ReportContainer handleSubmit={props.getTopSpenderCustomer}>
        {data ? (
          <TopSpenderCustomerChart data={data} />
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
  const { topSpenderCustomer } = reportState.acctcustReport;
  return { topSpenderCustomer };
};

export default connect(
  mapStateToProps,
  { getTopSpenderCustomer }
)(TopSpenderCustomerReport);
