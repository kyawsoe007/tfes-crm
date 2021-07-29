// new quotation
import React, { Component } from "react";
import { connect } from "react-redux";
import RctSectionLoader from "Components/RctSectionLoader";
import { salesOrderEditPage } from 'Helpers/crmURL';
import { singleTfesInvoice } from 'Helpers/accountingURL';
// Redux imports
import { setProduct, getProductDetails, getFilterProduct } from "Ducks/producttfes";
import { setQuotation, getQuotationDetails, getFilterQuotation } from "Ducks/quotationtfes";
import { setSalesOrder, patchSingleSkuSalesOrderRequest, getSingleSkuSalesOrderRequest, setNewVersionSalesOrderRequest, setSalesOrderRequest, getPdfCreate, getCommercialInvoicePdf, getProformaInvoicePdf } from "Ducks/salesordertfes";
import { savePACKINGForm } from "Ducks/packing";
import {
  Button,
} from "@material-ui/core";
// React Component import
import FormWrapper from "Components/Form/Layout/FormWrapper";
import FormInput from "Components/Form/FormInput";
import DialogRoot from "Components/Dialog/DialogRoot";
import SkuList from 'Components/PopupPage/SkuList'
import TfesCustomerList from 'Components/PopupPage/TfesCustomerList'
import BillOfMaterial from 'Components/PopupPage/BillOfMaterial'
import CreateCustomer from 'Components/PopupPage/CreateCustomer'
// import CreateCustomer from '../../quotation/new/components/createCustomer';
import QuotationProductLine from 'Components/ProductLine/QuotationProductLine'
import PurchaseItemLine from 'Components/PopupPage/PurchaseItemLine'

// material-ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// Icon
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
// import { Icon } from "@iconify/react";
import { Icon, InlineIcon } from '@iconify/react';

import { element } from "prop-types";
import { Avatar } from "@material-ui/core";
import fastReverseButton from '@iconify-icons/emojione-v1/fast-reverse-button';
import fastForwardButton from '@iconify-icons/emojione-v1/fast-forward-button';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import SendIcon from '@material-ui/icons/Send';
import EmailIcon from '@material-ui/icons/Email';
import PrintOutlinedIcon from '@material-ui/icons/PrintOutlined';
import PrintTwoToneIcon from '@material-ui/icons/PrintTwoTone';
import PrintSharpIcon from '@material-ui/icons/PrintSharp';
import ReceiptSharpIcon from '@material-ui/icons/ReceiptSharp';
import HourglassFullSharpIcon from '@material-ui/icons/HourglassFullSharp';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import CancelIcon from '@material-ui/icons/Cancel';
import { saleStatus } from 'Constants/modelStatus';
// packing icon
// npm install --save-dev @iconify/react @iconify-icons/mdi
// import packageVariant from '@iconify-icons/mdi/package-variant';

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

import { getPicUsers } from 'Ducks/user';
import { singlePurchase } from 'Helpers/crmURL';
import { acctSalesListPage } from 'Helpers/accountingURL';
import { amountRounding } from "Helpers/helpers";

const PAGE_MAX = 10;
class crm_new_salesOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      onEditSalesOrder: false,
      quotation: '',
      latestSalesOrder: '',
      // displayMaterial: false,
      soNumber: "",
      element: null,
      target: "",
      errorMsg: "",
      createdDate: new Date(),
      salesPic: props.loginUser && props.loginUser._id,
      custId: "",
      custNo: "",
      incoterm: "",
      deliveryRemark: "",
      custName: "",
      address: "",
      delAddress: "",
      remarks: "",
      currency: "",
      telNo: "",
      faxNo: "",
      paymentTerm: "",
      buyerName: "",
      buyerEmail: "",
      exportLocal: "local",
      SN: 0,
      custRef: "",
      description: "",
      qty: 0,
      unitPrice: 0,
      extPrice: 0,
      deletedExtPrice: 0,
      discount: "",
      isPercentage: true,
      uom: "",
      summary: "",
      discountAmt: 0,
      subTotal: 0,
      grandTotal: 0,
      gst: 7,
      gstAmount: 0,
      quoRef: "",
      custPoNum: "",
      lines: [{
        id: '',
        SN: 1,
        unitPrice: 0,
        description: "",
        qty: 0,
        custRef: "",
        extPrice: 0,
        uom: "",
        BomList: [],
      }],
      total: 0,
      day: "",
      index: 0,
      status: '',
      indexBOM: 0,
      BomList: [],
      packItems: [],
      packingNum: '',
      operationId: '',
      packingListStatus: '',
      pickedBy: '',
      customerButtonShow: true,
      disableEdit: false,
      page: 1,
      toggleFormSelection: true,
      isDuplicate: false,
      redirectPo: false,
      doToggle: false,
      view: false,
      prices: "",
      leadTime: "",
      validity: "",
      freightAmount: "",
      changedSN: [],
      focus: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLineChange = this.handleLineChange.bind(this);
    this.getInfoSKU = this.getInfoSKU.bind(this);
    this.getInfoCustomer = this.getInfoCustomer.bind(this);
    this.getInfoBOM = this.getInfoBOM.bind(this);
    this.getInfoCreateCustomer = this.getInfoCreateCustomer.bind(this);
    this.passDataBack = this.passDataBack.bind(this);
    // this.addNewLine = this.addNewLine.bind(this);
    this.deleteNewLine = this.deleteNewLine.bind(this);
    this.resetTotalState = this.resetTotalState.bind(this);
    this.onPrintPdf = this.onPrintPdf.bind(this)
    this.onConfirmSalesOrder = this.onConfirmSalesOrder.bind(this)
    this.onCreateNewVersionSalesOrder = this.onCreateNewVersionSalesOrder.bind(this)
    // this.addNewLine = this.addNewLine.bind(this);
    this.packingCreate = this.packingCreate(this);
    this._onBlur = this._onBlur.bind(this)
    this._onFocus = this._onFocus.bind(this)
    this.calculateSN = this.calculateSN.bind(this)
  }

  // Day picker input stuff
  // currentYear = new Date().getFullYear();
  // currentMonth = (new Date().getMonth()) + 1;
  // currentDay = new Date().getUTCDate();

  onSubmit() {
    if (this.state.focus){
      this._onBlur();
    }
    if (this.state.custNo === '') {
      this.setState({
        errorMsg: 'Customer not selected yet!',
      })
    } else if (this.state.lines.length === 0) {
      this.setState({
        errorMsg: "Order Items should not be empty!"
      })
    } else {

      for (let i = 0; i < this.state.lines.length; i++) {
        if (this.state.lines[i].qty === 0) {
          this.setState({ errorMsg: "Qty cannot be 0!" })
          return null
        }
      }
      const data = {
        ...this.state,
        salesOrderItems: this.state.lines
      }
      delete data.toggleFormSelection;
      delete data.lines;
      delete data.onEditSalesOrder;
      delete data.toggle;
      delete data.element;
      // delete data.soNumber;
      delete data.targetSearch;
      delete data.targetCreate;
      delete data.latestSalesOrder;
      delete data.quotation;
      delete data.filter;
      delete data.key;
      delete data.value;
      delete data.changedSN;
      // delete data.disableEdit;

      console.log("Sent lines:", this.state.lines);
      // If edit/update onSubmit
      if (this.state.onEditSalesOrder) {
        data.id = this.state.id

        // extPrice becomes undefined, if BOM qty is changed in BOM window without changing list price or outside qty. 
        // this code snippet recalculates the extPrice. Quickfix, needs to find root cause of issue. 
        for (let i = 0; i < data.salesOrderItems.length; i++) {
          if (typeof data.salesOrderItems[i].extPrice === "undefined") {
            data.salesOrderItems[i].extPrice = data.salesOrderItems[i].qty * data.salesOrderItems[i].unitPrice
            console.log(data.salesOrderItems[i]);
          }
        }
        this.props.patchSingleSkuSalesOrderRequest(data)
      } else {
        // To Remove state
        if (this.state.quotationId) {
          data.quotation = this.state.quotationId
        }

        const { state } = this.props.history.location
        if (state && state.isDuplicate) {
          if (data.initialVersion) {
            delete data.initialVersion;
          }
          const stateCopy = { ...state }
          delete stateCopy.isDuplicate

          this.props.history.replace({ state: stateCopy })
          this.setState({
            isDuplicate: false,
          })
        }
        this.props.setSalesOrder(data);

      }

      this.setState({ errorMsg: "" })
    }
    this.setState({
      disableEdit: true,
      changedSN:[]
    })
  }

  componentDidMount() {
    this.props.getProductDetails();
    this.props.getQuotationDetails();
    this.props.getPicUsers();

    const salesOrderId = this.props.match.params.id
    if (salesOrderId) {
      this.props.getSingleSkuSalesOrderRequest(salesOrderId)
    }

    if (this.props.SalesOrderProduct.data && this.props.SalesOrderProduct.data.id) {
      this.resetTotalState();
    }

    // checks if this is duplicate so the quotation number will not show 
    if (typeof this.props.location.state !== 'undefined') {
      if (this.props.location.state.isDuplicate) {
        let isDuplicate = this.props.location.state.isDuplicate
        this.resetTotalState(true)
        this.setState({
          isDuplicate: isDuplicate,
          toggleFormSelection: false,
          woStatus: "",
          doStatus: "",

        })

      }
    }
    if (typeof this.props.location.state !== 'undefined') {
      if (this.props.location.state.view) {
        let view = this.props.location.state.view
        this.resetTotalState(true)
        this.setState({
          view: view
        })
      }
    } else {
      this.setState({
        view: false
      })
    }
  }



  resetTotalState(editStatus) {
    let newState = {
      onEditSalesOrder: editStatus,
      ...this.props.SalesOrderProduct.data,
      paymentTerm:
        this.props.SalesOrderProduct.data.paymentTerm &&
          this.props.SalesOrderProduct.data.paymentTerm.id
          ? this.props.SalesOrderProduct.data.paymentTerm.id
          : this.props.SalesOrderProduct.data.paymentTerm,

      incoterm:
        this.props.SalesOrderProduct.data.incoterm &&
          this.props.SalesOrderProduct.data.incoterm.id
          ? this.props.SalesOrderProduct.data.incoterm.id
          : this.props.SalesOrderProduct.data.incoterm,

      currency:
        this.props.SalesOrderProduct.data.currency &&
          this.props.SalesOrderProduct.data.currency.id
          ? this.props.SalesOrderProduct.data.currency.id
          : this.props.SalesOrderProduct.data.currency,

      currencyName: this.props.SalesOrderProduct.data.currency && this.props.SalesOrderProduct.data.currency.name ? this.props.SalesOrderProduct.data.currency.name : undefined,
      currencySymbol: this.props.SalesOrderProduct.data.currency && this.props.SalesOrderProduct.data.currency.currencySymbol ? this.props.SalesOrderProduct.data.currency.currencySymbol : undefined,
      discountName: this.props.SalesOrderProduct.data.discountName ? this.props.SalesOrderProduct.data.discountName : "",
      discount: this.props.SalesOrderProduct.data.discount ? this.props.SalesOrderProduct.data.discount : ""
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

    if (!editStatus) {
      newState.latestSalesOrder = true;
      newState.status = "draft";
      newState.woStatus = "";
      newState.doStatus = "";
      newState.soNumber = "";
    }
    delete newState.saleOrderItems;
    this.setState({
      ...this.state,
      ...newState,
    }, () => {
      this.calculateTotal(this.state.lines)
    })
    // this.calculateTotal(newState.lines);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.SalesOrderProduct.data !== this.props.SalesOrderProduct.data) {

      if (
        this.props.SalesOrderProduct.data &&
        this.props.SalesOrderProduct.data.id
      ) {
        const { state } = this.props.history.location
        if (typeof state === 'undefined') {

          this.props.history.push(
            salesOrderEditPage(this.props.SalesOrderProduct.data.id),
          )
        }
        if (!this.state.isDuplicate) {
          console.log('come here for no duplicate')
          if (
            this.props.match.params.id !== this.props.SalesOrderProduct.data.id
          ) {
            this.props.history.push(
              salesOrderEditPage(this.props.SalesOrderProduct.data.id),
            )
          }
        }

        // removing the id prevents quotation bug from happening
        if (this.state.isDuplicate) {

          this.resetTotalState(false);
          this.setState({
            soNumber: "",
            id: "",
            quotation: "",
            quoRef: "",
          })
        }
        else {
          this.resetTotalState(true);
          if (this.props.SalesOrderProduct.data.latestSalesOrder === false || this.props.SalesOrderProduct.data.isConverted === true) {
            // console.log("editing page");
            this.setState({
              disableEdit: true,
              customerButtonShow: false,
            })
          }
        }
      }
    }

    // this section sets custId and CustNo into state to prevent submission error 
    // after user creates a new customer from create customer btn modal 
    if (prevProps.singleCustomer.data !== this.props.singleCustomer.data) {
      if (this.props.singleCustomer.data && this.props.singleCustomer.data.cusNo) {
        // console.log("WAHOOOO", this.props.singleCustomer.data.cusNo);
        this.setState({ custNo: this.props.singleCustomer.data.cusNo })
      }

      if (this.props.singleCustomer.data && this.props.singleCustomer.data.id) {
        this.setState({ custId: this.props.singleCustomer.data.id })
      }

    }

    // gets discountAmt summary to appear 
    if (prevProps.SalesOrderProduct.data !== this.props.SalesOrderProduct.data) {
      if (this.props.SalesOrderProduct.data && this.props.SalesOrderProduct.data.discountAmt) {
        // console.log("ASDASD", this.props.SalesOrderProduct.data.discountAmt)
        this.setState({ discountAmt: this.props.SalesOrderProduct.data.discountAmt.toFixed(2) })
      }

      // caters for case where there is no discount amount and needs to recalculate total summary 
      if (this.props.SalesOrderProduct.data && this.props.SalesOrderProduct.data.discount === 0) {
        this.setState({ discountAmt: 0 }, () => {
          this.calculateTotal(this.state.lines);
        })
      }

      if (this.props.SalesOrderProduct.data && this.props.SalesOrderProduct.data.currency) {
        this.setState({ currencySymbol: this.props.SalesOrderProduct.data.currency.currencySymbol })
      }

      // gets GstAmt to appear 
      // need to check on why need to remove if (this.props.SalesOrderProduct.data && this.props.SalesOrderProduct.data.gstAmt) {
      this.setState({ gstAmt: amountRounding(2, this.props.SalesOrderProduct.data.gstAmt) })

      // this.setState({discountAmt : this.props.QuotationProduct.data.discountAmt.toFixed(2)})
    }


    // this section redirects if purchaseId is created. This.state.redirectPo will only show true when purchaseId is created. 
    // Subsequent mounts or rerenders should not change redirectPO state to true
    // redirectModal allows modal notification to show 
    if ((prevProps.SalesOrderProduct.data.purchaseId !== this.props.SalesOrderProduct.data.purchaseId) && this.state.redirectPo) {
      let id = this.props.SalesOrderProduct.data.purchaseId;
      this.props.history.push({ pathname: singlePurchase(id), state: { redirectModal: true } })
    }

    if (prevProps.QuotationDetails !== this.props.QuotationDetails) {
      this.calculateTotal(this.state.lines)
    }

    if (prevProps.SalesOrderProduct !== this.props.SalesOrderProduct) {
      this.calculateTotal(this.state.lines)
    }
  }

  getInfoSKU(productId, skuId) {
    const SKU = this.props.ProductFiltered.data;
    SKU.map((source) => {
      if (source.id == productId) {
        this.setState(prevState => ({
          lines: prevState.lines.map((eachItem, index) =>
            index == this.state.index // eachItem.num
              ? source.bom && source.bomlist ?
                {
                  ...eachItem,
                  bom: source.bom,
                  description: source.description,
                  uom: source.uom && source.uom.id,
                  BomList: source.bomlist.map(bomitem => ({
                    partNumberOne: bomitem.productData && bomitem.productData.partNumber,
                    sku: bomitem.sku,
                    product: bomitem.product,
                    descriptionTwo: bomitem.productData && bomitem.productData.description,
                    grpOne: bomitem.productData && bomitem.productData.grpOne && bomitem.productData.grpOne.name,
                    grpTwo: bomitem.productData && bomitem.productData.grpTwo && bomitem.productData.grpTwo.name,
                    size: bomitem.productData && bomitem.productData.size && bomitem.productData.size.name,
                    selOne: bomitem.productData && bomitem.productData.selOne,
                    selTwo: bomitem.productData && bomitem.productData.selTwo,
                    brand: bomitem.productData && bomitem.productData.brand && bomitem.productData.brand.name,
                    uom: bomitem.productData && bomitem.productData.uom && bomitem.productData.uom.name,
                    unitSgd: bomitem.productData && bomitem.productData.listPrice,
                    qtyTwo: bomitem.qty
                  }))
                }
                : {
                  ...eachItem,
                  sku: skuId,
                  productId: productId,
                  description: source.description,
                  partNumber: source.partNumber,
                  uom: source.uom && source.uom.id,
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

  getInfoCustomer(id) {
    const Customer = this.props.customerFiltered.data;
    Customer.map((source) => {
      if (source.id == id) {
        this.setState({
          toggle: false,
          custNo: source.cusNo && source.cusNo,
          custId: source._id && source._id,
          custName: source.name && source.name,
          incoterm: source.incoterm && source.incoterm.id,
          address: source.address ? source.address : "",
          delAddress: source.delAddress ? source.delAddress : "",
          telNo: source.cusPICtel1b ? source.cusPICtel1b : "",
          faxNo: source.cusPICMobile1a ? source.cusPICMobile1a : "",
          buyerName: source.cusPIC ? source.cusPIC : "",
          buyerEmail: source.cusPICEmail ? source.cusPICEmail : "",
          paymentTerm: source.paymentTerm && source.paymentTerm.id
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
      incoterm: data.incoterm,
      address: data.address,
      delAddress: data.delAddress,
      telNo: data.cusPICtel1b,
      faxNo: data.cusPICMobile1a,
      buyerName: data.cusPIC,
      buyerEmail: data.cusPICEmail,
      paymentTerm: data.paymentTerm,
    })
  }

  getInfoBOM(id) {
  }
  getInfoSendEmail = () => {

    // this.setState({
    //   toggle: false,
    // })
  }

  passDataBack(description, BomList, extPrice) {
    this.setState(prevState => ({
      lines: prevState.lines.map((eachItem, index) =>
        index == this.state.indexBOM // eachItem.num
          ? {
            ...eachItem,
            description: description,
            BomList: BomList,
            extPrice: parseFloat(amountRounding(2, eachItem.qty * eachItem.unitPrice)),
          }
          : eachItem
      ),
    }));
  }


  handleChange(field, value) {
    console.log(field);
    console.log(value);
    let changeState = { [field]: value };

    this.setState(changeState, () => {
      if (field == "exportLocal" || field == "currency" || field == "discount") {
        this.calculateTotal(this.state.lines)
      }
    });






  }

  handleLineChange(field, value, key) {

    if (field === "qty" || field === "unitPrice" || field === "salesNumber") {
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
    
    if (field === "salesNumber"){
      // block all symbols
      if (value.match(/[~`!@#$%^&()_={}[\]:;,.<>+\/?-]/)){
        return null
      }
      if (parseInt(value) === 0){
        value = 1;
      }
      // Check if entered value exceeds the number of lines 
      // If yes, change it to max value 
      if (parseInt(value) > lines.length){
        value = lines.length;
      }
      value === "" ? lines[key]['SN'] = "" : lines[key]['SN'] = parseInt(value)
      
      // Store final key and value before blur
      this.setState({
        key: key,
        value: value,
      })
    } else{
      lines[key][field] = value
    }

    let extPrice = lines[key].qty * parseFloat(lines[key].unitPrice);
    lines[key].extPrice = amountRounding(2, extPrice);
    this.calculateTotal(lines);
    this.setState({
      lines: lines,
    })
    console.log("handleLineChang", lines[key][field])
  }

  // onBlur for S/N fields
  _onBlur() {
    setTimeout(() => {
        if (this.state.focus) {
            this.setState({
                focus: false,
            });
        }
    }, 0);
    
    // Set value as min value if user left the input field as empty
    if (this.state.value === ""){
      this.state.lines[this.state.key].SN = 1
      this.setState({ value: 1 }, 
        () => this.calculateSN(this.state.key, this.state.value, this.state.lines));
    }
    else {
      // If no change in the field the user clicked on, 
      // set state of last key and value pair to be empty
      // Otherwise, it'll recalculate and screw things up! 
      if (this.state.lines[this.state.key] && this.state.lines[this.state.key].SN === this.state.value){
        this.setState({
          key:"",
          value:""
        })
      }
      
      // onBlur, recalculate all S/N using the new value user just keyed
      this.calculateSN(this.state.key, this.state.value, this.state.lines)
    }
  }

  // onFocus for S/N fields
  _onFocus() {
      if (!this.state.focus) {
          this.setState({
              focus: true,
          });
      }
  }

  calculateSN(key, value, lines){

    if (value !== ""){
      value = parseInt(value);
      // Record what user edited for SN
      let SNchange = {key: key, value: value};
      console.log(SNchange)
      let keyExist = false;
      let valueExist = false;
      let keyIndex = "";
      let valueIndex = "";
      for (let i = 0; i < this.state.changedSN.length; i++){
        // If user edited the same line before,
        if (this.state.changedSN[i].key === key ){
          keyExist = true;
          keyIndex = i;
        }
        // If user entered this value before, 
        if (this.state.changedSN[i].value === value ){
          valueExist = true;
          valueIndex = i;
        }
      }
      
      // Remove existing key/values first before pushing current edit
      if (keyExist){
        var filterKey = this.state.changedSN.filter(function(sn) { return sn.key !== key; }); 
        this.state.changedSN = filterKey;
      }
      if (valueExist){
        var filterVal = this.state.changedSN.filter(function(sn) { return sn.value !== value; }); 
        this.state.changedSN = filterVal;
      }
      // Push to keep track of what has been edited previously
      this.state.changedSN.push(SNchange);

      // Get arrays of keys and values separately
      let keyArray = this.state.changedSN.map(a => a.key);
      let valueArray = this.state.changedSN.map(a => a.value);
      
      // See if value keyed by user already exists 
      // E.g 1,2,3 --> keyed 3
      let index = lines.findIndex(function (x) { return x.SN == value })

      // If doesn't exist, then no change for other S/Ns, E.g. 1,2,3 --> keyed 5
      // If value exists, enter calculation process
      if (index != -1){
        let prev = 1;
        for (let i = 0; i < lines.length; i++){
          // For any other lines apart from the changed line,
          // Edit S/N to 1 for line 1 .. 2 for line 2 ... 
          // if ( i !== key){
          if ( !keyArray.includes(i) ){
            lines[i]['SN'] = prev;
            prev++;
            // while new value for current line == value user keyed in now or previously, just +1 to skip the value
            while(lines[i]['SN'] === value || valueArray.includes(lines[i]['SN'])){
              // if (valueArray.includes(lines[i]['SN'])){
              lines[i]['SN'] += 1;
              prev++;
            }
          }
          
        }
      }
      this.setState({
        lines: lines
      })
    }
  }


  addNewLine = () => {
    let lines = [...this.state.lines];
    lines.push({
      id: "",
      SN: lines.length + 1,
      description: "",
      unitPrice: 0,
      qty: 0,
      custRef: "",
      extPrice: 0,
      uom: "",
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
    l
    // Removes the specific array
    let deleted = lines.splice(index, 1)[0]
    
    // See if there were SN changes for this line previously
    let indexInChanged = this.state.changedSN.findIndex(function (x) { return x.key === index })
    // If yes, remove this SN change record
    if (indexInChanged !== -1){
      var filterKey = this.state.changedSN.filter(function(sn) { return sn.key !== index; }); 
      this.state.changedSN = filterKey;
    }

    // Edit SNchange record upon deleted of each line
    let changedSN = [...this.state.changedSN]
    let newChangedSN = []

    // If index of line deleted < key in changedSN, key -= 1
    // If value of line deleted < value in changedSN, value -= 1
    // If index of line deleted > key or value of line deleted > value in changedSN, no change!

    for (let i = 0; i < changedSN.length; i++){
      if (index < changedSN[i].key && deleted.SN < changedSN[i].value){
        let newKey = changedSN[i].key - 1
        let newValue = changedSN[i].value - 1
        newChangedSN.push({ key: newKey, value: newValue })
      }
      else if (index < changedSN[i].key){
        let newKey = changedSN[i].key - 1
        newChangedSN.push({ key: newKey, value: changedSN[i].value })
      }
      else if (deleted.SN < changedSN[i].value){
        let newValue = changedSN[i].value - 1
        newChangedSN.push({ key: changedSN[i].key, value: newValue })
      }
      else {
        newChangedSN.push(changedSN[i])
      }
    }
    this.setState({ changedSN: newChangedSN });

    this.calculateTotal(lines);
    lines.forEach((item, index) => {
      // Keep customised order 
      if (item.SN > deleted.SN){
        item.SN -= 1;
      }
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
      total += lines[i].qty * parseFloat(lines[i].unitPrice);
    };

    // For export local
    // let gst = this.state.gst;
    // if(this.props.QuotationDetails.data.gst){
    //   this.props.QuotationDetails.data.gst.forEach(item => {
    //     if (item.name == this.state.exportLocal) {
    //       gst = item.rate
    //     }
    //   })
    // }

    let gst = 0;
    if (this.props.QuotationDetails.data.gst) {
      this.props.QuotationDetails.data.gst.forEach(item => {
        if (this.state.exportLocal === "local") {
          gst = item.rate
          console.log("GSSSSSSSSSTTTTTTTTTTTTT", item.rate);
        } else {
          gst = 0
        }
      })
    }


    // alert(gst);


    // For Discount
    let discountName = "";
    let isPercentage = "";
    if (this.state.discount !== null && this.props.QuotationDetails.data.discount) {
      this.props.QuotationDetails.data.discount.forEach(item => {
        if (this.state.discount === item.value) {
          discountName = item.name;
          isPercentage = item.isPercentage;
          this.setState({ isPercentage: isPercentage });
        }
      })
    }


    // to check all this conversion 
    // For Currency
    let conversion = 1;
    // State rate will be the previous rate
    let rate = this.state.currentRate

    if (this.state.currency != null && this.props.QuotationDetails.data.currency) {
      this.props.QuotationDetails.data.currency.map(item => {
        if (item.id == this.state.currency) {
          // conversion = item.rate / rate;
          //conversion = conversion * (rate / 1);
          this.setState({
            currencyName: item.name,
            currencySymbol: item.currencySymbol
            //currentRate: item.rate,
          });
        }
      })
    }


    // let discountAmt = parseFloat((total * (this.state.discount / 100)) * conversion).toFixed(2);
    // let subTotal = (total * conversion - discountAmt).toFixed(2);
    // // let subTotal = total * conversion - discountAmount;
    // let gstAmount = parseFloat(subTotal * (gst / 100)).toFixed(2);
    // let grandTotal = (parseFloat(subTotal) + parseFloat(gstAmount)).toFixed(2);
    // let balance = (parseFloat(grandTotal) - parseFloat(this.state.downPayment)).toFixed(2);


    let discountAmt = 0;
    if (isPercentage === false){
      discountAmt = amountRounding(2, this.state.discount);
    } else {
      let calculatedDiscount = parseFloat(total) * (this.state.discount / 100) * conversion
      discountAmt = amountRounding(2, calculatedDiscount)
    }

    let subTotal = amountRounding(2, parseFloat(total) * conversion - parseFloat(discountAmt),);
    let gstAmt = amountRounding(2, parseFloat(subTotal) * parseFloat((gst / 100)))
    let grandTotal = amountRounding(2, parseFloat(subTotal) + parseFloat(gstAmt))

    this.setState({
      total: total,
      discountAmt: discountAmt,
      subTotal: subTotal,
      gstAmt: gstAmt,
      grandTotal: grandTotal,
      gst: gst
    })
  }

  checkDisabled() {
    switch (this.state.status) {
      case saleStatus.DELIVERED: {
        return false;
      }
      case saleStatus.INVOICED: {
        return false;
      }
      case saleStatus.CLOSED: {
        return false;
      }
      case saleStatus.CANCELLED: {
        return false;
      }
      default: {
        if (this.state.onEditSalesOrder == false) {
          return true
        } else {
          if (this.state.isConverted || this.state.disableEdit == true) {
            return false
          } else {
            if (this.state.view == true) { return false }
            else { return true }
          }
        }
      }
    }

  }

  showStatus() {

    if (this.state.status !== "") {
      console.log(" this.state.status", this.state.status)
      let status = this.state.status.charAt(0).toUpperCase() + this.state.status.slice(1);
      return "【 " + status + " 】";
    }
    return " "
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

  // buttonClick = (target, index) => {
  //   this.setState({
  //     index: index + 1,
  //     toggle: true,
  //     element: target,
  //     target: target,
  //     filter: {
  //       ...this.state.filter,
  //       [target]: this.state[target]
  //     }
  //   });
  //   const filt = {
  //     [target]: this.state[target],
  //   };
  //   this.props.getFilterProduct(0, 0, filt, "", "");
  // };

  buttonClick = (target, index) => {
    let targetSearch = "";
    if (this.state.lines[index].description != "") {
      targetSearch = "Desc:" + this.state.lines[index].description;
    }

    if (this.state.lines[index].partNumber) {
      targetSearch = "PartNo:" + this.state.lines[index].partNumber;
    }
    this.setState({
      index: index,
      toggle: true,
      element: target,
      // target: target,
      target: 'sku',
      targetSearch: targetSearch
    })


  };

  secondButtonClick = (target, index) => {
    this.setState({
      indexBOM: index,
      toggle: true,
      element: target,
      target: "bom",
      description: this.state.lines[index].description,
      qty: this.state.lines[index].qty,
      unitPrice: this.state.lines[index].unitPrice,
      BomList: this.state.lines[index].BomList ? this.state.lines[index].BomList : [],
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
    if (this.state.soNumber) {
      let data = {
        ...this.state,
        packingNum: this.state.packingNum,
        operationId: this.state.operationId,
        orderId: this.state.soNumber,
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

  onConfirmSalesOrder() {
    if (this.state.onEditSalesOrder === true) {
      if (!this.state.soNumber) {
        const data = {
          ...this.state,
          status: 'open',
          salesOrderItems: this.state.lines,
        }
        // this.setState({
        //   status: 'confirmed',
        // })

        this.setState({
          isDuplicate: false,
          redirectPo: true
        })
        this.props.patchSingleSkuSalesOrderRequest(data)
      } else {
        alert('This Sales Order was already confirmed')
      }
    } else {
      alert('You must save this sales order in order to execute confirm')
    }
    console.log("onConfirmSalesOrder+++++++++++++++++++++++++++++++")
  }

  onCreateNewVersionSalesOrder() {
    this.props.setNewVersionSalesOrderRequest(this.state.id)
    if (this.state.onEditSalesOrder === true) {
      if (this.state.soNumber) {
        if (this.state.latestSalesOrder) {
          this.props.setNewVersionRequest(this.state.id)
        } else {
          alert('you have created new version')
        }
      } else {
        alert('You must confirm quotation before create new Version')
      }
    } else {
      alert('You must save this sales order in order to execute confirmation')
    }
    console.log("CreateNewVersionSalesOrder+++++++++++++++++++++++++++++++")
  }
  onBackToListView = () => {
    this.props.history.push('/app/crm/salesOrder')
    // this.props.history.push(quotationListPage)
    // window.history.back(-1)
  }

  onPrintPdf() {
    const salesOrderId = this.props.match.params.id;
    this.props.getPdfCreate(salesOrderId)
  }
  onPrintProformaInvoice = ()=>{
    let id = this.props.match.params.id;
    console.log("onPrintProformaInvoice  passData:",id)
    this.props.getProformaInvoicePdf(id)
  }
  onPrintCommercialInvoice = () => {
    let id = this.props.match.params.id;
    console.log("onPrintCommercialInvoice  passData:",id)
    this.props.getCommercialInvoicePdf(id)
  }

  onCreatePackingOrder = () => {
    console.log("onCreatePackingOrder")
    alert("onCreatePackingOrder")
  }

  onCreateDeliveryOrder = () => {
    // console.log("onCreateDeliveryOrder")
    // alert("onCreateDeliveryOrder")
    this.setState({ doToggle: true })
  }

  closeDeliveryModal = () => {
    this.setState({ doToggle: false })
  }

  onInvoicing = () => {
    this.props.history.push({ pathname: singleTfesInvoice(this.state.id), state: { so: true } })
  }

  onSendEmail = (target) => {
    this.setState({
      toggle: true,
      element: target,
      target: 'sendEmail',
    })
  }

  onChangeToEdit = () => {
    this.setState({
      disableEdit: false,
      view: false,
    })
  }
  OnUpdatePurchase = () => {
    this.setState({
      toggle: false,
      status: 'open',
    });

    // this.onSubmit()

  }
  onTestPopUP = (target) => {
    this.setState({
      target: "pruchasePopup",
      toggle: true,
      element: target,
    })
  }
  onCancelSalesOrder = () => {
    alert("onCancelSalesOrder")
  }

  render() {
    const { soNumber, date, salesPic, custNo, incoterm, custName, address, delAddress, currency, currencyName, currencySymbol, telNo, faxNo, target, disableEdit, custPoNum, view, deliveryRemark, prices, validity, leadTime } = this.state;
    const { paymentTerm, buyerName, buyerEmail, exportLocal, SN, custRef, description, qty, unitPrice, extPrice, discount, uom, remarks, summary, toggleFormSelection, changeToEdit, quoRef, page, freightAmount } = this.state;
    const { brands, materials, loading } = this.props.ProductDetails;
    const totalPages = Math.ceil(this.state.lines.length / PAGE_MAX);
    let userlist = this.props.picUserList.data.map(user => ({ name: user.firstName + " " + user.lastName, value: user.id }))
    // console.log("state",this.props.history.location.state.view)
    // const{view} =this.props.history.location.state
    // console.log("view",view)
    return (
      <React.Fragment>
        {this.props.SalesOrderProduct.loading ? (
          <RctSectionLoader />
        ) : (
          // {loading && <RctSectionLoader />}
          <FormWrapper
            onSave={this.onSubmit}
            onChangeToEdit={this.onChangeToEdit}
            disabled={this.checkDisabled()}
            title="Back to All Sales Order"
            centerTitle={this.state.onEditSalesOrder ? 'Update Sales Order Page' : 'Create New Sales Order Page'}
            edit="test"
            promptMessage={this.showStatus()}
            listRedirect={acctSalesListPage}
            showEditButton={this.state.disableEdit}
          // showDuplicateButton={this.state.onEditSalesOrder}
          >
            {/* {(this.state.disableEdit && !this.state.view) && <div onClick={this.onChangeToEdit} className="onChangeToEdit_btn"  >
              <button className="primary_btn"> Edit  </button>
            </div>} */}
            <form autoComplete="off">
              <div style={{ marginLeft: "2.5rem" }} className={(this.state.disableEdit || this.state.view) && "uneditable"} >
                <div class="top-container">
                  {this.state.errorMsg && (<h4 class="text-danger text-center">{this.state.errorMsg}</h4>)}
                  <div class="row">
                    <div class="col-sm-4 " >
                      <FormInput
                        label="Sales Order Ref"
                        value={this.state.isDuplicate ? "" : soNumber}
                        target="soNumber"
                        handleChange={this.handleChange}
                        readOnly={true}
                        isToggledEditForm={toggleFormSelection}
                        original={this.props.SalesOrderProduct.data.soNumber ? this.props.SalesOrderProduct.data.soNumber : ""}
                      />
                    </div>
                    <div class="col-sm-4">
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
                        value={`${formatDate(this.state.createdDate, 'L', 'en-SG')}`}
                        format="L"
                        selectedDay={this.state.day}
                        placeholder={`${formatDate(new Date(), 'L', 'en-SG')}`}
                        onDayChange={(e) => this.setState({ createdDate: e })}
                        dayPickerProps={{
                          locale: 'en-SG',
                          localeUtils: MomentLocaleUtils,
                        }}
                      />
                    </div>
                    <div class="col-sm-4">
                      <FormInput
                        label="Sales PIC"
                        value={salesPic}
                        target="salesPic"
                        buttonClick={this.buttonClick}
                        selectValues={userlist}
                        handleChange={this.handleChange}
                        readOnly={disableEdit}
                        isToggledEditForm={toggleFormSelection}
                        // Default value is logged-in users for new forms.
                        original={this.props.SalesOrderProduct.data.salesPic ? this.props.SalesOrderProduct.data.salesPic : this.props.loginUser._id}
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-4" >
                      <FormInput
                        label="Customer Number"
                        value={custNo}
                        target="custNo"
                        handleChange={this.handleChange}
                        readOnly={true}
                        isToggledEditForm={toggleFormSelection}
                        original={this.props.SalesOrderProduct.data.custNo ? this.props.SalesOrderProduct.data.custNo : ""}
                      />
                    </div>
                    <div class="col-sm-4 ">
                      <FormInput
                        label="Customer PO Number"
                        value={custPoNum}
                        target="custPoNum"
                        handleChange={this.handleChange}
                        readOnly={disableEdit}
                        isToggledEditForm={toggleFormSelection}
                        original={this.props.SalesOrderProduct.data.custPoNum ? this.props.SalesOrderProduct.data.custPoNum : ""}
                      />
                    </div>
                    <div class="col-sm-4 ">
                      <FormInput
                        label="Incoterm "
                        value={incoterm}
                        target="incoterm"
                        selectValueKey="id"
                        // selectValueName="incoterm"
                        selectValues={this.props.QuotationDetails.data ? this.props.QuotationDetails.data.incoterm : []}
                        handleChange={this.handleChange}
                        readOnly={disableEdit}
                        isToggledEditForm={toggleFormSelection}
                        original={this.props.SalesOrderProduct.data.incoterm ? this.props.SalesOrderProduct.data.incoterm.id : ""}
                      />
                    </div>
                  </div>


                  <div class="row">
                    <div class="col-sm-8 ">
                      <FormInput
                        label="Customer Name"
                        value={custName}
                        target="custName"
                        buttonClick={this.searchCustomer}
                        hasButton={!this.state.view}
                        thirdButton={!this.state.view}
                        thirdButtonClick={() =>
                          this.thirdButtonClick('createCus')
                        }
                        // isToggledEditForm={toggleFormSelection}
                        handleChange={this.handleChange}
                        readOnly={disableEdit}
                        isToggledEditForm={toggleFormSelection}
                        original={this.props.SalesOrderProduct.data.custName ? this.props.SalesOrderProduct.data.custName : ""}
                      />
                    </div>
                    <div className="col-sm-4">
                      <FormInput
                        label="Currency"
                        value={currency}
                        target="currency"
                        selectValueKey="id"
                        selectValueName="name"
                        selectValues={this.props.QuotationDetails.data ? this.props.QuotationDetails.data.currency : []}
                        handleChange={this.handleChange}
                        // readOnly={disableEdit}isToggledEditForm={toggleFormSelection} />
                        isToggledEditForm={toggleFormSelection}
                        originalVal={
                          this.props.SalesOrderProduct.data
                            ? this.props.SalesOrderProduct.data.currency
                            : ""
                        }
                        readOnly={disableEdit}
                        original={this.props.SalesOrderProduct.data.currency ? this.props.SalesOrderProduct.data.currency.id : ""}
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-sm-4" >
                      <FormInput
                        label="Address"
                        value={address}
                        target="address"
                        multiline
                        rows={3}
                        handleChange={this.handleChange}
                        readOnly={disableEdit}
                        isToggledEditForm={toggleFormSelection}
                        original={this.props.SalesOrderProduct.data.address ? this.props.SalesOrderProduct.data.address : ""} />
                    </div>
                    <div class="col-sm-4" >
                      <FormInput
                        label="Delivery Address"
                        value={delAddress}
                        target="delAddress"
                        multiline
                        rows={3}
                        handleChange={this.handleChange}
                        readOnly={disableEdit}
                        isToggledEditForm={toggleFormSelection}
                        original={this.props.SalesOrderProduct.data.delAddress ? this.props.SalesOrderProduct.data.delAddress : ""} />
                    </div>
                    <div class="col-sm-4 ">
                      <FormInput
                        label="Delivery Remarks"
                        value={deliveryRemark}
                        target="deliveryRemark"
                        multiline
                        rows={3}
                        handleChange={this.handleChange}
                        isToggledEditForm={toggleFormSelection}
                        readOnly={disableEdit}
                        original={this.props.SalesOrderProduct.data.deliveryRemark ? this.props.SalesOrderProduct.data.deliveryRemark : ""}
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-4 ">
                      <FormInput
                        label="Fax. Number"
                        value={faxNo}
                        target="faxNo"
                        handleChange={this.handleChange}
                        readOnly={disableEdit}
                        isToggledEditForm={toggleFormSelection}
                        original={this.props.SalesOrderProduct.data.faxNo ? this.props.SalesOrderProduct.data.faxNo : ""}
                      />
                    </div>
                    <div class="col-sm-4 ">
                      <FormInput
                        label="Tel. Number"
                        value={telNo}
                        target="telNo"
                        handleChange={this.handleChange}
                        readOnly={disableEdit}
                        isToggledEditForm={toggleFormSelection}
                        original={this.props.SalesOrderProduct.data.telNo ? this.props.SalesOrderProduct.data.telNo : ""}
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
                        readOnly={disableEdit}
                        isToggledEditForm={toggleFormSelection}
                        original={this.props.SalesOrderProduct.data.paymentTerm ? this.props.SalesOrderProduct.data.paymentTerm.id : ""}
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
                        original={this.props.SalesOrderProduct.data.buyerName ? this.props.SalesOrderProduct.data.buyerName : ""}
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
                        original={this.props.SalesOrderProduct.data.buyerEmail ? this.props.SalesOrderProduct.data.buyerEmail : ""}
                      />
                    </div>

                    <div class="col-sm-4">
                      <FormInput
                        label="Export / Local"
                        value={exportLocal}
                        target="exportLocal"
                        selectValues={[{ name: "Export", value: "export" }, { name: "Local", value: "local" }]}
                        handleChange={this.handleChange}
                        readOnly={disableEdit}
                        isToggledEditForm={toggleFormSelection}
                        // Default value is local for new forms.
                        original={this.props.SalesOrderProduct.data.exportLocal ? this.props.SalesOrderProduct.data.exportLocal : "local"}
                      />
                    </div>
                    <div class="boundary-line" style={{ width: "100%", height: "2px", backgroundColor: "#c0c0c0", margin: "20px auto " }}></div>

                  </div>
                </div>
                <div class="bottom-container">
                  <QuotationProductLine
                    lines={this.state.lines}
                    page={this.state.page}
                    deleteLine={this.deleteNewLine}
                    handleLineChange={this.handleLineChange}
                    toggleFormSelection={toggleFormSelection}
                    buttonClick={(target, index) => this.buttonClick(target, index)}
                    secondButtonClick={(target, index) => this.secondButtonClick(target, index)}
                    disableEdit={this.state.disableEdit}
                    buttonShow={!this.state.view}
                    secondButtonShow={!this.state.view}
                    dataDetails={this.props.QuotationDetails.data}
                    originalData={this.props.SalesOrderProduct.data.salesOrderItems}
                    onBlur={this._onBlur}
                    onFocus={this._onFocus}
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
                    <p>{page} of{totalPages}</p>
                    <div>
                      <Icon
                        icon={fastForwardButton}
                        className="fastForwardButton"
                        onClick={this.forwardToNextQty}
                      />
                    </div>
                    <p>Next Qty #</p>
                  </div>
                </div>

                <div class="boundary-line" />
                <div class="row">
                  <div class="col-sm-8">

                    <div className="col">
                      <FormInput
                        label="Prices"
                        value={prices}
                        target="prices"
                        handleChange={this.handleChange}
                        readOnly={disableEdit}
                        isToggledEditForm={toggleFormSelection}
                        original={this.props.SalesOrderProduct.data.prices ? this.props.SalesOrderProduct.data.prices : ""}
                      />

                      <FormInput
                        label="Lead Time"
                        value={leadTime}
                        target="leadTime"
                        handleChange={this.handleChange}
                        readOnly={disableEdit}
                        isToggledEditForm={toggleFormSelection}
                        original={this.props.SalesOrderProduct.data.leadTime ? this.props.SalesOrderProduct.data.leadTime : ""}
                      />

                      <FormInput
                        label="Validity"
                        value={validity}
                        target="validity"
                        handleChange={this.handleChange}
                        readOnly={disableEdit}
                        isToggledEditForm={toggleFormSelection}
                        original={this.props.SalesOrderProduct.data.validity ? this.props.SalesOrderProduct.data.validity : ""}
                      />

                      <FormInput
                        label="Remarks"
                        value={remarks}
                        target="remarks"
                        multiline
                        rows={4}
                        handleChange={this.handleChange}
                        readOnly={disableEdit}
                        isToggledEditForm={toggleFormSelection}
                        original={this.props.SalesOrderProduct.data.remarks ? this.props.SalesOrderProduct.data.remarks : ""}
                      />

                      <FormInput
                        label="Freight Amount"
                        value={freightAmount}
                        target="freightAmount"
                        handleChange={this.handleChange}
                        readOnly={disableEdit}
                        isToggledEditForm={toggleFormSelection}
                        original={this.props.SalesOrderProduct.data.freightAmount ? this.props.SalesOrderProduct.data.freightAmount : ""}
                      />
                    </div>
                  </div >

                  <div class="col-sm-4">
                    <div class="col">
                      <FormInput
                        label="Discount"
                        value={discount}
                        target="discount"
                        selectValues={
                          this.props.QuotationDetails.data
                            ? this.props.QuotationDetails.data.discount
                            : []
                        }
                        handleChange={this.handleChange}
                        readOnly={disableEdit}
                        isToggledEditForm={toggleFormSelection}
                        original={this.props.SalesOrderProduct.data.discount ? this.props.SalesOrderProduct.data.discount : ""}
                      />
                    </div>
                    <div class="col quoSummary">
                      <div class="quoSummary-title">
                        <h3>Summary</h3>
                      </div>
                      <div class="quoSummary-content">
                        <h3>Discount ({currencySymbol})</h3>
                        <p>{this.state.discountAmt}</p>
                        <h3>Subtotal, after Discount({currencySymbol})</h3>
                        <p>{this.state.subTotal}</p>
                        <h3>GST ({currencySymbol})</h3>
                        <p>{this.state.gstAmt}</p>
                        <h3>Grand Total, with GST ({currencySymbol})</h3>
                        <p>{this.state.grandTotal}</p>
                        {this.state.woStatus === "completed" && (<React.Fragment><h3>Gross profit (%)</h3>
                          <p>{this.state.profit}</p>
                          <table class="table table-bordered">
                            <tr><th>SKU</th><th>Qty</th><th>Total Cost</th></tr>
                            {this.state.profitDetails.map(item => (<tr><td>{item.skuInfo}</td><td>{item.qty}</td><td>{"$" + amountRounding(2, item.totalCost)}</td></tr>))}
                          </table>
                        </React.Fragment>)}


                      </div>
                    </div>
                  </div>


                </div>
              </div>
              {
                this.state.onEditSalesOrder &&
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
                        <div onClick={this.onPrintPdf}>
                          <PrintTwoToneIcon />
                          <span> Print SO </span>
                        </div>

                        <div onClick={this.onPrintProformaInvoice}>
                          <PrintSharpIcon />
                          <span> Print Proforma Invoice </span>
                        </div>

                        <div onClick={this.onPrintCommercialInvoice}>
                          <PrintOutlinedIcon />
                          <span> Print Commercial Invoice</span>
                        </div>

                        

                        {this.state.status != saleStatus.DRAFT &&
                          <div onClick={this.onInvoicing}>
                            <ReceiptSharpIcon />
                            <span> Invoicing </span>
                          </div>
                        }


                        <div onClick={this.onBackToListView}>
                          <ArrowBackIcon />
                          <span>Back to Sales Order</span>
                        </div>

                      </div>
                    </Toolbar>
                  </AppBar>
                </div>

              }

            </form>
            <DialogRoot show={this.state.toggle} handleHide={this.restartToggle} size={"lg"}>
              {this.state.target === "custName" ? (

                <div>
                  <h3>Customer List</h3>
                  <TfesCustomerList
                    getInfo={this.getInfoCustomer} />
                </div>) : (this.state.target === 'createCus')
                ? (<div><CreateCustomer
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
                        passData={this.passDataBack} /> </div>) : this.state.target === 'sku' ? (
                          <div>
                            <SkuList getInfo={this.getInfoSKU} searchText={this.state.targetSearch} />
                          </div>)
                  : this.state.target == "pruchasePopup"
                    ?
                    (<div>
                      <div class="row"><h2 style={{
                        margin: "20px auto", color: "#254065 ", letterSpacing: "2px"
                      }}>Purchase Items</h2>
                      </div>
                      <PurchaseItemLine
                        supplierItems={this.props.ProductDetails.data}
                        state={this.props.SalesOrderProduct}
                      />
                      <div class=" " >
                        <button
                          className="primary_btn"
                          onClick={this.OnUpdatePurchase}
                          type="button"
                        >
                          Update
                            </button>
                      </div>

                    </div>)
                    : []}
            </DialogRoot>

          </FormWrapper>
        )
        }
      </React.Fragment >
    );
  }
}

const mapStateToProps = ({ quotationtfesState, producttfesState, customertfesState, salesorderState, packinglistState, userState, sessionState, purchasetfesState }) => {
  const { Quotations, QuotationDetails } = quotationtfesState;
  const { ProductDetails, ProductFiltered } = producttfesState;
  const { customerFiltered, singleCustomer } = customertfesState;
  const { SalesOrderProduct } = salesorderState;
  const { packingList } = packinglistState;
  const { picUserList } = userState;
  const loginUser = sessionState.authState.user;
  const { Purchases, singlePurchase, PurchaseDetails } = purchasetfesState;
  return { packingList, Quotations, QuotationDetails, ProductDetails, ProductFiltered, customerFiltered, singleCustomer, SalesOrderProduct, picUserList, loginUser };
};
export default connect(mapStateToProps, { setSalesOrder, setSalesOrderRequest, setQuotation, getQuotationDetails, getFilterQuotation, setProduct, getProductDetails, getFilterProduct, patchSingleSkuSalesOrderRequest, getSingleSkuSalesOrderRequest, setNewVersionSalesOrderRequest, savePACKINGForm, getPdfCreate, getPicUsers ,getProformaInvoicePdf, getCommercialInvoicePdf })(crm_new_salesOrder);
