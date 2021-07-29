import React, { Component } from "react";
import { connect } from "react-redux";
import { show } from "redux-modal";
import moment from "moment";

// Component Imports
import { listOptions, getDateTime, getDate } from "Helpers/helpers";
import { debitNoteNewPage, singledebitNote } from "Helpers/accountingURL";

// Icon Imports
import { IconButton } from '@material-ui/core'
import { Icon } from '@iconify/react'
import baselineDeleteForever from '@iconify/icons-ic/baseline-delete-forever'
import editFilled from '@iconify/icons-ant-design/edit-filled'
import ServerRecordsList from "Components/ServerRecordsList";
import addFilled from "@iconify/icons-carbon/add-filled";

// Actions
import { getDebitNote, getFilterDebitNoteRequest, deleteDebitNote, getSingleDebitNoteRequest, getSavedDebitNoteQuery } from "Ducks/accounting/debitnote";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";

class DebitNoteListView extends Component {
    constructor(props) {
        super(props);

    }

    newPage = () => {
        this.props.history.push(debitNoteNewPage);
    }

    edit = (id) => {

        this.props.history.push({ pathname: singledebitNote(id) });
    }

    duplicate = (id) => {
        this.props.getSingleDebitNoteRequest(id);
        this.props.history.push({ pathname: singledebitNote(id) }, { isDuplicate: true });
    }

    handleSingleDelete = (id) => {
        this.props.deleteDebitNote(id);
    }

    delete = (id, partNumber) => {
        this.props.show("alert_delete", {
            name: partNumber,
            action: () => this.handleSingleDelete(id)
        })
    }

    render() {
        const { data, count, loading } = this.props.DebitNoteFiltered;

        const columns = [
            { name: "id", options: { display: "excluded", filter: false, sort: false } },
            { label: "Partner No", name: "suppNo", options: { filter: false } },
            { label: "Partner Name", name: "suppName", options: { filter: false } },

            {
                label: "Invoice date", name: "invoiceDate", options: {
                    filter: false,
                    customBodyRender: (value, tableMeta) => {
                        return (
                            <div>{moment(value).format('DD/MM/YYYY')}</div>
                        )
                    }
                }
            },
            { label: "Number", name: "debitNoteNumber", options: { filter: false } },
            { label: "Source Document", name: "soNumber", options: { filter: false } },
            {
                label: "Currency", name: "currency", options: {
                    filter: false,
                    customBodyRender: (value, tableMeta) => {
                        return (
                            <div>{value ? value.name : ''}</div>
                        )
                    }
                }
            },
            {
                label: "Balance", name: "balance", options: {
                    filter: false,
                    customBodyRender: (value, tableMeta) => {
                        return (
                            <div>{value}</div>
                        )
                    }
                }
            },
            { label: "Total", name: "total", options: { filter: false } },
            {
                label: "Status", name: "status", options: {                                                               //11
                    filter: true,
                    filterOptions: {
                        names: ["draft", "confirmed", "closed"],
                    },
                }
            },
            {
                label: "Action",
                name: "action",
                options: {
                    filter: false,
                    sort: false,
                    customBodyRender: (value, tableMeta) => {
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
                                {
                                    tableMeta.rowData[9] == 'draft' ? (
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
                                    ) : (
                                        null
                                    )
                                }
                                <IconButton
                                    size="small" className="tableCloneIcon" onClick={() => { this.duplicate(tableMeta.rowData[0]) }}>
                                    <FileCopyOutlinedIcon
                                        style={{
                                            color: "#595959",
                                            width: "1.5rem",
                                            height: "1.5rem"
                                        }}
                                    />
                                </IconButton>

                            </div>
                        )
                    }
                }
            },
        ];

        // dynamically adds back filter list based on the props 
        for (var i = 0; i < columns.length; i++) {
            // FOR FILTERS
            if (this.props.SavedQuery.saved) {
                columns[i].options.filterList = this.props.SavedQuery.filterList[i];
            } else {
                columns[i].options.filterList = [];
            }

            // FOR COLUMNS
            if(this.props.SavedQuery.display){
                columns[i].options.display = this.props.SavedQuery.display[i];
            }
        }

        const options = Object.assign({}, listOptions);
        options.customToolbar = () => {
            return (
                <IconButton size="small" onClick={() => this.newPage()}>
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
                <ServerRecordsList
                    title="DebitNote List"
                    hasSearch={true}
                    columns={columns}
                    data={data}
                    count={count}
                    otherOptions={options}
                    filterFunc={this.props.getFilterDebitNoteRequest}
                    savedQuery={this.props.SavedQuery}
                    getSavedQuery={this.props.getSavedDebitNoteQuery}
                />
            </div>
        )
    }
}

const mapStateToProps = ({ debitnoteState }) => {
    const { DebitNoteFiltered, SavedQuery } = debitnoteState;
    return { DebitNoteFiltered, SavedQuery };
};
export default connect(mapStateToProps, {
    show,
    getDebitNote,
    getFilterDebitNoteRequest,
    deleteDebitNote,
    getSingleDebitNoteRequest,
    getSavedDebitNoteQuery
})(DebitNoteListView);