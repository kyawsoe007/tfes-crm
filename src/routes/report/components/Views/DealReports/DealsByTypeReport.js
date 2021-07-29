import React from "react";
import { connect } from "react-redux";
import ReportContainer from "../../ReportContainer";
import RctSectionLoader from "Components/RctSectionLoader";
// Charts
import DealsByTypeChart from "Components/Charts/DealsByTypeChart";
// Action
import { getDealsByType } from "Ducks/report";

function DealsByTypeReport(props) {
  const { loading, data } = props.dealsByType;
  return (
    <React.Fragment>
      {loading && <RctSectionLoader />}
      <ReportContainer handleSubmit={props.getDealsByType}>
        {data ? (
          <DealsByTypeChart data={data} />
        ) : (
          <p className="text-center text-muted">
            <i>No Records</i>
          </p>
        )}
      </ReportContainer>
    </React.Fragment>
  );
}

const mapStateToProps = ({ reportState }) => {
  const { dealsByType } = reportState.dealsReport;
  return { dealsByType };
};

export default connect(
  mapStateToProps,
  { getDealsByType }
)(DealsByTypeReport);
