import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// common components
import FormWrapper from 'Components/Form/Layout/FormWrapper'
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import RecordsList from 'Components/RecordsList';
import { listOptions, strToDateObject, formatDate } from 'Helpers/helpers';
import DialogRoot from 'Components/Dialog/DialogRoot';
// material-ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Checkbox from '@material-ui/core/Checkbox';

//icons
import LocalPrintshopIcon from '@material-ui/icons/LocalPrintshop';
import { IconButton } from '@material-ui/core';
import { Icon } from '@iconify/react';
import editFilled from '@iconify/icons-ant-design/edit-filled';
import Button from '@material-ui/core/Button';
import DoneIcon from '@material-ui/icons/Done';
import HistoryIcon from '@material-ui/icons/History';
import RestorePageIcon from '@material-ui/icons/RestorePage';
//page components
import ConfirmFinishedSku from './components/ConfirmFinishedSku';
import WorkOrderDetail from './components/WorkOrderDetail';
import SalesOrderUpdate from './components/SalesOrderUpdate';
import SKU_list from '../../SKU/new/components/skuList';
import { workOrderPage } from 'Helpers/warehouseURL';
import SplitQty from './components/SplitQty';
import FormInput from 'Components/Form/FormInput';

import {
  getAllWorkOrders,
  getWorkOrder,
  setWorkOrder,
  getPdfCreate,
  postCheckSku,
  patchLightResetWorkorder,
  patchMediumResetWorkorder,
} from 'Ducks/workorders';


class WorkorderSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      options: {
        selectableRows: false,
        csv: false,
        printButton: false
      },
      workOrderModal: false,
      bomModal: false,
      lightRevertModal: false,
      mediumRevertModal: false,
      mediumResetId: "",
      workOrderDetailNotes: '',
      rowIndex: 0,
      searchProduct: null,
      allRowData: [],
      data: {},
      rowData: '',
      workOrderAll: [],
      workpickingOrderPost: {},
      workpickingOrderCheck: '',
      orderId: '',
      itemUpdate: {},
      readonly: true,
      toggle: false,
      element: null,
      target: '',
      confirmQty: '',
      checkRowIndex: '',
      errorMsg: '',
    };
  }

  closeModal = () => {
    this.setState({
      workOrderModal: false,
      confirmQtyModal: false
    });
  };

  closeBomModal = () => {
    this.setState({ bomModal: false });
  };

  workOrderDetailNotesChangeHandler = (notes) => {
    this.setState({
      data: {
        ...this.state.data,
        description: notes
      }
    });
  };

  salesOrderUpdateChangeHandler = (details) => {
    this.setState({
      itemUpdate: details
    });
  };

  updateItem = () => {
    let allRows = [...this.state.allRowData];

    let selectedRow = { ...allRows[this.state.rowIndex] };
    if (selectedRow.picked) {
      selectedRow.status = 'completed';
    }
    // console.log(this.state.itemUpdate.chosenDate);
    selectedRow.completedDate = this.state.itemUpdate.chosenDate;
    selectedRow.completedBy = this.state.itemUpdate.completedName;
    selectedRow.remark = this.state.itemUpdate.remarksDetail;
    allRows[this.state.rowIndex] = selectedRow;
    this.setState({
      allRowData: allRows
    });

    this.closeModal();
  };
  // cause its not in get workorderCall
  // getSalesOrderNum = () => {
  //   // console.log("All", this.props.WorkordersAll);

  //   const workOrdersArr = this.props.workorderState.WorkordersAll.data

  //   // for (let i = 0; i < workOrdersArr.length; i++) {
  //   //   // alert(workOrdersArr[i].id)
  //   //   if (workOrdersArr[i].id === this.state.workorderID) {
  //   //     this.setState({
  //   //       salesOrderID: workOrdersArr[i].soNumber,
  //   //       createdAt: workOrdersArr[i].createdAt
  //   //     })
  //   //   }
  //   // }
  // }

  restartToggle = () => {
    this.setState({
      toggle: false
    });
  };

  getInfoSKU = (productId, skuId) => {
    console.log("ROW INDEX", this.state.rowIndex)
    let productSelected = this.props.ProductFiltered.data.find(
      (item) => item.id == productId
    );
    let skuSelected;
    if (productSelected) {
      skuSelected = productSelected.skus.find((sku) => sku.id == skuId);
    }


    console.log("skuuuu", skuSelected);

    let allRows = [...this.state.allRowData];

    let selectedRow = { ...allRows[this.state.rowIndex] };

    let qtyBalance = skuSelected.quantity - skuSelected.totalReserved - selectedRow.workQty;

    if (qtyBalance < 0) {
      this.setState({ errorMsg: "Not enough qty!"});
      this.closeBomModal();
      debugger
      return null;
    }
    //if(selectedRow.workType == "Pick/Pack"){
    selectedRow.pickedSkuId = skuId;
    //get picked sku data
    if (productSelected) {
      selectedRow.selectedProduct = {
        partNumber: productSelected.partNumber,
        skuLocation: skuSelected.location && skuSelected.location.name
      };
    }



    //}

    allRows[this.state.rowIndex] = selectedRow;

    this.setState({
      data: {
        ...this.state.data
        //  woStatus: "Not Saved" // david
      },
      allRowData: allRows,
      errorMsg: ''
    });
    this.closeBomModal();

    debugger
  };

  saveAll() {
    // console.log("PING");
    // console.log(this.state.workorderID);
    // console.log(this.state.workOrderDetailNotes);
    let patchData = this.state.data;
    patchData.workOrderItems = [];
    patchData.allRowData = this.state.allRowData;
    // console.log('patchData.allRowData', patchData.allRowData);
    delete patchData._id;
    let id = patchData.id;
    delete patchData.id;

    let singleObj = {};
    for (let i = 0; i < this.state.allRowData.length; i++) {
      let resetObj = false;
      if (singleObj.id) {
        if (singleObj.id == this.state.allRowData[i].id) {
          //under pickinglist
          let pickingItem = {};
          pickingItem.workQty = this.state.allRowData[i].workQty;
          pickingItem.skuId = this.state.allRowData[i].skuId;
          pickingItem.productId = this.state.allRowData[i].productId;
          pickingItem.woPickingId = this.state.allRowData[i].woPickingId; //
          if (this.state.allRowData[i].pickedSkuId) {
            pickingItem.pickedSkuId = this.state.allRowData[i].pickedSkuId;
            pickingItem.runningNum = this.state.allRowData[i].no;
            pickingItem.woPickingStatus = this.state.allRowData[i].status; // By david
            pickingItem.checkConfirmWoItem =
              this.state.allRowData[i].checkConfirmWoItem; // by david
          }
          singleObj.woPickingList.push(pickingItem);
        } else {
          patchData.workOrderItems.push(singleObj);
          resetObj = true;
        }
      } else {
        resetObj = true;
      }
      if (resetObj) {
        singleObj = { ...this.state.allRowData[i] };
        if (singleObj.completedDate == '') {
          delete singleObj.completedDate;
        } else {
          //change back to date object
          singleObj.completedDate = strToDateObject(
            singleObj.completedDate,
            'DD/MM/YYYY'
          );
        }
        singleObj.woPickingList = [];
        if (singleObj.workType != 'Assembly') {
          let pickingItem = {};
          //  pickingItem.woPickingId = this.state.allRowData[i].woPickingId;
          pickingItem.pickpack = 'this is pickpack format';
          pickingItem.woPickingId = this.state.allRowData[i].woPickingId; //------------Pick pack
          pickingItem.workQty = this.state.allRowData[i].workQty;
          pickingItem.skuId = this.state.allRowData[i].skuId;
          pickingItem.productId = this.state.allRowData[i].productId;
          if (this.state.allRowData[i].pickedSkuId) {
            pickingItem.pickedSkuId = this.state.allRowData[i].pickedSkuId;
            pickingItem.runningNum = this.state.allRowData[i].no;
            pickingItem.woPickingStatus = this.state.allRowData[i].status; // By david
            pickingItem.checkConfirmWoItem =
              this.state.allRowData[i].checkConfirmWoItem; // by david
          }
          singleObj.woPickingList.push(pickingItem);
          delete singleObj.pickedSkuId;
          delete singleObj.product;
          delete singleObj.workQty;
          delete singleObj.selectedProduct;
        }
        delete singleObj.product; // david
      }
    }
    this.setState({
      errorMsg:""
    })

    // console.log('what is singleObj', singleObj);
    patchData.workOrderItems.push(singleObj);
    // console.log('PATCCCCHHHHHHHH', id, patchData);
    this.props.setWorkOrder(id, patchData);
  }

  splitSave = (newQty) => {
    let allData = [...this.state.allRowData];
    let newItem = { ...this.state.allRowData[this.state.rowIndex] };
    let remainingQty =
      this.state.allRowData[this.state.rowIndex].workQty - newQty;
    newItem.status = 'open';
    newItem.workQty = newQty;
    newItem.pickedSkuId = undefined;
    newItem.workType = '';
    newItem.completedBy = '';
    newItem.completedDate = '';
    newItem.remark = '';
    newItem.selectedProduct = undefined;
    newItem.canMerge = true;
    newItem.woPickingId = undefined; // Removed ID
    allData[this.state.rowIndex].workQty = remainingQty;
    allData.splice(this.state.rowIndex + 1, 0, newItem);
    let currentSubrow = 1;
    let currentRow = 0;
    let lastId = null;
    for (let i = 0; i < allData.length; i++) {
      //reset running numbers;
      if (allData[i].id != lastId) {
        currentRow++;
        currentSubrow = 1; 
        lastId = allData[i].id;
        allData[i].runningNum = currentRow;
      } else {
        allData[i].runningNum = currentRow + '.' + currentSubrow;
        currentSubrow++;
      }
    }

    this.setState({ allRowData: allData, toggle: false });
  };

  mergeItem = (index) => {
    let allData = [...this.state.allRowData];
    let currentItem = allData[index];
    let prevItem = allData[index - 1];
    prevItem.status = 'open';
    prevItem.workQty = prevItem.workQty + currentItem.workQty;
    prevItem.selectedProduct = undefined;
    prevItem.pickedSkuId = undefined;
    allData.splice(index, 1);
    this.setState({ allRowData: allData });
  };

  componentDidMount = async () => {
    //gets url name and extracts id
    let pathname = this.props.location.pathname;
    let match = pathname.split('workorder/');
    let workorderID = match[1];
    this.props.getWorkOrder(workorderID);
    //this.props.getFilterProduct()

    this.setState({
      workorderID: workorderID
    });

  
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.workorderState.WorkordersAll !==
      prevProps.workorderState.WorkordersAll
    ) {
      // console.log('workOrderAll Changed')
      // this.getSalesOrderNum()
    }

    if (
      (this.props.workorderState.workOrder !== prevProps.workorderState.workOrder)
    ) {
      // debugger
      // sets date and sales order id from get call
      let data = { ...this.props.workorderState.workOrder.data };
      let workItems = data.workOrderItems;
      let readonly = data.woStatus == 'completed' ? true : false;
      delete data.workOrderItems;

      let multiRowArr = [];

      //guard validator to check if workItems is array
      if (typeof workItems !== 'undefined') {
        for (let i = 0; i < workItems.length; i++) {
          console.log("reset work items");
          // PICK/PACK
          //need to doublecheck on the columns ordering and items
          let localTime = formatDate(
            new Date(workItems[i].completedDate),
            'DD/MM/YYYY'
          );

          if (localTime === 'Invalid date') {
            localTime = '';
          }

          let workOrderInfo = {};
          let singleObj = {};
          singleObj.id = workItems[i]._id;
          // singleObj.woPickingId = workItems[0].woPickingList[i]._id; // by david
          singleObj.runningNum = i + 1;
          singleObj.workType = workItems[i].workType;
          singleObj.completedBy = workItems[i].completedBy;
          singleObj.completedDate = localTime;
          singleObj.remark = workItems[i].remark;
          singleObj.qty = workItems[i].qty; // david
          singleObj.qty = workItems[i].qty; // david
          singleObj.woPickingList = workItems[i].woPickingList; // edmund
          singleObj.confirmQty = workItems[i].confirmQty; // edmund

          // debugger

          if (workItems[i].workType == 'Assembly') {
            singleObj.product = {
              description: workItems[i].description // david
            };
            singleObj.status = workItems[i].woItemStatus;
            singleObj.bom = workItems[i].bom;
            singleObj.productId = workItems[i].productId; // david
            singleObj.description = workItems[i].description; // david
            singleObj.qty = workItems[i].qty; // david
            multiRowArr.push(singleObj);
            singleObj = {};
            singleObj.id = workItems[i]._id;
            singleObj.runningNum = i + 1 + '.1';
            singleObj.canMerge = false;
          }

          let woCompleteCount = 0;
          for (let j = 0; j < workItems[i].woPickingList.length; j++) {
            if (j > 0) {
              let prevStatus = singleObj.status;
              let prevProdId = singleObj.productId;
              multiRowArr.push(singleObj);
              singleObj = {};
              singleObj.id = workItems[i]._id;

              singleObj.level2 = 'level2';
              singleObj.runningNum = i + 1 + '.' + (j + 1);
              singleObj.canMerge = false;
              console.log("here", prevProdId);
              console.log( workItems[i].woPickingList[j].productId)
              //check if previous is complete
              if (
                prevStatus != 'completed' &&
                prevProdId == workItems[i].woPickingList[j].productId
              ) {
                singleObj.canMerge = true;
              }
            }
            singleObj.woPickingId = workItems[i].woPickingList[j]._id; // this show on array 1
            singleObj.status = workItems[i].woPickingList[j].woPickingStatus;
            singleObj.workQty = workItems[i].woPickingList[j].workQty;
            singleObj.product = workItems[i].woPickingList[j].product;
            singleObj.selectedProduct =
              workItems[i].woPickingList[j].selectedProduct;
            singleObj.productId = workItems[i].woPickingList[j].productId;
            singleObj.skuId = workItems[i].woPickingList[j].skuId;
            singleObj.pickedSkuId = workItems[i].woPickingList[j].pickedSkuId;
            singleObj.checkConfirmWoItem =
              workItems[i].woPickingList[j].checkConfirmWoItem;
            // singleObj.woPickingId = workItems[0].woPickingList[j]._id;
            // singleObj.woPickingId2 = workItems[i].woPickingList[j]._id; // for pickpack
            singleObj.level1 = 'level1';
            if (singleObj.status == 'completed') {
              singleObj.canMerge = false;
              woCompleteCount++;
            }
          }

          multiRowArr.push(singleObj);
          // console.log('multiRowArr', multiRowArr);
        }
      }

      //this.setState({data: props.workorderState.workOrder.data})
      this.setState({
        readonly: readonly,
        data: this.props.workorderState.workOrder.data,
        allRowData: multiRowArr
      });
    }

    
  }
  onPrintPdf = () => {
    this.props.getPdfCreate(this.state.workorderID);
    // console.log('onPrintPdf', this.state.workorderID);
  };
  handleChange = (field, value) => {
    this.setState({
      [field]: value
    });
  };
  handleChangeCheck = (value, index, allData) => {
    allData = [...this.state.allRowData];
    if(allData[index].status === "reserved"){
      if (allData[index].checkConfirmWoItem === false) {
      allData[index].checkConfirmWoItem = true;
      this.setState({ allRowData: allData});
    } else if (allData[index].checkConfirmWoItem === true) {
      allData[index].checkConfirmWoItem = false;
      this.setState({ allRowData: allData });
    }
  }else{
    alert('Picked SKU not selected yet!')
    this.setState({
      errorMsg: 'Select the SKU first, then save it '
    })
  }
    
}
    
  onConfirmCompleted(index) {
    let _index = index;
    let allData = [...this.state.allRowData];
    let _id = allData[_index].id;
    let _open = false;
    allData.forEach((item) => {
      if (item.checkConfirmWoItem === true && item.id == _id) {
        _open = true;
      }
    });
    if (_open) {
      this.setState({
        confirmQtyModal: true,
        checkRowIndex: _index,
        errorMsg: '',
        confirmQty: ''
      });
    } else {
      
      this.setState({
        errorMsg: 'Finished SKU not selected yet!'
      });
    }
  }
  onSubmitCompetedSku = () => {
    let allData = [...this.state.allRowData];
    let _rowIndex = this.state.checkRowIndex;
    let _id = allData[_rowIndex].id;
    // console.log('allData', allData);
    let checkedItem = [];
    allData.forEach((item) => {
      let updateItem = {}
      if (item.checkConfirmWoItem == true && item.id == _id && item.status==="reserved" ) {
        updateItem = { ...item};
        updateItem.woItemId = item.id;
        delete updateItem.selectedProduct;
        delete updateItem.product;
        checkedItem.push(updateItem);
      }
    });
    let _woConfirmQty = { confirmQty: this.state.confirmQty };
    // checkedItem.push(_woConfirmQty);
    // console.log('checkedItem', checkedItem );
    this.setState({
      confirmQtyModal: false,
    });
    let _woItemUId = this.props.match.params.id;
    let _woId = { id: _woItemUId };
    // checkedItem.push(_woId);
    // console.log('check workorder ID', _id, checkedItem);

    let workOrderItems = [];

    for (
      let i = 0;
      i < this.props.workorderState.workOrder.data.workOrderItems.length;
      i++
    ) {
      if (
        this.props.workorderState.workOrder.data.workOrderItems[i]._id ===
        _id
      ) {
        workOrderItems = {
          ...this.props.workorderState.workOrder.data.workOrderItems[i]
        }
          
      }
    }
    console.log(this.props.workorderState.workOrder.data.workOrderItems);
    console.log(workOrderItems);

    // console.log('TEST', workOrderItems);

    workOrderItems.woPickingList = checkedItem;

    let patchBody = {
      woItemId: _id,
      workOrderId: this.props.match.params.id,
      confirmQty: parseFloat(this.state.confirmQty),
      workOrderItems: workOrderItems
    };

    this.props.postCheckSku(patchBody)

    // let pathname = this.props.location.pathname;
    // let match = pathname.split('workorder/');
    // let workorderID = match[1];
    // this.props.postCheckSku(patchBody).then(this.props.getWorkOrder(workorderID));
  }
  // saveAll11(){
  //   alert(this.state.checkConfirmWoItem)
  // }

  /*
  CreatePackingList = () => {
    //  this.props.savePACKINGForm(this.state.workorderID)
    if (this.state.data.woStatus === "completed") {
      // console.log('hi')
      let data = {
        orderId: this.state.data.orderId
      }
      this.props.savePACKINGForm(data)
      this.setState({ errorMsg: "" })
      // console.log('dataW',data)
   } else {
     this.setState({errorMsg: "Packing List cannot be created until workorder is completed!"})
   }
 }
 */
  checkDisabled() {
          return true
  }

  lightReset = () => {
    const workorderId = this.props.match.params.id;
    this.props.patchLightResetWorkorder(workorderId)
    this.setState({ lightRevertModal: false })
  }

  mediumReset = (workOrderItemId) => {
    const workorderId = this.props.match.params.id;
    let workOrderItems = this.state.data.workOrderItems;

    workOrderItems = workOrderItems.find(x => x._id === workOrderItemId);
    let patchArr = []

    if (workOrderItems.workType === 'Pick/Pack') {
      let objBody = { 
        _id: workOrderItems._id,
        woItemId: workOrderItems.woItemId,
      }
      patchArr.push(objBody)
    } else if (workOrderItems.workType === 'Assembly') {
      let objBody = {
        _id: workOrderItems._id,
        woItemId: workOrderItems.woItemId,
        bom: workOrderItems.bom,
        productId: workOrderItems.productId
      }
      patchArr.push(objBody)
    }
    let patchBody = {
      id: workorderId,
      workOrderItems: patchArr
    }

    this.props.patchMediumResetWorkorder(patchBody)
    this.setState({ mediumRevertModal: false })

    // debugger;
  }

  render() {
    // console.log(this.state.data)
    // columns have to be put inside render function to prevent re-rendering issue
    const columns = [
      {
        name: 'id',
        label: 'key',
        options: {
          filter: false,
          display: 'excluded'
        }
      },
      {
        name: 'runningNum',
        label: 'No'
      },
      {
        name: 'workType',
        label: 'Type'
      },
      {
        name: 'status',
        label: 'Status'
      },
      {
        name: 'completedBy',
        label: 'Completed By'
      },
      {
        name: 'completedDate',
        label: 'Completed Date'
      },
      {
        name: 'remark',
        label: 'Remarks'
      },
      {
        name: 'product',
        label: 'SKU',
        options: {
          customBodyRender: (val) => {
            let item = '';
            if (val) {
              if (val.partNumber) {
                item += val.partNumber + ', ';
              }
              if (val.description) {
                item += val.description;
              }
              // if (val.location) {
              //   item += val.location
              // }
            }

            return item;
          }
        }
      },
      {
        name: 'workQty',
        label: 'Qty',
        options: {
          customBodyRender: (value, rowIndex, tableMeta) => {
            let qty = value;
            if (qty >= 0) {
              return qty;
            } else {
              return this.state.allRowData[rowIndex.rowIndex].qty;
            }
          }
        }
      },

      {
        name: 'selectedProduct',
        label: 'Picked SKU',
        options: {
          customBodyRender: (val) => {
            let item = '';
            if (val) {
              if (val.partNumber) {
                item += val.partNumber + ', ';
              }

              if (val.skuLocation) {
                item += val.skuLocation;
              }
            }

            return item;
          }
        }
      },
      {
        name: 'Select SKU',
        options: {
          customBodyRender: (value, tableMeta) => {
            console.log(tableMeta.rowData[11]);
            // if (tableMeta.rowData[2] !== 'Assembly' )
            // (tableMeta.rowData[13] === 'true' || tableMeta.rowData[13] === 'NIL')
            if (
              tableMeta.rowData[8] > 0 &&
              tableMeta.rowData[3] != 'completed'
            ) {
              return (
                <React.Fragment>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      this.setState({
                        bomModal: true,
                        rowIndex: tableMeta.rowIndex,
                        searchProduct: tableMeta.rowData[7]
                      });
                    }}
                  >
                    SELECT SKU
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      this.setState({
                        rowIndex: tableMeta.rowIndex,
                        toggle: true,
                        target: 'splitQty'
                      });
                    }}
                  >
                    SPLIT QTY
                  </Button>
                  {tableMeta.rowData[11] && (
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => {
                        this.mergeItem(tableMeta.rowIndex);
                      }}
                    >
                      Merge with Top
                    </Button>
                  )}
                </React.Fragment>
              );
            } else {
              return null;
            }
          }
        }
      },
      {
        name: 'canMerge',
        options: {
          display: false,
          filter: false
        }
      },
      {
        name: 'finished',
        label: 'Finished',
        options: {
          customBodyRender: (value, tableMeta) => {
            if (
              tableMeta.rowData[2] != 'Assembly' 
            ) {
            return (
              <div style={{ minWidth: '1rem' }}>
                 <Checkbox
                    type="checkbox"
                    // defaultChecked={
                    //   this.state.allRowData[tableMeta.rowIndex]
                    //     .checkConfirmWoItem
                    // }
                    checked={
                      this.state.allRowData[tableMeta.rowIndex]
                        .checkConfirmWoItem
                    }
                    onChange={() =>
                      this.handleChangeCheck(value, tableMeta.rowIndex)
                    }
                    disabled={this.state.allRowData[tableMeta.rowIndex].status==="completed" ? true :false}
                  />
              </div>
            );
          }}
        }
      },

      {
        name: 'Action',
        options: {
          customBodyRender: (value, tableMeta) => {
            // console.log("ROW2!", tableMeta.rowData)
            const workorderItemId = columns.findIndex(x => x.name === 'id');
            const statusIndex = columns.findIndex(x => x.name === 'status');

            //For Assembly 2.0 
            //if under assembly has any completed 2.1 or 2.1 .. You show the button on 2.0
            //For PickPack 1.0
            //IF picking has any completed line on 1.1, 1.2 - You show the button on the PICKPACK 1.0 line
            //Showing button ALSO included PickPack 1.0 if 1.0 is completed   
            //You detect by completed item only
            let completedCheck = false;
            let rowData = this.state.data.workOrderItems;
            rowData = rowData.find(x => x._id === tableMeta.rowData[workorderItemId])
            if (rowData && rowData.woPickingList) {
              for (let i =0; i < rowData.woPickingList.length; i++) {
                if (rowData.woPickingList[i].woPickingStatus === 'completed') {
                  completedCheck = true;
                }
              }
            }

            if (
              tableMeta.rowData[2] === 'Assembly' ||
              tableMeta.rowData[2] === 'Pick/Pack'
            ) {
              return (
                <div>
                  <IconButton
                    size="small"
                    onClick={() => {
                      console.log('TABLE', tableMeta.rowIndex);
                      this.onConfirmCompleted(tableMeta.rowIndex);
                    }}
                  >
                    <DoneIcon
                      style={{
                        color: '#595959',
                        width: '1.5rem',
                        height: '1.5rem'
                      }}
                    />
                  </IconButton>

                  <IconButton
                    size="small"
                    onClick={() => {
                      // console.log("ASDASD", value, tableMeta.rowData);

                      this.setState({
                        workOrderModal: true,
                        rowIndex: tableMeta.rowIndex,
                        rowData: this.state.allRowData[tableMeta.rowIndex]
                      });
                    }}
                  >
                    <Icon
                      className="tableEditIcon"
                      icon={editFilled}
                      color="#595959"
                      width="1.5rem"
                      height="1.5rem"
                    />
                  </IconButton>
                  {
                    completedCheck &&
                    <IconButton size="small" onClick={() => this.setState({ mediumResetId: tableMeta.rowData[workorderItemId], mediumRevertModal: true})}>
                      <RestorePageIcon style={{ color: '#595959', width: '1.5rem', height: '1.5rem'}}/>
                    </IconButton>
                  }

                </div>
              );
            } else {
              return null;
            }
          }
        }
      }
    ];

    const options = Object.assign({}, listOptions);
    options.customToolbar = () => {
      return (
          // change revert back to open on click
          <IconButton size="small" onClick={() => this.setState({ lightRevertModal: true})} >
            <HistoryIcon />
          </IconButton>
      );
  };

    return (
      <Fragment>
         <FormWrapper
            onSave={() => {
              this.saveAll();
            }}
            // onDuplicate={this.onDuplicate}
            // onChangeToEdit={this.onChangeToEdit}
            disabled={this.checkDisabled()}
            title="Back to all Work Orders"
            centerTitle={`Work Order: ${this.state.data.woNumber}`}
            promptMessage={`【 ${this.state.data.woStatus} 】`}
            edit="test"
            listRedirect={workOrderPage}
            // showEditButton={this.state.view ? true : false}
            // showEditButton={this.state.onEdit ?  true : false }
            // showDuplicateButton={this.state.onEdit ? true : false}
          >

        {/* <PageTitleBar
          title="Back to all Work Orders"
          centerTitle={`Work Order: ${this.state.data.woNumber} 【 ${this.state.data.woStatus} 】`}
          listRedirect={workOrderPage}
        /> */}
        
        <WorkOrderDetail
          workorderID={this.state.data.woNumber}
          salesOrderID={this.state.data.soNumber}
          createdAt={this.state.data.createdAt}
          workOrderDetailNotes={this.state.data.description}
          workOrderDetailNotesChangeHandler={
            this.workOrderDetailNotesChangeHandler
          }
          originalRemark={this.props.workorderState.workOrder.data.description ? this.props.workorderState.workOrder.data.description : "" }
        />
        <h2 style={{ color: 'red', textAlign: 'center' }}>
          {' '}
          {this.state.errorMsg}{' '}
        </h2>
        <RecordsList
          // title={`Sales Order: ${this.state.salesOrderID}`}
          columns={columns}
          options={options}
          data={this.state.allRowData}
        />
        <div className="Left_Toolbar-wrapper">
          <AppBar
            position="fixed"
            color="primary"
            style={{
              top: 'auto',
              bottom: '50px',
              left: '0',
              right: '-20px',
              width: '50px',
              opacity: '0.8',
              borderRadius: '4px'
            }}
          >
            <Toolbar>
              <div className="Left_Toolbar" style={{}}>
                {' '}
                <div onClick={this.onPrintPdf}>
                  <LocalPrintshopIcon />
                  <span> Print PDF </span>
                </div>
                {/* <div onClick={}>
                          <ArrowBackIcon />
                          <span>  Back to Delivery List </span>
                        </div> */}
              </div>
            </Toolbar>
          </AppBar>
        </div>

        <br></br>
        {/* <Button
          variant="contained"
          color="primary"
          style={{ float: 'right' }}
          // onClick={this.saveAll}
          onClick={() => {
            this.saveAll();
          }}
        >
          SAVE
          {' '}
        </Button>

        <br></br>
        <br></br> */}

        <DialogRoot
          show={this.state.confirmQtyModal}
          handleHide={this.closeModal}
        >
          <ConfirmFinishedSku
            onSubmitCompetedSku={this.onSubmitCompetedSku}
            handleChange={this.handleChange}
            confirmQty={this.state.confirmQty}
            data={this.state.allRowData}
          />
        </DialogRoot>
        <DialogRoot
          title={`Edit Item No ${this.state.rowData.runningNum}`}
          show={this.state.workOrderModal}
          handleHide={this.closeModal}
          dialogAction={this.updateItem}
          dialogActionLabel="Update"
        >
          <SalesOrderUpdate
            status={this.state.rowData.status}
            completedBy={this.state.rowData.completedBy}
            completedDate={this.state.rowData.completedDate}
            remarks={this.state.rowData.remark}
            salesOrderUpdateChangeHandler={this.salesOrderUpdateChangeHandler}
          />
        </DialogRoot>

        {/* select SKU modal */}
        <DialogRoot
          show={this.state.bomModal}
          // dialogAction={this.closeBomModal}
          // dialogActionLabel="Close"
          handleHide={this.closeBomModal}
          size={'lg'}
        >
          <div>
            <h3>Select SKU</h3>
            <SKU_list
              getInfo={this.getInfoSKU}
              closeBomModal={this.closeBomModal}
              rowIndex={this.state.rowIndex}
              rowQty={
                this.state.allRowData[this.state.rowIndex] &&
                this.state.allRowData[this.state.rowIndex].workQty
              }
              ProductFiltered={this.props.ProductFiltered}
              searchText={
                this.state.searchProduct && this.state.searchProduct != null
                  ? 'PartNo:' + this.state.searchProduct.partNumber
                  : ''
              }
            />
          </div>
        </DialogRoot>

        <DialogRoot
          show={this.state.toggle}
          handleHide={this.restartToggle}
          size={'lg'}
        >
          {this.state.target == 'splitQty' ? (
            <div>
              <SplitQty
                currentQty={
                  this.state.allRowData[this.state.rowIndex] &&
                  this.state.allRowData[this.state.rowIndex].workQty
                    ? this.state.allRowData[this.state.rowIndex].workQty
                    : 0
                }
                splitSave={this.splitSave}
              />
            </div>
          ) : (
            []
          )}
        </DialogRoot>

        <DialogRoot
          show={this.state.lightRevertModal}
          handleHide={() => this.setState({ lightRevertModal : false})}
          size={'sm'}
        >
          <div style={{ textAlign: "center" }}>
            <h3> Clicking Save will revert <strong>ALL</strong> <span style={{ color: "blue "}}>reserved</span> items status back to <span style={{ color: "blue "}}>open</span>.</h3>
            <Button variant="contained" color="primary" onClick={this.lightReset}> Save </Button>
          </div>
        </DialogRoot>

        <DialogRoot
          show={this.state.mediumRevertModal}
          handleHide={() => this.setState({ mediumRevertModal : false})}
          size={'sm'}
        >
          <div style={{ textAlign: "center" }}>
            <h3> Clicking Save will revert <span style={{ color: "blue "}}>completed</span> items status back to <span style={{ color: "blue "}}>open</span>.</h3>
            <Button variant="contained" color="primary" onClick={() => this.mediumReset(this.state.mediumResetId)}> Save </Button>
          </div>
        </DialogRoot>

        </FormWrapper>
      </Fragment>
    );
  }
}
// export default WorkorderSingle;

const mapStateToProps = ({
  workorderState,
  producttfesState,
  workpickingorderState
}) => {
  const { ProductDetails } = producttfesState;
  const { ProductFiltered } = producttfesState;

  return {
    workorderState,
    ProductDetails,
    ProductFiltered,
    workpickingorderState
  };
};

export default connect(mapStateToProps, {
  getWorkOrder,
  setWorkOrder,
  getAllWorkOrders,
  getPdfCreate,
  postCheckSku,
  patchLightResetWorkorder,
  patchMediumResetWorkorder
})(WorkorderSingle);

//   https://react-day-picker.js.org/docs/input/

// https://github.com/gregnb/mui-datatables/issues/623
