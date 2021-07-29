// new quotation
import React, { Component } from "react";
import { connect } from "react-redux";
import RctSectionLoader from "Components/RctSectionLoader";
import { singleSupplierInvoice, supplierInvoiceListPage } from 'Helpers/accountingURL';
// Redux imports
import { setProduct, getProductDetails, getFilterProduct } from "Ducks/producttfes";
import { setQuotation, getQuotationDetails, getFilterQuotation } from "Ducks/quotationtfes";
import { setSupplierInvoice, patchSingleSupplierInvoice, getSingleSupplierInvoiceRequest } from "Ducks/supplier-invoice";
import {
    getSinglePurchaseRequest,
    getPurchaseDetails,
} from 'Ducks/purchasetfes'
import { getSingleSkuSalesOrderRequest } from "Ducks/salesordertfes";
import { savePACKINGForm } from "Ducks/packing";
import { getSingleCustomerRequest } from "Ducks/customertfes";
import {
    Button,
} from "@material-ui/core";
import CrmSupplierList from 'Components/PopupPage/SupplierList'
// React Component import
import FormWrapper from "Components/Form/Layout/FormWrapper";
import FormInput from "Components/Form/FormInput";
import DialogRoot from "Components/Dialog/DialogRoot";
import Product_list from 'Routes/warehouse/SKU/new/components/productList'
import JournalPartnerList from 'Components/PopupPage/JournalPartnerList';
import CreateSupplier from 'Components/PopupPage/CreateSupplier'
//import PurchaseProductLine from 'Components/ProductLine/PurchaseProductLine'
import InvoiceProductLine from 'Components/ProductLine/InvoiceProductLine'
import SendEmail from 'Components/PopupPage/SentEmail'
import JournalAccountList from "Routes/accounting/journalEntries/components/JournalAccountList";
import { amountRounding } from "Helpers/helpers";

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
import {
    setSupplier,
    getSupplierDetails,
    getSingleSupplierRequest,
    patchSingleSupplierRequest,
    getFilterSupplier,
    setDuplicate,
} from 'Ducks/suppliertfes'

import { getFilterPartnerJournal } from "Ducks/accounting";


import { getDropdownGroup } from "Ducks/invoicetfes";
// React Day Picker input
import DayPickerInput from 'react-day-picker/DayPickerInput';

import MomentLocaleUtils, {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';
import moment from 'moment'
import 'moment/locale/en-SG'

const INIT_STATE = {
    toggle: false,
    onEditInvoice: false,
    invoiceNumber: "",
    element: null,
    target: "",
    errorMsg: "",
    soNumber: "",
    invoiceDate: "",
    salesPic: "",
    suppId: "",
    suppNo: "",
    suppName: "",
    suppInvoiceNo: "",
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
    isPercentage: true,
    summary: "",
    discountAmount: 0,
    subTotal: 0,
    grandTotal: 0,
    gst: 7,
    gstAmount: 0,
    gstType: "",
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
    fromPoForm: false,
    view: false,
    toggleFormSelection: true,
    claimId: '',
    isExpenseClaim: false,
}

const PAGE_MAX = 10;
class SupplierInvoiceFormView extends Component {
    constructor(props) {
        super(props);
        this.state = INIT_STATE
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLineChange = this.handleLineChange.bind(this);
        this.getInfoSKU = this.getInfoSKU.bind(this);
        this.getInfoAccount = this.getInfoAccount.bind(this);
        this.getInfoSupplier = this.getInfoSupplier.bind(this);
        this.getInfoBOM = this.getInfoBOM.bind(this);
        this.getInfoCreateSupplier = this.getInfoCreateSupplier.bind(this);
        this.getInfoPartner = this.getInfoPartner.bind(this);
        this.passDataBack = this.passDataBack.bind(this);
        this.deleteNewLine = this.deleteNewLine.bind(this);
        this.resetTotalState = this.resetTotalState.bind(this);
        this.onPrintPdf = this.onPrintPdf.bind(this)
        this.onConfirmInvoice = this.onConfirmInvoice.bind(this)
        this.handleDayChange = this.handleDayChange.bind(this);
    }

    onSubmit() {
        if (this.state.account) {
            if (this.state.suppName === '' || this.state.suppId == undefined) {
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
                delete data.element;
                // delete data.invoiceNumber;
                delete data.targetSearch;
                delete data.latestSalesOrder;
                delete data.id;
                delete data._id;

                // If edit/update onSubmit
                if (this.state.onEditInvoice) {
                    data.id = this.state.id;
                    this.props.patchSingleSupplierInvoice(data)

                } else {
                    const data = {
                        ...this.state,
                        salesOrderItems: this.state.lines
                    }
                    delete data.toggleFormSelection;
                    delete data.lines;
                    delete data.onEditInvoice;
                    delete data.toggle;
                    delete data.element;
                    // delete data.invoiceNumber;
                    delete data.targetSearch;
                    delete data.latestSalesOrder;
                    delete data.id;
                    delete data._id;


                    // If edit/update onSubmit
                    if (this.state.onEditInvoice) {
                        data.id = this.state.id;
                        this.props.patchSingleSupplierInvoice(data)

                    } else {
                        // To Remove state
                        const { state } = this.props.history.location;
                        if (state && state.isDuplicate) {
                            const stateCopy = { ...state };
                            delete stateCopy.isDuplicate;
                            this.props.history.replace({ state: stateCopy })
                        }

                        this.props.setSupplierInvoice(data);
                    }
                    
                }
                this.setState({
                    toggleFormSelection: true,
                    disableEdit: true,
                    view: true,
                    errorMsg: "",
                })
            }
        } else {
            this.setState({
                errorMsg: 'Account not selected yet!',
            })
        }
    }

    componentDidMount() {
        //this.props.getProductDetails();
        this.props.getDropdownGroup();
        this.props.getFilterSupplier();
        this.props.getFilterPartnerJournal();
        const fromPoCheck = this.props.location.state;
        const id = this.props.match.params.id;
        if (id && !fromPoCheck) {
            this.props.getSingleSupplierInvoiceRequest(id);
            if (this.props.SupplierInvoiceProduct.data && this.props.SupplierInvoiceProduct.data.id) {
                this.resetTotalState();
            }
        } else if (id && fromPoCheck && fromPoCheck.isDuplicate) {
            this.props.getSingleSupplierInvoiceRequest(id);

            if (this.props.SupplierInvoiceProduct.data && this.props.SupplierInvoiceProduct.data.id) {
                this.resetTotalState();
            }
        } else if (id && fromPoCheck && fromPoCheck.fromPo) {
            this.props.getSinglePurchaseRequest(id);
            if (this.props.singlePurchase.data && this.props.singlePurchase.data.id) {
                this.resetTotalState(undefined, true);
            }
        } else if (this.props.location.state) {
            this.purchaseState(true)
        }

        // when coming over from expense claims page 
        const history = this.props.history.location.state;
        if (history && history.expenseClaims && history.claimId) {
            this.setState({ isExpenseClaim: true }, () => { this.props.getExpenseClaims(history.claimId) })
        } 


    }

    purchaseState(purchase) {
        let newState = this.props.singlePurchase.data;

        this.setState({
            toggle: false,
            supplierButtonShow: false,
            suppId: newState.suppId && newState.suppId,
            suppNo: newState.suppNo && newState.suppNo,
            suppName: newState.name && newState.name,
            address: newState.address ? newState.address : "",
            telNo: newState.telNo ? newState.telNo : "",
            faxNo: newState.faxNo ? newState.faxNo : "",
            buyerName: newState.buyerName ? newState.buyerName : "",
            buyerEmail: newState.buyerEmail ? newState.buyerEmail : "",
            incoterm: newState.incoterm ? newState.incoterm : undefined,
            currency: newState.currency ? newState.currency : undefined,
            paymentTerm: newState.paymentTerm ? newState.paymentTerm : undefined,
            lines: newState.lines ? newState.lines : []

        });
        //this.props.getOutstandingInvoices(source._id);
    }


    resetTotalState(editStatus, fromPo) {
        let newState;
        if (fromPo) {

            let suppId, tempId;

            // find suppId from supp no
            const Customer = this.props.SupplierFiltered.data;                        
            Customer.map((source) => {
                if (source.suppId == this.props.singlePurchase.data.suppNo) {
                    tempId = source.id;
                }
            });
            

            // find partnerId from modelID
            const Partner = this.props.journalPartnerFiltered.data;
            Partner.map((source) =>{
                if (source.modelId === tempId) {
                    suppId = source.id
                }
            })
            

            newState = {
                fromPoForm: true,
                // ...INIT_STATE,
                onEditInvoice: editStatus,
                ...this.props.singlePurchase.data,
                paymentTerm:
                    this.props.singlePurchase.data.paymentTerm &&
                        this.props.singlePurchase.data.paymentTerm.id
                        ? this.props.singlePurchase.data.paymentTerm.id
                        : this.props.singlePurchase.data.paymentTerm,
                currency:
                    this.props.singlePurchase.data.currency &&
                        this.props.singlePurchase.data.currency.id
                        ? this.props.singlePurchase.data.currency.id
                        : this.props.singlePurchase.data.currency,
                suppName: this.props.singlePurchase.data.name ? this.props.singlePurchase.data.name : '',
                soNumber: this.props.singlePurchase.data.poNumber ? this.props.singlePurchase.data.poNumber : '',
                suppId: suppId,
                tempId: tempId
                // suppName: this.props.singlePurchase.data.name ? this.props.singlePurchase.data.name : ''
            }

            // v Make a deep copy of the salesOrderItems by adding the values into a NEW array named lines
            let lines = [];
            if (this.props.singlePurchase.data.purchaseOrderItems) {
                for (let i = 0; i < this.props.singlePurchase.data.purchaseOrderItems.length; i++) {
                    let item = { ...this.props.singlePurchase.data.purchaseOrderItems[i] };
                    lines.push(item);
                }
            }
            console.log(newState);
            newState.lines = lines;

        } else {
            newState = {
                // ...INIT_STATE,
                fromPoForm: false,
                onEditInvoice: editStatus,
                ...this.props.SupplierInvoiceProduct.data,
                paymentTerm:
                    this.props.SupplierInvoiceProduct.data.paymentTerm &&
                        this.props.SupplierInvoiceProduct.data.paymentTerm.id
                        ? this.props.SupplierInvoiceProduct.data.paymentTerm.id
                        : this.props.SupplierInvoiceProduct.data.paymentTerm,

                account:
                    this.props.SupplierInvoiceProduct.data.account &&
                        this.props.SupplierInvoiceProduct.data.account.id
                        ? this.props.SupplierInvoiceProduct.data.account.id
                        : this.props.SupplierInvoiceProduct.data.account,

                journal:
                    this.props.SupplierInvoiceProduct.data.journal &&
                        this.props.SupplierInvoiceProduct.data.journal.id
                        ? this.props.SupplierInvoiceProduct.data.journal.id
                        : this.props.SupplierInvoiceProduct.data.journal,

                currency:
                    this.props.SupplierInvoiceProduct.data.currency &&
                        this.props.SupplierInvoiceProduct.data.currency.id
                        ? this.props.SupplierInvoiceProduct.data.currency.id
                        : this.props.SupplierInvoiceProduct.data.currency,
                currencyName:
                    this.props.SupplierInvoiceProduct.data.currency &&
                        this.props.SupplierInvoiceProduct.data.currency.name
                        ? this.props.SupplierInvoiceProduct.data.currency.name
                        : "",
                exportLocal:
                    this.props.SupplierInvoiceProduct.data.exportLocal
                        ? this.props.SupplierInvoiceProduct.data.exportLocal
                        : "",
                gst: this.props.SupplierInvoiceProduct.data.gst ? this.props.SupplierInvoiceProduct.data.gst : 0
            };
            // console.log(newState.gst);
            // v Make a deep copy of the salesOrderItems by adding the values into a NEW array named lines
            let lines = [];
            if (this.props.SupplierInvoiceProduct.data.salesOrderItems) {
                for (let i = 0; i < this.props.SupplierInvoiceProduct.data.salesOrderItems.length; i++) {
                    let item = { ...this.props.SupplierInvoiceProduct.data.salesOrderItems[i] };
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
        }, () => {
            this.calculateTotal(newState.lines)
        })

        if(newState.status === "cancelled" || newState.status === "paid" || newState.status === "partial"){
            this.setState({ disableEdit: true });
        }


    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.SupplierInvoiceProduct.data !== this.props.SupplierInvoiceProduct.data) {
            if (
                this.props.SupplierInvoiceProduct.data &&
                this.props.SupplierInvoiceProduct.data.id
            ) {
                // If Browser Id isn't same with redux state ID,
                // Push again to update an new broswer Id on Create new Version
                // For New Version Purpose
                const { state } = this.props.history.location
                if (
                    this.props.match.params.id !== this.props.SupplierInvoiceProduct.data.id
                ) {
                    this.props.history.push(
                        singleSupplierInvoice(this.props.SupplierInvoiceProduct.data.id),
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

                } else {
                    this.resetTotalState(true);
                    if (this.props.SupplierInvoiceProduct.data.latestSalesOrder === false || this.props.SupplierInvoiceProduct.data.isConverted === true) {
                        this.setState({
                            disableEdit: true,
                            buttonShow: false,
                            supplierButtonShow: false,
                            toggleFormSelection: true
                        })
                    }
                }

                //console.log("22222",prevProps.SupplierInvoiceProduct.data === this.props.SupplierInvoiceProduct.data)

            }
        }
        if (typeof this.state.discount === "number" && this.props.InvoiceDetails.data.discount) {
            if (this.props.history.location.state.fromPo) {
                this.props.InvoiceDetails.data.discount.map(item => {
                    if (item.value == this.state.discount) {
                        this.setState({
                            discount: item.id,
                        });
                    }
                })
            }
        }

        // sets gstAmount manually 
        if (prevState.exportLocal !== this.state.exportLocal) {

            if (this.state.exportLocal === 'manual') {
                this.setState({ 
                    gstType: 'manual', 
                    gstAmount: this.props.SupplierInvoiceProduct.data && this.props.SupplierInvoiceProduct.data.gstAmount ? this.props.SupplierInvoiceProduct.data.gstAmount : 0
                }, () => this.calculateTotal(this.state.lines))
            }
            
        }

        // if come from expense claims page
        if (prevProps.InvoiceDetails.data !== this.props.InvoiceDetails.data) {
            if (this.state.isExpenseClaim) {
                // when manual, currency is always SGD
                let currencyArr = this.props.InvoiceDetails.data.currency;
                let currencyName;
                let currency;
                    
                for (let i = 0; i < currencyArr.length; i++ ) {
                    if (currencyArr[i].name.toUpperCase() === "SGD") {
                        currencyName = currencyArr[i].name,
                        currency = currencyArr[i].id
                    }
                }

                let newLines = [];
                let gstAmount = 0; // to check if gstAmount needs to be shown
                const claimItems = this.props.expenseClaims.data && this.props.expenseClaims.data.claimItems;

                if (claimItems) {
                    for (let i = 0; i < claimItems.length; i++) {
                        let newLine = {};
                        newLine.SN = claimItems[i].lineNum;
                        newLine.description = claimItems[i].claimType + " " + claimItems[i].description;
                        newLine.qty = 1;
                        // if converting back to sgd amount 
                        newLine.unitPrice = amountRounding(2, claimItems[i].amount / claimItems[i].currencyRate)
                        newLine.extPrice = amountRounding(2, claimItems[i].amount / claimItems[i].currencyRate)
                        // debugger
    
                        gstAmount += claimItems[i].gstAmt
                        newLines.push(newLine);
                    }
                }

                const newState = {
                    ...INIT_STATE,
                    lines: newLines,
                    suppInvoiceNo: this.props.expenseClaims.data.claimNo,
                    exportLocal: 'manual',
                    gstType: 'manual',
                    gstAmount,
                    currencyName,
                    currency,
                    claimId: this.props.expenseClaims.data.id,
                    isExpenseClaim: true
                }
                this.setState(newState)

                // debugger
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

        if(prevProps.journalPartnerFiltered.data !== this.props.journalPartnerFiltered.data){
            if(!this.state.suppId && this.state.tempId){
                let suppId;
                const Partner = this.props.journalPartnerFiltered.data;
                Partner.map((source) =>{
                    if (source.modelId === this.state.tempId) {
                        suppId = source.id
                    }
                })
                this.setState({
                    suppId: suppId
                })               
            }
            else if(!this.state.suppId && !this.state.tempId){
                if(this.state.suppNo){
                    const Customer = this.props.SupplierFiltered.data;
                    let tempId, suppId;                        
                    Customer.map((source) => {
                        if (source.suppId == this.props.singlePurchase.data.suppNo) {
                            tempId = source.id;
                        }
                    });
                    // find partnerId from modelID
                    const Partner = this.props.journalPartnerFiltered.data;
                    Partner.map((source) =>{
                        if (source.modelId === tempId) {
                            suppId = source.id
                        }
                    })
                    this.setState({
                        suppId: suppId
                    })
                    
                }
            }
            
        }

        if(prevProps.SupplierFiltered.data !== this.props.SupplierFiltered.data){
            console.log(this.state.suppId, this.state.tempId);
            if(!this.state.suppId && !this.state.tempId){
                if(this.state.suppNo){
                    const Customer = this.props.SupplierFiltered.data;
                    let tempId, suppId;                        
                    Customer.map((source) => {
                        if (source.suppId == this.props.singlePurchase.data.suppNo) {
                            tempId = source.id;
                        }
                    });
                    // find partnerId from modelID
                    const Partner = this.props.journalPartnerFiltered.data;
                    Partner.map((source) =>{
                        if (source.modelId === tempId) {
                            suppId = source.id
                        }
                    })
                    this.setState({
                        suppId: suppId
                    })
                    
                }
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

    handleDayChange(day) {
        this.setState({ invoiceDate: day });
    }

    // getInfoSupplier(id) {
    //     const Customer = this.props.customerFiltered.data;
    //     Customer.map((source) => {
    //         if (source.id == id) {
    //             this.setState({
    //                 toggle: false,
    //                 supplierButtonShow: false,
    //                 suppId: source._id && source._id ,
    //                 name: source.cusNo && source.cusNo,
    //                 nickname: source.name && source.name ,
    //                 address: source.address ? source.address : "",
    //                 telNo: source.cusPICtel1b ? source.cusPICtel1b : "",
    //                 faxNo: source.cusPICMobile1a ? source.cusPICMobile1a : "",
    //                 buyerName: source.cusPIC ? source.cusPIC : "",
    //                 buyerEmail: source.cusPICEmail ? source.cusPICEmail : "",
    //                 paymentTerm: source.paymentTerm && source.paymentTerm.id
    //             });
    //         }
    //     });
    // }

    getInfoAccount(id) {
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

    getInfoSupplier(id) {
        const Customer = this.props.SupplierFiltered.data;
        Customer.map((source) => {
            if (source.id == id) {
                this.setState({
                    toggle: false,
                    supplierButtonShow: false,
                    suppId: source._id && source._id,
                    suppNo: source.suppId && source.suppId,
                    suppName: source.name && source.name,
                    suppInvoiceNo: source.suppInvoiceNo ? source.suppInvoiceNo : "",
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
    getInfoCreateSupplier(data, newSupplierNo) {
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
            suppId: id
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

        if (field === 'gstAmount') {
            if (value.length >= 1 && value.match(/[a-z\s]/i)) {
                return null
            }
        }

        if (field == "journal") {
            //set default account
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
                if (value === 'manual') {
                    // when manual, currency is always SGD
                    let currencyArr = this.props.InvoiceDetails.data.currency;
                    let currencyName;
                    let currency;
                    for (let i = 0; i < currencyArr.length; i++ ) {
                        if (currencyArr[i].name.toUpperCase() === "SGD") {
                                currencyName = currencyArr[i].name,
                                currency = currencyArr[i].id
                        }
                    }
                    this.setState({ gstType: 'manual', currencyName, currency }, () => { this.calculateTotal(this.state.lines) })
                } else {
                    this.setState({ gstType: ""}, () => { this.calculateTotal(this.state.lines) })
                }
            }
            if (field == "discount") {
                this.calculateTotal(this.state.lines)
            }
            if (field == "currency") {
                this.calculateTotal(this.state.lines)
            }
            if (field === 'gstAmount') {
                this.calculateTotal(this.state.lines)
            }
        },
        );

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
        // let extPrice = amountRounding(2,parseInt(lines[key].qty) * parseFloat(lines[key].unitPrice));
        let extPrice = parseFloat(lines[key].qty) * parseFloat(lines[key].unitPrice);
        // lines[key].extPrice = Math.floor(extPrice * 100) / 100
        extPrice = amountRounding(2, extPrice);
        lines[key].extPrice = extPrice
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
            total += parseFloat(lines[i].extPrice);
        }
        // For export local
        let gst = this.state.gst ? this.state.gst : 0;
        if (this.state.exportLocal == "local") {
            if (this.props.InvoiceDetails.data.gst) {
                this.props.InvoiceDetails.data.gst.forEach(item => {
                    if (item.name == "localpurchase") {
                        gst = item.rate
                    }
                })
            }

        }
        else if (this.state.exportLocal == "export" || this.state.exportLocal === "manual") {
            gst = 0;
        }

        // For Discount
        let discountRate = 0;
        let isPercentage = "";
        if (
            this.state.discount !== null &&
            this.props.InvoiceDetails.data.discount
        ) {
            if (typeof this.state.discount === "number") {
                discountRate = this.state.discount
            }
            else {
                this.props.InvoiceDetails.data.discount.forEach((item) => {
                    if (this.state.discount === item.id) {
                        discountRate = item.value
                        isPercentage = item.isPercentage;
                        this.setState({ isPercentage: isPercentage });
                    }
                })
            }
        }


        // For Currency
        let conversion = 1;
        // State rate will be the previous rate
        let rate = this.state.currentRate

        if (this.state.currency != null && this.props.InvoiceDetails.data.currency) {
            this.props.InvoiceDetails.data.currency.map(item => {
                if (item.id == this.state.currency) {
                    //conversion = item.rate / rate;
                    //conversion = conversion * (rate / 1);
                    this.setState({
                        currencyName: item.name,
                        currentRate: item.rate,
                    });
                }
            })
        }

        let discountAmount = 0;
        if (isPercentage === false){
            discountAmount = amountRounding(2, discountRate);

        } else if (this.state.discount !== null){
            let calculatedDiscount = parseFloat(total) * (discountRate / 100) * conversion
            discountAmount = amountRounding(2, calculatedDiscount)        
        }

        // let discountAmount = parseFloat((total * (discountRate / 100)) * conversion);
        let subTotal = total * conversion - discountAmount;    

        // this section caters for when gstamount is to be mannually keyed in 
        let gstAmount = 0;
        if (this.state.gstType === 'manual' || this.state.exportLocal === 'manual') {
            gstAmount = this.state.gstAmount
        } else {
            gstAmount = parseFloat(subTotal * (gst / 100));
        }

    
        let grandTotal = parseFloat(subTotal) + parseFloat(gstAmount)
        let balance = parseFloat(grandTotal) - parseFloat(this.state.downPayment)

        this.setState({
            total: total,
            discountAmount: discountAmount,
            subTotal: subTotal,
            gstAmount: gstAmount,
            grandTotal: grandTotal,
            balance: balance
        })
    }

    // checkDisabled() {
    //     if (this.state.status == "paid" || this.state.status == "partial" || this.state.status == "cancelled") {
    //         return false;
    //     } else if (this.state.disableEdit == true) {
    //         return false;

    //     } else if (this.state.onEditInvoice == false) {
    //         return true
    //     } else {
    //         if (this.state.isConverted == true) {
    //             return false
    //         } else {
    //             if (this.state.latestSalesOrder == false) { return false }
    //             else { return true }
    //         }
    //     }
    // }
    checkDisabled() {
        return true
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
        // const filt = {
        //     [target]: this.state[target],
        // };
        // this.props.getFilterProduct(0, 0, filt, "", "");
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
            }
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
            if (this.state.status == "draft") {
                const data = {
                    ...this.state,
                    status: 'confirmed',
                    salesOrderItems: this.state.lines,
                };
                this.props.patchSingleSupplierInvoice(data)
            } else {
                alert('This Invoice was already confirmed')
            }
        } else {
            alert('You must save this sales order in order to execute confirm')
        }
    }

    onChangeToEdit = () => {
        this.setState({
            disableEdit: false,
            view: false
        })
    }

    onBackToListView = () => {
        this.props.history.push('/app/accounting/tfesInvoice')
    };

    onPrintPdf() {
        console.log("print pdf")
    }
    onCreatePackingOrder = () => {
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
        const { invoiceNumber, suppNo, journal, suppName, address, currencyName, telNo, faxNo, buttonShow, account, suppInvoiceNo, invoiceDate } = this.state;
        const { paymentTerm, currency, buyerName, buyerEmail, soNumber, exportLocal, discount, remarks, toggleFormSelection, disableEdit, fromPoForm } = this.state;
        const { brands, materials, loading } = this.props.ProductDetails;
        const totalPages = Math.ceil(this.state.lines.length / PAGE_MAX);
        const total = (this.state.total).toLocaleString("en-SG", { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 })
        const discountAmount = (this.state.discountAmount).toLocaleString("en-SG", { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 })
        const subTotal = (this.state.subTotal).toLocaleString("en-SG", { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 })
        const gstAmount = this.state.gstAmount ? (this.state.gstAmount).toLocaleString("en-SG", { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0;
        const grandTotal = this.state.grandTotal ? (this.state.grandTotal).toLocaleString("en-SG", { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0;
        return (
            <React.Fragment>
                {this.props.SupplierInvoiceProduct.loading ? (
                    <RctSectionLoader />
                ) : (
                    <FormWrapper
                        onSave={this.onSubmit}
                        onSaveNew={this.onSaveNew}
                        disabled={this.checkDisabled()}
                        title="Back to All Supplier Invoices"
                        centerTitle={this.state.onEditInvoice ? 'Update Supplier Invoice' : 'Create New Supplier Invoice'}
                        edit="test"
                        promptMessage={this.showStatus()}
                        listRedirect={supplierInvoiceListPage}
                        showEditButton={this.state.disableEdit && this.state.status !== "cancelled" && this.state.status !== "paid" && this.state.status !== "partial"}
                        onChangeToEdit={this.onChangeToEdit}
                    >
                        <form autoComplete="off" className={(this.state.disableEdit) && 'uneditable'}>
                            <div style={{ marginLeft: '2.5rem' }}>
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
                                                    fromPoForm ?
                                                    this.props.singlePurchase.data ? this.props.singlePurchase.data.invoiceNumber : ""
                                                        : this.props.SupplierInvoiceProduct.data.invoiceNumber ? this.props.SupplierInvoiceProduct.data.invoiceNumber : ""
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
                                                original={
                                                    fromPoForm ?
                                                    this.props.singlePurchase.data ? this.props.singlePurchase.data.account : ""
                                                        : this.props.SupplierInvoiceProduct.data.account ? this.props.SupplierInvoiceProduct.data.account : ""
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
                                                original={
                                                    fromPoForm ?
                                                       this.props.singlePurchase.data ? this.props.singlePurchase.data.suppNo : ""
                                                        : this.props.SupplierInvoiceProduct.data.suppNo ? this.props.SupplierInvoiceProduct.data.suppNo : ""
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
                                                original={
                                                    fromPoForm ?
                                                        this.props.singlePurchase.data ? this.props.singlePurchase.data.poNumber : ""
                                                        : this.props.SupplierInvoiceProduct.data.soNumber ? this.props.SupplierInvoiceProduct.data.soNumber : ""
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
                                                original={
                                                    fromPoForm ?
                                                    this.props.singlePurchase.data ? this.props.singlePurchase.data.journal : ""
                                                        : this.props.SupplierInvoiceProduct.data.journal ? this.props.SupplierInvoiceProduct.data.journal : ""
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
                                                original={
                                                    fromPoForm ?
                                                    this.props.singlePurchase.data ? this.props.singlePurchase.data.suppName : ""
                                                        : this.props.SupplierInvoiceProduct.data.suppName ? this.props.SupplierInvoiceProduct.data.suppName : ""
                                                }
                                            />
                                        </div>

                                        <div class="col-sm-4 ">
                                            <FormInput
                                                label="Supp Invoice No"
                                                value={suppInvoiceNo}
                                                target="suppInvoiceNo"
                                                handleChange={this.handleChange}
                                                isToggledEditForm={toggleFormSelection}
                                                readOnly={disableEdit}
                                                original={
                                                    fromPoForm ?
                                                    this.props.singlePurchase.data ? this.props.singlePurchase.data.suppInvoiceNo : ""
                                                        : this.props.SupplierInvoiceProduct.data.suppInvoiceNo ? this.props.SupplierInvoiceProduct.data.suppInvoiceNo : ""
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
                                                original={
                                                    fromPoForm ?
                                                    this.props.singlePurchase.data ? this.props.singlePurchase.data.address : ""
                                                        : this.props.SupplierInvoiceProduct.data.address ? this.props.SupplierInvoiceProduct.data.address : ""
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
                                                original={
                                                    fromPoForm ?
                                                    this.props.singlePurchase.data && this.props.singlePurchase.data.currency ? this.props.singlePurchase.data.currency.id : ""
                                                        : this.props.SupplierInvoiceProduct.data.currency ? this.props.SupplierInvoiceProduct.data.currency.id : ""
                                                } />
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
                                                    fromPoForm ?
                                                    this.props.singlePurchase.data ? this.props.singlePurchase.data.telNo : ""
                                                        : this.props.SupplierInvoiceProduct.data.telNo ? this.props.SupplierInvoiceProduct.data.telNo : ""
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
                                                original={
                                                    fromPoForm ?
                                                    this.props.singlePurchase.data ? this.props.singlePurchase.data.faxNo : ""
                                                        : this.props.SupplierInvoiceProduct.data.faxNo ? this.props.SupplierInvoiceProduct.data.faxNo : ""
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
                                                original={
                                                    fromPoForm ?
                                                    this.props.singlePurchase.data && this.props.singlePurchase.data.paymentTerm ? this.props.singlePurchase.data.paymentTerm.id : ""
                                                        : this.props.SupplierInvoiceProduct.data.paymentTerm ? this.props.SupplierInvoiceProduct.data.paymentTerm.id : ""
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
                                                original={
                                                    fromPoForm ?
                                                    this.props.singlePurchase.data ? this.props.singlePurchase.data.buyerName : ""
                                                        : this.props.SupplierInvoiceProduct.data.buyerName ? this.props.SupplierInvoiceProduct.data.buyerName : ""
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
                                                original={
                                                    fromPoForm ?
                                                    this.props.singlePurchase.data ? this.props.singlePurchase.data.buyerEmail : ""
                                                        : this.props.SupplierInvoiceProduct.data.buyerEmail ? this.props.SupplierInvoiceProduct.data.buyerEmail : ""
                                                }
                                            />
                                        </div>
                                        <div className="col-sm-4">
                                            <FormInput
                                                label="Tax"
                                                value={exportLocal}
                                                target="exportLocal"
                                                selectValues={[
                                                    { name: "No Tax", value: "export" }, 
                                                    { name: "GST", value: "local"},
                                                { name: "Manual", value: "manual"}]}
                                                handleChange={this.handleChange}
                                                readOnly={disableEdit}
                                                isToggledEditForm={toggleFormSelection}
                                                original={
                                                    fromPoForm ?
                                                    this.props.singlePurchase.data ? this.props.singlePurchase.data.exportLocal : ""
                                                        : this.props.SupplierInvoiceProduct.data.exportLocal ? this.props.SupplierInvoiceProduct.data.exportLocal : ""
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
                                        originalData={
                                            fromPoForm ?
                                            this.props.singlePurchase.data ? this.props.singlePurchase.data.salesOrderItems : ""
                                                : this.props.SupplierInvoiceProduct.data.salesOrderItems
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
                                                original={
                                                    fromPoForm ?
                                                    this.props.singlePurchase.data ? this.props.singlePurchase.data.discount : ""
                                                        : this.props.SupplierInvoiceProduct.data.discount ? this.props.SupplierInvoiceProduct.data.discount : ""
                                                }
                                            />
                                            {
                                                this.state.gstType === 'manual' &&
                                                <FormInput
                                                    label="Gst Amount"
                                                    value={gstAmount}
                                                    target="gstAmount"
                                                    handleChange={this.handleChange}
                                                    readOnly={disableEdit}
                                                    isToggledEditForm={toggleFormSelection}
                                                    original={gstAmount} 
                                                />
                                            }
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div className="col-sm-8 Invoice_remarks">
                                            <FormInput
                                                label="Remarks"
                                                value={remarks}
                                                target="remarks"
                                                multiline rows={4}
                                                handleChange={this.handleChange}
                                                // readOnly={false}
                                                isToggledEditForm={toggleFormSelection}
                                                original={
                                                    fromPoForm ?
                                                    this.props.singlePurchase.data ? this.props.singlePurchase.data.remarks : ""
                                                        : this.props.SupplierInvoiceProduct.data.remarks ? this.props.SupplierInvoiceProduct.data.remarks : ""
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
                                                {this.state.status == "draft"
                                                    && <div onClick={this.onConfirmInvoice}>
                                                        <ConfirmationNumberIcon />
                                                        <span> Confirm Invoice </span>
                                                    </div>}

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
        );
    }
}

const mapStateToProps = ({ quotationtfesState, producttfesState, supplierinvoiceState, packinglistState, salesorderState, purchasetfesState, suppliertfesState, invoiceState, accountItemState, customertfesState, accountingState }) => {
    const { Quotations, QuotationDetails } = quotationtfesState;
    const { ProductDetails, ProductFiltered } = producttfesState;
    const { SupplierFiltered } = suppliertfesState
    const { SupplierInvoiceProduct } = supplierinvoiceState;
    const { packingList } = packinglistState;
    const { SalesOrderProduct } = salesorderState;
    const { InvoiceProduct, InvoiceDetails } = invoiceState;
    const { accountItem } = accountItemState;
    const { singlePurchase } = purchasetfesState
    const { singleCustomer } = customertfesState;
    const { singleSupplier } = suppliertfesState;
    const { journalState } = accountingState;
    const { journalPartnerFiltered } = journalState;
    return { packingList, Quotations, SupplierFiltered, QuotationDetails, ProductDetails, ProductFiltered, SupplierInvoiceProduct, SalesOrderProduct, InvoiceProduct, InvoiceDetails, accountItem, singlePurchase, singleSupplier, singleCustomer, journalPartnerFiltered };
};
export default connect(mapStateToProps, {
    setSupplierInvoice,
    setQuotation,
    getQuotationDetails,
    getFilterQuotation,
    setProduct,
    getProductDetails,
    getFilterProduct,
    patchSingleSupplierInvoice,
    getSingleSupplierInvoiceRequest,
    savePACKINGForm,
    getSingleSkuSalesOrderRequest,
    getFilterSupplier,
    getDropdownGroup,
    getSinglePurchaseRequest,
    getPurchaseDetails,
    getSingleCustomerRequest,
    getSingleSupplierRequest,
    getFilterPartnerJournal,
})(SupplierInvoiceFormView);
