import React, { Component } from "react";
// Sub components
import { connect } from "react-redux";
import { show } from "redux-modal";

import RecordsList from "Components/RecordsList";
import { listOptions, getDateTime } from "Helpers/helpers";
import ServerRecordsList from 'Components/ServerRecordsList'

import { getFilterPartnerJournal } from "Ducks/accounting";

const options = Object.assign({}, listOptions);
class JournalPartnerList extends Component {
    // componentDidMount() {
    //     this.props.getFilterPartnerJournal();
    // }

    render() {
        const { data, count } = this.props.journalPartnerFiltered;
        // cannot set within columns variable as different forms are referncing this component 
        const startingFilter = this.props.initialFilter ? [this.props.initialFilter] : []

        const columns = [
            {
                name: "_id",
                options: { display: "excluded", filter: false, sort: false },
            },
            { label: "ModelId", name: "modelId", options: { display: 'excluded', filter: false } },
            { label: "Name", name: "name", options: { filter: false } },
            { label: "Type", name: "modelRef", options: { 
                filter: true,
                filterType: "checkbox", 
                filterOptions: {
                    names: ['Supplier', 'Customer']
                },
                filterList: startingFilter,
            } },
            {label:"Partner No",name:"modelNo",options:{filter:false}},
            { label: "Nick Name", name: "nickName", options: { filter: false } },
            { label: "Phone", name: "phoneNumber", options: { filter: false } }
        ];
        options.onRowClick = (rowData) => {
            //this part needs to be dynamic...
            this.props.getInfo(rowData[0], rowData[1], rowData[3]);
        };
        return (
            <div className="rct-block">
                <ServerRecordsList
                    title="Partner List"
                    columns={columns}
                    data={data}
                    otherOptions={options}
                    filterFunc={this.props.getFilterPartnerJournal}
                    hasSearch={true}
                    totalCount={count}
                />
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
