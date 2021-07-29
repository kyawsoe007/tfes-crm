import React, { Component } from "react";
import { connect } from "react-redux";
import RctSectionLoader from "Components/RctSectionLoader";
import { singledebitNote } from 'Helpers/accountingURL';
// Redux imports
import { setProduct, getProductDetails, getFilterProduct } from "Ducks/producttfes";
//import { getPurchaseDetails } from 'Ducks/purchasetfes';
import { getDropdownGroup } from "Ducks/invoicetfes";
import { setDebitNote, patchSingleDebitNote, getSingleDebitNoteRequest, getDebitNotePdf } from "Ducks/accounting/debitnote";
import { getSingleSupplierInvoiceRequest } from "Ducks/supplier-invoice";
import { getSingleCustomerRequest } from "Ducks/customertfes";

import CrmSupplierList from 'Components/PopupPage/SupplierList'
import FormWrapper from "Components/Form/Layout/FormWrapper";
import FormInput from "Components/Form/FormInput";
import DialogRoot from "Components/Dialog/DialogRoot";
import Product_list from 'Routes/warehouse/SKU/new/components/productList'
import CreateSupplier from 'Components/PopupPage/CreateSupplier'
import JournalPartnerList from 'Components/PopupPage/JournalPartnerList';
//import PurchaseProductLine from 'Components/ProductLine/PurchaseProductLine'
import InvoiceProductLine from 'Components/ProductLine/InvoiceProductLine'
import SendEmail from 'Components/PopupPage/SentEmail';
import JournalAccountList from "Routes/accounting/journalEntries/components/JournalAccountList";
import { amountRounding } from "Helpers/helpers";

// material-ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { Icon } from "@iconify/react";
import fastReverseButton from '@iconify-icons/emojione-v1/fast-reverse-button';
import fastForwardButton from '@iconify-icons/emojione-v1/fast-forward-button';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PrintTwoToneIcon from '@material-ui/icons/PrintTwoTone';
import {
    setSupplier,
    getSupplierDetails,
    getSingleSupplierRequest,
    patchSingleSupplierRequest,
    getFilterSupplier,
    setDuplicate,
} from 'Ducks/suppliertfes';
// React Day Picker input
import DayPickerInput from 'react-day-picker/DayPickerInput';

import MomentLocaleUtils, {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';
import moment from 'moment'
import 'moment/locale/en-SG'
import { debitNoteListPage } from "Helpers/accountingURL";

const INIT_STATE = {
    toggle: false,
    payToggle: false,
    onEditInvoice: false,
    debitNoteNumber: "",
    element: null,
    target: "",
    errorMsg: "",
    invoiceDate: "",
    salesPic: "",
    suppId: "",
    suppNo: "",
    suppName: "",
    suppInvoiceNo: "",
    soNumber: "",
    address: "",
    remarks: "",
    telNo: "",
    faxNo: "",
    paymentTerm: "",
    currency: "",
    buyerName: "",
    buyerEmail: "",
    description: "",
    qty: 0,
    unitPrice: 0,
    extPrice: 0,
    deletedExtPrice: 0,
    discount: "",
    summary: "",
    discountAmount: 0,
    subTotal: 0,
    grandTotal: 0,
    gst: 7,
    gstAmount: 0,
    downPayment: 100,
    balance: 0,
    exportLocal: "export",
    lines: [{
        SN: 1,
        id: '',
        unitPrice: 0,
        description: "",
        qty: 0,
        extPrice: 0,
        account: '',
        account_name: "",
    }],
    total: 0,
    day: "",
    index: 0,
    status: '',
    supplierButtonShow: true,
    disableEdit: false,
    buttonShow: true,
    page: 1,
    currencyName: "",
    toggleFormSelection:true,

}
const PAGE_MAX = 10;
class DebitNoteFormView extends Component {
    constructor(props) {
        super(props);

        this.state = INIT_STATE;

    }
    onSubmit = () => {
        if (this.state.account) {
            if (this.state.suppName === '') {
                this.setState({
                    errorMsg: 'Supplier not selected yet!',
                })
            } else if (this.state.invoiceDate === "") {
                this.setState({
                    errorMsg: 'Date not selected yet!',
                })
            } else {
                const data = {
                    ...this.state,
                    salesOrderItems: this.state.lines
                }
                delete data.toggleFormSelection;
                delete data.lines;
                delete data.onEditInvoice;
                delete data.toggle;
                delete data.payToggle;
                delete data.element;
                // delete data.invoiceNumber;
                delete data.targetSearch;
                delete data.latestSalesOrder;
                delete data.id;
                delete data._id;


                // If edit/update onSubmit
                if (this.state.onEditInvoice) {
                    data.id = this.state.id;
                    this.props.patchSingleDebitNote(data)

                } else {
                    // To Remove state
                    const { state } = this.props.history.location;
                    if (state && state.isDuplicate) {
                        const stateCopy = { ...state };
                        delete stateCopy.isDuplicate;
                        this.props.history.replace({ state: stateCopy })
                    }

                    this.props.setDebitNote(data);
                }
                this.setState({
                    toggleFormSelection: true,
                    disableEdit: true,
                    errorMsg: "",
                })
            }
        }
        else {
            this.setState({
                errorMsg: 'Account not selected yet!',
            })
        }
    }

    componentDidMount() {
        this.props.getDropdownGroup();
        const fromInvoiceCheck = this.props.location.state;
        const id = this.props.match.params.id;
        if (id && !fromInvoiceCheck) {
            this.props.getSingleDebitNoteRequest(id);
            if (this.props.SupplierInvoiceProduct.data && this.props.SupplierInvoiceProduct.data.id) {
                this.resetTotalState();
            }
        } else if (id && fromInvoiceCheck && fromInvoiceCheck.isDuplicate) {
            this.props.getSingleDebitNoteRequest(id);

            if (this.props.DebitNoteProduct.data && this.props.DebitNoteProduct.data.id) {
                this.resetTotalState();
            }
        } else if (id && fromInvoiceCheck && fromInvoiceCheck.fromPo) {
            this.props.getSingleSupplierInvoiceRequest(id);
            if (this.props.SupplierInvoiceProduct.data && this.props.SupplierInvoiceProduct.data.id) {
                this.resetTotalState(undefined, true);
            }
        } else if (this.props.location.state) {
            this.purchaseState(true)
        }

    }

    resetTotalState(editStatus, fromInvoice) {
        let newState;
        if (fromInvoice) {
            newState = {
                fromInvoiceCheck: true,
                onEditInvoice: editStatus,
                ...this.props.SupplierInvoiceProduct.data,
                paymentTerm:
                    this.props.SupplierInvoiceProduct.data.paymentTerm &&
                        this.props.SupplierInvoiceProduct.data.paymentTerm.id
                        ? this.props.SupplierInvoiceProduct.data.paymentTerm.id
                        : "",

                account: this.props.SupplierInvoiceProduct.data ? this.props.SupplierInvoiceProduct.data.account : '',

                journal: this.props.SupplierInvoiceProduct.data ? this.props.SupplierInvoiceProduct.data.journal : '',

                currency:
                    this.props.SupplierInvoiceProduct.data.currency &&
                        this.props.SupplierInvoiceProduct.data.currency.id
                        ? this.props.SupplierInvoiceProduct.data.currency.id
                        : this.props.SupplierInvoiceProduct.data.currency,
            }

            // v Make a deep copy of the salesOrderItems by adding the values into a NEW array named lines
            let lines = [];
            if (this.props.SupplierInvoiceProduct.data.salesOrderItems) {
                for (let i = 0; i < this.props.SupplierInvoiceProduct.data.salesOrderItems.length; i++) {
                    let item = { ...this.props.SupplierInvoiceProduct.data.salesOrderItems[i] };
                    lines.push(item);
                }
            }
            newState.lines = lines;

        } else {
            newState = {
                fromInvoiceCheck: false,
                onEditInvoice: editStatus,
                ...this.props.DebitNoteProduct.data,
                paymentTerm:
                    this.props.DebitNoteProduct.data.paymentTerm &&
                        this.props.DebitNoteProduct.data.paymentTerm.id
                        ? this.props.DebitNoteProduct.data.paymentTerm.id
                        : '',

                account: this.props.DebitNoteProduct.data ? this.props.DebitNoteProduct.data.account : '',

                journal: this.props.DebitNoteProduct.data ? this.props.DebitNoteProduct.data.journal : '',

                currency:
                    this.props.DebitNoteProduct.data.currency &&
                        this.props.DebitNoteProduct.data.currency.id
                        ? this.props.DebitNoteProduct.data.currency.id
                        : this.props.DebitNoteProduct.data.currency,
                lines: this.props.DebitNoteProduct.data.salesOrderItems ? this.props.DebitNoteProduct.data.salesOrderItems : [],
            };
            // v Make a deep copy of the salesOrderItems by adding the values into a NEW array named lines
            let lines = [];
            if (this.props.DebitNoteProduct.data.salesOrderItems) {
                for (let i = 0; i < this.props.DebitNoteProduct.data.salesOrderItems.length; i++) {
                    let item = { ...this.props.DebitNoteProduct.data.salesOrderItems[i] };
                    lines.push(item);
                }
            }
            newState.lines = lines;
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
        if (prevProps.DebitNoteProduct.data !== this.props.DebitNoteProduct.data) {
            if (
                this.props.DebitNoteProduct.data &&
                this.props.DebitNoteProduct.data.id
            ) {
                // If Browser Id isn't same with redux state ID,
                // Push again to update an new broswer Id on Create new Version
                // For New Version Purpose
                const { state } = this.props.history.location;
                if (
                    this.props.match.params.id !== this.props.DebitNoteProduct.data.id
                ) {
                    this.props.history.push(
                        singledebitNote(this.props.DebitNoteProduct.data.id),
                    )
                }

                if (state && state.isDuplicate) {
                    this.resetTotalState(false);
                }
                else {
                    this.resetTotalState(true);
                    /*
                    if (this.props.DebitNoteProduct.data.latestSalesOrder === false || this.props.DebitNoteProduct.data.isConverted === true) {
                        this.setState({
                            disableEdit: true,
                            buttonShow: false,
                            customerButtonShow: false,
                        })
                    }
                    */
                }
            }
        }

        // this section updates the form fields after get call when select from partner list
        if (prevProps.singleCustomer.data !== this.props.singleCustomer.data) {
            if (this.props.singleCustomer && this.props.singleCustomer.data) {
                const custDetails = this.props.singleCustomer.data
                // debugger
                this.setState({
                    suppNo: custDetails.cusNo,
                    suppName: custDetails.name,
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
                    suppNo: custDetails.suppId,
                    suppName: custDetails.name,
                    address: custDetails.address ? custDetails.address : "",
                    telNo: (custDetails.tel1a ? custDetails.tel1a : "") + (custDetails.tel1b ? custDetails.tel1b : ""),
                    faxNo: (custDetails.fax1a ? custDetails.fax1a : "") + (custDetails.fax1b ? custDetails.fax1b: ""),
                    buyerName: custDetails.salesPIC ? custDetails.salesPIC : "",
                    buyerEmail: custDetails.salesPICEmail ? custDetails.salesPICEmail : ""
                })
            }
        }

    }

    getInfoSKU = (productId, skuId) => {
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

    handleDayChange = (day) => {
        this.setState({ invoiceDate: day });
    }

    getInfoAccount = (id) => {
        const Accounts = this.props.accountItem.data;
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

    getInfoSupplier = (id) => {
        const Customer = this.props.SupplierFiltered.data;
        Customer.map((source) => {
            if (source.id == id) {
                this.setState({
                    toggle: false,
                    supplierButtonShow: false,
                    suppId: source._id && source._id,
                    suppNo: source.suppId && source.suppId,
                    suppName: source.name && source.name,
                    address: source.address ? source.address : "",
                    telNo: source.salesPICtel1b ? source.salesPICtel1b : "",
                    faxNo: source.salesPICMobile1a ? source.salesPICMobile1a : "",
                    buyerName: source.salesPIC ? source.salesPIC : "",
                    buyerEmail: source.salesPICEmail ? source.salesPICEmail : "",
                    // paymentTerm: source.paymentTerm && source.paymentTerm.id
                });

                // this.props.getOutstandingInvoices(source._id);
            }
        });
        let lines = [...this.state.lines];
        this.calculateTotal(lines)
    }

    getInfoCreateSupplier = (data, newSupplierNo) => {
        this.setState({
            toggle: false,
            suppNo: newSupplierNo,
            suppName: data.name,
            address: data.address,
            telNo: data.salesPICtel1b,
            faxNo: data.salesPICMobile1a,
            buyerName: data.salesPIC,
            buyerEmail: data.salesPICEmail,
            // paymentTerm: data.paymentTerm,
        })
    }

    getInfoPartner = (id, modelId, type) => {
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
            toggle: false,
            suppId: id
        })
    }

    handleChange = (field, value) => {
        let changeState = { [field]: value };



        if (field == "journal") {
            //set default account
            console.log("journal");
            if (this.props.InvoiceDetails.data.accountJournal) {
                for (let i = 0; i < this.props.InvoiceDetails.data.accountJournal.length; i++) {
                    if (this.props.InvoiceDetails.data.accountJournal[i]._id == value) {
                        if (this.props.InvoiceDetails.data.accountJournal[i].credit_account) {
                            changeState.account = this.props.InvoiceDetails.data.accountJournal[i].credit_account._id;
                        }
                        if (this.props.InvoiceDetails.data.accountJournal[i].debit_account) {
                            let lines = [...this.state.lines];
                            for (let j = 0; j < lines.length; j++) {
                                lines[j].account_name = this.props.InvoiceDetails.data.accountJournal[i].debit_account.accountName;
                                lines[j].account = this.props.InvoiceDetails.data.accountJournal[i].debit_account._id;
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
            if (field == "discount") {
                this.calculateTotal(this.state.lines)
            }
            if (field == "currency") {
                this.calculateTotal(this.state.lines)
            }
        },
        );


    }

    handleLineChange = (field, value, key) => {

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
        // let extPrice = amountRounding(2,parseInt(lines[key].qty) * parseFloat(lines[key].unitPrice));
        let extPrice = parseFloat(lines[key].qty) * parseFloat(lines[key].unitPrice);
        extPrice = amountRounding(2, extPrice)
        lines[key].extPrice = extPrice;
        // lines[key].extPrice = Math.floor(extPrice * 100) / 100
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

    deleteNewLine = (index) => {
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


    onPrintPdf = () => {
        this.props.getDebitNotePdf(this.props.match.params.id)

    }

    calculateTotal(lines) {
        let total = 0;
        for (let i = 0; i < lines.length; i++) {
            total += parseFloat(lines[i].qty) * parseFloat(lines[i].unitPrice);
        }

        // For export local
        let gst;
        if (this.state.exportLocal == "local") {
            if (this.props.InvoiceDetails.data.gst) {
                for (let j = 0; j < this.props.InvoiceDetails.data.gst.length; j++) {
                    if (this.props.InvoiceDetails.data.gst[j].name == "local") {
                        gst = this.props.InvoiceDetails.data.gst[j].rate;
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
        if (this.state.currency != null && this.props.InvoiceDetails.data.currency) {
            this.props.InvoiceDetails.data.currency.map(item => {
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

    checkDisabled = () => {
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
        })
    }

    showStatus = () => {
        if (this.state.status == "confirmed") { return "【 Confirmed 】" }
        if (this.state.status == "draft") { return "【 Draft 】" }
        if (this.state.status == "closed") { return "【 Closed 】" }
        else { return " " }
    }

    searchSupplier = (target, index) => {
        this.setState({
            toggle: true,
            element: target,
            target: target,
            targetSearch: this.state[target]
        })
        //this.props.getFilterCustomerTfes(20, 0, [], this.state[target]);
    }

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
            target: 'createSupplier',
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

    onConfirmInvoice = () => {
        console.log("confirm", this.state.onEditInvoice);
        if (this.state.onEditInvoice === true) {
            if (this.state.status == "draft") {
                const data = {
                    ...this.state,
                    status: 'confirmed',
                    salesOrderItems: this.state.lines,
                };
                this.props.patchSingleDebitNote(data)
            } else {
                alert('This Debit Note was already confirmed')
            }
        } else {
            alert('You must save this sales order in order to execute confirm')
        }
    }

    onPayDebitNote = () => {
        this.setState({ payToggle: true })
    }

    closeModal = () => {
        this.setState({ payToggle: false })
    }

    confirmPayDebitNote = () => {
        this.setState({ payToggle: false });

        const data = {
            ...this.state,
            status: 'closed',
            reconciled: true,
            salesOrderItems: this.state.lines,
        };
        this.props.patchSingleDebitNote(data)
    }

    onBackToListView = () => {
        this.props.history.push(debitNoteListPage);
    };




    render() {
        const { debitNoteNumber, suppNo, journal, suppName, address, currencyName, telNo, faxNo, disableEdit, buttonShow, account, suppInvoiceNo, invoiceDate, fromInvoiceCheck} = this.state;
        const { paymentTerm, currency, buyerName, buyerEmail, soNumber, exportLocal, discount, remarks, toggleFormSelection } = this.state;
        const discountAmount = (this.state.discountAmount).toLocaleString("en-SG", { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 })
        const subTotal = (this.state.subTotal).toLocaleString("en-SG", { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 })
        const gstAmount = (this.state.gstAmount).toLocaleString("en-SG", { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 })
        const grandTotal = (this.state.grandTotal).toLocaleString("en-SG", { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 })
        return (
            <React.Fragment>
                {this.props.DebitNoteProduct.loading ? (
                    <RctSectionLoader />
                ) : (
                    <FormWrapper
                        onSave={this.onSubmit}
                        onSaveNew={this.onSaveNew}
                        disabled={this.checkDisabled()}
                        title="Back to Debit Note"
                        centerTitle={this.state.onEditInvoice ? 'Update Debit Note' : 'Create New Debit Note'}
                        edit="test"
                        promptMessage={this.showStatus()}
                        listRedirect={debitNoteListPage}
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
                                            label="Invoice Number"
                                            value={debitNoteNumber}
                                            target="invoiceNumber"
                                            handleChange={this.handleChange}
                                            readOnly={true}
                                            isToggledEditForm={toggleFormSelection}
                                            original={fromInvoiceCheck?
                                                this.props.SupplierInvoiceProduct.data.invoiceNumber ? this.props.SupplierInvoiceProduct.data.invoiceNumber : ""
                                                : this.props.DebitNoteProduct.data.debitNoteNumber ? this.props.DebitNoteProduct.data.debitNoteNumber : ""
                                            }
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
                                            value={invoiceDate !== "" ? `${formatDate(invoiceDate, 'L', 'en-SG')}` : ""}
                                            // placeholder={`${formatDate(new Date(), 'L', 'en-SG')}`}
                                            placeholder={"DD/MM/YYYY"}
                                            onDayChange={this.handleDayChange}
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
                                            selectValues={this.props.InvoiceDetails.data ? this.props.InvoiceDetails.data.accountItem : []}
                                            handleChange={this.handleChange}
                                            readOnly={disableEdit}
                                            isToggledEditForm={toggleFormSelection}
                                            original={fromInvoiceCheck?
                                                this.props.SupplierInvoiceProduct.data.account ? this.props.SupplierInvoiceProduct.data.account : ""
                                                : this.props.DebitNoteProduct.data.account ? this.props.DebitNoteProduct.data.account : ""
                                            }
                                        />


                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-4" >
                                        <FormInput
                                            label="Partner No"
                                            value={suppNo}
                                            target="suppNo"
                                            handleChange={this.handleChange}
                                            readOnly={true}
                                            isToggledEditForm={toggleFormSelection}
                                            original={fromInvoiceCheck?
                                                this.props.SupplierInvoiceProduct.data.suppNo ? this.props.SupplierInvoiceProduct.data.suppNo : ""
                                                : this.props.DebitNoteProduct.data.suppNo ? this.props.DebitNoteProduct.data.suppNo : ""
                                            }
                                        />
                                    </div>
                                    <div class="col-sm-4 ">
                                        <FormInput
                                            label="Source / Purchase no"
                                            value={soNumber}
                                            target="soNumber"
                                            handleChange={this.handleChange}
                                            readOnly={disableEdit}
                                            isToggledEditForm={toggleFormSelection}
                                            original={fromInvoiceCheck?
                                                this.props.SupplierInvoiceProduct.data.soNumber ? this.props.SupplierInvoiceProduct.data.soNumber : ""
                                                : this.props.DebitNoteProduct.data.soNumber ? this.props.DebitNoteProduct.data.soNumber : ""
                                            }
                                        />
                                    </div>
                                    <div class="col-sm-4 ">
                                        <FormInput
                                            label="Journal"
                                            value={journal}
                                            target="journal"
                                            selectValueKey="_id"
                                            selectValues={this.props.InvoiceDetails.data ? this.props.InvoiceDetails.data.accountJournal : []}
                                            handleChange={this.handleChange}
                                            readOnly={disableEdit}
                                            isToggledEditForm={toggleFormSelection}
                                            original={fromInvoiceCheck?
                                                this.props.SupplierInvoiceProduct.data.journal ? this.props.SupplierInvoiceProduct.data.journal : ""
                                                : this.props.DebitNoteProduct.data.journal ? this.props.DebitNoteProduct.data.journal : ""
                                            }
                                        />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-8 ">
                                        <FormInput
                                            label="Partner Name"
                                            value={suppName}
                                            target="suppName"
                                            buttonClick={this.searchSupplier}
                                            hasButton={buttonShow}
                                            thirdButton={this.state.supplierButtonShow}
                                            thirdButtonClick={() =>
                                                this.thirdButtonClick('createSupplier')
                                            }
                                            handleChange={this.handleChange}
                                            readOnly={disableEdit}
                                            isToggledEditForm={toggleFormSelection}
                                            original={fromInvoiceCheck?
                                                this.props.SupplierInvoiceProduct.data.suppName ? this.props.SupplierInvoiceProduct.data.suppName : ""
                                                : this.props.DebitNoteProduct.data.suppName ? this.props.DebitNoteProduct.data.suppName : ""
                                            }
                                        />
                                    </div>

                                    <div class="col-sm-4 ">
                                        <FormInput
                                            label="Supp Invoice No"
                                            value={suppInvoiceNo}
                                            target="suppInvoiceNo"
                                            handleChange={this.handleChange}
                                            readOnly={disableEdit}
                                            isToggledEditForm={toggleFormSelection}
                                            original={fromInvoiceCheck?
                                                this.props.SupplierInvoiceProduct.data.suppInvoiceNo ? this.props.SupplierInvoiceProduct.data.suppInvoiceNo : ""
                                                : this.props.DebitNoteProduct.data.suppInvoiceNo ? this.props.DebitNoteProduct.data.suppInvoiceNo : ""
                                            }
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
                                            original={fromInvoiceCheck?
                                                this.props.SupplierInvoiceProduct.data.address ? this.props.SupplierInvoiceProduct.data.address : ""
                                                : this.props.DebitNoteProduct.data.address ? this.props.DebitNoteProduct.data.address : ""
                                            } />
                                    </div>
                                    <div class="col-sm-4 ">
                                        <FormInput
                                            label="Currency"
                                            value={currency}
                                            target="currency"
                                            selectValueKey="id"
                                            selectValueName="name"
                                            selectValues={this.props.InvoiceDetails.data ? this.props.InvoiceDetails.data.currency : []}
                                            handleChange={this.handleChange}
                                            readOnly={disableEdit} 
                                            isToggledEditForm={toggleFormSelection}
                                            original={fromInvoiceCheck?
                                                this.props.SupplierInvoiceProduct.data.currency ? this.props.SupplierInvoiceProduct.data.currency.id : ""
                                                : this.props.DebitNoteProduct.data.currency ? this.props.DebitNoteProduct.data.currency.id : ""
                                            }/>
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
                                            original={fromInvoiceCheck?
                                                this.props.SupplierInvoiceProduct.data.telNo ? this.props.SupplierInvoiceProduct.data.telNo : ""
                                                : this.props.DebitNoteProduct.data.telNo ? this.props.DebitNoteProduct.data.telNo : ""
                                            }
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
                                            original={fromInvoiceCheck?
                                                this.props.SupplierInvoiceProduct.data.faxNo ? this.props.SupplierInvoiceProduct.data.faxNo : ""
                                                : this.props.DebitNoteProduct.data.faxNo ? this.props.DebitNoteProduct.data.faxNo : ""
                                            }
                                        />
                                    </div>
                                    <div class="col-sm-4">
                                        <FormInput
                                            label="Payment Term"
                                            value={paymentTerm}
                                            target="paymentTerm"
                                            selectValueKey="id"
                                            selectValueName="name"
                                            selectValues={this.props.InvoiceDetails.data ? this.props.InvoiceDetails.data.paymentTerm : []}
                                            handleChange={this.handleChange}
                                            readOnly={disableEdit}
                                            isToggledEditForm={toggleFormSelection}
                                            original={fromInvoiceCheck?
                                                this.props.SupplierInvoiceProduct.data.paymentTerm ? this.props.SupplierInvoiceProduct.data.paymentTerm.id : ""
                                                : this.props.DebitNoteProduct.data.paymentTerm ? this.props.DebitNoteProduct.data.paymentTerm.id : ""
                                            }
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
                                            original={fromInvoiceCheck?
                                                this.props.SupplierInvoiceProduct.data.buyerName ? this.props.SupplierInvoiceProduct.data.buyerName : ""
                                                : this.props.DebitNoteProduct.data.buyerName ? this.props.DebitNoteProduct.data.buyerName : ""
                                            }
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
                                            original={fromInvoiceCheck?
                                                this.props.SupplierInvoiceProduct.data.buyerEmail ? this.props.SupplierInvoiceProduct.data.buyerEmail : ""
                                                : this.props.DebitNoteProduct.data.buyerEmail ? this.props.DebitNoteProduct.data.buyerEmail : ""
                                            }
                                        />
                                    </div>
                                    <div className="col-sm-4">
                                        <FormInput
                                            label="Tax"
                                            value={exportLocal}
                                            target="exportLocal"
                                            selectValues={[{ name: "No Tax", value: "export" }, {
                                                name: "GST",
                                                value: "local"
                                            }]}
                                            handleChange={this.handleChange}
                                            readOnly={disableEdit}
                                            isToggledEditForm={toggleFormSelection}
                                            // Default value = export
                                            original={fromInvoiceCheck?
                                                this.props.SupplierInvoiceProduct.data.exportLocal ? this.props.SupplierInvoiceProduct.data.exportLocal : "export"
                                                : this.props.DebitNoteProduct.data.exportLocal ? this.props.DebitNoteProduct.data.exportLocal : "export"
                                            }
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
                                    // buttonClick={(target, index) => alert(target)}
                                    disableEdit={this.state.disableEdit}
                                    buttonShow={this.state.buttonShow}
                                    originalData={fromInvoiceCheck?
                                        this.props.SupplierInvoiceProduct.data.salesOrderItems ? this.props.SupplierInvoiceProduct.data.salesOrderItems : ""
                                        : this.props.DebitNoteProduct.data.salesOrderItems ? this.props.DebitNoteProduct.data.salesOrderItems : ""
                                    }
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
                                    <p>1 of 2</p>
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
                                    <div class="col-sm-3 " >
                                        <FormInput
                                            label="Discount"
                                            value={discount}
                                            target="discount"
                                            selectValueKey="id"
                                            selectValueName="name"
                                            selectValues={this.props.InvoiceDetails.data ? this.props.InvoiceDetails.data.discount : []}
                                            handleChange={this.handleChange}
                                            readOnly={disableEdit}
                                            isToggledEditForm={toggleFormSelection}
                                            original={fromInvoiceCheck?
                                                this.props.SupplierInvoiceProduct.data.discount ? this.props.SupplierInvoiceProduct.data.discount : ""
                                                : this.props.DebitNoteProduct.data.discount ? this.props.DebitNoteProduct.data.discount : ""
                                            }
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
                                            original={fromInvoiceCheck?
                                                this.props.SupplierInvoiceProduct.data.remarks ? this.props.SupplierInvoiceProduct.data.remarks : ""
                                                : this.props.DebitNoteProduct.data.remarks ? this.props.DebitNoteProduct.data.remarks : ""
                                            } />
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
                                            {/* <h3>total  ({currencyName})</h3><p>{total}</p> */}
                                            <h3>Discount ({currencyName})</h3><p>{discountAmount}</p>
                                            <h3>Subtotal, after Discount({currencyName})</h3><p>{subTotal}</p>
                                            <h3>GST ({currencyName})</h3><p>{gstAmount}</p>
                                            <h3>Grand Total, with GST ({currencyName})</h3><p>{grandTotal}</p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                            <div className="Left_Toolbar-wrapper">
                                {this.state.onEditInvoice &&
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
                                                    && <div onClick={this.onConfirmInvoice}>
                                                        <ConfirmationNumberIcon />
                                                        <span> Confirm Invoice </span>
                                                    </div>}
                                                <div onClick={this.onPrintPdf}>
                                                    <PrintTwoToneIcon />
                                                    <span> Print Debit Note </span>
                                                </div>
                                                <div onClick={this.onBackToListView}>
                                                    <ArrowBackIcon />
                                                    <span>Back to Invoice List</span>
                                                </div>
                                            </div>
                                        </Toolbar>
                                    </AppBar>
                                }

                            </div>

                        </form>
                        <DialogRoot show={this.state.toggle} handleHide={this.restartToggle} size={"lg"}>
                            {this.state.target === "suppName"
                                ? (
                                    <div>
                                        {/* <h3>Supplier Invoice List</h3>
                                        <CrmSupplierList
                                            getInfo={this.getInfoSupplier} /> */}
                                        <JournalPartnerList getInfo={this.getInfoPartner} initialFilter={"Supplier"}/>
                                    </div>
                                )
                                : this.state.target === "description"
                                    ? (
                                        <div>
                                            <Product_list
                                                getInfo={this.getInfoSKU}
                                                saveToggle={this.saveBOM}
                                                searchText={this.state.targetSearch} />
                                        </div>
                                    )
                                    : (this.state.target === 'createSupplier')
                                        ? (<div><CreateSupplier
                                            getInfo={this.getInfoCreateSupplier}
                                            supplierName={this.state.suppName}
                                            address={this.state.address}
                                            telNo={this.state.telNo}
                                            faxNo={this.state.faxNo}
                                            buyerName={this.state.buyerName}
                                            buyerEmail={this.state.buyerEmail}
                                            incoterm={this.state.incoterm}
                                            paymentTerm={this.state.paymentTerm} /></div>)
                                        : this.state.target === 'sku'
                                            ? (
                                                <div>
                                                    <Product_list
                                                        getInfo={this.getInfoSKU}
                                                        saveToggle={this.saveBOM}
                                                        searchText={this.state.targetSearch} />
                                                </div>)
                                            : this.state.target == "sendEmail"
                                                ?
                                                (<div><SendEmail
                                                    getInfo={this.getInfoSendEmail}
                                                    saveToggle={this.saveBOM}
                                                />
                                                </div>)
                                                : this.state.target === "account"
                                                    ? (
                                                        <div>
                                                            <h3>Account List</h3>
                                                            <JournalAccountList
                                                                getInfo={this.getInfoAccount} />
                                                        </div>
                                                    ) : null}
                        </DialogRoot>
                    </FormWrapper>
                )
                }
            </React.Fragment >

        )

    }
}

const mapStateToProps = ({ producttfesState, supplierinvoiceState, suppliertfesState, invoiceState, accountItemState, debitnoteState, customertfesState }) => {
    const { ProductDetails, ProductFiltered } = producttfesState;
    const { SupplierFiltered, singleSupplier } = suppliertfesState
    const { SupplierInvoiceProduct } = supplierinvoiceState;
    const { InvoiceDetails } = invoiceState;
    const { accountItem } = accountItemState;
    const { DebitNoteProduct } = debitnoteState;
    const { singleCustomer } = customertfesState;
    return { DebitNoteProduct, SupplierFiltered, ProductDetails, ProductFiltered, SupplierInvoiceProduct, InvoiceDetails, accountItem, singleSupplier, singleCustomer };
};
export default connect(mapStateToProps, {
    setProduct,
    getProductDetails,
    getFilterProduct,
    getSingleSupplierInvoiceRequest,
    getFilterSupplier,
    getDropdownGroup,
    getSingleDebitNoteRequest,
    patchSingleDebitNote,
    setDebitNote,
    getDebitNotePdf,
    getSingleCustomerRequest,
    getSingleSupplierRequest
})(DebitNoteFormView);