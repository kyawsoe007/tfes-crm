import React, { Component } from "react";
 import { connect } from 'react-redux'

//sub components
import DialogRoot from 'Components/Dialog/DialogRoot'
import FormInput from "Components/Form/FormInput";
//icon
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
// Actions
// import {patchSingleQtyPacking } from "Ducks/packing";
import { getMoveLines, patchSingleSkuPackingOrderRequest } from "Ducks/packing";
import { getLocationDetails, patchSingleSku,createStockMoveSkuForm,getProductDetails,getFilterProduct, addStockCreateJournalEntry, deductStockCreateJournalEntry } from "Ducks/producttfes";
// import{createStockOperationForm,createStockMoveSkuForm} from "Ducks/stocktfes"
class StockAdjustment extends Component {
  constructor(props) {
      super(props);
     
    this.state = {
      splitAmount: 0,
      toggle: false,
      saveData:false,
      errorMsg: "",
      qty: this.props.rowData.quantity ? this.props.rowData.quantity : 0,
      location: this.props.rowData.location && this.props.rowData.location.name ? this.props.rowData.location.name : "",
      newLocation: "",
      arrivedQty: this.props.rowData.quantity ? this.props.rowData.quantity : 0,
      onMoveIn: true,
      onSelectProduct: true,
      scrapLocation: ""
    }
  }

  componentDidMount() {
    this.props.getLocationDetails();
    // check for sku 
    if (this.props.rowData.location) {
      this.setState({ onSelectProduct: false })
    }
    // debugger;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.LocationDetails !== this.props.LocationDetails) {
      for (let i = 0; i < this.props.LocationDetails.data.length; i++) {
        // need to check if scrap is the correct word 
        if (this.props.LocationDetails.data[i].name === "Scrap") {
          this.setState({ scrapLocation: this.props.LocationDetails.data[i].id })
        }
      }
    }
  }

  SaveBtn(e) {
    this.setState({
      toggle: false,
      saveData:true
    });

    // put error validation at top, returns null if error is true 
    let error = false;
    let errorMsg = ""

    if (this.state.newLocation === "") { error = true, errorMsg = "Please select new location! "}
    if (!this.state.onMoveIn && this.state.arrivedQty > this.state.qty) { error = true, errorMsg = "Deducted Qty cannot be lesser than Current Qty" }

    if (error) { 
      this.setState({ errorMsg: errorMsg });
      return null
    }


    let postBodyData = {
      onMoveIn: this.state.onMoveIn,
      onSelectProduct: this.state.onSelectProduct,
      destination: this.state.newLocation,
      status: 'closed',
      moveItems: [
        {
          qty: parseFloat(this.state.arrivedQty),
          productId: this.state.onSelectProduct ? this.props.rowData._id : this.props.rowData.product,
          skuId: this.props.rowData._id,
        }
      ]
    }

    // Product has no SKUID, looping through array just in case in future there's more than 1 product in array  
    if (this.state.onSelectProduct) { 
      for (let i = 0; i < postBodyData.moveItems.length; i++) {
        delete postBodyData.moveItems[i].skuId
      }
    };


    console.log("POSTTT", postBodyData);

    if (this.state.onMoveIn) { 
      this.props.addStockCreateJournalEntry(postBodyData);
    } else {
      this.props.deductStockCreateJournalEntry(postBodyData);
    }

    this.props.saveButton()
      //trigger refresh of list view
    this.props.handleHide(true)
    this.setState({ errorMsg: ""})
    // }
    
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

  render() {
    const { qty, arrivedQty, location, newLocation, type, onMoveIn, onSelectProduct } = this.state
    return (
      <React.Fragment>
        <form autoComplete="off">
          {this.state.errorMsg && (<h4 className="text-danger text-center">{this.state.errorMsg}</h4>)}
          <div className="row">
            <h2 style={{ margin: "20px auto", color: "#254065 ", letterSpacing: "2px"}}> 
              {onMoveIn ? 'Add' : 'Deduct'} Stock Adjustment
            </h2>
          </div>

        <div className="row">
        {
          !onSelectProduct && 
            <ButtonGroup disableElevation variant="contained" color="primary">
              <Button onClick={() => this.setState({onMoveIn: true, newLocation: ""})}>Add Qty</Button>
              <Button onClick={() => this.setState({onMoveIn: false, newLocation: this.state.scrapLocation })}>Deduct Qty</Button>
            </ButtonGroup>
        }

        </div>
          <br></br>
          <div className="row">
            <div className="col-sm-2"><h3>Current Qty</h3></div>
            <div className="col-sm-3"> <FormInput value={qty} target="qty" readOnly={true} /></div>
            <div className="col-sm-1"/>
            {/* <div class="col-sm-2"><h3>Current Location</h3></div>
            <div class="col-sm-4"> <FormInput value={location} target="location" readOnly={true} /></div> */}
          </div>

          <div className="row">
            <div className="col-sm-2"><h3>{onMoveIn ? 'Add' : 'Deduct'} Qty</h3></div>
            <div className="col-sm-3"> <FormInput value={arrivedQty} target="arrivedQty" handleChange={this.handleChange} /></div>
            <div className="col-sm-1"/>
            <div className="col-sm-2"><h3>New Location</h3></div>
            <div className="col-sm-4"> 
                {
                    onMoveIn && 
                    <FormInput 
                        value={newLocation} 
                        target="newLocation"
                        selectValueKey="id"
                        selectValueName="name"
                        selectValues={this.props.LocationDetails ? this.props.LocationDetails.data : []}
                        handleChange={this.handleChange}
                    />
                }

                {
                    !onMoveIn && 
                    <FormInput 
                        value={newLocation}
                        target="newLocation"
                        selectValueKey="id"
                        selectValueName="name"
                        selectValues={this.props.LocationDetails ? this.props.LocationDetails.data : []}
                        handleChange={this.handleChange}
                        readOnly
                    />
                }

            </div>
          </div>
          <div className="row" style={{ margin: "20px 45%"}}>
            <button
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
          <StockAdjustment
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
const mapStateToProps = ({ producttfesState }) => {
  const { LocationDetails } = producttfesState;
  return { LocationDetails };
};
export default connect(mapStateToProps, 
  {
    createStockMoveSkuForm,
    getProductDetails,
    getFilterProduct,
    getLocationDetails, 
    patchSingleSku, 
    addStockCreateJournalEntry,
    deductStockCreateJournalEntry
  })(StockAdjustment);
