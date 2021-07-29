import React, { Component } from 'react'
import api from 'Api'
import { connect } from 'react-redux'
import FormWrapper from 'Components/Form/Layout/FormWrapper'
import FormInput from 'Components/Form/FormInput'
import DialogRoot from 'Components/Dialog/DialogRoot'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { singlesupplier } from 'Helpers/crmURL'

// React Components import
import SupplierList from './components/supplierList'
// import RctSectionLoader from "Components/RctSectionLoader";
import RctPageLoader from 'Components/RctPageLoader'
// Redux imports
import {
  setSupplier,
  getSupplierDetails,
  getSingleSupplierRequest,
  patchSingleSupplierRequest,
  getFilterSupplier,
  setDuplicate,
} from 'Ducks/suppliertfes';
import {
  getPicUsers
} from 'Ducks/user';

import { supplierListPage } from "Helpers/crmURL";
const INIT_STATE = {
  toggle: false,
  element: null,
  suppId: "",
  name: "",
  nickname: "",
  address: "",
  tel1a: "",
  tel1b: "",
  fax1a: "",
  fax1b: "",
  salesPIC: "",
  salesPICtel1a: "",
  salesPICtel1b: "",
  salesPICMobile1a: "",
  salesPICMobile1b: "",
  salesPICEmail: "",
  acctPIC: "",
  acctPICtel1a: "",
  acctPICtel1b: "",
  acctPICMobile1a: "",
  acctPICMobile1b: "",
  acctPICEmail: "",
  tfesPIC: "",
  delAddress: "",
  incoterm: "",
  downPayment: "",
  gstReq: "",
  billingCurrent: "",
  delCountry: "",
  country: "",
  // form Selection | true = telThreeForm , false = replicateForm
  toggleFormSelection: true,
  edit: false,
  disableEdit: false,
  isDuplicate: false,
}

class crm_new_supplier extends Component {
  constructor(props) {
    super(props)
    this.state = INIT_STATE;
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getInfo = this.getInfo.bind(this);
    this.resetTotalState = this.resetTotalState.bind(this);
  }

  resetTotalState() {

    let newState = {
      ...this.state,
      edit: false,
      toggleFormSelection: false,
      ...this.props.singleSupplier.data,
      incoterm: this.props.singleSupplier.data.incoterm
        && this.props.singleSupplier.data.incoterm.id
        ? this.props.singleSupplier.data.incoterm.id
        : this.props.singleSupplier.data.incoterm,
      downPayment: this.props.singleSupplier.data.downPayment
        && this.props.singleSupplier.data.downPayment.id
        ? this.props.singleSupplier.data.downPayment.id
        : this.props.singleSupplier.data.downPayment,
      gstReq: this.props.singleSupplier.data.gstReq
        && this.props.singleSupplier.data.gstReq.id
        ? this.props.singleSupplier.data.gstReq.id
        : this.props.singleSupplier.data.gstReq,
      billingCurrent: this.props.singleSupplier.data.billingCurrent
        && this.props.singleSupplier.data.billingCurrent.id
        ? this.props.singleSupplier.data.billingCurrent.id
        : this.props.singleSupplier.data.billingCurrent,
      delCountry: this.props.singleSupplier.data.delCountry,
      country: this.props.singleSupplier.data.country,
      tfesPIC: this.props.singleSupplier.data.tfesPIC
    };
    this.setState({
      ...newState,
    })
  }

  componentDidMount() {
    this.props.getSupplierDetails();
    this.props.getPicUsers();

    const supplierId = this.props.match.params.id
    if (supplierId) {
      this.props.getSingleSupplierRequest(supplierId)
    }
    if (this.props.singleSupplier.data && this.props.singleSupplier.data.id) {
      this.resetTotalState()
    }
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevProps.singleSupplier.data !== this.props.singleSupplier.data) {
      if (this.props.singleSupplier.data && this.props.singleSupplier.data.id) {
        if (!this.props.match.params.id) {
          this.props.history.push(
            singlesupplier(this.props.singleSupplier.data.id),
          );
        }
        let newState = {
          ...INIT_STATE,
          edit: true,
          toggleFormSelection: true,
          ...this.props.singleSupplier.data,
          incoterm: this.props.singleSupplier.data.incoterm
            && this.props.singleSupplier.data.incoterm.id
            ? this.props.singleSupplier.data.incoterm.id
            : this.props.singleSupplier.data.incoterm,
          downPayment: this.props.singleSupplier.data.downPayment
            && this.props.singleSupplier.data.downPayment.id
            ? this.props.singleSupplier.data.downPayment.id
            : this.props.singleSupplier.data.downPayment,
          gstReq: this.props.singleSupplier.data.gstReq
            && this.props.singleSupplier.data.gstReq.id
            ? this.props.singleSupplier.data.gstReq.id
            : this.props.singleSupplier.data.gstReq,
          billingCurrent: this.props.singleSupplier.data.billingCurrent
            && this.props.singleSupplier.data.billingCurrent.id
            ? this.props.singleSupplier.data.billingCurrent.id
            : this.props.singleSupplier.data.billingCurrent,
          delCountry: this.props.singleSupplier.data.delCountry,
          country: this.props.singleSupplier.data.country,
          tfesPIC: this.props.singleSupplier.data.tfesPIC
        };
        this.setState({ ...this.state, ...newState });
        // const filt = {
        //   [target]: this.state[target],
        // };

        // this.props.getFilterSupplier(0, 0, filt, "", "");
      }
    }

    if (prevState !== this.state) {
      this.forceUpdate()

    }
  }

  onSubmit() {
    const data = {
      ...this.state
    };

    delete data.toggle;
    delete data.toggleFormSelection;
    delete data.edit;
    delete data.element;

    // If telThree/update onSubmit
    if (this.state.edit) {
      data.id = this.state.id
      this.props.patchSingleSupplierRequest(data)
    } else {
      // If Save as new onSubmit
      delete data.id;
      delete data._id;
      this.props.setSupplier(data)
    }
    this.setState({
      disableEdit: true,
      isDuplicate: false,
      edit: true,
      toggleFormSelection: true,
    })

  }
  onChangeToEdit = () => {
    this.setState({
      disableEdit: false
    })
  }

  handleChange(field, value) {
    this.setState({ [field]: value })
  }

  getInfo(id) {
    const test = this.props.SupplierFiltered.data
    test.map((source) => {
      if (source.id == id) {
        this.setState({
          toggle: false,
          ...source
        });
      }
    })
  }

  checkDisabled() {
    if (this.state.disableEdit == true) {
      return false
    } else {
      return true;
    }

  }

  buttonClick = (target) => {
    this.setState({
      toggle: true,
      element: target,
      filter: {
        ...this.state.filter,
        [target]: this.state[target],
      },
    })
    const filt = {
      [target]: this.state[target],
    }
    this.props.getFilterSupplier(0, 0, filt, '', '')
  }

  restartToggle = () => {
    this.setState({
      toggle: false,
    })
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
      tfesPIC,
      delAddress,
      incoterm,
      downPayment,
      gstReq,
      billingCurrent,
      delCountry,
      country,
      disableEdit,
      isDuplicate,
      toggleFormSelection,
    } = this.state;

    // const { toggleFormSelection } = this.state
    let userlist = this.props.picUserList.data.map(user => ({ name: user.firstName + " " + user.lastName, value: user.id }))
    // console.log(tfesPIC);
    return (
      <React.Fragment>
        {this.props.singleSupplier.loading ? (
          <RctPageLoader />
        ) : (
          <FormWrapper
            onSave={this.onSubmit}
            onChangeToEdit={this.onChangeToEdit}
            onDuplicate={this.onDuplicate}
            disabled={this.checkDisabled()}
            title="Back To ALL Supplier Maintenance"
            centerTitle={
              this.state.edit ? 'Update Supplier Details' : 'Add New Supplier'
            }
            promptMessage=" "
            telThree="test"
            listRedirect={supplierListPage}
            showEditButton={this.state.disableEdit ? true : false}
          // showDuplicateButton={this.state.edit ? true : false}
          >
            {/* {this.state.disableEdit&&<div onClick={this.onChangeToEdit} className="onChangeToEdit_btn"  >
              <button className="primary_btn"> Edit  </button>
              </div>} */}
            <form autoComplete="off" className={this.state.disableEdit && "uneditable"}>
              <div class="top-container">
                <div class="row">
                  <div class="col-sm-3 unvisibleBtn">
                    <FormInput
                      label="Supp. ID"
                      value={suppId}
                      target="suppId"
                      handleChange={this.handleChange}
                      readOnly={true}

                      isToggledEditForm={toggleFormSelection}
                      original={
                        this.props.singleSupplier.data.suppId
                          ? this.props.singleSupplier.data.suppId
                          : ''
                      }
                    />
                  </div>
                  <div class="col-sm-6 unvisibleBtn">
                    <FormInput
                      label="Supp. Name"
                      value={name}
                      target="name"
                      handleChange={this.handleChange}
                      readOnly={disableEdit}
                      // isToggledtelThreeForm={toggleFormSelection}
                      isToggledEditForm={toggleFormSelection}
                      original={
                        this.props.singleSupplier.data.name
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
                      readOnly={disableEdit}
                      // isToggledtelThreeForm={toggleFormSelection}
                      isToggledEditForm={toggleFormSelection}
                      original={
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
                    readOnly={disableEdit}
                    handleChange={this.handleChange}
                    isToggledEditForm={toggleFormSelection}
                    original={
                      this.props.singleSupplier.data
                        ? this.props.singleSupplier.data.address
                        : ""
                    }
                  />
                </div>

                <div class="row">
                  <div class="col-sm-4 unvisibleBtn">
                    <FormInput
                      label="Country"
                      // key={country}
                      value={country}
                      target="country"
                      hasButton={this.state.edit ? false : true}
                      selectValueKey="id"
                      selectValueName="name"
                      selectValues={
                        this.props.SupplierDetails.data
                          ? this.props.SupplierDetails.data.country
                          : []
                      }
                      handleChange={this.handleChange}
                      isToggledEditForm={toggleFormSelection}
                      original={
                        this.props.singleSupplier.data
                          ? this.props.singleSupplier.data.country
                          : ""
                      }
                      readOnly={disableEdit}
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
                        readOnly={disableEdit}
                        handleChange={this.handleChange}
                        isToggledEditForm={toggleFormSelection}
                        original={
                          this.props.singleSupplier.data
                            ? this.props.singleSupplier.data.tel1a
                            : ""
                        }
                      />
                    </div>
                    <div class="col-sm-9 unvisibleBtn">
                      <FormInput
                        label=" "
                        value={tel1b}
                        target="tel1b"
                        readOnly={disableEdit}
                        handleChange={this.handleChange}
                        isToggledEditForm={toggleFormSelection}
                        original={
                          this.props.singleSupplier.data
                            ? this.props.singleSupplier.data.tel1b
                            : ""
                        }
                      />
                    </div>
                  </div>
                  <div class="col-sm-3 tel-cell" style={{ display: 'flex' }}>
                    <div class="col-sm-3 unvisibleBtn">
                      <FormInput
                        label="Fax"
                        value={fax1a}
                        target="fax1a"
                        readOnly={disableEdit}
                        handleChange={this.handleChange}
                        isToggledEditForm={toggleFormSelection}
                        original={
                          this.props.singleSupplier.data
                            ? this.props.singleSupplier.data.fax1a
                            : ""
                        }
                      />
                    </div>
                    <div class="col-sm-9 unvisibleBtn">
                      <FormInput
                        label=" "
                        value={fax1b}
                        target="fax1b"
                        readOnly={disableEdit}
                        handleChange={this.handleChange}
                        isToggledEditForm={toggleFormSelection}
                        original={
                          this.props.singleSupplier.data
                            ? this.props.singleSupplier.data.fax1b
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
                      readOnly={disableEdit}
                      handleChange={this.handleChange}
                      isToggledEditForm={toggleFormSelection}
                      original={
                        this.props.singleSupplier.data
                          ? this.props.singleSupplier.data.salesPIC
                          : ""
                      }
                    />
                  </div>

                  <div class="col-sm-3 tel-cell" style={{ display: 'flex' }}>
                    <div class="col-sm-3 unvisibleBtn">
                      <FormInput
                        label="Tel"
                        value={salesPICtel1a}
                        target="salesPICtel1a"
                        readOnly={disableEdit}
                        handleChange={this.handleChange}
                        isToggledEditForm={toggleFormSelection}
                        original={
                          this.props.singleSupplier.data
                            ? this.props.singleSupplier.data.salesPICtel1a
                            : ""
                        }
                      />
                    </div>
                    <div class="col-sm-9 unvisibleBtn">
                      <FormInput
                        label=" "
                        value={salesPICtel1b}
                        target="salesPICtel1b"
                        readOnly={disableEdit}
                        handleChange={this.handleChange}
                        isToggledEditForm={toggleFormSelection}
                        original={
                          this.props.singleSupplier.data
                            ? this.props.singleSupplier.data.salesPICtel1b
                            : ""
                        }
                      />
                    </div>
                  </div>
                  <div class="col-sm-3 tel-cell" style={{ display: 'flex' }}>
                    <div class="col-sm-3 unvisibleBtn">
                      <FormInput
                        label="Mobile"
                        value={salesPICMobile1a}
                        target="salesPICMobile1a"
                        readOnly={disableEdit}
                        handleChange={this.handleChange}
                        isToggledEditForm={toggleFormSelection}
                        original={
                          this.props.singleSupplier.data
                            ? this.props.singleSupplier.data.salesPICMobile1a
                            : ""
                        }
                      />
                    </div>
                    <div class="col-sm-9 unvisibleBtn">
                      <FormInput
                        label=" "
                        value={salesPICMobile1b}
                        target="salesPICMobile1b"
                        readOnly={disableEdit}
                        handleChange={this.handleChange}
                        isToggledEditForm={toggleFormSelection}
                        original={
                          this.props.singleSupplier.data
                            ? this.props.singleSupplier.data.salesPICMobile1b
                            : ""
                        }
                      />
                    </div>
                  </div>
                  <div class="col-sm-3 unvisibleBtn">
                    <FormInput
                      label="Email"
                      value={salesPICEmail}
                      target="salesPICEmail"
                      readOnly={disableEdit}
                      handleChange={this.handleChange}
                      isToggledEditForm={toggleFormSelection}
                      original={
                        this.props.singleSupplier.data
                          ? this.props.singleSupplier.data.salesPICEmail
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
                      readOnly={disableEdit}
                      handleChange={this.handleChange}
                      isToggledEditForm={toggleFormSelection}
                      original={
                        this.props.singleSupplier.data
                          ? this.props.singleSupplier.data.acctPIC
                          : ""
                      }
                    />
                  </div>

                  <div class="col-sm-3 tel-cell" style={{ display: 'flex' }}>
                    <div class="col-sm-3 unvisibleBtn">
                      <FormInput
                        label="Tel"
                        value={acctPICtel1a}
                        target="acctPICtel1a"
                        readOnly={disableEdit}
                        handleChange={this.handleChange}
                        isToggledEditForm={toggleFormSelection}
                        original={
                          this.props.singleSupplier.data
                            ? this.props.singleSupplier.data.acctPICtel1a
                            : ""
                        }
                      />
                    </div>
                    <div class="col-sm-9 unvisibleBtn">
                      <FormInput
                        label=" "
                        value={acctPICtel1b}
                        target="acctPICtel1b"
                        readOnly={disableEdit}
                        handleChange={this.handleChange}
                        isToggledEditForm={toggleFormSelection}
                        original={
                          this.props.singleSupplier.data
                            ? this.props.singleSupplier.data.acctPICtel1b
                            : ""
                        }
                      />
                    </div>
                  </div>
                  <div class="col-sm-3 tel-cell" style={{ display: 'flex' }}>
                    <div class="col-sm-3 unvisibleBtn">
                      <FormInput
                        label="Mobile"
                        value={acctPICMobile1a}
                        target="acctPICMobile1a"
                        readOnly={disableEdit}
                        handleChange={this.handleChange}
                        isToggledEditForm={toggleFormSelection}
                        original={
                          this.props.singleSupplier.data
                            ? this.props.singleSupplier.data.acctPICMobile1a
                            : ""
                        }
                      />
                    </div>
                    <div class="col-sm-9 unvisibleBtn">
                      <FormInput
                        label=" "
                        value={acctPICMobile1b}
                        target="acctPICMobile1b"
                        readOnly={disableEdit}
                        handleChange={this.handleChange}
                        isToggledEditForm={toggleFormSelection}
                        original={
                          this.props.singleSupplier.data
                            ? this.props.singleSupplier.data.acctPICMobile1b
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
                      readOnly={disableEdit}
                      handleChange={this.handleChange}
                      isToggledEditForm={toggleFormSelection}
                      original={
                        this.props.singleSupplier.data
                          ? this.props.singleSupplier.data.acctPICEmail
                          : ""
                      }
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

                      // selectValueKey="id"
                      // selectValueName="address"
                      // selectValues={
                      //   this.props.SupplierDetails.data
                      //     ? this.props.SupplierDetails.data.delAddress
                      //     : []
                      // }
                      handleChange={this.handleChange}
                      readOnly={disableEdit}
                      isToggledEditForm={toggleFormSelection}
                      original={
                        this.props.singleSupplier.data
                          ? this.props.singleSupplier.data.delAddress
                          : ""
                      }
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-4 unvisibleBtn">
                    <FormInput
                      label="Country"
                      // key={delCountry}
                      value={delCountry}
                      target="delCountry"
                      hasButton={this.state.edit ? false : true}
                      selectValueKey="id"
                      selectValueName="name"
                      selectValues={
                        this.props.SupplierDetails.data
                          ? this.props.SupplierDetails.data.country
                          : []
                      }
                      handleChange={this.handleChange}
                      isToggledEditForm={toggleFormSelection}
                      original={
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
                      label="TFES PIC"
                      // key={tfesPIC}
                      value={tfesPIC}
                      target="tfesPIC"
                      isToggledEditForm={toggleFormSelection}
                      handleChange={this.handleChange}
                      selectValues={
                        userlist

                      }
                      original={
                        this.props.singleSupplier.data
                          ? this.props.singleSupplier.data.tfesPIC
                          : ""
                      }

                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-4">
                    <FormInput
                      label="Incoterm"
                      // key={incoterm}
                      value={incoterm}
                      target="incoterm"
                      selectValueKey="id"
                      selectValueName="name"
                      selectValues={
                        this.props.SupplierDetails.data
                          ? this.props.SupplierDetails.data.incoterm
                          : []
                      }
                      handleChange={this.handleChange}
                      isToggledEditForm={toggleFormSelection}
                      original={
                        this.props.singleSupplier.data.incoterm
                          ? this.props.singleSupplier.data.incoterm.id
                          : ""
                      }
                    />
                  </div>
                  <div class="col-sm-4 unvisibleBtn">
                    <FormInput
                      label="Currency"
                      // key={billingCurrent}
                      value={billingCurrent}
                      selected
                      target="billingCurrent"

                      selectValueKey="id"
                      selectValueName="name"
                      selectValues={
                        this.props.SupplierDetails.data
                          ? this.props.SupplierDetails.data.billCurrency
                          : []
                      }
                      handleChange={this.handleChange}
                      readOnly={disableEdit}
                      isToggledEditForm={toggleFormSelection}
                      // originalVal={
                      //   this.props.singleSupplier.data
                      //     ? this.props.singleSupplier.data.billingCurrent
                      //     : ""
                      // }
                      original={
                        this.props.singleSupplier.data.billingCurrent
                          ? this.props.singleSupplier.data.billingCurrent.id
                          : ""
                      }
                    />
                  </div>
                  <div class="col-sm-4 unvisibleBtn">
                    <FormInput
                      label="GST Req."
                      // key={gstReq}
                      value={gstReq}
                      target="gstReq"

                      selectValueKey="id"
                      selectValueName="name"
                      selectValues={
                        this.props.SupplierDetails.data
                          ? this.props.SupplierDetails.data.gstReq
                          : []
                      }
                      handleChange={this.handleChange}
                      readOnly={disableEdit}
                      isToggledEditForm={toggleFormSelection}
                      original={
                        this.props.singleSupplier.data.gstReq
                          ? this.props.singleSupplier.data.gstReq.id
                          : ""
                      }
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-4 unvisibleBtn">
                    <FormInput
                      label="Down Payment"
                      // key={downPayment}
                      value={downPayment}
                      target="downPayment"

                      selectValueKey="id"
                      // selectValueName="size"
                      selectValues={
                        this.props.SupplierDetails.data
                          ? this.props.SupplierDetails.data.downPayment
                          : []
                      }
                      handleChange={this.handleChange}
                      readOnly={disableEdit}
                      isToggledEditForm={toggleFormSelection}
                      original={
                        this.props.singleSupplier.data.downPayment
                          ? this.props.singleSupplier.data.downPayment.id
                          : ""
                      }

                    />
                  </div>
                </div>
              </div>
            </form>
            <DialogRoot
              show={this.state.toggle}
              handleHide={this.restartToggle}
              size={'lg'}
            >
              <h3>Supplier List</h3>
              <SupplierList getInfo={this.getInfo} />
            </DialogRoot>
          </FormWrapper>
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ suppliertfesState, userState }) => {
  const {
    Suppliers,
    SupplierDetails,
    SupplierFiltered,
    singleSupplier,
  } = suppliertfesState
  const { picUserList } = userState;
  return { Suppliers, SupplierDetails, SupplierFiltered, singleSupplier, picUserList }
}

export default connect(mapStateToProps, {
  setSupplier,
  getSupplierDetails,
  getSingleSupplierRequest,
  patchSingleSupplierRequest,
  getFilterSupplier,
  setDuplicate,
  getPicUsers
})(crm_new_supplier)
