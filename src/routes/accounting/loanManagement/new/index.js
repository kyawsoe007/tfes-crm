import React, { Component, Fragment } from "react";
//icon

// Components
import FormWrapper from "Components/Form/Layout/FormWrapper";
import FormInput from "Components/Form/FormInput";
import LoanList from "../../capexManagement/components/LoanList";
import JournalAccountList from "../../journalEntries/components/JournalAccountList";
import DialogRoot from "Components/Dialog/DialogRoot";
// React Day Picker input
import DayPickerInput from 'react-day-picker/DayPickerInput';

import { DateUtils } from 'react-day-picker';
import MomentLocaleUtils, {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';
import 'moment/locale/en-SG';
//Material-UI
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
// redux
import { connect } from "react-redux";
import { show } from "redux-modal";
import { getCapex, patchCapex, postCapex } from "Ducks/accounting/capex";
import { loanManagementListPage } from 'Helpers/accountingURL';

import { Check } from "@material-ui/icons";
import { getDropdownGroup } from "Ducks/invoicetfes";
import { getSingleLongTermLoan, postSingleLongTermLoan, patchSingleLongTermLoan, getAllLongTermLoans } from "Ducks/loanManagement";
class LoanManagementFormView extends Component {
    constructor(props) {
        super(props);
        // this.handlePaymentChange = this.handlePaymentChange.bind(this);
        this.state = {
            id: this.props.match.params.id,
            name: '',
            bank: '',
            paymentStartDate: "",
            loanDepositDate: "",
            loanAmount: 0,
            loanDuration: 0,
            monthlyInstall: "",
            debit_account_name: "",
            debit_account: "", //{ type: Schema.Types.ObjectId }
            credit_account_name: "",
            credit_account: "", //{ type: Schema.Types.ObjectId },
            interest_account_name: "",
            interest_account: "", //{ type: Schema.Types.ObjectId },
            interestRate: 0,
            currency: "",
            active: false,
            toggleFormSelection: true,
            disableEdit: false,
            balanceLeft: 0,
            onEditLoan: false,
            type: "long",
            loanList: [],
            errorMsg: ""
        };
        this.getInfoAccount = this.getInfoAccount.bind(this);
    }

    onSubmit = () => {
        let data = { ...this.state }
        delete data.onEditLoan;
        delete data.toggleFormSelection;
        // console.log('datasx', data)
        if (this.state.loanDepositDate === "") {
            this.setState({
                errorMsg: 'Loan Deposit Date not selected yet!',
            })
        }
        else if (this.state.paymentStartDate === "") {
            this.setState({
                errorMsg: 'Date not selected yet!',
            })

        } else {
            if (this.state.onEditLoan) {
                this.props.patchSingleLongTermLoan(data)
            }
            else {
                delete data.id;
                this.props.postSingleLongTermLoan(data)
            }
            this.setState({
                errorMsg: "",
                disableEdit: true,
            })
        }
    };

    componentDidMount() {
        // debugger 
        const _id = this.props.match.params.id;
        // this.props.getAllAccountItem
        this.props.getDropdownGroup();
        // this.props.getAllLongTermLoans()

        if (this.props.match.params.id) {
            this.props.getSingleLongTermLoan(_id)
        }

        // check for type parameters passed in from list view
        if (typeof this.props.location.state !== 'undefined') {
            if (this.props.location.state.type) {
                let type = this.props.location.state.type
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
        if (prevProps.longLoanSingle.data !== this.props.longLoanSingle.data) {
            if (this.props.longLoanSingle.data && this.props.longLoanSingle.data._id) {
                // if(this.props.match.params.id){
                //     this.props.history.push(
                //         singleShortTerm
                //     )
                // }
                this.resetTotalState(true);
            }
        }
    }

    resetTotalState(editStatus) {
        const longLongSingle = this.props.longLoanSingle.data;
        console.log('loan', longLongSingle)
        let newState = {
            id: longLongSingle._id ? longLongSingle._id : '',
            name: longLongSingle.name ? longLongSingle.name : '',
            bank: longLongSingle.bank ? longLongSingle.bank : '',
            paymentStartDate: longLongSingle.paymentStartDate ? longLongSingle.paymentStartDate : "",
            loanDepositDate: longLongSingle.loanDepositDate ? longLongSingle.loanDepositDate : "",
            loanAmount: longLongSingle.loanAmount ? longLongSingle.loanAmount : 0,
            loanDuration: longLongSingle.loanDuration ? longLongSingle.loanDuration : 0,
            monthlyInstall: longLongSingle.monthlyInstall ? longLongSingle.monthlyInstall : 0,
            debit_account_name: longLongSingle.debit_account_name ? longLongSingle.debit_account_name : "",
            debit_account: longLongSingle.debit_account ? longLongSingle.debit_account : "", //{ type: Schema.Types.ObjectId }
            credit_account_name: longLongSingle.credit_account_name ? longLongSingle.credit_account_name : "",
            credit_account: longLongSingle.credit_account ? longLongSingle.credit_account : "", //{ type: Schema.Types.ObjectId },
            interest_account_name: longLongSingle.interest_account_name ? longLongSingle.interest_account_name : "",
            interest_account: longLongSingle.interest_account ? longLongSingle.interest_account : "", //{ type: Schema.Types.ObjectId },
            interestRate: longLongSingle.interestRate ? longLongSingle.interestRate : 0,
            currency: longLongSingle.currency ? longLongSingle.currency : "",
            active: longLongSingle.active ? longLongSingle.active : false,
            toggleFormSelection: true,
            balanceLeft: longLongSingle.balanceLeft ? longLongSingle.balanceLeft : 0,
            onEditLoan: editStatus,
            loanList: longLongSingle.loanList ? longLongSingle.loanList : [],
        }
        this.setState({ ...this.state, ...newState })

        if (newState.status === "cancelled") {
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
        const { name, bank, interestRate, paymentStartDate, loanDepositDate, loanDuration, loanAmount, credit_account_name, debit_account_name, interest_account_name, active, monthlyInstall, currency, disableEdit, toggleFormSelection } = this.state;
        const target = this.state.target
        return (
            <Fragment>
                <FormWrapper onSave={this.onSubmit} centerTitle={this.state.onEditLoan ? 'Update Long-Term Loan Management Page' : 'Create New Long-Term Loan Management Page'} edit="CapexManagement" promptMessage={this.showStatus()}
                    disabled={this.checkDisabled()}
                    title="Back to Loan Management List"
                    listRedirect={loanManagementListPage}
                    showEditButton={this.state.disableEdit && this.state.status !== 'cancelled'}
                    onChangeToEdit={this.onChangeToEdit}
                >
                    <form autoComplete="off" className={(this.state.disableEdit) && 'uneditable'}>
                        <div style={{ marginLeft: "2.5rem" }} className="top-container" >
                            {this.state.errorMsg && (<h4 class="text-danger text-center">{this.state.errorMsg}</h4>)}

                            <div class="row">
                                <div class="col-sm-4 " >
                                    <FormInput
                                        label="Name"
                                        value={name}
                                        target="name"
                                        handleChange={this.handleChange}
                                        readOnly={disableEdit}
                                        isToggledEditForm={toggleFormSelection}
                                        original={this.props.longLoanSingle.data.name ? this.props.longLoanSingle.data.name : ""}
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
                                        original={this.props.longLoanSingle.data.bank ? this.props.longLoanSingle.data.bank : ""}
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
                                        onDayChange={(e) => this.setState({ paymentStartDate: e })}
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
                                <div class="col-sm-4 ">
                                    <p style={{
                                        color: "rgba(0, 0, 0, 0.54)",
                                        padding: "0",
                                        fontSize: "0.75rem",
                                        fontFamily: " Lato",
                                        fontWeight: "400",
                                        lineHeight: " 1",
                                        marginBottom: "1px"
                                    }}>Loan Deposit Date</p>
                                    <DayPickerInput
                                        formatDate={formatDate}
                                        parseDate={parseDate}
                                        value={loanDepositDate !== "" ? `${formatDate(loanDepositDate,'L', 'en-SG')}` : ""}
                                        format="L"
                                        onDayChange={(e) => this.setState({ loanDepositDate: e })}
                                        selectedDay={this.state.loanDepositDate}
                                        // placeholder={`${formatDate(new Date(), 'L', 'en-SG')}`}
                                        placeholder={"DD/MM/YYYY"}
                                        style={{ zIndex: "102" }}
                                        dayPickerProps={{
                                            locale: 'en-SG',
                                            localeUtils: MomentLocaleUtils
                                        }}
                                    />
                                </div>
                                <div class="col-sm-4">
                                    <FormInput
                                        label="Loan Amount"
                                        value={loanAmount}
                                        target="loanAmount"
                                        handleChange={this.handleChange}
                                        readOnly={disableEdit}
                                        isToggledEditForm={toggleFormSelection}
                                        original={this.props.longLoanSingle.data.loanAmount ? this.props.longLoanSingle.data.loanAmount : ""}
                                    />
                                </div>
                                <div class="col-sm-4" >
                                    <FormInput
                                        label="Loan Duration"
                                        value={loanDuration}
                                        target="loanDuration"
                                        handleChange={this.handleChange}
                                        readOnly={disableEdit}
                                        isToggledEditForm={toggleFormSelection}
                                        original={this.props.longLoanSingle.data.loanDuration ? this.props.longLoanSingle.data.loanDuration : ""}
                                    />
                                </div>
                                <div class="col-sm-4" >
                                    <FormInput
                                        label="Interest Rate"
                                        value={interestRate}
                                        target="interestRate"
                                        handleChange={this.handleChange}
                                        readOnly={disableEdit}
                                        isToggledEditForm={toggleFormSelection}
                                        original={this.props.longLoanSingle.data.interestRate ? this.props.longLoanSingle.data.interestRate : ""}
                                    />
                                </div>

                                <div class="col-sm-4">
                                    <FormInput
                                        label="Monthly Install"
                                        value={monthlyInstall}
                                        target="monthlyInstall"
                                        handleChange={this.handleChange}
                                        readOnly={disableEdit}
                                        isToggledEditForm={toggleFormSelection}
                                        original={this.props.longLoanSingle.data.monthlyInstall ? this.props.longLoanSingle.data.monthlyInstall : ""}
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
                                        original={this.props.longLoanSingle.data.currency ? this.props.longLoanSingle.data.currency : ""}
                                    />
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
                                        original={this.props.longLoanSingle.data.debit_account_name ? this.props.longLoanSingle.data.debit_account_name : ""}
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
                                        original={this.props.longLoanSingle.data.credit_account_name ? this.props.longLoanSingle.data.credit_account_name : ""}
                                    />
                                </div>
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
                                        original={this.props.longLoanSingle.data.interest_account_name ? this.props.longLoanSingle.data.interest_account_name : ""}
                                    />
                                </div>
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

                            </div>
                            <div class="boundary-line row" style={{ width: "100%", height: "2px", backgroundColor: "#c0c0c0", margin: "20px auto " }} />
                        </div>
                        <div style={{ marginLeft: "2.5rem" }} className="bottom-container">
                            <div class="row">

                                <div className="col-sm-12"> <LoanList data={this.state.loanList} /></div>
                            </div>

                        </div>
                        <DialogRoot show={this.state.toggle} handleHide={this.restartToggle} size={"lg"}>
                            {(this.state.target === "debitAccount" || this.state.target === "creditAccount" || this.state.target == "interestAccount") && (
                                <div>
                                    <h3>Account List</h3>
                                    <JournalAccountList
                                        getInfo={this.getInfoAccount}
                                        target={this.state.target}
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

const mapStateToProps = ({ accountItemState, invoiceState, LoanManagementState }) => {
    const { accountItem } = accountItemState;
    const { InvoiceProduct, InvoiceDetails } = invoiceState;
    const { longLoanSingle } = LoanManagementState;
    return { accountItem, InvoiceProduct, InvoiceDetails, longLoanSingle };
};
export default connect(mapStateToProps, {
    getCapex,
    patchCapex,
    postCapex,
    getDropdownGroup,
    getAllLongTermLoans,
    getSingleLongTermLoan,
    postSingleLongTermLoan,
    patchSingleLongTermLoan,
    show,
})(LoanManagementFormView);
