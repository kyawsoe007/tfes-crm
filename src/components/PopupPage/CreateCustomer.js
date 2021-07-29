import React, { Component } from "react";
// Sub components
import api from "Api";
import FormWrapper from "Components/Form/Layout/FormWrapper";
import FormInput from "Components/Form/FormInput";
import DialogRoot from "Components/Dialog/DialogRoot";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { show } from "redux-modal";
import { listOptions, getDateTime } from "Helpers/helpers";
import Button from "@material-ui/core/Button";
// Redux imports ACTIONS
import {
  setCustomerTfes,
  getCustomerTfesDetails,
  getFilterCustomerTfes,
  getCustomerTfes,
  getSingleCustomerRequest,
  patchSingleCustomerRequest,
} from "Ducks/customertfes";

// const INIT_STATE = {
//   // element: null,
//   name: '',
//   address: '',
// };

class CreateCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.customerName,
      address: this.props.address,
      salesPIC: this.props.buyerName,
      cusPICtel1b: this.props.telNo,
      cusPICMobile1b: this.props.faxNo,
      cusPICEmail: this.props.buyerEmail,
      incoterm: this.props.incoterm? this.props.incoterm : "",
      paymentTerm: this.props.paymentTerm ? this.props.paymentTerm : ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.getFilterCustomerTfes();
    this.props.getCustomerTfesDetails();
    // this.props.getSingleCustomerRequest();
    // this.props.setCustomerTfes();
  }

  onSubmit() {
    const data = {
      ...this.state
    };
    this.props.setCustomerTfes(data);
    let newCustomerNo  = this.props.customers.data.cusNo;
    this.props.getInfo(data, newCustomerNo);
  }

  handleChange(field, value) {
    this.setState({ [field]: value });
  }

  checkDisabled() {
    return true;
  }

  render() {
    const { cusNo, name, nickname, address, country, salesPIC, cusPICtel1a, cusPICtel1b, cusPICMobile1a, cusPICMobile1b, cusPICEmail } = this.state;
    const { acctPIC, acctPICtel1a, acctPICtel1b, acctPICMobile1b, acctPICMobile1a, acctPICEmail, cusPIC, incoterm, creditLimit, creditTerm } = this.state;
    const { downPayment, billingCurrency, gstReq, billingAddress, delAddress, tel1a, tel1b, fax1a, fax1b, paymentTerm, billingCountry, } = this.state;
    const { seqNum } = this.state;

    return (
      <div className="Popup_page">
        <FormWrapper
          onSave={this.onSubmit}
          disabled={this.checkDisabled()}
          title=""
          centerTitle={"Add New Customer"}
          promptMessage=" "
          edit="test"
          noBack={true}
          hiddenEdit="none"
          hiddenDuplicate="none"
          >
          <form autoComplete="off">
            <div class="top-container">
              <div class="row">
                <div class="col-sm-3 unvisibleBtn">
                  <FormInput
                    label="Cust. ID"
                    value={cusNo}
                    target="cusNo"
                    handleChange={this.handleChange}
                    hasButton={this.state.edit ? false : true}
                    readOnly={true}
                    buttonClick={this.buttonClick}
                  />
                </div>
                <div class="col-sm-6 unvisibleBtn">
                  <FormInput
                    label="Cust. Name"
                    value={name}
                    target="name"
                    handleChange={this.handleChange}
                    buttonClick={this.buttonClick}
                    hasButton={this.state.edit ? false : true}
                    originalVal={
                      this.props.singleCustomer.data
                        ? this.props.singleCustomer.data.name
                        : ""
                    }
                  />
                </div>
                <div class="col-sm-3 unvisibleBtn">
                  <FormInput
                    label="Nickname"
                    value={nickname}
                    target="nickname"
                    handleChange={this.handleChange}
                    buttonClick={this.buttonClick}
                    hasButton={this.state.edit ? false : true}
                    originalVal={
                      this.props.singleCustomer.data
                        ? this.props.singleCustomer.data.nickname
                        : ""
                    }
                  />
                </div>
              </div>

              <div className="unvisibleBtn">
                <FormInput
                  label="Address"
                  value={address}
                  target="address"
                  multiline
                  rows={2}
                  handleChange={this.handleChange}
                  hasButton={this.state.edit ? false : true}
                  originalVal={
                    this.props.singleCustomer.data
                      ? this.props.singleCustomer.data.address
                      : ""
                  }
                />
              </div>

              <div class="row">
                <div class="col-sm-4 unvisibleBtn">
                <FormInput
                    label="Country"
                    value={country}
                    target="country"
                    buttonClick={this.buttonClick}
                    selectValueKey="id"
                    selectValues={
                      this.props.customerDetails.data.data
                        ? this.props.customerDetails.data.data.country
                        : []
                    }
                    handleChange={this.handleChange}
                    hasButton={this.state.edit ? false : true}
                    // originalVal={
                    //   this.props.singleCustomer.data
                    //     ? this.props.singleCustomer.data.country
                    //     : ""
                    // }
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-sm-3 tel-cell" style={{ display: "flex" }}>
                  <div
                    class="col-sm-3 unvisibleBtn"
                    style={{ paddingLeft: "0" }}
                  >
                    <FormInput
                      label="Tel"
                      value={tel1a}
                      target="tel1a"
                      handleChange={this.handleChange}
                      hasButton={this.state.edit ? false : true}
                      originalVal={
                        this.props.singleCustomer.data
                          ? this.props.singleCustomer.data.tel1a
                          : ""
                      }
                    />
                  </div>
                  <div class="col-sm-9 unvisibleBtn">
                    <FormInput
                      label=" "
                      value={tel1b}
                      target="tel1b"
                      handleChange={this.handleChange}
                      hasButton={this.state.edit ? false : true}
                      originalVal={
                        this.props.singleCustomer.data
                          ? this.props.singleCustomer.data.tel1b
                          : ""
                      }
                    />
                  </div>
                </div>
                <div class="col-sm-3 tel-cell" style={{ display: "flex" }}>
                  <div class="col-sm-3 unvisibleBtn">
                    <FormInput
                      label="Fax"
                      value={fax1a}
                      target="fax1a"
                      handleChange={this.handleChange}
                      hasButton={this.state.edit ? false : true}
                    />
                  </div>
                  <div class="col-sm-9 unvisibleBtn">
                    <FormInput
                      label=" "
                      value={fax1b}
                      target="fax1b"
                      handleChange={this.handleChange}
                      hasButton={this.state.edit ? false : true}
                      originalVal={
                        this.props.singleCustomer.data
                          ? this.props.singleCustomer.data.fax1b
                          : ""
                      }
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-3 unvisibleBtn">
                  <FormInput
                    label="Sales PIC"
                    value={salesPIC}
                    target="salesPIC"
                    handleChange={this.handleChange}
                    hasButton={this.state.edit ? false : true}
                    originalVal={
                      this.props.singleCustomer.data
                        ? this.props.singleCustomer.data.salesPIC
                        : ""
                    }
                  />
                </div>

                <div class="col-sm-3 tel-cell" style={{ display: "flex" }}>
                  <div class="col-sm-3 unvisibleBtn">
                    <FormInput
                      label="Tel"
                      value={cusPICtel1a}
                      target="cusPICtel1a"
                      handleChange={this.handleChange}
                      hasButton={this.state.edit ? false : true}
                      originalVal={
                        this.props.singleCustomer.data
                          ? this.props.singleCustomer.data.cusPICtel1a
                          : ""
                      }
                    />
                  </div>
                  <div class="col-sm-9 unvisibleBtn">
                    <FormInput
                      label=" "
                      value={cusPICtel1b}
                      target="cusPICtel1b"
                      handleChange={this.handleChange}
                      hasButton={this.state.edit ? false : true}
                      originalVal={
                        this.props.singleCustomer.data
                          ? this.props.singleCustomer.data.cusPICtel1b
                          : ""
                      }
                    />
                  </div>
                </div>
                <div class="col-sm-3 tel-cell" style={{ display: "flex" }}>
                  <div class="col-sm-3 unvisibleBtn">
                    <FormInput
                      label="Fax"
                      value={cusPICMobile1a}
                      target="cusPICMobile1a"
                      handleChange={this.handleChange}
                      hasButton={this.state.edit ? false : true}
                      originalVal={
                        this.props.singleCustomer.data
                          ? this.props.singleCustomer.data.cusPICMobile1a
                          : ""
                      }
                    />
                  </div>
                  <div class="col-sm-9 unvisibleBtn">
                    <FormInput
                      label=" "
                      value={cusPICMobile1b}
                      target="cusPICMobile1b"
                      handleChange={this.handleChange}
                      hasButton={this.state.edit ? false : true}
                      originalVal={
                        this.props.singleCustomer.data
                          ? this.props.singleCustomer.data.cusPICMobile1b
                          : ""
                      }
                    />
                  </div>
                </div>
                <div class="col-sm-3 unvisibleBtn">
                  <FormInput
                    label="Email"
                    value={cusPICEmail}
                    target="cusPICEmail"
                    handleChange={this.handleChange}
                    hasButton={this.state.edit ? false : true}
                    originalVal={
                      this.props.singleCustomer.data
                        ? this.props.singleCustomer.data.cusPICEmail
                        : ""
                    }
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-sm-3 unvisibleBtn">
                  <FormInput
                    label="Acc. PIC"
                    value={acctPIC}
                    target="acctPIC"
                    handleChange={this.handleChange}
                    hasButton={this.state.edit ? false : true}
                    originalVal={
                      this.props.singleCustomer.data
                        ? this.props.singleCustomer.data.acctPIC
                        : ""
                    }
                  />
                </div>

                <div class="col-sm-3 tel-cell" style={{ display: "flex" }}>
                  <div class="col-sm-3 unvisibleBtn">
                    <FormInput
                      label="Tel"
                      value={acctPICtel1a}
                      target="acctPICtel1a"
                      handleChange={this.handleChange}
                      hasButton={this.state.edit ? false : true}
                      originalVal={
                        this.props.singleCustomer.data
                          ? this.props.singleCustomer.data.acctPICtel1a
                          : ""
                      }
                    />
                  </div>
                  <div class="col-sm-9 unvisibleBtn">
                    <FormInput
                      label=" "
                      value={acctPICtel1b}
                      target="acctPICtel1b"
                      handleChange={this.handleChange}
                      hasButton={this.state.edit ? false : true}
                      originalVal={
                        this.props.singleCustomer.data
                          ? this.props.singleCustomer.data.acctPICtel1b
                          : ""
                      }
                    />
                  </div>
                </div>
                <div class="col-sm-3 tel-cell" style={{ display: "flex" }}>
                  <div class="col-sm-3 unvisibleBtn">
                    <FormInput
                      label="Fax"
                      value={acctPICMobile1b}
                      target="acctPICMobile1b"
                      handleChange={this.handleChange}
                      hasButton={this.state.edit ? false : true}
                      originalVal={
                        this.props.singleCustomer.data
                          ? this.props.singleCustomer.data.acctPICMobile1b
                          : ""
                      }
                    />
                  </div>
                  <div class="col-sm-9 unvisibleBtn">
                    <FormInput
                      label=" "
                      value={acctPICMobile1a}
                      target="acctPICMobile1a"
                      handleChange={this.handleChange}
                      hasButton={this.state.edit ? false : true}
                      originalVal={
                        this.props.singleCustomer.data
                          ? this.props.singleCustomer.data.acctPICMobile1a
                          : ""
                      }
                    />
                  </div>
                </div>
                <div class="col-sm-3 unvisibleBtn">
                  <FormInput
                    label="Email"
                    value={acctPICEmail}
                    target="acctPICEmail"
                    handleChange={this.handleChange}
                    hasButton={this.state.edit ? false : true}
                    originalVal={
                      this.props.singleCustomer.data
                        ? this.props.singleCustomer.data.acctPICEmail
                        : ""
                    }
                  />
                </div>
              </div>
            </div>
            <div
              class="boundary-line"
              style={{
                width: "100%",
                height: "2px",
                backgroundColor: "#c0c0c0",
                margin: "20px auto ",
              }}
            ></div>
            <div class="bottom-container">
              <div class="row">
                <div className=" col-sm-6 unvisibleBtn">
                  <FormInput
                    label="Billing Address"
                    value={billingAddress}
                    target="billingAddress"
                    multiline
                    rows={2}
                    handleChange={this.handleChange}
                    buttonClick={this.buttonClick}
                    hasButton={this.state.edit ? false : true}
                    originalVal={
                      this.props.singleCustomer.data
                        ? this.props.singleCustomer.data.billingAddress
                        : ""
                    }
                  />
                </div>
                <div className=" col-sm-6 unvisibleBtn">
                  <FormInput
                    label="Del Address"
                    value={delAddress}
                    target="delAddress"
                    multiline
                    rows={2}
                    handleChange={this.handleChange}
                    buttonClick={this.buttonClick}
                    hasButton={this.state.edit ? false : true}
                    originalVal={
                      this.props.singleCustomer.data
                        ? this.props.singleCustomer.data.delAddress
                        : ""
                    }
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6" style={{ paddingLeft: "0" }}>
                  <div class="col-sm-7 unvisibleBtn">
                    <FormInput
                    label="Country"
                    value={billingCountry}
                    target="billingCountry"
                    buttonClick={this.buttonClick}
                    selectValueKey="id"
                    selectValues={
                      this.props.customerDetails.data.data
                        ? this.props.customerDetails.data.data.country
                        : []
                    }
                    handleChange={this.handleChange}
                    hasButton={this.state.edit ? false : true}
                    // originalVal={
                    //   this.props.singleCustomer.data
                    //     ? this.props.singleCustomer.data.country
                    //     : ""
                    // }
                  />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-4 unvisibleBtn">
                  <FormInput
                    label="Sales PIC"
                    value={cusPIC}
                    target="cusPIC"
                    buttonClick={this.buttonClick}
                    selectValueKey="id"
                    selectValues={
                      this.props.customerDetails.data
                        ? this.props.customerDetails.data.cusPIC
                        : []
                    }
                    handleChange={this.handleChange}
                    hasButton={this.state.edit ? false : true}
                    originalVal={
                      this.props.singleCustomer.data
                        ? this.props.singleCustomer.data.cusPIC
                        : ""
                    }
                  />
                </div>
                <div class="col-sm-4 unvisibleBtn">
                  <FormInput
                    label="Down Payment"
                    value={downPayment}
                    target="downPayment"
                    buttonClick={this.buttonClick}
                    selectValueKey="id"
                    selectValues={
                      this.props.customerDetails.data.data
                        ? this.props.customerDetails.data.data.downPayment
                        : []
                    }
                    handleChange={this.handleChange}
                    hasButton={this.state.edit ? false : true}
                    originalVal={
                      this.props.singleCustomer.data
                        ? this.props.singleCustomer.data.downPayment
                        : ""
                    }
                  />
                </div>
                <div class="col-sm-4 unvisibleBtn">
                  <FormInput
                    label="Payment Term"
                    value={paymentTerm}
                    target="paymentTerm"
                    buttonClick={this.buttonClick}
                    selectValueKey="id"
                    selectValueName="name"
                    selectValues={
                      this.props.customerDetails.data.data
                        ? this.props.customerDetails.data.data.paymentTerm
                        : []
                    }
                    handleChange={this.handleChange}
                    hasButton={this.state.edit ? false : true}
                    originalVal={
                      this.props.singleCustomer.data
                        ? this.props.singleCustomer.data.paymentTerm
                        : ""
                    }
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-sm-4 unvisibleBtn">
                  <FormInput
                    label="Incoterm"
                    value={incoterm}
                    target="incoterm"
                    buttonClick={this.buttonClick}
                    selectValueKey="id"
                    selectValues={
                      this.props.customerDetails.data.data
                        ? this.props.customerDetails.data.data.incoterm
                        : []
                    }
                    handleChange={this.handleChange}
                    hasButton={this.state.edit ? false : true}
                    originalVal={
                      this.props.singleCustomer.data
                        ? this.props.singleCustomer.data.incoterm
                        : ""
                    }
                  />
                </div>
                <div class="col-sm-4 unvisibleBtn">
                  <FormInput
                    label="Currency"
                    value={billingCurrency}
                    target="billingCurrency"
                    buttonClick={this.buttonClick}
                    selectValueKey="id"
                    selectValues={
                      this.props.customerDetails.data.data
                        ? this.props.customerDetails.data.data.billCurrency
                        : []
                    }
                    handleChange={this.handleChange}
                    hasButton={this.state.edit ? false : true}
                    originalVal={
                      this.props.singleCustomer.data
                        ? this.props.singleCustomer.data.billingCurrency
                        : ""
                    }
                  />
                </div>
                <div class="col-sm-4 unvisibleBtn">
                  <FormInput
                    label="GST Requirement"
                    value={gstReq}
                    target="gstReq"
                    buttonClick={this.buttonClick}
                    selectValueKey="id"
                    selectValueName="name"
                    selectValues={
                      this.props.customerDetails.data.data
                        ? this.props.customerDetails.data.data.gstReq
                        : []
                    }
                    handleChange={this.handleChange}
                    hasButton={this.state.edit ? false : true}
                    originalVal={
                      this.props.singleCustomer.data
                        ? this.props.singleCustomer.data.gstReq
                        : ""
                    }
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-sm-4 unvisibleBtn">
                  <FormInput
                    label="Credit Limit"
                    value={creditLimit}
                    target="creditLimit"
                    buttonClick={this.buttonClick}
                    selectValueKey="id"
                    selectValueName="name"
                    selectValues={
                      this.props.customerDetails.data.data
                        ? this.props.customerDetails.data.data.creditLimit
                        : []
                    }
                    handleChange={this.handleChange}
                    hasButton={this.state.edit ? false : true}
                    originalVal={
                      this.props.singleCustomer.data
                        ? this.props.singleCustomer.data.creditLimit
                        : ""
                    }
                  />
                </div>
                <div class="col-sm-4 unvisibleBtn">
                  <FormInput
                    label="Credit Term"
                    value={creditTerm}
                    target="creditTerm"
                    buttonClick={this.buttonClick}
                    selectValueKey="id"
                    selectValues={
                      this.props.customerDetails.data.data
                        ? this.props.customerDetails.data.data.creditTerm
                        : []
                    }
                    handleChange={this.handleChange}
                    hasButton={this.state.edit ? false : true}
                    originalVal={
                      this.props.singleCustomer.data
                        ? this.props.singleCustomer.data.creditTerm
                        : ""
                    }
                  />
                </div>
              </div>
            </div>
          </form>
        </FormWrapper>
      </div>
    );
  }
}

const mapStateToProps = ({ customertfesState }) => {
  const { customers } = customertfesState;
  const { customerDetails } = customertfesState;
  const { customerFiltered } = customertfesState;
  const { singleCustomer } = customertfesState
  return { customers, customerDetails, customerFiltered, singleCustomer };
};
export default connect(mapStateToProps, { getSingleCustomerRequest, getFilterCustomerTfes, setCustomerTfes, getCustomerTfesDetails })(CreateCustomer);
