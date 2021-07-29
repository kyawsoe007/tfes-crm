import React from "react";
import { connect } from "react-redux";
import ReportContainer from "../../../ReportContainer";
import RctSectionLoader from "Components/RctSectionLoader";
// Charts
import Chart from "./chart";
// Action
import { getDealsBySource } from "Ducks/report";

function DealsBySourceReport(props) {
  const { loading, data } = props.dealsBySource;
  return (
    <React.Fragment>
      {loading && <RctSectionLoader />}
      <ReportContainer handleSubmit={props.getDealsBySource}>
        {data ? (
          <Chart data={data} />
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
  const { dealsBySource } = reportState.dealsReport;
  return { dealsBySource };
};

export default connect(mapStateToProps, { getDealsBySource })(
  DealsBySourceReport
);
