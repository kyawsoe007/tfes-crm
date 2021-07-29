import React, { Component } from "react";
import PropTypes from 'prop-types';
// Sub components
import { connect } from "react-redux";
import { show } from "redux-modal";

import RecordsList from "Components/RecordsList";
import { listOptions, getDateTime } from "Helpers/helpers";

function FilteredJournalAccount({ data, getInfoLevelOne, getInfoLevelTwo, levelToggle }) {
    
    const columns = [
        { name: "_id", options: { display: "excluded", filter: false, sort: false },},
        { label: "Code", name: "accountCode", options: { filter: false } },
        { label: "Name", name: "accountName" },
        { label: "Credit", name: "credit", options: { filter: false } },
        { label: "Debit", name: "debit", options: { filter: false } },
        { label: "Balance", name: "balance", options: { filter: false } },
        { label: "Currency", name: "currency", options: { filter: false } }
    ];

    const options = Object.assign({}, listOptions);
    options.onRowClick = (rowData) => {
        if (levelToggle === 1) {
            getInfoLevelOne(rowData[0])
        } else if (levelToggle === 2) {
            getInfoLevelTwo(rowData[0])
        }
    };

    return (
            <div className="rct-block">
                <RecordsList title="Account List" columns={columns} data={data} options={options} />
            </div>   
    )
}

export default FilteredJournalAccount

FilteredJournalAccount.propTypes = {
    data: PropTypes.array,
    getInfoLevelOne: PropTypes.func,
    getInfoLevelTwo: PropTypes.func,
    levelToggle: PropTypes.number
}