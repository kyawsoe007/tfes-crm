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


class CurrencyRateList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.props.getPurchase();
  }


  
  render() {
    const columns = [
      {
        name: "id",
        options: { display: "excluded", filter: false, sort: false },
      },
    
      { label: "Date", name: "createdDate",
        options: {
          filter: false,
          customBodyRender: (value) => (
              <div>{moment(value).format('DD/MM/YYYY')}</div>
          )
        }
      },
      { label: "Rate", name: "rate", options: { filter: false, sort: false } },
      { label: "Type", name: "type", options: { filter: false, sort: false } },
      {
        label: "Action",
        name: "action",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta) => {
            return (
              
                      <IconButton
                          size="small"
                          className="tableDeleteIcon"
                          onClick={() => {
                          }}
                      >
                        <Icon icon={baselineDeleteForever} color="#595959" width="1.5rem" height="1.5rem" />
                      </IconButton>
               
            );
          },
        },
      },
    ];
    const tableOptions = {
      selectableRows: false,
      download: false,
      filter: false,
      print: false,
      viewColumns: false,
    }

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
            }} > Currency Rate
          </div>
      <div className="rct-block">
         <RecordsList 
         title="" 
         columns={columns} 
        //  data={data} 
         options={tableOptions}
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
})(CurrencyRateList);
