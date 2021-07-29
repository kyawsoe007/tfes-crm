import React, { Component } from "react";
// Sub components
import { connect } from "react-redux";
import { show } from "redux-modal";
import moment from "moment";

import RecordsList from "Components/RecordsList";
//icon
import { IconButton } from "@material-ui/core";
import { Icon } from "@iconify/react";
import baselineDeleteForever from "@iconify/icons-ic/baseline-delete-forever";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from '@material-ui/icons/Add';

class FiscalYearByMonthlyList extends Component {
  constructor(props) {
    super(props);
  }


   
  handleRemoveRow = () => {
    this.setState({
      rows: this.state.rows.slice(0, -1)
    });
  };
  render() {
      console.log('hii',this.props.fiscalYearByMonthly)
    const columns = [
      {
        name: "id",
        options: { display: "excluded", filter: false, sort: false },
      },
    
      { label: "Period Name", name: "periodName",
        options: {
          filter: false,
        
        }
      },
      { label: "Code", name: "monthly_code", options: { filter: false, sort: false } },
      { label: "Start Of Period", name: "startOfDate", options: { filter: false,
        customBodyRender: (value) => (
            <div>{moment(value).format('DD/MM/YYYY')}</div>
        )
    } },
    { label: "End Of Period", name: "endOfDate", options: { filter: false,
        customBodyRender: (value) => (
            <div>{moment(value).format('DD/MM/YYYY')}</div>
        )
    } },
    { label: "Status", name: "monthly_status", options: { filter: false, sort: false } },
      
    ];
    // const tableOptions = {
    //   selectableRows: false,
    //   download: false,
    //   filter: false,
    //   print: false,
    //   viewColumns: false,
    //   customToolbar: () => (
    //     <React.Fragment>
    //     <Tooltip id="tooltip-icon" title="Add Rate">
    //       <IconButton className="mr-2" aria-label="Add Rate" 
    //        onClick={() => {
    //         this.props.setToggle();
    //       }}
    //       >
    //         <AddIcon/>
    //       </IconButton>
        
    //     </Tooltip>    
    //   </React.Fragment>
    // ) 
    // }

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
            }} > Monthly Period
          </div>
      <div className="rct-block">
         <RecordsList 
         title="" 
         columns={columns} 
         data={this.props.fiscalYearByMonthly} 
        />
      </div>
      </div>
    );
  }
}

const mapStateToProps = ({}) => {
  return { };
};
export default connect(mapStateToProps, {
  show,
})(FiscalYearByMonthlyList);
