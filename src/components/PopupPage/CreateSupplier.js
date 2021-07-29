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
    setSupplier,
    getSupplierDetails,
    getSingleSupplierRequest,
    patchSingleSupplierRequest,
    getFilterSupplier,
    setDuplicate,
  } from 'Ducks/suppliertfes'
// const INIT_STATE = {
//   // element: null,
//   name: '',
//   address: '',
// };

class CreateSupplier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      address: this.props.address,
      salesPIC: this.props.buyerName,
      salesPICtel1b: this.props.telNo,
      salesPICMobile1b: this.props.faxNo,
      salesPICEmail: this.props.buyerEmail,
      incoterm: this.props.incoterm? this.props.incoterm : "",
      paymentTerm: this.props.paymentTerm ? this.props.paymentTerm : ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.getFilterSupplier();
    this.props.getSupplierDetails();
    this.props.getSingleSupplierRequest();
      this.props.setSupplier();
  }

  onSubmit() {
    const data = {
      ...this.state
    };
      this.props.setSupplier(data);
    let newSupplierNo  = this.props.Suppliers.data.suppId;
    this.props.getInfo(data, newSupplierNo);
  }

  handleChange(field, value) {
    this.setState({ [field]: value });
  }

  checkDisabled() {
    return true;
  }

  render() {
    const {
        suppId,
        name,
        nickname,
        address,
        tel1a,
        tel1b,
        fax1a,
        fax1b,
        salesPIC,
        salesPICtel1a,
        salesPICtel1b,
        salesPICMobile1a,
        salesPICMobile1b,
        salesPICEmail,
        acctPIC,
        acctPICtel1a,
        acctPICtel1b,
        acctPICMobile1a,
        acctPICMobile1b,
        acctPICEmail,
        tfesProductPic,
        delAddress,
        incoterm,
        downPayment,
        gstReq,
        billingCurrent,
        delCountry,
        country
      } = this.state;    
  
      const { toggleFormSelection } = this.state
  
      const { brands, materials, loading } = this.props.SupplierDetails

    return (
      <React.Fragment>
        <FormWrapper
          onSave={this.onSubmit}
          disabled={this.checkDisabled()}
          title="Back to Quotation List View"
          centerTitle={"Add New Customer"}
          promptMessage=" "
          hiddenEdit="none"
          hiddenDuplicate="none"
          edit="test">
         <form autoComplete="off">
              <div class="top-container">
                <div class="row">
                  <div class="col-sm-3 unvisibleBtn">
                    <FormInput
                      label="Supp. ID"
                      value={suppId}
                      target="suppId"
                      hasButton={this.state.edit ? false : true}
                      handleChange={this.handleChange}
                      readOnly={true}
                      buttonClick={this.buttonClick}
                    />
                  </div>
                  <div class="col-sm-6 unvisibleBtn">
                    <FormInput
                      label="Supp. Name"
                      value={name}
                      target="name"
                      handleChange={this.handleChange}
                      hasButton={true}
                      buttonClick={this.buttonClick}
                      // isToggledtelThreeForm={toggleFormSelection}
                      isToggledEditForm={toggleFormSelection}
                      originalVal={
                        this.props.singleSupplier.data
                          ? this.props.singleSupplier.data.name
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
                      hasButton={true}
                      buttonClick={this.buttonClick}
                      // isToggledtelThreeForm={toggleFormSelection}
                      isToggledEditForm={toggleFormSelection}
                      originalVal={
                        this.props.singleSupplier.data
                          ? this.props.singleSupplier.data.nickname
                          : ""
                      }
                    />
                  </div>
                </div>

                <div className="unvisibleBtn ">
                  <FormInput
                    label="Address"
                    value={address}
                    target="address"
                    multiline
                    rows={2}
                    hasButton={true}
                    handleChange={this.handleChange}
                    isToggledEditForm={toggleFormSelection}
                  />
                </div>

                <div class="row">
                       <div class="col-sm-4 unvisibleBtn">
                    <FormInput
                      label="Country"
                      key={country}
                      value={country}
                      target="country"
                      hasButton={this.state.edit? false :true}
                      selectValueKey="id"
                      selectValueName="name"
                      selectValues={
                        this.props.SupplierDetails.data
                          ? this.props.SupplierDetails.data.country
                          : []
                      }
                        handleChange={this.handleChange}
                        isToggledEditForm={toggleFormSelection}
                        originalVal={
                          this.props.singleSupplier.data
                            ? this.props.singleSupplier.data.country
                            : ""
                        }
                    />
                  </div>
                  </div>

                <div class="row">
                  <div class="col-sm-3 tel-cell" style={{ display: 'flex' }}>
                    <div
                      class="col-sm-3 unvisibleBtn"
                      style={{ paddingLeft: '0' }}
                    >
                      <FormInput
                        label="Tel"
                        value={tel1a}
                        target="tel1a"
                        hasButton={true}
                        handleChange={this.handleChange}
                        isToggledEditForm={toggleFormSelection}
                      />
                    </div>
                    <div class="col-sm-9 unvisibleBtn">
                      <FormInput
                        label=" "
                        value={tel1b}
                        target="tel1b"
                        hasButton={true}
                        handleChange={this.handleChange}
                        isToggledEditForm={toggleFormSelection}
                      />
                    </div>
                  </div>
                  <div class="col-sm-3 tel-cell" style={{ display: 'flex' }}>
                    <div class="col-sm-3 unvisibleBtn">
                      <FormInput
                        label="Fax"
                        value={fax1a}
                        target="fax1a"
                        hasButton={true}
                        handleChange={this.handleChange}
                        isToggledEditForm={toggleFormSelection}
                      />
                    </div>
                    <div class="col-sm-9 unvisibleBtn">
                      <FormInput
                        label=" "
                        value={fax1b}
                        target="fax1b"
                        hasButton={true}
                        handleChange={this.handleChange}
                        isToggledEditForm={toggleFormSelection}
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
                      hasButton={true}
                      handleChange={this.handleChange}
                      isToggledEditForm={toggleFormSelection}
                    />
                  </div>

                  <div class="col-sm-3 tel-cell" style={{ display: 'flex' }}>
                    <div class="col-sm-3 unvisibleBtn">
                      <FormInput
                        label="Tel"
                        value={salesPICtel1a}
                        target="salesPICtel1a"
                        hasButton={true}
                        handleChange={this.handleChange}
                        isToggledEditForm={toggleFormSelection}
                      />
                    </div>
                    <div class="col-sm-9 unvisibleBtn">
                      <FormInput
                        label=" "
                        value={salesPICtel1b}
                        target="salesPICtel1b"
                        hasButton={true}
                        handleChange={this.handleChange}
                        isToggledEditForm={toggleFormSelection}
                      />
                    </div>
                  </div>
                  <div class="col-sm-3 tel-cell" style={{ display: 'flex' }}>
                    <div class="col-sm-3 unvisibleBtn">
                      <FormInput
                        label="Mobile"
                        value={salesPICMobile1a}
                        target="salesPICMobile1a"
                        hasButton={true}
                        handleChange={this.handleChange}
                        isToggledEditForm={toggleFormSelection}
                      />
                    </div>
                    <div class="col-sm-9 unvisibleBtn">
                      <FormInput
                        label=" "
                        value={salesPICMobile1b}
                        target="salesPICMobile1b"
                        hasButton={true}
                        handleChange={this.handleChange}
                        isToggledEditForm={toggleFormSelection}
                      />
                    </div>
                  </div>
                  <div class="col-sm-3 unvisibleBtn">
                    <FormInput
                      label="Email"
                      value={salesPICEmail}
                      target="salesPICEmail"
                      hasButton={true}
                      handleChange={this.handleChange}
                      isToggledEditForm={toggleFormSelection}
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-3 unvisibleBtn">
                    <FormInput
                      label="Acc. PIC"
                      value={acctPIC}
                      target="acctPIC"
                      hasButton={true}
                      handleChange={this.handleChange}
                      isToggledEditForm={toggleFormSelection}
                    />
                  </div>

                  <div class="col-sm-3 tel-cell" style={{ display: 'flex' }}>
                    <div class="col-sm-3 unvisibleBtn">
                      <FormInput
                        label="Tel"
                        value={acctPICtel1a}
                        target="acctPICtel1a"
                        hasButton={true}
                        handleChange={this.handleChange}
                        isToggledEditForm={toggleFormSelection}
                      />
                    </div>
                    <div class="col-sm-9 unvisibleBtn">
                      <FormInput
                        label=" "
                        value={acctPICtel1b}
                        target="acctPICtel1b"
                        hasButton={true}
                        handleChange={this.handleChange}
                        isToggledEditForm={toggleFormSelection}
                      />
                    </div>
                  </div>
                  <div class="col-sm-3 tel-cell" style={{ display: 'flex' }}>
                    <div class="col-sm-3 unvisibleBtn">
                      <FormInput
                        label="Mobile"
                        value={acctPICMobile1a}
                        target="acctPICMobile1a"
                        hasButton={true}
                        handleChange={this.handleChange}
                        isToggledEditForm={toggleFormSelection}
                      />
                    </div>
                    <div class="col-sm-9 unvisibleBtn">
                      <FormInput
                        label=" "
                        value={acctPICMobile1b}
                        target="acctPICMobile1b"
                        hasButton={true}
                        handleChange={this.handleChange}
                        isToggledEditForm={toggleFormSelection}
                      />
                    </div>
                  </div>
                  <div class="col-sm-3 unvisibleBtn">
                    <FormInput
                      label="Email"
                      value={acctPICEmail}
                      target="acctPICEmail"
                      hasButton={true}
                      handleChange={this.handleChange}
                      isToggledEditForm={toggleFormSelection}
                    />
                  </div>
                </div>

                <div
                  class="boundary-line"
                  style={{
                    width: '100%',
                    height: '2px',
                    backgroundColor: '#c0c0c0',
                    margin: '20px auto ',
                  }}
                ></div>

                <div class="row">
                  <div className=" col-sm unvisibleBtn">
                    <FormInput
                      label="Del. Address"
                      value={delAddress}
                      target="delAddress"
                      multiline
                      rows={2}
                      buttonClick={this.buttonClick}
                      // selectValueKey="id"
                      // selectValueName="address"
                      // selectValues={
                      //   this.props.SupplierDetails.data
                      //     ? this.props.SupplierDetails.data.delAddress
                      //     : []
                      // }
                      handleChange={this.handleChange}
                      hasButton={this.state.edit ? false : true}
                      isToggledEditForm={toggleFormSelection}
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-4 unvisibleBtn">
                    <FormInput
                      label="Country"
                      key={delCountry}
                      value={delCountry}
                      target="delCountry"
                      hasButton={this.state.edit? false :true}
                      selectValueKey="id"
                      selectValueName="name"
                      selectValues={
                        this.props.SupplierDetails.data
                          ? this.props.SupplierDetails.data.country
                          : []
                      }
                        handleChange={this.handleChange}
                        isToggledEditForm={toggleFormSelection}
                        originalVal={
                          this.props.singleSupplier.data
                            ? this.props.singleSupplier.data.delCountry
                            : ""
                        }
                    />
                  </div>
                  </div>
              </div>
              <div
                class="boundary-line"
                style={{
                  width: '100%',
                  height: '2px',
                  backgroundColor: '#c0c0c0',
                  margin: '20px auto ',
                }}
              ></div>

              <div class="bottom-container">
                <div class="row">
                  <div class="col-sm-4 unvisibleBtn">
                    <FormInput
                      label="TEFS Product PIC"
                      value={tfesProductPic}
                      target="tfesProductPic"
                      isToggledEditForm={toggleFormSelection}
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-4">
                    {console.log("over herer===")}
                    {console.log(this.props.SupplierDetails.data)}
                    <FormInput
                      label="Incoterm"
                      key={incoterm}
                      value={incoterm}
                      target="incoterm"
                      buttonClick={this.buttonClick}
                      selectValueKey="id"
                      selectValueName="name"
                      selectValues={
                        this.props.SupplierDetails.data
                          ? this.props.SupplierDetails.data.incoterm
                          : []
                      }
                      handleChange={this.handleChange}
                      hasButton={this.state.edit ? false : true}
                      isToggledEditForm={toggleFormSelection}
                    />
                  </div>
                    <div class="col-sm-4 unvisibleBtn">
                    <FormInput
                        label="Billing Currency"
                        key={billingCurrent}
                        value={billingCurrent}
                        selected
                      target="billingCurrent"
                      buttonClick={this.buttonClick}
                      selectValueKey="id"
                      selectValueName="name"
                      selectValues={
                        this.props.SupplierDetails.data
                          ? this.props.SupplierDetails.data.billCurrency
                          : []
                      }
                      handleChange={this.handleChange}
                      hasButton={this.state.edit ? false : true}
                        isToggledEditForm={toggleFormSelection}
                        // originalVal={
                        //   this.props.singleSupplier.data
                        //     ? this.props.singleSupplier.data.billingCurrent
                        //     : ""
                        // }
                    />
                  </div>
                  <div class="col-sm-4 unvisibleBtn">
                    <FormInput
                      label="GST Req."
                      key={gstReq}
                      value={gstReq}
                      target="gstReq"
                      buttonClick={this.buttonClick}
                      selectValueKey="id"
                      selectValueName="name"
                      selectValues={
                        this.props.SupplierDetails.data
                          ? this.props.SupplierDetails.data.gstReq
                          : []
                      }
                      handleChange={this.handleChange}
                      hasButton={this.state.edit ? false : true}
                      isToggledEditForm={toggleFormSelection}
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-4 unvisibleBtn">
                    <FormInput
                      label="Down Payment"
                      key={downPayment}
                      value={downPayment}
                      target="downPayment"
                      buttonClick={this.buttonClick}
                      selectValueKey="id"
                      // selectValueName="size"
                      selectValues={
                        this.props.SupplierDetails.data
                          ? this.props.SupplierDetails.data.downPayment
                          : []
                      }
                      handleChange={this.handleChange}
                      hasButton={this.state.edit ? false : true}
                      isToggledEditForm={toggleFormSelection}
                    />
                  </div>
                </div>                
              </div>
            </form>
        </FormWrapper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ suppliertfesState }) => {
    const {
      Suppliers,
      SupplierDetails,
      SupplierFiltered,
      singleSupplier,
    } = suppliertfesState
    return { Suppliers, SupplierDetails, SupplierFiltered, singleSupplier }
  }
export default connect(mapStateToProps, { getSingleSupplierRequest, getFilterSupplier, setSupplier, getSupplierDetails })(CreateSupplier);
