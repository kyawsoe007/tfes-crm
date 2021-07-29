import React from "react";
import { connect } from "react-redux";
import ReportContainer from "../../../ReportContainer";
import RctSectionLoader from "Components/RctSectionLoader";
// Charts
import Chart from "./chart";
// Action
import { getTopSeller } from "Ducks/report";

function TopSellingProductReport(props) {
  const { loading, data } = props.topSeller;
  return (
    <React.Fragment>
      {loading && <RctSectionLoader />}
      <ReportContainer handleSubmit={props.getTopSeller}>
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
  const { topSeller } = reportState.salesReport;
  return { topSeller };
};

export default connect(mapStateToProps, { getTopSeller })(
  TopSellingProductReport
);
