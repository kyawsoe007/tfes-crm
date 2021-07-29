import React, { Component } from 'react'
import api from 'Api'

import { connect, useSelector } from 'react-redux'
import FormWrapper from 'Components/Form/Layout/FormWrapper'
import FormInput from 'Components/Form/FormInput'
import DialogRoot from 'Components/Dialog/DialogRoot'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import SKU_customer_list from '../index'
import Checkbox from '@material-ui/core/Checkbox';
import RctPageLoader from 'Components/RctPageLoader'
// import { skuNewPage, singleSKU } from 'Helpers/inventoryURL'
import { skuNewPage, singleSKU, skuListPage } from 'Helpers/warehouseURL'
import { amountRounding } from 'Helpers/helpers';
// Redux imports
import {
  setProduct,
  updateSkuProduct,
  getProductDetails,
  getFilterProduct,
  getProduct,
  getSingleSkuProductRequest,
  patchSingleSkuProductRequest,
  clearDuplicate,
} from 'Ducks/producttfes'

// React Component import
import SkuList from 'Components/PopupPage/SkuList'
import { Receipt } from '@material-ui/icons'
import view from '../../../crm/inventoryEnquiry/view'
import data from '@iconify/icons-ic/baseline-delete-forever'

const INIT_STATE = {
  switch: false,
  toggle: false,
  element: null,
  // form Selection | true = editForm , false = replicateForm
  toggleFormSelection: true,
  partNumber: '',
  description: '',
  suppNumber: '',
  name: '',
  avgPrice: 0,
  listPrice: 0,
  remarks: "",
  address: "",
  grpOne: "",
  grpTwo: "",
  size: "",
  selOne: "",
  selTwo: "",
  material: "",
  brand: "",
  supp1: "",
  supp2: "",
  supp3: "",
  supp4: "",
  supp5: "",
  uom: "",
  currency: "",
  unitCost: 0,
  quantity: 0,
  location: '',
  edit: false,
  view:false,
  isDuplicate:false,
  errorMsg: "",
  isFreight: false
}

class SKU_new_customer extends Component {
  constructor(props) {
    super(props)

    this.state = INIT_STATE
    this.onSubmit = this.onSubmit.bind(this)
    this.onDuplicate = this.onDuplicate.bind(this)
    this.onChangeToEdit = this.onChangeToEdit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    // this.getInfo = this.getInfo.bind(this)
    this.resetTotalState = this.resetTotalState.bind(this)
  }

  componentDidMount() {
    this.props.getProductDetails()
    const skuId = this.props.match.params.id
    if (skuId) {
      this.props.getSingleSkuProductRequest(skuId);
    }

    if (this.props.SkuProduct.data && this.props.SkuProduct.data.id) {
      this.resetTotalState()
    }

    if (this.props.history.location.state === undefined){
      this.setState({
        isDuplicate:false
      })
    }
    else{
       if(this.props.history.location.state.isDuplicate){
       let isDuplicate = this.props.location.state.isDuplicate;
       this.setState({
       isDuplicate:isDuplicate
     })
     }
     if(this.props.history.location.state.view){
       let view  =this.props.location.state.isDuplicate
       this.setState({
        view:view
      })

     }
    }
  }



  resetTotalState() {
    let newState = {
      ...INIT_STATE,
      isFreight: this.props.SkuProduct.data.isFreight
        ? this.props.SkuProduct.data.isFreight
        : false,
      partNumber: this.props.SkuProduct.data.partNumber
        ? this.props.SkuProduct.data.partNumber
        : '',
      description: this.props.SkuProduct.data.description
        ? this.props.SkuProduct.data.description
        : '',
      avgPrice: this.props.SkuProduct.data.avgPrice
        ? this.props.SkuProduct.data.avgPrice
        : '',
      listPrice: this.props.SkuProduct.data.listPrice
        ? this.props.SkuProduct.data.listPrice
        : '',
      remarks: this.props.SkuProduct.data.remarks
        ? this.props.SkuProduct.data.remarks
        : '',
      selOne:
        this.props.SkuProduct.data.selOne &&
        this.props.SkuProduct.data.selOne.id
          ? this.props.SkuProduct.data.selOne.id
          : this.props.SkuProduct.data.selOne,
      selTwo:
        this.props.SkuProduct.data.selTwo &&
        this.props.SkuProduct.data.selTwo.id
          ? this.props.SkuProduct.data.selTwo.id
          : this.props.SkuProduct.data.selTwo,
      unitCost: this.props.SkuProduct.data.unitCost
        ? this.props.SkuProduct.data.unitCost
        : '',
      location: this.props.SkuProduct.data.location
        ? this.props.SkuProduct.data.location
        : '',
      // id: this.props.SkuProduct.data.id,
      edit: false,
      toggleFormSelection: false,
      grpOne:
        this.props.SkuProduct.data.grpOne &&
        this.props.SkuProduct.data.grpOne.id
          ? this.props.SkuProduct.data.grpOne.id
          : this.props.SkuProduct.data.grpOne,
      grpTwo:
        this.props.SkuProduct.data.grpTwo &&
        this.props.SkuProduct.data.grpTwo.id
          ? this.props.SkuProduct.data.grpTwo.id
          : this.props.SkuProduct.data.grpTwo,
      size:
        this.props.SkuProduct.data.size && this.props.SkuProduct.data.size.id
          ? this.props.SkuProduct.data.size.id
          : this.props.SkuProduct.data.size,     
      material:
        this.props.SkuProduct.data.material &&
        this.props.SkuProduct.data.material.id
          ? this.props.SkuProduct.data.material.id
          : this.props.SkuProduct.data.material,
      brand:
        this.props.SkuProduct.data.brand &&
        this.props.SkuProduct.data.brand.id
          ? this.props.SkuProduct.data.brand.id
          : this.props.SkuProduct.data.brand,
      supp1:
        this.props.SkuProduct.data.supp1 && this.props.SkuProduct.data.supp1.id
          ? this.props.SkuProduct.data.supp1.id
          : this.props.SkuProduct.data.supp1,
      supp2:
        this.props.SkuProduct.data.supp2 && this.props.SkuProduct.data.supp2.id
          ? this.props.SkuProduct.data.supp2.id
          : this.props.SkuProduct.data.supp2,
      supp3:
        this.props.SkuProduct.data.supp3 && this.props.SkuProduct.data.supp3.id
          ? this.props.SkuProduct.data.supp3.id
          : this.props.SkuProduct.data.supp3,
      supp4:
        this.props.SkuProduct.data.supp4 && this.props.SkuProduct.data.supp4.id
          ? this.props.SkuProduct.data.supp4.id
          : this.props.SkuProduct.data.supp4,
      supp5:
        this.props.SkuProduct.data.supp5 && this.props.SkuProduct.data.supp5.id
          ? this.props.SkuProduct.data.supp5.id
          : this.props.SkuProduct.data.supp5,
      uom:
        this.props.SkuProduct.data.uom && this.props.SkuProduct.data.uom.id
          ? this.props.SkuProduct.data.uom.id
          : this.props.SkuProduct.data.uom,
      currency:
        this.props.SkuProduct.data.currency &&
        this.props.SkuProduct.data.currency.id
          ? this.props.SkuProduct.data.currency.id
          : this.props.SkuProduct.data.currency,
    }
    this.setState({
      ...this.state,
      ...newState,
    })
  }

  componentDidUpdate(prevProps, prevState) {

    if (prevProps.SkuProduct.data !== this.props.SkuProduct.data) {
      if (this.props.SkuProduct.data && this.props.SkuProduct.data.id) {
        if (!this.props.match.params.id) {
          this.props.history.push(singleSKU(this.props.SkuProduct.data.id));
        }
        // this.resetTotalState();

        // disables edit fields if its BOM 
        let view = false;
        let edit = true;
        if (this.props.SkuProduct.data.bom) {
          view = true;
          edit = false;
        }

        let newState = {
          ...INIT_STATE,
          partNumber: this.props.SkuProduct.data.partNumber ? this.props.SkuProduct.data.partNumber : "",
          description: this.props.SkuProduct.data.description ? this.props.SkuProduct.data.description : "",
          avgPrice: this.props.SkuProduct.data.avgPrice ? amountRounding(2, this.props.SkuProduct.data.avgPrice) : "",
          listPrice: this.props.SkuProduct.data.listPrice ? amountRounding(2, this.props.SkuProduct.data.listPrice) : "",
          remarks: this.props.SkuProduct.data.remarks ? this.props.SkuProduct.data.remarks : "",
          selOne: this.props.SkuProduct.data.selOne ? this.props.SkuProduct.data.selOne : "",
          selTwo: this.props.SkuProduct.data.selTwo ? this.props.SkuProduct.data.selTwo : "",
          unitCost: this.props.SkuProduct.data.unitCost ? amountRounding(2, this.props.SkuProduct.data.unitCost) : "",
          location: this.props.SkuProduct.data.location ? this.props.SkuProduct.data.location: "",
          isFreight: this.props.SkuProduct.data.isFreight ? this.props.SkuProduct.data.isFreight : false,
          id: this.props.SkuProduct.data.id ,
          edit: edit,
          view: view,
          toggleFormSelection: true,
          // need to check why this section the props is so different after patching/posting... this is a quick fix 
          grpOne:
            this.props.SkuProduct.data.grpOne &&
            this.props.SkuProduct.data.grpOne.id
              ? this.props.SkuProduct.data.grpOne.id
              : this.props.SkuProduct.data.grpOne,
          grpTwo:
            this.props.SkuProduct.data.grpTwo &&
            this.props.SkuProduct.data.grpTwo.id
              ? this.props.SkuProduct.data.grpTwo.id
              : this.props.SkuProduct.data.grpTwo,
          size:
            this.props.SkuProduct.data.size &&
            this.props.SkuProduct.data.size.id
              ? this.props.SkuProduct.data.size.id
              : this.props.SkuProduct.data.size,          
          material:
            this.props.SkuProduct.data.material &&
            this.props.SkuProduct.data.material.id
              ? this.props.SkuProduct.data.material.id
              : this.props.SkuProduct.data.material,
          brand:
            this.props.SkuProduct.data.brand &&
            this.props.SkuProduct.data.brand.id
              ? this.props.SkuProduct.data.brand.id
              : this.props.SkuProduct.data.brand,
          supp1:
            this.props.SkuProduct.data.supp1 &&
            this.props.SkuProduct.data.supp1.id
              ? this.props.SkuProduct.data.supp1.id
              : this.props.SkuProduct.data.supp1,
          supp2:
            this.props.SkuProduct.data.supp2 &&
            this.props.SkuProduct.data.supp2.id
              ? this.props.SkuProduct.data.supp2.id
              : this.props.SkuProduct.data.supp2,
          supp3:
            this.props.SkuProduct.data.supp3 &&
            this.props.SkuProduct.data.supp3.id
              ? this.props.SkuProduct.data.supp3.id
              : this.props.SkuProduct.data.supp3,
          supp4:
            this.props.SkuProduct.data.supp4 &&
            this.props.SkuProduct.data.supp4.id
              ? this.props.SkuProduct.data.supp4.id
              : this.props.SkuProduct.data.supp4,
          supp5:
            this.props.SkuProduct.data.supp5 &&
            this.props.SkuProduct.data.supp5.id
              ? this.props.SkuProduct.data.supp5.id
              : this.props.SkuProduct.data.supp5,
          uom:
            this.props.SkuProduct.data.uom && this.props.SkuProduct.data.uom.id
              ? this.props.SkuProduct.data.uom.id
              : this.props.SkuProduct.data.uom,
          currency:
            this.props.SkuProduct.data.currency &&
            this.props.SkuProduct.data.currency.id
              ? this.props.SkuProduct.data.currency.id
              : this.props.SkuProduct.data.currency,
        }
        this.setState({
          ...this.state,
          ...newState,
        })
      }

      // if(prevProps.SkuProduct.data.id !== this.props.SkuProduct.data.id)
    }
  }



  onSubmit() {

    let error = false;
    let errorMsg = "";

    //error checking 
    if (this.state.partNumber === "") {
      error = true;
      errorMsg = "Part Number cannot be empty!"
    }

    if (error) { 
      this.setState({ errorMsg : errorMsg })
      return null
    }

    const data = {
      partNumber: this.state.partNumber ? this.state.partNumber : "",
      description: this.state.description ? this.state.description : "",
      avgPrice: this.state.avgPrice ? this.state.avgPrice : "",
      listPrice: this.state.listPrice ? this.state.listPrice : "",
      remarks: this.state.remarks ? this.state.remarks : "",
      unitCost: this.state.unitCost ? this.state.unitCost : "",
      grpOne: this.state.grpOne ? this.state.grpOne : "",
      grpTwo: this.state.grpTwo ? this.state.grpTwo : "",
      size: this.state.size ? this.state.size : "",
      selOne: this.state.selOne ? this.state.selOne : "",
      selTwo: this.state.selTwo ? this.state.selTwo : "",
      material: this.state.material ? this.state.material : "",
      brand: this.state.brand ? this.state.brand : "",
      supp1: this.state.supp1 ? this.state.supp1 : "",
      supp2: this.state.supp2 ? this.state.supp2 : "",
      supp3: this.state.supp3 ? this.state.supp3 : "",
      supp4: this.state.supp4 ? this.state.supp4 : "",
      supp5: this.state.supp5 ? this.state.supp5 : "",
      uom: this.state.uom ? this.state.uom : "",
      location: this.state.location ? this.state.location : "",
      currency: this.state.currency ? this.state.currency : "",
      isFreight:this.state.isFreight? this.state.isFreight:false
    };

    // If edit/update onSubmit
    if (this.state.edit && this.state.isDuplicate !== true) {
      data.id = this.state.id
      this.props.patchSingleSkuProductRequest(data)
    } else {
      const{state}=this.props.history.location
      if(this.state.isDuplicate){
        let data ={...state}
        delete data.isDuplicate
        this.props.history.replace({state:data})
      }
      // If Save as new onSubmit
      this.props.setProduct(data)
    }
    this.setState({
      view:true,
      isDuplicate:false,
      edit:true,
      toggleFormSelection:true,
      errorMsg: ""
    })
  }
  onDuplicate(){
    this.setState({
      isDuplicate:true,
      view:false,
      partNumber:"",
      edit:false,
      toggleFormSelection:false
    })  
    this.props.history.push(skuNewPage)
  //  alert("try onDuplicate ")
  }
  onChangeToEdit(){
    this.setState({
      view:false,
    })
    
  //  alert("try onChangeToEdit ")
  }
 
  handleChange(field, value) {
    this.setState({ [field]: value })
  }

  handleCheck = (e) =>{
    let checkStatus = this.state.isFreight
    this.setState({
      isFreight:!checkStatus

    })
  }

  checkDisabled() {
    if(this.state.view){
      return false
    }else{
      return true
    }
    
  }

  buttonClick = (target) => {
    this.setState({
      toggle: true,
      element: target,
      filter: {
        ...this.state.filter,
        [target]: this.state[target],
      },
    })
    const filt = {
      [target]: this.state[target],
    };
    this.props.getFilterProduct(0, 0, [filt], "", "");
  };

  restartToggle = () => {
    this.setState({
      toggle: false,
    })
  }


  render() {
    const {
      partNumber,
      description,
      listPrice,
      grpOne,
      grpTwo,
      selOne,
      selTwo,
      size,
      material,
      supp1,
      supp2,
      supp3,
      supp4,
      supp5,
      toggleFormSelection,
      brand,
      unitCost,
      location,
      remarks,
      uom,
      view,
      isDuplicate,
      currency,
    } = this.state
    //const { brands, materials } = this.props.ProductDetails;
    return (
      <React.Fragment>
        {this.props.SkuProduct.loading ? (
          <RctPageLoader />
        ) : (
          <FormWrapper
            onSave={this.onSubmit}
            onDuplicate={this.onDuplicate}
            onChangeToEdit={this.onChangeToEdit}
            disabled={ !this.props.SkuProduct.data.bom ? true : false }
            title="Back To SKU Maintenance"
            centerTitle={this.state.edit ? 'Edit a SKU' : 'Create a SKU'}
            promptMessage=" "
            listRedirect={skuListPage}
            showEditButton={this.state.view ? true : false }
            showDuplicateButton={this.state.edit ? true : false}
          >
            {/* {this.state.view&&<div onClick={this.onChangeToEdit} className="onChangeToEdit_btn"  >
              <button className="primary_btn"> Edit  </button>
              </div>} */}
            <form autoComplete="off"  className={this.state.view?"uneditable":( this.state.isDuplicate ?"onDuplicate":"onEdit" )}>
              <div> {this.state.errorMsg && <h4 className="text-danger text-center"> {this.state.errorMsg} </h4>} </div>
              <div className="unvisibleBtn">
                <FormInput
                  label="Description"
                  value={description}
                  target="description"
                  handleChange={this.handleChange}
                  buttonClick={this.buttonClick}
                  isToggledEditForm={toggleFormSelection}
                  readOnly={view}
                  multiline
                  rows={4}
                  original={this.props.SkuProduct.data.description
                    ? this.props.SkuProduct.data.description
                    : ''}
                />
              </div>
              <div class="row">
                <div class="col-sm unvisibleBtn">
                  <FormInput
                    label="P/N"
                    value={partNumber}
                    target="partNumber"
                    handleChange={this.handleChange}
                    isToggledEditForm={toggleFormSelection}
                    readOnly={view}
                    original={this.props.SkuProduct.data.partNumber ? this.props.SkuProduct.data.partNumber : ""}
                  />
                </div>
                <div class="col-sm">
                  <FormInput
                    label="GRP1"
                    value={grpOne}
                    target="grpOne"
                    buttonClick={this.buttonClick}
                    selectValueKey="id"
                    selectValues={
                      this.props.ProductDetails.data
                        ? this.props.ProductDetails.data.grpOne
                        : []
                    }
                    handleChange={this.handleChange}
                    isToggledEditForm={toggleFormSelection}
                    readOnly={view}
                    original={this.props.SkuProduct.data.grpOne ? this.props.SkuProduct.data.grpOne.id : ""}
                  />
                </div>
                <div class="col-sm">
                  <FormInput
                    label="GRP2"
                    value={grpTwo}
                    target="grpTwo"
                    buttonClick={this.buttonClick}
                    selectValueKey="id"
                    selectValues={
                      this.props.ProductDetails.data
                        ? this.props.ProductDetails.data.grpTwo
                        : []
                    }
                    handleChange={this.handleChange}
                    isToggledEditForm={toggleFormSelection}
                    original={
                      this.props.SkuProduct.data.grpTwo ? this.props.SkuProduct.data.grpTwo.id : ""
                    }
                    readOnly={view}
                  />
                </div>
                <div class="col-sm">
                  <FormInput
                    label="Size"
                    value={size}
                    target="size"
                    buttonClick={this.buttonClick}
                    selectValueKey="id"
                    selectValueName="name"
                    selectValues={
                      this.props.ProductDetails.data
                        ? this.props.ProductDetails.data.sizes
                        : []
                    }
                    handleChange={this.handleChange}
                    isToggledEditForm={toggleFormSelection}
                    original={
                      this.props.SkuProduct.data.size ? this.props.SkuProduct.data.size.id : ""
                    }
                    readOnly={view}
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-sm">
                  <FormInput
                    label="SEL1"
                    value={selOne}
                    target="selOne"
                    handleChange={this.handleChange}
                    isToggledEditForm={toggleFormSelection}
                    readOnly={view}
                    original={
                      this.props.SkuProduct.data.selOne ? this.props.SkuProduct.data.selOne : ""
                    }
                  />
                </div>
                <div class="col-sm">
                  <FormInput
                    label="SEL2"
                    value={selTwo}
                    target="selTwo"
                    handleChange={this.handleChange}
                    isToggledEditForm={toggleFormSelection}
                    readOnly={view}
                    original={
                      this.props.SkuProduct.data.selTwo ? this.props.SkuProduct.data.selTwo : ""
                    }
                  />
                </div>
                <div class="col-sm">
                  <FormInput
                    label="Material"
                    value={material}
                    target="material"
                    selectValues={
                      this.props.ProductDetails.data
                        ? this.props.ProductDetails.data.materials
                        : []
                    }
                    buttonClick={this.buttonClick}
                    onChange={this.handleChange}
                    selectValueKey="id"
                    handleChange={this.handleChange}
                    isToggledEditForm={toggleFormSelection}
                    original={
                      this.props.SkuProduct.data.material ? this.props.SkuProduct.data.material.id : ""
                    }
                    readOnly={view}
                  />
                </div>

                <div class="col-sm">
                  <FormInput
                    label="Brands"
                    value={brand}
                    target="brand"
                    selectValues={
                      this.props.ProductDetails.data
                        ? this.props.ProductDetails.data.brands
                        : []
                    }
                    buttonClick={this.buttonClick}
                    handleChange={this.handleChange}
                    selectValueKey="id"
                    isToggledEditForm={toggleFormSelection}
                    original={
                      this.props.SkuProduct.data.brand ? this.props.SkuProduct.data.brand.id : ""
                    }
                    readOnly={view}
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-sm">
                  <FormInput
                    label="Supp1"
                    value={supp1}
                    target="supp1"
                    buttonClick={this.buttonClick}
                    selectValueKey="id"
                    selectValueName="name"
                    selectValues={
                      this.props.ProductDetails.data
                        ? this.props.ProductDetails.data.supplier
                        : []
                    }
                    handleChange={this.handleChange}
                    isToggledEditForm={toggleFormSelection}
                    original={
                      this.props.SkuProduct.data.supp1 ? this.props.SkuProduct.data.supp1.id : ""
                    }
                    readOnly={view}
                  />
                </div>
                <div class="col-sm">
                  <FormInput
                    label="Supp2"
                    value={supp2}
                    target="supp2"
                    buttonClick={this.buttonClick}
                    selectValueKey="id"
                    selectValues={
                      this.props.ProductDetails.data
                        ? this.props.ProductDetails.data.supplier
                        : []
                    }
                    handleChange={this.handleChange}
                    isToggledEditForm={toggleFormSelection}
                    original={
                      this.props.SkuProduct.data.supp2 ? this.props.SkuProduct.data.supp2.id : ""
                    }
                    readOnly={view}
                  />
                </div>
                <div class="col-sm">
                  <FormInput
                    label="Supp3"
                    value={supp3}
                    target="supp3"
                    buttonClick={this.buttonClick}
                    selectValueKey="id"
                    selectValues={
                      this.props.ProductDetails.data
                        ? this.props.ProductDetails.data.supplier
                        : []
                    }
                    handleChange={this.handleChange}
                    isToggledEditForm={toggleFormSelection}
                    original={
                      this.props.SkuProduct.data.supp3 ? this.props.SkuProduct.data.supp3.id : ""
                    }
                    readOnly={view}
                  />
                </div>
                <div class="col-sm">
                  <FormInput
                    label="Supp4"
                    value={supp4}
                    target="supp4"
                    buttonClick={this.buttonClick}
                    selectValueKey="id"
                    selectValues={
                      this.props.ProductDetails.data
                        ? this.props.ProductDetails.data.supplier
                        : []
                    }
                    handleChange={this.handleChange}
                    isToggledEditForm={toggleFormSelection}
                    original={
                      this.props.SkuProduct.data.supp4 ? this.props.SkuProduct.data.supp4.id : ""
                    }
                    readOnly={view}
                  />
                </div>
                <div class="col-sm">
                  <FormInput
                    label="Supp5"
                    value={supp5}
                    target="supp5"
                    buttonClick={this.buttonClick}
                    selectValueKey="id"
                    selectValueName="name"
                    selectValues={
                      this.props.ProductDetails.data
                        ? this.props.ProductDetails.data.supplier
                        : []
                    }
                    handleChange={this.handleChange}
                    isToggledEditForm={toggleFormSelection}
                    original={
                      this.props.SkuProduct.data.supp5 ? this.props.SkuProduct.data.supp5.id : ""
                    }
                    readOnly={view}
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-sm">
                  <FormInput
                    label="UOM"
                    value={uom}
                    target="uom"
                    buttonClick={this.buttonClick}
                    selectValueKey="id"
                    selectValueName="name"
                    selectValues={
                      this.props.ProductDetails.data
                        ? this.props.ProductDetails.data.uom
                        : []
                    }
                    handleChange={this.handleChange}
                    isToggledEditForm={toggleFormSelection}
                    original={
                      this.props.SkuProduct.data.uom ? this.props.SkuProduct.data.uom.id : ""
                    }
                    readOnly={view}
                  />
                </div>
                <div class="col-sm">
                  <FormInput
                    label="Currency"
                    value={currency}
                    target="currency"
                    buttonClick={this.buttonClick}
                    selectValueKey="id"
                    selectValues={
                      this.props.ProductDetails.data
                        ? this.props.ProductDetails.data.currency
                        : []
                    }
                    handleChange={this.handleChange}
                    isToggledEditForm={toggleFormSelection}
                    original={
                      this.props.SkuProduct.data.currency ? this.props.SkuProduct.data.currency.id : ""
                    }
                    readOnly={view}
                  />
                </div>
                {
                  /*
<div class="col-sm unvisibleBtn">
                  <FormInput
                    label="Unit Cost"
                    value={unitCost}
                    disabled
                    target="unitCost"
                    // hasButton={this.state.edit ? false : true}
                    type="number"
                    handleChange={this.handleChange}
                    isToggledEditForm={toggleFormSelection}
                    originalVal={
                      this.props.SkuProduct.data
                        ? this.props.SkuProduct.data.unitCost
                        : ''
                    }
                  />
                </div>
                  */
                }
                <div class="col-sm unvisibleBtn">
                  <FormInput
                    label="List Price(SGD)"
                    value={listPrice}
                    target="listPrice"
                    type="number"
                    handleChange={this.handleChange}
                    isToggledEditForm={toggleFormSelection}
                    readOnly={view}
                    original={
                      this.props.SkuProduct.data.listPrice ? amountRounding(2, this.props.SkuProduct.data.listPrice) : ""
                    }
                  />
                  
                </div>
                <div class="col-sm unvisibleBtn">
                  <div 
                  style={{color: "rgba(0, 0, 0, 0.54)",
                    padding: "0",
                    fontSize: "1rem",
                    fontWeight: "400",
                    lineHeight: "1",
                    padding:"1rem",
                    
                    }}>Is Freight ? :
                    <Checkbox type='checkbox'
                      // defaultChecked={this.state.isFreight}
                      checked={this.state.isFreight}
                      onChange={ this.handleCheck}
                      style={{
                        marginLeft:"1rem",
                      }}
                      /></div>
                   
                  
                </div>
              </div>
              {
                /*
                <div
                class="col-3 justify-content-md-left"
                style={{ marginLeft: '-10px' }}
              >
                <FormInput
                  label="Location"
                  value={location}
                  target="location"
                  // hasButton={this.state.edit ? false : true}
                  buttonClick={this.buttonClick}
                  handleChange={this.handleChange}
                  isToggledEditForm={toggleFormSelection}
                  originalVal={
                    this.props.SkuProduct.data
                      ? this.props.SkuProduct.data.location
                      : ''
                  }
                />
              </div>
                */
              }
              <div className="unvisibleBtn">
                <FormInput
                  label="Remarks"
                  value={remarks}
                  target="remarks"
                  multiline
                  rows={4}
                  handleChange={this.handleChange}
                  isToggledEditForm={toggleFormSelection}
                  readOnly={view}
                  original={
                    this.props.SkuProduct.data.remarks ? this.props.SkuProduct.data.remarks : ""
                  }
                />
              </div>
            </form>
          </FormWrapper>
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ producttfesState }) => {
  const { ProductFiltered, ProductDetails, SkuProduct } = producttfesState
  return { ProductFiltered, ProductDetails, SkuProduct }
}
export default connect(mapStateToProps, {
  setProduct,
  updateSkuProduct,
  getProductDetails,
  getFilterProduct,
  getSingleSkuProductRequest,
  patchSingleSkuProductRequest,
  clearDuplicate,
})(SKU_new_customer)
