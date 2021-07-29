import React from 'react';
import {Link} from "react-router-dom";
import { IconButton } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Icon } from '@iconify/react';
import editFilled from '@iconify/icons-ant-design/edit-filled';

export const workOrderColumns = [
  {
    name: "Work Order Key", 
    options: {
      filter: false,
      display: false
    }
  },
  {
    name: "Work Order ID", 
    options: {
      filter: false
    }
  },
  {
    name: "Sale Order Number", 
    options: {
      filter: false
    }
  },
  {
    name: "Date Created", 
    options: {
      filter: false
    }
  },
  {
    name: "Status", 
    options: {
      filter: true,
      filterType: "checkbox",
    }
  },
  {
    name: "Action",
    options: {
      filter: false,
          sort: false,
            empty: true,
            customBodyRender: (value, tableMeta) => {
                return (
                    //TODO: add Link to specific page 
                  <Link to={`workorder/${tableMeta.rowData[0]}`}>
                  <IconButton
                    size="small"
                    onClick={() => {
                        console.log("ROW VALUE", tableMeta.rowData[0]);
                    }}>
                    <VisibilityIcon
                      color="#595959"
                      width="1.5rem"
                      height="1.5rem"
                    />
                  </IconButton>
                  </Link>
                );
              }
        }
    }
]

//adding icons, to check the difference between customBodyRender and customBodyRenderLite
//https://github.com/gregnb/mui-datatables/blob/master/examples/custom-action-columns/index.js

// give button actions
// https://stackoverflow.com/questions/55102156/how-to-give-action-buttons-in-muidatatable