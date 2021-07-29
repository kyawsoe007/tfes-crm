// new quotation
import React, { Component } from "react";
import { connect } from "react-redux";
import RctSectionLoader from "Components/RctSectionLoader";
import { singleTfesCreditNote, singleTfesInvoice, tfesCreditNoteNewPage } from 'Helpers/accountingURL';
// Redux imports
import { setProduct, getProductDetails, getFilterProduct } from "Ducks/producttfes";
import { setQuotation, getQuotationDetails, getFilterQuotation } from "Ducks/quotationtfes";
import { setInvoice, patchSingleInvoice, getSingleInvoiceRequest, getTaxInvoicePdf, getProformaInvoicePdf, getCommercialInvoicePdf, getDropdownGroup } from "Ducks/invoicetfes";
import { getSingleSkuSalesOrderRequest } from "Ducks/salesordertfes";
import { savePACKINGForm } from "Ducks/packing";
import { getFilterPartnerJournal } from "Ducks/accounting";
import { getSingleSupplierRequest } from "Ducks/suppliertfes";
import { getSingleCustomerRequest, getFilterCustomerTfes } from "Ducks/customertfes";

import {
    Button,
} from "@material-ui/core";
// React Component import
import FormWrapper from "Components/Form/Layout/FormWrapper";
import FormInput from "Components/Form/FormInput";
import DialogRoot from "Components/Dialog/DialogRoot";
import SkuList from 'Components/PopupPage/SkuList'
import Product_list from '../../../warehouse/SKU/new/components/productList'
import TfesCustomerList from 'Components/PopupPage/TfesCustomerList'
import JournalPartnerList from 'Components/PopupPage/JournalPartnerList';
import BillOfMaterial from 'Components/PopupPage/BillOfMaterial'
import CreateCustomer from 'Components/PopupPage/CreateCustomer'
import InvoiceProductLine from 'Components/ProductLine/InvoiceProductLine'
import SendEmail from 'Components/PopupPage/SentEmail'
import JournalAccountList from "../../journalEntries/components/JournalAccountList";

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
import moment from 'moment';
import 'moment/locale/en-SG'
import ReceiptSharpIcon from "@material-ui/icons/ReceiptSharp";

import { tfesInvoiceListPage } from "Helpers/accountingURL";
import { amountRounding } from "Helpers/helpers";

const PAGE_MAX = 10;
const INIT_STATE = {
    toggle: false,
    onEditInvoice: false,
    invoiceNumber: "",
    element: null,
    target: "",
    errorMsg: "",
    invoiceDate: "",
    exportLocal: "export",
    salesPic: "",
    custId: "",
    custNo: "",
    custName: "",
    address: "",
    remarks: "",
    currency: "",
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
    discount: '',
    discountRate: 0,
    isPercentage: true,
    summary: "",
    discountAmount: 0,
    subTotal: 0,
    grandTotal: 0,
    gst: 7,
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
        account_name: "",
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
    view: false,
    fromSalesForm: false,
};
class TfesInvoiceFormView extends Component {
    constructor(props) {
        super(props);

        this.state = INIT_STATE
        this.handleDayChange = this.handleDayChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLineChange = this.handleLineChange.bind(this);
        this.getInfoSKU = this.getInfoSKU.bind(this);
        this.getInfoAccount = this.getInfoAccount.bind(this);
        this.getInfoCustomer = this.getInfoCustomer.bind(this);
        this.getInfoBOM = this.getInfoBOM.bind(this);
        this.getInfoCreateCustomer = this.getInfoCreateCustomer.bind(this);
        this.getInfoPartner = this.getInfoPartner.bind(this);
        this.passDataBack = this.passDataBack.bind(this);
        this.deleteNewLine = this.deleteNewLine.bind(this);
        this.resetTotalState = this.resetTotalState.bind(this);
        this.onPrintProformaInvoice = this.onPrintProformaInvoice.bind(this)
        this.onPrintTaxInvoice = this.onPrintTaxInvoice.bind(this)
        this.onPrintCommercialInvoice = this.onPrintCommercialInvoice.bind(this)
        this.onConfirmInvoice = this.onConfirmInvoice.bind(this)
        this.packingCreate = this.packingCreate(this);
    }
    handleDayChange(day) {
        this.setState({ invoiceDate: day });
    }
    onSubmit() {
        if (this.state.account) {
            if (this.state.custNo === '' || this.state.custId == undefined) {
                this.setState({
                    errorMsg: 'Customer not selected yet!',
                })
            } else if (this.state.invoiceDate === "") {
                this.setState({
                    errorMsg: 'Date not selected yet!',
                })
            }
            else {
                const data = {
                    ...this.state,
                    salesOrderItems: this.state.lines
                };
                delete data.toggleFormSelection;
                delete data.lines;
                delete data.onEditInvoice;
                delete data.toggle;
                delete data.element;
                // delete data.invoiceNumber;
                delete data.targetSearch;
                delete data.latestSalesOrder;
                delete data._id;

                // If edit/update onSubmit
                if (this.state.onEditInvoice) {
                    // can not find this.props.journalEntry.data.status
                    // if(this.props.InvoiceProduct.data.status=='confirmed' && this.props.journalEntry.data.status=="confirmed" )
                    if (this.state.status === 'confirmed') {
                        this.setState({
                            errorMsg: 'Journal entry confirmed. Invoice cannot be edited'
                        })
                        console.log('hello')
                    }
                    else {
                        data.id = this.state.id;
                        this.props.patchSingleInvoice(data)
                    }
                    this.setState({
                        toggleFormSelection: true,
                        disableEdit: true,
                        view: true,
                        errorMsg: ""
                    })

                } else {
                    // To Remove state
                    const { state } = this.props.history.location;
                    if (state && state.isDuplicate) {
                        const stateCopy = { ...state };
                        delete stateCopy.isDuplicate;
                        this.props.history.replace({ state: stateCopy })
                    }
                    if (this.state.onEditInvoice && !this.props.history.location.isDuplicate) {

                        data.id = this.state.id;
                        this.props.patchSingleInvoice(data)

                    } else {
                        // To Remove state
                        const { state } = this.props.history.location;
                        if (state && state.isDuplicate) {
                            const stateCopy = { ...state };
                            delete stateCopy.isDuplicate;
                            this.props.history.replace({ state: stateCopy })
                        }
                    }
                    this.props.setInvoice(data);
                    this.setState({
                        onEditInvoice: true,
                        errorMsg: "",
                        toggleFormSelection: true,
                        disableEdit: true,
                        view: true,
                    })
                }

            }
        } else {
            this.setState({
                errorMsg: 'Account not selected yet!',
            })
        }
    }

    componentDidMount() {

        this.props.getDropdownGroup();
        this.props.getFilterPartnerJournal()
        this.props.getFilterCustomerTfes()
        const fromSalesCheck = this.props.location.state;

        const id = this.props.match.params.id;
        if (id && !fromSalesCheck) {
            this.props.getSingleInvoiceRequest(id);

            if (this.props.InvoiceProduct.data && this.props.InvoiceProduct.data.id) {
                this.resetTotalState();
            }
        } else if (id && fromSalesCheck && fromSalesCheck.isDuplicate) {
            this.props.getSingleInvoiceRequest(id);

            if (this.props.InvoiceProduct.data && this.props.InvoiceProduct.data.id) {
                this.resetTotalState();
            }
        } else if (id && fromSalesCheck && fromSalesCheck.so) {
            this.props.getSingleSkuSalesOrderRequest(id);

            if (this.props.SalesOrderProduct.data && this.props.SalesOrderProduct.data.id) {
                this.resetTotalState(undefined, true);
            }
        }
        console.log("this.props.accountItem in componentDidMount", this.props.accountItem)

    }
    resetTotalState(editStatus, fromSales) {
        let newState;
        if (fromSales) {

            let custId, tempId;

            // find suppId from supp no
            const Customer = this.props.customerFiltered.data;
            Customer.map((source) => {
                if (source.cusNo == this.props.SalesOrderProduct.data.custNo) {
                    tempId = source.id;
                }
            });

            // find partnerId from modelID
            const Partner = this.props.journalPartnerFiltered.data;
            Partner.map((source) =>{
                if (source.modelId === tempId) {
                    custId = source.id
                }
            })

            newState = {
                // ...INIT_STATE,
                fromSalesForm: true,
                onEditInvoice: editStatus,
                ...this.props.SalesOrderProduct.data,
                salesId: this.props.SalesOrderProduct.data.id,
                paymentTerm:
                    this.props.SalesOrderProduct.data.paymentTerm &&
                        this.props.SalesOrderProduct.data.paymentTerm.id
                        ? this.props.SalesOrderProduct.data.paymentTerm.id
                        : this.props.SalesOrderProduct.data.paymentTerm,

                account:
                    this.props.SalesOrderProduct.data.salesPic &&
                        this.props.SalesOrderProduct.data.salesPic.id
                        ? this.props.SalesOrderProduct.data.salesPic.id
                        : this.props.SalesOrderProduct.data.salesPic,

                currency:
                    this.props.SalesOrderProduct.data.currency &&
                        this.props.SalesOrderProduct.data.currency.id
                        ? this.props.SalesOrderProduct.data.currency.id
                        : this.props.SalesOrderProduct.data.currency,
                
                custId: custId,
                tempId: tempId
            }

            // v Make a deep copy of the salesOrderItems by adding the values into a NEW array named lines
            let lines = [];
            if (this.props.SalesOrderProduct.data.salesOrderItems) {
                for (let i = 0; i < this.props.SalesOrderProduct.data.salesOrderItems.length; i++) {
                    let item = { ...this.props.SalesOrderProduct.data.salesOrderItems[i] };
                    lines.push(item);
                }
            }
            newState.lines = lines;

        } else {
            newState = {
                // ...INIT_STATE,
                fromSalesForm: false,
                onEditInvoice: editStatus,
                ...this.props.InvoiceProduct.data,
                paymentTerm:
                    this.props.InvoiceProduct.data.paymentTerm &&
                        this.props.InvoiceProduct.data.paymentTerm.id
                        ? this.props.InvoiceProduct.data.paymentTerm.id
                        : this.props.InvoiceProduct.data.paymentTerm,

                account:
                    this.props.InvoiceProduct.data.account &&
                        this.props.InvoiceProduct.data.account.id
                        ? this.props.InvoiceProduct.data.account.id
                        : this.props.InvoiceProduct.data.account,

                journal:
                    this.props.InvoiceProduct.data.journal &&
                        this.props.InvoiceProduct.data.journal.id
                        ? this.props.InvoiceProduct.data.journal.id
                        : this.props.InvoiceProduct.data.journal,

                currency:
                    this.props.InvoiceProduct.data.currency &&
                        this.props.InvoiceProduct.data.currency.id
                        ? this.props.InvoiceProduct.data.currency.id
                        : this.props.InvoiceProduct.data.currency,
            };

            // v Make a deep copy of the salesOrderItems by adding the values into a NEW array named lines
            let lines = [];
            if (this.props.InvoiceProduct.data.salesOrderItems) {
                for (let i = 0; i < this.props.InvoiceProduct.data.salesOrderItems.length; i++) {
                    let item = { ...this.props.InvoiceProduct.data.salesOrderItems[i] };
                    lines.push(item);
                }
            }
            newState.lines = lines;
        }
        if (!editStatus) {
            newState.latestSalesOrder = true;
            newState.status = "draft";
        }

        delete newState.saleOrderItems;
        this.setState({
            ...this.state,
            ...newState,
        }, () => { this.calculateTotal(this.state.lines) })

        if (newState.status == "cancelled" || newState.status == "paid" || newState.status == "partial"){
            this.setState({ disableEdit: true });
        }


    }

    calculateTotal(lines) {
        let total = 0;

        for (let i = 0; i < lines.length; i++) {
            total += parseInt(lines[i].qty) * parseFloat(lines[i].unitPrice);
        }
        // For export local
        let gst = this.state.gst;
        if (this.state.exportLocal === "export") {

            gst = 0
        }
        else if (this.state.exportLocal === "local") {
            if (this.props.InvoiceDetails.data.gst) {
                for (let j = 0; j < this.props.InvoiceDetails.data.gst.length; j++) {
                    console.log(this.props.InvoiceDetails.data.gst[j]);
                    if (this.props.InvoiceDetails.data.gst[j].name == "local") {
                        gst = this.props.InvoiceDetails.data.gst[j].rate;
                        break;
                    }
                }
            }

        }
        let discountRate = 0;
        let isPercentage = "";
        if (
            this.state.discount !== null &&
            this.props.CreditNoteDetails.data.discount
        ) {
            this.props.CreditNoteDetails.data.discount.forEach((item) => {
                if (this.state.discount === item.id) {
                    discountRate = item.value;
                    isPercentage = item.isPercentage;
                    this.setState({ isPercentage: isPercentage });
                }
            })
        }
        // For Currency
        let conversion = 1;

        if (this.state.currency != null && this.props.InvoiceDetails.data.currency) {
            this.props.InvoiceDetails.data.currency.map(item => {
                if (item.id == this.state.currency) {
                    this.setState({
                        currencyName: item.name,
                    });
                }
            })
        }
        if (typeof this.state.discount === "number" && this.props.InvoiceDetails.data.discount) {
            this.props.InvoiceDetails.data.discount.map(item => {
                if (item.value == this.state.discount) {
                    this.setState({
                        discount: item.id,
                    });
                    
                }
            })
        }

        let discountAmount = 0;
        if (isPercentage === false){
            discountAmount = amountRounding(2, discountRate);

        } else if (this.state.discount !== null){
            console.log(discountRate);
            let calculatedDiscount = parseFloat(total) * (discountRate / 100) * conversion
            discountAmount = amountRounding(2, calculatedDiscount)        
        }

        // let discountAmount = parseFloat((total * (discountRate / 100)) * conversion)
        let subTotal = total * conversion - discountAmount
        let gstAmount = parseFloat(subTotal * (gst / 100))
        let grandTotal = parseFloat(subTotal) + parseFloat(gstAmount)
        let balance = parseFloat(grandTotal) - parseFloat(this.state.downPayment)

        this.setState({
            total: total,
            discountAmount: discountAmount,
            subTotal: subTotal,
            gstAmount: gstAmount,
            grandTotal: grandTotal,
            balance: balance,
            gst: gst
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.InvoiceProduct.data !== this.props.InvoiceProduct.data) {
            if (
                this.props.InvoiceProduct.data &&
                this.props.InvoiceProduct.data.id
            ) {
                // If Browser Id isn't same with redux state ID,
                // Push again to update an new broswer Id on Create new Version
                // For New Version Purpose
                const { state } = this.props.history.location
                if (
                    this.props.match.params.id !== this.props.InvoiceProduct.data.id
                ) {
                    this.props.history.push(
                        singleTfesInvoice(this.props.InvoiceProduct.data.id),
                    )
                }

                if (state && state.isDuplicate) {

                    this.resetTotalState(false);
                    this.setState({
                        invoiceNumber: "",
                        status: "draft",
                        _id: "",
                        id: "",
                        toggleFormSelection: false,
                    })
                }
                else {
                    this.resetTotalState(true);
                    if (this.props.InvoiceProduct.data.latestSalesOrder === false || this.props.InvoiceProduct.data.isConverted === true) {
                        this.setState({
                            disableEdit: true,
                            buttonShow: false,
                            customerButtonShow: false,
                        })
                    }
                }
            }
            console.log("this.props.accountItem in componentDidUpdate", this.props.accountItem)

        }
        if (prevProps.InvoiceDetails.data !== this.props.InvoiceDetails.data) {
            console.log("recalculate");
            this.calculateTotal(this.state.lines);
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

        if(prevProps.journalPartnerFiltered.data !== this.props.journalPartnerFiltered.data){
            if(!this.state.custId && this.state.tempId){
                let custId;
                const Partner = this.props.journalPartnerFiltered.data;
                Partner.map((source) =>{
                    if (source.modelId === this.state.tempId) {
                        custId = source.id
                    }
                })
                this.setState({
                    custId: custId
                })
            }
            else if(!this.state.custId && !this.state.tempId){
                let custId, tempId;

            // find suppId from supp no
                const Customer = this.props.customerFiltered.data;
                Customer.map((source) => {
                    if (source.cusNo == this.props.SalesOrderProduct.data.custNo) {
                        tempId = source.id;
                    }
                });

                // find partnerId from modelID
                const Partner = this.props.journalPartnerFiltered.data;
                Partner.map((source) =>{
                    if (source.modelId === tempId) {
                        custId = source.id
                    }
                })
                this.setState({
                    custId: custId
                })
            }
        }

        if(prevProps.customerFiltered.data !== this.props.customerFiltered.data){
            if(!this.state.custId && !this.state.tempId){
                let custId, tempId;

            // find suppId from supp no
                const Customer = this.props.customerFiltered.data;
                Customer.map((source) => {
                    if (source.cusNo == this.props.SalesOrderProduct.data.custNo) {
                        tempId = source.id;
                    }
                });

                // find partnerId from modelID
                const Partner = this.props.journalPartnerFiltered.data;
                Partner.map((source) =>{
                    if (source.modelId === tempId) {
                        custId = source.id
                    }
                })
                this.setState({
                    custId: custId
                })
            }
        }
    }
    getInfoSKU(productId, skuId) {
        const SKU = this.props.ProductFiltered.data;
        SKU.map((source) => {
            if (source.id == productId) {
                console.log(source);
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
        console.log("this.props.accountItem in getInfoAccount", this.props.accountItem)
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

    getInfoCustomer(id) {
        const Customer = this.props.customerFiltered.data;
        Customer.map((source) => {
            if (source.id == id) {
                console.log('source', source)
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
            toggle: false,
            custId: id
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
            if (this.props.InvoiceDetails.data.accountJournal) {
                for (let i = 0; i < this.props.InvoiceDetails.data.accountJournal.length; i++) {
                    if (this.props.InvoiceDetails.data.accountJournal[i]._id == value) {
                        if (this.props.InvoiceDetails.data.accountJournal[i].debit_account) {
                            changeState.account = this.props.InvoiceDetails.data.accountJournal[i].debit_account._id;
                        }
                        if (this.props.InvoiceDetails.data.accountJournal[i].credit_account) {
                            let lines = [...this.state.lines];
                            for (let j = 0; j < lines.length; j++) {
                                lines[j].account = this.props.InvoiceDetails.data.accountJournal[i].credit_account._id;
                                lines[j].account_name = this.props.InvoiceDetails.data.accountJournal[i].credit_account.accountName;
                            }
                            changeState.lines = lines;
                        }

                    }

                }
            }
        }

        this.setState(changeState, () => {
            if (
                field == 'exportLocal' ||
                field == 'currency' ||
                field == 'discount'
            ) {
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
        let extPrice = parseFloat(lines[key].qty) * parseFloat(lines[key].unitPrice);

        extPrice = amountRounding(2, extPrice);
        lines[key].extPrice = extPrice
        this.setState({
            lines: lines,
        })
        this.calculateTotal(this.state.lines);
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
            BomList: [],
            account: '',
            account_name: "",
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

    // checkDisabled() {
    //     if (this.state.status == "paid" || this.state.status == "partial" || this.state.status == "cancelled") {
    //         return false;
    //     } else if (this.state.disableEdit == true) {
    //         return false
    //     }
    //     else if (this.state.onEditInvoice == false) {
    //         return true
    //     } else {
    //         return true
    //     }
    // }
    checkDisabled() {
        return true
    }

    onChangeToEdit = () => {
        this.setState({
            disableEdit: false,
            view: false
        })
    }

    showStatus() {
        if (this.state.status == "confirmed") { return "【 Confirmed 】" }
        if (this.state.status == "unpaid") { return "【 Unpaid 】" }
        if (this.state.status == "draft") { return "【 Draft 】" }
        if (this.state.status == "cancelled") { return "【 Cancelled 】" }
        if (this.state.status == "paid") { return "【 Paid 】" }
        if (this.state.status == "partial") { return "【 Partial 】" }
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
    packingCreate() {
        if (this.state.invoiceNumber) {
            let data = {
                ...this.state,
                packingNum: this.state.packingNum,
                operationId: this.state.operationId,
                orderId: this.state.invoiceNumber,
                packinglistStatus: this.state.packinglistStatus,
                pickedBy: this.state.pickedBy,
                packItems: this.state.packItems
            };
            this.props.savePACKINGForm(data)
            this.props.history.push('/app/warehouse/packing')
        }
        else {
            this.setState({
                errorMsg: 'PackingList not selected yet!',
            })
        }
    }

    onConfirmInvoice() {
        if (this.state.onEditInvoice === true) {

            const data = {
                ...this.state,
                status: 'confirmed',
                salesOrderItems: this.state.lines,
            };
            this.props.patchSingleInvoice(data)


        } else {
            alert('You must save this sales order in order to execute confirm')
        }
    }

    onBackToListView = () => {
        this.props.history.push('/app/accounting/tfesInvoice')
    };

    onPrintProformaInvoice() {
        this.props.getProformaInvoicePdf(this.props.match.params.id)
        console.log("onPrintProformaInvoice pdf")

    }
    onPrintTaxInvoice() {
        this.props.getTaxInvoicePdf(this.props.match.params.id)
        console.log("onPrintTaxInvoice pdf")

    }
    onPrintCommercialInvoice() {
        this.props.getCommercialInvoicePdf(this.props.match.params.id)
        console.log("onPrintCommercialInvoice pdf")
    }
    onCreatePackingOrder = () => {
        console.log("onCreatePackingOrder")
        alert("onCreatePackingOrder")
    }
    onInvoicing = () => {
        console.log("onInvoicing")
        alert("onInvoicing")
    }


    onCreateNote = () => {
        this.props.history.push({ pathname: singleTfesCreditNote(this.state.id), state: { so: true } })
    };
    render() {
        const { invoiceNumber, invoiceDate, page, account, custNo, soNumber, journal, custName, address, currency, currencyName, telNo, faxNo, target, disableEdit, buttonShow, view } = this.state;
        const { paymentTerm, buyerName, buyerEmail, exportLocal, SN, description, qty, unitPrice, extPrice, discount, uom, remarks, summary, toggleFormSelection, fromSalesForm } = this.state;
        const { brands, materials, loading } = this.props.ProductDetails;
        const totalPages = Math.ceil(this.state.lines.length / PAGE_MAX);
        const total = this.state.total ? (this.state.total).toLocaleString("en-SG", { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0
        const discountAmount = this.state.discountAmount ? (this.state.discountAmount).toLocaleString("en-SG", { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0
        const subTotal = this.state.subTotal ? (this.state.subTotal).toLocaleString("en-SG", { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0
        const gstAmount = this.state.gstAmount ? (this.state.gstAmount).toLocaleString("en-SG", { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0
        const grandTotal = this.state.grandTotal ? (this.state.grandTotal).toLocaleString("en-SG", { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0
        // console.log('in',moment(invoiceDate))
        return (
            <React.Fragment>
                {this.props.InvoiceProduct.loading ? (
                    <RctSectionLoader />
                ) : (
                    <FormWrapper
                        onSave={this.onSubmit}
                        onSaveNew={this.onSaveNew}
                        onChangeToEdit={this.onChangeToEdit}
                        disabled={this.checkDisabled()}
                        title="Back to All Invoice"
                        centerTitle={this.state.onEditInvoice ? 'Update Invoice Page' : 'Create New Invoice Page'}
                        edit="test"
                        promptMessage={this.showStatus()}
                        listRedirect={tfesInvoiceListPage}
                        showEditButton={this.state.disableEdit && this.state.status !== "partial" && this.state.status !== "cancelled" && this.state.status !== "paid"}
                    >
                        <form autoComplete="off" className={(this.state.disableEdit || this.state.view) && 'uneditable'}>
                            <div style={{ marginLeft: "2.5rem" }}>
                            <div class="top-container">
                                {this.state.errorMsg && (<h4 class="text-danger text-center">{this.state.errorMsg}</h4>)}
                                <div class="row">
                                    <div class="col-sm-4 " >
                                        <FormInput
                                            label="Invoice Number"
                                            value={invoiceNumber}
                                            target="invoiceNumber"
                                            handleChange={this.handleChange}
                                            readOnly={true}
                                            isToggledEditForm={toggleFormSelection}
                                            original={
                                                fromSalesForm ?
                                                this.props.SalesOrderProduct.data.invoiceNumber ? 
                                                this.props.SalesOrderProduct.data.invoiceNumber : ""
                                                : this.props.InvoiceProduct.data && this.props.InvoiceProduct.data.invoiceNumber ? this.props.InvoiceProduct.data.invoiceNumber : ""}
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
                                            value={invoiceDate !== "" ? `${formatDate(invoiceDate, 'L', 'en-SG')}` : ""}
                                            // placeholder={`${formatDate(new Date(), 'L', 'en-SG')}`}
                                            placeholder={"DD/MM/YYY"}
                                            onDayChange={this.handleDayChange}
                                            dayPickerProps={{
                                                locale: 'en-SG',
                                                localeUtils: MomentLocaleUtils
                                            }}
                                        // readOnly={true}
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
                                            isToggledEditForm={toggleFormSelection}              // Account changes after change in Journal
                                            original={
                                                fromSalesForm ?
                                                    this.props.SalesOrderProduct.data.account ? this.props.SalesOrderProduct.data.account : ""
                                                    : this.props.InvoiceProduct.data && this.props.InvoiceProduct.data.account ? this.props.InvoiceProduct.data.account : ""}
                                        />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-4" >
                                        <FormInput
                                            label="Partner No"
                                            value={custNo}
                                            target="custNo"
                                            handleChange={this.handleChange}
                                            readOnly={true}
                                            isToggledEditForm={toggleFormSelection}
                                            original={
                                                fromSalesForm ?
                                                    this.props.SalesOrderProduct.data.custNo ? this.props.SalesOrderProduct.data.custNo : ""
                                                    : this.props.InvoiceProduct.data && this.props.InvoiceProduct.data.custNo ? this.props.InvoiceProduct.data.custNo : ""}
                                        />
                                    </div>
                                    <div class="col-sm-4 ">
                                        <FormInput
                                            label="Source / Sales no"
                                            value={soNumber}
                                            target="soNumber"
                                            handleChange={this.handleChange}
                                            readOnly={disableEdit}
                                            isToggledEditForm={toggleFormSelection}
                                            original={
                                                fromSalesForm ?
                                                    this.props.SalesOrderProduct.data.soNumber ? this.props.SalesOrderProduct.data.soNumber : ""
                                                    : this.props.InvoiceProduct.data && this.props.InvoiceProduct.data.soNumber ? this.props.InvoiceProduct.data.soNumber : ""}

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
                                            original={
                                                fromSalesForm ?
                                                    this.props.SalesOrderProduct.data.journal ? this.props.SalesOrderProduct.data.journal : ""
                                                    : this.props.InvoiceProduct.data && this.props.InvoiceProduct.data.journal ? this.props.InvoiceProduct.data.journal : ""}
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
                                            original={
                                                fromSalesForm ?
                                                    this.props.SalesOrderProduct.data.custName ? this.props.SalesOrderProduct.data.custName : ""
                                                    : this.props.InvoiceProduct.data && this.props.InvoiceProduct.data.custName ? this.props.InvoiceProduct.data.custName : ""}
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
                                            original={
                                                fromSalesForm ?
                                                    this.props.SalesOrderProduct.data.address ? this.props.SalesOrderProduct.data.address : ""
                                                    : this.props.InvoiceProduct.data && this.props.InvoiceProduct.data.address ? this.props.InvoiceProduct.data.address : ""} />
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
                                            original={
                                                fromSalesForm ?
                                                    this.props.SalesOrderProduct.data.currency ? this.props.SalesOrderProduct.data.currency.id : ""
                                                    : this.props.InvoiceProduct.data && this.props.InvoiceProduct.data.currency ? this.props.InvoiceProduct.data.currency.id : ""} />
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
                                            original={
                                                fromSalesForm ?
                                                    this.props.SalesOrderProduct.data ? this.props.SalesOrderProduct.data.telNo : ""
                                                    : this.props.InvoiceProduct.data ? this.props.InvoiceProduct.data.telNo : ""}
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
                                            original={
                                                fromSalesForm ?
                                                    this.props.SalesOrderProduct.data ? this.props.SalesOrderProduct.data.faxNo : ""
                                                    : this.props.InvoiceProduct.data ? this.props.InvoiceProduct.data.faxNo : ""}
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
                                            original={
                                                fromSalesForm ?
                                                    this.props.SalesOrderProduct.data.paymentTerm ? this.props.SalesOrderProduct.data.paymentTerm.id : ""
                                                    : this.props.InvoiceProduct.data && this.props.InvoiceProduct.data.paymentTerm ? this.props.InvoiceProduct.data.paymentTerm.id : ""}
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
                                            original={
                                                fromSalesForm ?
                                                    this.props.SalesOrderProduct.data ? this.props.SalesOrderProduct.data.buyerName : ""
                                                    : this.props.InvoiceProduct.data ? this.props.InvoiceProduct.data.buyerName : ""}
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
                                            original={
                                                fromSalesForm ?
                                                    this.props.SalesOrderProduct.data.buyerEmail ? this.props.SalesOrderProduct.data.buyerEmail : ""
                                                    : this.props.InvoiceProduct.data && this.props.InvoiceProduct.data.buyerEmail ? this.props.InvoiceProduct.data.buyerEmail : ""}
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
                                            original={
                                                fromSalesForm ?
                                                    this.props.SalesOrderProduct.data.exportLocal ? this.props.SalesOrderProduct.data.exportLocal : "export"
                                                    : this.props.InvoiceProduct.data && this.props.InvoiceProduct.data.exportLocal ? this.props.InvoiceProduct.data.exportLocal : "export"}
                                        />
                                    </div>
                                </div>
                                <div class="boundary-line" style={{ width: "100%", height: "2px", backgroundColor: "#c0c0c0", margin: "20px auto " }}></div>

                            </div>
                            <div class="bottom-container" >
                                <InvoiceProductLine
                                    lines={this.state.lines}
                                    page={this.state.page}
                                    deleteLine={this.deleteNewLine}
                                    handleLineChange={this.handleLineChange}
                                    toggleFormSelection={toggleFormSelection}
                                    buttonClick={(target, index) => this.buttonClick(target, index)}
                                    readOnly={this.state.disableEdit}
                                    buttonShow={this.state.buttonShow}
                                    originalData={fromSalesForm ?
                                        this.props.SalesOrderProduct.data && this.props.SalesOrderProduct.data.salesOrderItems
                                        : this.props.InvoiceProduct.data && this.props.InvoiceProduct.data.salesOrderItems}
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
                                    <div class="col-sm-3 " >
                                        <FormInput
                                            label="Discount"
                                            value={discount}
                                            target="discount"
                                            selectValueName="name"
                                            selectValueKey="id"
                                            selectValues={this.props.CreditNoteDetails.data ? this.props.CreditNoteDetails.data.discount : []}
                                            handleChange={this.handleChange}
                                            readOnly={disableEdit}
                                            isToggledEditForm={toggleFormSelection}
                                            original={
                                                fromSalesForm ?
                                                    this.props.SalesOrderProduct.data.discount ? this.props.SalesOrderProduct.data.discount : ""
                                                    : this.props.InvoiceProduct.data && this.props.InvoiceProduct.data.discount ? this.props.InvoiceProduct.data.discount : ""}
                                        />
                                    </div>
                                </div>
                                <div class="row">
                                    <div className="col-sm-8  Invoice_remarks">
                                        <FormInput
                                            label="Remarks"
                                            value={remarks}
                                            target="remarks"
                                            multiline rows={4}
                                            handleChange={this.handleChange}
                                            // readOnly={false}
                                            isToggledEditForm={toggleFormSelection}
                                            original={
                                                fromSalesForm ?
                                                    this.props.SalesOrderProduct.data.remarks ? this.props.SalesOrderProduct.data.remarks : ""
                                                    : this.props.InvoiceProduct.data && this.props.InvoiceProduct.data.remarks ? this.props.InvoiceProduct.data.remarks : ""} />
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
                                            <h3>total  ({currencyName})</h3><p>{total}</p>
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
                                            {this.state.status == "draft"
                                                && <div onClick={this.onConfirmInvoice}>
                                                    <ConfirmationNumberIcon />
                                                    <span> Confirm Invoice </span>
                                                </div>}
                                            <div onClick={this.onPrintTaxInvoice}>
                                                <PrintTwoToneIcon />
                                                <span> Tax Invoice </span>
                                            </div>


                                            {
                                                this.state.status != "draft" &&
                                                <div onClick={this.onCreateNote}>
                                                    <ReceiptSharpIcon />
                                                    <span> Create Credit Note </span>
                                                </div>
                                            }

                                            <div onClick={this.onBackToListView}>
                                                <ArrowBackIcon />
                                                <span>Back to Invoice List</span>
                                            </div>
                                        </div>
                                    </Toolbar>
                                </AppBar>
                            </div>

                        </form>
                        <DialogRoot show={this.state.toggle} handleHide={this.restartToggle} size={"lg"}>
                            {this.state.target === "custName" ? (
                                <div>
                                    {/* <h3>Customer List</h3> */}
                                    {/* <TfesCustomerList
                                        getInfo={this.getInfoCustomer} 
                                    /> */}
                                        <h3> Partner List </h3>
                                        <JournalPartnerList getInfo={this.getInfoPartner} initialFilter={"Customer"}/>
                                </div>) : this.state.target === "description"
                                ? (
                                    <div>
                                        <Product_list
                                            getInfo={this.getInfoSKU}
                                            saveToggle={this.saveBOM}
                                            searchText={this.state.targetSearch} />
                                    </div>
                                ) : (this.state.target === 'createCus')
                                    ? (<div><h3>Create a customer</h3><CreateCustomer
                                        getInfo={this.getInfoCreateCustomer}
                                        customerName={this.state.custName}
                                        address={this.state.address}
                                        telNo={this.state.telNo}
                                        faxNo={this.state.faxNo}
                                        buyerName={this.state.buyerName}
                                        buyerEmail={this.state.buyerEmail}
                                        incoterm={this.state.incoterm}
                                        paymentTerm={this.state.paymentTerm} /></div>) : this.state.target === "bom" ? (
                                            <div><h3>Bill of Material</h3>
                                                <BillOfMaterial
                                                    getInfo={this.getInfoBOM}
                                                    saveToggle={this.saveBOM}
                                                    description={this.state.description}
                                                    qty={this.state.qty}
                                                    unitPrice={this.state.unitPrice}
                                                    Bom={this.state.BomList}
                                                    passData={this.passDataBack} /> </div>) : this.state.target === 'description' ? (
                                                        <div>
                                                            {/* <h3> Sku List</h3> */}
                                                            <Product_list
                                                                getInfo={this.getInfoSKU}
                                                                saveToggle={this.saveBOM}
                                                                searchText={this.state.targetSearch} />
                                                            {/* <SkuList getInfo={this.getInfoSKU} /> */}
                                                        </div>)
                                        : this.state.target === "sendEmail"
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
        );
    }
}

const mapStateToProps = ({ producttfesState, customertfesState, accountItemState, creditNoteState, accountingState, invoiceState, packinglistState, salesorderState, suppliertfesState }) => {
    const { ProductDetails, ProductFiltered } = producttfesState;
    const { customerFiltered, singleCustomer } = customertfesState;
    const { singleSupplier } = suppliertfesState;
    const { InvoiceProduct, InvoiceDetails } = invoiceState;
    const { CreditNoteDetails } = creditNoteState;
    const { packingList } = packinglistState;
    const { SalesOrderProduct } = salesorderState;
    const { accountItem } = accountItemState;
    const { journalState } = accountingState;
    const { journalPartnerFiltered } = journalState;

    return { packingList, accountItem, ProductDetails, ProductFiltered, CreditNoteDetails, customerFiltered, InvoiceProduct, InvoiceDetails, SalesOrderProduct, journalPartnerFiltered, singleCustomer, singleSupplier };
};
export default connect(mapStateToProps, {
    setInvoice,
    setQuotation,
    getQuotationDetails,
    getFilterQuotation,
    setProduct,
    getProductDetails,
    getFilterProduct,
    patchSingleInvoice,
    getSingleInvoiceRequest,
    savePACKINGForm,
    getSingleSkuSalesOrderRequest,
    getTaxInvoicePdf,
    getProformaInvoicePdf,
    getCommercialInvoicePdf,
    getDropdownGroup,
    getFilterPartnerJournal,
    getSingleSupplierRequest,
    getSingleCustomerRequest,
    getFilterCustomerTfes,
})(TfesInvoiceFormView);
