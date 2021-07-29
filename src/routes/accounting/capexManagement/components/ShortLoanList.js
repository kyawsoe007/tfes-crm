import React, { Component } from "react";
// Sub components
import { connect } from "react-redux";
import { show } from "redux-modal";

// Icon Imports
import { IconButton } from '@material-ui/core'
import { Icon } from '@iconify/react'
import addFilled from "@iconify/icons-carbon/add-filled";

import RecordsList from "Components/RecordsList";
import { listOptions, getDateTime, amountRounding } from "Helpers/helpers";
import moment from 'moment';

const options = Object.assign({}, listOptions);
class ShortLoanList extends Component {
  constructor(props) {
    super(props);
    this.state = {


    };
  }
  componentDidMount() {
  }

  render() {
    const { onCreate } = this.props;
    const columns = [
      { name: "_id", options: { display: "excluded", filter: false, sort: false }, },
      {
        label: "Loan Date", name: "date", options: {
          filter: false,
          customBodyRender: (value) => {
            return value ? moment(value).format("DD/MM/YYYY") : ""
          }
        }
      },
      {
        label: "Amount", name: "amount", options: {
          filter: false,
          customBodyRender: (value) => {
            return value ? amountRounding(2, value) : ""
          }
        }
      },
      {
        label: "Interest Amount", name: "interestAmount", options: {
          filter: false,
          customBodyRender: (value) => {
            return value ? amountRounding(2, value) : ""
          }
        }
      },
      {
        label: "Miscellaneous Amount", name: "miscellaneous_amount", options: {
          filter: false,
          customBodyRender: (value) => {
            return value ? amountRounding(2, value) : ""
          }
        }
      },
      {
        label: "Account", name: "accountName", options: {
          filter: false,
          // customBodyRender: (value) => {
          //   return value ? amountRounding(2, value) : ""
          // }
        }
      },
      {
        label: "Balance Left", name: "balance", options: {
          filter: false,
          customBodyRender: (value) => {
            return value ? amountRounding(2, value) : ""
          }
        }
      },
    ];

    options.customToolbar = () => {
      return (
        <IconButton size="small" onClick={() => onCreate("createPayment")}>
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
      <div className="rct-block">
        <RecordsList title="Loan Management List" columns={columns} data={this.props.data} options={options} />
      </div>
    );
  }
}

const mapStateToProps = ({ }) => {
  return {};
};
export default connect(mapStateToProps, { show, })(ShortLoanList);
