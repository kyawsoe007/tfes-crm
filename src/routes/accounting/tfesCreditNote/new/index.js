// new quotation
import React, { Component } from "react";
import { connect } from "react-redux";
import RctSectionLoader from "Components/RctSectionLoader";
import { singleTfesCreditNote, tfesCreditNoteListPage } from 'Helpers/accountingURL';
// Redux imports
import { setProduct, getProductDetails, getFilterProduct } from "Ducks/producttfes";

import { setCreditNote, patchSingleCreditNote, getSingleCreditNoteRequest, getDropdownGroup, getCreditNotePdf } from "Ducks/creditnotetfes";
import { getSingleInvoiceRequest } from "Ducks/invoicetfes";
import { savePACKINGForm } from "Ducks/packing";
import { getSingleSupplierRequest } from "Ducks/suppliertfes";
import { getSingleCustomerRequest } from "Ducks/customertfes";

import {
    Button,
} from "@material-ui/core";
// React Component import
import FormWrapper from "Components/Form/Layout/FormWrapper";
import FormInput from "Components/Form/FormInput";
import DialogRoot from "Components/Dialog/DialogRoot";
import SkuList from 'Components/PopupPage/SkuList'
import TfesCustomerList from 'Components/PopupPage/TfesCustomerList'
import JournalPartnerList from 'Components/PopupPage/JournalPartnerList';
import CreateCustomer from 'Components/PopupPage/CreateCustomer'
import InvoiceProductLine from 'Components/ProductLine/InvoiceProductLine'
import SendEmail from 'Components/PopupPage/SentEmail'

// material-ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// Icon
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { Icon } from "@iconify/react";
import fastReverseButton from '@iconify-icons/emojione-v1/fast-reverse-button';
import fastForwardButton from '@iconify-icons/emojione-v1/fast-forward-button';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import PrintTwoToneIcon from '@material-ui/icons/PrintTwoTone';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// React Day Picker input
import DayPickerInput from 'react-day-picker/DayPickerInput';

import MomentLocaleUtils, {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';
import NumberFormat from 'react-number-format';
import { amountRounding } from 'Helpers/helpers'
import SendIcon from "@material-ui/icons/Send";
import JournalAccountList from "../../journalEntries/components/JournalAccountList";

const PAGE_MAX = 10;
const INIT_STATE = {
    toggle: false,
    payToggle: false,
    onEditCreditNote: false,
    creditNoteNumber: "",
    element: null,
    target: "",
    exportLocal: "export",
    errorMsg: "",
    date: "",
    salesPic: "",
    account: "",
    custId: "",
    custNo: "",
    custName: "",
    address: "",
    remarks: "",
    currency: [],
    currencyName: "",
    currencySymbol: "",
    telNo: "",
    faxNo: "",
    paymentTerm: "",
    buyerName: "",
    buyerEmail: "",
    description: "",
    qty: 0,
    unitPrice: 0,
    extPrice: 0,
    deletedExtPrice: 0,
    discount: 10,
    summary: "",
    discountAmount: 0,
    subTotal: 0,
    grandTotal: 0,
    gst: 0,
    gstAmount: 0,
    downPayment: 100,
    balance: 0,
    lines: [{
        SN: 1,
        id: '',
        unitPrice: 0,
        description: "",
        qty: 0,
        extPrice: 0,
        account: '',
        account_name: ''
    }],
    total: 0,
    day: "",
    index: 0,
    status: '',
    customerButtonShow: true,
    disableEdit: false,
    buttonShow: true,
    page: 1,
    toggleFormSelection: true,
    fromInvoiceCheck: false
};
class TfesCreditNoteFormView extends Component {
    constructor(props) {
        super(props);
        this.state = INIT_STATE;
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLineChange = this.handleLineChange.bind(this);
        this.getInfoSKU = this.getInfoSKU.bind(this);
        this.getInfoAccount = this.getInfoAccount.bind(this);
        this.getInfoCustomer = this.getInfoCustomer.bind(this);
        this.getInfoBOM = this.getInfoBOM.bind(this);
        this.getInfoCreateCustomer = this.getInfoCreateCustomer.bind(this);
        this.getInfoPartner = this.getInfoPartner.bind(this)
        this.passDataBack = this.passDataBack.bind(this);
        this.deleteNewLine = this.deleteNewLine.bind(this);
        this.resetTotalState = this.resetTotalState.bind(this);
        this.onPrintPdf = this.onPrintPdf.bind(this);
        this.onConfirmCreditNote = this.onConfirmCreditNote.bind(this);

        this.onPayCreditNote = this.onPayCreditNote.bind(this);
    }

    onSubmit() {
        if (this.state.custNo === '') {
            this.setState({
                errorMsg: 'Customer not selected yet!',
            })
        } else if (this.state.date === "") {
            this.setState({
                errorMsg: 'Date not selected yet!',
            })
        } else {
            const data = {
                ...this.state,
                salesOrderItems: this.state.lines
            };

            delete data.toggleFormSelection;
            delete data.lines;
            delete data.onEditCreditNote;
            delete data.toggle;
            delete data.element;
            // delete data.creditNoteNumber;
            delete data.targetSearch;
            delete data.latestSalesOrder;

            // If edit/update onSubmit
            if (this.state.onEditCreditNote) {
                data.id = this.state.id;
                this.props.patchSingleCreditNote(data)

            } else {
                // To Remove state
                const { state } = this.props.history.location;
                if (state && state.isDuplicate) {
                    const stateCopy = { ...state };
                    delete stateCopy.isDuplicate;
                    this.props.history.replace({ state: stateCopy })
                }
                this.props.setCreditNote(data);
            }
            this.setState({
                toggleFormSelection: true,
                disableEdit: true,
                view: true,
                errorMsg: "",
            })
        }
    }

    componentDidMount() {
        this.props.getDropdownGroup();

        const fromInvoiceCheck = this.props.location.state;

        const id = this.props.match.params.id;
        if (id && !fromInvoiceCheck) {
            this.props.getSingleCreditNoteRequest(id);

            if (this.props.CreditNoteProduct.data && this.props.CreditNoteProduct.data.id) {
                this.resetTotalState();
            }
        } else if (id && fromInvoiceCheck && fromInvoiceCheck.isDuplicate) {
            this.props.getSingleCreditNoteRequest(id);

            if (this.props.CreditNoteProduct.data && this.props.CreditNoteProduct.data.id) {
                this.resetTotalState();
            }
        } else if (id && fromInvoiceCheck && fromInvoiceCheck.so) {
            this.props.getSingleInvoiceRequest(id);

            if (this.props.InvoiceProduct.data && this.props.InvoiceProduct.data.id) {
                this.resetTotalState(undefined, true);
            }
        }
    }

    resetTotalState(editStatus, fromInvoice) {
        let newState;
        if (fromInvoice) {
            newState = {
                // ...INIT_STATE,
                fromInvoiceCheck: true,
                onEditCreditNote: editStatus,
                ...this.props.InvoiceProduct.data,
                paymentTerm:
                    this.props.InvoiceProduct.data.paymentTerm &&
                        this.props.InvoiceProduct.data.paymentTerm.id
                        ? this.props.InvoiceProduct.data.paymentTerm.id
                        : this.props.InvoiceProduct.data.paymentTerm,

                account: this.props.InvoiceProduct.data ? this.props.InvoiceProduct.data.account : '',

                journal: this.props.InvoiceProduct.data ? this.props.InvoiceProduct.data.journal : '',

                currency:
                    this.props.InvoiceProduct.data.currency &&
                        this.props.InvoiceProduct.data.currency.id
                        ? this.props.InvoiceProduct.data.currency.id
                        : this.props.InvoiceProduct.data.currency,
            }

            // v Make a deep copy of the salesOrderItems by adding the values into a NEW array named lines
            let lines = [];
            if (this.props.InvoiceProduct.data.salesOrderItems) {
                for (let i = 0; i < this.props.InvoiceProduct.data.salesOrderItems.length; i++) {
                    let item = { ...this.props.InvoiceProduct.data.salesOrderItems[i] };
                    lines.push(item);
                }
            }
            newState.lines = lines;
        } else {
            newState = {
                // ...INIT_STATE,
                fromInvoiceCheck: false,
                onEditCreditNote: editStatus,
                ...this.props.CreditNoteProduct.data,
                paymentTerm:
                    this.props.CreditNoteProduct.data.paymentTerm &&
                        this.props.CreditNoteProduct.data.paymentTerm.id
                        ? this.props.CreditNoteProduct.data.paymentTerm.id
                        : this.props.CreditNoteProduct.data.paymentTerm,

                account: this.props.CreditNoteProduct.data ? this.props.CreditNoteProduct.data.account : '',

                journal: this.props.CreditNoteProduct.data ? this.props.CreditNoteProduct.data.journal : '',

                currency:
                    this.props.CreditNoteProduct.data.currency &&
                        this.props.CreditNoteProduct.data.currency.id
                        ? this.props.CreditNoteProduct.data.currency.id
                        : this.props.CreditNoteProduct.data.currency,
            };

            let lines = [];
            if (this.props.CreditNoteProduct.data.salesOrderItems) {
                for (let i = 0; i < this.props.CreditNoteProduct.data.salesOrderItems.length; i++) {
                    let item = { ...this.props.CreditNoteProduct.data.salesOrderItems[i] };
                    lines.push(item);
                }
            }
            newState.lines = lines;
            console.log("salesOrderItems: ", lines);
        }
        if (!editStatus) {
            newState.status = "draft";
        }
        delete newState.saleOrderItems;
        this.setState({
            ...this.state,
            ...newState,
        }, () => {
            this.calculateTotal(this.state.lines)
        })

        if (newState.status == 'closed' || newState.status == 'confirmed'){
            this.setState({ disableEdit: true })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.CreditNoteProduct.data !== this.props.CreditNoteProduct.data) {
            if (
                this.props.CreditNoteProduct.data &&
                this.props.CreditNoteProduct.data.id
            ) {
                // If Browser Id isn't same with redux state ID,
                // Push again to update an new broswer Id on Create new Version
                // For New Version Purpose
                const { state } = this.props.history.location;
                if (
                    this.props.match.params.id !== this.props.CreditNoteProduct.data.id
                ) {
                    this.props.history.push(
                        singleTfesCreditNote(this.props.CreditNoteProduct.data.id),
                    )
                }

                if (state && state.isDuplicate) {
                    this.resetTotalState(false);
                    this.setState({
                        creditNoteNumber: "",
                        status: "draft",
                        _id: "",
                        id: "",
                        toggleFormSelection: false,
                    })
                }
                else {
                    this.resetTotalState(true);
                    if (this.props.CreditNoteProduct.data.latestSalesOrder === false || this.props.CreditNoteProduct.data.isConverted === true) {
                        this.setState({
                            disableEdit: true,
                            buttonShow: false,
                            customerButtonShow: false,
                        })
                    }
                }
            }
        }

        // this section updates the form fields after get call when select from partner list
        if (prevProps.singleCustomer.data !== this.props.singleCustomer.data) {
            if (this.props.singleCustomer && this.props.singleCustomer.data) {
                const custDetails = this.props.singleCustomer.data
                // debugger
                this.setState({
                    custNo: custDetails.cusNo,
                    custName: custDetails.name,
                    address: custDetails.address ? custDetails.address : "",
                    telNo: (custDetails.tel1a ? custDetails.tel1a : "") + (custDetails.tel1b ? custDetails.tel1b : ""),
                    faxNo: (custDetails.fax1a ? custDetails.fax1a : "") + (custDetails.fax1b ? custDetails.fax1b: ""),
                    buyerName: custDetails.cusPIC ? custDetails.cusPIC : "",
                    buyerEmail: custDetails.cusPICEmail ? custDetails.cusPICEmail : ""
                })
            }
        }

        // this section updates the form fields after get call when select from partner list
        if (prevProps.singleSupplier.data !== this.props.singleSupplier.data) {
            if (this.props.singleSupplier && this.props.singleSupplier.data) {
                const custDetails = this.props.singleSupplier.data
                // debugger
                this.setState({
                    custNo: custDetails.suppId,
                    custName: custDetails.name,
                    address: custDetails.address ? custDetails.address : "",
                    telNo: (custDetails.tel1a ? custDetails.tel1a : "") + (custDetails.tel1b ? custDetails.tel1b : ""),
                    faxNo: (custDetails.fax1a ? custDetails.fax1a : "") + (custDetails.fax1b ? custDetails.fax1b: ""),
                    buyerName: custDetails.salesPIC ? custDetails.salesPIC : "",
                    buyerEmail: custDetails.salesPICEmail ? custDetails.salesPICEmail : ""
                })
            }
        }
    }

    getInfoSKU(productId, skuId) {
        const SKU = this.props.ProductFiltered.data;
        SKU.map((source) => {
            if (source.id == productId) {
                this.setState(prevState => ({
                    lines: prevState.lines.map((eachItem, index) =>
                        index == this.state.index // eachItem.num
                            ? {
                                ...eachItem,
                                sku: skuId,
                                description: source.description,
                                // IF CURRENT UNIT PRICE == 0 (user didn't key anything previously), Change to default unit price for item!
                                // Otherwise, IF Retain User input 
                                unitPrice:
                                    this.state.lines[index].unitPrice == 0
                                        ? source.listPrice
                                            ? amountRounding(2, source.listPrice)
                                            : 0
                                        : this.state.lines[index].unitPrice,
                                // IF QTY != 0 (user keyed value previously), RETAIN VALUE!
                                qty:
                                    this.state.lines[index].qty !== 0
                                        ? this.state.lines[index].qty
                                        : 0,
                                // IF QTY != 0 AND UNIT PRICE != 0, CALCULATE EXT PRICE!
                                extPrice:
                                    this.state.lines[index].qty != 0 && this.state.lines[index].unitPrice != 0
                                        ? amountRounding(2, this.state.lines[index].qty * this.state.lines[index].unitPrice)
                                        : 0
                            }
                            : eachItem
                    )
                }), () => {
                    // recalculates extPrice if they select product
                    // console.log(this.state.lines);
                    let lines = [...this.state.lines];
                    for (let i = 0; i < lines.length; i++) {
                      lines[i].extPrice = amountRounding(2, lines[i].qty * lines[i].unitPrice);
                    }
          
                    this.setState({ lines: lines })
                    // debugger
                  })
                  
                this.setState({
                    toggle: false,
                });
            }
        })
    }

    getInfoAccount(id) {
        //const Accounts = this.props.journalAccountFiltered.data;
        const Accounts = this.props.CreditNoteDetails.data.accountItem;
        Accounts.map(account => {
            if (account._id === id) {
                this.setState(prevState => ({
                    lines: prevState.lines.map((eachItem, index) =>
                        index == this.state.index // eachItem.num
                            ? {
                                ...eachItem,
                                account: account._id,
                                account_name: account.accountName
                            }
                            : eachItem
                    )
                }));
            }
        });

        this.setState({
            toggle: false,
        })
    }

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
                    address: source.address ? source.address : "",
                    telNo: source.cusPICtel1b ? source.cusPICtel1b : "",
                    faxNo: source.cusPICMobile1a ? source.cusPICMobile1a : "",
                    buyerName: source.cusPIC ? source.cusPIC : "",
                    buyerEmail: source.cusPICEmail ? source.cusPICEmail : "",
                });
            }
        });
        let lines = [...this.state.lines];
        this.calculateTotal(lines)
    }

    getInfoCreateCustomer(data, newCustomerNo) {
        this.setState({
            toggle: false,
            custNo: newCustomerNo,
            custName: data.name,
            address: data.address,
            telNo: data.cusPICtel1b,
            faxNo: data.cusPICMobile1a,
            buyerName: data.cusPIC,
            buyerEmail: data.cusPICEmail,
            paymentTerm: data.paymentTerm,
        })
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

        this.setState({
            custId: id,
            toggle: false,
        })
    }

    getInfoBOM(id) {
    }
    getInfoSendEmail = () => {
        // this.setState({
        //   toggle: false,
        // })
    }

    passDataBack(description, quantity, unitPrice, BomList) {
        this.setState(prevState => ({
            lines: prevState.lines.map((eachItem, index) =>
                index == this.state.indexBOM // eachItem.num
                    ? {
                        ...eachItem,
                        description: description,
                        qty: quantity,
                        unitPrice: unitPrice,
                        BomList: BomList,
                    }
                    : eachItem
            ),
        }));
    }


    handleChange(field, value) {
        let changeState = { [field]: value };
        if (field == "journal") {
            //set default account
            if (this.props.CreditNoteDetails.data.accountJournal) {
                for (let i = 0; i < this.props.CreditNoteDetails.data.accountJournal.length; i++) {
                    if (this.props.CreditNoteDetails.data.accountJournal[i]._id == value) {
                        if (this.props.CreditNoteDetails.data.accountJournal[i].debit_account) {
                            changeState.account = this.props.CreditNoteDetails.data.accountJournal[i].debit_account._id;
                        }
                        if (this.props.CreditNoteDetails.data.accountJournal[i].credit_account) {
                            let lines = [...this.state.lines];
                            for (let j = 0; j < lines.length; j++) {
                                lines[j].account = this.props.CreditNoteDetails.data.accountJournal[i].credit_account._id;
                                lines[j].account_name = this.props.CreditNoteDetails.data.accountJournal[i].credit_account.accountName;
                            }
                            changeState.lines = lines;
                        }

                    }

                }
            }
        }

        this.setState(changeState, () => {
            if (field == "exportLocal") {
                this.calculateTotal(this.state.lines)
            }
        });

        this.setState(changeState, () => {
            if (field == "currency") {
                this.calculateTotal(this.state.lines)
            }
        });

    }

    handleLineChange(field, value, key) {

        if (field === "qty" || field === "unitPrice") {
            if (value.length >= 1 && value.match(/[a-z\s]/i)) {
                return null
            }
        }

        // sets minimum qty 
        if (field === "qty") {
            if (value === "" || value <= 0) {
                value = 1
            }
        }

        // sets minimum unitPrice 
        if (field === "unitPrice") {
            if (value === "" || value <= 0) {
                value = 0
            }
        }

        let lines = [...this.state.lines];
        lines[key][field] = value;
        let extPrice = parseInt(lines[key].qty) * parseFloat(lines[key].unitPrice);
        extPrice = amountRounding(2, extPrice)
        lines[key].extPrice = extPrice;
        this.calculateTotal(lines);
        this.setState({
            lines: lines,
        })
    }

    addNewLine = () => {
        let lines = [...this.state.lines];
        lines.push({
            SN: lines.length + 1,
            id: "",
            description: "",
            unitPrice: 0,
            qty: 0,
            extPrice: 0,
            account: '',
            account_name: '',
            BomList: [],
        })
        let page = Math.ceil(lines.length / PAGE_MAX);
        this.setState({
            lines: lines,
            page: page
        })
    }

    deleteNewLine(index) {
        let lines = [...this.state.lines];
        lines.splice(index, 1);
        this.calculateTotal(lines);
        lines.forEach((item, index) => {
            item.SN = index + 1
        });
        const totalPages = Math.ceil(lines.length / PAGE_MAX);
        let page = this.state.page;
        if (this.state.page > totalPages) {
            page--
        }
        this.setState({
            lines: lines,
            page: page
        })
    }

    forwardToNextQty = () => {
        let totalPages = Math.ceil(this.state.lines.length / PAGE_MAX);
        if (totalPages !== this.state.page) {
            this.setState({
                ...this.state,
                page: this.state.page + 1
            })
        }
    };

    reverToPreQty = () => {
        if (this.state.page !== 1) {
            this.setState({
                ...this.state,
                page: this.state.page - 1
            })
        }
    };


    calculateTotal(lines) {
        let total = 0;
        for (let i = 0; i < lines.length; i++) {
            total += parseFloat(lines[i].qty) * parseFloat(lines[i].unitPrice);
        }

        // For export local
        let gst;
        if (this.state.exportLocal == "local") {
            console.log(this.state.gst);
            if (this.props.CreditNoteDetails.data.gst) {
                for (let j = 0; j < this.props.CreditNoteDetails.data.gst.length; j++) {
                    if (this.props.CreditNoteDetails.data.gst[j].name == "local") {
                        gst = this.props.CreditNoteDetails.data.gst[j].rate;
                        break;
                    }
                }
            }
            else {
                gst = this.state.gst;
            }

        }
        else if (this.state.exportLocal == "export") {
            gst = 0;
        }

        // For Currency
        let conversion = 1;
        // State rate will be the previous rate
        if (this.state.currency != null && this.props.CreditNoteDetails.data.currency) {
            this.props.CreditNoteDetails.data.currency.map(item => {
                if (item.id == this.state.currency) {
                    this.setState({
                        currencyName: item.name,
                        currencySymbol: item.currencySymbol
                    });
                }
            })
        }

        let subTotal = Math.round(total * conversion * 100) / 100;
        let gstAmount = Math.round(subTotal * gst) / 100;
        let grandTotal = subTotal + gstAmount;
        let balance = 0;

        this.setState({
            total: amountRounding(2, total),
            subTotal: amountRounding(2, subTotal),
            grandTotal: amountRounding(2, grandTotal),
            gstAmount: amountRounding(2, gstAmount),
            gst: gst,
            balance: balance
        })
    }

    checkDisabled() {
        if (this.state.status === 'closed' || this.state.status === 'confirmed') {
            return false;
        } else if (this.state.disableEdit == true) {
            return false
        }
        return true;
    }

    onChangeToEdit = () => {
        this.setState({
            disableEdit: false,
            view: false
        })
    }

    showStatus() {
        if (this.state.status == "confirmed") { return "【 Confirmed 】" }
        if (this.state.status == "draft") { return "【 Draft 】" }
        if (this.state.status == "closed") { return "【 Closed 】" }
        else { return " " }
    }

    searchCustomer = (target, index) => {
        this.setState({
            toggle: true,
            element: target,
            target: target,
            targetSearch: this.state[target]
        })
        //this.props.getFilterCustomerTfes(20, 0, [], this.state[target]);
    };

    buttonClick = (target, index) => {
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
    };

    thirdButtonClick = (target) => {

        this.setState({
            toggle: true,
            element: target,
            target: 'createCus',
        })
    }

    restartToggle = () => {
        this.setState({
            toggle: false,
        });
    };

    saveBOM = () => {
        this.setState({
            toggle: false
        })
    }
    //packingList Create


    onConfirmCreditNote() {
        if (this.state.onEditCreditNote === true) {
            if (this.state.status == "draft") {
                const data = {
                    ...this.state,
                    status: 'confirmed',
                    salesOrderItems: this.state.lines,
                };
                this.props.patchSingleCreditNote(data)
            } else {
                alert('This Credit Note was already confirmed')
            }
        } else {
            alert('You must save this sales order in order to execute confirm')
        }
    }

    onPayCreditNote() {
        this.setState({ payToggle: true })
    }

    closeModal() {
        this.setState({ payToggle: false })
    }

    confirmPayCreditNote() {
        this.setState({ payToggle: false });

        const data = {
            ...this.state,
            status: 'closed',
            reconciled: true,
            salesOrderItems: this.state.lines,
        };
        this.props.patchSingleCreditNote(data)
    }

    onBackToListView = () => {
        this.props.history.push('/app/accounting/tfesCreditNote')
    };

    onPrintPdf() {
        this.props.getCreditNotePdf(this.props.match.params.id)
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
    onCreatePackingOrder = () => {
        console.log("onCreatePackingOrder")
        alert("onCreatePackingOrder")
    }
    render() {
        const { creditNoteNumber, date, page, account, custNo, journal, custName, address, currency, currencyName, currencySymbol, telNo, faxNo, target, disableEdit, buttonShow, } = this.state;
        const { paymentTerm, buyerName, buyerEmail, exportLocal, SN, description, qty, unitPrice, extPrice, discount, uom, remarks, summary, toggleFormSelection, fromInvoiceCheck } = this.state;
        const { brands, materials, loading } = this.props.ProductDetails;
        const totalPages = Math.ceil(this.state.lines.length / PAGE_MAX);

        return (
            <React.Fragment>
                {this.props.CreditNoteProduct.loading ? (
                    <RctSectionLoader />
                ) : (
                    <FormWrapper onSave={this.onSubmit}
                        onSaveNew={this.onSaveNew} 
                        disabled={this.checkDisabled()}
                        listRedirect={tfesCreditNoteListPage}
                        title="Back to All CreditNote" centerTitle={this.state.onEditCreditNote ? 'Update Credit Note Page' : 'Create New Credit Note Page'} 
                        edit="test" 
                        promptMessage={this.showStatus()}
                        showEditButton={this.state.disableEdit && this.state.status !== 'closed' && this.state.status !== 'confirmed'}
                        onChangeToEdit={this.onChangeToEdit}
                        >
                        
                        <form autoComplete="off" className={(this.state.disableEdit ) && 'uneditable'}>
                            <div style={{ marginLeft: '2.5rem' }}>
                                <div class="top-container">
                                    {this.state.errorMsg && (<h4 class="text-danger text-center">{this.state.errorMsg}</h4>)}
                                    <div class="row">
                                        <div class="col-sm-4 " >
                                            <FormInput
                                                label="Credit Note Number"
                                                value={creditNoteNumber}
                                                target="creditNoteNumber"
                                                handleChange={this.handleChange}
                                                readOnly={true}
                                                isToggledEditForm={toggleFormSelection}
                                                original={fromInvoiceCheck ?
                                                    this.props.InvoiceProduct.data.creditNoteNumber ? this.props.InvoiceProduct.data.creditNoteNumber : ""
                                                    : this.props.CreditNoteProduct.data.creditNoteNumber ? this.props.CreditNoteProduct.data.creditNoteNumber : ""}

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
                                                // value={this.state.createdDate}
                                                value={date !== "" ? `${formatDate(date, 'L', 'en-SG')}` : ""}
                                                // placeholder={`${formatDate(new Date(), 'L', 'en-SG')}`}
                                                placeholder={"DD/MM/YYYY"}
                                                onDayChange={(e) => this.setState({ date: e })}
                                                dayPickerProps={{
                                                    locale: 'en-SG',
                                                    localeUtils: MomentLocaleUtils
                                                }}
                                                // readOnly={true}
                                                isToggledEditForm={toggleFormSelection}
                                            />
                                        </div>
                                        <div class="col-sm-4">
                                            <FormInput
                                                label="Account"
                                                value={account ? account : ''}
                                                target="account"
                                                selectValueKey="_id"
                                                selectValueName="accountName"
                                                selectValues={this.props.CreditNoteDetails.data ? this.props.CreditNoteDetails.data.accountItem : []}
                                                handleChange={this.handleChange}
                                                readOnly={disableEdit}
                                                isToggledEditForm={toggleFormSelection}
                                                original={fromInvoiceCheck ?
                                                    this.props.InvoiceProduct.data.account ? this.props.InvoiceProduct.data.account : ""
                                                    : this.props.CreditNoteProduct.data.account ? this.props.CreditNoteProduct.data.account : ""}
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-4" >
                                            <FormInput
                                                label="Partner Ref"
                                                value={custNo}
                                                target="custNo"
                                                handleChange={this.handleChange}
                                                readOnly={true}
                                                isToggledEditForm={toggleFormSelection}
                                                original={fromInvoiceCheck ?
                                                    this.props.InvoiceProduct.data.custNo ? this.props.InvoiceProduct.data.custNo : ""
                                                    : this.props.CreditNoteProduct.data.custNo ? this.props.CreditNoteProduct.data.custNo : ""}
                                            />
                                        </div>
                                        <div class="col-sm-4 ">

                                        </div>
                                        <div class="col-sm-4 ">
                                            <FormInput
                                                label="Journal"
                                                value={journal}
                                                target="journal"
                                                selectValueKey="_id"
                                                selectValueName="name"
                                                selectValues={this.props.CreditNoteDetails.data ? this.props.CreditNoteDetails.data.accountJournal : []}
                                                handleChange={this.handleChange}
                                                readOnly={disableEdit}
                                                isToggledEditForm={toggleFormSelection}
                                                original={fromInvoiceCheck ?
                                                    this.props.InvoiceProduct.data.journal ? this.props.InvoiceProduct.data.journal : ""
                                                    : this.props.CreditNoteProduct.data.journal ? this.props.CreditNoteProduct.data.journal : ""}
                                            />
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-sm-8 ">
                                            <FormInput
                                                label="Partner Name"
                                                value={custName}
                                                target="custName"
                                                buttonClick={this.searchCustomer}
                                                hasButton={buttonShow}
                                                thirdButton={this.state.customerButtonShow}
                                                thirdButtonClick={() =>
                                                    this.thirdButtonClick('createCus')
                                                }
                                                handleChange={this.handleChange}
                                                readOnly={disableEdit}
                                                isToggledEditForm={toggleFormSelection}
                                                original={fromInvoiceCheck ?
                                                    this.props.InvoiceProduct.data.custName ? this.props.InvoiceProduct.data.custName : ""
                                                    : this.props.CreditNoteProduct.data.custName ? this.props.CreditNoteProduct.data.custName : ""}
                                            />
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-sm-8" >
                                            <FormInput
                                                label="Address"
                                                value={address}
                                                target="address"
                                                handleChange={this.handleChange}
                                                readOnly={disableEdit}
                                                isToggledEditForm={toggleFormSelection}
                                                original={fromInvoiceCheck ?
                                                    this.props.InvoiceProduct.data.address ? this.props.InvoiceProduct.data.address : ""
                                                    : this.props.CreditNoteProduct.data.address ? this.props.CreditNoteProduct.data.address : ""} />
                                        </div>
                                        <div class="col-sm-4 ">
                                            <FormInput
                                                label="Currency"
                                                target="currency"
                                                selectValueKey="id"
                                                value={currency}
                                                selectValueName="name"
                                                selectValues={this.props.CreditNoteDetails.data ? this.props.CreditNoteDetails.data.currency : []}
                                                handleChange={this.handleChange}
                                                readOnly={disableEdit}
                                                isToggledEditForm={toggleFormSelection}
                                                original={
                                                    fromInvoiceCheck ?
                                                        this.props.InvoiceProduct.data.currency ? this.props.InvoiceProduct.data.currency.id : ""
                                                        : this.props.CreditNoteProduct.data.currency ? this.props.CreditNoteProduct.data.currency.id : ""} />
                                        </div>

                                    </div>
                                    <div class="row">
                                        <div class="col-sm-4 " >
                                            <FormInput
                                                label="Tel. Number"
                                                value={telNo}
                                                target="telNo"
                                                handleChange={this.handleChange}
                                                readOnly={disableEdit}
                                                isToggledEditForm={toggleFormSelection}
                                                original={fromInvoiceCheck ?
                                                    this.props.InvoiceProduct.data.telNo ? this.props.InvoiceProduct.data.telNo : ""
                                                    : this.props.CreditNoteProduct.data.telNo ? this.props.CreditNoteProduct.data.telNo : ""}
                                            />
                                        </div>
                                        <div class="col-sm-4 ">
                                            <FormInput
                                                label="Fax. Number"
                                                value={faxNo}
                                                target="faxNo"
                                                handleChange={this.handleChange}
                                                readOnly={disableEdit}
                                                isToggledEditForm={toggleFormSelection}
                                                original={fromInvoiceCheck ?
                                                    this.props.InvoiceProduct.data.faxNo ? this.props.InvoiceProduct.data.faxNo : ""
                                                    : this.props.CreditNoteProduct.data.faxNo ? this.props.CreditNoteProduct.data.faxNo : ""}
                                            />
                                        </div>
                                        <div class="col-sm-4">
                                            <FormInput
                                                label="Payment Term"
                                                value={paymentTerm}
                                                target="paymentTerm"
                                                selectValueKey="id"
                                                selectValueName="name"
                                                selectValues={this.props.CreditNoteDetails.data ? this.props.CreditNoteDetails.data.paymentTerm : []}
                                                handleChange={this.handleChange}
                                                readOnly={disableEdit}
                                                isToggledEditForm={toggleFormSelection}
                                                original={fromInvoiceCheck ?
                                                    this.props.InvoiceProduct.data.paymentTerm ? this.props.InvoiceProduct.data.paymentTerm.id : ""
                                                    : this.props.CreditNoteProduct.data.paymentTerm ? this.props.CreditNoteProduct.data.paymentTerm.id : ""}
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-4" >
                                            <FormInput
                                                label="Buyer Name"
                                                value={buyerName}
                                                target="buyerName" handleChange={this.handleChange}
                                                readOnly={disableEdit}
                                                isToggledEditForm={toggleFormSelection}
                                                original={fromInvoiceCheck ?
                                                    this.props.InvoiceProduct.data.buyerName ? this.props.InvoiceProduct.data.buyerName : ""
                                                    : this.props.CreditNoteProduct.data.buyerName ? this.props.CreditNoteProduct.data.buyerName : ""}
                                            />
                                        </div>
                                        <div class="col-sm-4">
                                            <FormInput
                                                label="Buyer Email"
                                                value={buyerEmail}
                                                target="buyerEmail"
                                                handleChange={this.handleChange}
                                                readOnly={disableEdit}
                                                isToggledEditForm={toggleFormSelection}
                                                original={fromInvoiceCheck ?
                                                    this.props.InvoiceProduct.data.buyerEmail ? this.props.InvoiceProduct.data.buyerEmail : ""
                                                    : this.props.CreditNoteProduct.data.buyerEmail ? this.props.CreditNoteProduct.data.buyerEmail : ""}
                                            />
                                        </div>
                                        <div className="col-sm-4">
                                            <FormInput
                                                label="Export / Local"
                                                value={exportLocal}
                                                target="exportLocal"
                                                selectValues={[{ name: "Export", value: "export" }, {
                                                    name: "Local",
                                                    value: "local"
                                                }]}
                                                handleChange={this.handleChange}
                                                readOnly={disableEdit}
                                                isToggledEditForm={toggleFormSelection}
                                                original={fromInvoiceCheck ?
                                                    this.props.InvoiceProduct.data.exportLocal ? this.props.InvoiceProduct.data.exportLocal : "export"          // default value
                                                    : this.props.CreditNoteProduct.data.exportLocal ? this.props.CreditNoteProduct.data.exportLocal : "export"}
                                            />
                                        </div>
                                    </div>
                                    <div class="boundary-line" style={{ width: "100%", height: "2px", backgroundColor: "#c0c0c0", margin: "20px auto " }}></div>

                                </div>
                                <div class="bottom-container">
                                    <InvoiceProductLine
                                        lines={this.state.lines}
                                        page={this.state.page}
                                        deleteLine={this.deleteNewLine}
                                        handleLineChange={this.handleLineChange}
                                        toggleFormSelection={toggleFormSelection}
                                        buttonClick={(target, index) => this.buttonClick(target, index)}
                                        disableEdit={this.state.disableEdit}
                                        buttonShow={this.state.buttonShow}
                                        originalData={fromInvoiceCheck ?
                                            this.props.InvoiceProduct.data.salesOrderItems
                                            : this.props.CreditNoteProduct.data.salesOrderItems}
                                    />
                                    <div class="row quotation-btn">
                                        <AddCircleOutlineIcon
                                            className="tableAddIcon"
                                            onClick={this.addNewLine}
                                        />
                                    </div>
                                    <div
                                        class=" preQty-nextQty"
                                        style={{ display: 'flex', justifyContent: 'flex-end' }}
                                    >
                                        <p>Pre Qty #</p>
                                        <div>
                                            <Icon
                                                icon={fastReverseButton}
                                                className="fastReverseButton"
                                                onClick={this.reverToPreQty}
                                            />
                                        </div>
                                        <p>{page} of {totalPages}</p>
                                        <div>
                                            <Icon
                                                icon={fastForwardButton}
                                                className="fastForwardButton"
                                                onClick={this.forwardToNextQty}
                                            />
                                        </div>
                                        <p>Next Qty #</p>
                                    </div>
                                    <div class="boundary-line" />
                                    <div class="row">
                                        <div class="col-sm-9 "  >
                                            <FormInput
                                                label=" "
                                                value="none"
                                                target=" "
                                                handleChange={this.handleChange}
                                                style={{ display: "none" }}
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div className="col-sm-8 ">
                                            <FormInput
                                                label="Remarks"
                                                value={remarks}
                                                target="remarks"
                                                multiline rows={4}
                                                handleChange={this.handleChange}
                                                readOnly={disableEdit}
                                                isToggledEditForm={toggleFormSelection}
                                                original={fromInvoiceCheck ?
                                                    this.props.InvoiceProduct.data.remarks ? this.props.InvoiceProduct.data.remarks : ""
                                                    : this.props.CreditNoteProduct.data.remarks ? this.props.CreditNoteProduct.data.remarks : ""} />
                                        </div>
                                        <div class="col-sm-1 " >
                                            <FormInput
                                                label=""
                                                value=""
                                                target=""
                                                handleChange={this.handleChange}
                                                style={{ display: "none" }}
                                            />
                                        </div>
                                        <div class="col-sm-3 quoSummary" >

                                            <div class="quoSummary-title">
                                                <h3>Summary</h3>
                                            </div>
                                            <div class="quoSummary-content">

                                                <h3>Subtotal, after Discount({currencyName})</h3><p><NumberFormat value={this.state.subTotal} displayType={'text'} thousandSeparator={true} prefix={currencySymbol} /></p>
                                                <h3>GST ({currencyName})</h3><p><NumberFormat value={this.state.gstAmount} displayType={'text'} thousandSeparator={true} prefix={currencySymbol} /></p>
                                                <h3>Grand Total, with GST ({currencyName})</h3><p><NumberFormat value={this.state.grandTotal} displayType={'text'} thousandSeparator={true} prefix={currencySymbol} /></p>

                                            </div>
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
                                        <div className="Left_Toolbar">
                                            {
                                                /*
                                                this.state.status === 'confirmed' ? (
                                                    <div onClick={this.onPayCreditNote}>
                                                        <SendIcon />
                                                        <span> Pay Credit Note </span>
                                                    </div>
                                                ) : null
                                                */
                                            }
                                            {this.state.status === "draft"
                                                && <div onClick={this.onConfirmCreditNote}>
                                                    <ConfirmationNumberIcon />
                                                    <span> Confirm Credit Note </span>
                                                </div>}
                                            <div onClick={this.onPrintPdf}>
                                                <PrintTwoToneIcon />
                                                <span> Print Credit Note </span>
                                            </div>
                                            <div onClick={this.onBackToListView}>
                                                <ArrowBackIcon />
                                                <span>Back to Credit Note List</span>
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
                                    <JournalPartnerList getInfo={this.getInfoPartner} initialFilter={"Customer"}/>
                                </div>) : (this.state.target === 'createCus')
                                ? (<div><h3>Create a customer</h3><CreateCustomer
                                    getInfo={this.getInfoCreateCustomer}
                                    customerName={this.state.custName}
                                    address={this.state.address}
                                    telNo={this.state.telNo}
                                    faxNo={this.state.faxNo}
                                    buyerName={this.state.buyerName}
                                    buyerEmail={this.state.buyerEmail}
                                    incoterm={this.state.incoterm}
                                    paymentTerm={this.state.paymentTerm} /></div>) : this.state.target === 'description' ? (
                                        <div>
                                            <h3> Sku List</h3>
                                            <SkuList getInfo={this.getInfoSKU} />
                                        </div>)
                                    : this.state.target === "sendEmail"
                                        ?
                                        (<div><SendEmail
                                            getInfo={this.getInfoSendEmail}
                                            saveToggle={this.saveBOM}
                                        />
                                        </div>)
                                        : this.state.target === "account" ? (
                                            <div>
                                                <h3>Account List</h3>
                                                <JournalAccountList
                                                    getInfo={this.getInfoAccount} />
                                            </div>
                                        ) : null}
                        </DialogRoot>

                        <DialogRoot
                            show={this.state.payToggle}
                            handleHide={() => this.closeModal()}
                            size={'sm'}
                        >
                            <div className="m-30">
                                <h3 className="text-center">Pay and close credit Note?</h3>

                                <div className="d-flex justify-content-around">
                                    <div>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            className="text-white m-30"
                                            onClick={() => this.closeModal()}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                    <div>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className="text-white m-30"
                                            onClick={() => this.confirmPayCreditNote()}
                                        >
                                            Save
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </DialogRoot>
                    </FormWrapper>
                )
                }
            </React.Fragment >
        );
    }
}

const mapStateToProps = ({ quotationtfesState, producttfesState, customertfesState, accountingState, creditNoteState, packinglistState, invoiceState, suppliertfesState}) => {
    const { Quotations, QuotationDetails } = quotationtfesState;
    const { ProductDetails, ProductFiltered } = producttfesState;
    const { customerFiltered, singleCustomer } = customertfesState;
    const { singleSupplier } = suppliertfesState;
    const { CreditNoteProduct, CreditNoteDetails } = creditNoteState;
    const { packingList } = packinglistState;
    const { InvoiceProduct } = invoiceState;
    const { journalState } = accountingState;
    const { journalAccountFiltered } = journalState;
    return { packingList, Quotations, journalAccountFiltered, QuotationDetails, ProductDetails, ProductFiltered, customerFiltered, CreditNoteProduct, CreditNoteDetails, InvoiceProduct, singleCustomer, singleSupplier };
};
export default connect(mapStateToProps, {
    setCreditNote,
    setProduct,
    getProductDetails,
    getFilterProduct,
    patchSingleCreditNote,
    getSingleCreditNoteRequest,
    savePACKINGForm,
    getSingleInvoiceRequest,
    getDropdownGroup,
    getCreditNotePdf,
    getSingleSupplierRequest,
    getSingleCustomerRequest
})(TfesCreditNoteFormView);
