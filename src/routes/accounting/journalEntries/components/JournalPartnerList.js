import React, { Component } from "react";
// Sub components
import { connect } from "react-redux";
import { show } from "redux-modal";

import RecordsList from "Components/RecordsList";
import { listOptions, getDateTime } from "Helpers/helpers";


import { getFilterPartnerJournal } from "Ducks/accounting";

const options = Object.assign({}, listOptions);
class JournalPartnerList extends Component {
    componentDidMount() {
        this.props.getFilterPartnerJournal();
    }

    render() {
        const { data, count } = this.props.journalPartnerFiltered;

        const columns = [
            {
                name: "_id",
                options: { display: "excluded", filter: false, sort: false },
            },
            {label:"Partner No",name:"modelNo",options:{filter:false}},
            { label: "Name", name: "name", options: { filter: false } },
            { label: "Nick Name", name: "nickName", options: { filter: false } },
            { label: "Type", name: "modelRef", options: { 
                filter: true,
                filterType: "checkbox", 
                filterOptions: {
                    names: ['Supplier', 'Customer']
                }
            } },
            { label: "Phone", name: "phoneNumber", options: { filter: false } },
        ];

        options.onRowClick = (rowData) => {
            this.props.getInfo(rowData[0]);
        };

        return (
            <div className="rct-block">
                <RecordsList title="Partner List" columns={columns} data={data} options={options} />
            </div>
        );
    }
}

const mapStateToProps = ({ accountingState }) => {
    const { journalState } = accountingState;
    const { journalPartnerFiltered } = journalState;
    return { journalPartnerFiltered };
};
export default connect(mapStateToProps, { getFilterPartnerJournal })(JournalPartnerList);
