import React, { PureComponent } from "react";
import { connect } from "react-redux";
import ReportContainer from "../../ReportContainer";
import RctSectionLoader from "Components/RctSectionLoader";
import NumberFormat from "react-number-format";

// User Selction
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

// Charts
import PeriodSalesChart from "Components/Charts/PeriodSalesChart";
import DealsPipelineChart from "Components/Charts/DealsPipelineChart";
import LeadsByStatusChart from "Components/Charts/LeadsByStatusChart";
// Actions
import { getIndividualReport } from "Ducks/report";
import { getAllUsers } from "Ducks/setting/userManagement";

class IndividualReport extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { selected: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.userList.length < 1) this.props.getAllUsers();
  }
  handleChange(event) {
    this.setState(oldValues => ({
      ...oldValues,
      selected: event.target.value
    }));
  }
  handleSubmit(startDate, endDate) {
    this.props.getIndividualReport(startDate, endDate, this.state.selected);
  }

  render() {
    const { loading, data } = this.props.individualReport;
    const { selected } = this.state;
    return (
      <React.Fragment>
        {loading && <RctSectionLoader />}
        <ReportContainer
          additionalSelection={
            <TextField
              select
              label="User Report"
              value={selected}
              onChange={this.handleChange}
            >
              {this.props.userList.map((user, key) => (
                <MenuItem key={key} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </TextField>
          }
          handleSubmit={this.handleSubmit}
          noPads
        >
          <div className="mt-30">
            {data ? (
              <React.Fragment>
                <div className="mb-20 ml-15 d-flex">
                  Overview for <strong className="ml-5">{data.name}</strong>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <ul className="list-unstyled report-list">
                      <li>
                        <h4 className="heading mb-10">Total Deals</h4>
                        <h2>{data.totalDeals}</h2>
                      </li>
                      <li>
                        <h4 className="heading mb-10">Total Leads</h4>
                        <h2>{data.totalLeads}</h2>
                      </li>
                      <li>
                        <h4 className="heading mb-10">Account to Deal Ratio</h4>
                        <h2>{data.accountsToDeals}</h2>
                      </li>
                      <li>
                        <h4 className="heading mb-10">Open Deals Amount</h4>
                        <h2>
                          <NumberFormat
                            value={data.totalDealsAmount}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                          />
                        </h2>
                      </li>
                      <li>
                        <h4 className="heading mb-10">Total Deals Won</h4>
                        <h2>{data.totalDealsWon}</h2>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-8 vertical-self-center">
                    <div className="p-10">
                      <h4 className="heading mb-10">
                        Total Amount Closed in Set Period
                      </h4>
                      <h2
                        className="text-primary ml-30 fw-700"
                        style={{ fontSize: "2rem" }}
                      >
                        <NumberFormat
                          value={data.totalClosedAmount}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                        />
                      </h2>
                    </div>
                    <PeriodSalesChart
                      data={data.salesData}
                      startDate={data.startDate}
                      endDate={data.endDate}
                    />
                  </div>
                </div>
                <hr />
                <div className="mb-20 ml-15 d-flex">
                  <strong>{data.name}</strong>'s Pipeline
                </div>
                <div className="row">
                  <div className="col-12">
                    <DealsPipelineChart data={data.pipeline} />
                  </div>
                </div>
                <hr />
                <div className="mb-20 ml-15 d-flex">
                  <strong>{data.name}</strong>'s Leads Status
                </div>
                <div className="row">
                  <div className="col-12">
                    <LeadsByStatusChart data={data.leadStatus} />
                  </div>
                </div>
              </React.Fragment>
            ) : (
              <p className="text-muted text-center">
                <i>No Records</i>
              </p>
            )}
          </div>
        </ReportContainer>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ reportState, usersState }) => {
  const { individualReport } = reportState;
  const { userList } = usersState;
  return { individualReport, userList };
};

export default connect(
  mapStateToProps,
  { getIndividualReport, getAllUsers }
)(IndividualReport);
