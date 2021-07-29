import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
// Component Imports
import FormWrapper from "Components/Form/Layout/FormWrapper";
import FormInput from "Components/Form/FormInput";
import PackingList from "../components/PackingList"
import ContainerList from "../components/ContainerList"
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LocalPrintshopIcon from '@material-ui/icons/LocalPrintshop';
import PrintOutlinedIcon from '@material-ui/icons/PrintOutlined';

// React Day Picker input
import DayPickerInput from 'react-day-picker/DayPickerInput';
import DayPicker from "react-day-picker";
import { DateUtils } from 'react-day-picker';
import MomentLocaleUtils, {
  formatDate,
  parseDate
} from 'react-day-picker/moment'
import moment from 'moment'
import 'moment/locale/en-SG'
import { getMoveLines, patchSingleSkuPackingOrderRequest, getPdfCreate, getPackingCommercialInvoicePdf } from "Ducks/packing";
// import {getCommercialInvoicePdf } from "Ducks/invoicetfes";
import { packingListPage } from "Helpers/warehouseURL";
import { LineWeight } from "@material-ui/icons";


class packingFormView extends Component {
  constructor(props) {
    super(props);
    console.log("props", props)
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      completedDate: new Date(),
      pickedBy: this.props.packingMoveLines.tableData.pickedBy ? this.props.packingMoveLines.tableData.pickedBy : "",
      id: this.props.match.params.id,
      orderId: this.props.packingMoveLines.tableData.orderId,
      packingNum: this.props.packingMoveLines.tableData.packingNum,
      packinglistStatus: this.props.packingMoveLines.tableData.packinglistStatus,
      operationId: this.props.packingMoveLines.tableData.operationId,
      packItems: this.props.packingMoveLines.tableData.packItems,
      deliveryItemsArr: [],
      packagingType: [{
        container: '',
        measurement: "",
        weight: "",
        cooCode: "",
        hsCode: "",
        Qty: "",
      }],
      cooCode: "",
      hsCode: "",
      packingInformation: "",
      remark: ""
    };

  }
  componentDidMount() {
    const operationId = this.props.match.params.id;

    this.props.getMoveLines(operationId);
  }



  componentDidUpdate(prevProps, prevState) {

    const operationId = this.props.match.params.id;


    if (prevProps !== this.props) {
      this.setState({
        packinglistStatus: this.props.packingMoveLines.tableData.packinglistStatus,
        orderId: this.props.packingMoveLines.tableData.orderId,
        operationId: this.props.packingMoveLines.tableData.operationId,
        packItems: this.props.packingMoveLines.tableData.packItems,
        packingNum: this.props.packingMoveLines.tableData.packingNum,
        pickedBy: this.props.packingMoveLines.tableData.pickedBy ? this.props.packingMoveLines.tableData.pickedBy : "",
        // creates delivery item array so that when checkbox is clicked, it is added into it for post call 
        deliveryItemsArr: this.props.packingMoveLines.tableData.packItems ? Array.from({ length: this.props.packingMoveLines.tableData.packItems.length }).fill("") : [],
        cooCode: this.props.packingMoveLines.tableData.cooCode,
        hsCode: this.props.packingMoveLines.tableData.hsCode,
        packagingType: this.props.packingMoveLines.tableData.packagingType ? this.props.packingMoveLines.tableData.packagingType : [],
        remark: this.props.packingMoveLines.tableData.remark ? this.props.packingMoveLines.tableData.remark : "",
        soDelRemark: this.props.packingMoveLines.tableData.soDelRemark ? this.props.packingMoveLines.tableData.soDelRemark : "",
        completedDate: this.props.packingMoveLines.tableData.completedDate ? this.props.packingMoveLines.tableData.completedDate : new Date(),
        disableEdit: this.props.packingMoveLines.tableData.packinglistStatus === "completed",
      })
      // v Make a deep copy of the packagingType by adding the values into a NEW array named lines
      let lines = [];
      if (this.props.packingMoveLines.tableData.packagingType) {
        for (let i = 0; i < this.props.packingMoveLines.tableData.packagingType.length; i++) {
          let item = { ...this.props.packingMoveLines.tableData.packagingType[i] };
          lines.push(item);
        }
      }
      this.setState({ packagingType: lines });

    }

  }

  onSubmit() {

      let data = this.state;
      console.log("DATAAAAAA", data);
      this.props.patchSingleSkuPackingOrderRequest(data)  
      this.setState({
        errorMsg: ""
      })
    }

  checkDisabled() {

    if (this.state.disableEdit) {
      return false;
    } 
    return true
  }

  onChangeToEdit = () => {
    this.setState({
      disableEdit: false,
    })
  }

  handleChange = (field, value) => {
    this.setState({
      [field]: value,
    })
  }


  addNewLine = (index) => {
    let packagingType = [...this.state.packagingType];
    packagingType.push({
      container: '',
      measurement: "",
      weight: "",
      cooCode: "",
      hsCode: "",
      Qty: "",
    })
    this.setState({
      packagingType: packagingType,
    })

  }

  handleLineChange = (field, value, key) => {
    let packagingType = [...this.state.packagingType];
    packagingType[key][field] = value;
    this.setState({
      packagingType: packagingType,
    })
  }

  handlePackingInformationChange = (field, value, key) => {
    let info = this.state.remark;
    this.setState({ remark: value })
    console.log("YAYYY", field, value, key);
  }


  deleteLine = (index) => {
    let packagingType = [...this.state.packagingType];
    if (packagingType.length > 1) {
      packagingType.splice(index, 1);
    }

    this.setState({
      packagingType: packagingType,
    })

  }

  onCreatePDF = () => {
    this.props.getPdfCreate(this.state.id);
  }
  onPrintCommercialInvoice = () => {
    this.props.getPackingCommercialInvoicePdf(this.state.id);
  }

  updatePackItems = (packItems) => {
    console.log(packItems)
    this.setState({ packItems: packItems })
    // debugger
  }


  render() {
    const { completedDate, pickedBy, packinglistStatus, deliveryItemsArr, cooCode, hsCode, soDelRemark } = this.state;
    const { tableData } = this.props.packingMoveLines;
    return (
      <Fragment>
        <div style={{ padding: "20px", marginLeft: "2.5rem" }}>
          <FormWrapper
            onSave={this.onSubmit}
            onSaveNew={this.onSaveNew}
            disabled={this.checkDisabled()}
            title="Back to Packing List"
            centerTitle={`Packing list form page 【 ${this.state.packinglistStatus} 】`}
            edit="test"
            promptMessage=" "
            listRedirect={packingListPage}
            showEditButton={this.state.disableEdit && this.state.packinglistStatus !== 'completed'}
            onChangeToEdit={this.onChangeToEdit}
          // hidden={packinglistStatus === 'completed' ? 'hidden' : ''}
          // disabled={packinglistStatus === 'completed' ? true : false}
          >
            <form autoComplete="off" className={this.state.disableEdit && "uneditable"}>
              <div class="row" style={{ paddingLeft: "50px" }}>
                <div class="col-sm-3" style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
                  <h3>Packing  Num :</h3><h3>{tableData.packingNum}</h3>
                </div>
                <div class=" col-sm-2" style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
                  <h3>Packing by :</h3>
                </div>
                <div class="col-sm-4" style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
                  <FormInput
                    label=""
                    value={pickedBy}
                    target="pickedBy"
                    handleChange={this.handleChange}
                    isToggledEditForm={true}
                    original={this.props.packingMoveLines.tableData.pickedBy ? this.props.packingMoveLines.tableData.pickedBy : ""}
                  // readOnly={packinglistStatus === 'completed' ? true : false}
                  />
                </div>
              </div>
              <div class="row" style={{ paddingLeft: "50px" }}>
                <div class="col-sm-3" style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
                  <h3>Sale order No :</h3><h3> {tableData.soNumber}</h3>
                </div>
                <div class=" col-sm-2" >
                  <h3>Date:</h3>
                </div>
                <div class="col-sm-4">
                  <DayPickerInput
                    formatDate={formatDate}
                    parseDate={parseDate}
                    format="L"
                    value={`${formatDate(completedDate, 'L', 'en-SG')}`}
                    placeholder={`${formatDate(new Date(), 'L', 'en-SG')}`}
                    style={{ zIndex: "999" }}
                    // inputProps={{ disabled: packinglistStatus === 'completed' ? true : false }}
                    onDayChange={(e) => this.setState({ completedDate: e })}
                    dayPickerProps={{
                      locale: 'en-SG',
                      localeUtils: MomentLocaleUtils
                    }}
                  />
                </div>
              </div>

              <div class="row" style={{ paddingLeft: "50px", paddingTop: "7px" }}>
                <div class="col-sm-3">
                  <h3>Delivery Address :</h3>
                </div>
                <div class=" col-sm-2" >
                  <h3>COO:</h3>
                </div>
                <div class="col-sm-4">
                  <FormInput
                    label=""
                    value={typeof cooCode !== "undefined" ? cooCode : ""}
                    target="cooCode"
                    handleChange={this.handleChange}
                    isToggledEditForm={true}
                    original={this.props.packingMoveLines.tableData.cooCode ? this.props.packingMoveLines.tableData.cooCode : ""}
                  // readOnly={packinglistStatus === 'completed' ? true : false}
                  />
                </div>
              </div>

              <div class="row" style={{ paddingLeft: "50px", paddingTop: "7px" }}>
                <div class="col-sm-3" style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
                  <FormInput
                    value={soDelRemark}
                    target="soDelRemark"
                    handleChange={this.handleChange}
                    multiline={true}
                    rows={3}
                    isToggledEditForm={true}
                    original={this.props.packingMoveLines.tableData.soDelRemark ? this.props.packingMoveLines.tableData.soDelRemark : ""}
                  // readOnly={deliveryStatus === "closed" ? true : false}
                  />
                </div>
                <div class=" col-sm-2" >
                  <h3>HS Code:</h3>
                </div>
                <div class="col-sm-4">
                  <FormInput
                    label=""
                    value={typeof hsCode !== "undefined" ? hsCode : ""}
                    target="hsCode"
                    handleChange={this.handleChange}
                    isToggledEditForm={true}
                    original={this.props.packingMoveLines.tableData.hsCode ? this.props.packingMoveLines.tableData.hsCode : ""}
                  // readOnly={packinglistStatus === 'completed' ? true : false}
                  />
                </div>
              </div>

              <hr />

              <div className="row">
            <div className="col-sm-5">
              {/* <ContainerList/> */}
               <ContainerList
               addNewLine={this.addNewLine}
               deleteLine={this.deleteLine}
               handleLineChange={this.handleLineChange}
               packagingType={this.state.packagingType}
               packinglistStatus={packinglistStatus} 
               packingInformation={this.state.packingInformation}
               remark={this.state.remark}
               handlePackingInformationChange={this.handlePackingInformationChange}
               originalRemark={this.props.packingMoveLines.tableData.remark ? this.props.packingMoveLines.tableData.remark : ""}
               originalData={this.props.packingMoveLines.tableData.packagingType ? this.props.packingMoveLines.tableData.packagingType : []}
                />
            </div>
            <div className="col-sm-7">
              <h2 style={{ color:"#2B4DA0" , width:"100%", textAlign:"center",marginTop:"15px"}}>Packing Items
              </h2>
              <h2 style={{ color: "red", width: "100%", textAlign: "center", marginTop: "15px"}}> {this.state.errorMsg}</h2>
              <PackingList 
                data={tableData.packItems} 
                id={tableData._id} 
                packinglistStatus={packinglistStatus} 
                deliveryItemsArr={deliveryItemsArr}
                orderId={tableData.orderId}
                operationId={tableData.operationId} 
                packagingType={this.state.packagingType}
                updatePackItems={this.updatePackItems}
              />
            </div>
          </div> 

              <div className="Left_Toolbar-wrapper" >
                <AppBar position="fixed" color="primary" style={{
                  top: 'auto',
                  bottom: "50px",
                  left: "0",
                  right: "-20px",
                  width: "50px",
                  opacity: "0.8",
                  borderRadius: "4px"
                }}>
                  <Toolbar>
                    <div className="Left_Toolbar"
                      style={{
                      }}
                    > <div onClick={() => this.onCreatePDF()}>
                        <LocalPrintshopIcon />
                        <span> Print PDF </span>
                      </div>
                      <div onClick={() => this.onPrintCommercialInvoice()}>
                        <PrintOutlinedIcon />
                        <span>Commercial Invoice PDF </span>
                      </div>
                      {/* <div onClick={}>
                      <ArrowBackIcon />
                      <span>  Back to Delivery List </span>
                    </div> */}
                    </div>
                  </Toolbar>

                </AppBar>
              </div>
            </form>
          </FormWrapper>
        </div>
      </Fragment>
    )
  }
}
const mapStateToProps = ({ packinglistState }) => {
  const { packingMoveLines, packingListProduct } = packinglistState;
  return { packingMoveLines, packingListProduct };
};
export default connect(mapStateToProps, { getMoveLines, patchSingleSkuPackingOrderRequest, getPdfCreate, getPackingCommercialInvoicePdf })(packingFormView);