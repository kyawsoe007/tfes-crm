import React, { Component } from "react";
import { connect } from 'react-redux'

//sub components
import DialogRoot from 'Components/Dialog/DialogRoot'
import FormInput from "Components/Form/FormInput";
//icon
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
// Actions
import { setDeliveryOrderItem } from "Ducks/deliveryordertfes";


class EditDeliveryItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delStatus: "Confirmed",
      delOptions: ["Confirmed", "Completed", "Cancelled"],
      delQty: this.props.delQty,
      toggle: false,
      errorMsg: "",
    }
    // this.handleChange = this.handleChange.bind(this);
  }

  saveBtn = () => {
    this.props.saveToggle();
    //patch call to update deelivry status

    const patchBody = {
      deliveryOrderId: this.props.deliveryOrderId, //props.params,
      deliveryQty: this.state.delQty, //props
      deliveryLinesStatus: this.state.delStatus
    }

    console.log("PATCH BODY", patchBody)

    this.props.setDeliveryOrderItem(patchBody);

  }

  cancelBtn = () => {
    this.props.cancelToggle();
  }

  handleChange = (field, value) => {
    this.setState({
      [field]: value,
    })
  }

  componentDidMount = () => {
    // set qty here 
  }

  render() {
    const { delStatus, delQty, delOptions } = this.state
    return (
      <React.Fragment>
        <form autoComplete="off">
          {this.state.errorMsg && (<h4 className="text-danger text-center">{this.state.errorMsg}</h4>)}
    
          <div className="row">
            <h2 style={{margin: "20px auto", color: "#254065 ", letterSpacing: "2px" }}> Edit Item </h2>
          </div>


          <div className="form-group">
            <div className="row">
              <div className="col-sm-2">
                <h3>Status</h3>
              </div>
              <div className="col-sm-10"> 
                {/* <FormInput value={delStatus} target="status"  /> */}
                <select className="form-control" onChange={(e) => {
                    this.handleChange("delStatus", e.target.value);
                    console.log("test", delStatus);
                  }}
                >
                  {delOptions.map((option, key) => ( 
                    <option key={key} value={option}> {option} </option>
                  ))}

                </select>
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="row">
              <div className="col-sm-2">
                <h3>Delivery Qty</h3>
              </div>

              <div className="col-sm-10"> 
                <input 
                  type="number" 
                  className="form-control" 
                  value={delQty} 
                  // remove readonhly at a later date
                  // readOnly
                  onChange = {(e) => {
                    this.handleChange("delQty", e.target.value)
                    // alert(e.target.value)
                  }}
                />

              </div>
            </div>
          </div>

          <div className="row text-center" style={{margin: "20px 35%"}}>
            <div className="btn-group text-center justify-content-center">
              <button type="button" className="btn btn-success" style={{minWidth: "80px"}} onClick={this.saveBtn}>Save</button>
              <button type="button" className="btn btn-danger" style={{minWidth: "80px"}} onClick={this.cancelBtn}>Cancel</button>
            </div>
          </div>
        </form>

      </React.Fragment>

    )


  }

}

const mapStateToProps = ({deliveryOrderItemPatch}) => {
  // const {patchBody} = deliveryOrderItemPatch
  // return patchBody
  return {}
}

export default connect(mapStateToProps, {
  setDeliveryOrderItem
})(EditDeliveryItem)