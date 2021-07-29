import React, { Component } from "react";
// Component Imports
import { listOptions } from "Helpers/helpers";
import {singleCapexManagement,CapexManagementNewPage } from "Helpers/accountingURL";

// Icon Imports
import { IconButton } from '@material-ui/core'
import { Icon } from '@iconify/react'
import baselineDeleteForever from '@iconify/icons-ic/baseline-delete-forever'
import editFilled from '@iconify/icons-ant-design/edit-filled'
import RecordsList from 'Components/RecordsList'
import addFilled from "@iconify/icons-carbon/add-filled";
// redux
import {connect} from "react-redux";
import { show } from "redux-modal";
import { getAllCapexs, patchCapex, postCapex,deleteCapex } from "Ducks/accounting/capex";
class CapexManagementListView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
     this.props.getAllCapexs();
  }

  // icon click function here
  edit=(id)=>{ this.props.history.push(singleCapexManagement(id)) };
  creatNew = () => { this.props.history.push(CapexManagementNewPage) };

  delete(id, number) {
    this.props.show("alert_delete",
    {
      name: number,
      action: () => this.props.deleteCapex(id),
    });
  }
  handleSingleDelete(deliveryId) {
     this.props.deleteCapex(deliveryId)
  }
  render() {
    const { data } = this.props.capexsAll;
    console.log('data',data)
    const columns = [
      { name: "_id",  options: { display: "excluded", filter: false, sort: false }},
      { label: "Item Name", name: "name", options: { filter: false } },

      { label: "Purchase Value", name: "purchase_value", options: { filter: false,
         customBodyRender: (value ) => ("$"+value)
      } },
     
      { label: "Outstanding Loan", name: "outstanding_loan", options: { filter: false,
        customBodyRender: (value) => (value ? "$"+value.toFixed(2) : "")
      } },
      { label: "Monthly Installment", name: "monthly_installment", options: { filter: false, 
        customBodyRender: (value) => (value ? "$"+value.toFixed(2) : "")
      } },
      { label: "Years Left", name: "months_left", options: { filter: false } },
    
     
      { label: "Remarks", name: "remarks", options: { filter: false } },
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
                  onClick={() => { this.edit(tableMeta.rowData[0]) }}
                >
                  <Icon
                    className="tableEditIcon"
                    icon={editFilled}
                    color="#595959"
                    width="1.5rem"
                    height="1.5rem"
                  />
                </IconButton>
                <IconButton
                  size="small" className="tableDeleteIcon"
                  onClick={() => { this.delete(tableMeta.rowData[0], tableMeta.rowData[1]) }}
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
      },
    ];

    const options = Object.assign({}, listOptions);
    options.customToolbar = () => {
    return (
        <IconButton size="small" onClick={() => this.creatNew()}>
          <Icon
              className="tableEditIcon"
              icon={addFilled}
              color="#df0021"
              width="2rem"
              height="2rem"
          />
        </IconButton>
    );
  };

  return (
    <div>
      <div style={{
        width:"50%",
        margin:"10px auto",
        minWidth:"400px",
        color:"#2b4da0",
        fontWeight:"bolder",
        fontSize:"18px",
        textAlign:"center", 
        }} > Capex Management
      </div>
      <div className="rct-block">
        <RecordsList
          title=" "
          columns={columns}
          data={data}
          options={options}
        />
      </div>
    </div>
    )
  }
}

const mapStateToProps = ({accountingState }) => {
  const {capexState}=accountingState
  // const {capexsAll}=capexState
  return capexState;
};
export default connect(mapStateToProps, {
  getAllCapexs,
  deleteCapex,
  show,
})(CapexManagementListView);
