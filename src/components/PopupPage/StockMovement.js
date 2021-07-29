import React, { Component } from "react";
 import { connect } from 'react-redux'

//sub components
import DialogRoot from 'Components/Dialog/DialogRoot'
import FormInput from "Components/Form/FormInput";
//icon
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
// Actions
// import {patchSingleQtyPacking } from "Ducks/packing";
import { getMoveLines, patchSingleSkuPackingOrderRequest } from "Ducks/packing";
import { getLocationDetails, patchSingleSku,createStockMoveSkuForm,getProductDetails,getFilterProduct } from "Ducks/producttfes";
import { amountRounding } from 'Helpers/helpers'
// import{createStockOperationForm,createStockMoveSkuForm} from "Ducks/stocktfes"
class StockMovement extends Component {
  constructor(props) {
      super(props);
     
    this.state = {
      splitAmount: 0,
      toggle: false,
      saveData:false,
      errorMsg: "",
      qty: this.props.rowData.quantity ? amountRounding(2,this.props.rowData.quantity) : 0,
      location: this.props.rowData.location && this.props.rowData.location.name ? this.props.rowData.location.name : "",
      newLocation: "",
      arrivedQty: this.props.rowData.quantity ? amountRounding(2,this.props.rowData.quantity) : 0,
    }
  }
  componentDidMount() {
    this.props.getLocationDetails();
    /*
    if (this.state.saveData == true) {
      this.props.getFilterProduct(0, 0, "", "", "")
    }
    */
}

  SaveBtn(e) {
    this.setState({
      toggle: false,
      saveData:true
    });
    let skudata = { ...this.props.rowData, location: this.state.newLocation }
    let sku={...this.props.rowData, location: this.state.newLocation,quantity:this.state.arrivedQty}
    let Data={type:"internal",
    destination:this.state.newLocation,
      status: "closed",
      moveItems: [
        { qty: this.state.arrivedQty,
          productId: this.props.rowData.product,
          skuId: this.props.rowData._id
        }
      ]
    }
    /*
    let moveSku = {
      lines: [{
        qty: this.state.qty,
        arrivedQty: this.state.arrivedQty,
        unitCost: this.props.rowData.unitCost,
        productId: this.props.rowData.product,
        location: this.state.newLocation,
        remarks:this.props.rowData.remarks
      }],
      productId: this.props.rowData.product,
      sku: this.props.rowData._id,
      destinationId: this.state.newLocation,
      qty: this.state.qty,
      lineNumber: 0,
      remainingQty:0,
      description:""
      
    }
    */

   if (parseFloat(this.state.qty) < parseFloat(this.state.arrivedQty)) {
     this.setState({ errorMsg: "Cannot move more than actual quantity" })
    } else if (this.state.newLocation === "") {
      this.setState({ errorMsg: "new location cannot be empty"})
    } else {
      //this.props.patchSingleSku(skudata)
      // this.props.createStockOperationForm(Data)
     this.props.createStockMoveSkuForm(Data)
     //this.props.getFilterProduct(0, 0, "", "", "")
     this.props.saveButton()
      //trigger refresh of list view
      this.props.handleHide(true)
    }
    
  }
restartToggle = () => {
   
      this.setState({
        toggle: false,
      })
   
  }

handleChange = (field, value) => {

    this.setState({
      [field]: value,
    })
  }
handleChangeQty = (field, value) => {
   //need to parse into Int or it will become string 
   let qty = parseInt(this.state.qty);
   let inputValue = parseInt(value)

   if (inputValue > qty) {
     this.setState({ errorMsg: "Split qty cannot be more than current Qty!"})
   } else {
     this.setState({ errorMsg: ""})
   }
   this.setState({
     [field]: inputValue,
   })

  }

  render() {
    const { qty, arrivedQty, location, newLocation } = this.state
    return (
      <React.Fragment>
        <form autoComplete="off">
          {this.state.errorMsg && (<h4 class="text-danger text-center">{this.state.errorMsg}</h4>)}
          <div class="row"><h2 style={{
            margin: "20px auto", color: "#254065 ", letterSpacing: "2px"
          }}>Stock Movement</h2></div>
          <div class="row">
            <div class="col-sm-2"><h3>Current Qty</h3></div>
            <div class="col-sm-3"> <FormInput value={qty} target="qty" readOnly={true} /></div>
            <div class="col-sm-1"/>
            <div class="col-sm-2"><h3>Current Location</h3></div>
            <div class="col-sm-4"> <FormInput value={location} target="location" readOnly={true} /></div>
          </div>
          <div class="row">
            <div class="col-sm-2"><h3>Split qty</h3></div>
            <div class="col-sm-3"> <FormInput value={arrivedQty} target="arrivedQty" handleChange={this.handleChange} /></div>
            <div class="col-sm-1"/>
            <div class="col-sm-2"><h3>New Location</h3></div>
            <div class="col-sm-4"> <FormInput value={newLocation} target="newLocation"
           selectValueKey="id"
           selectValueName="name"
           selectValues={this.props.LocationDetails ? this.props.LocationDetails.data : []}
           handleChange={this.handleChange}
            /></div>
          </div>
          <div class="row" style={{
            margin: "20px 45%"
          }}><button
            type="button"
            onClick={(e) => {this.SaveBtn(e)}}
            style={{
              width: 64,
              height: 36,
              color: "white",
              border: 0,
              cursor: "pointer",
              display: "inline-flex",
              outline: 0,
              padding: 0,
              position: "relative",
              alignItems: "center",
              borderRadius: 4,
              verticalAlign: "middle",
              justifyContent: "center",
              backgroundColor: "#DF0021",
              float: "right"
            }}>
              Save
                    </button>
        
        </div>
        </form>
        <DialogRoot
          show={this.state.toggle}
          handleHide={this.restartToggle}
          size={'lg'}
        >
          <StockMovement
            getInfo={this.getInfoMoveSku}
            show={this.state.toggle}
            handleHide={this.restartToggle}
            state={this.props.data}

          />
        </DialogRoot>
      </React.Fragment>

    )


  }

}
const mapStateToProps = ({producttfesState }) => {
  const { LocationDetails } = producttfesState;
  return { LocationDetails };
};
export default connect(mapStateToProps, {createStockMoveSkuForm,getProductDetails,getFilterProduct,getLocationDetails,
  patchSingleSku})(StockMovement);
