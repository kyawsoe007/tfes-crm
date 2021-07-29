
import React, { Component, Fragment } from "react";
import {Link} from "react-router-dom";


// Icon Imports
import { IconButton } from '@material-ui/core'
import { Icon } from '@iconify/react'
import VisibilityIcon from '@material-ui/icons/Visibility';
import baselineDeleteForever from '@iconify/icons-ic/baseline-delete-forever'
import editFilled from '@iconify/icons-ant-design/edit-filled'
import RecordsList from 'Components/RecordsList'
import ServerRecordsList from 'Components/ServerRecordsList'

export const deliveryListData = [
["123","subdeliveryOrder","doNumber","Draft","date","timeRange","description","timeDel","cusNo","soNumber", "remarks","delLines",],
["456","subdeliveryOrder","doNumber1","Confirmed","date","timeRange1","description1","timeDel1","cusNo1","soNumber1", "remarks1","delLines1",],
["789","subdeliveryOrder","doNumber1","Delivered","date","timeRange1","description1","timeDel1","cusNo1","soNumber1", "remarks1","delLines1",],
]

export const DeliveryOrderListViewColumns = [
    { name: "id",  options: { display: "", filter: false, sort: false }},
    {name: "subdeliveryOrder", options: { display: "", filter: false, sort: false }},
    { label: "DO Num", name: "doNumber", options: { filter: false } },
    { label: "Status", name: "deliveryStatus", options: { filter: false } },
    // { label: "Delivery Date", name: "deliveryDate", options: { filter: false } },
    // { label: "Time Range", name: "timeRange", options: { filter: false } },
    // { label: "Description", name: "description", options: { filter: false } },
    // { label: "Time Delivered", name: "timeDelivery", options: { filter: false } },
    { label: "Customer", name: "customerId", options: { filter: false } },
    { label: "Sales Order Num", name: "orderId", options: { filter: false } },
    { label: "Delivery Address", name: "deliveryAddress", options: { filter: false } },

    // { label: "Remarks", name: "remarks", options: { filter: false } },
    {
// orderId: props.param.ID

      label: "Action",
      name: "action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value,tableMeta) => {
          // makes it dynamic 
          let deliveryStatusIndex = '';
          for (let i = 0; i < DeliveryOrderListViewColumns.length; i++) {
            if (DeliveryOrderListViewColumns[i].name === 'deliveryStatus') {
              deliveryStatusIndex = i
            }
          }

          switch(tableMeta.rowData[deliveryStatusIndex]) {
            case 'Delivered':
              // console.log(tableMeta.rowData[deliveryStatusIndex]);
              return (
                <div>
                    <Link to={`deliveryOrder/${tableMeta.rowData[0]}`}>
                  <IconButton
                    size="small"
                    // onClick={(item) => { this.view(item.id) }}
                    onClick={() => { 
                        
                        // this.edit(tableMeta.rowData[0])                     
                    }}

                    // onClick={() => alert("View Only")}
                  >
                    <VisibilityIcon
                      color="#595959"
                      width="1.5rem"
                      height="1.5rem"
                    />
                  </IconButton>
                  </Link>
                </div>
              )

              case 'Draft': 
                return (
                  <div>
                    <Link to={`deliveryOrder/${tableMeta.rowData[0]}`}>
                    <IconButton size="small"
                    //   onClick={() => { this.edit(tableMeta.rowData[0]) }}
                      // onClick={() => alert("Edit A New One")}
                    >
                      <Icon
                        className="tableEditIcon"
                        icon={editFilled}
                        color="#595959"
                        width="1.5rem"
                        height="1.5rem"
                      />
                    </IconButton>
                    </Link>
                    <IconButton
                      size="small" className="tableDeleteIcon"
                      onClick={() => { this.delete(tableMeta.rowData[0], tableMeta.rowData[1]) }}
                      // onClick={() => alert("Delete Forever")}
                    >
                      <Icon
                        icon={baselineDeleteForever}
                        color="#595959"
                        width="1.5rem"
                        height="1.5rem"
                      />
                    </IconButton>
                  </div>
                )

              case 'Confirmed':
                return (
                  <div>
                    <Link to={`deliveryOrder/${tableMeta.rowData[0]}`}>
                    <IconButton size="small"
                      onClick={() => { this.edit(tableMeta.rowData[0]) }}
                      // onClick={() => alert("Edit A New One")}
                    >
                      <Icon
                        className="tableEditIcon"
                        icon={editFilled}
                        color="#595959"
                        width="1.5rem"
                        height="1.5rem"
                      />
                    </IconButton>
                    </Link>
                    <IconButton
                      size="small" className="tableDeleteIcon"
                      onClick={() => { this.delete(tableMeta.rowData[0], tableMeta.rowData[1]) }}
                      // onClick={() => alert("Delete Forever")}
                    >
                      <Icon
                        icon={baselineDeleteForever}
                        color="#595959"
                        width="1.5rem"
                        height="1.5rem"
                      />
                    </IconButton>
                  </div>
                )
          }
        }
      }
    },
  ]

  export const deliveryListColumns = [
    { name: "id",  options: { display: "", filter: false, sort: false }},
    {name: "subdeliveryOrder", options: { display: "", filter: false, sort: false }},
    { label: "No.", name: "productId", options: { filter: false } },
    { label: "Status", name: "deliveryLinesStatus", options: { filter: false } },
    { label: "SKU", name: "sku", options: { filter: true } },
    // did not find in delivery-orders.schema
    // { label: "Product", name: "product", options: { filter: true,
    //   customBodyRender: (value, tableMeta) => {

    //     console.log("qwe", tableMeta.rowData)
    //     console.log("ASqweDASD", tableMeta.columnIndex)
    //     console.log("ASqweDASD", tableMeta.columnIndex)
    //     return (
    //       <div>
    //         <p> container: </p>
    //         <p> container: </p>
    //         <p> container: </p>
    //       </div>
    //     )
    //   }
    // } },
    { label: "Pallet / Dimensions", name: "container", options: { filter: true,
      customBodyRender: (value, tableMeta) => {

        console.log("ASDASD", tableMeta.rowData)
        console.log("ASDASD", tableMeta.columnIndex)
        console.log("ASDASD", tableMeta.columnIndex)


        return (
          <div>
            <p> container: {tableMeta.rowData[tableMeta.columnIndex].container}</p>
            <p> measurement: {tableMeta.rowData[tableMeta.columnIndex].measurement}</p>
            <p> weight:  {tableMeta.rowData[tableMeta.columnIndex].weight}</p>
          </div>
        )
      }
    } },
    { label: "Product", name: "product", options: { filter: true,
      customBodyRender: (value, tableMeta) => {

        console.log("qwe", tableMeta.rowData)
        console.log("ASqweDASD", tableMeta.columnIndex)
        console.log("ASqweDASD", tableMeta.columnIndex)
        return (
          <div>
            <p> container: </p>
            <p> container: </p>
            <p> container: </p>
          </div>
        )
      }
    } },
    { label: "Qty", name: "qty", options: { filter: false } },
    { label: "Delivered Qty", name: "deliveryQty", options: { filter: false } },
    { label: "Delivery Status", name: "deliveryStatus", options: { filter: false,
      customBodyRender:(value, tableMeta)=>{
          return(
          <input 
          type="checkbox"
          style={{ width:"20px",height:"15px",marginTop:"5px"}}
          onChange={ (e) => {
            console.log("DELIVERY ROW?", tableMeta.rowData)
            console.log(e.target.checked)
            const qtyColumn = columns.findIndex(x => x.name === "qty");
            const rowIndex = tableMeta.rowIndex;
            const deliverQtyColumn = columns.findIndex(x => x.name === "deliveryQty");
            const cloneRowsData = this.state.rowsData;
            const checkbox = e.target.checked;
            // console.log("QTU ROW?", qtyColumn);
            // console.log("DELIVERY ROW?", tableMeta.rowIndex)

            // console.log("ROWWSSSS", this.state.rowsData)

            // console.log("ROW QTY!!!!", this.state.rowsData[rowIndex][qtyColumn]);

            cloneRowsData[rowIndex][deliverQtyColumn] = cloneRowsData[rowIndex][qtyColumn];
            // console.log("CLONEEEE", cloneRowsData);

            if (e.target.checked === true) {
              this.setState({rowsData: cloneRowsData})
            } else if (e.target.checked === false) {
              // alert("PING")
              cloneRowsData[rowIndex][deliverQtyColumn] = "";
              this.setState({rowsData: cloneRowsData})
            }


          }}
          />
          )
        }} 
    },
    {
      label: "Action",
      name: "action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value,tableMeta) => {

          return (
            <div>
              <IconButton size="small"
                onClick={() => this.onEditDeliveryItem()}
              >
                <Icon
                  className="tableEditIcon"
                  icon={editFilled}
                  color="#595959"
                  width="1.5rem"
                  height="1.5rem"
                />
              </IconButton>

              <DialogRoot
                show={this.state.toggle}
                handleHide={this.restartToggle}
              >
                <EditDeliveryItem
                  // getInfo={this.getInfoEditDeliveryItem}
                  saveToggle={this.saveBOM}
                  cancelToggle={this.cancelBtn}
                  deliveryOrderId={this.props.deliveryOrderId}
                />
              </DialogRoot>

            </div>
          )
        }
      }
    },
  ]