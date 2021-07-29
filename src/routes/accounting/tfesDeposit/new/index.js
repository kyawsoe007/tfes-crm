// new quotation
import React, { Component } from "react";
import { connect } from "react-redux";
import RctSectionLoader from "Components/RctSectionLoader";
import { singleTfesCreditNote, singleTfesDeposit, tfesCreditNoteNewPage } from 'Helpers/accountingURL';
// Redux imports
import { setProduct, getProductDetails, getFilterProduct } from "Ducks/producttfes";
import { getDropdownGroup } from "Ducks/invoicetfes";
import { setDeposit, patchSingleDeposit, getSingleDepositRequest, getDepositPdf } from "Ducks/accounting/deposit";
import { getSingleSkuSalesOrderRequest } from "Ducks/salesordertfes";
import { savePACKINGForm } from "Ducks/packing";
import { getFilterSupplier, getSingleSupplierRequest } from 'Ducks/suppliertfes'
import { getSingleCustomerRequest } from "Ducks/customertfes";

// React Component import
import { Button } from "@material-ui/core";
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
import CrmSupplierList from 'Components/PopupPage/SupplierList'

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

import { depositListPage } from "Helpers/accountingURL";
import { amountRounding } from 'Helpers/helpers'

const PAGE_MAX = 10;
class DepositFormView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggle: false,
            onEditInvoice: false,
            depositNumber: "",
            element: null,
            target: "",
            errorMsg: "",
            invoiceDate: "",
            exportLocal: "export",
            account: "",
            salesPic: "",
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
            discount: "",
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
            depositType: "supplier",
            custId: "",
            custName: "",
            custNo: "",
            suppId: "",
            suppNo: "",
            suppName: "",
        };
        this.handleDayChange = this.handleDayChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLineChange = this.handleLineChange.bind(this);
        this.getInfoSKU = this.getInfoSKU.bind(this);
        this.getInfoAccount = this.getInfoAccount.bind(this);
        //this.getInfoCustomer = this.getInfoCustomer.bind(this);
        //this.getInfoSupplier = this.getInfoSupplier.bind(this);
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

            if (this.state.custNo === '' && this.state.suppNo === "") {
                this.setState({
                    errorMsg: 'Customer/Supplier not selected yet!',
                })
            } else if (this.state.invoiceDate === "") {
                this.setState({
                    errorMsg: 'Date not selected yet!',
                })
            } else if (this.state.status === 'confirmed') {
                this.setState({
                    errorMsg: 'Journal entry confirmed. Deposit cannot be edited'
                })
            } else {
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
                        data.id = this.state.id;
                        this.props.patchSingleDeposit(data)
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
                        this.props.patchSingleDeposit(data)

                    } else {
                        // To Remove state
                        const { state } = this.props.history.location;
                        if (state && state.isDuplicate) {
                            const stateCopy = { ...state };
                            delete stateCopy.isDuplicate;
                            this.props.history.replace({ state: stateCopy })
                        }
                    }
                    this.props.setDeposit(data);
                }
                this.setState({
                    toggleFormSelection: true,
                    disableEdit: true,
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
        this.props.getDropdownGroup();
        this.props.getFilterSupplier();

        const fromSalesCheck = this.props.location.state;

        const id = this.props.match.params.id;
        if (id && !fromSalesCheck) {
            this.props.getSingleDepositRequest(id);

            if (this.props.DepositProduct.data && this.props.DepositProduct.data.id) {
                this.resetTotalState();
            }
        } else if (id && fromSalesCheck && fromSalesCheck.isDuplicate) {
            this.props.getSingleDepositRequest(id);

            if (this.props.DepositProduct.data && this.props.DepositProduct.data.id) {
                this.resetTotalState();
            }
        }

    }
    resetTotalState(editStatus, fromSales) {
        let newState;

        newState = {
            onEditInvoice: editStatus,
            ...this.props.DepositProduct.data,
            paymentTerm:
                this.props.DepositProduct.data.paymentTerm &&
                    this.props.DepositProduct.data.paymentTerm.id
                    ? this.props.DepositProduct.data.paymentTerm.id
                    : this.props.DepositProduct.data.paymentTerm,

            account:
                this.props.DepositProduct.data.account &&
                    this.props.DepositProduct.data.account.id
                    ? this.props.DepositProduct.data.account.id
                    : this.props.DepositProduct.data.account,

            journal:
                this.props.DepositProduct.data.journal &&
                    this.props.DepositProduct.data.journal.id
                    ? this.props.DepositProduct.data.journal.id
                    : this.props.DepositProduct.data.journal,

            currency:
                this.props.DepositProduct.data.currency &&
                    this.props.DepositProduct.data.currency.id
                    ? this.props.DepositProduct.data.currency.id
                    : this.props.DepositProduct.data.currency,
            lines: this.props.DepositProduct.data.salesOrderItems ? this.props.DepositProduct.data.salesOrderItems : [],
        };

        if (!editStatus) {
            newState.latestSalesOrder = true;
            newState.status = "draft";
        }
        delete newState.saleOrderItems;
        this.setState({
            ...this.state,
            ...newState,
        }, () => { this.calculateTotal(this.state.lines) })

        if (newState.status == 'partial' || newState.status == 'closed' || newState.status == 'cancelled'){
            this.setState({ disableEdit: true })
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
        let discountRate = 0
        if (
            this.state.discount !== null &&
            this.props.InvoiceDetails.data.discount
        ) {
            this.props.InvoiceDetails.data.discount.forEach((item) => {
                if (this.state.discount === item.id) {
                    discountRate = item.value
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
        let discountAmount = parseFloat((total * (discountRate / 100)) * conversion)
        let subTotal = total * conversion - discountAmount
        let gstAmount = parseFloat(subTotal * (gst / 100))
        let grandTotal = parseFloat(subTotal) + parseFloat(gstAmount)
        //let balance = parseFloat(grandTotal) - parseFloat(this.state.downPayment)
        console.log("calculation")
        console.log(grandTotal, subTotal);
        this.setState({
            total: total,
            discountAmount: discountAmount,
            subTotal: subTotal,
            gstAmount: gstAmount,
            grandTotal: grandTotal
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.DepositProduct.data !== this.props.DepositProduct.data) {
            if (
                this.props.DepositProduct.data &&
                this.props.DepositProduct.data.id
            ) {
                // If Browser Id isn't same with redux state ID,
                // Push again to update an new broswer Id on Create new Version
                // For New Version Purpose
                const { state } = this.props.history.location
                if (
                    this.props.match.params.id !== this.props.DepositProduct.data.id
                ) {
                    this.props.history.push(
                        singleTfesDeposit(this.props.DepositProduct.data.id),
                    )
                }

                if (state && state.isDuplicate) {

                    this.resetTotalState(false);
                    this.setState({
                        depositNumber: "",
                        status: "draft",
                        _id: "",
                        id: "",
                        toggleFormSelection: false,
                    })
                }
                else {
                    this.resetTotalState(true);
                    if (this.props.DepositProduct.data.latestSalesOrder === false || this.props.DepositProduct.data.isConverted === true) {
                        this.setState({
                            disableEdit: true,
                            buttonShow: false,
                            customerButtonShow: false,
                        })
                    }
                }
            }
        }
        if (prevProps.InvoiceDetails.data !== this.props.InvoiceDetails.data) {

            this.getFindJournalMap();
            this.calculateTotal(this.state.lines);
        }

        // if(this.state.depositType){
        //     if(this.state.depositType==="customer"){
        //         this.setState({})
        //     }
        // }

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

    getFindJournalMap() {
        let changeState = {};
        if (this.props.InvoiceDetails.data.accountJournal) {
            for (let i = 0; i < this.props.InvoiceDetails.data.accountJournal.length; i++) {
                if (this.state.account == "" && this.state.depositType == "supplier" && this.props.InvoiceDetails.data.accountJournal[i].name == "Supplier Deposit") {
                    if (this.props.InvoiceDetails.data.accountJournal[i].credit_account) {
                        changeState.account = this.props.InvoiceDetails.data.accountJournal[i].credit_account._id;
                    }
                    if (this.props.InvoiceDetails.data.accountJournal[i].debit_account) {
                        let lines = [...this.state.lines];
                        for (let j = 0; j < lines.length; j++) {
                            lines[j].account = this.props.InvoiceDetails.data.accountJournal[i].debit_account._id;
                            lines[j].account_name = this.props.InvoiceDetails.data.accountJournal[i].debit_account.accountName;
                        }
                        changeState.lines = lines;
                    }

                }
                else if (this.state.account == "" && this.state.depositType == "customer" && this.props.InvoiceDetails.data.accountJournal[i].name == "Customer Deposit") {
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
        this.setState(changeState);
    }

    /*
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
    getInfoSupplier(id) {
        const supplier = this.props.SupplierFiltered.data;
        supplier.map((source) => {
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

    */

    getInfoCreateCustomer(data, newNo) {
        this.setState({
            toggle: false,
            CustomerNo: newNo,
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
            custId: id,
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



        this.setState(changeState, () => {
            if (
                field == 'exportLocal' ||
                field == 'currency' ||
                field == 'discount'
            ) {
                this.calculateTotal(this.state.lines)
            }
        });

        if (field == "depositType") {
            //set default account
            this.getFindJournalMap();
        }

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

        lines[key].extPrice = amountRounding(2, extPrice)
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

    checkDisabled() {
        if (this.state.disableEdit == true) {
            return false
        }
        else if (this.state.onEditInvoice == false) {
            return true
        } else {
            if (this.state.isConverted == true) {
                return false
            } else {
                if (this.state.latestSalesOrder == false) { return false }
                else { return true }
            }
        }
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
        if (this.state.status == "cancelled") { return "【 Cancelled 】" }
        if (this.state.status == "closed") { return "【 Closed 】" }
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
            this.props.patchSingleDeposit(data)


        } else {
            alert('You must save this deposit in order to execute confirm')
        }
    }

    onBackToListView = () => {
        this.props.history.push('/app/accounting/tfesDeposit')
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


    render() {
        const { depositNumber, invoiceDate, page, account, soNumber, depositType, custName, suppName, address, currency, currencyName, telNo, faxNo, target, disableEdit, buttonShow, custNo, suppNo } = this.state;
        const { paymentTerm, buyerName, buyerEmail, exportLocal, SN, description, qty, unitPrice, extPrice, discount, uom, remarks, summary, toggleFormSelection } = this.state;
        const { brands, materials, loading } = this.props.ProductDetails;
        const totalPages = Math.ceil(this.state.lines.length / PAGE_MAX);
        const total = (this.state.total).toLocaleString("en-SG", { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 })
        const discountAmount = (this.state.discountAmount).toLocaleString("en-SG", { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 })
        const subTotal = (this.state.subTotal).toLocaleString("en-SG", { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 })
        const gstAmount = (this.state.gstAmount).toLocaleString("en-SG", { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 })
        const grandTotal = (this.state.grandTotal).toLocaleString("en-SG", { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 })



        // console.log('in',moment(invoiceDate))
        return (
            <React.Fragment>
                {this.props.DepositProduct.loading ? (
                    <RctSectionLoader />
                ) : (
                    <FormWrapper
                        onSave={this.onSubmit}
                        onSaveNew={this.onSaveNew}
                        disabled={this.checkDisabled()}
                        title="Back to All Deposit"
                        centerTitle={this.state.onEditInvoice ? 'Update Deposit Page' : 'Create New Deposit Page'}
                        edit="test"
                        promptMessage={this.showStatus()}
                        listRedirect={depositListPage}
                        showEditButton={this.state.disableEdit && this.state.status !== 'partial' && this.state.status !== 'closed' && this.state.status !== 'cancelled'}
                        onChangeToEdit={this.onChangeToEdit}
                    >
                        <form autoComplete="off" className={(this.state.disableEdit) && 'uneditable'}>

                        <div style={{ marginLeft: '2.5rem' }}>
                            <div class="top-container">
                                {this.state.errorMsg !== '' && (<h4 class="text-danger text-center">{this.state.errorMsg}</h4>)}
                                <div class="row">
                                    <div class="col-sm-4 " >
                                        <FormInput
                                            label="Deposit Number"
                                            value={depositNumber}
                                            target="invoiceNumber"
                                            handleChange={this.handleChange}
                                            isToggledEditForm={toggleFormSelection}
                                            readOnly={true}
                                            original={this.props.DepositProduct.data.depositNumber ? this.props.DepositProduct.data.depositNumber : ""}
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
                                            placeholder={"DD/MM/YYYY"}
                                            onDayChange={this.handleDayChange}
                                            dayPickerProps={{
                                                locale: 'en-SG',
                                                localeUtils: MomentLocaleUtils
                                            }}
                                            isToggledEditForm={toggleFormSelection}
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
                                            isToggledEditForm={toggleFormSelection}
                                            readOnly={disableEdit}
                                            // Set Default Value
                                            original={this.props.DepositProduct.data.account ? this.props.DepositProduct.data.account : "60879d5569991f45f0e3ee39"}
                                        />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-4" >
                                            { this.state.depositType === "customer" ?
                                                <FormInput
                                                    label="Partner No"
                                                    value={custNo}
                                                    target="custNo"
                                                    handleChange={this.handleChange}
                                                    isToggledEditForm={toggleFormSelection}
                                                    readOnly={true}
                                                    original={this.props.DepositProduct.data.custNo ? this.props.DepositProduct.data.custNo : ""}
                                                /> :
                                                <FormInput
                                                    label="Supplier No"
                                                    value={suppNo}
                                                    target="suppNo"
                                                    handleChange={this.handleChange}
                                                    isToggledEditForm={toggleFormSelection}
                                                    readOnly={true}
                                                    original={this.props.DepositProduct.data.suppNo ? this.props.DepositProduct.data.suppNo : ""}
                                                />
                                        }
                                    </div>
                                    <div class="col-sm-4 ">
                                        <FormInput
                                            label="Source / Sales no"
                                            value={soNumber}
                                            target="soNumber"
                                            handleChange={this.handleChange}
                                            isToggledEditForm={toggleFormSelection}
                                            readOnly={disableEdit}
                                            original={this.props.DepositProduct.data.soNumber ? this.props.DepositProduct.data.soNumber : ""}
                                        />
                                    </div>
                                    <div class="col-sm-4 ">
                                        <FormInput
                                            label="Customer/Supplier"
                                            value={depositType}
                                            target="depositType"
                                            // selectValueKey="_id"
                                            selectValues={[
                                                { name: "customer", value: "customer" },
                                                { name: "supplier", value: "supplier" }
                                            ]}
                                            handleChange={this.handleChange}
                                            readOnly={disableEdit}
                                            isToggledEditForm={toggleFormSelection}
                                            // Set Default Value
                                            original={this.props.DepositProduct.data.depositType ? this.props.DepositProduct.data.depositType : "supplier"}

                                        />
                                    </div>
                                    {/* <div class="col-sm-4 ">
                                        <FormInput
                                            label="Journal"
                                            value={journal}
                                            target="journal"
                                            selectValueKey="_id"
                                            selectValues={this.props.InvoiceDetails.data ? this.props.InvoiceDetails.data.accountJournal : []}
                                            handleChange={this.handleChange}
                                            readOnly={editable}
                                        />
                                    </div> */}
                                </div>
                                { this.state.depositType === "customer" ?
                                    <div class="row">
                                        <div class="col-sm-8 ">
                                            <FormInput
                                                label="Partner Name"
                                                value={custName}
                                                target="custName"
                                                buttonClick={this.searchCustomer}
                                                hasButton={buttonShow}
                                                // thirdButton={this.state.customerButtonShow}
                                                // thirdButtonClick={() =>
                                                //     this.thirdButtonClick('createCus')
                                                // }
                                                handleChange={this.handleChange}
                                                isToggledEditForm={toggleFormSelection}
                                                readOnly={disableEdit}
                                                original={this.props.DepositProduct.data.custName ? this.props.DepositProduct.data.custName : ""}
                                            />
                                        </div>
                                    </div>
                                    : <div class="row">
                                        <div class="col-sm-8 ">
                                            <FormInput
                                                label="Supplier Name"
                                                value={suppName}
                                                target="suppName"
                                                buttonClick={this.searchCustomer}
                                                hasButton={buttonShow}
                                                // thirdButton={this.state.customerButtonShow}
                                                // thirdButtonClick={() =>
                                                //     this.thirdButtonClick('createCus')
                                                // }
                                                handleChange={this.handleChange}
                                                isToggledEditForm={toggleFormSelection}
                                                readOnly={disableEdit}
                                                original={this.props.DepositProduct.data.suppName ? this.props.DepositProduct.data.suppName : ""}
                                            />
                                        </div>
                                    </div>
                                }



                                <div class="row">
                                    <div class="col-sm-8" >
                                        <FormInput
                                            label="Address"
                                            value={address}
                                            target="address"
                                            handleChange={this.handleChange}
                                            isToggledEditForm={toggleFormSelection}
                                            readOnly={disableEdit}
                                            original={this.props.DepositProduct.data.address ? this.props.DepositProduct.data.address : ""} />
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
                                            isToggledEditForm={toggleFormSelection}
                                            readOnly={disableEdit}
                                            original={this.props.DepositProduct.data.currency ? this.props.DepositProduct.data.currency.id : ""} />
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
                                            original={this.props.DepositProduct.data.telNo ? this.props.DepositProduct.data.telNo : ""}
                                        />
                                    </div>
                                    <div class="col-sm-4 ">
                                        <FormInput
                                            label="Fax. Number"
                                            value={faxNo}
                                            target="faxNo"
                                            handleChange={this.handleChange}
                                            isToggledEditForm={toggleFormSelection}
                                            readOnly={disableEdit}
                                            original={this.props.DepositProduct.data.faxNo ? this.props.DepositProduct.data.faxNo : ""}
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
                                            isToggledEditForm={toggleFormSelection}
                                            readOnly={disableEdit}
                                            original={this.props.DepositProduct.data.paymentTerm ? this.props.DepositProduct.data.paymentTerm.id : ""}
                                        />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-4" >
                                        <FormInput
                                            label="Buyer Name"
                                            value={buyerName}
                                            target="buyerName" handleChange={this.handleChange}
                                            isToggledEditForm={toggleFormSelection}
                                            readOnly={disableEdit}
                                            original={this.props.DepositProduct.data.buyerName ? this.props.DepositProduct.data.buyerName : ""}
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
                                            original={this.props.DepositProduct.data.buyerEmail ? this.props.DepositProduct.data.buyerEmail : ""}
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
                                            // Set Default Value
                                            original={this.props.DepositProduct.data.exportLocal ? this.props.DepositProduct.data.exportLocal : "export"}
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
                                    disableEdit={this.state.disableEdit}
                                    buttonShow={this.state.buttonShow}
                                    originalData={this.props.DepositProduct.data.salesOrderItems ? this.props.DepositProduct.data.salesOrderItems : []}
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
                                    <p>Pre Page #</p>
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
                                    <p>Next Page #</p>
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
                                    {/* <div class="col-sm-3 " >
                                        <FormInput
                                            label="Discount"
                                            value={discount}
                                            target="discount"
                                            selectValueName="name"
                                            selectValueKey="id"
                                            selectValues={this.props.CreditNoteDetails.data ? this.props.CreditNoteDetails.data.discount : []}
                                            handleChange={this.handleChange}
                                            readOnly={editable}

                                        />
                                    </div> */}
                                </div>
                                <div class="row">
                                    <div className="col-sm-8 ">
                                        <FormInput
                                            label="Remarks"
                                            value={remarks}
                                            target="remarks"
                                            multiline rows={4}
                                            handleChange={this.handleChange}
                                            isToggledEditForm={toggleFormSelection}
                                            readOnly={disableEdit} 
                                            original={this.props.DepositProduct.data.remarks ? this.props.DepositProduct.data.remarks : ""}/>
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
                                            {/* <h3 >Discount ({currencyName})</h3><p>{discountAmount}</p> */}
                                            <h3>Subtotal({currencyName})</h3><p>{subTotal}</p>
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
                                                    <span> Confirm Deposit </span>
                                                </div>}



                                            <div onClick={this.onBackToListView}>
                                                <ArrowBackIcon />
                                                <span>Back to Deposit List</span>
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
                                                ) : this.state.target === "suppName" ? (
                                                    <div>
                                                        {/* <h3>Supplier Invoice List</h3>
                                                        <CrmSupplierList
                                                            getInfo={this.getInfoSupplier} /> */}
                                                        <JournalPartnerList getInfo={this.getInfoPartner}/>
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

const mapStateToProps = ({ producttfesState, customertfesState, accountItemState, invoiceState, packinglistState, salesorderState, suppliertfesState, depositState }) => {
    const { ProductDetails, ProductFiltered } = producttfesState;
    const { customerFiltered, singleCustomer } = customertfesState;
    const { SupplierFiltered, singleSupplier } = suppliertfesState;
    const { InvoiceDetails } = invoiceState;
    const { packingList } = packinglistState;
    const { DepositProduct } = depositState;
    const { accountItem } = accountItemState;
    return { packingList, accountItem, ProductDetails, ProductFiltered, customerFiltered, InvoiceDetails, DepositProduct, SupplierFiltered, singleSupplier, singleCustomer };
};
export default connect(mapStateToProps, {
    setProduct,
    getProductDetails,
    getFilterProduct,
    setDeposit,
    patchSingleDeposit,
    getSingleDepositRequest,
    getDepositPdf,
    savePACKINGForm,
    getSingleSkuSalesOrderRequest,
    getDropdownGroup,
    getFilterSupplier,
    getSingleCustomerRequest,
    getSingleSupplierRequest
})(DepositFormView);
