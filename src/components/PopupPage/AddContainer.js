import React, { Component } from "react";
 import { connect } from 'react-redux'

//sub components
import DialogRoot from 'Components/Dialog/DialogRoot'
import FormInput from "Components/Form/FormInput";
//icon
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
// Actions
// import {patchContainerPacking } from "Ducks/packing";
import { getMoveLines,patchSingleSkuPackingOrderRequest } from "Ducks/packing";
class AddContainer extends Component {
  constructor(props) {
    super(props);
    console.log('props', props)
    const{tableMeta,getInfo,test}=props
    this.state = {
      containerName: getInfo[test].container,
      measurement: getInfo[test].measurement,
      weight: getInfo[test].weight,
      coo: "",
      hsCode: "",
      toggle: false,
      errorMsg: "",
    }
    // this.handleChange = this.handleChange.bind(this);
  }

  // componentDidMount() {
  //   this.props.patchContainerPacking();
  //   // this.props.getFilterSalesOrder();
  // }
  
  saveBtn = () => {
    // let data = {
    //   id: this.props.id,
    //   packItems : [{
    //     // id: this.props.id,
    //     container: this.state.containerName,
    //     packingListItemId:this.props.getInfo[this.props.tableMeta.rowIndex].packingListItemId,
    //   }] 
    // }
    this.props.getInfo[this.props.test].container=this.state.containerName
    this.props.getInfo[this.props.test].measurement=this.state.measurement
    this.props.getInfo[this.props.test].weight=this.state.weight
    this.props.getInfo[this.props.test].packinglistStatusData="Completed"
    this.props.getInfo[this.props.test].coo=this.state.coo
    this.props.getInfo[this.props.test].hsCode=this.state.hsCode
    this.props.saveToggle();

    // this.props.patchSingleSkuPackingOrderRequest(data)
    // this.props.patchContainerPacking(data)
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
    const { containerName, measurement, weight, coo, hsCode } = this.state
    console.log('con',containerName)
    return (
      <React.Fragment>
        <form autoComplete="off">
          {this.state.errorMsg && (<h4 class="text-danger text-center">{this.state.errorMsg}</h4>)}
          <div class="row"><h2 style={{
            margin: "20px auto", color: "#254065 ", letterSpacing: "2px"
          }}>Add Container</h2></div>
          
          <div class="row">
            <div class="col-sm-2"><h3>Container Name</h3></div>
            <div class="col-sm-10"> <FormInput value={containerName} target="containerName" handleChange={this.handleChange} /></div>
          </div>

          <div class="row">
            <div class="col-sm-2"><h3>Measurement</h3></div>
            <div class="col-sm-10"> <FormInput value={measurement} target="measurement" handleChange={this.handleChange} /></div>
          </div>

          <div class="row">
            <div class="col-sm-2"><h3>Weight</h3></div>
            <div class="col-sm-10"> <FormInput value={weight} target="weight" handleChange={this.handleChange} /></div>
          </div>

          <div class="row">
            <div class="col-sm-2"><h3>COO</h3></div>
            <div class="col-sm-10"> <FormInput value={coo} target="coo" handleChange={this.handleChange} /></div>
          </div>

          <div class="row">
            <div class="col-sm-2"><h3>HS Code</h3></div>
            <div class="col-sm-10"> <FormInput value={hsCode} target="hsCode" handleChange={this.handleChange} /></div>
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
        <DialogRoot
          show={this.state.toggle}
          handleHide={this.restartToggle}
          size={'lg'}
        >
          <AddContainer
            getInfo={this.getInfoAddContainer}

          />
        </DialogRoot>



      </React.Fragment>

    )


  }

}
const mapStateToProps = ({ packinglistState }) => {
  const { packingListProduct } = packinglistState;
  return { packingListProduct };
};
export default connect(mapStateToProps, {patchSingleSkuPackingOrderRequest})(AddContainer);
