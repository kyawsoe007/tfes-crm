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
import { getMoveLines,patchSingleSkuPackingOrderRequest } from "Ducks/packing";
class SplitQty extends Component {
  constructor(props) {
      super(props);
      const{tableMeta,getInfo,rowIndex,currentRowIndex}=props
      console.log('prop',props)
    this.state = {
      currentQty: getInfo[currentRowIndex].qty,
      splitAmount: 1,
      toggle: false,
      errorMsg: "",
    }
    // console.log('hii',rowIndex)
    // this.handleChange = this.handleChange.bind(this);
  }
//   componentDidMount() {
//     this.props.patchSingleQtyPacking();
//     // this.props.getFilterSalesOrder();
// }
  // saveBtn = (e) => {
  //   let splitQty = parseInt(this.state.splitAmount)
  //   let QtyData = this.state.currenctQty - splitQty
  //   console.log('in',this.props.tableMeta.rowData[0])
  //   let data = {
  //     id:this.props.id,
  //     packItems: [{
  //       _id:this.props.getInfo[this.props.tableMeta.rowIndex]._id,
  //       qty: QtyData,
  //       packingListItemId:this.props.getInfo[this.props.tableMeta.rowIndex].packingListItemId,
  //     }]
  //   }
     
  //   this.props.saveToggle();
  // }
  addItem(e){
    e.preventDefault();

    const newItemInput = this.state.splitAmount;
    const currentQty = this.state.currentQty;
    const qty = currentQty - newItemInput
    const obj = {
      'packItemStatus':this.props.getInfo[this.props.currentRowIndex].packItemStatus,
      // removed _id as it will generate a new one on patch
      // '_id':this.props.getInfo[this.props.test]._id,
      'runningNum':this.props.getInfo[this.props.currentRowIndex].runningNum + 1,
      'sku':this.props.getInfo[this.props.currentRowIndex].sku,
      'qty':newItemInput,
      'container':this.props.getInfo[this.props.currentRowIndex].container,
      'uom':this.props.getInfo[this.props.currentRowIndex].uom,
      'weight':this.props.getInfo[this.props.currentRowIndex].weight,
      'measurement':this.props.getInfo[this.props.currentRowIndex].measurement,
      'product':this.props.getInfo[this.props.currentRowIndex].product,
      'productId': this.props.getInfo[this.props.currentRowIndex].productId,
      'mergeBack': true
    };
    this.props.getInfo[this.props.currentRowIndex].qty=qty
    // this.props.getInfo.push(obj);

    // this inserts new item into direct bottom of the current 
    this.props.getInfo.splice(this.props.currentRowIndex + 1, 0, obj)
    // this needs to cater for running number sequences and bugs 
    for (let i = 0; i < this.props.getInfo.length; i++) {
      this.props.getInfo[i].runningNum = i + 1;
    }

    
    if (Number.isNaN(newItemInput)) {
      this.setState({ errorMsg: "split qty cannot be blank!"})
      return null
    }

    this.props.updatePackItems(this.props.getInfo)

    this.props.saveToggle()
    console.log(this.state.getInfo);       
  }

  restartToggle = () => {
   
      this.setState({
        toggle: false,
      })
   
  }

  handleChange = (field, value) => {

    //need to parse into Int or it will become string 
    let currentQty = parseInt(this.state.currentQty);
    let valueInt = parseInt(value)

    if (valueInt > currentQty) {
      valueInt = currentQty ;
      this.setState({ errorMsg: "Split qty cannot be more than current Qty!"})
    } else if (valueInt == 0) {
      valueInt = 1;
      this.setState({ errorMsg: "Split qty must be at least 1!"}) 
    } else if (typeof valueInt === "NaN") {
      valueInt = 1;
      this.setState({ errorMsg: "Split Qty cannot be blank!"})
    } else {
      this.setState({ errorMsg: ""})
    }
    // console.log("TEST", field, value, this.state.currentQty)
    this.setState({
      [field]: valueInt,
    })
  }

  render() {
    const { currentQty, splitAmount } = this.state
    return (
      <React.Fragment>
        <form autoComplete="off">
          {this.state.errorMsg && (<h4 class="text-danger text-center">{this.state.errorMsg}</h4>)}
          <div class="row"><h2 style={{
            margin: "20px auto", color: "#254065 ", letterSpacing: "2px"
          }}>Split Qty</h2></div>
          <div class="row">
            <div class="col-sm-2"><h3>Current Qty</h3></div>
            <div class="col-sm-10"> <FormInput value={currentQty} target="currentQty" readOnly={true} /></div>
          </div>
          <div class="row">
            <div class="col-sm-2"><h3>Split Amount</h3></div>
            <div class="col-sm-10"> <FormInput value={splitAmount} target="splitAmount" type="number" handleChange={this.handleChange} /></div>
          </div>
          <div class="row" style={{
            margin: "20px 45%"

          }}><button
            type="button"
            onClick={(e) => {this.addItem(e)}}
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
                    </button></div>



        </form>
        
      </React.Fragment>

    )


  }

}
const mapStateToProps = ({ packinglistState }) => {
  const { packingListProduct } = packinglistState;
  return { packingListProduct };
};
export default connect(mapStateToProps, {patchSingleSkuPackingOrderRequest})(SplitQty);
