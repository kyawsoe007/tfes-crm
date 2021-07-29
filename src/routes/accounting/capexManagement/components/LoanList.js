import React, { Component } from "react";
// Sub components
import { connect } from "react-redux";
import { show } from "redux-modal";

import RecordsList from "Components/RecordsList";
import { listOptions, getDateTime } from "Helpers/helpers";
import NumberFormat from 'react-number-format';
import { amountRounding } from "Helpers/helpers";

const options = Object.assign({}, listOptions);
class LoanList extends Component {
    constructor(props) {
        super(props);
        this.state = {
         
    
        };
      }
    componentDidMount() {
    }

    render() {
        const columns = [
            { name: "_id",options: { display: "excluded", filter: false, sort: false },},
            { label: "Loan Date", name: "loan_date", options: { filter: false } },
            { label: "Installment", name: "monthly_install", options: { 
              filter: false,
              customBodyRender: (value) => {
                return value ?  <NumberFormat value={amountRounding(2,value)} displayType={'text'} thousandSeparator={true}/> : ""
              } 
            } },
            { label: "Interest paid", name: "interestPaid", options: { 
              filter: false,
              customBodyRender: (value) => {
                return value ?  <NumberFormat value={amountRounding(2,value)} displayType={'text'} thousandSeparator={true}/> : ""
              } 
            } },
            { label: "Principal Left", name: "balance_left", options: { 
              filter: false,
              customBodyRender: (value) => {
                return value ?  <NumberFormat value={amountRounding(2,value)} displayType={'text'} thousandSeparator={true}/>: ""
              } 
            } }            
        ];

        return (
            <div className="rct-block">
                <RecordsList title="Loan Management List" columns={columns} data={this.props.data} options={options} />
            </div>
        );
    }
}

const mapStateToProps = ({  }) => {
    return {  };
};
export default connect(mapStateToProps, {show,  })(LoanList);