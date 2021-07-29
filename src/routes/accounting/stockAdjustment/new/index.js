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
import RctPageLoader from 'Components/RctPageLoader'
// import { skuNewPage, singleSKU } from 'Helpers/inventoryURL'

// helper url import 
import { inventoryEnquiryListPage } from "Helpers/crmURL";
import { skuNewPage, singleSKU } from 'Helpers/warehouseURL'
import { stockAdjustmentListPage } from "Helpers/accountingURL";

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
import { Receipt } from '@material-ui/icons'

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
  currency:"",
  unitCost: 0,
  quantity: 0,
  location: '',
  edit: false,
}

class InventoryEnquiryForm extends Component {
  constructor(props) {
    super(props)

    this.state = INIT_STATE
    this.onSubmit = this.onSubmit.bind(this)
    // this.handleChange = this.handleChange.bind(this)
    this.getInfo = this.getInfo.bind(this)
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
  }

  resetTotalState() {
    let newState = {
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
      unitCost: this.props.SkuProduct.data.unitCost
        ? this.props.SkuProduct.data.unitCost
        : '',
      location: this.props.SkuProduct.data.location
        ? this.props.SkuProduct.data.location
        : '',
      // id: this.props.SkuProduct.data.id,
      edit: false,
      // toggleFormSelection: false,
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

        let newState = {
          partNumber: this.props.SkuProduct.data.partNumber,
          description: this.props.SkuProduct.data.description,
          avgPrice: this.props.SkuProduct.data.avgPrice,
          listPrice: this.props.SkuProduct.data.listPrice,
          remarks: this.props.SkuProduct.data.remarks,
          unitCost: this.props.SkuProduct.data.unitCost,
          location: this.props.SkuProduct.data.location,
          id: this.props.SkuProduct.data.id,
          edit: true,
          // toggleFormSelection: true,
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

  getInfo(id) {
    const test = this.props.ProductFiltered.data
    test.map((source) => {
      if (source.id == id) {
        this.setState({
          // To Close the popup
          toggle: false,
          partNumber: source.partNumber,
          description: source.description,
          grpOne: source.grpOne && source.grpOne.id,
          grpTwo: source.grpTwo && source.grpTwo.id,
          size: source.size && source.size.id,
          uom: source.uom && source.uom.id,
          unitCost: source.unitCost,
          listPrice: source.listPrice,
          selOne: source.selOne && source.selOne.id,
          selTwo: source.selTwo && source.selTwo.id,
          material: source.material && source.material.id,
          brand: source.brand && source.brand.id,
          supp1: source.supp1 && source.supp1.id,
          supp2: source.supp2 && source.supp2.id,
          supp3: source.supp3 && source.supp3.id,
          supp4: source.supp4 && source.supp4.id,
          supp5: source.supp5 && source.supp5.id,
          remarks: source.remarks,
        })
      }
    })
  }

  onSubmit() {
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
    };

    // If edit/update onSubmit
    if (this.state.edit) {
      data.id = this.state.id
      this.props.patchSingleSkuProductRequest(data)
    } else {
      // If Save as new onSubmit
      this.props.setProduct(data)
    }
  }
  // handleChange(field, value) {
  //   this.setState({ [field]: value })
  // }

  checkDisabled() {
    return false
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
      currency,
    } = this.state
    //const { brands, materials } = this.props.ProductDetails;
    return (
      <div className="inventoryEnquiryViewPage" >
        {this.props.SkuProduct.loading ? (
          <RctPageLoader />
        ) : (
          <FormWrapper
            onSave={this.onSubmit}
            onSaveNew={this.onSaveNew}
            disabled={this.checkDisabled()}
            title="Back To Stock Adjustment List"
            centerTitle=" Inventory Enquiry Form"
            promptMessage="【 Read Only 】 "
            listRedirect={stockAdjustmentListPage}
          >
            <form autoComplete="off">
              <div class="row">
                <div class="col-sm-4 unvisibleBtn">
                  <FormInput
                    label="P/N"
                    value={partNumber}
                    target="partNumber"
                    readOnly={!this.checkDisabled()}
                    //handleChange={this.handleChange}
                    // hasButton={this.state.edit ? false : true}
                    isToggledEditForm={toggleFormSelection}
                    original={
                      this.props.SkuProduct.data.partNumber && this.props.SkuProduct.data.partNumber !== null
                        ? this.props.SkuProduct.data.partNumber
                        : ''
                    }
                  />
                </div>
                <div class="col-sm-8">
                  <FormInput
                    label="Description"
                    value={description}
                    target="description"
                    readOnly={!this.checkDisabled()}
                    //handleChange={this.handleChange}
                    // hasButton={this.state.edit ? false : true}
                    buttonClick={this.buttonClick}
                    isToggledEditForm={toggleFormSelection}
                    original={
                      this.props.SkuProduct.data.description && this.props.SkuProduct.data.desccription !== null
                        ? this.props.SkuProduct.data.description
                        : ''
                    }
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-sm">
                  <FormInput
                    label="GRP1"
                    value={grpOne}
                    target="grpOne"
                    buttonClick={this.buttonClick}
                    readOnly={!this.checkDisabled()}
                    // hasButton={this.state.edit ? false : true}
                    selectValueKey="id"
                    selectValues={
                      this.props.ProductDetails.data
                        ? this.props.ProductDetails.data.grpOne
                        : []
                    }
                    //handleChange={this.handleChange}
                    isToggledEditForm={toggleFormSelection}
                    original={
                      this.props.SkuProduct.data.grpOne && this.props.SkuProduct.data.grpOne !== null
                        ? this.props.SkuProduct.data.grpOne.id
                        : ''
                    }
                  />
                </div>
                <div class="col-sm">
                  <FormInput
                    label="GRP2"
                    value={grpTwo}
                    target="grpTwo"
                    // hasButton={this.state.edit ? false : true}
                    readOnly={!this.checkDisabled()}
                    buttonClick={this.buttonClick}
                    selectValueKey="id"
                    selectValues={
                      this.props.ProductDetails.data
                        ? this.props.ProductDetails.data.grpTwo
                        : []
                    }
                    //handleChange={this.handleChange}
                    isToggledEditForm={toggleFormSelection}
                    original={
                      this.props.SkuProduct.data.grpTwo && this.props.SkuProduct.data.grpTwo !== null
                        ? this.props.SkuProduct.data.grpTwo.id
                        : ''
                    }
                  />
                </div>
                <div class="col-sm">
                  <FormInput
                    label="Size"
                    value={size}
                    target="size"
                    // hasButton={this.state.edit ? false : true}
                    buttonClick={this.buttonClick}
                    selectValueKey="id"
                    selectValueName="name"
                    selectValues={
                      this.props.ProductDetails.data
                        ? this.props.ProductDetails.data.sizes
                        : []
                    }
                    //handleChange={this.handleChange}
                    readOnly={!this.checkDisabled()}
                    isToggledEditForm={toggleFormSelection}
                    original={
                      this.props.SkuProduct.data.size && this.props.SkuProduct.data.size !== null
                        ? this.props.SkuProduct.data.size.id
                        : ''
                    }
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-sm">
                  <FormInput
                    label="SEL1"
                    value={selOne}
                    target="selOne"
                    // hasButton={this.state.edit ? false : true}
                    // buttonClick={this.buttonClick}
                    // selectValueKey="id"
                    // selectValues={
                    //   this.props.ProductDetails.data
                    //     ? this.props.ProductDetails.data.selOne
                    //     : []
                    // }
                    //handleChange={this.handleChange}
                    readOnly={!this.checkDisabled()}
                    isToggledEditForm={toggleFormSelection}
                    original={
                      this.props.SkuProduct.data.selOne
                        ? this.props.SkuProduct.data.selOne
                        : ''
                    }
                  />
                </div>
                <div class="col-sm">
                  <FormInput
                    label="SEL2"
                    value={selTwo}
                    target="selTwo"
                    // hasButton={this.state.edit ? false : true}
                    // buttonClick={this.buttonClick}
                    // selectValueKey="id"
                    // selectValues={
                    //   this.props.ProductDetails.data
                    //     ? this.props.ProductDetails.data.selTwo
                    //     : []
                    // }
                    //handleChange={this.handleChange}
                    readOnly={!this.checkDisabled()}
                    isToggledEditForm={toggleFormSelection}
                    original={
                      this.props.SkuProduct.data.selTwo
                        ? this.props.SkuProduct.data.selTwo
                        : ''
                    }
                  />
                </div>
                <div class="col-sm">
                  <FormInput
                    label="Material"
                    value={material}
                    target="material"
                    // hasButton={this.state.edit ? false : true}
                    selectValues={
                      this.props.ProductDetails.data
                        ? this.props.ProductDetails.data.materials
                        : []
                    }
                    buttonClick={this.buttonClick}
                    onChange={this.handleChange}
                    selectValueKey="id"
                    //handleChange={this.handleChange}
                    readOnly={!this.checkDisabled()}
                    isToggledEditForm={toggleFormSelection}
                    original={
                      this.props.SkuProduct.data.material && this.props.SkuProduct.data.material !== null
                        ? this.props.SkuProduct.data.material.id
                        : ''
                    }
                  />
                </div>

                <div class="col-sm">
                  <FormInput
                    label="Brands"
                    value={brand}
                    target="brand"
                    // hasButton={this.state.edit ? false : true}
                    readOnly={!this.checkDisabled()}
                    selectValues={
                      this.props.ProductDetails.data
                        ? this.props.ProductDetails.data.brands
                        : []
                    }
                    buttonClick={this.buttonClick}
                    //handleChange={this.handleChange}
                    readOnly={!this.checkDisabled()}
                    selectValueKey="id"
                    isToggledEditForm={toggleFormSelection}
                    original={
                      this.props.SkuProduct.data.brand && this.props.SkuProduct.data.brand !== null
                        ? this.props.SkuProduct.data.brand.id
                        : ''
                    }
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-sm">
                  <FormInput
                    label="Supp1"
                    value={supp1}
                    target="supp1"
                    // hasButton={this.state.edit ? false : true}
                    readOnly={!this.checkDisabled()}
                    buttonClick={this.buttonClick}
                    selectValueKey="id"
                    selectValueName="name"
                    selectValues={
                      this.props.ProductDetails.data
                        ? this.props.ProductDetails.data.supplier
                        : []
                    }
                    //handleChange={this.handleChange}
                    readOnly={!this.checkDisabled()}
                    isToggledEditForm={toggleFormSelection}
                    original={
                      this.props.SkuProduct.data.supp1 && this.props.SkuProduct.data.supp1 !== null
                        ? this.props.SkuProduct.data.supp1.id
                        : ''
                    }
                  />
                </div>
                <div class="col-sm">
                  <FormInput
                    label="Supp2"
                    value={supp2}
                    target="supp2"
                    // hasButton={this.state.edit ? false : true}
                    buttonClick={this.buttonClick}
                    selectValueKey="id"
                    selectValues={
                      this.props.ProductDetails.data
                        ? this.props.ProductDetails.data.supplier
                        : []
                    }
                    //handleChange={this.handleChange}
                    readOnly={!this.checkDisabled()}
                    isToggledEditForm={toggleFormSelection}
                    original={
                      this.props.SkuProduct.data.supp2 && this.props.SkuProduct.data.supp2 !== null
                        ? this.props.SkuProduct.data.supp2.id
                        : ''
                    }
                  />
                </div>
                <div class="col-sm">
                  <FormInput
                    label="Supp3"
                    value={supp3}
                    target="supp3"
                    // hasButton={this.state.edit ? false : true}
                    buttonClick={this.buttonClick}
                    selectValueKey="id"
                    selectValues={
                      this.props.ProductDetails.data
                        ? this.props.ProductDetails.data.supplier
                        : []
                    }
                    //handleChange={this.handleChange}
                    readOnly={!this.checkDisabled()}
                    isToggledEditForm={toggleFormSelection}
                    original={
                      this.props.SkuProduct.data.supp3 && this.props.SkuProduct.data.supp3 !== null
                        ? this.props.SkuProduct.data.supp3.id
                        : ''
                    }
                  />
                </div>
                <div class="col-sm">
                  <FormInput
                    label="Supp4"
                    value={supp4}
                    target="supp4"
                    // hasButton={this.state.edit ? false : true}
                    readOnly={!this.checkDisabled()}
                    buttonClick={this.buttonClick}
                    selectValueKey="id"
                    selectValues={
                      this.props.ProductDetails.data
                        ? this.props.ProductDetails.data.supplier
                        : []
                    }
                    //handleChange={this.handleChange}
                    isToggledEditForm={toggleFormSelection}
                    original={
                      this.props.SkuProduct.data.supp4 && this.props.SkuProduct.data.supp4 !== null
                        ? this.props.SkuProduct.data.supp4.id
                        : ''
                    }
                  />
                </div>
                <div class="col-sm">
                  <FormInput
                    label="Supp5"
                    value={supp5}
                    target="supp5"
                    // hasButton={this.state.edit ? false : true}
                    readOnly={!this.checkDisabled()}
                    buttonClick={this.buttonClick}
                    selectValueKey="id"
                    selectValueName="name"
                    selectValues={
                      this.props.ProductDetails.data
                        ? this.props.ProductDetails.data.supplier
                        : []
                    }
                    //handleChange={this.handleChange}
                    isToggledEditForm={toggleFormSelection}
                    original={
                      this.props.SkuProduct.data.supp5 && this.props.SkuProduct.data.supp5 !== null
                        ? this.props.SkuProduct.data.supp5.id
                        : ''
                    }
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-sm">
                  <FormInput
                    label="UOM"
                    value={uom}
                    target="uom"
                    // hasButton={this.state.edit ? false : true}
                    readOnly={!this.checkDisabled()}
                    buttonClick={this.buttonClick}
                    selectValueKey="id"
                    selectValueName="name"
                    selectValues={
                      this.props.ProductDetails.data
                        ? this.props.ProductDetails.data.uom
                        : []
                    }
                    //handleChange={this.handleChange}
                    isToggledEditForm={toggleFormSelection}
                    original={
                      this.props.SkuProduct.data.uom && this.props.SkuProduct.data.uom !== null
                        ? this.props.SkuProduct.data.uom.id
                        : ''
                    }
                  />
                </div>
                <div class="col-sm">
                  <FormInput
                    label="Currency"
                    value={currency}
                    target="currency"
                    // hasButton={this.state.edit ? false : true}
                    readOnly={!this.checkDisabled()}
                    buttonClick={this.buttonClick}
                    selectValueKey="id"
                    selectValues={
                      this.props.ProductDetails.data
                        ? this.props.ProductDetails.data.currency
                        : []
                    }
                    //handleChange={this.handleChange}
                    isToggledEditForm={toggleFormSelection}
                    original={
                      this.props.SkuProduct.data.currency && this.props.SkuProduct.data.currency !== null
                        ? this.props.SkuProduct.data.currency.id
                        : ''
                    }
                  />
                </div>
                {/* <div class="col-sm unvisibleBtn">
                  <FormInput
                    label="Unit Cost"
                    value={unitCost}
                    target="unitCost"
                    // hasButton={this.state.edit ? false : true}
                    readOnly={!this.checkDisabled()}
                    type="number"
                    //handleChange={this.handleChange}
                    isToggledEditForm={toggleFormSelection}
                    originalVal={
                      this.props.SkuProduct.data
                        ? this.props.SkuProduct.data.unitCost
                        : ''
                    }
                  />
                </div> */}
                <div class="col-sm unvisibleBtn">
                  <FormInput
                    label="List Price(SGD)"
                    value={listPrice}
                    target="listPrice"
                    // hasButton={this.state.edit ? false : true}
                    type="number"
                    //handleChange={this.handleChange}
                    readOnly={!this.checkDisabled()}
                    isToggledEditForm={toggleFormSelection}
                    original={
                      this.props.SkuProduct.data.listPrice && this.props.SkuProduct.data.listPrice !== null
                        ? this.props.SkuProduct.data.listPrice
                        : null
                    }
                  />
                </div>
                <div  class="col-sm unvisibleBtn" >
                <FormInput
                  label="Location"
                  value={location}
                  target="location"
                  // hasButton={this.state.edit ? false : true}
                  buttonClick={this.buttonClick}
                  //handleChange={this.handleChange}
                  readOnly={!this.checkDisabled()}
                  isToggledEditForm={toggleFormSelection}
                  original={
                    this.props.SkuProduct.data.location && this.props.SkuProduct.data.location !== null
                      ? this.props.SkuProduct.data.location
                      : ''
                  }
                />
              </div>
              </div>
              
              <div className="unvisibleBtn">
                <FormInput
                  label="Remarks"
                  value={remarks}
                  target="remarks"
                  multiline
                  rows={4}
                  // hasButton={this.state.edit ? false : true}
                  //handleChange={this.handleChange}
                  readOnly={!this.checkDisabled()}
                  isToggledEditForm={toggleFormSelection}
                  original={
                    this.props.SkuProduct.data.remarks && this.props.SkuProduct.data.remarks !== null
                      ? this.props.SkuProduct.data.remarks
                      : ''
                  }
                />
              </div>
            </form>
          
          </FormWrapper>
        )}
      </div>
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
})(InventoryEnquiryForm)
