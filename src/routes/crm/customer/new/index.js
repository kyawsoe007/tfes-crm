import React, { Component } from "react";
import api from "Api";
import { connect } from "react-redux";
import FormWrapper from "Components/Form/Layout/FormWrapper";
import FormInput from "Components/Form/FormInput";
import DialogRoot from "Components/Dialog/DialogRoot";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { singleCustomer, customerListPage,customerNewPage} from "Helpers/crmURL";
// import SKU_customer_list from "../index";

import RctPageLoader from "Components/RctPageLoader";

// Redux imports ACTIONS
import {
  setCustomerTfes,
  getCustomerTfesDetails,
  getFilterCustomerTfes,
  getCustomerTfes,
  getSingleCustomerRequest,
  patchSingleCustomerRequest,
} from "Ducks/customertfes";
import { getPicUsers} from "Ducks/user"

// React Component import
import TfesCustomerList from 'Components/PopupPage/TfesCustomerList'
import { FlareSharp, Receipt } from "@material-ui/icons";


import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

const INIT_STATE = {
  toggle: false,
  // form Selection | true = editForm , false = replicateForm
  toggleFormSelection: true,
  element: null,
  edit: false,
  disableEdit:false,
  salesPIC: "",
  cusNo: "",
  name: "",
  nickname: "",
  address: "",
  country: "",
  salesPIC: "",
  cusPICtel1a: "",
  cusPICtel1b: "",
  cusPICMobile1b: "",
  cusPICMobile1a: "",
  cusPICEmail: "",
  acctPIC: "",
  acctPICtel1a: "",
  acctPICtel1b: "",
  acctPICMobile1b: "",
  acctPICMobile1a: "",
  acctPICEmail: "",
  cusPIC: "",
  incoterm: "",
  creditLimit: "",
  creditTerm: "",
  downPayment: "",
  billingCurrency: "",
  gstReq: "",
  billingAddress: "",
  delAddress: "",
  tel1a: "",
  tel1b: "",
  fax1a: "",
  fax1b: "",
  paymentTerm: "",
  billingCountry: "",
  salesPic: "", 
};

class crm_new_customer extends Component {
  constructor(props) {
    super(props);
    this.state = INIT_STATE;
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getInfo = this.getInfo.bind(this);
    this.resetTotalState = this.resetTotalState.bind(this);
  }

  componentDidMount() {
    this.props.getCustomerTfesDetails();
    this.props.getPicUsers();
    const custId = this.props.match.params.id;
    if (custId) {
     
      this.props.getSingleCustomerRequest(custId);
    }
    if (this.props.singleCustomer.data && this.props.singleCustomer.data.id) {
      this.resetTotalState();
    }
  }


  resetTotalState() {
    let newState = {
      ...this.state,
      edit: false,
      toggleFormSelection: false,

      ...this.props.singleCustomer.data,

      incoterm: this.props.singleCustomer.data.incoterm && this.props.singleCustomer.data.incoterm.id ? this.props.singleCustomer.data.incoterm.id : this.props.singleCustomer.data.incoterm,
      downPayment:
        this.props.singleCustomer.data.downPayment && this.props.singleCustomer.data.downPayment.id ? this.props.singleCustomer.data.downPayment.id : this.props.singleCustomer.data.downPayment,
      paymentTerm:
        this.props.singleCustomer.data.paymentTerm && this.props.singleCustomer.data.paymentTerm.id ? this.props.singleCustomer.data.paymentTerm.id : this.props.singleCustomer.data.paymentTerm,
      billingCurrency:
        this.props.singleCustomer.data.billingCurrency && this.props.singleCustomer.data.billingCurrency.id
          ? this.props.singleCustomer.data.billingCurrency.id
          : this.props.singleCustomer.data.billingCurrency,
      creditLimit:
        this.props.singleCustomer.data.creditLimit && this.props.singleCustomer.data.creditLimit.id ? this.props.singleCustomer.data.creditLimit.id : this.props.singleCustomer.data.creditLimit,

      creditTerm:
        this.props.singleCustomer.data.creditTerm && this.props.singleCustomer.data.creditTerm.id ? this.props.singleCustomer.data.creditTerm.id : this.props.singleCustomer.data.creditTerm,
      
      gstReq: this.props.singleCustomer.data.gstReq && this.props.singleCustomer.data.gstReq.id ? this.props.singleCustomer.data.gstReq.id : this.props.singleCustomer.data.gstReq,
      
    };
    this.setState({
      ...newState,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.singleCustomer.data !== this.props.singleCustomer.data) {
      if (this.props.singleCustomer.data && this.props.singleCustomer.data.id) {
        //check if there is id in the current url
        if (!this.props.match.params.id) {
          this.props.history.push(
            singleCustomer(this.props.singleCustomer.data.id)
          );
        }
        let newState = {
          ...INIT_STATE,
          edit: true,          
          toggleFormSelection: true,
          ...this.props.singleCustomer.data,

          incoterm: this.props.singleCustomer.data.incoterm && this.props.singleCustomer.data.incoterm.id ? this.props.singleCustomer.data.incoterm.id : this.props.singleCustomer.data.incoterm,
          downPayment:
            this.props.singleCustomer.data.downPayment && this.props.singleCustomer.data.downPayment.id ? this.props.singleCustomer.data.downPayment.id : this.props.singleCustomer.data.downPayment,
          paymentTerm:
            this.props.singleCustomer.data.paymentTerm && this.props.singleCustomer.data.paymentTerm.id ? this.props.singleCustomer.data.paymentTerm.id : this.props.singleCustomer.data.paymentTerm,
          billingCurrency:
            this.props.singleCustomer.data.billingCurrency && this.props.singleCustomer.data.billingCurrency.id
              ? this.props.singleCustomer.data.billingCurrency.id
              : this.props.singleCustomer.data.billingCurrency,
          creditLimit:
            this.props.singleCustomer.data.creditLimit && this.props.singleCustomer.data.creditLimit.id ? this.props.singleCustomer.data.creditLimit.id : this.props.singleCustomer.data.creditLimit,

          creditTerm:
            this.props.singleCustomer.data.creditTerm && this.props.singleCustomer.data.creditTerm.id ? this.props.singleCustomer.data.creditTerm.id : this.props.singleCustomer.data.creditTerm,
          
          gstReq: this.props.singleCustomer.data.gstReq && this.props.singleCustomer.data.gstReq.id ? this.props.singleCustomer.data.gstReq.id : this.props.singleCustomer.data.gstReq,
          billingCountry:this.props.singleCustomer.data.billingCountry,
          country:this.props.singleCustomer.data.billingCountry,
        };

        if(this.props.singleCustomer.data.cusNo === undefined) {
          newState.cusNo = ""
        }
        // if(this.props.customerDetails.data && this.props.customerDetails.data.seqNum){
        //  newState.seqNum = this.props.customerDetails.data.seqNum ;

        // console.log("STATE", newState);
    
        // }
        this.setState({
          ...this.state,
          ...newState,
        });

      }
    }

    if (prevState !== this.state) {
      // console.log("ASDASDA", prevState)
      this.forceUpdate()
      // console.log("PROPS", this.props.singleCustomer.data)

      // console.log("GHYUGYGU", this.props.singleCustomer.data.incoterm)
    }

  }

  getInfo(id) {
    const test = this.props.customerFiltered.data;
    test.map((source) => {
      if (source.id == id) {
        this.setState({
          // To Close the popup
          toggle: false,
          ...source,
        });
      }
    });
  }

  onSubmit() {
    const data = {
      ...this.state     
    };
    delete data.toggle;
    delete data.toggleFormSelection;
    delete data.edit;
    delete data.element;

    // If edit/update onSubmit
    if (this.state.edit) {
      data.id = this.state.id;
      this.props.patchSingleCustomerRequest(data);
    } else {
      // If Save as new onSubmit
      delete data.id;
      delete data._id;
      this.props.setCustomerTfes(data);
    }
    this.setState({
      disableEdit: true,
      isDuplicate:false,
      edit:true,
      toggleFormSelection:true,
    })
   
  }
  onChangeToEdit=()=>{
    this.setState({
      disableEdit:false,
      view:false,
    })
  }
  onDuplicate=()=>{
    this.setState({
      view:false,
      edit:false,
      disableEdit:false,
      cusNo:"",
      toggleFormSelection:false,
    })
    this.props.history.push(customerNewPage)
    // alert("onDuplicate")
    // console.log("onDuplicate",this.state)
  }
 
  handleChange(field, value) {
    this.setState({ [field]: value } );
   
  }

  checkDisabled() {
    if( this.state.disableEdit == true){
      return false
    }else{
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
    });
    const filt = {
      [target]: this.state[target],
    };

    this.props.getFilterCustomerTfes(0, 0, filt, "", "");
  };

  restartToggle = () => {
    this.setState({
      toggle: false,
    });
  };

  render() {
    // const { brands, materials } = this.state
    const {
      cusNo,
      name,
      nickname,
      address,
      country,
      salesPIC,
      cusPICtel1a,
      cusPICtel1b,
      cusPICMobile1b,
      cusPICMobile1a,
      cusPICEmail,
      disableEdit,
    } = this.state;
    const {
      acctPIC,
      acctPICtel1a,
      acctPICtel1b,
      acctPICMobile1b,
      acctPICMobile1a,
      acctPICEmail,
      cusPIC,
      incoterm,
      creditLimit,
      creditTerm,
    } = this.state;
    const {
      downPayment,
      billingCurrency,
      gstReq,
      billingAddress,
      delAddress,
      tel1a,
      tel1b,
      fax1a,
      fax1b,
      paymentTerm,
      billingCountry,
      salesPic, 
    } = this.state;
    const { toggleFormSelection} = this.state;
    let userList=this.props.picUserList.data.map(user =>({
      name:user.firstName +" "+ user.lastName,
      value: user.id
    }))
    return (
      <React.Fragment>
        {this.props.singleCustomer.loading ? (
          <RctPageLoader />
        ) : (
          <FormWrapper
            onSave={this.onSubmit}
            onDuplicate={this.onDuplicate}
            onChangeToEdit={this.onChangeToEdit}
            disabled={this.checkDisabled()}
            title="Back to All Customers"
            centerTitle={
              this.state.edit ? "Update Customer Details" : "Add New Customer"
            }
            promptMessage=" "
            edit="test"
            listRedirect={customerListPage}
            showEditButton={this.state.disableEdit ? true : false }
            showDuplicateButton={this.state.edit ? true : false}
          >
              {/* {this.state.disableEdit&&<div onClick={this.onChangeToEdit} className="onChangeToEdit_btn"  >
              <button className="primary_btn"> Edit  </button>
              </div>} */}
            <form autoComplete="off" className={this.state.disableEdit&&"uneditable"}>
              <div class="top-container">
                <div class="row">
                  <div class="col-sm-3 unvisibleBtn">
                    <FormInput
                      label="Customer. ID"
                      value={cusNo}
                      target="cusNo"
                      handleChange={this.handleChange}
                      readOnly={true}
                      isToggledEditForm={toggleFormSelection}
                      original={this.props.singleCustomer.data?this.props.singleCustomer.data.cusNo:""}
                    />
                  </div>
                  <div class="col-sm-6 unvisibleBtn">
                    <FormInput
                      label="Customer. Name"
                      value={name}
                      target="name"
                      handleChange={this.handleChange}
                      isToggledEditForm={toggleFormSelection}
                      readOnly={disableEdit}
                      original={this.props.singleCustomer.data?this.props.singleCustomer.data.name:""}
                    />
                  </div>
                  <div class="col-sm-3 unvisibleBtn">
                    <FormInput
                      label="Nickname"
                      value={nickname}
                      target="nickname"
                      handleChange={this.handleChange}
                      isToggledEditForm={toggleFormSelection}
                      readOnly={disableEdit}
                      original={this.props.singleCustomer.data?this.props.singleCustomer.data.nickname:""}
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
                    isToggledEditForm={toggleFormSelection}
                    original={
                      this.props.singleCustomer.data
                        ? this.props.singleCustomer.data.address
                        : ""
                    }
                    readOnly={disableEdit}
                  />
                </div>

                  <div class="row">
                  {/* {console.log('bc',country)} */}
                  <div class="col-sm-4 unvisibleBtn">
                    <FormInput
                      label="Country"
                      // key={country}
                      value={country}
                      target="country"
                      handleChange={this.handleChange}
                      selectValueKey="id"
                      selectValueName="name"
                        isToggledEditForm={toggleFormSelection}
                      original={
                        this.props.singleCustomer.data
                          ? this.props.singleCustomer.data.billingCountry
                          : ""
                      }
                      selectValues={
                        this.props.customerDetails.data.data
                          ? this.props.customerDetails.data.data.country
                          : []
                      }
                      readOnly={disableEdit}
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
                        isToggledEditForm={toggleFormSelection}
                        original={
                          this.props.singleCustomer.data
                            ? this.props.singleCustomer.data.tel1a
                            : ""
                        }
                        readOnly={disableEdit}
                      />
                    </div>
                    <div class="col-sm-9 unvisibleBtn">
                      <FormInput
                        label=" "
                        value={tel1b}
                        target="tel1b"
                        handleChange={this.handleChange}
                        isToggledEditForm={toggleFormSelection}
                        original={
                          this.props.singleCustomer.data
                            ? this.props.singleCustomer.data.tel1b
                            : ""
                        }
                        readOnly={disableEdit}
                      />
                    </div>
                  </div>
                  <div class="col-sm-3 tel-cell" style={{ display: "flex" }}>
                    <div class="col-sm-3 unvisibleBtn">
                      <FormInput
                        label="FaxNo"
                        value={fax1a}
                        target="fax1a"
                        handleChange={this.handleChange} 
                        isToggledEditForm={toggleFormSelection}
                        original={
                          this.props.singleCustomer.data
                            ? this.props.singleCustomer.data.fax1a
                            : ""
                        }
                        readOnly={disableEdit}
                      />
                    </div>
                    <div class="col-sm-9 unvisibleBtn">
                      <FormInput
                        label=" "
                        value={fax1b}
                        target="fax1b"
                        handleChange={this.handleChange}
                        isToggledEditForm={toggleFormSelection}
                        original={
                          this.props.singleCustomer.data
                            ? this.props.singleCustomer.data.fax1b
                            : ""
                        }
                        readOnly={disableEdit}
                      />
                    </div>
                  </div>
                  <div class="col-sm-3 "/>
                  
                </div>
                <div class="row">
                  <div class="col-sm-3 unvisibleBtn">
                    <FormInput
                      label="Buyer PIC"
                      value={cusPIC}
                      target="cusPIC"
                      handleChange={this.handleChange}
                      isToggledEditForm={toggleFormSelection}
                      original={
                        this.props.singleCustomer.data
                          ? this.props.singleCustomer.data.cusPIC
                          : ""
                      }
                      readOnly={disableEdit}
                    />
                  </div>
                  

                  <div class="col-sm-3 tel-cell" style={{ display: "flex" }}>
                    <div class="col-sm-3 unvisibleBtn">
                      <FormInput
                        label="Tel"
                        value={cusPICtel1a}
                        target="cusPICtel1a"
                        handleChange={this.handleChange} 
                        isToggledEditForm={toggleFormSelection}
                        original={
                          this.props.singleCustomer.data
                            ? this.props.singleCustomer.data.cusPICtel1a
                            : ""
                        }
                        readOnly={disableEdit}
                      />
                    </div>
                    <div class="col-sm-9 unvisibleBtn">
                      <FormInput
                        label=" "
                        value={cusPICtel1b}
                        target="cusPICtel1b"
                        handleChange={this.handleChange}
                        isToggledEditForm={toggleFormSelection}
                        original={
                          this.props.singleCustomer.data
                            ? this.props.singleCustomer.data.cusPICtel1b
                            : ""
                        }
                        readOnly={disableEdit}
                      />
                    </div>
                  </div>
                  <div class="col-sm-3 tel-cell" style={{ display: "flex" }}>
                    <div class="col-sm-3 unvisibleBtn">
                      <FormInput
                        label="Mobile"
                        value={cusPICMobile1a}
                        target="cusPICMobile1a"
                        handleChange={this.handleChange}
                        isToggledEditForm={toggleFormSelection}
                        original={
                          this.props.singleCustomer.data
                            ? this.props.singleCustomer.data.cusPICMobile1a
                            : ""
                        }
                        readOnly={disableEdit}
                      />
                    </div>
                    <div class="col-sm-9 unvisibleBtn">
                      <FormInput
                        label=" "
                        value={cusPICMobile1b}
                        target="cusPICMobile1b"
                        handleChange={this.handleChange}
                        isToggledEditForm={toggleFormSelection}
                        original={
                          this.props.singleCustomer.data
                            ? this.props.singleCustomer.data.cusPICMobile1b
                            : ""
                        }
                        readOnly={disableEdit}
                      />
                    </div>
                  </div>
                  <div class="col-sm-3 unvisibleBtn">
                    <FormInput
                      label="Email"
                      value={cusPICEmail}
                      target="cusPICEmail"
                      handleChange={this.handleChange}
                      isToggledEditForm={toggleFormSelection}
                      original={
                        this.props.singleCustomer.data
                          ? this.props.singleCustomer.data.cusPICEmail
                          : ""
                      }
                      type="email"
                      readOnly={disableEdit}
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
                      isToggledEditForm={toggleFormSelection}
                      original={
                        this.props.singleCustomer.data
                          ? this.props.singleCustomer.data.acctPIC
                          : ""
                      }
                      readOnly={disableEdit}
                    />
                  </div>

                  <div class="col-sm-3 tel-cell" style={{ display: "flex" }}>
                    <div class="col-sm-3 unvisibleBtn">
                      <FormInput
                        label="Tel"
                        value={acctPICtel1a}
                        target="acctPICtel1a"
                        handleChange={this.handleChange}
                        
                        isToggledEditForm={toggleFormSelection}
                        original={
                          this.props.singleCustomer.data
                            ? this.props.singleCustomer.data.acctPICtel1a
                            : ""
                        }
                        readOnly={disableEdit}
                      />
                    </div>
                    <div class="col-sm-9 unvisibleBtn">
                      <FormInput
                        label=" "
                        value={acctPICtel1b}
                        target="acctPICtel1b"
                        handleChange={this.handleChange}
                        isToggledEditForm={toggleFormSelection}
                        original={
                          this.props.singleCustomer.data
                            ? this.props.singleCustomer.data.acctPICtel1b
                            : ""
                        }
                        readOnly={disableEdit}
                      />
                    </div>
                  </div>
                  <div class="col-sm-3 tel-cell" style={{ display: "flex" }}>
                    <div class="col-sm-3 unvisibleBtn">
                      <FormInput
                        label="Mobile"
                        value={acctPICMobile1b}
                        target="acctPICMobile1b"
                        handleChange={this.handleChange}
                        isToggledEditForm={toggleFormSelection}
                        original={
                          this.props.singleCustomer.data
                            ? this.props.singleCustomer.data.acctPICMobile1b
                            : ""
                        }
                        readOnly={disableEdit}
                      />
                    </div>
                    <div class="col-sm-9 unvisibleBtn">
                      <FormInput
                        label=" "
                        value={acctPICMobile1a}
                        target="acctPICMobile1a"
                        handleChange={this.handleChange}
                        
                        isToggledEditForm={toggleFormSelection}
                        original={
                          this.props.singleCustomer.data
                            ? this.props.singleCustomer.data.acctPICMobile1a
                            : ""
                        }
                        readOnly={disableEdit}
                      />
                    </div>
                  </div>
                  <div class="col-sm-3 unvisibleBtn">
                    <FormInput
                      label="Email"
                      value={acctPICEmail}
                      target="acctPICEmail"
                      handleChange={this.handleChange}
                      isToggledEditForm={toggleFormSelection}
                      original={
                        this.props.singleCustomer.data
                          ? this.props.singleCustomer.data.acctPICEmail
                          : ""
                      }
                      type="email"
                      readOnly={disableEdit}

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
                      isToggledEditForm={toggleFormSelection}
                      original={
                        this.props.singleCustomer.data
                          ? this.props.singleCustomer.data.billingAddress
                          : ""
                      }
                      readOnly={disableEdit}
                    />
                  </div>
                  <div className=" col-sm-6 unvisibleBtn">
                    <FormInput
                      label="Delivery Address"
                      value={delAddress}
                      target="delAddress"
                      multiline
                      rows={2}
                      handleChange={this.handleChange}
                      isToggledEditForm={toggleFormSelection}
                      original={
                        this.props.singleCustomer.data
                          ? this.props.singleCustomer.data.delAddress
                          : ""
                      }
                      readOnly={disableEdit}
                    />
                  </div>
                </div>
                  <div class="row">
                    
                  <div class="col-sm-6" style={{ paddingLeft: "0" }}>
                    <div class="col-sm-7 unvisibleBtn">
                      <FormInput
                        label="Country"
                        // key={billingCountry}
                        value={billingCountry}
                        selected
                        target="billingCountry"
                          selectValueKey="id"
                          selectValueName="name"
                        selectValues={
                          this.props.customerDetails.data.data
                            ? this.props.customerDetails.data.data.country
                            : []
                        }
                        handleChange={this.handleChange}
                        isToggledEditForm={toggleFormSelection}
                        original={
                          this.props.singleCustomer.data
                            ? this.props.singleCustomer.data.billingCountry
                            : ""
                        }
                        readOnly={disableEdit}
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  {/* <div class="col-sm-4 unvisibleBtn">
                    <FormInput
                      label="Sales PIC"
                      value={cusPIC}
                      target="cusPIC"
                      
                      selectValueKey="id"
                      selectValues={
                        this.props.customerDetails.data
                          ? this.props.customerDetails.data.cusPIC
                          : []
                      }
                      handleChange={this.handleChange}
                      
                      isToggledEditForm={toggleFormSelection}
                      originalVal={
                        this.props.singleCustomer.data
                          ? this.props.singleCustomer.data.cusPIC
                          : ""
                      }
                    />
                  </div> */}
                  <div class="col-sm-4 unvisibleBtn">
                    <FormInput
                      label="TFES Sales PIC"
                      value={salesPic}
                      target="salesPic"                        
                      selectValues={userList}
                      handleChange={this.handleChange}
                      isToggledEditForm={toggleFormSelection}
                      readOnly={disableEdit}
                      original={
                        this.props.singleCustomer.data
                          ? this.props.singleCustomer.data.salesPic
                          : ""
                      }
                    />
                  </div>
                  <div class="col-sm-4 unvisibleBtn">
                    <FormInput
                      label="Down Payment"
                      // key={downPayment}
                      value={downPayment}
                      target="downPayment"
                      selectValueKey="id"
                      selectValues={
                        this.props.customerDetails.data.data
                          ? this.props.customerDetails.data.data.downPayment
                          : []
                      }
                      handleChange={this.handleChange}
                      isToggledEditForm={toggleFormSelection}
                      original={
                        this.props.singleCustomer.data.downPayment
                          ? this.props.singleCustomer.data.downPayment.id
                          : ""
                      }
                      readOnly={disableEdit}
                    />
                  </div>
                  <div class="col-sm-4 unvisibleBtn">

                    <FormInput
                      label="Payment Term"
                      // key={paymentTerm}
                      value={paymentTerm}
                      target="paymentTerm"
                      selectValueKey="id"
                      selectValueName="name"
                      selectValues={
                        this.props.customerDetails.data.data
                          ? this.props.customerDetails.data.data.paymentTerm
                          : []
                      }
                      handleChange={this.handleChange}
                      isToggledEditForm={toggleFormSelection}
                      original={
                        this.props.singleCustomer.data.paymentTerm
                          ? this.props.singleCustomer.data.paymentTerm.id
                          : ""
                      }
                      readOnly={disableEdit}
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-4 unvisibleBtn">
                    <FormInput
                      label="Incoterm"
                      // key={incoterm}
                      value={incoterm}
                      target="incoterm"
                      selectValueKey="id"
                      selectValues={
                        this.props.customerDetails.data.data
                          ? this.props.customerDetails.data.data.incoterm
                          : []
                      }
                      handleChange={this.handleChange}
                      isToggledEditForm={toggleFormSelection}
                      original={
                        this.props.singleCustomer.data.incoterm
                          ? this.props.singleCustomer.data.incoterm.id
                          : ""
                      }
                      readOnly={disableEdit}
                    />
                  </div>
                  <div class="col-sm-4 unvisibleBtn">
                    <FormInput
                      label="Currency"
                      // key={billingCurrency}
                      value={billingCurrency}
                      target="billingCurrency"
                      selectValueKey="id"
                      selectValues={
                        this.props.customerDetails.data.data
                          ? this.props.customerDetails.data.data.billCurrency
                          : []
                      }
                      handleChange={this.handleChange}
                      
                      isToggledEditForm={toggleFormSelection}
                      original={
                        this.props.singleCustomer.data.billingCurrency
                          ? this.props.singleCustomer.data.billingCurrency.id
                          : ""
                      }
                      readOnly={disableEdit}
                    />
                  </div>
                  <div class="col-sm-4 unvisibleBtn">
                    <FormInput
                      label="GST Requirement"
                      // key={gstReq}
                      value={gstReq}
                      target="gstReq"
                      selectValueKey="id"
                      selectValueName="name"
                      selectValues={
                        this.props.customerDetails.data.data
                          ? this.props.customerDetails.data.data.gstReq
                          : []
                      }
                      handleChange={this.handleChange}
                      
                      isToggledEditForm={toggleFormSelection}
                      original={
                        this.props.singleCustomer.data.gstReq
                          ? this.props.singleCustomer.data.gstReq.id
                          : ""
                      }
                      readOnly={disableEdit}
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-4 unvisibleBtn">
                    <FormInput
                      // key={creditLimit}
                      label="Credit Limit"
                      value={creditLimit}
                      target="creditLimit"
                      selectValueKey="id"
                      selectValueName="name"
                      selectValues={
                        this.props.customerDetails.data.data
                          ? this.props.customerDetails.data.data.creditLimit
                          : []
                      }
                      handleChange={this.handleChange}
                      
                      isToggledEditForm={toggleFormSelection}
                      original={
                        this.props.singleCustomer.data.creditLimit
                          ? this.props.singleCustomer.data.creditLimit.id
                          : ""
                      }
                      readOnly={disableEdit}
                    />
                  </div>
                  <div class="col-sm-4 unvisibleBtn">                   
                    <FormInput
                      // key={creditTerm}
                      label="Credit Term"
                      value={creditTerm}
                      target="creditTerm"
                      selectValueKey="id"
                      selectValues={
                        this.props.customerDetails.data.data
                          ? this.props.customerDetails.data.data.creditTerm
                          : []
                      }
                      handleChange={this.handleChange}
                      isToggledEditForm={toggleFormSelection}
                      original={
                        this.props.singleCustomer.data.creditTerm
                          ? this.props.singleCustomer.data.creditTerm.id
                          : ""
                      }
                      readOnly={disableEdit}
                    />
                  </div>
                </div>
              </div>
            </form>
            <DialogRoot
              show={this.state.toggle}
              handleHide={this.restartToggle}
              size={"lg"}
            >
              <h3>Customer List</h3>
              <TfesCustomerList getInfo={this.getInfo} />
            </DialogRoot>
          </FormWrapper>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ customertfesState,userState }) => {
  const {
    customers,
    customerDetails,
    customerFiltered,
    singleCustomer,
  } = customertfesState;
  const { picUserList } = userState;

  return { customers, customerDetails, customerFiltered, singleCustomer,picUserList };
};
export default connect(mapStateToProps, {
  setCustomerTfes,
  getCustomerTfesDetails,
  getFilterCustomerTfes,
  getCustomerTfes,
  getSingleCustomerRequest,
  patchSingleCustomerRequest,
  getPicUsers
})(crm_new_customer);

// export default SKU_new_customer;
