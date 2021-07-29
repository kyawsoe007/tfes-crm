import React, { Component } from "react";
import { connect } from "react-redux";
import DataBlock from "./DataBlock";
// actions
import { getCrmSummary } from "Ducks/widget";
import moment from "moment";

class CrmSummary extends Component {
  componentDidMount() {
    this.props.getCrmSummary();
  }
  render() {
    const month = moment().format('MMMM');
    const startOfweek = moment().startOf('week').format('D/M ');
    const endOfweek  = moment().endOf('week').format('D/M');
    const { loading, data } = this.props.crmSummary;
    return (
      <div className="row">
        <div className="col">
          <DataBlock
            label={"New Leads this Week " + "(" + startOfweek + " - " + endOfweek + ")"}
            amount={data && data.totalLeads}
            loading={loading}
          />
        </div>
        <div className="col">
          <DataBlock
            loading={loading}
            label={"deals in pipeline"}
            amount={data && data.totalOpenDeals}
          />
        </div>
        <div className="col">
          <DataBlock
            loading={loading}
            label={"in the pipeline"}
            amount={data && data.openDealsAmount}
          />
        </div>
        <div className="col">
          <DataBlock
            loading={loading}
            label={'sales this month ' + "(" + month + ")" }
            amount={data && data.dealsWonAmount}
          />
        </div>
        {/* <div className="col">
          <DataBlock
            loading={loading}
            label={"in the pipeline"}
            amount={data && data.dealsWonAmount}
          />
        </div> */}
      </div>
    );
  }
}
const mapStateToProps = ({ widgetState }) => {
  const { crmSummary } = widgetState;
  return { crmSummary };
};

export default connect(
  mapStateToProps,
  { getCrmSummary }
)(CrmSummary);
