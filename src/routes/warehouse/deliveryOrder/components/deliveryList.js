import React, { Component, Fragment, useEffect, useState } from "react";
// Component Imports
import { listOptions, getDateTime } from "Helpers/helpers";
import RecordsList from 'Components/RecordsList'
import DialogRoot from 'Components/Dialog/DialogRoot'
import EditDeliveryItem from 'Components/PopupPage/EditDeliveryItem'
import { deliveryStatus as deliveryStatusConstant }  from 'Constants/modelStatus';

// Icon Imports
import { IconButton } from '@material-ui/core'
import { Icon } from '@iconify/react'
import editFilled from '@iconify/icons-ant-design/edit-filled'
import FormInput from "Components/Form/FormInput";
import Button from "@material-ui/core/Button";


const DeliveryList = ({ data, deliveryStatus,  updateDeliveryLine }) =>  {

  const onEditDeliveryItem = (row, max) => {
    console.log("mark=========EditDeliveryItem=======mark")
    setToggle(true);

    console.log("ROW", row, maxQty);
    let clickedQty = data[row].deliveryQty;
    clickedQty = parseInt(clickedQty);
    // console.log(typeof clickedQty);
    setMaxQty(parseInt(max));
    setDeliveryQty(parseInt(clickedQty));


    setCurrentRow(row);
  }

  const [toggle, setToggle] = useState(false)
  const [deliveryQty, setDeliveryQty] = useState(1);
  const [maxQty, setMaxQty] = useState(0);
  const [currentRow, setCurrentRow] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  const closeAndUpdate = () => {
    setToggle(false);
    updateDeliveryLine(currentRow, deliveryQty);
  }

  const checkDeliveryQty = (e) => {
    // alert("PING" + e);
    if (e > maxQty) {
      e = maxQty
      setErrorMsg("Selected Qty cannot be more than Delivery Qty")
    } else if (e <= 0) {
      e = 1;
      setErrorMsg("Selected Qty cannot be 0!")
    }
    setDeliveryQty(e);
    setErrorMsg("")
  }

    // const columns = deliveryListColumns;
    const columns = [
      { label: "ID", name: "id",  options: { display: "", filter: false, sort: false }},
      { label: "SubdeliveryOrder", name: "subdeliveryOrder", options: { display: false, filter: false, sort: false }},
      { label: "No.", name: "productId", options: { display: false, filter: false } },
      { label: "Status", name: "deliveryLinesStatus", options: { filter: false } },
      { label: "SKU", name: "sku", options: { display: false, filter: true } },
      // did not find in delivery-orders.schema
      { label: "Description", name: "description", options: { display: true, filter: true,} },
      { label: "Qty", name: "qty", options: { filter: false } },
      { label: "Delivered Qty", name: "deliveryQty", options: { filter: false } },
      { label: "Set Complete", name: "deliveryStatus", options: { filter: false,
        customBodyRender:(value, tableMeta)=>{

          const statusIndex = columns.findIndex(x => x.name === "deliveryLinesStatus");

          if (deliveryStatus !== 'draft' && deliveryStatus !== 'closed') {
            return(
              <input 
              type="checkbox"
              style={{ width:"20px",height:"15px",marginTop:"5px"}}
              // disables checkbox if status is completed 
              disabled={tableMeta.rowData[statusIndex] === "completed" ? true : false}
              onChange={ (e) => {
                const rowIndex = tableMeta.rowIndex;
                const deliverQtyIndex = columns.findIndex(x => x.name === "deliveryQty");
                const qtyIndex = columns.findIndex( x => x.name === "qty")
                // console.log(e.target.checked)

                // console.log(tableMeta.rowData, deliverQtyIndex)
                let qty = 0;
                if (e.target.checked) {
                  qty = tableMeta.rowData[qtyIndex]
                } 

                updateDeliveryLine(rowIndex, qty);
            }}
            />
            )
          }

          }} 
      },
      {
        label: "Set Qty",
        name: "action",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value,tableMeta) => {
            const statusIndex = columns.findIndex(x => x.name === "deliveryLinesStatus");

            const qtyIndex = columns.findIndex( x => x.name === "qty")
            if (deliveryStatus !== 'draft' && deliveryStatus !== 'closed') {
              // removes edit icon if status is completed
              if (tableMeta.rowData[statusIndex] !== "completed") {
                return (
                  <IconButton size="small"
                    onClick={() => onEditDeliveryItem(tableMeta.rowIndex, tableMeta.rowData[qtyIndex])}
                  >
                    <Icon
                      className="tableEditIcon"
                      icon={editFilled}
                      color="#595959"
                      width="1.5rem"
                      height="1.5rem"
                    />
                  </IconButton>
              )
              }

            }

          }
        }
      },
    ]
  const options = Object.assign({}, listOptions);

  return (
        <React.Fragment>
        <RecordsList
        columns={columns}
        data={data}
        // filterType='checkbox'
        options={options}  
      />
       <DialogRoot
          show={toggle}
          handleHide={() => setToggle(!toggle)}
      >

          <div class="row">
            <h4 class="text-danger text-center">{errorMsg}</h4>
            <div class="col-sm-4"><h3>Delivered Qty</h3></div>
            <div class="col-sm-8">  
              <FormInput
                label=""
                type="number"
                value={deliveryQty}
                onChange={(e) => checkDeliveryQty(e.target.value)}
              >
              </FormInput>
            </div>
          </div>

                    <Button
                      variant="contained"
                      className="btn-success text-white"
                      // onClick={closeAndUpdate}
                      onClick={closeAndUpdate}

                      style={{ float: "right" }}
                    >
                      Update
                    </Button>

                  </DialogRoot>
      </React.Fragment>
      
    )

}
export default DeliveryList;

