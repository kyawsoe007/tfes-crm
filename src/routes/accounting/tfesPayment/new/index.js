// new quotation
import React, { Component } from "react";
import { connect } from "react-redux";
import RctSectionLoader from "Components/RctSectionLoader";
import { tfesPaymentNewPage, singleTfesPayment } from "Helpers/accountingURL";
import { listOptions, getDateTime } from "Helpers/helpers";
import { amountRounding } from "Helpers/helpers";
// Redux imports
import { getOutstandingInvoices, setPayment, getSinglePaymentRequest, patchSinglePayment, getPaymentMethods } from "Ducks/paymenttfes";
import { getAllAccountItem } from "Ducks/account-item";
import { getSingleSupplierRequest } from "Ducks/suppliertfes";
import { getSingleCustomerRequest } from "Ducks/customertfes";
import { Button, IconButton } from "@material-ui/core";
// React Component import
import RecordsList from "Components/RecordsList";
import FormWrapper from "Components/Form/Layout/FormWrapper";
import FormInput from "Components/Form/FormInput";
import DialogRoot from "Components/Dialog/DialogRoot";
import TfesCustomerList from 'Components/PopupPage/TfesCustomerList'
import JournalAccountList from "../../journalEntries/components/JournalAccountList";
import JournalPartnerList from 'Components/PopupPage/JournalPartnerList';

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
import moment from 'moment';
import 'moment/locale/en-SG';
import Checkbox from "@material-ui/core/Checkbox";

import { tfesPaymentListPage } from "Helpers/accountingURL";

const INIT_STATE = {
    toggle: false,
    onEditPayment: false,
    paymentNo: "",
    element: null,
    target: "",
    errorMsg: "",
    paymentDate: "",
    custId: "",
    custNo: "",
    custName: "",
    total: 0,
    paymentMethod: "",
    period: "",
    paymentRef: "",
    invoices: [],
    creditNotes: [],
    memo: "",
    day: "",
    status: 'draft',
    expenseAmount: 0,
    currencyLossAmount: 0,
    expenseAccount:  "",
    expense_account_name: "",
    currencyAccount: "",
    currency_account_name: "",
    customerButtonShow: true,
    editable: false,
    disableEdit: false,
    buttonShow: true,
    page: 1,
    toggleFormSelection: true,
};

class TfesPaymentNew extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INIT_STATE };
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        //this.getInfoCustomer = this.getInfoCustomer.bind(this);
        this.getInfoPartner = this.getInfoPartner.bind(this);
        this.getExpenseAccount = this.getExpenseAccount.bind(this);
        this.resetTotalState = this.resetTotalState.bind(this);
        this.onPrintPdf = this.onPrintPdf.bind(this)
        this.onConfirmPayment = this.onConfirmPayment.bind(this)
    }

    onSubmit() {
        if (this.state.custNo === '') {
            this.setState({
                errorMsg: 'Customer not selected yet!',
            })
        } else if(this.state.currencyLossAmount > 0 && this.state.currencyAccount == undefined){
            this.setState({
                errorMsg: "Currency account not set"
            });
        } else if(this.state.paymentDate === ""){
            this.setState({
                errorMsg: "Date not selected yet!"
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
            delete data.disableEdit;
            delete data.errorMsg;
            delete data.target;
            delete data.page;
            delete data.creditNoteTotal;
            delete data._id;

            // If edit/update onSubmit
            if (this.state.onEditPayment) {
                data.id = this.state.id;
                this.props.patchSinglePayment(data)
            } else {
                this.props.setPayment(data);
            }
            this.setState({
                toggleFormSelection: true,
                disableEdit: true,
                errorMsg: "",
            })
        }
    }

    componentDidMount() {
        this.props.getPaymentMethods();
        this.props.getAllAccountItem();
        
        const id = this.props.match.params.id;
        if (id) {
            this.props.getSinglePaymentRequest(id);

            //if (this.props.PaymentProduct.data && this.props.PaymentProduct.data.id) {
                this.resetTotalState(true);
            //}
        }
    }

    resetTotalState(editStatus, isEdit) {
        let newState =  {};
        if(editStatus){
            newState = {
                ...INIT_STATE
            }
        }
        else {
            let creditNoteTotal = 0;
            let invoices = this.props.OutstandingInvoice.invoices;
            let creditNotes = this.props.OutstandingInvoice.creditNotes;
            invoices.forEach(invoice => {
                invoice.balance = invoice.debit - invoice.credit;
            });
    
            creditNotes.forEach(credit => {
                credit.balance = credit.credit - credit.debit;
                creditNoteTotal += credit.credit;
            });
    
            newState = {
                ...this.props.PaymentProduct.data,
                invoices: invoices ? invoices : [],
                creditNotes: creditNotes ? creditNotes : [],
                creditNoteTotal: creditNoteTotal
            };
            newState.onEditPayment = isEdit;
    
            if(this.props.accountItem.data && this.props.accountItem.data.length > 0){
                this.props.accountItem.data.forEach(acc => {
                    if(newState.expenseAccount){
                        if(acc._id == newState.expenseAccount){
                           
                            newState.expense_account_name = acc.accountName;
                        }
                    }
                    if(newState.currencyAccount){
                        if(acc._id == newState.currencyAccount){
                            newState.currency_account_name = acc.accountName;
                        }
                    }                                        
                    
                })
                             
            }
        }
       

        if (this.props.PaymentProduct.data.currencyAccount){
            // Account id
            newState.currencyLossAccount = this.props.PaymentProduct.data.currencyAccount;
            // Account Name
            newState.currency_account_name = this.getAccountName(this.props.PaymentProduct.data.currencyAccount);
        }

        if (this.props.PaymentProduct.data.expenseAccount){
            // Account id
            newState.expenseAccount = this.props.PaymentProduct.data.expenseAccount;
            // Account Name
            newState.expense_account_name = this.getAccountName(this.props.PaymentProduct.data.expenseAccount);
        }

        this.setState({
            ...newState,
        })

        if (newState === 'closed'){
            this.setState({ disableEdit: true })
        }
    }

    componentDidUpdate(prevProps, prevState) {

        if (prevProps.OutstandingInvoice.invoices !== this.props.OutstandingInvoice.invoices) {
            if (
                this.props.OutstandingInvoice.invoices
            ) {
                this.resetTotalState(false);
            }
        }


        if (prevProps.PaymentProduct.data !== this.props.PaymentProduct.data) {
            if (
                this.props.PaymentProduct.data && this.props.PaymentProduct.data.id
            ) {
                const { state } = this.props.history.location
                if (typeof state === 'undefined' && this.props.PaymentProduct.data.id) {
                    this.props.history.push(
                        singleTfesPayment(this.props.PaymentProduct.data.id)
                    )
                }
                this.resetTotalState(false, true);
            }
        }
        if(prevProps.accountItem.data != this.props.accountItem.data){
            //HARD CODED account names
            if(this.state.currency_account_name == "" && this.state.expense_account_name == ""){
                let accountData = {};
                this.props.accountItem.data.forEach(acc => {                                    
                    if(!this.state.expenseAccount && !this.state.currencyAccount) {
                        if(acc.accountName == "BANK CHARGES"){
                            accountData.expenseAccount = acc._id;
                            accountData.expense_account_name = acc.accountName;
                        }
                        else if(acc.accountName == "CURRENCY LOSS"){
                            accountData.currencyAccount = acc._id;
                            accountData.currency_account_name = acc.accountName;
                        }
                    }
                    
                })
                this.setState(accountData);
            }   
            
        }

        if (prevProps.PaymentProduct.data !== this.props.PaymentProduct.data) {
            if (this.props.PaymentProduct.data.status === 'closed') {
                this.setState({ disableEdit: true })
            }
        }

        // this section updates the form fields after get call when select from partner list
        if (prevProps.singleCustomer.data !== this.props.singleCustomer.data) {
            if (this.props.singleCustomer && this.props.singleCustomer.data) {
                const custDetails = this.props.singleCustomer.data
                // debugger
                this.setState({
                    custId: custDetails._id,
                    custNo: custDetails.cusNo,
                    custName: custDetails.name,
                })
            }
        }

        // this section updates the form fields after get call when select from partner list
        if (prevProps.singleSupplier.data !== this.props.singleSupplier.data) {
            if (this.props.singleSupplier && this.props.singleSupplier.data) {
                const custDetails = this.props.singleSupplier.data
                // debugger
                this.setState({
                    custId: custDetails._id,
                    custNo: custDetails.suppId,
                    custName: custDetails.name,
                })
            }
        }
    }

    /*
    getInfoCustomer(id) {
        const Customer = this.props.customerFiltered.data;
        Customer.map((source) => {
            if (source.id == id) {
                this.setState({
                    toggle: false,
                    customerButtonShow: false,
                    custId: source._id && source._id,
                    custNo: source.cusNo && source.cusNo,
                    custName: source.name && source.name,
                });

                this.props.getOutstandingInvoices(source._id);
            }
        });
    }
*/

    getInfoPartner(id, modelId, type) {
        console.log("ID", id, modelId, type);

        if (type === 'Customer') {
            this.props.getSingleCustomerRequest(modelId)
        } else if (type === 'Supplier') {
            this.props.getSingleSupplierRequest(modelId)
        } else if (typeof type === 'undefined') {
            this.props.getSingleCustomerRequest(modelId)
            this.props.getSingleSupplierRequest(modelId)
        }

        this.props.getOutstandingInvoices(id);

        this.setState({
            toggle: false,
            custId: id,
        })
    }
    getExpenseAccount(id) {
        const Accounts = this.props.accountItem.data;
        Accounts.map(account => {
            if (account._id === id) {
                if (this.state.element == "expense") {
                    this.setState({
                        expenseAccount: account._id,
                        expense_account_name: account.accountName
                    })
                }
                else if (this.state.element == "currency") {
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

    handleChange(field, value) {
        let changeState = { [field]: value };

        this.setState(changeState, () => {
            if (field == "total" && this.state.invoices) {
                this.autoCalculation()
            }
        });
    }

    handleReconcile(e, rowId) {
        let invoices = this.state.invoices;
        let totalAllocation = 0;
        let totalCredit = 0;
        let paymentRate = 1;
        if (this.state.paymentMethod) {
            for (let i = 0; i < this.props.paymentMethod.data.length; i++) {
                if (this.state.paymentMethod === this.props.paymentMethod.data[i]['_id']) {
                    if (this.props.paymentMethod.data[i].currency) {
                        paymentRate = this.props.paymentMethod.data[i].currency.latestRate;
                        break
                    }
                }
            }
        }
        let creditNotes = this.state.creditNotes;
        creditNotes.forEach(invoice => {
            let invoiceBalance = invoice.balance;
            if (invoice.currency && invoice.currency.latestRate) {
                if (invoice.currency.latestRate != paymentRate) {

                    invoiceBalance = invoiceBalance * paymentRate / invoice.currency.latestRate;
                }
            }
            if (invoice.reconciled) {
                totalCredit += invoiceBalance;
            }
            else if (invoice.allocation > 0) {
                totalCredit += parseFloat(invoice.allocation);
            }
        });
        invoices.forEach(invoice => {
            let invoiceBalance = invoice.balance;
            if (invoice.currency && invoice.currency.latestRate) {
                if (invoice.currency.latestRate != paymentRate) {

                    invoiceBalance = invoiceBalance * paymentRate / invoice.currency.latestRate;
                }
            }
            if (invoice.id === rowId) {
                invoice.reconciled = e.target.checked;
                //console.log("item checked");
                if (invoice.reconciled) {

                    totalAllocation += invoiceBalance;
                }
                else {
                    totalAllocation += parseFloat(invoice.allocation);
                }
            }
            else if (invoice.reconciled) {
                totalAllocation += invoiceBalance;
            }
            else if (invoice.allocation > 0) {
                totalAllocation += parseFloat(invoice.allocation);
            }
        });
        let expenseAmount = 0;
        //if(this.state.total > 0){
            expenseAmount = totalAllocation - this.state.total - totalCredit;
            if(this.state.currencyLossAmount){
                expenseAmount -= this.state.currencyLossAmount;
            }
        //}

        this.setState({
            invoices: invoices,
            expenseAmount: amountRounding(2, expenseAmount)
        });
    }

    handleCreditReconcile(e, rowId) {

        let creditNotes = this.state.creditNotes;
        let totalAllocation = 0;
        let totalInvoices = 0;
        let paymentRate = 1;
        if (this.state.paymentMethod) {
            for (let i = 0; i < this.props.paymentMethod.data.length; i++) {
                if (this.state.paymentMethod === this.props.paymentMethod.data[i]['_id']) {
                    if (this.props.paymentMethod.data[i].currency) {
                        paymentRate = this.props.paymentMethod.data[i].currency.latestRate;
                        break
                    }
                }
            }
        }

        let invoices = this.state.invoices;
        invoices.forEach(invoice => {
            let invoiceBalance = invoice.balance;
            if (invoice.currency && invoice.currency.latestRate) {
                if (invoice.currency.latestRate != paymentRate) {

                    invoiceBalance = invoiceBalance * paymentRate / invoice.currency.latestRate;
                }
            }
            if (invoice.reconciled) {
                totalInvoices += invoiceBalance;
            }
            else if (invoice.allocation > 0) {
                totalInvoices += parseFloat(invoice.allocation);
            }
        });

        creditNotes.forEach(invoice => {
            let invoiceBalance = invoice.balance;
            if (invoice.currency && invoice.currency.latestRate) {
                if (invoice.currency.latestRate != paymentRate) {

                    invoiceBalance = invoiceBalance * paymentRate / invoice.currency.latestRate;
                }
            }
            if (invoice.id === rowId) {
                invoice.reconciled = e.target.checked;
                if (invoice.reconciled) {

                    totalAllocation += invoiceBalance;
                }
                else {
                    totalAllocation += parseFloat(invoice.allocation);
                }
            }
            else if (invoice.reconciled) {
                totalAllocation += invoiceBalance;
            }
            else if (invoice.allocation > 0) {
                totalAllocation += parseFloat(invoice.allocation);
            }
        });
       
            let expenseAmount = totalInvoices - this.state.total - totalAllocation;
            if(this.state.currencyLossAmount){
                expenseAmount -= this.state.currencyLossAmount;
            }
                                
            
        this.setState({            
            creditNotes: creditNotes,
            expenseAmount: amountRounding(2, expenseAmount)
        });
    }

    handleAllocation(e, rowId) {
        let invoices = this.state.invoices;
        let value = parseFloat(e.target.value)
        let total = 0;
        let openingBalance = 0;
        let totalCredit = 0;

        let paymentRate = 1;
        if (this.state.paymentMethod) {
            for (let i = 0; i < this.props.paymentMethod.data.length; i++) {
                if (this.state.paymentMethod === this.props.paymentMethod.data[i]['_id']) {
                    if (this.props.paymentMethod.data[i].currency) {
                        paymentRate = this.props.paymentMethod.data[i].currency.latestRate;
                        break
                    }

                }
            }
        }

        let creditNotes = this.state.creditNotes;
        creditNotes.forEach(invoice => {
            let invoiceBalance = invoice.balance;
            if (invoice.currency && invoice.currency.latestRate) {
                if (invoice.currency.latestRate != paymentRate) {

                    invoiceBalance = invoiceBalance * paymentRate / invoice.currency.latestRate;
                }
            }
            if (invoice.reconciled) {
                totalCredit += invoiceBalance;
            }
            else if (invoice.allocation > 0) {
                totalCredit += parseFloat(invoice.allocation);
            }
        });


        invoices.forEach(invoice => {
            if (invoice.id === rowId) {
                invoice.allocation = Math.round(value * 100) / 100;

                // convert back to sgd first to prevent conversion issues 
                let sgdAmt = invoice.balance / invoice.currency.latestRate; 
                console.log(sgdAmt);
                if (this.state.paymentMethod) {
                    openingBalance = Math.round(sgdAmt * paymentRate * 100) /100
                    // debugger
                } else {
                    // if payment method not selected, its auto convertyed to sgd 
                    openingBalance = Math.round(sgdAmt * 100)/100;
                } 
                console.log(openingBalance, invoice.allocation);               
                if (openingBalance <= invoice.allocation) {
                    invoice.reconciled = true;
                } else {
                    invoice.reconciled = false
                }

            }
            total += parseFloat(invoice.allocation)

        });

        const checkNaN = isNaN(total);
        if(!checkNaN){
            total -= totalCredit;            
            if(this.state.expenseAmount != 0 || this.state.currencyLossAmount != 0){
                if(this.state.expenseAmount != 0){
                    total -= parseFloat(this.state.expenseAmount);
                }
                if(this.state.currencyLossAmount != 0){
                    total -= parseFloat(this.state.currencyLossAmount);
                }
            }
            
        }
        this.setState({
            invoices: invoices,
            total: checkNaN ? 0 : amountRounding(2, total)
        });
    }

    handleCreditAllocation(e, rowId) {
        let creditNotes = this.state.creditNotes;
        let value = parseFloat(e.target.value)
        let total = 0;
        let openingBalance = 0;
        let totalInvoices = 0;


        let paymentRate = 1;
        if (this.state.paymentMethod) {
            for (let i = 0; i < this.props.paymentMethod.data.length; i++) {
                if (this.state.paymentMethod === this.props.paymentMethod.data[i]['_id']) {
                    if (this.props.paymentMethod.data[i].currency) {
                        paymentRate = this.props.paymentMethod.data[i].currency.latestRate;
                        break
                    }

                }
            }
        }

        let invoices = this.state.invoices;
        invoices.forEach(invoice => {
            let invoiceBalance = invoice.balance;
            if (invoice.currency && invoice.currency.latestRate) {
                if (invoice.currency.latestRate != paymentRate) {

                    invoiceBalance = invoiceBalance * paymentRate / invoice.currency.latestRate;
                }
            }
            if (invoice.reconciled) {
                totalInvoices += invoiceBalance;
            }
            else if (invoice.allocation > 0) {
                totalInvoices += parseFloat(invoice.allocation);
            }
        });

        total = totalInvoices;
        creditNotes.forEach(invoice => {
            if (invoice.id === rowId) {
                invoice.allocation = Math.round(value * 100) / 100;

                // convert back to sgd first to prevent conversion issues 
                let sgdAmt = invoice.balance / invoice.currency.latestRate;                
                if (this.state.paymentMethod) {
                    openingBalance = Math.round(sgdAmt * paymentRate * 100)/100;
                    // debugger
                } else {
                    // if payment method not selected, its auto convertyed to sgd 
                    openingBalance = Math.round(sgdAmt*100)/100;
                }
                
                if (openingBalance <= invoice.allocation) {
                    invoice.reconciled = true;
                } else {
                    invoice.reconciled = false
                }

            }
            total -= parseFloat(invoice.allocation)

        });

        const checkNaN = isNaN(total);
        if(!checkNaN){
          
            if(this.state.expenseAmount > 0 || this.state.currencyLossAmount > 0){
                if(this.state.expenseAmount > 0){
                    total -= parseFloat(this.state.expenseAmount);
                }
                if(this.state.currencyLossAmount > 0){
                    total -= parseFloat(this.state.currencyLossAmount);
                }
            }
            
        }

        this.setState({
            ...this.state,
            creditNotes: creditNotes,
            total: checkNaN ? 0 : amountRounding(2, total)
        });


    }

    autoCalculation() {
        let subTotalInput = this.state.total ? parseFloat(this.state.total) : 0;
        
        let totalExpense = parseFloat(this.state.expenseAmount);
        let totalCurrency = parseFloat(this.state.currencyLossAmount);
        let creditNoteTotal = 0;




        let paymentRate = 1;
        if (this.state.paymentMethod) {
            for (let i = 0; i < this.props.paymentMethod.data.length; i++) {
                if (this.state.paymentMethod === this.props.paymentMethod.data[i]['_id']) {
                    if (this.props.paymentMethod.data[i].currency) {
                        paymentRate = this.props.paymentMethod.data[i].currency.latestRate;
                        break
                    }
                }
            }
        }

        let creditNotes = this.state.creditNotes;
        ///need to fix credit note currency
        creditNotes.forEach(credit => {
            let creditNoteBalance = parseFloat(credit.balance);
            if (credit.currency && credit.currency.latestRate) {
                if (credit.currency.latestRate != paymentRate) {
                    creditNoteBalance = creditNoteBalance * paymentRate / credit.currency.latestRate;
                }
            }
            creditNoteTotal += creditNoteBalance;
            credit.allocation = amountRounding(2, creditNoteBalance);
            credit.reconciled = true;
        });

        let subTotal = subTotalInput + creditNoteTotal; //<-- have to fix this for currency as well
        subTotal = Math.round(subTotal * 100)/100;
        let invoices = this.state.invoices;
        invoices.forEach(invoice => {
            let invoiceBalance = parseFloat(invoice.balance);
            if (invoice.currency && invoice.currency.latestRate) {
                if (invoice.currency.latestRate != paymentRate) {

                    invoiceBalance = invoiceBalance * paymentRate / invoice.currency.latestRate;
                }
            }
            invoiceBalance = Math.round(invoiceBalance * 100)/100;
            if (invoiceBalance!= 0 && invoiceBalance <= subTotal) {
                
                invoice.allocation = amountRounding(2, invoiceBalance);
                invoice.reconciled = true;
                subTotal = subTotal - invoiceBalance;

            } else if (invoiceBalance != 0 && invoiceBalance > subTotal) {
                invoice.allocation = amountRounding(2, subTotal);
                invoice.reconciled = false;
                subTotal = 0;
            }
        });


        //if(subTotal > 0){
            totalExpense = amountRounding(2, subTotal * -1 - totalCurrency);

        //}

        this.setState({
            ...this.state,
            invoices: invoices,
            creditNotes: creditNotes,
            expenseAmount: totalExpense
        })
    }

    checkDisabled() {
        // if (this.state.disableEdit == true) {
        //     return false
        // } else {
        //     return true
        // }
        return true
    }

    onChangeToEdit = () => {
        this.setState({
            disableEdit: false,
            view: false
        })
    }

    getAccountName(id){
        for (let i=0; i < this.props.accountItem.data.length; i++) {
            if (this.props.accountItem.data[i]._id === id){
                console.log(this.props.accountItem.data[i].accountName);
                return this.props.accountItem.data[i].accountName;
            }
        }

    }

    showStatus() {
        if (this.state.status == "closed") { return "【 Closed 】" }
        if (this.state.status == "draft") { return "【 Draft 】" }
        else { return " " }
    }

    searchCustomer = (target, index) => {
        this.setState({
            toggle: true,
            element: index,
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
            target: target,
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
            if (!this.state.paymentMethod) {
                alert("You must select payment method first!");
                return;
            }
            if (this.state.status == "draft") {
                const data = {
                    ...this.state,
                    status: 'confirmed',
                };
                this.props.patchSinglePayment(data)
            } else {
                alert('This Payment was already confirmed')
            }
        } else {
            alert('You must save this Payment in order to execute confirm')
        }
    }

    onBackToListView = () => {
        this.props.history.push(tfesPaymentListPage)
    };

    onPrintPdf() {
        console.log("print pdf")
    }
    onCreatePackingOrder = () => {
        console.log("onCreatePackingOrder")
        alert("onCreatePackingOrder")
    }
    onInvoicing = () => {
        console.log("onInvoicing")
        alert("onInvoicing")
    }
    render() {
        const { paymentNo, paymentDate, paymentMethod, custNo, total, custName, period, paymentRef, memo, disableEdit, buttonShow, invoices, creditNotes, toggleFormSelection, editable, status } = this.state;
        const { loading } = this.props.OutstandingInvoice;

        const columns = [
            { name: "id", options: { display: "excluded", filter: false, sort: false } },
            { label: "Invoice Number", name: "invoiceNumber", options: { filter: false } },
            {
                label: "Payment Amount", name: "currency.latestRate", options: {
                    filter: false,
                    customBodyRender: (value, tableMeta) => {
                        const currencyAmountIndex = columns.findIndex(x => x.name === "debit");
                        let latestRate = value;

                        //convert back to SGD first then do the conversions 
                        let sgdAmt = amountRounding(2, (tableMeta.rowData[currencyAmountIndex] / value))
                        let currencyAmount = sgdAmt;
                        let currencySymbol = "$";
                        if (paymentMethod) {
                            for (let i = 0; i < this.props.paymentMethod.data.length; i++) {
                                if (paymentMethod === this.props.paymentMethod.data[i]['_id']) {
                                    latestRate = this.props.paymentMethod.data[i].currency? this.props.paymentMethod.data[i].currency.latestRate: 0;
                                    currencyAmount = amountRounding(2, currencyAmount * latestRate)
                                    currencySymbol = this.props.paymentMethod.data[i].currency ? this.props.paymentMethod.data[i].currency.currencySymbol: "";
                                    break
                                }
                            }
                        }


                        return (
                            <div>{currencySymbol} {currencyAmount}</div>
                        )
                    }
                }
            },
            { label: "Currency", name: "currency.currencySymbol", options: { filter: false } },
            {
                label: "Currency Amount", name: "debit", options: {
                    filter: false,
                    customBodyRender: (value, tableMeta) => {
                        return (
                            <div>{amountRounding(2, value)}</div>
                        )
                    }
                }
            },
            {
                label: "Open balance", name: "balance", options: {
                    filter: false,
                    customBodyRender: (value, tableMeta) => {

                        //convert back to SGD first then do the conversions 
                        const latestRateIndex = columns.findIndex(x => x.name === "currency.latestRate");
                        let latestRate = tableMeta.rowData[latestRateIndex];
                        let sgdAmt = latestRate && latestRate > 0 ? amountRounding(2, (value / latestRate)) : value;
                        let currencyAmount = sgdAmt
                        let currencySymbol = "$";
                        if (paymentMethod) {
                            for (let i = 0; i < this.props.paymentMethod.data.length; i++) {
                                if (paymentMethod === this.props.paymentMethod.data[i]['_id']) {
                                    latestRate = this.props.paymentMethod.data[i].currency? this.props.paymentMethod.data[i].currency.latestRate: 0;
                                    currencyAmount = amountRounding(2, currencyAmount * latestRate)
                                    currencySymbol = this.props.paymentMethod.data[i].currency? this.props.paymentMethod.data[i].currency.currencySymbol: "";
                                    break
                                }
                            }
                        }
                        // debugger 
                        return (
                            <div>{currencySymbol} {currencyAmount}</div>
                        )
                    }
                }
            },
            {
                label: "Full reconcile", name: "reconciled", options: {
                    filter: false,
                    customBodyRender: (value, tableMeta) => {
                        return (
                            <Checkbox
                                defaultChecked={value}
                                onChange={(e) => this.handleReconcile(e, tableMeta.rowData[0])}
                                checked={value}
                                disabled={disableEdit}
                            />
                        )
                    }
                }
            },
            {
                label: "Allocation", name: "allocation", options: {
                    filter: false,
                    customBodyRender: (value, tableMeta) => {
                        return (
                            <FormInput
                                defaultValue={value}
                                value={value}
                                type="number"
                                onChange={(e) => this.handleAllocation(e, tableMeta.rowData[0])}
                                readOnly={disableEdit}
                                inputProps={{ min: "0" }}
                            />
                        )
                    }
                }
            },
            { name: "credit", options: { display: "excluded", filter: false, sort: false } },                           //6
        ];

        const creditColumns = [
            { name: "id", options: { display: "excluded", filter: false, sort: false } },
            { label: "Credit Note No", name: "invoiceNumber", options: { filter: false } },

            {
                label: "Credit Amount", name: "currency.latestRate", options: {
                    filter: false,
                    customBodyRender: (value, tableMeta) => {
                        const currencyAmountIndex = creditColumns.findIndex(x => x.name === "credit");
                        let latestRate = value;

                        //convert back to SGD first then do the conversions 
                        let sgdAmt = amountRounding(2, (tableMeta.rowData[currencyAmountIndex] / value))
                        let currencyAmount = sgdAmt;
                        let currencySymbol = "$";
                        if (paymentMethod) {
                            for (let i = 0; i < this.props.paymentMethod.data.length; i++) {
                                if (paymentMethod === this.props.paymentMethod.data[i]['_id']) {
                                    latestRate = this.props.paymentMethod.data[i].currency ? this.props.paymentMethod.data[i].currency.latestRate : 0;
                                    currencyAmount = amountRounding(2, currencyAmount * latestRate)
                                    currencySymbol = this.props.paymentMethod.data[i].currency ? this.props.paymentMethod.data[i].currency.currencySymbol: "";
                                    break
                                }
                            }
                        }


                        return (
                            <div>{currencySymbol} {currencyAmount}</div>
                        )
                    }
                }
            },
            { label: "Currency", name: "currency.currencySymbol", options: { filter: false } },
            {
                label: "Currency Amount", name: "credit", options: {
                    filter: false,
                    customBodyRender: (value, tableMeta) => {
                        return (
                            <div>{amountRounding(2, value)}</div>
                        )
                    }
                }
            },
            {
                label: "Open balance", name: "balance", options: {
                    filter: false,
                    customBodyRender: (value, tableMeta) => {

                        //convert back to SGD first then do the conversions 
                        const latestRateIndex = creditColumns.findIndex(x => x.name === "currency.latestRate");
                        let latestRate = tableMeta.rowData[latestRateIndex];
                        let sgdAmt = latestRate && latestRate > 0 ? amountRounding(2, (value / latestRate)) : value;
                        let currencyAmount = sgdAmt
                        let currencySymbol = "$";
                        if (paymentMethod) {
                            for (let i = 0; i < this.props.paymentMethod.data.length; i++) {
                                if (paymentMethod === this.props.paymentMethod.data[i]['_id']) {
                                    latestRate = this.props.paymentMethod.data[i].currency ? this.props.paymentMethod.data[i].currency.latestRate : 0;
                                    currencyAmount = amountRounding(2, currencyAmount * latestRate)
                                    currencySymbol = this.props.paymentMethod.data[i].currency ? this.props.paymentMethod.data[i].currency.currencySymbol: "";
                                    break
                                }
                            }
                        }
                        // debugger 
                        return (
                            <div>{currencySymbol} {currencyAmount}</div>
                        )
                    }
                }
            },
            {
                label: "Full reconcile", name: "reconciled", options: {
                    filter: false,
                    customBodyRender: (value, tableMeta) => {
                        return (
                            <Checkbox
                                defaultChecked={value}
                                onChange={(e) => this.handleCreditReconcile(e, tableMeta.rowData[0])}
                                checked={value}
                                disabled={disableEdit}
                            />
                        )
                    }
                }
            },
            {
                label: "Allocation", name: "allocation", options: {
                    filter: false,
                    customBodyRender: (value, tableMeta) => {
                        return (
                            <FormInput
                                defaultValue={value}
                                value={value}
                                type="number"
                                onChange={(e) => this.handleCreditAllocation(e, tableMeta.rowData[0])}
                                readOnly={disableEdit}
                                isToggledEditForm={toggleFormSelection}
                                 />
                        )
                    }
                }
            },
            { name: "debit", options: { display: "excluded", filter: false, sort: false } },                           //6
        ];

        const options = Object.assign({}, listOptions);
        options.searchOpen = false;
        options.search = false;

        return (
            <React.Fragment>
                <FormWrapper
                    onSave={this.onSubmit}
                    onSaveNew={this.onSaveNew}
                    disabled={this.checkDisabled()}
                    title="Back to All Payment"
                    centerTitle={this.state.onEditPayment ? 'Update Payment Page' : 'Create New Payment Page'}
                    edit="test"
                    promptMessage={this.showStatus()}
                    listRedirect={tfesPaymentListPage}
                    onChangeToEdit={this.onChangeToEdit}
                    showEditButton={this.state.disableEdit && this.state.status !== 'closed'}
                >
                    <form autoComplete="off">
                        <div class="top-container" style={{ marginLeft: '2.5rem' }}>
                            {this.state.errorMsg && (<h4 class="text-danger text-center">{this.state.errorMsg}</h4>)}
                            <div class="row">
                                <div class="col-sm-4 " >
                                    <FormInput
                                        label="Payment Number"
                                        value={paymentNo}
                                        target="paymentNo"
                                        handleChange={this.handleChange}
                                        readOnly={true}
                                        isToggledEditForm={toggleFormSelection}
                                        original={this.props.PaymentProduct.data ? this.props.PaymentProduct.data.paymentNo: ""}
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
                                    }}>Date </p>
                                    <DayPickerInput
                                        // formatDate={formatDate}
                                        // parseDate={parseDate}
                                        // value={date}
                                        // selectedDay={this.state.day}
                                        // placeholder={`${formatDate(new Date())}`}


                                        formatDate={formatDate}
                                        parseDate={parseDate}
                                        format="L"
                                        value={paymentDate !== "" ? `${formatDate(paymentDate, 'L', 'en-SG')}` : ""}
                                        selectedDay={paymentDate}
                                        // placeholder={`${formatDate(new Date(), 'L', 'en-SG')}`}
                                        placeholder={"DD/MM/YYY"}
                                        onDayChange={(day) => {
                                            this.handleChange("paymentDate", day)
                                        }}
                                        // readOnly={disableEdit}
                                        dayPickerProps={{
                                            locale: 'en-SG',
                                            localeUtils: MomentLocaleUtils,
                                        }}
                                        style={{ zIndex: "999" }}
                                    />
                                </div>
                                <div class="col-sm-4">
                                    <div className={(this.state.disableEdit) && 'uneditable'}>
                                    <FormInput
                                        label="PaymentMethod"
                                        value={paymentMethod}
                                        target="paymentMethod"
                                        hasButton={false}
                                        selectValueKey="_id"
                                        selectValueName="name"
                                        selectValues={this.props.paymentMethod.data ? this.props.paymentMethod.data : []}
                                        handleChange={this.handleChange}
                                        readOnly={disableEdit}
                                        isToggledEditForm={toggleFormSelection}
                                        original={this.props.PaymentProduct.data ? this.props.PaymentProduct.data.paymentMethod: ""}
                                    />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4" >
                                    <FormInput
                                        label="Customer Ref"
                                        value={custNo}
                                        target="custNo"
                                        handleChange={this.handleChange}
                                        readOnly={true}
                                        isToggledEditForm={toggleFormSelection}
                                        original={this.props.PaymentProduct.data ? this.props.PaymentProduct.data.custNo: ""}
                                    />
                                </div>
                                <div class="col-sm-4 ">
                                    <FormInput
                                        label="Total"
                                        // value={`${total.toLocaleString("en-SG", {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2})}`}
                                        value={total}
                                        target="total"
                                        handleChange={this.handleChange}
                                        readOnly={disableEdit}
                                        isToggledEditForm={toggleFormSelection} 
                                        original={this.props.PaymentProduct.data ? this.props.PaymentProduct.data.total: 0}/>
                                </div>
                                <div class="col-sm-4 ">
                                    <FormInput
                                        label="Customer Name"
                                        value={custName}
                                        target="custName"
                                        buttonClick={this.searchCustomer}
                                        hasButton={status === 'closed' ? false : true }
                                        thirdButton={false}
                                        handleChange={this.handleChange}
                                        readOnly={disableEdit}
                                        isToggledEditForm={toggleFormSelection}
                                        original={this.props.PaymentProduct.data ? this.props.PaymentProduct.data.custName: ""}
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
                                        readOnly={disableEdit}
                                        isToggledEditForm={toggleFormSelection} 
                                        original={this.props.PaymentProduct.data ? this.props.PaymentProduct.data.period: ""}/>
                                </div>
                                <div className="col-sm-4">
                                    <FormInput
                                        label="Payment Ref"
                                        value={paymentRef}
                                        target="paymentRef"
                                        handleChange={this.handleChange}
                                        readOnly={false}
                                        isToggledEditForm={toggleFormSelection} 
                                        original={this.props.PaymentProduct.data ? this.props.PaymentProduct.data.paymentRef: ""}/>
                                </div>
                                <div class="col-sm-4 ">
                                    <FormInput
                                        label="Memo"
                                        value={memo}
                                        target="memo"
                                        handleChange={this.handleChange}
                                        readOnly={false}
                                        isToggledEditForm={toggleFormSelection} 
                                        original={this.props.PaymentProduct.data ? this.props.PaymentProduct.data.memo: ""}/>
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
                                        data={invoices}
                                        options={options}
                                    />
                                )
                            }

                            <div className="boundary-line" style={{
                                width: "100%",
                                height: "2px",
                                backgroundColor: "#c0c0c0",
                                margin: "20px auto "
                            }}></div>

                            {
                                loading ? (
                                    <RctSectionLoader />
                                ) : (
                                    <RecordsList
                                        title={"OutStanding Credit Notes/Deposits"}
                                        columns={creditColumns}
                                        data={creditNotes}
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
                                        isToggledEditForm={toggleFormSelection}
                                                readOnly={disableEdit}
                                        original={this.props.PaymentProduct.data.expenseAmount ? this.props.PaymentProduct.data.expenseAmount: 0}                                     
                                    />                                    
                                    </div>
                                       <div class="col-sm-6"><FormInput
                                            label="Expense Account"
                                            value={this.state.expense_account_name}
                                            target="expense_account_name"
                                            hasButton={status === 'closed' ? false : true}   
                                            buttonClick={() => this.searchCustomer('account', 'expense')}
                                            original={this.props.PaymentProduct.data.expenseAccount ? this.getAccountName(this.props.PaymentProduct.data.expenseAccount): ""}                                            
                                            readOnly={disableEdit}
                                                isToggledEditForm={toggleFormSelection}
                                        /></div>
                                    <div class="col-sm-3 text-right" style={{marginTop:19}}>Currency Loss</div>
                                        <div class="col-sm-3" style={{marginTop:19}}><FormInput
                                        label=""
                                        value={this.state.currencyLossAmount}
                                        target="currencyLossAmount"
                                        handleChange={this.handleChange}
                                        readOnly={disableEdit}
                                                isToggledEditForm={toggleFormSelection}
                                        original={this.props.PaymentProduct.data.currencyAmount ? this.props.PaymentProduct.data.currencyAmount: 0}                                        
                                    /></div>
                                    <div class="col-sm-6"><FormInput
                                            label="Currency Loss"
                                            value={this.state.currency_account_name}
                                            target="currency_account_name"
                                            hasButton={status === 'closed' ? false : true}
                                            buttonClick={() => this.searchCustomer('account', 'currency')}                                     
                                            readOnly={disableEdit}
                                                isToggledEditForm={toggleFormSelection}
                                            original={this.props.PaymentProduct.data.currencyAccount ? this.getAccountName(this.props.PaymentProduct.data.currencyAccount) : ""}
                                        /></div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    <div className="Left_Toolbar-wrapper">
                        <AppBar position="fixed" color="primary" style={{
                            top: 'auto',
                            bottom: "50px",
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
                                        && <div onClick={this.onConfirmPayment}>
                                            <ConfirmationNumberIcon />
                                            <span> Confirm Payment </span>
                                        </div>}

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
                    {this.state.target === "custName" ? (
                        <div>
                            {/* <h3>Customer List</h3>
                            <TfesCustomerList
                                getInfo={this.getInfoCustomer} /> */}
                            <JournalPartnerList getInfo={this.getInfoPartner}/>
                        </div>) : this.state.target === "account" ?
                        (
                            <div>
                                <h3>Account List</h3>
                                <JournalAccountList
                                    getInfo={this.getExpenseAccount} />
                            </div>
                        ) : null

                    }
                </DialogRoot>
                </FormWrapper>
            </React.Fragment >
        );
    }
}

const mapStateToProps = ({ customertfesState, paymentState, accountItemState, LoanManagementState, suppliertfesState }) => {
    const { customerFiltered, singleCustomer } = customertfesState;
    const { singleSupplier } = suppliertfesState;
    const { OutstandingInvoice, PaymentProduct, paymentMethod } = paymentState;
    const { accountItem } = accountItemState;
    
    return { customerFiltered, OutstandingInvoice, PaymentProduct, paymentMethod, accountItem, singleCustomer, singleSupplier };
};
export default connect(mapStateToProps, {
    getOutstandingInvoices,
    setPayment,
    getSinglePaymentRequest,
    patchSinglePayment,
    getPaymentMethods,
    getAllAccountItem,
    getSingleCustomerRequest,
    getSingleSupplierRequest
})(TfesPaymentNew);
