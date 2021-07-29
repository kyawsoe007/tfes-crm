import React from "react";
import { connect } from "react-redux";
import ReportContainer from "../../ReportContainer";
import RctSectionLoader from "Components/RctSectionLoader";
// Charts
import LeadsBySourceChart from "Components/Charts/LeadsBySourceChart";
// Action
import { getLeadsBySource } from "Ducks/report";

function LeadsBySourceReport(props) {
  const { loading, data } = props.leadsBySource;
  return (
    <React.Fragment>
      {loading && <RctSectionLoader />}
      <ReportContainer handleSubmit={props.getLeadsBySource}>
        {data ? (
          <LeadsBySourceChart data={data} />
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
  const { leadsBySource } = reportState.leadsReport;
  return { leadsBySource };
};

export default connect(
  mapStateToProps,
  { getLeadsBySource }
)(LeadsBySourceReport);
