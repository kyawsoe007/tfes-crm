import React, { Component } from 'react'
import { Fragment } from 'react'
import { Table } from 'reactstrap'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
function HeaderTfesSubmenu(props) {
  const userLogin = useSelector((state) => state.sessionState.authState.user)
  // const userLogin = useSelector((state) => state.userState.singleProfileUser.data)
  // const user2Login = useSelector((state) => state.)
  // console.log("ASDASd", userLogin.roles)
  // console.log("ASDASd", userLogin)
  // console.log("ACCESS", userLogin.access)

  return (
    <div className="submenu_container">
      {/* {userLogin && (userLogin.role === 'sales' || userLogin.role === 'admin') && ( */}
        <ul>
          <li className="submeu-title">Commercial</li>
          <hr></hr>
          {/* <li><Link to={{pathname:'',}}>Inventory Enquiry</Link></li> */}
          <li onClick={() => props.handleClose(null)}><Link to={{pathname:'/app/crm/inventoryEnquiry'}}>Inventory Enquiry</Link></li>
            {
              userLogin.access.includes("quotation") &&
              <li onClick={() => props.handleClose(null)}> <Link to={{ pathname: '/app/crm/quotation' }}>Quotation</Link> </li>
            }

            {
              userLogin.access.includes("sales_order") && 
              <li onClick={() => props.handleClose(null)}> <Link to={{ pathname: '/app/crm/salesOrder' }}>Sales Order</Link></li>
            }

            {
              userLogin.access.includes("purchase_order") &&
              <li onClick={() => props.handleClose(null)}> <Link to={{ pathname: '/app/crm/purchase' }}>Purchase Order</Link> </li>
            }
            

            {
               userLogin.access.includes("commercial_setting") &&
              <li onClick={() => props.handleClose(null)}> <Link to={{ pathname: '/app/crm/commercialSettings' }}>Commercial Settings</Link> </li>
            }     

            {                 
               userLogin.access.includes("commercial_setting") &&
              <li onClick={() => props.handleClose(null)}> <Link to={{ pathname: '/app/warehouse/stockExpense' }}> Stock Expenses </Link></li>
            }

          {/* <li><a>Incoming Freight Booking</a></li> */}
        </ul>
      {/* )} */}
      {/* {userLogin &&
        (userLogin.role === 'warehouse' || userLogin.role === 'admin') && ( */}
          
          <ul>
            <li className="submeu-title">Operation</li>
            <hr></hr>

            {
              userLogin.access.includes("work_order_management") &&
              <li onClick={() => props.handleClose(null)}> <Link to={{ pathname: '/app/warehouse/workorder' }}> Work Order Management </Link> </li>
            }


            {/* <li><Link to={{pathname:'',}}>Goods Received</Link></li> */}

            {
              userLogin.access.includes("goods_delivered") &&
              <li onClick={() => props.handleClose(null)}> <Link to={{ pathname: '/app/warehouse/deliveryOrder' }}> Goods Delivered </Link> </li>
            }

            {/* <li><a>Work Order Update</a></li> */}

            {
              userLogin.access.includes("stock_management") &&
              <li onClick={() => props.handleClose(null)}> <Link to={{ pathname: '/app/warehouse/stock' }}> Stock Management </Link> </li>
            }

            {
              userLogin.access.includes("packing_management") &&
              <li onClick={() => props.handleClose(null)}> <Link to={{ pathname: '/app/warehouse/packing' }}> Packing Management </Link></li>
            }
             {
              
              <li onClick={() => props.handleClose(null)}> <Link to={{ pathname: '/app/warehouse/settings/skuList' }}> SKU List </Link></li>
        }

            {
              userLogin.access.includes("warehouse_setting") &&
              <li onClick={() => props.handleClose(null)}> <Link to={{ pathname: '/app/warehouse/settings' }}> Warehouse Settings </Link></li>
            }
           
         
           

            {                 
               userLogin.access.includes("inventory_setting") &&
              <li onClick={() => props.handleClose(null)}> <Link to={{ pathname: '/app/warehouse/inventory/settings' }}> Inventory Settings </Link></li>
            }
            

          </ul>
        {/* )} */}
      <ul>
        <li className="submeu-title">Finance</li>
        <hr></hr>
       
        {
          userLogin.access.includes("sales_order_management") && 
          <li onClick={() => props.handleClose(null)}> <Link to={{ pathname: '/app/accounting/acctSales' }}>Sales Order</Link></li>
        }
        {
          userLogin.access.includes("invoice_management") &&
          <li onClick={() => props.handleClose(null)}><Link to={{pathname:'/app/accounting/tfesInvoice'}}>Invoice Management</Link></li>
        } 
        {
          userLogin.access.includes("payment_management") &&
          <li onClick={() => props.handleClose(null)}><Link to={{pathname:'/app/accounting/tfesPayment'}}>AR Management</Link></li>
        }
        {
          userLogin.access.includes("supplier_invoice_management") &&
          <li onClick={() => props.handleClose(null)}><Link to={{pathname:'/app/accounting/supplierInvoice'}}>Supplier Invoice-Expenses</Link></li>
        }
        {
          userLogin.access.includes("supplier_payment_management") &&       
          <li onClick={() => props.handleClose(null)}><Link to={{ pathname: '/app/accounting/supplierPayment', }}>AP Payments</Link></li>
        }
        <hr></hr>
        {
          
          userLogin.access.includes("finance_setting") &&
          <li onClick={() => props.handleClose(null)}> <Link to={{ pathname: '/app/accounting/loanManagement' }}> Loan Management </Link></li>
          
        }
        {
          userLogin.access.includes("finance_setting") &&
          <li onClick={() => props.handleClose(null)}> <Link to={{ pathname: '/app/accounting/capexManagement' }}> Capex Management </Link></li>
        }
        {
          userLogin.access.includes("payment_management") &&
          <li onClick={() => props.handleClose(null)}><Link to={{pathname:'/app/accounting/tfesCreditNote'}}>Credit Note</Link></li>
        }
        {
          userLogin.access.includes("supplier_invoice_management") &&
          <li onClick={() => props.handleClose(null)}><Link to={{pathname:'/app/accounting/debitnote'}}>Debit Note</Link></li>
        }
        {
          userLogin.access.includes("supplier_invoice_management") &&
          <li onClick={() => props.handleClose(null)}> <Link to={{ pathname: '/app/accounting/tfesDeposit' }}> Deposit </Link></li>
        }  
        <hr></hr>
        {/* pay roll */}
        {/* claims */}
        {/* <hr></hr> */}
        {
          userLogin.access.includes("finance_setting") &&
          <li onClick={() => props.handleClose(null)}> <Link to={{ pathname: '/app/accounting/stockAdjustment' }}> Stock Adjustment </Link></li>
        }
        {/* Interbank Transfer */}
        {
          userLogin.access.includes("journal_entries_management") &&
          <li onClick={() => props.handleClose(null)}><Link to={{pathname:'/app/accounting/journalEntries'}}>Journal Entries Management</Link></li>
        }
       
          <li onClick={() => props.handleClose(null)}> <Link to={{ pathname: '/app/accounting/generatingReport' }}>Reports</Link></li>
       
        {
          userLogin.access.includes("finance_setting") &&
          <li onClick={() => props.handleClose(null)}> <Link to={{ pathname: '/app/accounting/financeSettings' }}> Finance Settings </Link></li>
        }
        {
          userLogin.access.includes("general_setting") &&
          <li onClick={() => props.handleClose(null)}> <Link to={{ pathname: '/app/maintenance/generalSettings' }}> General Settings </Link></li>
        }

        {/* <li><a>Bank Recon</a></li> */}
        {/* <li><a>P&L  B/S</a></li>  */}
      </ul>
      <ul>
        <li className="submeu-title">Admin</li>
        <hr></hr>
        {
          userLogin.access.includes("leave_management") &&  
          <li onClick={() => props.handleClose(null)}><Link to={{ pathname: '/app/admin/leaveManagement' }}>Leave Application</Link></li>
        }
       {
          userLogin.access.includes("expense_claim_management") &&  
          <li onClick={() => props.handleClose(null)}><Link to={{ pathname: '/app/admin/expenseClaims' }}>Expenses Claim</Link></li>
        }
        {
          userLogin.access.includes("employee_settings_management") &&  
          <li onClick={() => props.handleClose(null)}><Link to={{ pathname: '/app/admin/adminSetting' }}>Employee Setting</Link></li>
        }
       
       

        {/* <li><a>Pay Slip</a></li>
        <li><a>Travel Requests</a></li>
        <li><a>Training Requests</a></li>
        <li><a>Check-In/Out Office</a></li> */}
      </ul>

      <ul>
        <li className="submeu-title">Maintenance</li>
        <hr></hr>

        {
          userLogin.access.includes("sku_maintenance") && 
          <li onClick={() => props.handleClose(null)}> <Link to={{ pathname: '/app/warehouse/sku' }}>SKU Maintenance</Link> </li>
        }

        {
          userLogin.access.includes("supplier_maintenance") && 
          <li onClick={() => props.handleClose(null)}> <Link to={{ pathname: '/app/crm/supplier' }}> Supplier Maintenance </Link> </li>
        }

        {
          userLogin.access.includes("customer_management") && 
          <li onClick={() => props.handleClose(null)}> <Link to={{ pathname: '/app/crm/customers' }}> Customer Management </Link> </li>
        }
        

        {
          userLogin.access.includes("account_management") && 
          <li onClick={() => props.handleClose(null)}><Link to={{ pathname: '/app/accounting/acctMaintenance' }}>Account Maintenance </Link></li>
        }

        {
          userLogin.access.includes("user_maintenance") &&
          <li onClick={() => props.handleClose(null)}> <Link to={{ pathname: '/app/maintenance/userMaintenance' }}> User Maintenance </Link> </li>
        }        

        <li onClick={() => props.handleClose(null)}> <Link to={{ pathname: "/app/maintenance/userProfile"}}> User Profile Maintenance </Link> </li>

        {
          userLogin.access.includes("role_maintenance") &&
          <li onClick={() => props.handleClose(null)}> <Link to={{ pathname: '/app/maintenance/roleMaintenance' }}> Role Maintenance </Link> </li>
        }
       

      </ul>
    </div>
  )
}

export default HeaderTfesSubmenu
