import React, { Component, Fragment } from "react";
import { connect } from "react-redux"
// Component Imports
import { listOptions, getDateTime } from "Helpers/helpers";
import Button from '@material-ui/core/Button'

// Icon Imports
import { IconButton } from '@material-ui/core'
import { Icon } from '@iconify/react'
import editFilled from '@iconify/icons-ant-design/edit-filled'
import RecordsList from 'Components/RecordsList'
import FormInput from "Components/Form/FormInput";
// import FormWrapper from 'Components/Form/Layout/FormWrapper'
import DialogRoot from 'Components/Dialog/DialogRoot'
import SplitQty from 'Components/PopupPage/SplitQty'
import AddContainer from 'Components/PopupPage/AddContainer'
import CreateDeliveryOrder from 'Components/PopupPage/CreateDeliveryOrder'

import { setDeliveryOrderItemFromPackingList } from 'Ducks/deliveryordertfes';
import { getAllWorkOrders } from 'Ducks/workorders'
import { getPdfCreate } from 'Ducks/packing';

import {
  InputLabel,
  FormControl,
  FormHelperText,
  Select,
  MenuItem,
} from "@material-ui/core";


class PackingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:this.props.data,
      toggle: false,
      target: "",
      row: 0,
      currentRowIndex:0,
      deliveryBtnToggle: false,
      container:"",
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data != this.props.data) {
      this.setState({
        data:this.props.data,
        deliveryItemsArr: this.props.deliveryItemsArr
      })
    }

    // this section dynamically changes the packing list data when container list details are changed 
    if (prevProps.packagingType !== this.props.packagingType) {
      let currentPacking = this.state.data ? [...this.state.data] : [];
      let packagingTypesContainerArr = [];

      for (let i = 0; i < this.props.packagingType.length; i++) {
        packagingTypesContainerArr.push(this.props.packagingType[i].container)
        // debugger
      }

      for (let i = 0; i < currentPacking.length; i++) {
        for (let j = 0; j < this.props.packagingType.length; j++) {
          if (currentPacking[i].container === this.props.packagingType[j].container) {
            currentPacking[i].cooCode = this.props.packagingType[j].cooCode;
            currentPacking[i].hsCode = this.props.packagingType[j].hsCode;
            currentPacking[i].measurement = this.props.packagingType[j].measurement;
            currentPacking[i].weight = this.props.packagingType[j].weight;
            break
          } 

          if (currentPacking[i].container !== "" && !packagingTypesContainerArr.includes(currentPacking[i].container)) {
            currentPacking[i].cooCode = ""
            currentPacking[i].hsCode = ""
            currentPacking[i].measurement = ""
            currentPacking[i].weight = ""
            currentPacking[i].container = ""
          }
        } 
      }
      this.setState({ data: currentPacking, packagingTypesContainerArr })
      // debugger

    }



  }
  // icon click function here
  // edit=(id)=>{this.props.history.push(singleDeliveryOrder(id))}
  // view=(id)=>{this.props.history.push(singleDeliveryOrder(id))}

  // 参数
  saveBOM = () => {
    this.setState({
      toggle: false,
    })
  }
  getInfoSplitQty() {

    this.setState({
      toggle: false,
    })
  }
  restartToggle = () => {
    this.setState({
      toggle: false,
    })
  }
  onSplitQty = (target) =>{
    console.log("mark=========splitQty=======mark")
    this.setState({
      toggle: true,
      element: target,
      target: 'splitQty',
    })
    console.log(this.state.row)
  }
  onAddContainer = (target) =>{
    console.log("mark=========addContainer=======mark")
    this.setState({
      toggle: true,
      element: target,
      target: 'addContainer',
    })
  }

  onCreateDeliveryOrderModal = (target) => {
    this.setState({
      toggle: true,
      eleement: target,
      target: 'createDeliveryOrderModal'
    })
  }

  creatDeliveryOrder = () => {

    const deliveryLinesPostBodyObj = this.state.deliveryItemsArr;

    // transform postbody data 
    for (let i = 0; i < deliveryLinesPostBodyObj.length; i++) {
      deliveryLinesPostBodyObj[i].packingItemId = deliveryLinesPostBodyObj[i]._id
      deliveryLinesPostBodyObj[i].packNumber = deliveryLinesPostBodyObj[i].runningNum

      delete deliveryLinesPostBodyObj[i].product
      // delete deliveryLinesPostBodyObj[i].runningNum
      // deliveryLinesPostBodyObj.deliveryLineId
    } 

    const postBody = {
        "operationId": this.props.operationId,
        "orderId": this.props.orderId,
        "deliveryLines": deliveryLinesPostBodyObj
      }


    this.props.setDeliveryOrderItemFromPackingList(postBody);
  }

  onCreatePDF = (id) => {
    // console.log("PING", id)
    this.props.getPdfCreate(id);
  }

  mergeToTop = (rowIndex) => {
    // alert("PING")
    console.log("DATA", this.state.data, rowIndex)
    const resetState = this.state.data;

    //merge both objects together and get the actual qty 
    const newMergedObj = {...this.state.data[rowIndex], ...this.state.data[rowIndex - 1]};
    const newMergedObjQty = this.state.data[rowIndex].qty + this.state.data[rowIndex - 1].qty;
    delete newMergedObj.mergeBack;
    newMergedObj.qty = newMergedObjQty;
    // console.log("MERGE", newMergedObj);
    resetState[rowIndex - 1] = newMergedObj;
    resetState.splice(rowIndex, 1)

    for (let i = 0; i < resetState.length; i++) {
      console.log("runningNum", resetState[i].runningNum);
      resetState[i].runningNum = i + 1;
    }

    this.setState({ data: resetState });

    // resetState.pop();
    // this.setState({data: resetState})
  }

  populateContainer = (e, rowIndex) => {
    
    let containerLines = this.props.packagingType;
    let data = this.state.data

    let containerDetails;
    for (let i = 0; i < containerLines.length; i++) {
      if (e.target.value === containerLines[i].container) {
        containerDetails = containerLines[i]
        // just in case there are multile containers with same name 
        break
      }
    } 
    // let containerDetails =  this.props.packagingType[rowIndex];
    // let containerDetails =  JSON.parse(e.currentTarget.dataset.container);
    // console.log("DETAILS", containerDetails, e)

    

    data[rowIndex].container = containerDetails.container;
    data[rowIndex].cooCode = containerDetails.cooCode;
    data[rowIndex].hsCode = containerDetails.hsCode;
    data[rowIndex].measurement = containerDetails.measurement;
    data[rowIndex].weight = containerDetails.weight;

    this.setState({ data : data})
    // alert("PASINASD");
  }

  handleChange(field, value, key) {
    console.log(field);
    console.log(value);
    console.log(key)
    // let data = this.state.data;
    console.log(this.props.data)

  };
 
  render(
  
  ) {
    const { deliveryItemsArr,container} = this.state;
    const { data } = this.state;
    const{handleChange}=this.props
    const columns = [
      { name: "_id", options: { display: "excluded", filter: false, sort: false } },
      { name: "packItems", options: { display: "excluded", filter: false, sort: false } },
      { label: "No.", name: "runningNum", options: { filter: false } },
      { label: "Status", name: "packItemStatus", options: { filter: false } },
      { label: "SKU", name: "product.partNumber", options: { display: "excluded", filter: false } },
      { label: "Description", name: "product.description", options: { display: "excluded", filter: false } },
      { label: "Product Description", name: "product.partNumber", options: { filter: false, 
        customBodyRender: (value, tableMeta) => {
  
          const partNumberIndex = columns.findIndex(x => x.name === "product.partNumber");
          const descriptionIndex = columns.findIndex(x => x.name === "product.description");
          // const productDescription = `${typeof tableMeta.rowData[partNumberIndex] !== "undefined" ? tableMeta.rowData[partNumberIndex] : ''}, ${tableMeta.rowData[descriptionIndex]}`  
          const productDescription = `${tableMeta.rowData[partNumberIndex]}, ${tableMeta.rowData[descriptionIndex]}`  
          return (
            <div>
              {productDescription}
            </div>
          )
        }

      } },
      { label: "Qty", name: "qty", options: { filter: false } },
      { label: "Packing", name: "container", options: { filter: false,
      customBodyRender:(value,tableMeta)=>{

        return(
          <Select
            value={value}
            // disabled={this.props.packinglistStatus === 'completed' ? true : false}
            onChange={e => this.populateContainer(e, tableMeta.rowIndex)}
          >
            {
              this.props.packagingType && 
              this.props.packagingType.map((line, key) => (
                <MenuItem
                 //data attributes => as line is an object it needs to be converted into a string or will show up as [object Object] in the html    
                //  onClick={(e) => this.populateContainer(e, tableMeta.rowIndex)} 
                //  data-container={JSON.stringify(line)}            
                 value={line.container}                 
                >
                {line.container}
                </MenuItem>
              ))
            }
          </Select>

        )
      } } },
      { label: "Packing Desc", name: "packingDesc", options: { filter: false,
        customBodyRender: (value, tableMeta) => {
          return(
            <div style={{fontSize:"12px"}}>
              <h5> Name: {this.state.data[tableMeta.rowIndex].container}</h5>
              <h5> Measurements: {this.state.data[tableMeta.rowIndex].measurement}</h5>
              <h5> Weight: {this.state.data[tableMeta.rowIndex].weight}</h5>
              <h5> COO: {this.state.data[tableMeta.rowIndex].cooCode}</h5>
              <h5> HS Code: {this.state.data[tableMeta.rowIndex].hsCode}</h5>
            </div>
          )
        }
      }},
      { label: "Actions", name: "container", options: { filter: false,
        customBodyRender: (value, tableMeta) => {


          // console.log("INDEX", this.state.data[tableMeta.rowIndex]);
          const prevIndex = tableMeta.rowIndex - 1;

          if (this.props.packinglistStatus !== 'completed') {
            return (
              <div>
              <div className="cell-button-container" style={{flexDirection:"row",justifyContent: "space-around"}}>
                <button 
                  type="button" 
                  onClick={() => { this.onSplitQty('splitQty');this.setState({currentRowIndex:tableMeta.rowIndex}) }}
                  style={{backgroundColor:"#254065",color:"#ffffff",borderRadius:"4px",width:"100px",outline:"none" ,marginRight:"10%"}}
                  >
                    Split qty
                </button>
                  
                

                {
                  // checks if it cna still be merged even after  patching and refresh
                  (
                    this.state.data[tableMeta.rowIndex].mergeBack || 
                    prevIndex > 0 ? this.state.data[tableMeta.rowIndex].productId === this.state.data[prevIndex].productId : false
                  )
                  && 
                  <button 
                  type="button" 
                  onClick={() => {this.mergeToTop(tableMeta.rowIndex)}}
                  style={{backgroundColor:"#254065",color:"#ffffff",borderRadius:"4px",width:"100px",outline:"none"}}
                  >
                  Merge to Top 
                  </button>
                }
                
              </div>
              <DialogRoot show={this.state.toggle}
                  handleHide={this.restartToggle}
                  size={'lg'}>
                    {(this.state.target=="splitQty")
                    ?(<div>
                      <SplitQty
                        value={value}
                        id={this.props.id}
                        tableMeta={tableMeta}
                        currentRowIndex={this.state.currentRowIndex}
                        test={this.state.test}
                        updatePackItems={this.props.updatePackItems}
                        rowIndex={tableMeta.row}
                        getInfo={this.state.data}
                        saveToggle={this.saveBOM}/>
                      </div>)
                      :(this.state.target=="addContainer")?(<div>
                        <AddContainer
                          getInfo={this.state.data}
                          id={this.props.id}
                          test={this.state.test}
                          value={value}
                          tableMeta={tableMeta}
                          saveToggle={this.saveBOM}
                          getContainerInfo={this.getContainerInfo}
                          />
                        </div>)
                        :(this.state.target == "createDeliveryOrderModal")? (<div>
                          <CreateDeliveryOrder
                            getInfo={this.state.deliveryItemsArr}
                            operationId={this.props.operationId}
                            orderId={this.props.orderId}
                            show={this.state.toggle}
                            handleHide={this.restartToggle}
                          />
                        </div>) :[]}
              </DialogRoot>
              </div>
            )
          }

        } } },
     
    ]
    const options = Object.assign({}, listOptions);
    return (
      <div>
        <RecordsList
          columns={columns}
          data={this.state.data}
          // filterType='checkbox'
          options={options}
        />

      { this.state.deliveryBtnToggle &&         
        <Button
          className="textButton"
          variant="contained"
          size="small"
          style={{
            backgroundColor: "#2B4DA0",
            height: '41%',
            color:'white',
            marTop: "1rem"
          }}
          onClick={() => this.onCreateDeliveryOrderModal("createDeliveryOrderModal")}
        >
          Create Delivery Order
        </Button>
      }

          {/* <Button
          className="textButton"
          variant="contained"
          size="small"
          style={{
            backgroundColor: "#2B4DA0",
            color:'white',
            marTop: "1rem"
          }}
          onClick={() => this.onCreatePDF(this.props.id)}
        >
          Print PDF
        </Button> */}

      </div>
    )
  }
}


const mapStateToProps = ({ workorderState, deliveryOrderItemFromPackingList }) => {
  return {workorderState, deliveryOrderItemFromPackingList}
}

export default connect(mapStateToProps, {
  setDeliveryOrderItemFromPackingList,
  getAllWorkOrders,
  getPdfCreate
})(PackingList)
