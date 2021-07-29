// new quotation
import React, { Component } from "react";
import { connect } from "react-redux";
import RctSectionLoader from "Components/RctSectionLoader";
import { listOptions, getDateTime } from "Helpers/helpers";
// Redux imports
import { getOutstandingSupplierInvoices, setSupplierPayment, getSingleSupplierPaymentRequest, patchSingleSupplierPayment } from "Ducks/supplier-payment";
import { getPaymentMethods } from "Ducks/paymenttfes";
import { getAllAccountItem } from "Ducks/account-item";
import {  getAllShortTermLoans, getSingleShortTermLoan } from "Ducks/loanManagement";
import { getSingleCustomerRequest } from "Ducks/customertfes";

import {
    Button, IconButton,
} from "@material-ui/core";
// React Component import
import RecordsList from "Components/RecordsList";
import FormWrapper from "Components/Form/Layout/FormWrapper";
import FormInput from "Components/Form/FormInput";
import DialogRoot from "Components/Dialog/DialogRoot";
import CrmSupplierList from 'Components/PopupPage/SupplierList';
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
import { amountRounding } from "Helpers/helpers";
import 'moment/locale/en-SG';
import Checkbox from "@material-ui/core/Checkbox";
import {
    setSupplier,
    getSupplierDetails,
    getSingleSupplierRequest,
    patchSingleSupplierRequest,
    getFilterSupplier,
    setDuplicate,
} from 'Ducks/suppliertfes'

import { supplierPaymentListPage, singleSupplierPayment } from "Helpers/accountingURL";

const INIT_STATE = {
    toggle: false,
    onEditPayment: false,
    paymentNo: "",
    element: null,
    target: "",
    errorMsg: "",
    paymentDate: "",
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
    currencyLossAmount: 0,
    expenseAccount:  undefined,
    expense_account_name: "",
    currencyAccount: undefined,
    currency_account_name: "",
    customerButtonShow: true,
    editable: false,    
    disableEdit: false,
    buttonShow: true,
    page: 1,
    toggleFormSelection: true,
    paymentMethodList: [],
};
class SupplierPaymentNew extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INIT_STATE };
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getInfo = this.getInfo.bind(this);
        this.getInfoPartner = this.getInfoPartner.bind(this);
        this.resetTotalState = this.resetTotalState.bind(this);
        this.onPrintPdf = this.onPrintPdf.bind(this)
        this.onConfirmPayment = this.onConfirmPayment.bind(this);
        this.getExpenseAccount = this.getExpenseAccount.bind(this);
    }

    onSubmit() {
        if (this.state.suppName === '') {
            this.setState({
                errorMsg: 'Supplier not selected yet!',
            })
        } else if(this.state.currencyLossAmount != 0 && this.state.currencyAccount == undefined){
            this.setState({
                errorMsg: "Currency account not set"
            });
        } else if (this.state.paymentDate === "") {
            this.setState({
                errorMsg: 'Date not selected yet!',
            })
        } else {
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

            //check if short term payment was selected
            for(let i=0; i < this.props.shortTermLoanAll.data.length; i++){
                if(this.props.shortTermLoanAll.data[i]._id == data.paymentMethod){
                    data.shortTermPaymentId = data.paymentMethod;
                    delete data.paymentMethod;                    
                }
            }
            console.log(data);
            // If edit/update onSubmit
            if (this.state.onEditPayment) {
                data.id = this.state.id;
                console.log("patch");
                
                this.props.patchSingleSupplierPayment(data)
            } else {
                console.log("new");
                
                this.props.setSupplierPayment(data);
            }
            this.setState({
                toggleFormSelection: true,
                disableEdit: true,
                errorMsg: ""
            })
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getPaymentMethods();
        this.props.getAllAccountItem();
        this.props.getAllShortTermLoans(0,0, [{ active: true}], "");
        if (id) {
            this.props.getSingleSupplierPaymentRequest(id);
            console.log("Reset");
            //if (this.props.SupplierPaymentProduct.data && this.props.SupplierPaymentProduct.data.id) {
                this.resetTotalState(true);
            //}
        }
    }

    resetTotalState(editStatus, isEdit) {
        let newState = {};
        if(editStatus){
            newState = { 
                ...INIT_STATE
            }
        }
        else {
            let reconciles = this.props.OutstandingSupplierInvoice.invoices;
            let debitNotes = this.props.OutstandingSupplierInvoice.debitNotes;
            if(reconciles){
                reconciles.forEach(reconcile => {
                    reconcile.balance = reconcile.credit - reconcile.debit;                    
                });
            }
            if(debitNotes){
                debitNotes.forEach(debit => {
                    debit.balance = debit.debit - debit.credit;
                })
            }            
            newState = {            
                ...this.props.SupplierPaymentProduct.data,
                invoices: reconciles ? reconciles : [],
                debitNotes: debitNotes ? debitNotes: []
                
            };
            
                newState.onEditPayment = isEdit;
            //check if short term loan was selected. if yes, must load that item details
            if(newState.shortTermPaymentId){
                this.props.getSingleShortTermLoan(newState.shortTermPaymentId)
                //check if paymentlist already has the item inside
                for(let i=0; i < this.state.paymentMethodList.length; i++){
                    if(this.state.paymentMethodList[i]._id == newState.shortTermPaymentId){
                        newState.paymentMethod = newState.shortTermPaymentId;
                    }
                }
            }
        

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
        

        if (this.props.SupplierPaymentProduct.data.currencyAccount){
            // Account id
            newState.currencyLossAccount = this.props.SupplierPaymentProduct.data.currencyAccount;
            // Account Name
            newState.currency_account_name = this.getAccountName(this.props.SupplierPaymentProduct.data.currencyAccount);
        }

        if (this.props.SupplierPaymentProduct.data.expenseAccount){
            // Account id
            newState.expenseAccount = this.props.SupplierPaymentProduct.data.expenseAccount;
            // Account Name
            newState.expense_account_name = this.getAccountName(this.props.SupplierPaymentProduct.data.expenseAccount);
        }
        

        newState.paymentMethodList = [...this.props.paymentMethod.data];
        if(this.props.shortTermLoanAll.data && this.props.shortTermLoanAll.data.length > 0){
            let loanData = this.props.shortTermLoanAll.data.map(item => ({...item, name: item.loanName }));
            newState.paymentMethodList = newState.paymentMethodList.concat([...loanData])
            console.log(newState.paymentMethodList);
        }

        this.setState({
            ...newState,
        })

        if (newState.status == 'closed'){
            this.setState({ disableEdit: true })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.OutstandingSupplierInvoice.invoices !== this.props.OutstandingSupplierInvoice.invoices) {
            if (
                this.props.OutstandingSupplierInvoice.invoices
            ) {
                this.resetTotalState(false);
            }
        }

        if (prevProps.SupplierPaymentProduct.data !== this.props.SupplierPaymentProduct.data) {
            if (
                this.props.SupplierPaymentProduct.data
            ) {
                const { state } = this.props.history.location
                if (typeof state === 'undefined' && this.props.SupplierPaymentProduct.data.id) {
                    this.props.history.push(
                        singleSupplierPayment(this.props.SupplierPaymentProduct.data.id)
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
                    if(this.state.expenseAccount){
                        if(acc._id == this.state.expenseAccount){
                            console.log("match");
                            accountData.expense_account_name = acc.accountName;
                        }
                    }
                    if(this.state.currencyAccount){
                        if(acc._id == this.state.currencyAccount){
                            accountData.currency_account_name = acc.accountName;
                        }
                    }                    
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
        if(prevProps.paymentMethod.data != this.props.paymentMethod.data){
            
            let paymentMethodList = [...this.state.paymentMethodList];
            paymentMethodList = paymentMethodList.concat([...this.props.paymentMethod.data]);                  
            this.setState({paymentMethodList: paymentMethodList});
        }
        
        if(prevProps.shortTermLoanAll.data != this.props.shortTermLoanAll.data){
            
            let paymentMethodList = [...this.state.paymentMethodList];
            //remap
            let loanData = this.props.shortTermLoanAll.data.map(item => ({...item, name: item.loanName }));
            
            paymentMethodList = paymentMethodList.concat([...loanData]);         
            this.setState({paymentMethodList: paymentMethodList});
        }
        if(prevProps.shortLoanSingle.data != this.props.shortLoanSingle.data){
            let paymentMethodList = [...this.state.paymentMethodList];
            //check if item already added
            let added = false;
            for(let i=0; i < paymentMethodList.length; i++){
                if(this.props.shortLoanSingle.data._id == paymentMethodList[i]._id){
                    added  =true;
                    break;
                }
            }
            if(!added){
                let itemData = { ...this.props.shortLoanSingle.data, name: this.props.shortLoanSingle.data.loanName};
                paymentMethodList.push(itemData);
                this.setState({paymentMethodList: paymentMethodList});
            }
            
        }

        if (prevProps.SupplierPaymentProduct.data !== this.props.SupplierPaymentProduct.data) {
            if (this.props.SupplierPaymentProduct.data.status === 'closed') {
                this.setState({ disableEdit: true })
            }
        }

        // this section updates the form fields after get call when select from partner list
        if (prevProps.singleCustomer.data !== this.props.singleCustomer.data) {
            if (this.props.singleCustomer && this.props.singleCustomer.data) {
                const custDetails = this.props.singleCustomer.data
                // debugger
                this.setState({
                    suppId: custDetails._id,
                    suppNo: custDetails.cusNo,
                    suppName: custDetails.name,
                })
            }
        }

        // this section updates the form fields after get call when select from partner list
        if (prevProps.singleSupplier.data !== this.props.singleSupplier.data) {
            if (this.props.singleSupplier && this.props.singleSupplier.data) {
                const custDetails = this.props.singleSupplier.data
                // debugger
                this.setState({
                    suppId: custDetails._id,
                    suppNo: custDetails.suppId,
                    suppName: custDetails.name,
                })
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
                    suppId: source._id && source._id,
                    suppNo: source.suppId && source.suppId,
                    suppName: source.name && source.name,
                });

                this.props.getOutstandingSupplierInvoices(source._id);
            }
        });
    }

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

        this.props.getOutstandingSupplierInvoices(id);

        this.setState({
            toggle: false,
            suppId: id
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
            if (field == "total") {
                this.autoCalculation()
            }
        });
    }

    handleReconcile(e, rowId) {        

        let invoices = this.state.invoices;
        let totalAllocation = 0;
        let totalDebit = 0;
        let paymentRate = 1;
        if (this.state.paymentMethod) {
            for (let i = 0; i < this.state.paymentMethodList.length; i++) {                
                if (this.state.paymentMethod === this.state.paymentMethodList[i]._id) {                    
                    if (this.state.paymentMethodList[i].currency) {
                        paymentRate = this.state.paymentMethodList[i].currency.latestRate;
                        console.log(paymentRate);
                        break
                    }
                }
            }
        }

        let debitNotes = this.state.debitNotes;
        debitNotes.forEach(invoice => {        
            let invoiceBalance = invoice.balance;    
            if(invoice.currency && invoice.currency.latestRate){
                if(invoice.currency.latestRate != paymentRate){
                   
                    invoiceBalance = invoiceBalance * paymentRate / invoice.currency.latestRate;                    
                }
            }
           if(invoice.reconciled){
            totalDebit += invoiceBalance;
            }
            else if(invoice.allocation > 0){
                totalDebit += parseFloat(invoice.allocation);
            }
        });        
        invoices.forEach(invoice => {        
            let invoiceBalance = invoice.balance;    
            if(invoice.currency && invoice.currency.latestRate){
                if(invoice.currency.latestRate != paymentRate){
                   
                    invoiceBalance = invoiceBalance * paymentRate / invoice.currency.latestRate;                    
                }
            }
            if (invoice.id === rowId) {
                invoice.reconciled = e.target.checked;
                if(invoice.reconciled){

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
        if(this.state.total > 0){
            expenseAmount = (totalAllocation - this.state.total - totalDebit) * -1;
            if(this.state.currencyLossAmount){
                expenseAmount -= this.state.currencyLossAmount;
            }
        }

        this.setState({
            ...this.state,
            invoices: invoices,
            expenseAmount: amountRounding(2,expenseAmount)
        });
        
    }

    handleDebitReconcile(e, rowId) {

        let debitNotes = this.state.debitNotes;
        let totalAllocation = 0;
        let totalInvoices = 0;
        let paymentRate = 1;
        if (this.state.paymentMethod) {
            for (let i = 0; i < this.state.paymentMethodList.length; i++) {                
                if (this.state.paymentMethod === this.state.paymentMethodList[i]._id) {                    
                    if (this.state.paymentMethodList[i].currency) {
                        paymentRate = this.state.paymentMethodList[i].currency.latestRate;
                        console.log(paymentRate);
                        break
                    }
                }
            }
        }

        let invoices = this.state.invoices;
        invoices.forEach(invoice => {        
            let invoiceBalance = invoice.balance;    
            if(invoice.currency && invoice.currency.latestRate){
                if(invoice.currency.latestRate != paymentRate){
                   
                    invoiceBalance = invoiceBalance * paymentRate / invoice.currency.latestRate;                    
                }
            }
            if(invoice.reconciled){
                totalInvoices += invoiceBalance;
            }
            else if(invoice.allocation > 0){
                totalInvoices += parseFloat(invoice.allocation);
            }
        });
        
        debitNotes.forEach(invoice => {        
            let invoiceBalance = invoice.balance;    
            if(invoice.currency && invoice.currency.latestRate){
                if(invoice.currency.latestRate != paymentRate){
                   
                    invoiceBalance = invoiceBalance * paymentRate / invoice.currency.latestRate;                    
                }
            }
            if (invoice.id === rowId) {
                invoice.reconciled = e.target.checked;
                if(invoice.reconciled){

                    totalAllocation += invoiceBalance;
                }
                else {
                    totalAllocation += parseFloat(invoice.allocation);
                }
            }
            else if(invoice.reconciled){
                totalAllocation += invoiceBalance;
            }
            else if(invoice.allocation > 0){
                totalAllocation += parseFloat(invoice.allocation);
            }
        });
       
            let expenseAmount =  (totalInvoices - this.state.total - totalAllocation) * -1;
            if(this.state.currencyLossAmount){
                expenseAmount -= this.state.currencyLossAmount;
            }
                                

        this.setState({            
            debitNotes: debitNotes,
            expenseAmount: amountRounding(2,expenseAmount)
        });
    }

    handleAllocation(e, rowId) {
        let invoices = this.state.invoices;
        let value = parseFloat(e.target.value)
        let total = 0;
        let openingBalance = 0;
        let paymentRate = 1;
        let totalDebit = 0;
        if (this.state.paymentMethod) {
            for (let i = 0; i < this.state.paymentMethodList.length; i++) {                
                if (this.state.paymentMethod === this.state.paymentMethodList[i]._id) {                    
                    if (this.state.paymentMethodList[i].currency) {
                        paymentRate = this.state.paymentMethodList[i].currency.latestRate;
                        console.log(paymentRate);
                        break
                    }
                }
            }
        }

        let debitNotes = this.state.debitNotes;
        debitNotes.forEach(invoice => {        
            let invoiceBalance = invoice.balance;    
            if(invoice.currency && invoice.currency.latestRate){
                if(invoice.currency.latestRate != paymentRate){
                   
                    invoiceBalance = invoiceBalance * paymentRate / invoice.currency.latestRate;                    
                }
            }
           if(invoice.reconciled){
                totalDebit += invoiceBalance;
            }
            else if(invoice.allocation > 0){
                totalDebit += parseFloat(invoice.allocation);
            }
        });
        invoices.forEach(reconcile => {
            if (reconcile.id === rowId) {
                reconcile.allocation = Math.round(value * 100) / 100;

                // convert back to sgd first to prevent conversion issues 
                let sgdAmt = reconcile.balance / reconcile.currency.latestRate; 

                if (this.state.paymentMethod) {
                    openingBalance = Math.round(sgdAmt * paymentRate * 100)/100
                    // debugger
                } else {
                    // if payment method not selected, its auto convertyed to sgd 
                    openingBalance = Math.round(sgdAmt*100)/100;
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
            total -= totalDebit;            
            if(this.state.expenseAmount != 0 || this.state.currencyLossAmount != 0){
                if(this.state.expenseAmount != 0){
                    total += parseFloat(this.state.expenseAmount);
                }
                if(this.state.currencyLossAmount != 0){
                    total += parseFloat(this.state.currencyLossAmount);
                }
            }            
        }
        this.setState({
            ...this.state,
            invoices: invoices,
            total: checkNaN ? 0 : amountRounding(2,total)
        });
    }

    handleDebitAllocation(e, rowId) {
        let debitNotes = this.state.debitNotes;
        let value = parseFloat(e.target.value);
        console.log(value);
        let total = 0;
        let openingBalance = 0;
        let totalInvoices = 0;
        

        let paymentRate = 1;
        if (this.state.paymentMethod) {
            for (let i = 0; i < this.state.paymentMethodList.length; i++) {                
                if (this.state.paymentMethod === this.state.paymentMethodList[i]._id) {                    
                    if (this.state.paymentMethodList[i].currency) {
                        paymentRate = this.state.paymentMethodList[i].currency.latestRate;
                        console.log(paymentRate);
                        break
                    }
                }
            }
        }

        let invoices = this.state.invoices;
        invoices.forEach(invoice => {        
            let invoiceBalance = invoice.balance;    
            if(invoice.currency && invoice.currency.latestRate){
                if(invoice.currency.latestRate != paymentRate){
                   
                    invoiceBalance = invoiceBalance * paymentRate / invoice.currency.latestRate;                    
                }
            }
            if(invoice.reconciled){
                totalInvoices += invoiceBalance;
            }
            else if(invoice.allocation > 0){
                totalInvoices += parseFloat(invoice.allocation);
            }
        });

        total = totalInvoices;
        debitNotes.forEach(invoice => {
            if (invoice.id === rowId) {
                invoice.allocation = Math.round(value *100)/100;

                // convert back to sgd first to prevent conversion issues 
                let sgdAmt = invoice.balance / invoice.currency.latestRate;                
                if (this.state.paymentMethod) {
                    openingBalance = Math.round(sgdAmt * paymentRate * 100) /100;
                    // debugger
                } else {
                    // if payment method not selected, its auto convertyed to sgd 
                    openingBalance = sgdAmt
                }
                
                if (openingBalance <= value) {
                    invoice.reconciled = true;
                } else {
                    invoice.reconciled = false
                }

            }
            total -= parseFloat(invoice.allocation)

        });

        const checkNaN = isNaN(total);
        if(!checkNaN){
          
            if(this.state.expenseAmount != 0 || this.state.currencyLossAmount != 0){
                if(this.state.expenseAmount != 0){
                    total += parseFloat(this.state.expenseAmount);
                }
                if(this.state.currencyLossAmount != 0){
                    total += parseFloat(this.state.currencyLossAmount);
                }
            }
        }
        
        this.setState({
            ...this.state,
            debitNotes: debitNotes,
            total: checkNaN ? 0 : amountRounding(2, total)
        });

        
    }


    autoCalculation() {
        let subTotalInput = this.state.total ? parseFloat(this.state.total) : 0;
        
        let totalExpense = parseFloat(this.state.expenseAmount);
        let totalCurrency = parseFloat(this.state.currencyLossAmount);
        let debitNoteTotal = 0;

       
        

        let paymentRate = 1;
        if (this.state.paymentMethod) {
            for (let i = 0; i < this.state.paymentMethodList.length; i++) {                
                if (this.state.paymentMethod === this.state.paymentMethodList[i]._id) {                    
                    if (this.state.paymentMethodList[i].currency) {
                        paymentRate = this.state.paymentMethodList[i].currency.latestRate;
                        console.log(paymentRate);
                        break
                    }
                }
            }
        }

        let debitNotes = this.state.debitNotes;
        ///need to fix credit note currency
        debitNotes.forEach(credit => {
            let creditNoteBalance = parseFloat(credit.balance);
            if(credit.currency && credit.currency.latestRate){
                if(credit.currency.latestRate != paymentRate){                   
                    creditNoteBalance = creditNoteBalance * paymentRate / credit.currency.latestRate;                    
                }
            }
            debitNoteTotal += creditNoteBalance;
            credit.allocation = amountRounding(2, creditNoteBalance);
            credit.reconciled = true;
       });

        let subTotal = subTotalInput + debitNoteTotal; //<-- have to fix this for currency as well
        subTotal = Math.round(subTotal * 100)/100;
        let invoices = this.state.invoices;
        invoices.forEach(invoice => {
            let invoiceBalance = parseFloat(invoice.balance);
            if(invoice.currency && invoice.currency.latestRate){
                if(invoice.currency.latestRate != paymentRate){
                   
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

        

        if(subTotal > 0){
            totalExpense = amountRounding(2, subTotal - totalCurrency);

        }

        this.setState({
            ...this.state,
            invoices: invoices,
            debitNotes: debitNotes,
            expenseAmount: totalExpense
        })
    }

    checkDisabled() {
        // if (this.state.disableEdit == true) {
        //     return false
        // }

        return true
    }

    onChangeToEdit = () => {
        this.setState({
            disableEdit: false,
            view: false
        })
    }

    showStatus() {
        if (this.state.status == "closed") { return "【 Closed 】" }
        if (this.state.status == "draft") { return "【 Draft 】" }
        else { return " " }
    }

    searchSupplier = (target, index) => {
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
            if (!this.state.paymentMethod) {
                alert("You must select payment method first!");
                return;
            }

            
            
            if (this.state.status == "draft") {
                const data = {
                    ...this.state,
                    status: 'confirmed',
                };
                //check if short term payment was selected
                for(let i=0; i < this.props.shortTermLoanAll.data.length; i++){
                    if(this.props.shortTermLoanAll.data[i]._id == data.paymentMethod){
                        data.shortTermPaymentId = data.paymentMethod;
                        delete data.paymentMethod;                        
                    }
                }
                this.props.patchSingleSupplierPayment(data)
            } else {
                alert('This Payment was already confirmed')
            }
        } else {
            alert('You must save this Payment in order to execute confirm')
        }
    }

    onBackToListView = () => {
        this.props.history.push('/app/accounting/supplierPayment')
    };

    onPrintPdf() {
        console.log("print pdf")
    }

    onInvoicing = () => {
        console.log("onInvoicing")
        alert("onInvoicing")
    }
    searchCustomer = (target, index) => {
        this.setState({
            toggle: true,
            element: index,
            target: target,
            targetSearch: this.state[target]
        })
    }

    render() {
        const { paymentNo, paymentDate, paymentMethod, suppNo, total, suppName, period, paymentRef, memo, editable, buttonShow, invoices, debitNotes, disableEdit, toggleFormSelection, status } = this.state;
        const { loading } = this.props.OutstandingSupplierInvoice;        

        const columns = [
            { name: "id", options: { display: "excluded", filter: false, sort: false } },
            { label: "Invoice Number", name: "invoiceNumber", options: { filter: false } },
            { label: "P.O No", name: "soNumber", options: { filter: false }},
            { label: "Payment Amount", name: "currency.latestRate", options: {
                filter: false,
                customBodyRender:(value, tableMeta)=>{
                    const currencyAmountIndex = columns.findIndex(x => x.name === "credit");
                    let latestRate = value;

                    //convert back to SGD first then do the conversions 
                    
                    let sgdAmt = amountRounding(2, (tableMeta.rowData[currencyAmountIndex] / value))
                    let currencyAmount = sgdAmt;
                    let currencySymbol = "$";
                    if (paymentMethod) {
                        for (let i = 0; i < this.state.paymentMethodList.length; i++) {
                            if (paymentMethod === this.state.paymentMethodList[i]['_id']) {
                                latestRate = this.state.paymentMethodList[i].currency.latestRate;
                                currencyAmount = amountRounding(2, currencyAmount * latestRate)
                                currencySymbol = this.state.paymentMethodList[i].currency.currencySymbol;
                                break
                            } 
                        }
                    }


                    return(
                        <div>{currencySymbol} {currencyAmount} </div>
                    )
                }
            }
            },
            { label: "Currency", name: "currency.currencySymbol", options: { filter: false } },
            { label: "Currency Amount", name: "credit", options: { filter: false } },
            { label: "Open balance", name: "balance", options: {
                filter: false,
                customBodyRender:(value, tableMeta)=>{

                    //convert back to SGD first then do the conversions 
                    const latestRateIndex = columns.findIndex(x => x.name === "currency.latestRate");
                    let latestRate = tableMeta.rowData[latestRateIndex];

                    let sgdAmt = latestRate && latestRate > 0 ? amountRounding(2, (value / latestRate)) : value;
                    let currencyAmount = sgdAmt
                    let currencySymbol = "$";
                    if (paymentMethod) {
                        for (let i = 0; i < this.state.paymentMethodList.length; i++) {
                            if (paymentMethod === this.state.paymentMethodList[i]['_id']) {
                                latestRate = this.state.paymentMethodList[i].currency.latestRate;
                                currencyAmount = amountRounding(2, currencyAmount * latestRate)
                                currencySymbol = this.state.paymentMethodList[i].currency.currencySymbol;
                                break
                            } 
                        }                        
                    }
                    // debugger 
                    return(
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
            { name: "debit", options: { display: "excluded", filter: false, sort: false } },                           //6
        ];

        const creditColumns = [
            { name: "id",  options: { display: "excluded", filter: false, sort: false }},
            { label: "Debit Note No", name: "invoiceNumber", options: { filter: false } },
          
            { label: "Debit Amount", name: "currency.latestRate", options: {
                filter: false,
                customBodyRender:(value, tableMeta)=>{
                    const currencyAmountIndex = creditColumns.findIndex(x => x.name === "debit");
                    let latestRate = value;

                    //convert back to SGD first then do the conversions 
                    let sgdAmt = amountRounding(2, (tableMeta.rowData[currencyAmountIndex] / value))
                    let currencyAmount = sgdAmt;
                    let currencySymbol = "$";
                    if (paymentMethod) {
                        for (let i = 0; i < this.state.paymentMethodList.length; i++) {
                            if (paymentMethod === this.state.paymentMethodList[i]['_id']) {
                                latestRate = this.state.paymentMethodList[i].currency.latestRate;
                                currencyAmount = amountRounding(2, currencyAmount * latestRate)
                                currencySymbol = this.state.paymentMethodList[i].currency.currencySymbol;
                                break
                            } 
                        }
                    }


                    return(
                        <div>{currencySymbol} {currencyAmount}</div>
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
                    const latestRateIndex = creditColumns.findIndex(x => x.name === "currency.latestRate");
                    let latestRate = tableMeta.rowData[latestRateIndex];
                    let sgdAmt = latestRate && latestRate > 0 ? amountRounding(2, (value / latestRate)) : value;
                    let currencyAmount = sgdAmt
                    let currencySymbol = "$";
                    if (paymentMethod) {
                        for (let i = 0; i < this.state.paymentMethodList.length; i++) {
                            if (paymentMethod === this.state.paymentMethodList[i]['_id']) {
                                latestRate = this.state.paymentMethodList[i].currency.latestRate;
                                currencyAmount = amountRounding(2, currencyAmount * latestRate)
                                currencySymbol = this.state.paymentMethodList[i].currency.currencySymbol;
                                break
                            } 
                        }
                    }
                    // debugger 
                    return(
                        <div>{currencySymbol} {currencyAmount}</div>
                    )
                }
            } },
            { label: "Full reconcile", name: "reconciled", options: {
                    filter: false,
                    customBodyRender:(value, tableMeta)=>{
                        return(
                            <Checkbox
                                defaultChecked={value}
                                onChange={(e) => this.handleDebitReconcile(e, tableMeta.rowData[0])}
                                checked={value}
                                disabled={disableEdit}
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
                                type="number"
                                onChange={(e) => this.handleDebitAllocation(e, tableMeta.rowData[0])}
                                readOnly={editable} />
                        )
                    }
                } },
            { name: "credit",  options: { display: "excluded", filter: false, sort: false }},                           //6
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
                    centerTitle={this.state.onEditPayment ? 'Update AP Payment Page' : 'Create New AP Payment Page'}
                    edit="test"
                    promptMessage={this.showStatus()}
                    listRedirect={supplierPaymentListPage}
                    showEditButton={this.state.disableEdit && this.state.status !== 'closed'}
                    onChangeToEdit={this.onChangeToEdit}
                >
                    <form autoComplete="off">
                        <div class="top-container" style={{ marginLeft: "2.5rem" }}>
                            {this.state.errorMsg && (<h4 class="text-danger text-center">{this.state.errorMsg}</h4>)}
                            <div class="row">
                                <div class="col-sm-4 " >
                                    <FormInput
                                        label="Payment Number"
                                        value={paymentNo}
                                        target="paymentNo"
                                        handleChange={this.handleChange}
                                        isToggledEditForm={toggleFormSelection}
                                        readOnly={true}
                                        original={this.props.SupplierPaymentProduct.data ? this.props.SupplierPaymentProduct.data.paymentNo : "" }
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
                                        value={paymentDate !== "" ? `${formatDate(paymentDate, 'L', 'en-SG')}` : ""}
                                        selectedDay={paymentDate}
                                        // placeholder={`${formatDate(new Date(), 'L', 'en-SG')}`}
                                        placeholder={"DD/MM/YYYY"}
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
                                            selectValues={this.state.paymentMethodList}
                                            handleChange={this.handleChange}
                                            readOnly={disableEdit}
                                            isToggledEditForm={toggleFormSelection}
                                            original={this.props.SupplierPaymentProduct.data.paymentMethod ? this.props.SupplierPaymentProduct.data.paymentMethod : "" }
                                            // original={this.props.SupplierPaymentProduct.data.paymentMethod ? this.props.SupplierPaymentProduct.data.paymentMethod ? this.props.SupplierPaymentProduct.data.shortTermPaymentId : this.props.SupplierPaymentProduct.data.shortTermPaymentId : "" }
                                        />
                                    </div>
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
                                        isToggledEditForm={toggleFormSelection}
                                        original={this.props.SupplierPaymentProduct.data.suppNo ? this.props.SupplierPaymentProduct.data.suppNo: ""}
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
                                        original={this.props.SupplierPaymentProduct.data.total ? this.props.SupplierPaymentProduct.data.total: 0} />
                                </div>
                                <div class="col-sm-4 ">
                                    <FormInput
                                        label="Supplier Name"
                                        value={suppName}
                                        target="suppName"
                                        buttonClick={this.searchSupplier}
                                        hasButton={status === 'closed' ? false : true}
                                        thirdButton={false}
                                        handleChange={this.handleChange}
                                        readOnly={disableEdit}
                                        isToggledEditForm={toggleFormSelection}
                                        original={this.props.SupplierPaymentProduct.data.suppName ? this.props.SupplierPaymentProduct.data.suppName: ""}
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
                                        original={this.props.SupplierPaymentProduct.data.period ? this.props.SupplierPaymentProduct.data.period: ""} />
                                </div>
                                <div className="col-sm-4">
                                    <FormInput
                                        label="Payment Ref"
                                        value={paymentRef}
                                        target="paymentRef"
                                        handleChange={this.handleChange}
                                        readOnly={false}
                                        isToggledEditForm={toggleFormSelection} 
                                        original={this.props.SupplierPaymentProduct.data.paymentRef ? this.props.SupplierPaymentProduct.data.paymentRef: ""}/>
                                </div>
                                <div class="col-sm-4 ">
                                    <FormInput
                                        label="Memo"
                                        value={memo}
                                        target="memo"
                                        handleChange={this.handleChange}
                                        readOnly={false}
                                        isToggledEditForm={toggleFormSelection}
                                        original={this.props.SupplierPaymentProduct.data.memo ? this.props.SupplierPaymentProduct.data.memo: ""} />
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
                                        title={"OutStanding DebitNotes / Deposits"}
                                        columns={creditColumns}
                                        data={debitNotes}
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
                                        value={this.state.expenseAmount }
                                        target="expenseAmount"
                                        handleChange={this.handleChange} 
                                        original={this.props.SupplierPaymentProduct.data.expenseAmount ? this.props.SupplierPaymentProduct.data.expenseAmount: 0}    
                                        readOnly={disableEdit}
                                        isToggledEditForm={toggleFormSelection}

                                    /></div>
                                       <div class="col-sm-6"><FormInput
                                            label="Expense Account"
                                            value={this.state.expense_account_name }
                                            target="expense_account_name"
                                            hasButton={status === 'closed' ? false : true}   
                                            buttonClick={() => this.searchSupplier('account', 'expense')}
                                            original={this.props.SupplierPaymentProduct.data.expenseAccount ? this.getAccountName(this.props.SupplierPaymentProduct.data.expenseAccount): ""}                                            
                                            readOnly={disableEdit}
                                            isToggledEditForm={toggleFormSelection}

                                        /></div>
                                    <div class="col-sm-3 text-right" style={{marginTop:19}}>Currency Loss</div>
                                        <div class="col-sm-3" style={{marginTop:19}}><FormInput
                                        label=""
                                        value={this.state.currencyLossAmount}
                                        target="currencyLossAmount"
                                        handleChange={this.handleChange} 
                                        original={this.props.SupplierPaymentProduct.data.currencyAmount ? this.props.SupplierPaymentProduct.data.currencyAmount: 0}   
                                        readOnly={disableEdit}
                                        isToggledEditForm={toggleFormSelection}

                                    
                                    /></div>
                                    <div class="col-sm-6"><FormInput
                                            label="Currency Loss"
                                            value={this.state.currency_account_name }
                                            target="currency_account_name"
                                            hasButton={status === 'closed' ? false : true}
                                            buttonClick={() => this.searchSupplier('account', 'currency')}                                     
                                            readOnly={disableEdit}
                                            original={this.props.SupplierPaymentProduct.data.currencyAccount ? this.getAccountName(this.props.SupplierPaymentProduct.data.currencyAccount) : ""}
                                            isToggledEditForm={toggleFormSelection}

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
                                        {this.state.status != "closed"
                                        &&<div onClick={this.onConfirmPayment}>
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
                        {this.state.target === "suppName" ? (
                            <div>
                                {/* <h3>Supplier List</h3>
                                <CrmSupplierList
                                    getInfo={this.getInfo} /> */}
                                <JournalPartnerList getInfo={this.getInfoPartner}/>
                            </div>) : this.state.target === "account" ?
                            (
                                <div>
                                    <h3>Account List</h3>
                                    <JournalAccountList
                                        getInfo={this.getExpenseAccount} />
                                </div>
                            ) : null}
                    </DialogRoot>
                </FormWrapper>
            </React.Fragment >
        );
    }
}

const mapStateToProps = ({ suppliertfesState, supplierPaymentState, paymentState, accountItemState, LoanManagementState, customertfesState }) => {
    const { SupplierFiltered, singleSupplier } = suppliertfesState
    const { singleCustomer } = customertfesState
    const { paymentMethod } = paymentState;
    const { OutstandingSupplierInvoice, SupplierPaymentProduct } = supplierPaymentState;
    const { accountItem } = accountItemState;
    const {shortTermLoanAll, shortLoanSingle } = LoanManagementState
    return { SupplierFiltered, OutstandingSupplierInvoice, SupplierPaymentProduct, paymentMethod, accountItem, shortTermLoanAll, shortLoanSingle, singleSupplier, singleCustomer };
};
export default connect(mapStateToProps, {
    getOutstandingSupplierInvoices,
    setSupplierPayment,
    getSingleSupplierPaymentRequest,
    patchSingleSupplierPayment,
    getFilterSupplier,
    getPaymentMethods,
    getAllAccountItem,
    getAllShortTermLoans,
    getSingleShortTermLoan,
    getSingleSupplierRequest,
    getSingleCustomerRequest
})(SupplierPaymentNew);
