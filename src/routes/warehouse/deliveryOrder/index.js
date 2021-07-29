import React, { Component, Fragment, useState, useEffect } from "react";
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { show } from "redux-modal";

// Component Imports
import { listOptions, getDateTime } from "Helpers/helpers";
import { deliveryStatus } from 'Constants/modelStatus';


// Icon Imports
import { IconButton } from '@material-ui/core'
import { Icon } from '@iconify/react'
import VisibilityIcon from '@material-ui/icons/Visibility';
import baselineDeleteForever from '@iconify/icons-ic/baseline-delete-forever'
import editFilled from '@iconify/icons-ant-design/edit-filled'
import ServerRecordsList from 'Components/ServerRecordsList'

//redux
import { getAllDeliveryOrders, deleteDeliveryOrderItem, getFilterDeliveryOrderRequest, getSavedDeliveryOrderQuery } from "Ducks/deliveryordertfes";

const DeliveryOrderListView = ({ show, getAllDeliveryOrders, deliveryOrderAll, deleteDeliveryOrderItem, getFilterDeliveryOrderRequest, deliveryFiltered, getSavedDeliveryOrderQuery, SavedQuery }) => {

  const columns = [
    { label: "ID", name: "id", options: { display: false, filter: false, sort: false } },
    { label: "orderId", name: "orderId", options: { display: false, filter: false, sort: false } },
    { label: "Delivery Number", name: "deliveryNumber", options: { filter: false, sort: false } },
    { label: "Delivery Status", name: "deliveryStatus", options: { filter: false, sort: false } },
    { label: "Customer Id", name: "customerId", options: { display: false, filter: false, sort: false } },
    { label: "Customer", name: "customer", options: { filter: false } },
    { label: "Sales Order Num", name: "soNumber", options: { filter: false } },
    {
      label: "Action", name: "action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {

          const deliveryStatusIndex = columns.findIndex(x => x.name === "deliveryStatus")
          const deliveryNumberIndex = columns.findIndex(x => x.name === "deliveryNumber")

          switch (tableMeta.rowData[deliveryStatusIndex]) {
            case deliveryStatus.CLOSED:
              // console.log(tableMeta.rowData[deliveryStatusIndex]);
              return (
                <div>
                  <Link to={`deliveryOrder/${tableMeta.rowData[0]}`}>
                    <IconButton
                      size="small"
                      onClick={() => { }}
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

            case deliveryStatus.DRAFT:
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
                  {/* <IconButton
                    size="small" className="tableDeleteIcon"
                    onClick={() => {
                      deleteDeliveryOrder(tableMeta.rowData[0], tableMeta.rowData[deliveryNumberIndex])
                    }}
                  >
                    <Icon
                      icon={baselineDeleteForever}
                      color="#595959"
                      width="1.5rem"
                      height="1.5rem"
                    />
                  </IconButton> */}
                </div>
              )

            case deliveryStatus.CONFIRMED:
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
                </div>
              )

            case deliveryStatus.RESCHEDULED:
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
                </div>
              )

            case deliveryStatus.PARTIAL:
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

                </div>
              )
          }
        }
      }
    },
  ]

  // dynamically adds back filter list based on the props 
  for (var i = 0; i < columns.length; i++) {
    // FOR FILTERS
    if (SavedQuery.saved) {
      columns[i].options.filterList = SavedQuery.filterList[i];
    } else {
      columns[i].options.filterList = [];
    }

    // FOR COLUMNS
    if(SavedQuery.display){
      columns[i].options.display = SavedQuery.display[i];
  }
  }

  const options = Object.assign({}, listOptions);

  const [data, setData] = useState([]);
  const [count, setCount] = useState(20);


  // useEffect(() => {
  //   // getAllDeliveryOrders();
  //   getFilterDeliveryOrderRequest()
  // }, [])

  useEffect(() => {

    setData(deliveryFiltered.data)
    setCount(deliveryFiltered.count);
  }, [deliveryFiltered])

  // edit = (id) => { this.props.history.push(`/app/warehouse/deliveryOrder/${id}`)}

  const deleteDeliveryOrder = (id, name) => {
    console.log(id, name)
    show("alert_delete",
      {
        name: name,
        action: () => deleteDeliveryOrderItem(id)
      })
  }

  return (
    <div>
      <div style={{
        width: "50%",
        margin: "10px auto",
        minWidth: "400px",
        color: "#2b4da0",
        fontWeight: "bolder",
        fontSize: "18px",
        textAlign: "center",
      }} > Goods Delivered
            </div>
      <div className="rct-block">
        <ServerRecordsList
          title=" "
          columns={columns}
          data={data}
          totalCount={count}
          options={options}
          filterFunc={getFilterDeliveryOrderRequest}
          hasSearch={true}
          savedQuery={SavedQuery}
          getSavedQuery={getSavedDeliveryOrderQuery}
        />

      </div>
    </div>
  )
}



// export default DeliveryOrderListView

const mapStateToProps = ({ deliveryorderState }) => {

  // const { deliveryOrderAll } = deliveryorderState

  // return {deliveryOrderAll};

  const { deliveryFiltered, SavedQuery } = deliveryorderState

  return { deliveryFiltered, SavedQuery };
}

export default connect(mapStateToProps, {
  // getAllDeliveryOrders,
  deleteDeliveryOrderItem,
  getFilterDeliveryOrderRequest,
  show,
  getSavedDeliveryOrderQuery
})(DeliveryOrderListView)
