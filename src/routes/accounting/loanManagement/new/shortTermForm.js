import React, { Component, Fragment } from "react";
//icon

// Components
import FormWrapper from "Components/Form/Layout/FormWrapper";
import FormInput from "Components/Form/FormInput";
import ShortLoanList from "../../capexManagement/components/ShortLoanList";
import JournalAccountList from "../../journalEntries/components/JournalAccountList";
import DialogRoot from "Components/Dialog/DialogRoot";
import SupplierList from '../../../crm/supplier/new/components/supplierList'
import CreateLoanPayment from 'Components/PopupPage/CreateLoanPayment'

// React Day Picker input
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import MomentLocaleUtils, {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';

import moment from 'moment';
import 'moment/locale/en-SG';
import NumberFormat from 'react-number-format';
//Material-UI
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
// redux
import { connect } from "react-redux";
import { show } from "redux-modal";
import { getSingleShortTermLoan, patchSingleShortTermLoan, postSingleShortTermLoan } from "Ducks/loanManagement";
import { loanManagementListPage } from 'Helpers/accountingURL';
import { Check } from "@material-ui/icons";
import { getSupplierDetails, getFilterSupplier } from 'Ducks/suppliertfes';
import {getDropdownGroup } from "Ducks/invoicetfes";


class ShortLoanManagementFormView extends Component {
    constructor(props) {
        super(props);
        // this.handlePaymentChange = this.handlePaymentChange.bind(this);
        this.state = {
            id: this.props.match.params.id,
            // purchaseValue: 0,
            // lifeSpan: 0,
            // depreciationType: '',
            // purchaseDate: new Date(),
            // capexList: [],
            paymentStartDate: "",
            loanList: [],
            bank: '',
            suppName: '',
            suppId: '',
            poNumber: '',
            loanAmount: 0,
            interestAmount: 0,
            balanceLeft:0,
            loanName: '',
            onEditJournal: false,
            debit_account_name: "",
            credit_account_name: "",
            interest_account_name:"",
            debit_account: "",
            credit_account:"",
            interest_account: "",
            active: true,
            type: "short",
            toggle: false,
            element: null,
            target: "",
            currency: "",
            toggleFormSelection:true,
            disableEdit:false



        };
        this.getInfoAccount = this.getInfoAccount.bind(this);
        this.getInfoSupplier = this.getInfoSupplier.bind(this);
        this.getInfoCreateLoanPayment = this.getInfoCreateLoanPayment.bind(this)
    }

    onSubmit = () => {
        let data = { ...this.state }
        delete data.onEditJournal;
        console.log('datasx', data)
        if (this.state.paymentStartDate === "") {
            this.setState({
                errorMsg: 'Date not selected yet!',
            })

        } else {
            if (this.state.onEditJournal) {
            console.log('data',data)
            this.props.patchSingleShortTermLoan(data)
            }
            else {
                delete data.id;
                this.props.postSingleShortTermLoan(data)
            }
            this.setState({
                errorMsg: '',
                disableEdit: true
            })
        }
    };

    componentDidMount() {
        this.props.getDropdownGroup();
        // this.props.getAllAccountItem
        if (this.props.match.params.id) {
            const id=this.props.match.params.id;
            this.props.getSingleShortTermLoan(id);
        }
        // if(this.props.shortLoanSingle.data && this.props.shortLoanSingle.data._id){
        //     this.resetTotalState()
        // }

        // check for type parameters passed in from list view
        if (typeof this.props.location.state !== 'undefined') {
            if (this.props.location.state.type) {
                let type = this.props.location.state.type
               // this.resetTotalState(true)
                this.setState({
                    type: type
                })
            }
        } else {
            this.setState({
                type: "short"
            })
        }
    }



    componentDidUpdate(prevProps, prevState) {
if(prevProps.shortLoanSingle.data !== this.props.shortLoanSingle.data){
    if(this.props.shortLoanSingle.data && this.props.shortLoanSingle.data._id){
        // if(this.props.match.params.id){
        //     this.props.history.push(
        //         singleShortTerm
        //     )
        // }
        this.resetTotalState(true);
    }
}
    }

    resetTotalState(editStatus){
        const loanManageData=this.props.shortLoanSingle.data;
        let newState={
            onEditJournal:editStatus,
            id:loanManageData._id?loanManageData._id:'',
            paymentStartDate:loanManageData.paymentStartDate?loanManageData.paymentStartDate: "",
            loanList:loanManageData.loanList?loanManageData.loanList: [],
            bank:loanManageData.bank?loanManageData.bank: '',
            suppName:loanManageData.supplier_name?loanManageData.supplier_name: '',
            suppId:loanManageData.suppId?loanManageData.suppId: '',
            poNumber:loanManageData.poNumber?loanManageData.poNumber: '',
            loanAmount:loanManageData.loanAmount?loanManageData.loanAmount: 0,
           // interestAmount:loanManageData._id?loanManageData._id: 0,
           // balanceLeft:loanManageData._id?loanManageData._id:0,
            loanName:loanManageData.loanName?loanManageData.loanName: '',
            debit_account_name:loanManageData.debit_account_name?loanManageData.debit_account_name: "",
            credit_account_name:loanManageData.credit_account_name?loanManageData.credit_account_name: "",
            interest_account_name:loanManageData.interest_account_name?loanManageData.interest_account_name:"",
            debit_account:loanManageData.debit_account?loanManageData.debit_account: "",
            credit_account:loanManageData.credit_account?loanManageData.credit_account:"",
            interest_account:loanManageData.interest_account?loanManageData.interest_account: "",
            active:loanManageData.active?loanManageData.active: false,
           // type:loanManageData._id?loanManageData._id: "short",
           // target:loanManageData._id?loanManageData._id: "",
            currency:loanManageData.currency?loanManageData.currency._id: "",
            toggleFormSelection:true, 

        }
        let balance = newState.loanAmount;
        for(let i=newState.loanList.length-1; i >= 0; i--){
            balance = balance - newState.loanList[i].amount;
            newState.loanList[i].balance = balance;
        }
        this.setState({...this.state,...newState})

        if(newState.status === "cancelled"){
            this.setState({ disableEdit: true })
        }
    }



    checkDisabled() {
        if (this.state.disableEdit == true) {
            return false
        }

        return true
    }

    onChangeToEdit = () => {
        this.setState({
            disableEdit: false,
        })
    }

    getInfoCreateLoanPayment(data) {
        console.log('loadn',data)
        let info = { date: data.date, amount: data.amount, interestAmount: data.interestAmount,miscellaneous_amount:data.miscellaneous_amount,account:data.account };
        let newLoanList = [...this.state.loanList];
        newLoanList.splice(0, 0, info);

        this.setState({
           // toggle: false,
            loanList: newLoanList,
        })
        
    }

    getInfoSupplier(id) {
        const Supplier = this.props.SupplierFiltered.data;
        Supplier.map((source) => {

            console.log(source)
            if (source.id === id) {
                this.setState({
                    ...this.state,
                    toggle: false,
                    suppName: source.name,
                    suppId: source._id && source._id,

                });
            }

        })
    }

    restartToggle = () => {
        this.setState({
            toggle: false,
        });
    };

    handleChange = (field, value) => {
        this.setState({
            [field]: value,
        })
    };

    onPrintPdf = () => { console.log('print pdf') };

    showStatus() {
        if (this.state.status == "confirmed") { return "【 Confirmed 】" }
        if (this.state.status == "draft") { return "【 Draft 】" }
        if (this.state.status == "cancelled") { return "【 Cancelled 】" }
        else { return " " }
    }

    buttonClick = (target) => {
        console.log('target',target)
        this.setState({
            toggle: true,
            element: target,
            target: target,
        });
    };

    getInfoAccount(id, target) {
        const Accounts = this.props.accountItem.data;
        Accounts.map(account => {
            if (account._id === id) {
                if (target === "debitAccount") {
                    this.setState({
                        debit_account_name: account.accountName,
                        debit_account: account._id
                    })
                }
                else if (target === "creditAccount") {
                    this.setState({
                        credit_account_name: account.accountName,
                        credit_account: account._id
                    })
                }
                else if (target === "interestAccount") {
                    this.setState({
                        interest_account_name: account.accountName,
                        interest_account: account._id
                    })
                }
            }
        });
        this.setState({
            toggle: false,
        })
    }

    render() {
        const { bank, paymentStartDate, suppId, suppName, loanName, poNumber, loanAmount, credit_account_name, debit_account_name, interest_account_name, active,currency, disableEdit,toggleFormSelection } = this.state;
        const target = this.state.target
        console.log('result',this.state.loanList)
        return (
            <Fragment>
                <FormWrapper onSave={this.onSubmit} centerTitle={this.state.onEditJournal ? 'Update Short Term Loan Page' : 'Create New Short Term Loan'} edit="CapexManagement" promptMessage={this.showStatus()}
                    disabled={this.checkDisabled()}
                    title="Back to Loan Management List"
                    listRedirect={loanManagementListPage}
                    showEditButton={this.state.disableEdit && this.state.status !== 'cancelled'}
                    onChangeToEdit={this.onChangeToEdit}
                >
                    <form autoComplete="off" className={(this.state.disableEdit ) && 'uneditable'}>
                    <div style={{ marginLeft: "2.5rem" }} className="top-container" >
                        {this.state.errorMsg && (<h4 class="text-danger text-center">{this.state.errorMsg}</h4>)}

                        <div class="row">
                            <div class="col-sm-4" >
                                <FormInput
                                    label="Loan Name"
                                    value={loanName}
                                    target="loanName"
                                    handleChange={this.handleChange}
                                    readOnly={disableEdit}
                                    isToggledEditForm={toggleFormSelection}
                                    original={this.props.shortLoanSingle.data.loanName ? this.props.shortLoanSingle.data.loanName : ""}
                                />
                            </div>
                            <div class="col-sm-4 " >
                                <FormInput
                                    label="Bank"
                                    value={bank}
                                    target="bank"
                                    handleChange={this.handleChange}
                                    readOnly={disableEdit}
                                    isToggledEditForm={toggleFormSelection}
                                    original={this.props.shortLoanSingle.data.bank ? this.props.shortLoanSingle.data.bank : ""}
                                />
                            </div>
                            <div class="col-sm-4 ">
                                <p style={{
                                    color: "rgba(0, 0, 0, 0.54)",
                                    padding: "0",
                                    fontSize: "0.75rem",
                                    fontFamily: " Lato",
                                    fontWeight: "400",
                                    lineHeight: " 1",
                                    marginBottom: "1px"
                                }}>Payment Start Date</p>
                                <DayPickerInput
                                    formatDate={formatDate}
                                    parseDate={parseDate}
                                    value={paymentStartDate !== "" ? `${formatDate(paymentStartDate, 'L', 'en-SG')}` : ""}
                                    format="L"
                                    onDayChange={(e) => this.setState({ paymentStartDate: e})}
                                    selectedDay={this.state.paymentStartDate}
                                    // placeholder={`${formatDate(new Date(), 'L', 'en-SG')}`}
                                    placeholder={"DD/MM/YYYY"}
                                    style={{ zIndex: "101" }}
                                    readOnly={disableEdit}
                                    isToggledEditForm={toggleFormSelection}
                                    dayPickerProps={{
                                        locale: 'en-SG',
                                        localeUtils: MomentLocaleUtils
                                      }}
                                />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-4">
                                <FormInput
                                    label="Loan Amount"
                                    value={loanAmount}
                                    target="loanAmount"
                                    handleChange={this.handleChange}
                                    readOnly={disableEdit}
                                    isToggledEditForm={toggleFormSelection}
                                    original={this.props.shortLoanSingle.data.loanAmount ? this.props.shortLoanSingle.data.loanAmount : ""}
                                />
                            </div>
                            <div class="col-sm-4" >
                                <FormInput
                                    label="PO Number"
                                    value={poNumber}
                                    target="poNumber"
                                    handleChange={this.handleChange}
                                    readOnly={disableEdit}
                                    isToggledEditForm={toggleFormSelection}
                                    original={this.props.shortLoanSingle.data.poNumber ? this.props.shortLoanSingle.data.poNumber : ""}
                                />
                            </div>
                            <div class="col-sm-4">
                                <FormInput
                                    label="Supplier Name"
                                    value={suppName}
                                    target="suppName"
                                    handleChange={this.handleChange}
                                    hasButton={true}
                                    buttonClick={this.buttonClick}
                                    readOnly={disableEdit}
                                    isToggledEditForm={toggleFormSelection}
                                    original={this.props.shortLoanSingle.data.supplier_name ? this.props.shortLoanSingle.data.supplier_name : ""}
                                />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-4" >
                                <FormControlLabel control={
                                    <Checkbox checked={active}
                                        onChange={(e) => this.handleChange("active", e.target.checked)}
                                        value={active}
                                        color="primary"
                                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                                        defaultChecked={active}
                                        disabled={disableEdit}
                                        isToggledEditForm={toggleFormSelection}
                                    />}
                                    label="Active">
                                </FormControlLabel>
                                
                            </div>
                            <div class="col-sm-4" >
                                <FormInput
                                    label="Debit"
                                    value={debit_account_name}
                                    target="debit_account_name"
                                    hasButton={true}
                                    buttonClick={() => this.buttonClick('debitAccount')}
                                    handleChange={this.handleChange}
                                    readOnly={disableEdit}
                                    isToggledEditForm={toggleFormSelection}
                                    original={this.props.shortLoanSingle.data.debit_account_name ? this.props.shortLoanSingle.data.debit_account_name : ""}
                                />
                            </div>
                            <div class="col-sm-4">
                                <FormInput
                                    label="Credit"
                                    value={credit_account_name}
                                    target="credit_account_name"
                                    hasButton={true}
                                    buttonClick={() => this.buttonClick('creditAccount')}
                                    handleChange={this.handleChange}
                                    readOnly={disableEdit}
                                    isToggledEditForm={toggleFormSelection}
                                    original={this.props.shortLoanSingle.data.credit_account_name ? this.props.shortLoanSingle.data.credit_account_name : ""}
                                />
                            </div>  
                        </div>
                        <div className="row">
                             <div class="col-sm-4">
                                <FormInput
                                        label="Interest Acct"
                                        value={interest_account_name}
                                        target="interest_account_name"
                                        hasButton={true}
                                        buttonClick={() => this.buttonClick('interestAccount')}
                                        handleChange={this.handleChange}
                                        readOnly={disableEdit}
                                        isToggledEditForm={toggleFormSelection}
                                        original={this.props.shortLoanSingle.data.interest_account_name ? this.props.shortLoanSingle.data.interest_account_name : ""}
                                    />
                            </div>
                            <div class="col-sm-4 ">
                                <FormInput
                                    label="Currency"
                                    target="currency"
                                    selectValueKey="id"
                                    value={currency}
                                    selectValueName="name"
                                    selectValues={this.props.InvoiceDetails.data ? this.props.InvoiceDetails.data.currency : []}
                                    handleChange={this.handleChange}
                                    readOnly={disableEdit}
                                    isToggledEditForm={toggleFormSelection}
                                    original={this.props.shortLoanSingle.data.currency ? this.props.shortLoanSingle.data.currency.id : ""}
                                    />
                            </div>
                        </div>

                        <div class="boundary-line row" style={{ width: "100%", height: "2px", backgroundColor: "#c0c0c0", margin: "20px auto " }} />
                    </div>
                    <div style={{ marginLeft: "2.5rem" }} className="bottom-container">
                        <div class="row">

                            <div className="col-sm-12"> <ShortLoanList data={this.state.loanList} onCreate={this.buttonClick} /></div>
                        </div>

                    </div>
                    <DialogRoot show={this.state.toggle} handleHide={this.restartToggle} size={"lg"}>
                        {(this.state.target === "debitAccount" || this.state.target === "creditAccount" || this.state.target ==  "interestAccount") && (
                            <div>
                                <h3>Account List</h3>
                                <JournalAccountList
                                    getInfo={this.getInfoAccount}
                                    target={this.state.target}
                                />
                            </div>
                        )}
                        {this.state.target === "suppName" && (<div>
                            <SupplierList
                                getInfo={this.getInfoSupplier}
                                // searchText={this.state.targetSearch}            
                            />
                        </div>)}
                        {this.state.target === "createPayment" && (
                            <div>
                                <CreateLoanPayment
                                    getInfo={this.getInfoCreateLoanPayment}
                                    toggle={this.restartToggle}
                                    accountItem={this.props.InvoiceDetails.data.accountItem}
                                />
                            </div>
                        )}

                    </DialogRoot>
                    </form>
                </FormWrapper>


            </Fragment>
        )
    }
}

const mapStateToProps = ({ suppliertfesState, accountItemState, invoiceState ,LoanManagementState}) => {
    const { accountItem } = accountItemState;
    const {
        Suppliers,
        SupplierDetails,
        SupplierFiltered,
    } = suppliertfesState;
    const {shortLoanSingle}=LoanManagementState
    const { InvoiceProduct, InvoiceDetails } = invoiceState;
    return { accountItem, Suppliers, SupplierDetails, SupplierFiltered,shortLoanSingle, InvoiceProduct, InvoiceDetails  };
};
export default connect(mapStateToProps, {
    getSingleShortTermLoan,
    patchSingleShortTermLoan,
    postSingleShortTermLoan,
    getSupplierDetails,
    getFilterSupplier,
    getDropdownGroup,
    show,
})(ShortLoanManagementFormView);
