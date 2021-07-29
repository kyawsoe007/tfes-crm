import React, { Component, Fragment, useState, useEffect } from "react";
import { connect } from 'react-redux'
// Component Imports
import FormWrapper from "Components/Form/Layout/FormWrapper";
import FormInput from "Components/Form/FormInput";
import Dropzone from "Components/Dropzone";
import DeliveryList from "../components/deliveryList";
import DialogRoot from 'Components/Dialog/DialogRoot';
import { deliveryOrderListPage } from 'Helpers/warehouseURL';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import moment from 'moment';
import 'moment/locale/en-SG';
// material-ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
// Icon
import { Icon } from '@iconify/react';
import LocalPrintshopIcon from '@material-ui/icons/LocalPrintshop';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// Redux imports
import { getDeliveryOrder, patchDeliveryOrderItem, getDeliveryPdf, deleteDeliveryOrderItem } from "Ducks/deliveryordertfes";
import { uploadFile, uploadMultipleFile } from 'Ducks/uploadFile';
import api from "Api";




const DeliveryOrderFormView = ({ match, getDeliveryOrder, doData, patchDeliveryOrderItem, doItemPatch, deliveryOrder, history, getDeliveryPdf, uploadFile, uploadMultipleFile, deleteDeliveryOrderItem }) => {


  const [deliveryOrderData, setDeliveryOrderData] = useState({})
  const [deliveryLines, setDeliveryLines] = useState([])
  const [deliveryTimeArrVal, setDeliveryTimeArrVal] = useState([
    { name: '9AM - 12PM', value: '9AM - 12PM' },
    { name: '12PM - 3PM', value: '12PM - 3PM' },
    { name: '3PM - 6PM', value: '3PM - 6PM' },
  ])

  const [driver, setDriver] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("")
  const [deliveryDate, setDeliveryDate] = useState(new Date())
  const [remarks, setRemarks] = useState("")
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [incoTerm, setIncoTerm] = useState("");
  const [soDelRemark, setSoDelRemark] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState("")
  const [disabled, setDisabled] = useState(false)
  const [doFiles, setFiles] = useState([]);
  const [deleteDoModal, setDeleteDoModal] = useState(false)

  useEffect(() => {

    getDeliveryOrder(match.params.id)
  }, [])

  useEffect(() => {
    setDeliveryOrderData(deliveryOrder.doData);
    setDeliveryLines(deliveryOrder.doData.deliveryLines)
    setDeliveryStatus(deliveryOrder.doData.deliveryStatus)
    setDriver(deliveryOrder.doData.driver ? deliveryOrder.doData.driver : "")
    setDeliveryTime(deliveryOrder.doData.timeDelivery)
    setDeliveryDate(deliveryOrder.doData.deliveryDate ? deliveryOrder.doData.deliveryDate : new Date())
    setRemarks(deliveryOrder.doData.remark ? deliveryOrder.doData.remark : "")
    // delivery Address must combine SO delivery Remark and Incoterm together. 
    setDeliveryAddress(deliveryOrder.doData.soDelRemark);
    setIncoTerm(deliveryOrder.doData.incoterm);
    setSoDelRemark(deliveryOrder.doData.soDelRemark);
    // doData ? setDeliveryLines(doData.deliveryLines) : setDeliveryLines([]),
    // doData ? setDeliveryStatus(doData.deliveryStatus) : setDeliveryStatus("")
    // setDeliveryLines(doData.deliveryLines)
    // setDeliveryStatus(doData.deliveryStatus)

  }, [deliveryOrder])

  // esc button functionality to reutn back to list view 
  // useEffect(() => {
  //   const handleEsc = (event) => {
  //      if (event.keyCode === 27) {
  //       history.push(deliveryOrderListPage)
  //     }
  //   };
  //   window.addEventListener('keyup', handleEsc);

  //   return () => {
  //     window.removeEventListener('keyup', handleEsc);
  //   };
  // }, []);

  // need to refactor this section
  const handleChange = (field, value) => {
    console.log(field, value)
    return value;
    // this.setState({
    //   [field]: value,

    // })
  }
  const onPrintPdf = () => {
    const salesOrderId = match.params.id;
    getDeliveryPdf(salesOrderId)
  }

  const updateDeliveryLine = (index, qty) => {
    let dLines = [...deliveryLines];
    dLines[index].deliveryQty = qty;
    setDeliveryLines(dLines);
  }

  const onSubmit = () => {
    // post/patch call
    if (deliveryStatus != "closed") {
      const patchBody = {
        doId: match.params.id,
        deliveryDate: deliveryDate,
        timeRange: deliveryTime,
        timeDelivery: deliveryTime,
        orderId: deliveryOrder.doData.orderId,
        soDelRemark: soDelRemark,
        remark: remarks,
        driver: driver,
        deliveryLines: deliveryLines
      }
      patchDeliveryOrderItem(patchBody)

      const formData = new FormData();
      if (doFiles.length === 1) {
        formData.append('file', doFiles[0]);
        uploadFile(formData)
        // api.post("/upload",formData).then(res=>console.log(res)).catch(err=>console.log(err))
      } else if (doFiles.length > 1) {
        // this is for multiple file upload 
        for (const key of Object.keys(doFiles)) {
          formData.append('file', doFiles[key])
        }
        uploadMultipleFile(formData)
        // api.post("/upload/multiple",formData).then(res=>console.log(res)).catch(err=>console.log(err))
      }

    }


  }

  const handleUpload = (file) => {

    let data = [{ key: 'file', value: file[0] }]
    console.log('dataaaa', data, file)
    setFiles(file);
  }

  const removeFile = (file) => {
    // wierd error/bug when state cant be read if its set as Files and not as doFiles
    // console.log("123123", doFiles, disabled)
    const index = doFiles.indexOf(file);
    const files = doFiles.slice(0);
    files.splice(index, 1);
    console.log(files)
    setFiles(files);
  }

  const deleteHandler = () => {
    const deliveryId = match.params.id;
    history.push({ pathname: deliveryOrderListPage })
    deleteDeliveryOrderItem(deliveryId)
  }

  const flexPadding = { display: "flex", flexDirection: "row", justifyContent: "flex-start" }

  return (
    <Fragment>
      <FormWrapper
        onSave={onSubmit}
        // onSaveNew={this.onSaveNew}
        disabled={deliveryStatus === 'closed' ? false : true}
        title="Back to All Delivery Order"
        centerTitle={`Delivery Order 【 ${deliveryStatus ? deliveryStatus : ""}  】`}
        edit="test"
        promptMessage=" "
        listRedirect={deliveryOrderListPage}
        hiddenEdit="none"
        hiddenDuplicate="none"
      >
        <form autoComplete="off" className={(deliveryStatus === 'closed') && "uneditable"}>
          <div className="row" style={{ paddingLeft: "50px" }}>
            <div className="col-sm-3" style={flexPadding}>
              <h3>DO  Num : {deliveryOrderData ? deliveryOrderData.deliveryNumber : ""}</h3>
            </div>

            <div className=" col-sm-2" >
              <h3> Date: </h3>
            </div>
            <div className="col-sm-4">
              <DayPickerInput
                formatDate={formatDate}
                parseDate={parseDate}
                format="L"
                // value={deliveryDate}
                value={`${formatDate(deliveryDate, 'L', 'en-SG')}`}
                selectedDay={deliveryDate}
                placeholder={`${formatDate(new Date(), 'L', 'en-SG')}`}
                onDayChange={day => setDeliveryDate(day)}
                dayPickerProps={{
                  locale: 'en-SG',
                  localeUtils: MomentLocaleUtils,
                }}
                inputProps={{ disabled: deliveryStatus === 'closed' ? true : false }}
              />

            </div>
          </div>



          <div className="row" style={{ paddingLeft: "50px" }}>
            <div className="col-sm-3" style={flexPadding}>
              <h3>Sale order No : {deliveryOrderData ? deliveryOrderData.soNumber : ""} </h3>
            </div>
            <div className=" col-sm-2" style={flexPadding}>
              <h3>Driver :</h3>
            </div>
            <div className="col-sm-4" style={flexPadding}>
              <FormInput
                label=""
                value={driver}
                onChange={(e) => setDriver(e.target.value)}
                readOnly={deliveryStatus === "closed" ? true : false}
                isToggledEditForm={true}
                original={deliveryOrder.doData.driver ? deliveryOrder.doData.driver : ""}
              />
            </div>
          </div>


          <div className="row" style={{ paddingLeft: "50px" }}>
            <div className="col-sm-3" style={flexPadding}>
              <h3>Customer : {deliveryOrderData ? deliveryOrderData.custName : ""}</h3>
            </div>
            <div className="col-sm-2">
              <h3>Delivery timerange:</h3>
            </div>
            <div className="col-sm-4">
              <FormInput
                label=""
                value={deliveryTime}
                target="timeDelivery"
                handleChange={(e, e2) => {
                  setDeliveryTime(e2)
                }}
                selectValues={deliveryTimeArrVal}
                readOnly={deliveryStatus === "closed" ? true : false}
                isToggledEditForm={true}
                original={deliveryOrder.doData.timeDelivery ? deliveryOrder.doData.timeDelivery : ""}
              />
            </div>
          </div>


          <div className="row" style={{ paddingLeft: "50px" }}>
            <div className=" col-sm-3" style={{ marginTop: "10px" }}>
              <h3>Delivery Address :</h3>

              <FormInput
                value={soDelRemark}
                onChange={(e) => { setSoDelRemark(e.target.value) }}
                multiline={true}
                rows={3}
                readOnly={deliveryStatus === "closed" ? true : false}
                isToggledEditForm={true}
                original={deliveryOrder.doData.soDelRemark ? deliveryOrder.doData.soDelRemark : ""}
              />
            </div>
            <div className="col-sm-2" >
              <h3>Remarks :</h3>
            </div>
            <div className="col-sm-4">
              <FormInput
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                multiline={true}
                rows={3}
                readOnly={deliveryStatus === "closed" ? true : false}
                isToggledEditForm={true}
                original={deliveryOrder.doData.remark ? deliveryOrder.doData.remark : ""}
              />
            </div>

          </div>

          {/* <div className="row" style={{paddingLeft: "50px"}}>
            <div className=" col-sm-9" style={{marginTop: "10px"}}>
                <Dropzone 
                  acceptFileTypes="text/csv, image/jpeg, image/png, .pdf"
                  onDrop={handleUpload}
                  onRemove={removeFile}
                  uploadedFiles={doFiles}
                />
            </div>
          </div> */}

          <div style={{ padding: "20px", marginLeft: "2.5rem" }}>
            <DeliveryList
              data={deliveryLines ? deliveryLines : []}
              deliveryStatus={deliveryStatus ? deliveryStatus : ""}
              updateDeliveryLine={updateDeliveryLine}
            />
            <div className="Left_Toolbar-wrapper">
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
                  <div className="Left_Toolbar"> 
                    <div onClick={onPrintPdf}>
                      <LocalPrintshopIcon />
                      <span> Print PDF </span>
                    </div>

                    <div onClick={() => setDeleteDoModal(!deleteDoModal)}>
                      <DeleteForeverIcon />
                      <span>  Delete Delivery Order </span>
                    </div>
                  </div>
                </Toolbar>

              </AppBar>
            </div>
          </div>
        </form>
      </FormWrapper>

      <DialogRoot
        show={deleteDoModal}
        handleHide={() => setDeleteDoModal(!deleteDoModal)}
        size={'sm'}
      > 
        <div style={{ textAlign: "center" }}>
          <h3> Delete Delivery Order?</h3>
          <Button variant="contained" color="primary" onClick={deleteHandler}>
            Delete
          </Button>
        </div>
      </DialogRoot>
    </Fragment>
  )



}
// export default deliveryOrderFormView;

const mapStateToProps = ({ deliveryorderState }) => {


  return deliveryorderState
}


export default connect(mapStateToProps, {
  getDeliveryOrder,
  patchDeliveryOrderItem,
  getDeliveryPdf,
  uploadFile,
  uploadMultipleFile,
  deleteDeliveryOrderItem,
  history
})(DeliveryOrderFormView)

