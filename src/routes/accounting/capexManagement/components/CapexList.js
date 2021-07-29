import React, { Component } from "react";
// Sub components
import { connect } from "react-redux";
import { show } from "redux-modal";

import RecordsList from "Components/RecordsList";
import { listOptions, getDateTime } from "Helpers/helpers";

const options = Object.assign({}, listOptions);
class CapexList extends Component {
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
            { label: "Date", name: "date", options: { filter: false } },
            { label: "Depreciation", name: "depreciation", options: { filter: false } },
            { label: "Value Left", name: "value_left", options: { filter: false } },
            { label: "Journal Added", name: "journal", options: { filter: false }}
        ];

        // options.onRowClick = (rowData) => {
        //     this.props.getInfo(rowData[0]);
        // };

        return (
            <div className="rct-block">
                <RecordsList title="Capex Management List" columns={columns} data={this.props.data} options={options} />
            </div>
        );
    }
}

const mapStateToProps = ({  }) => {
    return {  };
};
export default connect(mapStateToProps, {show,  })(CapexList);