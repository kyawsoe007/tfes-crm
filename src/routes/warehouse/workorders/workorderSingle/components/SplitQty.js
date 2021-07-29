import React, { Component } from "react";
 import { connect } from 'react-redux'

//sub components
import DialogRoot from 'Components/Dialog/DialogRoot'
import FormWrapper from "Components/Form/Layout/FormWrapper";
import FormInput from "Components/Form/FormInput";
//icon
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
// Actions
// import {patchSingleQtyPacking } from "Ducks/packing";

class SplitQty extends Component {
  constructor(props) {
      super(props);


    this.state = {
      currentQty: props.currentQty,
      splitAmount: 1,
      toggle: false,
      errorMsg: "",
    }
    // console.log('hii',rowIndex)
    // this.handleChange = this.handleChange.bind(this);
  }

  

  handleChange = (field, value) => {

    //need to parse into Int or it will become string 
    let currentQty = parseFloat(this.state.currentQty);
    let valueInt = parseFloat(value)

    if (valueInt > currentQty) {
      valueInt = currentQty - 1 ;
      this.setState({ errorMsg: "Split qty cannot be more than current Qty!"})
    } else if (valueInt <= 0) {
      valueInt = 1;
      this.setState({ errorMsg: "Spliy qty cannot be 0!"})
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
            <div class="col-sm-10"> <FormInput value={splitAmount} target="splitAmount" handleChange={this.handleChange} type="number" /></div>
          </div>
          <div class="row" style={{
            margin: "20px 45%"

          }}><button
            type="button"
            onClick={(e) => { this.props.splitSave(this.state.splitAmount)}}
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
const mapStateToProps = () => {
  
  return {  };
};
export default connect(mapStateToProps)(SplitQty);
