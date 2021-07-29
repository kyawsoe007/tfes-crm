import React from "react";
import { connect } from "react-redux";
import ReportContainer from "../../ReportContainer";
import RctSectionLoader from "Components/RctSectionLoader";
// Charts
import DealsByOwnerChart from "Components/Charts/DealsByOwnerChart";
// Actions
import { getDealsByOwner } from "Ducks/report";

function DealsByOwnerReport(props) {
  const { loading, data } = props.dealsByOwner;
  return (
    <React.Fragment>
      {loading && <RctSectionLoader />}
      <ReportContainer handleSubmit={props.getDealsByOwner}>
        {data ? (
          <DealsByOwnerChart data={data} />
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
  const { dealsByOwner } = reportState.dealsReport;
  return { dealsByOwner };
};

export default connect(
  mapStateToProps,
  { getDealsByOwner }
)(DealsByOwnerReport);
