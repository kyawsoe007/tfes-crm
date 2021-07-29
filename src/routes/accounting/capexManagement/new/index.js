import React, { Component, Fragment } from "react";
import Checkbox from '@material-ui/core/Checkbox';
//icon

// Components
import FormWrapper from "Components/Form/Layout/FormWrapper";
import FormInput from "Components/Form/FormInput";
import LoanList from "../components/LoanList";
import CapexList from "../components/CapexList";

// React Day Picker input
import DayPickerInput from 'react-day-picker/DayPickerInput';
import DayPicker from "react-day-picker";
import { DateUtils } from 'react-day-picker';
import MomentLocaleUtils, {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';
import moment from 'moment';
import 'moment/locale/en-SG';
// redux
import { connect } from "react-redux";
import { show } from "redux-modal";
import { getAllCapexs, getCapex, patchCapex, postCapex, deleteCapex } from "Ducks/accounting/capex";
import { CapexManagementListPage, singleCapexManagement } from 'Helpers/accountingURL';
import { getAllAccountItem } from "Ducks/account-item";
import DialogRoot from "Components/Dialog/DialogRoot";
import JournalAccountList from "../../journalEntries/components/JournalAccountList";
class CapexManagementFormView extends Component {
    constructor(props) {
        super(props);
        this.handleDayChange = this.handleDayChange.bind(this);
        this.handlePaymentChange = this.handlePaymentChange.bind(this);
        this.state = {
            id: this.props.match.params.id,
            name: '',
            purchase_value: 0,
            life_span: 0,
            residual_amount: 0,
            depreciation_type: '',
            purchase_date: "",
            capexList: [],
            loanList: [],
            bank: '',
            interest_rate: 0,
            loan_installment: 0,
            payment_startdate: "",
            loan_duration: 0,
            loan_amount: 0,
            onEditJournal: false,
            active: true,
            debit_account: '',
            credit_account: '',
            debit_account_name: '',
            credit_account_name: '',
            loan_debit_account: '',
            loan_credit_account: '',
            loan_interest_account: '',
            loan_debit_account_name: '',
            loan_credit_account_name: '',
            loan_interest_account_name: '',
            toggle: false,
            target: '',
            disableEdit: false,
            toggleFormSelection: true,

        };
    }

    onSubmit = () => {
        let data = { ...this.state }
        delete data.onEditJournal;
        delete data.toggleFormSelection;
        // console.log('datasx', data)

        // console.log("-----IN onSubmit-----")
        // console.log("creditAccID: ", this.state.credit_account);
        // console.log("creditAccName:", this.state.credit_account_name);
        // console.log("target:", this.state.target);
        if (this.state.purchase_date === "") {
            this.setState({
                errorMsg: 'Purchase Date not selected yet!',
            })
        }
        else if (this.state.payment_startdate === "") {
            this.setState({
                errorMsg: 'Payment Start Date not selected yet!',
            })
        }
        else {
            if (this.state.onEditJournal) {
                this.props.patchCapex(data)
            }
            else {
                delete data.id;
                this.props.postCapex(data)
            }
            this.setState({
                toggleFormSelection: true,
                disableEdit: true,
                errorMsg: ""
            })
        }
    };

    componentDidMount() {
        this.props.getAllAccountItem()
        if (this.props.match.params.id) {
            this.props.getCapex(this.props.match.params.id)
            // this.capexList(this.state.purchase_date, new Date)
        }
    }



    componentDidUpdate(prevProps, prevState) {
        if (prevProps.capex.data != this.props.capex.data) {
            if (this.props.capex.data) {
                if (typeof state === 'undefined') {
                    this.props.history.push(
                        singleCapexManagement(this.props.capex.data.id)
                    )
                    this.setState({
                        id: this.props.capex.data.id
                    })
                }
            }

            this.setState({
                onEditJournal: true,
                name: this.props.capex.data.name,
                purchase_value: this.props.capex.data.purchase_value,
                life_span: this.props.capex.data.life_span,
                residual_amount: this.props.capex.data.residual_amount,
                depreciation_type: this.props.capex.data.depreciation_type,
                purchase_date: this.props.capex.data.purchase_date,
                bank: this.props.capex.data.bank,
                interest_rate: this.props.capex.data.interest_rate,
                loan_installment: this.props.capex.data.loan_installment,
                payment_startdate: this.props.capex.data.payment_startdate,
                loan_duration: this.props.capex.data.loan_duration,
                loan_amount: this.props.capex.data.loan_amount,
                capexList: this.props.capex.data.CapexList,
                loanList: this.props.capex.data.LoanList,
                active: this.props.capex.data.active,
                debit_account: this.props.capex.data.debit_account,
                debit_account_name: this.getAccountName(this.props.capex.data.debit_account),
                credit_account: this.props.capex.data.credit_account,
                credit_account_name: this.getAccountName(this.props.capex.data.credit_account),
                loan_debit_account: this.props.capex.data.loan_debit_account,
                loan_debit_account_name: this.getAccountName(this.props.capex.data.loan_debit_account),
                loan_credit_account: this.props.capex.data.loan_credit_account,
                loan_credit_account_name: this.getAccountName(this.props.capex.data.loan_credit_account),
                loan_interest_account: this.props.capex.data.loan_interest_account,
                loan_interest_account_name: this.getAccountName(this.props.capex.data.loan_interest_account),

            })
            // if (this.props.capex.data.debit_account) {
            //     this.setAccount(this.props.capex.data.debit_account, "account_debit")
            // }
            // if (this.props.capex.data.credit_account) {
            //     this.setAccount(this.props.capex.data.credit_account, "account_credit")
            // }
            // if (this.props.capex.data.loan_debit_account) {
            //     this.setAccount(this.props.capex.data.loan_debit_account, "loan_debit")
            // }
            // if (this.props.capex.data.loan_credit_account) {
            //     this.setAccount(this.props.capex.data.loan_credit_account, "loan_credit")
            // }
            // if (this.props.capex.data.loan_interest_account) {
            //     this.setAccount(this.props.capex.data.loan_interest_account, "loan_interest")
            // }
        }
        if (prevState !== this.state) {
            // console.log("ca", prevState)
            this.forceUpdate()
        }
    }
    handleDayChange(day) {
        this.setState({ purchase_date: day });
    }
    handlePaymentChange(day) {
        this.setState({ payment_startdate: day });
    }

    getAccountName(id) {
        for (let i = 0; i < this.props.accountItem.data.length; i++) {
            if (this.props.accountItem.data[i]._id === id) {
                return this.props.accountItem.data[i].accountName;
            }
        }

    }

    checkDisabled() {
        if (this.state.disableEdit == true) {
            return false;
        } else {
            return true;
        }
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
        if (this.state.active == true) { return "【 Active 】" }
        if (this.state.active == false) { return "【 InActive 】" }
        // if (this.state.status == "cancelled") { return "【 Cancelled 】" }
        else { return " " }
    }

    setAccount = (id, acctType) => {
        let accName = this.getAccountName(id);
        console.log("-----IN setAccount-----")
        console.log("id: ", id);
        console.log("accName:", accName);
        console.log("acctType:", acctType);
        console.log("target:", this.state.target);

        if (acctType == "account_debit" || this.state.target == "account_debit") {
            this.setState({
                debit_account: id,
                debit_account_name: accName,
                toggle: false
            })
        }
        else if (acctType == "account_credit" || this.state.target == "account_credit") {
            this.setState({
                credit_account: id,
                credit_account_name: accName,
                toggle: false
            })
        }
        else if (acctType == "loan_debit" || this.state.target == "loan_debit") {
            this.setState({
                loan_debit_account: id,
                loan_debit_account_name: accName,
                toggle: false
            })
        }
        else if (acctType == "loan_credit" || this.state.target == "loan_credit") {
            this.setState({
                loan_credit_account: id,
                loan_credit_account_name: accName,
                toggle: false
            })
        }
        else if (acctType == "loan_interest" || this.state.target == "loan_interest") {
            this.setState({
                loan_interest_account: id,
                loan_interest_account_name: accName,
                toggle: false
            })
        }

    }



    restartToggle = () => {
        setToggle(false)
    }
    handleCheckChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };


    render() {
        const { name, purchase_value, debit_account, credit_account, credit_account_name,
            debit_account_name, life_span, residual_amount, active, depreciation_type, purchase_date, bank, interest_rate, loan_installment, payment_startdate, loan_duration, loan_amount, loan_interest_account, loan_interest_account_name,
            loan_debit_account, loan_debit_account_name, loan_credit_account, loan_credit_account_name, disableEdit, toggleFormSelection } = this.state;
        return (
            <Fragment>
                <FormWrapper
                    onSave={this.onSubmit}
                    centerTitle={this.state.onEditJournal ? 'Update Capex Management Page' : 'Create New Capex Management Page'}
                    edit="CapexManagement"
                    promptMessage={this.showStatus()}
                    onChangeToEdit={this.onChangeToEdit}
                    disabled={this.checkDisabled()}
                    title="Back to Capex Management List"
                    listRedirect={CapexManagementListPage}
                    showEditButton={this.state.disableEdit && this.state.status !== "confirmed"}
                >

                    <form autoComplete="off" className={(this.state.disableEdit || this.state.view) && 'uneditable'}>
                        <div style={{ marginLeft: "2.5rem" }} className="top-container" >
                            {this.state.errorMsg && (<h4 class="text-danger text-center">{this.state.errorMsg}</h4>)}

                            <div class="row">
                                <div class="col-sm-4 " >
                                    <FormInput
                                        label="Item Name"
                                        value={name}
                                        target="name"
                                        handleChange={this.handleChange}
                                        readOnly={disableEdit}
                                        isToggledEditForm={toggleFormSelection}
                                        original={this.props.capex.data.name ? this.props.capex.data.name : ""}
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
                                    }}>Purchase Date</p>
                                    <DayPickerInput
                                        formatDate={formatDate}
                                        parseDate={parseDate}
                                        value={purchase_date !== "" ? `${formatDate(purchase_date,'L', 'en-SG')}` : ""}
                                        format="L"
                                        onDayChange={this.handleDayChange}
                                        selectedDay={this.state.purchase_date}
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
                                        label="Purchase Value"
                                        value={purchase_value}
                                        target="purchase_value"
                                        handleChange={this.handleChange}
                                        readOnly={disableEdit}
                                        isToggledEditForm={toggleFormSelection}
                                        original={this.props.capex.data.purchase_value ? this.props.capex.data.purchase_value : 0}
                                    />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4" >
                                    <FormInput
                                        label="Life Span"
                                        value={life_span}
                                        target="life_span"
                                        handleChange={this.handleChange}
                                        readOnly={disableEdit}
                                        isToggledEditForm={toggleFormSelection}
                                        original={this.props.capex.data.life_span ? this.props.capex.data.life_span : ""}
                                    />
                                </div>
                                <div class="col-sm-4" >
                                    <FormInput
                                        label="Depreciation"
                                        value={depreciation_type}
                                        target="depreciation_type"
                                        handleChange={this.handleChange}
                                        seleteValueKey="name"
                                        selectValueName="name"
                                        selectValues={[{ name: 'Monthly', value: 'Monthly' },
                                        { name: 'Yearly', value: 'Yearly' }]}
                                        readOnly={disableEdit}
                                        isToggledEditForm={toggleFormSelection}
                                        original={this.props.capex.data.depreciation_type ? this.props.capex.data.depreciation_type : ""}
                                    />
                                </div>
                                <div class="col-sm-4" >
                                    <FormInput
                                        label="Residual Amount"
                                        value={residual_amount}
                                        target="residual_amount"
                                        handleChange={this.handleChange}
                                        readOnly={disableEdit}
                                        isToggledEditForm={toggleFormSelection}
                                        original={this.props.capex.data.residual_amount ? this.props.capex.data.residual_amount : 0}
                                    />
                                </div>
                            </div>
                            <div class="boundary-line row" style={{ width: "100%", height: "1px", backgroundColor: "#c0c0c0", margin: "20px auto " }} />
                            <div className="row">

                                <div className="col-2">
                                    <form>
                                        <label>Active:</label>
                                        <Checkbox
                                            checked={this.state.active}
                                            onChange={this.handleCheckChange('active')}
                                            value="active"
                                        />
                                    </form>
                                    {/* <FormInput 
                                onChange={(e) => this.handleInputChange(e.target.name,e.target.checked)}
                                   label="Active"  
                                   name='active'                                
                                   checked={active}
                                   value={active}
                                   type="checkbox"
                                   style={{ width:"20px", height:"15px", marginTop:"5px"}}
                                />                                    */}
                                </div>
                                <div className="col-2" />
                                <div className="col-4">
                                    <FormInput
                                        label="Debit"
                                        handleChange={this.handleChange}
                                        value={debit_account ? debit_account_name : ''}
                                        target='debit_account'
                                        // isToggleEditForm={true}
                                        readOnly={disableEdit}
                                        isToggledEditForm={toggleFormSelection}
                                        hasButton={true}
                                        secondButtonClick={(target, index) => this.setState({ target: 'account_debit' })}
                                        buttonClick={(target, index) => { this.setState({ target: 'account_debit', toggle: true }) }}
                                        original={this.props.capex.data.debit_account ? this.getAccountName(this.props.capex.data.debit_account) : ""}
                                    />
                                </div>
                                <div className="col-4">
                                    <FormInput
                                        label="Depreciation acct"
                                        handleChange={this.handleChange}
                                        value={credit_account ? credit_account_name : ''}
                                        target='credit_account'
                                        // isToggleEditForm={true}
                                        readOnly={disableEdit}
                                        isToggledEditForm={toggleFormSelection}
                                        hasButton={true}
                                        secondButtonClick={(target, index) => this.setState({ target: 'account_credit' })}
                                        buttonClick={(target, index) => { this.setState({ target: 'account_credit', toggle: true }) }}
                                        original={this.props.capex.data.credit_account ? this.getAccountName(this.props.capex.data.credit_account) : ""}

                                    />
                                </div>
                            </div>
                            <div class="boundary-line row" style={{ width: "100%", height: "2px", backgroundColor: "#c0c0c0", margin: "20px auto " }} />

                            <div class="row">
                                <div class="col-sm-4 " >
                                    <FormInput
                                        label="Bank"
                                        value={bank}
                                        target="bank"
                                        handleChange={this.handleChange}
                                        readOnly={disableEdit}
                                        isToggledEditForm={toggleFormSelection}
                                        original={this.props.capex.data.bank ? this.props.capex.data.bank : ""}
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
                                        value={payment_startdate !== "" ? `${formatDate(payment_startdate,'L','en-SG')}` : ""}
                                        format="L"
                                        onDayChange={this.handlePaymentChange}
                                        selectedDay={this.state.payment_startdate}
                                        // placeholder={`${formatDate(new Date(), 'L', 'en-SG')}`}
                                        placeholder={"DD/MM/YYYY"}
                                        style={{ zIndex: "101" }}
                                        dayPickerProps={{
                                            locale: 'en-SG',
                                            localeUtils: MomentLocaleUtils
                                        }}
                                    />
                                </div>
                                <div class="col-sm-4">
                                    <FormInput
                                        label="Loan Amount"
                                        value={loan_amount}
                                        target="loan_amount"
                                        handleChange={this.handleChange}
                                        readOnly={disableEdit}
                                        isToggledEditForm={toggleFormSelection}
                                        original={this.props.capex.data.loan_amount ? this.props.capex.data.loan_amount : ""}
                                    />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4" >
                                    <FormInput
                                        label="Loan Duration"
                                        value={loan_duration}
                                        target="loan_duration"
                                        handleChange={this.handleChange}
                                        readOnly={disableEdit}
                                        isToggledEditForm={toggleFormSelection}
                                        original={this.props.capex.data.loan_duration ? this.props.capex.data.loan_duration : ""}
                                    />
                                </div>
                                <div class="col-sm-4" >
                                    <FormInput
                                        label="InterestRate"
                                        value={interest_rate}
                                        target="interest_rate"
                                        handleChange={this.handleChange}
                                        readOnly={disableEdit}
                                        isToggledEditForm={toggleFormSelection}
                                        original={this.props.capex.data.interest_rate ? this.props.capex.data.interest_rate : ""}
                                    />
                                </div>
                                <div class="col-sm-4" >
                                    <FormInput
                                        label="Loan Installment"
                                        value={loan_installment}
                                        target="loan_installment"
                                        handleChange={this.handleChange}
                                        readOnly={disableEdit}
                                        isToggledEditForm={toggleFormSelection}
                                        original={this.props.capex.data.loan_installment ? this.props.capex.data.loan_installment : ""}
                                    />
                                </div>
                            </div>
                            <div className="row">

                                <div className="col-4">
                                    <FormInput
                                        label="Loan Interest Account"
                                        handleChange={this.handleChange}
                                        value={loan_interest_account ? loan_interest_account_name : ''}
                                        target='loan_interest_account'
                                        // isToggleEditForm={true}
                                        readOnly={disableEdit}
                                        isToggledEditForm={toggleFormSelection}
                                        hasButton={true}
                                        secondButtonClick={(target, index) => this.setState({ target: 'loan_interest' })}
                                        buttonClick={(target, index) => { this.setState({ target: 'loan_interest', toggle: true }) }}
                                        original={this.props.capex.data.loan_interest_account ? this.getAccountName(this.props.capex.data.loan_interest_account) : ""}
                                    />
                                </div>

                                <div className="col-4">
                                    <FormInput
                                        label="Bank Acct"
                                        handleChange={this.handleChange}
                                        value={loan_debit_account ? loan_debit_account_name : ''}
                                        target='loan_debit_account'
                                        // isToggleEditForm={true}
                                        readOnly={disableEdit}
                                        isToggledEditForm={toggleFormSelection}
                                        hasButton={true}
                                        secondButtonClick={(target, index) => this.setState({ target: 'loan_debit' })}
                                        buttonClick={(target, index) => { this.setState({ target: 'loan_debit', toggle: true }) }}
                                        original={this.props.capex.data.loan_debit_account ? this.getAccountName(this.props.capex.data.loan_debit_account) : ""}
                                    />
                                </div>
                                <div className="col-4">
                                    <FormInput
                                        label="Loan Credit"
                                        handleChange={this.handleChange}
                                        value={loan_credit_account ? loan_credit_account_name : ''}
                                        target='loan_credit_account'
                                        // isToggleEditForm={true}
                                        readOnly={disableEdit}
                                        isToggledEditForm={toggleFormSelection}
                                        hasButton={true}
                                        secondButtonClick={(target, index) => this.setState({ target: 'loan_credit' })}
                                        buttonClick={(target, index) => { this.setState({ target: 'loan_credit', toggle: true }) }}
                                        original={this.props.capex.data.loan_credit_account ? this.getAccountName(this.props.capex.data.loan_credit_account) : ""}

                                    />
                                </div>
                            </div>
                            <div class="boundary-line row" style={{ width: "100%", height: "2px", backgroundColor: "#c0c0c0", margin: "20px auto " }} />
                        </div>
                        <div style={{ marginLeft: "2.5rem" }} className="bottom-container">
                            <div class="row">
                                <div className="col-sm-6"> <CapexList data={this.state.capexList} /></div>
                                <div className="col-sm-6"> <LoanList data={this.state.loanList} /></div>
                            </div>

                        </div>
                    </form>




                </FormWrapper>
                <DialogRoot show={this.state.toggle} handleHide={this.restartToggle} size={"lg"}>

                    <div>
                        <h3>Account List</h3>
                        <JournalAccountList
                            getInfo={this.setAccount}
                            target={this.state.target}
                        />
                    </div>

                </DialogRoot>

            </Fragment>
        )
    }
}

const mapStateToProps = ({ accountingState, accountItemState }) => {
    const { capexState } = accountingState;
    const { capex } = capexState;
    const { accountItem } = accountItemState
    return { capex, accountItem };
};
export default connect(mapStateToProps, {
    getCapex,
    patchCapex,
    postCapex,
    getAllAccountItem,
    show,
})(CapexManagementFormView);
