import React, { Component } from "react";
import { connect } from "react-redux";
import { show } from "redux-modal";
import moment from "moment";

// Component Imports
import { listOptions, getDateTime, getDate } from "Helpers/helpers";
import { adminSettingNewPage, singleEmployeeSetting } from "Helpers/adminURL";

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
    getAdminSetting,
    getAllAdminSetting,
    deleteAdminSetting,
    getFilterAdminSettingRequest,
    clearAdminDuplicate
} from "Ducks/admin/adminSetting"
class AdminSettingListView extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    createPage() {
        this.props.clearAdminDuplicate();
        this.props.history.push(adminSettingNewPage);
    }

    edit(id) {
        this.props.clearAdminDuplicate();
        this.props.history.push({ pathname: singleEmployeeSetting(id) })
    }

    view(id) {
        this.props.history.push({ pathname: singleEmployeeSetting(id), state: { view: true } })
    }

    handleSingleDelete(id) {
        this.props.deleteAdminSetting(id);
    }

    delete(id, partNumber) {
        this.props.show("alert_delete", {
            name: partNumber,
            action: () => this.handleSingleDelete(id),
        });
    }

    render() {
        const { data, count } = this.props.adminSettingFiltered;

        const columns = [
            { name: "id", options: { display: "excluded", filter: false, sort: false } },
            { label: "Employee Number", name: "number", options: { filter: false } },
            { label: "ID Number", name: "idNumber", options: { filter: false } },
            { label: "Nickname", name: "nickName", options: { filter: false } },
            { label: "First Name", name: "firstName", options: { display: "excluded", filter: false } },
            { label: "Last Name", name: "lastName", options: { display: "excluded", filter: false } },
            {
                label: "Hiredate", name: "hireDate", options: {
                    filter: false,
                    customBodyRender: (value, tableMeta) => {
                        if (value != undefined) {
                            return (<div>{moment(value).format('DD/MM/YYYY')}</div>)
                        } else {
                            return (<div></div>)
                        }
                    }
                }
            },
            { label: "Position", name: "position", options: { filter: false } },
            { label: "working years", name: "workingYears", options: { filter: false } },
            { label: "Annual Leave", name: "annualLeave", options: { filter: false } },
            { label: "Department", name: "department", options: { filter: false } },
            { label: "Phone Number", name: "phoneNum", options: { filter: false } },
            { label: "Status", name: "status", options: { display: "excluded", filter: false } },
            {
                label: "Action",
                name: "action",
                options: {
                    filter: false,
                    sort: false,
                    customBodyRender: (value, tableMeta) => {
                        let stateIndex = columns.findIndex(x => x.name == "status")
                        let data = tableMeta.rowData
                        let isShow = false
                        if (data[stateIndex] == 'open' || data[stateIndex] == 'draft') {
                            isShow = true
                        }
                        else{
                            isShow = false
                        }

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
                                {!isShow &&<IconButton
                                    size="small"
                                    onClick={() => { this.view(tableMeta.rowData[0]) }}>
                                    <VisibilityIcon
                                    color="#595959"
                                    width="1.5rem"
                                    height="1.5rem"
                                    />
                                </IconButton> }

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
                }} > Employee Setting
                </div>
                <div className="rct-block">
                    <ServerRecordsList
                        title=" "
                        hasSearch={true}
                        columns={columns}
                        data={data}
                        totalCount={count}
                        otherOptions={options}
                        filterFunc={this.props.getFilterAdminSettingRequest}
                    />
                </div>
            </div>
        )
    }

}

const mapStateToProps = ({ adminState, }) => {
    const { adminSettingState } = adminState;
    const { adminSettingsAll, adminSetting, adminSettingFiltered } = adminSettingState
    return { adminSetting, adminSettingsAll, adminSettingFiltered };
};
export default connect(mapStateToProps, {
    show,
    getAdminSetting, getAllAdminSetting, deleteAdminSetting, getFilterAdminSettingRequest, clearAdminDuplicate
})(AdminSettingListView);

