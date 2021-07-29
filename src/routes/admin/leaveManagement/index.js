import React, { Component } from "react";
import { connect } from "react-redux";
import { show } from "redux-modal";
import moment from "moment";

// Component Imports
import { listOptions, getDateTime, getDate } from "Helpers/helpers";
import { leaveManagementNewPage, singleLeaveManagement } from "Helpers/adminURL";

// Icon Imports
import { IconButton } from '@material-ui/core'
import { Icon } from '@iconify/react'
import VisibilityIcon from '@material-ui/icons/Visibility';
import baselineDeleteForever from '@iconify/icons-ic/baseline-delete-forever'
import editFilled from '@iconify/icons-ant-design/edit-filled'
import ServerRecordsList from "Components/ServerRecordsList";
import addFilled from "@iconify/icons-carbon/add-filled";

// Actions
import {
    getLeaveManagement,
    getAllLeaveManagement,
    deleteLeaveManagement,
    getFilterLeaveManagementRequest,
    clearDuplicate
} from "Ducks/admin/leaveManagement"

class LeaveManagementListView extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    createPage() {
        this.props.clearDuplicate();
        this.props.history.push(leaveManagementNewPage);
    }

    edit(id) {
        this.props.clearDuplicate();
        this.props.history.push({ pathname: singleLeaveManagement(id) })
    }


    handleSingleDelete(id) {
        this.props.deleteLeaveManagement(id);
    }

    delete(id, partNumber) {
        this.props.show("alert_delete", {
            name: partNumber,
            action: () => this.handleSingleDelete(id),
        });
    }

    render() {
        const { data, count, loading } = this.props.leaveManagementFiltered;

        const columns = [
            { name: "id", options: { display: "excluded", filter: false, sort: false } },
            { label: "Leave Request No", name: "number", options: { filter: false } },
            {
                label: "Apply Date", name: "applyDate", options: {
                    filter: false,
                    customBodyRender: (value, tableMeta) => {
                        if (value != undefined) {
                            return (<div>{moment(value).format('DD/MM/YYYY')}</div>)
                        } else {
                            return (<div> </div>)
                        }
                    }
                }
            },
            { label: "Take Off Days", name: "offDays", options: { filter: false } },
            { label: "Leave type", name: "type", options: { filter: false } },
            // {
            //     label: "Transfer Date", name: "transferDate", options: {
            //         filter: false,
            //         customBodyRender: (value, tableMeta) => {
            //             if (value != undefined) {
            //                 return (<div>{moment(value).format('DD/MM/YYYY')}</div>)
            //             } else {
            //                 return (<div> </div>)
            //             }
            //         }
            //     }
            // },
            {
                label: "Start Date", name: "startDate", options: {
                    filter: false,
                    customBodyRender: (value, tableMeta) => {
                        if (value != undefined) {
                            return (<div>{moment(value).format('DD/MM/YYYY')}</div>)
                        } else {
                            return (<div> </div>)
                        }
                    }
                }
            },
            {
                label: "End Date", name: "endDate", options: {
                    filter: false,
                    customBodyRender: (value, tableMeta) => {
                        if (value != undefined) {
                            return (<div>{moment(value).format('DD/MM/YYYY')}</div>)
                        } else {
                            return (<div> </div>)
                        }
                    }
                }
            },

            { label: "Status", name: "status", options: { filter: false } },

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

                            </div>
                        )
                    }
                }
            },
        ];

        const options = Object.assign({}, listOptions);
        options.customToolbar = () => {
            return (
                <IconButton size="small" onClick={() => this.createPage()}>
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
            <div>
                <div style={{
                    width: "50%",
                    margin: "10px auto",
                    minWidth: "400px",
                    color: "#2b4da0",
                    fontWeight: "bolder",
                    fontSize: "18px",
                    textAlign: "center",
                }} > Leave Management
                </div>
                <div className="rct-block">
                    <ServerRecordsList
                        title=" "
                        hasSearch={true}
                        columns={columns}
                        data={data}
                        totalCount={count}
                        otherOptions={options}
                        filterFunc={this.props.getFilterLeaveManagementRequest}
                    />
                </div>
            </div>
        )
    }

}

const mapStateToProps = ({ adminState }) => {
    const { leaveManagementState } = adminState;
    const { leaveManagementsAll, leaveManagement, leaveManagementFiltered } = leaveManagementState
    return { leaveManagement, leaveManagementsAll, leaveManagementFiltered };
};
export default connect(mapStateToProps, {
    show, getLeaveManagement,
    getFilterLeaveManagementRequest, deleteLeaveManagement, clearDuplicate

})(LeaveManagementListView);

