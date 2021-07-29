// new quotation
import React, { Component } from "react";
import { connect } from "react-redux";
import RctSectionLoader from "Components/RctSectionLoader";
import { listOptions, getDateTime } from "Helpers/helpers";
// Redux imports
import { getOutstandingSupplierInvoices, setSupplierPayment, getSingleSupplierPaymentRequest, patchSingleSupplierPayment } from "Ducks/supplier-payment";
import { getPaymentMethods }  from "Ducks/paymenttfes"; 
import { getAllAccountItem } from "Ducks/account-item";

import {
    Button, IconButton,
} from "@material-ui/core";
// React Component import
import RecordsList from "Components/RecordsList";
import FormWrapper from "Components/Form/Layout/FormWrapper";
import FormInput from "Components/Form/FormInput";
import DialogRoot from "Components/Dialog/DialogRoot";
import CrmSupplierList from 'Components/PopupPage/SupplierList'
// material-ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// Icon
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import PrintTwoToneIcon from '@material-ui/icons/PrintTwoTone';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// React Day Picker input
import DayPickerInput from 'react-day-picker/DayPickerInput';

import MomentLocaleUtils, {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';
import 'moment/locale/en-SG'
import Checkbox from "@material-ui/core/Checkbox";
import {
    setSupplier,
    getSupplierDetails,
    getSingleSupplierRequest,
    patchSingleSupplierRequest,
    getFilterSupplier,
    setDuplicate,
  } from 'Ducks/suppliertfes'

import { supplierInvoiceListPage } from "Helpers/accountingURL";

class ExpensePaymentNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false,
            onEditPayment: false,
            paymentNo: "",
            element: null,
            target: "",
            errorMsg: "",
            paymentDate: new Date(),
            suppId: "",
            suppNo: "",
            suppName: "",
            total: 0,
            paymentMethod: "",
            period: "",
            paymentRef: "",
            memo: "",
            day: "",
            status: 'draft',
            expenseAmount: 0,
            currencyAmount: 0,
            expenseAccount:  "",
            expense_account_name: "",
            currencyLossAccount: "",
            currency_account_name: "",
            customerButtonShow: true,
            editable: false,
            buttonShow: true,
            page: 1,
            toggleFormSelection: true,
        };
        this.handleDayChange=this.handleDayChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getInfo = this.getInfo.bind(this);
        this.resetTotalState = this.resetTotalState.bind(this);
        this.onPrintPdf = this.onPrintPdf.bind(this)
        this.onConfirmPayment = this.onConfirmPayment.bind(this);
        this.getExpenseAccount = this.getExpenseAccount.bind(this);
    }

    onSubmit() {
        if (this.state.name === '') {
            this.setState({
                errorMsg: 'Customer not selected yet!',
            })
        } else if (this.state.total == 0) {
            this.setState({
                errorMsg: 'Please input total amount!',
            })
        } else if(this.state.currencyAmount > 0 && this.state.currencyLossAccount == undefined){
            this.setState({
                errorMsg: "Currency account not set"
            });
        }   
        
        else {
            const data = {
                ...this.state
            };

            delete data.toggleFormSelection;
            delete data.lines;
            delete data.toggle;
            delete data.element;
            delete data.targetSearch;
            delete data.buttonShow;
            delete data.customerButtonShow;
            delete data.editable;
            delete data.errorMsg;
            delete data.target;
            delete data.page;

            // If edit/update onSubmit
            if (this.state.onEditPayment) {
                data.id = this.state.id;
                this.props.patchSingleSupplierPayment(data)
            } else {
                this.props.setSupplierPayment(data);
            }
        }
    }

    componentDidMount() {
        this.props.getPaymentMethods();
        this.props.getAllAccountItem();
        const id = this.props.match.params.id;
        if (id) {
            this.props.getSingleSupplierPaymentRequest(id);

            if (this.props.SupplierPaymentProduct.data && this.props.SupplierPaymentProduct.data.id) {
                this.resetTotalState(true);
            }
        }
    }

    resetTotalState(editStatus) {
        let reconciles = this.props.OutstandingSupplierInvoice.data;
        console.log('res',reconciles)
        reconciles.forEach(reconcile => {
            reconcile.balance = reconcile.debit - reconcile.credit;
        });

        let newState = {
            onEditPayment: editStatus,
            ...this.props.SupplierPaymentProduct.data,
            reconciles: this.props.OutstandingSupplierInvoice.data ? reconciles : [],
        };

        this.setState({
            ...this.state,
            ...newState,
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.OutstandingSupplierInvoice.data !== this.props.OutstandingSupplierInvoice.data) {
            if (
                this.props.OutstandingSupplierInvoice.data
            ) {
                this.resetTotalState(false);
            }
        }

        if (prevProps.SupplierPaymentProduct.data !== this.props.SupplierPaymentProduct.data) {
            if (
                this.props.SupplierPaymentProduct.data
            ) {
                this.resetTotalState(true);
            }
        }
    }

    getInfo(id) {
        const Customer = this.props.SupplierFiltered.data;
        Customer.map((source) => {
            if (source.id == id) {
                this.setState({
                    toggle: false,
                    customerButtonShow: false,
                    suppId: source._id && source._id ,
                    suppNo: source.suppId && source.suppId,
                    suppName: source.name && source.name ,
                });

                this.props.getOutstandingSupplierInvoices(source._id);
            }
        });
    }
 
    handleChange(field, value) {
        let changeState = { [field]: value };

        this.setState(changeState, () => {
            if (field == "total" && this.state.reconciles) {
                this.autoCalculation()
            }
        });
    }

    handleDayChange(day) {
        this.setState({ invoiceDate: day });
      }

    handleReconcile(e, rowId) {
        let reconciles = this.state.reconciles;
        reconciles.forEach(reconcile => {
            if (reconcile.id === rowId) {
                reconcile.reconciled = e.target.checked;
            }
        });

        this.setState({
            ...this.state,
            reconciles: reconciles
        });
    }

    handleAllocation(e, rowId) {
        let reconciles = this.state.reconciles;
        let value = parseeFloat(e.target.value);
        let total = 0;
        let openingBalance = 0;
        let paymentRate = 1;
        if (this.state.paymentMethod) {
            for (let i = 0; i < this.props.paymentMethod.data.length; i++) {
                if (this.state.paymentMethod === this.props.paymentMethod.data[i]['_id']) {
                    if(this.props.paymentMethod.data[i].currency){
                        paymentRate = this.props.paymentMethod.data[i].currency.latestRate;                    
                        break
                    }
                    
                } 
            }
        }

        reconciles.forEach(reconcile => {
            if (reconcile.id === rowId) {
                reconcile.allocation = Math.round(value *100)/100;
                let sgdAmt = invoice.debit / invoice.currency.latestRate;
                if (this.state.paymentMethod) {
                    openingBalance = amountRounding(2, sgdAmt * paymentRate)
                    // debugger
                } else {
                    // if payment method not selected, its auto convertyed to sgd 
                    openingBalance = sgdAmt
                }
                
                if (openingBalance <= value) {
                    reconcile.reconciled = true;
                } else {
                    reconcile.reconciled = false
                }                                
            }
            total += parseFloat(reconcile.allocation)
        });

        const checkNaN = isNaN(total);
        if(!checkNaN){            
            if(this.state.expenseAmount > 0 || this.state.currencyAmount > 0){
                if(this.state.expenseAmount > 0){
                    total -= parseFloat(this.state.expenseAmount);
                }
                if(this.state.currencyAmount > 0){
                    total -= parseFloat(this.state.currencyAmount);
                }
            }
            console.log(total);
        }

        this.setState({
            ...this.state,
            reconciles: reconciles
        });
    }


    autoCalculation() {
        let subTotal = this.state.total ? parseInt(this.state.total) : 0;
        let totalExpense = parseFloat(this.state.expenseAmount);
        let totalCurrency = parseFloat(this.state.currencyAmount);

        let reconciles = this.state.reconciles;
        let paymentRate = 1;
        if (this.state.paymentMethod) {
            for (let i = 0; i < this.props.paymentMethod.data.length; i++) {
                if (this.state.paymentMethod === this.props.paymentMethod.data[i]['_id']) {
                    if(this.props.paymentMethod.data[i].currency){
                        paymentRate = this.props.paymentMethod.data[i].currency.latestRate;                    
                        break
                    }                   
                } 
            }
        }
        reconciles.forEach(reconcile => {
            let invoiceBalance = parseFloat(reconcile.balance);
            if(reconcile.currency && reconcile.currency.latestRate){
                if(reconcile.currency.latestRate != paymentRate){
                    invoiceBalance = invoiceBalance * paymentRate / reconcile.currency.latestRate;                    
                }
            }
            if (invoiceBalance!= 0 && invoiceBalance <= subTotal) {
                
                reconcile.allocation = amountRounding(2, invoiceBalance);
                reconcile.reconciled = true;
                subTotal = subTotal - invoiceBalance;

            } else if (invoiceBalance != 0 && invoiceBalance > subTotal) {
                reconcile.allocation = amountRounding(2, subTotal);
                reconcile.reconciled = false;
                subTotal = 0;
            }            
        });

        if(subTotal > 0){
            totalExpense = amountRounding(2, subTotal * -1 - totalCurrency);

        }

        this.setState({
            ...this.state,
            reconciles: reconciles,
            expenseAmount: totalExpense
        })
    }

    checkDisabled() {
        if (this.state.status == 'confirmed') {
            return false
        } else {
            return true
        }
    }
    showStatus() {
        if (this.state.status == "confirmed") { return "【 Confirmed 】" }
        if (this.state.status == "draft") { return "【 Draft 】" }
        else { return " " }
    }

    getExpenseAccount(id) {
        const Accounts = this.props.accountItem.data;
        Accounts.map(account => {
            if (account._id === id) {
                if(this.state.element == "expense"){
                    this.setState({
                        expenseAccount: account._id,
                        expense_account_name: account.accountName
                    })
                }                
                else if(this.state.element == "currency"){
                    this.setState({
                        currencyAccount: account._id,
                        currency_account_name: account.accountName
                    })
                }
            }
        });

        this.setState({
            toggle: false,
        })
    }

    searchSupplier = (target, index) => {
        this.setState({
            toggle: true,
            element: target,
            target: target,
            targetSearch: this.state[target]
        })
    }

    buttonClick = (target, index) => {
        let targetVal = this.state.lines[index][target]
        this.setState({
            index: index,
            toggle: true,
            element: target,
            target: 'sku',
            filter: {
                ...this.state.filter,
                [target]: this.state[target]
            }
        });
        const filt = {
            [target]: this.state[target],
        };
        this.props.getFilterProduct(0, 0, filt, "", "");
    };

    restartToggle = () => {
        this.setState({
            toggle: false,
        });
    };

    onConfirmPayment() {
        if (this.state.onEditPayment === true) {
            if(!this.state.paymentMethod){
                alert("You must select payment method first!");
                return;
            }
            if (!this.state.paymentNo) {
                const data = {
                    ...this.state,
                    status: 'confirmed',
                };
                this.props.patchSingleSupplierPayment(data)
            } else {
                alert('This Payment was already confirmed')
            }
        } else {
            alert('You must save this Payment in order to execute confirm')
        }
    }

    onBackToListView = () => {
        this.props.history.push('/app/accounting/supplierInvoice')
    };

    onPrintPdf() {
        console.log("print pdf")
    }
    onCreatePackingOrder=()=> {
        console.log("onCreatePackingOrder")
        alert("onCreatePackingOrder")
    }
    onInvoicing=()=> {
        console.log("onInvoicing")
        alert("onInvoicing")
    }
    render() {
        const { paymentNo, date, paymentMethod, suppNo, total, suppName, period, paymentRef, memo, editable, buttonShow, invoiceDate } = this.state;
        const { loading } = this.props.OutstandingSupplierInvoice;
        const data = this.state.reconciles;

        const columns = [
            { name: "id",  options: { display: "excluded", filter: false, sort: false }},
            { label: "Invoice Number", name: "invoiceNumber", options: { filter: false } },

            { label: "Payment Amount", name: "currency.latestRate", options: {
                filter: false,
                customBodyRender:(value, tableMeta)=>{
                    const currencyAmountIndex = columns.findIndex(x => x.name === "debit");
                    let latestRate = value;

                    //convert back to SGD first then do the conversions 
                    let sgdAmt = amountRounding(2, (tableMeta.rowData[currencyAmountIndex] / value))
                    let currencyAmount = sgdAmt;
                    if (paymentMethod) {
                        for (let i = 0; i < this.props.paymentMethod.data.length; i++) {
                            if (paymentMethod === this.props.paymentMethod.data[i]['_id']) {
                                latestRate = this.props.paymentMethod.data[i].currency.latestRate;
                                currencyAmount = amountRounding(2, currencyAmount * latestRate)
                                break
                            } 
                        }
                    }


                    return(
                        <div> {currencyAmount} </div>
                    )
                }
            } },
            { label: "Currency", name: "currency.currencySymbol", options: { filter: false } },
            { label: "Currency Amount", name: "debit", options: { 
                filter: false,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <div>{amountRounding(2,value)}</div>
                        )
                }
            } },
            { label: "Open balance", name: "balance", options: {
                    filter: false,
                    customBodyRender:(value, tableMeta)=>{

                        //convert back to SGD first then do the conversions 
                        const latestRateIndex = columns.findIndex(x => x.name === "currency.latestRate");
                        let latestRate = tableMeta.rowData[latestRateIndex];
                        let sgdAmt = latestRate && latestRate > 0 ? amountRounding(2, (value / latestRate)) : value;
                        let currencyAmount = sgdAmt

                        if (paymentMethod) {
                            for (let i = 0; i < this.props.paymentMethod.data.length; i++) {
                                if (paymentMethod === this.props.paymentMethod.data[i]['_id']) {
                                    latestRate = this.props.paymentMethod.data[i].currency.latestRate;
                                    currencyAmount = amountRounding(2, currencyAmount * latestRate)
                                    break
                                } 
                            }
                        }
                        // debugger 
                        return(
                            <div>{currencyAmount}</div>
                        )
                    }
                } },
            { label: "Open balance", name: "balance", options: {
                    filter: false,
                    customBodyRender:(value, tableMeta)=>{
                        return(
                            <div>{value}</div>
                        )
                    }
                } },
            { label: "Full reconcile", name: "reconciled", options: {
                    filter: false,
                    customBodyRender:(value, tableMeta)=>{
                        return(
                            <Checkbox
                                defaultChecked={value}
                                onChange={(e) => this.handleReconcile(e, tableMeta.rowData[0])}
                                checked={value}
                            />
                        )
                    }
                } },
            { label: "Allocation", name: "allocation", options: {
                    filter: false,
                    customBodyRender:(value, tableMeta)=>{
                        return(
                            <FormInput
                                defaultValue={value}
                                value={value}
                                onChange={(e) => this.handleAllocation(e, tableMeta.rowData[0])}
                                readOnly={editable} />
                        )
                    }
            } },
            { name: "credit",  options: { display: "excluded", filter: false, sort: false }},                           //6
        ];

        const options = Object.assign({}, listOptions);

        return (
            <React.Fragment>
                <FormWrapper 
                    onSave={this.onSubmit} 
                    onSaveNew={this.onSaveNew} 
                    disabled={this.checkDisabled()} 
                    title="Back to All Payment" 
                    centerTitle={this.state.onEditPayment ? 'Update Supplier Payment Page' : 'Create New Supplier Payment Page'} 
                    edit="test" 
                    promptMessage={this.showStatus()}
                    listRedirect={supplierInvoiceListPage}
                >
                    <form autoComplete="off">
                        <div class="top-container">
                            {this.state.errorMsg && (<h4 class="text-danger text-center">{this.state.errorMsg}</h4>)}
                            <div class="row">
                                <div class="col-sm-4 " >
                                    <FormInput
                                        label="Payment Number"
                                        value={paymentNo}
                                        target="paymentNo"
                                        handleChange={this.handleChange}
                                        readOnly={true}
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
                                    }}>Date</p>
                                    <DayPickerInput
                                        formatDate={formatDate}
                                        parseDate={parseDate}
                                        format="L"
                                    value={`${formatDate(invoiceDate,'L','en-SG')}`}
                                    placeholder={`${formatDate(new Date(), 'L', 'en-SG')}`}
                                    onDayChange={this.handleDayChange}
                                    dayPickerProps={{
                                    locale: 'en-SG',
                                    localeUtils: MomentLocaleUtils
                                    }}
                                    />
                                </div>
                                <div class="col-sm-4">
                                    <FormInput
                                        label="PaymentMethod"
                                        value={paymentMethod}
                                        target="account"
                                        hasButton={false}
                                        selectValueKey="id"
                                        selectValueName="name"
                                        selectValues={[]}
                                        handleChange={this.handleChange}
                                        readOnly={editable}
                                    />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4" >
                                    <FormInput
                                        label="Supplier Ref"
                                        value={suppNo}
                                        target="suppNo"
                                        handleChange={this.handleChange}
                                        readOnly={true}
                                    />
                                </div>
                                <div class="col-sm-4 ">
                                    <FormInput
                                        label="Total"
                                        value={total}
                                        target="total"
                                        handleChange={this.handleChange}
                                        readOnly={editable} />
                                </div>
                                <div class="col-sm-4 ">
                                    <FormInput
                                        label="Supplier Name"
                                        value={suppName}
                                        target="suppName"
                                        buttonClick={this.searchSupplier}
                                        hasButton={buttonShow}
                                        thirdButton={false}
                                        handleChange={this.handleChange}
                                        readOnly={editable}
                                    />
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-4" >
                                    <FormInput
                                        label="Period"
                                        value={period}
                                        target="period"
                                        handleChange={this.handleChange}
                                        readOnly={editable} />
                                </div>
                                <div className="col-sm-4">
                                    <FormInput
                                        label="Payment Ref"
                                        value={paymentRef}
                                        target="paymentRef"
                                        handleChange={this.handleChange}
                                        readOnly={editable}/>
                                </div>
                                <div class="col-sm-4 ">
                                    <FormInput
                                        label="Memo"
                                        value={memo}
                                        target="memo"
                                        handleChange={this.handleChange}
                                        readOnly={editable}/>
                                </div>
                            </div>
                            <div class="boundary-line" style={{ width: "100%", height: "2px", backgroundColor: "#c0c0c0", margin: "20px auto " }}></div>

                            {
                                loading ? (
                                    <RctSectionLoader />
                                ) : (
                                    <RecordsList
                                        title={"OutStanding Invoices"}
                                        columns={columns}
                                        data={data}
                                        options={options}
                                    />
                                )
                            }

                    <div class="row">
                                <div class="col-sm-5 offset-7 quoSummary mt-10">
                                    <div class="row quoSummary-content">
                                        <div class="col-sm-3 text-right" style={{marginTop:19}}>Expense write-off:</div>
                                        <div class="col-sm-3" style={{marginTop:19}}><FormInput
                                        label=""
                                        value={this.state.expenseAmount}
                                        target="expenseAmount"
                                        handleChange={this.handleChange}                                        
                                    /></div>
                                       <div class="col-sm-6"><FormInput
                                            label="Expense Account"
                                            value={this.state.expense_account_name}
                                            target="expense_account_name"
                                            hasButton={buttonShow}   
                                            buttonClick={() => this.searchCustomer('account', 'expense')}
                                                                                        
                                            readOnly={editable}
                                        /></div>
                                    <div class="col-sm-3 text-right" style={{marginTop:19}}>Currency Loss</div>
                                        <div class="col-sm-3" style={{marginTop:19}}><FormInput
                                        label=""
                                        value={this.state.currencyAmount}
                                        target="currencyAmount"
                                        handleChange={this.handleChange}                                        
                                    /></div>
                                    <div class="col-sm-6"><FormInput
                                            label="Currency Loss"
                                            value={this.state.currency_account_name}
                                            target="currency_account_name"
                                            hasButton={buttonShow}
                                            buttonClick={() => this.searchCustomer('account', 'currency')}                                     
                                            readOnly={editable}
                                        /></div>
                                    </div>
                                    
                                </div>
                               
                            </div>

                        </div>

                        <div className="Left_Toolbar-wrapper">
                            <AppBar position="fixed" color="primary" style={{
                                top: 'auto',
                                bottom: "200px",
                                left: "0",
                                right: "-20px",
                                width: "50px",
                                opacity: "0.8",
                                borderRadius: "4px"
                            }}>
                                <Toolbar>
                                    <div className="Left_Toolbar"
                                         style={{
                                         }}
                                    >
                                        {this.state.status != "confirmed"
                                        &&<div onClick={this.onConfirmPayment}>
                                            <ConfirmationNumberIcon />
                                            <span> Confirm Payment </span>
                                        </div>}
                                        <div onClick={this.onPrintPdf}>
                                            <PrintTwoToneIcon />
                                            <span> Print Payment </span>
                                        </div>
                                        <div onClick={this.onBackToListView}>
                                            <ArrowBackIcon />
                                            <span>Back to Payment List</span>
                                        </div>
                                    </div>
                                </Toolbar>
                            </AppBar>
                        </div>

                    </form>
                    <DialogRoot show={this.state.toggle} handleHide={this.restartToggle} size={"lg"}>
                        {this.state.target === "suppName" ? (
                            <div>
                                <h3>Supplier List</h3>
                                <CrmSupplierList
                                    getInfo={this.getInfo} />
                            </div>) : this.state.target === "account" ?
                            (
                                <div>
                                    <h3>Account List</h3>
                                    <JournalAccountList
                                        getInfo={this.getExpenseAccount} />
                                </div>
                         ) : null }
                    </DialogRoot>
                </FormWrapper>
            </React.Fragment >
        );
    }
}

const mapStateToProps = ({ suppliertfesState, supplierPaymentState,accountItemState }) => {
    const {
        SupplierFiltered,
      } = suppliertfesState
      const { accountItem } = accountItemState;
    const { OutstandingSupplierInvoice, SupplierPaymentProduct } = supplierPaymentState;
    return {SupplierFiltered, OutstandingSupplierInvoice, SupplierPaymentProduct, accountItem };
};
export default connect(mapStateToProps, {
    getOutstandingSupplierInvoices,
    setSupplierPayment,
    getSingleSupplierPaymentRequest,
    patchSingleSupplierPayment,
    getFilterSupplier,
    getPaymentMethods,
    getAllAccountItem
})(ExpensePaymentNew);
