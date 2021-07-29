
import React, { Component, Fragment, useState, useEffect } from "react";
// Component Imports
import DialogRoot from 'Components/Dialog/DialogRoot'
import Button from "@material-ui/core/Button";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';



// Form labels and all should be mappeed properly 

const managerRoles = [
    { name: "Manager", value: "manager"}
]

const commercialRoles = [
    { name: "Quotation", value: "quotation" },
    { name: "Sales Order", value: "sales_order" },
    { name: "Purchase Order", value: "purchase_order" },
    { name: "Commercial Setting", value: "commercial_setting" }
];

const operationRoles = [
    { name: "Work Order Management", value: "work_order_management" },
    { name: "Goods Delivered", value: "goods_delivered" },
    { name: "Stock Management", value: "stock_management" },
    { name: "Packing Management", value: "packing_management"},
    { name: "Warehouse Setting", value: "warehouse_setting"},
    { name: "Inventory Setting", value: "inventory_setting"},
]

const financeRoles = [
    { name: "Sales Order Management", value: "sales_order_management" },
    { name: "Journal Entries List Management", value: "journal_entries_list_management" },
    { name: "Journal Entries Management", value: "journal_entries_management"},
    { name: "Invoice Management", value: "invoice_management"},
    { name: "Payment Management", value: "payment_management" },
    { name: "Supplier Payment Management", value: "supplier_payment_management" },
    { name: "Supplier Invoice Management", value: "supplier_invoice_management"},
    { name: "Finance Setting", value: "finance_setting"},
]
/**
 * Leave, Employee settings, Payroll, Expense Claim
 * 
 */ 
const adminRoles = [
    { name: "Leave Management", value: "leave_management" },
    { name: "Employee Settings Management", value: "employee_settings_management"},
    { name: "Payroll Management", value: " payroll_management"},
    { name: "Expense Claim Management", value: "expense_claim_management" },
]

const maintenanceRoles = [
    { name: "SKU Maintenance", value: "sku_maintenance" },
    { name: "Supplier Maintenance", value: "supplier_maintenance"},
    { name: "Customer Management", value: "customer_management"},
    { name: "Account Maintenance", value: "account_management"},
    { name: "User Maintenance", value: "user_maintenance"},
    { name: "Role Maintenance", value: "role_maintenance"},
    { name: "General Setting", value: "general_setting"},
]

const RoleEditDetails = ({userRolesData, show, handleHide, onChange, patchUserRole}) => {

    const [state, setState] = useState({});
    
      const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
      };

    useEffect( () => {

        const permissionsArr = userRolesData.permissions;
        const managerRole = userRolesData.isManager;
        console.log("manager", userRolesData)
        console.log("roles", permissionsArr);

        // checkbox obj must be placed outside loops to prevent any setState from completing prematurely  
        const checkBoxObj = {}

        // 
        for (let i = 0; i < managerRoles.length; i++) {
            // for (let j = 0; j < permissionsArr.length; j++) {
            //     if (permissionsArr[j] === managerRoles[i].value) {
            //         checkBoxObj[managerRoles[i].name] = true;
            //     }
            // }
            if (managerRole) {
                checkBoxObj[managerRoles[i].name] = true;
            }
        }

        for (let i = 0; i < commercialRoles.length; i++) {
            for (let j = 0; j < permissionsArr.length; j++) {
                if (permissionsArr[j] === commercialRoles[i].value) {
                    checkBoxObj[commercialRoles[i].name] = true;
                }
            }
        }

        for (let i = 0; i < operationRoles.length; i++) {
            for (let j = 0; j < permissionsArr.length; j++) {
                if (permissionsArr[j] === operationRoles[i].value) {
                    checkBoxObj[operationRoles[i].name] = true;
                }
            }
        }

        for (let i = 0; i < financeRoles.length; i++) {
            for (let j = 0; j < permissionsArr.length; j++) {
                if (permissionsArr[j] === financeRoles[i].value) {
                    checkBoxObj[financeRoles[i].name] = true;
                }
            }
        }
        for (let i = 0; i < adminRoles.length; i++) {
            for (let j = 0; j < permissionsArr.length; j++) {
                if (permissionsArr[j] === adminRoles[i].value) {
                    checkBoxObj[adminRoles[i].name] = true;
                }
            }
        }

        for (let i = 0; i < maintenanceRoles.length; i++) {
            for (let j = 0; j < permissionsArr.length; j++) {
                if (permissionsArr[j] === maintenanceRoles[i].value) {
                    checkBoxObj[maintenanceRoles[i].name] = true;
                }
            }
        }

        // destrucuring to populate details 
        setState({
            ...state,
            ...checkBoxObj
        })
    }, [])

const closeAndUpdate = () => {

    const accessArr = [];
    let isManager = false;

    // this sections loops array and checkbox state to find the values to push if true 

    // this section assumes that there is only 1 manager role, needs to be refactored 
    for (let i = 0; i < managerRoles.length; i++ ) {
        for (var key in state) {
            if (key === managerRoles[i].name && state[key]) {
                // accessArr.push(managerRoles[i].value)
                isManager = true;
            }
        }
    }

    for (let i = 0; i < commercialRoles.length; i++ ) {
        for (var key in state) {
            if (key === commercialRoles[i].name && state[key]) {
                accessArr.push(commercialRoles[i].value)
            }
        }
    }

    for (let i = 0; i < operationRoles.length; i++ ) {
        for (var key in state) {
            if (key === operationRoles[i].name && state[key]) {
                accessArr.push(operationRoles[i].value)
            }
        }
    }

    for (let i = 0; i < financeRoles.length; i++ ) {
        for (var key in state) {
            if (key === financeRoles[i].name && state[key]) {
                accessArr.push(financeRoles[i].value)
            }
        }
    }
    for (let i = 0; i < adminRoles.length; i++ ) {
        for (var key in state) {
            if (key === adminRoles[i].name && state[key]) {
                accessArr.push(adminRoles[i].value)
            }
        }
    }

    for (let i = 0; i < maintenanceRoles.length; i++ ) {
        for (var key in state) {
            if (key === maintenanceRoles[i].name && state[key]) {
                accessArr.push(maintenanceRoles[i].value)
            }
        }
    }


    console.log("STATE", state)
    console.log(accessArr);

    const patchData = {
        id: userRolesData.id,
        name: userRolesData.role,
        access: accessArr,
        isManager: isManager
    }

    patchUserRole(patchData);

    console.log("PATCHfffff", patchData);
    handleHide()
}
    return(

    <DialogRoot
        show={show}
        handleHide={handleHide}
        size={'lg'}
      >
        <div className="container" style={{padding: "1rem"}}>

            <div className="row">
                <div className="col-md-9">
                    <h1> Edit <span style={{color: "blue"}}>{userRolesData.role}</span> Role Permissions</h1>
                </div>
                <div className="col-md-3">
                    {
                        managerRoles.map( (role) =>(
                            <FormControlLabel
                                control={
                                    <Switch
                                    checked={state[role.name]}
                                    onChange={handleChange(role.name)}
                                    color="primary"
                                    name="manager"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />    
                                }
                                label="Manager"
                            />
                        ))
                    }

                </div>
            </div>
            <div className="submenu_container">

            {/* COMMERCIAL CHECKBOX  */}
            <ul>
            <li className="submeu-title">Commercial</li>
            <hr></hr>
            {
                commercialRoles.map( (role) => (
                    <div>
                        <FormControlLabel
                            control={
                                <Checkbox
                                checked={state[role.name]}
                                onChange={handleChange(role.name)}
                                value="checkedB"
                                color="primary"
                                />
                            }
                            label={role.name}
                            />
                            <br/>  
                    </div>
                ))
            }
            </ul>



            {/* OPERATION CHECKBOX  */}
            <ul>
                <li className="submeu-title">Operation</li>
                <hr></hr>
                {
                operationRoles.map( (role) => (
                    <div>
                        <FormControlLabel
                            control={
                                <Checkbox
                                checked={state[role.name]}
                                onChange={handleChange(role.name)}
                                value="checkedB"
                                color="primary"
                                />
                            }
                            label={role.name}
                            />
                            <br/>  
                    </div>
                ))
            }
            </ul>

        {/* FINANCE CHECKBOX  */}
        <ul>
            <li className="submeu-title">Finance</li>
            <hr></hr>
            {
                financeRoles.map( (role) => (
                    <div>
                        <FormControlLabel
                            control={
                                <Checkbox
                                checked={state[role.name]}
                                onChange={handleChange(role.name)}
                                value="checkedB"
                                color="primary"
                                />
                            }
                            label={role.name}
                            />
                            <br/>  
                    </div>
                ))
            }
        </ul> 
        {/* ADIM CHECKBOX  */}
        <ul>
            <li className="submeu-title">Admin</li>
            <hr></hr>
            {
                adminRoles.map( (role) => (
                    <div>
                        <FormControlLabel
                            control={
                                <Checkbox
                                checked={state[role.name]}
                                onChange={handleChange(role.name)}
                                value="checkedB"
                                color="primary"
                                />
                            }
                            label={role.name}
                            />
                            <br/>  
                    </div>
                ))
            }
        </ul> 

        {/* MAINTENANCE CHECKBOX  */}
        <ul>
            <li className="submeu-title">Maintenance</li>
            <hr></hr>
            {
                maintenanceRoles.map( (role) => (
                    <div>
                        <FormControlLabel
                            control={
                                <Checkbox
                                checked={state[role.name]}
                                onChange={handleChange(role.name)}
                                value="checkedB"
                                color="primary"
                                />
                            }
                            label={role.name}
                            />
                            <br/>  
                    </div>
                ))
            }
        </ul>

        
        </div>

        <div style={{ float: "right", paddingTop: "1rem"}}>
            <Button
                variant="contained"
                className="btn-success text-white"
                onClick={closeAndUpdate}
            >
                Save and Close
            </Button>
        </div>

        </div>
      </DialogRoot>
    )
}
  
export default RoleEditDetails