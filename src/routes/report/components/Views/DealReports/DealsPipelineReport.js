import React from "react";
import { connect } from "react-redux";
import ReportContainer from "../../ReportContainer";
import RctSectionLoader from "Components/RctSectionLoader";
// Charts
import DealsPipelineChart from "Components/Charts/DealsPipelineChart";
// Action
import { getDealsPipeline } from "Ducks/report";

function DealsPipelineReport(props) {
  const { loading, data } = props.dealsPipeline;
  return (
    <React.Fragment>
      {loading && <RctSectionLoader />}
      <ReportContainer handleSubmit={props.getDealsPipeline}>
        {data ? (
          <DealsPipelineChart data={data} />
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
  const { dealsPipeline } = reportState.dealsReport;
  return { dealsPipeline };
};

export default connect(
  mapStateToProps,
  { getDealsPipeline }
)(DealsPipelineReport);
