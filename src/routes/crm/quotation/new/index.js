// new quotation
import React, { Fragment, Component } from 'react'
import api from 'Api'
import { connect } from 'react-redux'
import { show } from 'redux-modal'
import FormWrapper from 'Components/Form/Layout/FormWrapper'
import FormInput from 'Components/Form/FormInput'
import DialogRoot from 'Components/Dialog/DialogRoot'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import RctSectionLoader from 'Components/RctSectionLoader'
import { quotationEditPage, salesOrderNewPage } from 'Helpers/crmURL'

// Redux imports
import { getPicUsers } from 'Ducks/user'
import {
  setProduct,
  getProductDetails,
  getFilterProduct
} from 'Ducks/producttfes'
import {
  setQuotation,
  getQuotationDetails,
  getFilterQuotation,
  getSingleSkuQuotationRequest,
  patchSingleSkuQuotationRequest,
  setNewVersionRequest,
  getPdfCreate
} from 'Ducks/quotationtfes'
import { convertToSalesOrderRequest } from 'Ducks/salesordertfes'
import { getFilterCustomerTfes } from 'Ducks/customertfes'
import { uploadFile, uploadMultipleFile, getUploadFile, deleteUploadFile, patchUploadFile, downloadUploadFile } from 'Ducks/uploadFile';

// import quotationListPage from 'Helpers/crmURL'

// React Component import
import { saleStatus } from 'Constants/modelStatus'
import SkuList from 'Components/PopupPage/SkuList'
import TfesCustomerList from 'Components/PopupPage/TfesCustomerList'
// import CreateCustomer from './components/createCustomer';
import SendEmail from 'Components/PopupPage/SentEmail'
import QuotationProductLine from 'Components/ProductLine/QuotationProductLine'
import BillOfMaterial from 'Components/PopupPage/BillOfMaterial'
import PurchaseItemLine from 'Components/PopupPage/PurchaseItemLine'
import CreateCustomer from 'Components/PopupPage/CreateCustomer'
import { quotationStatus } from 'Constants/modelStatus'
// material-ui
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './components/TabPanel';
import Dropzone from 'Components/Dropzone'
import { Button } from '@material-ui/core'

// Icon
import { Icon } from '@iconify/react'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import fastReverseButton from '@iconify-icons/emojione-v1/fast-reverse-button'
import fastForwardButton from '@iconify-icons/emojione-v1/fast-forward-button'
import LocalPrintshopIcon from '@material-ui/icons/LocalPrintshop'
import EmailIcon from '@material-ui/icons/Email'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber'
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder'
import HourglassFullIcon from '@material-ui/icons/HourglassFull'
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation'
import DayPicker from 'react-day-picker'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { DateUtils } from 'react-day-picker'
import MomentLocaleUtils, {
  formatDate,
  parseDate
} from 'react-day-picker/moment'
import moment from 'moment'
import 'moment/locale/en-SG'
import { element } from 'prop-types'
import { Avatar } from '@material-ui/core'

import { quotationListPage, quotationNewPage } from 'Helpers/crmURL'
import { amountRounding } from 'Helpers/helpers'

const PAGE_MAX = 10
class crm_new_quotation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toggle: false,
      // displayMaterial: false,
      quotationId: '',
      onEdit: false,
      status: '',
      element: null,
      target: '',
      errorMsg: '',
      targetSearch: '',
      quoRef: '',
      //createdDate: `${formatDate(new Date(), 'L', 'en-SG')}`,
      createdDate: new Date(),
      salesPic: props.loginUser && props.loginUser._id,
      custNo: '',
      custPoNum: '',
      incoterm: '',
      deliveryRemark: '',
      custName: '',
      isConverted: false,
      latestQuotation: false,
      isDuplicate: false,
      address: '',
      remarks: '',
      workScope: '',
      currency: '',
      telNo: '',
      faxNo: '',
      paymentTerm: '',
      buyerName: '',
      buyerEmail: '',
      exportLocal: 'local',
      salesNumber: 0,
      custRef: '',
      custId: '',
      description: '',
      qty: 0,
      unitPrice: 0,
      extPrice: 0,
      deletedExtPrice: 0,
      discount: 0,
      discountAmt: 0,
      discountName: '',
      isPercentage: true,
      uom: '',
      summary: '',
      subTotal: 0,
      grandTotal: 0,
      gst: 7,
      gstAmt: 0,
      lines: [
        {
          id: '',
          SN: 1,
          unitPrice: 0,
          description: '',
          qty: 0,
          custRef: '',
          extPrice: 0,
          uom: '',
          BomList: []
        }
      ],
      page: 1,
      total: 0,
      day: '',
      index: 0,
      indexBOM: 0,
      BomList: [],
      edit: false,
      toggleFormSelection: true,
      currentRate: 1,
      view: false,
      disableEdit: false,
      history: '',
      personIncharge: '',
      prices: '',
      leadTime: '',
      validity: '',
      header: '',
      box: '',
      orderItems: [],
      tabValue: 'one',
      files: [],
      uploadedFiles: [],
      fileDeleteModal: false,
      changedSN: [],
      focus: false,
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onDuplicate = this.onDuplicate.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleLineChange = this.handleLineChange.bind(this)
    this.getInfoSendEmail = this.getInfoSendEmail.bind(this)
    this.getInfoSKU = this.getInfoSKU.bind(this)
    this.getInfoCustomer = this.getInfoCustomer.bind(this)
    this.getInfoBOM = this.getInfoBOM.bind(this)
    this.getInfoCreateCustomer = this.getInfoCreateCustomer.bind(this)
    this.passDataBack = this.passDataBack.bind(this)
    // this.addNewLine = this.addNewLine.bind(this);
    this.onPrintPdf = this.onPrintPdf.bind(this)
    this.onBackQuotationList = this.onBackQuotationList.bind(this)
    // this.onSetQuotationStatus = this.onSetQuotationStatus.bind(this)
    this.onConvertSalesOrder = this.onConvertSalesOrder.bind(this)
    // this.onCreateNewVersion = this.onCreateNewVersion.bind(this)
    this.resetTotalState = this.resetTotalState.bind(this)
    this.submitFileBtnHandler = this.submitFileBtnHandler.bind(this)

    this._onBlur = this._onBlur.bind(this)
    this._onFocus = this._onFocus.bind(this)
    this.calculateSN = this.calculateSN.bind(this)
  }

  // Day picker input stuff
  // currentYear = new Date().getFullYear();
  // currentMonth = (new Date().getMonth()) + 1;
  // currentDay = new Date().getUTCDate();

  onSubmit() {
    // check if cusNo is not empty
    // if (this.state.custNo == '') {
    //   this.setState({
    //     errorMsg: 'Customer not selected yet!',
    //   })
    // } else {

    // if user never click elsewhere after editing the S/N before submitting, 
    // Help user to onBlur, to recalculate the SN
    if (this.state.focus){
      this._onBlur();
    }
    if (this.state.lines.length !== 0) {
      for (let i = 0; i < this.state.lines.length; i++) {
        // checks if line item 0 qty 
        if (this.state.lines[i].qty <= 0 || this.state.lines[i].qty === '') {
          this.setState({ errorMsg: 'Qty cannot be 0!' })
          return null;
        }

        // checks if line item negative unit price 
        if (this.state.lines[i].unitPrice < 0) {
          this.setState({ errorMsg: 'Unit Price cannot be less than 0!' })
          return null;
        }
      }
    }

    const data = {
      ...this.state,
      salesOrderItems: this.state.lines
    }
    delete data.toggleFormSelection
    delete data.lines
    delete data.onEdit
    delete data.toggle
    delete data.element
    delete data.refQuo
    delete data.targetSearch
    delete data.latestQuotation
    delete data.key
    delete data.value
    delete data.changedSN
    // delete data.disableEdit;

    // If edit/update onSubmit
    if (this.state.onEdit && this.state.isDuplicate !== true) {
      data.id = this.state.id
      // alert("PONG");
      // WARNING!!! Extremely hacky workaround! to refactor if time permits.
      // data.discount = parseFloat(this.state.discountAmount);
      this.props.patchSingleSkuQuotationRequest(data)
    } else {
      // To Remove history.location state
      const { state } = this.props.history.location
      if (state && state.isDuplicate) {
        if (data.initialVersion) {
          delete data.initialVersion
          // console.log("initialVersion",data.initialVersion)
        }
        const stateCopy = { ...state }
        delete stateCopy.isDuplicate
        this.props.history.replace({ state: stateCopy })
        // console.log('isDuplicate', data.initialVersion)
      }
      // Execute Create Quotation
      this.props.setQuotation(data)
    }

    // if (this.state.duplicate) {
    //   alert("PING");

    //   const postBody = {...this.state};

    //   delete postBody.id;
    //   delete postBody._id;
    //   delete postBody.quoRef;
    //   delete postBody.quotationId;

    //   console.log("DUPE", postBody);
    //   this.props.setQuotation(postBody)
    // }

    //}
    this.setState({
      disableEdit: true,
      isDuplicate: false,
      view: true,
      toggleFormSelection: true,
      errorMsg: "",
      changedSN:[]
    })

    const formData = new FormData();
    const quotationId = this.props.match.params.id
    let patchBody = {
      id: quotationId,
      formData: formData
    }
    //this is for single file upload
    //https://stackoverflow.com/questions/37235810/formdata-object-shows-empty-even-after-calling-append
    //https://www.youtube.com/watch?v=0TTa5Ulmgds
    if (this.state.files.length === 1) {
      formData.append('file', this.state.files[0]);
      formData.append('modelId', this.props.match.params.id);
      formData.append('modelName', "Quotation")

      if (this.state.uploadedFiles.length >= 1) {
        this.props.patchUploadFile(patchBody)
      } else {
        this.props.uploadFile(formData);
      }
      // api.post("/upload",formData).then(res=>console.log(res)).catch(err=>console.log(err))
      console.log([...formData]);
    } else if (this.state.files.length > 1) {
      // this is for multiple file upload 
      formData.append('modelId', this.props.match.params.id);
      formData.append('modelName', "Quotation")
      for (const key of Object.keys(this.state.files)) {
        formData.append('file', this.state.files[key])
      }
      console.log([...formData]);
      if (this.state.uploadedFiles.length >= 1) {
        this.props.patchUploadFile(patchBody)
      } else {
        this.props.uploadMultipleFile(formData);
      }
      // api.post("/upload/multiple",formData).then(res=>console.log(res)).catch(err=>console.log(err))
    }

    this.setState({ files: [] })
  }

  submitFileBtnHandler() {

    const formData = new FormData();
    const quotationId = this.props.match.params.id


    // debugger
    let patchBody = {
      id: quotationId,
      formData: formData
    }

    if (this.state.files.length === 1) {
      formData.append('file', this.state.files[0]);
      formData.append('modelId', this.props.match.params.id);
      formData.append('modelName', "Quotation")

      if (this.state.uploadedFiles.length >= 1) {
        this.props.patchUploadFile(patchBody)
      } else {
        this.props.uploadFile(formData);
      }
      // api.post("/upload",formData).then(res=>console.log(res)).catch(err=>console.log(err))
      console.log([...formData]);
    } else if (this.state.files.length > 1) {
      // this is for multiple file upload 
      formData.append('modelId', this.props.match.params.id);
      formData.append('modelName', "Quotation")
      for (const key of Object.keys(this.state.files)) {
        formData.append('file', this.state.files[key])
      }
      console.log([...formData]);
      if (this.state.uploadedFiles.length >= 1) {
        this.props.patchUploadFile(patchBody)
      } else {
        this.props.uploadMultipleFile(formData);
      }
      // api.post("/upload/multiple",formData).then(res=>console.log(res)).catch(err=>console.log(err))
    }

    this.setState({ files: [] })
  }

  onDuplicate() {
    this.setState({
      isDuplicate: true,
      onEdit: false,
      view: false,
      disableEdit: false,
      status: 'draft',
      quoRef: '',
      soStatus: '',
      toggleFormSelection: false
    })
    this.props.history.push(quotationNewPage)
  }

  getInfoSKU(productId, skuId) {
    const SKU = this.props.ProductFiltered.data

    SKU.map((source) => {
      if (source.id == productId) {
        // source.id == id (previous condition)
        this.setState((prevState) => ({
          lines: prevState.lines.map((eachItem, index) =>
            index == this.state.index // eachItem.num
              ? {
                ...eachItem,
                sku: skuId,
                productId: productId,
                partNumber: source.partNumber,
                description: source.description,
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
          toggle: false
        })
      }
    })
  }

  getInfoCustomer(id) {
    const Customer = this.props.customerFiltered.data
    Customer.map((source) => {
      if (source.id == id) {

        let gst = 0;
        if (this.props.QuotationDetails) {
          this.props.QuotationDetails.data.gst.forEach((item) => {
            //assumption that GST array will only have 1 setting 
            if (source.gstReq && source.gstReq.name === "With GST") {
              gst = item.rate
            }
          })
        }

        this.setState({
          toggle: false,
          custId: source._id && source._id,
          custNo: source.cusNo && source.cusNo,
          custName: source.name && source.name,
          incoterm: source.incoterm && source.incoterm.id,
          address: source.address ? source.address : '',
          telNo: source.cusPICtel1b ? source.cusPICtel1b : '',
          faxNo: source.cusPICMobile1a ? source.cusPICMobile1a : '',
          buyerName: source.cusPIC ? source.cusPIC : '',
          buyerEmail: source.cusPICEmail ? source.cusPICEmail : '',
          paymentTerm: source.paymentTerm && source.paymentTerm.id,
          gst: source.gstReq && source.gstReq.name === "With GST" ? gst : 0,
          exportLocal: source.gstReq && source.gstReq.name === "With GST" ? "local" : "export",
          currency: source.billingCurrency && source.billingCurrency.id ? source.billingCurrency.id : ""
        }, () => {
          let lines = [...this.state.lines]
          this.calculateTotal(lines)
        })
      }
    })
  }

  getInfoCreateCustomer(data, newCustomerNo) {
    this.setState({
      toggle: false,
      custNo: newCustomerNo,
      custName: data.name,
      incoterm: data.incoterm,
      address: data.address,
      telNo: data.cusPICtel1b,
      faxNo: data.cusPICMobile1a,
      buyerName: data.cusPIC,
      buyerEmail: data.cusPICEmail,
      paymentTerm: data.paymentTerm
    })
  }
  getInfoSendEmail() {
    this.setState({
      toggle: false
    })
  }

  handleChange(field, value) {
    let changeState = { [field]: value }

    this.setState(changeState, () => {
      if (
        field == 'exportLocal' ||
        field == 'currency' ||
        field == 'discount'
      ) {
        // console.log('ASDASD', field, value)
        this.calculateTotal(this.state.lines)
      }
    })

    // this.setState(changeState, () => {
    //   if (field == "exportLocal") {
    //     this.calculateTotal(this.state.lines)
    //   }
    // });

    // this.setState(changeState, () => {
    //   if (field == "discount") {
    //     this.calculateTotal(this.state.lines)

    //     // console.log("ASDASDASDASD", field, value)
    //   }

    //   // for (let i = 0; i < this.props.QuotationDetails.data.discount.length; i++) {
    //   //   if (value === this.props.QuotationDetails.data.discount[i].id) {
    //   //     this.setState({
    //   //       discountAmount: this.props.QuotationDetails.data.discount[i].discount
    //   //     })
    //   //   }
    //   // }

    // });

    // this.setState(changeState, () => {
    //   if (field == "currency") {
    //     this.calculateTotal(this.state.lines)
    //   }
    // });
  }

  handleLineChange(field, value, key) {

    // first layer validtion, checks if input value is alpabet
    // https://stackoverflow.com/questions/9862761/how-to-check-if-character-is-a-letter-in-javascript
    if (field === "qty" || field === "unitPrice" || field === "salesNumber") {
      if (value.length >= 1 && value.match(/[a-z\s]/i)) {
        return null
      }
    }

    // sets minimum qty 
    if (field === "qty") {
      if (value === "" || value < 0) {
        value = 0
      }
    }

    // sets minimum unitPrice 
    if (field === "unitPrice") {
      if (value === "" || value < 0) {
        value = 0
      }
    }

    let lines = [...this.state.lines]

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

    let extPrice = lines[key].qty * parseFloat(lines[key].unitPrice)
    if (isNaN(extPrice)) {
      extPrice = 0;
    }

    lines[key].extPrice = amountRounding(2, extPrice)
    this.calculateTotal(lines)
    this.setState({
      lines: lines
    })

    this.setState({
      toggle: false
    })

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
    let lines = [...this.state.lines]

    lines.push({
      id: '',
      SN: lines.length + 1,
      description: '',
      unitPrice: 0,
      qty: 0,
      custRef: '',
      extPrice: 0,
      uom: '',
      BomList: []
    })
    let page = Math.ceil(lines.length / PAGE_MAX)
    this.setState({
      lines: lines,
      page: page
    })
  }

  deleteNewLine = (index) => {
    let lines = [...this.state.lines]
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

    this.calculateTotal(lines)
    lines.forEach((item, index) => {
      // Keep customised order 
      if (item.SN > deleted.SN){
        item.SN -= 1;
      }
    })
    const totalPages = Math.ceil(lines.length / PAGE_MAX)
    let page = this.state.page
    if (this.state.page > totalPages) {
      page--
    }
    this.setState({
      lines: lines,
      page: page
    })
  }
  forwardToNextQty = () => {
    let totalPages = Math.ceil(this.state.lines.length / PAGE_MAX)
    if (totalPages !== this.state.page) {
      this.setState({
        ...this.state,
        page: this.state.page + 1
      })
    }
  }

  reverToPreQty = () => {
    if (this.state.page !== 1) {
      this.setState({
        ...this.state,
        page: this.state.page - 1
      })
    }
  }

  getInfoBOM(id) { }

  passDataBack(description, quantity, unitPrice, BomList) {
    this.setState((prevState) => ({
      lines: prevState.lines.map((eachItem, index) =>
        index == this.state.indexBOM // eachItem.num
          ? {
            ...eachItem,
            description: description,
            qty: quantity,
            unitPrice: unitPrice,
            BomList: BomList
          }
          : eachItem
      )
    }))
  }

  checkCusNo = () => {
    return '123'
  }

  componentDidMount() {
    this.props.getProductDetails()
    this.props.getQuotationDetails()
    this.props.getPicUsers()


    const quotationId = this.props.match.params.id

    if (quotationId) {
      this.props.getSingleSkuQuotationRequest(quotationId)
      this.props.getUploadFile(quotationId)
    }

    if (
      this.props.QuotationProduct.data &&
      this.props.QuotationProduct.data.id
    ) {
      this.resetTotalState()
    }

    // checks if this is duplicate so the quotation number will not show

    if (typeof this.props.location.state !== 'undefined') {
      if (this.props.location.state.isDuplicate) {
        // alert(this.props.location.state.isDuplicate)
        this.setState({
          isDuplicate: true,
          toggleFormSelection: false,
        })
      }
    }
    if (typeof this.props.location.state !== 'undefined') {
      if (this.props.location.state.view) {
        let view = this.props.location.state.view
        this.resetTotalState(true)
        this.setState({
          view: view,
        })

      }
    }

    // if (this.props.location )

    // If this is in view form, set undisableEdit fields
    if (this.props.location.state && this.props.location.state.view == true) {
      if (
        this.state.latestQuotation === false ||
        this.state.isConverted === true
      ) {
        this.setState({
          disableEdit: true
        })
      }
    }
  }

  resetTotalState(editStatus) {
    let newState = {
      quotationId: this.props.match.params.id,
      onEdit: editStatus,
      // toggleFormSelection: false,
      ...this.props.QuotationProduct.data,
      incoterm:
        this.props.QuotationProduct.data.incoterm &&
          this.props.QuotationProduct.data.incoterm.id
          ? this.props.QuotationProduct.data.incoterm.id
          : undefined,
      paymentTerm:
        this.props.QuotationProduct.data.paymentTerm &&
          this.props.QuotationProduct.data.paymentTerm.id
          ? this.props.QuotationProduct.data.paymentTerm.id
          : undefined,
      currency:
        this.props.QuotationProduct.data.currency &&
          this.props.QuotationProduct.data.currency.id
          ? this.props.QuotationProduct.data.currency.id
          : undefined,
      currencyName:
        this.props.QuotationProduct.data.currency &&
          this.props.QuotationProduct.data.currency.name
          ? this.props.QuotationProduct.data.currency.name
          : undefined,
      currencySymbol:
        this.props.QuotationProduct.data.currency &&
          this.props.QuotationProduct.data.currency.currencySymbol
          ? this.props.QuotationProduct.data.currency.currencySymbol
          : undefined,
      subTotal: this.props.QuotationProduct.data.subTotalAmt ? amountRounding(2, parseFloat(this.props.QuotationProduct.data.subTotalAmt)) : "0.00",
      gst: this.props.QuotationProduct.data.gst ? this.props.QuotationProduct.data.gst : 0,
      gstAmt: this.props.QuotationProduct.data.gstAmt ? this.props.QuotationProduct.data.gstAmt : 0,
      // gstReq: this.props.QuotationProduct.data.gstReq && this.props.QuotationProduct.data.gstReq.id ? this.props.QuotationProduct.data.gstReq.id : undefined,
    }

    // v Make a deep copy of the salesOrderItems by adding the values into a NEW array named lines
    let lines = [];
    if (this.props.QuotationProduct.data.salesOrderItems) {
      for (let i = 0; i < this.props.QuotationProduct.data.salesOrderItems.length; i++) {
        let item = { ...this.props.QuotationProduct.data.salesOrderItems[i] };
        lines.push(item);
      }
    }
    newState.lines = lines;

    if (!editStatus) {
      newState.latestQuotation = true
      newState.status = 'draft'
      newState.quoRef = '' // added by David
    }
    delete newState.saleOrderItems
    this.setState({
      ...this.state,
      ...newState
    }, () => {
      this.calculateTotal(this.state.lines)
    });
    // this.calculateTotal(newState.lines)
  }

  calculateTotal(lines) {
    let total = 0
    for (let i = 0; i < lines.length; i++) {
      total += lines[i].qty * lines[i].unitPrice
    }
    let gst = 0
    if (this.props.QuotationDetails.data.gst) {
      this.props.QuotationDetails.data.gst.forEach((item) => {
        if (this.state.exportLocal === 'local') {
          gst = item.rate
          // console.log(item.rate)
        } else {
          gst = 0
        }
      })
    }
    let conversion = 1
    // State rate will be the previous rate
    let rate = this.state.currentRate

    if (
      this.state.currency != null &&
      this.props.QuotationDetails.data.currency
    ) {
      this.props.QuotationDetails.data.currency.map((item) => {
        if (item.id == this.state.currency) {
          this.setState({
            currencyName: item.name,
            currencySymbol: item.currencySymbol
          })
        }
      })
    }

    // to refactor if time permits
    let discountName = "";
    let isPercentage = "";
    if (
      this.state.discount !== null &&
      this.props.QuotationDetails.data.discount
    ) {
      this.props.QuotationDetails.data.discount.forEach((item) => {
        if (this.state.discount === item.value) {
          discountName = item.name
          isPercentage = item.isPercentage;
          this.setState({ isPercentage: isPercentage });
        }
      })
    }

    // console.log('CONVERSION', conversion)

    // let discountAmt = parseFloat((total * (this.state.discount / 100)) * conversion).toFixed(2);

    // let calculatedDiscount = (total * (this.state.discount / 100)) * conversion;

    // let discountTest = amountRounding(calculatedDiscount, 2);
    // console.log("DISSCCCANNNTTT", discountTest, discountAmt)

    // let subTotal = total * conversion - discountAmt;
    // // let subTotal = total * conversion - discountAmount;
    // let gstAmount = parseFloat(subTotal * (gst / 100)).toFixed(2);
    // let grandTotal = (parseFloat(subTotal) + parseFloat(gstAmount)).toFixed(2);
    // let balance = (parseFloat(grandTotal) - parseFloat(this.state.downPayment)).toFixed(2);

    let discountAmt = 0;
    if (isPercentage === false) {
      discountAmt = amountRounding(2, this.state.discount);
    } else {
      let calculatedDiscount = parseFloat(total) * (this.state.discount / 100) * conversion
      discountAmt = amountRounding(2, calculatedDiscount)
    }
    let subTotal = amountRounding(2, parseFloat(total) * conversion - parseFloat(discountAmt))
    let gstAmt = amountRounding(2, parseFloat(subTotal) * parseFloat(gst / 100))
    let grandTotal = amountRounding(
      2,
      parseFloat(subTotal) + parseFloat(gstAmt)
    )

    this.setState({
      total: total,
      discountAmt: discountAmt,
      discountName: discountName,
      subTotal: subTotal,
      gstAmt: gstAmt,
      grandTotal: grandTotal,
      gst: gst
    })
  }
  checkDisabled() {
    switch (this.state.status) {
      // case quotationStatus.ISSUED :{
      //   return false;
      // }
      case quotationStatus.WIN: {
        return false
      }
      case quotationStatus.LOSS: {
        return false
      }
      default:
        if (this.state.disableEdit == true) {
          return false
        } else {
          return true
        }
    }
  }

  showStatus() {
    if (this.state.status != '') {
      // console.log('this.state.status.charAt', this.state.status)
      let status =
        this.state.status.charAt(0).toUpperCase() + this.state.status.slice(1)
      return '【 ' + status + ' 】'
    } else {
      return ' '
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.QuotationProduct.data !== this.props.QuotationProduct.data) {
      if (
        this.props.QuotationProduct.data &&
        this.props.QuotationProduct.data.id
      ) {
        const { state } = this.props.history.location

        if (!this.state.isDuplicate) {
          if (
            this.props.match.params.id !== this.props.QuotationProduct.data.id
          ) {
            this.props.history.push(
              quotationEditPage(this.props.QuotationProduct.data.id)
            )
          }
        }
        if (this.state.isDuplicate) {
          this.resetTotalState(false)
          this.setState({
            quoRef: '',
            soStatus: ''
          })
        } else {
          this.resetTotalState(true)

          if (
            this.props.QuotationProduct.data.latestQuotation === false ||
            this.props.QuotationProduct.data.isConverted === true
          ) {
            this.setState({
              disableEdit: true
            })
          }
        }
      }
    }

    // this section sets custId and CustNo into state to prevent submission error
    // after user creates a new customer from create customer btn modal
    if (prevProps.singleCustomer.data !== this.props.singleCustomer.data) {
      if (
        this.props.singleCustomer.data &&
        this.props.singleCustomer.data.cusNo
      ) {
        this.setState({ custNo: this.props.singleCustomer.data.cusNo })
      }

      if (this.props.singleCustomer.data && this.props.singleCustomer.data.id) {
        this.setState({ custId: this.props.singleCustomer.data.id })
      }
    }

    // gets discountAmt summary to appear
    if (prevProps.QuotationProduct.data !== this.props.QuotationProduct.data) {
      if (
        this.props.QuotationProduct.data &&
        this.props.QuotationProduct.data.discountAmt
      ) {
        // console.log("ASDASD", this.props.QuotationProduct.data.discountAmt)
        this.setState({
          discountAmt: amountRounding(
            2,
            this.props.QuotationProduct.data.discountAmt
          )
        })
      }

      // caters for case where there is no discount amount and needs to recalculate total summary
      if (
        this.props.QuotationProduct.data &&
        this.props.QuotationProduct.data.discount === 0
      ) {
        this.setState({ discountAmt: 0 }, () => {
          this.calculateTotal(this.state.lines)
        })
      }

      // sets currency symbol
      if (
        this.props.QuotationProduct.data &&
        this.props.QuotationProduct.data.currency
      ) {
        // console.log("ASDASDSD", this.props.QuotationProduct.data.currency.currencySymbol);
        this.setState({
          currencySymbol: this.props.QuotationProduct.data.currency
            .currencySymbol
        })
      }


      // gets GstAmt to appear
      if (
        this.props.QuotationProduct.data &&
        this.props.QuotationProduct.data.gst &&
        this.props.QuotationProduct.data.gstAmt
      ) {
        this.setState({
          gst: this.props.QuotationProduct.data.gst,
          gstAmt: amountRounding(2, this.props.QuotationProduct.data.gstAmt)
        })
      }

      // gets subTotalAmt to appear
      if (
        this.props.QuotationProduct.data &&
        this.props.QuotationProduct.data.subTotalAmt
      ) {
        this.setState({
          subTotal: this.props.QuotationProduct.data.subTotalAmt ? amountRounding(2, parseFloat(this.props.QuotationProduct.data.subTotalAmt)) : "0.00"
        })
      }


      // if(this.props.QuotationProduct.data && this.props.QuotationProduct.data.salesPic) {
      //   this.setState({ salesPic: this.props.QuotationProduct.data.salesPic })
      //   console.log("SALES?")
      // }
      // this.setState({discountAmt : this.props.QuotationProduct.data.discountAmt.toFixed(2)})
    }

    if (prevProps.QuotationDetails !== this.props.QuotationDetails) {
      this.calculateTotal(this.state.lines)
    }

    if (prevProps.SalesOrderProduct !== this.props.SalesOrderProduct) {
      this.calculateTotal(this.state.lines)
    }

    // sets uploaded file into state 
    if (prevProps.uploadedFiles !== this.props.uploadedFiles) {
      this.setState({ uploadedFiles: this.props.uploadedFiles.data })
    }
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
    // console.log("ButtonClick");
    let targetSearch = ''
    if (this.state.lines[index].description != '') {
      targetSearch = 'Desc:' + this.state.lines[index].description
    }

    if (this.state.lines[index].partNumber) {
      targetSearch = 'PartNo:' + this.state.lines[index].partNumber
    }
    this.setState({
      index: index,
      toggle: true,
      element: target,
      // target: target,
      target: 'sku',
      targetSearch: targetSearch
    })
  }

  secondButtonClick = (target, index) => {
    this.setState({
      indexBOM: index,
      toggle: true,
      element: target,
      target: 'bom',
      description: this.state.lines[index].description,
      qty: this.state.lines[index].qty,
      unitPrice: this.state.lines[index].unitPrice,
      BomList: this.state.lines[index].BomList
        ? this.state.lines[index].BomList
        : [],
      extPrice: 0
    })
  }

  thirdButtonClick = (target) => {
    this.setState({
      toggle: true,
      element: target,
      target: 'createCus'
    })
  }

  restartToggle = () => {
    this.setState({
      toggle: false
    })
  }

  saveBOM = () => {
    this.setState({
      toggle: false
    })
  }

  onConvertSalesOrder() {
    if (this.state.onEdit === true) {
      if (this.state.quoRef) {
        // convert to sales order
        delete this.state.custPoNum
        this.props.convertToSalesOrderRequest(this.state)
        if (this.state.custPoNum != '') {
          delete this.state.custPoNum
          this.props.convertToSalesOrderRequest(this.state)
          // console.log('what is this state', this.state)
          this.props.history.push(salesOrderNewPage)
        } else {
          this.props.convertToSalesOrderRequest(this.state)
          // console.log('what is this state', this.state)
          this.props.history.push(salesOrderNewPage)
        }
      } else {
        alert('This Quotation Must be issued in order to convert')
      }
    } else {
      alert('You must save this quotation in order to execute convert')
    }
  }

  onSetQuotationStatus = (status) => {
    if (this.state.onEdit == true) {
      // to cross check if this is okay since we have added validation
      const data = {
        ...this.state,
        status: status,
        salesOrderItems: this.state.lines
      }
      this.props.patchSingleSkuQuotationRequest(data)
      this.setState({
        isDuplicate: false
      })
    } else {
      alert('You must save this Quotation order in order to execute confirm')
    }
  }

  // onCreateNewVersion() {
  //   // this.props.setNewVersionRequest(this.state.id)
  //   if (this.state.onEdit == true) {
  //     if (this.state.quoRef) {
  //       if (this.state.latestQuotation) {
  //         this.props.setNewVersionRequest(this.state.id)
  //       } else {
  //         alert('you have created new version')
  //       }
  //     } else {
  //       alert('You must confirm quotation before create new Version')
  //     }
  //   } else {
  //     alert('You must save this sales order in order to execute confirmation')
  //   }
  // }
  onBackQuotationList() {
    this.props.history.push('/app/crm/quotation')
    // this.props.history.push(quotationListPage)
    // window.history.back(-1)
  }

  onPrintPdf() {
    this.props.getPdfCreate(this.props.match.params.id)
  }

  onSendEmail = (target) => {
    // console.log('mark================mark')
    this.setState({
      toggle: true,
      element: target,
      target: 'sendEmail'
    })
  }
  onChangeToEdit = () => {
    this.setState({
      disableEdit: false,
      view: false
    })
  }

  changeTab = (event, newValue) => {
    this.setState({
      tabValue: newValue
    })
  }

  handleUpload = file => {
    let data = [{ key: 'file', value: file[0] }]
    console.log('dataaaa', data, file)
    this.setState({
      files: file
    });
  };

  removeFile = (file) => {
    this.setState(state => {
      const index = state.files.indexOf(file);
      const files = state.files.slice(0);
      files.splice(index, 1);
      return { files };
    });
  }

  deleteFile = () => {
    let postBody = {
      modelId: this.props.match.params.id,
      filePath: this.state.fileDeletePath
    }

    console.log("IDDD", postBody)

    this.props.deleteUploadFile(postBody)
    this.setState({
      fileDeleteModal: false,
      fileDeletePath: ""
    })
  }

  downloadFile = (filename) => {
    this.props.downloadUploadFile(filename)
  }

  deleteFileModalHandler = (filePath) => {
    this.setState({
      fileDeleteModal: true,
      fileDeletePath: filePath
    })
  }

  render() {
    const {
      quoRef,
      createdDate,
      salesPic,
      custNo,
      custPoNum,
      incoterm,
      custName,
      address,
      currency,
      currencyName,
      currencySymbol,
      telNo,
      faxNo,
      target,
      sendEmail,
      prices,
      leadTime,
      validity,
      header,
      box,
      orderItems,
      tabValue,
      uploadedFiles,
      fileDeleteModal,
    } = this.state
    const {
      paymentTerm,
      buyerName,
      buyerEmail,
      exportLocal,
      salesNumber,
      custRef,
      description,
      qty,
      unitPrice,
      extPrice,
      discount,
      remarks,
      workScope,
      toggleFormSelection,
      disableEdit,
      buttonShow,
      page,
      deliveryRemark
    } = this.state
    const { brands, materials, loading } = this.props.ProductDetails
    const totalPages = Math.ceil(this.state.lines.length / PAGE_MAX)
    // let userList=this.props.picUserList.data.map(user =>({
    //   name:user.firstName +" "+ user.lastName,
    //   value: user.id
    // }))
    let userlist = this.props.picUserList.data.map((user) => ({
      name: user.firstName + ' ' + user.lastName,
      value: user.id
    }))

    const a11yProps = (index) => {
      return {
        id: `wrapped-tab-${index}`,
        'aria-controls': `wrapped-tabpanel-${index}`,
      };
    }

    return (
      <React.Fragment>
        {this.props.QuotationProduct.loading ? (
          <RctSectionLoader />
        ) : (
          <FormWrapper
            onSave={this.onSubmit}
            onDuplicate={this.onDuplicate}
            onChangeToEdit={this.onChangeToEdit}
            disabled={this.checkDisabled()}
            title="Back to All Quotation"
            centerTitle={
              this.state.onEdit
                ? 'Update Quotation Page'
                : 'Create New Quotation Page'
            }
            promptMessage={this.showStatus()}
            edit="test"
            listRedirect={quotationListPage}
            showEditButton={this.state.view ? true : false}
            // showEditButton={this.state.onEdit ?  true : false }
            showDuplicateButton={this.state.onEdit ? true : false}
          >
            {/* {(this.state.disableEdit && !this.state.view)&&<div onClick={this.onChangeToEdit} className="onChangeToEdit_btn"  >
              <button className="primary_btn"> Edit  </button>
              </div>} */}
            <form autoComplete="off">
              <div
                style={{ marginLeft: '2.5rem' }}
                className={this.state.disableEdit && 'uneditable'}
              >
                <div class="top-container">
                  {this.state.errorMsg && (
                    <h4 class="text-danger text-center">
                      {this.state.errorMsg}
                    </h4>
                  )}
                  <div class="row">
                    <div class="col-sm-4 ">
                      <FormInput
                        label="Quotation Ref"
                        value={this.state.isDuplicate 
                          ? '' 
                          : quoRef 
                            ? quoRef 
                            : ''}
                        target="quoRef"
                        handleChange={this.handleChange}
                        readOnly={true}
                        isToggledEditForm={toggleFormSelection}
                        original={this.props.QuotationProduct.data.quoRef
                          ? this.props.QuotationProduct.data.quoRef
                          : ""}
                      />
                    </div>
                    <div class="col-sm-4 ">
                      <p
                        style={{
                          color: 'rgba(0, 0, 0, 0.54)',
                          padding: '0',
                          fontSize: '0.75rem',
                          fontFamily: ' Lato',
                          fontWeight: '400',
                          lineHeight: ' 1',
                          marginBottom: '1px'
                        }}
                      >
                        Date
                      </p>
                      <DayPickerInput
                        formatDate={formatDate}
                        parseDate={parseDate}
                        format="L"
                        // value={this.state.createdDate}
                        value={`${formatDate(
                          this.state.createdDate,
                          'L',
                          'en-SG'
                        )}`}
                        placeholder={`${formatDate(new Date(), 'L', 'en-SG')}`}
                        onDayChange={(e) => this.setState({ createdDate: e })}
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
                        label="Sales PIC"
                        value={salesPic}
                        target="salesPic"
                        selectValues={userlist}
                        handleChange={this.handleChange}
                        isToggledEditForm={toggleFormSelection}
                        // selectValueKey="id"
                        // selectValueName="name"
                        // Default value for new form is loginUser
                        original={this.props.QuotationProduct.data.salesPic ? this.props.QuotationProduct.data.salesPic : this.props.loginUser._id}
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-4">
                      <FormInput
                        label="Customer Number"
                        value={custNo}
                        target="custNo"
                        handleChange={this.handleChange}
                        isToggledEditForm={toggleFormSelection}
                        readOnly={true}
                        original={this.props.QuotationProduct.data.custNo
                          ? this.props.QuotationProduct.data.custNo
                          : ""}
                      />
                    </div>
                    <div class="col-sm-4 ">
                      <FormInput
                        label="Subject"
                        value={custPoNum}
                        target="custPoNum"
                        handleChange={this.handleChange}
                        readOnly={disableEdit}
                        isToggledEditForm={toggleFormSelection}
                        original={this.props.QuotationProduct.data.custPoNum ? this.props.QuotationProduct.data.custPoNum : ""}
                      />
                    </div>
                    <div class="col-sm-4 ">
                      <FormInput
                        label="Incoterm "
                        value={incoterm}
                        target="incoterm"
                        isToggledEditForm={toggleFormSelection}
                        selectValueKey="id"
                        // selectValueName="incoterm"
                        selectValues={
                          this.props.QuotationDetails.data
                            ? this.props.QuotationDetails.data.incoterm
                            : []
                        }
                        handleChange={this.handleChange}
                        readOnly={disableEdit}
                        original={this.props.QuotationProduct.data.incoterm ? this.props.QuotationProduct.data.incoterm.id : ""}
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
                        isToggledEditForm={toggleFormSelection}
                        handleChange={this.handleChange}
                        readOnly={disableEdit}
                        original={this.props.QuotationProduct.data.custName ? this.props.QuotationProduct.data.custName : ""}
                      />
                    </div>
                    <div className="col-sm-4">
                      <FormInput
                        label="Currency"
                        value={currency}
                        target="currency"
                        isToggledEditForm={toggleFormSelection}
                        selectValueKey="id"
                        selectValueName="name"
                        selectValues={
                          this.props.QuotationDetails.data
                            ? this.props.QuotationDetails.data.currency
                            : []
                        }
                        handleChange={this.handleChange}
                        readOnly={disableEdit}
                        original={this.props.QuotationProduct.data.currency ? this.props.QuotationProduct.data.currency.id : ""}
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-sm-8">
                      <FormInput
                        label="Address"
                        value={address}
                        target="address"
                        multiline
                        rows={3}
                        isToggledEditForm={toggleFormSelection}
                        handleChange={this.handleChange}
                        readOnly={disableEdit}
                        original={this.props.QuotationProduct.data.address ? this.props.QuotationProduct.data.address : ""}
                      />
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
                        original={this.props.QuotationProduct.data.deliveryRemark ? this.props.QuotationProduct.data.deliveryRemark : ""}
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-sm-4">
                      <FormInput
                        label="Header"
                        value={header}
                        target="header"
                        // multiline
                        // rows={3}
                        isToggledEditForm={toggleFormSelection}
                        handleChange={this.handleChange}
                        readOnly={disableEdit}
                        original={this.props.QuotationProduct.data.header ? this.props.QuotationProduct.data.header : ""}
                      />
                    </div>
                    <div class="col-sm-8">
                      <FormInput
                        label="Box"
                        value={box}
                        target="box"
                        // multiline
                        // rows={3}
                        handleChange={this.handleChange}
                        isToggledEditForm={toggleFormSelection}
                        readOnly={disableEdit}
                        original={this.props.QuotationProduct.data.box ? this.props.QuotationProduct.data.box : ""}
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-sm-4 ">
                      <FormInput
                        label="Tel. Number"
                        value={telNo}
                        target="telNo"
                        handleChange={this.handleChange}
                        isToggledEditForm={toggleFormSelection}
                        readOnly={disableEdit}
                        original={this.props.QuotationProduct.data.telNo ? this.props.QuotationProduct.data.telNo : ""}
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
                        original={this.props.QuotationProduct.data.faxNo ? this.props.QuotationProduct.data.faxNo : ""}
                      />
                    </div>
                    <div class="col-sm-4">
                      <FormInput
                        label="Payment Term"
                        value={paymentTerm}
                        target="paymentTerm"
                        isToggledEditForm={toggleFormSelection}
                        selectValueKey="id"
                        selectValueName="name"
                        selectValues={
                          this.props.QuotationDetails.data
                            ? this.props.QuotationDetails.data.paymentTerm
                            : []
                        }
                        handleChange={this.handleChange}
                        readOnly={disableEdit}
                        original={this.props.QuotationProduct.data.paymentTerm ? this.props.QuotationProduct.data.paymentTerm.id : ""}
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-4">
                      <FormInput
                        label="Buyer Name"
                        value={buyerName}
                        target="buyerName"
                        handleChange={this.handleChange}
                        isToggledEditForm={toggleFormSelection}
                        readOnly={disableEdit}
                        original={this.props.QuotationProduct.data.buyerName ? this.props.QuotationProduct.data.buyerName : ""}
                      />
                    </div>
                    <div class="col-sm-4">
                      <FormInput
                        label="Buyer Email"
                        value={buyerEmail}
                        target="buyerEmail"
                        handleChange={this.handleChange}
                        isToggledEditForm={toggleFormSelection}
                        readOnly={disableEdit}
                        original={this.props.QuotationProduct.data.buyerEmail ? this.props.QuotationProduct.data.buyerEmail : ""}
                      />
                    </div>
                    <div class="col-sm-4">
                      <FormInput
                        label="Export / Local"
                        value={exportLocal}
                        target="exportLocal"
                        selectValues={[
                          { name: 'Export', value: 'export' },
                          { name: 'Local', value: 'local' }
                        ]}
                        handleChange={this.handleChange}
                        isToggledEditForm={toggleFormSelection}
                        readOnly={disableEdit}
                        // Default value for new form is local.
                        original={this.props.QuotationProduct.data.exportLocal ? this.props.QuotationProduct.data.exportLocal : "local"}
                      />
                    </div>
                  </div>
                  <div
                    class="boundary-line"
                    style={{
                      width: '100%',
                      height: '2px',
                      backgroundColor: '#c0c0c0',
                      margin: '20px auto '
                    }}
                  ></div>
                </div>
                <div class="bottom-container">
                  <AppBar position="static">
                    <Tabs value={tabValue} onChange={(e, e2) => this.changeTab(e, e2)} aria-label="wrapped label tabs example">
                      <Tab value="one" label="Item Lines"  {...a11yProps('one')} />
                      <Tab value="two" label="Files Upload" {...a11yProps('two')} />
                    </Tabs>
                  </AppBar>

                  <TabPanel value={tabValue} index="one">
                    <QuotationProductLine
                      lines={this.state.lines}
                      page={this.state.page}
                      deleteLine={this.deleteNewLine}
                      handleLineChange={this.handleLineChange}
                      toggleFormSelection={toggleFormSelection}
                      buttonClick={(target, index) =>
                        this.buttonClick(target, index)
                      }
                      secondButtonClick={(target, index) =>
                        this.secondButtonClick(target, index)
                      }
                      disableEdit={this.state.disableEdit}
                      buttonShow={!this.state.view}
                      secondButtonShow={false}
                      dataDetails={this.props.QuotationDetails.data}
                      originalData={this.props.QuotationProduct.data.salesOrderItems}
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
                      <p>
                        {page} of {totalPages}
                      </p>
                      <div>
                        <Icon
                          icon={fastForwardButton}
                          className="fastForwardButton"
                          onClick={this.forwardToNextQty}
                        />
                      </div>
                      <p>Next Qty #</p>
                    </div>
                  </TabPanel>

                  <TabPanel value={tabValue} index="two">
                    <Dropzone
                      acceptFileTypes="text/csv, image/jpeg, image/png, .pdf"
                      onDrop={this.handleUpload}
                      onRemove={this.removeFile}
                      uploadedFiles={this.state.files}
                      additionalText="Files can't be edited once uploaded."
                    />
                    <div>
                      <div className="row">
                        <Button
                          variant="contained"
                          color="primary"
                          // color="#df0021"
                          className="text-white ml-20"
                          onClick={this.submitFileBtnHandler}
                          style={{ marginBottom: '0.5rem', marginTop: '0.5rem' }}
                        >
                          Save File
                        </Button>
                      </div>

                      {
                        uploadedFiles.map(file => (
                          <div>
                            <a key={file._id} onClick={() => this.downloadFile(file.filename)} > {file.filename}</a>
                            <Button onClick={() => this.deleteFileModalHandler(file.path)}> Delete </Button>
                          </div>
                        ))
                      }
                    </div>
                  </TabPanel>

                  <div class="boundary-line" />
                  <div class="row">
                    <div class="col-sm-8">
                      <div className="col">
                        <FormInput
                          label="Prices"
                          value={prices}
                          target="prices"
                          handleChange={this.handleChange}
                          isToggledEditForm={toggleFormSelection}
                          readOnly={disableEdit}
                          original={this.props.QuotationProduct.data.prices
                            ? this.props.QuotationProduct.data.prices
                            : ""}
                        />

                        <FormInput
                          label="Lead Time"
                          value={leadTime}
                          target="leadTime"
                          handleChange={this.handleChange}
                          isToggledEditForm={toggleFormSelection}
                          readOnly={disableEdit}
                          original={this.props.QuotationProduct.data.leadTime
                            ? this.props.QuotationProduct.data.leadTime
                            : ""}
                        />

                        <FormInput
                          label="Validity"
                          value={validity}
                          target="validity"
                          handleChange={this.handleChange}
                          isToggledEditForm={toggleFormSelection}
                          readOnly={disableEdit}
                          original={this.props.QuotationProduct.data.validity
                            ? this.props.QuotationProduct.data.validity
                            : ""}
                        />

                        <FormInput
                          label="Remarks"
                          value={remarks}
                          target="remarks"
                          multiline
                          rows={4}
                          handleChange={this.handleChange}
                          isToggledEditForm={toggleFormSelection}
                          readOnly={disableEdit}
                          original={this.props.QuotationProduct.data.remarks
                            ? this.props.QuotationProduct.data.remarks
                            : ""}
                        />

                        <FormInput
                          label="Work Scope"
                          value={workScope}
                          target="workScope"
                          multiline
                          rows={4}
                          handleChange={this.handleChange}
                          isToggledEditForm={toggleFormSelection}
                          readOnly={disableEdit}
                          original={this.props.QuotationProduct.data.workScope
                            ? this.props.QuotationProduct.data.workScope
                            : ""}
                        />
                      </div>
                    </div>

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
                          isToggledEditForm={toggleFormSelection}
                          readOnly={disableEdit}
                          // Default value for discount is 0.
                          original={this.props.QuotationProduct.data.discount
                            ? this.props.QuotationProduct.data.discount
                            : 0}
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="Left_Toolbar-wrapper">
                <AppBar
                  position="fixed"
                  color="primary"
                  style={{
                    top: 'auto',
                    bottom: '50px',
                    left: '0',
                    right: '-20px',
                    width: '50px',
                    opacity: '0.8',
                    borderRadius: '4px'
                  }}
                >
                  {this.state.isConverted ? (
                    <Toolbar>
                      <div className="Left_Toolbar" style={{}}>
                        {' '}
                        <div onClick={() => this.onPrintPdf()}>
                          <LocalPrintshopIcon />
                          <span> Print PDF </span>
                        </div>
                        <div onClick={this.onBackQuotationList}>
                          <ArrowBackIcon />
                          <span> Back to Quotation List </span>
                        </div>
                      </div>
                    </Toolbar>
                  ) : (
                    <Toolbar>
                      <div className="Left_Toolbar" style={{}}>
                        {/* <div onClick={this.onCreateNewVersion}>
                            <CreateNewFolderIcon />
                            <span>Create New Version</span>
                          </div> */}

                        {this.state.status === 'draft' && (
                          <div
                            onClick={() => {
                              this.onSetQuotationStatus('issued')
                            }}
                          >
                            <ConfirmationNumberIcon />
                            <span> Issue Quotation </span>
                          </div>
                        )}

                        {this.state.status == 'issued' && (
                          // this.state.status == "issued" &&
                          <Fragment>
                            <div onClick={this.onConvertSalesOrder}>
                              <AddToPhotosIcon />
                              <span>Convert to SO</span>
                            </div>
                            <div
                              onClick={() => {
                                this.onSetQuotationStatus('delay')
                              }}
                            >
                              <HourglassFullIcon />
                              <span> Delay Quotation </span>
                            </div>

                            <div
                              onClick={() => {
                                this.onSetQuotationStatus('loss')
                              }}
                            >
                              <CancelPresentationIcon />
                              <span> Loss Quotation </span>
                            </div>
                          </Fragment>
                        )}

                        {this.state.status === 'delay' && (
                          <Fragment>
                            <div
                              onClick={() => {
                                this.onSetQuotationStatus('issued')
                              }}
                            >
                              <ConfirmationNumberIcon />
                              <span> Issue Quotation </span>
                            </div>

                            <div
                              onClick={() => {
                                this.onSetQuotationStatus('loss')
                              }}
                            >
                              <ConfirmationNumberIcon />
                              <span> Loss Quotation </span>
                            </div>
                            {/* <div onClick={this.onPrintPdf}>
                                <LocalPrintshopIcon />
                                <span> Print PDF </span>
                              </div> */}
                          </Fragment>
                        )}

                        {this.state.status != 'draft' && (
                          <div onClick={this.onPrintPdf}>
                            <LocalPrintshopIcon />
                            <span> Print PDF </span>
                          </div>
                        )}

                        <div onClick={this.onBackQuotationList}>
                          <ArrowBackIcon />
                          <span>Back to All Quotation</span>
                        </div>
                      </div>
                    </Toolbar>
                  )}
                </AppBar>
              </div>
            </form>
            <DialogRoot
              show={this.state.toggle}
              handleHide={this.restartToggle}
              size={'lg'}
            >
              {this.state.target === 'custName' ? (
                <div>
                  <TfesCustomerList
                    getInfo={this.getInfoCustomer}
                    searchText={this.state.targetSearch}
                  />
                </div>
              ) : this.state.target === 'createCus' ? (
                <div>
                  <CreateCustomer
                    getInfo={this.getInfoCreateCustomer}
                    customerName={this.state.custName}
                    address={this.state.address}
                    telNo={this.state.telNo}
                    faxNo={this.state.faxNo}
                    buyerName={this.state.buyerName}
                    buyerEmail={this.state.buyerEmail}
                    incoterm={this.state.incoterm}
                    paymentTerm={this.state.paymentTerm}
                  />
                </div>
              ) : this.state.target === 'bom' ? (
                <div>
                  {' '}
                  <h3>Bill of Material</h3>
                  <BillOfMaterial
                    getInfo={this.getInfoBOM}
                    saveToggle={this.saveBOM}
                    description={this.state.description}
                    qty={this.state.qty}
                    unitPrice={this.state.unitPrice}
                    Bom={this.state.BomList}
                    passData={this.passDataBack}
                  />
                </div>
              ) : this.state.target === 'sku' ? (
                <div>
                  <SkuList
                    getInfo={this.getInfoSKU}
                    searchText={this.state.targetSearch}
                  />
                </div>
              ) : this.state.target == 'sendEmail' ? (
                <div>
                  <SendEmail
                    getInfo={this.getInfoSendEmail}
                    saveToggle={this.saveBOM}
                  />
                </div>
              ) : (
                []
              )}
            </DialogRoot>

            <DialogRoot
              show={this.state.fileDeleteModal}
              handleHide={() => { this.setState({ fileDeleteModal: false }) }}
              size={'sm'}
            >
              <div style={{ textAlign: 'center' }}>
                <h4> Warning, deleting file <strong>{this.state.fileDeletePath}</strong> is irreversible! </h4>
                <Button
                  variant="contained"
                  color="primary"
                  className="text-white ml-20"
                  onClick={this.deleteFile}
                >
                  Delete
                </Button>
              </div>
            </DialogRoot>

          </FormWrapper>
        )}
      </React.Fragment>
    )
  }
}
const mapStateToProps = ({
  quotationtfesState,
  producttfesState,
  customertfesState,
  userState,
  sessionState,
  fileUploadState
}) => {
  const { Quotations, QuotationDetails, QuotationProduct } = quotationtfesState
  const { ProductDetails, ProductFiltered } = producttfesState
  const { customerFiltered, customers, singleCustomer } = customertfesState
  const { picUserList } = userState
  const loginUser = sessionState.authState.user
  const { uploadedFiles } = fileUploadState


  return {
    Quotations,
    QuotationProduct,
    QuotationDetails,
    ProductDetails,
    ProductFiltered,
    customerFiltered,
    customers,
    singleCustomer,
    picUserList,
    loginUser,
    uploadedFiles
  }
}
export default connect(mapStateToProps, {
  show,
  setQuotation,
  getQuotationDetails,
  getFilterQuotation,
  setProduct,
  getProductDetails,
  getFilterProduct,
  getFilterCustomerTfes,
  getSingleSkuQuotationRequest,
  patchSingleSkuQuotationRequest,
  convertToSalesOrderRequest,
  setNewVersionRequest,
  getPdfCreate,
  getPicUsers,
  uploadFile,
  uploadMultipleFile,
  getUploadFile,
  deleteUploadFile,
  patchUploadFile,
  downloadUploadFile,
})(crm_new_quotation)
