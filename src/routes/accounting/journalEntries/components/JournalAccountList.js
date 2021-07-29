import React, { Component } from "react";
// Sub components
import { connect } from "react-redux";
import { show } from "redux-modal";

import RecordsList from "Components/RecordsList";
import { listOptions, getDateTime } from "Helpers/helpers";


import { getAllAccountItem } from "Ducks/account-item";
// console.log("看看有没有target",this.props.target)
const options = Object.assign({}, listOptions);
class JournalAccountList extends Component {
    componentDidMount() {
        this.props.getAllAccountItem();
    }

    render() {
        const { data, count } = this.props.accountItem;
        const columns = [
            {
                name: "_id",
                options: { display: "excluded", filter: false, sort: false },
            },
            { label: "Code", name: "accountCode", options: { filter: false } },
            { label: "Name", name: "accountName" },
            { label: "Credit", name: "credit", options: { filter: false } },
            { label: "Debit", name: "debit", options: { filter: false } },
            { label: "Balance", name: "balance", options: { filter: false } },
            { label: "Currency", name: "currency", options: { filter: false } }
        ];

        options.onRowClick = (rowData) => {
            let target =this.props.target;
            this.props.getInfo(rowData[0],target, rowData[2]);
        };

        return (
            <div className="rct-block">
                <RecordsList title="Account List" columns={columns} data={data} options={options} />
            </div>
        );
    }
}

const mapStateToProps = ({ accountItemState }) => {    
    const { accountItem } = accountItemState;
    return { accountItem };
};
export default connect(mapStateToProps, { getAllAccountItem })(JournalAccountList);
