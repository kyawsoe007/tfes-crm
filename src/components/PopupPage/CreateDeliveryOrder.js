import React, { Component } from "react";
import { connect } from 'react-redux'

//sub components
import DialogRoot from 'Components/Dialog/DialogRoot'
import FormInput from "Components/Form/FormInput";
//icon
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';
// Actions
import { setDeliveryOrderItemFromPackingList } from 'Ducks/deliveryordertfes';


class CreateDeliveryOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle: false,
      errorMsg: "",
      data: this.props.getInfo,
      deliveryDate: moment().format('YYYY-MM-DD'),
      timeRange: ""
    }
  }

  saveBtn = () => {
    // alert("PING!")

    const deliveryLinesPostBodyObj = this.state.data;

    // transform postbody data 
    for (let i = 0; i < deliveryLinesPostBodyObj.length; i++) {
      deliveryLinesPostBodyObj[i].packingItemId = deliveryLinesPostBodyObj[i]._id
      deliveryLinesPostBodyObj[i].packNumber = deliveryLinesPostBodyObj[i].runningNum

      delete deliveryLinesPostBodyObj[i].product
      // delete deliveryLinesPostBodyObj[i].runningNum
      // deliveryLinesPostBodyObj.deliveryLineId
    } 

    const postBody = {
        "deliveryDate": this.state.deliveryDate,
        "timeRange": this.state.timeRange,
        "operationId": this.props.operationId,
        "orderId": this.props.orderId,
        "deliveryLines": deliveryLinesPostBodyObj
      }

      console.log("delivery", postBody)

    this.props.setDeliveryOrderItemFromPackingList(postBody);

    this.props.handleHide()

  }
  restartToggle = () => {
   
      this.setState({
        toggle: false,
      })
   
  }

  handleChange = (field, value) => {
    console.log(field, value)
    this.setState({
      [field]: value,

    })
  }

  render() {
    
    const { data } = this.state;

    const timeRange = [
      {
        value: '9AM - 12PM',
        label: '9AM - 12PM'
      },
      {
        value: '12PM - 3PM',
        label: '12PM - 3PM'
      },
      {
        value: '3PM - 6PM',
        label: '3PM - 6PM'
      }
    ]
    return (
      <React.Fragment>
        <form autoComplete="off">
          {this.state.errorMsg && (<h4 class="text-danger text-center">{this.state.errorMsg}</h4>)}
          <div class="row"><h2 style={{
            margin: "20px auto", color: "#254065 ", letterSpacing: "2px"
          }}>Create Delivery Order</h2></div>
          


          <div className="row"> 
            <div className="col-md-6">
              <TextField
                id="date"
                label="Delivery Time"
                type="date"
                defaultValue={this.state.deliveryDate}
                style={{ width: "100%"}}
                onChange={(e) => this.setState({ deliveryDate: e.target.value})}
              />
            </div>

            <div className="col-md-6">
                <TextField 
                  select
                  label="Time Range"
                  value={this.state.timeRange}
                  onChange={(e) => this.setState({ timeRange: e.target.value })}
                >
                {timeRange.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
                </TextField>
            </div>
          </div>

          <hr></hr>


          <div className="row">
            <div className="col-md-4">
              <p style={{ fontWeight: "bold"}}> Pallet Name </p>
              {data.map( item => <p> {item.container}</p>)}
            </div>

            <div className="col-md-4">
              <p style={{ fontWeight: "bold"}}> Measurements </p>
              {data.map( item => <p> {item.measurement}</p>)}
            </div>

            <div className="col-md-4">
              <p style={{ fontWeight: "bold"}}> Weight</p>
              {data.map( item => <p> {item.weight}</p>)}
            </div>

          </div>

          <div class="row" style={{
            margin: "20px 45%"
          }}>
            <button
            type="button"
            onClick={this.saveBtn}
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
      </React.Fragment>

    )


  }

}
const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, {
  setDeliveryOrderItemFromPackingList
})(CreateDeliveryOrder);
