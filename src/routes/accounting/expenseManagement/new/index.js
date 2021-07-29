// new quotation
import React, { Component } from "react";
import { connect } from "react-redux";
import RctSectionLoader from "Components/RctSectionLoader";
import { singleSupplierInvoice } from 'Helpers/accountingURL';
// Redux imports
import { setProduct, getProductDetails, getFilterProduct } from "Ducks/producttfes";
import { setQuotation, getQuotationDetails, getFilterQuotation } from "Ducks/quotationtfes";
import { setSupplierInvoice, patchSingleSupplierInvoice, getSingleSupplierInvoiceRequest } from "Ducks/supplier-invoice";
import { getSingleSkuSalesOrderRequest } from "Ducks/salesordertfes";
import { savePACKINGForm } from "Ducks/packing";
import {
    Button,
} from "@material-ui/core";
import CrmSupplierList from 'Components/PopupPage/SupplierList'
// React Component import
import FormWrapper from "Components/Form/Layout/FormWrapper";
import FormInput from "Components/Form/FormInput";
import DialogRoot from "Components/Dialog/DialogRoot";
import Product_list from '../../../warehouse/SKU/new/components/productList'
import TfesCustomerList from 'Components/PopupPage/TfesCustomerList'
import BillOfMaterial from 'Components/PopupPage/BillOfMaterial'
import CreateSupplier from 'Components/PopupPage/CreateSupplier'
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
import {
    setSupplier,
    getSupplierDetails,
    getSingleSupplierRequest,
    patchSingleSupplierRequest,
    getFilterSupplier,
    setDuplicate,
  } from 'Ducks/suppliertfes'
  import { setInvoice, patchSingleInvoice, getSingleInvoiceRequest, getTaxInvoicePdf, getProformaInvoicePdf, getCommercialInvoicePdf, getDropdownGroup } from "Ducks/invoicetfes";
// React Day Picker input
import DayPickerInput from 'react-day-picker/DayPickerInput';

import MomentLocaleUtils, {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';

import { expenseManagementListPage } from "Helpers/accountingURL";

const PAGE_MAX = 10;
class ExpenseManagementFormView extends Component {
    constructor(props) {
        super(props);
        console.log('props',props)
        this.state = {
            toggle: false,
            onEditInvoice: false,
            invoiceNumber: "",
            element: null,
            target: "",
            errorMsg: "",
            date: new Date(),
            salesPic: "",
            suppId: "",
            suppNo: "",
            suppName: "",
            address: "",
            remarks: "",
            currency: [],
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
                account: ''
            }],
            total: 0,
            day: "",
            index: 0,
            status: '',
            supplierButtonShow: true,
            editable: false,
            buttonShow: true,
            page: 1,
            toggleFormSelection: true,
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLineChange = this.handleLineChange.bind(this);
        this.getInfoSKU = this.getInfoSKU.bind(this);
        this.getInfoAccount = this.getInfoAccount.bind(this);
        this.getInfoSupplier = this.getInfoSupplier.bind(this);
        this.getInfoBOM = this.getInfoBOM.bind(this);
        this.getInfoCreateSupplier = this.getInfoCreateSupplier.bind(this);
        this.passDataBack = this.passDataBack.bind(this);
        this.deleteNewLine = this.deleteNewLine.bind(this);
        this.resetTotalState = this.resetTotalState.bind(this);
        this.onPrintPdf = this.onPrintPdf.bind(this)
        this.onConfirmInvoice = this.onConfirmInvoice.bind(this)
        this.packingCreate = this.packingCreate(this);
    }

    onSubmit() {
        if (this.state.name === '') {
            this.setState({
                errorMsg: 'Customer not selected yet!',
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
    }

    componentDidMount() {
        this.props.getProductDetails();
        this.props.getQuotationDetails();
        this.props.getDropdownGroup();

        const fromSalesCheck = this.props.location.state;

        const id = this.props.match.params.id;
        if (id && !fromSalesCheck) {
            this.props.getSingleSupplierInvoiceRequest(id);

            if (this.props.SupplierInvoiceProduct.data && this.props.SupplierInvoiceProduct.data.id) {
                this.resetTotalState();
            }
        } else if (id && fromSalesCheck && fromSalesCheck.isDuplicate) {
            this.props.getSingleSupplierInvoiceRequest(id);

            if (this.props.SupplierInvoiceProduct.data && this.props.SupplierInvoiceProduct.data.id) {
                this.resetTotalState();
            }
        } else if (id && fromSalesCheck && fromSalesCheck.so) {
            this.props.getSingleSkuSalesOrderRequest(id);

            if (this.props.SalesOrderProduct.data && this.props.SalesOrderProduct.data.id) {
                this.resetTotalState(undefined, true);
            }
        }
        else if (this.props.location.state) {
            this.purchaseState(true)
        }

    }



    purchaseState(purchase) {
        let newState=this.props.location.state.data;
        if (purchase) {
            this.setState({
                toggle: false,
                supplierButtonShow: false,
                suppId: newState.suppId && newState.suppId ,
                suppNo: newState.suppNo && newState.suppNo,
                suppName: newState.name && newState.name ,
                address: newState.address ? newState.address : "",
                telNo: newState.telNo ? newState.telNo : "",
                faxNo: newState.faxNo ? newState.faxNo : "",
                buyerName: newState.buyerName ? newState.buyerName : "",
                buyerEmail: newState.buyerEmail ? newState.buyerEmail : "",
                incoterm: newState.incoterm ? newState.incoterm : undefined,
                currency: newState.currency ? newState.currency : undefined,
                paymentTerm: newState.paymentTerm ? newState.paymentTerm : undefined,
                lines:newState.lines?newState.lines:[]
            });
            // this.props.getOutstandingInvoices(source._id);
        }
        }
    

    resetTotalState(editStatus, fromSales) {
        let newState;
        if (fromSales) {
            newState = {
                onEditInvoice: editStatus,
                ...this.props.SalesOrderProduct.data,
                paymentTerm:
                    this.props.SalesOrderProduct.data.paymentTerm &&
                    this.props.SalesOrderProduct.data.paymentTerm.id
                        ? this.props.SalesOrderProduct.data.paymentTerm.id
                        : this.props.SalesOrderProduct.data.paymentTerm,

                currency:
                    this.props.SalesOrderProduct.data.currency &&
                    this.props.SalesOrderProduct.data.currency.id
                        ? this.props.SalesOrderProduct.data.currency.id
                        : this.props.SalesOrderProduct.data.currency,
                lines: this.props.SalesOrderProduct.data.salesOrderItems ? this.props.SalesOrderProduct.data.salesOrderItems : [],
            }
        } else {
            newState = {
                onEditInvoice: editStatus,
                ...this.props.SupplierInvoiceProduct.data,
                paymentTerm:
                    this.props.SupplierInvoiceProduct.data.paymentTerm &&
                    this.props.SupplierInvoiceProduct.data.paymentTerm.id
                        ? this.props.SupplierInvoiceProduct.data.paymentTerm.id
                        : this.props.SupplierInvoiceProduct.data.paymentTerm,

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
                    this.props.SupplierInvoiceProduct.data.currency &&
                    this.props.SupplierInvoiceProduct.data.currency.id
                        ? this.props.SupplierInvoiceProduct.data.currency.id
                        : this.props.SupplierInvoiceProduct.data.currency,
                lines: this.props.SupplierInvoiceProduct.data.salesOrderItems ? this.props.SupplierInvoiceProduct.data.salesOrderItems : [],
            };
        }
        if (!editStatus) {
            newState.latestSalesOrder = true;
            newState.status = "draft";
        }
        delete newState.saleOrderItems;
        this.setState({
            ...this.state,
            ...newState,
        })
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
                }
                else {
                    this.resetTotalState(true);
                    if (this.props.SupplierInvoiceProduct.data.latestSalesOrder === false || this.props.SupplierInvoiceProduct.data.isConverted === true) {
                        console.log("editing");
                        this.setState({
                            editable: true,
                            buttonShow: false,
                            supplierButtonShow: false,
                        })
                    }
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
                                qty: 0,
                                unitPrice: source.listPrice
                            }
                            : eachItem
                    )
                }));
                this.setState({
                    toggle: false,
                });
            }
        })
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
                                account: account.accountName
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
                console.log('source',source)
                this.setState({
                    toggle: false,
                    supplierButtonShow: false,
                    suppId: source._id && source._id ,
                    suppNo: source.suppId && source.suppId,
                    suppName: source.name && source.name ,
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

    getInfoBOM(id) {
    }
    getInfoSendEmail=()=> {
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
            if (field == "exportLocal") {
                this.calculateTotal(this.state.lines)
            }
        });

        this.setState(changeState, () => {
            if (field == "discount") {
                this.calculateTotal(this.state.lines)
            }
        });

        this.setState(changeState, () => {
            if (field == "currency") {
                this.calculateTotal(this.state.lines)
            }
        });

        if(field == "journal"){
            //set default account
            if(this.props.InvoiceDetails.data.accountJournal){
                for(let i=0; i < this.props.InvoiceDetails.data.accountJournal.length; i++){
                    if(this.props.InvoiceDetails.data.accountJournal[i]._id == value){
                        if(this.props.InvoiceDetails.data.accountJournal[i].debit_account){
                            changeState.account = this.props.InvoiceDetails.data.accountJournal[i].debit_account._id;
                        }
                        if(this.props.InvoiceDetails.data.accountJournal[i].credit_account){
                            let lines = [...this.state.lines];
                            for(let j=0; j < lines.length; j++){
                                lines[j].account = this.props.InvoiceDetails.data.accountJournal[i].credit_account.accountName;
                            }
                            changeState.lines = lines;
                        }
                        
                    }
                    
                }
            }           
            
        }

        // if (field == "suppName" && value != "") {
        //   this.setState({
        //     supplierButtonShow: false
        //   })
        // }
        // else if (field == "suppName" && value == "") {
        //   this.setState({
        //     supplierButtonShow: true
        //   })
        // }

    }

    handleLineChange(field, value, key) {

        let lines = [...this.state.lines];
        lines[key][field] = value;
        let extPrice = parseInt(lines[key].qty) * parseFloat(lines[key].unitPrice);
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
            total += parseInt(lines[i].qty) * parseFloat(lines[i].unitPrice);
        }

        // For export local
        let gst;
        if (this.state.exportLocal == "local") {
            this.props.QuotationDetails.data.gst.forEach(item => {
                if (item.name == "local") {
                    gst = item.rate
                }
            })
        }
        else if (this.state.exportLocal == "export") {
            this.props.QuotationDetails.data.gst.forEach(item => {
                if (item.name == "export") {
                    gst = item.rate
                }
            })
        }

        // For Discount
        let discountRate = 0;
        this.props.QuotationDetails.data.discount.map(item => {
            if (item.id == this.state.discount) {
                discountRate = item.discount;
            }
        })

        // For Currency
        let conversion = 0;
        // State rate will be the previous rate
        let rate = this.state.currentRate
        if (this.state.currency != null) {
            this.props.QuotationDetails.data.currency.map(item => {
                if (item.id == this.state.currency) {
                    conversion = item.rate / rate;
                    conversion = conversion * (rate / 1);
                    this.setState({
                        currencyName: item.name,
                        currentRate: item.rate,
                    });
                }
            })
        }

        let discountAmount = parseFloat((total * (discountRate / 100)) * conversion).toFixed(2);
        let subTotal = total * conversion - discountAmount;
        let gstAmount = parseFloat(subTotal * (gst / 100)).toFixed(2);
        let grandTotal = (parseFloat(subTotal) + parseFloat(gstAmount)).toFixed(2);
        let balance = (parseFloat(grandTotal) - parseFloat(this.state.downPayment)).toFixed(2);

        this.setState({
            total: total,
            discountAmount: discountAmount,
            subTotal: subTotal,
            gstAmount: gstAmount,
            grandTotal: grandTotal,
            balance: balance
        })
    }

    checkDisabled() {
        if (this.state.onEditInvoice == false) {
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
    showStatus() {
        if (this.state.status == "confirmed") { return "【 Confirmed 】" }
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
            if (!this.state.invoiceNumber) {
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

    onBackToListView = () => {
        this.props.history.push('/app/accounting/tfesInvoice')
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
    onCreatePackingOrder=()=> {
        console.log("onCreatePackingOrder")
        alert("onCreatePackingOrder")
    }
    render() {
        const { invoiceNumber, date, salesPic, suppNo, journal, suppName, address, currency, currencyName, telNo, faxNo, target, editable, buttonShow, account} = this.state;
        const { paymentTerm, buyerName, buyerEmail, exportLocal, SN, description, qty, unitPrice, extPrice, discount, uom, remarks, summary, toggleFormSelection } = this.state;
        const { brands, materials, loading } = this.props.ProductDetails;
        const totalPages = Math.ceil(this.state.lines.length / PAGE_MAX);

        return (
            <React.Fragment>
                {this.props.SupplierInvoiceProduct.loading ? (
                    <RctSectionLoader />
                ) : (
                    <FormWrapper 
                    onSave={this.onSubmit} 
                    onSaveNew={this.onSaveNew} 
                    disabled={this.checkDisabled()} 
                    title="Back to All Expenses Management" 
                    centerTitle={this.state.onEditInvoice ? 'Update Expense Page' : 'Create New Expense Page'} 
                    edit="test" 
                    promptMessage={this.showStatus()}
                    listRedirect={expenseManagementListPage}
                    >
                        <form autoComplete="off">
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
                                            value={date}
                                            selectedDay={this.state.day}
                                            placeholder={`${formatDate(new Date())}`}
                                        />
                                    </div>
                                    <div class="col-sm-4">
                                        <FormInput
                                            // label="Account"
                                            // value={salesPic}
                                            // target="account"
                                            // hasButton={buttonShow}
                                            // buttonClick={this.buttonClick}
                                            // selectValueKey="id"
                                            // selectValueName="salesPic"
                                            // selectValues={[]}
                                            // handleChange={this.handleChange}
                                            // readOnly={editable}

                                            label="Account"
                                            value={account? account : ''}
                                            target="account"
                                            selectValueKey="_id"
                                            selectValueName="accountName"
                                            selectValues={this.props.InvoiceDetails.data ? this.props.InvoiceDetails.data.accountItem : []}
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

                                    </div>
                                    <div class="col-sm-4 ">
                                        <FormInput
                                            label="Journal"
                                            value={journal}
                                            target="journal"
                                            selectValueKey="_id"
                                            selectValues={this.props.InvoiceDetails.data ? this.props.InvoiceDetails.data.accountJournal : []}
                                            handleChange={this.handleChange}
                                            readOnly={editable}
                                        />
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-sm-8 ">
                                        <FormInput
                                            label="Supplier Name"
                                            value={suppName}
                                            target="suppName"
                                            buttonClick={this.searchSupplier}
                                            hasButton={buttonShow}
                                            thirdButton={this.state.supplierButtonShow}
                                            thirdButtonClick={() =>
                                                this.thirdButtonClick('createSupplier')
                                            }
                                            handleChange={this.handleChange}
                                            readOnly={editable}
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
                                            readOnly={editable} />
                                    </div>
                                    <div class="col-sm-4 ">
                                        <FormInput
                                            label="Currency"
                                            target="currency"
                                            selectValueKey="id"
                                            selectValueName="name"
                                            selectValues={this.props.QuotationDetails.data ? this.props.QuotationDetails.data.currency : []}
                                            handleChange={this.handleChange}
                                            readOnly={editable} />
                                    </div>

                                </div>
                                <div class="row">
                                    <div class="col-sm-4 " >
                                        <FormInput
                                            label="Tel. Number"
                                            value={telNo}
                                            target="telNo"
                                            handleChange={this.handleChange}
                                            readOnly={editable}
                                        />
                                    </div>
                                    <div class="col-sm-4 ">
                                        <FormInput
                                            label="Fax. Number"
                                            value={faxNo}
                                            target="faxNo"
                                            handleChange={this.handleChange}
                                            readOnly={editable}
                                        />
                                    </div>
                                    <div class="col-sm-4">
                                        <FormInput
                                            label="Payment Term"
                                            value={paymentTerm}
                                            target="paymentTerm"
                                            selectValueKey="id"
                                            selectValueName="name"
                                            selectValues={this.props.QuotationDetails.data ? this.props.QuotationDetails.data.paymentTerm : []}
                                            handleChange={this.handleChange}
                                            readOnly={editable}
                                        />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-4" >
                                        <FormInput
                                            label="Buyer Name"
                                            value={buyerName}
                                            target="buyerName" handleChange={this.handleChange}
                                            readOnly={editable}
                                        />
                                    </div>
                                    <div class="col-sm-4">
                                        <FormInput
                                            label="Buyer Email"
                                            value={buyerEmail}
                                            target="buyerEmail"
                                            handleChange={this.handleChange}
                                            readOnly={editable}
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
                                    editable={this.state.editable}
                                    buttonShow={this.state.buttonShow}
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
                                            selectValueName="discount"
                                            selectValues={this.props.QuotationDetails.data ? this.props.QuotationDetails.data.discount : []}
                                            handleChange={this.handleChange}
                                            readOnly={editable}
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
                                            readOnly={editable} />
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
                                            <h3>Discount ({currencyName})</h3><p>{this.state.discountAmount}</p>
                                            <h3>Subtotal, after Discount({currencyName})</h3><p>{this.state.subTotal}</p>
                                            <h3>GST ({currencyName})</h3><p>{this.state.gstAmount}</p>
                                            <h3>Grand Total, with GST ({currencyName})</h3><p>{this.state.grandTotal}</p>
                                            <div class="boundary-line" style={{ width: "90%", height: "1px", backgroundColor: "#c0c0c0", margin: "5px auto " }}></div>
                                            <h3>Down Payment({currencyName})</h3><p>{this.state.downPayment}</p>
                                            <h3>Balance left({currencyName})</h3><p>{this.state.balance}</p>
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
                                            &&<div onClick={this.onConfirmInvoice}>
                                                <ConfirmationNumberIcon />
                                                <span> Confirm Invoice </span>
                                            </div>}
                                            <div onClick={this.onPrintPdf}>
                                                <PrintTwoToneIcon />
                                                <span> Print Invoice </span>
                                            </div>
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
                            {this.state.target === "suppName" 
                            ? (
                                <div>
                                    <h3>Supplier Invoice List</h3>
                                    <CrmSupplierList
                                    getInfo={this.getInfoSupplier} />
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
                                    : this.state.target === "bom" 
                                        ? (
                                        <div><h3>Build of Material</h3>
                                            <BillOfMaterial
                                                getInfo={this.getInfoBOM}
                                                saveToggle={this.saveBOM}
                                                description={this.state.description}
                                                qty={this.state.qty}
                                                unitPrice={this.state.unitPrice}
                                                Bom={this.state.BomList}
                                                passData={this.passDataBack} /> 
                                        </div>
                                            ) 
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

const mapStateToProps = ({ quotationtfesState, producttfesState, supplierinvoiceState ,packinglistState, salesorderState,suppliertfesState, invoiceState, accountItemState}) => {
    const { Quotations, QuotationDetails } = quotationtfesState;
    const { ProductDetails, ProductFiltered } = producttfesState;
    const {
        SupplierFiltered,
      } = suppliertfesState
    const { SupplierInvoiceProduct } = supplierinvoiceState;
    const {packingList}=packinglistState;
    const { SalesOrderProduct } = salesorderState;
    const { InvoiceProduct, InvoiceDetails } = invoiceState;
    const { accountItem } = accountItemState;
    return { packingList,Quotations,SupplierFiltered, QuotationDetails, ProductDetails, ProductFiltered, SupplierInvoiceProduct, SalesOrderProduct, InvoiceProduct, InvoiceDetails, accountItem };
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
    getDropdownGroup
})(ExpenseManagementFormView);
