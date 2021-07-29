import React, { Component } from "react";
// Sub components
import api from "Api";
import FormWrapper from "Components/Form/Layout/FormWrapper";
import FormInput from "Components/Form/FormInput";
import { connect } from "react-redux";
import { listOptions, getDateTime } from "Helpers/helpers";
import Button from "@material-ui/core/Button";
// React Day Picker input
import DayPickerInput from 'react-day-picker/DayPickerInput';

import { DateUtils } from 'react-day-picker';
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import 'moment/locale/en-SG'


class CreateLoanPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      amount: "",
      interestAmount: "",
      miscellaneous_amount: "",
      account: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onSubmit() {
    const data = {
      ...this.state
    };
    console.log(data);
    console.log("data",data);
    this.props.getInfo(data);
    this.props.toggle()
  }

  handleChange(field, value) {
    this.setState({ [field]: value });
  }

  checkDisabled() {
    return true;
  }

  render() {
    const { date, amount, interestAmount,miscellaneous_amount,account} = this.state;
    const accountItem =this.props.accountItem

    return (
      <div className="Popup_page" style={{height:350}}>
       {/* <form autoComplete="off"> */}
          <div class="top-container">
            <div class="row">
              <div class='col-sm-12 unvisibleBtn' style={{ textAlign: "center" }}>
                <h3>Make Loan Payment</h3>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-4 unvisibleBtn">
                <p
                  style={{
                    color: 'rgba(0, 0, 0, 0.54)',
                    padding: '0',
                    fontSize: '0.75rem',
                    fontFamily: ' Lato',
                    fontWeight: '400',
                    lineHeight: ' 1',
                    marginBottom: '1px'
                  }}
                >
                  Date
                      </p>
                <DayPickerInput
                  formatDate={formatDate}
                  parseDate={parseDate}
                  format="L"
                  // value={this.state.date}
                  value={`${formatDate(
                    date,
                    'L',
                    'en-SG'
                  )}`}
                  placeholder={`${formatDate(new Date(), 'L', 'en-SG')}`}
                  onDayChange={(e) => this.setState({ date: e })}
                  dayPickerProps={{
                    locale: 'en-SG',
                    localeUtils: MomentLocaleUtils
                  }}
                />
              </div>
              <div class="col-sm-4 unvisibleBtn">
                <FormInput
                  label="Amount"
                  value={amount}
                  target="amount"
                  type="Number"
                  handleChange={this.handleChange}
                />
              </div>
              <div class="col-sm-4 unvisibleBtn">
                <FormInput
                  label="Interest Amount"
                  value={interestAmount}
                  target="interestAmount"
                  type="Number"
                  handleChange={this.handleChange}
                />
              </div>
                <div class="col-sm-4 ">
                <FormInput
                 label="Miscellaneous Amount"
                 value={miscellaneous_amount}
                 target="miscellaneous_amount"
                 type="Number"
                 handleChange={this.handleChange}
                />
              </div>
              <div class="col-sm-4">
                <FormInput
                  label="Account"
                  value={account ? account : ''}
                  target="account"
                  selectValueKey="_id"
                  selectValueName="accountName"
                  selectValues={accountItem? accountItem : []}
                  handleChange={this.handleChange}
                  />
              </div>
            </div>
            <div class="row">
              <div class='col-sm-11 unvisibleBtn'></div>
              <div class='col-sm-1 unvisibleBtn' style={{ alignItems: "right" , paddingTop:"1rem"}}>
                <button
                  onClick={this.onSubmit}
                  style={{
                    width: 64,
                    height: 36,
                    color: "white",
                    border: 0,
                    cursor: "pointer",
                    display: "inline-flex",
                    outline: 0,
                    padding: 0,
                    position: "relative",
                    alignItems: "center",
                    borderRadius: 4,
                    verticalAlign: "middle",
                    justifyContent: "center",
                    backgroundColor: "#DF0021",
                    float: "right"
                  }}>
                  Save
                    </button>
              </div>
            </div>
          </div>
        {/* </form> */}
      </div >
    );
  }
}

const mapStateToProps = ({ }) => {
  return {};
};
export default connect(mapStateToProps, {
  
})(CreateLoanPayment);
