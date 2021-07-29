import React, { Component } from 'react'

import { connect } from 'react-redux'
import FormWrapper from 'Components/Form/Layout/FormWrapper'
import FormInput from 'Components/Form/FormInput'
import DialogRoot from 'Components/Dialog/DialogRoot'
import ProductLine from 'Components/ProductLine/ProductLine'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { singlesupplier, singlePurchase } from 'Helpers/crmURL'

import RctPageLoader from 'Components/RctPageLoader'
// import PrintButton from "Components/Form/FormButtons";

import Product_list from '../../../warehouse/SKU/new/components/productList'
import SupplierList from '../../supplier/new/components/supplierList'
import RedirectModal from "./components/RedirectModal";

// Icon & material-ui
import { Icon } from "@iconify/react";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import fastReverseButton from '@iconify-icons/emojione-v1/fast-reverse-button';
import fastForwardButton from '@iconify-icons/emojione-v1/fast-forward-button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import EmailIcon from '@material-ui/icons/Email';
import PrintSharpIcon from '@material-ui/icons/PrintSharp';
import ThumbupAlt from '@material-ui/icons/ThumbUpAlt';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ReceiptSharpIcon from '@material-ui/icons/ReceiptSharp';

// React Day Picker input

import DayPickerInput from 'react-day-picker/DayPickerInput';
import dateFormat from "Components/StandardFormat/DateFormat";
import { purchaseStatus } from 'Constants/modelStatus';
import NumberFormat from 'react-number-format';
import { amountRounding } from "Helpers/helpers";
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import moment from 'moment';
import 'moment/locale/en-SG';
// Redux imports

import {
  setSupplier,
  getSupplierDetails,
  getSingleSupplierRequest,
  patchSingleSupplierRequest,
  getFilterSupplier,
  setDuplicate,
} from 'Ducks/suppliertfes'
import {
  setPurchase,
  patchSinglePurchaseRequest,
  getSinglePurchaseRequest,
  getPurchaseDetails,
  getPdfCreate,
  deletePurchase
} from 'Ducks/purchasetfes'
import { getPicUsers } from 'Ducks/user';

import { supplierInvoiceNewPage, singleSupplierInvoice } from "Helpers/accountingURL";
import { purchaseListPage } from "Helpers/crmURL";
import { purchaseNewPage } from '../../../../helpers/crmURL'

const PAGE_MAX = 10;

class crm_new_purchase extends Component {
  constructor(props) {
    super(props)
    this.state = {
      purchasePic: props.loginUser && props.loginUser._id,
      suppNo: "",
      purchaseType: "",
      name: "",
      incoterm: "",
      address: "",
      delAddress: "",
      telNo: "",
      faxNo: "",
      currency: "",
      buyerName: "",
      buyerEmail: "",
      paymentTerm: [],
      quoRef: "",
      discount: "",
      status: "",
      Amount: "",
      poNumber: "",
      description: "",
      uom: "",
      qty: "",
      suppId: "",
      unitPrice: "",
      extPrice: "",
      summary: '',
      discountAmount: 0,
      isPercentage: true,
      gst: 7,
      subTotal: 0,
      grandTotal: 0,
      gstAmount: 0,
      exportLocal: "local",
      lines: [
        {
          id: '',
          SN: 1,
          unitPrice: 0,
          description: '',
          qty: 0,
          poNumber: '',
          extPrice: 0,
          uom: '',
        },
      ],
      page: 1,
      remarks: "",
      total: 0,
      index: 0,
      indexBOM: 0,
      target: "",
      bom: "",
      toggle: false,
      element: null,
      toggleFormSelection: true,
      edit: false,
      disableEdit: false,
      view: false,
      isDuplicate: false,
      createdDate: new Date(),
      delDate: new Date(),
      errorMsg: '',
      redirectModal: false,
      changedSN: [],
      focus: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.getInfoProduct = this.getInfoProduct.bind(this);
    this.getInfoSKU = this.getInfoSKU.bind(this);
    this.getInfoSupplier = this.getInfoSupplier.bind(this);
    this.resetTotalState = this.resetTotalState.bind(this);
    this._onBlur = this._onBlur.bind(this)
    this._onFocus = this._onFocus.bind(this)
    this.calculateSN = this.calculateSN.bind(this)
  }
  onSubmit() {

    // if user never click elsewhere after editing the S/N before submitting, 
    // Help user to onBlur, to recalculate the SN
    if (this.state.focus){
      this._onBlur();
    }

    // validation check to see item has product ID before being submitted 
    for (let i = 0; i < this.state.lines.length; i++) {
      if (!this.state.lines[i].productId) {
        this.setState({ errorMsg: "Please select item from search!" });
        return null
      } else if (this.state.lines[i].qty <= 0 || this.state.lines[i].qty === '') {
        this.setState({ errorMsg: 'Qty cannot be 0!' })
        return null
      } else if (this.state.lines[i].unitPrice < 0 || this.state.lines[i].unitPrice === '') {
        this.setState({ errorMsg: 'Unit price cannot be negative!'})
        return null
      }
    }

    //check if suppNo is not empty
    if (this.state.suppNo == '') {
      this.setState({
        errorMsg: "Supplier not selected yet!"
      })
    } else {
      const data = {
        ...this.state,
        purchaseOrderItems: this.state.lines,
      };

      delete data.toggle;
      delete data.toggleFormSelection;
      delete data.edit;
      delete data.element;
      delete data.errorMsg;
      delete data.page;
      delete data.lines;
      delete data.key
      delete data.value
      delete data.changedSN

      // If telThree/update onSubmit
      if (this.state.edit && this.state.isDuplicate !== true) {
        data.id = this.state.id;
        console.log('what is data', data)
        this.props.patchSinglePurchaseRequest(data)
        // alert("patchSinglePurchaseRequest")
      } else {

        // If Save as new onSubmit
        this.props.setPurchase(data)
        // alert("setPurchase")
      }
      this.setState({
        errorMsg: ""
      })
    }
    this.setState({
      disableEdit: true,
      toggleFormSelection: true,
      isDuplicate: false,
      changedSN:[]
    })
  }
  getInfoSKU(productId) {
    const SKU = this.props.ProductFiltered.data;
    SKU.map((source) => {
      if (source.id == productId) {
        // console.log(source);
        this.setState((prevState) => ({
          lines: prevState.lines.map((eachItem, index) =>
            index == this.state.index
              ? {
                ...eachItem,
                description: source.description,
                productId: productId,
                uom: source.uom && source.uom.id,
                partNumber: source.partNumber,

                // IF CURRENT UNIT PRICE == 0 (user didn't key anything previously), Change to default unit price for item!
                // Otherwise, IF Retain User input 
                unitPrice:
                  this.state.lines[index].unitPrice == 0
                    ? source.unitCost
                      ? amountRounding(2, source.unitCost)
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
              : eachItem,
          ),
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
        })
      }
    });
  }
  getInfoSupplier(id) {
    const Supplier = this.props.SupplierFiltered.data;
    Supplier.map((source) => {


      let gst = 0;
      if (this.props.PurchaseDetails) {
        this.props.PurchaseDetails.data.gst.forEach((item) => {
          //assumption that GST array will only have 1 setting 
          if (source.gstReq && source.gstReq.name === "With GST") {
            gst = item.rate
          }
        })
      }

      // console.log(source)
      if (source.id === id) {
        this.setState({
          ...this.state,
          toggle: false,
          suppNo: source.suppId,
          suppId: source._id && source._id,
          purchasePic: source.tfesPIC && source.tfesPIC,
          name: source.name,
          address: source.address ? source.address : '',
          delAddress: source.delAddress ? source.delAddress : '',
          telNo: source.tel1b ? source.tel1b : '',
          faxNo: source.fax1b ? source.fax1b : '',
          buyerName: source.salesPIC ? source.salesPIC : '',
          buyerEmail: source.salesPICEmail ? source.salesPICEmail : '',
          incoterm: source.incoterm ? source.incoterm.id : undefined,
          currency: source.billingCurrent ? source.billingCurrent.id : undefined,
          paymentTerm: source.paymentTerm ? source.paymentTerm.id : "",
          gst: source.gstReq && source.gstReq.name === "With GST" ? gst : 0,
          exportLocal: source.gstReq && source.gstReq.name === "With GST" ? "local" : "export"
        }, () => {
          let lines = [...this.state.lines];
          this.calculateTotal(lines)
        })
      }

      // debugger
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
  };

  handleChange(field, value) {
    this.setState({ [field]: value }, () => {
      if (field == "currency" || field == "discount" || field == "exportLocal") {
        this.calculateTotal(this.state.lines);
      }
    });
  }
  handleLineChange = (field, value, key) => {
    // first layer validtion, checks if input value is alpabet
    // https://stackoverflow.com/questions/9862761/how-to-check-if-character-is-a-letter-in-javascript
    if (field === "qty" || field === "unitPrice" || field === "SN") {
      if (value.length >= 1 && value.match(/[a-z\s]/i)) {
        return null
      }
    }

    // sets minimum qty 
    // if (field === "qty") {
    //   if (value === "" || value == 0) {
    //     value = 1
    //   }
    // }

    // sets minimum unitPrice 
    // if (field === "unitPrice") {
    //   if (value === "" || value <= 0) {
    //     value = 0
    //   }
    // }

    let lines = [...this.state.lines]

    if (field === "SN"){
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
    
    let extPrice = amountRounding(2, lines[key].qty * parseFloat(lines[key].unitPrice))
    if (isNaN(extPrice)) {
      extPrice = 0;
    }

    lines[key].extPrice = extPrice
    this.calculateTotal(lines)

    this.setState({
      lines: lines
    })

    this.setState({
      toggle: false
    })
  };

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
      poNumber: "",
      extPrice: 0,
      uom: "",
    });

    let page = Math.ceil(lines.length / PAGE_MAX);

    this.setState({
      lines: lines,
      page: page
    })
  };

  deleteNewLine = (index) => {
    let lines = [...this.state.lines];
    // Get deleted amount first then delete
    //this.deleteAmount(lines, index);

    // Removes the specific array
    let deleted = lines.splice(index, 1)[0];

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

    // this.calculateTotal(lines)
    lines.forEach((item, index) => {
      // Keep customised order 
      if (item.SN > deleted.SN){
        item.SN -= 1
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
  };

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

  componentDidMount() {
    this.props.getPurchaseDetails();
    //this.props.getPicUsers();
    const purchaseId = this.props.match.params.id;
    if (purchaseId) {
      this.props.getSinglePurchaseRequest(purchaseId)
    }

    if (this.props.singlePurchase.data) {
      this.resetTotalState()
    }

    if (this.props.history.location.state && this.props.history.location.state.redirectModal) {
      this.setState({ redirectModal: true })
    }
    if (typeof this.props.history.location.state !== "undefined") {
      if (this.props.location.state.isDuplicate != "") {
        let isDuplicate = this.props.location.state.isDuplicate
        this.resetTotalState(true)
        this.setState({
          isDuplicate: isDuplicate,
          toggleFormSelection: isDuplicate ? false : true,
          disableEdit: false,
        })
      }
    }
    if (typeof this.props.history.location.state !== "undefined") {
      if (this.props.location.state.view != "") {
        let view = this.props.location.state.view
        this.resetTotalState(true)
        this.setState({
          view: view,
          disableEdit: view,
        })
      }
    }
  }



  calculateTotal(lines) {
    let total = 0;
    for (let i = 0; i < lines.length; i++) {
      total += lines[i].qty * lines[i].unitPrice;
    };
    // For export local
    let gst = 0;

    if (this.props.PurchaseDetails.data.gst) {
      this.props.PurchaseDetails.data.gst.forEach(item => {
        if (this.state.exportLocal === "local") {
          gst = item.rate
        } else {
          gst = 0
        }
      })
    }

    // For Discount
    let discountName = "";
    let isPercentage = ""
    if (this.state.discount !== null && this.props.PurchaseDetails.data.discounts) {
      this.props.PurchaseDetails.data.discounts.forEach((item) => {
        if (this.state.discount === item.value) {
          discountName = item.name
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

    if (this.state.currency != null && this.props.PurchaseDetails.data.currency) {
      this.props.PurchaseDetails.data.currency.map(item => {
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


    // let discountAmount = parseFloat(total * (this.state.discount / 100)).toFixed(2);
    // let subTotal = parseInt (Math.round(total - discountAmount)).toFixed(2);
    // let gstAmount = parseFloat(subTotal * (gst / 100)).toFixed(2);
    // let grandTotal = (parseFloat(subTotal) + parseFloat(gstAmount)).toFixed(2);

    let discountAmount = 0;
    console.log("isPercentage", isPercentage);
    console.log("discount", this.state.discount);
    if (isPercentage === false){
      discountAmount = amountRounding(2, this.state.discount);
    } else {
      let calculatedDiscount = parseFloat(total) * (this.state.discount / 100) * conversion
      discountAmount = amountRounding(2, calculatedDiscount)
    }

    let subTotal = amountRounding(2, parseFloat(total) * conversion - parseFloat(discountAmount),);
    let gstAmount = amountRounding(2, parseFloat(subTotal) * parseFloat((gst / 100)))
    let grandTotal = amountRounding(2, parseFloat(subTotal) + parseFloat(gstAmount))

    this.setState({
      total: total,
      discountAmount: discountAmount,
      discountName: discountName,
      subTotal: subTotal,
      gstAmount: gstAmount,
      grandTotal: grandTotal,
      gst: gst,
    })

  }
  checkDisabled() {
    if (this.state.disableEdit == true) { return false } else { return true }

  }
  showStatus() {
    if (this.state.status !== "") {
      let status = this.state.status.charAt(0).toUpperCase() + this.state.status.slice(1);
      return "【 " + status + " 】";
    }
    return " "
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.loginUser._id != this.props.loginUser._id) {
      if (this.state.purchasePic == undefined) {
        this.setState({
          purchasePic: this.props.loginUser._id
        })
      }
    }

    if (prevProps.singlePurchase.data !== this.props.singlePurchase.data) {
      if (this.props.singlePurchase.data && this.props.singlePurchase.data.id) {
        if (
          this.props.match.params.id !== this.props.singlePurchase.data.id
        ) {
          this.props.history.push(
            singlePurchase(this.props.singlePurchase.data.id),
          )
        }
        // If browser has not ID , means new page
        // Push to edit page on Save
        if (!this.props.match.params.id) {
          this.props.history.push(
            singlePurchase(this.props.singlePurchase.data.id),
          )
        }
        if (this.props.singlePurchase.data && this.props.singlePurchase.data.currency) {
          this.setState({
            currencySymbol: this.props.singlePurchase.data.currency.currencySymbol,
            currencyName: this.props.singlePurchase.data.currency.symbol,
            currentRate: this.props.singlePurchase.data.currency.currencyRate.rate
          })
        }

        let newState = {
          edit: true,
          toggleFormSelection: true,
          ...this.props.singlePurchase.data,
          incoterm: this.props.singlePurchase.data.incoterm ? this.props.singlePurchase.data.incoterm.id : undefined,
          currency: this.props.singlePurchase.data.currency ? this.props.singlePurchase.data.currency.id : undefined,
          paymentTerm: this.props.singlePurchase.data.paymentTerm ? this.props.singlePurchase.data.paymentTerm.id : "",
        };

        let lines = [];
        if (this.props.singlePurchase.data.purchaseOrderItems) {
          for (let i = 0; i < this.props.singlePurchase.data.purchaseOrderItems.length; i++) {
            let item = { ...this.props.singlePurchase.data.purchaseOrderItems[i] };
            lines.push(item);
          }
        }
        newState.lines = lines;

        this.setState({
          ...newState,
        })
        this.calculateTotal(newState.lines);
      }

      if (this.props.singlePurchase.data && this.props.singlePurchase.data.status === "partial") {
        this.setState({
          view: true,
          disableEdit: true
        })
      }
    }

    // very dangerous, we are assuming that purchasedetails is the last call to return. To look into and refactor 
    if (prevProps.PurchaseDetails.data !== this.props.PurchaseDetails.data) {
      this.calculateTotal(this.state.lines);
    }


  }
  searchSupplier = (target, index) => {
    this.setState({
      toggle: true,
      element: target,
      target: target,
      targetSearch: this.state[target]
    });
    // this.props.getFilterCustomerTfes(20, 0, [], this.state[target]);
  };
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
      target: target,
      targetSearch: targetSearch
    })
    //const filt = [{ [target]: this.state[target]}];
  };

  resetTotalState() {
    let newState = {
      toggleFormSelection: false,
      ...this.props.singlePurchase.data,
      incoterm: this.props.singlePurchase.data.incoterm ? this.props.singlePurchase.data.incoterm.id : undefined,
      currency: this.props.singlePurchase.data.currency ? this.props.singlePurchase.data.currency.id : undefined,
      paymentTerm: this.props.singlePurchase.data.paymentTerm && this.props.singlePurchase.data.paymentTerm.id ? this.props.singlePurchase.data.paymentTerm.id : "",
      currencyName: this.props.singlePurchase.data.currency && this.props.singlePurchase.data.currency.name ? this.props.singlePurchase.data.currency.name : "",
      currencySymbol: this.props.singlePurchase.data.currency && this.props.singlePurchase.data.currency.currencySymbol ? this.props.singlePurchase.data.currency.currencySymbol : undefined,
      // lines: this.props.singlePurchase.data.purchaseOrderItems ? this.props.singlePurchase.data.purchaseOrderItems : [],
      // ^ THIS IS MAKING A REFERENCE, but not a duplicate copy. Hence, change in lines will change purchaseOrderItems values in props.
    };
    // v Make a deep copy of the purchaseOrderItems by adding the values into a NEW array named lines
    let lines = [];
    if (this.props.singlePurchase.data.purchaseOrderItems) {
      for (let i = 0; i < this.props.singlePurchase.data.purchaseOrderItems.length; i++) {
        let item = { ...this.props.singlePurchase.data.purchaseOrderItems[i] };
        lines.push(item);
      }
    }
    newState.lines = lines;

    this.setState({
      ...this.state,
      ...newState,
    })
  }

  onConfirmPurchaseOrder = () => {
    if (this.state.edit === true) {
      const data = {
        ...this.state,
        status: 'open',
        purchaseOrderItems: this.state.lines,
      };
      this.props.patchSinglePurchaseRequest(data);
    } else {
    }
  };

  onCreateSupplierInvoice = () => {
    if (this.state.edit === true) {
      const data = {
        ...this.state
      }
      this.props.history.push({ pathname: supplierInvoiceNewPage, state: { data } });
    }
  }

  printPdf = () => {
    const id = this.props.match.params.id;
    this.props.getPdfCreate(id)
  }
  onBackToListView = () => {
    this.props.history.push('/app/crm/purchase')
  }
  onDeletePR = (id) => {
    this.props.deletePurchase(id)
  }
  onChangeToEdit = () => {
    this.setState({
      disableEdit: false,
      view: false,
    })
  }
  onExpenseInvoice = () => {
    this.props.history.push({ pathname: singleSupplierInvoice(this.state.id), state: { fromPo: true } })
  }
  // onDuplicate=()=>{ 
  //   this.setState({
  //     isDuplicate: true, 
  //     // edit: false,
  //     view:false,
  //     disableEdit: false,
  //     status:"draft",
  //     poNumber:"",
  //     toggleFormSelection:false
  //   })
  //   this.props.history.push(purchaseNewPage)
  // }
  render() {
    const {
      createdDate,
      purchasePic,
      suppNo,
      quoRef,
      purchaseType,
      name,
      incoterm,
      address,
      delAddress,
      telNo,
      faxNo,
      paymentTerm,
      buyerName,
      buyerEmail,
      currency,
      currencyName,
      currencySymbol,
      poNumber,
      status,
      remarks,
      discount,
      page,
      id,
      exportLocal,
      redirectModal,
      disableEdit
    } = this.state;
    const { toggleFormSelection } = this.state;
    // console.log(purchasePic);
    const totalPages = Math.ceil(this.state.lines.length / PAGE_MAX);
    return (
      <React.Fragment>
        {this.props.singlePurchase.loading ? (
          <RctPageLoader />
        ) : (
          <FormWrapper
            onSave={this.onSubmit}
            onChangeToEdit={this.onChangeToEdit}
            // onDuplicate={this.onDuplicate}
            disabled={this.checkDisabled()}
            title="Back To ALL Purchase Order "
            centerTitle={
              this.state.edit ? 'Update Purchase Order Details' : 'Add New Purchase Order'
            }
            promptMessage={this.showStatus()}
            telThree="test"
            listRedirect={purchaseListPage}
            showEditButton={this.state.disableEdit && this.state.status !== 'partial' && this.state.status !== 'closed' ? true : false}
          // showDuplicateButton={this.state.edit ?true :false}
          >
            {/* {(this.state.disableEdit && !this.state.view)&&<div onClick={this.onChangeToEdit} className="onChangeToEdit_btn"  >
              <button className="primary_btn"> Edit  </button>
              </div>} */}
            <form autoComplete="off" style={{ marginLeft: "2.5rem" }} className={this.state.disableEdit && "uneditable"}>
              <div class="top-container" >
                {this.state.errorMsg && (<h4 class="text-danger text-center">{this.state.errorMsg}</h4>)}
                <div class="row">
                  <div class="col-sm-4 ">
                    <p style={{
                      color: "rgba(0, 0, 0, 0.54)",
                      padding: "0",
                      fontSize: "0.75rem",
                      fontFamily: " Lato",
                      fontWeight: "500",
                      lineHeight: " 1",
                      marginBottom: "1px"
                    }}>Date</p>
                    <DayPickerInput
                      formatDate={formatDate}
                      parseDate={parseDate}
                      format="L"
                      value={`${formatDate(this.state.createdDate, 'L', 'en-SG')}`}
                      // value={formatDate(createdDate)}
                      selectedDay={this.state.createdDate}
                      // placeholder={`${formatDate(new Date())}`}
                      placeholder={`${formatDate(new Date(), 'L', 'en-SG')}`}
                      onDayChange={(day) => {
                        this.handleChange("createdDate", day)
                      }}
                      readOnly={disableEdit}
                      dayPickerProps={{
                        locale: 'en-SG',
                        localeUtils: MomentLocaleUtils,
                      }}
                      isToggledEditForm={toggleFormSelection}
                    />
                  </div>
                  <div class="col-sm-4 " >
                    <FormInput
                      label="PO Number"
                      value={poNumber}
                      target="poNumber"
                      handleChange={this.handleChange}
                      // readOnly={true}
                      isToggledEditForm={toggleFormSelection}
                      readOnly={disableEdit}
                      original={this.props.singlePurchase.data && this.props.singlePurchase.data.poNumber !== undefined ? this.props.singlePurchase.data.poNumber : ""}
                    />
                  </div>
                  <div class="col-sm-4">
                    <FormInput
                      label="Purchase PIC"
                      value={purchasePic}
                      target="purchasePic"
                      selectValueKey="id"
                      selectValues={this.props.PurchaseDetails.data ? this.props.PurchaseDetails.data.userlist : []}
                      handleChange={this.handleChange}
                      isToggledEditForm={toggleFormSelection}
                      readOnly={disableEdit}
                      // Set original value as KevinLow if initial value == undefined
                      original={this.props.singlePurchase.data &&  this.props.singlePurchase.data.purchasePic !== undefined ? this.props.singlePurchase.data.purchasePic : this.props.loginUser._id}
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-4" >
                    <FormInput
                      label="Supplier Number"
                      value={suppNo}
                      target="suppNo"
                      readOnly={true}
                      isToggledEditForm={toggleFormSelection}
                      original={this.props.singlePurchase.data && this.props.singlePurchase.data.suppNo !== undefined ? this.props.singlePurchase.data.suppNo : ""}
                    />
                  </div>

                  <div className="col-sm-4">
                    <p style={{
                      color: "rgba(0, 0, 0, 0.54)",
                      padding: "0",
                      fontSize: "0.75rem",
                      fontFamily: " Lato",
                      fontWeight: "500",
                      lineHeight: " 1",
                      marginBottom: "1px"
                    }}>Delivery Date</p>
                    <DayPickerInput
                      formatDate={formatDate}
                      parseDate={parseDate}
                      format="L"
                      // value={formatDate(this.state.delDate)}
                      value={`${formatDate(this.state.delDate, 'L', 'en-SG')}`}
                      selectedDay={this.state.delDate}
                      placeholder={`${formatDate(new Date())}`}
                      // placeholder={`${formatDate(new Date(), 'L', 'en-SG')}`}
                      onDayChange={(day) => {
                        this.handleChange("delDate", day)
                      }}
                      readOnly={disableEdit}
                      dayPickerProps={{
                        locale: 'en-SG',
                        localeUtils: MomentLocaleUtils,
                      }}
                      isToggledEditForm={toggleFormSelection}
                    />
                  </div>
                  <div class="col-sm-4 ">
                    <FormInput
                      label="Export / Local"
                      value={exportLocal}
                      target="exportLocal"
                      selectValues={[{ name: "Export", value: "export" }, { name: "Local", value: "local" }]}
                      handleChange={this.handleChange}
                      readOnly={disableEdit}
                      isToggledEditForm={toggleFormSelection}
                      // Set original value as local if initial value == undefined
                      original={this.props.singlePurchase.data && this.props.singlePurchase.data.exportLocal !== undefined ? this.props.singlePurchase.data.exportLocal : "local"}
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-4" >
                    <FormInput
                      label="Quotation Ref No"
                      value={quoRef}
                      target="quoRef"
                      isToggledEditForm={toggleFormSelection}
                      readOnly={disableEdit}
                      handleChange={this.handleChange}
                      original={this.props.singlePurchase.data && this.props.singlePurchase.data.quoRef !== undefined ? this.props.singlePurchase.data.quoRef : ""}
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-4" >
                    <FormInput
                      label="Supplier Name"
                      value={name}
                      target="name"
                      handleChange={this.handleChange}
                      hasButton={true}
                      buttonClick={this.searchSupplier}
                      isToggledEditForm={toggleFormSelection}
                      readOnly={disableEdit}
                      original={this.props.singlePurchase.data && this.props.singlePurchase.data.name !== undefined ? this.props.singlePurchase.data.name : ""}
                    />
                  </div>
                  <div class="col-sm-4 ">
                    <FormInput
                      label="Purchase Type"
                      value={purchaseType}
                      target="purchaseType"
                      handleChange={this.handleChange}
                      isToggledEditForm={toggleFormSelection}
                      selectValues={[
                        { name: "Trading", value: "Trading" },
                        { name: "Stocks", value: "Stocks" },
                        { name: "Expenses", value: "Expenses" },
                        { name: "Fixed Assets", value: "Fixed Assets" }
                      ]
                      }
                      readOnly={disableEdit}
                      original={this.props.singlePurchase.data && this.props.singlePurchase.data ? this.props.singlePurchase.data.purchaseType : ""}
                    />
                  </div>
                  <div className="col-sm-4 ">
                    <FormInput
                      label="Incoterm "
                      value={incoterm}
                      target="incoterm"
                      selectValueKey="id"
                      selectValueName="name"
                      selectValues={this.props.PurchaseDetails.data ? this.props.PurchaseDetails.data.incoterm : []}
                      handleChange={this.handleChange}
                      isToggledEditForm={toggleFormSelection}
                      readOnly={disableEdit}
                      original={this.props.singlePurchase.data && this.props.singlePurchase.data.incoterm ? this.props.singlePurchase.data.incoterm.id : ""}
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
                      isToggledEditForm={toggleFormSelection}
                      readOnly={disableEdit}
                      multiline={true}
                      rows={3}
                      original={this.props.singlePurchase.data && this.props.singlePurchase.data.address !== undefined ? this.props.singlePurchase.data.address : ""}
                    />
                  </div>
                  <div className="col-sm-4 ">
                    <FormInput
                      label="Delivery Address"
                      value={delAddress}
                      target="delAddress"
                      handleChange={this.handleChange}
                      isToggledEditForm={toggleFormSelection}
                      readOnly={disableEdit}
                      multiline={true}
                      rows={3}
                      original={this.props.singlePurchase.data && this.props.singlePurchase.data.delAddress !== undefined ? this.props.singlePurchase.data.delAddress : ""}
                    />
                  </div>

                </div>
                <div class="row">
                  <div class="col-sm-4 " >
                    <FormInput
                      label="Tel. Number"
                      value={telNo}
                      target="telNo"
                      handleChange={this.handleChange}
                      isToggledEditForm={toggleFormSelection}
                      readOnly={disableEdit}
                      original={this.props.singlePurchase.data && this.props.singlePurchase.data.telNo !== undefined ? this.props.singlePurchase.data.telNo : ""}
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
                      original={this.props.singlePurchase.data && this.props.singlePurchase.data.faxNo !== undefined ? this.props.singlePurchase.data.faxNo : ""}
                    />
                  </div>
                  <div class="col-sm-4">
                    <FormInput
                      label="Currency"
                      value={currency}
                      target="currency"
                      selectValueKey="id"
                      selectValueName="name"
                      selectValues={this.props.PurchaseDetails.data ? this.props.PurchaseDetails.data.currency : []}
                      handleChange={this.handleChange}
                      readOnly={disableEdit}
                      isToggledEditForm={toggleFormSelection}
                      original={this.props.singlePurchase.data && this.props.singlePurchase.data.currency ? this.props.singlePurchase.data.currency.id : ""}
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-4" >
                    <FormInput
                      label="Sales Name"
                      value={buyerName}
                      target="buyerName" handleChange={this.handleChange}
                      isToggledEditForm={toggleFormSelection}
                      readOnly={disableEdit}
                      original={this.props.singlePurchase.data && this.props.singlePurchase.data.buyerName !== undefined ? this.props.singlePurchase.data.buyerName : ""}
                    />
                  </div>
                  <div class="col-sm-4">
                    <FormInput
                      label="Sales Email"
                      value={buyerEmail}
                      target="buyerEmail"
                      handleChange={this.handleChange}
                      isToggledEditForm={toggleFormSelection}
                      readOnly={disableEdit}
                      original={this.props.singlePurchase.data && this.props.singlePurchase.data.buyerEmail !== undefined ? this.props.singlePurchase.data.buyerEmail : ""}
                    />
                  </div>
                  <div class="col-sm-4">
                    <FormInput
                      label="Payment Term"
                      value={paymentTerm}
                      target="paymentTerm"
                      selectValueKey="id"
                      selectValueName="name"
                      selectValues={this.props.PurchaseDetails.data ? this.props.PurchaseDetails.data.paymentTerm : []}
                      handleChange={this.handleChange}
                      isToggledEditForm={toggleFormSelection}
                      readOnly={disableEdit}
                      original={this.props.singlePurchase.data && this.props.singlePurchase.data.paymentTerm ? this.props.singlePurchase.data.paymentTerm.id : ""}
                    />
                  </div>
                </div>

                <div class="boundary-line">
                </div>
              </div>
              <div class="bottom-container">

                <ProductLine
                  lines={this.state.lines}
                  page={this.state.page}
                  deleteLine={this.deleteNewLine}
                  handleLineChange={this.handleLineChange}
                  toggleFormSelection={toggleFormSelection}
                  buttonClick={(target, index) => this.buttonClick(target, index)}
                  dataDetails={this.props.PurchaseDetails.data}
                  disableEdit={this.state.disableEdit}
                  originalData={this.props.singlePurchase.data && this.props.singlePurchase.data && this.props.singlePurchase.data.purchaseOrderItems}
                  onBlur={this._onBlur}
                  onFocus={this._onFocus}
                />

                <div className="row quotation-btn">
                  <AddCircleOutlineIcon
                    className="tableAddIcon"
                    onClick={this.addNewLine}
                  />
                </div>

                <div className="preQty-nextQty"
                  style={{ display: "flex", justifyContent: "flex-end" }}>
                  <p>Pre Qty #</p>
                  <div>
                    <Icon icon={fastReverseButton}
                      className="fastReverseButton"
                      onClick={this.reverToPreQty}
                    />
                  </div>
                  <p>{page} of {totalPages}</p>
                  <div>
                    <Icon icon={fastForwardButton}
                      className="fastForwardButton"
                      onClick={this.forwardToNextQty}
                    />
                  </div>
                  <p>Next Qty #</p>
                </div>

                <div class="boundary-line" />
                <div class="row">
                  <div class="col-sm-9 " />
                  <div class="col-sm-3 ">
                    <FormInput
                      label="Discount"
                      value={discount}
                      target="discount"
                      selectValues={this.props.PurchaseDetails.data ? this.props.PurchaseDetails.data.discounts : []}
                      handleChange={this.handleChange}
                      isToggledEditForm={toggleFormSelection}
                      readOnly={disableEdit}
                      original={this.props.singlePurchase.data && this.props.singlePurchase.data ? this.props.singlePurchase.data.discount : ""}
                    />
                  </div>

                </div>
                <div class="row">
                  <div className="col-sm-8 ">
                    <FormInput
                      label="Remarks"
                      value={remarks}
                      target="remarks"
                      multiline
                      rows={4}
                      handleChange={this.handleChange}
                      readOnly={disableEdit}
                      isToggledEditForm={toggleFormSelection}
                      original={this.props.singlePurchase.data && this.props.singlePurchase.data.remarks !== undefined ? this.props.singlePurchase.data.remarks : ""}
                    />
                  </div>
                  <div class="col-sm-1" />
                  <div class="col-sm-3 quoSummary">
                    <div class="quoSummary-title" >
                      <h3>Summary</h3>
                    </div>
                    <div class="quoSummary-content">
                      <h3>Discount ({currencyName})</h3>
                      <p><NumberFormat value={this.state.discountAmount} displayType={'text'} thousandSeparator={true} prefix={currencySymbol} /></p>
                      <h3>Subtotal, after Discount({currencyName})</h3>
                      <p><NumberFormat value={this.state.subTotal} displayType={'text'} thousandSeparator={true} prefix={currencySymbol} /></p>
                      <h3>GST ({currencyName})</h3>
                      <p><NumberFormat value={this.state.gstAmount} displayType={'text'} thousandSeparator={true} prefix={currencySymbol} /></p>
                      <h3>Grand Total, with GST ({currencyName})</h3>
                      <p><NumberFormat value={this.state.grandTotal} displayType={'text'} thousandSeparator={true} prefix={currencySymbol} /> </p>
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
                    <div className="Left_Toolbar">

                      {this.state.status == purchaseStatus.DRAFT
                        && <div onClick={this.onConfirmPurchaseOrder}>
                          <ConfirmationNumberIcon />
                          <span> Confirm PO </span>
                        </div>}

                      {(this.state.status == purchaseStatus.REQUEST && this.props.singlePurchase.data.canApprove)
                        && <div onClick={this.onConfirmPurchaseOrder}>
                          <ThumbupAlt />
                          <span> Approve PO </span>
                        </div>}
                      <div onClick={this.printPdf}>
                        <PrintSharpIcon />
                      </div>

                      <div onClick={() => this.onDeletePR(id)}>
                        <DeleteForeverIcon />
                        <span> Delete PO </span>
                      </div>
                      {this.state.status != purchaseStatus.DRAFT &&
                        <div onClick={this.onExpenseInvoice}>
                          <ReceiptSharpIcon />
                          <span> Expense invoice </span>
                        </div>
                      }
                      <div onClick={this.onBackToListView}>
                        <ArrowBackIcon />
                        <span>Back to Purchase Order</span>
                      </div>
                    </div>
                  </Toolbar>
                </AppBar>
              </div>

            </form>
            <DialogRoot
              show={this.state.toggle}
              handleHide={this.restartToggle}
              size={'lg'}
            >
              {
                this.state.target === "name" ? (
                  <div>
                    <SupplierList
                      getInfo={this.getInfoSupplier}
                      searchText={this.state.targetSearch}
                    />
                  </div>
                ) : this.state.target === "description"
                  ? (
                    <div>
                      <Product_list
                        getInfo={this.getInfoSKU}
                        saveToggle={this.saveBOM}
                        searchText={this.state.targetSearch} />
                    </div>
                  ) : []
              }
            </DialogRoot>
          </FormWrapper>
        )
        }

        {
          redirectModal &&
          <RedirectModal
            show={redirectModal}
            handleHide={() => this.setState({ redirectModal: false })}
          />
        }


      </React.Fragment>
    )
  }
}

const mapStateToProps = ({
  suppliertfesState,
  purchasetfesState,
  producttfesState,
  userState,
  sessionState
}) => {
  const {
    Suppliers,
    SupplierDetails,
    SupplierFiltered,
    singleSupplier,
  } = suppliertfesState;
  const { Purchases, singlePurchase, PurchaseDetails } = purchasetfesState;
  const { ProductDetails, ProductFiltered } = producttfesState
  const loginUser = sessionState.authState.user;

  return { Suppliers, SupplierDetails, SupplierFiltered, singleSupplier, ProductFiltered, singlePurchase, PurchaseDetails, loginUser }
}

export default connect(mapStateToProps, {
  setPurchase,
  getSupplierDetails,
  getSingleSupplierRequest,
  patchSinglePurchaseRequest,
  patchSingleSupplierRequest,
  getFilterSupplier,
  setDuplicate,
  getSinglePurchaseRequest,
  getPurchaseDetails,
  getPdfCreate,
  deletePurchase,
  getPicUsers
})(crm_new_purchase)
